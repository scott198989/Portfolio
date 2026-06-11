'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Hash,
  Linkedin,
  Search,
} from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';

type IconName = 'hash' | 'external' | 'copy' | 'github' | 'linkedin' | 'file';

interface Item {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords: string;
  icon: IconName;
  run: () => void | Promise<void>;
}

const ICONS: Record<IconName, React.ComponentType<{ className?: string }>> = {
  hash: Hash,
  external: ArrowUpRight,
  copy: Copy,
  github: Github,
  linkedin: Linkedin,
  file: FileText,
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setSelected(0);
    setCopied(false);
  }, []);

  const items = useMemo<Item[]>(() => {
    const goto = (hash: string) => () => {
      close();
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    };
    const external = (url: string) => () => {
      close();
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    const nav: Item[] = [
      { id: 'home', group: 'Navigate', label: 'Home', keywords: 'top hero start', icon: 'hash', run: goto('home') },
      { id: 'about', group: 'Navigate', label: 'About', keywords: 'operator profile bio army veteran', icon: 'hash', run: goto('about') },
      { id: 'capabilities', group: 'Navigate', label: 'Capabilities', keywords: 'skills systems what i do', icon: 'hash', run: goto('capabilities') },
      { id: 'projects', group: 'Navigate', label: 'Projects', keywords: 'deployments work builds', icon: 'hash', run: goto('projects') },
      { id: 'experience', group: 'Navigate', label: 'Experience', keywords: 'service record work history education', icon: 'hash', run: goto('experience') },
      { id: 'stack', group: 'Navigate', label: 'Stack', keywords: 'toolchain technologies languages', icon: 'hash', run: goto('stack') },
      { id: 'contact', group: 'Navigate', label: 'Contact', keywords: 'email channel reach out', icon: 'hash', run: goto('contact') },
    ];

    const deployments: Item[] = projects
      .filter((p) => p.links?.live)
      .map((p) => ({
        id: `proj-${p.title}`,
        group: 'Live Deployments',
        label: p.title,
        hint: p.description,
        keywords: `${p.tags.join(' ')} ${p.description}`,
        icon: 'external' as const,
        run: external(p.links!.live!),
      }));

    const actions: Item[] = [
      {
        id: 'copy-email',
        group: 'Actions',
        label: copied ? 'Email copied' : 'Copy email address',
        hint: profile.email,
        keywords: 'email copy contact mail',
        icon: copied ? ('copy' as const) : ('copy' as const),
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(close, 900);
          } catch {
            window.location.href = `mailto:${profile.email}`;
            close();
          }
        },
      },
      {
        id: 'resume',
        group: 'Actions',
        label: 'Open resume',
        keywords: 'cv resume hire',
        icon: 'file',
        run: () => {
          close();
          router.push('/resume');
        },
      },
      { id: 'github', group: 'Actions', label: 'GitHub profile', hint: profile.githubUser, keywords: 'github code repos', icon: 'github', run: external(profile.github) },
      { id: 'linkedin', group: 'Actions', label: 'LinkedIn profile', keywords: 'linkedin network connect', icon: 'linkedin', run: external(profile.linkedin) },
    ];

    return [...nav, ...deployments, ...actions];
  }, [close, copied, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    );
  }, [items, query]);

  // Global shortcut + custom open event from the nav button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('cmdk:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('cmdk:open', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector('[data-selected="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => (filtered.length ? (s + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => (filtered.length ? (s - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[selected]?.run();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-void/80 px-4 pt-[14vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="panel w-full max-w-xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 font-mono text-sm text-ink placeholder:text-ink-faint focus:outline-none"
                aria-label="Search commands"
              />
              <kbd className="hidden shrink-0 border border-line px-1.5 py-0.5 font-mono text-[10px] text-ink-faint sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2" role="listbox" aria-label="Commands">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center font-mono text-xs tracking-[0.2em] text-ink-faint">
                  NO SIGNAL — NOTHING MATCHES &ldquo;{query}&rdquo;
                </p>
              )}
              {filtered.map((item, i) => {
                const Icon = copied && item.id === 'copy-email' ? Check : ICONS[item.icon];
                const header =
                  item.group !== lastGroup ? (
                    <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
                      {item.group}
                    </p>
                  ) : null;
                lastGroup = item.group;
                return (
                  <div key={item.id}>
                    {header}
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === selected ? 'true' : 'false'}
                      data-selected={i === selected}
                      onClick={() => item.run()}
                      onMouseMove={() => setSelected(i)}
                      className={cn(
                        'flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors',
                        i === selected ? 'bg-raised text-amber' : 'text-ink-muted',
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-4 w-4 shrink-0',
                          copied && item.id === 'copy-email' ? 'text-ok' : undefined,
                        )}
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">{item.label}</span>
                        {item.hint ? (
                          <span className="block truncate font-mono text-[11px] text-ink-faint">{item.hint}</span>
                        ) : null}
                      </span>
                      {i === selected && (
                        <kbd className="shrink-0 font-mono text-[10px] text-ink-faint" aria-hidden>
                          ↵
                        </kbd>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] tracking-wider text-ink-faint">
              <span>↑↓ NAVIGATE</span>
              <span>↵ EXECUTE</span>
              <span>ESC CLOSE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
