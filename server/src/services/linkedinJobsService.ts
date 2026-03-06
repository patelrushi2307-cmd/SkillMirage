import { ApifyClient } from "apify-client";

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
            "india", "bengaluru", "pune", "mumbai", "delhi",
            "hyderabad", "ahmedabad", "jaipur", "indore",
            "nagpur", "lucknow", "chandigarh"
        ];

        const filteredJobs = items.filter((job: any) =>
            job.location &&
            allowedCities.some(city =>
                job.location.toLowerCase().includes(city)
            )
        );

        return filteredJobs.map((job: any) => ({
            title: job.title,
            company: job.companyName,
            location: job.location,
            description: job.description,
            postedDate: job.postedTime,
            url: job.jobUrl
        })).slice(0, 50);

    } catch (error) {

        console.error("LinkedIn Job Scraping Error:", error);

        return [];
    }
};