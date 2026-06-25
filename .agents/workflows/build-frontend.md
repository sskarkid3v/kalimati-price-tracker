---
title: build-frontend
description: Builds the Next.js frontend for Kalimati Price Tracker — 
Supabase client, home page price table, item detail chart, compare view, PWA.
---

## Step 1 — Supabase client
Write lib/supabase.js using NEXT_PUBLIC_SUPABASE_URL and 
NEXT_PUBLIC_SUPABASE_ANON_KEY.

## Step 2 — Home page (app/page.jsx)
Server component. Fetch today's prices from Supabase (latest date in DB).
Features: search bar (client-side filter, no API call per keystroke), 
sortable columns, 7-day delta badge (▲/▼ vs 7 days ago), clickable rows → 
/item/[name], friendly empty state showing most recent date if today 
hasn't been scraped yet, sticky header on scroll.

## Step 3 — Item detail (app/item/[name]/page.jsx)
30-day line chart (recharts) — min/max/avg lines, tooltip.
Stats row: 30-day high/low/average.
"Add to compare" button → saves to localStorage (max 3 items).
Floating "Compare (n)" button if any items are selected.

## Step 4 — Compare page (app/compare/page.jsx)
Reads comparison list from localStorage (max 3 items).
Overlapping recharts lines, one per item, distinct colors.
Clear all + individual remove buttons. Empty state prompt.

## Step 5 — PWA
Create public/manifest.json (green theme, short_name: KalimatiRate).
Generate simple vegetable-themed icons (192x192 and 512x512).
Basic service worker caching last fetched price list.
Register service worker in app/layout.jsx.
Show "Offline — showing cached prices" banner when offline.

Commit: "feat: complete Next.js frontend"
