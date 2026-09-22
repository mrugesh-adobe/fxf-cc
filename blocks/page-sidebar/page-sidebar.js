/**
 * page-sidebar — the left "in this section" local navigation plus an
 * "Additional information" callout, migrated from the source #col-left.
 * Reads the authored DOM (a nested nav list + an info callout) and tags
 * the parts so CSS can style them. Content lives in the page document.
 * @param {Element} block the page-sidebar block element
 */
export default function decorate(block) {
  // First cell group = local nav (a nested list). Second = additional-info callout.
  const groups = [...block.children];
  groups.forEach((group, i) => {
    const inner = group.firstElementChild || group;
    if (i === 0) {
      inner.classList.add('page-sidebar-nav');
    } else {
      inner.classList.add('page-sidebar-info');
    }
  });
}
