import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  MessageSquareMore,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Workflow,
  X,
} from "lucide-react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  aboutPillars,
  caseStudies,
  COMPANY_NAME,
  CONTACT_EMAIL,
  legalPages,
  navItems,
  PHONE_DISPLAY,
  PHONE_E164,
  portfolioItems,
  pricingPlans,
  processSteps,
  services,
  socialLinks,
  teamCards,
  testimonials,
  WHATSAPP_URL,
} from "./siteData";
import {
  AmbientBackdrop,
  ExperienceScene,
  HeroNeuralScene,
  SceneCanvas,
  WhatsAppFloat,
} from "./scenes";

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const y = element.getBoundingClientRect().top + window.scrollY - 108;
  window.scrollTo({ top: y, behavior: "smooth" });
}

const countryCodeOptions = [
  { value: "+91", label: "India (+91)" },
  { value: "+1", label: "United States (+1)" },
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+971", label: "United Arab Emirates (+971)" },
  { value: "+65", label: "Singapore (+65)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+33", label: "France (+33)" },
  { value: "+31", label: "Netherlands (+31)" },
  { value: "+39", label: "Italy (+39)" },
  { value: "+34", label: "Spain (+34)" },
  { value: "+41", label: "Switzerland (+41)" },
  { value: "+81", label: "Japan (+81)" },
  { value: "+82", label: "South Korea (+82)" },
  { value: "+60", label: "Malaysia (+60)" },
  { value: "+66", label: "Thailand (+66)" },
  { value: "+62", label: "Indonesia (+62)" },
  { value: "+977", label: "Nepal (+977)" },
  { value: "+880", label: "Bangladesh (+880)" },
  { value: "+94", label: "Sri Lanka (+94)" },
];

function usePageMetadata(title, description) {
  useEffect(() => {
    document.title = title;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (descriptionMeta) descriptionMeta.setAttribute("content", description);
    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDescription) ogDescription.setAttribute("content", description);
  }, [title, description]);
}

function SiteApp() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-hero-radial">
      <AmbientBackdrop />
      <Header />
      <WhatsAppFloat />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          {Object.values(legalPages).map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<LegalPage title={page.title} description={page.description} sections={page.sections} />}
            />
          ))}
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleBookCall = () => {
    if (isHome) scrollToSection("contact");
    else navigate("/");
  };

  const legalLinks = (
    <>
      <NavLink to="/" className="text-sm text-slate-300 transition hover:text-white">Home</NavLink>
      <NavLink to={legalPages.privacy.path} className="text-sm text-slate-300 transition hover:text-white">Privacy</NavLink>
      <NavLink to={legalPages.terms.path} className="text-sm text-slate-300 transition hover:text-white">Terms</NavLink>
      <NavLink to={legalPages.refund.path} className="text-sm text-slate-300 transition hover:text-white">Refund</NavLink>
    </>
  );

  return (
    <>
      <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/60 px-4 py-3 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:px-6">
          <Link to="/" className="flex items-center">
            <BrandLogo className="w-[148px] sm:w-[186px]" priority />
          </Link>
          <nav className="hidden items-center gap-5 xl:flex">
            {isHome
              ? navItems.map((item) => (
                  <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-sm text-slate-300 transition hover:text-white">
                    {item.label}
                  </button>
                ))
              : legalLinks}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={handleBookCall} className="hidden items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/15 sm:inline-flex">
              Book a Call
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button onClick={() => setMobileOpen((current) => !current)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white xl:hidden">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="fixed inset-x-4 top-24 z-40 rounded-[28px] border border-white/10 bg-slate-950/92 p-5 shadow-[0_30px_100px_rgba(2,6,23,0.65)] backdrop-blur-2xl xl:hidden">
            <div className="grid gap-4">
              {isHome
                ? navItems.map((item) => (
                    <button key={item.id} onClick={() => { scrollToSection(item.id); setMobileOpen(false); }} className="text-left text-sm text-slate-300 transition hover:text-white">
                      {item.label}
                    </button>
                  ))
                : legalLinks}
              <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
                <button onClick={() => { handleBookCall(); setMobileOpen(false); }} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                  Book a Call
                  <PhoneCall className="h-4 w-4" />
                </button>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white">
                  Chat on WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function HomePage() {
  usePageMetadata(
    "Intellcore Technologies | Premium Web Development, 3D Experiences, AI Agents & Growth",
    "Intellcore Technologies builds premium websites, 3D digital experiences, AI agents, and performance-driven growth systems for startups, creators, and D2C brands.",
  );

  return (
    <motion.main initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
      <HeroSection />
      <ServicesSection />
      <ExperienceSection />
      <AiAgentsSection />
      <PortfolioSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <AboutSection />
      <PricingSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </motion.main>
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const previewY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 sm:px-6">
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <SceneCanvas className="absolute inset-0">
            <color attach="background" args={["#020617"]} />
            <fog attach="fog" args={["#020617", 4.5, 12]} />
            <ambientLight intensity={0.45} />
            <directionalLight position={[3, 5, 2]} intensity={1.2} color="#67e8f9" />
            <pointLight position={[-4, -2, 2]} intensity={1} color="#7c3aed" />
            <HeroNeuralScene />
          </SceneCanvas>
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
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="font-display max-w-4xl text-5xl font-semibold leading-[1.01] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Premium websites, 3D launches, and AI agents built to win attention and convert it.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            We help startups, creators, and D2C brands turn scattered digital touchpoints into one polished growth machine with better positioning, smoother journeys, and faster lead response.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button onClick={() => scrollToSection("contact")} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">
              Book a Call
              <PhoneCall className="h-4 w-4" />
            </button>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:shadow-glow">
              Chat on WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
            <button onClick={() => scrollToSection("work")} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-7 py-4 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.03]">
              View Work
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
          <div className="mt-8 flex flex-wrap gap-3">
            {["For startups", "For creators", "For D2C brands", "Response within 1 business day"].map((item) => (
              <div key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              ["100+", "Projects delivered"],
              ["95%", "Client retention"],
              ["24/7", "AI-powered lead coverage"],
            ].map(([value, label]) => (
              <div key={label} className="glass-panel rounded-3xl px-5 py-5">
                <div className="font-display text-3xl font-semibold text-white">{value}</div>
                <div className="mt-2 text-sm text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div style={{ y: previewY }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.9 }} className="relative">
          <div className="noise glass-panel relative overflow-hidden rounded-[32px] p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,0.22),transparent_30%)]" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-cyan-200">Lead engine preview</div>
                  <div className="font-display mt-2 text-xl font-semibold text-white">A premium funnel with clear business intent</div>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">Live opportunity flow</div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <MetricCard label="Average inquiry quality" value="3.4x" detail="increase in sales-ready leads" icon={<Bot className="h-10 w-10 text-cyan-300" />} />
                <MetricCard label="Experience engagement" value="61%" detail="deeper average session depth" icon={<Layers3 className="h-10 w-10 text-violet-300" />} />
              </div>
              <div className="mt-4 rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white">Growth stack architecture</div>
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-500">realtime</div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Traffic", "Performance creative, SEO, and smart demand capture."],
                    ["Experience", "Premium interfaces that remove friction from decision making."],
                    ["Automation", "AI and CRM workflows that keep follow-up moving."],
                  ].map(([label, text]) => (
                    <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <div className="text-sm font-semibold text-white">{label}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
                    </div>
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
    <section id="services" className="relative scroll-mt-28">
      <div className="section-shell">
        <SectionHeading kicker="Services" title="The agency stack behind premium launches, smarter systems, and more qualified leads." description="Every engagement combines strategy, UI craft, engineering, and conversion thinking so the final product looks elevated and performs like a real business asset." />
        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {services.map((service, index) => (
            <TiltCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden scroll-mt-28">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-2xl">
            <SectionHeading kicker="3D Experience" title="Immersive websites that feel tactile, responsive, and clearly premium." description="We use depth, motion, and visual pacing to create launches that feel like product events, not brochure pages." align="left" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Scroll-led storytelling", "Each scene reveals value with intention instead of overwhelming the user.", Layers3],
                ["Premium interactions", "Micro-moments add polish that users notice before they can explain it.", Sparkles],
                ["Conversion-aware motion", "Animation supports the buying journey instead of distracting from it.", Workflow],
                ["Performance discipline", "Responsive, deployable, and tuned so the premium feel survives real-world use.", ShieldCheck],
              ].map(([title, text, Icon]) => (
                <div key={title} className="glass-panel rounded-3xl p-5">
                  <Icon className="h-6 w-6 text-cyan-300" />
                  <div className="font-display mt-4 text-lg font-semibold text-white">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel relative h-[560px] overflow-hidden rounded-[36px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(103,232,249,0.18),transparent_30%),radial-gradient(circle_at_70%_10%,rgba(139,92,246,0.18),transparent_30%)]" />
            <div className="absolute left-6 top-6 z-10 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-100">Interactive 3D stage</div>
            <SceneCanvas className="absolute inset-0" camera={{ position: [0, 0, 5], fov: 48 }}>
              <ambientLight intensity={0.55} />
              <directionalLight position={[4, 5, 6]} intensity={1.4} color="#67e8f9" />
              <pointLight position={[-4, -1, 4]} intensity={1.2} color="#8b5cf6" />
              <ExperienceScene />
            </SceneCanvas>
            <div className="absolute bottom-6 left-6 right-6 z-10 grid gap-3 sm:grid-cols-3">
              {[
                ["Parallax", "Layered depth cues react to motion and make the page feel alive."],
                ["Realtime", "Scenes render smoothly with visual confidence and restraint."],
                ["Responsive", "The experience still lands on smaller screens without feeling broken."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/65 p-4 backdrop-blur-lg">
                  <div className="text-sm font-semibold text-white">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AiAgentsSection() {
  return (
    <section id="ai-agents" className="relative scroll-mt-28">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,24,0.95),rgba(5,8,22,0.82))] shadow-[0_25px_100px_rgba(2,6,23,0.5)]">
          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-10">
            <div>
              <SectionHeading kicker="AI Agents" title="Deploy AI workers that qualify, respond, route, and follow up around the clock." description="We design AI agents that feel useful on day one. They capture project details, answer questions, sync to your CRM, and keep warm intent moving." align="left" />
              <div className="mt-8 grid gap-4">
                {[
                  "Qualify inbound leads in seconds using natural conversation and intent scoring.",
                  "Automate WhatsApp, website chat, and support flows with human-sounding replies.",
                  "Push summaries, tags, and next steps into CRM systems without manual copying.",
                  "Keep revenue conversations alive after hours and during campaign spikes.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-cyan-300" />
                    <p className="text-sm leading-7 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-[32px] p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="font-display text-sm font-semibold text-white">IntellcoreAgent Console</div>
                  <div className="mt-1 text-sm text-slate-400">Website and WhatsApp automation flow</div>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">Demo logic</div>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15">
                      <MessageSquareMore className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">WhatsApp lead capture</div>
                      <div className="text-xs text-slate-500">Triggered from paid campaign</div>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    <ChatBubble type="user" message="Hi, we want a premium website and an AI assistant that can qualify leads." />
                    <ChatBubble type="agent" message="Absolutely. Are you planning a new launch, a relaunch, or a product platform?" />
                    <ChatBubble type="user" message="A relaunch, plus CRM integration and WhatsApp automation." />
                    <ChatBubble type="agent" message="Perfect. I have tagged this as high-intent and prepared a discovery call handoff." />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/10 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-cyan-100">Automation outcome</div>
                        <div className="font-display mt-2 text-3xl font-semibold text-white">Discovery call booked</div>
                      </div>
                      <Rocket className="h-10 w-10 text-cyan-200" />
                    </div>
                    <div className="mt-4 text-sm leading-6 text-cyan-50/80">The AI agent captured service interest, budget range, timing, and urgency before pushing the summary into the sales pipeline.</div>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-violet-300" />
                      <div className="text-sm font-semibold text-white">Business impact beyond chat</div>
                    </div>
                    <div className="mt-3 text-sm leading-7 text-slate-400">The same AI stack can power FAQs, appointment booking, onboarding, post-purchase support, and lead nurturing without creating tool sprawl.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section id="work" className="relative scroll-mt-28">
      <div className="section-shell">
        <SectionHeading kicker="Portfolio" title="Selected work across premium websites, 3D experiences, AI automation, and growth systems." description="A few examples of how we combine positioning, interaction design, and technical execution into work that feels premium and drives action." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <motion.article key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, delay: index * 0.06 }} className="group glass-panel overflow-hidden rounded-[30px]">
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-slate-950/65 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-200">{item.category}</div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative scroll-mt-28">
      <div className="section-shell">
        <SectionHeading kicker="Case Studies" title="Problem to solution to outcome, with a sharp focus on what changed in the business." description="These are the patterns we care about most: stronger positioning, better lead quality, tighter response systems, and experiences people remember." />
        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.title} className="glass-panel rounded-[32px] p-6">
              <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-100">{study.category}</div>
              <h3 className="font-display mt-5 text-2xl font-semibold text-white">{study.title}</h3>
              <CaseStudyRow label="Problem" text={study.problem} />
              <CaseStudyRow label="Solution" text={study.solution} />
              <CaseStudyRow label="Result" text={study.result} />
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {study.metrics.map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="font-display text-2xl font-semibold text-white">{value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % testimonials.length), 4200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="relative scroll-mt-28">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading kicker="Testimonials" title="Trusted by teams that care about experience quality and revenue impact." description="The goal is not just to look polished. It is to create work that earns trust, accelerates decision making, and makes every inquiry feel warmer." align="left" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["100+", "Projects delivered"],
                ["95%", "Client retention"],
                ["18", "Industries supported"],
                ["4.9/5", "Average satisfaction"],
              ].map(([value, label]) => (
                <div key={label} className="glass-panel rounded-3xl p-5">
                  <div className="font-display text-3xl font-semibold text-white">{value}</div>
                  <div className="mt-2 text-sm text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel overflow-hidden rounded-[36px] p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2 text-amber-300">
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-5 w-5 fill-current" />)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={testimonials[activeIndex].name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <p className="font-display text-2xl leading-10 text-slate-100 sm:text-[2rem]">"{testimonials[activeIndex].quote}"</p>
                <div className="mt-8">
                  <div className="text-lg font-semibold text-white">{testimonials[activeIndex].name}</div>
                  <div className="mt-1 text-sm text-slate-400">{testimonials[activeIndex].role} | {testimonials[activeIndex].company}</div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex gap-2">
              {testimonials.map((item, index) => (
                <button key={item.name} onClick={() => setActiveIndex(index)} className={`h-2 rounded-full transition ${index === activeIndex ? "w-12 bg-cyan-300" : "w-6 bg-white/15"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-28">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-[36px] p-6 sm:p-8">
            <div className="section-kicker">About</div>
            <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">A digital agency built for brands that want elegant execution, not agency theater.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">Intellcore Technologies was shaped around one belief: premium brands need systems that look exceptional and work exceptionally well. We blend strategy, UI design, engineering, motion, and automation so founders do not have to manage five vendors to ship one meaningful result.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {aboutPillars.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                  <item.icon className="h-6 w-6 text-cyan-300" />
                  <div className="font-display mt-4 text-xl font-semibold text-white">{item.title}</div>
                  <div className="mt-2 text-sm leading-7 text-slate-400">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            {teamCards.map((card) => (
              <div key={card.role} className="glass-panel rounded-[30px] p-6">
                <div className="text-xs uppercase tracking-[0.3em] text-cyan-200">{card.role}</div>
                <div className="font-display mt-4 text-2xl font-semibold text-white">{card.title}</div>
                <div className="mt-3 text-sm leading-7 text-slate-400">{card.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const options = [
    { id: "website", label: "Website" },
    { id: "threeD", label: "3D layer" },
    { id: "ai", label: "AI agent" },
    { id: "marketing", label: "Growth system" },
  ];
  const [selected, setSelected] = useState(["website", "ai"]);
  const [timeline, setTimeline] = useState("standard");
  const timelineLabels = {
    standard: "Standard timeline",
    rush: "Rush timeline",
    extended: "Extended timeline",
  };

  const selectedSummary = useMemo(() => {
    const labels = options
      .filter((option) => selected.includes(option.id))
      .map((option) => option.label);
    return labels.length > 0 ? labels.join(", ") : "Custom scope";
  }, [selected, timeline]);

  return (
    <section id="pricing" className="relative scroll-mt-28">
      <div className="section-shell">
        <SectionHeading kicker="Pricing" title="Clear plans for the most common engagement shapes, with room for custom scope." description="Every project is quoted around scope and complexity, but these ranges help set expectations and make the first conversation easier." />
        <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`relative overflow-hidden rounded-[32px] border p-6 ${plan.featured ? "border-cyan-300/30 bg-[linear-gradient(180deg,rgba(10,18,36,0.96),rgba(8,14,30,0.9))] shadow-glow" : "glass-panel"}`}>
                <div className="text-sm uppercase tracking-[0.28em] text-slate-500">{plan.name}</div>
                <div className="font-display mt-4 text-3xl font-semibold text-white">{plan.price}</div>
                <p className="mt-4 text-sm leading-7 text-slate-400">{plan.description}</p>
                <div className="mt-6 space-y-3">
                  {plan.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-cyan-300" />
                      <span className="text-sm leading-7 text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollToSection("contact")} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white">
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="glass-panel rounded-[32px] p-6 sm:p-8">
            <div className="section-kicker">Quote Builder</div>
            <h3 className="font-display text-3xl font-semibold text-white">Choose the scope and we will share the right quote.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">Select the services you need and the timeline you prefer. We will review it and get back to you with the right plan.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {options.map((option) => {
                const active = selected.includes(option.id);
                return (
                  <button key={option.id} onClick={() => setSelected((current) => current.includes(option.id) ? current.filter((item) => item !== option.id) : [...current, option.id])} className={`rounded-full border px-4 py-2 text-sm transition ${active ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/[0.04] text-slate-300"}`}>
                    {option.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[["standard", "Standard"], ["rush", "Rush"], ["extended", "Extended"]].map(([value, label]) => (
                <button key={value} onClick={() => setTimeline(value)} className={`rounded-[24px] border p-4 text-left transition ${timeline === value ? "border-cyan-300/30 bg-cyan-300/10" : "border-white/10 bg-white/[0.03]"}`}>
                  <div className="text-sm font-semibold text-white">{label}</div>
                </button>
              ))}
            </div>
            <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/65 p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Custom quote</div>
              <div className="font-display mt-3 text-4xl font-semibold text-white">Contact Us</div>
              <div className="mt-4 text-sm leading-7 text-slate-400">Selected scope: {selectedSummary}</div>
              <div className="text-sm leading-7 text-slate-400">{timelineLabels[timeline]}</div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => scrollToSection("contact")} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white">
                  Discuss on WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="relative scroll-mt-28">
      <div className="section-shell">
        <SectionHeading kicker="Process" title="A delivery rhythm that keeps strategy, design, engineering, and launch aligned." description="The process is designed to reduce confusion, speed up decisions, and make every phase feel intentional rather than improvised." />
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="group glass-panel relative overflow-hidden rounded-[30px] p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-sky-500 to-violet-500 opacity-80" />
              <div className="text-sm uppercase tracking-[0.35em] text-slate-500">0{index + 1}</div>
              <div className="font-display mt-6 text-2xl font-semibold text-white">{step.title}</div>
              <div className="mt-4 text-sm leading-7 text-slate-400">{step.summary}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    whatsapp: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputClassName = "w-full rounded-[22px] border border-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40";

  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    const numberPattern = /^\d{6,14}$/;

    if (!formData.name.trim()) nextErrors.name = "Please share your name.";
    if (!formData.email.trim()) nextErrors.email = "Please share your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = "Please enter a valid email address.";
    if (!formData.countryCode.trim()) nextErrors.countryCode = "Please select a country code.";
    if (!formData.whatsapp.trim()) nextErrors.whatsapp = "Please share your WhatsApp number.";
    else if (!numberPattern.test(formData.whatsapp.trim())) nextErrors.whatsapp = "WhatsApp number must be 6 to 14 digits.";
    if (!formData.message.trim()) nextErrors.message = "Please tell us a little about the project.";
    else if (formData.message.trim().length < 24) nextErrors.message = "A little more detail helps us prepare the right response.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          countryCode: formData.countryCode.trim(),
          whatsapp: formData.whatsapp.trim(),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors || {});
        setStatus({
          type: "error",
          message: result.message || "We could not send your inquiry right now. Please try again shortly.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: result.message || "Your inquiry has been sent successfully.",
      });
      setFormData({ name: "", email: "", countryCode: "+91", whatsapp: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        message: "We could not send your inquiry right now. Please try again shortly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-28 pb-12">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.18),transparent_30%),linear-gradient(180deg,rgba(6,10,23,0.95),rgba(2,6,23,0.95))] p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="section-kicker">Contact</div>
              <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">Book a call, start on WhatsApp, or send us a brief through the form.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">If the project needs premium design, sharp execution, and a faster path to better leads, we should talk.</p>
              <div className="mt-8 grid gap-4">
                <ContactCard icon={Mail} title="Email" body={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}?subject=Project%20Inquiry`} />
                <ContactCard icon={PhoneCall} title="Phone" body={PHONE_DISPLAY} href={`tel:+${PHONE_E164}`} />
                <ContactCard icon={Clock3} title="Response time" body="Usually within 1 business day for qualified inquiries." />
              </div>
            </div>
            <div className="glass-panel rounded-[32px] p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Name</label>
                    <input type="text" required value={formData.name} onChange={(event) => handleChange("name", event.target.value)} placeholder="Your name" className={inputClassName} />
                    {errors.name ? <p className="mt-2 text-sm text-rose-300">{errors.name}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Email</label>
                    <input type="email" required value={formData.email} onChange={(event) => handleChange("email", event.target.value)} placeholder="Email address" className={inputClassName} />
                    {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email}</p> : null}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Country Code</label>
                    <select value={formData.countryCode} onChange={(event) => handleChange("countryCode", event.target.value)} className={`${inputClassName} bg-slate-950/80`}>
                      {countryCodeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.countryCode ? <p className="mt-2 text-sm text-rose-300">{errors.countryCode}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-slate-400">WhatsApp Number</label>
                    <input type="tel" required value={formData.whatsapp} onChange={(event) => handleChange("whatsapp", event.target.value.replace(/\D/g, ""))} placeholder="WhatsApp Number" inputMode="numeric" autoComplete="tel-national" className={inputClassName} />
                    {errors.whatsapp ? <p className="mt-2 text-sm text-rose-300">{errors.whatsapp}</p> : null}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Message</label>
                  <textarea required rows={6} value={formData.message} onChange={(event) => handleChange("message", event.target.value)} placeholder="Tell us what you are building, what is not working today, and the kind of outcome you want." className={`${inputClassName} resize-none`} />
                  {errors.message ? <p className="mt-2 text-sm text-rose-300">{errors.message}</p> : null}
                </div>
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                {status.type === "success" ? <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">{status.message}</div> : null}
                {status.type === "error" ? <div className="rounded-[24px] border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-100">{status.message}</div> : null}
              </form>
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
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Link to="/" className="inline-flex items-center">
              <BrandLogo className="w-[186px] sm:w-[236px]" />
            </Link>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">We design and build websites, 3D launches, AI assistants, and conversion systems for startups, creators, and D2C brands that want to look sharper and grow faster.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            <FooterColumn title="Contact">
              <a className="block break-all transition hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a className="block transition hover:text-white" href={`tel:+${PHONE_E164}`}>{PHONE_DISPLAY}</a>
            </FooterColumn>
            <FooterColumn title="Services">
              {services.map((item) => <button key={item.title} onClick={() => scrollToSection("services")} className="block text-left transition hover:text-white">{item.title}</button>)}
            </FooterColumn>
            <FooterColumn title="Social">
              {socialLinks.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="block transition hover:text-white">{item.label}</a>)}
            </FooterColumn>
            <FooterColumn title="Legal">
              <Link to={legalPages.privacy.path} className="block transition hover:text-white">Privacy Policy</Link>
              <Link to={legalPages.terms.path} className="block transition hover:text-white">Terms & Conditions</Link>
              <Link to={legalPages.refund.path} className="block transition hover:text-white">Refund Policy</Link>
            </FooterColumn>
          </div>
        </div>
        <div className="mt-10 border-t border-white/8 pt-6 text-sm text-slate-500">Copyright 2026 {COMPANY_NAME}. Built for brands creating the next version of their category.</div>
      </div>
    </footer>
  );
}

function LegalPage({ title, description, sections }) {
  usePageMetadata(`${COMPANY_NAME} | ${title}`, description);
  return (
    <motion.main initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="relative z-10 pt-28">
      <section className="section-shell">
        <div className="glass-panel rounded-[36px] p-8 sm:p-10">
          <div className="section-kicker">Legal</div>
          <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
          <div className="mt-12 grid gap-8">
            {sections.map((section) => (
              <div key={section.heading} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <h2 className="font-display text-2xl font-semibold text-white">{section.heading}</h2>
                <p className="mt-4 text-sm leading-8 text-slate-300">{section.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white">
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
  return (
    <div className={`mx-auto flex max-w-3xl flex-col ${align === "left" ? "items-start text-left" : "items-center text-center"}`}>
      <div className="section-kicker">{kicker}</div>
      <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-slate-400">{description}</p>
    </div>
  );
}

function MetricCard({ label, value, detail, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="font-display text-4xl font-semibold text-white">{value}</div>
          <div className="mt-1 text-sm text-slate-400">{detail}</div>
        </div>
        {icon}
      </div>
    </div>
  );
}

function TiltCard({ service, index }) {
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg) scale(1)");
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, delay: index * 0.08 }} onMouseMove={(event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateX = (y / bounds.height - 0.5) * -12;
      const rotateY = (x / bounds.width - 0.5) * 14;
      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`);
    }} onMouseLeave={() => setTransform("rotateX(0deg) rotateY(0deg) scale(1)")} style={{ transform, transition: "transform 180ms ease-out" }} className="card-tilt glass-panel relative min-h-[320px] overflow-hidden rounded-[30px] p-6">
      <div className="relative flex h-full flex-col">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
          <service.icon className="h-7 w-7 text-cyan-200" />
        </div>
        <div className="font-display mt-8 text-2xl font-semibold text-white">{service.title}</div>
        <div className="mt-4 text-sm leading-7 text-slate-400">{service.description}</div>
        <div className="mt-auto pt-8 text-sm leading-7 text-cyan-200">{service.outcome}</div>
      </div>
    </motion.div>
  );
}

function CaseStudyRow({ label, text }) {
  return (
    <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</div>
      <div className="mt-3 text-sm leading-7 text-slate-300">{text}</div>
    </div>
  );
}

function ChatBubble({ type, message }) {
  const isAgent = type === "agent";
  return (
    <div className={`flex ${isAgent ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-7 ${isAgent ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-50" : "border border-white/10 bg-white/[0.05] text-slate-200"}`}>
        {message}
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, title, body, href }) {
  const content = (
    <div className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-1 text-sm leading-7 text-slate-400">{body}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function FooterColumn({ title, children }) {
  return (
    <div className="min-w-0">
      <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">{title}</div>
      <div className="mt-4 space-y-3 text-sm text-slate-300">{children}</div>
    </div>
  );
}

function BrandLogo({ className = "", priority = false }) {
  return (
    <img
      src="/intellcore-logo.jpeg"
      alt={`${COMPANY_NAME} logo`}
      width="1152"
      height="768"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-auto object-contain ${className}`.trim()}
    />
  );
}

export default SiteApp;
