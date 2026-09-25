/**
 * opp-tabs — Advantages tabs (prototype-styled).
 * Structural reference: EDS Block Collection `tabs`; self-contained, does not
 * reuse the shared `tabs` block.
 *
 * Authored model (one row per tab):
 *   cell 1 = tab label
 *   cell 2 = tab panel content (paragraphs, lists, sub-headings)
 * First tab active; horizontal tab strip with a purple active bottom-rule,
 * keyboard-operable (roving tabindex + arrow keys).
 *
 * Variant `cards` (class="opp-tabs cards"): inside each panel an <h2> is a
 * sub-section heading and each <h3> opens a card that takes every following
 * element up to the next heading. Consecutive cards are grouped into a grid;
 * a card whose heading carries an <em> scope tag spans the full row, and a
 * group whose cards hold no list stacks in one column. Authored nodes are
 * moved, never rebuilt.
 *
 * @param {Element} block
 */
function groupCards(cell) {
  const groups = [];
  let group = null;
  let card = null;
  [...cell.children].forEach((el) => {
    if (el.tagName === 'H3') {
      if (!group) {
        group = document.createElement('div');
        group.className = 'opp-tabs-cards';
        el.before(group);
        groups.push(group);
      }
      card = document.createElement('div');
      card.className = 'opp-tabs-card';
      if (el.querySelector('em')) card.classList.add('wide');
      group.append(card);
      card.append(el);
    } else if (/^H[1-2]$/.test(el.tagName)) {
      group = null;
      card = null;
    } else if (card) {
      card.append(el);
    } else {
      group = null;
    }
  });
  groups.forEach((g) => {
    if (!g.querySelector('ul, ol')) g.classList.add('stack');
  });
}

export default function decorate(block) {
  const tablist = document.createElement('div');
  tablist.className = 'opp-tabs-list';
  tablist.setAttribute('role', 'tablist');

  const rows = [...block.children];
  const buttons = [];

  rows.forEach((row, i) => {
    const labelCell = row.children[0];
    if (!labelCell) return;
    const id = (labelCell.textContent || `tab-${i}`).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // panel = the row itself
    row.className = 'opp-tabs-panel';
    row.id = `opp-tabpanel-${id}`;
    row.setAttribute('role', 'tabpanel');
    row.setAttribute('aria-labelledby', `opp-tab-${id}`);
    row.hidden = i !== 0;

    const button = document.createElement('button');
    button.className = 'opp-tabs-tab';
    button.id = `opp-tab-${id}`;
    button.type = 'button';
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `opp-tabpanel-${id}`);
    button.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    button.tabIndex = i === 0 ? 0 : -1;
    button.innerHTML = labelCell.innerHTML;
    buttons.push(button);
    tablist.append(button);
    labelCell.remove();

    if (block.classList.contains('cards')) {
      const content = row.querySelector(':scope > div');
      if (content) groupCards(content);
    }
  });

  function select(button) {
    buttons.forEach((btn) => {
      const sel = btn === button;
      btn.setAttribute('aria-selected', sel ? 'true' : 'false');
      btn.tabIndex = sel ? 0 : -1;
      block.querySelector(`#${btn.getAttribute('aria-controls')}`).hidden = !sel;
    });
  }

  tablist.addEventListener('click', (e) => {
    const btn = e.target.closest('.opp-tabs-tab');
    if (btn) select(btn);
  });
  tablist.addEventListener('keydown', (e) => {
    const i = buttons.indexOf(document.activeElement);
    if (i < 0) return;
    let next = null;
    if (e.key === 'ArrowRight') next = buttons[(i + 1) % buttons.length];
    else if (e.key === 'ArrowLeft') next = buttons[(i - 1 + buttons.length) % buttons.length];
    else if (e.key === 'Home') [next] = buttons;
    else if (e.key === 'End') next = buttons[buttons.length - 1];
    if (next) { e.preventDefault(); select(next); next.focus(); }
  });

  block.prepend(tablist);
}
