import { describe, expect, it } from 'vitest';

import { csvEscape, preordersToCsv, type PreorderCsvRow } from '../csv';

describe('preorder csv', () => {
  it('quotes commas and doubled quotes', () => {
    expect(csvEscape('plain')).toBe('plain');
    expect(csvEscape('a,b')).toBe('"a,b"');
    expect(csvEscape('say "hi"')).toBe('"say ""hi"""');
  });

  it('writes a header and one data row', () => {
    const row: PreorderCsvRow = {
      id: 'abc',
      createdAt: new Date('2026-11-03T18:00:00.000Z'),
      contactName: 'Louie, King',
      email: 'louie@example.com',
      organization: null,
      city: 'SF',
      absoluteZeroRazz: 3,
      minusFortyMango: 0,
      punch27315: 1,
      freezingPointLime: 0,
      note: 'print "0 K"',
      ipHash: 'deadbeef',
      userAgent: null,
    };

    const csv = preordersToCsv([row]);
    expect(csv.startsWith('id,createdAt,contactName,email,')).toBe(true);
    expect(csv).toContain('"Louie, King"');
    expect(csv).toContain('"print ""0 K"""');
    expect(csv).toContain('2026-11-03T18:00:00');
    expect(csv.endsWith('\n')).toBe(true);
  });
});
