import type { Metadata } from 'next';

import { PreorderForm } from '@/components/PreorderForm';
import { ShrimpClubStamp } from '@/components/ShrimpClubStamp';

export const metadata: Metadata = {
  title: 'Pre-order',
  description:
    'Bulk pre-order Kelvin cases for Shrimp Club. Nothing is charged. No card. No email.',
};

export default function PreorderPage() {
  return (
    <main className='mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20'>
      <div className='grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start'>
        <div>
          <p className='text-magenta font-mono text-xs tracking-[0.22em] uppercase'>
            Bulk pre-order
          </p>
          <h1 className='font-display mt-3 text-5xl md:text-7xl'>Count the boxes.</h1>
          <p className='text-silver mt-5 text-lg'>
            Kelvin is sold only at Shrimp Club. This page tells the club which ice to pack. It is a
            request. It is not checkout.
          </p>
          <div className='border-volt bg-volt text-void mt-6 border px-4 py-3 font-mono text-sm tracking-wide uppercase'>
            Nothing is charged. No card. No payment. No email.
          </div>
          <ul className='text-silver mt-6 space-y-3 text-sm'>
            <li>A case is a box. The form does not suggest how many to drink.</li>
            <li>
              Four flavors. Freezing Point Lime and 273.15 Punch share a temperature on purpose.
            </li>
            <li>
              Only at Shrimp Club. This is a waitlist shout, not a bill, and nothing lands in your
              inbox.
            </li>
          </ul>
          <div className='mt-8'>
            <ShrimpClubStamp />
          </div>
        </div>
        <PreorderForm />
      </div>
    </main>
  );
}
