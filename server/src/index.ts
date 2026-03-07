import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import analyticsRoutes from './routes/analytics';
import workerRoutes from './routes/worker';
import chatRoutes from './routes/chat';
import jobsRoutes from './routes/jobs';
import healthRoutes from './routes/health';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/analytics', analyticsRoutes);
app.use('/api/worker', workerRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/health', healthRoutes);

// TASK 7 - LIVE SCRAPER ENDPOINT
app.get('/api/scrape', async (req, res) => {
    try {
        const axios = require('axios');

        // Trigger Python ML engine scraper
        await axios.post('http://127.0.0.1:8000/api/py/trigger-scrape');

        res.json({
            status: 'success',
            message: 'Scraping job started successfully'
        });

    } catch (error: any) {

        console.error('Scrape trigger error:', error);

        res.status(500).json({
            status: 'error',
            message: 'Failed to trigger scraper'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
