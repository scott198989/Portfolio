'use client';

import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Corners } from '@/components/ui/Corners';
import { Led } from '@/components/ui/Led';
import { projects } from '@/data/projects';

const liveCount = projects.filter((p) => p.links?.live).length;

const ID_ROWS = [
  { label: 'CALLSIGN', value: 'TUSCHL' },
  { label: 'ROLE', value: 'MECHATRONICS ENG' },
  { label: 'SERVICE', value: 'US ARMY 2008–2014' },
  { label: 'EDUCATION', value: 'B.S. MET — APSU' },
  { label: 'STATUS', value: 'OPERATIONAL', tone: 'ok' as const },
];

export function About() {
  return (
    <Section
      id="about"
      index="01"
      code="Operator Profile"
      title="About"
      lead="The shortest version: I ran the machines for nine years before I started writing the software that runs them."
    >
      <div className="grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-14">
        <Reveal>
          <div className="panel relative p-5">
            <Corners />
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <span className="overline-label">OPERATOR ID</span>
              <Led tone="ok" />
            </div>
            <div className="relative overflow-hidden border border-line bg-raised">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.png"
                alt="Portrait of Scott Tuschl"
                width={640}
                height={920}
                className="aspect-[4/5] w-full object-cover object-top [filter:grayscale(1)_sepia(0.32)_hue-rotate(-12deg)_saturate(1.5)_brightness(0.95)] transition-[filter] duration-500 hover:[filter:none]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-panel/70 to-transparent"
              />
            </div>
            <dl className="mt-4 space-y-2 font-mono text-[11px] tracking-wider">
              {ID_ROWS.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-3">
                  <dt className="text-ink-faint">{row.label}</dt>
                  <dd className={row.tone === 'ok' ? 'text-ok' : 'text-ink-muted'}>{row.value}</dd>
                </div>
              ))}
            </dl>
            <div
              aria-hidden
              className="mt-4 h-7 w-full opacity-60 [background:repeating-linear-gradient(90deg,var(--ink-muted)_0px,var(--ink-muted)_2px,transparent_2px,transparent_5px,var(--ink-muted)_5px,var(--ink-muted)_6px,transparent_6px,transparent_10px)]"
            />
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-ink">
              I spent six years in the U.S. Army as a squad leader in the Signal Corps — leading
              soldiers in combat zones and installing over{' '}
              <span className="text-amber">$1M in network infrastructure</span>. The military taught
              me how to own outcomes when conditions are hostile and the plan just died.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="leading-relaxed text-ink-muted">
              Then came nine years on manufacturing floors. Machine operator at ISOFlex Packaging and
              Sonoco — top performer with 95%+ uptime, shift trainer, scrap cut by 10%. Today I work
              as a lab technician at a blown film extrusion plant while finishing a B.S. in
              Mechatronics Engineering Technology at Austin Peay State University with a 3.71 GPA.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="leading-relaxed text-ink-muted">
              That stack of experience is the whole point. Factories don&apos;t need more dashboards
              built by people who&apos;ve never stood at the line. They need predictive maintenance
              that respects how machines actually fail, expert systems that encode real process
              knowledge, and interfaces an operator can use mid-shift. That&apos;s what I build —
              {' '}{liveCount} of them are deployed and live right now.
            </p>
          </Reveal>
          <Reveal delay={0.34}>
            <blockquote className="border-l-2 border-amber bg-panel px-6 py-5">
              <p className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
                &ldquo;I build software for the people I used to stand next to.&rdquo;
              </p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-2 pt-1">
              {['US Army Veteran', 'Plant Floor Native', 'Mechatronics + AI', 'Ship It Mentality'].map(
                (chip) => (
                  <span key={chip} className="chip">
                    {chip}
                  </span>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
