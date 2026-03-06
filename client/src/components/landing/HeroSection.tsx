import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, TrendingUp, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0B] text-white">
      {/* Animated Background Gradients & Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-orange-500/20 via-transparent to-transparent rounded-full blur-[120px] opacity-70" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-orange-600/10 via-transparent to-transparent rounded-full blur-[100px] opacity-50" />
        
        {/* Abstract data lines */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 2 }}
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <BrainCircuit className="w-4 h-4" />
          <span>Powered by Live Market Intelligence</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60"
        >
          Understand Your <br className="hidden md:block" />
          Career Risk in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">AI Era</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-white/50 max-w-3xl mb-12 font-medium leading-relaxed"
        >
          Turn real job market signals into personalized reskilling paths. 
          Survive and thrive as automation reshapes the global workforce.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 100 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={() => navigate('/auth')}
            className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-bold transition-all hover:bg-gray-100 hover:scale-105"
          >
            Analyze My Career
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Floating abstract widgets */}
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute -left-10 md:left-10 top-1/4 hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl"
        >
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
            <TrendingUp className="text-orange-400 w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs text-white/50 uppercase font-bold tracking-wider">Demand Surge</div>
            <div className="text-sm font-medium text-white">+24% Data Engineers</div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
          className="absolute -right-10 md:right-10 top-1/3 hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl"
        >
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <BarChart3 className="text-red-400 w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs text-white/50 uppercase font-bold tracking-wider">Risk Alert</div>
            <div className="text-sm font-medium text-white">Manual QA at 78% Risk</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
