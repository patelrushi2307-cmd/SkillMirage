import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import CityFilter from '@/components/shared/CityFilter';
import TimeFilter, { TimeRange } from '@/components/shared/TimeFilter';
import { bigNumbers, trendCards, hiringChartData } from '@/data/trends';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface HiringTrendsProps {
  city: string;
  onCityChange: (city: string) => void;
  timeRange: TimeRange;
  onTimeChange: (range: TimeRange) => void;
}

const HiringTrends = ({ city, onCityChange, timeRange, onTimeChange }: HiringTrendsProps) => {
  const { t, lang } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <TimeFilter value={timeRange} onChange={onTimeChange} />
        <CityFilter value={city} onChange={onCityChange} />
        <span className="text-[10px] text-muted-foreground ml-auto">
          {t("Source: 50L+ monthly job postings", "स्रोत: 50L+ मासिक जॉब पोस्टिंग")}
        </span>
      </div>

      {/* Big Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {bigNumbers.map((num, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{lang === 'hi' ? num.labelHi : num.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">{num.value}</p>
              <p className={cn(
                "text-xs font-medium mt-1",
                num.changePercent >= 0 ? "text-success" : "text-destructive"
              )}>
                {num.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <p className="text-xs font-medium text-muted-foreground mb-3">
            {t("Hiring Volume by Sector (12 weeks)", "सेक्टर-वार हायरिंग (12 हफ्ते)")}
          </p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hiringChartData}>
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'hsl(215, 20%, 65%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(215, 20%, 65%)' }} axisLine={false} tickLine={false} width={35} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(217, 33%, 17%)',
                    border: '1px solid hsl(217, 33%, 22%)',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: 'hsl(213, 31%, 91%)',
                  }}
                />
                <Line type="monotone" dataKey="tech" stroke="hsl(160, 84%, 39%)" strokeWidth={2} dot={false} name="Tech" />
                <Line type="monotone" dataKey="bpo" stroke="hsl(0, 84%, 60%)" strokeWidth={2} dot={false} name="BPO" />
                <Line type="monotone" dataKey="analytics" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} name="Analytics" />
                <Line type="monotone" dataKey="marketing" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} name="Marketing" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {[
              { label: 'Tech', color: 'bg-success' },
              { label: 'BPO', color: 'bg-destructive' },
              { label: 'Analytics', color: 'bg-primary' },
              { label: 'Marketing', color: 'bg-warning' },
            ].map(l => (
              <span key={l.label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className={cn("w-2 h-2 rounded-full", l.color)} />
                {l.label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trend Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {trendCards.map((card, i) => (
          <Card key={i} className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-lg mr-2">{card.icon}</span>
                  <span className="text-sm font-semibold text-foreground">
                    {lang === 'hi' ? card.titleHi : card.title}
                  </span>
                </div>
                {card.change >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className={cn(
                  "text-lg font-bold",
                  card.change >= 0 ? "text-success" : "text-destructive"
                )}>
                  {card.change > 0 ? '+' : ''}{card.change}%
                </span>
                <span className="text-[10px] text-muted-foreground">{card.city}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HiringTrends;
