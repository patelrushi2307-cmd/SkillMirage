# Skill Mirage - Data Intelligence Pipeline

## Architecture Overview

This project is a job-intelligence platform that uses live job listings to detect skill gaps. 
The system operates on an automated data pipeline running seamlessly between our Node.js Gateway and Python ML Microservice.

### End-to-End Flow

**User Request**
↓
**Backend API (Node.js/Express)** 
Acts as the central gateway handling authentication and routing requests.
↓
**Job Scraper (Python/BeautifulSoup)**
Triggered automatically or via `/api/scrape`. Fetches live job data (title, company, location, descriptions).
↓
**Database Storage (Supabase PostgreSQL)**
Stores raw job listings (`jobs_raw` / `jobs_live`), cleaned data (`jobs_clean`), user profiles (`users`), and skill analytics (`skill_analysis`).
↓
**ML Skill Analysis (Python/spaCy & scikit-learn)**
The ML service preprocesses job descriptions, extracts explicit/implicit skills, and calculates displacement risk (Vulnerability Index).
↓
**Recommendations Engine**
Compares user's existing skills with market demand to generate a personalized reskilling path.
↓
**Dashboard Visualization (React)**
The frontend dashboard consumes these APIs to display live hiring trends, critical skill shortages, and actionable risk analyses.

---

## Technical Details

### 1. Where the ML Pipeline is Located
All Machine Learning and Data processing logic is encapsulated within the `server/python_pipeline/` directory.
- `python_pipeline/scraper.py`: Handles active web scraping and fallback mock generation.
- `python_pipeline/ml_engine.py`: Contains NLP logic (spaCy) for skill extraction, and statistical scoring for the AI Risk Index.
- `python_pipeline/main.py`: A native FastAPI server exposing Python's capabilities directly to the Node Gateway.

### 2. Where Data is Stored
Data is securely stored in a remote **Supabase (PostgreSQL)** database.
The main operations occur across:
- `jobs_base` (For historical Kaggle datasets)
- `jobs_live` (For live-scraped jobs)
- `users` (For authenticated worker profiles)
- `skills_base` (For standardizing extracted entity relationships)

*(You can simulate `jobs_raw`, `jobs_clean`, `skill_analysis` via the pipeline processing states saving to `jobs_live`)*

### 3. How the Frontend Connects to the Backend
The React frontend (in `client/`) interacts entirely through the Express API layer (running on port `3001`). 
- **Endpoint Example:** A fetch to `/api/jobs/analyze-skills` on the Node server gets proxied/handled to communicate with either Supabase directly or the local `/api/py/...` Python service on port `8000`.
- **CORS** is properly enabled on the backend to allow requests from the React frontend (`localhost:5173`).

### 4. How the Scraper Works
Located in `server/ml/scraper.py`.
- It uses `BeautifulSoup4` and `requests` to fetch the latest job listings.
- If scraping fails (e.g., CAPTCHA limits), it gracefully drops back to robust mock implementations to prevent dashboard failure.
- Processed listings are immediately written into the Supabase database.
- Easily invoked manually via `POST /api/scrape` in the Node backend.

### 5. How the ML Model Works
- **Inputs**: It accepts a worker's description of their job and their current explicit skills string.
- **Processing**: We use `spaCy` (NLP) to perform Named Entity Recognition (NER), mapping text blocks into structured skill lists.
- **Scoring**: A mathematical function analyzes specific structural keywords against historical layoff/AI automation parameters to generate a 0-100 `Risk Score` (Vulnerability Index).
- **Matching**: The model diffs the 'Market Demand Skills' against the 'User Skills' to surface the precise `skillGap` and `recommendedSkills`.

---

## Final Run Commands
The entire platform is automated using `concurrently`. Simply run:

**Backend:**
\`\`\`bash
cd server
npm run dev
\`\`\`
*(This automatically boots the Express Node.js Server AND the FastAPI Python ML Server simultaneously).*

**Frontend:**
\`\`\`bash
cd client
npm run dev
\`\`\`
