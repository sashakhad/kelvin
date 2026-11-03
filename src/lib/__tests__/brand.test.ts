import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { LEAD_TAGLINE, NAME_STORY, PALETTE } from '../brand';

describe('brand tokens', () => {
  it('keeps the five palette hexes in the stylesheet and nowhere near the old house colors', () => {
    const css = readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8').toLowerCase();
    for (const swatch of PALETTE) {
      expect(css).toContain(swatch.hex.toLowerCase());
    }
    expect(css).not.toContain('#0e0708');
    expect(css).not.toContain('#c9a25d');
    expect(css).not.toMatch(/oxblood|brass|parchment|outfit|cormorant|ibm plex/);
  });

  it('leads with the conversion tagline and the name story', () => {
    expect(LEAD_TAGLINE).toBe('Celsius + 273.15.');
    expect(NAME_STORY).toBe('Celsius, but converted.');
  });
});
