import { flavorReadings } from '@/lib/flavors';

export function FlavorGrid() {
  const flavors = flavorReadings();

  return (
    <ul className='grid gap-4 md:grid-cols-2'>
      {flavors.map(function renderFlavor(flavor) {
        return (
          <li
            key={flavor.id}
            className={
              flavor.lead
                ? 'border-cyan bg-void/60 border p-5 md:p-6'
                : 'border-silver/25 bg-void/40 border p-5 md:p-6'
            }
          >
            <div className='flex items-start justify-between gap-3'>
              <h3 className='font-display text-foreground text-3xl [font-stretch:140%] md:text-4xl'>
                {flavor.name}
              </h3>
              {flavor.lead ? (
                <span className='bg-magenta px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-white uppercase'>
                  Lead
                </span>
              ) : null}
            </div>
            <p className='num text-cyan mt-4 text-lg'>
              {flavor.K} K<span className='text-silver'> · </span>
              {flavor.C} °C
              <span className='text-silver'> · </span>
              {flavor.F} °F
            </p>
            <p className='text-silver mt-3 text-sm leading-relaxed'>{flavor.line}</p>
            {flavor.sameReadingAs ? (
              <p className='text-volt mt-3 font-mono text-xs tracking-wide uppercase'>
                Prints the same row as {flavor.sameReadingAs}.
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
