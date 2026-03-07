import { motion } from 'framer-motion';

export default function SolutionOverview() {
  return (
    <section className="py-32 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900"
          >
            Transforming Job Data into <br/>
            <span className="text-orange-500">Career Intelligence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed"
          >
            Skills Mirage is an AI-powered workforce intelligence system. We ingest millions of real-time job postings, normalize the data, and convert those market signals into personalized, actionable reskilling paths for every worker.
          </motion.p>
        </div>

        {/* Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-transparent to-transparent z-10 bottom-[-2px] h-full pointer-events-none" />
          
          <div className="relative rounded-t-[2rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden aspect-video">
            {/* Fake Browser Toolbar */}
            <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-800 bg-gray-900">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="mx-auto bg-gray-800 rounded-md px-4 py-1 flex items-center text-xs text-gray-400 font-mono w-64 justify-center">
                app.skillsmirage.com
              </div>
            </div>
            
            {/* Fake Dashboard Content */}
            <div className="p-6 bg-[#0A0A0B] h-full grid grid-cols-12 gap-6 w-full blur-[1px] opacity-90 transition-all hover:blur-0">
              {/* Sidebar */}
              <div className="col-span-3 flex flex-col gap-4">
                <div className="h-8 w-32 bg-white/10 rounded-lg mb-4" />
                <div className="h-10 bg-orange-500/20 rounded-xl w-full" />
                <div className="h-10 bg-white/5 rounded-xl w-full" />
                <div className="h-10 bg-white/5 rounded-xl w-full" />
              </div>
              {/* Main Area */}
              <div className="col-span-9 flex flex-col gap-6">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="h-8 w-48 bg-white/10 rounded-lg mb-2" />
                    <div className="h-4 w-64 bg-white/5 rounded-md" />
                  </div>
                  <div className="h-10 w-32 bg-orange-500 rounded-full" />
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="h-32 bg-white/5 rounded-2xl border border-white/10 p-4 shrink-0 flex flex-col justify-end">
                    <div className="h-8 w-16 bg-red-500/50 rounded-md mb-2" />
                    <div className="h-4 w-24 bg-white/20 rounded-md" />
                  </div>
                  <div className="h-32 bg-white/5 rounded-2xl border border-white/10 p-4 shrink-0 flex flex-col justify-end">
                    <div className="h-8 w-16 bg-blue-500/50 rounded-md mb-2" />
                    <div className="h-4 w-24 bg-white/20 rounded-md" />
                  </div>
                  <div className="h-32 bg-white/5 rounded-2xl border border-white/10 p-4 shrink-0 flex flex-col justify-end">
                    <div className="h-8 w-16 bg-green-500/50 rounded-md mb-2" />
                    <div className="h-4 w-24 bg-white/20 rounded-md" />
                  </div>
                </div>

                <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-6 flex items-end gap-2 pb-0 overflow-hidden">
                  {/* Fake Chart bars */}
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-full bg-orange-500/50 rounded-t-sm" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
