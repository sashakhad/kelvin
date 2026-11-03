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

`pnpm dev` serves the app with Turbopack. The marketing pages render without a database. Filing a pre-order needs `DATABASE_URL`, `ADMIN_TOKEN`, and `IP_HASH_SALT`.

## Environment

| Variable       | Required for                            | Purpose                                                                                                         |
| -------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL` | Storing pre-orders and the admin export | Postgres connection string. Local Docker default is in `.env.example`.                                          |
| `ADMIN_TOKEN`  | `GET /api/admin/preorders`              | Bearer token (or `x-admin-token`) for the CSV export.                                                           |
| `IP_HASH_SALT` | Storing pre-orders                      | Salt used to hash the submitter IP. Raw addresses are not stored. If this is missing, the form refuses to file. |

`NEXT_PUBLIC_SITE_URL` is optional. On Vercel, Open Graph URLs use `VERCEL_URL` when it is unset.

Export the ledger:

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:3000/api/admin/preorders
```

## Routes

- `/` — landing page, converter, Conversion Facts label, flavors
- `/preorder` — bulk pre-order. No payment and no card fields.
- `/brand` — logo variants, palette, type, voice, taglines
- `POST /api/preorder` — stores a `KelvinPreorder` row
- `GET /api/admin/preorders` — CSV download

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

1. Framework preset: Next.js. Package manager: pnpm. Node 24.
2. Set `DATABASE_URL`, `ADMIN_TOKEN`, and `IP_HASH_SALT` for Production (and Preview, if previews should file orders). Use a hosted Postgres URL with `sslmode=require`.
3. Leave the install command as `pnpm install`. The `postinstall` script runs `prisma generate`.
4. Set the build command to `pnpm vercel-build` if it is not picked up automatically. That script runs `prisma migrate deploy` and then `next build`. The plain `pnpm build` used in CI does not migrate, so a missing `DATABASE_URL` does not fail CI.
5. No email provider, no Stripe, no card environment variables.

After the first deploy, confirm `GET /api/admin/preorders` returns `401` without the token and a CSV with it.
