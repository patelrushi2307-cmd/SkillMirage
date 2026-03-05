import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { lang, toggleLang, t } = useLanguage();
  const { user, role, signOut } = useAuth();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SM</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">Skills Mirage</h1>
              <p className="text-[10px] text-muted-foreground leading-tight">
                {t("Live Workforce Intelligence", "लाइव वर्कफोर्स इंटेलिजेंस")}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {t("50L job signals → Your reskilling path", "50L जॉब सिग्नल्स → आपका रीस्किलिंग पाथ")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {role && (
            <span className="text-[10px] text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">
              {role}
            </span>
          )}
          <span className="text-[10px] text-muted-foreground hidden sm:inline">HACKaMINeD 2026</span>
          <Button variant="outline" size="sm" onClick={toggleLang} className="h-7 text-xs gap-1">
            <Globe className="w-3 h-3" />
            {lang === 'en' ? 'हिंदी' : 'EN'}
          </Button>
          {user && (
            <Button variant="ghost" size="sm" onClick={signOut} className="h-7 text-xs gap-1 text-muted-foreground">
              <LogOut className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
