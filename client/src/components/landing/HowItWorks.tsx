import { motion } from 'framer-motion';
import { UserCircle, Activity, Crosshair, Route } from 'lucide-react';

const steps = [
  {
    title: "1. Enter Profile",
    desc: "Provide your current job title and location.",
    icon: <UserCircle className="w-6 h-6 text-gray-700" />
  },
  {
    title: "2. Analyze Signals",
    desc: "We scan real job market data.",
    icon: <Activity className="w-6 h-6 text-gray-700" />
  },
  {
    title: "3. Get Risk Score",
    desc: "Receive an AI career risk score.",
    icon: <Crosshair className="w-6 h-6 text-gray-700" />
  },
  {
    title: "4. Reskill",
    desc: "Follow a personalized learning roadmap.",
    icon: <Route className="w-6 h-6 text-gray-700" />
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#F8F9FA] text-gray-900 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight mb-4"
          >
            How It Works
          </motion.h2>
          <p className="text-gray-500 font-medium">Four simple steps to future-proof your career.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gray-200 z-0" />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-white border border-gray-100 shadow-md rounded-2xl flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 px-4 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
