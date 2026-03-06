import os
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from dotenv import load_dotenv
from supabase import create_client, Client
import uvicorn

from scraper import scrape_jobs
from ml_engine import (
    extract_skills_with_spacy,
    analyze_hiring_trends,
    compute_risk_score,
    get_reskilling_path
)

load_dotenv()

app = FastAPI(title="SkillMirage Intelligence Pipeline")

# ==========================
# SUPABASE CONNECTION
# ==========================

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Supabase environment variables missing!")

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("Supabase connected successfully")
except Exception as e:
    supabase = None
    print(f"Failed to initialize Supabase client: {e}")


# ==========================
# DATA MODELS
# ==========================

class WorkerProfile(BaseModel):
    jobTitle: str
    city: str
    experience: int
    description: str


# ==========================
# HIRING TRENDS API
# ==========================

@app.get("/api/py/hiring-trends")
def get_hiring_trends(city: str = "all"):

    if not supabase:
        raise HTTPException(status_code=500, detail="Database connection failed")

    base_res = supabase.table("jobs_base").select("*").execute()
    live_res = supabase.table("jobs_live").select("*").execute()

    base_jobs = base_res.data or []
    live_jobs = live_res.data or []

    jobs = base_jobs + live_jobs

    if city and city.lower() != "all":
        jobs = [j for j in jobs if j.get("city", "").lower() == city.lower()]

    trends = analyze_hiring_trends(jobs)

    return {
        "liveStats": {
            "totalJobs": trends.get("totalJobs", 0),
            "activeScrapers": ["Naukri", "LinkedIn"],
            "cityDistribution": trends.get("cities", {})
        },
        "trends": trends
    }


# ==========================
# SKILLS INTELLIGENCE API
# ==========================

@app.get("/api/py/skills-intelligence")
def get_skills_intelligence():

    if not supabase:
        raise HTTPException(status_code=500, detail="Database connection failed")

    live_res = supabase.table("jobs_live").select("job_description").limit(20).execute()

    descriptions = [
        j["job_description"]
        for j in (live_res.data or [])
        if j.get("job_description")
    ]

    all_skills = []

    for desc in descriptions:
        skills = extract_skills_with_spacy(desc)
        all_skills.extend(skills)

    return {
        "top_rising_skills": list(set(all_skills))[:5],
        "status": "success"
    }


# ==========================
# WORKER RISK ANALYSIS
# ==========================

@app.post("/api/py/analyze-worker")
def check_worker_risk(profile: WorkerProfile):

    desc = profile.description.lower()

    automation_prob = 80.0 if "data entry" in desc else 40.0
    ai_tool_mentions = 60.0 if "gpt" in desc or "ai" in desc else 10.0
    hiring_decline = 50.0

    risk = compute_risk_score(
        hiring_decline,
        ai_tool_mentions,
        automation_prob
    )

    category = "AI" if "ai" in desc or "developer" in profile.jobTitle.lower() else "General"

    intel_skills = extract_skills_with_spacy(profile.description)

    return {
        "score": round(risk, 2),
        "level": "critical" if risk >= 80 else "high" if risk >= 60 else "medium" if risk >= 40 else "low",
        "category": category,
        "percentile": round(min(99, risk + 5), 2),
        "normalizedTitle": profile.jobTitle,
        "extractedIntel": {
            "implicitSkills": intel_skills,
            "coreMatch": "Moderate"
        }
    }


# ==========================
# RESKILLING PATH API
# ==========================

@app.get("/api/py/reskilling-path")
def reskilling_path(category: str = "General"):

    courses = get_reskilling_path(category)

    return {
        "courses": courses
    }


# ==========================
# TRIGGER SCRAPER
# ==========================

@app.post("/api/py/trigger-scrape")
def trigger_live_scrape(background_tasks: BackgroundTasks):

    try:
        background_tasks.add_task(scrape_jobs)
        return {"message": "Fetching fresh job market data..."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==========================
# DATA HEALTH CHECK
# ==========================

@app.get("/api/py/data-status")
def data_status():

    if not supabase:
        return {"status": "Database connection error"}

    try:
        live = supabase.table("jobs_live").select("id", count="exact").execute()
        base = supabase.table("jobs_base").select("id", count="exact").execute()

        live_count = live.count or 0
        base_count = base.count or 0

        if live_count == 0:
            return {
                "status": "Live job data source not configured. Falling back to Kaggle dataset."
            }

        return {
            "status": f"Healthy: {live_count} live jobs, {base_count} historical jobs."
        }

    except Exception:
        return {"status": "Database connection error"}


# ==========================
# SERVER START
# ==========================

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)