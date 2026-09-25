---
_provenance:
  authoredBy: stardust:direct
  phase: "2.5 improvements list"
  mode: "Mode A (brand-faithful) + Mode A+ refinements"
  slug: owneroperator
  sources:
    - stardust/current/DESIGN.md
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/us-owneroperator-default-shtml.json
    - stardust/current/assets/screenshots/us-owneroperator-default-shtml.png
---

# Improvements — owneroperator

Specific, evidence-cited weaknesses in the captured owner/operator area.
Variant A renders against this as a floor.

1. **[dated-pattern] Times-New-Roman headings on a Roboto body.**
   Captured H1 "Owner Operators" computes to `"Times New Roman" 32px/700`
   while body + nav compute to `Roboto` (`_brand-extraction.json#type`,
   173 Roboto vs 91 Times occurrences). A serif system-font heading over a
   sans body reads as an unstyled ~2005 template.
   _Fix:_ set headings in Roboto (the captured brand face) with a real
   modular scale (≥ 1.25 ratio), weights 700/900 for hierarchy.

2. **[a11y / contrast] Inconsistent, low-signal link colors.**
   In-content links use browser-default `#0000EE` (18 occurrences) with a
   second teal `#0099CC` — two different link treatments on one surface,
   neither tied to the brand.
   _Fix:_ one brand-anchored link treatment (FedEx purple `#4D148C`, orange
   `#FF6600` on hover/focus), consistent underline affordance, AA contrast.

3. **[cluttered-IA] Content fragmented across four pages.**
   The opportunity story is split: homepage intro, an overview page, a
   tabbed advantages page (Programs / Communications / Online Tools), and a
   FAQs page — each a separate `.shtml` with the full FedEx chrome reloaded.
   _Fix:_ consolidate into one page: intro hero → tabbed advantages → FAQ
   accordion → contact block, so a prospect reads the whole story in one
   scroll with no page reloads.

4. **[missed-opportunity] The 9-section / 14-Q&A FAQ is a flat wall of text.**
   `pages/...faqs...json` shows 9 headed sections (Eligibility, Equipment,
   Fleet, Insurance, Lease, Orientation, Plates and Permits, Revenues, Scope
   of Services) rendered as continuous prose.
   _Fix:_ an accordion — one row per Q&A, grouped/labeled, collapsed by
   default so the list is scannable.

5. **[polish] A raw server error string renders on the live homepage.**
   The screenshot shows "[an error occurred while processing this
   directive]" as visible body text (a broken SSI include).
   _Fix:_ drop it entirely; it is not content.
