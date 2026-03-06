export interface TrendCard {
    title: string;
    titleHi: string;
    change: number;
    city: string;
    icon: string;
    category: string;
}

export interface BigNumber {
    label: string;
    labelHi: string;
    value: string;
    change: string;
    changePercent: number;
}

// Generate dynamic hiring trends based on city and timeRange
export const generateHiringTrends = (city: string, timeRange: string) => {
    // Base scale dependent on timeRange
    let timeMultiplier = 1;
    if (timeRange === '7d') timeMultiplier = 0.25;
    if (timeRange === '30d') timeMultiplier = 1;
    if (timeRange === '90d') timeMultiplier = 3;

    // Base scale dependent on city
    let cityMultiplier = 1;
    if (city !== 'all') {
        // Generate a deterministic multiplier based on city name length/chars
        const charSum = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        cityMultiplier = 0.1 + (charSum % 40) / 100; // e.g. 0.1 to 0.5
    }

    const overallMultiplier = timeMultiplier * cityMultiplier;

    // Generate Trend Cards
    const baseCards: TrendCard[] = [
        { title: "GenAI Engineer", titleHi: "जेनएआई इंजीनियर", change: 287, city: "Bangalore", icon: "🔥", category: "tech" },
        { title: "BPO Voice", titleHi: "बीपीओ वॉइस", change: -41, city: "Pune", icon: "📉", category: "bpo" },
        { title: "Data Analyst", titleHi: "डेटा एनालिस्ट", change: 92, city: "Hyderabad", icon: "📈", category: "analytics" },
        { title: "Call Center", titleHi: "कॉल सेंटर", change: -33, city: "Jaipur", icon: "📉", category: "bpo" },
        { title: "Cloud Engineer", titleHi: "क्लाउड इंजीनियर", change: 156, city: "Indore", icon: "🔥", category: "tech" },
        { title: "Digital Marketing", titleHi: "डिजिटल मार्केटिंग", change: 78, city: "Nagpur", icon: "📈", category: "marketing" },
    ];

    const trendCards = baseCards.map(card => {
        // If a specific city is selected, we might want to pretend these are for that city
        const displayCity = city !== 'all' ? city : card.city;
        // Vary the change slightly
        const randomVariation = Math.floor(Math.random() * 20) - 10;
        const newChange = Math.floor(card.change * (city === 'all' ? 1 : 1.5)) + randomVariation;
        return { ...card, city: displayCity, change: newChange };
    });

    // Generate Big Numbers
    const baseJobs = 1247892;
    const currentJobs = Math.floor(baseJobs * overallMultiplier);
    const bigNumbers: BigNumber[] = [
        { label: "Jobs Posted", labelHi: "जॉब्स पोस्ट", value: currentJobs.toLocaleString(), change: "+12% WoW", changePercent: 12 },
        { label: "Tier 2/3 Cities", labelHi: "टियर 2/3 शहर", value: `${Math.floor(43 * cityMultiplier)}%`, change: "+8% WoW", changePercent: 8 },
        { label: "Avg Salary", labelHi: "औसत वेतन", value: `₹${(8.2 * overallMultiplier).toFixed(1)}L`, change: "-2% WoW", changePercent: -2 },
    ];

    // Generate Chart Data
    const chartData = Array.from({ length: 12 }).map((_, i) => {
        return {
            week: `W${i + 1}`,
            tech: Math.floor((4000 + i * 500 + Math.random() * 500) * overallMultiplier),
            bpo: Math.floor((9000 - i * 400 + Math.random() * 500) * overallMultiplier),
            analytics: Math.floor((3000 + i * 300 + Math.random() * 300) * overallMultiplier),
            marketing: Math.floor((2400 + i * 200 + Math.random() * 200) * overallMultiplier),
        };
    });

    return { trendCards, bigNumbers, hiringChartData: chartData };
};
