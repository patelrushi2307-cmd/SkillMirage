import { Router } from 'express';
import { scrapeLinkedInJobs } from '../services/linkedinJobsService';
import { scrapeNaukriJobs } from '../services/naukriJobsService';
import { analyzeJobDescription } from '../services/aiAnalysisService';

const router = Router();

// New enrichment endpoint
router.post('/analyze-job', async (req, res) => {
    const { jobDescription, userSkills = [] } = req.body;
    if (!jobDescription) {
        return res.status(400).json({ error: 'jobDescription is required' });
    }

    try {
        const analysis = await analyzeJobDescription(jobDescription, userSkills);
        res.json(analysis);
    } catch (error: any) {
        res.status(500).json({ error: 'Analysis failed', details: error.message });
    }
});

// TASK 9 - ML MODEL PREDICTION API
router.post('/analyze-skills', async (req, res) => {
    const { jobDescription, userSkills = [] } = req.body;
    if (!jobDescription) {
        return res.status(400).json({ error: 'jobDescription is required' });
    }

    try {
        const analysis = await analyzeJobDescription(jobDescription, userSkills);
        res.json({
            skillGap: analysis.missingSkills,
            recommendedSkills: analysis.requiredSkills,
            learningSuggestions: analysis.skillSummary
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Analysis failed', details: error.message });
    }
});

import { supabase } from '../config/supabase';

router.get('/', async (req, res) => {
    try {
        const userSkills = (req.query.skills as string || '').split(',').filter(Boolean);

        // Fetch latest 10 jobs from DB instead of live scraping
        const { data: liveJobs, error } = await supabase
            .from('jobs_live')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) {
            throw error;
        }

        const rawJobs = liveJobs || [];

        if (rawJobs.length === 0) {
            return res.json({ count: 0, jobs: [] });
        }

        const enrichedJobs = await Promise.all(rawJobs.map(async (job) => {
            try {
                const description = job.job_description || job.title || '';
                const aiAnalysis = await analyzeJobDescription(description, userSkills);

                return {
                    id: job.id,
                    title: job.job_title,
                    company: job.company,
                    location: job.location || job.city || 'India',
                    description: job.job_description,
                    url: job.job_url || '#',
                    source: job.source || 'SkillMirage Live',
                    postedAt: new Date(job.created_at).toLocaleDateString(),
                    skills: job.skills || [],
                    aiRequiredSkills: aiAnalysis.requiredSkills || [],
                    aiMissingSkills: aiAnalysis.missingSkills || [],
                    aiSummary: aiAnalysis.skillSummary || "Summary unavailable."
                };
            } catch (err) {
                console.error('Individual job enrichment failed:', err);
                return {
                    ...job,
                    title: job.job_title,
                    company: job.company,
                    location: job.location || job.city || 'India',
                    aiRequiredSkills: [],
                    aiMissingSkills: [],
                    aiSummary: "AI analysis failed for this job."
                };
            }
        }));

        res.json({
            count: enrichedJobs.length,
            jobs: enrichedJobs
        });
    } catch (error: any) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs', details: error.message });
    }
});

export default router;
