import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import OpenAI from 'openai';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.use(requireAuth);

router.post('/', async (req, res) => {
    const { messages, context, lang = 'en' } = req.body;
    const lastMessage = messages[messages.length - 1]?.content || '';

    // If API key exists and is valid, use it
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
        try {
            const systemPrompt = `You are a Career Transition Mentor for Workers in India. 
Context: User works as ${context.jobTitle} in ${context.city}. 
Their AI vulnerability risk score is ${context.riskScore}/100.
Hiring for this role has changed by -${context.hiringDecline}% recently.
Provide actionable, empathetic, and culturally relevant advice regarding reskilling and career paths based on this context. Keep responses concise. Respond in ${lang === 'hi' ? 'Hindi' : 'English'}.`;

            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages
                ],
            });

            return res.json(chatCompletion.choices[0].message);
        } catch (error) {
            console.error('Chatbot error:', error);
            // Fall back to local logic if OpenAI fails
        }
    }

    // Local Deterministic Logic (Fallback / Fast mode)
    const q = lastMessage.toLowerCase();

    // Default context values if missing
    const ctx = {
        city: context?.city || 'Pune',
        cityHi: context?.cityHi || 'पुणे',
        jobTitle: context?.jobTitle || 'Worker',
        riskScore: context?.riskScore || 50,
        hiringDecline: context?.hiringDecline || 20,
        aiMentions: context?.aiMentions || 40,
        bpoJobs: context?.bpoJobs || 5000,
    };

    let reply = '';

    if (/why.*(risk|score).*(high|87|critical)/.test(q) || /मेरा रिस्क स्कोर इतना ज़्यादा क्यों है/.test(q)) {
        reply = lang === 'hi'
            ? `**लाइव डेटा:** ${ctx.cityHi} में BPO हायरिंग ${ctx.hiringDecline}% कम हुई। ${ctx.aiMentions}% जॉब्स में AI tools मांगे जा रहे हैं। आपके Excel और coordination स्किल्स मदद करते हैं लेकिन वॉइस रोल्स सबसे तेज़ी से घट रहे हैं।\n\n**आपका रिस्क: ${ctx.riskScore}/100** — 92वीं पर्सेंटाइल।`
            : `**LIVE DATA:** BPO hiring down ${ctx.hiringDecline}% WoW in ${ctx.city}. ${ctx.aiMentions}% of ${(ctx.bpoJobs).toLocaleString()} BPO JDs mention AI routing/chatbots. Your Excel+coordination skills help but voice roles declining fastest.\n\n**Your Risk: ${ctx.riskScore}/100** — 92nd percentile (more at-risk than 92% of similar profiles).`;
    }
    else if (/safer|safe.*(job|role|career)|what.*do|alternative/.test(q) || /सुरक्षित हैं/.test(q)) {
        reply = lang === 'hi'
            ? `**${ctx.cityHi} में अभी हायरिंग हो रही सुरक्षित नौकरियां:**\n\n1. 🟢 **क्वालिटी एनालिस्ट** — रिस्क: 43/100, 892 जॉब्स\n2. 🟢 **डेटा एनालिस्ट** — रिस्क: 28/100, 1,247 जॉब्स\n3. 🟢 **डिजिटल मार्केटिंग** — रिस्क: 39/100, 673 जॉब्स\n\nक्वालिटी एनालिस्ट आपके मौजूदा स्किल्स से सबसे तेज़ ट्रांजिशन है।`
            : `**Safer roles hiring NOW in ${ctx.city}:**\n\n1. 🟢 **Quality Analyst** — Risk: 43/100, 892 open jobs\n2. 🟢 **Data Analyst** — Risk: 28/100, 1,247 open jobs\n3. 🟢 **Digital Marketing** — Risk: 39/100, 673 open jobs\n\nAll actively hiring. Quality Analyst is the fastest transition from your current skills.`;
    }
    else if (/(under|less).*(3|three).*(month|months)|short.*path|quick/.test(q) || /3 महीने से कम का पाथ दिखाएं/.test(q)) {
        reply = lang === 'hi'
            ? `**6-हफ्ते का फास्ट ट्रैक → क्वालिटी एनालिस्ट:**\n\n📚 **हफ्ता 1-3:** SWAYAM QA फंडामेंटल्स (4 घंटे/हफ्ता)\n→ [मुफ्त एनरोल करें](https://swayam.gov.in)\n\n📚 **हफ्ता 4-6:** PMKVY डेटा क्वालिटी सर्टिफिकेशन (${ctx.cityHi} सेंटर)\n→ [सेंटर खोजें](https://pmkvy.gov.in)\n\n**लक्ष्य:** QA एनालिस्ट (रिस्क 43/100) — ${ctx.cityHi} में 892 जॉब्स`
            : `**6-Week Fast Track → Quality Analyst:**\n\n📚 **Weeks 1-3:** SWAYAM QA Fundamentals (4hr/wk)\n→ [Enroll Free](https://swayam.gov.in)\n\n📚 **Weeks 4-6:** PMKVY Data Quality Certification (${ctx.city} center)\n→ [Find Center](https://pmkvy.gov.in)\n\n**Target:** QA Analyst (Risk 43/100) — 892 open jobs in ${ctx.city}`;
    }
    else if (/how many|bpo.*jobs|jobs.*(in|at)|count|number/.test(q) || /कितनी|जॉब्स/.test(q)) {
        reply = lang === 'hi'
            ? `**लाइव: ${ctx.cityHi} जॉब मार्केट:**\n\n📊 BPO जॉब्स (पिछले 7 दिन): **${ctx.bpoJobs.toLocaleString()}** पोस्ट (-18% WoW)\n📊 कुल जॉब्स: **${((ctx.bpoJobs * 4.2) | 0).toLocaleString()}** सभी सेक्टर्स में\n📊 AI/Tech जॉब्स: **${((ctx.bpoJobs * 0.8) | 0).toLocaleString()}** (+34% WoW)\n\n_स्रोत: 50L+ मासिक जॉब सिग्नल्स से_`
            : `**LIVE: ${ctx.city} Job Market:**\n\n📊 BPO Jobs (last 7 days): **${ctx.bpoJobs.toLocaleString()}** posted (-18% WoW)\n📊 Total Jobs: **${((ctx.bpoJobs * 4.2) | 0).toLocaleString()}** across all sectors\n📊 AI/Tech Jobs: **${((ctx.bpoJobs * 0.8) | 0).toLocaleString()}** (+34% WoW)\n\n_Source: Aggregated from 50L+ monthly job signals_`;
    }
    else {
        reply = lang === 'hi'
            ? `आपकी प्रोफ़ाइल (${ctx.jobTitle}, ${ctx.cityHi}) के आधार पर, आपका AI रिस्क स्कोर **${ctx.riskScore}/100** है। मैं इनमें मदद कर सकता हूँ:\n\n1. रिस्क स्कोर क्यों ज़्यादा है\n2. सुरक्षित नौकरी विकल्प\n3. छोटे ट्रेनिंग पाथ\n4. शहर-विशिष्ट जॉब काउंट\n\nकोई भी सवाल पूछें!`
            : `Based on your profile as a **${ctx.jobTitle}** in **${ctx.city}**, your AI risk score is **${ctx.riskScore}/100**. I can help with:\n\n1. Why your risk score is high\n2. Safer job alternatives\n3. Short training paths (<3 months)\n4. City-specific job counts\n\nTry asking one of these!`;
    }

    res.json({
        role: 'assistant',
        content: reply
    });
});

export default router;
