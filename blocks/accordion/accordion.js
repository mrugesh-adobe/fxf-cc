/*
 * Accordion Block
 * Recreate an accordion — each row becomes a collapsible <details> item.
 * Structural reference: EDS Block Collection `accordion`.
 * https://www.hlx.live/developer/block-collection/accordion
 *
 * Authored model (one row per Q&A):
 *   cell 1 = item label (the question)
 *   cell 2 = item body  (the answer: paragraphs, lists, links)
 * Category headings are authored as default content between accordion blocks.
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
  });
}
