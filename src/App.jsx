import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  ChevronRight,
  Cpu,
  Globe,
  Layers3,
  MessageSquareMore,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Workflow,
} from "lucide-react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Lenis from "lenis";
import * as THREE from "three";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Conversion-focused websites, platforms, and launch experiences designed to perform beautifully across devices and scale with confidence.",
  },
  {
    icon: Boxes,
    title: "3D Website Development",
    description:
      "Immersive storytelling with real-time 3D scenes, motion systems, and interactive interfaces that make premium brands unforgettable.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Digital Marketing",
    description:
      "Performance creative, funnel strategy, and analytics-led campaigns that transform traffic into measurable pipeline and revenue.",
  },
  {
    icon: BriefcaseBusiness,
    title: "CRM Development",
    description:
      "Custom CRM ecosystems that centralize leads, sales workflows, reporting, and customer lifecycle automation in one clean experience.",
  },
  {
    icon: BrainCircuit,
    title: "AI Agents & AI Technologies",
    description:
      "24/7 AI assistants, lead qualification systems, support copilots, and workflow automations that reduce response time and multiply output.",
  },
];

const portfolioItems = [
  {
    title: "Atlas Commerce OS",
    category: "Web App",
    description:
      "A multi-market storefront ecosystem with live inventory orchestration, modern checkout flows, and lifecycle growth automation.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Aurora Mobility Launch",
    category: "3D Experience",
    description:
      "A cinematic automotive launch site with scroll-led product storytelling, interactive feature reveals, and a booking-ready funnel.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "SignalStack CRM",
    category: "CRM Platform",
    description:
      "Lead routing, pipeline visibility, and executive dashboards for a B2B sales team managing complex outbound and inbound motion.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "PulseCare Assistant",
    category: "AI Tool",
    description:
      "A care coordination AI assistant that triages inquiries, books appointments, and summarizes context for human teams instantly.",
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Verdant Growth Engine",
    category: "Marketing System",
    description:
      "A creative + automation stack that unified paid media, landing pages, and CRM attribution for a premium D2C brand.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "NeuroGrid Analytics",
    category: "Data Product",
    description:
      "An executive-facing analytics suite that turns campaign, product, and revenue signals into action-ready decision intelligence.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
];

const testimonials = [
  {
    quote:
      "Intellcore Technologies gave us the kind of website people actually talk about. The experience feels premium, our sales team gets warmer leads, and the AI layer shortened response times from hours to seconds.",
    name: "Maya Chen",
    role: "Growth Director",
    company: "Axiom Labs",
  },
  {
    quote:
      "Their team merged product thinking, design craft, and engineering discipline in a way that felt closer to an internal innovation team than an external agency.",
    name: "Arjun Mehta",
    role: "Founder",
    company: "VantaGrid",
  },
  {
    quote:
      "From strategy through deployment, every detail felt intentional. The 3D product storytelling helped us reposition the brand and lift demo requests in the first month.",
    name: "Sophia Walker",
    role: "CMO",
    company: "NovaDrive",
  },
];

const processSteps = [
  {
    title: "Discover",
    summary:
      "We map brand ambition, market context, user behavior, and technical opportunities into a clear growth strategy.",
  },
  {
    title: "Design",
    summary:
      "We shape visual systems, conversion journeys, motion principles, and interface details that feel unmistakably premium.",
  },
  {
    title: "Develop",
    summary:
      "We engineer performant frontends, scalable systems, and automation infrastructure with production-level rigor.",
  },
  {
    title: "Deploy",
    summary:
      "We launch with QA, analytics, performance tuning, and a roadmap for iteration so momentum continues after go-live.",
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cortex-solutions" },
  { label: "Instagram", href: "https://www.instagram.com/cortexsolutions" },
  { label: "X", href: "https://x.com/cortexsolutions" },
];

function usePageMetadata(title, description) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);
}

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

function App() {
  const location = useLocation();

  useSmoothScroll();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-hero-radial">
      <AmbientBackdrop />
      <CustomCursor />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/privacy-policy"
            element={
              <LegalPage
                title="Privacy Policy"
                description="How Intellcore Technologies collects, uses, and protects information across our website, services, and project workflows."
                sections={[
                  {
                    heading: "Information We Collect",
                    body: "We collect contact details you submit through our forms, project inquiry details, analytics data about site usage, and communication history when you engage with our team. During active projects, we may also process business, product, and customer workflow information necessary to deliver web, CRM, marketing, or AI services.",
                  },
                  {
                    heading: "How We Use Information",
                    body: "We use submitted information to respond to inquiries, scope projects, deliver services, optimize website performance, improve conversion flows, and support ongoing communication. Project-related data is used only for legitimate delivery, optimization, and support purposes.",
                  },
                  {
                    heading: "Data Protection",
                    body: "We implement access controls, secure cloud tooling, encrypted communication channels where appropriate, and role-based access to protect client and user information. We review third-party tooling and minimize data collection to what is operationally necessary.",
                  },
                  {
                    heading: "Third-Party Services",
                    body: "Our website and delivery workflows may rely on analytics providers, hosting platforms, CRM systems, scheduling tools, and communication services. These providers process data according to their own policies and only within the scope needed to support our services.",
                  },
                  {
                    heading: "Your Rights",
                    body: "You may request access, correction, or deletion of personal information we hold, subject to operational and legal obligations. Privacy requests can be sent to privacy@cortexsolutions.co and we will respond within a reasonable timeframe.",
                  },
                ]}
              />
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <LegalPage
                title="Terms & Conditions"
                description="Terms governing the use of the Intellcore Technologies website, content, project communications, and service engagements."
                sections={[
                  {
                    heading: "Website Use",
                    body: "By accessing this website, you agree to use it lawfully and not attempt to disrupt, reverse engineer, or misuse any part of the experience, infrastructure, or content. All design, copy, branding, and technical assets remain protected intellectual property unless otherwise agreed in writing.",
                  },
                  {
                    heading: "Project Engagements",
                    body: "Any consulting, design, development, marketing, CRM, or AI implementation work is governed by a separate proposal, statement of work, or service agreement. Scope, timelines, deliverables, fees, revisions, and ownership terms are defined within those documents.",
                  },
                  {
                    heading: "No Warranty on External Platforms",
                    body: "We build with modern tools and best practices, but we cannot guarantee uninterrupted availability or policy stability across third-party platforms such as hosting providers, ad networks, messaging APIs, social platforms, or AI model vendors.",
                  },
                  {
                    heading: "Limitation of Liability",
                    body: "To the maximum extent allowed by law, Intellcore Technologies is not liable for indirect, incidental, or consequential damages arising from website use or service-related interruptions. Liability for paid services is limited to the value of the applicable contract unless otherwise required by law.",
                  },
                  {
                    heading: "Contact",
                    body: "Questions about these terms can be directed to legal@cortexsolutions.co. Continued use of the website after updates to these terms constitutes acceptance of the revised version.",
                  },
                ]}
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/55 px-4 py-3 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 shadow-glow">
            <Cpu className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-[0.3em] text-slate-300">
              Intellcore
            </div>
            <div className="text-xs text-slate-500">Technologies</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {isHome ? (
            <>
              {["Services", "3D", "AI Agents", "Work", "Process"].map((item) => {
                const id = item === "3D" ? "experience" : item.toLowerCase().replace(" ", "-");
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {item}
                  </button>
                );
              })}
            </>
          ) : (
            <>
              <NavLink to="/" className="text-sm text-slate-300 transition hover:text-white">
                Home
              </NavLink>
              <NavLink
                to="/privacy-policy"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Privacy
              </NavLink>
              <NavLink
                to="/terms-and-conditions"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Terms
              </NavLink>
            </>
          )}
        </nav>

        <a
          href="mailto:intellcoretechnologies@gmail.com?subject=Project%20Inquiry"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/15"
        >
          Start a Project
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.header>
  );
}

function HomePage() {
  usePageMetadata(
    "Intellcore Technologies | AI Agents, 3D Websites & High-Performance Digital Products",
    "Intellcore Technologies builds AI agents, premium websites, immersive 3D experiences, CRM platforms, and digital growth systems for ambitious brands.",
  );

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10"
    >
      <HeroSection />
      <ServicesSection />
      <ExperienceSection />
      <AiAgentsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ProcessSection />
      <FinalCtaSection />
      <Footer />
    </motion.main>
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const previewY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 sm:px-6"
    >
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5], fov: 50 }}>
            <color attach="background" args={["#020617"]} />
            <fog attach="fog" args={["#020617", 4.5, 12]} />
            <ambientLight intensity={0.45} />
            <directionalLight position={[3, 5, 2]} intensity={1.2} color="#67e8f9" />
            <pointLight position={[-4, -2, 2]} intensity={1} color="#7c3aed" />
            <HeroNeuralScene />
          </Canvas>
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.28),rgba(2,6,23,0.84))]" />
      <div className="grid-sheen absolute inset-0 opacity-60" />

      <div className="section-shell relative z-10 grid min-h-[80vh] items-center gap-16 pt-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="max-w-3xl">
          <motion.div style={{ y: badgeY }} className="section-kicker">
            <Sparkles className="h-3.5 w-3.5" />
            Premium digital systems for ambitious brands
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            We Build <span className="text-gradient">Digital Experiences</span> That Think,
            Move & Convert.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            From AI agents to 3D websites, we turn ideas into scalable tech products that
            feel world-class, perform under pressure, and drive measurable business growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="mailto:intellcoretechnologies@gmail.com?subject=Start%20Your%20Project"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,255,255,0.18)]"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:shadow-glow"
            >
              View Our Work
              <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-3"
          >
            {[
              ["100+", "Projects Delivered"],
              ["95%", "Client Retention"],
              ["24/7", "AI-Powered Operations"],
            ].map(([value, label]) => (
              <div key={label} className="glass-panel rounded-3xl px-5 py-5">
                <div className="text-3xl font-semibold text-white">{value}</div>
                <div className="mt-2 text-sm text-slate-400">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          style={{ y: previewY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="relative"
        >
          <div className="noise glass-panel relative overflow-hidden rounded-[32px] p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,0.22),transparent_30%)]" />
            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                    Live Operating Layer
                  </div>
                  <div className="mt-2 text-xl font-semibold text-white">
                    Designed to convert at every touchpoint
                  </div>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                  Systems online
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="text-sm text-slate-400">AI lead qualification</div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-4xl font-semibold text-white">3.4x</div>
                      <div className="mt-1 text-sm text-slate-400">
                        increase in sales-ready leads
                      </div>
                    </div>
                    <Bot className="h-10 w-10 text-cyan-300" />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="text-sm text-slate-400">Interactive product stories</div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-4xl font-semibold text-white">61%</div>
                      <div className="mt-1 text-sm text-slate-400">
                        deeper average engagement
                      </div>
                    </div>
                    <Layers3 className="h-10 w-10 text-violet-300" />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white">
                    Revenue Flow Architecture
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    realtime
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Traffic", "Creative campaigns, SEO, targeted acquisition"],
                    ["Experience", "3D storytelling, smart UX, offer clarity"],
                    ["Automation", "AI agents, CRM sync, conversion workflows"],
                  ].map(([label, text], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.08, duration: 0.6 }}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                    >
                      <div className="text-sm font-semibold text-white">{label}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative">
      <div className="section-shell">
        <SectionHeading
          kicker="Services"
          title="End-to-end execution for brands that want sharper design, smarter systems, and better conversion."
          description="Every engagement blends strategic thinking, visual polish, and technical depth so the final product feels premium and performs like a growth engine."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {services.map((service, index) => (
            <TiltCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div style={{ y: translateY }} className="max-w-2xl">
            <SectionHeading
              kicker="3D Experience"
              title="Immersive websites that feel alive, responsive, and unmistakably high-end."
              description="We turn scroll into a storytelling system with parallax depth, interactive motion, and 3D product moments that elevate perceived value without sacrificing performance."
              align="left"
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Layers3,
                  title: "Scroll-led storytelling",
                  text: "Product narratives unfold with cinematic timing and deliberate pacing.",
                },
                {
                  icon: Sparkles,
                  title: "Premium interaction design",
                  text: "Micro-interactions add polish that users can feel before they describe it.",
                },
                {
                  icon: Workflow,
                  title: "Conversion-aware motion",
                  text: "Animation supports the journey instead of distracting from the decision.",
                },
                {
                  icon: ShieldCheck,
                  title: "Performance discipline",
                  text: "We optimize for fluidity, responsiveness, and deployable production code.",
                },
              ].map((item) => (
                <div key={item.title} className="glass-panel rounded-3xl p-5">
                  <item.icon className="h-6 w-6 text-cyan-300" />
                  <div className="mt-4 text-lg font-semibold text-white">{item.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">{item.text}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="glass-panel relative h-[560px] overflow-hidden rounded-[36px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(103,232,249,0.18),transparent_30%),radial-gradient(circle_at_70%_10%,rgba(139,92,246,0.18),transparent_30%)]" />
            <div className="absolute left-6 top-6 z-10 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-100">
              Interactive 3D Stage
            </div>
            <div className="absolute inset-0">
              <Canvas dpr={[1, 1.4]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5], fov: 48 }}>
                <ambientLight intensity={0.55} />
                <directionalLight position={[4, 5, 6]} intensity={1.4} color="#67e8f9" />
                <pointLight position={[-4, -1, 4]} intensity={1.2} color="#8b5cf6" />
                <ExperienceScene />
              </Canvas>
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-10 grid gap-3 sm:grid-cols-3">
              {[
                ["Parallax", "Layered depth cues respond to movement and scroll."],
                ["Realtime", "3D scenes render fluidly with a premium, tactile feel."],
                ["Responsive", "Built mobile-first so the drama survives smaller screens."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/65 p-4 backdrop-blur-lg">
                  <div className="text-sm font-semibold text-white">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AiAgentsSection() {
  return (
    <section id="ai-agents" className="relative">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,24,0.95),rgba(5,8,22,0.82))] shadow-[0_25px_100px_rgba(2,6,23,0.5)]">
          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-10">
            <div>
              <SectionHeading
                kicker="AI Agents"
                title="Deploy an AI workforce that responds instantly, qualifies leads, and keeps business moving 24/7."
                description="We design AI agents that feel operationally useful on day one, not gimmicky. They answer inquiries, route conversations, trigger CRM updates, schedule next steps, and give your team more time for high-value work."
                align="left"
              />

              <div className="mt-8 grid gap-4">
                {[
                  "Qualify inbound leads in seconds using natural conversation and scoring logic.",
                  "Automate WhatsApp, web chat, and support flows with human-like responses.",
                  "Sync intent, summaries, and next steps into your CRM without manual copying.",
                  "Keep engagement alive after hours, across weekends, and during campaign spikes.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-cyan-300" />
                    <p className="text-sm leading-7 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["82%", "faster first response"],
                  ["3.1x", "more qualified conversations"],
                  ["24/7", "business continuity"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="text-3xl font-semibold text-white">{value}</div>
                    <div className="mt-2 text-sm text-slate-400">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="glass-panel relative rounded-[32px] p-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-sm font-semibold text-white">IntellcoreAgent Console</div>
                  <div className="mt-1 text-sm text-slate-400">
                    Website + WhatsApp automation flow
                  </div>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                  Live demo logic
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15">
                      <MessageSquareMore className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">WhatsApp Lead Capture</div>
                      <div className="text-xs text-slate-500">Triggered from paid campaign</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <ChatBubble
                      type="user"
                      message="Hi, I'm looking for a website that feels premium and can help us qualify leads automatically."
                    />
                    <ChatBubble
                      type="agent"
                      message="Absolutely. I can help scope that. Are you looking for a marketing site, a product platform, or both?"
                    />
                    <ChatBubble
                      type="user"
                      message="Both. We also want AI chat and CRM integration."
                    />
                    <ChatBubble
                      type="agent"
                      message="Perfect. I've tagged this as a high-intent build. I can schedule a discovery call and send your requirements to our solutions team right now."
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/10 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-cyan-100">
                          Automation Outcome
                        </div>
                        <div className="mt-2 text-3xl font-semibold text-white">
                          Discovery call booked
                        </div>
                      </div>
                      <Rocket className="h-10 w-10 text-cyan-200" />
                    </div>
                    <div className="mt-4 text-sm leading-6 text-cyan-50/80">
                      The AI agent captured budget range, service interest, timeline, and
                      urgency before syncing everything into the sales pipeline.
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-slate-950/75 p-5">
                    <div className="text-sm font-semibold text-white">Workflow Chain</div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {[
                        "Lead source tagged",
                        "Intent score: 92",
                        "CRM record created",
                        "Slack alert sent",
                        "Call link delivered",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-300"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-violet-300" />
                      <div className="text-sm font-semibold text-white">
                        Business impact beyond chat
                      </div>
                    </div>
                    <div className="mt-3 text-sm leading-7 text-slate-400">
                      The same agent framework can support onboarding, FAQs, appointment
                      management, lead nurturing, reactivation campaigns, and internal ops.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section id="work" className="relative">
      <div className="section-shell">
        <SectionHeading
          kicker="Portfolio"
          title="Selected work across premium web experiences, AI systems, and growth infrastructure."
          description="A few examples of the kind of product, brand, and automation work we help ambitious teams ship with confidence."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className="group glass-panel overflow-hidden rounded-[30px]"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-slate-950/65 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-200">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 flex-none text-cyan-300 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              kicker="Social Proof"
              title="Trusted by teams who care about experience quality and business outcomes."
              description="The work is designed to earn attention first, then trust, then action. That’s why we obsess over both polish and performance."
              align="left"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["100+", "Projects Delivered"],
                ["95%", "Client Retention"],
                ["18", "Industries Supported"],
                ["4.9/5", "Average Satisfaction"],
              ].map(([value, label]) => (
                <div key={label} className="glass-panel rounded-3xl p-5">
                  <div className="text-3xl font-semibold text-white">{value}</div>
                  <div className="mt-2 text-sm text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel overflow-hidden rounded-[36px] p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2 text-amber-300">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeIndex].name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-2xl leading-10 text-slate-100 sm:text-[2rem]">
                  “{testimonials[activeIndex].quote}”
                </p>
                <div className="mt-8">
                  <div className="text-lg font-semibold text-white">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    {testimonials[activeIndex].role} · {testimonials[activeIndex].company}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition ${
                    index === activeIndex ? "w-12 bg-cyan-300" : "w-6 bg-white/15"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="relative">
      <div className="section-shell">
        <SectionHeading
          kicker="Process"
          title="A clear build process that keeps strategy, design, and delivery aligned."
          description="The way we work is designed to reduce chaos, accelerate decisions, and keep quality high from kickoff through launch."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="group glass-panel relative overflow-hidden rounded-[30px] p-6"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-sky-500 to-violet-500 opacity-80" />
              <div className="text-sm uppercase tracking-[0.35em] text-slate-500">
                0{index + 1}
              </div>
              <div className="mt-6 text-2xl font-semibold text-white">{step.title}</div>
              <div className="mt-4 text-sm leading-7 text-slate-400">{step.summary}</div>
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-cyan-200">
                Momentum checkpoint
                <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section id="contact" className="relative pb-12">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.22),transparent_30%),linear-gradient(180deg,rgba(6,10,23,0.95),rgba(2,6,23,0.95))] p-8 sm:p-10 lg:p-14">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="section-kicker">Final CTA</div>
            <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Ready to Build Something Extraordinary?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Let’s turn your next launch, platform, or AI automation initiative into a
              digital experience that looks premium and performs like a serious growth
              asset.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:intellcoretechnologies@gmail.com?subject=Book%20Free%20Consultation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Book Free Consultation
                <PhoneCall className="h-4 w-4" />
              </a>
              <a
                href="tel:+919310163211"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                Speak With Our Team
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/8 bg-slate-950/40">
      <div className="section-shell py-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 shadow-glow">
                <Cpu className="h-6 w-6 text-slate-950" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">Intellcore Technologies</div>
                <div className="text-sm text-slate-500">
                  Digital products, AI systems, and premium brand experiences
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
              We design and build high-impact websites, CRM platforms, AI agents, and
              growth systems for brands that want to look sharper and move faster.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                Contact
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <a className="block transition hover:text-white" href="mailto:intellcoretechnologies@gmail.com">
                  intellcoretechnologies@gmail.com
                </a>
                <a className="block transition hover:text-white" href="tel:+919310163211">
                  +91 98765 43210
                </a>
                <p>18th Floor, One BKC, Bandra Kurla Complex, Mumbai 400051</p>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                Social
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                Legal
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <Link to="/privacy-policy" className="block transition hover:text-white">
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-and-conditions"
                  className="block transition hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/8 pt-6 text-sm text-slate-500">
          © 2026 Intellcore Technologies. Crafted for brands building the future.
        </div>
      </div>
    </footer>
  );
}

function LegalPage({ title, description, sections }) {
  usePageMetadata(`Intellcore Technologies | ${title}`, description);

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 pt-28"
    >
      <section className="section-shell">
        <div className="glass-panel rounded-[36px] p-8 sm:p-10">
          <div className="section-kicker">Legal</div>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
          <div className="mt-12 grid gap-8">
            {sections.map((section) => (
              <div key={section.heading} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
                <p className="mt-4 text-sm leading-8 text-slate-300">{section.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
            >
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </motion.main>
  );
}

function SectionHeading({ kicker, title, description, align = "center" }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`mx-auto flex max-w-3xl flex-col ${alignment}`}>
      <div className="section-kicker">{kicker}</div>
      <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-slate-400">{description}</p>
    </div>
  );
}

function TiltCard({ service, index }) {
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg) scale(1)");

  const onMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateX = (y / bounds.height - 0.5) * -12;
    const rotateY = (x / bounds.width - 0.5) * 14;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`);
  };

  const resetTransform = () => setTransform("rotateX(0deg) rotateY(0deg) scale(1)");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      onMouseMove={onMove}
      onMouseLeave={resetTransform}
      style={{ transform, transition: "transform 180ms ease-out" }}
      className="card-tilt glass-panel relative min-h-[280px] overflow-hidden rounded-[30px] p-6 lg:min-h-[360px]"
    >
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-violet-400/10 blur-3xl" />
      <div className="relative flex h-full flex-col">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
          <service.icon className="h-7 w-7 text-cyan-200" />
        </div>
        <div className="mt-8 text-2xl font-semibold text-white">{service.title}</div>
        <div className="mt-4 text-sm leading-7 text-slate-400">{service.description}</div>
        <div className="mt-auto pt-8 text-sm text-cyan-200">
          Built for performance, clarity, and growth
        </div>
      </div>
    </motion.div>
  );
}

function ChatBubble({ type, message }) {
  const isAgent = type === "agent";

  return (
    <div className={`flex ${isAgent ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-7 ${
          isAgent
            ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-50"
            : "border border-white/10 bg-white/[0.05] text-slate-200"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

function FloatingGroup({
  children,
  speed = 1,
  floatIntensity = 0.6,
  rotationIntensity = 0.4,
}) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = Math.sin(t) * floatIntensity * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.8) * rotationIntensity * 0.2;
    ref.current.rotation.y += 0.0035 * speed;
  });

  return <group ref={ref}>{children}</group>;
}

function AmbientBackdrop() {
  const { scrollYProgress } = useScroll();
  const leftOrbY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rightOrbY = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ y: leftOrbY }}
        className="absolute left-[-120px] top-24 h-[420px] w-[420px] rounded-full bg-cyan-400/12 blur-[120px]"
      />
      <motion.div
        style={{ y: rightOrbY }}
        className="absolute right-[-120px] top-[18%] h-[460px] w-[460px] rounded-full bg-violet-500/12 blur-[140px]"
      />
      <div className="absolute inset-x-0 bottom-0 h-[360px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_55%)]" />
    </div>
  );
}

function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 250, mass: 0.2 });
  const springY = useSpring(y, { damping: 28, stiffness: 250, mass: 0.2 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setEnabled(media.matches);
    const handler = (event) => setEnabled(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (event) => {
      x.set(event.clientX - 12);
      y.set(event.clientY - 12);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7 }}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-6 w-6 rounded-full border border-cyan-200/60 bg-cyan-300/10 shadow-[0_0_35px_rgba(103,232,249,0.55)] backdrop-blur-sm lg:block"
    />
  );
}

function HeroNeuralScene() {
  const group = useRef(null);

  const { nodes, linePositions, particlePositions } = useMemo(() => {
    const generatedNodes = Array.from({ length: 26 }, (_, index) => {
      const angle = (index / 26) * Math.PI * 2;
      const radius = 1.3 + Math.sin(index * 2.4) * 0.35 + Math.random() * 0.55;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(index * 1.6) * 1.15,
        Math.sin(angle) * radius * 0.55,
      );
    });

    const lines = [];
    for (let i = 0; i < generatedNodes.length; i += 1) {
      for (let j = i + 1; j < generatedNodes.length; j += 1) {
        if (generatedNodes[i].distanceTo(generatedNodes[j]) < 1.45) {
          lines.push(...generatedNodes[i].toArray(), ...generatedNodes[j].toArray());
        }
      }
    }

    const particles = new Float32Array(480 * 3);
    for (let i = 0; i < 480; i += 1) {
      const radius = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particles[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particles[i * 3 + 1] = radius * Math.cos(phi) * 0.65;
      particles[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return {
      nodes: generatedNodes,
      linePositions: new Float32Array(lines),
      particlePositions: particles,
    };
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={particlePositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#93c5fd" transparent opacity={0.75} />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.28} />
      </lineSegments>

      {nodes.map((point, index) => (
        <mesh key={index} position={point.toArray()}>
          <sphereGeometry args={[0.05, 18, 18]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#67e8f9" : "#c4b5fd"}
            emissive={index % 3 === 0 ? "#0891b2" : "#7c3aed"}
            emissiveIntensity={1.4}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      ))}

      <FloatingGroup speed={1.3} rotationIntensity={0.7} floatIntensity={0.8}>
        <mesh rotation={[0.4, 0.6, 0.1]}>
          <torusKnotGeometry args={[0.6, 0.12, 220, 32]} />
          <meshPhysicalMaterial
            color="#8b5cf6"
            roughness={0.15}
            transmission={0.2}
            thickness={0.5}
            metalness={0.65}
            clearcoat={1}
            transparent
            opacity={0.5}
          />
        </mesh>
      </FloatingGroup>
    </group>
  );
}

function ExperienceScene() {
  const group = useRef(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.6 + state.clock.elapsedTime * 0.16,
      0.05,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.8 + state.clock.elapsedTime * 0.22,
      0.05,
    );
  });

  return (
    <group ref={group}>
      <FloatingGroup speed={1.8} rotationIntensity={0.9} floatIntensity={1.1}>
        <mesh>
          <icosahedronGeometry args={[1.12, 1]} />
          <meshPhysicalMaterial
            color="#67e8f9"
            emissive="#0f766e"
            emissiveIntensity={0.55}
            roughness={0.12}
            metalness={0.88}
            transmission={0.1}
            clearcoat={1}
          />
        </mesh>
      </FloatingGroup>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.95, 0.05, 22, 120]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
      </mesh>

      <mesh rotation={[0.8, 0.4, 0.3]}>
        <torusKnotGeometry args={[0.52, 0.08, 180, 24]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#7c3aed" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

export default App;
