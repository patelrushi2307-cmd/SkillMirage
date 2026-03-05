import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/layout/Header';
import NavTabs, { NavView } from '@/components/layout/NavTabs';
import HiringTrends from '@/components/dashboard/HiringTrends';
import SkillsIntel from '@/components/dashboard/SkillsIntel';
import VulnerabilityMap from '@/components/dashboard/VulnerabilityMap';
import WorkerForm from '@/components/worker/WorkerForm';
import RiskScoreCard from '@/components/worker/RiskScoreCard';
import ReskillingPath from '@/components/worker/ReskillingPath';
import Chatbot from '@/components/worker/Chatbot';
import { TimeRange } from '@/components/shared/TimeFilter';
import { cities } from '@/data/cities';
import { calculateRisk, RiskResult } from '@/lib/riskCalculator';
import { ChatContext } from '@/data/chatResponses';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { t } = useLanguage();
  const { role } = useAuth();

  // Default view based on role
  const defaultView: NavView = role === 'worker' ? 'reskilling' : 'dashboard';
  const [activeView, setActiveView] = useState<NavView>(defaultView);
  const [dashTab, setDashTab] = useState('hiring');
  const [city, setCity] = useState('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null);
  const [workerCity, setWorkerCity] = useState('Pune');
  const [workerJob, setWorkerJob] = useState('BPO Team Lead');
  const [isLoading, setIsLoading] = useState(false);

  // Update default view when role loads
  useEffect(() => {
    if (role === 'worker') setActiveView('reskilling');
    else if (role === 'recruiter') setActiveView('dashboard');
  }, [role]);

  const handleFormSubmit = (data: { jobTitle: string; city: string; experience: number; description: string }) => {
    setIsLoading(true);
    setWorkerCity(data.city);
    setWorkerJob(data.jobTitle);

    setTimeout(() => {
      const cityData = cities.find(c => c.name === data.city) || cities[0];
      const result = calculateRisk(data.jobTitle, cityData, data.experience, data.description);
      setRiskResult(result);
      setIsLoading(false);
    }, 2000);
  };

  const handleCitySelect = (cityName: string) => {
    setCity(cityName);
    if (riskResult) {
      const cityData = cities.find(c => c.name === cityName) || cities[0];
      const result = calculateRisk(workerJob, cityData, 5, '');
      setRiskResult(result);
      setWorkerCity(cityName);
    }
  };

  const chatContext: ChatContext = useMemo(() => {
    const cityData = cities.find(c => c.name === workerCity) || cities[0];
    return {
      city: cityData.name,
      cityHi: cityData.nameHi,
      jobTitle: workerJob,
      riskScore: riskResult?.score ?? cityData.riskScore,
      hiringDecline: cityData.hiringDecline,
      aiMentions: cityData.aiMentions,
      bpoJobs: cityData.bpoJobs,
    };
  }, [workerCity, workerJob, riskResult]);

  // Check if user can see a view
  const canSee = (view: NavView) => {
    if (role === 'admin') return true;
    if (role === 'recruiter') return ['dashboard', 'skills', 'riskmap'].includes(view);
    if (role === 'worker') return ['reskilling', 'chat'].includes(view);
    return false;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <NavTabs activeView={activeView} onViewChange={setActiveView} />

      <main className="flex-1 container px-4 py-4 max-w-7xl">
        {/* Dashboard View */}
        {activeView === 'dashboard' && canSee('dashboard') && (
          <Tabs value={dashTab} onValueChange={setDashTab}>
            <TabsList className="bg-muted mb-4">
              <TabsTrigger value="hiring" className="text-xs">
                {t("Hiring Trends", "हायरिंग ट्रेंड्स")}
              </TabsTrigger>
              <TabsTrigger value="skills" className="text-xs">
                {t("Skills Intel", "स्किल्स इंटेल")}
              </TabsTrigger>
              <TabsTrigger value="vulnerability" className="text-xs">
                {t("AI Vulnerability", "AI भेद्यता")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="hiring">
              <HiringTrends city={city} onCityChange={setCity} timeRange={timeRange} onTimeChange={setTimeRange} />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsIntel />
            </TabsContent>
            <TabsContent value="vulnerability">
              <VulnerabilityMap
                onGoToReskilling={() => setActiveView('reskilling')}
                onCitySelect={handleCitySelect}
              />
            </TabsContent>
          </Tabs>
        )}

        {activeView === 'skills' && canSee('skills') && <SkillsIntel />}

        {activeView === 'riskmap' && canSee('riskmap') && (
          <VulnerabilityMap
            onGoToReskilling={() => setActiveView('reskilling')}
            onCitySelect={handleCitySelect}
          />
        )}

        {activeView === 'reskilling' && canSee('reskilling') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <WorkerForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
            <div className="space-y-4">
              {riskResult && (
                <>
                  <RiskScoreCard result={riskResult} jobTitle={workerJob} city={workerCity} />
                  <ReskillingPath city={workerCity} />
                </>
              )}
              {!riskResult && !isLoading && (
                <div className="flex items-center justify-center h-64 border border-dashed border-border rounded-lg">
                  <p className="text-sm text-muted-foreground text-center px-8">
                    {t(
                      "Fill in your profile and click 'Generate My Path' to see your AI risk score and personalized reskilling roadmap.",
                      "अपनी प्रोफ़ाइल भरें और 'मेरा पाथ बनाएं' पर क्लिक करें।"
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeView === 'chat' && canSee('chat') && (
          <div className="max-w-2xl mx-auto">
            <Chatbot context={chatContext} />
          </div>
        )}
      </main>

      <footer className="border-t border-border py-3 text-center">
        <p className="text-[10px] text-muted-foreground">
          Skills Mirage · HACKaMINeD 2026 · {t("Live Workforce Intelligence Platform", "लाइव वर्कफोर्स इंटेलिजेंस प्लेटफॉर्म")}
        </p>
      </footer>
    </div>
  );
};

export default Index;
