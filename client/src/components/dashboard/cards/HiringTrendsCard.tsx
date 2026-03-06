import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';

const rawData = [
  { name: 'W1', DataEngineer: 400, GenAI: 240, Tester: 800 },
  { name: 'W2', DataEngineer: 300, GenAI: 398, Tester: 600 },
  { name: 'W3', DataEngineer: 500, GenAI: 500, Tester: 400 },
  { name: 'W4', DataEngineer: 600, GenAI: 750, Tester: 300 },
  { name: 'W5', DataEngineer: 800, GenAI: 950, Tester: 200 },
];

export default function HiringTrendsCard() {
  return (
    <div className="w-full h-full flex flex-col justify-between group">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white font-semibold text-lg flex items-center gap-2">
            Hiring Trends
            <TrendingUp className="w-4 h-4 text-orange-400" />
          </h2>
          <p className="text-zinc-500 text-sm">Demand vs Vulnerability</p>
        </div>
        <div className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-xs text-zinc-400">
          Last 5 Weeks
        </div>
      </div>

      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rawData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#52525b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#52525b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => `${val}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0A0A0B', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#e4e4e7', fontSize: '13px' }}
              labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
            />
            <Line 
              type="monotone" 
              dataKey="GenAI" 
              stroke="#f97316" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, fill: '#f97316', stroke: '#000', strokeWidth: 2 }}
              animationDuration={2000}
            />
            <Line 
              type="monotone" 
              dataKey="DataEngineer" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              dot={false}
              animationDuration={2200}
            />
            <Line 
              type="monotone" 
              dataKey="Tester" 
              stroke="#ef4444" 
              strokeWidth={2} 
              strokeDasharray="4 4"
              dot={false}
              animationDuration={2400}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
