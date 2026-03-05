# Garden — Digital Garden

A public digital garden inspired by Andy Matuschak's "working with the garage door open" philosophy. Everything in this vault is published online — notes are work-in-progress by nature.

## Architecture

- **Engine:** [Quartz v4](https://quartz.jzhao.xyz) — static site generator for Obsidian vaults
- **Content:** Obsidian vault living in `/content/` (Quartz convention)
- **Hosting:** Vercel (`.vercel.app` for now, custom domain later)
- **Auto-deploy:** Obsidian Git plugin → GitHub push → Vercel auto-build
- **Single repo:** The Obsidian vault and Quartz config coexist in one repository

## Content Types

| Type | Description |
|---|---|
| **Journal** | Updates — dit gebeurt er |
| **Reflecties** | Thoughts — dit denk ik erover |
| **Leesnotities** | Reading notes |
| **Aanbevelingen** | Recommendations |

Content starts in Dutch, will become a mix of Dutch and English over time.

## Design Principles

- **Super minimalistisch** — nothing that doesn't serve readability
- **Body font:** Source Serif 4 (variable, via Google Fonts or self-hosted)
- **Everything public** — no draft filtering, no private notes. If it's in the vault, it's on the site
- **Homepage** with intro/landing — not just a note index

## Project Structure

```
garden/
├── content/           # Obsidian vault (notes, attachments)
│   ├── index.md       # Homepage
│   ├── journal/
│   ├── reflecties/
│   ├── leesnotities/
│   └── aanbevelingen/
├── quartz.config.ts   # Quartz site config (title, theme, plugins)
├── quartz.layout.ts   # Page layout and component arrangement
├── quartz/            # Quartz engine (cloned, don't edit unless customizing)
├── vercel.json        # Vercel config (cleanUrls)
└── CLAUDE.md
```

## Key Config Files

- `quartz.config.ts` — site title, base URL, theme colors, fonts, plugin pipeline
- `quartz.layout.ts` — component arrangement (header, sidebar, footer)
- `vercel.json` — `{"cleanUrls": true}` for clean URLs without `.html`

## Quartz Conventions

- Obsidian-flavored Markdown: `[[wikilinks]]`, callouts, embeds all work
- Frontmatter fields: `title`, `description`, `tags`, `date`
- Content goes in `/content/` — Quartz builds from there
- Build: `npx quartz build` — outputs to `/public/`
- Dev server: `npx quartz build --serve`
- Sync to GitHub: `npx quartz sync`

## Development Commands

```bash
npx quartz build --serve    # Local dev server with hot reload
npx quartz build            # Production build
npx quartz sync             # Commit and push to GitHub
```

## Style Customization

Theme is configured in `quartz.config.ts` under `theme`. Custom CSS goes in `quartz/styles/custom.scss`.

Font override for Source Serif 4:
- Set in `quartz.config.ts` → `theme.typography.body`
- Or override in `custom.scss` for full control

Target aesthetic: clean, serif, lots of whitespace, minimal chrome. Think: [gwern.net](https://gwern.net) meets [Andy's working notes](https://notes.andymatuschak.org).

## Workflow

1. Write/edit notes in Obsidian (vault = `content/` folder)
2. Obsidian Git plugin auto-commits and pushes on interval
3. GitHub receives push → Vercel auto-builds and deploys
4. Site is live within ~1 minute

## Rules

- Never filter or hide content — everything publishes
- Keep design minimal — resist adding visual complexity
- Prefer wikilinks (`[[note]]`) over markdown links for internal linking
- Notes don't need to be "finished" — this is a garden, not a blog
- Attachments (images etc.) go in `content/` alongside notes
