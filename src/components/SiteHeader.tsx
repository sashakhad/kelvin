'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/#converter', label: 'The math' },
  { href: '/#flavors', label: 'Flavors' },
  { href: '/preorder', label: 'Pre-order' },
  { href: '/brand', label: 'Brand' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  function toggleMenu() {
    setOpenPath(open ? null : pathname);
  }

  function closeMenu() {
    setOpenPath(null);
  }

  return (
    <header className='border-cyan/30 bg-void/90 sticky top-0 z-50 border-b backdrop-blur-sm'>
      <div className='mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4'>
        <Link
          href='/'
          className='group focus-visible:ring-cyan focus-visible:ring-offset-void flex min-w-0 items-center rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
          aria-label='KELVIN home'
        >
          <Image
            src='/brand/kelvin-lockup.svg'
            alt=''
            width={1193}
            height={310}
            priority
            className='h-9 w-auto sm:h-11'
          />
        </Link>

        <nav aria-label='Primary' className='hidden md:block'>
          <ul className='flex items-center gap-1 font-mono text-xs tracking-[0.14em] uppercase'>
            {LINKS.map(function renderLink(link) {
              const active =
                link.href === '/preorder' ? pathname === '/preorder' : pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-silver hover:text-cyan focus-visible:ring-cyan block rounded-sm px-3 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none',
                      active && 'text-cyan'
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type='button'
          className='text-cyan font-mono text-xs tracking-[0.14em] uppercase md:hidden'
          aria-expanded={open}
          aria-controls='mobile-nav'
          onClick={toggleMenu}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open ? (
        <nav
          id='mobile-nav'
          aria-label='Mobile'
          className='border-cyan/20 border-t px-4 py-3 md:hidden'
        >
          <ul className='flex flex-col font-mono text-sm tracking-[0.16em] uppercase'>
            {LINKS.map(function renderMobileLink(link) {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-silver hover:text-cyan block py-3'
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
