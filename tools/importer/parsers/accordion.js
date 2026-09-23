/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion. Base: accordion.
 * Source: FedEx Custom Critical Owner Operators — FAQs page.
 *   <div class="block faq">
 *     <div class="copy">
 *       <h2>Eligibility</h2>
 *       <dl><dt>Question…</dt><dd>Answer…</dd></dl>
 *       <h2>Equipment</h2>
 *       <dl><dt>Q…</dt><dd>A…</dd><dt>Q…</dt><dd>A…</dd></dl>
 *       …
 *     </div>
 *   </div>
 *
 * Library convention (Accordion): 2 columns, multiple rows.
 *   Row 1: block name (added by createBlock)
 *   Each subsequent row = one accordion item:
 *     Cell 1: Title cell (mandatory) — the clickable question label
 *     Cell 2: Content cell (mandatory) — the answer revealed when expanded
 *
 * The source groups Q&A pairs under <h2> category headings. Category headings
 * are preserved as default-content headings emitted BEFORE each accordion so the
 * page reads "Category → its questions"; one accordion block is created per
 * category group. Legacy "Close" affordance links inside answers are dropped.
 */
export default function parse(element, { document }) {
  const root = element.querySelector('.copy') || element;

  // Collect the ordered sequence of category headings and their following <dl>s.
  const groups = [];
  let current = null;
  Array.from(root.children).forEach((node) => {
    const tag = node.tagName ? node.tagName.toLowerCase() : '';
    if (tag === 'h2' || tag === 'h3') {
      current = { heading: node, lists: [] };
      groups.push(current);
    } else if (tag === 'dl') {
      if (!current) {
        current = { heading: null, lists: [] };
        groups.push(current);
      }
      current.lists.push(node);
    }
  });

  // Fallback: no category structure — treat every <dl> on the block as one group.
  if (groups.length === 0) {
    const dls = Array.from(element.querySelectorAll('dl'));
    if (dls.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    groups.push({ heading: null, lists: dls });
  }

  const fragment = document.createDocumentFragment();

  groups.forEach((group) => {
    // Emit the category heading as default content before its accordion.
    if (group.heading) fragment.appendChild(group.heading);

    const cells = [];
    group.lists.forEach((dl) => {
      const items = Array.from(dl.children);
      let pendingQuestion = null;
      items.forEach((el) => {
        const tag = el.tagName ? el.tagName.toLowerCase() : '';
        if (tag === 'dt') {
          pendingQuestion = el;
        } else if (tag === 'dd') {
          // drop the legacy "Close" affordance link(s)
          el.querySelectorAll('a.blk.close, a.close, .blk.close').forEach((a) => a.remove());

          // Cell 1: title (the question)
          const labelCell = document.createElement('div');
          if (pendingQuestion) {
            const q = document.createElement('p');
            q.append(...pendingQuestion.childNodes);
            labelCell.appendChild(q);
          }
          // Cell 2: content (the answer)
          const bodyCell = document.createElement('div');
          bodyCell.append(...el.childNodes);

          cells.push([labelCell, bodyCell]);
          pendingQuestion = null;
        }
      });
    });

    if (cells.length > 0) {
      const block = WebImporter.Blocks.createBlock(document, { name: 'accordion', cells });
      fragment.appendChild(block);
    }
  });

  if (!fragment.childNodes.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  element.replaceWith(fragment);
}
