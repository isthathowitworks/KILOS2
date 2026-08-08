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

## File Structure

```
KILOS/
├── assets/
│   └── logo/
│       └── kilos-logo.png 
├── navigation/
│   ├── abouthypertension.html
│   ├── bptracker.html
│   └── emergencyplan.html
├── scripts/
│   └── main.js
├── styles/
│   └── main.css
├── index.html
└── Project-KILOS-Website-Plan.md
```

## Milestones

### 1. Content & Sitemap

Finalize copy for every required section (hypertension overview, DASH diet, warning signs & normal BP ranges, emergency action plan, emergency care info, weekly health goals). Define the sitemap: Home, About Hypertension, DASH Diet Guide, BP Tracker, Emergency Plan, Weekly Goals, Resources/Contact.

### 2. Wireframe & Design System

Sketch a simple wireframe per page: Home, About Hypertension (intro, complications, BP monitoring importance, warning signs & normal BP levels), Emergency Plan (action plan + emergency care info), and Blood Pressure Tracker (input form, reading-based suggestions including DASH tips and weekly goals, and history list). Choose a calming, accessible color palette and typography suited to a health site for a general adult audience. Set up shared Bootstrap theme variables so every page looks consistent.

### 3. Base Layout & Navigation

Build the HTML/Bootstrap skeleton: shared header, footer, and nav used across all pages. Nav should include Home, About Hypertension, Emergency Plan, and Blood Pressure Tracker. Fully build the Home page, About Hypertension page, and Blood Pressure Tracker page as the templates the rest will follow — since Blood Pressure Tracker introduces the name-based greeting, the input form + reading-based suggestion logic, and the on-device history list (via localStorage) that the rest of the site's interactivity depends on.

### 4. Core Content Pages

Build out the DASH Diet Guide, Warning Signs & Normal BP Levels, and Emergency Action Plan pages using the shared template. Keep language simple and scannable for a community, non-clinical audience.

### 5. Interactive Features

Add the BP self-monitoring log (form-based entry, saved via localStorage for this pilot) and the Weekly Health Goals checklist. These turn the site from a static pamphlet into a usable tool.

### 6. QR Code & Responsiveness

Generate the QR code linking to the site for the printed booklet. Test every page on mobile widths, since most participants will likely access it via phone. Fix layout, contrast, and readability issues.

### 7. Testing, Deployment & Handoff

Full click-through test as a participant would experience it. Deploy as a static site (GitHub Pages, Netlify, or Vercel). Prepare a short handoff note for Barangay Tarum Health Center staff.
