
---

SOURCE: https://support.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained

# What Certifications has Anthropic obtained?

*This article is about our commercial products such as Claude for Work and the Anthropic API. For our consumer products such as Claude Free, Pro, Max, Ultra, and when accounts from those plans use Claude Code, see [here](https://privacy.claude.com/en/collections/10663362-consumers).*

Anthropic is committed to the safety and security of our users' information and maintains the following compliance credentials:

- HIPAA-ready configuration (BAA available)

- ISO 27001:2022 (Information Security Management)

- ISO/IEC 42001:2023 (AI Management Systems)

- SOC 2 Type I & Type II

For more information and to request copies of our compliance documentation, please visit our [Trust Portal](https://trust.anthropic.com/).
---

SOURCE: https://support.claude.com/en/articles/10023646-i-think-a-user-is-infringing-my-copyright-or-other-intellectual-property-how-do-i-report-it

# I think a user is infringing my copyright or other intellectual property. How do I report it?

If you believe someone is infringing your intellectual property rights, you can send us notice of the infringement and we’ll take appropriate action, which may include suspension or termination of the accounts of repeat copyright infringers. Notices can be submitted through [this form](https://claude.com/form/anthropic-content-reporting) or by mail to the address below:

Anthropic PBC

548 Market Street

PMB 90375

San Francisco, CA 94104-5401

Attn: Legal / Copyright Agent

Written claims concerning copyright infringement must contain the following information:

- A physical or electronic signature of the person authorized to act on behalf of the owner of the copyright interest;

- A description of the copyrighted work that you allege has been infringed upon;

- A description of where the material that you alleged is infringing is located on the platform;

- Your address, telephone number, and e-mail address;

- A statement by you that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and

- A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner’s behalf.

For questions, please email <dmca@anthropic.com> or call (415) 326-6303.
---

SOURCE: https://support.claude.com/en/articles/10035659-where-can-i-learn-more-about-anthropic-s-privacy-practices

# Where can I learn more about Anthropic's Privacy practices?

Anthropic respects the privacy of everyone that engages with our products! For more information about our privacy practices please visit our [Privacy Center](https://privacy.anthropic.com/).
---

SOURCE: https://support.claude.com/en/articles/13163631-configuring-session-security-settings

# Configuring session security settings

This feature is available to Admins and Owners of Enterprise plans and Console Admins.

Session duration controls allow Enterprise and Console Admins to set a maximum session length for all users in their organization. When enabled, users will need to sign in again after the specified period, even if they've been actively using Claude. This helps protect your organization by limiting how long a compromised session could remain valid.

## Enabling session length settings

### For Enterprise Admins

1. Log in to your Enterprise organization as an Admin or above.

2. Navigate to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

3. Locate the **Session security** section.

4. Click “Enable” next to **Shortened session length**, then select a duration from the dropdown: 1 day, 7 days, 14 days, or 28 days.

5. Confirm your selection by clicking “Enable.”



### For Console Admins

1. Log in to your Console account as an Admin.

2. Navigate to **[Settings > Organization and access](https://platform.claude.com/settings/organization)**.

3. Locate the **Session security** section.

4. Click “Enable” next to **Shortened session length**, then select a duration from the dropdown: 1 day, 3 days, or 7 days.

5. Confirm your selection by clicking “Enable.”



### What happens after enabling shortened session length?

- Existing sessions older than the selected duration will expire immediately.

- Other active sessions will expire no later than the selected duration.

- Users whose sessions expire will be directed to sign in again.

## Updating session duration

You can change the session duration at any time by selecting a new value from the dropdown. If you select a shorter duration:

- Sessions older than the new duration will expire immediately.

- Sessions scheduled to expire beyond the new duration will have their expiration shortened accordingly.



## Disabling session length settings

To disable session duration, select "Disable" next to **Shortened session length**. Existing active sessions will continue to expire at their scheduled time. New sessions will return to default behavior, where sessions remain active as long as the user stays active.

## Users in multiple organizations

If a user belongs to multiple organizations with different session duration settings, the shortest duration will be applied. For example, if a user is a member of Organization A (7-day limit) and Organization B (28-day limit), their sessions will expire after seven days. This is because a single session is used across all their organizations, so the most restrictive setting takes precedence.
---

SOURCE: https://support.claude.com/en/articles/14661296-use-claude-security

# Use Claude Security

## Overview

**[Claude Security](https://claude.com/product/claude-security)** is a capability built into Claude that continuously watches your codebases for security vulnerabilities, tracks each finding until it is fixed, and suggests targeted patches for human review. It helps teams find and fix issues that traditional methods often miss.

Claude Security is now available in public beta for users on Enterprise plans.

Learn how to get started and how leading enterprises use the tool here: **[Getting started with Claude Security](https://academy.claude.com/tutorials/getting-started-with-claude-security)**.

Claude Security allows you to:

1. **Scan your codebase holistically** — Claude Security understands how your code fits together, traces data flows across files and across the repositories in a project, and identifies complex, multi-component vulnerabilities and bugs that traditional rules-based scanners cannot detect.

2. **Deep Scan** — Create a project and connect up to eight repositories from GitHub or other Git providers. Claude reads the code, writes a threat model, and runs a deep baseline scan.

3. **Continuous Scanning** —  Claude Security runs an efficient scan when new commits land, and surfaces any new findings for quick remediation.

4. **Add what the code can’t show** — Tell Claude how your code is deployed, who can reach it, and which risks you’ve accepted. Each project keeps this in a threat model, and Claude uses it to decide what to flag and how to rate it.

5. **Validate findings** — Every finding goes through multi-stage verification, with Claude critically reviewing its own findings before they’re surfaced. The result: fewer false positives, less noise.

6. **Review and patch** — Seamlessly move from a finding into a Claude Code session to generate a targeted fix. Resolve vulnerabilities quickly instead of growing a backlog.

7. **Track fixes** — Claude checks open findings against the code that changed and marks them fixed when the fix lands.

8. **Integrate into your workflow** — Read and resolve findings through the Claude Security API or the Claude Security connector (MCP) in Claude and Claude Code, and get a webhook when a new finding is added.

9. **Control access** — Share each project with a Full, Triage, or View role. Admins can decide who can create projects and who can view, triage, or manage all projects with RBAC.

---

## Finding types

Findings fall into these example categories below.

**Injection (SQL, Command, Code, XSS):** Untrusted input changes query structure or gets executed. E.g., `' OR 1=1--, ; rm -rf /`, `<script>` in a comment.

**Injection (XXE, ReDoS):** Parsers or regex abused by crafted input. E.g., XML `<!ENTITY>` reading `/etc/passwd`.

**Path & Network (Path traversal, SSRF, Open redirect):** Input controls file paths, request destinations, or redirects. E.g., `../../etc/passwd`, fetching `http://169.254.169.254/`.

**Auth & Access (AuthN bypass, PrivEsc, IDOR/BOLA, CSRF, Race):** Access checks missing, skippable, or racy. E.g., `GET /orders/123` returns someone else's order.

**Memory Safety (Buffer/integer overflow, UAF, unsafe misuse):** Input writes past bounds, wraps arithmetic, or hits freed memory. Mostly C/C++/Rust `unsafe`.

**Cryptography (Timing leaks, algorithm confusion, weak primitives):** Secret-dependent branches, JWT `alg=none`, or MD5/SHA-1/DES/ECB in security paths.

**Deserialization (Arbitrary type instantiation):** Untrusted bytes drive object construction — pickle, Java `readObject`, YAML load. Often equals RCE.

**Protocol & Encoding (Cache safety, encoding confusion, length-prefix trust):** Layers disagree or trust declared sizes. E.g., cache poisoning via `Host` header.

---

## Severities

Severity is assigned per finding based on how exploitable it is in your codebase, not the category itself—so the same category can land at different severities in different repos. Claude uses the project’s threat model to assess the severity.

| **Severity** | **Criteria**                                                                                                                                                      | **Typical example**                                                        |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Critical     | Exploitable over the network by anyone, with no login, no action by a victim, and no special conditions. It lets the attacker both read and change data.          | Unauthenticated remote code execution in an internet-facing service.       |
| High         | Serious impact, but short of Critical: the attacker needs a login or a victim's action, or the damage is partial (for example, data can be read but not changed). | SQL injection behind a login that lets an attacker read and change data.   |
| Medium       | Limited impact (for example, a small amount of non-sensitive data), with one realistic precondition such as a login.                                              | SQL injection behind a login that exposes only a few non-sensitive fields. |
| Low          | Limited impact, and needs a login or network proximity plus special conditions outside the attacker’s control.                                                    | Timing side-channel requiring network proximity and thousands of requests. |

---

## Finding structure

Each finding contains the following fields:

- Title — short descriptive name of the finding

- Severity — Critical / High / Medium / Low

- Category — finding type, with its CWE ID when one applies

- Location — file path and line range, linked to the source. A finding can cite several files and repositories.

- Status — Open or Resolved, with the date it was found.

- Assignee — the person the finding is assigned to, if any

- What Claude found — description of what the finding is and why it matters. It can include a diagram of the attack path.

- How to fix — guidance on how to resolve it

- Evidence — the files and line ranges Claude cites, grouped by repository, with the branch and commit that were scanned

- How the attack works — how an attacker would reach and exploit the issue

- Why Claude believes it — Claude’s assessment, covering the exploit scenario, its preconditions, and the impact

- History — every change to the finding, newest first

- Shown only if the finding was resolved:

  - Resolution — Marked fixed, Fixed by a merged pull request, or Dismissed as a false positive, an accepted risk, a duplicate, or for another reason

  - Triage note — optional

---

## Troubleshooting

### The security page keeps redirecting to "Install GitHub App"

The claude.ai/security page runs a per-user check against your own connected GitHub account, so this can fail for you even though the organization-wide installation is working for others. There are a few potential causes:

- **No GitHub account connected in Claude.** Go to[**Customize > Connectors**](https://claude.ai/customize/connectors) to check this.

- **The connected GitHub account isn’t a member of the GitHub organization** where the app is installed. Connect the account that belongs to that organization.

- **SSO isn't authorized for that organization.** If your GitHub organization requires SSO, you must authorize the Claude app for it separately. Follow the steps in **[Use the GitHub integration](https://support.claude.com/en/articles/10167454-use-the-github-integration#h_e169a34a57)**.

- **Your GitHub organization's IP allow list is blocking the check.** GitHub's "Enable IP allow list configuration for installed GitHub Apps" setting covers traffic from the App itself, such as Code Review, but it doesn't cover this per-user check. To allow it, manually add 160.79.104.0/21 as an organization-level allow list entry. For the full list of ranges, see **[IP addresses](https://platform.claude.com/docs/en/api/ip-addresses)**.

---

## Frequently asked questions

### Getting started

**What do I need before I can use Claude Security?**

An active Claude Enterprise plan, a premium seat for each user, and usage credits enabled for consumption billing. An owner enables Claude Security in **[Organization settings > Claude Security](https://claude.ai/admin-settings/claude-security)**. See the **[getting started guide](https://academy.claude.com/tutorials/getting-started-with-claude-security)** for setup steps.

**How do I give Claude Security access to my repositories?**

For GitHub.com and GitHub Enterprise Server, an owner installs the **[Claude GitHub App](https://github.com/apps/claude)** and grants it access to the repositories you want to scan. For other Git providers, such as GitLab and Bitbucket, you need the repository’s address and an auth token.

**Can I scan repositories that aren’t on GitHub?**

Yes. Projects can be created with repositories hosted on GitHub.com and GitHub Enterprise Server, or repositories hosted on other Git servers with an auth token (including publicly accessible self-hosted Git servers).

**Which IP addresses do I need to allow?**

Use the **[Anthropic guide for IP address allowlisting](https://platform.claude.com/docs/en/api/ip-addresses)**. If you use GitHub Enterprise Server or another Git provider, your instance must allow inbound traffic from these IP addresses so Claude Security can reach your repositories.

**Does Claude Security support Zero Data Retention (ZDR)?**

No. Anthropic may retain data where required by law or to address Usage Policy violations.

**What happens to my existing projects with the latest update?**

Existing projects keep running as they do today and are still available from the Claude Security home page. New projects use the new experience.

**Can I migrate my existing projects?**

Yes, if you own the project. Open it and click "Migrate project", or click "Migrate your projects" on the Claude Security home page to migrate every project you own. Claude Security creates a new project, copies the findings to it, and archives the original. Members, webhooks, excluded directories, scan history, and scheduled scans aren't copied. GitHub Enterprise projects can't be migrated.

### Continuous monitoring

**How long does the first scan take?**

Depending on the size of the repositories, the baseline scan may take several minutes or hours. You can leave the page while it runs. If you have enabled email notifications for Claude Security, you will receive an email when your project’s scan completes and it has new findings.

**How long does a follow-up scan take?**

Scan time varies based on the repository and the agent’s actions.

**How often does Claude scan after the baseline scan?**

Claude checks for new commits and scans changes regularly, based on their risk and complexity. There is no fixed schedule.

**Why can two scans of the same code return different results?**

Scans are stochastic by design. Unlike traditional static analyzers, Claude Security uses an agent that adapts its analysis to each run, reasoning over code context rather than applying fixed pattern matches. This enables the depth of analysis needed to catch logic-level vulnerabilities.

**How should I set up a large repository or monorepo?**

Set a folder scope on the repository rather than scanning the full repository, and exclude folders you don’t need covered. Claude can still pull context from the rest of the codebase as needed.

**How many repositories can a project have?**

Up to eight. A repository can be in scope, so Claude scans it and reports findings, or used for context only, so Claude reads it during scans but reports no findings in it. Both count toward the limit. Manage a project's repositories on its Resources tab.

**How do I tell Claude about my environment?**

Open the project’s Knowledge tab to edit the threat model and add documents such as architecture docs. Claude uses them to decide what to flag and how to rate it.

**Which models does Claude Security use?**

Claude Security scans are powered by Claude Mythos model. Users receive findings without direct model access. Each project’s chat with Claude uses a model your team picks from the ones your organization allows. Certain subcomponents of Claude Security may use other models when Mythos-class reasoning is not required, for example to enumerate a project directory.

### Findings and fixes

**How is severity assigned, and can I change it?**

Claude rates each finding against the project’s threat model, which your team can edit and correct.

**What if a finding describes an attack that isn’t possible in my environment?**

Claude writes the threat model from your code, so it can miss deployment context and the patterns your company has accepted. In the project’s chat, tell Claude why the finding is wrong and ask it to update the threat model. Claude uses the threat model to decide what to flag and how to rate it.

**How do I fix a finding?**

Click “Fix” on a finding to open Claude Code and fix that specific vulnerability. Without **[Claude Code in the cloud](https://code.claude.com/docs/en/claude-code-on-the-web)**, you copy a prompt into your own Claude Code.

**How does fix tracking work?**

Claude re-checks findings when the code changes on the repository. A finding marked fixed reopens automatically if Claude later finds the issue again.

**What happens when I dismiss a finding?**

Dismissed findings will not reappear in future scans. You can dismiss a finding as a false positive, an accepted risk, a duplicate, or for another reason, and add a triage note.

### Integrations and notifications

**How do I export findings to my own tools?**

To export findings into your own tracking and notification systems, use the Claude Security API, the Claude Security connector, or webhooks.

**How do I use the Claude Security API?**

Create a personal access token under Claude Security settings. A token acts as you: it can see and change only what you can. With the API, you can list and read projects and findings, resolve and reopen findings, and create and manage projects and their repositories.

**What can the Claude Security connector (MCP) do?**

With the Claude Security connector, Claude and Claude Code can list and read your projects and findings and resolve or reopen a finding when you ask.

**How do I get notified when there is a new finding?**

Create a webhook under Claude Security settings to push new-finding events into your own systems, such as Slack or Jira.

### Access and sharing

**How do admins control who can use Claude Security?**

Admins can decide which RBAC roles can create projects and which can view, triage, or manage all projects by configuring the capabilities in **[custom roles](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

**How do I share a project, and what can each role do?**

In a project, click “Share” to give members a role: Full (manage findings, settings, and who has access), Triage (view findings, update their status, and start fixes), or View. You can also share a project with your whole organization.

### Pricing

**How much does Claude Security cost?**

Claude Security is charged at direct token cost only. There is no additional platform fee. Usage covers scans and other work Claude Security does in a project: writing a threat model, the project chat, and checking fixes.

**How do I control and track what Claude Security costs?**

You can set a separate spend limit for Claude Security. Open Usage in a project’s settings to see its cost for the month to date and per day.

**Is there a launch offer for the updated Claude Security?**

Yes, eligible Claude Enterprise organizations receive free usage credits up to $25,000 a month, for two months, through Dec 31, 2026. Full **[launch offer terms](#h_07eed9f41c)** below.

**Does the launch offer also apply to the old experience?**

No, the launch offer only applies to projects created with the new experience.

### Claude Security plugin for Claude Code

**What is the Claude Security plugin for Claude Code?**

The Claude Security plugin for Claude Code is a separate feature, based on the same technology as Claude Security. It is available for users who wish to directly integrate the scanner into their workflows without relying on Anthropic’s hosted agent infrastructure, who have Zero Data Retention (ZDR) requirements, or who need model access through a third-party provider. Learn more here: **[Scan your codebase for vulnerabilities](https://code.claude.com/docs/en/claude-security)**.

**Does the Claude Security plugin for Claude Code use the same model?**

Not necessarily. The plugin uses whichever models are available in your Claude Code account.

**Scope of use:** You will only use Claude Security to scan code that you or your company owns and to which you or your company holds all necessary rights to scan. You will not use Claude Security to scan code owned by or licensed from third parties, including but not limited to open source projects or repositories other than those included in your company's codebase(s).

## Claude Security launch offer terms

**Who is eligible:** Claude Enterprise organizations, including Claude Enterprise purchased through AWS Marketplace.

**What you get:** Up to $25,000 in promotional credits for Claude Security usage in each of two consecutive months. Each month runs from your organization's start date to the same date the following month. Unused credits from a month don't carry over.

**How to get it:** No sign-up is needed. Credits apply automatically to usage in the new Claude Security. Usage in projects from the earlier version isn't covered until they're migrated.

**When it starts:** Organizations that already have Claude Enterprise start on October 21, 2026. Organizations that sign up for Claude Enterprise after that date start on the day they sign up. The two months run whether or not your organization uses Claude Security.

**When it ends:** The offer ends at the end of the day on December 31, 2026 (UTC), even if your two months haven't finished. Organizations that sign up after November 1, 2026 won't get two full months.

**How credits apply:** Credits are used before your organization's committed spend or usage credits, and are separate from any prepaid usage credits. After the credits are used or the offer ends, Claude Security usage is charged at direct token cost.

**Where to see it:** Organization admins can see the promotional balance in **[Organization Settings > Usage](https://claude.ai/admin-settings/usage)**, under **Services**, or in **Organization Settings > Claude Security**, under **Spend limit**.

The **[Claude Promotional Credit Offer Terms](https://www.anthropic.com/legal/promotion-credit-terms)** also apply, including when credits can be forfeited and when the offer can change. If they differ from this article on this offer, this article controls.
---

SOURCE: https://support.claude.com/en/articles/15425996-data-retention-practices-for-covered-models

# Data retention practices for Covered Models

To ensure we’re responsibly deploying covered models, **we are requiring limited data retention and review as part of our safety work. Prompts submitted to, and outputs generated by, covered models are retained for 30 days** **to support our safety work, on every platform where these models are offered.**

This applies to Mythos-class models and future models with similar capabilities that we designate as **[covered models](https://support.claude.com/en/articles/15425695)**. For all other models, everything you use is unaffected and stays under the current terms.

This policy, described below, goes into effect on June 9, 2026.

## Who this applies to

Consumer plans (Claude Free, Pro, Max, and Ultra) across our web, desktop, and mobile apps—including Claude.ai and Claude Code—are unaffected by this update, since we already retain inputs and outputs on these surfaces. Learn more about **[how we retain data](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data)** for consumer plans.

This change only applies to organizations that have set up workspaces with **[zero data retention](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to)** (ZDR) in Claude Console, use Claude Code with ZDR in Claude Enterprise, or access Claude through AWS Bedrock, Google Cloud Agent Platform, or Microsoft Foundry with ZDR. Some of these organizations will receive notice that they are eligible to use Fable with ZDR, as described here: **[Zero data retention and Enterprise Frontier Safeguards](https://support.claude.com/en/articles/15425695-covered-models#h_077fc48764)**. The rest of this article applies only to the organizations with zero data retention and did not receive this notice.

## Why we’re doing this

Mythos-class models represent a substantial increase in model capabilities, some of which can be used for both benign and malicious purposes. Claude Fable 5 and Claude Fable 5.1 share the same underlying model as Claude Mythos 5 and Claude Mythos 5.1, but with additional safeguards, particularly in the cyber and bio domains. While these safeguards allow us to share this intelligence more broadly, we are taking a conservative approach that allows us to look for patterns of misuse with this class of model and future models we release that are similarly or more capable. Some attacks only become visible across multiple requests. **[Best-of-N jailbreaking](https://arxiv.org/abs/2412.03556)**, for example, sends hundreds of slight variations of a prompt in the hope that one will work. Larger patterns of misuse, such as **[state-sponsored espionage](https://www.anthropic.com/news/disrupting-AI-espionage)** or **[data extortion campaigns](https://www.anthropic.com/news/detecting-countering-misuse-aug-2025)**, only surface when our safeguards classifiers can zoom out across many requests. Detecting these threats requires temporarily retaining prompts and outputs so they can be analyzed together, rather than one at a time.

## How we protect your data

By default, no Anthropic personnel can read your retained conversations. Human review can occur only through a controlled access path—for example, when content is flagged by our automated trust and safety systems for potential harm. These reviews can only be performed by a small set of approved reviewers. Every instance of access is recorded in a tamper-proof log that reviewers cannot suppress or modify. After 30 days, the data is deleted automatically, except in the rare cases where it's been flagged by our automated trust and safety systems or we're legally required to keep it. Eligible organizations also have the option to add customer-managed encryption keys and access transparency audit logs.

Anthropic maintains a documented information security program with technical and organizational measures that are designed to protect the security, confidentiality, and integrity of customer data. Our risk-based program is built for and evolves to defend against known and anticipated threat models and is tested regularly.

## What, if anything, do I need to configure?

This change only applies to organizations that have set up workspaces with zero data retention (ZDR) in Claude Console, use Claude Code with ZDR in Claude Enterprise, or access Claude through AWS Bedrock, Google Cloud Agent Platform, or Microsoft Foundry with ZDR. For all other organizations, there is no change and there's nothing to configure. The rest of this section is for organizations that access Claude without data retention today and need to set up data retention in order to use designated models when they become available.

### If your developers use the Claude API

- **Directly from Anthropic through Claude Platform:** Turn on retention for the workspaces where you want to use covered models in the Claude Console: go to the **Data retention** page (platform.claude.com/settings/privacy) and select the workspace from the dropdown menu at the top of the page. Your other ZDR-enabled workspaces keep ZDR. Learn how to **[turn on data retention for a Workspace in a zero data retention organization](https://support.claude.com/en/articles/16824617-turn-on-data-retention-for-a-workspace-in-a-zero-data-retention-organization)**, or refer to the **[Anthropic Trust Center for additional documentation](https://trust.anthropic.com/)**.

- **Through Claude Platform on AWS:** Retention works the same way as the direct Claude API. It's configured at the workspace level, and retained data is handled by Anthropic under the same controls.

- **Through Amazon Bedrock:** Retention will need to be enabled to access covered models, and retained data stays in AWS. Refer to AWS Bedrock’s **[documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.html)**.

- **Through Google Cloud's Agent Platform:** Retention will need to be enabled to access covered models, and retained data stays in GCP. Refer to Google Cloud's Agent Platform **[documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/fable-5)**.

- **Through Claude in Azure Foundry:** Retention is configured for each Azure Subscription. If you have zero data retention configured, then you will need to create and use a separate Azure Subscription to access these models.

### If your team uses Claude Code

- **Through the Anthropic API:** Claude Code’s data handling practices are governed by the workspace it operates in. If that workspace has retention enabled, Claude Code can use designated models. For developers who sign in directly, enable retention at your organization’s Claude Code workspace.

- **Through Amazon Bedrock or Google Cloud Agent Platform:** Claude Code uses your cloud credentials, so it follows your cloud environment's retention setting. Retention must be enabled in your cloud environment, and retained data stays in your provider's environment. The same applies to Cowork accessed through Amazon Bedrock or Google Cloud’s Agent Platform.

- **Through Claude Enterprise with ZDR:** We're releasing controls in the admin console so your Primary Owner can change the retention setting directly. If you'd rather not touch your production org yet, we can help you set up a separate sandbox org.

### If your team uses Claude chat or Cowork through Claude for Enterprise

- These surfaces already operate with standard retention, so you'll have access to the new models as they become available.
---

SOURCE: https://support.claude.com/en/articles/15707726-using-claude-for-legal-work-privilege-confidentiality-and-how-to-think-about-configuration

# Using Claude for Legal Work: Privilege, Confidentiality, and How to Think About Configuration

Lawyers and legal teams increasingly want to use Claude for research, drafting, contract review, and litigation prep. One of the most common questions we hear is some version of: *can I do that without putting privilege or client confidentiality at risk?* We think the answer is yes, with the right configuration and the right practices—and we want to be transparent about both how Claude is built and where the law currently stands.

This is Anthropic's perspective on our own products and the public record; it isn't legal advice, and the right answer for your practice depends on your jurisdiction, your clients, and your matters.

## The legal profession has been here before—mostly.

When email and cloud storage arrived, bar regulators initially worried that routing client confidences through a third party's servers was a confidentiality problem. The consensus that emerged—ABA Formal Op. 99-413 on email, the state cloud opinions of 2010-12, ABA 477R, and the 2012 amendments to Model Rules 1.1 and 1.6—was that lawyers may use these technologies with reasonable care in selecting and supervising the vendor. Generative AI is following the same arc: ABA Formal Op. 512 (2024) and the state and local bar opinions since (Florida, D.C., New York City, Pennsylvania, Texas, Oregon, Alaska, among others) apply the existing duties—competence, confidentiality, supervision, and verification—rather than prohibiting use.

## Where the courts are.

The first widely-discussed decision, *United States v. Heppner* (S.D.N.Y. Feb. 2026), held that a criminal defendant's *own* use of a consumer AI account—without his lawyers' involvement—wasn't privileged work product. The court's reasoning turned on the consumer privacy terms and the absence of attorney direction; it said nothing about lawyers using enterprise tools, and its citations to *United States v. Adlman* and *United States v. Kovel* left open that an enterprise-level AI used at an attorney's direction may be privileged.

While *Heppner* declined to find attorney-client privilege or work product in the absence of attorney involvement, subsequent decisions have gone the other way in the context of both pro se litigants’ and attorneys’ use of AI. *Warner v. Gilbarco* (E.D. Mich.), *Morgan v. V2X* (D. Colo.), *Tate Group Automotive v. Legacy Automotive Capital* (Tex. Bus. Ct.), and *Assini v. Hayward* (N.Y. Sup. Ct.) each held that AI-assisted litigation preparation is protected work product and that disclosing inputs to an AI tool does not, by itself, waive that protection. *Morgan* in particular approved protective-order language permitting parties to upload confidential information into an AI tool where the provider is contractually barred from training on, retaining, or disclosing confidential data beyond what's necessary to render the service. Likewise *Warner* emphasized that work product protection can be waived by disclosure to an adversary, but typically is not waived by disclosure to a third party subject to a duty of confidentiality. We think that's the right line—and it's the line our commercial terms are built around.

Work-product protection is generally tied to litigation, and its scope varies by jurisdiction. For work that isn't litigation-related, the focus would be on attorney-client privilege, where it applies, plus our contractual no-training and confidentiality commitments—neither of which depends on litigation.

This is an area of law that's moving quickly. None of these are appellate decisions, courts in other jurisdictions may see it differently, and we'd encourage anyone making deployment decisions to discuss them with their own counsel.

## How Claude is built, and the choices you have.

There are two questions worth separating: *what does Anthropic see*, and *what protections survive even when a vendor sees something*.

On the first—our **[Trust Center](https://trust.anthropic.com/)** and our **[data retention practices article](https://support.claude.com/en/articles/15425996)** cover the details, but in short:

- **We do not train on your content by default.** Under our commercial terms, **[by default](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training)**, customer content from Claude for Work, the Claude Platform, and the API is not used to train our models.

- **Retention is configurable.** **[Claude for Work](https://support.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans)** administrators can set an organization-wide retention period. **[API](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)** customers can use our standard 30-day retention or, on eligible endpoints and models, **[Zero Data Retention](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to)**. For our most **[capable models](https://support.claude.com/en/articles/15425996-data-retention-practices-for-mythos-class-models)**, where safety monitoring requires it, we retain prompts and outputs for 30 days in a governed store that is automatically deleted, with the serving path itself stateless.

- **Human review is a very narrow exception.** Retained data is processed by automated safety systems for potential harm only. Only content flagged by the automated safety system can be reached by a human reviewer. When content is flagged for potential serious harm, review is performed by a small, designated set of safeguards personnel under contractual confidentiality, with need-to-know scoping and two-person approval for regulated data categories.

- **You can verify this.** Every human read is logged to a tamper-proof entry that customers with **[Access Transparency](https://platform.claude.com/docs/en/manage-claude/access-transparency)** can retrieve.

- **Customer-managed encryption** is available for **[qualifying customers](https://platform.claude.com/docs/en/manage-claude/cmek)**, putting the encryption keys for the retention store in your own key management system (KMS)—though this controls key custody, not the narrow safety review above.

- **In-tenancy options.** Claude is also available via AWS Bedrock and Google Cloud Vertex AI for organizations whose policy is that data stay within their own cloud environment. This changes where your data resides and whom you contract with; it does not by itself switch off the safety monitoring described above.

On the second—what survives even when a vendor sees something—two doctrines do the work: attorney-client privilege protects confidential lawyer-client communications on legal advice, and the work-product doctrine protects material prepared by a lawyer in anticipation of litigation. Neither is waived by disclosure to a non-adversary vendor bound to confidentiality—the same footing on which lawyers use e-discovery platforms, document-review vendors, court reporters, and translators today, and the one the post-Heppner courts have applied to AI. Keeping a lawyer visibly directing the work—so that AI output is the attorney's draft, not a substitute for advice—strengthens it. It's the same line that keeps AI use clear of unauthorized-practice concerns now surfacing where people use these tools in place of a lawyer rather than under one.

## What we'd suggest you consider.

- Whether you're on commercial terms (with a DPA and the no-training commitment), which is the baseline expectation for legal technology.

- Whether the sensitivity of the matter calls for ZDR or an in-tenancy deployment.

- How you'll keep a lawyer in the loop, verify output against primary sources, and document your AI use—the same supervision and competence duties that apply to any tool, and the same posture that keeps the work on the right side of those unauthorized-practice questions.

- Your own client-consent and engagement-letter practices, which several bar opinions (including ABA 512) address.

## Our view.

We believe Claude's commercial offerings can be configured by lawyers in a way that maintains privilege and confidentiality, and that the legal profession's experience with email and cloud—initial caution, then a reasonable-care standard, then mainstream adoption—is the likely arc here too. We also think it matters that it goes that way: technology competence is now part of the duty of competence. Rules that scare lawyers away from capable tools don't protect clients and they make representation slower and more expensive in a system where most people already can't afford a lawyer. We'll keep publishing how our systems work, keep our commercial terms aligned with what professional responsibility guidance requires, and keep engaging in the public conversation as the law develops.

---

*This document describes Anthropic's products and Anthropic's perspective on publicly available legal authorities as of June 2026. It is not legal advice. Whether any particular configuration meets your confidentiality, privilege, or regulatory obligations is a question for your own counsel.*
---

SOURCE: https://support.claude.com/en/articles/15926041-claude-for-teachers-your-data-and-our-terms

# Claude for Teachers: your data and our terms

## Overview

**[Claude for Teachers](https://claude.com/solutions/teachers)** is free for verified US K-12 educators, whether you sign up as an individual teacher or your school or district sets up an organization for everyone. Qualifying teachers or organizations that sign up by June 30, 2027 get a full year of free access. This offering includes free access to Claude Pro features, teaching skills built for lesson planning and differentiation, a connection to curriculum mapped to academic standards in all 50 states, and terms written for K-12.

This page explains the **[U.S. K-12 Terms of Service](https://www.anthropic.com/legal/k12-terms)**, **[US K-12 Public Sector Addendum](https://anthropic.com/legal/k12-addendum)**, and the **[U.S. K-12 Data Processing Agreement](https://www.anthropic.com/legal/k12-dpa)**.

## Who is this for?

Claude for Teachers is for educators working in US K-12 schools and districts: classroom teachers, instructional coaches, specialists, interventionists, librarians, counselors, and other certificated staff.

It's available two ways:

- **Individual educators** verify with a school email for free access, and accept the K-12 terms themselves.

- **Schools and districts** have an authorized administrator set up a free Claude Enterprise organization. Teachers join through district single sign-on, and the school or district accepts the K-12 terms once for everyone, including the DPA and, for public schools and districts, the Public Sector Addendum.

## What you get

Claude for Teachers includes Pro-level features, with Claude Code and Claude Cowork. It also includes:

- **The Learning Commons connector**, which gives Claude academic standards in all 50 states, the prerequisite skills beneath them, and curriculum context

- **Teaching skills** for lesson planning and differentiation, grounded in learning science

- **Education connectors** from partners including MagicSchool, TeachFX, and Canva for Education

- **FERPA-aligned protections**

**Important:** Claude for Teachers is not for students. It's an educator-only offering. If you're a student over 18 or using Claude outside your work as an educator, Claude is governed by our Consumer Terms of Service instead.

If your district has set up a Claude for Teachers organization, the K-12 terms your district accepted govern your use of Claude within that organization.

## K-12 privacy and terms

### We don't train on your conversations

Anthropic will not use your inputs or outputs to train our models. You keep all rights to your Inputs. You own your Outputs.

### Protect your data

When you create a Claude for Teachers account, you are the “Controller” of the data submitted. You control how the data is used, and may access or delete that data at any time. Anthropic acts as a “Processor” of the data on your behalf. We only process the data as instructed by you in order to provide the Claude service. This means:

- Student data stays under your (or your district's) control, and Anthropic uses it only to provide the service.

- Anthropic doesn't sell or share student data, and doesn't use it for advertising, marketing, or to build a profile of a student.

- Anthropic doesn't collect student data directly from students. Student accounts aren't part of Claude for Teachers.

- Requests from students or parents about their information are forwarded to you or your district to handle, and Anthropic helps you respond.

**Note:** Claude for Teachers provides a FERPA-configured setting to process student data. Whether and how identifiable student information may be used in Claude for Teachers is determined by your school or district's policies, not by Anthropic. If you're on an individual teacher account and have not received school or district authorization to make that decision, don't include identifiable student information in Claude for Teachers.

### Security

AES-256 encryption at rest. TLS 1.2 or better in transit. Multi-factor authentication on every system holding your data, with access limited to staff who need it. Annual third-party audits and penetration testing. Certifications, including SOC 2, at our **[Trust Center](https://trust.anthropic.com/)**. Anthropic gives advance notice before adding a new subprocessor, with 15 days to object, and districts can audit Anthropic's controls once a year.

### Delete your data

You control your conversations and can delete your chats anytime from your dashboard. More information on data deletion can be found here: **[Can you delete data that I sent via Team and Enterprise plans?](https://support.claude.com/en/articles/9796617-can-you-delete-data-that-i-sent-via-team-and-enterprise-plans)**

Your district's admins can also delete any member's data through the Compliance API when district policy requires it. If your district leaves Claude, Anthropic returns your district's data on request and deletes its copies within 30 days, except where the law requires retention.

## About your Claude for Teachers account

### Individual teacher accounts

When you verify, your account moves onto a Claude for Teachers plan—a free Claude for Teams plan for verified educators. It comes with educator-specific terms and a data processing agreement, your chats and files aren't used to train our models, and student-data protections are built in. Your usage limits are higher than a standard free account—enough for everyday classroom work like lesson planning, quizzes, and parent communication.

Some Team plan features are turned off for Claude for Teachers. You won't see billing and seat purchasing, **[member invitations and management](https://support.claude.com/en/articles/13133750-manage-members-on-team-and-enterprise-plans)**, roles and permissions, SSO and domain capture, spend controls, usage credits, or premium seats. For questions, **[reach out to our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)**.

### School and district organizations

When your school or district sets up Claude for Teachers, teachers are members of a **[Claude Enterprise organization](https://support.claude.com/en/articles/16559896)** that the district owns and manages.

What's different from an individual Claude for K-12 Teachers account:

- **One set of terms.** Your district accepts the K-12 terms and DPA once for everyone.

- **District sign-in.** You sign in with your district login (single sign-on) rather than creating your own account. Once your district verifies its email domain, new personal Claude accounts can't be created with a district email address.

- **Admin controls.** Your district's admins decide which features, models, and connectors you can use, and can manage members and roles.

- **Admin access to content.** Your district's primary owner can turn on the Compliance API and use it to read or delete any member's chats, files, and projects.

- **Same usage allowance.** You get the same rolling five-hour and weekly limits as an individual Claude for Teachers account.

**Note:** Public schools, districts, and charter schools also accept the **[US K-12 Public Sector Addendum](https://anthropic.com/legal/k12-addendum)**, which adapts the terms for public entities—for example, your state's law governs, and arbitration and indemnification will not apply when prohibited by state law. It doesn't change how student data is handled, and it doesn’t apply to individual teacher accounts.

## Get started

Teachers, schools, and districts can all get started for free at **[Claude for Teachers](https://claude.com/solutions/teachers)**. Sign up by June 30, 2027 for your full year of free access.
---

SOURCE: https://support.claude.com/en/articles/7996862-how-do-i-view-and-sign-your-data-processing-addendum-dpa

# How do I view and sign your Data Processing Addendum \(DPA\)?

*This article is about our commercial products (e.g. Claude for Work, Claude API). For our consumer products (e.g. Claude Free, Claude Pro), see [here](https://privacy.claude.com/en/collections/10663362-consumers).*

Anthropic’s DPA with Standard Contractual Clauses (SCCs) is automatically incorporated into our [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms), and can be viewed [here](https://www.anthropic.com/legal/data-processing-addendum). When you accept Anthropic’s Commercial Terms of Service, you also accept our DPA.

**Important note for third-party platform users:** If you access Claude via a third-party platform or service provider, your use of Claude in those cases is governed by the third-party platform's terms of service.
---

SOURCE: https://support.claude.com/en/articles/8114494-how-up-to-date-is-claude-s-training-data

# How up-to-date is Claude's training data?

While we're constantly updating Claude's data, each model has a knowledge cutoff:

- Claude Haiku 5.5 was trained on data up until June 2026.

- Claude Sonnet 5.5 was trained on data up until June 2026.

- Claude Opus 5.5 was trained on data up until June 2026.

- Claude Fable 5.1 was trained on data up until June 2026.

- Claude Opus 5 was trained on data up until May 2026.

- Claude Sonnet 5 was trained on data up until January 2026.

- Claude Fable 5 was trained on data up until January 2026.

- Claude Opus 4.8 was trained on data up until January 2026.

- Claude Opus 4.7 was trained on data up until January 2026.

- Claude Sonnet 4.6 was trained on data up until August 2025.

- Claude Opus 4.6 was trained on data up until August 2025.

- Claude Haiku 4.5 was trained on data up until July 2025.

- Claude Opus 3 was trained on data up until August 2023.

These models may not be aware of events or information that occurred after their respective cutoff dates. If you ask about more recent events, the model may not have accurate information.

You can refer to **[Models overview](https://docs.claude.com/en/docs/about-claude/models/overview)** in our Claude Docs for more detailed information about our models.
---

SOURCE: https://support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations

# I would like to input sensitive data into my chats with Claude. Who can view my conversations?

*This article is about our consumer products (e.g. Claude Free, Pro, Max, Ultra (and when using Claude Code with those accounts)).*

## How we protect your data when you help improve Claude

When you allow us to use your chats or coding sessions to help improve Claude, we implement several layers of protection for your privacy.

## Privacy protections we provide

- We automatically de-link your data from your user ID (like your email address) before any review.

- Access is limited to a small number of personnel involved in model training.

- We will use tools and processes derived from our work on **[privacy-preserving analysis tools](https://www.anthropic.com/research/clio)** to filter or obfuscate sensitive data. In addition to that, our pioneering research in post-training techniques helps to minimize the amount of personal data included in Claude’s outputs.

- Your data is used solely to make Claude better for everyone - we do not use such personal data to contact people, build profiles about them, to try to sell or market anything to them, or to sell the information itself to any third party.

- You maintain full control and can adjust your **[privacy settings](https://claude.ai/settings/data-privacy-controls)** at any time.

- Your incognito chats are not used to improve Claude, even if you have enabled Model Improvement in your privacy settings. **[Learn more](https://support.claude.com/en/articles/12260368-)** about incognito chats.

**Note:** If our safety classifiers flag your conversations, they may still be used to improve our internal trust and safety models, detect harmful content, enforce our policies, or advance our safety research.

## Be mindful about sensitive information

While we have these protections in place, we also recommend being thoughtful about sharing highly sensitive personal details such as:

- Financial information (SSN, credit card numbers, bank account details)

- Health records or medical information

- Passwords or private login credentials

- Confidential business or personal documents

## Your control over privacy settings

You can adjust your privacy and model improvement settings at any time by following the steps here: **[How do I change my model improvement privacy settings?](https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings)** Learn more about your privacy settings and controls in our **[Privacy Center](https://privacy.claude.com/en/collections/10672568-privacy-settings-controls)**.
---

SOURCE: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler

# Does Anthropic crawl data from the web, and how can site owners block the crawler?

As per industry standard, Anthropic uses a variety of robots to gather data from the public web for model development, to search the web, and to retrieve web content at users’ direction. Anthropic uses different robots to enable website owner transparency and choice. Below is information on the three robots that Anthropic uses and how to set your site preferences to enable those you want to access your content and limit those you don’t.

| **Bot**          | **Use**                                                                                                                                                                           | **What happens when you disable it**                                                                                                                                                                                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ClaudeBot        | ClaudeBot helps enhance the utility and safety of our generative AI models by collecting web content that could potentially contribute to their training.                         | When a site restricts ClaudeBot access, it signals that the site's future materials should be excluded from our AI model training datasets.                                                                                                                                                         |
| Claude-User      | Claude-User supports Claude AI users. When individuals ask questions to Claude, it may access websites using a Claude-User agent.                                                 | Claude-User allows site owners to control which sites can be accessed through these user-initiated requests. Disabling Claude-User on your site prevents our system from retrieving your content in response to a user query, which may reduce your site's visibility for user-directed web search. |
| Claude-SearchBot | Claude-SearchBot navigates the web to improve search result quality for users. It analyzes online content specifically to enhance the relevance and accuracy of search responses. | Disabling Claude-SearchBot on your site prevents our system from indexing your content for search optimization, which may reduce your site's visibility and accuracy in user search results.                                                                                                        |

As part of our mission to build safe and reliable frontier systems and advance the field of responsible AI development, we’re sharing the principles by which we collect data as well as instructions on how to opt out of our crawling going forward:

- Our collection of data should be *transparent*. Anthropic uses the Bots described above to access web content.

- Our crawling should *not* *be* *intrusive or disruptive*. We aim for minimal disruption by being thoughtful about how quickly we crawl the same domains and respecting Crawl-delay where appropriate.

- Anthropic’s Bots *respect “do not crawl”* signals by honoring industry standard directives in robots.txt.

- Anthropic’s Bots *respect anti-circumvention technologies* (e.g., we will not attempt to bypass CAPTCHAs for the sites we crawl.)

To limit crawling activity, we support the non-standard Crawl-delay extension to robots.txt. An example of this might be:

User-agent: ClaudeBot

Crawl-delay: 1

To block a Bot from your entire website, add this to the robots.txt file in your top-level directory. Please do this for every subdomain that you wish to opt out from. An example of this is:

User-agent: ClaudeBot

Disallow: /

Opting out of being crawled by Anthropic Bots requires modifying the robots.txt file in the manner above. Alternate methods like blocking IP address(es) from which Anthropic Bots operates may not work correctly or persistently guarantee an opt-out, as doing so impedes our ability to read your robots.txt file. If a crawler has a source IP address on **[this list](https://claude.com/crawling/bots.json)**, it indicates that the crawler is coming from Anthropic.

You can learn more about our data handling practices and commitments at our **[Help Center](https://support.claude.com/en/collections/4078534-privacy-and-legal)**. If you have further questions, or believe that our Bots may be malfunctioning, please reach out to <claudebot@anthropic.com>. Please reach out from an email that includes the domain you are contacting us about, as it is otherwise difficult to verify reports.

You can be notified of substantial changes to this article by clicking here and completing the form:

[Subscribe to updates](https://docs.google.com/forms/d/e/1FAIpQLScQk_jt1NrI0AZU3RfBCDkCe4RBS2lAzMVILBICWdi4xwBaRw/viewform)
---

SOURCE: https://support.claude.com/en/articles/9450526-export-your-claude-data

# Export your Claude data

Data exports are available to individual Claude users on Free, Pro, Max, and Ultra plans. Data exports include conversation data and the user data for your account.

If you’re on a Team or Enterprise plan, you can export your own data once an organization Owner or Primary Owner turn this on. Primary Owners export the whole organization’s data instead.

Individual Claude users can export user information and chat history from **[Settings > Privacy](https://claude.ai/settings/data-privacy-controls)** on the web app or Claude Desktop. It's not possible to run an export from Claude for iOS or Android.

To export your data:

1. Go to **[Settings > Privacy](https://claude.ai/settings/data-privacy-controls)**.

2. Click “Export data”.

Once the export has been processed, you will receive a download link via email.

Please note:

- There may be a small delay while the export is generated.

- The email will be sent to the address associated with your account.

- You must be signed in to your account to download your data using this link.

- The download link will expire 24 hours after delivery.

- If your link expires, you can always request a new one by repeating the export process.

---

## Export your data on a Team or Enterprise plan

If you’re on a Team or Enterprise plan, you can export your own chats by following the steps above once an owner turns on the “Allow members to export their own data” setting for your organization. If you don’t see the “Export data” button, ask an owner whether the setting is on. The export includes your own chats. It doesn’t include the contents of files you uploaded.

**Important:** Primary Owners don’t see the “Export data” button in their personal settings. Primary Owners export the whole organization’s data from **[Organization settings > Data and privacy](https://claude.ai/admin-settings/data-privacy-controls)** instead. Learn more about **[exporting your organization’s data](https://support.claude.com/en/articles/13346720)**.

---

## Can I import or migrate this data to another Claude account?

Exported data can't be imported into another personal Claude account, and we don't support migrating data between personal accounts.

If you're joining a Team or Enterprise organization, you don't need an export to bring your work with you—you can migrate your personal account directly into the organization's workspace. For details, see **[Move your personal Claude account to a Team or Enterprise organization](https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization)**.