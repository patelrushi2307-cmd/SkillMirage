import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative py-40 bg-[#050505] overflow-hidden flex items-center justify-center text-center px-6">
      {/* Dynamic abstract background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-gradient-to-br from-orange-600 via-orange-400 to-red-500 rounded-full blur-[160px] opacity-30 mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tighter"
        >
          Prepare Your Career for the AI Future
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/60 mb-12 font-medium"
        >
          Stop guessing. Use real market signals to uncover your vulnerabilities and master the skills that employers actually want.
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/auth')}
          className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full text-xl font-bold transition-all hover:bg-gray-100 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          Start Career Analysis
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
}
