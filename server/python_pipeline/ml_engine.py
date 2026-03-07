import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import spacy
from typing import List, Dict, Any

# Load lightweight spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import subprocess
    subprocess.call(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

def extract_skills_with_spacy(description: str) -> List[str]:
    """Extract skills from text (simplistic named entity/noun phrase extraction)."""
    if not description:
        return []
    doc = nlp(description)
    # Filter specific POS tags likely resembling tools/skills
    skills = [chunk.text for chunk in doc.noun_chunks if 3 <= len(chunk.text) <= 20]
    # Simple deduplication
    return list(set([s.lower().strip() for s in skills]))

def compute_risk_score(hiring_decline: float, ai_tool_mentions: float, automation_prob: float) -> float:
    """Calculate Vulnerability Index Risk Score."""
    score = (0.4 * hiring_decline) + (0.3 * ai_tool_mentions) + (0.3 * automation_prob)
    return min(100.0, max(0.0, score))

def analyze_hiring_trends(jobs_data: List[Dict]) -> Dict:
    """Compute hiring trends from historical and live jobs."""
    if not jobs_data:
        return {"totalJobs": 0, "trends": "No data"}
    
    df = pd.DataFrame(jobs_data)
    total_jobs = len(df)
    
    # Example logic using pandas
    city_counts = df.get('city', pd.Series([])).value_counts().to_dict()
    
    return {
        "totalJobs": total_jobs,
        "cities": city_counts,
        "sentiment": "Positive" if total_jobs > 0 else "Neutral"
    }

def get_reskilling_path(category: str) -> List[Dict]:
    """Generates recommendations based on job category."""
    paths = {
        "AI": [
            {"title": "Deep Learning Specialization", "provider": "Coursera", "duration": "4 weeks", "link": "#"},
            {"title": "Python for Data Science", "provider": "NPTEL", "duration": "6 weeks", "link": "#"},
        ],
        "General": [
            {"title": "Introduction to Programming", "provider": "SWAYAM", "duration": "4 weeks", "link": "#"}
        ]
    }
    return paths.get(category, paths["General"])
