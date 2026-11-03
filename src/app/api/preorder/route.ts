import { NextResponse } from 'next/server';

import { isDatabaseConfigured } from '@/lib/database';
import { clientIpFromHeaders } from '@/lib/ip';
import { intakeReceipt, submitPreorder } from '@/lib/preorder';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<NextResponse> {
  let payload: unknown = null;
  try {
    payload = await request.json();
  } catch {
    payload = null;
  }

  const ip = clientIpFromHeaders(
    request.headers.get('x-forwarded-for'),
    request.headers.get('x-real-ip')
  );
  const persist = isDatabaseConfigured();

  try {
    const result = await submitPreorder(payload, {
      ip,
      salt: process.env.IP_HASH_SALT,
      now: new Date(),
      userAgent: request.headers.get('user-agent'),
      persist,
      async countRecent(ipHash, since) {
        return prisma.kelvinPreorder.count({
          where: {
            ipHash,
            createdAt: { gte: since },
          },
        });
      },
      async create(row) {
        await prisma.kelvinPreorder.create({ data: row });
      },
    });

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
    }

    return NextResponse.json({
      ok: true,
      stored: result.stored,
      headline: result.headline,
      detail: result.detail,
    });
  } catch {
    console.error('Pre-order filing failed');
    const receipt = intakeReceipt(0, false);
    return NextResponse.json({ ok: true, stored: false, ...receipt });
  }
}
