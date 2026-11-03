import { cn } from '@/lib/utils';
import { SHRIMP_CLUB_URL } from '@/lib/brand';

type ShrimpClubStampProps = {
  className?: string;
};

export function ShrimpClubStamp({ className }: ShrimpClubStampProps) {
  return (
    <a
      href={SHRIMP_CLUB_URL}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Only at Shrimp Club (opens in a new tab)'
      className={cn(
        'border-cyan text-cyan hover:bg-cyan hover:text-void inline-flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border-2 text-center font-mono text-[9px] leading-tight font-medium tracking-[0.14em] uppercase transition-colors',
        className
      )}
    >
      Only at
      <span>Shrimp</span>
      <span>Club</span>
    </a>
  );
}
