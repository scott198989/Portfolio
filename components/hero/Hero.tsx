'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { HeroCanvas } from '@/components/hero/HeroCanvas';
import { Corners } from '@/components/ui/Corners';
import { Led } from '@/components/ui/Led';
import { profile } from '@/data/profile';

const EASE = [0.22, 1, 0.36, 1] as const;

function Typewriter() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduce) return;
    const role = profile.roles[roleIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && len < role.length) {
      timer = setTimeout(() => setLen(len + 1), 55);
    } else if (!deleting && len === role.length) {
      timer = setTimeout(() => setDeleting(true), 2100);
    } else if (deleting && len > 0) {
      timer = setTimeout(() => setLen(len - 1), 28);
    } else {
      timer = setTimeout(() => {
        setDeleting(false);
        setRoleIdx((roleIdx + 1) % profile.roles.length);
      }, 350);
    }
    return () => clearTimeout(timer);
  }, [len, deleting, roleIdx, reduce, mounted]);

  // Server and first client render always use the animated slice (empty at
  // first) so hydration matches; reduced-motion users get the static role
  // immediately after mount.
  const text = mounted && reduce ? profile.roles[0] : profile.roles[roleIdx].slice(0, len);

  return (
    <p className="font-mono text-sm tracking-[0.2em] text-signal sm:text-base" aria-label={profile.roles.join(', ')}>
      <span aria-hidden>&gt; </span>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-amber animate-blink" />
    </p>
  );
}

function BootPanel() {
  const [step, setStep] = useState(0);
  const total = profile.bootSequence.length;

  useEffect(() => {
    if (step >= total + 1) return;
    const timer = setTimeout(() => setStep(step + 1), step === 0 ? 500 : 230);
    return () => clearTimeout(timer);
  }, [step, total]);

  const toneClass = { ok: 'text-ok', amber: 'text-amber', signal: 'text-signal' } as const;

  return (
    <div className="panel relative p-5 font-mono text-xs">
      <Corners />
      <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
        <span className="tracking-[0.22em] text-ink-faint">INIT SEQUENCE</span>
        <Led tone={step > total ? 'ok' : 'amber'} />
      </div>
      <ol className="space-y-2.5">
        {profile.bootSequence.map((line, i) => (
          <li
            key={line.label}
            className={`flex items-baseline gap-2 transition-opacity duration-300 ${
              step > i ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-ink-faint">&gt;</span>
            <span className="tracking-wider text-ink-muted">{line.label}</span>
            <span className="flex-1 border-b border-dotted border-line" aria-hidden />
            <span className={toneClass[line.tone]}>{line.status}</span>
          </li>
        ))}
      </ol>
      <div
        className={`mt-4 border-t border-line pt-3 tracking-[0.18em] text-ok transition-opacity duration-500 ${
          step > total ? 'opacity-100' : 'opacity-0'
        }`}
      >
        ALL SYSTEMS NOMINAL
        <span aria-hidden className="ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-ok animate-blink" />
      </div>
    </div>
  );
}

function HeadlineWord({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className ?? ''}`}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroCanvas className="fade-mask-b absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,7,9,0.72)_72%)]"
      />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-20 pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 flex items-center gap-3"
            >
              <Led tone="ok" />
              <p className="overline-label">
                SYS.ONLINE <span className="mx-2">{'//'}</span> PORTFOLIO REV 2.0
              </p>
            </motion.div>

            <h1 className="font-display text-[clamp(3.2rem,11vw,7.5rem)] font-bold uppercase leading-[0.92] tracking-tight">
              <HeadlineWord delay={0.2}>Scott</HeadlineWord>
              <HeadlineWord delay={0.32} className="text-glow-amber text-amber">
                Tuschl
              </HeadlineWord>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-6"
            >
              <Typewriter />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="btn-primary">
                View Deployments
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a href="#contact" className="btn-outline">
                Open Channel
              </a>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-amber"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden />
                Resume
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="hidden lg:block"
          >
            <BootPanel />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
          className="mt-20 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4"
        >
          {profile.stats.map((stat) => (
            <div key={stat.label} className="bg-panel px-5 py-5">
              <span className="block font-display text-3xl font-bold text-amber sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-ink-faint">SCROLL</span>
        <span className="block h-10 w-px overflow-hidden bg-line">
          <span className="block h-full w-full animate-scroll-cue bg-amber" />
        </span>
      </motion.div>
    </section>
  );
}
