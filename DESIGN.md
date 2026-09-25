---
colors:
  ink: "#1A1A1A"          # near-black body text
  purple: "#4D148C"       # FedEx Purple — primary
  purple-deep: "#37096B"  # darker purple for large fills / AA on white
  orange: "#FF6600"       # FedEx Orange — accent / action
  orange-deep: "#E25100"  # hover / focus state of orange actions
  paper: "#FFFFFF"        # page ground
  fog: "#F4F2F7"          # tinted purple-grey surface (tabs/accordion panels)
  hair: "#E2DEE9"         # hairline borders
  slate: "#58595B"        # muted secondary text
typography:
  heading: "Roboto, system-ui, sans-serif"
  body: "Roboto, system-ui, sans-serif"
  scale: 1.25             # major-third modular scale
rounded: "6px"
spacing: "4pt base; sectionPadding balanced (64/48/32)"
components: ["button-primary", "button-secondary", "tab", "accordion-row", "card", "link"]
---

# DESIGN — Target System

_Target visual system for the consolidated Owner/Operator page. Mode A
brand-faithful: palette and type inherited from the captured FedEx surface;
the Times-New-Roman heading accident is corrected to Roboto (Mode A+, see
`DESIGN.json.extensions.divergence.brand_adjacent_refinements`)._

## North star

A modern, unmistakably-FedEx recruitment page: FedEx purple and orange on a
clean white ground, one confident sans-serif voice, and a calm one-page
structure (intro → advantages tabs → FAQ accordion → contact) that lets a
prospective owner operator read the whole story in a single scroll.

## Color

- **FedEx Purple `#4D148C`** anchors the masthead band, headings accents,
  active tab, and links. `#37096B` (purple-deep) is the AA-safe variant for
  large fills and text on white.
- **FedEx Orange `#FF6600`** is the action color: primary buttons, hover /
  focus states, the active-tab underline, accordion open indicator.
- **White `#FFFFFF`** page ground; **`#F4F2F7`** (a faint purple-grey) for
  tab and accordion panels so sections read as grouped without heavy borders.
- **Ink `#1A1A1A`** body; **slate `#58595B`** secondary; **hair `#E2DEE9`**
  hairlines. Pure black and pure white are avoided as text/ground extremes.

## Typography

One family — **Roboto** — across headings and body. Hierarchy comes from a
**1.25 major-third scale** and weight (900 / 700 for display and headings,
500 for subheads, 400 for body), never from a serif/sans split. This
directly resolves the captured Times-New-Roman-vs-Roboto tension.

## Motifs

- 6px corner radius on interactive surfaces (buttons, tabs, accordion rows,
  cards); square section bands.
- A single FedEx-purple **left-rule / underline accent** marks section heads
  and the active tab — the one recurring signature.
- Flat surfaces with hairline separators and one soft shadow on raised cards
  (`0 1px 3px rgba(77,20,140,.12)`); no gradients, no glassmorphism.

## Components

- **button-primary** — orange fill, white label, 6px radius; darkens on hover.
- **button-secondary** — purple outline on white, purple label; fills purple
  on hover.
- **tab** — text label with a purple bottom-rule when active, slate when
  idle; panel background `#F4F2F7`.
- **accordion-row** — full-width row, Roboto 500 question, orange +/‑
  indicator, hairline divider, panel expands to reveal the answer.
- **card** — white surface, hairline border, 6px radius, soft purple shadow.
- **link** — purple, underlined; orange on hover/focus. One treatment
  everywhere (resolves the blue-vs-teal inconsistency).

## Rules

- One type family (Roboto); hierarchy by scale + weight only.
- One link treatment site-wide.
- Purple + orange are the only brand hues; grays are neutral support.
- All copy verbatim from `stardust/current` — no rewriting.
