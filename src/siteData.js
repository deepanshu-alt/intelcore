import {
  Boxes,
  BrainCircuit,
  ChartNoAxesCombined,
  Globe,
  ShieldCheck,
  Target,
  Users2,
} from "lucide-react";

export const COMPANY_NAME = "Intellcore Technologies";
export const CONTACT_EMAIL = "intellcoretechnologies@gmail.com";
export const PRIVACY_EMAIL = "privacy@cortexsolutions.co";
export const LEGAL_EMAIL = "legal@cortexsolutions.co";
export const PHONE_DISPLAY = "9310163211";
export const PHONE_E164 = "919310163211";
export const WHATSAPP_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
  "Hi Intellcore Technologies, I want to discuss a premium website, AI agent, or growth project.",
)}`;

export const navItems = [
  { label: "Services", id: "services" },
  { label: "3D", id: "experience" },
  { label: "AI Agents", id: "ai-agents" },
  { label: "Work", id: "work" },
  { label: "Cases", id: "case-studies" },
  { label: "About", id: "about" },
  { label: "Pricing", id: "pricing" },
  { label: "Contact", id: "contact" },
];

export const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "High-converting websites and web apps built for speed, credibility, and effortless lead capture across every device.",
    outcome: "Position the brand like a category leader from the first scroll.",
  },
  {
    icon: Boxes,
    title: "3D Website Development",
    description:
      "Three.js-inspired interfaces, scroll-led storytelling, and tactile motion systems that lift perceived value instantly.",
    outcome: "Turn passive visits into memorable product experiences.",
  },
  {
    icon: BrainCircuit,
    title: "AI Agent Development",
    description:
      "WhatsApp bots, sales assistants, support agents, and workflow automations that qualify, route, and follow up without delay.",
    outcome: "Respond faster, capture context, and keep pipeline moving 24/7.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Digital Marketing",
    description:
      "Paid acquisition, landing page systems, SEO strategy, and conversion analytics engineered around measurable growth.",
    outcome: "Connect creative, traffic, and retention into one revenue engine.",
  },
];

export const portfolioItems = [
  {
    title: "Atlas Commerce OS",
    category: "D2C Platform",
    description:
      "A modern storefront ecosystem with lifecycle automation, smart merchandising, and a cleaner mobile checkout.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "NovaDrive Launch",
    category: "3D Experience",
    description:
      "A cinematic product launch site with layered motion, immersive scenes, and inquiry funnels designed for premium buyers.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "SignalStack Agent Desk",
    category: "AI Automation",
    description:
      "A lead qualification assistant connecting WhatsApp, CRM sync, and follow-up workflows for a fast-growing services brand.",
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Verdant Growth Engine",
    category: "Growth System",
    description:
      "Landing pages, performance creative, analytics, and email sequences stitched into one acquisition stack.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Luma Creator Studio",
    category: "Brand Website",
    description:
      "A polished web experience for a creator-led business built to drive retainers, downloads, and speaking inquiries.",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Axiom Labs Dashboard",
    category: "Web App",
    description:
      "An executive command center translating campaigns, sales signals, and customer behavior into one clear operating view.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
];

export const caseStudies = [
  {
    title: "D2C skincare brand relaunch",
    category: "Growth + Web",
    problem:
      "Traffic was healthy, but the website felt generic and the ad spend was leaking through a weak mobile funnel.",
    solution:
      "We rebuilt the site around stronger storytelling, tighter offers, faster pages, and campaign-specific landing experiences.",
    result:
      "The new launch increased qualified purchase intent and gave the brand a premium look that matched its pricing.",
    metrics: [
      ["+214%", "qualified leads from paid traffic"],
      ["-32%", "cost per acquisition in 8 weeks"],
      ["2.7x", "higher mobile conversion rate"],
    ],
  },
  {
    title: "Automotive startup showcase",
    category: "3D Website",
    problem:
      "The team needed investor-ready storytelling and a launch site that felt closer to a product reveal than a brochure.",
    solution:
      "We created a cinematic 3D experience with guided scroll scenes, spec highlights, and demo booking touchpoints.",
    result:
      "The site became a high-trust sales asset for fundraising, partnerships, and early adopter bookings.",
    metrics: [
      ["+168%", "increase in average session depth"],
      ["+91%", "lift in demo requests"],
      ["4.3 min", "average engaged visit time"],
    ],
  },
  {
    title: "Service business AI intake",
    category: "AI Agent",
    problem:
      "Leads were arriving through WhatsApp and Instagram, but the team was losing context, speed, and follow-up consistency.",
    solution:
      "We deployed an AI intake assistant that qualified leads, captured project data, and pushed summaries into the CRM.",
    result:
      "The sales team spent less time chasing context and more time closing warm conversations.",
    metrics: [
      ["82%", "faster first response time"],
      ["3.1x", "more booked discovery calls"],
      ["0 missed", "after-hours inbound inquiries"],
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Intellcore Technologies gave us the kind of website people talk about after the meeting. It looks premium, feels effortless, and now our inbound leads arrive much warmer.",
    name: "Maya Chen",
    role: "Growth Director",
    company: "Axiom Labs",
  },
  {
    quote:
      "Their team blended product thinking, visual taste, and engineering discipline in a way that felt more like an internal innovation unit than an external agency.",
    name: "Arjun Mehta",
    role: "Founder",
    company: "VantaGrid",
  },
  {
    quote:
      "The 3D storytelling helped us reposition the brand instantly. Investors understood the product faster and demo requests climbed in the first month.",
    name: "Sophia Walker",
    role: "CMO",
    company: "NovaDrive",
  },
  {
    quote:
      "The WhatsApp automation alone paid for the project. Response times dropped, handoffs became cleaner, and our sales team finally had structure.",
    name: "Rhea Kapoor",
    role: "COO",
    company: "House of Verve",
  },
];

export const processSteps = [
  {
    title: "Discover",
    summary:
      "We unpack your positioning, audience intent, current bottlenecks, and the commercial outcome this build needs to drive.",
  },
  {
    title: "Design",
    summary:
      "We shape a premium visual system, smooth motion language, and conversion journey before development starts.",
  },
  {
    title: "Build",
    summary:
      "We turn the concept into production-ready frontend, automation flows, and launch assets with performance in mind.",
  },
  {
    title: "Scale",
    summary:
      "After launch, we refine the funnel, track signal quality, and iterate what actually moves lead volume and revenue.",
  },
];

export const aboutPillars = [
  {
    icon: Target,
    title: "Mission",
    text: "Build digital systems that make ambitious brands look sharper, move faster, and convert with less friction.",
  },
  {
    icon: ShieldCheck,
    title: "Vision",
    text: "Become the go-to digital growth partner for startups, creators, and D2C teams that want premium execution end to end.",
  },
  {
    icon: Users2,
    title: "Approach",
    text: "Stay small enough to care about craft, but technical enough to ship web, automation, and growth work without handoff chaos.",
  },
];

export const teamCards = [
  {
    role: "Strategy + Product",
    title: "We start with the business model, not just the homepage.",
    text: "Offers, messaging, and lead quality shape the experience from day one.",
  },
  {
    role: "Design + Motion",
    title: "Premium interfaces need taste, restraint, and timing.",
    text: "We use visual tension, depth, and micro-interactions to create a luxury feel without noise.",
  },
  {
    role: "Engineering + Automation",
    title: "The frontend should look beautiful and work like an operating system.",
    text: "From 3D scenes to CRM sync, the details are built to hold up in production.",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "Contact Us",
    description: "For early-stage brands that need a polished launch site and a stronger lead funnel.",
    deliverables: [
      "High-converting website",
      "Core SEO and analytics setup",
      "Responsive build and speed pass",
      "Lead form and WhatsApp capture",
    ],
    cta: "Contact Us",
  },
  {
    name: "Growth",
    price: "Contact Us",
    description: "For teams ready to combine premium design, better storytelling, and conversion systems.",
    deliverables: [
      "Multi-section marketing experience",
      "Campaign landing pages",
      "Advanced animation and motion",
      "CRM and automation integration",
    ],
    cta: "Contact Us",
    featured: true,
  },
  {
    name: "Premium",
    price: "Contact Us",
    description: "For launch campaigns, 3D experiences, AI agents, and full-stack growth infrastructure.",
    deliverables: [
      "Custom 3D or WebGL storytelling",
      "AI agent and workflow setup",
      "Growth experiments and analytics",
      "Priority strategy and rollout support",
    ],
    cta: "Contact Us",
  },
];

export const legalPages = {
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "How Intellcore Technologies collects, uses, and protects information across website inquiries, project delivery, and communication workflows.",
    sections: [
      {
        heading: "Information We Collect",
        body: "We collect the information you choose to submit through inquiry forms, WhatsApp, email, and project conversations. This may include contact details, business information, project goals, timing, budget range, and usage data from website analytics tools.",
      },
      {
        heading: "How We Use Information",
        body: "We use inquiry and project data to respond to requests, scope work, deliver services, improve site performance, and support communication during active engagements. We only use information for legitimate business and service delivery purposes.",
      },
      {
        heading: "Data Protection",
        body: "We limit access to project and contact data, use secure cloud tooling where appropriate, and review our workflows to reduce unnecessary exposure. While no system is risk-free, we take reasonable operational steps to protect stored information.",
      },
      {
        heading: "Third-Party Services",
        body: "Our website and delivery operations may use hosting, analytics, CRM, scheduling, communication, and payment platforms. These providers process data according to their own terms and only within the scope required to support our services.",
      },
      {
        heading: "Your Rights",
        body: `You may request access, correction, or deletion of personal information we hold, subject to legal or operational obligations. Privacy-related requests can be sent to ${PRIVACY_EMAIL}.`,
      },
    ],
  },
  terms: {
    path: "/terms-and-conditions",
    title: "Terms & Conditions",
    description:
      "Terms governing the use of the Intellcore Technologies website, communications, and service engagements.",
    sections: [
      {
        heading: "Website Use",
        body: "By accessing this website, you agree not to misuse the content, infrastructure, or interactive features. All branding, copy, visuals, and software-related assets remain protected intellectual property unless otherwise stated in writing.",
      },
      {
        heading: "Project Engagements",
        body: "All paid work is governed by a proposal, statement of work, or service agreement. Scope, deliverables, revision limits, timelines, ownership, and fees are defined within those project documents.",
      },
      {
        heading: "Third-Party Platforms",
        body: "We build with external services such as hosting providers, analytics platforms, ad networks, CRMs, messaging tools, and AI vendors. Platform outages, policy changes, and technical limitations on those services remain outside our direct control.",
      },
      {
        heading: "Limitation of Liability",
        body: "To the maximum extent permitted by law, Intellcore Technologies is not liable for indirect or consequential damages arising from website use or service interruptions. Liability for paid services is limited to the value of the applicable agreement unless the law requires otherwise.",
      },
      {
        heading: "Contact",
        body: `Questions about these terms can be sent to ${LEGAL_EMAIL}. Continued use of the website after updates implies acceptance of the revised version.`,
      },
    ],
  },
  refund: {
    path: "/refund-policy",
    title: "Refund Policy",
    description:
      "Refund, cancellation, and rescheduling terms for strategy, design, development, and growth engagements.",
    sections: [
      {
        heading: "Project Deposits",
        body: "Discovery, planning, and project booking deposits are generally non-refundable because time, research, scheduling, and early delivery capacity are committed immediately after confirmation.",
      },
      {
        heading: "Milestone Payments",
        body: "Milestone payments cover work completed up to the billing stage. If a project is paused or cancelled, payments already invoiced for completed work remain due and are not refundable.",
      },
      {
        heading: "Retainers and Marketing Services",
        body: "Monthly retainers, ad management, SEO, and growth services can be cancelled according to the notice period defined in the active agreement. Partial months, third-party ad spend, and external tool charges are not refundable once incurred.",
      },
      {
        heading: "Reschedules and Scope Changes",
        body: "Strategy calls and workshops may be rescheduled with reasonable notice. Major scope changes after approval may affect timelines and fees and are handled through a revised proposal or change request.",
      },
      {
        heading: "Support",
        body: `If you believe a billing or refund issue needs review, email ${CONTACT_EMAIL} with the project name, invoice reference, and context so our team can respond promptly.`,
      },
    ],
  },
};

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cortex-solutions" },
  { label: "Instagram", href: "https://www.instagram.com/cortexsolutions" },
  { label: "X", href: "https://x.com/cortexsolutions" },
];
