import type { Metadata } from 'next';
import Image from 'next/image';

import {
  DISCLAIMER,
  LEAD_TAGLINE,
  LOGO_ASSETS,
  NAME_STORY,
  PALETTE,
  TAGLINES,
  VOICE_RULES,
} from '@/lib/brand';
import { absoluteZeroStatement, FORMULAS } from '@/lib/temperature';

export const metadata: Metadata = {
  title: 'Brand',
  description:
    'Kelvin brand system: the +273.15 Stack, void black, electric cyan, hot magenta, volt yellow, and lab silver.',
};

export default function BrandPage() {
  return (
    <main className='mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20'>
      <p className='text-cyan font-mono text-xs tracking-[0.22em] uppercase'>Brand system</p>
      <h1 className='font-display mt-3 text-5xl md:text-7xl'>{LEAD_TAGLINE}</h1>
      <p className='text-silver mt-5 max-w-2xl text-lg'>
        {NAME_STORY} Kelvin is King Louie&apos;s energy drink, and the name is the conversion. The
        logo is called the +273.15 Stack: an ultra-wide wordmark with a magenta tab underneath.
      </p>
      <p className='num text-volt mt-4'>{absoluteZeroStatement()}</p>

      <section className='mt-16'>
        <h2 className='font-display text-4xl md:text-5xl'>Logo</h2>
        <ul className='mt-8 grid gap-6 md:grid-cols-2'>
          {LOGO_ASSETS.map(function renderLogo(asset) {
            return (
              <li key={asset.src} className='border-silver/25 bg-void/60 border p-5'>
                <div className='flex min-h-36 items-center justify-center bg-[color-mix(in_srgb,#c5ced6_8%,#05060a)] p-6'>
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    width={640}
                    height={220}
                    className='h-28 w-auto max-w-full object-contain'
                  />
                </div>
                <h3 className='text-cyan mt-4 font-mono text-xs tracking-[0.16em] uppercase'>
                  {asset.title}
                </h3>
                <p className='text-silver mt-2 text-sm'>{asset.detail}</p>
              </li>
            );
          })}
        </ul>
        <figure className='border-silver/25 mt-6 border'>
          <Image
            src='/brand/og.png'
            alt='Social share image: KELVIN lockup, Celsius + 273.15, and the hero can.'
            width={1200}
            height={630}
            className='h-auto w-full'
          />
          <figcaption className='text-silver px-4 py-3 font-mono text-xs tracking-[0.14em] uppercase'>
            OG / social share — 1200 × 630
          </figcaption>
        </figure>
      </section>

      <section className='mt-16'>
        <h2 className='font-display text-4xl md:text-5xl'>Palette</h2>
        <ul className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
          {PALETTE.map(function renderSwatch(swatch) {
            return (
              <li key={swatch.id} className='border-silver/25 border'>
                <div
                  className='border-silver/20 h-28 border-b'
                  style={{ backgroundColor: swatch.hex }}
                />
                <div className='space-y-1 p-3'>
                  <p className='text-sm'>{swatch.name}</p>
                  <p className='num text-cyan text-sm'>{swatch.hex}</p>
                  <p className='text-silver text-xs'>{swatch.role}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className='text-silver mt-4 text-sm'>
          Surfaces are void mixed with lab silver. They are not extra brand colors.
        </p>
      </section>

      <section className='mt-16'>
        <h2 className='font-display text-4xl md:text-5xl'>Type</h2>
        <div className='mt-8 space-y-8'>
          <div className='border-silver/25 border p-5'>
            <p className='text-cyan font-mono text-xs tracking-[0.16em] uppercase'>
              Anybody — ultra-expanded display
            </p>
            <p className='font-display mt-3 text-5xl md:text-7xl'>KELVIN 273.15</p>
          </div>
          <div className='border-silver/25 border p-5'>
            <p className='text-cyan font-mono text-xs tracking-[0.16em] uppercase'>Sora — body</p>
            <p className='mt-3 max-w-2xl text-lg'>
              Celsius, but converted. The sentence stays in a plain grotesque so the numbers can
              shout.
            </p>
          </div>
          <div className='border-silver/25 border p-5'>
            <p className='text-cyan font-mono text-xs tracking-[0.16em] uppercase'>
              DM Mono — numerals
            </p>
            <p className='num text-cyan mt-3 text-2xl'>{FORMULAS.join('    ')}</p>
            <p className='num text-silver mt-2'>{absoluteZeroStatement()}</p>
          </div>
        </div>
      </section>

      <section className='mt-16'>
        <h2 className='font-display text-4xl md:text-5xl'>Voice</h2>
        <ol className='mt-8 space-y-3'>
          {VOICE_RULES.map(function renderRule(rule, index) {
            const number = String(index + 1).padStart(2, '0');
            return (
              <li
                key={rule}
                className='border-silver/20 grid grid-cols-[auto_1fr] gap-4 border-b py-3'
              >
                <span className='num text-cyan'>{number}</span>
                <span>{rule}</span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className='mt-16'>
        <h2 className='font-display text-4xl md:text-5xl'>Taglines</h2>
        <ul className='divide-silver/20 border-silver/20 mt-8 divide-y border-y'>
          {TAGLINES.map(function renderTagline(tagline) {
            return (
              <li
                key={tagline.text}
                className='grid gap-2 py-4 md:grid-cols-[1fr_1.2fr] md:items-baseline'
              >
                <p className='font-display text-3xl [font-stretch:140%]'>{tagline.text}</p>
                <p className='text-silver text-sm'>{tagline.note}</p>
              </li>
            );
          })}
        </ul>
        <div className='mt-8 max-w-2xl'>
          <h3 className='text-magenta font-mono text-xs tracking-[0.16em] uppercase'>Name story</h3>
          <p className='mt-3 text-lg'>
            {NAME_STORY} Kelvin is the same reading after you add 273.15. King Louie took the joke
            seriously enough to put it on a can and lightly enough to sell it only at Shrimp Club.
          </p>
        </div>
      </section>

      <p className='text-silver mt-16 max-w-3xl text-sm leading-relaxed'>{DISCLAIMER}</p>
    </main>
  );
}
