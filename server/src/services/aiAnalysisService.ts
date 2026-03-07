import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export interface JobAnalysisResult {
    requiredSkills: string[];
    missingSkills: string[];
    skillSummary: string;
}

export interface WorkerExtractionResult {
    implicitSkills: string[];
    tools: string[];
    softSkills: string[];
    careerAspirations: string[];
}

export interface JobNormalizationResult {
    normalizedTitle: string;
    category: string;
}

export const analyzeJobDescription = async (
    jobDescription: string,
    userSkills: string[] = []
): Promise<JobAnalysisResult> => {
    try {
        const prompt = `
            Analyze the following job description and compare it with the provided user skills.
            
            Job Description:
            "${jobDescription}"
            
            User Skills:
            ${userSkills.join(', ')}
            
            Return a JSON object with the following fields:
            1. "requiredSkills": An array of technical and soft skills extracted from the job description.
            2. "missingSkills": An array of skills from "requiredSkills" that are NOT present in the "User Skills" list.
            3. "skillSummary": A short (max 2 sentences) summary of the job role and its core requirements.

            Ensure the response is ONLY the JSON object.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        }, {
            timeout: 10000,
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error('Empty response from OpenAI');

        return JSON.parse(content) as JobAnalysisResult;
    } catch (error: any) {
        console.error('AI Analysis Error:', error);
        return {
            requiredSkills: [],
            missingSkills: [],
            skillSummary: "AI analysis unavailable at this time."
        };
    }
};

export const normalizeJobTitle = async (title: string): Promise<JobNormalizationResult> => {
    try {
        const prompt = `
            Normalize the following worker-provided job title into a standard industry title and detect its broad category (e.g., IT, BPO, Healthcare, Manufacturing).
            
            Title: "${title}"
            
            Return a JSON object with:
            1. "normalizedTitle": The standard title.
            2. "category": The industrial category.
            
            Ensure the response is ONLY the JSON object.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error('Empty response');

        return JSON.parse(content) as JobNormalizationResult;
    } catch (error) {
        console.error('Normalization Error:', error);
        return { normalizedTitle: title, category: 'General' };
    }
};

export const extractWorkerIntelligence = async (writeup: string): Promise<WorkerExtractionResult> => {
    try {
        const prompt = `
            Extract professional intelligence from the following worker's day-to-day work description.
            
            Description: "${writeup}"
            
            Extract and return a JSON object with:
            1. "implicitSkills": Skills used but not explicitly named (e.g., "handling calls" -> "Communication").
            2. "tools": Software or physical tools mentioned (e.g., "Excel", "CRM", "Lathe").
            3. "softSkills": Interpersonal and behavioral traits.
            4. "careerAspirations": What type of work or roles they want to move toward.
            
            Ensure the response is ONLY the JSON object.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error('Empty response');

        return JSON.parse(content) as WorkerExtractionResult;
    } catch (error) {
        console.error('Extraction Error:', error);
        return { implicitSkills: [], tools: [], softSkills: [], careerAspirations: [] };
    }
};
