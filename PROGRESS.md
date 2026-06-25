# Kalimati Price Tracker — Build Progress

## Session Log
| Session | Date | Agent | Steps Completed | Stopped At |
|---------|------|-------|-----------------|------------|
| 1       | 2026-06-25 | Antigravity |                 |            |

## Step Status
| Step | Name                         | Status      | Notes |
|------|------------------------------|-------------|-------|
| 2    | Repo & folder structure      | DONE        | Next.js + Tailwind + Scraper init |
| 3    | Supabase schema              | DONE        | SQL executed and .env populated |
| 4    | Scraper script               | DONE        | Created main.py using BeautifulSoup |
| 5    | GitHub Actions workflow      | DONE        | Created scrape.yml cron |
| 6    | Frontend                     | DONE        | |
| 6a   | Supabase client              | DONE        | |
| 6b   | Home page price table        | DONE        | |
| 6c   | Item detail + trend chart    | DONE        | |
| 6d   | Compare view                 | DONE        | |
| 6e   | PWA manifest + service worker| DONE        | |
| 7    | Deployment                   | NOT STARTED |       |
| 8    | Smoke test                   | NOT STARTED |       |

## Decisions & Config
- Supabase project URL: https://marotfyxiepzirszqiph.supabase.co
- Supabase anon key (safe to log — read-only): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hcm90Znl4aWVwemlyc3pxaXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNTY4NjgsImV4cCI6MjA5NzkzMjg2OH0.AV8vj8vYC0VPpXZlLrVyPw_YJ-E1QzjsddBWKhEn_gU
- Vercel project URL: [FILL IN]
- GitHub repo URL: [FILL IN]
- HTML table selector used in scraper: find('table')
- Known blockers: none

## Smoke Test Checklist
- [ ] Home page loads at Vercel URL and shows real prices
- [ ] Search bar filters rows client-side correctly
- [ ] Clicking a row navigates to /item/[name]
- [ ] 30-day chart renders with real data points
- [ ] Compare page works with 2 items selected
- [ ] "Add to Home Screen" on Android shows correct app name and icon
- [ ] GitHub Actions shows green on last scrape run
- [ ] Supabase vegetable_prices table has rows dated today

## Scraper SQL Reference
Run this in Supabase SQL editor:

create table if not exists vegetable_prices (
  id bigint generated always as identity primary key,
  name text not null,
  name_np text,
  unit text not null,
  min_price numeric,
  max_price numeric,
  avg_price numeric,
  date date not null,
  scraped_at timestamptz default now(),
  unique(name, date)
);
create index if not exists idx_vp_date on vegetable_prices(date desc);
create index if not exists idx_vp_name on vegetable_prices(name);
create index if not exists idx_vp_name_date on vegetable_prices(name, date desc);

create or replace view today_prices as
  select * from vegetable_prices
  where date = (select max(date) from vegetable_prices);

create or replace view price_trends as
  select name, date, avg_price, min_price, max_price
  from vegetable_prices
  where date >= current_date - interval '30 days'
  order by name, date;

alter table vegetable_prices enable row level security;
create policy "Public read access" on vegetable_prices
  for select to anon, authenticated using (true);
