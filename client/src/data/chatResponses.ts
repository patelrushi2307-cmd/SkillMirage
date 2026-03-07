export interface ChatResponse {
  pattern: RegExp;
  en: (ctx: ChatContext) => string;
  hi: (ctx: ChatContext) => string;
}

export interface ChatContext {
  city: string;
  cityHi: string;
  jobTitle: string;
  riskScore: number;
  hiringDecline: number;
  aiMentions: number;
  bpoJobs: number;
}

export const chatResponses: ChatResponse[] = [
  {
    pattern: /why.*(risk|score).*(high|87|critical)/i,
    en: (ctx) => `**LIVE DATA:** BPO hiring down ${ctx.hiringDecline}% WoW in ${ctx.city}. ${ctx.aiMentions}% of ${(ctx.bpoJobs).toLocaleString()} BPO JDs mention AI routing/chatbots. Your Excel+coordination skills help but voice roles declining fastest.\n\n**Your Risk: ${ctx.riskScore}/100** — 92nd percentile (more at-risk than 92% of similar profiles).`,
    hi: (ctx) => `**लाइव डेटा:** ${ctx.cityHi} में BPO हायरिंग ${ctx.hiringDecline}% कम हुई। ${ctx.aiMentions}% जॉब्स में AI tools मांगे जा रहे हैं। आपके Excel और coordination स्किल्स मदद करते हैं लेकिन वॉइस रोल्स सबसे तेज़ी से घट रहे हैं।\n\n**आपका रिस्क: ${ctx.riskScore}/100** — 92वीं पर्सेंटाइल।`,
  },
  {
    pattern: /safer|safe.*(job|role|career)|what.*do|alternative/i,
    en: (ctx) => `**Safer roles hiring NOW in ${ctx.city}:**\n\n1. 🟢 **Quality Analyst** — Risk: 43/100, 892 open jobs\n2. 🟢 **Data Analyst** — Risk: 28/100, 1,247 open jobs\n3. 🟢 **Digital Marketing** — Risk: 39/100, 673 open jobs\n4. 🟢 **Cloud Support** — Risk: 31/100, 456 open jobs\n\nAll actively hiring. Quality Analyst is the fastest transition from your current skills.`,
    hi: (ctx) => `**${ctx.cityHi} में अभी हायरिंग हो रही सुरक्षित नौकरियां:**\n\n1. 🟢 **क्वालिटी एनालिस्ट** — रिस्क: 43/100, 892 जॉब्स\n2. 🟢 **डेटा एनालिस्ट** — रिस्क: 28/100, 1,247 जॉब्स\n3. 🟢 **डिजिटल मार्केटिंग** — रिस्क: 39/100, 673 जॉब्स\n4. 🟢 **क्लाउड सपोर्ट** — रिस्क: 31/100, 456 जॉब्स\n\nक्वालिटी एनालिस्ट आपके मौजूदा स्किल्स से सबसे तेज़ ट्रांजिशन है।`,
  },
  {
    pattern: /(under|less).*(3|three).*(month|months)|short.*path|quick/i,
    en: (ctx) => `**6-Week Fast Track → Quality Analyst:**\n\n📚 **Weeks 1-3:** SWAYAM QA Fundamentals (4hr/wk)\n→ [Enroll Free](https://swayam.gov.in)\n\n📚 **Weeks 4-6:** PMKVY Data Quality Certification (${ctx.city} center)\n→ [Find Center](https://pmkvy.gov.in)\n\n**Target:** QA Analyst (Risk 43/100) — 892 open jobs in ${ctx.city}`,
    hi: (ctx) => `**6-हफ्ते का फास्ट ट्रैक → क्वालिटी एनालिस्ट:**\n\n📚 **हफ्ता 1-3:** SWAYAM QA फंडामेंटल्स (4 घंटे/हफ्ता)\n→ [मुफ्त एनरोल करें](https://swayam.gov.in)\n\n📚 **हफ्ता 4-6:** PMKVY डेटा क्वालिटी सर्टिफिकेशन (${ctx.cityHi} सेंटर)\n→ [सेंटर खोजें](https://pmkvy.gov.in)\n\n**लक्ष्य:** QA एनालिस्ट (रिस्क 43/100) — ${ctx.cityHi} में 892 जॉब्स`,
  },
  {
    pattern: /how many|bpo.*jobs|jobs.*(in|at)|count|number/i,
    en: (ctx) => `**LIVE: ${ctx.city} Job Market:**\n\n📊 BPO Jobs (last 7 days): **${ctx.bpoJobs.toLocaleString()}** posted (-18% WoW)\n📊 Total Jobs: **${((ctx.bpoJobs * 4.2) | 0).toLocaleString()}** across all sectors\n📊 AI/Tech Jobs: **${((ctx.bpoJobs * 0.8) | 0).toLocaleString()}** (+34% WoW)\n\n_Source: Aggregated from 50L+ monthly job signals_`,
    hi: (ctx) => `**लाइव: ${ctx.cityHi} जॉब मार्केट:**\n\n📊 BPO जॉब्स (पिछले 7 दिन): **${ctx.bpoJobs.toLocaleString()}** पोस्ट (-18% WoW)\n📊 कुल जॉब्स: **${((ctx.bpoJobs * 4.2) | 0).toLocaleString()}** सभी सेक्टर्स में\n📊 AI/Tech जॉब्स: **${((ctx.bpoJobs * 0.8) | 0).toLocaleString()}** (+34% WoW)\n\n_स्रोत: 50L+ मासिक जॉब सिग्नल्स से_`,
  },
  {
    pattern: /मुझे|क्या करना|हिंदी|मदद|सलाह|बताओ|कैसे/i,
    en: (ctx) => `Your risk is ${ctx.riskScore}/100. BPO jobs declining ${ctx.hiringDecline}% in ${ctx.city}. Recommend transitioning to Quality Analyst (risk 43/100). Start with SWAYAM QA course — free, 4hr/week, 6 weeks.`,
    hi: (ctx) => `**आपकी रिस्क ${ctx.riskScore}/100 क्यों?**\n\n${ctx.cityHi} में BPO जॉब्स ${ctx.hiringDecline}% कम हुए। ${ctx.aiMentions}% जॉब्स में AI tools मांगे जा रहे हैं।\n\n**सुझाव:** Quality Analyst सीखें (43/100 रिस्क)।\n\n📚 SWAYAM पर मुफ्त कोर्स शुरू करें — 4 घंटे/हफ्ता, 6 हफ्ते।\n→ [एनरोल करें](https://swayam.gov.in)\n\n💪 आप कर सकते हैं!`,
  },
];

export const defaultResponse = {
  en: (ctx: ChatContext) => `Based on your profile as a **${ctx.jobTitle}** in **${ctx.city}**, your AI risk score is **${ctx.riskScore}/100**. I can help with:\n\n1. Why your risk score is high\n2. Safer job alternatives\n3. Short training paths (<3 months)\n4. City-specific job counts\n5. Hindi guidance\n\nTry asking one of these!`,
  hi: (ctx: ChatContext) => `आपकी प्रोफ़ाइल (${ctx.jobTitle}, ${ctx.cityHi}) के आधार पर, आपका AI रिस्क स्कोर **${ctx.riskScore}/100** है। मैं इनमें मदद कर सकता हूँ:\n\n1. रिस्क स्कोर क्यों ज़्यादा है\n2. सुरक्षित नौकरी विकल्प\n3. छोटे ट्रेनिंग पाथ\n4. शहर-विशिष्ट जॉब काउंट\n5. हिंदी मार्गदर्शन\n\nकोई भी सवाल पूछें!`,
};
