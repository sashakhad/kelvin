import { describe, expect, it } from 'vitest';

import { hashIp, tokensMatch } from '../ip';
import { isOverLimit, PREORDER_LIMIT, windowStart } from '../rate-limit';

describe('rate limit and tokens', () => {
  it('opens the window an hour before now and trips at the limit', () => {
    const now = new Date('2026-11-03T12:00:00.000Z');
    expect(windowStart(now).toISOString()).toBe('2026-11-03T11:00:00.000Z');
    expect(isOverLimit(PREORDER_LIMIT - 1)).toBe(false);
    expect(isOverLimit(PREORDER_LIMIT)).toBe(true);
  });

  it('hashes an address with the salt and compares tokens in constant time', () => {
    expect(hashIp('203.0.113.8', 'salt-a')).not.toBe(hashIp('203.0.113.8', 'salt-b'));
    expect(hashIp('203.0.113.8', 'salt-a')).toHaveLength(64);
    expect(tokensMatch('secret-token', 'secret-token')).toBe(true);
    expect(tokensMatch('secret-token', 'other-token')).toBe(false);
    expect(tokensMatch(null, 'secret-token')).toBe(false);
    expect(tokensMatch('secret-token', undefined)).toBe(false);
  });
});
