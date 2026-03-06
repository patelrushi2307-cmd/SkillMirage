import { motion } from 'framer-motion';

export default function DashboardPreview() {
  return (
    <section className="py-32 bg-[#050505] text-white overflow-hidden flex flex-col items-center border-y border-white/5">
      <div className="text-center mb-16 max-w-2xl px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500 mb-6"
        >
          Intelligence at a Glance
        </motion.h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-7xl px-4 md:px-10"
      >
        <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 shadow-[0_0_80px_rgba(255,100,0,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Hiring Trends Chart */}
            <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col min-h-[300px]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-bold">Hiring Trends</h3>
                  <p className="text-xs text-white/40">Last 30 days market activity</p>
                </div>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                  +12.4% Surge
                </div>
              </div>
              <div className="flex-1 w-full bg-gradient-to-t from-orange-500/20 to-transparent relative rounded-lg border-b border-orange-500/50">
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  <path d="M0,100 Q50,80 100,90 T200,60 T300,70 T400,20 L400,100 L0,100 Z" fill="rgba(249, 115, 22, 0.2)" stroke="none" />
                  <path d="M0,100 Q50,80 100,90 T200,60 T300,70 T400,20" fill="none" stroke="rgb(249, 115, 22)" strokeWidth="3" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Skills Demand Bar */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-6">Skills Demand</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Python', p: 90, color: 'bg-blue-500' },
                    { name: 'Gen AI', p: 85, color: 'bg-purple-500' },
                    { name: 'React', p: 70, color: 'bg-cyan-500' },
                  ].map(s => (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs mb-1 font-medium">
                        <span>{s.name}</span>
                        <span className="text-white/40">{s.p}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className={`h-2 rounded-full ${s.color}`} style={{ width: `${s.p}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* City Heatmap Fake */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-4">City Heatmap</h3>
                <div className="flex-1 grid grid-cols-5 gap-1">
                  {[...Array(25)].map((_, i) => {
                    const opacity = Math.random() * 0.8 + 0.1;
                    return (
                      <div 
                        key={i} 
                        className="rounded bg-orange-500" 
                        style={{ opacity, borderRadius: '4px' }} 
                      />
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
