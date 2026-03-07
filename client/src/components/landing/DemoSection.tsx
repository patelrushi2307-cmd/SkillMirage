import { motion } from 'framer-motion';
import { MonitorPlay, Search, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';

export default function DemoSection() {
  return (
    <section className="py-32 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight mb-4"
          >
            See It In Action
          </motion.h2>
          <p className="text-lg text-gray-500 font-medium">A seamless, AI-driven workflow that protects your livelihood.</p>
        </div>

        <div className="relative">
          {/* Connector Line hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-gray-200 via-orange-500/50 to-orange-500 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10 relative z-10">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col h-[280px]"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6">
                <MonitorPlay className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-lg font-bold mb-2">1. Open Dashboard</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">Access the live platform tracking global job posting surges and crashes.</p>
              
              <div className="h-16 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <div className="w-20 h-2 bg-gray-300 rounded mb-1" />
                  <div className="w-12 h-2 bg-gray-200 rounded" />
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col h-[280px]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">2. Enter Profile</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">Tell us your job title, location, and years of experience.</p>
              
              <div className="h-16 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center w-full">
                <span className="text-xs font-mono text-blue-500 font-bold bg-white px-2 py-1 rounded">Job: Tester</span>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 text-white p-6 rounded-3xl shadow-xl flex flex-col h-[280px]"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">3. Risk Score</h3>
              <p className="text-sm text-white/50 mb-6 flex-1">Our AI cross-references your profile against automation trends.</p>
              
              <div className="h-16 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center justify-between w-full">
                <span className="text-xs font-bold text-red-400">Vulnerability</span>
                <span className="text-xl font-black text-red-500">82%</span>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-orange-500 text-white p-6 rounded-3xl shadow-xl shadow-orange-500/20 flex flex-col h-[280px]"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">4. Reskilling Path</h3>
              <p className="text-sm text-white/80 mb-6 flex-1">Get an exact learning map utilizing NPTEL & SWAYAM.</p>
              
              <div className="h-16 bg-white/10 border border-white/20 rounded-xl space-y-1 p-2 w-full flex flex-col justify-center">
                <div className="w-full h-2 bg-white/30 rounded-full">
                  <div className="w-[30%] h-full bg-white rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-white/80 uppercase">
                  <span>Week 1</span>
                  <span>Week 8</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
