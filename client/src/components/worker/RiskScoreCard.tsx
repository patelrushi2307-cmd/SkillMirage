import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { RiskResult } from '@/lib/riskCalculator';
import { cn } from '@/lib/utils';
import { getRiskLevel } from '@/data/cities';
import { AlertTriangle, TrendingDown, Bot, Shield } from 'lucide-react';

interface RiskScoreCardProps {
  result: RiskResult;
  jobTitle: string;
  city: string;
}

const RiskScoreCard = ({ result, jobTitle, city }: RiskScoreCardProps) => {
  const { t } = useLanguage();
  const level = getRiskLevel(result.score);

  const levelClasses: Record<string, string> = {
    critical: 'border-destructive/50 glow-pulse',
    high: 'border-warning/50',
    medium: 'border-primary/50',
    low: 'border-success/50',
  };

  const scoreColors: Record<string, string> = {
    critical: 'text-destructive',
    high: 'text-warning',
    medium: 'text-primary',
    low: 'text-success',
  };

  const levelLabels: Record<string, string> = {
    critical: t('CRITICAL', 'गंभीर'),
    high: t('HIGH', 'उच्च'),
    medium: t('MEDIUM', 'मध्यम'),
    low: t('LOW', 'कम'),
  };

  const signalIcons = [
    <TrendingDown className="w-4 h-4" />,
    <Bot className="w-4 h-4" />,
    <AlertTriangle className="w-4 h-4" />,
  ];

  return (
    <Card className={cn("bg-card border-2 transition-all", levelClasses[level])}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground">
              {t("YOUR AI RISK", "आपका AI रिस्क")}
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={cn("text-5xl font-bold score-transition", scoreColors[level])}>
                {result.score}
              </span>
              <span className="text-lg text-muted-foreground">/100</span>
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-full",
                `risk-${level}`
              )}>
                {levelLabels[level]} 🔥
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {city} · {jobTitle}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">
              {t("vs Peers", "साथियों से")}
            </p>
            <p className="text-sm font-bold text-foreground">
              {result.percentile}th %ile
            </p>
            <p className="text-[10px] text-muted-foreground">
              {t(
                `More at-risk than ${result.percentile}%`,
                `${result.percentile}% से अधिक जोखिम में`
              )}
            </p>
          </div>
        </div>

        {/* Signals */}
        <div className="space-y-2.5 border-t border-border pt-3">
          <p className="text-xs font-medium text-muted-foreground">
            {t("3 Signals Cited", "3 सिग्नल्स")}:
          </p>
          {result.signals.map((signal, i) => (
            <div key={i} className="flex items-start gap-2 bg-muted/30 rounded-md p-2.5">
              <span className="text-sm mt-0.5">{signal.icon}</span>
              <div className="flex-1">
                <p className="text-xs text-foreground">{t(signal.text, signal.textHi)}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  [{signal.source}]
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Live indicator */}
        <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          {t(
            "LIVE: Updates when Layer 1 filters change",
            "लाइव: Layer 1 फिल्टर बदलने पर अपडेट होता है"
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScoreCard;
