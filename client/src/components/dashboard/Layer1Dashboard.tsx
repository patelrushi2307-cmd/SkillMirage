import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, TrendingUp, Zap, AlertTriangle, RefreshCw, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Layer1Dashboard = () => {
    const [activeTab, setActiveTab] = useState('hiring');

    const { data: hiringData, isLoading: hiringLoading, refetch: refetchHiring } = useQuery({
        queryKey: ['hiringTrends'],
        queryFn: async () => {
            const res = await fetch('/api/analytics/hiring-trends');
            return res.json();
        }
    });

    const { data: skillsData, isLoading: skillsLoading } = useQuery({
        queryKey: ['skillsIntel'],
        queryFn: async () => {
            const res = await fetch('/api/analytics/skills-intel');
            return res.json();
        }
    });

    const { data: vulnerabilityData, isLoading: vulnerabilityLoading } = useQuery({
        queryKey: ['vulnerabilityIndex'],
        queryFn: async () => {
            const res = await fetch('/api/analytics/vulnerability');
            return res.json();
        }
    });

    const { data: displacementWarnings, isLoading: warningsLoading, refetch: refetchWarnings } = useQuery({
        queryKey: ['displacementWarnings'],
        queryFn: async () => {
            const res = await fetch('/api/analytics/displacement-warnings');
            return res.json();
        }
    });

    const isLoading = hiringLoading || skillsLoading || vulnerabilityLoading || warningsLoading;

    return (
        <div className="w-full text-zinc-100 font-sans p-4 md:p-8">
            {/* Header Section */}
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
                        Layer 1 Intelligence
                    </h1>
                    <p className="text-sm text-zinc-500 max-w-2xl font-medium">
                        Real-time market intelligence gathering live signals from job portals, processed with macro-economic workforce datasets.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => refetchHiring()}
                        variant="outline"
                        className="bg-zinc-900/50 hover:bg-white/5 border-white/10 text-zinc-300 gap-2 h-10 px-4 rounded-xl"
                    >
                        <RefreshCw className={`w-4 h-4 ${hiringLoading ? 'animate-spin' : ''}`} />
                        Refresh Feed
                    </Button>
                </div>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {hiringData?.bigNumbers?.map((stat: any, i: number) => (
                    <Card key={i} className="border border-white/5 shadow-xl bg-zinc-900/50 backdrop-blur-xl overflow-hidden group rounded-2xl">
                        <div className="h-0.5 bg-blue-500 w-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-2 py-0.5 text-xs">
                                    {stat.change}
                                </Badge>
                            </div>
                            <div className="text-4xl font-black text-white">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Tabs Container */}
            <Tabs defaultValue="hiring" className="space-y-8" onValueChange={setActiveTab}>
                <TabsList className="bg-black/40 border border-white/5 p-1 rounded-xl h-14 w-full md:w-auto inline-flex overflow-x-auto no-scrollbar justify-start">
                    <TabsTrigger value="hiring" className="rounded-lg px-6 h-full data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400 gap-2 font-semibold transition-all hover:text-zinc-200">
                        <TrendingUp className="w-4 h-4" />
                        Hiring Trends
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="rounded-lg px-6 h-full data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400 gap-2 font-semibold transition-all hover:text-zinc-200">
                        <Zap className="w-4 h-4" />
                        Skills Intelligence
                    </TabsTrigger>
                    <TabsTrigger value="early-warning" className="rounded-lg px-6 h-full data-[state=active]:red-500/20 data-[state=active]:text-red-400 text-zinc-400 gap-2 font-semibold transition-all hover:text-zinc-200">
                        <AlertCircle className="w-4 h-4" />
                        Live Warnings
                    </TabsTrigger>
                </TabsList>

                {/* Tab A: Hiring Trends */}
                <TabsContent value="hiring" className="outline-none min-h-[400px]">
                    <div className="flex items-center justify-center h-64 bg-zinc-900/50 rounded-2xl border border-dashed border-white/10">
                        <p className="text-zinc-500 font-medium tracking-wide">Detailed Line Charts rendering logic mapped from Index.</p>
                    </div>
                </TabsContent>

                {/* Tab B: Skills Intelligence */}
                <TabsContent value="skills" className="outline-none min-h-[400px]">
                    <div className="flex items-center justify-center h-64 bg-zinc-900/50 rounded-2xl border border-dashed border-white/10">
                        <p className="text-zinc-500 font-medium tracking-wide">Detailed Bar Charts rendering logic mapped from Index.</p>
                    </div>
                </TabsContent>

                {/* Tab D: Displacement Early Warning */}
                <TabsContent value="early-warning" className="outline-none min-h-[400px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 space-y-6">
                            <Card className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 shadow-2xl rounded-2xl overflow-hidden">
                                <CardHeader className="p-8 border-b border-white/5 bg-red-950/20">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <CardTitle className="text-xl font-bold uppercase tracking-widest flex items-center gap-2 text-white">
                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                                Live Displacement Watchlist
                                            </CardTitle>
                                            <CardDescription className="text-zinc-400 font-medium mt-1">Detecting rapid sector declines and automation triggers across India</CardDescription>
                                        </div>
                                        <Badge variant="outline" className="border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase px-3 py-1">
                                            Real-time Active
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-white/5">
                                        {displacementWarnings?.length > 0 ? (
                                            displacementWarnings.map((warning, i) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    key={i}
                                                    className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border",
                                                            warning.level === 'high' ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-orange-500/10 border-orange-500/20 text-orange-400"
                                                        )}>
                                                            <AlertTriangle className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-white">{warning.category}</h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{warning.city}</span>
                                                                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                                                <span className="text-[10px] font-medium text-zinc-400 uppercase">{warning.status}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right space-y-1">
                                                        <div className="flex items-center gap-2 justify-end">
                                                            <span className="text-lg font-black text-red-400">{warning.decline}%</span>
                                                            <div className="p-1 bg-red-500/10 rounded">
                                                                <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
                                                            </div>
                                                        </div>
                                                        <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Hiring Velocity (30D)</div>
                                                    </div>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="p-20 text-center space-y-4">
                                                <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center mx-auto border border-white/5">
                                                    <AlertCircle className="w-6 h-6 text-zinc-600" />
                                                </div>
                                                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest leading-relaxed">
                                                    Awaiting API connection.<br />Please start the backend server.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <Card className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 shadow-2xl rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-8">
                                <div className="space-y-4">
                                    <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto border border-red-500/20">
                                        <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                                    </div>
                                    <h3 className="text-base font-semibold text-white uppercase tracking-widest">Critical Protocol</h3>
                                    <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                                        Sectors marked as "Early Risk" show correlation of high AI vulnerability (&gt;70) and hiring decline.
                                    </p>
                                </div>

                                <div className="w-full space-y-3">
                                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Signal Strength</div>
                                        <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[9px] font-bold uppercase py-0.5">HIGH</Badge>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => refetchWarnings()}
                                    disabled={warningsLoading}
                                    variant="outline"
                                    className="w-full h-10 rounded-xl bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 gap-2 transition-all"
                                >
                                    <RefreshCw className={cn("w-4 h-4", warningsLoading && "animate-spin")} />
                                    Update Signals
                                </Button>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Layer1Dashboard;
