import { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionOverview from '@/components/landing/SolutionOverview';
import ProductFeatures from '@/components/landing/ProductFeatures';
import DashboardPreview from '@/components/landing/DashboardPreview';
import HowItWorks from '@/components/landing/HowItWorks';
import ChatbotSection from '@/components/landing/ChatbotSection';
import DataSources from '@/components/landing/DataSources';
import DemoSection from '@/components/landing/DemoSection';
import FinalCTA from '@/components/landing/FinalCTA';

export default function Landing() {
  useEffect(() => {
    // Reset scroll when landing page mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-500/10 selection:text-orange-600 overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionOverview />
      <ProductFeatures />
      <DashboardPreview />
      <HowItWorks />
      <ChatbotSection />
      <DataSources />
      <DemoSection />
      <FinalCTA />
      
      <footer className="w-full py-10 bg-black text-white/50 text-center text-sm border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Skills Mirage Enterprise. All rights reserved.</p>
      </footer>
    </div>
  );
}
