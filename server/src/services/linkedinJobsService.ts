import { ApifyClient } from "apify-client";
import { supabase } from "../config/supabase";

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN
});

export const scrapeLinkedInJobs = async () => {

    const input = {
        keywords: "software engineer OR data analyst OR BPO",
        location: "India",
        maxItems: 50,
        proxy: {
            useApifyProxy: true
        }
    };

    try {

        const run = await client
            .actor("bebity/linkedin-jobs-scraper")
            .call(input);

        const { items } = await client
            .dataset(run.defaultDatasetId)
            .listItems();

        const allowedCities = [
            "india","bengaluru","pune","mumbai","delhi",
            "hyderabad","ahmedabad","jaipur","indore",
            "nagpur","lucknow","chandigarh"
        ];

        const filteredJobs = items.filter((job: any) =>
            job.location &&
            allowedCities.some(city =>
                job.location.toLowerCase().includes(city)
            )
        );

        const jobs = filteredJobs.map((job: any) => ({
            title: job.title,
            company: job.companyName,
            location: job.location,
            description: job.description,
            skills: "communication, teamwork", // placeholder
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

        console.error("LinkedIn Job Scraping Error:", error);
        return [];
    }
};