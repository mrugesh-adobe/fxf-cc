// Metadata-independent dual-fetch: /content first (localhost / aem up), then root (DA/EDS prod)
async function fetchNav() {
  let resp = await fetch('/content/nav.plain.html');
  if (!resp.ok) resp = await fetch('/nav.plain.html');
  if (!resp.ok) return null;
  const html = await resp.text();
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp;
}

// media query that indicates desktop width
const isDesktop = window.matchMedia('(min-width: 900px)');

const SEARCH_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14Z"/>
</svg>`;
const CLOSE_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
</svg>`;

/** Close every open dropdown and hide the overlay. */
function closeAllDropdowns(nav) {
  nav.querySelectorAll('.nav-drop > a[aria-expanded="true"]').forEach((trigger) => {
    trigger.setAttribute('aria-expanded', 'false');
    const li = trigger.closest('.nav-drop');
    if (li) li.setAttribute('aria-expanded', 'false');
  });
  const overlay = document.querySelector('.nav-overlay');
  if (overlay) overlay.classList.remove('nav-overlay-visible');
}

/** Mark the brand (logo) section. */
function decorateBrand(brandSection) {
  brandSection.classList.add('nav-brand');
}

/** Build the primary nav sections with click-triggered dropdowns. */
function decorateSections(sectionsWrap, nav) {
  sectionsWrap.classList.add('nav-sections');
  const topList = sectionsWrap.querySelector(':scope > ul');
  if (!topList) return;
  topList.querySelectorAll(':scope > li').forEach((li) => {
    const submenu = li.querySelector(':scope > ul');
    if (!submenu) return;
    li.classList.add('nav-drop');
    li.setAttribute('aria-expanded', 'false');
    const trigger = li.querySelector(':scope > a');
    if (!trigger) return;
    // aria-expanded lives on the trigger link (the expandable control) and is
    // mirrored on the li so CSS can key panel visibility off either.
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.addEventListener('click', (e) => {
      // top-level trigger only toggles the panel (href is '#')
      if (trigger.getAttribute('href') === '#') e.preventDefault();
      const wasOpen = trigger.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns(nav);
      if (!wasOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        li.setAttribute('aria-expanded', 'true');
        const overlay = document.querySelector('.nav-overlay');
        if (overlay && isDesktop.matches) overlay.classList.add('nav-overlay-visible');
      }
    });
  });
}

/** Build the tools section, converting the search marker into an expandable search form. */
function decorateTools(toolsSection, nav) {
  toolsSection.classList.add('nav-tools');
  const marker = toolsSection.querySelector('p');
  const placeholder = marker ? marker.textContent.trim() : 'Search';
  if (marker) marker.remove();

  const searchWrap = document.createElement('div');
  searchWrap.className = 'nav-search';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-search-toggle';
  toggle.setAttribute('aria-label', 'Search');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = SEARCH_ICON;

  const form = document.createElement('form');
  form.className = 'nav-search-form';
  form.setAttribute('role', 'search');
  form.action = 'https://www.fedex.com/apps/search/';
  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.placeholder = placeholder;
  input.setAttribute('aria-label', placeholder);
  form.append(input);

  toggle.addEventListener('click', () => {
    const open = searchWrap.classList.toggle('nav-search-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.innerHTML = open ? CLOSE_ICON : SEARCH_ICON;
    if (open) {
      closeAllDropdowns(nav);
      input.focus();
    }
  });

  searchWrap.append(form, toggle);
  toolsSection.append(searchWrap);
}

/** Reset nav to its default (closed) state — used when crossing breakpoints. */
function resetNav(nav, hamburgerBtn) {
  closeAllDropdowns(nav);
  nav.setAttribute('aria-expanded', 'false');
  document.body.style.overflowY = '';
  if (hamburgerBtn) {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Open navigation');
  }
  const searchWrap = nav.querySelector('.nav-search');
  if (searchWrap) {
    searchWrap.classList.remove('nav-search-open');
    const st = searchWrap.querySelector('.nav-search-toggle');
    if (st) { st.setAttribute('aria-expanded', 'false'); st.innerHTML = SEARCH_ICON; }
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const fragment = await fetchNav();
  block.textContent = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';

  const sections = fragment ? [...fragment.children] : [];
  const [brand, primary, tools] = sections;

  if (brand) { nav.append(brand); decorateBrand(brand); }

  // hamburger (mobile)
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation" aria-expanded="false">
      <span class="nav-hamburger-icon"></span>
    </button>`;

  if (primary) { nav.append(primary); decorateSections(primary, nav); }
  if (tools) { nav.append(tools); decorateTools(tools, nav); }

  nav.prepend(hamburger);
  const hamburgerBtn = hamburger.querySelector('button');
  hamburgerBtn.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    hamburgerBtn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    hamburgerBtn.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
    if (expanded) closeAllDropdowns(nav);
  });
  nav.setAttribute('aria-expanded', 'false');

  // overlay behind open desktop dropdowns
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.addEventListener('click', () => closeAllDropdowns(nav));

  // close dropdowns when clicking outside the nav
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) closeAllDropdowns(nav);
  });
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') closeAllDropdowns(nav);
  });

  // handle viewport transitions between mobile and desktop
  isDesktop.addEventListener('change', () => resetNav(nav, hamburgerBtn));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
  block.append(overlay);
}
