'use client';

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-800/50 bg-stone-950/80">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">
            &copy; {new Date().getFullYear()} Scott Tuschl. Built with Next.js, TypeScript, Three.js & Framer Motion.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/scott198989"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/scott-tuschl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:scott.tuschl@gmail.com"
              className="text-stone-500 hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="ml-2 text-stone-500 hover:text-accent transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
