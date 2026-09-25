#!/usr/bin/env node
/*
 * Pull the latest content from Document Authoring (da.live) into the local
 * content mirror.
 *
 * DA stores each page as a full HTML document at
 *   https://admin.da.live/source/{org}/{repo}/{path}.html
 * The local mirror stores just the inner <main> content as {path}.plain.html,
 * with image URLs rewritten to the local /media-da/... convention.
 *
 * Usage:
 *   node tools/da-sync.mjs           # dry-run: report what would change
 *   node tools/da-sync.mjs --write   # apply changes to the local mirror
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ORG = 'mrugesh-adobe';
const REPO = 'fxf-cc';
const LIST_API = `https://admin.da.live/list/${ORG}/${REPO}`;
const SOURCE_API = `https://admin.da.live/source/${ORG}/${REPO}`;
const CONTENT_DIR = new URL('../content/', import.meta.url).pathname;

const WRITE = process.argv.includes('--write');

// Recursively list all HTML documents in the DA tree.
async function listHtml(path = '') {
  const res = await fetch(`${LIST_API}${path}`);
  if (!res.ok) throw new Error(`list ${path}: ${res.status}`);
  const entries = await res.json();
  const out = [];
  for (const e of entries) {
    if (e.ext === 'html') {
      out.push(e.path.replace(`/${ORG}/${REPO}`, ''));
    } else if (!e.ext) {
      // directory
      out.push(...await listHtml(e.path.replace(`/${ORG}/${REPO}`, '')));
    }
  }
  return out;
}

// Extract the inner HTML of <main>.
function extractMain(html) {
  const m = html.match(/<main>([\s\S]*)<\/main>/i);
  return m ? m[1].trim() : html.trim();
}

// Rewrite DA media URLs to the local /media-da convention:
//   https://content.da.live/org/site/path/.folder/file → /media-da/org/site/path/folder/file
function rewriteMedia(html) {
  return html.replace(
    /https:\/\/content\.da\.live\/([^"'\s)]+)/g,
    (full, rest) => `/media-da/${rest.replace(/\/\.([^/]+\/)/g, '/$1')}`,
  );
}

// Unwrap single <p> inside metadata block cells:
//   <div><p>Title</p></div> → <div>Title</div>  (only within .metadata)
function unwrapMetadataParagraphs(html) {
  const start = html.indexOf('<div class="metadata">');
  if (start === -1) return html;
  const before = html.slice(0, start);
  const region = html.slice(start);
  return before + region.replace(/<div><p>([\s\S]*?)<\/p><\/div>/g, '<div>$1</div>');
}

function transform(daHtml) {
  let h = extractMain(daHtml);
  h = rewriteMedia(h);
  h = unwrapMetadataParagraphs(h);
  return h;
}

// Download any content.da.live media referenced by a DA doc that is missing
// from the local /media-da mirror. Returns [downloaded, skipped] counts.
async function syncMedia(daHtml) {
  const urls = [...new Set([...daHtml.matchAll(/https:\/\/content\.da\.live\/[^"'\s)]+/g)].map((m) => m[0]))];
  let downloaded = 0;
  for (const url of urls) {
    const localRel = `media-da/${url.replace('https://content.da.live/', '').replace(/\/\.([^/]+\/)/g, '/$1')}`;
    const localPath = join(CONTENT_DIR, localRel);
    if (existsSync(localPath)) continue;
    console.log(`  MEDIA    ${localRel}`);
    downloaded += 1;
    if (WRITE) {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`  SKIP media ${url}: ${res.status}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      await mkdir(dirname(localPath), { recursive: true });
      await writeFile(localPath, buf);
    }
  }
  return downloaded;
}

const paths = await listHtml();
paths.sort();

let changed = 0;
let created = 0;
let unchanged = 0;
let media = 0;

for (const p of paths) {
  const res = await fetch(`${SOURCE_API}${p}`);
  if (!res.ok) {
    console.error(`  SKIP ${p}: source ${res.status}`);
    continue;
  }
  const daHtml = await res.text();
  const next = transform(daHtml);
  media += await syncMedia(daHtml);

  const localRel = p.replace(/\.html$/, '.plain.html');
  const localPath = join(CONTENT_DIR, localRel);
  const exists = existsSync(localPath);
  const prev = exists ? await readFile(localPath, 'utf8') : null;

  if (prev === null) {
    created += 1;
    console.log(`  NEW      ${localRel}`);
  } else if (prev.trim() !== next.trim()) {
    changed += 1;
    console.log(`  CHANGED  ${localRel}`);
  } else {
    unchanged += 1;
    continue;
  }

  if (WRITE) {
    await mkdir(dirname(localPath), { recursive: true });
    await writeFile(localPath, `${next}\n`, 'utf8');
  }
}

console.log('');
console.log(`${WRITE ? 'Applied' : 'Dry-run'}: ${changed} changed, ${created} new, ${unchanged} unchanged, ${media} media (${paths.length} DA docs).`);
if (!WRITE && (changed || created)) console.log('Re-run with --write to apply.');
