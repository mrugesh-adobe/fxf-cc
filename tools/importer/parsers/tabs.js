/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs. Base: tabs.
 * Source: FedEx Custom Critical Owner Operators — advantages/overview pages.
 *   <div class="block tabs" id="tabs">
 *     <ul class="nav-tabs"><li><a href="#programs">Programs</a></li>...</ul>
 *     <div id="programs" class="tab-content tab-content-on">…panel…</div>
 *     <div id="comm" class="tab-content">…panel…</div>
 *     <div id="tools" class="tab-content">…panel…</div>
 *   </div>
 *
 * Library convention (Tabs): 2 columns, multiple rows.
 *   Row 1: block name (added by createBlock)
 *   Each subsequent row = one tab:
 *     Cell 1: Tab label (mandatory)
 *     Cell 2: Tab content (mandatory) — the panel shown when the tab is selected
 * Tabs are matched to panels by the nav anchor's href (#id) → panel id,
 * falling back to nav order if a panel id is missing.
 */
export default function parse(element, { document }) {
  const navLinks = Array.from(element.querySelectorAll('.nav-tabs a, ul.nav-tabs a'));
  const panels = Array.from(element.querySelectorAll(':scope > .tab-content, .tab-content'));

  // Empty-block guard
  if (navLinks.length === 0 && panels.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  const usedPanels = new Set();

  navLinks.forEach((link, i) => {
    const label = (link.textContent || '').trim();
    // resolve panel by href="#id"; fall back to positional order
    const href = link.getAttribute('href') || '';
    const id = href.startsWith('#') ? href.slice(1) : '';
    let panel = null;
    if (id) {
      panel = element.querySelector(`[id="${id}"]`);
    }
    if (!panel || !panel.classList.contains('tab-content')) {
      panel = panels[i] || null;
    }

    // Cell 1: tab label
    const labelEl = document.createElement('p');
    labelEl.textContent = label;

    // Cell 2: tab panel content (unwrap the panel div, keep its inner content)
    const panelCell = document.createElement('div');
    if (panel) {
      usedPanels.add(panel);
      panelCell.append(...panel.childNodes);
    }
    cells.push([labelEl, panelCell]);
  });

  // Any panels with no matching nav link → append as extra rows (resilience).
  panels.forEach((panel) => {
    if (usedPanels.has(panel)) return;
    const labelEl = document.createElement('p');
    labelEl.textContent = (panel.id || 'Tab').trim();
    const panelCell = document.createElement('div');
    panelCell.append(...panel.childNodes);
    cells.push([labelEl, panelCell]);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs', cells });
  element.replaceWith(block);
}
