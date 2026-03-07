import { motion } from 'framer-motion';
import { Search, Bell, Moon, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function TopNav() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success("Logged out successfully");
    } catch (e) {
      console.error(e);
    }
  };

  const handleTheme = () => {
    toast.info("This dashboard features a locked dark-mode aesthetic.");
  };

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full h-16 bg-[#000000cc] backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 shrink-0"
    >
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 rounded-md w-64 text-zinc-400 group focus-within:ring-1 focus-within:ring-orange-500/50 focus-within:border-orange-500/30 transition-all">
        <Search className="w-4 h-4 shrink-0 group-focus-within:text-orange-400 transition-colors" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-zinc-600"
        />
        <div className="flex items-center gap-1 text-[10px] font-mono opacity-50 border border-white/10 px-1.5 rounded">
          ⌘K
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="text-zinc-500 hover:text-white transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-orange-500 rounded-full" />
        </button>
        <button onClick={handleTheme} className="text-zinc-500 hover:text-white transition-colors">
          <Moon className="w-4 h-4" />
        </button>
        
        <div className="w-px h-4 bg-white/10 mx-2" />
        
        <button onClick={handleLogout} className="flex items-center outline-none group" title="Logout">
          <Avatar className="w-8 h-8 rounded-md border border-white/10 group-hover:border-red-500/30 transition-colors">
            <AvatarImage src={user?.user_metadata?.avatar_url || "https://github.com/shadcn.png"} />
            <AvatarFallback className="bg-zinc-800 text-xs rounded-md">USR</AvatarFallback>
          </Avatar>
          <LogOut className="w-4 h-4 text-zinc-500 group-hover:text-red-400 transition-colors ml-3" />
        </button>
      </div>
    </motion.div>
  );
}
