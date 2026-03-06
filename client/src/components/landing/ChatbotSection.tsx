import { motion } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';

export default function ChatbotSection() {
  return (
    <section className="py-32 bg-[#0A0A0B] flex flex-col items-center justify-center border-t border-white/5 text-white overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>Multilingual Support</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-6"
        >
          Ask the AI Career Coach
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/50 mb-16 max-w-2xl mx-auto text-lg"
        >
          Get precise answers in English or Hindi. Understand why your job is at risk and exactly what you need to learn to protect your income.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/5 border border-white/10 p-6 rounded-[2rem] max-w-2xl mx-auto text-left backdrop-blur-md shadow-2xl"
        >
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-white/70" />
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-sm px-6 py-4 border border-white/5 text-sm text-white/90">
                Why is my risk score 78%? Do I need to change my job?
              </div>
            </div>

            <div className="flex gap-4 flex-row-reverse">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-orange-500" />
              </div>
              <div className="bg-orange-500/10 rounded-2xl rounded-tr-sm px-6 py-4 border border-orange-500/20 text-sm text-white/90">
                Your score is high because routine Data Entry tasks are rapidly being automated by LLMs. You don't need to change fields, but you should upgrade to "Data Analyst" by learning SQL and basic Python. Should I generate a learning path for this?
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-white/70" />
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-sm px-6 py-4 border border-white/5 text-sm text-white/90">
                क्या मैं इन स्किल्स को मुफ्त में सीख सकता हूँ?
              </div>
            </div>

            <div className="flex gap-4 flex-row-reverse">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-orange-500" />
              </div>
              <div className="bg-orange-500/10 rounded-2xl rounded-tr-sm px-6 py-4 border border-orange-500/20 text-sm text-white/90 flex flex-col gap-2">
                <span>हाँ, बिल्कुल। मैंने NPTEL और SWAYAM से मुफ्त कोर्स खोजे हैं। यहाँ 'Python for Data Science' का 8-हफ्ते का रोडमैप है।</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-max text-xs transition-colors mt-2">
                  View Roadmap
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
