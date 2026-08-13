# Portfolio Redesign — Design

**Date:** 2026-08-12
**Status:** Approved (design decisions confirmed by user in brainstorming session)
**Scope:** Full redesign of the paulklemstine.web.app portfolio — new multi-page structure, bold "neon-grid AI terminal" visual system, content grounded in the real 2026 résumé/cover letter, downloadable résumé PDFs, and a new Tyrant AI project card with a featured showcase.

---

## 1. Goal

Turn the current one-page dark-glass portfolio into a bold, distinctive, multi-page site that sells Paul Klemstine to employers across AI/LLM engineering, senior full-stack, and startup roles — leading with the strongest signal (autonomous AI systems) while keeping the full-stack, embedded, and leadership history visible.

## 2. Source Material

User-provided authoritative content (grounds the redesign in reality):

- `/mnt/c/Users/paulk/Downloads/PK Resume 2026.pdf` → copied to repo as `resume.pdf`
- `/mnt/c/Users/paulk/Downloads/PKlemstine Cover Letter 2026.pdf` → copied to repo as `cover-letter.pdf`
- Career summary (from résumé): *"Senior Software Engineer with 10+ years of experience designing and building scalable mobile applications, backend systems, cloud infrastructure, and machine vision solutions. Strong background in Java, Android development, AWS cloud architecture, Docker, embedded Linux, and artificial intelligence."*
- Narrative voice (from cover letter): *"taking ideas from concept to production"* and *"building reliable, production-ready software that makes AI useful for everyday users."*

## 3. Questionnaire Decisions (confirmed)

| Decision | Choice |
|---|---|
| Target roles | All (AI/LLM, senior full-stack, startup) — lead with AI systems |
| Visual style | Bold & distinctive → **Neon-grid AI terminal** |
| Structure | **Multi-page rebuild** |
| Architecture | **Static pages, no build step** |
| Résumé CTA | **Link to downloadable real PDFs** (résumé + cover letter) |
| Featured showcase | **Tyrant AI** featured on home |
| Caregiver role (2022–2024) | **Include briefly** on About timeline |
| Pythagorean Cosmos | **Re-enable** as a project card |
| Cover letter PDF | **Add both PDFs** |

## 4. Site Architecture

Static multi-page site, no build step. Firebase hosting `public = "."` stays unchanged.

```
portfolio/
├── index.html        Home — hero + featured Tyrant AI showcase + selected projects + skills ticker
├── projects.html     All 6 project cards (rendered from js/projects.js)
├── about.html        Professional summary + experience timeline + skills grid + contact
├── resume.html       NOT built — superseded by downloadable PDFs (see §9)
├── resume.pdf        ← copied from "PK Resume 2026.pdf"
├── cover-letter.pdf  ← copied from "PKlemstine Cover Letter 2026.pdf"
├── css/style.css     Rewritten design system (neon-grid)
├── js/main.js        Nav/footer injection + scroll/parallax/marquee interactions
├── js/projects.js    Project data array — single source of truth for all cards
├── img/              profile.jpg, alethean.png, flowspace.png, geems.png, tyrant.png (+ icons)
├── docs/             This spec — MUST be ignored by firebase (see §9)
└── firebase.json     Add "docs" to the hosting ignore list
```

**Chrome:** nav (`Home · Projects · About · [Résumé ↓]`) and footer injected by `js/main.js` from a single source so the pages stay DRY. The site already depends on JS for motion, so this is an accepted dependency.

## 5. Visual System — "Neon-grid AI terminal"

**Tokens:**
- Base: near-black `#05060a`, panels `#0a0b12`, hairline borders `rgba(255,255,255,.08)`
- Neon trio: violet `#8b5cf6`, cyan `#22d3ee`, pink `#ec4899` (gradients + glows)
- Type: **Space Grotesk** (display headlines), **Outfit** (body), **JetBrains Mono** (kickers/labels)
- Backdrop: keep + refine noise and glow orbs; add a subtle **perspective grid** layer

**Signature components:**
- Oversized gradient headline with mono kicker above (`> senior software engineer / ai systems architect`)
- Terminal-style labels (`// selected_projects`, `$ status:`), scanline accents
- **Neon-border cards**: gradient top edge, glow on hover, lift — projects, skills, experience
- **Block gradient CTA buttons** with glow shadow (`[ View Projects ⚡ ] [ Résumé ↓ ]`)
- **Tech-stack ticker** (marquee) selling breadth
- Status-bar footer with contact links (Appleton WI · email · GitHub · LinkedIn)

## 6. Page-by-Page Content

### Home (`index.html`)
1. **Hero** — profile pic, kicker `> senior software engineer / ai systems architect`, huge headline *"Building Intelligent, Production-Grade Systems"*, sub-line (concept → production), CTAs `[View Projects ⚡]` `[Résumé ↓]`, mono status line (`// embedded → cloud → autonomous AI`).
2. **Featured Tyrant AI showcase** — large neon-bordered panel: starting-map screencap, headline *"Watch an autonomous AI hero play a classic roguelike — live in your browser"*, 2–3 sentences on the LLM planner + deterministic reflex brain + subgoal/pathfinding, tech tags, CTA to `tyrantai.web.app`.
3. **Selected projects preview** — 3 cards (Alethean Research, Geems, Flow Space) + "View all projects →".
4. **Skills ticker** — scrolling marquee of the résumé's tech stack.
5. **Contact/footer** — email, phone, GitHub, LinkedIn, résumé + cover-letter download links.

### Projects (`projects.html`)
All 6 cards, rendered from `js/projects.js`, sorted featured-first:
1. **Tyrant AI** — featured
2. **Alethean Research** (alethean.org)
3. **Geems** (geems.web.app)
4. **Flow Space** (flowspace.web.app)
5. **L.O.V.E.** (bsky.app)
6. **Pythagorean Cosmos** (re-enabled; archive link)

### About (`about.html`)
- Professional summary (real résumé career summary, sharpened)
- Experience timeline (real roles, most-relevant first):
  - Senior Software Engineer — Dodl.es / Pound.Social (Jan 2018 – Sep 2019)
  - Solutions Developer — ZyQuest; IT Consultant (Contract) — Schneider National (Jun 2017 – Jan 2018)
  - Chief Technology Officer — Dodl.es (Apr 2016 – Apr 2017)
  - Software Engineer — LIVEALITY (Oct 2013 – Apr 2016)
  - President / CTO — Appleton Makerspace (Mar 2012 – Jun 2014)
  - **In-Home Caregiver (Oct 2022 – Oct 2024)** — include briefly (character/gap honesty)
- Skills grid — the résumé's five groups (Languages · AI & ML · Web & Apps · DevOps · Hardware)
- Contact CTA + PDF downloads

## 7. Project Data Model (`js/projects.js`)

```js
{
  id: 'tyrant-ai',
  name: 'Tyrant AI',
  tagline: 'An autonomous AI hero playing a classic roguelike — live in your browser',
  description: '…(selling copy)…',
  tags: ['Java', 'CheerpJ/WASM', 'LLM planning', 'RL-trained reflexes', 'Goal-tree pathfinding'],
  url: 'https://tyrantai.web.app',
  image: 'img/tyrant.png',
  icon: '⚔️',
  featured: true
}
```

`js/main.js` renders cards into `.projects-grid` (projects page) and `.featured-grid` / `.preview-grid` (home). Image mapping:

| Project | Image |
|---|---|
| Tyrant AI | `img/tyrant.png` ← copy `tyrant-ai/tyrant-src/screencaps/tyrant-starting-map.png` |
| Alethean Research | `img/alethean.png` (exists) |
| Geems | `img/geems.png` (exists) |
| Flow Space | `img/flowspace.png` (exists) |
| L.O.V.E. | icon only (💗); optionally fetch avatar from Bluesky CDN |
| Pythagorean Cosmos | icon only (📐) |

## 8. Featured Tyrant AI Showcase (Home)

Large bordered panel. Uses `tyrant-starting-map.png`. Copy angle: *a 1997 classic roguelike recompiled to WebAssembly (CheerpJ), now autonomous — an LLM plans quests/routing/shopping, a deterministic reflex brain trained by offline scenario RL handles combat/survival, and a subgoal goal-tree + pathfinder stops the hero thrashing.* Links to `tyrantai.web.app`.

## 9. Résumé & Cover Letter PDFs

- Copy `PK Resume 2026.pdf` → `resume.pdf`; copy `PKlemstine Cover Letter 2026.pdf` → `cover-letter.pdf`.
- Nav **Résumé** button + hero CTA download `resume.pdf`. Cover letter linked from footer.
- `resume.html` **not built** — real PDFs supersede it.
- **Add `"docs"` to `firebase.json` ignore list** so the spec (and this design doc) never deploys publicly.

## 10. Implementation & Verification

**Implementation steps:**
1. Copy PDFs (`resume.pdf`, `cover-letter.pdf`) and Tyrant screencap (`img/tyrant.png`).
2. Rewrite `css/style.css` with the neon-grid design system (tokens, components, responsive).
3. Rewrite `js/main.js` (nav/footer injection, interactions, marquee, card rendering) and add `js/projects.js` with all 6 projects.
4. Build `index.html`, `projects.html`, `about.html` (keep existing assets where unchanged: `img/profile.jpg` and hero imagery; replace summary/timeline/skills text with résumé-sourced content from §6).
5. Update `firebase.json` ignore list to include `docs`.

**Verification (before commit/push/deploy):**
- Serve locally (`python3 -m http.server`), confirm all pages render with no console errors.
- All nav links and project URLs resolve (no 404s).
- Cards render all 6 projects from data; images load.
- Responsive at 360 / 768 / 1280 widths.
- PDFs download correctly; `docs/` is not deployed.
- Re-run current `deploy.sh`; curl the live site to confirm pages + PDFs are up.

## 11. Non-Goals

- No testimonials section (not requested).
- No heavy metrics band (light numbers may appear naturally, e.g. "5,052 machine-verified theorems" on Cosmos).
- No build toolchain, no framework, no interactive game embed (Tyrant AI links out to tyrantai.web.app).
- No contact form.
