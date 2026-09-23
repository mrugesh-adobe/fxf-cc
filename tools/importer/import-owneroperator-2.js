/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBannerParser from './parsers/hero-banner.js';
import tabsParser from './parsers/tabs.js';
import accordionParser from './parsers/accordion.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/customcritical-cleanup.js';
import sectionsTransformer from './transformers/customcritical-sections.js';

// PAGE TEMPLATE CONFIGURATION — embedded from page-templates.json (owneroperator-2)
const PAGE_TEMPLATE = {
  name: 'owneroperator-2',
  description: 'Owner Operators sub-pages: full-width banner, left sidebar, main column with tabs (overview/advantages) or an FAQ accordion (faqs).',
  urls: [
    'https://customcritical.fedex.com/us/owneroperator/overview/default.shtml',
    'https://customcritical.fedex.com/us/owneroperator/advantages/default.shtml',
    'https://customcritical.fedex.com/us/owneroperator/faqs/default.shtml',
  ],
  blocks: [
    {
      name: 'hero-banner',
      instances: ['#banner-img', '#banner .fx_clearfix #banner-img'],
    },
    {
      name: 'tabs',
      instances: ['#col-main .block.tabs', '#col-main #tabs.block.tabs'],
    },
    {
      name: 'accordion',
      instances: ['#col-main .block.faq'],
    },
  ],
  sections: [
    {
      id: 'rc1',
      name: 'banner',
      selector: ['#banner'],
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'rc2',
      name: 'sidebar',
      selector: ['#col-left'],
      style: null,
      blocks: [],
      defaultContent: ['#col-left #nav-local', '#col-left .basic-icon-single', '#col-left .sag-wrap'],
    },
    {
      id: 'rc3',
      name: 'main',
      selector: ['#col-main'],
      style: null,
      blocks: ['tabs', 'accordion'],
      defaultContent: ['#col-main h1', '#col-main > .copy > p:first-of-type'],
    },
  ],
};

// PARSER REGISTRY
const parsers = {
  'hero-banner': heroBannerParser,
  tabs: tabsParser,
  accordion: accordionParser,
};

// TRANSFORMER REGISTRY — cleanup first, then sections (only when 2+ sections)
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook.
 * @param {string} hookName 'beforeTransform' or 'afterTransform'
 * @param {Element} element DOM element to transform
 * @param {Object} payload { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page from the embedded template config.
 * @param {Document} document
 * @param {Object} template
 * @returns {Array}
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        // avoid double-registering the same element via multiple selectors
        if (pageBlocks.some((b) => b.element === element)) return;
        pageBlocks.push({
          name: blockDef.name, selector, element, section: blockDef.section || null,
        });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const {
      document, url, html, params,
    } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. find blocks
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. parse each block (skip elements already replaced by an earlier parser)
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 5b. Add a Template metadata row so the published page gets a
    // `body.owneroperator-2` class (decorateTemplateAndTheme). This scopes the
    // sidebar + main two-column grid CSS to this template. This vendored
    // boilerplate does not process Section Metadata, so a body template class
    // is the reliable page-level styling hook. createMetadata emits a <table>
    // whose header cell reads "Metadata".
    const metadataTable = [...main.querySelectorAll('table')].find((t) => {
      const th = t.querySelector('tr:first-child th');
      return th && /^metadata$/i.test(th.textContent.trim());
    });
    if (metadataTable) {
      const tr = document.createElement('tr');
      const keyCell = document.createElement('td');
      // lowercase key so getMetadata('template') matches both the local
      // aem-up server (case-sensitive) and the pipeline (which lowercases).
      keyCell.textContent = 'template';
      const valCell = document.createElement('td');
      valCell.textContent = PAGE_TEMPLATE.name;
      tr.append(keyCell, valCell);
      metadataTable.appendChild(tr);
    }

    // 6. sanitized path (map root URL to /index to avoid empty-path crash)
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
