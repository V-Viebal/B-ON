CREATE TABLE IF NOT EXISTS site_content (
  content_key TEXT PRIMARY KEY NOT NULL,
  content_json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT
);
