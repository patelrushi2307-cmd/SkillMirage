import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  AlertTriangle,
  Users,
  MessageSquare,
  Menu
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Briefcase, label: 'Job Market Feed', id: 'skills' },
  { icon: AlertTriangle, label: 'Supply & Vulnerability', id: 'vulnerability' },
  { icon: Users, label: 'Worker Analysis & Paths', id: 'analysis' },
  { icon: MessageSquare, label: 'Chatbot', id: 'chat' }
];

export default function Sidebar({ activeView, setActiveView }: { activeView: string, setActiveView: (v: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ width: 64 }}
      animate={{ width: isExpanded ? 240 : 64 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="fixed left-0 top-0 h-screen bg-[#0A0A0B] border-r border-white/5 z-50 flex flex-col pt-6 pb-6 overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 mb-10 overflow-hidden whitespace-nowrap">
        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shrink-0">
          <span className="text-orange-500 font-bold text-sm">SM</span>
        </div>
        <motion.span
          animate={{ opacity: isExpanded ? 1 : 0 }}
          className="text-white font-semibold tracking-tight"
        >
          Skills Mirage
        </motion.span>
      </div>

      <div className="flex-1 flex flex-col gap-1 px-3">
        {navItems.map((item: any) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeView === item.id}
            isExpanded={isExpanded}
            onClick={() => setActiveView(item.id)}
          />
        ))}
      </div>

      <div className="px-3">
        {/* Settings/Bottom nav removed */}
      </div>
    </motion.div>
  );
}

function NavItem({ item, isActive, isExpanded, onClick }: any) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 w-full h-10 px-2 rounded-lg transition-colors overflow-hidden whitespace-nowrap group ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
        }`}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 bg-white/10 rounded-lg pointer-events-none"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <Icon className={`w-4 h-4 shrink-0 relative z-10 transition-colors ${isActive ? 'text-orange-400' : 'group-hover:text-zinc-300'}`} />
      <motion.span
        animate={{ opacity: isExpanded ? 1 : 0 }}
        className="text-sm font-medium relative z-10"
      >
        {item.label}
      </motion.span>
    </button>
  );
}
