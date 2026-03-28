# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Andreas Li — mechatronics and robotics engineering professional. Built with Next.js (App Router), MDX, and Tailwind CSS.

**Important:** Only the anchor sections on the home page matter (`/#experience`, `/#projects`, `/#contact`). The standalone pages `/experience` and `/projects` are not used — do not prioritize or update them.

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

- **Wide banner profile photo** in the hero section, placed between the name/subtitle and the intro text:
  - Full-width within max-w-7xl container, h-72, object-cover, object-top
  - Sharp corners (no border-radius)
  - Stored at `public/photos/profile.jpg`, rendered with `next/image`
  - Adds mt-10 below the name, mt-12 above the intro
- **No border-radius** on project cards, buttons, tags, or filter pills — sharp corners throughout for an architectural feel
- **Em dash (—)** bullets for highlight lists, not numbers or standard bullets
- **Company logos as timeline markers** in the experience section — replaces square dots:
  - Logos displayed at 48x48, rounded-sm, border border-neutral-200, subtle shadow
  - Stored in `public/logos/`:
    - `tesla.png` — Tesla
    - `sirrl.png` — UWaterloo SIRRL
    - `martinrea.png` — Martinrea International
  - Thin vertical line connects logos down the timeline; line stops at the last entry
  - Use `next/image` for rendering
- **Monospace counters** for section metadata (e.g., "03 roles", "06 projects")
- **Hover reveals** on project gallery cards — dark overlay with title, description, and tags
- **Thin dividers** (border-t border-neutral-100) between major sections

### Animations (motion.dev)

Subtle, clean entrance animations using the `motion` library. All animations use `easeOut` curves, no bouncing or spring physics — just opacity + translateY.

- **Hero title** (`AnimatedHeroTitle`): "Andreas" and "Li" fade in and slide up (40px, 0.7s) with a 0.15s stagger. Subtitle fades in after 0.4s delay.
- **Hero content** (`AnimatedHeroContent`): About text and highlights fade in together (0.6s, 0.5s delay after title).
- **Keyword badges** (`AnimatedBadge`): Start as plain text (neutral-500, transparent background). When each badge scrolls into view (`useInView`), its colored background and text fade in (0.75s). Badges within a group have small stagger delays (0.1–0.4s).
- **Profile photo**: Fades in with the hero content (0.5s delay) via `FadeIn` wrapper.
- **Section headings**: "Experience", "Projects", "Let's Connect" each fade up 24px on scroll via `FadeIn` wrapper with `whileInView`.
- **`FadeIn` component**: Reusable client component wrapper — configurable `delay`, `y` offset, `duration`, and `once` (default true). Uses `whileInView` with `-50px` viewport margin.
- **Project tag filters**: Currently commented out (disabled).
- **Gallery photos**: Full color (no grayscale filter), scale-up on hover.

## Tech Stack

- **Next.js 15 (App Router)** with TypeScript
- **MDX** for project and blog content
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **next/image** for all images
- **Bricolage Grotesque** (Google Fonts) for display/body
- **DM Mono** (Google Fonts) for metadata/nav
- **Motion** (motion.dev) for animations

## Build Status

**Phase 1: Foundation — COMPLETE**

The project has been fully scaffolded and builds successfully (`npm run build` passes with 10 static pages). The dev server runs on `http://localhost:3000`.

> Note: `npx create-next-app` was bypassed due to the directory name "Codebase" containing capitals (npm naming restriction). All config files were created manually.
> Node.js is at `C:\Program Files\nodejs\` — not on the default bash PATH. Prefix commands with `export PATH="/c/Program Files/nodejs:$PATH"` or run from a standard terminal.

**Phase 1.5: Design System Update — COMPLETE**

All design system updates have been applied. The site uses Bricolage Grotesque + DM Mono fonts, a fixed top nav, neutral color palette, and sharp-corner component patterns throughout.

**Phase 1.75: Experience Logo Update — PENDING**

- [ ] Add logo files to `public/logos/` (tesla.png, sirrl.png, martinrea.png)
- [ ] Add a `logo` field to each entry in `data/experience.ts` (filename string, e.g., "tesla.png")
- [ ] Update the experience timeline component to replace square dots with company logo images
- [ ] Logo rendering: 48x48, rounded-sm, border border-neutral-200, shadow-sm, using `next/image`
- [ ] Thin vertical line (w-px bg-neutral-200) connects logos; line stops at the last entry
- [ ] Update both the home page experience section and the standalone `/experience` page
- [ ] Add profile photo to hero section as wide banner (`public/photos/profile.jpg`, full-width, h-72, object-cover object-top)

### What's been built

| File/Directory | Description |
|---|---|
| `package.json` | Dependencies: Next.js 15, React 19, Tailwind 3, gray-matter, reading-time, next-mdx-remote, lucide-react |
| `next.config.ts` | MDX support via `@next/mdx` with remark-gfm |
| `tailwind.config.ts` | Dark mode: `class`, Bricolage Grotesque + DM Mono font vars, content paths |
| `app/layout.tsx` | Root layout with Bricolage Grotesque + DM Mono, TopNav + Footer |
| `app/globals.css` | Tailwind directives + prose/code base styles |
| `app/page.tsx` | Single-page layout: Hero, Experience, Projects, Contact — all sections with anchor IDs |
| `app/experience/page.tsx` | Standalone experience page (matches home page styling) |
| `app/projects/[slug]/page.tsx` | MDX-rendered project pages, styled to match design system |
| `app/blog/page.tsx` | Chronological blog list with reading time |
| `app/blog/[slug]/page.tsx` | MDX-rendered blog posts via `next-mdx-remote/rsc` |
| `app/gallery/page.tsx` | Photo gallery from `public/gallery/photos.json` |
| `components/TopNav.tsx` | Fixed top nav — name left, anchor links (experience/projects) + page links (blog/gallery) + resume button right, mobile hamburger |
| `components/Footer.tsx` | Social icons + resume download link |
| `components/ThemeToggle.tsx` | Dark/light toggle with `localStorage` + system preference fallback |
| `components/ProjectsGallery.tsx` | Client component — masonry grid (CSS columns-3), hover reveal overlay, tag filters (currently commented out) |
| `components/ProjectsGrid.tsx` | Legacy client component (replaced by ProjectsGallery on home page) |
| `components/GalleryGrid.tsx` | Client component — masonry grid + lightbox with keyboard nav |
| `components/AnimatedHeroTitle.tsx` | Client component — hero name fade-in + slide-up animation with stagger |
| `components/AnimatedHeroContent.tsx` | Client component — about/highlights with animated keyword badges |
| `components/AnimatedBadge.tsx` | Client component — badge that starts as plain text, fades to colored on scroll (`useInView`) |
| `components/FadeIn.tsx` | Reusable client component — `whileInView` fade-up wrapper with configurable delay/duration/offset |
| `components/Sidebar.tsx` | Legacy sidebar (replaced by TopNav) |
| `components/mdx/ProjectImage.tsx` | MDX component: optimized image with optional caption |
| `components/mdx/VideoEmbed.tsx` | MDX component: YouTube/Vimeo embed |
| `components/mdx/Callout.tsx` | MDX component: callout box |
| `lib/mdx.ts` | Server utilities: `getAllProjects()`, `getAllBlogPosts()`, slug discovery |
| `data/experience.ts` | Experience entries — **needs logo field added** |
| `content/projects/line-following-robot/` | Sample project MDX |
| `content/blog/first-pcb-lessons/` | Sample blog post MDX |
| `public/gallery/photos.json` | Empty gallery manifest |
| `public/logos/` | **TO BE ADDED** — tesla.png, sirrl.png, martinrea.png |

---

### Placeholder content to replace

- Top nav component — name ("Andreas Li"), GitHub/LinkedIn/email URLs
- `app/page.tsx` — name, bio paragraphs, highlights list, social URLs
- `data/experience.ts` — real internship/job entries:
  1. Tesla — Vehicle Design Engineering Intern
  2. UWaterloo SIRRL — Research Assistant
  3. Martinrea International — Mechatronics Engineering Intern
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

### Page Structure (Single Scrollable Home Page)

```
[Top Nav — fixed, experience/projects use anchor links, blog/gallery are page links]
[Hero — large name, subtitle, wide banner profile photo, intro, highlights, socials]
[── divider ──]
[Experience (#experience) — timeline with company logos as markers, skills at bottom]
[── divider ──]
[Projects (#projects) — masonry gallery with filters and hover reveal]
[── divider ──]
[Contact (#contact) — heading, description, LinkedIn + Email buttons]
[Footer — copyright, social links, resume link]
```

Note: `/projects` listing page has been removed. Nav links to `/#projects` section. Individual project pages still at `/projects/[slug]`.

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
| `/` | Single-page: Hero, Experience (#experience), Projects (#projects), Contact (#contact) |
| `/experience` | Standalone experience page (same styling as home section) |
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
Company logos live in `public/logos/` (tesla.png, sirrl.png, martinrea.png).

### Data-Driven Sections

Experience section is driven by a data file (`data/experience.ts`). Each entry has: company, role, start/end dates, skills tags (array), logo filename (string referencing `public/logos/`), and a multi-paragraph description.

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
