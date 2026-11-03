import { z } from 'zod';

import { MAX_CASES_PER_FLAVOR } from '@/lib/flavors';
import { hashIp } from '@/lib/ip';
import { isOverLimit, windowStart } from '@/lib/rate-limit';

const caseCount = z
  .number()
  .int('Cases are whole boxes.')
  .min(0, 'Cases cannot go below zero.')
  .max(MAX_CASES_PER_FLAVOR, `Hold the line at ${MAX_CASES_PER_FLAVOR} cases of one flavor.`);

export const preorderSchema = z
  .object({
    contactName: z.string().trim().min(1, 'Name the human placing the boxes.').max(80),
    email: z.email('That email does not convert.'),
    organization: z.string().trim().max(120).optional().default(''),
    city: z.string().trim().max(80).optional().default(''),
    absoluteZeroRazz: caseCount,
    minusFortyMango: caseCount,
    punch27315: caseCount,
    freezingPointLime: caseCount,
    note: z.string().trim().max(500).optional().default(''),
    companyWebsite: z.string().max(200).optional().default(''),
    acknowledged: z.boolean().refine(value => value === true, {
      message: 'Confirm that nothing will be charged.',
    }),
  })
  .refine(
    data =>
      data.absoluteZeroRazz + data.minusFortyMango + data.punch27315 + data.freezingPointLime > 0,
    {
      message: 'Count at least one case. A case is a box.',
      path: ['absoluteZeroRazz'],
    }
  );

export type PreorderInput = z.input<typeof preorderSchema>;

export type NewPreorder = {
  contactName: string;
  email: string;
  organization: string | null;
  city: string | null;
  absoluteZeroRazz: number;
  minusFortyMango: number;
  punch27315: number;
  freezingPointLime: number;
  note: string | null;
  ipHash: string;
  userAgent: string | null;
};

export type SubmitDeps = {
  ip: string;
  salt: string | undefined;
  now: Date;
  userAgent: string | null;
  /** When false, the filing is a waitlist shout and nothing is written. */
  persist: boolean;
  countRecent: (ipHash: string, since: Date) => Promise<number>;
  create: (row: NewPreorder) => Promise<void>;
};

export type IntakeReceipt = {
  headline: string;
  detail: string;
};

export type SubmitResult =
  | ({ ok: true; status: 200; stored: boolean } & IntakeReceipt)
  | { ok: false; status: 400 | 429; error: string };

export function intakeReceipt(totalCases: number, stored: boolean): IntakeReceipt {
  const count = Number.isFinite(totalCases) ? Math.max(0, Math.trunc(totalCases)) : 0;
  const boxes = count === 1 ? '1 box' : `${count} boxes`;
  const math = '0 °C of payment is 273.15 K is 32 °F.';
  const headline = 'Converted. Not charged.';
  const detail = stored
    ? `Only at Shrimp Club. ${boxes} made it into the optional ledger. ${math} Nothing was charged. No email was sent.`
    : `Only at Shrimp Club. ${boxes} picked up 273.15 and lost a bill. ${math} Kelvin does not keep the list. The club does. Nothing was charged. No email was sent.`;

  return { headline, detail };
}

function caseTotal(data: {
  absoluteZeroRazz: number;
  minusFortyMango: number;
  punch27315: number;
  freezingPointLime: number;
}): number {
  return data.absoluteZeroRazz + data.minusFortyMango + data.punch27315 + data.freezingPointLime;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function blankToNull(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }
  return trimmed;
}

export async function submitPreorder(payload: unknown, deps: SubmitDeps): Promise<SubmitResult> {
  if (
    isRecord(payload) &&
    typeof payload.companyWebsite === 'string' &&
    payload.companyWebsite.trim() !== ''
  ) {
    return { ok: true, status: 200, stored: false, ...intakeReceipt(0, false) };
  }

  const parsed = preorderSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      ok: false,
      status: 400,
      error: issue?.message ?? 'Check the form and try again.',
    };
  }

  const total = caseTotal(parsed.data);
  if (!deps.persist || !deps.salt) {
    return { ok: true, status: 200, stored: false, ...intakeReceipt(total, false) };
  }

  try {
    const ipHash = hashIp(deps.ip, deps.salt);
    const recent = await deps.countRecent(ipHash, windowStart(deps.now));
    if (isOverLimit(recent)) {
      return {
        ok: false,
        status: 429,
        error: 'Too many filings from this connection. Wait an hour and convert again.',
      };
    }

    await deps.create({
      contactName: parsed.data.contactName,
      email: parsed.data.email.toLowerCase(),
      organization: blankToNull(parsed.data.organization),
      city: blankToNull(parsed.data.city),
      absoluteZeroRazz: parsed.data.absoluteZeroRazz,
      minusFortyMango: parsed.data.minusFortyMango,
      punch27315: parsed.data.punch27315,
      freezingPointLime: parsed.data.freezingPointLime,
      note: blankToNull(parsed.data.note),
      ipHash,
      userAgent: deps.userAgent,
    });
  } catch {
    console.error('Pre-order persist skipped');
    return { ok: true, status: 200, stored: false, ...intakeReceipt(total, false) };
  }

  return { ok: true, status: 200, stored: true, ...intakeReceipt(total, true) };
}

export const PREORDER_FIELD_NAMES = [
  'contactName',
  'email',
  'organization',
  'city',
  'absoluteZeroRazz',
  'minusFortyMango',
  'punch27315',
  'freezingPointLime',
  'note',
  'companyWebsite',
  'acknowledged',
] as const;
