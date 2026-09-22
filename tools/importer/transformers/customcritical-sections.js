/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: FedEx Custom Critical (customcritical.fedex.com) section breaks.
 *
 * Inserts a section break (<hr>) between the template's sections. From
 * page-templates.json (template "owneroperator"):
 *   - rc1 "banner"  -> selector #banner  (style: null)  [first section, no break]
 *   - rc2 "content" -> selector #content (style: null)  [<hr> before it]
 *
 * Both sections have style: null, so no Section Metadata blocks are emitted;
 * only the single <hr> boundary is inserted (sections.length - 1 = 1).
 *
 * Selectors verified against migration-work/cleaned.html:
 *   - #banner  (verified cleaned.html:182)
 *   - #content (verified cleaned.html:190)
 *
 * Follows the reference implementation: breaks inserted in beforeTransform
 * (while every section element still exists, before parsers replace them),
 * metadata anchored in afterTransform. Sections iterated in reverse.
 */

const SECTION_MARKER_ATTR = 'data-excat-section-id';

// section.selector is an array of candidate selectors — try each in order, first match wins.
function querySection(root, selectors) {
  for (const sel of selectors) {
    const el = root.querySelector(sel);
    if (el) return el;
  }
  return null;
}

export default function transform(hookName, element, payload) {
  const sections = payload.template.sections || [];

  if (hookName === 'beforeTransform') {
    // Insert breaks now, before parsers can replace any section element.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (i === 0 && !section.style) continue; // first section: no leading break, no metadata
      const sectionEl = querySection(element, section.selector);
      if (!sectionEl) continue; // no selector matched on this page — skip, never guess

      const hr = document.createElement('hr');
      if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
      sectionEl.before(hr);
    }
  }

  if (hookName === 'afterTransform') {
    // Parsers have now run and may have replaced section elements. Anchor each
    // styled section's Section Metadata block to whichever still exists.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue; // no style -> no Section Metadata block

      const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
      const anchor = marker || querySection(element, section.selector);
      if (!anchor) continue; // neither survived — skip, never guess

      const metadataBlock = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      anchor.after(metadataBlock);

      if (marker) {
        marker.removeAttribute(SECTION_MARKER_ATTR);
        if (i === 0) marker.remove(); // section 0 never gets a real leading break
      }
    }
  }
}
