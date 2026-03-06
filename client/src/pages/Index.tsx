import { useState, useMemo, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopNav from '@/components/dashboard/TopNav';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';

import WorkerForm from '@/components/worker/WorkerForm';
import RiskScoreCard from '@/components/worker/RiskScoreCard';
import ReskillingPath from '@/components/worker/ReskillingPath';
import Chatbot from '@/components/worker/Chatbot';
import JobMarket from '@/components/dashboard/JobMarket';
import EmployerInsights from '@/components/dashboard/EmployerInsights';
import { Sparkles, BrainCircuit } from 'lucide-react';

// Animated cards
import HiringTrendsCard from '@/components/dashboard/cards/HiringTrendsCard';
import SkillsCard from '@/components/dashboard/cards/SkillsCard';
import VulnerabilityCard from '@/components/dashboard/cards/VulnerabilityCard';
import WorkerScoreCard from '@/components/dashboard/cards/WorkerScoreCard';
import ReskillingPathCard from '@/components/dashboard/cards/ReskillingPathCard';
import ChatbotCard from '@/components/dashboard/cards/ChatbotCard';

const Index = () => {
  const { t } = useLanguage();
  const { role } = useAuth();

  const defaultView = role === 'worker' ? 'analysis' : 'dashboard';
  const [activeView, setActiveView] = useState(defaultView);

  const [riskResult, setRiskResult] = useState<any | null>(null);
  const [workerCity, setWorkerCity] = useState('Pune');
  const [workerJob, setWorkerJob] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (role === 'worker') setActiveView('analysis');
    else if (role === 'recruiter') setActiveView('dashboard');
  }, [role]);

  const handleFormSubmit = async (data: { jobTitle: string; city: string; experience: number; description: string }) => {
    setIsLoading(true);
    setWorkerCity(data.city);

    try {
      const res = await fetch('/api/worker/risk-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      setRiskResult(result);
      setWorkerJob(result.normalizedTitle || data.jobTitle);
    } catch (e) {
      console.error('Submission error:', e);
      setWorkerJob(data.jobTitle);
      setRiskResult({
        score: 65,
        level: 'high',
        percentile: 72,
        signals: [{ source: 'Fallback', text: 'Connection to Layer 1 lost. Using local heuristic.', textHi: 'लोकल अनुमान' }],
        category: 'General'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const chatContext = useMemo(() => {
    return {
      city: workerCity,
      jobTitle: workerJob,
      category: riskResult?.category,
      riskScore: riskResult?.score,
      signals: riskResult?.signals,
      extractedIntel: riskResult?.extractedIntel
    };
  }, [workerCity, workerJob, riskResult]);

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 flex font-sans selection:bg-orange-500/20 selection:text-orange-400">

      {/* Background Noise & Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-[64px] min-h-screen relative z-10 transition-all duration-300">
        <TopNav />

        <main className="flex-1 p-6 lg:p-10 w-full max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex flex-col gap-6"
              >
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">Overview</h1>
                    <p className="text-sm text-zinc-500">Live signals and intelligence tracking.</p>
                  </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(300px,auto)] gap-6">
                  <div className="md:col-span-8 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col hover:-translate-y-1 transition-transform duration-300 min-h-[350px]">
                    <HiringTrendsCard />
                  </div>
                  <div className="md:col-span-4 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col hover:-translate-y-1 transition-transform duration-300 min-h-[350px]">
                    <WorkerScoreCard />
                  </div>
                  <div className="md:col-span-5 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col hover:-translate-y-1 transition-transform duration-300 min-h-[300px]">
                    <SkillsCard />
                  </div>
                  <div className="md:col-span-7 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col hover:-translate-y-1 transition-transform duration-300 min-h-[300px]">
                    <VulnerabilityCard />
                  </div>
                  <div className="md:col-span-6 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col hover:-translate-y-1 transition-transform duration-300 min-h-[350px]">
                    <ReskillingPathCard />
                  </div>
                  <div className="md:col-span-6 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col hover:-translate-y-1 transition-transform duration-300 min-h-[350px]">
                    <ChatbotCard />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Support rendering of old detailed views */}
            {activeView === 'skills' && (
              <motion.div key="skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <JobMarket />
              </motion.div>
            )}

            {activeView === 'vulnerability' && (
              <motion.div key="vulnerability" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmployerInsights />
              </motion.div>
            )}

            {activeView === 'analysis' && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white/5 p-8 rounded-3xl border border-white/10"
              >
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-2xl p-2 text-zinc-900"><WorkerForm onSubmit={handleFormSubmit} isLoading={isLoading} /></div>
                </div>
                <div className="lg:col-span-7 space-y-10">
                  {riskResult ? (
                    <>
                      <RiskScoreCard result={riskResult} city={workerCity} />
                      <div className="bg-white rounded-2xl p-2 text-zinc-900"><ReskillingPath city={workerCity} jobTitle={workerJob} category={riskResult.category} /></div>
                    </>
                  ) : !isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[500px] border border-dashed border-white/20 bg-white/5 rounded-[2.5rem] p-12 text-center group">
                      <div className="w-28 h-28 bg-white/10 rounded-[2rem] flex items-center justify-center shadow-2xl mb-10 border border-white/10">
                        <BrainCircuit className="w-12 h-12 text-zinc-400 group-hover:text-orange-400 transition-colors" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Awaiting Input Signals</h2>
                      <p className="text-sm text-zinc-400 max-w-md mx-auto font-medium leading-relaxed">
                        Supply your career parameters to generate displacement risk and reskilling paths.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center min-h-[500px]">
                      <div className="relative">
                        <div className="w-24 h-24 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-10 h-10 text-orange-500 animate-pulse" />
                        </div>
                      </div>
                      <p className="mt-8 text-[10px] font-black text-orange-600 uppercase tracking-[0.3em] animate-pulse">Running Neural Cross-Verification</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeView === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-4xl mx-auto w-full bg-[#111113] rounded-2xl overflow-hidden border border-white/10 custom-chat-layout"
              >
                <Chatbot context={chatContext} />
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>
    </div>
  );
};

export default Index;
