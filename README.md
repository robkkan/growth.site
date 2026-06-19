## GROWTH.SITE 🌱

This portfolio's purpose is to follow my growth. Sometimes the work might be a bit rough around the edges, but it reminds me of how far I've come.

I hope you find it comforting.

---

### Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v3 · framer-motion · MDX

### Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Requires Node 20+.

```bash
npm run build    # production build (typechecks + lints)
npm run start    # serve the production build
npm run lint
npm run typecheck
npm run format
```

### Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your production origin so
canonical and Open Graph URLs resolve correctly. It defaults to `https://growth.site`.

### Structure

- `app/` — routes: home, `/archive`, `/growth`, `/writing` (MDX blog), `/projects/<slug>` (case studies).
- `app/writing/content/*.mdx` — blog posts (frontmatter: `title`, `date`, `description`).
- `lib/data/projectData.ts` — the project list model.
- `components/`, `hooks/`, `lib/` — shared UI, hooks, and utilities.

See `CLAUDE.md` for architecture notes and how to add a project or post.
