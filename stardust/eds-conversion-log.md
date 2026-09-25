# EDS conversion log

## owneroperator prototype → /us/owneroperator/opportunities (2026-09-24)

**Source prototype:** `stardust/prototypes/owneroperator-proposed.html`
**Deployed page (local):** `content/us/owneroperator/opportunities.plain.html`

### Decisions locked (with the user)
- **Target path:** NEW page `/us/owneroperator/opportunities`. The existing live
  `/us/owneroperator/default` (and its 7 siblings) is left untouched.
- **Block styling:** NEW prototype-styled blocks, separately named `opp-*`, so the
  8 live pages that share `hero-banner`/`tabs`/`accordion`/`cards-feature` are NOT
  restyled.

### Blocks created
| Block | Pattern | Authoring model |
|---|---|---|
| `opp-hero` | intro hero (copy + image band) | rows: h1 / lede / sub / CTAs / picture |
| `opp-tabs` | Advantages tabs (Programs/Communications/Online Tools) | one row per tab: label cell + panel cell |
| `opp-accordion` | FAQ accordion (14 Q&As) | one row per Q&A: question cell + answer cell |
| `opp-contact` | "Additional information" purple band | single cell: phone line + CTA paragraphs |

All four are self-contained (CSS scoped under the block class; no shared token or
button overrides beyond `.opp-contact a.button.secondary` on the purple band).

### Foundation change
- `styles/brand.css`: added `--fxcc-purple-deep` and `--fxcc-orange` (additive; no
  existing value changed). Blocks also carry inline fallbacks so they render if the
  tokens are ever absent.

### Runtime contract
`stardust/runtime-contract.json` — vanilla EDS, `decorateButtons` requires
`<strong>`/`<em>` (formatted-only), `p.button-wrapper` + `a.button.primary/secondary`.
CTAs authored one anchor per `<p>` (two anchors in one `<p>` buttonize neither).

### QA (local harness, dev server + real scripts.js)
- Runtime booted; all 6 blocks `loaded`; 0 JS/page errors.
- Exactly one `<h1>`; hero grid computes `grid`; no overflow at 1280 or 375.
- 3 tabs (first active), 14 FAQ items (collapsed), 4 buttons correctly classed.
- Interactions verified: tab switch + accordion open.
- Content-handoff script run: envelope stripped, 5 sections.

### Notes for next person
- Hero image uses the shared `/media-da/.../default.shtml/745x150oo1-37503d72.jpg`
  (same asset the existing owner-operator page references — served, no upload needed).
  The handoff script's "image not found" warning is a path-resolution quirk, not a
  real missing asset.
- Publishing to the preview URL is a UI action in this environment; blocks + content
  are ready for hand-off.
- Superseded note: the primary CTA originally rendered with the site-wide grey
  button (`a.button.primary` uses `--text-color`). Fixed 2026-09-25 with scoped
  overrides in `opp-hero` / `opp-contact` (see below).

## qualifications-specs prototype → /us/owneroperator/qualifications-specifications (2026-09-25)

**Source prototype:** `stardust/prototypes/qualifications-specs-proposed.html`
**Deployed page (local):** `content/us/owneroperator/qualifications-specifications.plain.html`

Same decisions as the first page: new path (existing `/us/owneroperator/quals/*`
live pages untouched), `opp-*` blocks only.

### Block changes
- `opp-hero`: now moves authored nodes in authored order and supports a list
  (orange-marker minimums). Lede/supporting copy live in wrapper divs
  (`.opp-hero-lede p`) instead of classes on the authored `<p>`. No image →
  `.opp-hero-nomedia` full-width copy capped at 760px. Opportunities page verified
  unchanged (same order, image, tabs, FAQ, buttons).
- `opp-tabs`: new opt-in `cards` variant (`class="opp-tabs cards"`). `<h2>` =
  sub-section head, each `<h3>` opens a card; consecutive cards form a 3-col grid;
  a heading carrying `<em>` makes a full-row card and renders the `<em>` as an
  "Applies to all vehicle types" pill; a group with no list stacks (CDL policy).
  Without the variant the block is unchanged.
- `opp-hero` / `opp-contact`: scoped button overrides — orange primary,
  purple-outline secondary, 6px radius — so the site-wide grey button stays as is.
- New token `--fxcc-orange-deep` (#E25100, hover state) in `styles/brand.css`,
  `DESIGN.md`, `DESIGN.json`.

### QA (local harness)
- Runtime booted; all blocks loaded; 0 errors; one `<h1>`; no overflow at 1280/375.
- Quals tab: 3 stacked CDL cards. Specs tab: equipment card full-row + 3-col spec grid.
- Tab switch verified.

### Accepted exception — contrast (user decision 2026-09-25)
White text on `#FF6600` measures 2.94:1 (AA needs 4.5:1; fails even the 3:1
large-text floor). Affects the orange primary buttons on both pages and the
prototypes. The user chose to **keep it as designed** (matches FedEx's own
white-on-orange buttons) and accept it as an exception to the PRODUCT.md AA
requirement. Alternatives considered: dark text on orange (≈ 5.9:1) or a darker
orange (~#C24100) with white text.
