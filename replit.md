# OnlineTranslation.ae - Master Reference Document

## Overview

OnlineTranslation.ae is a "Digital Concierge" service operating in Dubai, focusing on document clearing and project management for legal translation. It addresses a market gap between slow legacy agencies and low-trust street shops by offering a "boutique" experience, emphasizing speed, trust, and government acceptance of translated documents. The business sells "Stress Management" and "Government Acceptance" rather than just translation, offering services like a "60-Minute Promise" for digital drafts and a "White-Glove" Shield for pre-validation of documents. The service operates in partnership with Arkan Legal Translation, which provides the necessary MOJ license, stamp, and signature, while OnlineTranslation.ae manages the platform, customer service, and logistics. The project aims to achieve significant organic reach through a highly structured SEO content strategy.

## User Preferences

- **Communication Style:** Polite, honest, calm, understated confidence, radical transparency, human warmth, professional, warm, solution-focused, humble, adult. Avoid hype, slang, marketing speak, exclamation points, all-caps (except acronyms), and sales urgency.
- **Tone for AI-generated content:** Act as the Head Concierge, focusing on kindness and efficiency, admitting limitations, avoiding over-promising, and sounding like a professional having coffee with a client. The goal is to solve the red-tape problem, not extract money.
- **Content guidelines:** Never claim to be the 'Best' or 'Number 1'. Acknowledge the existence of many agencies but explain the focus on service. Emphasize "Peace of Mind." If mentioning Arkan, they are 'Technical Experts'; we are 'Relationship Managers'. End every piece with a helpful, low-pressure offer to check their files.
- **Workflow preferences:** Iterative development with a focus on delivering high-quality, SEO-optimized content across various document types and locations.
- **UI/UX Preferences:** Desktop experience should feel corporate and professional. Mobile experience should prioritize sticky bottom navigation, smooth subtle animations (0.3s transitions), and a coral accent for CTAs. User's own photos from OneDrive should be used instead of stock images.
- **Design inspiration:** Divi Exodus immigration template.
- **Specific elements:** Hero overlap cards for desktop, no overlap for mobile, mobile cards with transparent container and 92% opacity.
- **Brand vocabulary:** No banned words in any content.
- **Primary CTA:** WhatsApp on all devices.
- **SEO focus:** Palm Jumeirah for HNW signal.

## System Architecture

The system is designed as a "Digital Concierge" with a "WhatsApp-First Architecture."

**UI/UX Decisions:**
- **Design Inspiration:** Divi Exodus immigration template.
- **Color Palette:** Primary Navy (#0E2B48), Accent Coral (#FF1654), Gold Highlight (#d4a54c), Text Dark (#1a1a1a), Text Muted (#666666), Background Light (#f8f9fa).
- **Typography:** Headings (Montserrat or Jost, 700-800 weight, uppercase with 0.3em letter-spacing), Body (Open Sans or Roboto, 400 weight, 1.8-1.9 line-height).
- **Principles:** Mobile-first design (70%+ UAE traffic is mobile), seamless WhatsApp integration, accordion-based content for SEO and mobile optimization, sticky bottom navigation (mobile only), no floating CTAs (use bottom action bar).
- **Hero Section:** Desktop features three overlapping cards (MOJ Certified, Court Accepted, 60-Min Draft); mobile displays these cards flowing after the hero.

**Technical Implementations:**
- **Tech Stack:** Static HTML/CSS/JS (no build process).
- **Deployment:** Vercel with `vercel.json` for configuration.
- **PWA:** `manifest.webmanifest` and `service-worker.js` for Progressive Web App capabilities.
- **Local Development:** `server.py` for a local development server.
- **CSS Architecture:** Base architecture CSS + 6 OS-specific stylesheets. Load order: `base-architecture.css` → `porto-desktop.css` → OS-specific files.
- **Schema Markup:** Required on every page for SEO, including Service Schema (e.g., "LegalService"), LocalBusiness Schema, FAQPage Schema, and BreadcrumbList.
- **Performance Standards:** Page load under 3 seconds on 3G, lazy loading for accordion content, WebP images with JPG fallback, no JavaScript console errors.

**Base Architecture CSS System (December 2025):**
The site uses a Divi-style grid architecture defined in `styles/base-architecture.css`. This file provides:

- **Section Primitives:** Full-width wrappers with consistent padding
  - `.section` - Default section with 120px vertical padding
  - `.section--sm` - Compact section (60px padding)
  - `.section--hero` - Hero-specific with min-height
  - Background utilities: `.bg-white`, `.bg-light`, `.bg-alt`, `.bg-dark`, `.bg-accent`

- **Container System:** Centered max-width wrappers
  - `.container` - Default 1200px max-width
  - `.container--narrow` - 900px for content-focused sections
  - `.container--wide` - 1400px for expansive layouts

- **Grid Utilities:** CSS Grid with auto-fit behavior
  - `.grid-2`, `.grid-3`, `.grid-4`, `.grid-5` - Fixed column grids
  - `.grid--auto-fit` - Responsive with 280px minimum column width
  - `.carousel-mobile` - Horizontal scroll on mobile, grid on desktop

- **Spacing Scale:** 8-point system (4px base)
  - Variables: `--space-xs` (8px), `--space-sm` (16px), `--space-md` (24px), `--space-lg` (40px), `--space-xl` (60px)
  - Utility classes: `.mt-sm`, `.mb-lg`, `.py-xl`, `.px-md`, etc.

- **Responsive Breakpoints:**
  - Tablet: 768px - 991px (reduces spacing, 2-col grids)
  - Mobile: 767px and below (single column, smaller spacing)
  - Small phones: 480px and below (minimal padding)

**Usage Pattern:**
```html
<section class="section bg-light">
  <div class="container">
    <div class="section-header">...</div>
    <div class="grid grid-4 grid--auto-fit">
      <!-- Cards here -->
    </div>
  </div>
</section>
```

**Migration Note:** When adding new sections, use base architecture classes for layout. Component styles (cards, buttons) remain in `porto-desktop.css`. Grid layout rules in porto-desktop.css are deprecated in favor of base-architecture.css.

**Feature Specifications:**
- **Content Structure:** 4-Silo SEO structure targeting Legal & Corporate, Personal & Civil, Industry Specialized, and Locations.
- **Page Anatomy:** Each page includes an "Above the Fold" section (H1, Concierge Intro, Service Snapshot, Primary CTA), Compliance Checklist (accordion), Step-by-Step Process (accordion), After-Care Guide, Pricing & Timelines, and FAQ (schema optimized).
- **Operational Scripts:** Pre-defined scripts for WhatsApp triage and handling common client queries ("Why so expensive?", "Can you do it in 10 minutes?").

## External Dependencies

- **OneDrive:** Used for storing user's images and brand assets from the `OtLegalTranslationcom` folder.
- **GitHub:** Utilized for version control with the repository `onlinetranslation-dubai` (fresh repo created Dec 2025, replacing corrupted OnlineTranslation-ae).
- **Arkan Legal Translation:** The strategic partner responsible for fulfillment, providing the MOJ license, stamp, and signature for certified translations.
- **Form Handler:** Contact forms gracefully fallback to WhatsApp when Supabase is not configured. Optional Supabase integration for database storage.
- **Vercel:** The platform used for production deployment of the website.

## Recent Changes (December 2025)

**Homepage UX Architecture Fix - December 6, 2025:**
- **Hero Section:** Removed `overflow: hidden` from `.hero-section` and `.hero-section.exodus-hero` to fix overlap card clipping
- **Header Contrast:** Fixed header elements (contact btn, social icons, mobile toggle) to be navy initially, white when scrolled
  - Added `.header-desktop.exodus-header.scrolled` states for all interactive header elements
- **Section Spacing Standardization:** Removed competing `padding: 100px/120px` from 12+ sections, now controlled by base-architecture.css `.section` class (80px)
  - Fixed sections: specialists, services, why, process, testimonials, faq, about, contact, translator, team, languages, exodus-process
- **Popular Documents:** Extracted all inline styles to new CSS classes (`.popular-doc-card`, `.popular-doc-icon`, `.popular-doc-content`)
- **Form Accessibility:** Added visible `<label>` elements to contact form, standardized border-radius, added mobile bottom nav padding
- **Footer:** Updated copyright 2024 → 2025
- **About Section:** Renamed "Why Choose Us" → "Our Approach" to avoid duplicate section naming
- **New CSS Classes:** `.btn`, `.btn-accent`, `.popular-docs-footer`
- **Nav Link Icon:** Added scrolled state override for dropdown arrow icons
- Service worker bumped to v134

**Site-Wide Deployment Checklist (for remaining 50 pages):**
When applying the base architecture pattern to other pages:

1. **Section Classes:** Add `.section` class to all main content sections
   - Use `.section--sm` for compact sections (50px padding)
   - Use `.bg-white`, `.bg-light`, `.bg-alt`, `.bg-dark`, `.bg-accent` for backgrounds
   
2. **Container Usage:** Wrap content in `.container` (1200px max)
   - Use `.container--narrow` (900px) for text-heavy content
   
3. **Grid Layouts:** Use base-architecture grid classes
   - `.grid-2`, `.grid-3`, `.grid-4`, `.grid-5` for fixed columns
   - `.grid--auto-fit` for responsive behavior
   
4. **Hero Sections:** Keep using component classes, not `.section`
   - `.hero-section.exodus-hero` handles its own padding
   
5. **Remove Inline Styles:** Extract to CSS classes in porto-desktop.css

6. **Verify Schema Markup:** Ensure each page has proper structured data

7. **Test Scroll Behavior:** Verify header transitions correctly on scroll

**Site-Wide Deployment Pattern (for remaining 50 pages):**
```html
<!-- Required section structure -->
<section class="section bg-[white|light|alt|dark|accent] [specific-section-class]">
  <div class="container">
    <!-- Content here -->
  </div>
</section>

<!-- For compact sections (50px padding) -->
<section class="section--sm bg-accent stats-section">

<!-- For hero sections (use component classes, not .section) -->
<section class="hero-section exodus-hero">
```

**Base Architecture CSS Implementation - December 6, 2025:**
- Created `styles/base-architecture.css` with Divi-style grid system
- Section primitives: `.section` (80px padding), `.section--sm` (50px), `.section--lg` (100px), `.section--flush` (0)
- Background utilities: `.bg-white`, `.bg-light`, `.bg-alt`, `.bg-dark`, `.bg-accent`
- Container system (`.container`, `.container--narrow`, `.container--wide`)
- CSS Grid utilities (`.grid-2` through `.grid-5`, `.grid--auto-fit`)
- Spacing scale utilities (`.mt-sm`, `.mb-lg`, `.py-xl`, etc.)
- Responsive breakpoints (tablet 991px, mobile 767px, small phones 480px)
- Applied to all 51 HTML pages site-wide
- Homepage sections refactored to use new grid classes
- Deprecated redundant `display: grid` rules in porto-desktop.css (replaced with comments)
- Service worker bumped to v131

**Homepage UX Refactor - December 5, 2025:**
- Hero section restructured: long paragraph replaced with scannable lead + 3 bullet points
- New CSS classes: `.hero-lead`, `.hero-bullets`, `.hero-cta-secondary`
- CTA standardization: all primary CTAs now use "Send Documents on WhatsApp"
- Specialists section: paragraphs converted to bullet lists (`.specialist-bullets`)
- Why Choose Us: reordered concrete benefits first, abstract messaging after
- About section simplified with `.about-summary` styling
- Service worker bumped to v126

**Sensitive Page UX Improvements - December 5, 2025:**
- Death certificate page hero restructured for empathy-first approach
- Added `.hero-empathy-note` component with subtle styling (light overlay, left border accent)
- Reduced CTAs from two competing buttons to single WhatsApp primary + text call link secondary
- New CSS classes: `.hero-empathy-note`, `.hero-cta-single`, `.hero-cta-secondary`
- Pattern available for other sensitive pages (divorce, etc.) if needed

**Breadcrumb UX Fix - December 5, 2025:**
- Breadcrumbs restyled from blue links to muted gray (12px, 55% opacity)
- Applied sitewide across 40+ pages
- H1 titles now properly dominate visual hierarchy

**CI/CD & Form Enhancements - December 5, 2025:**
- Enhanced contact.html form with Document Type dropdown (Birth Certificate, Marriage, Degree, POA, Corporate, Contracts, Golden Visa, Medical, PCC, Other)
- Added form result container for success/error messages
- Integrated form-handler.js, cookie-consent.js, and analytics.js scripts
- Updated form-handler.js to include document type in WhatsApp redirect message
- Created `scripts/generate-sitemap.mjs` for automated sitemap generation (49 URLs)
- Added package.json with `build:sitemap` script
- Created `.github/workflows/ci.yml` for GitHub Actions CI/CD pipeline with auto-commit for sitemap updates

**Audit Fixes - December 5, 2025:**
- Fixed `vercel.json` - merged duplicate redirects arrays, corrected `/contact-us/` redirect to `/contact.html`
- Added security headers: X-Frame-Options (DENY), X-XSS-Protection, Permissions-Policy (camera/mic/geo disabled)
- Added caching headers for CSS/JS (1 year immutable), images (30 days)
- Cleaned orphaned CSS from birth certificate page
- Rewrote `form-handler.js` with async initialization, error handling, and WhatsApp fallback
- Expanded `search-index.js` with 45+ pages including all hub pages and legal documents
- Updated `browserconfig.xml` with wide tile support and brand color
- Service worker bumped to v122

**Previous Fixes:**
- Repository migration to `onlinetranslation-dubai` (reduced from 208MB to 15MB)
- Path standardization (all root-relative paths)
- 46+ content pages with proper schema markup
- PWA with offline support