---
_provenance:
  authoredBy: stardust:prototype
  phase: "1 shape brief"
  slug: owneroperator
  mode: "Mode A brand-faithful + Mode A+ (Roboto headings, unified links)"
  againstDirection: stardust/direction.md
  surprise: low
  fidelity: refined
  capturedSourceLineage:
    - "hero: consolidates captured intro (default.shtml 'Owner Operators' H1 + lede) + overview lede (overview/default.shtml body#16)"
    - "tabs: consolidates advantages/default.shtml Programs/Communications/Online Tools tab content (body#17-40)"
    - "faq-accordion: consolidates faqs/default.shtml 14 Q&As (HTML question anchors + body#27-53 answers)"
    - "contact-block: carried from default.shtml 'Additional information' side callout (call-us + 2 apply links)"
    - "header/footer: site-wide system-component (from _brand-extraction.json#systemComponents)"
  voiceClassification:
    - { section: all, classification: captured-verbatim, source: stardust/current/pages/* }
  copyCadenceBypass:
    rules: ["em-dash-overuse", "marketing-buzzword"]
    basis: "all body copy is captured-verbatim under ia-fidelity reimagined content-verbatim; prose is FedEx's, not the agent's"
  signatureElements: []
  substrateTransitions:
    default: paper (#FFFFFF)
    exceptions:
      - { section: tabs, substrate: "fog #F4F2F7", purpose: "group the advantages panels visually" }
      - { section: faq, substrate: "fog #F4F2F7", purpose: "group the accordion" }
  unsourcedContent: []
---

# Shape brief — owneroperator (consolidated)

One page, four stacked sections, single scroll. FedEx purple/orange on white,
Roboto throughout. All copy verbatim.

## Sections

### 1. Header (system-component)
FedEx Custom Critical purple masthead: logo + primary nav + search. Carried
from the captured site chrome. (In EDS this maps to the existing `nav`; for
the prototype, render a faithful static masthead.)

### 2. Hero / Intro  `[data-section="hero"]`
- **Eyebrow:** "FedEx Custom Critical"
- **H1:** "Owner/Operator Opportunities"  _(page name per brief; H1 once)_
- **Lede (verbatim, default.shtml):** "The FedEx Custom Critical fleet is
  made up entirely of owner operators. If you own your vehicle, or have plans
  to purchase one, read on to learn about your opportunity as an independent
  contractor."
- **Supporting (verbatim, overview body#16):** "As North America's largest
  time-specific, critical-shipment carrier, FedEx Custom Critical offers
  owner operators excellent earning potential. We're open 24 hours a day, 365
  days a year and have no scheduled runs."
- **Primary CTA:** "Owner-Operator opportunities" → https://intelliapp.driverapponline.com/m/fedexcc?r=fccwebnav
- **Secondary CTA:** "Call 1.866.711.3599" → tel:18667113599
- Hero image: captured banner `745x150oo1.jpg` (owner operator truck), used
  as a full-width band beside/behind the intro. Layout: left-anchored copy,
  image right/full-bleed band — NOT a centered-hero + dual-pill (anti-ref).

### 3. Advantages — Tabs  `[data-section="tabs"]` (substrate: fog)
Section head: "Advantages". Three tabs, panel ground #F4F2F7, active tab
purple bottom-rule.

- **Tab 1 — Programs** (verbatim, advantages body#17-21)
  - Intro: "We recognize the members of our fleet for great customer service
    and safe driving through a number of reward programs."
  - Items (heading + text): Annual Elite Fleet Award / Quarterly Elite Fleet
    Award / One Year Accident Free / 10- and 20-Year Safe Driving Awards.
- **Tab 2 — Communications** (verbatim, advantages body#22-28)
  - Intro: "We offer clear communications from our headquarters to you out on
    the road."
  - Items: In-House Staff Dedicated to You; Contractor Relations; Safety +
    Contractor Settlements; fleet specialist 24/7/365 / VRU; extranet access;
    "Communication Tools" list.
- **Tab 3 — Online Tools** (verbatim, advantages body#33-40)
  - Intro: "The owner-operator extranet is a Web site for FedEx Custom
    Critical independent contractors only. This password-protected site
    features:"
  - Bulleted list: up-to-date vehicle info; completed runs/revenue;
    settlement sheets; download/order paperwork; policies & procedures;
    email to HQ; load board.

### 4. Frequently Asked Questions — Accordion  `[data-section="faq"]` (substrate: fog)
Section head: "Frequently Asked Questions". Intro (verbatim): "To find a
quick answer to one of the frequently asked questions listed below, click on
that question." One collapsible row per Q&A (14 rows), collapsed by default,
orange +/- indicator, hairline dividers. Q verbatim from HTML anchors;
A verbatim from faqs body:

1. What are the qualifications for an owner operator to become a contractor
   for FedEx Custom Critical? → minimum requirements list (safety/violations/
   DOT physical/CDL HAZMAT/Canada access) + "vary based on vehicle" note.
2. Does an owner operator's truck have to meet certain specifications? → "…
   minimum specifications for small straight truck, large straight truck, and
   tractor-trailer."
3. Does FedEx Custom Critical use a satellite system? → two-way satellite …
4. Does FedEx Custom Critical employ drivers? → "No, we do not employ drivers…"
5. Do you offer a medical insurance plan? → own medical insurance …
6. Do you offer a work accident insurance plan? → workers comp / Protective …
7. Do you have a lease purchase program? → "No. Contractors purchase their own trucks."
8. Do you have an orientation program? → four-day Akron, Ohio program …
9. Do you provide base plates …? → base plate program for tractor owners …
10. Do you supply permits? → "…supplies permits, free of charge…"
11. How are owner operators paid? → Surface Expedite flat rate / White Glove % …
12. How much money can an owner operator expect to make …? → varies; sourcing specialist …
13. Where does FedEx Custom Critical operate in North America? → contiguous US + Canada …
14. Do you have dedicated regional run areas? → "No. Each … contiguous United States and Canada."

### 5. Additional information — Contact block  `[data-section="contact"]`
Moved to page bottom (per brief). Icon + heading "Additional information",
then verbatim:
- "Call us now at 1.866.711.3599" → tel:18667113599
- "Owner-Operator opportunities" → https://intelliapp.driverapponline.com/m/fedexcc?r=fccwebnav
- "CDL driver opportunities" → https://intelliapp.driverapponline.com/m/fedexccfleetdriver?r=fccwebnav

### 6. Footer (system-component)
FedEx corporate footer + purple legal bar. Carried from captured chrome.

## Anti-template pass
- Hero: reject centered-stack + dual-pill silhouette → left-anchored copy with
  a full-width brand photo band (captured banner). Rationale: keeps the
  captured "banner across the top" brand shape, avoids the generic SaaS hero.
- Tabs: horizontal tab bar with purple active-rule (not accordion) — mirrors
  the source's own tabbed advantages page.
- FAQ: accordion (not flat prose) — the one structural change the brief asks
  for; escapes the captured "wall of text".

## Interaction model
- Tabs: click / arrow-key switch, one panel visible; `aria-selected`, roving
  tabindex.
- Accordion: click / Enter/Space toggle; `aria-expanded`; collapsed default.
- Reduced-motion: instant show/hide when `prefers-reduced-motion: reduce`.

## Data attributes
`[data-section]` on each section; `[data-block="tabs"]`, `[data-block="accordion"]`.
