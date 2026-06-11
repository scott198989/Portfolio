'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Corners } from '@/components/ui/Corners';
import { Led } from '@/components/ui/Led';
import { profile } from '@/data/profile';

const CHANNELS = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    hint: 'Best for role inquiries & resume requests',
  },
  {
    label: 'LinkedIn',
    value: 'in/scott-tuschl',
    href: profile.linkedin,
    icon: Linkedin,
    hint: 'Networking & introductions',
  },
  {
    label: 'GitHub',
    value: profile.githubUser,
    href: profile.github,
    icon: Github,
    hint: 'Code, commits & experiments',
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Section
      id="contact"
      index="06"
      code="Open Channel"
      title="Contact"
      lead="Open to mechatronics, controls, and industrial-AI opportunities. The channel is live — pick a frequency."
    >
      <Reveal>
        <div className="panel relative p-6 sm:p-10">
          <Corners />
          <div className="mb-8 flex items-center gap-3">
            <Led tone="ok" />
            <span className="overline-label">RECEIVING ON ALL CHANNELS</span>
          </div>

          <div className="flex flex-col gap-4 border border-line bg-raised p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="overline-label mb-1.5">PRIMARY FREQUENCY</p>
              <p className="truncate font-mono text-base text-ink sm:text-xl">{profile.email}</p>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="btn-outline shrink-0"
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-ok" aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden />
                  Copy Address
                </>
              )}
            </button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {CHANNELS.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group border border-line p-5 transition-colors hover:border-amber"
              >
                <div className="flex items-center justify-between">
                  <ch.icon className="h-5 w-5 text-amber" aria-hidden />
                  <ArrowUpRight
                    className="h-4 w-4 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber"
                    aria-hidden
                  />
                </div>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-ink">{ch.label}</p>
                <p className="mt-1 truncate font-mono text-sm text-ink-muted">{ch.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-faint">{ch.hint}</p>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="font-mono text-xs tracking-wider text-ink-faint">
              {'// RESUME AVAILABLE ON REQUEST — CURRENT VERSION, TAILORED TO ROLE'}
            </p>
            <Link href="/resume" className="btn-primary">
              <FileText className="h-4 w-4" aria-hidden />
              View Resume
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
