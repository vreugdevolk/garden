# Garden — Digital Garden

A public digital garden inspired by Andy Matuschak's "working with the garage door open" philosophy. Everything in this vault is published online — notes are work-in-progress by nature.

## Architecture

- **Engine:** [Quartz v4](https://quartz.jzhao.xyz) — static site generator for Obsidian vaults
- **Content:** Obsidian vault at `/content/` (opened as vault in Obsidian)
- **Hosting:** Vercel at https://martijn.garden
- **Auto-deploy:** Obsidian Git plugin (15 min interval) → GitHub push → Vercel auto-build
- **Single repo:** The Obsidian vault and Quartz config coexist in one repository

## Content Types

| Type | Description |
|---|---|
| **Journal** | Updates — dit gebeurt er |
| **Reflecties** | Thoughts — dit denk ik erover |
| **Leesnotities** | Reading notes |
| **Aanbevelingen** | Recommendations |

Content is primarily Dutch, may become a mix over time.

## Growth Stages

Notes use frontmatter tags to indicate maturity. These are rendered as labels (not as #tags) with hover/tap tooltips:

| Tag | Label | Meaning |
|---|---|---|
| `seedling` | KIEM | Net geplant, nog niet uitgewerkt |
| `budding` | IN BLOEI | Groeit en krijgt vorm, maar nog niet af |
| `evergreen` | GROENBLIJVER | Uitgegroeid en regelmatig bijgehouden |

Growth tags are filtered out of the tag list display (handled in `TagList.tsx`).

## Design Principles

- **Super minimalistisch** — nothing that doesn't serve readability
- **Fonts:** Source Sans 3 (headings, content meta), Source Serif 4 (body)
- **Content width:** 680px max for optimal reading (~65-75 chars/line)
- **Content meta:** sans-serif, uppercase, subdued `var(--gray)` color
- **Everything public** — no draft filtering, no private notes
- **Homepage** shows title "Martijn", hides article title and meta. Empty collections are dimmed

## Project Structure

```
garden/
├── content/           # Obsidian vault (opened as vault in Obsidian)
│   ├── .obsidian/     # Obsidian config + plugins (incl. obsidian-git)
│   ├── index.md       # Homepage
│   ├── templates/     # Obsidian templates (ignored by Quartz)
│   ├── journal/
│   ├── reflecties/
│   ├── leesnotities/
│   └── aanbevelingen/
├── quartz.config.ts   # Site config (title, theme, plugins)
├── quartz.layout.ts   # Page layout and component arrangement
├── quartz/            # Quartz engine (customized components live here)
│   ├── components/    # ContentMeta.tsx (growth stages), TagList.tsx
│   └── styles/        # custom.scss (all style overrides)
├── vercel.json        # Vercel config (cleanUrls, build command)
└── CLAUDE.md
```

## Development Commands

```bash
npx quartz build --serve    # Local dev server with hot reload
npx quartz build            # Production build (may fail locally, see note)
vercel deploy --prod        # Manual deploy to production
```

**Important:** The `CustomOgImages` plugin fetches Google Fonts at build time to generate social preview images. This works on Vercel but often fails locally due to network issues. For local builds, this is harmless — the build still succeeds for all other output. Do NOT disable the plugin; it works in production.

## Key Customizations

- `quartz/components/ContentMeta.tsx` — growth stage labels with tooltips, garden-themed dates ("Gezaaid op", "laatst gewied op")
- `quartz/components/TagList.tsx` — filters out growth tags from display
- `quartz/styles/custom.scss` — content width, typography, growth tooltips, sticky footer, empty collection dimming
- `quartz.layout.ts` — no graph view, no reader mode. Homepage hides title/meta via ConditionalRender

## Workflow

1. Write/edit notes in Obsidian (vault = `content/` folder)
2. Obsidian Git plugin auto-commits and pushes every 15 minutes
3. GitHub receives push → Vercel auto-builds and deploys
4. Site is live within ~1-2 minutes

## Rules

- Never filter or hide content — everything publishes
- Keep design minimal — resist adding visual complexity
- Prefer wikilinks (`[[note]]`) over markdown links for internal linking
- Notes don't need to be "finished" — this is a garden, not a blog
- Attachments (images etc.) go in `content/` alongside notes
- Growth stages go in frontmatter tags, not in note content
