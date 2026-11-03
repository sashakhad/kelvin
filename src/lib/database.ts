export function isDatabaseConfigured(
  databaseUrl: string | undefined = process.env.DATABASE_URL
): boolean {
  return typeof databaseUrl === 'string' && databaseUrl.trim().length > 0;
}
