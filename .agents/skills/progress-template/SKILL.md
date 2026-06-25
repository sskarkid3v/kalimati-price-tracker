---
name: progress-template
description: Use this skill when creating PROGRESS.md for the first time 
in the Kalimati Price Tracker project.
---

Create PROGRESS.md in the project root with exactly this content:

# Kalimati Price Tracker — Build Progress

## Session Log
| Session | Date | Agent | Steps Completed | Stopped At |
|---------|------|-------|-----------------|------------|
| 1       |      |       |                 |            |

## Step Status
| Step | Name                         | Status      | Notes |
|------|------------------------------|-------------|-------|
| 2    | Repo & folder structure      | NOT STARTED |       |
| 3    | Supabase schema              | NOT STARTED |       |
| 4    | Scraper script               | NOT STARTED |       |
| 5    | GitHub Actions workflow      | NOT STARTED |       |
| 6    | Frontend                     | NOT STARTED |       |
| 6a   | Supabase client              | NOT STARTED |       |
| 6b   | Home page price table        | NOT STARTED |       |
| 6c   | Item detail + trend chart    | NOT STARTED |       |
| 6d   | Compare view                 | NOT STARTED |       |
| 6e   | PWA manifest + service worker| NOT STARTED |       |
| 7    | Deployment                   | NOT STARTED |       |
| 8    | Smoke test                   | NOT STARTED |       |

## Decisions & Config
- Supabase project URL: [FILL IN]
- Supabase anon key (safe to log — read-only): [FILL IN]
- Vercel project URL: [FILL IN]
- GitHub repo URL: [FILL IN]
- HTML table selector used in scraper: [FILL IN after inspecting live site]
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

Then run /build to start the project.
