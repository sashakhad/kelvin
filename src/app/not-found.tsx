import Link from 'next/link';

import { formatWithUnit, toTriplet } from '@/lib/temperature';

export default function NotFound() {
  const missing = toTriplet(404, 'C');

  return (
    <main className='mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-4 px-4 py-20 md:px-8'>
      <p className='text-magenta font-mono text-xs tracking-[0.22em] uppercase'>404</p>
      <h1 className='font-display text-5xl md:text-7xl'>This URL does not convert.</h1>
      <p className='num text-cyan text-lg'>
        404 °C = {formatWithUnit(missing.K, 'K')} = {formatWithUnit(missing.F, 'F')}, and it is
        still not a page.
      </p>
      <Link
        href='/'
        className='bg-cyan text-void mt-4 px-5 py-3 font-mono text-xs tracking-[0.14em] uppercase'
      >
        Back to 0 °C
      </Link>
    </main>
  );
}
