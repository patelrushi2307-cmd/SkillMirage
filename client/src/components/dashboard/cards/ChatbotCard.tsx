import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot } from 'lucide-react';

const presetQuestions = [
  "Why is my risk score high?",
  "Which skills should I learn?",
  "Are there any safe jobs?"
];

export default function ChatbotCard() {
  const [messages, setMessages] = useState<{role: 'system' | 'user', text: string}[]>([
    { role: 'system', text: "Hello! I'm your AI career coach. How can I assist your transition today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleAsk = (question: string) => {
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'system', 
        text: "Based on the latest Layer 1 data, your core skills are seeing a 40% decline in enterprise demand. I recommend immediately focusing on cloud fundamentals." 
      }]);
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col h-[300px]">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h2 className="text-white font-semibold text-lg flex items-center gap-2">
            AI Assistant
            <Bot className="w-4 h-4 text-purple-400" />
          </h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-black/40 border border-white/5 rounded-xl overflow-hidden min-h-0">
        <div className="flex-1 p-4 overflow-y-auto space-y-4 thin-scrollbar flex flex-col scroll-smooth">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800 text-white rounded-br-sm' 
                    : 'bg-purple-500/10 text-purple-100 border border-purple-500/20 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-sm flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-3 bg-white/5 border-t border-white/5 shrink-0">
          <div className="flex gap-2 overflow-x-auto thin-scrollbar pb-2">
            {presetQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleAsk(q)}
                disabled={isTyping}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="relative mt-2">
            <input 
              type="text" 
              placeholder="Type your question..." 
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-3 pr-10 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50"
              disabled={isTyping}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
