import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/profile';

const BLOCK = [
  { label: 'PROJECT', value: 'PERSONAL PORTFOLIO' },
  { label: 'DOC NO.', value: 'ST-2026-PF-02' },
  { label: 'DRAWN BY', value: 'S. TUSCHL' },
  { label: 'ENGINE', value: 'NEXT.JS + TYPESCRIPT' },
  { label: 'REV', value: '2.0' },
  { label: 'SHEET', value: '1 OF 1' },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x py-10">
        {/* Engineering-drawing title block */}
        <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {BLOCK.map((cell) => (
            <div key={cell.label} className="bg-void p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">{cell.label}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-muted">{cell.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="font-mono text-[11px] tracking-wider text-ink-faint">
            © {new Date().getFullYear()} SCOTT TUSCHL — DESIGNED &amp; ENGINEERED, NOT TEMPLATED
          </p>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="grid h-9 w-9 place-items-center border border-line text-ink-muted transition-colors hover:border-amber hover:text-amber"
              aria-label="Email Scott Tuschl"
            >
              <Mail className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center border border-line text-ink-muted transition-colors hover:border-amber hover:text-amber"
              aria-label="GitHub profile"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center border border-line text-ink-muted transition-colors hover:border-amber hover:text-amber"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
