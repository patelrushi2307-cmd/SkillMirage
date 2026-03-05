import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Brain, Users, Zap, CheckCircle, TrendingUp, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">SM</span>
        </div>
        <span className="font-semibold text-foreground text-sm hidden sm:inline">Skills Mirage</span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
        <a href="#why-us" className="hover:text-foreground transition-colors">About</a>
      </div>
      <Button size="sm" variant="outline" onClick={() => navigate('/login')}>
        Sign In
      </Button>
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
          <Zap className="w-3 h-3" />
          Live Workforce Intelligence Platform
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
          Transform Workforce Intelligence with{' '}
          <span className="text-primary">Real-Time Skill Insights</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Skills Mirage empowers organizations to analyze, track, and manage workforce skills with
          AI-driven insights — enabling smarter hiring, reskilling, and talent strategy decisions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="gap-2 min-w-[160px]" onClick={() => navigate('/login')}>
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="min-w-[160px]" onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Free to get started</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Enterprise ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: BarChart3,
    title: 'Skill Analytics',
    description:
      'Deep-dive into workforce skill profiles with interactive dashboards showing gaps, trends, and benchmarks across teams and departments.',
  },
  {
    icon: TrendingUp,
    title: 'Workforce Insights',
    description:
      'Identify at-risk talent, emerging skill demands, and reskilling opportunities before they become critical issues.',
  },
  {
    icon: Zap,
    title: 'Real-time Data',
    description:
      'Live labor market feeds and internal skills data updated continuously so your decisions are always based on current intelligence.',
  },
  {
    icon: Brain,
    title: 'Smart Recommendations',
    description:
      "AI-powered reskilling paths tailored to each employee's goals and your organization's future skill needs.",
  },
];

const Features = () => (
  <section id="features" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <p className="text-primary text-sm font-medium uppercase tracking-widest">Features</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Everything you need to manage workforce skills
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A comprehensive platform designed for HR leaders, recruiters, and workforce strategists.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group relative p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const steps = [
  {
    number: '01',
    title: 'Connect Your Data',
    description: 'Integrate your HRIS, ATS, and learning platforms in minutes with our pre-built connectors.',
  },
  {
    number: '02',
    title: 'Analyze Skills',
    description: 'Our AI maps existing skills across your workforce and benchmarks them against market demand.',
  },
  {
    number: '03',
    title: 'Identify Gaps',
    description: 'Visualize skill gaps at team, department, or organization level with clear risk indicators.',
  },
  {
    number: '04',
    title: 'Take Action',
    description: 'Launch targeted reskilling programs, adjust hiring plans, and track progress in real time.',
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-6 bg-card/20">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <p className="text-primary text-sm font-medium uppercase tracking-widest">How It Works</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Get insights in four simple steps
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map(({ number, title, description }) => (
          <div key={number} className="relative space-y-4">
            <div className="text-5xl font-bold text-primary/20 leading-none">{number}</div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const whyItems = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process millions of skill data points in seconds with our optimized analytics engine.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant, end-to-end encryption, and role-based access control built in.',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Market intelligence from 150+ countries and 10,000+ job categories.',
  },
  {
    icon: Users,
    title: 'Multi-role Access',
    description: 'Purpose-built dashboards for Workers, Recruiters, and Admins — all in one platform.',
  },
];

const WhyChoose = () => (
  <section id="why-us" className="py-24 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <p className="text-primary text-sm font-medium uppercase tracking-widest">Why Skills Mirage</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Built for the future of work
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We combine real-time labor market data with your internal workforce data to give you an
          edge in the talent economy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {whyItems.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex gap-4 p-6 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/30 transition-colors"
          >
            <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/15 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="relative p-10 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 rounded-full blur-[80px]" />
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to transform your workforce strategy?
            </h2>
            <p className="text-muted-foreground">
              Join teams already using Skills Mirage to stay ahead of skill disruption.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 min-w-[160px]" onClick={() => navigate('/login')}>
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="min-w-[160px]" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-border/50 py-8 px-6">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs">SM</span>
        </div>
        <span>Skills Mirage</span>
      </div>
      <p>© 2026 Skills Mirage · HACKaMINeD 2026</p>
      <div className="flex items-center gap-4">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
        <a href="#why-us" className="hover:text-foreground transition-colors">About</a>
      </div>
    </div>
  </footer>
);

const Landing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <WhyChoose />
    <CTA />
    <Footer />
  </div>
);

export default Landing;
