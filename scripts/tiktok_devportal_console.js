// Paste this into the browser console on https://developers.tiktok.com
// It fetches all docs and downloads tiktok-devportal-docs.json

(async () => {
  const BASE = 'https://developers.tiktok.com';
  const DELAY = 300;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const results = {};
  let done = 0, errors = 0;

  async function fetchDoc(slug) {
    const url = `${BASE}/doc/${slug}?enter_method=left_navigation&_data=routes%2Fdoc.%24id`;
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error(`[ERROR] ${slug}:`, e.message);
      errors++;
      return null;
    }
  }

  function collectSlugs(tree) {
    const slugs = [];
    function walk(node) {
      // Only real page slugs (kebab-case), skip random folder IDs
      if (node.key && /^[a-z][a-z0-9-]+$/.test(node.key)) {
        slugs.push({ slug: node.key, name: node.name });
      }
      (node.children || []).forEach(walk);
    }
    tree.forEach(walk);
    return slugs;
  }

  console.log('Fetching doc tree...');
  const seed = await fetchDoc('overview');
  if (!seed?.docTree) { console.error('Failed. Make sure VPN is active.'); return; }

  results.__tree__ = seed.docTree;
  results.__flatTree__ = seed.flattenedTree;

  const slugs = collectSlugs(seed.docTree);
  console.log(`Found ${slugs.length} pages. Fetching...`);

  for (const { slug, name } of slugs) {
    console.log(`[${done + 1}/${slugs.length}] ${name}`);
    const data = await fetchDoc(slug);
    if (data?.doc) {
      results[slug] = {
        title: data.doc.Title,
        content: data.doc.Content,
        isFolder: data.doc.IsFolder,
        url: data.doc.WebUrl,
      };
    }
    done++;
    await sleep(DELAY);
  }

  console.log(`Done! ${done} pages, ${errors} errors. Saving to project...`);
  const res = await fetch('http://localhost:9876', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(results),
  });
  if (res.ok) {
    console.log('✅ Saved directly to project! Tell Claude to process it.');
  } else {
    console.error('Server not running? Start it with: python3 scripts/receiver_server.py');
  }
})();
