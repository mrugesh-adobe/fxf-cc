/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-feature. Base: cards.
 * Source: https://customcritical.fedex.com/us/owneroperator/default.shtml (.basic-columns)
 * Generated: 2026-09-21
 *
 * Library convention (Cards): 2 columns, multiple rows.
 *   Row 1: block name (added by createBlock)
 *   Each subsequent row = one card:
 *     Cell 1: Image or Icon (mandatory)
 *     Cell 2: Text content — Title (h2), Description, Call-to-Action
 *
 * Source structure: <div class="basic-columns"> with three <div class="col">
 * children, each containing an <img> followed by a <div class="copy"> holding
 * an <h2>, a description <p>, and one or more CTA <a> links (the third card
 * uses a <ul> of links). One output row per .col.
 */
export default function parse(element, { document }) {
  // Validated against source: direct .col children of .basic-columns
  const cols = Array.from(element.querySelectorAll(':scope > .col'));

  // Empty-block guard
  if (cols.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  cols.forEach((col) => {
    // Cell 1: image (first cell of the row)
    const img = col.querySelector('img');

    // Cell 2: text content. Prefer the .copy container so heading, description,
    // and CTA(s) travel together with their semantics preserved. Fall back to
    // assembling individual nodes if no wrapper exists.
    const copy = col.querySelector('.copy');
    let bodyCell;
    if (copy) {
      bodyCell = copy;
    } else {
      const parts = [];
      const heading = col.querySelector('h1, h2, h3, [class*="title"]');
      if (heading) parts.push(heading);
      const desc = col.querySelector('p');
      if (desc) parts.push(desc);
      parts.push(...Array.from(col.querySelectorAll('a')));
      bodyCell = parts;
    }

    // Every row has 2 cells; pad image cell with '' if missing to keep table even
    cells.push([img || '', bodyCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
