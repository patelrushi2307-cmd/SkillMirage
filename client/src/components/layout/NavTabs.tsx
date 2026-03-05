import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { BarChart3, Brain, Map, User, MessageCircle } from 'lucide-react';

export type NavView = 'dashboard' | 'skills' | 'riskmap' | 'reskilling' | 'chat';
export type DashboardTab = 'hiring' | 'skills' | 'vulnerability';

interface NavTabsProps {
  activeView: NavView;
  onViewChange: (view: NavView) => void;
}

const NavTabs = ({ activeView, onViewChange }: NavTabsProps) => {
  const { t } = useLanguage();
  const { role } = useAuth();

  const allTabs: { id: NavView; label: string; labelHi: string; icon: React.ReactNode; roles: string[] }[] = [
    { id: 'dashboard', label: 'Dashboard', labelHi: 'डैशबोर्ड', icon: <BarChart3 className="w-4 h-4" />, roles: ['recruiter', 'admin'] },
    { id: 'skills', label: 'Skills', labelHi: 'स्किल्स', icon: <Brain className="w-4 h-4" />, roles: ['recruiter', 'admin'] },
    { id: 'riskmap', label: 'Risk Map', labelHi: 'रिस्क मैप', icon: <Map className="w-4 h-4" />, roles: ['recruiter', 'admin'] },
    { id: 'reskilling', label: 'My Reskilling', labelHi: 'मेरी रीस्किलिंग', icon: <User className="w-4 h-4" />, roles: ['worker', 'admin'] },
    { id: 'chat', label: 'Chat', labelHi: 'चैट', icon: <MessageCircle className="w-4 h-4" />, roles: ['worker', 'admin'] },
  ];

  const tabs = allTabs.filter(tab => role && tab.roles.includes(role));

  return (
    <nav className="border-b border-border bg-card/30">
      <div className="container flex items-center gap-0.5 px-4 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-all whitespace-nowrap border-b-2",
              activeView === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
            )}
          >
            {tab.icon}
            <span className="hidden sm:inline">{t(tab.label, tab.labelHi)}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavTabs;
