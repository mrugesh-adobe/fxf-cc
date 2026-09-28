---
_provenance:
  authoredBy: stardust:prototype
  phase: "1 shape brief"
  slug: owneroperator-v2
  variantOf: owneroperator
  basePrototype: stardust/prototypes/owneroperator-proposed.html
  mode: "Mode A brand-faithful + Mode A+ (Roboto headings, unified links)"
  againstDirection: stardust/direction.md
  surprise: low
  fidelity: refined
  capturedSourceLineage:
    - "hero: base owneroperator hero + full Overview intro (overview/default.shtml body#16)"
    - "hero divisions: overview/default.shtml body#17 (Surface Expedite) + body#18 (White Glove Services®) — direction-consistent addition requested by user"
    - "tabs: base advantages tabs + overview/default.shtml Advantages-tab summaries (body#19-21) as each panel's lead line"
    - "faq-accordion: unchanged from base"
    - "contact-block: base 'Additional information' + overview/default.shtml sidebar extranet login (single link to https://oo.blue.fedex.com)"
    - "header/footer: site-wide system-component (unchanged from base)"
  voiceClassification:
    - { section: all, classification: captured-verbatim, source: stardust/current/pages/* }
  copyCadenceBypass:
    rules: ["em-dash-overuse", "marketing-buzzword"]
    basis: "all body copy captured-verbatim; prose is FedEx's, not the agent's"
  substrateTransitions:
    default: paper (#FFFFFF)
    exceptions:
      - { section: tabs, substrate: "fog #F4F2F7", purpose: "group the advantages panels" }
      - { section: faq, substrate: "fog #F4F2F7", purpose: "group the accordion" }
  unsourcedContent: []
  excluded:
    - "Overview sidebar section-navigation links (Owner Operators / Overview / Advantages / Programs / Communications / Online Tools / Qualifications / FAQs) — page links the consolidated page no longer needs (user instruction)"
---

# Shape brief — owneroperator-v2

Identical to `owneroperator-shape.md` (same section order, same design
system, same verbatim copy) with four additions from the Overview page
`https://customcritical.fedex.com/us/owneroperator/overview/default.shtml`.
`owneroperator-proposed.html` and the deployed
`/us/owneroperator/opportunities` page are not touched.

## Sections

### 1. Header (system-component) — unchanged

### 2. Hero / Intro `[data-section="hero"]` — CHANGED
- H1, lede, image band and both CTAs unchanged.
- **Supporting paragraph restored in full** (verbatim, overview body#16):
  "As North America's largest time-specific, critical-shipment carrier,
  FedEx Custom Critical offers owner operators excellent earning potential.
  We're open 24 hours a day, 365 days a year and have no scheduled runs.
  FedEx Custom Critical is made up of the following divisions:"
- **Divisions** — directly under that sentence (the colon leads into
  them), before the CTAs. Two-item row, rendered as a `<dl>` (term +
  description) so the outline stays H1 → H2 with no jump:
  - **Surface Expedite** — "Exclusive-use nonstop, door-to-door delivery of
    critical freight."
  - **White Glove Services®** — "For shipments requiring special care in
    handling, such as air-ride equipment or temperature control."
  - Treatment: two columns on a hairline top rule, division name in
    purple-deep 700, description in slate. No cards, no icons, no coloured
    side stripes (craft-floor bans). Stacks to one column ≤ 640px.

### 3. Advantages — Tabs `[data-section="tabs"]` — CHANGED
Each panel gains the Overview page's one-line summary as its **lead line**
(first paragraph, styled as the panel lead); the existing detailed content
follows unchanged:
- Programs: "We recognize our contractor fleet for superior service and safe
  driving through a number of programs."
- Communications: "We get you information to help run your business in a
  variety of ways."
- Online Tools: "Check out the features of our owner-operator extranet,
  designed exclusively for FedEx Custom Critical independent contractors."

Note: the Programs and Communications summaries are close in meaning to the
Advantages-page intros already in those panels (both verbatim, from
different source pages). Kept both per instruction; flagged for review.

### 4. FAQ accordion — unchanged (14 Q&As)

### 5. Additional information — Contact block `[data-section="contact"]` — CHANGED
Phone + two CTAs unchanged. Adds, verbatim, as ONE link to
`https://oo.blue.fedex.com` (matching the source), spanning the block width
under a hairline divider:
- **Log in to the Extranet**
- "Exclusive to current FedEx Custom Critical Owner Operators, log in to the
  Owner Operator Extranet."
- *Log in now*

### 6. Footer (system-component) — unchanged

## Anti-template pass
- Divisions: rejected the reflex "two icon+heading+text cards"; a
  definition-list row under a hairline keeps it typographic and tied to the
  sentence it completes.
- Extranet login: rejected a third button (would compete with the two
  apply CTAs); a text link block keeps the conversion hierarchy
  (apply > call > extranet for existing contractors).

## Interaction model — unchanged (tabs roving tabindex; accordion toggles)
