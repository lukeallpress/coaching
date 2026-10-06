# Coaching field guides

Personal AI coaching reference pages by Luke Allpress, served at
`https://lukeallpress.github.io/coaching/<name>/`.

- `src/<name>/content.mjs` — the guide's content records (public copy only)
- `src/guide.css`, `src/guide.js` — shared presentation, inlined at build
- `src/build.mjs` — renders each guide to `<name>/index.html`

```bash
npm run build   # rebuild every guide
npm run dev     # build + serve at http://localhost:4330/<name>/
```

Commit the built `index.html` with its content change; Pages serves `main` as-is.

**Never commit transcripts, pricing, or private session notes.** Only curated,
client-safe copy belongs in `content.mjs`. `.gitignore` blocks the obvious file names.
