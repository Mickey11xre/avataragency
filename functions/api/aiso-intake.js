/**
 * POST /api/aiso-intake  — step 3: the intake form submission.
 * Validates the confirmed token, stores the full lead record in KV,
 * and emails Michael a formatted "new audit request" notification.
 * Requires: AISO_KV binding + RESEND_API_KEY secret.
 */
const FROM = "AvatarAgency Funnel <audit@avataragency.ai>";
const NOTIFY = "michael@avataragency.ai";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost(context) {
  try {
    const b = await context.request.json();
    const kv = context.env.AISO_KV;
    if (!kv) return json({ error: "storage not configured" }, 503);

    // Token must exist and be confirmed (the email-click gate).
    const raw = b.token ? await kv.get("confirm:" + b.token) : null;
    if (!raw) return json({ error: "invalid or expired token" }, 403);
    const lead = JSON.parse(raw);
    if (!lead.confirmed) return json({ error: "email not confirmed" }, 403);

    if (!b.businessName || !b.businessType || !b.address?.city || !b.phone) {
      return json({ error: "missing required fields" }, 400);
    }

    // Persist the complete lead (90-day retention in KV; export to CRM manually or later automation).
    const record = {
      ...lead,
      intake: {
        businessName: b.businessName,
        address: b.address,
        businessType: b.businessType,
        topServices: b.topServices || "",
        differentiator: b.differentiator || "",
        phone: b.phone,
        competitor: b.competitor || "",
        gbpLink: b.gbpLink || ""
      },
      intakeAt: new Date().toISOString(),
      status: "audit_requested"
    };
    await kv.put("lead:" + b.token, JSON.stringify(record), { expirationTtl: 60 * 60 * 24 * 90 });

    // Notify Michael (best-effort — the lead is already saved).
    if (context.env.RESEND_API_KEY) {
      const a = record.intake.address;
      const rows = [
        ["Contact", `${lead.name} · ${lead.email}`],
        ["Website", lead.website],
        ["Business", record.intake.businessName],
        ["Address", `${a.street || ""} ${a.city}, ${a.state} ${a.zip || ""}`.trim()],
        ["Type", record.intake.businessType],
        ["Top services", record.intake.topServices],
        ["Known for", record.intake.differentiator],
        ["Phone", record.intake.phone],
        ["Competitor", record.intake.competitor || "—"],
        ["GBP link", record.intake.gbpLink || "—"],
        ["Lead key", "lead:" + b.token]
      ].map(([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#8a8375;font-size:12px;white-space:nowrap">${k}</td>
             <td style="padding:6px 12px;font-size:14px;color:#14110f"><b>${String(v).replace(/</g,"&lt;")}</b></td></tr>`
      ).join("");
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${context.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM, to: [NOTIFY],
          subject: `🔍 New free-audit request: ${record.intake.businessName} (${record.intake.businessType})`,
          html: `<h2 style="font-family:Arial">New AI Referral Audit request</h2>
                 <table style="font-family:Arial;border-collapse:collapse">${rows}</table>
                 <p style="font-family:Arial;font-size:12px;color:#8a8375">Confirmed double opt-in · intake ${record.intakeAt}</p>`
        })
      }).catch(() => {});
    }
    return json({ ok: true });
  } catch (e) {
    return json({ error: "bad request" }, 400);
  }
}
