import { motion } from 'framer-motion';
import { Route, BookOpen, Clock } from 'lucide-react';

const steps = [
  { week: 'Week 1-3', course: 'NPTEL Data Basics', status: 'current' },
  { week: 'Week 4-5', course: 'SWAYAM AI Fundamentals', status: 'upcoming' },
  { week: 'Week 6-8', course: 'Advanced Cloud Architecture', status: 'upcoming' },
];

export default function ReskillingPathCard() {
  return (
    <div className="w-full h-full flex flex-col relative w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6 z-10 w-full relative">
        <div>
          <h2 className="text-white font-semibold text-lg flex items-center gap-2">
            Reskilling Timeline
            <Route className="w-4 h-4 text-green-400" />
          </h2>
          <p className="text-zinc-500 text-sm">Personalized trajectory</p>
        </div>
      </div>

      <div className="flex-1 relative pl-6 mt-4 w-full">
        {/* Vertical line connector */}
        <div className="absolute left-[31px] top-4 bottom-8 w-px bg-zinc-800" />

        <div className="space-y-8 w-full">
          {steps.map((step, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
              key={index} 
              className="relative flex items-start gap-6 group w-full pr-4"
            >
              {/* Dot */}
              <div className={`w-4 h-4 rounded-full mt-1.5 shrink-0 z-10 transition-colors duration-300 ${
                step.status === 'current' 
                  ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] border-4 border-black box-content' 
                  : 'bg-zinc-700 border-4 border-black box-content group-hover:bg-zinc-500'
              }`} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-widest">{step.week}</span>
                </div>
                <div className={`p-3 rounded-lg border flex items-center gap-3 transition-colors ${
                  step.status === 'current'
                    ? 'bg-green-500/10 border-green-500/20 text-green-100'
                    : 'bg-white/5 border-white/5 text-zinc-300 group-hover:bg-white/10'
                }`}>
                  <BookOpen className={`w-4 h-4 shrink-0 ${step.status === 'current' ? 'text-green-400' : 'text-zinc-500'}`} />
                  <span className="font-medium text-sm truncate">{step.course}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
