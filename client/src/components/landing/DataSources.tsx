import { motion } from 'framer-motion';

const sources = [
  { name: "Naukri", domain: "Job Market Signals" },
  { name: "LinkedIn", domain: "Professional Network" },
  { name: "NPTEL", domain: "Academics & IT" },
  { name: "SWAYAM", domain: "Govt. Skilling" },
  { name: "PMKVY", domain: "Vocational Data" }
];

export default function DataSources() {
  return (
    <section className="py-20 bg-white border-b border-gray-100 overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 text-center w-full">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-10">
          Powered by verified job market and academic intelligence
        </p>

        {/* Marquee Container */}
        <div className="flex justify-center flex-wrap gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {sources.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-center gap-1 group cursor-default"
            >
              <span className="text-2xl md:text-3xl font-black text-gray-800 tracking-tighter group-hover:text-orange-500 transition-colors">
                {s.name}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-orange-400 transition-colors">
                {s.domain}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
