import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Target } from 'lucide-react';

export default function WorkerScoreCard() {
  const [count, setCount] = useState(0);
  const targetScore = 87;
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });

    let startTimestamp: number;
    const duration = 2000; // 2 seconds counting animation

    const animateCount = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      
      const currentCount = Math.min(Math.floor((progress / duration) * targetScore), targetScore);
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [controls, targetScore]);

  return (
    <div className="w-full h-full flex flex-col justify-between relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-[50px] pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4 z-10 w-full relative">
        <h2 className="text-white font-semibold flex items-center gap-2">
          Worker Risk Score
          <Target className="w-4 h-4 text-red-500" />
        </h2>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="flex-1 flex flex-col items-center justify-center relative z-10 py-6 w-full"
      >
        <div className="relative">
          <span className="text-[5rem] lg:text-[7rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-red-500/50 tabular-nums">
            {count}
          </span>
          <span className="absolute -right-6 top-4 text-2xl text-white/40 font-bold">/100</span>
        </div>
        
        <div className="mt-8 flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full w-full justify-center">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 font-medium text-sm">Critical Vulnerability Detected</span>
        </div>
      </motion.div>
    </div>
  );
}
