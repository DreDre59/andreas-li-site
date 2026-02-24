# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Andreas Li — mechatronics and robotics engineering professional. Built with Next.js (App Router), MDX, and Tailwind CSS.

## Design References

- [shayaanazeem.com](https://www.shayaanazeem.com/) — highlighted keyword badges, card-based content, casual-confident tone
- [cam-hicks.com](https://www.cam-hicks.com/work) — bold typography, generous whitespace, gallery-forward layout
- [danielsun.space](https://danielsun.space/) — large name treatment, full-width layout, project showcase
- [jeremysu.ca](https://www.jeremysu.ca/) — masonry gallery aesthetic, curated portfolio feel
- [lisovskiy.work](https://lisovskiy.work/) — minimal top nav, image-heavy project grid

## Design System

### Typography

| Usage | Font | Weight | Style |
|---|---|---|---|
| Display name (hero) | Bricolage Grotesque | 800 (extrabold) | Uppercase, tight tracking (-0.03em), responsive size clamp(4rem, 11vw, 9rem) |
| Section headings | Bricolage Grotesque | 800 (extrabold) | Uppercase, tight tracking, text-5xl |
| Body text / intro | Bricolage Grotesque | 400 (regular) | Normal case, relaxed leading |
| Experience job titles | Bricolage Grotesque | 500 (medium) | Normal case — deliberately softer than section headings |
| Nav links | DM Mono | 400 | Uppercase, widest tracking, text-xs |
| Tags / metadata / dates | DM Mono | 400 | Uppercase, widest tracking, text-xs |
| Highlight badges | Bricolage Grotesque | 500 (medium) | Normal case, text-sm |

Load fonts from Google Fonts:
```
Bricolage Grotesque: weights 400, 500, 700, 800 (optical size 12..96)
DM Mono: weights 400, 500
```

### Color Palette

Neutral-only base palette — no primary accent color:

| Element | Color |
|---|---|
| Text primary | neutral-900 |
| Text secondary | neutral-600 |
| Text muted | neutral-400 |
| Text faintest | neutral-300 |
| Backgrounds | white |
| Borders/dividers | neutral-100 or neutral-200 |
| Tag borders | neutral-200 |
| Tag text | neutral-500 |
| Project card hover overlay | neutral-900 at 95% opacity |
| Buttons (filled) | bg-neutral-900, text-white, hover:bg-neutral-700 |
| Buttons (outlined) | border-2 border-neutral-900, hover:bg-neutral-900 hover:text-white |

### Highlighted Keyword Badges

Used in the About/hero highlights section. Soft colored backgrounds with matching text:

| Badge type | Background | Text |
|---|---|---|
| Default | bg-neutral-100 | text-neutral-700 |
| Achievement | bg-amber-50 | text-amber-800 |
| Technical | bg-sky-50 | text-sky-800 |
| Company | bg-emerald-50 | text-emerald-800 |
| Skill | bg-violet-50 | text-violet-800 |
| Hardware | bg-rose-50 | text-rose-800 |

### Component Patterns

- **No border-radius** on project cards, buttons, tags, or filter pills — sharp corners throughout for an architectural feel
- **Em dash (—)** bullets for highlight lists, not numbers or standard bullets
- **Monospace counters** for section metadata (e.g., "02 roles", "06 projects")
- **Hover reveals** on project gallery cards — dark overlay with title, description, and tags
- **Square timeline dots** (not circles) in the experience section
- **Thin dividers** (border-t border-neutral-100) between major sections

## Tech Stack

- **Next.js 15 (App Router)** with TypeScript
- **MDX** for project and blog content
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **next/image** for all images
- **Bricolage Grotesque** (Google Fonts) for display/body
- **DM Mono** (Google Fonts) for metadata/nav

## Build Status

**Phase 1: Foundation — COMPLETE**

The project has been fully scaffolded and builds successfully (`npm run build` passes with 10 static pages). The dev server runs on `http://localhost:3000`.

> Note: `npx create-next-app` was bypassed due to the directory name "Codebase" containing capitals (npm naming restriction). All config files were created manually.
> Node.js is at `C:\Program Files\nodejs\` — not on the default bash PATH. Prefix commands with `export PATH="/c/Program Files/nodejs:$PATH"` or run from a standard terminal.

**Phase 1.5: Design System Update — PENDING**

The existing Phase 1 scaffold uses a sidebar layout with Geist fonts. It needs to be updated to match the new design system:

- [ ] Replace Geist fonts with Bricolage Grotesque + DM Mono (Google Fonts)
- [ ] Replace sidebar navigation with top navigation bar (name left, links + resume button right)
- [ ] Update hero section: large bold uppercase name, subtitle in monospace, em dash bullet highlights, keyword badges
- [ ] Update experience timeline: square dots, medium-weight job titles (not bold uppercase), monospace dates
- [ ] Update projects grid: masonry layout, sharp corners, hover reveal overlay
- [ ] Update footer: add resume link alongside social links
- [ ] Apply neutral color palette and sharp-corner component patterns throughout
- [ ] Remove or repurpose Sidebar.tsx — replace with top nav component

### What's been built (Phase 1 — needs design update)

| File/Directory | Description |
|---|---|
| `package.json` | Dependencies: Next.js 15, React 19, Tailwind 3, gray-matter, reading-time, next-mdx-remote, lucide-react |
| `next.config.ts` | MDX support via `@next/mdx` with remark-gfm |
| `tailwind.config.ts` | Dark mode: `class`, Geist font vars, content paths |
| `app/layout.tsx` | Root layout — **needs font + nav update** |
| `app/globals.css` | Tailwind directives + prose/code base styles |
| `app/page.tsx` | Hero/About — **needs full redesign to match new design system** |
| `app/experience/page.tsx` | Timeline layout driven by `data/experience.ts` — **needs styling update** |
| `app/projects/page.tsx` | Projects listing — **needs masonry + hover reveal** |
| `app/projects/[slug]/page.tsx` | MDX-rendered project pages via `next-mdx-remote/rsc` |
| `app/blog/page.tsx` | Chronological blog list with reading time |
| `app/blog/[slug]/page.tsx` | MDX-rendered blog posts via `next-mdx-remote/rsc` |
| `app/gallery/page.tsx` | Photo gallery from `public/gallery/photos.json` |
| `components/Sidebar.tsx` | **TO BE REPLACED** with top nav component |
| `components/Footer.tsx` | Social icons + resume download — **needs resume link added** |
| `components/ThemeToggle.tsx` | Dark/light toggle with `localStorage` + system preference fallback |
| `components/ProjectsGrid.tsx` | Client component — **needs masonry layout + hover reveal** |
| `components/GalleryGrid.tsx` | Client component — masonry grid + lightbox with keyboard nav |
| `components/mdx/ProjectImage.tsx` | MDX component: optimized image with optional caption |
| `components/mdx/VideoEmbed.tsx` | MDX component: YouTube/Vimeo embed |
| `components/mdx/Callout.tsx` | MDX component: callout box |
| `lib/mdx.ts` | Server utilities: `getAllProjects()`, `getAllBlogPosts()`, slug discovery |
| `data/experience.ts` | Experience entries — replace with real data |
| `content/projects/line-following-robot/` | Sample project MDX |
| `content/blog/first-pcb-lessons/` | Sample blog post MDX |
| `public/gallery/photos.json` | Empty gallery manifest |

---

### Placeholder content to replace

- Top nav component — name ("Andreas Li"), GitHub/LinkedIn/email URLs
- `app/page.tsx` — name, bio paragraphs, highlights list, social URLs
- `data/experience.ts` — real internship/job entries
- Resume: add `public/resume.pdf`
- Projects: replace sample with real MDX entries in `content/projects/`
- Blog: replace sample with real posts in `content/blog/`
- Gallery: add images to `public/gallery/` and update `photos.json`

---

## Layout Architecture

### Navigation (Top Bar — replaces sidebar)

```
┌─────────────────────────────────────────────────────────┐
│  ANDREAS LI          experience  projects  blog  gallery  [↓ Resume] │
└─────────────────────────────────────────────────────────┘
```

- Fixed top bar with white/80 background + backdrop blur
- Name: font-display extrabold uppercase tracking-tight text-sm
- Links: font-mono text-xs uppercase tracking-widest, neutral-400 → neutral-900 on hover
- Resume button: filled black (bg-neutral-900), download icon + "RESUME" text
- Mobile: collapses to hamburger menu

### Page Structure

```
[Top Nav — fixed]
[Hero — large name, subtitle, intro, highlights, socials]
[── divider ──]
[Experience — timeline]
[── divider ──]
[Projects — masonry gallery with filters]
[── divider ──]
[Contact — heading, description, LinkedIn + Email buttons]
[Footer — copyright, social links, resume link]
```

### Footer

```
┌─────────────────────────────────────────────────────────┐
│  © 2026 Andreas Li                    GitHub  LinkedIn  Email  Resume │
└─────────────────────────────────────────────────────────┘
```

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

For static export (self-hosted deployment):
```bash
npm run build      # Generates static output when output: 'export' is set in next.config.js
```

## Architecture

### Routing (App Router)

| Route | Purpose |
|---|---|
| `/` | Hero/About — intro, highlights, social links, resume download |
| `/experience` | Timeline of roles from a data file |
| `/projects` | Filterable masonry card grid |
| `/projects/[slug]` | MDX project write-up |
| `/blog` | Chronological post list |
| `/blog/[slug]` | MDX blog post |
| `/gallery` | Masonry/grid photo gallery with lightbox |

### Content Layer

MDX files live in `content/` co-located with their assets:

```
content/
  projects/
    [slug]/
      index.mdx        ← frontmatter: title, description, date, tags, thumbnail, featured
      thumbnail.jpg
      *.png / *.jpg
  blog/
    [slug]/
      index.mdx        ← frontmatter: title, date, description, tags
      *.jpg
```

Gallery images live in `public/gallery/` with an optional `photos.json` manifest.
Resume PDF lives at `public/resume.pdf`.

### Data-Driven Sections

Experience section is driven by a data file (`data/experience.ts`). Each entry has: company, role, start/end dates, skills tags (array), and a multi-paragraph description.

### Custom MDX Components

Project pages support: `<ProjectImage>`, `<VideoEmbed>`, `<Callout>`.

### Dark/Light Mode

- Light mode default
- Respect system preference by default (`prefers-color-scheme`)
- Store manual toggle in `localStorage`
- Implement via Tailwind's `darkMode: 'class'` strategy

## Deployment

**Vercel (recommended):** Connect GitHub repo for automatic deploys. Custom domain via DNS CNAME/A record.

**Self-hosted (static):** Set `output: 'export'` in `next.config.js`, run `next build`, serve the `out/` directory.
