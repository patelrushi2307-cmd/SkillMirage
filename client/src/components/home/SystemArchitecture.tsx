import { motion } from 'framer-motion';
import { LayoutDashboard, BrainCircuit, ArrowRight, Layers, Database, Cpu, MessageSquare, BookOpen, GraduationCap, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

const SystemArchitecture = () => {
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <section id="system-architecture" className="py-12 px-2">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="max-w-6xl mx-auto"
            >
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4"
                    >
                        <Layers className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Core Infrastructure</span>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl font-black text-foreground font-heading tracking-tight">
                        {t("Two Layers. One Live System.", "दो लेयर्स। एक लाइव सिस्टम।")}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-muted-foreground font-medium max-w-2xl mx-auto text-sm leading-relaxed">
                        {t(
                            "Layer 1 feeds real-time signals into Layer 2. A change in one must propagate to the other automatically.",
                            "लेयर 1 रीयल-टाइम सिग्नल्स को लेयर 2 में फीड करता है। एक में बदलाव दूसरे में अपने आप प्रसारित होना चाहिए।"
                        )}
                    </motion.p>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
                    {/* Layer 1 - Job Market Dashboard */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full lg:w-[45%] group"
                    >
                        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] transition-all duration-500 hover:-translate-y-2">
                            <div className="bg-orange-500 px-8 py-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white">
                                        <LayoutDashboard className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tight">
                                        {t("LAYER 1 – Job Market Dashboard", "लेयर 1 – जॉब मार्केट डैशबोर्ड")}
                                    </h3>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-orange-50/50 border border-orange-100/50 group-hover:bg-orange-50 transition-colors">
                                    <Database className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="text-xs font-black text-orange-600 uppercase mb-1">Data Ingestion</h4>
                                        <p className="text-xs font-bold text-foreground">Naukri + LinkedIn India (Live Scraping)</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { title: t("Hiring Trends", "हायरिंग ट्रेंड्स"), desc: t("Volume by category, city, and sector", "श्रेणी, शहर और क्षेत्र के अनुसार वॉल्यूम") },
                                        { title: t("Skills Intelligence", "स्किल्स इंटेल"), desc: t("Rising skills & demand vs training gaps", "बढ़ते कौशल और डिमांड बनाम ट्रेनिंग गैप") },
                                        { title: t("AI Vulnerability Index", "AI भेद्यता सूचकांक"), desc: t("Risk score showing automation risk (0–100)", "ऑटोमेशन जोखिम दिखाने वाला रिस्क स्कोर") },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-200 mt-2 shrink-0" />
                                            <div>
                                                <span className="text-xs font-black text-foreground block">{item.title}</span>
                                                <span className="text-[11px] font-medium text-muted-foreground">{item.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-dashed border-orange-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-orange-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Early Warning Signals</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter italic">Hiring Decline Detection</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Middle Connector */}
                    <div className="lg:absolute lg:left-1/2 lg:top-12 lg:-translate-x-1/2 flex flex-col items-center z-10">
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-primary text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border-4 border-white"
                        >
                            <span className="text-[11px] font-black uppercase tracking-widest">feeds</span>
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                        <div className="hidden lg:block w-px h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent mt-4" />
                    </div>

                    {/* Layer 2 - Worker Intelligence Engine */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full lg:w-[45%] group"
                    >
                        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(139,92,246,0.1)] transition-all duration-500 hover:-translate-y-2">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white">
                                        <BrainCircuit className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tight">
                                        {t("LAYER 2 – Worker Intelligence Engine", "लेयर 2 – वर्कर इंटेलिजेंस इंजन")}
                                    </h3>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/50 group-hover:bg-purple-50 transition-colors">
                                    <Cpu className="w-5 h-5 text-purple-600 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="text-xs font-black text-purple-600 uppercase mb-1">Inference Engine</h4>
                                        <p className="text-xs font-bold text-foreground">Worker Profile & Market Vector Analysis</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { title: t("Personal AI Risk Score", "पर्सनल AI रिस्क स्कोर"), desc: t("0–100 score based on live market analysis", "लाइव मार्केट विश्लेषण के आधार पर 0–100 स्कोर") },
                                        { title: t("Week-by-week Reskilling Path", "हफ्ते-दर-हफ्ते रीस्किलिंग पाथ"), desc: t("Personalized career transition roadmap", "व्यक्तिगत करियर ट्रांज़िशन रोडमैप") },
                                        { title: t("AI Career Chatbot", "AI करियर चैटबॉट"), desc: t("Dual language support: English + Hindi", "द्विभाषी सहायता: अंग्रेजी + हिंदी") },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-200 mt-2 shrink-0" />
                                            <div>
                                                <span className="text-xs font-black text-foreground block">{item.title}</span>
                                                <span className="text-[11px] font-medium text-muted-foreground">{item.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-dashed border-purple-100">
                                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-3 leading-none">Resource Hub Integration</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['SWAYAM', 'NPTEL', 'PMKVY', 'Global Courses'].map((tag) => (
                                            <span key={tag} className="text-[9px] font-black bg-purple-100 text-purple-700 px-2 py-1 rounded-md uppercase tracking-tighter">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="mt-16 text-center"
                >
                    <div className="inline-block p-6 bg-white/40 backdrop-blur-xl border border-border shadow-sm rounded-3xl">
                        <p className="text-xs font-bold text-muted-foreground max-w-lg italic leading-relaxed">
                            "Layer 1 continuously analyzes live job market data. Layer 2 uses those signals to calculate AI risk and generate personalized reskilling paths."
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default SystemArchitecture;
