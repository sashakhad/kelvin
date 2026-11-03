import { describe, expect, it } from 'vitest';

import { isDatabaseConfigured } from '../database';

describe('isDatabaseConfigured', () => {
  it('treats a missing or blank url as off', () => {
    expect(isDatabaseConfigured(undefined)).toBe(false);
    expect(isDatabaseConfigured('')).toBe(false);
    expect(isDatabaseConfigured('   ')).toBe(false);
  });

  it('treats a connection string as on', () => {
    expect(isDatabaseConfigured('postgresql://postgres:postgres@localhost:5432/kelvin')).toBe(true);
  });
});
