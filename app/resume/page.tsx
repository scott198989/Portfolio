'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Linkedin, Mail, ShieldCheck, MessageSquare } from 'lucide-react';

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-forge-deep flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="w-full max-w-2xl rounded-2xl border border-stone-800 bg-stone-900/60 p-6 md:p-8"
      >
        <p className="font-display text-xs uppercase tracking-[0.15em] text-accent font-semibold mb-2">
          Resume Access
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-100 mb-3">Scott Tuschl Resume</h1>
        <p className="text-stone-400 text-base leading-relaxed mb-6">
          The latest resume is shared directly so I can provide the most current version for your
          role or project context. Use any option below.
        </p>

        <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-4 mb-6">
          <div className="flex items-center gap-2 mb-2 text-accent">
            <ShieldCheck className="w-4 h-4" />
            <strong className="text-sm font-semibold">Fast response preferred channels</strong>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed">
            Email requests are best for resume delivery and role-specific notes. LinkedIn is best
            for networking and introductions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <a
            href="mailto:scott.tuschl@gmail.com?subject=Resume%20Request"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-accent text-stone-950 hover:bg-accent-hover transition-colors"
          >
            <Mail className="w-4 h-4" />
            Request via Email
          </a>
          <a
            href="https://linkedin.com/in/scott-tuschl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border border-stone-700 text-stone-300 hover:border-accent/40 hover:text-accent transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            Open LinkedIn
          </a>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border border-stone-700 text-stone-300 hover:border-accent/40 hover:text-accent transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Go to Contact Section
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-stone-400 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </motion.div>
    </main>
  );
}
