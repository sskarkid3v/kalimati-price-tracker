# Kalimati Price Tracker — Project Rules

## Stack
- Next.js 14+ App Router, Tailwind CSS, deployed on Vercel (free tier)
- Supabase Postgres (free tier) — anon key client-side, service key server/CI only
- Python 3.11 scraper via GitHub Actions cron
- recharts for all charts

## Non-negotiable constraints
- NEVER expose SUPABASE_SERVICE_KEY client-side. Only NEXT_PUBLIC_SUPABASE_ANON_KEY 
  goes in NEXT_PUBLIC_ variables.
- NEVER hardcode credentials anywhere. All secrets go in env vars or GitHub Secrets.
- Scraper runs ONCE daily — no aggressive retries, proper User-Agent header.
- If scraper returns zero rows, abort — do NOT overwrite existing data.

## Progress tracking
- After completing any step, update PROGRESS.md before moving on.
- Commit to git after every major step with a descriptive message.
- If a step requires manual action (account creation, secret setup), 
  mark it clearly as ⚠️ MANUAL STEP and stop to wait for confirmation.

## Code style
- Mobile-first — most Nepal users are on phones
- Server components for data fetching, cached at 1 hour (prices change daily)
- Client-side filtering only — no API call per keystroke
