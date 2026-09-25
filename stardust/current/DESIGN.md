---
colors:
  primary: "#4D148C"   # FedEx Purple
  accent: "#FF6600"     # FedEx Orange
  background: "#FFFFFF"
  surface: "#F2F2F2"
  text: "#000000"
  text-muted: "#58595B"
  link: "#0000EE"
typography:
  heading: '"Times New Roman", serif'   # legacy — a redesign tension
  body: "Roboto, sans-serif"
rounded: "0px"          # predominantly square; one 40px pill (search)
spacing: "ad-hoc"
components: ["masthead", "full-bleed banner", "text-link nav tree", "icon callout", "image+heading+lede card", "footer"]
---

# DESIGN — Current State (descriptive)

_Descriptive snapshot of the existing owner/operator area's visual system.
Authored by `stardust:extract`. Describes what the site **is**._

## Palette

FedEx corporate identity: **purple `#4D148C`** masthead and section
headings, **orange** logo accent, white page ground, light-grey (`#F2F2F2`)
footer/panels. Body text is near-black `#000`; secondary text a mid-grey
`#58595B`. In-content links use the browser-default blue `#0000EE` with a
secondary teal `#0099CC` — an inconsistency.

## Typography

A split, legacy pairing: **headings render in Times New Roman** (serif,
32px/700 for H1) while **body and navigation use Roboto** (sans-serif). No
coherent modular scale — sizes are ad-hoc. This heading/body mismatch is the
single biggest visual-quality tension and a prime redesign target.

## Motifs

- Square corners throughout (one 40px pill on the search control).
- A single offset drop-shadow (`rgba(0,0,0,0.17) 4px 4px 0 0`).
- No gradients.
- Recurring patterns: purple masthead bar, full-bleed 745×150 banner image,
  nested text-link navigation tree, an "Additional information" icon +
  heading callout, and image + heading + lede + text-link cards down the
  homepage.

## System components

- **Header** — purple masthead, FXCC logo, Shipping/Tracking/Manage/Support
  nav, search.
- **Footer** — grey link columns (OUR COMPANY / MORE FROM FEDEX), social
  row, purple legal bar.
- **Side nav / Additional information** — owner-operator section tree plus a
  call-us phone number and opportunity form links.

## Notable tensions

- Times-New-Roman headings vs Roboto body — dated, incoherent.
- Default-blue vs teal links — inconsistent link treatment.
- A raw SSI error string ("[an error occurred while processing this
  directive]") renders visibly on the homepage.
- Content fragmented across four pages (home, overview, advantages tabs,
  FAQs) that logically belong together.
