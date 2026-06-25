---
title: deploy
description: Deploys the Kalimati Price Tracker Next.js app to Vercel and 
seeds the database via GitHub Actions manual trigger.
---

## Step 1 — Pre-deploy checks
Confirm .env.local exists and is in .gitignore.
Confirm NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
Confirm SUPABASE_SERVICE_KEY is NOT referenced in any file under /app or /lib.

## Step 2 — Vercel setup
⚠️ MANUAL STEP: User must:
  a. Go to vercel.com, connect GitHub account
  b. Import this repository as a new project
  c. Add environment variables in Vercel project settings:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY
  d. Deploy — confirm live URL loads without errors
  e. Paste the live Vercel URL into PROGRESS.md under Decisions & Config

## Step 3 — Seed initial data
⚠️ MANUAL STEP: User must:
  Go to GitHub repo → Actions → "Daily Kalimati Price Scrape" → Run workflow
  Confirm it completes green and rows appear in Supabase vegetable_prices table

## Step 4 — Write README
Write README.md covering:
- What the app does and the live Vercel URL (placeholder if not known yet)
- How to re-run the scraper manually via GitHub Actions workflow_dispatch
- How to update the HTML selector if the source site changes markup
  (edit scraper/fetch_prices.py, update selector note in PROGRESS.md)
- How to adjust the scrape schedule (edit cron in scrape.yml)
- ASCII architecture diagram
- How to resume a build session using PROGRESS.md + /build workflow

## Step 5 — Write DECISIONS.md
Write DECISIONS.md logging these decisions:
- Why Supabase over Firebase (Postgres gives us proper SQL views and indexes)
- Why server component + 1hr cache for home page (prices change daily, 
  not per request — hitting Supabase on every page load is wasteful)
- Why upsert with (name, date) unique constraint (idempotent re-runs, 
  no duplicate rows if scraper fires twice)
- Why OpenStreetMap/Leaflet over Google Maps (no billing key required)
- Any deviations from the original spec and why
