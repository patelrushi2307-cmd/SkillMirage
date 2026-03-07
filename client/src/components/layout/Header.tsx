import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { lang, toggleLang, t } = useLanguage();
  const { user, role, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/70 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-base tracking-tight">SM</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground tracking-tight leading-none">Skills Mirage</h1>
              <p className="text-[10px] font-medium text-muted-foreground mt-1">
                {t("Professional Workforce Intelligence", "प्रोफेशनल वर्कफोर्स इंटेलिजेंस")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 mr-4">
            <span className="text-xs font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors">
              {t("Solutions", "समाधान")}
            </span>
            <span className="text-xs font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors">
              {t("Intelligence", "इंटेलिजेंस")}
            </span>
          </div>

          <Button variant="ghost" size="sm" onClick={toggleLang} className="h-9 px-3 text-xs font-semibold gap-2 hover:bg-muted/50">
            <Globe className="w-3.5 h-3.5 text-primary" />
            {lang === 'en' ? 'EN' : 'HI'}
          </Button>

          {user ? (
            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-border">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-bold text-foreground leading-none">{user.email?.split('@')[0]}</span>
                <span className="text-[9px] font-bold text-primary uppercase tracking-tighter mt-1">{role}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={signOut} className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button size="sm" className="h-9 rounded-lg px-5 font-bold">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
