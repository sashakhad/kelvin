import { anchorRows, footnoteChain, FORMULAS } from '@/lib/temperature';
import { flavorReadings } from '@/lib/flavors';

export function ConversionFacts() {
  const rows = anchorRows();
  const flavors = flavorReadings();
  const notes = footnoteChain(0, 'K');

  return (
    <figure className='relative bg-[#f4f7f8] p-4 text-[#05060a] shadow-[8px_8px_0_#ff2e97] md:p-6'>
      <figcaption className='font-display border-b-8 border-[#05060a] pb-2 text-center text-4xl tracking-tight [font-stretch:130%]'>
        Conversion Facts
      </figcaption>
      <p className='mt-3 text-center font-mono text-xs tracking-[0.14em] uppercase'>
        {FORMULAS[0]}
      </p>
      <table className='mt-4 w-full border-collapse text-left'>
        <thead>
          <tr className='border-y-2 border-[#05060a] font-mono text-xs tracking-[0.18em] uppercase'>
            <th className='py-2 pr-3 font-medium'>Reading</th>
            <th className='num py-2 pr-3 font-medium'>K</th>
            <th className='num py-2 pr-3 font-medium'>°C</th>
            <th className='num py-2 font-medium'>°F</th>
          </tr>
        </thead>
        <tbody className='font-mono'>
          {rows.map(function renderRow(row) {
            return (
              <tr key={row.label} className='border-b border-[#05060a]/30'>
                <th scope='row' className='py-2 pr-3 text-xs font-medium tracking-wide uppercase'>
                  {row.label}
                </th>
                <td className='num py-2 pr-3 text-lg'>{row.K}</td>
                <td className='num py-2 pr-3 text-lg'>{row.C}</td>
                <td className='num py-2 text-lg'>{row.F}</td>
              </tr>
            );
          })}
          {flavors.map(function renderFlavor(flavor) {
            return (
              <tr key={flavor.id} className='border-b border-[#05060a]/30'>
                <th scope='row' className='py-2 pr-3 text-xs font-medium tracking-wide uppercase'>
                  {flavor.name}
                </th>
                <td className='num py-2 pr-3 text-lg'>{flavor.K}</td>
                <td className='num py-2 pr-3 text-lg'>{flavor.C}</td>
                <td className='num py-2 text-lg'>{flavor.F}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ol className='mt-4 space-y-1 font-mono text-[11px] leading-relaxed'>
        {notes.map(function renderNote(note) {
          return (
            <li key={note.marker}>
              {note.marker} {note.text}
            </li>
          );
        })}
      </ol>
      <p className='mt-4 inline-block -rotate-2 bg-[#e6ff3d] px-3 py-1 font-mono text-xs tracking-[0.16em] text-[#05060a] uppercase'>
        No degrees required
      </p>
    </figure>
  );
}
