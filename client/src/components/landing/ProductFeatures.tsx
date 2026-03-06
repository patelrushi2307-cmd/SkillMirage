import { motion } from 'framer-motion';
import { LineChart, BookOpen, Skull, Map } from 'lucide-react';

const features = [
  {
    title: "Hiring Trends Dashboard",
    description: "Visualizes job demand across cities and sectors with real-time accuracy.",
    icon: <Map className="w-5 h-5 text-blue-500" />,
    color: "bg-blue-50"
  },
  {
    title: "Skills Intelligence",
    description: "Identifies rising and declining skills in the market instantly.",
    icon: <LineChart className="w-5 h-5 text-indigo-500" />,
    color: "bg-indigo-50"
  },
  {
    title: "AI Vulnerability Index",
    description: "Scores jobs from 0–100 based on their probability of automation.",
    icon: <Skull className="w-5 h-5 text-red-500" />,
    color: "bg-red-50"
  },
  {
    title: "Reskilling Roadmap",
    description: "Creates week-by-week learning plans using NPTEL and SWAYAM courses.",
    icon: <BookOpen className="w-5 h-5 text-green-500" />,
    color: "bg-green-50"
  }
];

export default function ProductFeatures() {
  return (
    <section className="py-24 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight"
          >
            Powerful Features
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col group overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.color}`}>
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold">{feat.title}</h3>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed mb-8 relative z-10 flex-1">
                {feat.description}
              </p>

              {/* Fake UI Screenshot inside card */}
              <div className="w-full h-48 bg-white rounded-t-xl border border-gray-200 border-b-0 shadow-sm overflow-hidden relative group-hover:-translate-y-2 transition-transform duration-300">
                <div className="flex px-3 py-2 border-b border-gray-100 gap-1 bg-gray-50/50">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                </div>
                <div className="p-4 grid grid-cols-4 gap-3">
                  <div className="col-span-1 h-16 bg-gray-50 rounded" />
                  <div className="col-span-3 h-16 bg-gray-50 rounded flex items-end px-2 space-x-1">
                    <div className="w-full bg-gray-200 h-[30%] rounded-t-sm" />
                    <div className="w-full bg-gray-200 h-[60%] rounded-t-sm" />
                    <div className="w-full bg-gray-200 h-[40%] rounded-t-sm" />
                    <div className="w-full bg-gray-300 h-[90%] rounded-t-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
