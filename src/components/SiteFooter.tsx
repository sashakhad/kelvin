import Image from 'next/image';
import Link from 'next/link';

import { DISCLAIMER, SHRIMP_CLUB_URL } from '@/lib/brand';
import { absoluteZeroStatement } from '@/lib/temperature';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-silver/20 bg-void border-t'>
      <div className='mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr] md:px-8'>
        <div className='space-y-4'>
          <Image
            src='/brand/kelvin-wordmark.svg'
            alt='KELVIN'
            width={1193}
            height={188}
            className='h-8 w-auto'
          />
          <p className='num text-cyan text-sm'>{absoluteZeroStatement()}</p>
          <p
            data-testid='parody-disclaimer'
            className='text-silver max-w-xl text-sm leading-relaxed'
          >
            {DISCLAIMER}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-6 font-mono text-xs tracking-[0.14em] uppercase'>
          <div className='space-y-3'>
            <p className='text-cyan'>The can</p>
            <ul className='text-silver space-y-2'>
              <li>
                <Link href='/#converter' className='hover:text-cyan'>
                  The math
                </Link>
              </li>
              <li>
                <Link href='/#flavors' className='hover:text-cyan'>
                  Flavors
                </Link>
              </li>
              <li>
                <Link href='/preorder' className='hover:text-cyan'>
                  Pre-order
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <p className='text-magenta'>The store</p>
            <a
              href={SHRIMP_CLUB_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-silver hover:text-cyan inline-block'
            >
              Only at Shrimp Club
            </a>
            <p className='text-silver pt-6 tracking-normal normal-case'>© KELVIN {year}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
