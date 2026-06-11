import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="overline-label mb-4">
        <span className="text-alert">ERR</span> {'// SECTOR_NOT_FOUND'}
      </p>
      <h1 className="font-display text-[clamp(5rem,20vw,12rem)] font-bold leading-none text-amber text-glow-amber">
        404
      </h1>
      <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-ink-muted">
        SIGNAL LOST. The sector you requested does not exist on this board.
      </p>
      <Link href="/" className="btn-primary mt-10">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Return to Control Room
      </Link>
    </main>
  );
}
