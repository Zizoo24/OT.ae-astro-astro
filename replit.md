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
- **CSS Architecture:** 6 distinct CSS files for OS-specific conditional loading (`porto-desktop.css`, `sticky-mobile.css`, `dark-mode.css`, `mobile-ios.css`, `mobile-android.css`, `desktop-macos.css`).
- **Schema Markup:** Required on every page for SEO, including Service Schema (e.g., "LegalService"), LocalBusiness Schema, FAQPage Schema, and BreadcrumbList.
- **Performance Standards:** Page load under 3 seconds on 3G, lazy loading for accordion content, WebP images with JPG fallback, no JavaScript console errors.

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