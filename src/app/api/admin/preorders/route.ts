import { NextResponse } from 'next/server';

import { preordersToCsv } from '@/lib/csv';
import { tokensMatch } from '@/lib/ip';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function bearerToken(request: Request): string | null {
  const header = request.headers.get('authorization');
  if (header?.startsWith('Bearer ')) {
    return header.slice('Bearer '.length).trim();
  }
  return request.headers.get('x-admin-token');
}

export async function GET(request: Request): Promise<NextResponse> {
  if (!tokensMatch(bearerToken(request), process.env.ADMIN_TOKEN)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const rows = await prisma.kelvinPreorder.findMany({
      orderBy: { createdAt: 'asc' },
    });
    const csv = preordersToCsv(rows);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="kelvin-preorders.csv"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Pre-order export failed', error);
    return new NextResponse('Export failed', { status: 500 });
  }
}
