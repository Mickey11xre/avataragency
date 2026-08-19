/**
 * POST /api/aiso-client-intake
 * Receives the AI Referral Optimization client onboarding form
 * (avataragency.ai/aiso/onboarding/).
 *
 * Stores the submission in KV and emails Michael a formatted summary that
 * separates the business facts from the access authorizations, so the
 * granted/not-granted picture is readable at a glance.
 *
 * Bindings required:
 *   AISO_KV          KV namespace (same one the funnel uses)
 *   RESEND_API_KEY   encrypted env var
 *
 * If either is missing the submission is still accepted (never lose a client's
 * 15 minutes of typing) — it is logged and returns ok.
 */
const FROM = "AvatarAgency Onboarding <audit@avataragency.ai>";
const NOTIFY = "michael@avataragency.ai";

const ACCESS_FIELDS = [
  ["auth_cms", "Website / CMS"],
  ["auth_dns", "Domain / DNS"],
  ["auth_gbp", "Google Business Profile"],
  ["auth_gsc", "Search Console / Analytics"],
  ["auth_dirs", "Review sites & directories"],
  ["auth_esp", "Email marketing platform"],
  ["auth_agency", "Contact their agency"],
];

const FACT_FIELDS = [
  ["bizName", "Business name"], ["legalName", "Legal entity"],
  ["contactName", "Contact"], ["contactRole", "Role"],
  ["email", "Email"], ["phone", "Phone"], ["website", "Website"],
  ["street", "Street"], ["city", "City"], ["state", "State"], ["zip", "ZIP"],
  ["otherListings", "Other listings at this address"],
  ["competitors", "Competitors"],
  ["services", "Top services"], ["differentiator", "Best known for"],
  ["languages", "Languages"], ["hours", "Hours"],
  ["afterHours", "Evening / weekend / emergency"],
  ["payment", "Insurance & payment"], ["offer", "New-customer offer"],
  ["areaType", "Service area"], ["doNotSay", "Do NOT publish"],
];

const DETAIL_FIELDS = [
  ["cmsPlatform", "CMS platform"], ["cmsUrl", "CMS admin URL"],
  ["cmsManager", "Website maintained by"],
  ["dnsRegistrar", "Registrar"], ["dnsDomains", "Domains"],
  ["gbpLink", "GBP link"], ["gbpOther", "Other GBP listings"],
  ["dirDetail", "Directories named"], ["dirWrong", "Known-wrong profiles"],
  ["espName", "Email platform"], ["espEmail", "Email platform login"],
  ["agencyName", "Agency"], ["agencyContactName", "Agency contact"],
  ["agencyContactEmail", "Agency email"], ["agencyContactPhone", "Agency phone"],
  ["agencyContactRole", "Agency role"], ["agencyScope", "Agency manages"],
  ["agencyApproach", "Approach preference"],
  ["notes", "Client notes"],
];

const DIR_KEYS = [
  ["dir_yelp", "Yelp"], ["dir_bing", "Bing Places"], ["dir_apple", "Apple Business"],
  ["dir_fb", "Facebook"], ["dir_ig", "Instagram"], ["dir_bbb", "BBB"],
  ["dir_nextdoor", "Nextdoor"], ["dir_industry", "Industry directory"],
  ["dir_insurance", "Insurance directory"], ["dir_booking", "Booking platform"],
];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json" }
  });
}

const esc = (v) => String(v == null ? "" : v).replace(/</g, "&lt;");

function rows(pairs, b) {
  return pairs
    .filter(([k]) => b[k] !== undefined && b[k] !== "" && b[k] !== false)
    .map(([k, label]) =>
      `<tr><td style="padding:5px 12px;color:#8a8375;font-size:12px;white-space:nowrap;vertical-align:top">${label}</td>
           <td style="padding:5px 12px;font-size:14px;color:#14110f">${esc(b[k]).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
}

export async function onRequestPost(context) {
  try {
    const b = await context.request.json();

    if (!b.bizName || !b.email || !b.signature || !b.agree) {
      return json({ error: "missing required fields" }, 400);
    }

    const key = "onboard:" + (b.bizName || "client")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) + ":" + Date.now();

    const kv = context.env.AISO_KV;
    if (kv) {
      // 2 years — this is a signed authorization record, keep it.
      await kv.put(key, JSON.stringify(b), { expirationTtl: 60 * 60 * 24 * 730 });
    }

    if (context.env.RESEND_API_KEY) {
      const granted = ACCESS_FIELDS.filter(([k]) => b[k]);
      const withheld = ACCESS_FIELDS.filter(([k]) => !b[k]);
      const dirs = DIR_KEYS.filter(([k]) => b[k]).map(([, l]) => l);

      const list = (arr, color) => arr.length
        ? arr.map(([, l]) => `<span style="display:inline-block;background:${color};padding:3px 9px;border-radius:11px;font-size:12px;margin:2px 3px 2px 0">${l}</span>`).join("")
        : `<span style="color:#8a8375;font-size:13px">none</span>`;

      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:660px">
          <h2 style="margin:0 0 4px">New client onboarding — ${esc(b.bizName)}</h2>
          <p style="color:#8a8375;font-size:13px;margin:0 0 18px">
            Signed by <b>${esc(b.signature)}</b> on ${esc(b.sigDate)} ·
            ${b.needHelp ? "<b style='color:#b8860b'>REQUESTED HELP GRANTING ACCESS</b>" : "did not request help"}
          </p>

          <h3 style="font-size:14px;margin:0 0 6px">Access AUTHORIZED</h3>
          <div style="margin-bottom:12px">${list(granted, "#dcf0e2")}</div>
          <h3 style="font-size:14px;margin:0 0 6px">NOT authorized</h3>
          <div style="margin-bottom:6px">${list(withheld, "#f0e2e2")}</div>
          ${dirs.length ? `<p style="font-size:13px;color:#14110f;margin:10px 0 0"><b>Directories flagged:</b> ${dirs.join(" · ")}</p>` : ""}

          <h3 style="font-size:14px;margin:22px 0 6px">Business facts</h3>
          <table style="border-collapse:collapse;width:100%">${rows(FACT_FIELDS, b)}</table>

          <h3 style="font-size:14px;margin:22px 0 6px">Account details</h3>
          <table style="border-collapse:collapse;width:100%">${rows(DETAIL_FIELDS, b)}</table>

          <p style="color:#8a8375;font-size:11px;margin-top:20px">
            Record key: ${key} · submitted ${esc(b.submittedAt)}<br>
            Open the Access Grant Playbook before the onboarding call.
          </p>
        </div>`;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: FROM, to: [NOTIFY],
          subject: `✅ Onboarding complete: ${b.bizName}${b.needHelp ? " — WANTS HELP WITH ACCESS" : ""}`,
          html
        })
      }).catch(() => {});
    }

    return json({ ok: true });
  } catch (e) {
    return json({ error: "bad request" }, 400);
  }
}
