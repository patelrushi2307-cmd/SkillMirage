import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { risingSkills as defaultRising, decliningSkills as defaultDeclining, trainingGaps as defaultGaps } from '@/data/skills';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, AlertTriangle, Loader2, Brain, Zap, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const SkillsIntel = () => {
  const { t, lang } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ['skillsIntel'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/analytics/skills-intel`, {
        headers: { 'Authorization': 'Bearer test-token' }
      });
      return res.json();
    }
  });

  const displayRising = data?.topSkills?.filter((s: any) => s.growth.startsWith('+')) || defaultRising;
  const displayDeclining = data?.topSkills?.filter((s: any) => s.growth.startsWith('-')) || defaultDeclining;
  const displayGaps = defaultGaps;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 relative"
    >
      {isLoading && (
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-2xl">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="mt-4 text-xs font-bold text-primary uppercase tracking-widest animate-pulse">Computing Skill Vectors</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rising Skills */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white border-border shadow-sm hover:shadow-md transition-all overflow-hidden">
            <div className="h-1 w-full bg-success/40" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {t("Rising Skills", "बढ़ते स्किल्स")}
                    </h3>
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">High Growth Velocity</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[9px] font-bold border-muted-foreground/20 text-muted-foreground/60">WoW</Badge>
              </div>
              <div className="space-y-1">
                {displayRising.map((skill: any, i: number) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-muted-foreground/30 w-4 font-mono">{String(i + 1).padStart(2, '0')}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {lang === 'hi' ? skill.nameHi || skill.name : skill.name}
                        </span>
                        <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">
                          {skill.category || 'technology'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-success">{skill.growth}</span>
                      <Zap className="w-3 h-3 text-success/40" />
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-[11px] font-bold text-primary hover:bg-primary/5 rounded-xl h-10 group">
                {t("View Full Skill Graph", "पूरा स्किल ग्राफ देखें")}
                <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Declining Skills */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white border-border shadow-sm hover:shadow-md transition-all overflow-hidden">
            <div className="h-1 w-full bg-destructive/40" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {t("Declining Skills", "घटते स्किल्स")}
                    </h3>
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">Market Saturation Alert</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[9px] font-bold border-muted-foreground/20 text-muted-foreground/60">WoW</Badge>
              </div>
              <div className="space-y-1">
                {displayDeclining.map((skill: any, i: number) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-muted-foreground/30 w-4 font-mono">{String(i + 1).padStart(2, '0')}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground group-hover:text-destructive transition-colors">
                          {lang === 'hi' ? skill.nameHi || skill.name : skill.name}
                        </span>
                        <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">
                          {skill.category || 'legacy'}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-destructive">{skill.growth}</span>
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-[11px] font-bold text-destructive hover:bg-destructive/5 rounded-xl h-10 group">
                {t("Mitigation Strategies", "न्यूनीकरण रणनीतियां")}
                <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Training Gap Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white border-border shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b border-border bg-muted/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {t("Supply vs Demand Disparity", "सप्लाई vs डिमांड विसंगति")}
                  </h3>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">Workforce Equilibrium Index</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-success" />
                  <span className="text-[9px] font-bold text-muted-foreground uppercase">Opportunity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-warning" />
                  <span className="text-[9px] font-bold text-muted-foreground uppercase">Risk</span>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-8">
              {displayGaps.map((gap: any, i: number) => {
                const surplus = gap.trained > gap.demanded;
                const ratio = Math.min(100, (gap.trained / Math.max(gap.trained, gap.demanded)) * 100);
                return (
                  <div key={i} className="space-y-3">
                    <div className="flex items-end justify-between">
                      <div className="space-y-1">
                        <span className="text-sm font-bold text-foreground">
                          {lang === 'hi' ? gap.skillHi : gap.skill}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[9px] font-bold bg-muted text-muted-foreground/70 uppercase px-1.5 py-0">
                            {gap.source}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md",
                          surplus ? "text-destructive bg-destructive/5 border border-destructive/10" : "text-success bg-success/5 border border-success/10"
                        )}>
                          {surplus ? "Oversupply" : "Undersupply"}
                        </span>
                      </div>
                    </div>

                    <div className="relative pt-2">
                      <div className="flex h-3 w-full rounded-full bg-muted/40 overflow-hidden outline outline-1 outline-offset-2 outline-muted/30">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${ratio}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.3 + i * 0.1 }}
                          className={cn("h-full rounded-full shadow-inner", surplus ? "bg-warning" : "bg-success")}
                        />
                      </div>
                      <div className="flex justify-between mt-2 px-1">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-muted-foreground/40 uppercase">Workforce Base</span>
                          <span className="text-xs font-bold text-foreground/70">{gap.trained.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] font-black text-muted-foreground/40 uppercase">Target Capacity</span>
                          <span className="text-xs font-bold text-foreground/70">{gap.demanded.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default SkillsIntel;
