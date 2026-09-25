---
_provenance:
  authoredBy: stardust:prototype
  phase: "1 shape brief"
  slug: qualifications-specs
  mode: "Mode A brand-faithful + Mode A+ (Roboto headings, unified links)"
  againstDirection: stardust/direction.md
  surprise: low
  fidelity: refined
  capturedSourceLineage:
    - "hero: quals/default.shtml intro"
    - "qualifications tab: quals/default general minimums + smstrtrk/lgstrtrk/tractortrailer shared driving-record (A) + criminal-background (C) + per-truck CDL policy (B)"
    - "specifications tab: quals/default general emergency equipment + per-truck specs & freight securement (smstrtrk/lgstrtrk/tractortrailer body#47+)"
    - "header/footer: site-wide system-component"
  voiceClassification:
    - { section: all, classification: captured-verbatim, source: stardust/current/pages/us-owneroperator-quals-*.json }
  copyCadenceBypass:
    rules: ["em-dash-overuse", "marketing-buzzword"]
    basis: "all body copy captured-verbatim (compliance/spec text); prose is FedEx's"
  dedupNote: >
    Section A (driving record) and Section C (criminal background) are byte-identical
    across the three truck pages, and the required emergency-equipment list is on the
    default page. These shared blocks are rendered ONCE (labeled "applies to all vehicle
    types"). Only Section B (CDL policy) and the vehicle specifications differ per truck
    and are shown in three labeled sub-sections. Nothing is dropped or invented.
  substrateTransitions:
    default: paper (#FFFFFF)
    exceptions:
      - { section: tabs, substrate: "fog #F4F2F7", purpose: "group the qualifications/specifications panels" }
  unsourcedContent: []
---

# Shape brief — qualifications-specs (consolidated)

Standalone "Qualifications & Specifications" page. Same FedEx system as the
owneroperator prototype: purple/orange on white, Roboto, tabs. One scroll.

## Sections

### 1. Header (system-component)
FedEx Custom Critical purple masthead (same as owneroperator prototype).

### 2. Hero / Intro  `[data-section="hero"]`
- **H1:** "Qualifications & Specifications"
- **Lede (verbatim, quals/default):** "Interested in being affiliated with
  FedEx Custom Critical? If you meet these general minimum requirements, then
  we'd like to hear from you:"
- **General minimums (verbatim list):**
  - "No more than two (2) moving violations within the last three (3) years,
    and a maximum of one (1) in the previous 12 months"
  - "Able to pass a Department of Transportation physical and drug test"
  - "A proper class CDL"
- Follow line (verbatim): "In order to contract with or drive for a contractor
  of FedEx Custom Critical, you must meet certain other eligibility
  requirements. These vary based on the size and type of vehicle:"
- Primary CTA: "Owner-Operator opportunities" → https://intelliapp.driverapponline.com/m/fedexcc?r=fccwebnav
- Secondary CTA: "Call 1.866.711.3599" → tel:18667113599

### 3. Tabs  `[data-section="tabs"]` `[data-block="tabs"]` (substrate: fog)
Two tabs matching the source: **Qualifications** and **Specifications**.
Horizontal tab bar, purple active bottom-rule, keyboard-operable
(aria-selected, roving tabindex, arrow keys). Panel ground #F4F2F7.

#### Tab 1 — Qualifications
Applies-to-all shared block first, then per-truck CDL.
- **Sub-head "Driving record — applies to all vehicle types"** (Section A,
  verbatim smstrtrk body#16–44). Render the nested list faithfully:
  - "No record of a preventable accident resulting in a fatality or serious
    injury or payout greater than $100,000."
  - "No record, citation or conviction during the one-year period prior to the
    application date of:" → nested bullets (handheld/texting; seatbelt; CSA
    Unsafe Driving BASIC …; CSA Hazardous Materials Compliance BASIC …).
  - "No record, citation or conviction during the thirty-six (36) consecutive
    months prior to the application date of:" → nested bullets (moving
    violations; preventable accident; invalid license; suspensions; reckless;
    15+ mph; not medically certified; alcohol/drugs in vehicle; suspension of
    privileges; out-of-service; falsifying DOT docs; unauthorized passengers;
    CSA Driver Fitness / Hours of Service).
  - "No record, citation or conviction during the sixty (60) months prior to
    the application date of:" → nested bullets (under influence; failed DOT
    test; leaving accident scene; school-bus yield; railroad HAZMAT yield;
    fleeing; felony use; excessive pattern 5+).
- **Sub-head "Commercial Driver's License policy"** — three labeled rows
  (Section B, verbatim per truck):
  - **Small Straight Trucks:** "Drivers of 14' or 22' straight trucks must
    have an unrestricted class B (or class A) commercial driver's license
    (CDL). Learner's permits or restricted licenses are not acceptable for
    drivers of FedEx Custom Critical leased vehicles. Canadian contractors:
    please ensure drivers of leased vehicle has a class G CDL rated for a GVW
    greater than the GVW of your vehicle."
  - **Large Straight Trucks:** (identical text to Small — render verbatim.)
  - **Tractor Trailers:** "Every driver of a tractor-trailer leased to FedEx
    Custom Critical must have an unrestricted class A commercial driver's
    license (CDL). Learner's permits or restricted licenses are not acceptable
    for drivers operating vehicles leased to FedEx Custom Critical. Canadian
    contractors: please ensure drivers of leased vehicle has a class G CDL
    rated for a GVW greater than the GVW of your vehicle."
- **Sub-head "Criminal background — applies to all vehicle types"** (Section
  C, verbatim): "Felony — no less than seven (7) years from the date of
  clearance. (Clearance would be the completion of probation, parole,
  incarceration or court-ordered diversion program relating to felony.)
  DUI/DWI — no less than five (5) years. Misdemeanor — no less than three (3)
  years. An individual will not be qualified if they have been convicted of a
  crime related to sexual abuse and have an active court order mandating
  registration as a sexual offender."

#### Tab 2 — Specifications
- **Intro (verbatim, quals/default):** "At FedEx Custom Critical, we contract
  with owners of:" → Small Straight Trucks / Large Straight Trucks / Tractor
  Trailers.
- **Sub-head "Required emergency equipment — applies to all vehicle types"**
  (verbatim, quals/default): fire extinguisher (type 10 B.C.) charged and
  mounted; spare fuses (for electric circuits); three warning devices
  (flame-producing devices prohibited); bidirectional emergency reflective
  triangles with manufacturer's certification of compliance; safety goggles;
  steel-toe shoes.
- **Three labeled truck spec cards** (verbatim per truck):
  - **Small Straight Trucks:** scale 5,000-lb payload; dock-high floor 48–52";
    inside 90"w × 92"h; rear door min 88"h × 85"w (roll up/swing optional);
    safety support legs (min 25,000 lb); legal sleeper between cab and box;
    box must be white; **Freight Securement:** two rows E-Trac …; four E-Trac
    ratcheting straps; two E-Trac shoring beams; four 4' 2x4s; hammer and
    nails; cargo door lock; vehicles no more than five years old.
  - **Large Straight Trucks:** scale 13,000-lb payload; (same dims); support
    legs (min 35,000 lb); legal sleeper; white box; **Freight Securement** (as
    captured, no hammer/nails line); no more than five years old.
  - **Tractor Trailers:** cargo payload 44,000 lb; eight model years old or
    less; four tire chains; **Freight Securement:** two rows E-Trac; four
    ratcheting straps; four 4' 2x4s; four tire chains; four E-Trac shoring
    beams; hammer and nails; cargo door lock.

### 4. Contact block  `[data-section="contact"]`
Same "Additional information" purple block as owneroperator prototype:
call 1.866.711.3599 + Owner-Operator opportunities + CDL driver opportunities.

### 5. Footer (system-component)
Same FedEx corporate footer + purple legal bar.

## Interaction model
- Tabs: click / arrow-key, one panel visible, aria-selected + roving tabindex.
- Reduced-motion respected.
- Deep, dense lists: use nested `<ul>` for the time-window groupings so the
  structure is scannable, not a wall of text (the source's own weakness).

## Data attributes
`[data-section]` per section; `[data-block="tabs"]` on the tabs section.
