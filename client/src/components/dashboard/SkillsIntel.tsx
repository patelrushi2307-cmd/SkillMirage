import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { risingSkills, decliningSkills, trainingGaps } from '@/data/skills';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const SkillsIntel = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rising Skills */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-success" />
              <h3 className="text-sm font-semibold text-foreground">
                {t("Rising Skills", "बढ़ते स्किल्स")}
              </h3>
              <span className="text-[10px] text-muted-foreground ml-auto">WoW</span>
            </div>
            <div className="space-y-1.5">
              {risingSkills.map((skill, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                    <span className="text-xs font-medium text-foreground">
                      {lang === 'hi' ? skill.nameHi : skill.name}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-success">+{skill.change}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Declining Skills */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-4 h-4 text-destructive" />
              <h3 className="text-sm font-semibold text-foreground">
                {t("Declining Skills", "घटते स्किल्स")}
              </h3>
              <span className="text-[10px] text-muted-foreground ml-auto">WoW</span>
            </div>
            <div className="space-y-1.5">
              {decliningSkills.map((skill, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                    <span className="text-xs font-medium text-foreground">
                      {lang === 'hi' ? skill.nameHi : skill.name}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-destructive">{skill.change}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Gap */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h3 className="text-sm font-semibold text-foreground">
              {t("Training vs Demand Gap", "ट्रेनिंग vs मांग का अंतर")}
            </h3>
          </div>
          <div className="space-y-3">
            {trainingGaps.map((gap, i) => {
              const surplus = gap.trained > gap.demanded;
              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">
                      {lang === 'hi' ? gap.skillHi : gap.skill}
                      <span className="text-muted-foreground ml-1">({gap.source})</span>
                    </span>
                    <span className={cn("font-bold", surplus ? "text-destructive" : "text-success")}>
                      {surplus ? "OVERSUPPLY" : "UNDERSUPPLY"}
                    </span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                    <div
                      className={cn("h-full rounded-full", surplus ? "bg-warning" : "bg-success")}
                      style={{ width: `${Math.min(100, (gap.trained / Math.max(gap.trained, gap.demanded)) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{t("Trained:", "प्रशिक्षित:")} {gap.trained.toLocaleString()}</span>
                    <span>{t("Jobs:", "जॉब्स:")} {gap.demanded.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsIntel;
