import { COLLECTIONS, FurnitureCollection } from './data/collectionData';

interface D1Row {
  content_json?: string;
}

interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  first<T extends D1Row>(): Promise<T | null>;
  run(): Promise<unknown>;
}

interface D1DatabaseLike {
  prepare(sql: string): D1Statement;
}

interface AssetFetcher {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  DB?: D1DatabaseLike;
  ASSETS?: AssetFetcher;
  ADMIN_EMAILS?: string;
}

const CONTENT_KEY = 'collection:linear';
const DEFAULT_COLLECTION = COLLECTIONS.find((collection) => collection.id === 'linear') || COLLECTIONS[0];

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: jsonHeaders,
  });
}

function normalizedEmail(request: Request): string | null {
  const email = request.headers.get('oai-authenticated-user-email')?.trim().toLowerCase();
  return email || null;
}

function isAdmin(request: Request, env: Env): boolean {
  const email = normalizedEmail(request);
  if (!email) return false;
  const allowed = (env.ADMIN_EMAILS || '')
    .split(/[\s,;]+/)
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email);
}

function isCollection(value: unknown): value is FurnitureCollection {
  if (!value || typeof value !== 'object') return false;
  const collection = value as Partial<FurnitureCollection>;
  return (
    typeof collection.id === 'string' &&
    typeof collection.name === 'string' &&
    typeof collection.nameVi === 'string' &&
    typeof collection.eyebrow === 'string' &&
    typeof collection.description === 'string' &&
    typeof collection.descriptionVi === 'string' &&
    Array.isArray(collection.editions) &&
    collection.editions.length > 0 &&
    collection.editions.every((edition) => {
      if (!edition || typeof edition !== 'object') return false;
      const item = edition as unknown as Record<string, unknown>;
      return (
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.nameVi === 'string' &&
        typeof item.pdfUrl === 'string' &&
        typeof item.previewImage === 'string' &&
        Array.isArray(item.perspectiveImages) &&
        Array.isArray(item.productLineup) &&
        Array.isArray(item.palette)
      );
    })
  );
}

async function readCollection(env: Env): Promise<FurnitureCollection> {
  if (!env.DB) return DEFAULT_COLLECTION;
  try {
    const row = await env.DB
      .prepare('SELECT content_json FROM site_content WHERE content_key = ?1')
      .bind(CONTENT_KEY)
      .first<D1Row>();
    if (row?.content_json) {
      const parsed = JSON.parse(row.content_json) as unknown;
      if (isCollection(parsed)) return parsed;
    }
  } catch (error) {
    console.error('Unable to read shared collection content', error);
  }
  return DEFAULT_COLLECTION;
}

async function writeCollection(env: Env, collection: FurnitureCollection, email: string): Promise<void> {
  if (!env.DB) throw new Error('Database binding is unavailable.');
  await env.DB
    .prepare(`
      INSERT INTO site_content (content_key, content_json, updated_at, updated_by)
      VALUES (?1, ?2, ?3, ?4)
      ON CONFLICT(content_key) DO UPDATE SET
        content_json = excluded.content_json,
        updated_at = excluded.updated_at,
        updated_by = excluded.updated_by
    `)
    .bind(CONTENT_KEY, JSON.stringify(collection), new Date().toISOString(), email)
    .run();
}

async function serveAssets(request: Request, env: Env): Promise<Response> {
  if (!env.ASSETS) {
    return new Response('Static asset binding is unavailable.', { status: 503 });
  }
  const assetResponse = await env.ASSETS.fetch(request);
  if (assetResponse.status !== 404) return assetResponse;

  // Hash routes are client-side routes; serve the SPA shell for direct loads.
  const url = new URL(request.url);
  url.pathname = '/';
  return env.ASSETS.fetch(new Request(url, request));
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/content/linear' && request.method === 'GET') {
      return json(await readCollection(env));
    }

    if (url.pathname === '/api/admin/me' && request.method === 'GET') {
      const email = normalizedEmail(request);
      return json({ authenticated: Boolean(email), isAdmin: isAdmin(request, env), email: isAdmin(request, env) ? email : null });
    }

    if (url.pathname === '/api/admin/content/linear' && request.method === 'PUT') {
      if (!isAdmin(request, env)) {
        return json({ error: 'Admin authentication required.' }, 401);
      }
      const email = normalizedEmail(request);
      if (!email) return json({ error: 'Admin identity is missing.' }, 401);
      try {
        const body = await request.json();
        if (!isCollection(body)) return json({ error: 'Invalid collection payload.' }, 400);
        await writeCollection(env, body, email);
        return json(body);
      } catch (error) {
        console.error('Unable to save shared collection content', error);
        return json({ error: 'The shared content could not be saved.' }, 503);
      }
    }

    return serveAssets(request, env);
  },
};
