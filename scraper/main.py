import os
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
from datetime import datetime
import sys

# Load environment variables
# Expecting SUPABASE_URL and SUPABASE_SERVICE_KEY
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")

if not supabase_url or not supabase_key:
    print("Missing Supabase credentials. Ensure SUPABASE_URL and SUPABASE_SERVICE_KEY are set.")
    sys.exit(1)

supabase: Client = create_client(supabase_url, supabase_key)

KALIMATI_URL = "https://kalimatimarket.gov.np/price"

def scrape_prices():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        response = requests.get(KALIMATI_URL, headers=headers)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Failed to fetch data from Kalimati market: {e}")
        sys.exit(1)

    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Locate the price table
    table = soup.find('table', id='commodityPriceParticular')
    if not table:
        print("Could not find the price table on the page.")
        sys.exit(1)

    rows = table.find('tbody').find_all('tr') if table.find('tbody') else table.find_all('tr')[1:]
    
    if not rows:
        print("No data rows found in the table. Aborting.")
        sys.exit(1)

    today = datetime.now().date().isoformat()
    records = []

    nepali_to_english = {
        '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
        '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
        'रू': '', ' ': '', ',': ''
    }

    def clean_price(val: str) -> float:
        for nep, eng in nepali_to_english.items():
            val = val.replace(nep, eng)
        return float(val)

    for row in rows:
        cols = row.find_all('td')
        if len(cols) >= 5:
            name = cols[0].text.strip()
            unit = cols[1].text.strip()
            
            try:
                min_price = clean_price(cols[2].text.strip())
                max_price = clean_price(cols[3].text.strip())
                avg_price = clean_price(cols[4].text.strip())
            except ValueError:
                continue

            records.append({
                "name": name,
                "name_np": name,
                "unit": unit,
                "min_price": min_price,
                "max_price": max_price,
                "avg_price": avg_price,
                "date": today
            })

    if not records:
        print("No valid records parsed. Aborting.")
        sys.exit(1)

    print(f"Parsed {len(records)} records. Inserting into Supabase...")

    # Insert into Supabase
    # Using upsert to handle potential duplicates for the same day
    try:
        data, count = supabase.table('vegetable_prices').upsert(records, on_conflict="name,date").execute()
        print(f"Successfully inserted/updated {len(records)} records.")
    except Exception as e:
        print(f"Error inserting into Supabase: {e}")
        sys.exit(1)

if __name__ == "__main__":
    scrape_prices()
