import { NextResponse } from 'next/server';

import { clientIpFromHeaders } from '@/lib/ip';
import { submitPreorder } from '@/lib/preorder';
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

  try {
    const result = await submitPreorder(payload, {
      ip,
      salt: process.env.IP_HASH_SALT,
      now: new Date(),
      userAgent: request.headers.get('user-agent'),
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Pre-order filing failed', error);
    return NextResponse.json(
      { ok: false, error: 'The lab could not file that. Nothing was charged.' },
      { status: 500 }
    );
  }
}
