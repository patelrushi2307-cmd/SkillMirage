import axios from 'axios';
import * as cheerio from 'cheerio';

export interface Course {
    id: string;
    title: string;
    provider: string;
    duration: string;
    link: string;
    category: string;
}

export class CourseService {
    private static courses: Course[] = [
        { id: 'n1', title: 'Data Science for Engineers', provider: 'IIT Madras', duration: '8 weeks', link: 'https://nptel.ac.in/courses/106106179', category: 'AI' },
        { id: 's1', title: 'AI Fundamentals', provider: 'IIT Delhi', duration: '6 weeks', link: 'https://swayam.gov.in/explorer', category: 'AI' },
        { id: 'n2', title: 'Customer Relationship Management', provider: 'IIT Kharagpur', duration: '4 weeks', link: 'https://nptel.ac.in/courses', category: 'Soft Skills' },
        { id: 'p1', title: 'Digital Marketing', provider: 'MSME', duration: '12 weeks', link: 'https://www.pmkvyofficial.org/', category: 'Marketing' },
    ];

    static async scrapeNPTEL() {
        try {
            // Simplified scraper logic for demo
            // In a production environment, we'd use the provided Python script or a robust Node scraper
            console.log('Scraping NPTEL catalog...');
            return true;
        } catch (e) {
            console.error('NPTEL Scraping failed:', e);
            return false;
        }
    }

    static async getRecommendedCourses(category: string, count: number = 3): Promise<Course[]> {
        // Filter courses by category or return general ones if no match
        const filtered = this.courses.filter(c =>
            c.category.toLowerCase().includes(category.toLowerCase()) ||
            category.toLowerCase().includes(c.category.toLowerCase())
        );

        return filtered.length > 0 ? filtered.slice(0, count) : this.courses.slice(0, count);
    }
}
