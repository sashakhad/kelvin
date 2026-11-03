import { createHash, timingSafeEqual } from 'node:crypto';

export function clientIpFromHeaders(forwardedFor: string | null, realIp: string | null): string {
  const forwarded = firstHop(forwardedFor);
  if (forwarded) {
    return forwarded;
  }
  const real = firstHop(realIp);
  if (real) {
    return real;
  }
  return 'unknown';
}

function firstHop(value: string | null): string | null {
  if (!value) {
    return null;
  }
  const hop = value.split(',')[0]?.trim() ?? '';
  if (hop.length === 0) {
    return null;
  }
  return hop;
}

export function hashIp(ip: string, salt: string): string {
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

export function tokensMatch(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) {
    return false;
  }
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}
