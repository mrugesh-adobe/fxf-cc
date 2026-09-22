/**
 * hero-banner — full-width, edge-to-edge banner image (image-only variant of hero).
 * The source banner has no overlaid headline, subheading, or CTA — just a
 * full-bleed image. If an author omits the image, fall back to the no-image
 * treatment so text (if any) stays readable.
 * @param {Element} block the hero-banner block element
 */
export default function decorate(block) {
  if (!block.querySelector(':scope > div:first-child picture')) {
    block.classList.add('no-image');
  }
}
