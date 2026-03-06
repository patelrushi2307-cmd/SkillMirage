import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    Legend
} from 'recharts';
import {
    Users,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    RefreshCw,
    Building2,
    Database,
    AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

const EmployerInsights = () => {
    const { t } = useLanguage();
    const [city, setCity] = useState('Pune');

    const { data: insights, isLoading, isError, refetch } = useQuery({
        queryKey: ['employerInsights', city],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3001/api/analytics/employer-insights?city=${city}`);
            return res.json();
        }
    });

    const COLORS = ['#0F766E', '#F97316', '#0284C7', '#8B5CF6', '#EC4899', '#10B981'];

    return (
        <div className="space-y-10 max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-teal-600 rounded-2xl shadow-lg shadow-teal-600/20">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.3em]">{t("Strategic Intelligence", "रणनीतिक इंटेलिजेंस")}</span>
                            <h2 className="text-4xl font-black text-foreground tracking-tight">
                                {t("Employer Insights", "नियोक्ता अंतर्दृष्टि")}
                            </h2>
                        </div>
                    </div>
                    <p className="text-base text-muted-foreground font-medium max-w-2xl leading-relaxed">
                        {t("Analyze the structural talent gap by cross-referencing industry skill demand with verified training output (PMKVY/NPTEL).", "सत्यापित प्रशिक्षण आउटपुट (PMKVY/NPTEL) के साथ उद्योग कौशल मांग को क्रॉस-रेफरेंस करके संरचनात्मक टैलेंट अंतर का विश्लेषण करें।")}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => refetch()}
                        variant="outline"
                        className="h-14 px-8 rounded-2xl border-border bg-white hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-all font-bold shadow-sm gap-3"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh Supply Audit
                    </Button>
                </div>
            </header>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border border-dashed border-border shadow-inner">
                    <div className="relative">
                        <div className="w-24 h-24 border-4 border-teal-500/10 border-t-teal-500 rounded-full animate-spin" />
                        <Database className="w-10 h-10 text-teal-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="mt-8 text-[11px] font-black text-teal-700 uppercase tracking-[0.4em] animate-pulse">Auditing Training Portals</p>
                </div>
            ) : isError ? (
                <Card className="border-orange-200 bg-orange-50/20 rounded-[3rem] p-16 text-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-orange-100 mb-8">
                        <AlertTriangle className="w-10 h-10 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground uppercase mb-4">Training Dataset Required</h3>
                    <p className="max-w-md mx-auto text-muted-foreground font-medium leading-relaxed">
                        Employer-side analysis requires access to PMKVY / Course datasets. Please provide training records to enable talent gap logic.
                    </p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Summary Card */}
                    <Card className="lg:col-span-12 bg-teal-900 text-white rounded-[2.5rem] overflow-hidden border-none shadow-2xl">
                        <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-4">
                                <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-[10px] uppercase font-black tracking-widest px-4 py-1">
                                    {city} Market Status
                                </Badge>
                                <h3 className="text-3xl font-bold tracking-tight max-w-xl leading-snug">
                                    {insights.summary}
                                </h3>
                            </div>
                            <div className="flex items-center gap-10">
                                <div className="text-center">
                                    <div className="text-4xl font-black text-teal-400">42%</div>
                                    <div className="text-[10px] font-black text-teal-300/40 uppercase tracking-widest mt-2">Demand Gap</div>
                                </div>
                                <div className="w-px h-16 bg-teal-800" />
                                <div className="text-center">
                                    <div className="text-4xl font-black text-orange-400">12%</div>
                                    <div className="text-[10px] font-black text-orange-300/40 uppercase tracking-widest mt-2">Critical Shortage</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skill Supply vs Demand Chart */}
                    <Card className="lg:col-span-8 bg-white border-border/40 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
                        <CardHeader className="p-10 border-b border-border/40 bg-gray-50/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl font-bold tracking-tight">Demand vs Training Supply</CardTitle>
                                    <CardDescription className="font-medium">Industry requests vs Academic output across skills</CardDescription>
                                </div>
                                <Target className="w-6 h-6 text-teal-600" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 flex-1">
                            <div className="h-[450px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={insights.insights}
                                        layout="vertical"
                                        margin={{ left: 60, right: 30 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                        <XAxis type="number" hide />
                                        <YAxis
                                            dataKey="skill"
                                            type="category"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 13, fontWeight: 700, fill: '#64748b' }}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#f1f5f9' }}
                                            contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgb(0,0,0,0.1)' }}
                                        />
                                        <Legend verticalAlign="top" height={60} iconType="circle" />
                                        <Bar name="Employer Demand" dataKey="demand" radius={[0, 10, 10, 0]} barSize={24}>
                                            {insights.insights.map((entry: any, index: number) => (
                                                <Cell key={`cell-demand-${index}`} fill="#0F766E" />
                                            ))}
                                        </Bar>
                                        <Bar name="Training Output" dataKey="supply" radius={[0, 10, 10, 0]} barSize={24}>
                                            {insights.insights.map((entry: any, index: number) => (
                                                <Cell key={`cell-supply-${index}`} fill="#F97316" fillOpacity={0.6} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gap Analysis Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="bg-white border-border/40 rounded-[2.5rem] shadow-sm p-10 space-y-8">
                            <div>
                                <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Critical Talent Shortages</h4>
                                <div className="space-y-4">
                                    {insights.talentGaps.slice(0, 3).map((gap: any, i: number) => (
                                        <div key={i} className="p-5 rounded-2xl bg-red-50/50 border border-red-100 flex items-center justify-between group hover:bg-red-50 transition-colors">
                                            <div className="space-y-1">
                                                <div className="text-sm font-black text-gray-900 leading-none">{gap.skill}</div>
                                                <div className="text-[10px] font-bold text-red-600/60 uppercase">High Shortage Risk</div>
                                            </div>
                                            <div className="flex items-center gap-2 text-red-600">
                                                <ArrowUpRight className="w-4 h-4" />
                                                <span className="text-sm font-black">{gap.gap}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-border/60">
                                <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Oversupplied Skills</h4>
                                <div className="space-y-4">
                                    {insights.talentSurplus.slice(0, 2).map((gap: any, i: number) => (
                                        <div key={i} className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-center justify-between group hover:bg-teal-50 transition-colors">
                                            <div className="space-y-1">
                                                <div className="text-sm font-black text-gray-900 leading-none">{gap.skill}</div>
                                                <div className="text-[10px] font-bold text-teal-600/60 uppercase">Training Saturation</div>
                                            </div>
                                            <div className="flex items-center gap-2 text-teal-600">
                                                <ArrowDownRight className="w-4 h-4" />
                                                <span className="text-sm font-black">{Math.abs(gap.gap)}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 text-center">
                                <p className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em] mb-4">Pipeline Verification Active</p>
                                <Button className="w-full h-14 rounded-2xl bg-teal-600 hover:bg-teal-700 shadow-xl shadow-teal-600/20 font-bold gap-3 active:scale-95 transition-all">
                                    <Users className="w-5 h-5 text-teal-300" />
                                    Optimized Sourcing Path
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <Card className="lg:col-span-12 bg-gray-50 border-border/40 rounded-[2.5rem] p-10">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="space-y-2">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Jobs Scanned</div>
                                <div className="text-2xl font-black text-gray-900">12,402</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Training Records</div>
                                <div className="text-2xl font-black text-gray-900">8,591</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg. Hiring Velocity</div>
                                <div className="text-2xl font-black text-teal-600">4.2d <span className="text-xs uppercase">Avg</span></div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Talent Pipeline Health</div>
                                <Badge className="bg-orange-500 text-white font-black px-4 py-1 text-[10px] uppercase">STRESSED</Badge>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default EmployerInsights;
