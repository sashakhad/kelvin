import { describe, expect, it, vi } from 'vitest';

import {
  PREORDER_FIELD_NAMES,
  submitPreorder,
  type NewPreorder,
  type SubmitDeps,
} from '../preorder';

function deps(overrides: Partial<SubmitDeps> = {}): SubmitDeps & { created: NewPreorder[] } {
  const created: NewPreorder[] = [];
  return {
    ip: '203.0.113.8',
    salt: 'test-salt',
    now: new Date('2026-11-03T12:00:00.000Z'),
    userAgent: 'vitest',
    countRecent: vi.fn().mockResolvedValue(0),
    create: vi.fn(async (row: NewPreorder) => {
      created.push(row);
    }),
    created,
    ...overrides,
  };
}

const validPayload = {
  contactName: 'King Louie',
  email: 'Louie@Shrimp.club',
  organization: 'Jackson Street',
  city: 'San Francisco',
  absoluteZeroRazz: 2,
  minusFortyMango: 0,
  punch27315: 1,
  freezingPointLime: 0,
  note: '',
  companyWebsite: '',
  acknowledged: true,
};

describe('submitPreorder', () => {
  it('stores a filing and lowercases the email', async () => {
    const context = deps();
    const result = await submitPreorder(validPayload, context);

    expect(result).toEqual({ ok: true, status: 200 });
    expect(context.created).toHaveLength(1);
    expect(context.created[0]?.email).toBe('louie@shrimp.club');
    expect(context.created[0]?.absoluteZeroRazz).toBe(2);
    expect(context.created[0]?.ipHash).toMatch(/^[a-f0-9]{64}$/);
    expect(context.created[0]?.note).toBeNull();
  });

  it('pretends a honeypot filing succeeded and writes nothing', async () => {
    const context = deps();
    const result = await submitPreorder(
      { ...validPayload, companyWebsite: 'https://spam.example' },
      context
    );

    expect(result).toEqual({ ok: true, status: 200 });
    expect(context.created).toHaveLength(0);
    expect(context.countRecent).not.toHaveBeenCalled();
  });

  it('rejects an empty case count and a missing charge confirmation', async () => {
    const context = deps();
    const empty = await submitPreorder(
      { ...validPayload, absoluteZeroRazz: 0, punch27315: 0 },
      context
    );
    expect(empty.ok).toBe(false);
    if (!empty.ok) {
      expect(empty.status).toBe(400);
      expect(empty.error).toMatch(/at least one case/i);
    }

    const unconfirmed = await submitPreorder({ ...validPayload, acknowledged: false }, context);
    expect(unconfirmed.ok).toBe(false);
    if (!unconfirmed.ok) {
      expect(unconfirmed.error).toMatch(/nothing will be charged/i);
    }
    expect(context.created).toHaveLength(0);
  });

  it('does not accept a card field as part of the contract', () => {
    expect(PREORDER_FIELD_NAMES).not.toContain('cardNumber');
    expect(PREORDER_FIELD_NAMES).not.toContain('cvc');
    expect(PREORDER_FIELD_NAMES.join(' ')).not.toMatch(/payment|card|cvc|cvv/i);
  });

  it('rate limits a hashed address and refuses to store without a salt', async () => {
    const limited = deps({ countRecent: vi.fn().mockResolvedValue(5) });
    const blocked = await submitPreorder(validPayload, limited);
    expect(blocked).toMatchObject({ ok: false, status: 429 });
    expect(limited.created).toHaveLength(0);

    const unsalted = deps({ salt: undefined });
    const closed = await submitPreorder(validPayload, unsalted);
    expect(closed).toMatchObject({ ok: false, status: 500 });
    expect(unsalted.created).toHaveLength(0);
  });
});
