import { ApifyClient } from 'apify-client';
import dotenv from 'dotenv';

dotenv.config();

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN || '',
});

export const fetchNaukriJobs = async (query = {}, city = 'all') => {
    if (!process.env.APIFY_TOKEN || process.env.APIFY_TOKEN === 'your_apify_token_here') {
        console.warn('APIFY_TOKEN not set, returning empty results');
        return [];
    }

    try {
        const input = {
            searchQuery: city !== 'all' ? `${city} jobs` : "jobs in India",
            ...query
        };
        // Using "easyapi/naukri-jobs-scraper" as per user request
        const run = await client.actor("easyapi/naukri-jobs-scraper").call(input);
        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        return items;
    } catch (error) {
        console.error('Error fetching Naukri jobs:', error);
        return [];
    }
};

export const fetchLinkedInJobs = async (companyNames: string[] = ["Google", "Microsoft"]) => {
    if (!process.env.APIFY_TOKEN || process.env.APIFY_TOKEN === 'your_apify_token_here') {
        console.warn('APIFY_TOKEN not set, returning empty results');
        return [];
    }

    try {
        const input = {
            "companyName": companyNames,
            "companyId": [
                "76987811",
                "1815218"
            ],
            "proxy": {
                "useApifyProxy": true,
                "apifyProxyGroups": [
                    "RESIDENTIAL"
                ]
            }
        };
        // Using "bebity/linkedin-jobs-scraper" as per user request
        const run = await client.actor("bebity/linkedin-jobs-scraper").call(input);
        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        return items;
    } catch (error) {
        console.error('Error fetching LinkedIn jobs:', error);
        return [];
    }
};

export const getAggregatedJobMarketStats = async (city = 'all') => {
    // This function will combine results and return stats for the dashboard
    const naukriJobs = await fetchNaukriJobs({}, city);

    // Simple aggregation logic for demonstration
    const totalJobs = naukriJobs.length;
    const techJobs = naukriJobs.filter((job: any) => job.category?.toLowerCase().includes('tech') || job.title?.toLowerCase().includes('software')).length;
    const bpoJobs = naukriJobs.filter((job: any) => job.category?.toLowerCase().includes('bpo') || job.title?.toLowerCase().includes('voice') || job.title?.toLowerCase().includes('call')).length;

    return {
        totalJobs,
        techJobs,
        bpoJobs,
        timestamp: new Date().toISOString()
    };
};
