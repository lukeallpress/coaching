// Renders each guide's content records into a static, zero-dependency page.
// Usage: node src/build.mjs   (writes <slug>/index.html)
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const GUIDES = ['adriana'];

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const list = (items, cls = '') => `<ul${cls ? ` class="${cls}"` : ''}>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
const pairs = (rows) =>
  `<dl class="pairs">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;

const chevron = `<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;

const beacon = `
<svg class="beacon" viewBox="0 0 520 520" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="beam" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#0053A4" stop-opacity="0"/>
      <stop offset="1" stop-color="#0053A4" stop-opacity=".55"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="#0053A4" stroke-width="1.25">
    <circle class="r r1" cx="380" cy="170" r="44" stroke-opacity=".7"/>
    <circle class="r r2" cx="380" cy="170" r="92" stroke-opacity=".45"/>
    <circle class="r r3" cx="380" cy="170" r="150" stroke-opacity=".3"/>
    <circle class="r r4" cx="380" cy="170" r="218" stroke-opacity=".18"/>
    <circle class="r r5" cx="380" cy="170" r="296" stroke-opacity=".1"/>
  </g>
  <path class="arc" d="M 288 170 A 92 92 0 0 1 380 78" fill="none" stroke="#F7941E" stroke-width="2.5" stroke-linecap="round"/>
  <line class="line" x1="0" y1="170" x2="380" y2="170" stroke="url(#beam)" stroke-width="1"/>
  <circle class="halo" cx="380" cy="170" r="16" fill="#F7941E" fill-opacity=".16"/>
  <circle class="dot" cx="380" cy="170" r="6.5" fill="#F7941E"/>
</svg>`;

const mark = `<svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.5"/><circle cx="16" cy="16" r="3.5" fill="#F7941E"/></svg>`;

function habit(h, i) {
  const d = h.deeper;
  const n = String(i + 1).padStart(2, '0');
  return `
<details class="habit" id="${h.id}" name="habit">
  <summary>
    <span class="num">${n}</span>
    <span class="htext"><span class="htitle">${esc(h.title)}</span><span class="take">${esc(h.takeaway)}</span></span>
    ${chevron}
  </summary>
  <div class="panel">
    <p class="body">${esc(h.body)}</p>
    <figure class="prompt">
      <figcaption><span class="label">Try this</span><button type="button" class="copy" data-copy="p-${h.id}" aria-describedby="p-${h.id}">Copy prompt</button></figcaption>
      <blockquote id="p-${h.id}">${esc(h.prompt)}</blockquote>
    </figure>
    <section class="deeper" aria-label="${esc(d.title)}">
      <h4>${esc(d.title)}</h4>
      ${d.intro ? `<p>${esc(d.intro)}</p>` : ''}
      ${d.items ? list(d.items, 'ticks') : ''}
      ${d.quotes ? list(d.quotes.map((q) => `“${q}”`), 'quotes') : ''}
      ${d.pairs ? pairs(d.pairs) : ''}
      ${d.after ? `<p>${esc(d.after)}</p>` : ''}
    </section>
    <p class="remember"><span class="label">Remember</span>${esc(h.remember)}</p>
  </div>
</details>`;
}

function session(s) {
  return `
<article class="session">
  <header>
    <span class="snum">Session ${esc(s.n)}</span>
    <time datetime="${s.date.iso}">${esc(s.date.label)}</time>
  </header>
  <h3>${esc(s.title)}</h3>
  <p>${esc(s.recap)}</p>
  <details class="more">
    <summary>Session details ${chevron}</summary>
    <div class="cols">
      <div><h4>Worked on together</h4>${list(s.workedOn, 'ticks')}</div>
      <div><h4>Still to verify</h4>${list(s.toVerify, 'open')}</div>
      ${s.verified.length ? `<div><h4>Verified working</h4>${list(s.verified, 'ticks')}</div>` : ''}
    </div>
    <p class="shift"><span class="label">The biggest shift</span>${esc(s.shift[0])}<br>${esc(s.shift[1])}</p>
  </details>
</article>`;
}

function page(c) {
  const { meta, hero, habits, next, chain, workflows, sessions, terms, control } = c;
  const nav = [
    ['habits', 'Habits'],
    ['next', 'Next'],
    ['workflows', 'Workflows'],
    ['sessions', 'Sessions'],
    ['vocabulary', 'Vocabulary'],
  ];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#F7F8FA">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#073567"/><circle cx="16" cy="16" r="9" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5"/><circle cx="16" cy="16" r="3.5" fill="#F7941E"/></svg>')}">
<link rel="preload" href="../assets/fonts/lato-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../assets/fonts/lato-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<style>
${c.css}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="masthead">
  <div class="wrap bar">
    <a class="brand" href="#top" aria-label="${esc(meta.title)} — top">${mark}<span><b>${esc(meta.owner)}</b><span class="sep">/</span>AI Field Guide</span></a>
    <nav class="topnav" aria-label="Sections"><ol>${nav.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join('')}</ol></nav>
    <details class="menu">
      <summary aria-label="Sections"><span class="menu-label">Sections</span><span class="burger" aria-hidden="true"><i></i><i></i></span></summary>
      <nav aria-label="Sections menu"><ol>${nav.map(([id, l], i) => `<li><a href="#${id}"><span>${String(i + 1).padStart(2, '0')}</span>${l}</a></li>`).join('')}</ol></nav>
    </details>
  </div>
</header>

<main id="main">
<section class="hero" id="top">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${esc(hero.eyebrow)}</p>
      <h1>${hero.headline.map((l) => `<span>${esc(l)}</span>`).join(' ')}</h1>
      <p class="lede">${esc(hero.lede)}</p>
      <div class="actions">
        <a class="btn" href="#habits">Explore the five habits</a>
        <a class="next-chip" href="#next"><span class="dot" aria-hidden="true"></span>Next · <b>${esc(next.date.month)} ${esc(next.date.day)}</b> <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <div class="hero-art">${beacon}</div>
  </div>
</section>

<section class="sec" id="habits" aria-labelledby="habits-h">
  <div class="wrap split">
    <header class="sec-head">
      <h2 id="habits-h">Five habits that change the way you work.</h2>
      <p class="sub">Tap a habit for a ready-to-use prompt and the thinking behind it.</p>
    </header>
    <div class="habits">${habits.map(habit).join('')}</div>
  </div>
</section>

<section class="band" id="next" aria-labelledby="next-h">
  <div class="wrap">
    <div class="next-grid">
      <div class="next-head">
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
          <p class="success"><span class="label">Success looks like</span>${esc(next.success)}</p>
        </details>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="workflows" aria-labelledby="wf-h">
  <div class="wrap split">
    <header class="sec-head">
      <p class="eyebrow">Connected workflows</p>
      <h2 id="wf-h">The real value is in what happens next.</h2>
      <ol class="chain" aria-label="The pattern">${chain.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
    </header>
    <div class="workflows">
      ${workflows
        .map(
          (w, i) => `
      <details class="wf" id="${w.id}">
        <summary>
          <span class="wf-n">Workflow ${String(i + 1).padStart(2, '0')}</span>
          <span class="wf-t">${esc(w.title)}</span>
          <q>${esc(w.question)}</q>
          <span class="wf-more">See the steps ${chevron}</span>
        </summary>
        <ol class="steps">${w.steps.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join('')}</ol>
      </details>`,
        )
        .join('')}
      <p class="note">Start with one recurring friction point and make that work reliably. You don’t have to build the whole system at once.</p>
    </div>
  </div>
</section>

<section class="sec alt" id="sessions" aria-labelledby="sessions-h">
  <div class="wrap split">
    <header class="sec-head">
      <p class="eyebrow">Session notes</p>
      <h2 id="sessions-h">Your progress, so far.</h2>
    </header>
    <div class="sessions">${[...sessions].reverse().map(session).join('')}</div>
  </div>
</section>

<section class="sec" id="vocabulary" aria-labelledby="vocab-h">
  <div class="wrap split">
    <header class="sec-head">
      <p class="eyebrow">Vocabulary</p>
      <h2 id="vocab-h">The vocabulary, without the mystique.</h2>
      <p class="sub">Enough fluency to follow the conversation — and ask better questions.</p>
    </header>
    <div class="terms">${terms
      .map(([t, d]) => `<details class="term" id="term-${slug(t)}"><summary>${esc(t)}${chevron}</summary><p>${esc(d)}</p></details>`)
      .join('')}</div>
  </div>
</section>

<section class="sec control" aria-labelledby="control-h">
  <div class="wrap split">
    <header class="sec-head">
      <h2 id="control-h">${esc(control.title)}</h2>
      <p class="sub">${esc(control.lede)}</p>
    </header>
    <div>
      <ul class="rules">${control.lines.map(([k, v]) => `<li><b>${esc(k)}</b> ${esc(v)}</li>`).join('')}</ul>
      <p class="close">${esc(control.close)}</p>
    </div>
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap">
    <p>${mark}<span>A personal field guide for ${esc(meta.owner)} · Coaching with <a href="${meta.coach.url}">${esc(meta.coach.name)}</a></span></p>
    <p class="sign">${esc(hero.signoff)}</p>
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

const [css, js] = await Promise.all([
  readFile(join(root, 'src/guide.css'), 'utf8'),
  readFile(join(root, 'src/guide.js'), 'utf8'),
]);

for (const g of GUIDES) {
  const content = await import(join(root, 'src', g, 'content.mjs'));
  const out = join(root, g, 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, page({ ...content, css, js }));
  console.log(`built ${g}/index.html`);
}
