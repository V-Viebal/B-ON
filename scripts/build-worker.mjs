import { build } from 'esbuild';
import { cp, mkdir, rm } from 'node:fs/promises';

await mkdir('dist/server', { recursive: true });
await build({
  entryPoints: ['src/worker.ts'],
  bundle: true,
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
  outfile: 'dist/server/index.js',
  minify: true,
  sourcemap: false,
});

await mkdir('dist/.openai', { recursive: true });
await cp('.openai/hosting.json', 'dist/.openai/hosting.json');
await rm('dist/.openai/drizzle', { recursive: true, force: true });
await cp('drizzle', 'dist/.openai/drizzle', { recursive: true });
