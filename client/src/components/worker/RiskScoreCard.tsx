import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Shield, Zap, Info, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface Signal {
  icon: string;
  text: string;
  textHi: string;
  source: string;
}

interface RiskResult {
  score: number;
  level: 'critical' | 'high' | 'medium' | 'low';
  percentile: number;
  signals: Signal[];
  normalizedTitle: string;
  category: string;
}

interface RiskScoreCardProps {
  result: RiskResult;
  city: string;
}

const RiskScoreCard = ({ result, city }: RiskScoreCardProps) => {
  const { t } = useLanguage();

  const levelStyles: Record<string, string> = {
    critical: 'border-red-500/30 bg-red-950/20',
    high: 'border-orange-500/30 bg-orange-950/20',
    medium: 'border-blue-500/30 bg-blue-950/20',
    low: 'border-emerald-500/30 bg-emerald-950/20',
  };

  const scoreColors: Record<string, string> = {
    critical: 'text-red-500',
    high: 'text-orange-500',
    medium: 'text-blue-500',
    low: 'text-emerald-500',
  };

  const levelLabels: Record<string, string> = {
    critical: t('CRITICAL RISK', 'गंभीर जोखिम'),
    high: t('HIGH EXPOSURE', 'उच्च जोखिम'),
    medium: t('MODERATE', 'मध्यम'),
    low: t('RESILIENT', 'लचीला'),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className={cn("bg-zinc-900/50 backdrop-blur-xl border shadow-2xl overflow-hidden rounded-3xl relative", levelStyles[result.level])}>
        <div className={cn(
          "absolute top-0 right-0 w-64 h-64 -mr-24 -mt-24 rounded-full blur-[100px] opacity-20 pointer-events-none",
          result.level === 'critical' ? 'bg-red-500' : result.level === 'high' ? 'bg-orange-500' : result.level === 'medium' ? 'bg-blue-500' : 'bg-emerald-500'
        )} />

        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 mb-10">
            <div className="text-center lg:text-left space-y-2 z-10">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <div className="p-1.5 bg-black/40 border border-white/10 rounded-lg">
                  <Shield className={cn("w-4 h-4", scoreColors[result.level])} />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{t("Layer 2 Intelligence Output", "लेयर 2 इंटेलिजेंस आउटपुट")}</span>
              </div>
              <h3 className="text-md font-medium text-zinc-300">
                {t("AI Displacement Risk Index", "AI विस्थापन जोखिम सूचकांक")}
              </h3>
              <div className="flex items-baseline justify-center lg:justify-start gap-3 mt-4">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className={cn("text-7xl lg:text-8xl font-black tracking-tighter tabular-nums", scoreColors[result.level])}
                >
                  {result.score}
                </motion.span>
                <span className="text-2xl font-bold text-zinc-700">/100</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className={cn(
                  "text-[10px] font-black px-4 py-1.5 rounded-full border tracking-[0.1em] uppercase shadow-sm bg-black/40",
                  scoreColors[result.level],
                  levelStyles[result.level].split(' ')[0]
                )}>
                  {levelLabels[result.level]}
                </span>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-white/5 rounded-full">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span className="text-[10px] font-medium text-zinc-300">{city}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-white/5 rounded-full">
                  <Search className="w-3 h-3 text-zinc-500" />
                  <span className="text-[10px] font-medium text-zinc-300">{result.normalizedTitle}</span>
                </div>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 p-8 rounded-3xl shadow-xl min-w-[220px] text-center lg:text-right relative overflow-hidden group z-10">
              <div className={cn("absolute top-0 right-0 w-1 h-full opacity-50", result.level === 'critical' ? 'bg-red-500' : 'bg-orange-500')} />
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                {t("Global Percentile", "वैश्विक पर्सेंटाइल")}
              </p>
              <p className="text-5xl font-black text-white group-hover:text-zinc-300 transition-colors">
                {result.percentile}<sup>th</sup>
              </p>
              <div className="mt-5 flex flex-col gap-2 items-center lg:items-end">
                <div className="flex items-center justify-end gap-2 text-[10px] font-medium text-zinc-400 leading-tight w-full text-right">
                  {t(`Vulnerability Higher than ${result.percentile}%`, `${result.percentile}% से अधिक जोखिम`)}
                  <Zap className={cn("w-3.5 h-3.5", scoreColors[result.level])} />
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden flex justify-end">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.percentile}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    className={cn("h-full rounded-full", result.level === 'critical' ? 'bg-red-500' : result.level === 'high' ? 'bg-orange-500' : 'bg-blue-500')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Signals Breakdown */}
          <div className="space-y-4 border-t border-white/5 pt-8 mt-8">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{t("LAYER 1 FEEDBACK SIGNALS", "लेयर 1 फीडबैक सिग्नल्स")}</h4>
              <Badge variant="outline" className={cn("text-[9px] font-bold border-white/10 bg-black/40 px-3 py-1 uppercase", scoreColors[result.level])}>
                {result.signals.length} {t("Active V1 Signals", "सक्रिय V1 सिग्नल्स")}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.signals.map((signal, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="group relative p-5 bg-black/40 hover:bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-xl shrink-0">
                      {i === 0 ? '📍' : i === 1 ? '🤖' : '🚨'}
                    </div>
                    <div className="space-y-1 mt-1">
                      <p className={cn("text-[10px] font-bold uppercase tracking-widest", scoreColors[result.level])}>{signal.source}</p>
                      <p className="text-xs font-medium leading-relaxed text-zinc-300 group-hover:text-white transition-colors">
                        {t(signal.text, signal.textHi)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

import { Badge } from '@/components/ui/badge';
export default RiskScoreCard;
