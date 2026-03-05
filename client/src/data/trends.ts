export interface TrendCard {
  title: string;
  titleHi: string;
  change: number;
  city: string;
  icon: string;
  category: string;
}

export const trendCards: TrendCard[] = [
  { title: "GenAI Engineer", titleHi: "जेनएआई इंजीनियर", change: 287, city: "Bangalore", icon: "🔥", category: "tech" },
  { title: "BPO Voice", titleHi: "बीपीओ वॉइस", change: -41, city: "Pune", icon: "📉", category: "bpo" },
  { title: "Data Analyst", titleHi: "डेटा एनालिस्ट", change: 92, city: "Hyderabad", icon: "📈", category: "analytics" },
  { title: "Call Center", titleHi: "कॉल सेंटर", change: -33, city: "Jaipur", icon: "📉", category: "bpo" },
  { title: "Cloud Engineer", titleHi: "क्लाउड इंजीनियर", change: 156, city: "Indore", icon: "🔥", category: "tech" },
  { title: "Digital Marketing", titleHi: "डिजिटल मार्केटिंग", change: 78, city: "Nagpur", icon: "📈", category: "marketing" },
];

export interface BigNumber {
  label: string;
  labelHi: string;
  value: string;
  change: string;
  changePercent: number;
}

export const bigNumbers: BigNumber[] = [
  { label: "Jobs Posted", labelHi: "जॉब्स पोस्ट", value: "12,47,892", change: "+12% WoW", changePercent: 12 },
  { label: "Tier 2/3 Cities", labelHi: "टियर 2/3 शहर", value: "43%", change: "+8% WoW", changePercent: 8 },
  { label: "Avg Salary", labelHi: "औसत वेतन", value: "₹8.2L", change: "-2% WoW", changePercent: -2 },
];

export const hiringChartData = [
  { week: "W1", tech: 4200, bpo: 8900, analytics: 3100, marketing: 2400 },
  { week: "W2", tech: 4800, bpo: 8200, analytics: 3400, marketing: 2600 },
  { week: "W3", tech: 5100, bpo: 7800, analytics: 3800, marketing: 2900 },
  { week: "W4", tech: 5600, bpo: 7200, analytics: 4100, marketing: 3100 },
  { week: "W5", tech: 6200, bpo: 6800, analytics: 4500, marketing: 3400 },
  { week: "W6", tech: 6800, bpo: 6200, analytics: 4900, marketing: 3600 },
  { week: "W7", tech: 7400, bpo: 5800, analytics: 5200, marketing: 3800 },
  { week: "W8", tech: 8100, bpo: 5200, analytics: 5600, marketing: 4100 },
  { week: "W9", tech: 8800, bpo: 4800, analytics: 5900, marketing: 4300 },
  { week: "W10", tech: 9200, bpo: 4500, analytics: 6200, marketing: 4500 },
  { week: "W11", tech: 9800, bpo: 4200, analytics: 6500, marketing: 4700 },
  { week: "W12", tech: 10400, bpo: 3900, analytics: 6800, marketing: 4900 },
];
