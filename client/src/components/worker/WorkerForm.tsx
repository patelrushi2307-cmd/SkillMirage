import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cities } from '@/data/cities';
import { Loader2, Sparkles, User, MapPin, Briefcase, Calendar, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface WorkerFormProps {
  onSubmit: (data: { jobTitle: string; city: string; experience: number; description: string }) => void;
  isLoading: boolean;
}

const WorkerForm = ({ onSubmit, isLoading }: WorkerFormProps) => {
  const { t, lang } = useLanguage();
  const [jobTitle, setJobTitle] = useState('');
  const [city, setCity] = useState('Pune');
  const [experience, setExperience] = useState('3-5');
  const [description, setDescription] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const filteredCities = cities.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
    c.nameHi.includes(citySearch)
  );

  const expRanges = ['0-2', '3-5', '6-10', '10+'];

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05 } }
      }}
    >
      <Card className="bg-zinc-900/50 border border-white/5 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border-t-0 text-zinc-100">
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-50" />
        <CardContent className="p-8 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{t("Layer 2 Intelligence", "लेयर 2 इंटेलिजेंस")}</span>
            </div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              {t("Career Parameters", "वर्कर आपको क्या बताता है")}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {t("No CV. No long forms. Four inputs — and the system models your displacement risk.", "कोई सीवी नहीं। कोई लंबा फॉर्म नहीं। चार इनपुट — और सिस्टम भारी काम करता है।")}
            </p>
          </div>

          <div className="space-y-6">
            {/* Input 1: Current Job Title */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t("Current Job Title", "वर्तमान पद")}</Label>
              </div>
              <Input
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Executive, BPO"
                className="h-12 bg-black/40 border-white/10 text-white focus-visible:ring-1 focus-visible:ring-blue-500/50 rounded-xl placeholder:text-zinc-600"
              />
            </motion.div>

            {/* Input 2: City (Searchable) */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t("City", "शहर")}</Label>
              </div>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="h-12 bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-blue-500/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] rounded-xl border border-white/10 bg-zinc-900 text-white p-0 overflow-hidden shadow-2xl">
                  <div className="p-2 border-b border-white/10 flex items-center gap-2 bg-black/20">
                    <Search className="w-3.5 h-3.5 text-zinc-500" />
                    <input
                      className="bg-transparent border-none outline-none text-xs w-full py-1 text-white placeholder:text-zinc-600"
                      placeholder="Search cities..."
                      value={citySearch}
                      onChange={e => setCitySearch(e.target.value)}
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                  {filteredCities.map(c => (
                    <SelectItem key={c.name} value={c.name} className="rounded-lg py-2.5 focus:bg-white/5 focus:text-white cursor-pointer">
                      {lang === 'hi' ? c.nameHi : c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Input 3: Experience */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t("Years of Experience", "अनुभव के वर्ष")}</Label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {expRanges.map(range => (
                  <button
                    key={range}
                    onClick={() => setExperience(range)}
                    className={cn(
                      "py-2.5 rounded-xl text-xs font-bold transition-all border",
                      experience === range
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-black/40 text-zinc-400 border-white/5 hover:bg-white/5 hover:text-zinc-200"
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Input 4: Short Write-Up */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {t("Short Write-Up", "छोटा विवरण")}
                  </Label>
                </div>
                <span className={cn(
                  "text-[10px] font-mono",
                  description.length < 50 ? "text-red-400" : "text-blue-400"
                )}>
                  {description.length} / 200
                </span>
              </div>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value.slice(0, 500))}
                className="bg-black/40 border-white/10 text-white text-sm min-h-[120px] rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500/50 leading-relaxed p-4 placeholder:text-zinc-600 thin-scrollbar"
                placeholder={t(
                  "Describe your day-to-day work, tools you use, and skills...",
                  "बताएं कि आप दिन-प्रतिदिन क्या करते हैं, आप किन उपकरणों का उपयोग करते हैं..."
                )}
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="pt-4">
            <Button
              onClick={() => {
                const expVal = experience.includes('+') ? 12 : parseInt(experience.split('-')[1] || experience);
                onSubmit({ jobTitle, city, experience: expVal, description });
              }}
              disabled={isLoading || description.length < 30 || !jobTitle}
              className="w-full h-12 rounded-xl gap-2 text-sm shadow-xl transition-all bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("Processing Intelligence...", "इंटेलिजेंस प्रोसेसिंग...")}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {t("Analyze My Career Risk", "मेरे करियर जोखिम का विश्लेषण करें")}
                </>
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WorkerForm;
