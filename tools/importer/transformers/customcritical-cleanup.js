/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: FedEx Custom Critical (customcritical.fedex.com) site-wide cleanup.
 *
 * Removes non-authorable global chrome so only the main page content
 * (banner + main column) is imported. The global header and footer are
 * already migrated separately; the left sidebar (#col-left) is page-chrome
 * navigation, not authorable content.
 *
 * All selectors verified against migration-work/cleaned.html:
 *  - #fxg-header-container / header.fxg-header  -> global site header (lines 11-165)
 *  - #global_footer_reference / footer.fxg-footer -> global site footer (lines 310-497)
 *  - #col-left                                   -> left sidebar local nav + "additional info" (lines 192-252)
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Nothing blocks block parsing on this legacy .shtml page (no cookie banners,
    // modals, or overlays present in captured DOM). Cleanup happens post-parse.
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable global chrome. Selectors from captured DOM.
    WebImporter.DOMUtils.remove(element, [
      '#fxg-header-container', // global header wrapper (verified cleaned.html:11)
      'header.fxg-header',     // header element inside wrapper (verified cleaned.html:12)
      '#global_footer_reference', // global footer wrapper (verified cleaned.html:310)
      'footer.fxg-footer',     // footer element inside wrapper (verified cleaned.html:313)
      '#col-left',             // left sidebar page-chrome nav (verified cleaned.html:192)
      'iframe',                // runtime-injected tracking iframes (e.g. Adobe ID sync)
    ]);

    // Remove runtime-injected Adobe Audience Manager / demdex ID-sync links that
    // are not present in the captured DOM but leak in during live import.
    element.querySelectorAll('a[href*="demdex.net"], a[href*="dpm.demdex"]').forEach((a) => a.remove());
  }
}
