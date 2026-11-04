# KELVIN

King Louie's energy drink. Sold only at [Shrimp Club](https://shrimpclub.vercel.app). The brand is a temperature conversion: Kelvin = Celsius + 273.15.

This is a parody. It is not Celsius, and it does not make health, medical, nutrition, or athletic claims. Pre-orders are requests. Nothing is charged. No email is sent.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Prisma with Postgres, Zod, React Hook Form, Vitest, and Cypress. Tooling follows the same shape as the house app this was templated from: pnpm, ESLint, Prettier, Husky, and GitHub Actions.

## Run locally

Node 24 and pnpm 11.

```bash
pnpm install
cp .env.example .env
pnpm db:up
pnpm db:migrate
pnpm dev
```

`pnpm dev` serves the app with Turbopack. The site, including `/preorder`, runs with no environment variables. A database is optional.

## Environment

None of these are required. `/preorder` succeeds as an Only at Shrimp Club waitlist with an empty environment.

| Variable       | Purpose                                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DATABASE_URL` | Optional Postgres URL. When set, a valid filing may also be stored. When unset, the form still returns success and the admin route returns `503` `not configured`. |
| `ADMIN_TOKEN`  | Bearer token (or `x-admin-token`) for `GET /api/admin/preorders`.                                                                                                  |
| `IP_HASH_SALT` | Salt for hashing submitter IPs when a ledger is on. Raw addresses are not stored. A missing salt skips the write and the form still succeeds.                      |

`NEXT_PUBLIC_SITE_URL` is optional. On Vercel, Open Graph URLs use `VERCEL_URL` when it is unset.

Export the ledger when a database is configured:

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:3000/api/admin/preorders
```

## Routes

- `/` — landing page, converter, Conversion Facts label, flavors
- `/preorder` — bulk waitlist. No payment and no card fields. Works with no database.
- `POST /api/preorder` — accepts the waitlist. Stores a `KelvinPreorder` row only when `DATABASE_URL` is set.
- `GET /api/admin/preorders` — CSV download, or `503` JSON `{ "ok": false, "error": "not configured" }` when no database is configured.

## Tests

```bash
pnpm test
pnpm type-check
pnpm lint
pnpm exec cypress install
pnpm test:e2e
```

## Deploy on Vercel

Do not point this app at the Shrimp Club project. Create a new Vercel project from this repo.

1. Framework preset: Next.js. Package manager: pnpm. Node 24. No environment variables are required.
2. `pnpm build` is the build. It does not need `DATABASE_URL`. `pnpm vercel-build` migrates only when that variable is already set, then runs the same build.
3. Leave the install command as `pnpm install`. The `postinstall` script runs `prisma generate`.
4. Add `DATABASE_URL`, `ADMIN_TOKEN`, and `IP_HASH_SALT` only if you want the optional ledger. Use a hosted Postgres URL with `sslmode=require`.
5. No email provider, no Stripe, no card environment variables.

Without a database, `GET /api/admin/preorders` returns `503` and `{ "error": "not configured" }`. With a database and no token, it returns `401`.
