'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import GitHubActivity from '@/components/ui/GitHubActivity';

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formState.name || 'Website Visitor'}`
    );
    const body = encodeURIComponent(
      [`Name: ${formState.name || ''}`, `Email: ${formState.email || ''}`, '', formState.message || ''].join('\n')
    );
    return `mailto:scott.tuschl@gmail.com?subject=${subject}&body=${body}`;
  }, [formState]);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = mailtoHref;
    setSent(true);
    setTimeout(() => setSent(false), 2600);
  };

  return (
    <motion.section
      id="contact"
      className="relative py-20 md:py-28 scroll-mt-24 border-t border-stone-800/50"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Info */}
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="Let&apos;s build something"
              titleAccent="that ships"
              description="For process engineering, automation systems, manufacturing analytics, or applied AI workstreams, reach out directly."
            />

            <motion.div variants={fadeUp} className="space-y-3 mb-6">
              <a
                href="mailto:scott.tuschl@gmail.com"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-stone-800 bg-stone-900/40 text-stone-300 hover:border-accent/40 hover:text-accent transition-colors w-fit"
              >
                <Mail className="w-4 h-4" />
                scott.tuschl@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/scott-tuschl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-stone-800 bg-stone-900/40 text-stone-300 hover:border-accent/40 hover:text-accent transition-colors w-fit"
              >
                <Linkedin className="w-4 h-4" />
                linkedin.com/in/scott-tuschl
              </a>
              <a
                href="https://github.com/scott198989"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-stone-800 bg-stone-900/40 text-stone-300 hover:border-accent/40 hover:text-accent transition-colors w-fit"
              >
                <Github className="w-4 h-4" />
                github.com/scott198989
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-stone-700 text-stone-300 hover:border-accent/40 hover:text-accent transition-colors"
              >
                Resume Details
              </Link>
              <a
                href="https://linkedin.com/in/scott-tuschl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-stone-700 text-stone-300 hover:border-accent/40 hover:text-accent transition-colors"
              >
                Connect on LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            <motion.div variants={fadeUp}>
              <GitHubActivity />
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.form
            variants={fadeUp}
            className="rounded-xl border border-stone-800 bg-stone-900/60 p-6 space-y-4"
            onSubmit={submitContact}
          >
            <label className="grid gap-1.5 text-sm font-medium text-stone-300">
              Name
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="w-full px-3 py-2.5 rounded-lg border border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-600 focus:border-accent focus:outline-none transition-colors"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-medium text-stone-300">
              Email
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="you@company.com"
                className="w-full px-3 py-2.5 rounded-lg border border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-600 focus:border-accent focus:outline-none transition-colors"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-medium text-stone-300">
              Message
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Briefly describe your project, challenge, or opportunity."
                className="w-full px-3 py-2.5 rounded-lg border border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-600 focus:border-accent focus:outline-none transition-colors resize-none"
              />
            </label>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-accent text-stone-950 hover:bg-accent-hover transition-colors"
            >
              <Mail className="w-4 h-4" />
              Send via Email
            </button>

            <p
              className={`text-sm text-center transition-opacity duration-200 ${
                sent ? 'opacity-100 text-accent' : 'opacity-0 text-stone-500'
              }`}
              role="status"
              aria-live="polite"
            >
              Email draft opened in your mail client.
            </p>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}
