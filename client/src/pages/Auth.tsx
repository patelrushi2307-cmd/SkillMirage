import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const NaukriIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20V4l16 16V4" />
  </svg>
);

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'linkedin_oidc') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + '/dashboard',
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || `Failed to authenticate with ${provider}`);
    }
  };

  const handleNaukriAuth = () => {
    setError('Naukri.com authentication is currently unavailable. Please use Google or LinkedIn.');
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 bg-[#F8F9FA] overflow-hidden">
      {/* Animated Stripe-style Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none filter saturate-150">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] mix-blend-overlay z-10" />
        
        {/* Deep Blue Blob */}
        <motion.div
          animate={{ x: [0, 80, -40, 0], y: [0, -80, 40, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[#2C3E50]/40 rounded-full blur-[120px] mix-blend-multiply"
        />
        
        {/* Purple Blob */}
        <motion.div
          animate={{ x: [0, -80, 60, 0], y: [0, 80, -60, 0], scale: [1, 0.9, 1.15, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] -right-[10%] w-[45vw] h-[45vw] bg-[#8E44AD]/40 rounded-full blur-[140px] mix-blend-multiply"
        />
        
        {/* Cyan Blob */}
        <motion.div
          animate={{ x: [0, 60, -80, 0], y: [0, -60, 80, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] left-[10%] w-[55vw] h-[55vw] bg-[#00E5FF]/30 rounded-full blur-[130px] mix-blend-multiply"
        />
        
        {/* Soft Pink Blob */}
        <motion.div
          animate={{ x: [0, -60, 50, 0], y: [0, 60, -50, 0], scale: [1, 1.05, 0.95, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-[#FF6B6B]/30 rounded-full blur-[110px] mix-blend-multiply"
        />
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px]"
      >
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.02)] rounded-[24px] p-8 overflow-hidden">
          
          {/* Logo & Headline */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-5 relative top-[-4px]">
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-cyan-500">
                SM
              </span>
            </div>
            <h1 className="text-[22px] font-bold text-gray-900 tracking-tight mb-2">
              Sign in to Skills Mirage
            </h1>
            <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-[280px]">
              Access workforce intelligence and AI career insights
            </p>
          </div>

          {/* Social Logins */}
          <div className="space-y-3 mb-6">
            <motion.button 
              onClick={() => handleOAuth('google')}
              type="button"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="w-full h-11 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-xl flex items-center justify-center gap-3 shadow-sm hover:bg-gray-50/50 transition-colors"
            >
              <GoogleIcon />
              Continue with Google
            </motion.button>
            
            <motion.button 
              onClick={() => handleOAuth('linkedin_oidc')}
              type="button"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="w-full h-11 bg-[#0A66C2] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(10,102,194,0.39)] hover:bg-[#004182] hover:shadow-[0_6px_20px_rgba(10,102,194,0.23)] transition-all"
            >
              <LinkedInIcon />
              Continue with LinkedIn
            </motion.button>
            
            <motion.button 
              onClick={handleNaukriAuth}
              type="button"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="w-full h-11 bg-[#F16522] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(241,101,34,0.39)] hover:bg-[#E05412] hover:shadow-[0_6px_20px_rgba(241,101,34,0.23)] transition-all"
            >
              <NaukriIcon />
              Continue with Naukri.com
            </motion.button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/80"></div>
            </div>
            <div className="relative flex justify-center text-xs font-semibold">
              <span className="px-3 bg-white/70 backdrop-blur-xl text-gray-400 rounded-full">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 ml-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full h-11 bg-white border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 text-sm font-medium text-gray-900 transition-all outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-600">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-11 bg-white border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 text-sm font-medium text-gray-900 transition-all outline-none placeholder:text-gray-400"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-[13px] font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <motion.button 
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="relative w-full h-11 rounded-xl text-white font-semibold text-sm shadow-[0_8px_30px_rgba(99,91,255,0.4)] hover:shadow-[0_8px_30px_rgba(99,91,255,0.6)] transition-all disabled:opacity-70 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-500 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  "Sign in"
                )}
              </span>
            </motion.button>
          </form>

        </div>

        {/* Footer Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 flex flex-col items-center gap-4 px-4"
        >
          <p className="text-sm font-medium text-gray-500 text-center">
            Don't have an account?{" "}
            <a href="#" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-2 transition-all">
              Sign up
            </a>
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            <span>&middot;</span>
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
