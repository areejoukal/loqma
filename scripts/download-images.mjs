// scripts/download-images.mjs
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseDir = join(__dirname, '..', 'public', 'images', 'products');

const images = {
  'hummus': 'photo-1637949385162-e416fb15b2ce',
  'mutabbal': 'photo-1541529086526-db283c563270',
  'tabbouleh': 'photo-1540189549336-e6e99c3679fe',
  'falafel': 'photo-1593001874117-c99c800e3eb8',
  'warak-enab': 'photo-1601050690597-df0568f70950',
  'fattoush': 'photo-1512621776951-a57141f2eefd',
  'grilled-chicken': 'photo-1604908176997-125f25cc6f3d',
  'lamb-mansaf': 'photo-1544025162-d76694265947',
  'kebab': 'photo-1529042410759-befb1204b468',
  'shish-tawook': 'photo-1598515214211-89d3c73ae83b',
  'musakhan': 'photo-1610057099443-fde8c4d50f91',
  'maqluba': 'photo-1512058564366-18510be2db19',
  'shawarma-plate': 'photo-1529006557810-274b9b2fc783',
  'fish-sayadieh': 'photo-1467003909585-2f8a72700288',
  'kunafa': 'photo-1519676867240-f03562e64548',
  'baklava': 'photo-1571115177098-24ec42ed204d',
  'muhallebi': 'photo-1488477181946-6428a0291777',
  'basbousa': 'photo-1519676867240-f03562e64548',
  'umm-ali': 'photo-1488477181946-6428a0291777',
  'halawet-el-jibn': 'photo-1571115177098-24ec42ed204d',
  'mint-lemonade': 'photo-1513558161293-cdaf765ed2fd',
  'arabic-coffee': 'photo-1447933601403-0c6688de566e',
  'mint-tea': 'photo-1544787219-7f47ccb76574',
  'orange-juice': 'photo-1600271886742-f049cd451bba',
  'ayran': 'photo-1550583724-b2692b85b150',
  'hibiscus': 'photo-1544787219-7f47ccb76574',
};

await mkdir(baseDir, { recursive: true });

let ok = 0, skip = 0, fail = 0;
for (const [slug, id] of Object.entries(images)) {
  const dest = join(baseDir, `${slug}.jpg`);
  try {
    await access(dest);
    console.log(`[skip] ${slug}.jpg`);
    skip++;
    continue;
  } catch { /* not exist */ }
  try {
    const url = `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`[ok] ${slug}.jpg`);
    ok++;
  } catch (e) {
    console.error(`[fail] ${slug} - ${e.message}`);
    fail++;
  }
}
console.log(`\nDone: ok=${ok}, skip=${skip}, fail=${fail}`);
console.log(`Location: ${baseDir}`);