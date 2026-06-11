'use client';

import { Briefcase, GraduationCap } from 'lucide-react';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { workExperience, education, type ExperienceItem } from '@/data/experience';
import { cn } from '@/lib/utils';

function Timeline({ items, current }: { items: ExperienceItem[]; current?: boolean }) {
  return (
    <ol className="relative ml-2 border-l border-line">
      {items.map((item, i) => {
        const isCurrent = current && i === 0;
        return (
          <li key={`${item.title}-${item.organization}`} className="relative pb-10 pl-7 last:pb-0">
            <span
              aria-hidden
              className={cn(
                'absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full border',
                isCurrent ? 'border-amber bg-amber animate-led-pulse text-amber' : 'border-line-bright bg-void',
              )}
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">{item.period}</p>
            <h4 className="mt-1.5 font-display text-lg font-bold text-ink">{item.title}</h4>
            <p className="font-mono text-xs tracking-wider text-ink-faint">{item.organization}</p>
            <ul className="mt-3 space-y-1.5">
              {item.description.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
                  <span className="mt-[3px] font-mono text-xs text-ink-faint" aria-hidden>
                    ▸
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            {item.skills && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.skills.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="04"
      code="Service Record"
      title="Experience"
      lead="From combat zones to clean rooms to codebases — every stop made the next one sharper."
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <div className="mb-7 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center border border-line bg-raised text-amber">
              <Briefcase className="h-4 w-4" aria-hidden />
            </span>
            <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-ink">Work History</h3>
          </div>
          <Timeline items={workExperience} current />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mb-7 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center border border-line bg-raised text-amber">
              <GraduationCap className="h-4 w-4" aria-hidden />
            </span>
            <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-ink">Training &amp; Education</h3>
          </div>
          <Timeline items={education} current />
        </Reveal>
      </div>
    </Section>
  );
}
