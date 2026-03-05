import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { LogIn, UserPlus, Shield, Briefcase, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type AppRole = 'worker' | 'recruiter' | 'admin';

const Auth = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedRole, setSelectedRole] = useState<AppRole>('worker');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles: { id: AppRole; label: string; labelHi: string; icon: React.ReactNode; desc: string; descHi: string }[] = [
    {
      id: 'worker',
      label: 'Worker',
      labelHi: 'वर्कर',
      icon: <Users className="w-5 h-5" />,
      desc: 'Access reskilling paths & chatbot',
      descHi: 'रीस्किलिंग पाथ और चैटबॉट एक्सेस करें',
    },
    {
      id: 'recruiter',
      label: 'Recruiter',
      labelHi: 'रिक्रूटर',
      icon: <Briefcase className="w-5 h-5" />,
      desc: 'Access market intelligence dashboard',
      descHi: 'मार्केट इंटेलिजेंस डैशबोर्ड एक्सेस करें',
    },
    {
      id: 'admin',
      label: 'Admin',
      labelHi: 'एडमिन',
      icon: <Shield className="w-5 h-5" />,
      desc: 'Full access to all features',
      descHi: 'सभी फीचर्स का पूरा एक्सेस',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName,
              role: selectedRole,
            },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-lg">SM</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Skills Mirage</h1>
          <p className="text-sm text-muted-foreground">
            {t('Live Workforce Intelligence Platform', 'लाइव वर्कफोर्स इंटेलिजेंस प्लेटफॉर्म')}
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">
              {isSignUp ? t('Create Account', 'अकाउंट बनाएं') : t('Sign In', 'साइन इन')}
            </CardTitle>
            <CardDescription>
              {isSignUp
                ? t('Choose your role to get started', 'शुरू करने के लिए अपनी भूमिका चुनें')
                : t('Enter your credentials', 'अपनी जानकारी दर्ज करें')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label>{t('Display Name', 'प्रदर्शन नाम')}</Label>
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder={t('Your name', 'आपका नाम')}
                      required
                    />
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label>{t('Role', 'भूमिका')}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {roles.map((role) => (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setSelectedRole(role.id)}
                          className={cn(
                            'flex flex-col items-center gap-1 p-3 rounded-lg border text-xs transition-all',
                            selectedRole === role.id
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-card text-muted-foreground hover:border-muted-foreground'
                          )}
                        >
                          {role.icon}
                          <span className="font-medium">{t(role.label, role.labelHi)}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground text-center">
                      {t(
                        roles.find((r) => r.id === selectedRole)?.desc || '',
                        roles.find((r) => r.id === selectedRole)?.descHi || ''
                      )}
                    </p>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label>{t('Email', 'ईमेल')}</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>{t('Password', 'पासवर्ड')}</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <p className="text-xs text-destructive bg-destructive/10 p-2 rounded">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="animate-spin mr-2">⏳</span>
                ) : isSignUp ? (
                  <UserPlus className="w-4 h-4 mr-2" />
                ) : (
                  <LogIn className="w-4 h-4 mr-2" />
                )}
                {isSignUp ? t('Sign Up', 'साइन अप') : t('Sign In', 'साइन इन')}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {isSignUp
                  ? t("Already have an account? Sign in", 'पहले से अकाउंट है? साइन इन करें')
                  : t("Don't have an account? Sign up", 'अकाउंट नहीं है? साइन अप करें')}
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-[10px] text-muted-foreground text-center">
          Skills Mirage · HACKaMINeD 2026
        </p>
      </div>
    </div>
  );
};

export default Auth;
