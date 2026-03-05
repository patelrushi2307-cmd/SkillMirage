import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { cities } from '@/data/cities';
import { Loader2, Sparkles } from 'lucide-react';

interface WorkerFormProps {
  onSubmit: (data: { jobTitle: string; city: string; experience: number; description: string }) => void;
  isLoading: boolean;
}

const jobTitles = [
  "BPO Team Lead", "BPO Voice Agent", "Call Center Executive", "Data Entry Operator",
  "Back Office Executive", "Telecaller", "Quality Analyst", "Data Analyst",
  "Software Developer", "Digital Marketing Executive", "Cloud Engineer",
  "Customer Support", "HR Executive", "Accounts Executive",
];

const WorkerForm = ({ onSubmit, isLoading }: WorkerFormProps) => {
  const { t, lang } = useLanguage();
  const [jobTitle, setJobTitle] = useState('BPO Team Lead');
  const [city, setCity] = useState('Pune');
  const [experience, setExperience] = useState([5]);
  const [description, setDescription] = useState(
    'I handle 80 inbound calls/day, Excel reporting, team coordination. Good at customer empathy, process improvement. Want to move to quality analysis or data work.'
  );

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6 space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-foreground">
            {t("Your Workforce Profile", "आपकी वर्कफोर्स प्रोफ़ाइल")}
          </h2>
          <p className="text-xs text-muted-foreground">
            {t("4 fields → personalized AI risk + reskilling path", "4 फील्ड → व्यक्तिगत AI रिस्क + रीस्किलिंग पाथ")}
          </p>
        </div>

        <div className="space-y-4">
          {/* Job Title */}
          <div className="space-y-2">
            <Label className="text-xs">{t("Current Job Title", "वर्तमान जॉब टाइटल")}</Label>
            <Select value={jobTitle} onValueChange={setJobTitle}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {jobTitles.map(j => (
                  <SelectItem key={j} value={j}>{j}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label className="text-xs">{t("City", "शहर")}</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[250px]">
                {cities.map(c => (
                  <SelectItem key={c.name} value={c.name}>
                    {lang === 'hi' ? c.nameHi : c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label className="text-xs">
              {t("Years of Experience", "अनुभव (वर्ष)")}: <span className="font-bold text-foreground">{experience[0]} {t("years", "वर्ष")}</span>
            </Label>
            <Slider
              value={experience}
              onValueChange={setExperience}
              max={30}
              min={0}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0</span>
              <span>30</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-xs">
              {t("About Your Work", "आपके काम के बारे में")}
              <span className="text-muted-foreground ml-1">({description.length}/200)</span>
            </Label>
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 200))}
              className="bg-background border-border text-sm min-h-[80px]"
              placeholder={t(
                "Describe your daily work, skills, and career goals...",
                "अपने रोज़ के काम, स्किल्स और करियर लक्ष्य बताएं..."
              )}
            />
          </div>
        </div>

        <Button
          onClick={() => onSubmit({ jobTitle, city, experience: experience[0], description })}
          disabled={isLoading || description.length < 50}
          className="w-full gap-2"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("Analyzing live signals...", "लाइव सिग्नल्स का विश्लेषण...")}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              {t("Generate My Path", "मेरा पाथ बनाएं")}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkerForm;
