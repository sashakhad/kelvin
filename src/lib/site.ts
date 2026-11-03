export function siteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    return new URL(configured);
  }
  const vercel = process.env.VERCEL_URL;
  if (vercel) {
    const host = vercel.startsWith('http') ? vercel : `https://${vercel}`;
    return new URL(host);
  }
  return new URL('http://localhost:43123');
}
