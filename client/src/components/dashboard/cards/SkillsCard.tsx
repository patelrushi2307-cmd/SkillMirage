import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BrainCircuit } from 'lucide-react';

const data = [
  { name: 'Python', value: 95, color: '#3b82f6' },
  { name: 'AWS', value: 85, color: '#f59e0b' },
  { name: 'LLMs', value: 75, color: '#10b981' },
  { name: 'React', value: 60, color: '#6366f1' },
  { name: 'Docker', value: 45, color: '#8b5cf6' },
];

export default function SkillsCard() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white font-semibold text-lg flex items-center gap-2">
            Skills Intelligence
            <BrainCircuit className="w-4 h-4 text-blue-400" />
          </h2>
          <p className="text-zinc-500 text-sm">Highest market growth</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: -10 }}>
            <XAxis 
              dataKey="name" 
              stroke="#52525b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              dy={5}
            />
            <Tooltip 
              cursor={{ fill: '#ffffff0a' }}
              contentStyle={{ backgroundColor: '#0A0A0B', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#e4e4e7', fontSize: '13px' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
