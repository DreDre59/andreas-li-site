# PRD: Personal Portfolio Website

## Overview

A personal portfolio website for Andreas Li, a mechatronics and robotics engineering professional. The site should showcase technical projects, professional experience, and personal interests — presenting both competence and personality. The tone is confident but approachable.

---

## Design Philosophy

- **Bold and modern** — magazine-like typography, generous whitespace, gallery-forward layout
- **Content-first** — the work speaks for itself; UI supports rather than distracts
- **Personal but professional** — technical credibility balanced with a human, approachable feel
- **Reference sites:**
  - [shayaanazeem.com](https://www.shayaanazeem.com/) — highlighted keyword badges, card-based content, casual-confident tone
  - [cam-hicks.com](https://www.cam-hicks.com/work) — bold type, generous whitespace, gallery-forward
  - [danielsun.space](https://danielsun.space/) — large name treatment, full-width layout
  - [jeremysu.ca](https://www.jeremysu.ca/) — masonry gallery aesthetic, curated portfolio feel
  - [lisovskiy.work](https://lisovskiy.work/) — minimal top nav, image-heavy project grid

---

## Design System

### Typography

- **Display font:** Bricolage Grotesque (Google Fonts) — extrabold (800), uppercase, tight tracking for the hero name and section headings
- **Body font:** Bricolage Grotesque — regular (400) weight for paragraphs and descriptions
- **Monospace font:** DM Mono (Google Fonts) — used for navigation links, tags, dates, metadata, and filter buttons
- **Experience job titles:** Bricolage Grotesque medium (500) weight, normal case — deliberately softer than section headings

### Color Palette

Neutral-only base palette with soft colored keyword badges:

- **Base:** black, white, and grays (neutral-100 through neutral-900)
- **No primary accent color** — visual interest comes from typography weight contrast and keyword badge colors
- **Keyword badges:** soft pastel backgrounds (amber-50, sky-50, emerald-50, violet-50, rose-50) with matching darker text
- **Buttons:** filled black (bg-neutral-900) or outlined (border-2 border-neutral-900) with hover inversion

### Component Styling

- **No border-radius** on cards, buttons, tags, or filter pills — sharp corners throughout
- **Em dash (—)** bullets for highlight lists
- **Square dots** on the experience timeline (not circles)
- **Hover reveal** on project cards — dark overlay with title, description, and tags
- **Thin dividers** (border-t border-neutral-100) between major sections

---

## Tech Stack

| Layer        | Technology             | Rationale                                                |
| ------------ | ---------------------- | -------------------------------------------------------- |
| Framework    | **Next.js (App Router)** | SSG/SSR flexibility, great DX, file-based routing       |
| Content      | **MDX**                | Write project pages and blog posts in markdown with embedded React components |
| Styling      | **Tailwind CSS**       | Rapid, consistent styling with utility classes           |
| Deployment   | **Vercel** or **Self-hosted (static export)** | Vercel for zero-config; self-hosted if preferred (see Deployment section) |
| Images       | **next/image**         | Automatic optimization, lazy loading                     |
| Icons        | **Lucide React**       | Clean, consistent icon set                               |
| Display Font | **Bricolage Grotesque** | Bold, modern, magazine-like grotesque sans-serif        |
| Mono Font    | **DM Mono**            | Clean monospace for metadata and technical elements      |

---

## Site Structure

```
/                     → Home / About (hero + highlights)
/experience           → Professional experience timeline
/projects             → Filterable project gallery (masonry)
/projects/[slug]      → Individual project write-up (MDX)
/blog                 → Blog post listing
/blog/[slug]          → Individual blog post (MDX)
/gallery              → Photo gallery
```

---

## Feature Specifications

### 1. About / Hero Section (Home Page)

**Purpose:** First impression — who you are, what you do, and why someone should keep scrolling.

**Requirements:**
- Name "ANDREAS LI" displayed as a large, bold, uppercase heading (Bricolage Grotesque extrabold, responsive size clamp(4rem, 11vw, 9rem))
- Subtitle "Mechatronics & Robotics Engineer" in DM Mono, small, uppercase, tracked, neutral-400
- 2–3 sentence intro with inline highlighted keyword badges (soft colored backgrounds)
- Highlights section with em dash (—) bullet list of key accomplishments, each with a colored badge for the key term
- Social links row: GitHub, LinkedIn, Email — styled as monospace uppercase links
- Navigation links to all major sections via top bar

**Content notes:**
- Keep the tone casual but confident (e.g., "i build things that move, think, and interact with the real world")
- Highlighted keywords use soft colored backgrounds to draw attention to key terms

---

### 2. Experience Section

**Purpose:** Provide a concise professional overview for recruiters and collaborators. Displayed before projects to establish professional credibility first.

**Requirements:**
- **Vertical timeline layout** with each role as a node, ordered chronologically (most recent first)
- Square dots (not circles) as timeline markers
- Each entry includes:
  - Company name (text-sm, neutral-500)
  - Duration in DM Mono (text-xs, neutral-400, uppercase tracking-widest, e.g., "MAY 2025 — AUG 2025")
  - Job title in Bricolage Grotesque medium weight (text-xl, normal case — softer than section headings)
  - Skills/technologies as bordered tags (DM Mono, text-xs, border border-neutral-200)
  - A space for a brief multi-paragraph description (2–3 paragraphs, text-sm, neutral-500/600, relaxed leading, max-w-lg)
- Keep this section on a single page (no sub-pages needed)
- Data driven by `data/experience.ts` for easy updates, with the description field supporting line breaks for paragraphs

---

### 3. Projects Section

**Purpose:** The centerpiece of the site. Demonstrate technical depth and breadth.

**Requirements:**

#### Project Listing Page (`/projects`)
- **Masonry grid layout** (CSS columns-3) with varying aspect ratios for a gallery feel
- Each card shows: thumbnail placeholder, with project title/description/tags revealed on hover via dark overlay (neutral-900 at 95% opacity)
- **Filterable by tag** — monospace uppercase filter buttons, active filter inverts to black (bg-neutral-900 text-white)
- Section header with project count in monospace (e.g., "06 PROJECTS")
- Cards link to full project write-up pages

#### Individual Project Page (`/projects/[slug]`)
- Rendered from an MDX file located in `content/projects/`
- Frontmatter metadata:
  ```yaml
  title: "Autonomous Line-Following Robot"
  description: "A short one-liner for the card."
  date: "2025-01-15"
  tags: ["ROS2", "Embedded C", "PCB Design"]
  thumbnail: "./thumbnail.jpg"
  featured: true
  ```
- Content supports:
  - Inline images and image galleries (co-located in the project folder)
  - Embedded YouTube/Vimeo videos
  - Code blocks with syntax highlighting
  - Custom MDX components (e.g., `<ProjectImage>`, `<VideoEmbed>`, `<Callout>`)
- "Back to Projects" navigation link

**Content organization:**
```
content/
  projects/
    line-following-robot/
      index.mdx
      thumbnail.jpg
      wiring-diagram.png
      final-build.jpg
    autonomous-drone/
      index.mdx
      thumbnail.jpg
      ...
```

---

### 4. Blog Section

**Purpose:** Demonstrate communication skills, share technical knowledge, and show intellectual curiosity.

**Requirements:**

#### Blog Listing Page (`/blog`)
- Chronological list of blog posts (newest first)
- Each entry shows: title, date, short excerpt or description, and reading time estimate
- Clean, readable layout — no need for complex filtering unless the blog grows significantly

#### Individual Blog Post (`/blog/[slug]`)
- Rendered from MDX files in `content/blog/`
- Frontmatter metadata:
  ```yaml
  title: "What I Learned Building My First PCB"
  date: "2025-03-10"
  description: "A short excerpt for the listing page."
  tags: ["electronics", "lessons-learned"]
  ```
- Full MDX support (images, code blocks, custom components)
- Reading time displayed at top

**Content organization:**
```
content/
  blog/
    first-pcb-lessons/
      index.mdx
      board-v1.jpg
      board-v2.jpg
    ...
```

---

### 5. Gallery Section

**Purpose:** Show personality and interests beyond engineering. Makes the site memorable and human.

**Requirements:**
- Masonry or responsive grid layout of photos
- Photos can optionally have captions and/or dates
- Lightbox view on click (fullscreen image with navigation between photos)
- Images stored in `public/gallery/` or managed via a simple data file mapping filenames to captions
- Easy to add new photos — just drop an image file and optionally update a manifest

**Content organization:**
```
public/
  gallery/
    photos.json          ← optional manifest: [{src, caption, date}]
    img-001.jpg
    img-002.jpg
    ...
```

---

### 6. Contact Section

**Purpose:** Make it easy for people to reach out.

**Requirements:**
- Displayed as a section on the home page (above footer)
- Section heading in Bricolage Grotesque extrabold uppercase ("LET'S CONNECT")
- Brief one-liner: "Interested in collaborating, have a question, or just want to say hello?"
- Two outlined CTA buttons: "LinkedIn →" and "Email →" (border-2 border-neutral-900, hover invert)
- Keep it simple — no contact form needed initially

---

### 7. Resume Download

**Requirements:**
- A filled black button with download icon + "RESUME" label in the **top navigation bar**
- A text link labeled "Resume" in the **footer** alongside social links
- Both link to a PDF stored at `public/resume.pdf`
- Update process: simply replace the file at `public/resume.pdf`

---

## Global Elements

### Navigation (Top Bar)
- **Fixed top bar** with white/80 background + backdrop-blur
- Name "ANDREAS LI" on the left (Bricolage Grotesque extrabold, uppercase, text-sm)
- Section links on the right: Experience, Projects, Blog, Gallery (DM Mono, text-xs, uppercase, tracking-widest)
- Resume download button on the far right (filled black, download icon)
- Mobile: collapses to hamburger/drawer menu

### Footer
- Social links: GitHub, LinkedIn, Email, Resume (all DM Mono, text-xs, uppercase, tracking-widest)
- Copyright: "© 2026 Andreas Li" (DM Mono, text-xs, neutral-300)

### Section Dividers
- Thin horizontal lines (border-t border-neutral-100) between all major sections
- Contained within max-w-7xl mx-auto px-8

### Responsive Design
- Mobile-first approach
- All sections must work well on phone, tablet, and desktop
- Navigation collapses to hamburger/drawer on mobile
- Project masonry grid adjusts column count by breakpoint (1 col mobile, 2 col tablet, 3 col desktop)
- Gallery grid adjusts similarly

### SEO & Performance
- Proper meta tags and Open Graph tags per page
- next/image for all images (optimization, lazy loading, proper sizing)
- Static generation where possible (SSG) for fast load times
- Semantic HTML throughout

### Dark/Light Mode (Nice-to-Have)
- Light mode default
- Toggle in navigation
- Respect system preference by default
- Store preference in localStorage

---

## Deployment Options

The owner already has a custom domain name purchased.

### Option A: Vercel (Recommended for simplicity)
- Connect GitHub repo → automatic deploys on every push
- Automatic SSL, CDN, preview deploys
- Point custom domain via DNS (CNAME or A record to Vercel)
- Zero server maintenance

### Option B: Self-Hosted (via personal contact's server)
- Use `next build` + `next start` behind a reverse proxy (Nginx or Caddy) for dynamic Next.js features
- **OR** use `next export` (static output) to generate plain HTML/CSS/JS files — the server only needs to serve static files, which is simpler and more reliable
- Requires manual setup for: SSL certificates (Let's Encrypt / Certbot), Node.js runtime (if not using static export), build pipeline (manually run builds or set up a webhook from GitHub), CDN (optional but recommended — Cloudflare free tier works well in front of any origin server)
- Point custom domain DNS to the server's IP address

**Recommendation:** If going self-hosted, prefer static export (`output: 'export'` in `next.config.js`) unless server-side features (API routes, ISR) are specifically needed. A fully static site is the most portable and lowest-maintenance option. Note: static export means no server-side API routes — any dynamic features (like a contact form backend) would need an external service.

---

## Phased Build Plan

### Phase 1: Foundation — ✅ COMPLETE
- [x] Initialize Next.js project with TypeScript, Tailwind CSS, and MDX support
- [x] Set up project structure (`content/`, `components/`, `app/`)
- [x] Create global layout with navigation and footer
- [x] Configure MDX processing pipeline and custom components

### Phase 1.5: Design System Update — ✅ COMPLETE
- [x] Replace Geist fonts with Bricolage Grotesque + DM Mono
- [x] Replace sidebar navigation with fixed top navigation bar
- [x] Redesign hero section: large bold name, monospace subtitle, em dash highlights, keyword badges
- [x] Update experience timeline: square dots, medium-weight job titles, monospace dates, skills at bottom
- [x] Update projects grid: masonry layout (CSS columns-3), sharp corners, hover reveal overlay
- [x] Add resume button to top nav and resume link to footer
- [x] Apply neutral color palette and sharp-corner patterns throughout
- [x] Add contact section above footer
- [x] Merge hero, experience, projects, and contact into single scrollable home page with anchor nav
- [x] Style individual project pages (`/projects/[slug]`) to match design system
- [x] Remove standalone `/projects` listing page (nav links to `/#projects` section)

### Phase 2: Core Content Pages
- [ ] Populate About/Hero section with real content
- [ ] Populate Experience section with real internship data
- [ ] Add real project MDX files with images
- [ ] Validate project filtering and individual project pages

### Phase 3: Blog & Gallery
- [ ] Populate blog with real posts
- [ ] Add gallery images and captions
- [ ] Test lightbox and masonry layouts

### Phase 4: Polish & Deploy
- [ ] Responsive testing and fixes across breakpoints
- [ ] SEO: meta tags, Open Graph, sitemap
- [ ] Performance audit (Lighthouse)
- [ ] Dark/light mode (optional)
- [ ] Final design pass: typography, spacing, color consistency
- [ ] Configure deployment (Vercel or self-hosted — see Deployment Options)
- [ ] Point custom domain to hosting

---

## Content Checklist (For Andreas to Prepare)

- [ ] Resume PDF
- [ ] About section text (intro + highlights)
- [ ] For each project: title, description, tags, thumbnail, and write-up content with images
- [ ] For each internship: company, role, dates, description, technologies
- [ ] Blog posts (can start with 1–2)
- [ ] Gallery photos with optional captions
- [ ] Social profile URLs (GitHub, LinkedIn, email)
- [ ] Headshot or personal photo (optional, for About section)
