'use client';

import { useState, type ChangeEvent } from 'react';

import {
  footnoteChain,
  formatWithUnit,
  parseReading,
  scaleLabel,
  SCALE_ORDER,
  toTriplet,
  type Scale,
} from '@/lib/temperature';

export function TemperatureConverter() {
  const [raw, setRaw] = useState('0');
  const [scale, setScale] = useState<Scale>('C');

  const parsed = parseReading(raw);
  const triplet = parsed === null ? null : toTriplet(parsed, scale);
  const notes = parsed === null ? [] : footnoteChain(parsed, scale);

  function onRawChange(event: ChangeEvent<HTMLInputElement>) {
    setRaw(event.target.value);
  }

  function onScaleChange(event: ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value;
    if (next === 'K' || next === 'C' || next === 'F') {
      setScale(next);
    }
  }

  return (
    <div className='border-silver/25 bg-void/70 border p-5 md:p-8'>
      <div className='grid gap-4 md:grid-cols-[1fr_180px]'>
        <div className='space-y-2'>
          <label
            htmlFor='reading'
            className='text-cyan font-mono text-xs tracking-[0.16em] uppercase'
          >
            Number
          </label>
          <input
            id='reading'
            name='reading'
            inputMode='decimal'
            autoComplete='off'
            value={raw}
            onChange={onRawChange}
            className='num border-silver/30 bg-void text-foreground focus-visible:border-cyan focus-visible:ring-cyan w-full border px-4 py-3 text-3xl outline-none focus-visible:ring-2'
          />
        </div>
        <div className='space-y-2'>
          <label
            htmlFor='scale'
            className='text-cyan font-mono text-xs tracking-[0.16em] uppercase'
          >
            Scale you typed
          </label>
          <select
            id='scale'
            name='scale'
            value={scale}
            onChange={onScaleChange}
            className='num border-silver/30 bg-void text-foreground focus-visible:border-cyan focus-visible:ring-cyan h-[62px] w-full border px-3 text-lg outline-none focus-visible:ring-2'
          >
            {SCALE_ORDER.map(function renderOption(option) {
              return (
                <option key={option} value={option}>
                  {scaleLabel(option)}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {triplet ? (
        <div className='mt-8 grid gap-3 sm:grid-cols-3'>
          <output data-testid='out-k' className='border-cyan/40 border p-4'>
            <span className='text-cyan block font-mono text-[10px] tracking-[0.18em] uppercase'>
              K
            </span>
            <span className='num mt-2 block text-3xl'>{formatWithUnit(triplet.K, 'K')}</span>
          </output>
          <output data-testid='out-c' className='border-silver/30 border p-4'>
            <span className='text-silver block font-mono text-[10px] tracking-[0.18em] uppercase'>
              °C
            </span>
            <span className='num mt-2 block text-3xl'>{formatWithUnit(triplet.C, 'C')}</span>
          </output>
          <output data-testid='out-f' className='border-magenta/50 border p-4'>
            <span className='text-magenta block font-mono text-[10px] tracking-[0.18em] uppercase'>
              °F
            </span>
            <span className='num mt-2 block text-3xl'>{formatWithUnit(triplet.F, 'F')}</span>
          </output>
        </div>
      ) : (
        <p className='text-silver mt-8' role='status'>
          Type a number. The other two scales will answer.
        </p>
      )}

      {triplet && triplet.K < 0 ? (
        <p className='text-volt mt-4 font-mono text-xs'>
          Below 0 K the scale runs out of universe. The arithmetic continues anyway.
        </p>
      ) : null}

      {notes.length > 0 ? (
        <ol className='text-silver mt-6 space-y-2 text-sm'>
          {notes.map(function renderNote(note) {
            return (
              <li key={note.marker} className='num'>
                <span className='text-magenta'>{note.marker}</span> {note.text}
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}
