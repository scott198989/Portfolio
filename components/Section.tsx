import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  index: string;
  code: string;
  title: string;
  lead?: string;
  className?: string;
  children: React.ReactNode;
}

/** Standard section scaffold with an HMI-style panel header. */
export function Section({ id, index, code, title, lead, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-24 sm:py-32', className)}>
      <div className="container-x">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-amber" aria-hidden />
            <p className="overline-label">
              <span className="text-amber">{index}</span>
              <span className="mx-2 text-ink-faint">{'//'}</span>
              {code}
            </p>
          </div>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-ink sm:text-5xl">
            {title}
          </h2>
          {lead ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">{lead}</p>
          ) : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
