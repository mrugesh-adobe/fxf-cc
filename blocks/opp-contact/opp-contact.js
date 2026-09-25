/**
 * opp-contact — "Additional information" purple contact band (prototype-styled).
 *
 * Authored model (single row, single cell):
 *   a phone line (e.g. "Call us now at <a href="tel:...">1.866.711.3599</a>")
 *   followed by CTA links (Owner-Operator / CDL driver opportunities).
 * The block splits the phone line from the action links and lays them out.
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block;
  const anchors = [...cell.querySelectorAll('a')];
  const phone = anchors.find((a) => (a.getAttribute('href') || '').startsWith('tel:'));

  const grid = document.createElement('div');
  grid.className = 'opp-contact-grid';

  // phone group: everything in the paragraph that holds the tel: link
  if (phone) {
    const phoneGroup = document.createElement('div');
    phoneGroup.className = 'opp-contact-phone-group';
    const par = phone.closest('p') || phone;
    phoneGroup.append(par);
    phone.classList.add('opp-contact-phone');
    grid.append(phoneGroup);
  }

  // action links: the non-tel anchors, moved as their paragraphs
  const actions = document.createElement('div');
  actions.className = 'opp-contact-actions';
  anchors.filter((a) => a !== phone).forEach((a) => actions.append(a.closest('p') || a));
  if (actions.children.length) grid.append(actions);

  block.replaceChildren(grid);
}
