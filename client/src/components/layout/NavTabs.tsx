import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { BarChart3, Brain, Map, User, MessageCircle, Briefcase, Building2 } from 'lucide-react';

export type NavView = 'dashboard' | 'skills' | 'riskmap' | 'reskilling' | 'chat' | 'jobmarket' | 'employer';
export type DashboardTab = 'hiring' | 'skills' | 'vulnerability';

interface NavTabsProps {
  activeView: NavView;
  onViewChange: (view: NavView) => void;
}

const NavTabs = ({ activeView, onViewChange }: NavTabsProps) => {
  const { t } = useLanguage();
  const { role } = useAuth();

  const allTabs: { id: NavView; label: string; labelHi: string; icon: React.ReactNode; roles: string[] }[] = [
    { id: 'dashboard', label: 'Market Intelligence', labelHi: 'मार्केट इंटेलिजेंस', icon: <BarChart3 className="w-4 h-4" />, roles: ['recruiter', 'admin', 'worker'] },
    { id: 'jobmarket', label: 'Job Feed', labelHi: 'जॉब फीड', icon: <Briefcase className="w-4 h-4" />, roles: ['recruiter', 'admin', 'worker'] },
    { id: 'employer', label: 'Employer Insights', labelHi: 'नियोक्ता अंतर्दृष्टि', icon: <Building2 className="w-4 h-4" />, roles: ['recruiter', 'admin'] },
    { id: 'reskilling', label: 'My Profile', labelHi: 'मेरी प्रोफाइल', icon: <User className="w-4 h-4" />, roles: ['worker', 'admin'] },
    { id: 'chat', label: 'AI Career Coach', labelHi: 'AI करियर कोच', icon: <MessageCircle className="w-4 h-4" />, roles: ['worker', 'admin'] },
  ];

  const tabs = allTabs.filter(tab => role && tab.roles.includes(role));

  return (
    <nav className="bg-white/50 border-b border-border shadow-sm">
      <div className="container flex items-center px-6 overflow-x-auto scrollbar-hide mx-auto max-w-7xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-[13px] font-semibold transition-all whitespace-nowrap border-b-2 relative",
              activeView === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground/80"
            )}
          >
            <span className={cn(
              "p-1 rounded-md transition-colors",
              activeView === tab.id ? "bg-primary/10" : "bg-transparent group-hover:bg-muted"
            )}>
              {tab.icon}
            </span>
            <span>{t(tab.label, tab.labelHi)}</span>
            {activeView === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_-2px_8px_rgba(15,118,110,0.3)]" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavTabs;
