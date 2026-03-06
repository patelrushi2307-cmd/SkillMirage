import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Loader2,
    ExternalLink,
    MapPin,
    Building2,
    Briefcase,
    AlertCircle,
    RefreshCw,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobMarket = () => {
    const { t } = useLanguage();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['jobMarket'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3001/api/jobs`);
            if (!res.ok) throw new Error('Failed to fetch jobs');
            return res.json();
        }
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 max-w-5xl mx-auto px-4 py-8"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/20">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.3em]">{t("Live Inventory", "लाइव सूची")}</span>
                            <h2 className="text-3xl font-black text-foreground tracking-tight">
                                {t("National Job Feed", "राष्ट्रीय जॉब फीड")}
                            </h2>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium max-w-xl">
                        {t("Real-time opportunities aggregated from major Indian talent portals, cross-referenced with regional hiring signals.", "भारत के प्रमुख टैलेंट पोर्टल्स से एकत्रित रीयल-टाइम अवसर, क्षेत्रीय भर्ती संकेतों के साथ क्रॉस-रेफरेंस्ड।")}
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => refetch()}
                    disabled={isLoading}
                    className="gap-3 rounded-2xl border-border bg-white hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all font-bold shadow-sm h-14 px-8"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    {t("Update Feed", "फीड अपडेट करें")}
                </Button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40 space-y-6">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin" />
                        <Search className="w-8 h-8 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-sm font-black text-foreground uppercase tracking-[0.2em] animate-pulse">
                            {t("Syncing Live Scrapers...", "लाइव स्क्रेपर्स सिंक कर रहे हैं...")}
                        </p>
                    </div>
                </div>
            ) : isError ? (
                <motion.div variants={itemVariants}>
                    <Card className="border-red-200 bg-red-50/30 rounded-[2rem] shadow-inner mb-20">
                        <CardContent className="p-16 text-center space-y-6">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-red-100">
                                <AlertCircle className="w-10 h-10 text-red-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Feed Interruption</h3>
                                <p className="text-sm text-muted-foreground max-w-md mx-auto font-medium leading-relaxed">
                                    Our job market scrapers are experiencing temporary bandwidth limits. Please refresh in a moment.
                                </p>
                            </div>
                            <Button className="rounded-2xl bg-orange-600 hover:bg-orange-700 h-12 px-8 font-bold" onClick={() => refetch()}>Retry Connection</Button>
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {data?.jobs?.map((job: any, index: number) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -2 }}
                            className="group"
                        >
                            <Card className="bg-white border-border/40 overflow-hidden rounded-[2rem] transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:border-orange-500/20">
                                <CardContent className="p-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-5 flex-1">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="secondary" className="bg-orange-50 text-orange-600 border-none py-1 px-4 text-[10px] uppercase font-black tracking-widest rounded-full">
                                                    {job.source}
                                                </Badge>
                                                <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-orange-400" />
                                                    {job.postedAt || 'Direct Feed'}
                                                </span>
                                            </div>

                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-bold text-foreground group-hover:text-orange-600 transition-colors tracking-tight leading-none">
                                                    {job.title || job.positionName}
                                                </h3>
                                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                                    <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground/80">
                                                        <Building2 className="w-4 h-4 text-orange-500/50" />
                                                        {job.company || job.companyName}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground/80">
                                                        <MapPin className="w-4 h-4 text-orange-500/50" />
                                                        {job.location}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {job.skills?.slice(0, 4).map((skill: string) => (
                                                    <span key={skill} className="text-[10px] font-bold py-1.5 px-3 bg-gray-50 text-gray-400 rounded-lg border border-gray-100">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Button variant="default" className="h-14 px-10 rounded-2xl bg-orange-600 hover:bg-orange-700 font-bold text-sm shadow-xl shadow-orange-600/10 active:scale-95 transition-all w-full md:w-auto" asChild>
                                                <a href={job.url} target="_blank" rel="noopener noreferrer">
                                                    View Details
                                                    <ExternalLink className="w-4 h-4 ml-2" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    {data?.jobs?.length === 0 && (
                        <motion.div variants={itemVariants} className="text-center py-40 border border-dashed border-border rounded-[3rem] bg-gray-50/50">
                            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm border border-border/40">
                                <Briefcase className="w-10 h-10 text-muted-foreground/20" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground uppercase tracking-tight">Inventory Empty</h3>
                            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2 font-medium leading-relaxed">
                                No new listings detected in the last scan cycle. Scrapers will re-attempt in 15 minutes.
                            </p>
                        </motion.div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default JobMarket;
