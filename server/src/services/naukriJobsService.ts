import { ApifyClient } from "apify-client";
import { supabase } from "../config/supabase";

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN
});

export const scrapeNaukriJobs = async () => {

    const input = {
        searchUrls: [
            "https://www.naukri.com/data-analyst-jobs-in-india",
            "https://www.naukri.com/software-engineer-jobs-in-india",
            "https://www.naukri.com/bpo-jobs-in-india"
        ],
        maxItems: 50
    };

    try {

        const run = await client
            .actor("easyapi/naukri-jobs-scraper")
            .call(input);

        const { items } = await client
            .dataset(run.defaultDatasetId)
            .listItems();

        const allowedCities = [
            "india","bengaluru","pune","mumbai","delhi",
            "hyderabad","ahmedabad","jaipur","indore",
            "nagpur","lucknow","chandigarh","surat"
        ];

        const filteredJobs = items.filter((job: any) =>
            job.location &&
            allowedCities.some(city =>
                job.location.toLowerCase().includes(city)
            )
        );

        const jobs = filteredJobs.map((job: any) => ({
            title: job.title,
            company: job.company,
            location: job.location,
            description: job.description,
            skills: "communication, teamwork",
            demand_score: Math.floor(Math.random() * 100),
            risk_score: Math.floor(Math.random() * 100)
        })).slice(0,50);

        if (jobs.length > 0) {

            const { error } = await supabase
                .from("jobs_live")
                .insert(jobs);

            if (error) {
                console.error("Supabase Insert Error:", error);
            }

        }

        return jobs;

    } catch (error) {

        console.error("Naukri Job Scraping Error:", error);
        return [];
    }
};