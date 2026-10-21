// 챔피언스시티 공유 저장 서버 (Cloudflare Worker + D1)
// /api/* 만 이 코드가 처리하고, 나머지 화면 파일은 public 폴더에서 그대로 나갑니다.
let ready = false;
async function init(db) {
  if (ready) return;
  await db.batch([
    db.prepare('CREATE TABLE IF NOT EXISTS kv (s TEXT NOT NULL, k TEXT NOT NULL, v TEXT, at INTEGER, by TEXT, sv INTEGER, PRIMARY KEY (s, k))'),
    db.prepare('CREATE INDEX IF NOT EXISTS kv_sv ON kv (sv)'),
    db.prepare('CREATE TABLE IF NOT EXISTS hist (id INTEGER PRIMARY KEY AUTOINCREMENT, s TEXT, k TEXT, v TEXT, at INTEGER, by TEXT, sv INTEGER)')
  ]);
  ready = true;
}
const H = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: H });

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(req);
    if (!env.DB) return J({ ok: false, err: 'DB 연결 없음 (wrangler.jsonc 의 d1_databases 확인)' }, 500);
    await init(env.DB);
    const key = req.headers.get('x-key') || '';
    const auth = !!env.STAFF_KEY && key === env.STAFF_KEY;
    if (url.pathname === '/api/ping') return J({ ok: true, auth, hasKey: !!env.STAFF_KEY });
    if (!auth) return J({ ok: false, err: 'auth' }, 401);

    if (url.pathname === '/api/pull' && req.method === 'GET') {
      const since = Number(url.searchParams.get('since')) || 0, LIM = 3000;
      const r = await env.DB.prepare('SELECT s, k, v, at, by, sv FROM kv WHERE sv > ? ORDER BY sv LIMIT ?').bind(since, LIM).all();
      const rows = r.results || [];
      return J({ ok: true, now: rows.length ? rows[rows.length - 1].sv : since, more: rows.length === LIM, rows });
    }

    if (url.pathname === '/api/push' && req.method === 'POST') {
      let b; try { b = await req.json(); } catch (e) { return J({ ok: false, err: 'json' }, 400); }
      const rows = (b.rows || []).filter(x => x && x.s && x.k != null).slice(0, 500);
      let sv = Date.now() * 1000;
      const st = [];
      for (const x of rows) {
        sv += 1;
        const v = typeof x.v === 'string' ? x.v : JSON.stringify(x.v);
        const at = Number(x.at) || Date.now(), by = String(x.by || '').slice(0, 40);
        st.push(env.DB.prepare('INSERT INTO kv (s, k, v, at, by, sv) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT (s, k) DO UPDATE SET v = excluded.v, at = excluded.at, by = excluded.by, sv = excluded.sv WHERE excluded.at >= kv.at').bind(x.s, String(x.k), v, at, by, sv));
        st.push(env.DB.prepare('INSERT INTO hist (s, k, v, at, by, sv) VALUES (?, ?, ?, ?, ?, ?)').bind(x.s, String(x.k), v, at, by, sv));
      }
      for (let i = 0; i < st.length; i += 100) await env.DB.batch(st.slice(i, i + 100));
      return J({ ok: true, n: rows.length });
    }

    if (url.pathname === '/api/hist' && req.method === 'GET') {
      const s = url.searchParams.get('s') || '', k = url.searchParams.get('k') || '';
      const r = await env.DB.prepare('SELECT v, at, by FROM hist WHERE s = ? AND k = ? ORDER BY id DESC LIMIT 50').bind(s, k).all();
      return J({ ok: true, rows: r.results || [] });
    }
    return J({ ok: false, err: 'notfound' }, 404);
  }
};
