const ORIGIN = "https://poe.ninja";
const EXCHANGE_TYPES = new Set([
  "Currency", "Fragments", "Abyss", "UncutGems", "LineageSupportGems", "Essences",
  "SoulCores", "Idols", "Runes", "Ritual", "Expedition", "Delirium", "Breach", "Verisium"
]);
const headers = {
  "User-Agent": "PoE2 Forbidden Rites Economy Flip Scanner/2.0 (+https://github.com/)",
  "Accept": "application/json"
};
function cors(extra={}) { return {
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Methods":"GET,OPTIONS",
  "Access-Control-Allow-Headers":"Content-Type",
  ...extra
}; }
async function fetchJson(url, ttl=300) {
  const r = await fetch(url, {headers, cf:{cacheEverything:true, cacheTtl:ttl}});
  if(!r.ok) throw new Error(`poe.ninja HTTP ${r.status}`);
  const body = await r.text();
  return new Response(body,{status:200,headers:cors({"Content-Type":"application/json; charset=utf-8","Cache-Control":`public, max-age=${ttl}`})});
}
function bad(message,status=400){return Response.json({ok:false,error:message},{status,headers:cors()})}
export default {
  async fetch(req) {
    if(req.method === "OPTIONS") return new Response(null,{headers:cors()});
    const u = new URL(req.url);
    try {
      if(u.pathname === "/health") return Response.json({ok:true,game:"poe2",scanner:"economy-only",time:new Date().toISOString()},{headers:cors()});
      if(u.pathname === "/leagues") return fetchJson(`${ORIGIN}/poe2/api/economy/leagues`,300);
      if(u.pathname === "/exchange") {
        const league=u.searchParams.get("league"), type=u.searchParams.get("type");
        if(!league || !EXCHANGE_TYPES.has(type)) return bad("Invalid league or economy type");
        return fetchJson(`${ORIGIN}/poe2/api/economy/exchange/current/overview?league=${encodeURIComponent(league)}&type=${encodeURIComponent(type)}`,300);
      }
      return new Response("Not found",{status:404,headers:cors()});
    } catch(e) {
      return bad(e?.message||"Worker error",502);
    }
  }
};
