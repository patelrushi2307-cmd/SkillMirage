import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatResponses, defaultResponse, ChatContext } from '@/data/chatResponses';
import { Send, MessageCircle, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

interface ChatbotProps {
  context: ChatContext;
}

const sampleQuestions = {
  en: [
    "Why is my risk score so high?",
    "What jobs are safer for someone like me?",
    "Show paths under 3 months",
    "How many BPO jobs in Indore right now?",
    "मुझे क्या करना चाहिए?",
  ],
  hi: [
    "मेरा रिस्क स्कोर इतना ज़्यादा क्यों है?",
    "मेरे जैसे किसी के लिए कौन सी नौकरियां सुरक्षित हैं?",
    "3 महीने से कम का पाथ दिखाएं",
    "इंदौर में कितनी BPO जॉब्स हैं?",
    "मुझे क्या करना चाहिए?",
  ],
};

const Chatbot = ({ context }: ChatbotProps) => {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const getResponse = (query: string): string => {
    for (const resp of chatResponses) {
      if (resp.pattern.test(query)) {
        return lang === 'hi' ? resp.hi(context) : resp.en(context);
      }
    }
    return lang === 'hi' ? defaultResponse.hi(context) : defaultResponse.en(context);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <Card className="bg-card border-border flex flex-col h-[500px]">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">
            {t("Ask me anything about your career", "अपने करियर के बारे में कुछ भी पूछें")}
          </h3>
          <span className="text-[10px] text-muted-foreground ml-auto">
            {lang === 'en' ? 'EN' : 'हिंदी'}
          </span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground text-center mb-3">
                {t("Try asking:", "पूछकर देखें:")}
              </p>
              {(lang === 'hi' ? sampleQuestions.hi : sampleQuestions.en).map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left text-xs p-2.5 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/50"
                >
                  {i + 1}. "{q}"
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-2",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === 'bot' && (
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "rounded-lg px-3 py-2 max-w-[85%] text-xs",
                  msg.role === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                {msg.role === 'bot' ? (
                  <div className="prose prose-xs prose-invert max-w-none [&_p]:my-1 [&_strong]:text-foreground [&_a]:text-primary [&_li]:my-0.5">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-start">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-primary" />
              </div>
              <div className="bg-muted rounded-lg px-4 py-3 flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border">
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(input); }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t("Type your question...", "अपना सवाल टाइप करें...")}
              className="bg-background border-border text-xs h-9"
            />
            <Button type="submit" size="sm" disabled={!input.trim()} className="h-9 w-9 p-0">
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
