import os
from dotenv import load_dotenv
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import uvicorn

from scraper import scrape_jobs
from ml_engine import (
    extract_skills_with_spacy,
    analyze_hiring_trends,
    get_reskilling_path
)

load_dotenv()

# ==========================
# FASTAPI
# ==========================

app = FastAPI(title="SkillMirage Intelligence Pipeline")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# SUPABASE
# ==========================

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

supabase: Client = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Supabase connected successfully")
    except Exception as e:
        print(f"Failed to initialize Supabase client: {e}")
        supabase = None
else:
    print("Supabase environment variables not set")

# ==========================
# DATA MODEL
# ==========================

class WorkerProfile(BaseModel):
    jobTitle: str
    city: str
    experience: int
    description: str


# ==========================
# CITY RISK FACTOR
# ==========================

def city_risk(city):

    city = city.lower()

    tier1 = [
        "bangalore","mumbai","delhi","hyderabad","chennai",
        "pune","kolkata","ahmedabad"
    ]

    tier2 = [
        "jaipur","indore","chandigarh","lucknow","surat",
        "coimbatore","nagpur","bhopal","kochi","bhubaneswar"
    ]

    tier3 = [
        "patna","ranchi","dehradun","guwahati","jodhpur",
        "udaipur","mysore","trichy","vijayawada","visakhapatnam"
    ]

    additional = [
        "vadodara","rajkot","ludhiana","amritsar","kanpur",
        "agra","meerut","nashik","aurangabad","thane",
        "gwalior","jabalpur","siliguri","durgapur","tirupati",
        "warangal","madurai","salem","kozhikode","hubli",
        "mangalore","panaji"
    ]

    if city in tier1:
        return -10

    if city in tier2:
        return -5

    if city in tier3:
        return 5

    if city in additional:
        return 0

    return 8

# ==========================
# JOB AUTOMATION RISK
# ==========================

def job_risk(title):

    title = title.lower()

    if "data entry" in title:
        return 80

    if "bpo" in title:
        return 65

    if "account" in title:
        return 60

    if "web developer" in title:
        return 35

    if "software" in title:
        return 30

    if "ai engineer" in title:
        return 20

    if "data scientist" in title:
        return 25

    return 50


# ==========================
# EXPERIENCE PROTECTION
# ==========================

def experience_factor(exp):

    if exp <= 1:
        return 15

    if exp <= 3:
        return 5

    if exp <= 5:
        return -5

    if exp <= 10:
        return -10

    return -15


# ==========================
# DESCRIPTION AI IMPACT
# ==========================

def description_risk(desc):

    desc = desc.lower()

    risk = 0

    if "excel" in desc:
        risk += 5

    if "automation" in desc:
        risk += 10

    if "ai" in desc:
        risk -= 5

    if "machine learning" in desc:
        risk -= 10

    if "python" in desc:
        risk -= 5

    return risk


# ==========================
# WORKER RISK ENGINE
# ==========================

@app.post("/api/py/analyze-worker")
def check_worker_risk(profile: WorkerProfile):

    base_risk = job_risk(profile.jobTitle)

    city_adj = city_risk(profile.city)

    exp_adj = experience_factor(profile.experience)

    desc_adj = description_risk(profile.description)

    score = base_risk + city_adj + exp_adj + desc_adj

    score = max(10, min(score, 95))

    if score >= 80:
        level = "critical"

    elif score >= 60:
        level = "high"

    elif score >= 40:
        level = "medium"

    else:
        level = "low"

    return {
        "score": score,
        "level": level,
        "signals": [
            {"text": f"Base automation risk for job: {base_risk}%"},
            {"text": f"City market adjustment: {city_adj}"},
            {"text": f"Experience protection: {exp_adj}"},
            {"text": f"Skill signals from description: {desc_adj}"}
        ],
        "category": "AI" if "ai" in profile.jobTitle.lower() else "General",
        "normalizedTitle": profile.jobTitle,
        "percentile": min(99, score + 10)
    }


# ==========================
# RESKILLING PATH
# ==========================

@app.get("/api/py/reskilling-path")
def reskilling_path(category: str = "General"):

    return {
        "courses": get_reskilling_path(category)
    }


# ==========================
# SCRAPER TRIGGER
# ==========================

@app.post("/api/py/trigger-scrape")
def trigger_live_scrape(background_tasks: BackgroundTasks):

    background_tasks.add_task(scrape_jobs)

    return {"message": "Fetching fresh job market data..."}


# ==========================
# DATA STATUS
# ==========================

@app.get("/api/py/data-status")
def data_status():

    if not supabase:
        return {
            "status": "Database connection not available"
        }

    try:
        live = supabase.table("jobs_live").select("id", count="exact").execute()
        base = supabase.table("jobs_base").select("id", count="exact").execute()

        return {
            "status": f"Healthy: {live.count} live jobs, {base.count} historical jobs"
        }
    except Exception as e:
        return {
            "status": f"Database error: {str(e)}"
        }


# ==========================
# START SERVER
# ==========================

if __name__ == "__main__":

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
# HIRING TRENDS API
# ==========================

@app.get("/api/py/hiring-trends")
def get_hiring_trends(city: str = "all"):

    if not supabase:
        return {
            "liveStats": {
                "totalJobs": 0,
                "activeScrapers": [],
                "cityDistribution": {}
            },
            "trends": {"totalJobs": 0, "trends": "Database not connected"}
        }

    try:
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
    except Exception as e:
        return {
            "liveStats": {
                "totalJobs": 0,
                "activeScrapers": [],
                "cityDistribution": {}
            },
            "trends": {"totalJobs": 0, "trends": f"Database error: {str(e)}"}
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