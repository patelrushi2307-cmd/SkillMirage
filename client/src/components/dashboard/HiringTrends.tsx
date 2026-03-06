import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import CityFilter from '@/components/shared/CityFilter';
import TimeFilter, { TimeRange } from '@/components/shared/TimeFilter';
import { bigNumbers as defaultBigNumbers, trendCards as defaultTrendCards, hiringChartData as defaultChartData } from '@/data/trends';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Loader2, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

interface HiringTrendsProps {
  city: string;
  onCityChange: (city: string) => void;
  timeRange: TimeRange;
  onTimeChange: (range: TimeRange) => void;
}

const HiringTrends = ({ city, onCityChange, timeRange, onTimeChange }: HiringTrendsProps) => {
  const { t, lang } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ['hiringTrends', city, timeRange],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/analytics/hiring-trends?city=${city}&timeRange=${timeRange}`, {
        headers: { 'Authorization': 'Bearer test-token' }
      });
      return res.json();
    }
  });

  const displayBigNumbers = data?.bigNumbers || defaultBigNumbers;
  const displayChartData = data?.hiringChartData || defaultChartData;
  const displayTrendCards = data?.trendCards || defaultTrendCards;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 relative"
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-2xl"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-xs font-bold text-primary uppercase tracking-widest animate-pulse">Syncing Market Data</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Overlay */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-3">
          <TimeFilter value={timeRange} onChange={onTimeChange} />
          <div className="h-6 w-px bg-border hidden sm:block" />
          <CityFilter value={city} onChange={onCityChange} />
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/60 tracking-wider uppercase">
          <Info className="w-3.5 h-3.5" />
          {t("Source: 50L+ live workforce signals", "स्रोत: 50L+ लाइव वर्कफोर्स सिग्नल्स")}
        </div>
      </motion.div>

      {/* Big Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {displayBigNumbers.map((num: any, i: number) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="bg-white border-border shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative">
              <div className={cn(
                "absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20",
                num.changePercent >= 0 ? "bg-success" : "bg-destructive"
              )} />
              <CardContent className="p-6">
                <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">
                  {lang === 'hi' ? num.labelHi : num.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground tracking-tight">{num.value}</p>
                  <p className={cn(
                    "text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5",
                    num.changePercent >= 0 ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
                  )}>
                    {num.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {num.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white border-border shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b border-border bg-muted/5">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                {t("Sector Growth Velocity (12 Weeks)", "सेक्टर ग्रोथ वेलोसिटी (12 हफ्ते)")}
              </h3>
            </div>
            <div className="p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={displayChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                    <XAxis
                      dataKey="week"
                      tick={{ fontSize: 10, fontWeight: 600, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fontWeight: 600, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}
                      cursor={{ stroke: 'hsl(var(--primary) / 0.2)', strokeWidth: 2 }}
                    />
                    <Line type="monotone" dataKey="tech" stroke="#0F766E" strokeWidth={3} dot={false} name="Tech" activeDot={{ r: 4, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="analytics" stroke="#4F46E5" strokeWidth={3} dot={false} name="Analytics" activeDot={{ r: 4, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="marketing" stroke="#F59E0B" strokeWidth={3} dot={false} name="Marketing" activeDot={{ r: 4, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-6 mt-6 justify-center">
                {[
                  { label: 'Technology', color: 'bg-[#0F766E]' },
                  { label: 'Market Analytics', color: 'bg-[#4F46E5]' },
                  { label: 'Growth/Marketing', color: 'bg-[#F59E0B]' },
                ].map(l => (
                  <span key={l.label} className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/80 tracking-wide uppercase">
                    <span className={cn("w-2.5 h-2.5 rounded-full", l.color)} />
                    {l.label}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trend Detail Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayTrendCards.map((card: any, i: number) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-border shadow-sm hover:shadow-md transition-all cursor-pointer group overflow-hidden">
              <div className={cn(
                "h-1 w-full",
                card.change >= 0 ? "bg-success/40" : "bg-destructive/40"
              )} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-xl group-hover:bg-primary/10 transition-colors">
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        {lang === 'hi' ? card.titleHi : card.title}
                      </h4>
                      <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter mt-0.5">{card.city}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "p-1.5 rounded-lg",
                    card.change >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  )}>
                    {card.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className={cn(
                    "text-xl font-bold tracking-tight",
                    card.change >= 0 ? "text-success" : "text-destructive"
                  )}>
                    {card.change > 0 ? '+' : ''}{card.change}%
                  </span>
                  <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.abs(card.change)}%` }}
                      className={cn("h-full rounded-full", card.change >= 0 ? "bg-success" : "bg-destructive")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

import { AnimatePresence } from 'framer-motion';

export default HiringTrends;
