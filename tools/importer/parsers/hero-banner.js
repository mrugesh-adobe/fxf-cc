/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner. Base: hero.
 * Source: https://customcritical.fedex.com/us/owneroperator/default.shtml (#banner-img)
 * Generated: 2026-09-21
 *
 * Library convention (Hero): 1 column, 3 rows.
 *   Row 1: block name (added by createBlock)
 *   Row 2: Background image (optional)
 *   Row 3: Title / Subheading / CTA (optional)
 * This instance is image-only: a single full-width banner <img> with no
 * heading, subheading, or CTA. Output is a hero block with one cell holding
 * the image. Content row is added only if text/CTA content is present
 * (cross-page resilience).
 */
export default function parse(element, { document }) {
  // Background/banner image — validated against source: <div id="banner-img"><img></div>
  const bgImage = element.querySelector('img');

  // Optional text content (not present on this page, but handled for other instances)
  const heading = element.querySelector('h1, h2, .hero-heading, [class*="title"]');
  const description = element.querySelector('p, .hero-description, [class*="subtitle"]');
  const ctaLinks = Array.from(element.querySelectorAll('a.cta, a.button, .hero-cta a'));

  // Empty-block guard: nothing to import
  if (!bgImage && !heading && !description && ctaLinks.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image (1 column — one cell)
  if (bgImage) cells.push([bgImage]);

  // Row 3: text content (only if present)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  contentCell.push(...ctaLinks);
  if (contentCell.length) cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
