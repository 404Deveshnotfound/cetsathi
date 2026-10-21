# CETPath — Web Prototype

A calm, student-friendly static website prototype for Maharashtra MHT-CET engineering admissions planning. Built strictly according to the `design.md` specifications.

## Overview

CETPath helps candidates and their families compare college–branch options and organize a thoughtful CAP preference list using cutoff context, fees, location, autonomy, and personal priorities.

- **Decision support first:** Focus on calibrated recommendations, comparisons, cutoff context, and CAP updates.
- **Explain recommendations:** Demonstrates why each option appears and highlights key trade-offs.
- **Restrained minimalist aesthetics:** Generous whitespace, deep navy `#172033` text, slate secondary typography, warm off-white `#F8F9FB` background, subtle borders, and zero decorative noise or emojis.
- **Client-side only:** Zero backend, database, or API dependency. All interactions (filtering, sorting, ranking, preference list reordering, side-by-side comparison) operate in browser state.

## Information Architecture & Implemented Routes

| Route / View | Component | Description |
|---|---|---|
| `/` | `LandingPage` | Clear value proposition, hero recommendation-preview card, quick-start calculator, 3-step process, feature highlights, and sample updates preview. |
| `/dashboard` | `DashboardPage` | Student planning overview, profile snapshot, profile completeness bar, top 3 recommendations, saved preference list preview, and comparison shortlist. |
| `/preferences` | `PreferencesPage` | Multi-section preference builder (CET score, category, branches, branch vs college priority, fee comfort, regions, commute) with inline validation and sample profile loader. |
| `/recommendations` | `RecommendationsPage` | Core decision screen with search, branch/region/type/autonomy filters, sort options, active filter chips, fit-level tabs (Ambitious, Target, Safer), and expandable factor breakdowns with preference match scores. |
| `/colleges` | `ExploreCollegesPage` | Searchable catalogue of engineering colleges with filter sidebar and branch summaries. |
| `/colleges/:id` | `CollegeDetailPage` | Institution facts, tuition, campus connectivity, full branch matrix with cutoffs and direct preference/compare actions. |
| `/compare` | `ComparePage` | Matrix comparison for up to 3 college–branch choices across cutoffs, tuition, location, autonomy, preference fit bars, and trade-offs. |
| `/preference-list` | `PreferenceListPage` | Reorderable CAP preference sequence simulator with Move Up / Move Down controls, remove action, reset confirmation, and 3-tier sequence guidance. |
| `/cap-updates` | `CapUpdatesPage` | Procedural guidance feed with category filters (CAP process, Documents, Allotment, Institute-level), expandable notices, and an interactive "Before you submit" checklist. |
| `/about-methodology` | `MethodologyPage` | Transparent plain-language explanation of how the recommendation model calculates match scores, weighting variations, and cutoff caveats. |

## Running Locally

### Development mode
```sh
npm install
npm run dev
```

### Production build & preview
```sh
npm run build
npm run preview
```

### Direct Node.js static server
```sh
node server.js
```
The server will run on `http://127.0.0.1:4173`.

## Disclaimer

All college names, indicative fees, sample cutoff percentiles, and CAP update notices are fictional demonstration data created solely for user interface evaluation. It is not affiliated with the State Common Entrance Test Cell, Maharashtra, and must not be used as official admission or eligibility guidance.
