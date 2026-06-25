---
title: build
description: Full build workflow for Kalimati Price Tracker — database, 
scraper, frontend, and deployment. Reads PROGRESS.md first to resume if interrupted.
---

## Step 1 — Resume check
Read PROGRESS.md. If it exists, identify the last completed step and resume 
from the next incomplete one. Do not redo completed steps. If PROGRESS.md does 
not exist, create it from the template in .agents/skills/progress-template/ 
and start from Step 2.

## Step 2 — Scaffold
Create the folder structure:
scraper/, app/, lib/, public/icons/, .github/workflows/, .agents/
Create PROGRESS.md and DECISIONS.md in project root.
Commit: "chore: initialize project structure"
Mark Step 2 DONE in PROGRESS.md.

## Step 3 — Database
Generate the Supabase SQL (vegetable_prices table, indexes, RLS policy, 
today_prices and price_trends views). Output it as a ready-to-run SQL block 
with instructions for the user to paste into Supabase SQL editor.
⚠️ MANUAL STEP: Wait for user to confirm schema is applied before continuing.
Mark Step 3 DONE in PROGRESS.md.

## Step 4 — Scraper
Write scraper/fetch_prices.py and scraper/requirements.txt.
⚠️ MANUAL STEP: Flag that the HTML table selector needs user to inspect the 
live site and paste the relevant HTML. Record confirmed selector in PROGRESS.md.
Mark Step 4 DONE in PROGRESS.md.

## Step 5 — Automation
Write .github/workflows/scrape.yml (cron: 00:15 UTC daily + workflow_dispatch).
⚠️ MANUAL STEP: Instruct user to add SUPABASE_URL and SUPABASE_SERVICE_KEY 
as GitHub repository secrets.
Mark Step 5 DONE in PROGRESS.md.

## Step 6 — Frontend
Call /build-frontend workflow.
Mark Step 6 DONE in PROGRESS.md.

## Step 7 — Deploy
Call /deploy workflow.
Mark Step 7 DONE in PROGRESS.md.

## Step 8 — Smoke test
Run through the checklist in PROGRESS.md smoke test section.
Final commit: "chore: smoke test complete — v1.0 live"
