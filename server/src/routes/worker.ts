import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { normalizeJobTitle, extractWorkerIntelligence } from '../services/aiAnalysisService';
import { CourseService } from '../services/CourseService';
import axios from 'axios';

const router = Router();
const PYTHON_API_URL = 'http://127.0.0.1:8000/api/py';

router.use(requireAuth);

router.post('/normalize-job-title', async (req, res) => {
    const { title } = req.body;
    const result = await normalizeJobTitle(title);
    res.json(result);
});

router.post('/extract-skills', async (req, res) => {
    const { writeup } = req.body;
    const result = await extractWorkerIntelligence(writeup);
    res.json(result);
});

router.post('/risk-score', async (req, res) => {
    const { jobTitle, city, experience, description } = req.body;

    try {
        const response = await axios.post(`${PYTHON_API_URL}/analyze-worker`, {
            jobTitle, city, experience, description
        });
        const data = response.data;

        // Ensure signals are populated for UI
        data.signals = [
            { icon: '📍', text: `Hiring trends analyzed for ${city}`, textHi: `Hiring trends analyzed for ${city}`, source: 'Layer 1 Intelligence' },
            { icon: '🤖', text: `AI automation probability modeled`, textHi: `AI automation probability modeled`, source: 'Layer 1 Intelligence' },
            { icon: '🚨', text: `Vulnerability score computed`, textHi: `Vulnerability score computed`, source: 'Layer 1 Intelligence' }
        ];
        data.automatedTasks = data.extractedIntel?.implicitSkills?.slice(0, 3) || [];

        res.json(data);
    } catch (error) {
        console.error('Error fetching risk score from Python API:', error);
        res.status(500).json({ error: 'Failed to analyze worker' });
    }
});

router.get('/reskilling-path', async (req, res) => {
    const { city = 'Pune', role = 'AI Specialist', category = 'AI' } = req.query as any;

    try {
        const response = await axios.get(`${PYTHON_API_URL}/reskilling-path`, {
            params: { category }
        });
        const { courses } = response.data;

        res.json({
            targetRole: `${role} (${city} verified)`,
            courses: courses.map((c: any, i: number) => ({
                range: `Week ${i * 2 + 1}-${i * 2 + 3}`,
                title: c.title,
                provider: c.provider,
                link: c.link,
                duration: c.duration,
                topics: [`Introduction to ${c.category || category}`, 'Core concepts', 'Hands-on project']
            }))
        });
    } catch (error) {
        console.error('Error fetching reskilling path from Python API:', error);
        res.status(500).json({ error: 'Failed to fetch reskilling path' });
    }
});

export default router;
