import { cn } from '@/lib/utils';

/** HMI-style corner brackets for panels. Parent must be `relative`. */
export function Corners({ className }: { className?: string }) {
  const base = 'absolute h-3 w-3 border-amber';
  return (
    <span aria-hidden className={cn('pointer-events-none', className)}>
      <span className={cn(base, 'left-0 top-0 border-l-2 border-t-2')} />
      <span className={cn(base, 'right-0 top-0 border-r-2 border-t-2')} />
      <span className={cn(base, 'bottom-0 left-0 border-b-2 border-l-2')} />
      <span className={cn(base, 'bottom-0 right-0 border-b-2 border-r-2')} />
    </span>
  );
}
