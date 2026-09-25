/**
 * opp-accordion — FAQ accordion (prototype-styled).
 * Structural reference: EDS Block Collection `accordion`; self-contained.
 *
 * Authored model (one row per Q&A):
 *   cell 1 = question (label)
 *   cell 2 = answer (paragraphs, lists)
 * Each row becomes a collapsible <details>, collapsed by default, with an
 * orange +/- indicator drawn in CSS.
 *
 * @param {Element} block
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    const label = row.children[0];
    const body = row.children[1];
    if (!label || !body) return;

    const summary = document.createElement('summary');
    summary.className = 'opp-accordion-label';
    summary.append(...label.childNodes);

    const icon = document.createElement('span');
    icon.className = 'opp-accordion-icon';
    icon.setAttribute('aria-hidden', 'true');
    summary.append(icon);

    body.className = 'opp-accordion-body';

    const details = document.createElement('details');
    details.className = 'opp-accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
  });
}
