import express from "express";
import { scrapeLinkedInJobs } from "../services/linkedinJobsService";
import { scrapeNaukriJobs } from "../services/naukriJobsService";

const router = express.Router();

router.get("/scrape", async (req, res) => {

    const linkedin = await scrapeLinkedInJobs();
    const naukri = await scrapeNaukriJobs();

    res.json({
        linkedin,
        naukri
    });

});

export default router;