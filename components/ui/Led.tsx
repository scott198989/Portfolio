import { cn } from '@/lib/utils';

const tones = {
  ok: 'text-ok bg-ok',
  amber: 'text-amber bg-amber',
  signal: 'text-signal bg-signal',
  alert: 'text-alert bg-alert',
  idle: 'text-ink-faint bg-ink-faint',
} as const;

export type LedTone = keyof typeof tones;

export function Led({
  tone = 'ok',
  pulse = true,
  className,
}: {
  tone?: LedTone;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block h-1.5 w-1.5 shrink-0 rounded-full',
        tones[tone],
        pulse && 'animate-led-pulse',
        className,
      )}
    />
  );
}
