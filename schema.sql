-- MAJ the Author Website Backend Schema
-- This file contains all database table definitions

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  encrypted_yw_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  subscription_preferences TEXT, -- JSON string for book_updates, merchandise, events
  subscribed_at TEXT DEFAULT CURRENT_TIMESTAMP,
  is_active INTEGER DEFAULT 1,
  source TEXT DEFAULT 'website' -- 'website', 'merchandise_modal', etc.
) STRICT;

-- Contact form submissions table
CREATE TABLE contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  encrypted_yw_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TEXT DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'responded'
  response_sent_at TEXT NULL
) STRICT;