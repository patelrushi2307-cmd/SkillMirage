import os
import pandas as pd
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_ANON_KEY")

try:
    supabase: Client = create_client(url, key)
except Exception as e:
    print(f"Failed to connect to Supabase: {e}")
    exit(1)

def load_dataset(csv_path: str):
    """
    Load jobs from Kaggle CSV into jobs_base.
    Expected columns: job_title, company, city, skills, experience, salary, job_description
    """
    if not os.path.exists(csv_path):
        print(f"Error: Dataset {csv_path} not found.")
        print("Please place your Naukri Kaggle dataset here and update the filename.")
        return

    try:
        df = pd.read_csv(csv_path)
        # Assuming typical column names, map them if necessary
        # Keep only first 1000 to avoid massive insert delays in free tier
        records = df.head(1000).to_dict(orient='records')
        
        inserted = 0
        for rec in records:
            job_data = {
                "job_title": str(rec.get("job_title", "Unknown Role")),
                "company": str(rec.get("company", "Unknown")),
                "city": str(rec.get("city", "Unknown")),
                "skills": str(rec.get("skills", "")).split(","),
                "experience": str(rec.get("experience", "0-1 Years")),
                "salary": str(rec.get("salary", "Not Disclosed")),
                "job_description": str(rec.get("job_description", ""))
            }
            try:
                supabase.table('jobs_base').insert(job_data).execute()
                inserted += 1
            except Exception as e:
                pass
                
        print(f"Successfully loaded {inserted} jobs into jobs_base!")
        
    except Exception as e:
        print(f"Failed to process dataset: {e}")

if __name__ == "__main__":
    load_dataset("../Data/naukri_kaggle_dataset.csv") 
