/**
 * opp-hero — Owner/Operator intro hero (prototype-styled).
 * Self-contained; does not reuse the shared hero-banner block.
 *
 * Authored model (one part per row, single cell each, any order):
 *   <h1> headline
 *   paragraph(s) — the first becomes the lede, later ones supporting copy
 *   optional list — rendered as an orange-marker list
 *   CTA paragraphs — primary <strong><a>, secondary <em><a>, one link per
 *                    paragraph (decorateButtons classes them before this runs)
 *   optional <picture>/<img> — hero image band; without one the copy spans
 *                    the full width
 *
 * Authored elements are MOVED into the layout in authored order (never
 * rebuilt) so they stay editable; layout classes live on wrapper divs.
 * @param {Element} block
 */
function wrap(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

export default function decorate(block) {
  const nodes = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => nodes.push(...cell.children));

  const copy = document.createElement('div');
  copy.className = 'opp-hero-copy';
  let media = null;
  let actions = null;
  let textCount = 0;

  nodes.forEach((node) => {
    if (/^H[1-6]$/.test(node.tagName)) {
      copy.append(node);
    } else if (node.matches('picture, img') || node.querySelector('picture, img')) {
      if (!media) {
        media = document.createElement('div');
        media.className = 'opp-hero-media';
      }
      media.append(node);
    } else if (node.tagName === 'P' && node.querySelector('a')) {
      if (!actions) {
        actions = document.createElement('div');
        actions.className = 'opp-hero-actions';
        copy.append(actions);
      }
      actions.append(node);
    } else if (node.tagName === 'UL' || node.tagName === 'OL') {
      copy.append(wrap(node, 'opp-hero-list'));
    } else {
      copy.append(wrap(node, textCount === 0 ? 'opp-hero-lede' : 'opp-hero-sub'));
      textCount += 1;
    }
  });

  const grid = document.createElement('div');
  grid.className = 'opp-hero-grid';
  grid.append(copy);

  if (media) {
    const img = media.querySelector('img');
    if (img) {
      img.loading = 'eager';
      img.setAttribute('fetchpriority', 'high');
    }
    grid.append(media);
  } else {
    grid.classList.add('opp-hero-nomedia');
  }

  block.replaceChildren(grid);
}
