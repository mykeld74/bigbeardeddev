# bigbearded.dev

Personal site for **Mike Daugherty** — front-end web developer, Lakewood, Colorado.
Built by hand with SvelteKit 3 and Svelte 5 (runes), deployed to Netlify.

## Running it

```sh
pnpm install
pnpm dev
```

| Script         | What it does                               |
| -------------- | ------------------------------------------ |
| `pnpm dev`     | Dev server                                 |
| `pnpm build`   | Production build (prerenders static pages) |
| `pnpm preview` | Preview the production build               |
| `pnpm check`   | `svelte-check` type checking               |
| `pnpm lint`    | Prettier + ESLint                          |
| `pnpm format`  | Rewrite with Prettier                      |

## Structure

```
src/
├─ lib/
│  ├─ assets/          logo marks + client-site screenshots (work/)
│  ├─ components/      Nav, Footer, Logo, ProjectCard, Seo, Ambient
│  ├─ data/            site.ts, projects.ts, services.ts — all page copy lives here
│  ├─ styles/          reset.css + app.css (design tokens)
│  └─ images.ts        resolves work screenshots by name
├─ routes/             / · /work · /services · /about · /contact · sitemap.xml
└─ env.ts              typed environment variables
```

**Content lives in `src/lib/data/`.** Adding a project means adding an entry to
`projects.ts` and dropping a 1280×720 `.webp` into `src/lib/assets/work/` with a
matching name — nothing else needs touching.

Imports use the `#lib` alias (`#lib/data/site`), mapped in `package.json` and
`tsconfig.json`.

## Contact form

`/contact` posts to a server action that emails via nodemailer/Gmail. It needs
two environment variables, declared in `src/env.ts`:

```
GOOGLE_EMAIL=
GOOGLE_EMAIL_PASSWORD=
```

`GOOGLE_EMAIL_PASSWORD` must be a Google **App Password**, not the account
password. Copy `.env.example` to `.env` locally, and set both in the Netlify
site settings for production. Without them the form validates as usual but tells
the visitor to email directly instead of failing silently.

The form also validates server-side, preserves submitted values on error, and
carries a hidden honeypot field for spam.

## Pages

- `/` — hero, services, featured work, stack, CTA
- `/work` — all 12 live client sites
- `/services` — what the work is, the four-step process, FAQ
- `/about` — bio
- `/contact` — form
- `/sitemap.xml` — generated from the route list in `src/routes/sitemap.xml/+server.ts`

`/`, `/work`, `/services` and `/about` are prerendered at build time. `/contact`
is server-rendered because of the form action.
