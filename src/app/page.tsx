import Image from 'next/image';
import Link from 'next/link';

import { ConversionFacts } from '@/components/ConversionFacts';
import { FlavorGrid } from '@/components/FlavorGrid';
import { ShrimpClubStamp } from '@/components/ShrimpClubStamp';
import { TemperatureConverter } from '@/components/TemperatureConverter';
import { Button } from '@/components/ui/button';
import { LEAD_TAGLINE, NAME_STORY } from '@/lib/brand';
import { absoluteZeroStatement, FORMULAS } from '@/lib/temperature';

const POSTERS = [
  {
    src: '/campaign/louie-pitching.webp',
    width: 1152,
    height: 864,
    alt: "King Louie on a stage, pointing at a screen that reads K equals degrees Celsius plus 273.15. The screen says We don't do degrees.",
    caption: "We don't do degrees.",
  },
  {
    src: '/campaign/louie-selling.webp',
    width: 1152,
    height: 864,
    alt: 'King Louie giving a thumbs-up beside a stack of Kelvin cans under a neon sign that reads Now converting. Celsius plus 273.15.',
    caption: 'Now converting.',
  },
  {
    src: '/campaign/louie-hyping.webp',
    width: 1152,
    height: 864,
    alt: 'King Louie on a frozen peak in front of a neon 0 K, under the line Celsius is for amateurs.',
    caption: 'Celsius is for amateurs.',
  },
  {
    src: '/campaign/louie-chugging.webp',
    width: 1152,
    height: 864,
    alt: 'King Louie taking a cool sip of Kelvin. The line reads Chug to 0 K.',
    caption: 'Chug to 0 K.',
  },
  {
    src: '/campaign/louie-whiteboard.webp',
    width: 1152,
    height: 864,
    alt: 'King Louie at a frost-framed whiteboard holding the conversion formulas and a Kelvin can. The board reads Do the math. Then do a Kelvin.',
    caption: 'Do the math. Then do a Kelvin.',
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <section className='lab-grid border-silver/15 relative overflow-hidden border-b'>
        <div className='mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20'>
          <div>
            <p className='text-cyan font-mono text-xs tracking-[0.28em] uppercase'>
              King Louie&apos;s energy drink
            </p>
            <h1 className='font-display text-foreground mt-5 text-5xl md:text-7xl lg:text-8xl'>
              {LEAD_TAGLINE}
            </h1>
            <p className='text-silver mt-5 max-w-xl text-lg md:text-xl'>
              {NAME_STORY} Sold only at Shrimp Club. Every claim on this can is a unit conversion,
              and every footnote converts the footnote.
            </p>
            <p className='num text-volt mt-4 text-sm'>{absoluteZeroStatement()}</p>
            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <Button asChild>
                <Link href='#converter'>Run a conversion</Link>
              </Button>
              <Button asChild variant='secondary'>
                <Link href='/preorder'>Pre-order cases</Link>
              </Button>
              <ShrimpClubStamp />
            </div>
            <p className='text-silver mt-4 font-mono text-xs tracking-wide'>
              Nothing is charged. No card. No email.
            </p>
          </div>
          <Image
            src='/campaign/can-hero.webp'
            alt='Black Kelvin can on a wet stone, cyan thermometer marked 0 K, KELVIN wordmark, magenta +273.15 tab, and the line Celsius, but converted.'
            width={864}
            height={1152}
            priority
            sizes='(min-width: 1024px) 42vw, 92vw'
            className='mx-auto h-auto w-full max-w-md'
          />
        </div>
      </section>

      <p className='bg-volt text-void px-4 py-3 text-center font-mono text-xs tracking-[0.22em] uppercase md:text-sm'>
        No degrees required — {absoluteZeroStatement()}
      </p>

      <section className='mx-auto grid max-w-6xl gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:items-center'>
        <div>
          <p className='text-magenta font-mono text-xs tracking-[0.22em] uppercase'>The equation</p>
          <h2 className='font-display mt-3 text-4xl md:text-6xl'>K = °C + 273.15</h2>
          <ul className='mt-6 space-y-3'>
            {FORMULAS.map(function renderFormula(formula) {
              return (
                <li key={formula} className='num border-silver/20 border px-4 py-3 text-lg'>
                  {formula}
                </li>
              );
            })}
          </ul>
          <p className='text-silver mt-6 max-w-xl'>
            Celsius is a suggestion. Kelvin is the suggestion plus 273.15. Fahrenheit is what the
            suggestion does when it panics. We print all three so nobody can pretend there was only
            one number.
          </p>
        </div>
        <Image
          src='/campaign/louie-pitching.webp'
          alt='King Louie on stage pointing at K equals degrees Celsius plus 273.15.'
          width={1152}
          height={864}
          sizes='(min-width: 1024px) 46vw, 92vw'
          className='border-silver/20 h-auto w-full border'
        />
      </section>

      <section id='converter' className='border-silver/15 bg-void/40 scroll-mt-24 border-y'>
        <div className='mx-auto max-w-6xl px-4 py-16 md:px-8'>
          <p className='text-cyan font-mono text-xs tracking-[0.22em] uppercase'>Converter</p>
          <h2 className='font-display mt-3 text-4xl md:text-6xl'>Type one. Receive three.</h2>
          <p className='text-silver mt-4 max-w-2xl'>
            The can is deliberately confusing. Pick a scale, enter a number, and watch the other two
            disagree in public. The footnotes underneath convert the footnotes.
          </p>
          <div className='mt-8'>
            <TemperatureConverter />
          </div>
        </div>
      </section>

      <section className='mx-auto grid max-w-6xl gap-10 px-4 py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start'>
        <div>
          <p className='text-silver font-mono text-xs tracking-[0.22em] uppercase'>The label</p>
          <h2 className='font-display mt-3 text-4xl md:text-6xl'>Conversion Facts</h2>
          <p className='text-silver mt-4 max-w-xl'>
            Three columns. K, °C, °F. Not a nutrition panel. The numbers are the product, and the
            footnote at the bottom has already been converted into the other two scales.
          </p>
          <div className='mt-8'>
            <ConversionFacts />
          </div>
        </div>
        <Image
          src='/campaign/can-conversion-facts.webp'
          alt='Silver Kelvin can printed with K equals degrees Celsius plus 273.15 and a Conversion Facts table for 0 K, 273.15 K, and 233.15 K.'
          width={864}
          height={1152}
          sizes='(min-width: 1024px) 40vw, 92vw'
          className='mx-auto h-auto w-full max-w-md'
        />
      </section>

      <section id='flavors' className='border-silver/15 scroll-mt-24 border-t'>
        <div className='mx-auto max-w-6xl px-4 py-16 md:px-8'>
          <div className='grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end'>
            <div>
              <p className='text-magenta font-mono text-xs tracking-[0.22em] uppercase'>Flavors</p>
              <h2 className='font-display mt-3 text-4xl md:text-6xl'>
                Four names. Three temperatures.
              </h2>
              <p className='text-silver mt-4'>
                Absolute Zero Razz leads. Freezing Point Lime and 273.15 Punch print the same row on
                purpose. Minus Forty Mango is the handshake, where −40 °C and −40 °F are the same
                rude number.
              </p>
            </div>
            <Image
              src='/campaign/can-king.webp'
              alt='Illustrated Kelvin can of King Louie in a crown, bursting from ice, labeled Absolute Zero Chill, with a +273.15 burst.'
              width={864}
              height={1152}
              sizes='(min-width: 1024px) 36vw, 80vw'
              className='ml-auto h-auto w-full max-w-xs'
            />
          </div>
          <div className='mt-10'>
            <FlavorGrid />
          </div>
        </div>
      </section>

      <section className='border-silver/15 border-t'>
        <div className='mx-auto max-w-6xl px-4 py-16 md:px-8'>
          <p className='text-cyan font-mono text-xs tracking-[0.22em] uppercase'>King Louie</p>
          <h2 className='font-display mt-3 text-4xl md:text-6xl'>He does the math out loud.</h2>
          <ul className='mt-10 grid gap-4 md:grid-cols-2'>
            {POSTERS.map(function renderPoster(poster) {
              return (
                <li key={poster.src} className='border-silver/20 bg-void/50 border'>
                  <Image
                    src={poster.src}
                    alt={poster.alt}
                    width={poster.width}
                    height={poster.height}
                    sizes='(min-width: 768px) 46vw, 92vw'
                    className='h-auto w-full'
                  />
                  <p className='text-cyan px-4 py-3 font-mono text-xs tracking-[0.16em] uppercase'>
                    {poster.caption}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className='border-silver/15 border-t'>
        <div className='mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-8'>
          <div className='max-w-xl'>
            <p className='text-volt font-mono text-xs tracking-[0.22em] uppercase'>Retail</p>
            <h2 className='font-display mt-3 text-4xl md:text-6xl'>Only at Shrimp Club.</h2>
            <p className='text-silver mt-4'>
              Kelvin does not have a second door. The stamp is the distribution plan. Pre-order a
              count of cases and the club keeps the list. Nothing on that form is a charge.
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-4'>
            <ShrimpClubStamp className='h-24 w-24 text-xs' />
            <Button asChild size='lg'>
              <Link href='/preorder'>File a bulk pre-order</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
