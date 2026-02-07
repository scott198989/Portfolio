'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import ClientErrorBoundary from './ClientErrorBoundary';

function HeroCanvasFallback() {
  return (
    <div className="hero-canvas-fallback" aria-hidden="true">
      <div className="fallback-orb fallback-orb-a" />
      <div className="fallback-orb fallback-orb-b" />
      <div className="fallback-grid" />
      <div className="fallback-core" />
      <div className="fallback-ring fallback-ring-a" />
      <div className="fallback-ring fallback-ring-b" />
    </div>
  );
}

const HeroCanvas3D = dynamic(
  async () => {
    try {
      return await import('./HeroCanvas3D');
    } catch {
      return { default: HeroCanvasFallback };
    }
  },
  {
  ssr: false,
    loading: HeroCanvasFallback,
  }
);

type NavItem = {
  label: string;
  href: string;
};

type Capability = {
  title: string;
  description: string;
  highlights: string[];
  icon: LucideIcon;
};

type Project = {
  title: string;
  category: string;
  summary: string;
  impact: string;
  stack: string[];
  image: string;
  live: string;
  code: string;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

const capabilities: Capability[] = [
  {
    title: 'AI Systems for Manufacturing',
    description:
      'Production-oriented AI features designed for operators, engineers, and quality teams, not just demo environments.',
    highlights: ['Predictive maintenance', 'Natural language interfaces', 'Decision support architecture'],
    icon: Cpu,
  },
  {
    title: 'Mechatronics + Process Engineering',
    description:
      'Cross-functional execution spanning controls, process optimization, and plant-floor integration with safety and uptime in focus.',
    highlights: ['Root-cause thinking', 'Constraint-aware optimization', 'Operational reliability'],
    icon: BriefcaseBusiness,
  },
  {
    title: 'Modern Product Delivery',
    description:
      'Fast iteration with strong engineering standards: typed code, composable UI, robust state handling, and maintainable structure.',
    highlights: ['Next.js + TypeScript', 'Component systems', 'Progressive enhancement'],
    icon: Code2,
  },
  {
    title: 'Security + Quality Mindset',
    description:
      'Clear focus on practical quality: resilient UX, accessible interfaces, and operationally safe implementation choices.',
    highlights: ['Accessible interactions', 'Performance guardrails', 'Structured validation'],
    icon: ShieldCheck,
  },
];

const projects: Project[] = [
  {
    title: 'Multi-Agent Orchestrator',
    category: 'AI Orchestration',
    summary:
      'A specialized multi-agent framework where domain agents collaborate to solve engineering and operations problems.',
    impact:
      'Introduced coordinated agent reasoning with transparent synthesis, helping turn complex prompts into structured action plans.',
    stack: ['Next.js', 'TypeScript', 'AI Agent Design', 'System Architecture'],
    image: '/projects/multi-agent/Dashboard.png.png',
    live: 'https://multi-agent-orchestrator-framework.vercel.app/',
    code: 'https://github.com/scott198989',
  },
  {
    title: 'PlainSpeak Query Interface',
    category: 'Manufacturing Analytics',
    summary:
      'A natural-language manufacturing data interface that converts plain English questions into transparent SQL workflows.',
    impact:
      'Reduced access friction to operations data by making KPI analysis available to non-technical stakeholders.',
    stack: ['React', 'NL-to-SQL', 'Data UX', 'Manufacturing KPI Models'],
    image: '/projects/plainspeak/Dashboard.png.png',
    live: 'https://plain-speak-query-interface.vercel.app/',
    code: 'https://github.com/scott198989',
  },
  {
    title: 'SensorSim Anomaly Detector',
    category: 'Predictive Maintenance',
    summary:
      'A real-time sensor simulation and anomaly detection experience for industrial equipment diagnostics and intervention timing.',
    impact:
      'Supports earlier fault visibility and clearer maintenance actions with intuitive monitoring and alert patterns.',
    stack: ['React', 'Industrial Telemetry', 'Anomaly Detection', 'Data Visualization'],
    image: '/projects/sensorsim/Dashboard.png.png',
    live: 'https://sensor-sim-anomaly-detector.vercel.app/',
    code: 'https://github.com/scott198989',
  },
  {
    title: 'ParameterPath Optimizer',
    category: 'Expert Systems',
    summary:
      'Rules-based decision support for blown film extrusion, with process guidance and defect-oriented recommendation logic.',
    impact:
      'Creates practical operator support for faster troubleshooting and more repeatable process outcomes.',
    stack: ['React', 'Rules Engine', 'Manufacturing Domain Logic', 'Operator UX'],
    image: '/projects/parameterpath/Dashboard.png.png',
    live: 'https://parameter-path-optimizer.vercel.app/',
    code: 'https://github.com/scott198989',
  },
  {
    title: 'NCM Analytics Dashboard',
    category: 'Production Software',
    summary:
      'A quality and non-conformance analytics dashboard designed for day-to-day use in real manufacturing operations.',
    impact:
      'Consolidates fragmented defect tracking into one actionable view for quality and operations teams.',
    stack: ['Next.js', 'Cloudflare Workers', 'D1 Database', 'Operational Analytics'],
    image: '/projects/ncm/dashboard.png.png',
    live: 'https://iso-flex-dashboard-git-main-scott198989s-projects.vercel.app/',
    code: 'https://github.com/scott198989',
  },
  {
    title: 'Production Assistant',
    category: 'Shop-Floor Enablement',
    summary:
      'A practical assistant experience for line adjustments, changeovers, and troubleshooting in blown film production workflows.',
    impact:
      'Improves consistency and response speed by giving teams structured operational guidance at the point of need.',
    stack: ['React', 'Workflow Design', 'Industrial UX', 'Knowledge Assistance'],
    image: '/projects/production-assistant/Screenshot 2025-12-29 112337.png',
    live: 'https://production-assistant-gamma.vercel.app/',
    code: 'https://github.com/scott198989',
  },
];

const stackGroups = [
  {
    title: 'Core Platform',
    items: ['Next.js 15', 'React 18', 'TypeScript 5.9', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: '3D + Experience',
    items: ['Three.js', '@react-three/fiber', '@react-three/drei', 'WebGL Motion Systems'],
  },
  {
    title: 'AI + Data',
    items: ['Agent Architectures', 'Statistical Detection', 'NL-to-SQL Interfaces', 'Rules-Based Expert Logic'],
  },
  {
    title: 'Engineering Languages',
    items: ['TypeScript', 'Python', 'C++', 'SQL', 'Power Platform Integrations'],
  },
];

const metrics = [
  { label: 'Production-Focused Projects', value: '10+' },
  { label: 'Automation + AI Implementations', value: '6' },
  { label: 'Disciplines Bridged', value: 'Mechatronics | Software | Ops' },
];

export default function PortfolioClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Website Visitor'}`);
    const body = encodeURIComponent(
      [
        `Name: ${formState.name || ''}`,
        `Email: ${formState.email || ''}`,
        '',
        formState.message || '',
      ].join('\n')
    );

    return `mailto:scott.tuschl@gmail.com?subject=${subject}&body=${body}`;
  }, [formState.email, formState.message, formState.name]);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = mailtoHref;
    setSent(true);
    setTimeout(() => setSent(false), 2600);
  };

  return (
    <>
      <a href="#home" className="skip-link">
        Skip to content
      </a>

      <motion.div className="progress-track" style={{ scaleX: progressScale }} />

      <header className="site-header">
        <div className="site-header-inner">
          <Link href="#home" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
            <span className="brand-dot" aria-hidden="true" />
            <span>Scott Tuschl</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a href="mailto:scott.tuschl@gmail.com" className="button-secondary compact">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-nav">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-gradient-layer" aria-hidden="true" />

          <div className="layout-container hero-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-copy"
            >
              <div className="eyebrow">
                <Sparkles className="h-4 w-4" />
                <span>Mechatronics Engineer | AI-Driven Manufacturing Systems</span>
              </div>

              <h1 className="hero-title">
                Building production-grade software where automation, intelligence, and operations actually meet.
              </h1>

              <p className="hero-description">
                I design and ship manufacturing tools that move from concept to real workflow impact. This portfolio is a
                complete rebuild focused on modern architecture, premium interaction quality, and real business utility.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="button-primary">
                  Explore Featured Projects
                  <ChevronRight className="h-4 w-4" />
                </a>
                <Link href="/resume" className="button-secondary">
                  View Resume Page
                </Link>
              </div>

              <div className="social-row" aria-label="Social links">
                <a href="https://linkedin.com/in/scott-tuschl" target="_blank" rel="noopener noreferrer" className="social-pill">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a href="https://github.com/scott198989" target="_blank" rel="noopener noreferrer" className="social-pill">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a href="mailto:scott.tuschl@gmail.com" className="social-pill">
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="hero-visual"
            >
              <ClientErrorBoundary fallback={<HeroCanvasFallback />}>
                <HeroCanvas3D />
              </ClientErrorBoundary>
              <div className="hero-chip chip-a">
                <Layers3 className="h-4 w-4" />
                <span>3D Product Storytelling</span>
              </div>
              <div className="hero-chip chip-b">
                <WandSparkles className="h-4 w-4" />
                <span>Motion + Interaction Design</span>
              </div>
            </motion.div>
          </div>

          <div className="layout-container metrics-grid" aria-label="Key metrics">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <p className="metric-value">{metric.value}</p>
                <p className="metric-label">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="capabilities" className="section-block">
          <div className="layout-container">
            <div className="section-header">
              <p className="section-eyebrow">Capabilities</p>
              <h2 className="section-title">What this portfolio demonstrates</h2>
              <p className="section-description">
                A complete end-to-end replatform: visual identity, layout architecture, animated UX, responsive behavior,
                and production-ready component structure.
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <motion.article
                    key={capability.title}
                    className="surface-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                  >
                    <div className="card-icon-wrap">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                    <ul className="card-list">
                      {capability.highlights.map((highlight) => (
                        <li key={highlight}>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="section-block projects-section">
          <div className="layout-container">
            <div className="section-header">
              <p className="section-eyebrow">Selected Work</p>
              <h2 className="section-title">Live projects with real operational relevance</h2>
              <p className="section-description">
                Every demo below points to a working deployment. Project framing emphasizes practical outcomes, not surface-level prototypes.
              </p>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className="project-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <div className="project-media">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="project-image"
                    />
                  </div>

                  <div className="project-body">
                    <div className="project-topline">
                      <span className="project-category">{project.category}</span>
                      <span className="chip">Live</span>
                    </div>

                    <h3>{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>
                    <p className="project-impact">{project.impact}</p>

                    <div className="tag-row">
                      {project.stack.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="button-primary compact">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                      <a href={project.code} target="_blank" rel="noopener noreferrer" className="button-secondary compact">
                        <Github className="h-4 w-4" />
                        Code Profile
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="section-block">
          <div className="layout-container">
            <div className="section-header">
              <p className="section-eyebrow">Stack + Practices</p>
              <h2 className="section-title">Frontier frameworks with production discipline</h2>
              <p className="section-description">
                This rebuild combines modern frontend tooling, 3D experiences, strict typing, and practical deployment constraints.
              </p>
            </div>

            <div className="stack-grid">
              {stackGroups.map((group, index) => (
                <motion.article
                  key={group.title}
                  className="stack-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.42, delay: index * 0.07 }}
                >
                  <h3>{group.title}</h3>
                  <div className="stack-items">
                    {group.items.map((item) => (
                      <span key={item} className="stack-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-block contact-section">
          <div className="layout-container contact-grid">
            <div className="contact-copy">
              <p className="section-eyebrow">Contact</p>
              <h2 className="section-title">Let&apos;s build something that ships</h2>
              <p className="section-description">
                For process engineering, automation systems, manufacturing analytics, or applied AI workstreams, reach out directly.
              </p>

              <div className="contact-link-group">
                <a href="mailto:scott.tuschl@gmail.com" className="contact-link">
                  <Mail className="h-4 w-4" />
                  scott.tuschl@gmail.com
                </a>
                <a href="https://linkedin.com/in/scott-tuschl" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Linkedin className="h-4 w-4" />
                  linkedin.com/in/scott-tuschl
                </a>
                <a href="https://github.com/scott198989" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Github className="h-4 w-4" />
                  github.com/scott198989
                </a>
              </div>

              <div className="inline-actions">
                <Link href="/resume" className="button-secondary compact">
                  Resume Details
                </Link>
                <a href="https://linkedin.com/in/scott-tuschl" target="_blank" rel="noopener noreferrer" className="button-secondary compact">
                  Connect on LinkedIn
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <motion.form
              className="contact-form"
              onSubmit={submitContact}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
            >
              <label>
                Name
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Your name"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="you@company.com"
                />
              </label>

              <label>
                Message
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                  placeholder="Briefly describe your project, challenge, or opportunity."
                />
              </label>

              <button type="submit" className="button-primary full-width">
                <Mail className="h-4 w-4" />
                Send via Email
              </button>

              <p className={`form-status ${sent ? 'visible' : ''}`} role="status" aria-live="polite">
                Email draft opened in your mail client.
              </p>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="layout-container footer-inner">
          <p>© {new Date().getFullYear()} Scott Tuschl. Portfolio rebuilt with Next.js, TypeScript, Framer Motion, and Three.js.</p>
          <div className="footer-links">
            <a href="#home">Back to Top</a>
            <a href="https://github.com/scott198989" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="mailto:scott.tuschl@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
}
