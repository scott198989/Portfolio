'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Linkedin, Github, Mail, ChevronDown } from 'lucide-react';
import { fadeUp, staggerContainer, charRevealContainer, charReveal } from '@/lib/animations';
import { metrics } from '@/data/stack';
import ClientErrorBoundary from '@/components/site/ClientErrorBoundary';

function HeroCanvasFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-stone-600/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-accent/30 to-stone-600/20 shadow-[0_0_60px_rgba(249,115,22,0.3)]" />
    </div>
  );
}

const HeroCanvas3D = dynamic(
  async () => {
    try {
      return await import('@/components/3d/HeroCanvas');
    } catch {
      return { default: HeroCanvasFallback };
    }
  },
  { ssr: false, loading: HeroCanvasFallback }
);

function AnimatedName({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span variants={charRevealContainer} initial="hidden" animate="visible" className={className}>
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={charReveal} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/95 to-stone-950" />
        <div className="absolute top-0 right-0 w-[60%] h-full opacity-80">
          <ClientErrorBoundary fallback={<HeroCanvasFallback />}>
            <HeroCanvas3D />
          </ClientErrorBoundary>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-24 lg:pt-0 lg:pl-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl">
          <motion.div variants={fadeUp} className="mb-6">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
              <AnimatedName text="SCOTT" className="text-stone-100" />
              <br />
              <AnimatedName text="TUSCHL" className="text-accent" />
            </h1>
          </motion.div>

          <motion.p variants={fadeUp} className="font-display text-sm sm:text-base text-stone-400 tracking-wide mb-6">
            Mechatronics Engineer | AI-Driven Manufacturing Systems
          </motion.p>

          <motion.p variants={fadeUp} className="text-stone-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
            Building production-grade software where automation, intelligence, and operations actually meet.
            From concept to real workflow impact.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-6">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-accent text-stone-950 hover:bg-accent-hover transition-colors"
            >
              Explore Work
              <ChevronRight className="w-4 h-4" />
            </a>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border border-stone-700 text-stone-300 hover:border-accent/40 hover:text-accent transition-colors"
            >
              View Resume
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href="https://linkedin.com/in/scott-tuschl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-stone-800 text-stone-400 text-xs font-medium hover:border-accent/40 hover:text-accent transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href="https://github.com/scott198989"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-stone-800 text-stone-400 text-xs font-medium hover:border-accent/40 hover:text-accent transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href="mailto:scott.tuschl@gmail.com"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-stone-800 text-stone-400 text-xs font-medium hover:border-accent/40 hover:text-accent transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
          </motion.div>
        </div>

        {/* Metrics strip */}
        <motion.div variants={fadeUp} className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-stone-800 bg-stone-900/50 backdrop-blur-sm px-4 py-3"
            >
              <p className="text-lg font-bold text-stone-100">{metric.value}</p>
              <p className="text-xs text-stone-500">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs font-display tracking-wider">SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
