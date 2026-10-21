# CET Sathi — Website Design & Build Specification

> **Goal:** Build a polished, minimalist, responsive static website prototype using realistic illustrative data. Prioritize UI/UX, visual hierarchy, and a clear product experience over backend functionality.

## 1. Product vision

CET Sathi helps Maharashtra MHT-CET applicants and their families compare college–branch options and organize a thoughtful CAP preference list using cutoff context, fees, location, autonomy, and personal priorities.

**Core promise:** *A clearer way to choose your next step.*

The product should feel calm, trustworthy, factual, and student-friendly—not like a coaching website, a government portal clone, or a flashy AI startup.

### Principles
1. Decision support first: focus on recommendations, comparisons, cutoff context, and CAP updates.
2. Explain recommendations: show why each option appears and what trade-offs it has.
3. Offer multiple good options: ambitious, target, and safer options, without guaranteeing admission.
4. Respect uncertainty: historical cutoffs are reference points, not predictions or guarantees.
5. Keep the interface quiet: generous whitespace, restrained color, strong typography, minimal decoration.
6. Static prototype: hard-coded sample data and client-side interactions only. No real authentication, API, database, or official admission prediction.

## 2. Brand and visual system

### Identity
- Product name: **CET Sathi**
- Descriptor: **Your CET college planning companion**
- Tone: clear, supportive, practical, never patronizing.
- Avoid claims like “guaranteed admission,” “100% accurate,” or “AI-powered.” The current concept is rule-based; ML/AI is possible future scope.

### Colors
- Page background: warm off-white `#F8F9FB`
- Main text: deep navy `#172033`
- Secondary text: slate `#687386`
- Primary accent: restrained indigo `#405DE6`
- Positive / safer-fit accent: muted teal `#16836B`
- Caution / ambitious-fit accent: amber `#B7791F`
- Borders: cool gray `#E5E9F0`
- Cards: white with subtle borders; avoid heavy shadows.

Maintain accessible contrast. Never rely on color alone to communicate status. Use semantic colors consistently.

### Typography
- Use **Inter**, or a clean system sans-serif fallback.
- Page title: 30–36 px desktop; 26–30 px mobile.
- Section title: 18–22 px.
- Body: 14–16 px.
- Labels/helper text: 12–13 px, still readable.
- Use tabular numerals for percentiles, fees, and cutoff values where possible.
- Sentence case; no all-caps headings or oversized marketing typography.

### Layout and surfaces
- 8 px spacing system.
- Main content max width: approximately 1200 px.
- Page padding: 32 px desktop, 24 px tablet, 16 px mobile.
- Cards: 12–16 px radius; inputs/buttons: 8–10 px radius.
- Prefer thin borders and alignment over gradients, glassmorphism, decorative blobs, or excessive shadows.
- No autoplay, parallax, or unnecessary motion.

### Icons
- **Do not use emojis anywhere in the website, mock data, or UI.**
- Use a consistent line icon set such as Lucide: Search, SlidersHorizontal, MapPin, Wallet, ArrowUpRight, ChevronDown, Bookmark, GitCompare, FileText, CalendarDays, Info, Check, X.
- Typical icon size: 16–20 px. Add labels to important actions.
- Use icons only when they improve scanning; avoid decoration for its own sake.

## 3. Information architecture

Use a shared application shell across all product pages.

### Global navigation
**Desktop:** wordmark on left; Overview, Find Colleges, Compare, Preference List, CAP Updates in the middle; “Build my list” primary action on the right. Use a small profile control only as a demo affordance—do not require sign-in.

**Mobile:** compact top bar, wordmark, menu button, and a simple collapsible navigation. Keep the primary action visible on important pages. Tables should become cards or have deliberate horizontal scrolling.

### Routes / views

| Route | Page | Purpose |
|---|---|---|
| `/` | Landing | Explain value and offer a quick start |
| `/dashboard` | Student dashboard | Profile snapshot, shortlist, updates |
| `/preferences` | Preference builder | Capture sample profile and priorities |
| `/recommendations` | Recommendations | Ordered options with explanations |
| `/colleges` | Explore colleges | Search and filter sample catalogue |
| `/colleges/:id` | College details | Branches, fees, location, cutoff context |
| `/compare` | Comparison | Compare up to three options |
| `/preference-list` | Preference list | Reorder and review selected options |
| `/cap-updates` | CAP updates | Round-related sample announcements |
| `/about-methodology` | Methodology | Explain ranking factors and limitations |

If routing is not available in the chosen stack, implement these as client-side view states while keeping page components separate.

## 4. Main user journeys

### First-time visitor
1. Lands on homepage and understands the product in seconds.
2. Clicks **Build my list** or **Explore colleges**.
3. Uses a short sample profile or opens example recommendations.
4. Can explore the prototype without creating an account.

### Student building a list
1. Enters percentile and eligibility context.
2. Selects branch interests, fee comfort, location, and branch-vs-college priority.
3. Reviews ordered options and the explanation for each.
4. Opens details, compares options, adds to the list, and reorders them.

### Parent evaluating options
1. Opens a college or comparison.
2. Reviews fees, location, autonomy/type, and previous cutoff context.
3. Understands trade-offs and uncertainty.
4. Checks the CAP updates page for sample announcements.

## 5. Homepage

Keep it product-led and relatively short.

### Header
- CET Sathi wordmark.
- Links: Explore colleges, How it works, CAP updates.
- Primary CTA: **Build my preference list**.
- Collapse navigation on mobile.

### Hero
Two-column desktop layout, stacked on mobile. No giant stock-photo banner.

**Suggested copy**
- Eyebrow: `MHT-CET · CAP ADMISSIONS`
- Heading: **Make your college choices with more clarity.**
- Body: “Compare colleges and branches using cutoff trends, fees, location, and your priorities. Build an ordered preference list you can understand and adjust.”
- Primary CTA: **Build my list**
- Secondary CTA: **Explore colleges**
- Trust note: “This prototype uses illustrative data. Historical cutoffs are not admission guarantees.”

Right side: a compact recommendation-preview card, not a photo:
- Example profile: `92.40 percentile`
- Three small fit indicators: Branch fit, Fee fit, Location fit.
- Two sample college options tagged “Target” and “Safer based on sample cutoff”.
- Visible `DEMO DATA` label.

### Quick-start panel
A compact bordered panel with:
- Percentile: `92.40`
- Preferred branch: Computer Engineering
- Preferred area: Mumbai / Navi Mumbai
- CTA: **View sample recommendations**

Submitting navigates to recommendations or updates the local view. Do not imply official prediction.

### How it works
Three steps:
1. **Share your priorities** — percentile, category, branch, location, budget.
2. **Explore suitable options** — review cutoff context and college details.
3. **Build your list** — compare, reorder, and refine.

### Feature cards
Use three or four cards maximum:
- Personalized college–branch list
- Side-by-side college comparison
- Cutoff and CAP round context
- Explanations for every suggestion

Use concise copy and small line icons.

### CAP updates preview
Show 2–3 compact rows with date, tag, title, and a “View all updates” link. Entries must be clearly marked sample content. Never invent dates and present them as actual official deadlines.

### Footer
Links to Explore colleges, Preference list, CAP updates, and Methodology. Include: “Prototype for demonstration. Sample data is illustrative and must not be used as official admission guidance.”

## 6. Student dashboard

Make this the strongest app-like screen.

### Top area
- Title: **Your CET planning overview**
- Subtitle: “Review your profile, saved options, and sample CAP updates.”
- Profile summary: percentile, category, domicile, preferred branch.
- Secondary action: **Edit preferences**
- Primary action: **View recommendations**

### Main layout
Desktop: 8/4 column split; mobile: stacked.

**Main column**
1. Recommended options — top 3 college–branch cards.
2. Preference list — saved-option count and “Continue editing”.
3. Compare shortlist — compact selected options.

**Side column**
1. Profile completeness — simple progress bar and text, not gamification.
2. CAP updates — 2–3 concise entries.
3. Your priorities — branch, location, budget as a definition list or quiet chips.

Design useful empty states for no saved colleges, no comparison selections, and incomplete profile. Each state should explain what to do next and offer one relevant action.

## 7. Preference builder

Use calm, clearly separated form sections. A simple stepper is optional; avoid making the process feel long.

### A. CET and eligibility context
- MHT-CET percentile, e.g. `92.40`
- Admission category: Open, OBC, SC, ST, EWS, VJ/DT, NT, Other (sample options)
- Candidature context: Maharashtra / Other (demo)
- Home university or region (optional)
- Do not infer category or domicile; make the user select these explicitly.

### B. Academic preferences
- Preferred branches: Computer Engineering, Information Technology, AI & Data Science, Electronics & Telecommunication, Electrical, Mechanical.
- Branch-vs-college priority: `Branch first`, `Balanced`, `College first`.
- College types: Government, Government-aided, Private, Autonomous.

### C. Practical constraints
- Preferred regions: Mumbai, Navi Mumbai, Thane, Pune, Other Maharashtra.
- Annual tuition comfort: Under ₹75,000; ₹75,000–₹1.5 lakh; ₹1.5–₹2.5 lakh; Flexible.
- Commute: Local commute preferred / Hostel acceptable / Flexible.
- Optional preferred attributes.

### Form behavior
- Labels above fields; never rely on placeholders as labels.
- Inline validation for invalid percentile values.
- CTA: **Show recommendations**.
- Secondary action: **Use sample profile**.
- Persist demo values in client-side state only.
- Explain that the demo uses a small sample dataset and is not an official eligibility checker.

## 8. Recommendations page

This is the most important page. Optimize for scannability, explainability, and calibrated confidence.

### Header and summary
- Title: **Recommended for your profile**
- Supporting text: “Ordered using your selected priorities and illustrative previous-round cutoff data.”
- Summary chips/rows: percentile, preferred branch, region, fee range.
- Actions: **Edit preferences**, **Compare selected**, **Save preference list**.
- Show `DEMO DATA` near the summary.

### Search, filters, and sorting
- Search by college or branch.
- Filters: branch, region, college type, fee range, autonomy.
- Sort: Recommended order, Lowest fees, Closest location, Highest previous cutoff.
- Active filters shown as removable chips.
- **Clear filters** action.

### Recommendation card
Each card contains:
- Rank number (`01`, `02`, `03`…).
- College name and branch.
- Location.
- Fit label: `Ambitious`, `Target`, or `Safer option`.
- Previous cutoff percentile with year/round context.
- Approximate annual tuition.
- College type/autonomy.
- “Why this appears” explanation, e.g. “Matches your branch priority and location preference; the fee estimate is within your selected range.”
- Actions: **View details**, **Compare**, **Add to list**.
- Optional expandable factor breakdown.

Do not show an opaque “92% chance” score. If using a composite score, call it a **preference match score**, label it as a demo ranking score, and never call it an admission probability.

### Factor breakdown
Use compact labeled rows or simple horizontal bars for:
- Branch preference match
- Cutoff context
- Fee fit
- Location fit
- College preference fit

All values are illustrative UI scores, not validated admission probabilities. Link to methodology.

### Grouping
Optional groups: Ambitious choices, Target choices, Safer options. Explain that “safer” is relative to sample historical cutoff data and is never a guarantee. Do not use alarming red styling for ambitious options.

## 9. Explore colleges and details

### Explore colleges
- Title: **Explore colleges**
- Prominent search field.
- Compact desktop filter sidebar; collapsible mobile filter drawer.
- Result count and active filter chips.
- Cards or compact table with college, location, type, autonomy, indicative fees, and available branches.
- Consistent card heights and concise metadata.
- Compare control and detail link.
- Useful no-results state with **Reset filters**.

### College detail page
1. Breadcrumb: Explore colleges / College name.
2. College name, location, type, autonomy status.
3. Quick facts: indicative tuition, branches, sample cutoff year.
4. Branches table with previous cutoff context.
5. Fee and location information.
6. “Why it may fit your priorities” when reached from recommendations.
7. Actions: **Add to preference list**, **Compare college**.
8. Data-source and caveat note.

Do not make campus photography a core dependency. A typographic header, simple location panel, and strong data cards are enough.

## 10. Comparison page

Help students make a decision quickly rather than displaying a dense spreadsheet.

- Compare up to 3 college–branch options.
- Sticky top row with each option's college name and branch.
- Rows: branch, previous cutoff percentile and round/year, indicative annual fees, location/commute, college type, autonomy, branch preference fit, fee fit, location fit, and key trade-offs.
- Highlight differences subtly; avoid filling entire columns with color.
- Use consistent units and clearly label cutoff year/round.
- Include **Remove**, **View details**, and **Add to preference list** actions.
- If fewer than two options are selected, show a useful empty state with **Explore colleges**.
- On mobile, show one option at a time with a selector, or use deliberate horizontal scrolling and a sticky row label.

Include a short “How to interpret this comparison” note. Do not automatically declare one college “best”; the right choice depends on the student's priorities.

## 11. Preference list page

The preference list should resemble a tidy ordered checklist, not a complicated form.

- Title: **My preference list**
- Intro: “Review the order, compare trade-offs, and adjust your sample list before finalizing it elsewhere.”
- Show `DEMO LIST` label.
- Each row: drag handle or up/down controls, rank, college, branch, location, cutoff context, indicative fees, fit category, and remove action.
- Support reordering via drag-and-drop if easy; otherwise provide accessible **Move up** and **Move down** buttons.
- Add options from recommendations or college details.
- Buttons: **Compare selected**, **Add more colleges**, **Reset sample list**.
- Confirmation before resetting.
- Include a clear disclaimer that this does not submit a CAP option form.

## 12. CAP updates page

The prototype should demonstrate a clear update feed without inventing real official information.

- Title: **CAP updates**
- Subtitle: “Keep important admission information in one place.”
- Visible notice: “Sample updates for interface demonstration. Verify dates and notices on the official CET Cell website.”
- Filters: All, CAP process, Documents, Allotment, Institute-level (all demo categories).
- Each update: date, category tag, headline, 1–2 line summary, source label, and optional “Read details” expansion.
- Include a pinned “Before you submit” checklist: verify official notice, category/candidature details, preference order, and deadlines.
- Do not fabricate official links. If real links are not implemented, use a clearly labeled disabled/sample source link.

## 13. Methodology page

Explain how the prototype orders options in plain language.

Suggested sections:
1. **What the list considers:** branch priority, cutoff context, fees, location, college preferences.
2. **How priorities affect ordering:** show a simple illustrative weighting example, with user priorities changing the order.
3. **What cutoff data can and cannot tell you:** prior rounds are context only; cutoffs vary by year, category, seat type, round, and other factors.
4. **Why recommendations may differ:** a branch-first student may see a different order from a college-first student.
5. **Limitations:** sample data, no official eligibility verification, no admission guarantee, and no live CET Cell data connection.
6. **Future scope:** integrate verified CET Cell data; potentially explore ML/AI only after reliable data and evaluation are available.

Use an example weighting model only as a transparent demonstration, not as a final product claim.

## 14. Example data

Create one central mock-data file so all screens remain consistent. Label the entire dataset illustrative. Use fictionalized or clearly marked sample records; do not imply the values are official.

### Example student profile
- Percentile: `92.40`
- Category: `Open`
- Candidature: `Maharashtra`
- Preferred branches: `Computer Engineering`, `Information Technology`, `AI & Data Science`
- Branch/college priority: `Branch first`
- Preferred region: `Mumbai / Navi Mumbai`
- Fee comfort: `₹1.5 lakh per year`

### Example colleges
Use the following names as **fictional demo records** (or replace with verified, appropriately caveated records only if official data is intentionally sourced). Never attach invented cutoffs to real colleges.

| ID | College | Location | Type | Autonomy | Indicative annual fee | Sample branches |
|---|---|---|---|---|---:|---|
| `c01` | Harbor Institute of Technology (Demo) | Navi Mumbai | Private | Autonomous | ₹1,35,000 | Computer Engineering, IT, AI & DS |
| `c02` | Western Metro Engineering College (Demo) | Mumbai | Private | Non-autonomous | ₹1,10,000 | Computer Engineering, IT, EXTC |
| `c03` | Konkan School of Engineering (Demo) | Thane | Private | Autonomous | ₹1,45,000 | Computer Engineering, AI & DS, Mechanical |
| `c04` | Maharashtra Technical Institute (Demo) | Pune | Government-aided | Autonomous | ₹78,000 | IT, EXTC, Electrical |
| `c05` | City Centre College of Engineering (Demo) | Mumbai | Private | Non-autonomous | ₹1,25,000 | Computer Engineering, IT, Mechanical |
| `c06` | Lakeside College of Technology (Demo) | Navi Mumbai | Private | Non-autonomous | ₹95,000 | IT, AI & DS, EXTC |

### Example college–branch options
All cutoff figures below are fictional values for UI demonstration only.

| Rank | College ID | Branch | Sample previous cutoff | Sample fee | Fit label |
|---:|---|---|---:|---:|---|
| 1 | `c01` | Computer Engineering | 93.10 | ₹1,35,000 | Ambitious |
| 2 | `c02` | Information Technology | 91.60 | ₹1,10,000 | Target |
| 3 | `c03` | AI & Data Science | 90.90 | ₹1,45,000 | Target |
| 4 | `c05` | Computer Engineering | 89.80 | ₹1,25,000 | Target |
| 5 | `c06` | Information Technology | 87.40 | ₹95,000 | Safer option |
| 6 | `c04` | Information Technology | 94.20 | ₹78,000 | Ambitious |

Do not interpret these sample numbers as actual admission chances. The ordering should be based on a transparent demo rule, not cutoff alone. Example: apply selected branch priority, fee fit, location fit, and cutoff context to produce a ranked list. State clearly that this is only sample UI logic.

### Sample CAP updates
Use obviously illustrative dates, for example:
- `Sample update` — “Review your category and candidature details before building a preference list.”
- `Sample checklist` — “Keep required documents organized and verify requirements against the official notice.”
- `Sample reminder` — “Review and save your preferred order before the relevant deadline.”

If dates are displayed, use clearly fictional placeholders like “Sample date” rather than plausible dates that might be mistaken for actual deadlines.

## 15. Interactions required in the static prototype

All visible controls must do something meaningful. Use local state and mock data.

Required:
- Navigation between all main views.
- Search colleges by name, location, or branch.
- Filter by branch, region, type, fee range, and autonomy.
- Sort recommendations.
- Preferences form accepts values and validates percentile.
- “Use sample profile” fills the form with the example profile.
- Recommendation cards open detail views.
- Compare selection toggles and comparison view updates.
- Add/remove options from the preference list.
- Reorder preference list with drag-and-drop or up/down controls.
- Clear filters and reset sample list with confirmation.
- CAP update category filters and expandable details.
- Empty states and no-results states.
- Buttons show selected/active state where relevant.

Not required:
- Authentication or user accounts.
- Real CET Cell data, live deadlines, or official admission probability.
- Backend, database, API, payment, or email functionality.
- Real profile persistence. Local state is enough; optional `localStorage` is acceptable only if simple and appropriate.

Do not leave dead buttons or fake links that appear functional. If an action is outside the prototype scope, use a disabled state and a short explanation.

## 16. Suggested component structure

Use reusable components and keep data separate from presentation.

```text
src/
  app/
    App
    routes-or-view-state
  components/
    AppShell
    TopNavigation
    MobileNavigation
    PageHeader
    PrimaryButton
    SecondaryButton
    SearchField
    FilterBar
    FilterDrawer
    FilterChip
    StatusTag
    DemoDataNotice
    CollegeCard
    RecommendationCard
    CollegeFacts
    CutoffValue
    FactorBreakdown
    EmptyState
    InlineNotice
    PreferenceListItem
    ComparisonTable
    UpdateRow
    Footer
  pages/
    LandingPage
    DashboardPage
    PreferencesPage
    RecommendationsPage
    ExploreCollegesPage
    CollegeDetailPage
    ComparePage
    PreferenceListPage
    CapUpdatesPage
    MethodologyPage
  data/
    colleges
    branches
    recommendations
    capUpdates
    sampleProfile
  utils/
    filterColleges
    sortRecommendations
    demoRanking
    formatCurrency
    validatePercentile
  styles/
    tokens
    global
```

Adapt names to the chosen framework, but preserve separation between page-level layout, reusable components, mock data, and demo logic.

## 17. Technical implementation guidance

- Use the project's existing framework if one exists. Otherwise, React + Vite is a suitable default.
- Use plain CSS or CSS modules; keep styling tokens in one place.
- Use Lucide icons or an equivalent consistent line icon library.
- Keep sample data in a single module, not duplicated in page components.
- Build responsive layouts with CSS Grid/Flexbox and sensible breakpoints.
- Use semantic HTML, proper form labels, keyboard focus states, and accessible button names.
- Add visible focus rings and ensure interactive elements work by keyboard.
- Respect reduced-motion preferences.
- Use CSS variables for colors, spacing, radii, and typography.
- Avoid installing a large component library just for a small prototype unless the project already uses one.
- No emoji characters in UI copy, data, comments intended for display, or decorative elements.

## 18. Responsive behavior

### Desktop (≥ 1024 px)
- Full top navigation.
- Two-column hero.
- Dashboard 8/4 grid.
- Filter sidebar beside college results.
- Comparison table with up to three options.

### Tablet (768–1023 px)
- Reduced horizontal padding.
- Hero may remain two-column if content fits; otherwise stack.
- Dashboard columns become narrower or stack.
- Filters may become a horizontal toolbar.

### Mobile (< 768 px)
- Compact navigation.
- Single-column page content.
- Full-width primary CTA where appropriate.
- Inputs stack; labels remain visible.
- Cards show key facts first, secondary details behind a disclosure.
- Comparison uses horizontal scroll or a one-option-at-a-time selector.
- No clipped content, tiny tap targets, or hover-only controls.

## 19. Quality bar and acceptance criteria

The prototype is complete when:
- The homepage looks polished and immediately communicates the product.
- Every listed route/view has a coherent layout and can be reached.
- Visual style is minimalist, consistent, and responsive.
- The recommendations screen is the strongest and most detailed experience.
- Mock data is consistent across dashboard, recommendations, details, compare, and preference list.
- All sample content is clearly identified as illustrative.
- No invented cutoff is attached to a real institution.
- No emoji is used anywhere.
- Search, filters, sort, preference form, comparison, add/remove, and reorder actions work locally.
- Empty and error states are designed rather than left blank.
- No visible button is inert without explanation.
- The prototype never claims to submit an official CAP form or guarantee admission.
- Keyboard focus and accessible labels are present.

## 20. Recommended build order

1. Establish tokens, typography, spacing, navigation, and page shell.
2. Build homepage hero and recommendation-preview card; use this to lock the visual style.
3. Build recommendation cards and the recommendations page.
4. Build mock data and reusable college facts/status components.
5. Build explore, details, comparison, and preference-list views.
6. Build the preference form and local demo ranking/filtering logic.
7. Build dashboard, CAP updates, and methodology.
8. Add responsive behavior, empty states, accessibility, and final visual polish.
