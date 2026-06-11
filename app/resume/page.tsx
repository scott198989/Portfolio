import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Github, Linkedin, Mail } from 'lucide-react';
import { PrintButton } from '@/components/PrintButton';
import { workExperience, education } from '@/data/experience';
import { stackGroups } from '@/data/capabilities';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Scott Tuschl — mechatronics engineering and industrial AI.',
};

export default function ResumePage() {
  return (
    <main className="min-h-screen py-10 print:py-0">
      <div className="container-x">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-amber"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Portfolio
          </Link>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}?subject=Resume%20Request`} className="btn-primary">
              <Mail className="h-4 w-4" aria-hidden />
              Request Latest Version
            </a>
            <PrintButton />
          </div>
        </div>

        {/* The document — styled as a physical artifact, prints clean */}
        <article className="mx-auto max-w-3xl bg-white p-8 text-neutral-900 shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:p-12 print:max-w-none print:p-0 print:shadow-none">
          <header className="border-b-2 border-neutral-900 pb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
              Service Record — Document ST-2026-CV
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-neutral-600">
              Mechatronics Engineering Technologist · Industrial AI · U.S. Army Veteran
            </p>
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-neutral-600">
              <span>{profile.email}</span>
              <span>linkedin.com/in/scott-tuschl</span>
              <span>github.com/{profile.githubUser}</span>
              <span>scott-tuschl.com</span>
            </p>
          </header>

          <section className="mt-7">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-neutral-900">
              01 / Summary
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">{profile.summary}</p>
          </section>

          <section className="mt-7">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-neutral-900">
              02 / Experience
            </h2>
            <div className="mt-4 space-y-6">
              {workExperience.map((job) => (
                <div key={`${job.title}-${job.organization}`} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-base font-bold">{job.title}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                      {job.period}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-neutral-600">{job.organization}</p>
                  <ul className="mt-2 space-y-1">
                    {job.description.map((d) => (
                      <li key={d} className="flex gap-2 text-sm leading-relaxed text-neutral-700">
                        <span aria-hidden>—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-neutral-900">
              03 / Education &amp; Training
            </h2>
            <div className="mt-4 space-y-5">
              {education.map((item) => (
                <div key={`${item.title}-${item.organization}`} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-base font-bold">{item.title}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                      {item.period}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-neutral-600">{item.organization}</p>
                  <ul className="mt-2 space-y-1">
                    {item.description.map((d) => (
                      <li key={d} className="flex gap-2 text-sm leading-relaxed text-neutral-700">
                        <span aria-hidden>—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-neutral-900">
              04 / Technical Skills
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {stackGroups.map((group) => (
                <div key={group.code} className="break-inside-avoid">
                  <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                    {group.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">
                    {group.items.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-10 border-t border-neutral-300 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              Generated from scott-tuschl.com — request the latest tailored version by email
            </p>
          </footer>
        </article>

        <div className="no-print mx-auto mt-8 flex max-w-3xl items-center justify-center gap-4 pb-10">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-amber"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            LinkedIn
          </a>
          <span className="text-ink-faint" aria-hidden>
            {'//'}
          </span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-amber"
          >
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
