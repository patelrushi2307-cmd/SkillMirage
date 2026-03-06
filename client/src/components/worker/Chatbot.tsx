import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageCircle, Bot, User, Sparkles, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

interface ChatbotProps {
  context: any;
}

const Chatbot = ({ context }: ChatbotProps) => {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = {
    en: [
      "Why is my risk score so high?",
      "Which skills should I prioritize first?",
      "Are there jobs in " + (context?.city || "my city") + " for me?",
      "Explain the " + (context?.category || "my industry") + " hiring trend",
    ],
    hi: [
      "मेरा रिस्क स्कोर इतना ज़्यादा क्यों है?",
      "मुझे कौन से स्किल पहले सीखने चाहिए?",
      "क्या " + (context?.city || "मेरे शहर") + " में मेरे लिए नौकरियाँ हैं?",
      "मेरे उद्योग की भर्ती के रुझान को समझाएं",
    ],
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify({
          messages: newMessages,
          context: {
            ...context,
            l1Signals: context?.signals?.map((s: any) => s.text)
          },
          lang: lang
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, data]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'bot', content: 'Connection Error. Please ensure the backend is running.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="bg-zinc-900/50 border border-white/5 backdrop-blur-xl shadow-2xl flex flex-col h-[600px] rounded-3xl overflow-hidden text-zinc-100">
      <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 opacity-50" />
      <CardContent className="p-0 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-black/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <BrainCircuit className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide">
                {t("AI Career Strategist", "AI करियर रणनीतिकार")}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
                  {t("Context: Active Intelligence", "संदर्भ: सक्रिय इंटेलिजेंस")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">{lang === 'en' ? 'EN' : 'HI'}</span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth thin-scrollbar min-h-0">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="flex flex-col items-center text-center p-6 bg-purple-500/5 rounded-3xl border border-dashed border-purple-500/20 mb-8 mt-2">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20 mb-4">
                  <MessageCircle className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-xs font-bold text-purple-400/80 uppercase tracking-widest mb-2">{t("Live Advisory Bound", "लाइव सलाहकार सीमा")}</p>
                <p className="text-[13px] font-medium text-zinc-400 leading-relaxed max-w-sm">
                  {t("I am trained on your Layer 1 signals and Layer 2 profile. Ask me anything about your transition strategy.", "मैं आपके लेयर 1 सिग्नल्स और लेयर 2 प्रोफाइल पर प्रशिक्षित हूँ। अपनी परिवर्तन रणनीति के बारे में कुछ भी पूछें।")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(lang === 'hi' ? sampleQuestions.hi : sampleQuestions.en).map((q, i) => (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="w-full text-left text-xs p-4 rounded-2xl bg-black/20 hover:bg-purple-500/10 text-zinc-300 hover:text-purple-300 transition-all border border-white/5 hover:border-purple-500/30 group font-medium"
                  >
                    <div className="flex items-center justify-between">
                      <span className="leading-relaxed">"{q}"</span>
                      <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={i}
                className={cn(
                  "flex gap-4",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === 'bot' && (
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-purple-400" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-2xl p-4 max-w-[85%] text-[13px] leading-relaxed",
                    msg.role === 'user'
                      ? "bg-zinc-800 border border-white/10 text-white rounded-tr-sm"
                      : "bg-purple-500/10 border border-purple-500/20 text-purple-50 rounded-tl-sm"
                  )}
                >
                  {msg.role === 'bot' ? (
                    <div className="prose prose-invert prose-sm max-w-none [&_p]:my-2 [&_strong]:text-purple-300 [&_a]:text-purple-400 [&_ul]:my-2 [&_li]:my-1">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <span className="font-medium text-zinc-200">{msg.content}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 items-start"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-purple-400" />
              </div>
              <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl rounded-tl-sm px-5 py-3.5 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 sm:p-6 bg-black/40 border-t border-white/5 shrink-0">
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(input); }}
            className="flex gap-3"
          >
            <div className="relative flex-1 group">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t("Ask your AI assistant...", "अपने AI सहायक से पूछें...")}
                className="bg-black/50 border-white/10 text-white text-sm h-12 rounded-xl pl-4 pr-10 focus-visible:ring-1 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all placeholder:text-zinc-600 disabled:opacity-50"
                disabled={isTyping}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="h-12 w-12 p-0 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all disabled:opacity-50 shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
