/**
 * Cloudflare Worker: napster-avatar-token  (Ethica — avataragency.ai/ethica/stage)
 *
 * GET /api/avatar-token[?clientId=<id>&name=<name>] → mints a Napster session token
 * for the Ethica agent. clientId/name enable returning-visitor memory.
 *
 * Deployed by dashboard paste. Env: secret NAPSTER_API_KEY · var NAPSTER_AGENT_ID.
 * SOURCE OF TRUTH IS THIS FILE — exported from the dashboard 2026-07-24 (the last
 * dashboard-only artifact in the fleet; DR rule: every dashboard edit lands here too).
 *
 * 2026-07-24: initialSpeech added (finding #84 resolution) — Ethica speaks first.
 */

const NAPSTER_API = "https://companion-api.napster.com/public";
const ALLOWED_ORIGINS = ["https://avataragency.ai", "https://www.avataragency.ai"];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request.headers.get("Origin") || "");

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (url.pathname !== "/api/avatar-token")
      return new Response("Not found", { status: 404, headers: cors });
    if (request.method !== "GET")
      return new Response("Method not allowed", { status: 405, headers: cors });

    if (!env.NAPSTER_API_KEY || !env.NAPSTER_AGENT_ID) {
      return new Response(JSON.stringify({ error: "Worker not configured (missing key/agent)" }), {
        status: 500, headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    try {
      const body = { channelType: "webrtc", initialSpeech: "Speak first, immediately, before the visitor says anything. Deliver your opening greeting: you're Ethica — by day Marissa Brooks, a quiet accountant who found something in the numbers that couldn't be ignored. You're here to help them understand fraud, protect their finances, and fight back. Then ask what brought them here today. Keep it under fifteen seconds, confident and warm." };
      const clientId = url.searchParams.get("clientId");
      if (clientId && /^[A-Za-z0-9_-]{1,32}$/.test(clientId)) body.externalClientId = clientId;
      const name = url.searchParams.get("name");
      if (name) body.externalClientProfile = { name };

      const r = await fetch(`${NAPSTER_API}/agents/${env.NAPSTER_AGENT_ID}/connections`, {
        method: "POST",
        headers: { "X-Api-Key": env.NAPSTER_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const text = await r.text();
      if (!r.ok) {
        return new Response(JSON.stringify({ error: "Could not create session", status: r.status }), {
          status: 502, headers: { ...cors, "Content-Type": "application/json" },
        });
      }
      const data = JSON.parse(text);
      return new Response(
        JSON.stringify({ token: data.token, connectionId: data.connection?.id }),
        { status: 200, headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" } }
      );
    } catch (err) {
      return new Response(JSON.stringify({ error: "Internal error" }), {
        status: 500, headers: { ...cors, "Content-Type": "application/json" },
      });
    }
  },
};
