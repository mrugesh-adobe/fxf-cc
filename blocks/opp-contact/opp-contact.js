/**
 * opp-contact — "Additional information" purple contact band (prototype-styled).
 *
 * Authored model (single row, single cell):
 *   a phone line (e.g. "Call us now at <a href="tel:...">1.866.711.3599</a>")
 *   followed by CTA links (Owner-Operator / CDL driver opportunities), each
 *   in its own paragraph as <strong><a> / <em><a> (buttonized by
 *   decorateButtons), then optional plain text links (e.g. the extranet
 *   login) which render in a full-width row under the buttons.
 * The block splits the phone line, the button links and the plain links.
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

  // action links: the non-tel anchors, moved as their paragraphs. Button links
  // (classed by decorateButtons) go in the button row; plain links (extranet
  // login) go in a full-width row below it.
  const actions = document.createElement('div');
  actions.className = 'opp-contact-actions';
  const extra = document.createElement('div');
  extra.className = 'opp-contact-extra';
  anchors.filter((a) => a !== phone).forEach((a) => {
    const isButton = a.classList.contains('button') || a.closest('strong, em');
    (isButton ? actions : extra).append(a.closest('p') || a);
  });
  if (actions.children.length) grid.append(actions);
  if (extra.children.length) grid.append(extra);

  block.replaceChildren(grid);
}
