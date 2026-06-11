'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Menu, X } from 'lucide-react';
import { Led } from '@/components/ui/Led';
import { cn } from '@/lib/utils';

const LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Stack', href: '#stack', id: 'stack' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      setTime(`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}Z`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[11px] tracking-[0.18em] text-ink-faint tabular-nums" suppressHydrationWarning>
      {time ?? '--:--:--Z'}
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/mac/i.test(navigator.platform));
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const openPalette = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent('cmdk:open'));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-void/85 backdrop-blur-md">
      <nav className="container-x flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <a href="#home" className="group flex items-center gap-3" aria-label="Scott Tuschl — back to top">
          <span className="grid h-8 w-8 place-items-center border border-amber font-mono text-xs font-bold text-amber transition-colors group-hover:bg-amber group-hover:text-void">
            ST
          </span>
          <span className="hidden font-mono text-xs tracking-[0.22em] text-ink-muted sm:block">
            TUSCHL<span className="text-ink-faint">.SYS</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={cn(
                  'font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-amber',
                  active === link.id ? 'text-amber' : 'text-ink-muted',
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 lg:flex">
            <Led tone="ok" />
            <span className="font-mono text-[11px] tracking-[0.18em] text-ink-faint">OPERATIONAL</span>
          </div>
          <div className="hidden md:block">
            <Clock />
          </div>
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-2 border border-line-bright px-2.5 py-1.5 font-mono text-[11px] tracking-wider text-ink-muted transition-colors hover:border-amber hover:text-amber sm:flex"
            aria-label="Open command palette"
          >
            <Command className="h-3 w-3" aria-hidden />
            {isMac ? '⌘K' : 'CTRL+K'}
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center border border-line-bright text-ink md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-line bg-void md:hidden"
          >
            <ul className="container-x flex flex-col py-4">
              {LINKS.map((link, i) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 border-b border-line py-4 font-mono text-sm uppercase tracking-[0.2em] text-ink"
                  >
                    <span className="text-[10px] text-amber">{String(i + 1).padStart(2, '0')}</span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/resume"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-4 font-mono text-sm uppercase tracking-[0.2em] text-ink-muted"
                >
                  <span className="text-[10px] text-amber">06</span>
                  Resume
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
