import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Download, ExternalLink, BookOpen, MapPin, Award, Loader2, Target, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

interface ReskillingPathProps {
  city: string;
  jobTitle: string;
  category: string;
}

const ReskillingPath = ({ city, jobTitle, category }: ReskillingPathProps) => {
  const { t } = useLanguage();
  const [currentWeek] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['reskillingPath', city, jobTitle, category],
    queryFn: async () => {
      const res = await fetch(`/api/worker/reskilling-path?city=${city}&role=${jobTitle}&category=${category}`, {
        headers: {
          'Authorization': 'Bearer test-token'
        }
      });
      return res.json();
    }
  });

  const weeks = data?.courses || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-zinc-900/50 border border-white/5 shadow-2xl backdrop-blur-xl rounded-3xl overflow-hidden relative border-t-0 text-zinc-100">
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-50" />

        {isLoading && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-20 flex flex-col items-center justify-center">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="mt-6 text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] animate-pulse">Architecting Reskilling Trajectory</p>
          </div>
        )}

        <CardContent className="p-8 lg:p-10 space-y-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                  <Target className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">{t("Strategic Reskilling", "रणनीतिक रीस्किलिंग")}</span>
              </div>
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                {t("Personal Growth Roadmap", "व्यक्तिगत विकास रोडमैप")}
              </h3>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase py-1.5 px-3 tracking-wider">
                  {t("Target:", "लक्ष्य:")} {jobTitle}
                </Badge>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-tight">{city} Verified</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2 h-10 rounded-xl px-4 font-bold text-xs uppercase border-white/10 hover:bg-white/5 text-zinc-300 transition-all shadow-sm">
              <Download className="w-4 h-4" />
              {t("Export", "निर्यात")}
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">{t("Current Milestone", "वर्तमान मील का पत्थर")}</span>
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">{t(`Week ${currentWeek} of 8`, `हफ्ता ${currentWeek}/8`)}</span>
            </div>
            <div className="relative pt-2">
              <Progress value={(currentWeek / 8) * 100} className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-full" style={{ transform: `translateX(-${100 - (currentWeek / 8) * 100}%)` }} />
              </Progress>
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-0 right-0 -mt-8"
              >
                <span className="text-[9px] font-bold bg-blue-600 text-white py-1 px-2.5 rounded-lg shadow-xl uppercase tracking-widest">
                  {Math.round((currentWeek / 8) * 100)}% COMPLETE
                </span>
              </motion.div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-8 space-y-6 pt-2">
            <div className="absolute left-[15px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-blue-500 via-white/10 to-transparent rounded-full" />

            <Accordion type="multiple" defaultValue={["0"]} className="space-y-4">
              {weeks.map((week: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <AccordionItem value={String(i)} className="border border-white/5 rounded-2xl overflow-hidden bg-black/40 hover:bg-black/60 transition-all shadow-sm group">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline">
                      <div className="flex items-center gap-5 text-left w-full">
                        <div className={cn(
                          "w-8 h-8 rounded-full border-2 shadow-xl flex items-center justify-center z-10 transition-all shrink-0 ml-[-41px]",
                          i === currentWeek ? "bg-blue-500 border-blue-400 text-white" : "bg-zinc-900 border-white/10 text-zinc-500"
                        )}>
                          {i < currentWeek ? <CheckCircle2 className="w-4 h-4 text-zinc-400" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">{week.range}</span>
                            <div className="h-1 w-1 rounded-full bg-zinc-600" />
                            <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-wider">{week.duration} Engagement</span>
                          </div>
                          <p className="text-base font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                            {week.title}
                          </p>
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{week.provider}</p>
                        </div>

                        <div className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          <div className="p-2.5 rounded-xl bg-white/5 text-zinc-400 border border-white/5 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                            <BookOpen className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-8 pt-2">
                      <div className="ml-[1px] pl-8 border-l border-dashed border-white/10 space-y-6">
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">{t("Curriculum Topics", "पाठ्यक्रम विषय")}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {week.topics.map((topic: string, j: number) => (
                              <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 group/topic hover:bg-white/5 transition-all">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover/topic:scale-150 transition-transform" />
                                <span className="text-xs font-medium text-zinc-300">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                          <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-12 px-6 shadow-xl transition-all" asChild>
                            <a href={week.link} target="_blank" rel="noopener noreferrer">
                              <span className="text-xs font-bold uppercase tracking-widest">{t("Enroll Experience", "एनरोल एक्सपीरियंस")}</span>
                              <ExternalLink className="w-3.5 h-3.5 ml-2" />
                            </a>
                          </Button>
                          <div className="flex-1 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3">
                            <Award className="w-5 h-5 text-blue-400" />
                            <div>
                              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest leading-relaxed">Certification Status</p>
                              <p className="text-[11px] font-medium text-zinc-300">Verified National Academic Credit</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

import { Badge } from '@/components/ui/badge';
export default ReskillingPath;
