import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, DownloadCloud, BrainCircuit, Activity, LineChart, AlertTriangle } from "lucide-react";

export default function Pipeline() {
    const [dataStatus, setDataStatus] = useState("Checking data sources...");

    useEffect(() => {
        // Check python API data status
        fetch("http://localhost:8000/api/py/data-status")
            .then((res) => res.json())
            .then((data) => setDataStatus(data.status))
            .catch(() => setDataStatus("Error connecting to Data Pipeline. Is the Python server running?"));
    }, []);

    const triggerScrape = () => {
        fetch("http://localhost:3001/api/analytics/refresh", { method: "POST" })
            .then((res) => res.json())
            .then((data) => alert(data.message))
            .catch((err) => alert("Failed to trigger scraper"));
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col items-center py-20 px-4 font-sans selection:bg-orange-500/20">

            <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="z-10 w-full max-w-4xl text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
                    SkillMirage Intelligence Pipeline
                </h1>
                <p className="mt-4 text-zinc-400">Live Architecture Demonstration</p>
            </div>

            <div className="z-10 w-full max-w-2xl bg-zinc-900/50 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl mb-12 text-center">
                <h3 className="text-xl font-semibold mb-2">Data Status</h3>
                <p className={`text-sm ${dataStatus.includes("Error") || dataStatus.includes("not configured") ? "text-red-400" : "text-emerald-400"}`}>
                    {dataStatus}
                </p>
                <button
                    onClick={triggerScrape}
                    className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium transition-colors"
                >
                    Manually Trigger Scraper
                </button>
            </div>

            <div className="z-10 flex flex-col items-center gap-6 w-full max-w-3xl">
                {/* Node 1 */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-10 w-full justify-center">
                    <div className="flex flex-col items-center w-48 bg-zinc-800/80 p-6 rounded-2xl border border-white/5">
                        <Database className="w-8 h-8 text-blue-400 mb-3" />
                        <span className="font-semibold text-center text-sm">Kaggle Dataset<br />(Historical jobs_base)</span>
                    </div>
                    <div className="flex flex-col items-center w-48 bg-zinc-800/80 p-6 rounded-2xl border border-white/5">
                        <DownloadCloud className="w-8 h-8 text-green-400 mb-3" />
                        <span className="font-semibold text-center text-sm">Live Scraper<br />(Naukri/LinkedIn)</span>
                    </div>
                </motion.div>

                {/* Down Arrow */}
                <div className="w-0.5 h-10 bg-gradient-to-b from-white/20 to-white/60 animate-pulse" />

                {/* Node 2 */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col items-center w-64 bg-zinc-800/80 p-6 rounded-2xl border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                    <Activity className="w-8 h-8 text-orange-400 mb-3" />
                    <span className="font-semibold text-center text-sm">Python Data Processing<br />(Pandas & spaCy)</span>
                </motion.div>

                <div className="w-0.5 h-10 bg-gradient-to-b from-white/20 to-white/60 animate-pulse" />

                {/* Node 3 */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-10 w-full justify-center">
                    <div className="flex flex-col items-center w-48 bg-zinc-800/80 p-6 rounded-2xl border border-white/5">
                        <AlertTriangle className="w-8 h-8 text-red-400 mb-3" />
                        <span className="font-semibold text-center text-sm">ML Risk Model<br />(Vulnerability Index)</span>
                    </div>
                    <div className="flex flex-col items-center w-48 bg-zinc-800/80 p-6 rounded-2xl border border-white/5">
                        <LineChart className="w-8 h-8 text-purple-400 mb-3" />
                        <span className="font-semibold text-center text-sm">Analytics Engine<br />(Trends & Skills)</span>
                    </div>
                </motion.div>

                <div className="w-0.5 h-10 bg-gradient-to-b from-white/20 to-white/60 animate-pulse" />

                {/* Node 4 */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col items-center w-64 bg-zinc-100 p-6 rounded-2xl border border-white text-zinc-900 shadow-2xl">
                    <BrainCircuit className="w-8 h-8 text-zinc-900 mb-3" />
                    <span className="font-black text-center text-sm tracking-tight">Express API Layer</span>
                </motion.div>

                <div className="w-0.5 h-10 bg-gradient-to-b from-white/20 to-white/60 animate-pulse" />

                {/* Node 5 */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-col items-center w-64 bg-orange-500 p-6 rounded-2xl text-white shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                    <span className="font-black text-center text-lg tracking-tight uppercase">SkillMirage Dashboard</span>
                </motion.div>

            </div>
        </div>
    );
}
