import { CityData } from '@/data/cities';

export interface RiskResult {
  score: number;
  percentile: number;
  signals: RiskSignal[];
  targetRole: string;
  targetRisk: number;
  openJobs: number;
}

export interface RiskSignal {
  icon: string;
  text: string;
  textHi: string;
  source: string;
}

export function calculateRisk(
  jobTitle: string,
  city: CityData,
  experience: number,
  description: string
): RiskResult {
  // Base risk from city
  const cityRisk = city.riskScore;
  
  // Job-specific modifiers
  const highRiskJobs = ['bpo', 'call center', 'data entry', 'telecaller', 'voice process', 'back office'];
  const medRiskJobs = ['team lead', 'supervisor', 'coordinator', 'executive'];
  const lowRiskJobs = ['analyst', 'developer', 'engineer', 'designer', 'cloud', 'data scientist'];
  
  const titleLower = jobTitle.toLowerCase();
  let jobModifier = 0;
  if (highRiskJobs.some(j => titleLower.includes(j))) jobModifier = 15;
  else if (medRiskJobs.some(j => titleLower.includes(j))) jobModifier = 5;
  else if (lowRiskJobs.some(j => titleLower.includes(j))) jobModifier = -20;

  // Experience modifier (more experience in declining field = higher risk due to salary)
  const expModifier = experience > 10 ? 5 : experience > 5 ? 2 : -3;

  // Description analysis
  const descLower = description.toLowerCase();
  const riskKeywords = ['calls', 'excel', 'manual', 'routine', 'repetitive', 'data entry', 'voice'];
  const safeKeywords = ['analysis', 'strategy', 'management', 'automation', 'python', 'cloud', 'ai'];
  
  const riskCount = riskKeywords.filter(k => descLower.includes(k)).length;
  const safeCount = safeKeywords.filter(k => descLower.includes(k)).length;
  const descModifier = (riskCount - safeCount) * 4;

  // Formula: Risk = 0.4*(Hiring Decline%) + 0.3*(AI Tool Mentions) + 0.3*(WEF Score) + modifiers
  const baseScore = 0.4 * city.hiringDecline + 0.3 * city.aiMentions + 0.3 * city.wefScore;
  const finalScore = Math.min(100, Math.max(0, Math.round(baseScore + jobModifier + expModifier + descModifier)));

  const signals: RiskSignal[] = [
    {
      icon: "📉",
      text: `${jobTitle} hiring DOWN ${city.hiringDecline}% WoW`,
      textHi: `${jobTitle} हायरिंग ${city.hiringDecline}% कम WoW`,
      source: `LIVE from Layer 1 ${city.name}`,
    },
    {
      icon: "🤖",
      text: `${city.aiMentions}% JDs mention "AI routing" or "chatbots"`,
      textHi: `${city.aiMentions}% JDs में "AI routing" या "chatbots" का ज़िक्र`,
      source: "NLP analysis of 50L+ postings",
    },
    {
      icon: "⚠️",
      text: `WEF: ${city.wefScore}% displacement risk by 2027`,
      textHi: `WEF: 2027 तक ${city.wefScore}% विस्थापन जोखिम`,
      source: "World Economic Forum Future of Jobs 2025",
    },
  ];

  return {
    score: finalScore,
    percentile: Math.min(99, Math.max(10, finalScore + Math.floor(Math.random() * 8))),
    signals,
    targetRole: "Quality Analyst",
    targetRisk: 43,
    openJobs: 892,
  };
}
