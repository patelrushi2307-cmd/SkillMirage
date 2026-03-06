import os
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from dotenv import load_dotenv
from supabase import create_client, Client
import uvicorn

from scraper import scrape_jobs
from ml_engine import extract_skills_with_spacy, analyze_hiring_trends, compute_risk_score, get_reskilling_path

load_dotenv()

app = FastAPI(title="SkillMirage Intelligence Pipeline")

# Supabase init
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_ANON_KEY")

try:
    supabase: Client = create_client(url, key)
except Exception as e:
    supabase = None
    print(f"Failed to initialize Supabase client: {e}")

class WorkerProfile(BaseModel):
    jobTitle: str
    city: str
    experience: int
    description: str

@app.get("/api/py/hiring-trends")
def get_hiring_trends(city: str = 'all'):
    """Layer 1 API: Fetches trends from DB + ML Engine."""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database connection failed")
        
    # Combine static base jobs + live jobs
    base_res = supabase.table('jobs_base').select('*').execute()
    live_res = supabase.table('jobs_live').select('*').execute()
    
    jobs = base_res.data + live_res.data
    if city and city.lower() != 'all':
        jobs = [j for j in jobs if j.get('city', '').lower() == city.lower()]
        
    trends = analyze_hiring_trends(jobs)
    return {
        "liveStats": {
            "totalJobs": trends.get("totalJobs", 0),
            "activeScrapers": ["Naukri", "LinkedIn"],
            "cityDistribution": trends.get("cities", {})
        },
        "trends": trends
    }

@app.get("/api/py/skills-intelligence")
def get_skills_intelligence():
    """Layer 1 API: Returns skills insights."""
    live_res = supabase.table('jobs_live').select('job_description').limit(20).execute()
    descriptions = [j['job_description'] for j in live_res.data if j.get('job_description')]
    
    all_skills = []
    for d in descriptions:
        all_skills.extend(extract_skills_with_spacy(d))
        
    return {
        "top_rising_skills": list(set(all_skills))[:5],
        "status": "success"
    }

@app.post("/api/py/analyze-worker")
def check_worker_risk(profile: WorkerProfile):
    """Layer 2 API: Processes risk score and automated AI evaluation."""
    # Heuristics for demo risk score
    # Automation prob relies on "data", "admin", "clerical" keywords vs "strategy", "creative"
    desc = profile.description.lower()
    
    automation_prob = 80.0 if "data entry" in desc else 40.0
    ai_tool_mentions = 60.0 if "gpt" in desc or "ai" in desc else 10.0
    hiring_decline = 50.0 # Random mock baseline 
    
    risk = compute_risk_score(hiring_decline, ai_tool_mentions, automation_prob)
    category = "AI" if "ai" in desc or "developer" in profile.jobTitle.lower() else "General"
    
    # Extract intel
    intel_skills = extract_skills_with_spacy(profile.description)
    
    return {
        "score": round(risk, 2),
        "level": 'critical' if risk >= 80 else 'high' if risk >= 60 else 'medium' if risk >= 40 else 'low',
        "category": category,
        "percentile": round(min(99, risk + 5), 2),
        "normalizedTitle": profile.jobTitle,
        "extractedIntel": {
            "implicitSkills": intel_skills,
            "coreMatch": "Moderate"
        }
    }

@app.get("/api/py/reskilling-path")
def reskilling_path(category: str = "General"):
    """Layer 2 API: Reskilling roadmap"""
    return {"courses": get_reskilling_path(category)}

@app.post("/api/py/trigger-scrape")
def trigger_live_scrape(background_tasks: BackgroundTasks):
    """Trigger the live jobs scraper manually."""
    background_tasks.add_task(scrape_jobs)
    return {"message": "Fetching fresh job market data..."}

@app.get("/api/py/data-status")
def data_status():
    """Check dataset fallback."""
    try:
        live = supabase.table('jobs_live').select('id', count='exact').execute()
        base = supabase.table('jobs_base').select('id', count='exact').execute()
        
        has_live = live.count > 0
        has_base = base.count > 0
        
        if not has_live:
            return {"status": "Live job data source not configured. Please connect scraper. Falling back to Kaggle dataset."}
        return {"status": f"Healthy: {live.count} live jobs, {base.count} historical jobs."}
    except Exception as e:
        return {"status": "Database connection error"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
