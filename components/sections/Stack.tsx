'use client';

import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { stackGroups, marqueeItems } from '@/data/capabilities';

export function Stack() {
  return (
    <Section
      id="stack"
      index="05"
      code="Toolchain"
      title="Stack"
      lead="IT and OT under one roof — the web stack, the AI stack, and the stuff with hydraulic fluid on it."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {stackGroups.map((group, gi) => (
          <Reveal key={group.code} delay={gi * 0.07}>
            <div className="panel h-full p-6">
              <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
                <h3 className="font-mono text-sm uppercase tracking-[0.22em] text-ink">{group.title}</h3>
                <span className="border border-amber/40 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.2em] text-amber">
                  {group.code}
                </span>
              </div>
              <ul className="space-y-2.5">
                {group.items.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-3 text-sm text-ink-muted">
                    <span className="font-mono text-[10px] text-ink-faint" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="fade-mask-x mt-10 overflow-hidden border-y border-line py-4" aria-hidden>
          <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-6">
                {item}
                <span className="text-amber">◆</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
