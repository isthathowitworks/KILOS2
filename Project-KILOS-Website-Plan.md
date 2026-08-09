# Project K.I.L.O.S. Website

Development Plan & Milestones

## Overview

This document outlines the development milestones, feature requirements, and technology stack for building the Project K.I.L.O.S. companion website — a resource for adults with hypertension in Barangay Tarum, Mercedes, Camarines Norte, accessed via a QR code included in the printed booklet.

## Requirements

- Informative introduction to hypertension and why BP monitoring/management matters
- Possible complications of uncontrolled blood pressure
- Healthy lifestyle tips
- Warning signs and normal blood pressure level reference
- DASH (Dietary Approaches to Stop Hypertension) diet guidance
- Emergency action plan for family members
- Emergency care service information
- Weekly health goals feature
- Mobile-friendly design or responsive to any size, since most participants will access via phone through the booklet's QR code

## Tech Stack

- **HTML5 / CSS3 / JavaScript** — Core build — no framework overhead needed
- **Bootstrap** — Layout, components, and responsive grid
- **localStorage** — Lightweight persistence for the BP log and weekly goals checklist, no backend needed for a pilot
- **Hosting/Deployment** — Vercel — free and simple for a Bootstrap/vanilla-JS site
- **Navigation pattern — "Claude-app" shell:** `index.html` holds a persistent shell (header, sidebar/nav, footer) that never reloads. Only the content area swaps when navigating between Home, About, Tracker, Emergency, and FAQs — each is an HTML fragment fetched and injected into the content container by `main.js`, rather than a separate full page load. This keeps nav state, greeting, and layout stable across views and feels closer to a native app than a traditional multi-page site.

## File Structure
```
KILOS/
├── assets/
│   └── logo/
│       └── kilos-logo.png
├── pages/
│   ├── home.html          (content fragment, fetched into #page-content)
│   ├── about.html          (includes FAQ section)
│   ├── tracker.html
│   ├── emergency.html
│   └── faqs.html           (standby — FAQ content currently lives inside about.html instead)
├── scripts/
│   ├── main.js              (site-wide: Tailwind config, router, header/bottom-nav, welcome modal, shared greeting helpers)
│   └── pages/
│       ├── tracker.js       (BP history, success-state countdown, tracker form + delete-confirm modal logic)
│       ├── about.js         (FAQ accordion — FAQ content lives inside pages/about.html, no active FAQs route)
│       └── faq.js           (standby — for a future standalone FAQs page, if split out from about.js)
├── styles/
│   └── main.css
├── index.html               (persistent shell: header, #page-content mount, bottom-nav, welcome modal, delete-confirm modal)
└── Project-KILOS-Website-Plan.md
```

`index.html` is the only real "page" — it renders once and stays mounted. `views/*.html` are content-only fragments (no `<html>`/`<head>`/nav/footer of their own); `main.js` fetches the fragment matching the clicked nav item and swaps it into `#app-content`, so the header/sidebar/nav persist across navigation instead of reloading.

## Milestones

### 1. Content & Sitemap

Finalize copy for every required section (hypertension overview, DASH diet, warning signs & normal BP ranges, emergency action plan, emergency care info, weekly health goals). Define the sitemap: Home, About Hypertension, DASH Diet Guide, BP Tracker, Emergency Plan, Weekly Goals, Resources/Contact.

### 2. Wireframe & Design System

Sketch a simple wireframe per page: Home, About Hypertension (intro, complications, BP monitoring importance, warning signs & normal BP levels), Emergency Plan (action plan + emergency care info), and Blood Pressure Tracker (input form, reading-based suggestions including DASH tips and weekly goals, and history list). Choose a calming, accessible color palette and typography suited to a health site for a general adult audience. Set up shared Bootstrap theme variables so every page looks consistent.

### 3. Base Layout & Navigation

Build the persistent app shell in `index.html`: header, sidebar/nav, footer, and a single `#app-content` container — this shell mounts once and never reloads. Nav should include Home, About Hypertension, Emergency Plan, and Blood Pressure Tracker. Write the lightweight `main.js` router that, on nav click (or hash change), fetches the matching HTML fragment from `views/` and injects it into `#app-content`, updating the active nav state — the "Claude-app pattern" of a fixed shell with a swappable content region instead of separate full-page loads.

Fully build the Home, About Hypertension, and Blood Pressure Tracker fragments as the templates the rest will follow — since Blood Pressure Tracker introduces the name-based greeting, the input form + reading-based suggestion logic, and the on-device history list (via localStorage) that the rest of the site's interactivity depends on.

### 4. Core Content Pages

Build out the DASH Diet Guide, Warning Signs & Normal BP Levels, and Emergency Action Plan as content fragments in `views/`, following the same shared shell and styling as the Milestone 3 templates. Keep language simple and scannable for a community, non-clinical audience.

### 5. Interactive Features

Add the BP self-monitoring log (form-based entry, saved via localStorage for this pilot) and the Weekly Health Goals checklist. These turn the site from a static pamphlet into a usable tool.

### 6. QR Code & Responsiveness

Generate the QR code linking to the site for the printed booklet. Test every page on mobile widths, since most participants will likely access it via phone. Fix layout, contrast, and readability issues.

### 7. Testing, Deployment & Handoff

Full click-through test as a participant would experience it. Deploy as a static site (GitHub Pages, Netlify, or Vercel). Prepare a short handoff note for Barangay Tarum Health Center staff.