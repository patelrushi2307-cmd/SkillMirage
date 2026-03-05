import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Download, ExternalLink, BookOpen, MapPin, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReskillingPathProps {
  city: string;
}

const ReskillingPath = ({ city }: ReskillingPathProps) => {
  const { t } = useLanguage();
  const [currentWeek] = useState(0);

  const weeks = [
    {
      range: t("Week 1-3", "हफ्ता 1-3"),
      title: t("NPTEL Data Analysis Basics (IIT Madras)", "NPTEL डेटा एनालिसिस बेसिक्स (IIT मद्रास)"),
      hours: t("6 hr/wk", "6 घंटे/हफ्ता"),
      icon: <BookOpen className="w-4 h-4" />,
      link: "https://swayam.gov.in/explorer?searchText=data+analysis",
      linkText: t("Enroll Free → swayam.gov.in/nptel-data", "मुफ्त एनरोल करें → swayam.gov.in"),
      color: "text-primary",
      topics: [
        t("Introduction to data types and structures", "डेटा टाइप्स और स्ट्रक्चर्स का परिचय"),
        t("Basic statistics and probability", "बेसिक स्टैटिस्टिक्स और प्रोबेबिलिटी"),
        t("Data visualization with Python", "Python से डेटा विज़ुअलाइज़ेशन"),
        t("Hands-on: Analyze real BPO metrics", "प्रैक्टिकल: BPO मेट्रिक्स का विश्लेषण"),
      ],
    },
    {
      range: t("Week 4-5", "हफ्ता 4-5"),
      title: t("SWAYAM Quality Assurance Fundamentals", "SWAYAM क्वालिटी एश्योरेंस फंडामेंटल्स"),
      hours: t("4 hr/wk", "4 घंटे/हफ्ता"),
      icon: <Award className="w-4 h-4" />,
      link: "https://swayam.gov.in/explorer?searchText=quality+assurance",
      linkText: t("Enroll → swayam.gov.in/qa-fundamentals", "एनरोल करें → swayam.gov.in"),
      color: "text-success",
      topics: [
        t("QA methodologies: Six Sigma, Lean", "QA मेथडोलॉजी: Six Sigma, Lean"),
        t("Process documentation and auditing", "प्रोसेस डॉक्यूमेंटेशन और ऑडिटिंग"),
        t("Root cause analysis frameworks", "रूट कॉज़ एनालिसिस फ्रेमवर्क"),
      ],
    },
    {
      range: t("Week 6-8", "हफ्ता 6-8"),
      title: t(`PMKVY Data Quality Certification (${city} center)`, `PMKVY डेटा क्वालिटी सर्टिफिकेशन (${city} सेंटर)`),
      hours: t("10 hr/wk", "10 घंटे/हफ्ता"),
      icon: <MapPin className="w-4 h-4" />,
      link: "https://www.pmkvyofficial.org/",
      linkText: t(`Find Center → pmkvy.gov.in/${city.toLowerCase()}`, `सेंटर खोजें → pmkvy.gov.in/${city.toLowerCase()}`),
      color: "text-warning",
      topics: [
        t("Hands-on data quality assessment", "प्रैक्टिकल डेटा क्वालिटी असेसमेंट"),
        t("Industry certification exam prep", "इंडस्ट्री सर्टिफिकेशन परीक्षा तैयारी"),
        t("Interview preparation and placement support", "इंटरव्यू प्रिपरेशन और प्लेसमेंट सपोर्ट"),
      ],
    },
  ];

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">
              {t("8-Week Reskilling Path", "8-हफ्ते का रीस्किलिंग पाथ")}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {t("TARGET: Quality Analyst (Risk: 43/100) — 892 OPEN JOBS", "लक्ष्य: क्वालिटी एनालिस्ट (रिस्क: 43/100) — 892 जॉब्स")} {city}
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-1 h-7 text-xs">
            <Download className="w-3 h-3" />
            PDF
          </Button>
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{t("Progress", "प्रगति")}</span>
            <span>{t(`Week ${currentWeek}/8`, `हफ्ता ${currentWeek}/8`)}</span>
          </div>
          <Progress value={(currentWeek / 8) * 100} className="h-2" />
        </div>

        {/* Timeline */}
        <Accordion type="multiple" defaultValue={["0"]} className="space-y-2">
          {weeks.map((week, i) => (
            <AccordionItem key={i} value={String(i)} className="border border-border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <span className={cn("", week.color)}>{week.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-foreground">{week.range}</p>
                    <p className="text-[11px] text-muted-foreground">{week.title}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground ml-auto mr-2">{week.hours}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <ul className="space-y-1.5 mb-3">
                  {week.topics.map((topic, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
                <a
                  href={week.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  {week.linkText}
                </a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ReskillingPath;
