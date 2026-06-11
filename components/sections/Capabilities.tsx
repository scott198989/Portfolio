'use client';

import { Cpu, Factory, Code2, ShieldCheck } from 'lucide-react';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Corners } from '@/components/ui/Corners';
import { capabilities, type Capability } from '@/data/capabilities';

const ICONS: Record<Capability['icon'], React.ComponentType<{ className?: string }>> = {
  cpu: Cpu,
  factory: Factory,
  code: Code2,
  shield: ShieldCheck,
};

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      index="02"
      code="Systems Online"
      title="Capabilities"
      lead="Four subsystems, one operator. Each one is load-bearing."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {capabilities.map((cap, i) => {
          const Icon = ICONS[cap.icon];
          return (
            <Reveal key={cap.code} delay={i * 0.08}>
              <article className="group panel relative h-full p-6 transition-colors hover:border-line-bright sm:p-7">
                <Corners className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center border border-line bg-raised text-amber transition-colors group-hover:border-amber">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.22em] text-ink-faint">{cap.code}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{cap.description}</p>
                <ul className="mt-5 space-y-2">
                  {cap.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-ink-muted">
                      <span className="mt-[3px] font-mono text-xs text-amber" aria-hidden>
                        +
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
