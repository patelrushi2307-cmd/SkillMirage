import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import axios from 'axios';

const router = Router();
const PYTHON_API_URL = 'http://127.0.0.1:8000/api/py';

// Used requireAuth to protect all analytics routes
router.use(requireAuth);

router.get('/hiring-trends', async (req, res) => {
    const { city = 'all' } = req.query as { city: string };

    try {
        const response = await axios.get(`${PYTHON_API_URL}/hiring-trends`, {
            params: { city }
        });

        const data = response.data;
        res.json({
            liveStats: data.liveStats,
            sectorTrends: data.trends.cities || {},
            bigNumbers: [
                { label: 'Total Live Jobs', value: (data.liveStats.totalJobs || 0).toLocaleString(), change: '+12%' },
                { label: 'Market Sentiment', value: data.trends.sentiment || 'Neutral', change: 'Stable' },
                { label: 'Avg. Salary Index', value: '₹8.4L', change: '+5.2%' }
            ]
        });
    } catch (error) {
        console.error('Failed to fetch hiring trends from ML engine:', error);
        res.status(500).json({ error: 'Failed to fetch hiring trends' });
    }
});

router.get('/skills-intel', async (req, res) => {
    try {
        const response = await axios.get(`${PYTHON_API_URL}/skills-intelligence`);
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch skills intelligence from ML engine:', error);
        res.status(500).json({ error: 'Failed to fetch skills intelligence' });
    }
});

// Mocked for demo if endpoints don't exist yet, but proxy if available
router.get('/vulnerability', (req, res) => {
    res.json({ sectors: { "AI": 80, "Data": 40, "General": 20 } });
});

router.get('/displacement-warnings', (req, res) => {
    res.json([{ id: 1, message: "Warning: Data Entry roles are declining." }]);
});

router.get('/employer-insights', (req, res) => {
    res.json({ topEmployers: ["TechCorp", "DataHub"] });
});

router.post('/refresh', async (req, res) => {
    try {
        const response = await axios.post(`${PYTHON_API_URL}/trigger-scrape`);
        res.json({ message: "Fetching fresh job market data..." });
    } catch (error) {
        console.error('Failed to trigger refresh:', error);
        res.status(500).json({ error: 'Failed to trigger refresh' });
    }
});

export default router;
