import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { FLAVORS, flavorReadings } from '../flavors';

describe('flavor readings', () => {
  it('keeps every flavor on the conversion formulas', () => {
    const readings = flavorReadings();
    const byName = new Map(readings.map(flavor => [flavor.name, flavor]));

    expect(byName.get('Absolute Zero Razz')).toMatchObject({
      lead: true,
      K: '0',
      C: '−273.15',
      F: '−459.67',
    });
    expect(byName.get('Minus Forty Mango')).toMatchObject({
      K: '233.15',
      C: '−40',
      F: '−40',
    });
    expect(byName.get('273.15 Punch')).toMatchObject({
      K: '273.15',
      C: '0',
      F: '32',
    });
    expect(byName.get('Freezing Point Lime')).toMatchObject({
      K: '273.15',
      C: '0',
      F: '32',
      sameReadingAs: '273.15 Punch',
    });
  });

  it('points every flavor at its public can image', () => {
    for (const flavor of FLAVORS) {
      expect(flavor.image).toBe(`/flavors/${flavor.id}.webp`);
      const file = readFileSync(path.join(process.cwd(), 'public', flavor.image));
      expect(file.byteLength).toBeGreaterThan(0);
    }
  });
});
