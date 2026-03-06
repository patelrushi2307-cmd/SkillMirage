import { ApifyClient } from "apify-client";

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
            "india", "bengaluru", "pune", "mumbai", "delhi",
            "hyderabad", "ahmedabad", "jaipur", "indore",
            "nagpur", "lucknow", "chandigarh", "surat"
        ];

        const filteredJobs = items.filter((job: any) =>
            job.location &&
            allowedCities.some(city =>
                job.location.toLowerCase().includes(city)
            )
        );

        return filteredJobs.map((job: any) => ({
            title: job.title,
            company: job.company,
            location: job.location,
            description: job.description,
            postedDate: job.postedDate,
            url: job.url
        })).slice(0, 50);

    } catch (error) {

        console.error("Naukri Job Scraping Error:", error);

        return [];
    }
};