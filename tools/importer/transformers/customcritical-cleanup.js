/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: FedEx Custom Critical (customcritical.fedex.com) site-wide cleanup.
 *
 * Removes non-authorable global chrome so only the main page content
 * (banner + sidebar + main column) is imported. The global header and footer
 * are already migrated separately.
 *
 * The left column (#col-left: local "in this section" nav + an "Additional
 * information" callout) IS authorable page content and is kept — it is imported
 * as its own section alongside #col-main so the multi-level nav survives the
 * publishing pipeline as default content (a nested list cannot live inside a
 * block-table cell). Only its decorative inline info icon is dropped.
 *
 * All selectors verified against migration-work/cleaned.html:
 *  - #fxg-header-container / header.fxg-header  -> global site header (lines 11-165)
 *  - #global_footer_reference / footer.fxg-footer -> global site footer (lines 310-497)
 *  - #col-left img.inline-icon                   -> decorative info icon (line ~245)
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Nothing blocks block parsing on this legacy .shtml page (no cookie banners,
    // modals, or overlays present in captured DOM). Cleanup happens post-parse.
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable global chrome. Selectors from captured DOM.
    // NOTE: #col-left is intentionally KEPT — it is authorable page content
    // (local nav + "Additional information") imported as its own section.
    WebImporter.DOMUtils.remove(element, [
      '#fxg-header-container', // global header wrapper (verified cleaned.html:11)
      'header.fxg-header',     // header element inside wrapper (verified cleaned.html:12)
      '#global_footer_reference', // global footer wrapper (verified cleaned.html:310)
      'footer.fxg-footer',     // footer element inside wrapper (verified cleaned.html:313)
      '#col-left img.inline-icon', // decorative info-callout icon (styled via CSS instead)
      'iframe',                // runtime-injected tracking iframes (e.g. Adobe ID sync)
    ]);

    // Remove runtime-injected Adobe Audience Manager / demdex ID-sync links that
    // are not present in the captured DOM but leak in during live import.
    element.querySelectorAll('a[href*="demdex.net"], a[href*="dpm.demdex"]').forEach((a) => a.remove());

    // Strip the SSI directive comment text that leaks in as a text node inside
    // #col-left ("[an error occurred while processing this directive]").
    const colLeft = element.querySelector('#col-left');
    if (colLeft) {
      colLeft.childNodes.forEach((node) => {
        if (node.nodeType === 3 && /processing this directive/i.test(node.textContent)) {
          node.remove();
        }
      });
    }

    // Rewrite legacy internal .shtml links to their migrated EDS paths.
    // Source nav links point to `/us/owneroperator/.../default.shtml` (and
    // `?tab=` states). Left as-is, the importer's path sanitizer turns the dot
    // into `-shtml`, producing broken 404 URLs like `.../default-shtml`. EDS
    // pages are extensionless, so strip `.shtml` (and any query/hash) from
    // same-site relative links. External/absolute links are left untouched.
    element.querySelectorAll('a[href*=".shtml"]').forEach((a) => {
      const href = a.getAttribute('href');
      // only rewrite root-relative internal links (not absolute http(s) URLs)
      if (!href || /^https?:/i.test(href)) return;
      const clean = href.replace(/\.shtml(?:[?#].*)?$/i, '');
      a.setAttribute('href', clean);
    });
  }
}
