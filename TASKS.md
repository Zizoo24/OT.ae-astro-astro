# OnlineTranslation.ae - Task Backlog

This document tracks all tasks for the project, organized by status.

---

## Completed Tasks

### Session: December 2024 - Component Architecture & CSS Fixes

| Task | Description | Notes |
|------|-------------|-------|
| Fix Vercel icons | Updated manifest.webmanifest and favicon links to match actual icon filenames | All icon paths now return HTTP 200 |
| Remove duplicate CSS directory | Deleted `src/styles/` which had outdated CSS conflicting with canonical `public/styles/` | Eliminates old whatsappPulse animation and other regressions |
| Fix mobile sticky bar | Restored mobile bottom navigation functionality | CSS selectors corrected |
| Fix homepage transparent navigation | Changed CSS targeting from `body.homepage` to `.header-homepage` for more reliable styling | Coral announcement bar stays coral, main nav transparent with white text before scroll |
| Create PageHero component | Reusable hero for category pages with breadcrumbs, supports dark/light themes | `src/components/PageHero.astro` |
| Create ServiceHero component | Detailed hero for service pages with badges, CTAs, and trust bars | `src/components/ServiceHero.astro` |
| Create CTASection component | Consistent WhatsApp call-to-action sections across pages | `src/components/CTASection.astro` |
| Migrate locations page | Converted to use new reusable PageHero and CTASection components | Proof of concept for component pattern |
| Service worker v148 | Bumped version for cache invalidation after CSS updates | `public/service-worker.js` |

---

## Current Tasks (In Progress)

| Task | Description | Status |
|------|-------------|--------|
| Fix hero-cta-secondary mobile styling | "Or request a written quote" link should be underlined but NOT blue on mobile | Completed |
| Create TestimonialsCarousel component | Carousel with touch swipe, navigation dots, auto-rotation | Completed |
| Add testimonials to homepage | Implement carousel with realistic client testimonials | Completed |
| Fix mobile sidebar contrast | Section titles, nav links, borders now use light colors for navy background | Completed |
| Update documentation | Updated replit.md with sidebar contrast rules, TestimonialsCarousel, service worker v152 | Completed |
| Fix brand-suffix color | Restored coral (#FF1654) for ".ae" suffix in sidebar | Completed |
| Add sidebar category links | Services, Personal, Corporate, Locations, Resources now link to category pages | Completed |
| Separate accordion from links | Chevron toggles accordion, section title navigates to category page | Completed |
| Fix Vercel CSS issues | Added .contact-btn.phone/.email styles, fixed dark section link colors | Completed |

---

## Future Tasks (Backlog)

### High Priority

| Task | Description | Notes |
|------|-------------|-------|
| Migrate high-traffic pages to ServiceLayout | Use the birth-certificate-style data-driven structure | ServiceLayout already supports this pattern |
| Expand 4 category pages to 2,000+ words | SEO requirement for organic reach | Legal & Corporate, Personal & Civil, Industry Specialized, Locations |

### Medium Priority

| Task | Description | Notes |
|------|-------------|-------|
| CSS consolidation | Remove redundant overrides and unused styles from public/styles/ | Wait until component migrations stabilize |
| Add more service pages | Target: 55+ pages total (currently 49) | Follow ServiceLayout pattern |

### Low Priority / Ideas

| Task | Description | Notes |
|------|-------------|-------|
| Dark mode refinements | Ensure all components respect theme-dark class | Some pages may need testing |
| PWA enhancements | App-like experience improvements | Offline support, push notifications |

---

## Technical Notes

### CSS Architecture
- **Canonical CSS location:** `public/styles/` (NOT `src/styles/`)
- **Key files:**
  - `porto-desktop.css` - Base desktop styles
  - `navigation-glassmorphism.css` - Header/nav styling
  - `sticky-mobile.css` - Mobile bottom bar
  - `mobile-ios.css` - iOS-specific adjustments
  - `dark-mode.css` - Dark theme overrides

### Component Architecture
- **Layouts:** `BaseLayout.astro`, `ServiceLayout.astro`, `CategoryLayout.astro`
- **Reusable components:** `PageHero`, `ServiceHero`, `CTASection`, `TrustStrip`, `ProcessSteps`, `BenefitCards`, `AccordionSection`
- **Data pattern:** Service pages use `pageData` object passed to ServiceLayout

### Service Worker
- **Current version:** v154
- **Bump version** after any CSS/JS changes to bust cache

### Mobile Sidebar Contrast (visibility-fixes.css)
- Sidebar background is forced to navy via `visibility-fixes.css`
- All sidebar text must use light colors (white/rgba(255,255,255,x))
- Hover/active states should use white text, not accent color

---

*Last updated: December 2024*
