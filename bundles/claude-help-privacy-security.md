
---

SOURCE: https://support.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained

# What Certifications has Anthropic obtained?

*This article is about our commercial products such as Claude for Work and the Anthropic API. For our consumer products such as Claude Free, Pro, Max and when accounts from those plans use Claude Code, see* *[here](https://privacy.claude.com/en/collections/10663362-consumers).*

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

2. Navigate to **[Settings > Organization and access](http://platform.claude.com/settings/organization)**.

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

Claude Security is a capability built into Claude that scans codebases for security vulnerabilities and suggests targeted patches for human review. It helps teams find and fix issues that traditional methods often miss. Learn more **[about Claude security](https://claude.com/product/claude-security)**.

Claude Security is now available in public beta for users on Enterprise plans.

Claude Security allows you to:

1. **Scan your code in parallel** — Claude Security understands context, traces data flows across files, and identifies complex, multi-component vulnerability patterns that traditional scanners might not detect.

2. **Validate findings** — Every finding goes through multi-stage verification, with Claude challenging its own results before surfacing them. The result: more real issues reported and fewer false positives.

3. **Review and patch** — Move from a finding into a Claude Code session to review the proposed fix. Resolve vulnerabilities quickly instead of growing a backlog.

Learn how to get started and how leading enterprises use the tool here: **[Getting started with Claude Security](https://claude.com/resources/tutorials/getting-started-with-claude-security)**.

---

## Enable Claude Security

An organization owner can enable Claude Security by going to **[Organization settings > Claude Security](https://claude.ai/admin-settings/claude-security)** and switching the **Turn on for your organization** toggle on.

---

## Finding types

Finding falls into these example categories below.

**Injection (SQL, Command, Code, XSS):** Untrusted input changes query structure or gets executed. E.g., ' OR 1=1--, ; rm -rf /, <script> in a comment.

**Injection (XXE, ReDoS):** Parsers or regex abused by crafted input. E.g., XML <!ENTITY> reading /etc/passwd.

**Path & Network (Path traversal, SSRF, Open redirect):** Input controls file paths, request destinations, or redirects. E.g., ../../etc/passwd, fetching <http://169.254.169.254/>.

**Auth & Access (AuthN bypass, PrivEsc, IDOR/BOLA, CSRF, Race):** Access checks missing, skippable, or racey. E.g., GET /orders/123 returns someone else's order.

**Memory Safety (Buffer/integer overflow, UAF, unsafe misuse):** Input writes past bounds, wraps arithmetic, or hits freed memory. Mostly C/C++/Rust unsafe.

**Cryptography (Timing leaks, algorithm confusion, weak primitives):** Secret-dependent branches, JWT alg=none, or MD5/SHA-1/DES/ECB in security paths.

**Deserialization (Arbitrary type instantiation):** Untrusted bytes drive object construction — pickle, Java readObject, YAML load. Often equals RCE.

**Protocol & Encoding (Cache safety, encoding confusion, length-prefix trust):** Layers disagree or trust declared sizes. E.g., cache poisoning via Host header.

---

## Severities

Severity is assigned per finding based on exploitability in your codebase, not the category itself—so the same category can land at different severities in different repos.

| **Severity** | **Criteria**                                                                                                                | **Typical example**                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| High         | Exploitable by an unauthenticated remote attacker against a default deployment, with no meaningful preconditions            | Unauthenticated command injection in a public API endpoint                |
| Medium       | Exploitable behind authentication, or needs 1–2 realistic preconditions (specific role, known identifier, user interaction) | SQL injection behind auth requiring knowledge of table schema             |
| Low          | Needs 3+ preconditions, local-only access, or lacks a concrete demonstrated attack path                                     | Timing side-channel requiring network proximity and thousands of requests |

---

## Finding structure

Each finding contains the following fields:

- Title — short descriptive name of the finding

- Details — description of what the finding is and why it matters

- Location — file path and line number, linked to the source

- Impact — what could go wrong if this isn’t addressed

- Reproduction steps — ordered list of steps to reproduce or observe the issue

- Recommended fix — guidance on how to resolve it

- Severity — HIGH / MEDIUM / LOW

- Status — Open / Dismissed / Resolved

- Category — finding type

- Repository — repository identifier

- Branch — branch name the finding was produced against

- Date created — date the finding was created

- Shown only if the finding was dismissed:

  - Dismissal reason

  - Dismissal note — optional

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

- **Product price and cost** — Scans are charged at direct token cost only. There is no additional platform fee for Claude Security.

- **Models** — Claude Security runs scans on Claude Mythos 5. Users receive findings without direct model access. Suggested patches open in Claude Code on the Web and can be implemented with whichever models are available in your account.

- **Claude Security plugin for Claude Code** — The plugin uses whichever models you have access to in Claude Code. Only the Claude Security product at **[claude.ai/security](https://claude.ai/security)** runs scans on Claude Mythos 5.

- **Scan length** — Scan time varies based on the repository and the agent's actions.

- **Severity configuration** — as of today, severity is not configurable.

- **Non-GitHub repositories** — Repositories hosted on **[GitHub.com](https://github.com)** and GitHub Enterprise Server can be scanned. Other hosting providers are not supported today.

- **No Zero Data Retention (No ZDR)** — Anthropic may retain data where required by law or to address Usage Policy violations.

- **Scan consistency** — Scans are stochastic by design. Unlike traditional static analyzers, Claude Security uses an agent that adapts its analysis to each run, reasoning over code context rather than applying fixed pattern matches. This enables the depth of analysis needed to catch logic-level vulnerabilities.

- **Exporting findings** — You can copy findings, download them as CSV or Markdown, or push them to your own tracking and notification systems via per-project webhooks. See the “getting started” guide.

- **Feedback** — Please share your feedback using the in-product feedback icon on the right.

- **IP addresses for Github** — Use the following Anthropic guide for IP addresses allowlisting: **[IP addresses](https://platform.claude.com/docs/en/api/ip-addresses)**. If you use GitHub Enterprise Server, your instance must allow inbound traffic from these IP addresses so Claude Security can reach your repositories.

**Scope of use:** You will only use Claude Security to scan code that you or your company owns and to which you or your company holds all necessary rights to scan. You will not use Claude Security to scan code owned by or licensed from third parties, including but not limited to open source projects or repositories other than those included in your company's codebase(s).
---

SOURCE: https://support.claude.com/en/articles/15425996-data-retention-practices-for-covered-models

# Data retention practices for Covered Models

To ensure we’re responsibly deploying covered models, **we are requiring limited data retention and review as part of our safety work. Prompts submitted to, and outputs generated by, covered models are retained for 30 days** **to support our safety work, on every platform where these models are offered.**

This applies to Mythos-class models and future models with similar capabilities that we designate as **[covered models](https://support.claude.com/en/articles/15425695)**. For all other models, everything you use is unaffected and stays under the current terms.

This policy, described below, goes into effect on June 9, 2026. For more information on the threat model for retained data and associated privacy controls, please see the corresponding **[technical white paper](https://trust.anthropic.com/resources?s=7ksqkied5hn0pocsj206m&name=[anthropic]-security-and-privacy-design-of-anthropic-data-retention-and-review)** on our Trust Center.

## Who this applies to

Consumer plans (Claude Free, Pro, and Max) across our web, desktop, and mobile apps—including Claude.ai and Claude Code—are unaffected by this update, since we already retain inputs and outputs on these surfaces. Learn more about **[how we retain data](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data)** for consumer plans.

This change only applies to organizations that have set up workspaces with **[zero data retention](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to)** (ZDR) in Claude Console, use Claude Code with ZDR in Claude Enterprise, or access Claude through AWS Bedrock, Google Cloud Agent Platform, or Microsoft Foundry with ZDR. The rest of this article applies only to these organizations.

## Why we’re doing this

Claude Mythos 5 represents a substantial increase in model capabilities, some of which can be used for both benign and malicious purposes. Claude Fable 5 shares the same underlying model as Claude Mythos 5, but with additional safeguards, particularly in the cyber and bio domains. While these safeguards allow us to share this intelligence more broadly, we are taking a conservative approach that allows us to look for patterns of misuse with this class of model and future models we release that are similarly or more capable. Some attacks only become visible across multiple requests. **[Best-of-N jailbreaking](https://arxiv.org/abs/2412.03556)**, for example, sends hundreds of slight variations of a prompt in the hope that one will work. Larger patterns of misuse, such as **[state-sponsored espionage](https://www.anthropic.com/news/disrupting-AI-espionage)** or **[data extortion campaigns](https://www.anthropic.com/news/detecting-countering-misuse-aug-2025)**, only surface when our safeguards classifiers can zoom out across many requests. Detecting these threats requires temporarily retaining prompts and outputs so they can be analyzed together, rather than one at a time.

## How we protect your data

By default, no Anthropic personnel can read your retained conversations. Human review can occur only through a controlled access path—for example, when content is flagged by our automated trust and safety systems for potential harm. These reviews can only be performed by a small set of approved reviewers. Every instance of access is recorded in a tamper-proof log that reviewers cannot suppress or modify. After 30 days, the data is deleted automatically, except in the rare cases where it's been flagged by our automated trust and safety systems or we're legally required to keep it. Eligible organizations also have the option to add customer-managed encryption keys and access transparency audit logs.

Anthropic maintains a documented information security program with technical and organizational measures that are designed to protect the security, confidentiality, and integrity of customer data. Our risk-based program is built for and evolves to defend against known and anticipated threat models and is tested regularly.

## What, if anything, do I need to configure?

This change only applies to organizations that have set up workspaces with zero data retention (ZDR) in Claude Console, use Claude Code with ZDR in Claude Enterprise, or access Claude through AWS Bedrock, Google Cloud Agent Platform, or Microsoft Foundry with ZDR. For all other organizations, there is no change and there's nothing to configure. The rest of this section is for organizations that access Claude without data retention today and need to set up data retention in order to use designated models when they become available.

### If your developers use the Claude API

- **Directly from Anthropic through Claude Platform:** Turn on retention for the workspaces where you want to use covered models in the developer console (**Workspace > Manage > Privacy Controls**). Your other ZDR-enabled workspaces keep ZDR. Refer to the **[Anthropic Trust Center for documentation](https://trust.anthropic.com/)**.

- **Through Claude Platform on AWS:** Retention works the same way as the direct Claude API. It's configured at the workspace level, and retained data is handled by Anthropic under the same controls.

- **Through Amazon Bedrock:** Retention will need to be enabled to access covered models, and retained data stays in AWS. Refer to AWS Bedrock’s **[documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.html)**.

- **Through Google Cloud's Agent Platform:** Retention will need to be enabled to access covered models, and retained data stays in GCP. Refer to Google Cloud's Agent Platform **[documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/fable-5)**.

- **Through Claude in Azure Foundry:** Retention is configured for each Azure Subscription. If you have Zero Data Retention configured, then you will need to create and use a separate Azure Subscription to access these models.

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

**Important:** If your district has set up a Claude for Teachers organization, the K-12 terms your district accepted govern your use of Claude within that organization.

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

*This article is about our consumer products (e.g. Claude Free, Pro, Max (and when using Claude Code with those accounts)).*

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

Data exports are available to individual Claude users on Free, Pro, and Max plans. Data exports include conversation data and the user data for your account.

If you're a member of a Team or Enterprise plan, only your organization's Primary Owner can access data exports. For more information, see **[Export your organization's data](https://support.claude.com/en/articles/13346720)**.

Individual Claude users can export user information and chat history from **[Settings > Privacy](https://claude.ai/settings/data-privacy-controls)** on the web app or Claude Desktop (it's not possible to run an export from Claude for iOS or Android).

Follow these steps to export your data:

1. Click on your initials in the lower left corner of your account.

2. Select "Settings" from the menu.

3. Navigate to the "Privacy" section.

4. Click the "Export data" button.

Once the export has been processed, you will receive a download link via email.

Please note:

- There may be a small delay while the export is generated.

- The email will be sent to the address associated with your account.

- You must be signed in to your account to download your data using this link.

- The download link will expire 24 hours after delivery.

- If your link expires, you can always request a new one by repeating the export process.

## Can I import or migrate this data to another Claude account?

Exported data can't be imported into another personal Claude account, and we don't support migrating data between personal accounts.

If you're joining a Team or Enterprise organization, you don't need an export to bring your work with you—you can migrate your personal account directly into the organization's workspace. For details, see **[Move your personal Claude account to a Team or Enterprise organization](https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization)**.