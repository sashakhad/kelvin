export const PREORDER_LIMIT = 5;
export const PREORDER_WINDOW_MS = 60 * 60 * 1000;

export function isOverLimit(recentCount: number): boolean {
  return recentCount >= PREORDER_LIMIT;
}

export function windowStart(now: Date): Date {
  return new Date(now.getTime() - PREORDER_WINDOW_MS);
}
