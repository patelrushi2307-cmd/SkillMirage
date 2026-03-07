import { motion } from 'framer-motion';
import { SearchX, UserX, Cpu, EyeOff } from 'lucide-react';

const stats = [
  {
    icon: <SearchX className="w-6 h-6 text-red-500" />,
    value: "45%",
    description: "of employers cannot find workers with the right skills",
    bg: "bg-red-50"
  },
  {
    icon: <UserX className="w-6 h-6 text-orange-500" />,
    value: "Millions",
    description: "of workers receive generic career advice that doesn't apply to them",
    bg: "bg-orange-50"
  },
  {
    icon: <Cpu className="w-6 h-6 text-blue-500" />,
    value: "High Risk",
    description: "AI automation is rapidly replacing many routine job roles",
    bg: "bg-blue-50"
  },
  {
    icon: <EyeOff className="w-6 h-6 text-gray-500" />,
    value: "Zero",
    description: "visibility into real job demand and local market needs for workers",
    bg: "bg-gray-100"
  }
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-white text-gray-900 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            The Skills Gap Crisis
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 font-medium max-w-2xl mx-auto"
          >
            The divide between what companies need and what workers know is growing larger every day.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow flex flex-col h-full"
            >
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-6`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black mb-3">{stat.value}</div>
              <p className="text-gray-500 font-medium text-sm leading-relaxed flex-1">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
