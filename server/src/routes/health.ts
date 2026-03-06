import { Router } from 'express';
import { supabase } from '../config/supabase';
import axios from 'axios';

const router = Router();
const PYTHON_API_URL = 'http://127.0.0.1:8000/api/py';

router.get('/', async (req, res) => {
    const healthData = {
        status: 'ok',
        database: 'unknown',
        ml: 'unknown',
        scraper: 'unknown'
    };

    // Check DB
    try {
        const { error } = await supabase.from('jobs_base').select('id').limit(1);
        healthData.database = error ? 'error' : 'connected';
    } catch {
        healthData.database = 'error';
    }

    // Check ML & Scraper (Python API)
    try {
        const pyRes = await axios.get(`${PYTHON_API_URL}/data-status`);
        healthData.ml = 'connected';
        // Simple heuristic: if Python API is up, scraper is ready since they are bundled
        healthData.scraper = 'ready';
    } catch {
        healthData.ml = 'disconnected';
        healthData.scraper = 'disconnected';
    }

    res.json(healthData);
});

export default router;
