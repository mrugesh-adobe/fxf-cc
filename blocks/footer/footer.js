// Metadata-independent dual-fetch: /content first (localhost / aem up), then root (DA/EDS prod)
async function fetchFooter() {
  let resp = await fetch('/content/footer.plain.html');
  if (!resp.ok) resp = await fetch('/footer.plain.html');
  if (!resp.ok) return null;
  const html = await resp.text();
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const fragment = await fetchFooter();
  block.textContent = '';

  const footer = document.createElement('div');
  footer.className = 'footer-content';

  const sections = fragment ? [...fragment.children] : [];
  const [primary, social, copyright] = sections;

  // section 0 — primary link columns
  if (primary) {
    primary.classList.add('footer-primary');
    footer.append(primary);
  }

  // section 1 — social icons
  if (social) {
    social.classList.add('footer-social');
    footer.append(social);
  }

  // section 2 — copyright bar (legal links become a pipe-separated inline list)
  if (copyright) {
    copyright.classList.add('footer-copyright');
    footer.append(copyright);
  }

  block.append(footer);
}
