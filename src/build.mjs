// Renders each guide's content records into static, zero-dependency pages.
// Usage: node src/build.mjs   (writes <slug>/index.html, <slug>/sessions/, <slug>/vocabulary/)
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const GUIDES = ['adriana'];

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const list = (items, cls = '') => `<ul${cls ? ` class="${cls}"` : ''}>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

const chevron = `<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
const arrow = `<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const mark = `<svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.5"/><circle cx="16" cy="16" r="3.5" fill="#F7941E"/></svg>`;
const beacon = `
<svg class="beacon" viewBox="0 0 240 240" aria-hidden="true" focusable="false">
  <g fill="none" stroke="#0053A4" stroke-width="1.25">
    <circle class="r r1" cx="150" cy="90" r="26" stroke-opacity=".7"/>
    <circle class="r r2" cx="150" cy="90" r="54" stroke-opacity=".42"/>
    <circle class="r r3" cx="150" cy="90" r="88" stroke-opacity=".24"/>
    <circle class="r r4" cx="150" cy="90" r="128" stroke-opacity=".12"/>
  </g>
  <path class="arc" d="M 96 90 A 54 54 0 0 1 150 36" fill="none" stroke="#F7941E" stroke-width="2.25" stroke-linecap="round"/>
  <circle cx="150" cy="90" r="11" fill="#F7941E" fill-opacity=".16"/>
  <circle cx="150" cy="90" r="5" fill="#F7941E"/>
</svg>`;

function shell(c, { title, base, body, home }) {
  const { meta, next } = c;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#F7F8FA">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(meta.description)}">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#073567"/><circle cx="16" cy="16" r="9" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5"/><circle cx="16" cy="16" r="3.5" fill="#F7941E"/></svg>')}">
<link rel="preload" href="${base}assets/fonts/lato-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/lato-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<style>
${c.css.replaceAll('../assets/', `${base}assets/`)}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="masthead">
  <div class="wrap bar">
    <a class="brand" href="${home ? '#top' : '../'}" aria-label="${esc(meta.title)}${home ? ' — top' : ' — home'}">${mark}<span><b>${esc(meta.owner)}</b><span class="sep">/</span>AI Coaching</span></a>
    <a class="next-chip" href="${home ? '' : '../'}#next"><span class="dot" aria-hidden="true"></span>Next · <b>${esc(next.date.month)} ${esc(next.date.day)}</b></a>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap">
    <p>${mark}<span>AI coaching reference for ${esc(meta.owner)} · with <a href="${meta.coach.url}">${esc(meta.coach.name)}</a></span></p>
  </div>
</footer>
<div class="toast" role="status" aria-live="polite"></div>
<script>
${c.js}
</script>
</body>
</html>
`;
}

function habit(h, i) {
  const n = String(i + 1).padStart(2, '0');
  const lead = h.prompt
    ? `<figure class="prompt">
      <figcaption><span class="label">Try this</span><button type="button" class="copy" data-copy="p-${h.id}">Copy prompt</button></figcaption>
      <blockquote id="p-${h.id}">${esc(h.prompt)}</blockquote>
    </figure>`
    : `<div class="prompt settings">
      <span class="label">Your settings</span>
      <dl>${h.settings.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    </div>`;
  return `
<details class="habit" id="${h.id}" name="habit"${i === 0 ? ' open' : ''}>
  <summary>
    <span class="num">${n}</span>
    <span class="htext"><span class="htitle">${esc(h.title)}</span><span class="take">${esc(h.takeaway)}</span></span>
    ${chevron}
  </summary>
  <div class="panel">
    ${lead}
    <div class="said">
      <span class="label">From our session</span>
      ${h.quotes.map((q) => `<blockquote>${esc(q)}</blockquote>`).join('')}
    </div>
  </div>
</details>`;
}

function homePage(c) {
  const { intro, habits, next, sessions, terms } = c;
  const latest = sessions[sessions.length - 1];
  const body = `
<section class="intro" id="top">
  <div class="wrap intro-grid">
    <div>
      <h1>${intro.headline.map((l) => `<span>${esc(l)}</span>`).join(' ')}</h1>
      <p class="lede">${esc(intro.lede)}</p>
    </div>
    <div class="intro-art">${beacon}</div>
  </div>
</section>

<section class="habits-sec" aria-label="Five habits">
  <div class="wrap"><div class="habits">${habits.map(habit).join('')}</div></div>
</section>

<section class="band" id="next" aria-labelledby="next-h">
  <div class="wrap next-grid">
    <div>
      <p class="eyebrow">What’s next</p>
      <h2 id="next-h">${esc(next.title)}</h2>
      <div class="date">
        <time datetime="${next.date.iso}"><span class="mo">${esc(next.date.month)}</span><span class="dy">${esc(next.date.day)}</span></time>
        <div><b>${esc(next.date.weekday)} · ${esc(next.date.when)}</b><span>${esc(next.status)}</span></div>
      </div>
    </div>
    <div class="next-body">
      <h3>Try before we meet</h3>
      <ol class="try">${next.tryFirst.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>
      <details class="more on-dark">
        <summary>What we’ll work on ${chevron}</summary>
        ${list(next.focus, 'ticks')}
      </details>
    </div>
  </div>
</section>

<section class="links" aria-label="Reference">
  <div class="wrap cards">
    <a class="card" href="sessions/">
      <span class="eyebrow">Session notes</span>
      <span class="card-t">Session ${esc(latest.n)} · ${esc(latest.title)}</span>
      <span class="card-s">${sessions.length === 1 ? '1 session' : `${sessions.length} sessions`} · latest ${esc(latest.date.short)}</span>
      ${arrow}
    </a>
    <a class="card" href="vocabulary/">
      <span class="eyebrow">Vocabulary</span>
      <span class="card-t">The words, without the mystique</span>
      <span class="card-s">${terms.length} terms, in plain English</span>
      ${arrow}
    </a>
  </div>
</section>`;
  return shell(c, { title: c.meta.title, base: '../', body, home: true });
}

function subHead(eyebrow, title, sub) {
  return `
<section class="sub-head">
  <div class="wrap narrow">
    <a class="back" href="../"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Coaching reference</a>
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h1>${esc(title)}</h1>
    ${sub ? `<p class="lede">${esc(sub)}</p>` : ''}
  </div>
</section>`;
}

function sessionsPage(c) {
  const body = `${subHead('Session notes', 'Your progress, so far.')}
<section class="page-body">
  <div class="wrap narrow">
  ${[...c.sessions]
    .reverse()
    .map(
      (s) => `
    <article class="session">
      <header><span class="snum">Session ${esc(s.n)}</span><time datetime="${s.date.iso}">${esc(s.date.label)}</time></header>
      <h2>${esc(s.title)}</h2>
      <p class="recap">${esc(s.recap)}</p>
      <div class="cols">
        <div><h3>Worked on together</h3>${list(s.workedOn, 'ticks')}</div>
        <div><h3>Still to verify</h3>${list(s.toVerify, 'open')}</div>
        ${s.verified.length ? `<div><h3>Verified working</h3>${list(s.verified, 'ticks')}</div>` : ''}
      </div>
      <p class="shift"><span class="label">The biggest shift</span>${esc(s.shift[0])}<br>${esc(s.shift[1])}</p>
    </article>`,
    )
    .join('')}
  </div>
</section>`;
  return shell(c, { title: `Session notes · ${c.meta.title}`, base: '../../', body });
}

function vocabularyPage(c) {
  const body = `${subHead('Vocabulary', 'The words, without the mystique.', 'Enough fluency to follow the conversation — and ask better questions.')}
<section class="page-body">
  <div class="wrap narrow">
    <dl class="glossary">${c.terms
      .map(
        ([t, d, q]) => `
      <div id="${slug(t)}"><dt>${esc(t)}</dt><dd><p>${esc(d)}</p>${q ? `<blockquote>${esc(q)}</blockquote>` : ''}</dd></div>`,
      )
      .join('')}
    </dl>
  </div>
</section>`;
  return shell(c, { title: `Vocabulary · ${c.meta.title}`, base: '../../', body });
}

const [css, js] = await Promise.all([
  readFile(join(root, 'src/guide.css'), 'utf8'),
  readFile(join(root, 'src/guide.js'), 'utf8'),
]);

for (const g of GUIDES) {
  const content = { ...(await import(join(root, 'src', g, 'content.mjs'))), css, js };
  const pages = { '': homePage, sessions: sessionsPage, vocabulary: vocabularyPage };
  for (const [dir, render] of Object.entries(pages)) {
    const out = join(root, g, dir, 'index.html');
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, render(content));
    console.log(`built ${join(g, dir, 'index.html')}`);
  }
}
