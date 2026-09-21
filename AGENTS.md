# AGENTS.md

Edge Delivery Services. Read a block first. Omissions are in the repo or known.

## Avoid
- `scripts/aem.js` is vendored. Never edit.
- Markup comes from the backend. `curl localhost:3000/x.plain.html` first.
- `buildAutoBlocks` rewrites content before your block runs.
- Authors omit and add cells. Decorate defensively.
- No build step; devDependencies only.
- Scope CSS to `.blockname`; `-wrapper`/`-container` are section classes.
- `fragment/fragment.js` is the only cross-block import. Otherwise use `/scripts/`.

## Outdated
- `fstab.yaml`, `helix-query.yaml`, `paths.json` are retired. Config lives at tools.aem.live.

## Remember
- `npx -y @adobe/aem-cli up`: local code, previewed content.
- Merging `main` ships code; content publishes separately.
- A PR without a `{branch}--fxf-customcritical--mrugesh-adobe.aem.page/{path}` link is rejected.
- All committed files are served. Use `.hlxignore`.
- Skills: `npm run setup:skills` installs `edge-delivery-services`, `edge-delivery-services-content-ops`, `project-management`, and `stardust` from `adobe/skills` (incl. `docs-search`). Files land in `.agents/skills/`, `.claude/skills/`, and `agent/skills/` — all gitignored, machine-local, never edit or commit them. Only `skills-lock.json` is tracked; run `npm run setup:skills` (or `npx skills experimental_install`) after cloning to restore them.

## Signal
- Prefix any reply where this file's guidance changed what you did with 🦋, so AGENTS.md firing is visible.
