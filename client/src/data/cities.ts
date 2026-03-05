export interface CityData {
  name: string;
  nameHi: string;
  riskScore: number;
  hiringDecline: number;
  aiMentions: number;
  wefScore: number;
  totalJobs: number;
  bpoJobs: number;
  tier: 1 | 2 | 3;
}

export const cities: CityData[] = [
  { name: "Pune", nameHi: "पुणे", riskScore: 87, hiringDecline: 41, aiMentions: 67, wefScore: 78, totalJobs: 34200, bpoJobs: 8700, tier: 1 },
  { name: "Jaipur", nameHi: "जयपुर", riskScore: 74, hiringDecline: 33, aiMentions: 58, wefScore: 65, totalJobs: 12400, bpoJobs: 4200, tier: 2 },
  { name: "Mumbai", nameHi: "मुंबई", riskScore: 43, hiringDecline: 12, aiMentions: 45, wefScore: 38, totalJobs: 89200, bpoJobs: 15300, tier: 1 },
  { name: "Indore", nameHi: "इंदौर", riskScore: 29, hiringDecline: 8, aiMentions: 22, wefScore: 19, totalJobs: 7800, bpoJobs: 1200, tier: 2 },
  { name: "Bangalore", nameHi: "बेंगलुरु", riskScore: 38, hiringDecline: 5, aiMentions: 72, wefScore: 25, totalJobs: 124700, bpoJobs: 18900, tier: 1 },
  { name: "Hyderabad", nameHi: "हैदराबाद", riskScore: 42, hiringDecline: 11, aiMentions: 55, wefScore: 35, totalJobs: 67800, bpoJobs: 12400, tier: 1 },
  { name: "Chennai", nameHi: "चेन्नई", riskScore: 51, hiringDecline: 18, aiMentions: 48, wefScore: 42, totalJobs: 45300, bpoJobs: 9800, tier: 1 },
  { name: "Delhi NCR", nameHi: "दिल्ली एनसीआर", riskScore: 45, hiringDecline: 14, aiMentions: 52, wefScore: 40, totalJobs: 98400, bpoJobs: 16700, tier: 1 },
  { name: "Kolkata", nameHi: "कोलकाता", riskScore: 62, hiringDecline: 25, aiMentions: 42, wefScore: 55, totalJobs: 23400, bpoJobs: 6800, tier: 1 },
  { name: "Ahmedabad", nameHi: "अहमदाबाद", riskScore: 48, hiringDecline: 15, aiMentions: 38, wefScore: 42, totalJobs: 28900, bpoJobs: 5400, tier: 1 },
  { name: "Lucknow", nameHi: "लखनऊ", riskScore: 71, hiringDecline: 30, aiMentions: 52, wefScore: 62, totalJobs: 8900, bpoJobs: 3200, tier: 2 },
  { name: "Nagpur", nameHi: "नागपुर", riskScore: 66, hiringDecline: 28, aiMentions: 45, wefScore: 58, totalJobs: 6700, bpoJobs: 2100, tier: 2 },
  { name: "Bhopal", nameHi: "भोपाल", riskScore: 58, hiringDecline: 22, aiMentions: 35, wefScore: 50, totalJobs: 5400, bpoJobs: 1800, tier: 2 },
  { name: "Visakhapatnam", nameHi: "विशाखापत्तनम", riskScore: 63, hiringDecline: 26, aiMentions: 40, wefScore: 56, totalJobs: 4800, bpoJobs: 1500, tier: 2 },
  { name: "Chandigarh", nameHi: "चंडीगढ़", riskScore: 52, hiringDecline: 19, aiMentions: 35, wefScore: 45, totalJobs: 7200, bpoJobs: 2400, tier: 2 },
  { name: "Coimbatore", nameHi: "कोयम्बटूर", riskScore: 44, hiringDecline: 13, aiMentions: 30, wefScore: 38, totalJobs: 9100, bpoJobs: 2800, tier: 2 },
  { name: "Kochi", nameHi: "कोच्चि", riskScore: 39, hiringDecline: 10, aiMentions: 32, wefScore: 30, totalJobs: 11200, bpoJobs: 3100, tier: 2 },
  { name: "Vadodara", nameHi: "वडोदरा", riskScore: 55, hiringDecline: 20, aiMentions: 36, wefScore: 48, totalJobs: 5100, bpoJobs: 1600, tier: 2 },
  { name: "Surat", nameHi: "सूरत", riskScore: 35, hiringDecline: 9, aiMentions: 25, wefScore: 28, totalJobs: 14300, bpoJobs: 2200, tier: 2 },
  { name: "Rajkot", nameHi: "राजकोट", riskScore: 42, hiringDecline: 12, aiMentions: 28, wefScore: 35, totalJobs: 4200, bpoJobs: 900, tier: 3 },
  { name: "Thiruvananthapuram", nameHi: "तिरुवनंतपुरम", riskScore: 47, hiringDecline: 16, aiMentions: 33, wefScore: 40, totalJobs: 6800, bpoJobs: 2000, tier: 2 },
  { name: "Mysore", nameHi: "मैसूर", riskScore: 50, hiringDecline: 17, aiMentions: 34, wefScore: 43, totalJobs: 5600, bpoJobs: 1700, tier: 2 },
  { name: "Ranchi", nameHi: "रांची", riskScore: 69, hiringDecline: 29, aiMentions: 44, wefScore: 60, totalJobs: 3200, bpoJobs: 1100, tier: 3 },
  { name: "Guwahati", nameHi: "गुवाहाटी", riskScore: 64, hiringDecline: 27, aiMentions: 38, wefScore: 57, totalJobs: 2800, bpoJobs: 800, tier: 3 },
  { name: "Bhubaneswar", nameHi: "भुवनेश्वर", riskScore: 56, hiringDecline: 21, aiMentions: 36, wefScore: 49, totalJobs: 4500, bpoJobs: 1400, tier: 2 },
  { name: "Dehradun", nameHi: "देहरादून", riskScore: 61, hiringDecline: 24, aiMentions: 40, wefScore: 53, totalJobs: 2900, bpoJobs: 900, tier: 3 },
  { name: "Raipur", nameHi: "रायपुर", riskScore: 67, hiringDecline: 28, aiMentions: 42, wefScore: 59, totalJobs: 2400, bpoJobs: 700, tier: 3 },
  { name: "Patna", nameHi: "पटना", riskScore: 72, hiringDecline: 31, aiMentions: 48, wefScore: 64, totalJobs: 3800, bpoJobs: 1300, tier: 2 },
  { name: "Agra", nameHi: "आगरा", riskScore: 70, hiringDecline: 30, aiMentions: 45, wefScore: 62, totalJobs: 2600, bpoJobs: 800, tier: 3 },
  { name: "Varanasi", nameHi: "वाराणसी", riskScore: 73, hiringDecline: 32, aiMentions: 50, wefScore: 65, totalJobs: 2100, bpoJobs: 600, tier: 3 },
  { name: "Amritsar", nameHi: "अमृतसर", riskScore: 68, hiringDecline: 29, aiMentions: 43, wefScore: 60, totalJobs: 2300, bpoJobs: 700, tier: 3 },
  { name: "Jodhpur", nameHi: "जोधपुर", riskScore: 75, hiringDecline: 34, aiMentions: 52, wefScore: 67, totalJobs: 1800, bpoJobs: 500, tier: 3 },
  { name: "Madurai", nameHi: "मदुरै", riskScore: 59, hiringDecline: 23, aiMentions: 37, wefScore: 51, totalJobs: 3400, bpoJobs: 1000, tier: 3 },
  { name: "Nashik", nameHi: "नासिक", riskScore: 54, hiringDecline: 20, aiMentions: 34, wefScore: 47, totalJobs: 4100, bpoJobs: 1200, tier: 3 },
  { name: "Aurangabad", nameHi: "औरंगाबाद", riskScore: 60, hiringDecline: 24, aiMentions: 38, wefScore: 52, totalJobs: 3000, bpoJobs: 900, tier: 3 },
  { name: "Jabalpur", nameHi: "जबलपुर", riskScore: 65, hiringDecline: 27, aiMentions: 41, wefScore: 57, totalJobs: 2200, bpoJobs: 600, tier: 3 },
  { name: "Gwalior", nameHi: "ग्वालियर", riskScore: 71, hiringDecline: 30, aiMentions: 46, wefScore: 63, totalJobs: 1900, bpoJobs: 500, tier: 3 },
  { name: "Vijayawada", nameHi: "विजयवाड़ा", riskScore: 57, hiringDecline: 22, aiMentions: 36, wefScore: 50, totalJobs: 3600, bpoJobs: 1100, tier: 2 },
  { name: "Hubli", nameHi: "हुबली", riskScore: 62, hiringDecline: 25, aiMentions: 39, wefScore: 54, totalJobs: 2500, bpoJobs: 700, tier: 3 },
  { name: "Salem", nameHi: "सलेम", riskScore: 64, hiringDecline: 26, aiMentions: 40, wefScore: 56, totalJobs: 2000, bpoJobs: 600, tier: 3 },
  { name: "Tiruchirappalli", nameHi: "तिरुचिरापल्ली", riskScore: 58, hiringDecline: 23, aiMentions: 37, wefScore: 51, totalJobs: 2700, bpoJobs: 800, tier: 3 },
  { name: "Mangalore", nameHi: "मैंगलोर", riskScore: 46, hiringDecline: 14, aiMentions: 31, wefScore: 39, totalJobs: 4800, bpoJobs: 1300, tier: 2 },
  { name: "Udaipur", nameHi: "उदयपुर", riskScore: 69, hiringDecline: 29, aiMentions: 44, wefScore: 61, totalJobs: 1600, bpoJobs: 400, tier: 3 },
  { name: "Siliguri", nameHi: "सिलीगुड़ी", riskScore: 73, hiringDecline: 32, aiMentions: 48, wefScore: 65, totalJobs: 1200, bpoJobs: 300, tier: 3 },
  { name: "Bareilly", nameHi: "बरेली", riskScore: 76, hiringDecline: 35, aiMentions: 53, wefScore: 68, totalJobs: 1100, bpoJobs: 300, tier: 3 },
  { name: "Warangal", nameHi: "वारंगल", riskScore: 61, hiringDecline: 25, aiMentions: 39, wefScore: 53, totalJobs: 1800, bpoJobs: 500, tier: 3 },
  { name: "Guntur", nameHi: "गुंटूर", riskScore: 66, hiringDecline: 28, aiMentions: 42, wefScore: 58, totalJobs: 1500, bpoJobs: 400, tier: 3 },
];

export const getRiskLevel = (score: number): 'critical' | 'high' | 'medium' | 'low' => {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
};

export const getRiskColor = (score: number): string => {
  if (score >= 80) return 'hsl(var(--destructive))';
  if (score >= 60) return 'hsl(var(--warning))';
  if (score >= 40) return 'hsl(var(--primary))';
  return 'hsl(var(--success))';
};
