'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/data/navigation';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.href.replace('#', ''));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Side Rail */}
      <nav
        className="fixed left-0 top-0 h-screen w-16 z-50 hidden lg:flex flex-col items-center justify-between py-8 backdrop-blur-md bg-stone-950/60 border-r border-stone-800/50"
        aria-label="Primary navigation"
      >
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleClick('#home'); }}
          className="font-display text-sm font-bold text-accent"
        >
          ST
        </a>

        <div className="flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="group relative flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
                aria-label={item.label}
                aria-current={isActive ? 'true' : undefined}
              >
                <Icon
                  className={`w-[18px] h-[18px] transition-colors ${
                    isActive ? 'text-accent' : 'text-stone-500 group-hover:text-stone-300'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="absolute left-full ml-3 px-2 py-1 text-xs font-medium text-stone-200 bg-stone-900 border border-stone-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-6 h-px bg-stone-700" />
      </nav>

      {/* Mobile Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden backdrop-blur-md bg-stone-950/80 border-b border-stone-800/50">
        <div className="flex items-center justify-between px-4 h-14">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleClick('#home'); }}
            className="font-display text-sm font-bold text-accent"
          >
            ST
          </a>
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-stone-700 bg-stone-900/50 text-stone-300"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-stone-800/50"
            >
              <div className="px-4 py-3 grid gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleClick(item.href)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-accent bg-accent/10'
                          : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
