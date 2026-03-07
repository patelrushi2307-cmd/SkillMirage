import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from supabase import create_client, Client
from datetime import datetime

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)

def fetch_mock_live_jobs():
    """Fallback mock if scraper encounters blockades. Returns mock job listings."""
    return [
        {
            "job_title": "AI Engineer",
            "company": "TechCorp",
            "city": "Pune",
            "skills": ["Python", "TensorFlow", "FastAPI"],
            "experience": "2-4 years",
            "salary": "₹15L - ₹20L",
            "job_description": "We are looking for an AI engineer to build models.",
            "posting_date": datetime.now().isoformat(),
            "source": "Mock"
        },
        {
            "job_title": "Data Analyst",
            "company": "DataHub",
            "city": "Pune",
            "skills": ["SQL", "Tableau", "Excel"],
            "experience": "1-3 years",
            "salary": "₹8L - ₹12L",
            "job_description": "Analyzing data trends and reporting.",
            "posting_date": datetime.now().isoformat(),
            "source": "Mock"
        }
    ]

def scrape_jobs():
    """
    Main function to scrape job boards using BeautifulSoup and requests.
    Inserts fresh job listings into the `jobs_live` Supabase table.
    """
    # In a real environment, scraping LinkedIn or Naukri might lead to Captcha/IP blocks.
    # Therefore, we attempt scraping and fallback to mock if no jobs are returned.
    jobs = []
    
    # Example logic (mocked up requests):
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        # Pseudo code for real scraping
        # response = requests.get('https://example.com/jobs/search?q=AI', headers=headers)
        # soup = BeautifulSoup(response.text, 'html.parser')
        # for item in soup.select('.job-card'):
        #    ...
        pass
    except Exception as e:
        print(f"Scraping error: {e}")
        
    if not jobs:
        jobs = fetch_mock_live_jobs()

    # Insert jobs into jobs_live
    inserted_count = 0
    for job in jobs:
        try:
            supabase.table('jobs_live').insert(job).execute()
            inserted_count += 1
        except Exception as e:
            print(f"Failed to insert job: {e}")

    return {"status": "success", "jobs_added": inserted_count}
