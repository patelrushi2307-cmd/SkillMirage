export interface SkillTrend {
  name: string;
  nameHi: string;
  change: number;
  direction: 'rising' | 'declining';
  category: string;
}

export const risingSkills: SkillTrend[] = [
  { name: "LangChain", nameHi: "लैंगचेन", change: 392, direction: "rising", category: "AI" },
  { name: "LlamaIndex", nameHi: "लामाइंडेक्स", change: 287, direction: "rising", category: "AI" },
  { name: "RAG Pipeline", nameHi: "आरएजी पाइपलाइन", change: 241, direction: "rising", category: "AI" },
  { name: "Prompt Engineering", nameHi: "प्रॉम्प्ट इंजीनियरिंग", change: 198, direction: "rising", category: "AI" },
  { name: "Vector DB", nameHi: "वेक्टर डीबी", change: 176, direction: "rising", category: "Data" },
  { name: "Kubernetes", nameHi: "कुबेरनेट्स", change: 134, direction: "rising", category: "Cloud" },
  { name: "Terraform", nameHi: "टेराफॉर्म", change: 112, direction: "rising", category: "Cloud" },
  { name: "Power BI", nameHi: "पावर बीआई", change: 98, direction: "rising", category: "Analytics" },
  { name: "Snowflake", nameHi: "स्नोफ्लेक", change: 87, direction: "rising", category: "Data" },
  { name: "dbt", nameHi: "डीबीटी", change: 76, direction: "rising", category: "Data" },
];

export const decliningSkills: SkillTrend[] = [
  { name: "VB.NET", nameHi: "वीबी.नेट", change: -67, direction: "declining", category: "Legacy" },
  { name: "Manual Testing", nameHi: "मैनुअल टेस्टिंग", change: -58, direction: "declining", category: "QA" },
  { name: "Excel Macros", nameHi: "एक्सेल मैक्रोस", change: -49, direction: "declining", category: "Office" },
  { name: "COBOL", nameHi: "कोबोल", change: -45, direction: "declining", category: "Legacy" },
  { name: "Tally ERP", nameHi: "टैली ईआरपी", change: -42, direction: "declining", category: "Accounting" },
  { name: "Cold Calling", nameHi: "कोल्ड कॉलिंग", change: -39, direction: "declining", category: "Sales" },
  { name: "Data Entry", nameHi: "डेटा एंट्री", change: -36, direction: "declining", category: "Admin" },
  { name: "WordPress", nameHi: "वर्डप्रेस", change: -31, direction: "declining", category: "Web" },
  { name: "FoxPro", nameHi: "फॉक्सप्रो", change: -28, direction: "declining", category: "Legacy" },
  { name: "Stenography", nameHi: "स्टेनोग्राफी", change: -25, direction: "declining", category: "Admin" },
];

export interface GapData {
  skill: string;
  skillHi: string;
  trained: number;
  demanded: number;
  source: string;
}

export const trainingGaps: GapData[] = [
  { skill: "Tally", skillHi: "टैली", trained: 12000, demanded: 3200, source: "PMKVY" },
  { skill: "Data Entry", skillHi: "डेटा एंट्री", trained: 18000, demanded: 4100, source: "PMKVY" },
  { skill: "Python", skillHi: "पायथन", trained: 5200, demanded: 28000, source: "NPTEL" },
  { skill: "Cloud Computing", skillHi: "क्लाउड कंप्यूटिंग", trained: 2100, demanded: 15600, source: "SWAYAM" },
  { skill: "AI/ML Basics", skillHi: "एआई/एमएल बेसिक्स", trained: 1800, demanded: 22000, source: "NPTEL" },
];
