
---

SOURCE: https://support.claude.com/en/articles/10023638-why-am-i-receiving-an-output-blocked-by-content-filtering-policy-error

# Why am I receiving an 'Output blocked by content filtering policy' error?

Some Claude users may encounter refusals or errors with the message ‘Output blocked by content filtering policy’. These refusals do not reflect Anthropic’s judgments about the propriety of any content. Instead, they generally arise from Anthropic’s efforts to prevent Claude from being used to replicate or regurgitate pre-existing materials. Anthropic takes these steps because Claude’s purpose is to generate new content and ideas, not to reproduce content that already exists. We also prohibit in our terms and policies use of our services in ways that infringe, misappropriate, or violate intellectual property or other legal rights.

We’re mindful that some users may encounter these refusals or errors when they aren’t intending for Claude to replicate or regurgitate anything. We know this can be frustrating, and welcome your feedback and insights as we iterate on our tooling to improve our users’ experiences with our services.

Conversely, if you are receiving these messages because you *are* trying to elicit copyrighted content, we may warn you or, in cases of repeat violations, suspend or terminate your account.
---

SOURCE: https://support.claude.com/en/articles/11174660-online-safety-contacts

# Online Safety Contacts

# **Designated Point of Contact for Authorities**

Government authorities can contact Anthropic directly by emailing <regulator-inquiries@anthropic.com>. This is reserved for government officials seeking a point of contact and for governmental submissions to remove content.

For other types of inquiries, please use the mechanisms described below. ￼

# **Illegal Content Reporting**

For user requests for content removal, please use the mechanisms described [here](https://support.anthropic.com/en/articles/10684638-blocking-and-removing-content-from-claude). ￼
---

SOURCE: https://support.claude.com/en/articles/12119250-model-safety-bug-bounty-program

# Model Safety Bug Bounty Program

## Purpose

We believe external testing is crucial for building a safe AI ecosystem. As model capabilities advance, the consequences of jailbreaks could become increasingly significant. This ongoing Program builds on our successful previous bug bounty initiatives with several key objectives:

1. Identify universal jailbreaks in our deployed systems with ASL-3 protections

2. Provide continuous assessment of our safeguards' effectiveness

3. Test our monitoring systems' ability to detect vulnerabilities

4. Incentivize the user of one central legitimate channel for reporting publicly available jailbreaks

## Program Overview

Our Model Safety Bug Bounty Program is run through HackerOne. Through this Program, we are interested in finding universal jailbreaks that surpass our [Constitutional Classifiers](https://www.anthropic.com/news/constitutional-classifiers) system. We also occasionally run targeted programs within our overall Program to test the robustness of classifiers we hope to launch in the future.

A universal jailbreak is a generalized technique that reliably elicits policy-violating responses from a language model, regardless of the input prompt. Unlike narrow jailbreaks, which depend on the specifics of a particular question or context, universal jailbreaks work across a wide range of prompts and scenarios.

This is an ongoing Program. Once accepted to the Program on HackerOne, participants can submit jailbreak reports at any time through this Program. **To help with your red-teaming efforts, we provide access to a free model alias that reflects the model and classifiers live on our latest, most advanced model**. **Your use of this free model alias must be limited to performing authorized red-teaming activities.**

## Program Scope

This Program is primarily interested in discovering jailbreaks that are **universal**, in that they can reveal harmful information across a wide range of queries, and **detailed**, in that they reveal highly specific harmful information related to biological threats.

To emphasize, we are interested in jailbreaks that extract information that answers a set of **harmful biological questions that we share with accepted participants in the Program.**

We will pay **up to $35,000 per novel, universal jailbreak identified.** We are only interested in jailbreaks that reveal substantial amounts of harmful information based on our sole criteria and discretion. We award bounties using a sliding scale based on an internal grading rubric which determines how detailed and accurate responses are.

This program is scoped to jailbreaks on our Constitutional Classifiers. For technical vulnerabilities that potentially exist on our Information Systems such as misconfigurations, CSRFs or cross site request forgeries, privilege escalation attacks, SQL Injection, XSS, and directory traversal attacks, please refer to our [Responsible Disclosure Policy](https://www.anthropic.com/responsible-disclosure-policy) and submit your report [here](https://hackerone.com/297a385f-b3bd-4ecd-9466-7d9ad55371ce/embedded_submissions/new).

## How to Apply

You can apply to join our Program [here](https://docs.google.com/forms/d/e/1FAIpQLSf3IuyunFH1Rbz_9Bpt2kGBfwSW5QQ1TBkeAzNZrtCP-hRvNA/viewform). We review applications on a rolling basis. If accepted, you will receive an invite via HackerOne. IIf you do not already have a HackerOne account, please create one before applying to the Program so we can invite you directly on the platform. You must use your @wearehackerone.com email alias to create a [Claude Console account](https://platform.claude.com).

## Disclosure Guidelines & Confidentiality Obligations

All Program participants are required to sign a non-disclosure agreement to protect Program confidentiality as a condition for joining. **You may publicly disclose:**

- The existence of Anthropic's Model Safety Bug Bounty Program.

- Your participation as a selected participant in the Program.

**You may not disclose without express permission:**

- Any jailbreaks/vulnerabilities (even resolved ones) outside of the Program without express consent from Anthropic.

- The testing question set.

- Details about the classifiers and safety mitigations.

- Information about the models being tested.

- Identity of other participants.

- Any other information related to the Program, except as expressly permitted above.

## Anthropic’s Use of Data from the Program

Participant agrees that all data submitted to Anthropic, including its products and services, in connection with this Program may be used, stored, shared, and/or published by Anthropic indefinitely in furtherance of its safety research, model development, and related purposes without further obligation to Participant.
---

SOURCE: https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy

# Anthropic Software Directory Policy

Anthropic allows users to discover high-quality Model Context Protocol servers, Skill folders, plugins, apps, and other software, containers, or data (“Software”) that work seamlessly within Claude through directories, repositories, surfaces, or similar offerings (collectively, “Directories”). We review submissions to our Directories to ensure they meet our standards for safety, security, and compatibility with Anthropic Services and other Software. We conduct both initial and ongoing reviews of Software, and may require developers to address compliance issues to continue being included in our Directories. All Software must maintain compliance with these requirements, including any future changes, to remain in our Directories.

# 1. Safety and Security

A. Software must not violate or facilitate violation of our [Usage Policy](https://www.anthropic.com/legal/aup). All Software must comply with our Universal Usage Standards and High-Risk Use Case requirements and with our policy on the [countries and regions Anthropic currently supports](https://www.anthropic.com/supported-countries).

B. Software must not evade or enable users to circumvent Claude's safety guardrails, system instructions, or sandbox environments.

C. Software must prioritize protecting user privacy and the privacy interests of third parties. Developers must take care to responsibly handle personal and other sensitive data, follow privacy best practices, and ensure compliance with applicable laws.

D. Software must only collect data from the user’s context that is necessary to perform their function. Software must not collect extraneous conversation data, even for logging purposes.

E. Software must not infringe on the intellectual property rights of others.

F. Software must not query or extract data from Claude's memory, chat history, conversation summaries, or user-generated or uploaded files.

# 2. Compatibility

This section applies to Software that provides Claude with tools or capabilities through natural language descriptions, including MCP servers, Skill folders, and similar Software ("Instructional Software").

A. Instructional Software must define each tool or capability through narrow, unambiguous natural language that specifies what it does and when it should be invoked.

B. Instructional Software tool or capability descriptions must precisely match actual functionality, ensuring the Instructional Software is called at correct and appropriate times. Descriptions must not include unexpected functionality or promise undelivered features.

C. Instructional Software tool or capability descriptions must not create confusion or conflict with other Software in our Directories.

D. Instructional Software must not intentionally call or coerce Claude into calling other external software, tools, databases, or resources unless requested and intended by a user. Similarly, Instructional Software tool or capability descriptions must not be written in a way that intentionally leads to other Software extraneously calling them.

E. Instructional Software must not attempt to interfere with Claude calling tools from other software, tools, databases, or resources unless requested and intended by a user.

F. Instructional Software must not direct Claude to dynamically pull behavioral instructions from external sources for Claude to execute.

G. Instructional Software must not contain hidden, obfuscated, or encoded instructions. All behavioral guidance must be human-readable and clearly presented.

# 3. Developer Requirements

A. Developers of Software that collects user data or connects to a remote service must provide a clear, accessible privacy policy link explaining data collection, usage, and retention. Developers must provide Anthropic with links to all applicable privacy policies and ensure such policies are presented to users as required by law.

B. Developers must provide verified contact information and support channels for users with product or security concerns.

C. Developers must document how their Software works, its intended purpose, and how users can troubleshoot issues.

D. Developers must provide a standard testing account with sample data for Anthropic to verify full Software functionality.

E. Developers must provide at least three working examples of prompts or use cases that demonstrate core functionality.

F. Developers must verify that they own or control any API endpoint, domain, or user interface their Software connects to, as well as any external resources it retrieves or renders. Plugins are an exception, and may connect to any Connector approved in the Software Directory.

G. Developers must maintain their Software and address issues within reasonable timeframes.

H. Developers must agree to our [Software Directory Terms](https://support.claude.com/en/articles/13145338-anthropic-software-directory-terms) and follow design guidelines Anthropic publishes applicable to Software.

# 4. Unsupported Use Cases

Unless otherwise expressly permitted by us in writing, we do not allow Software with certain capabilities into our Directories. We may revisit these restrictions as our Directories and Anthropic Services evolve.

A. Software that transfers money, cryptocurrency, or other financial assets, or executes financial transactions on behalf of users.

B. Software that uses AI models to generate images, video, or audio content. Design-focused software that uses AI models to create visual aids (such as slides, diagrams, charts, UI mockups, logos, or other design assets) are permitted. These servers may generate images as part of a design workflow, provided the developer does not offer standalone image generation as a primary service.

C. Software that serves [advertisements](https://www.anthropic.com/news/claude-is-a-space-to-think), sponsored content, paid product placements, or exists primarily as an advertising or promotional vehicle.

# 5. Additional Requirements for Model Context Protocol Servers

A. MCP servers must gracefully handle errors and provide helpful feedback rather than generic error messages.

B. MCP servers must be frugal with their use of tokens. The amount of tokens a given tool call uses should be roughly commensurate with the complexity or impact of the task. When possible, users should be given options to exclude unnecessary text in the response.

C. MCP tool names must not exceed 64 characters.

D. Remote MCP servers that connect to a remote service and require authentication must use secure OAuth 2.0 with certificates from recognized authorities.

E. MCP servers must provide all applicable [annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations) for their tools, in particular *readOnlyHint*, *destructiveHint*, and *title*.

F. Remote MCP servers should support the [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) transport. Servers may support [SSE](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports#http-with-sse) for the time being, but in the future it will be deprecated.

G. Local MCP servers must be built with reasonably current versions of all dependencies, including packages in *node_modules*.

See prior version of this policy here: [Anthropic MCP Directory Policy](https://support.claude.com/en/articles/11697096-anthropic-mcp-directory-policy).
---

SOURCE: https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude-opus-and-sonnet

# Real-time cyber safeguards on Claude Opus and Sonnet

**Note**: This article applies only to Opus and Sonnet class models.

As part of our ongoing safety commitments, we have real-time cyber safeguards on Claude Opus and Sonnet models. These safeguards are designed to automatically detect and block requests that may indicate prohibited or high-risk cybersecurity usage based on our Usage Policy.

## How this works

Our cyber safeguards currently block two categories of activities:

- **Prohibited use:** Cybersecurity activities that are almost always used maliciously and have little to no legitimate defensive application such as mass data exfiltration or ransomware code development. These are blocked by default and not subject to adjustment via self-serve application through the Cyber Verification Program.

- **High Risk Dual use:** Cybersecurity activities that have legitimate defensive applications, such as vulnerability exploitation or offensive security tooling development. These are blocked by default, but defensive users can apply for adjustment for legitimate use cases through the Cyber Verification Program described below.

## Cyber Verification Program

Many cybersecurity practitioners do legitimate work that overlaps with the dual use category above. The Cyber Verification Program (CVP) is a free application-based program for **Opus and Sonnet** that is designed to enable professionals to continue working on legitimate dual use tasks safely while minimizing interruption.

If your use case has a legitimate defensive purpose and is being affected by these safeguards, we encourage you to apply for the CVP. See **How to apply** below for the right path based on how you access Claude.

Organizations on Zero Data Retention (ZDR) are not currently eligible to participate in the CVP. If you have a Sales Managed ZDR account, please contact your Anthropic Sales Representative for more information.

## How to apply

How you apply depends on how you access Claude. Once you submit your application, we aim to send an email notification with our review decision within two business days. To submit an application you will need to verify your identity. Please see **[Identity verification on Claude](https://support.claude.com/en/articles/14328960-identity-verification-on-claude)** for more information.

| **How you access Claude**                                                | **How to apply**                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Anthropic first-party** (Claude.ai, Claude Code, the Anthropic API)    | Navigate to the **[Verification Portal](https://portal.anthropic.com/programs/cvp)** to apply for access to the Cyber Verification Program.<br>**Note:** Only authorized admins will see this option.                                                                                                                   |
| **Microsoft Foundry**                                                    | Find both your Azure Tenant ID and Subscription ID in your Azure Portal (see instructions **[here](https://learn.microsoft.com/en-us/azure/azure-portal/get-subscription-tenant-id)**). Choose "Azure" under the **Surface** field in the **[Cyber Use Case Form](https://claude.com/form/cyber-use-case)**.            |
| **Amazon Bedrock**                                                       | The Cyber Verification Program is not available on Bedrock at this time.                                                                                                                                                                                                                                                |
| **Claude Platform on AWS**                                               | Navigate to the **[Verification Portal](https://portal.anthropic.com/link?account_source=aws&program=cvp)** to apply for access to the Cyber Verification Program. You will need to create or log into an Anthropic account, then link your AWS account.
​<br>**Note:** Only authorized admins will be able to apply. |
| **Google Vertex AI**                                                     | The Cyber Verification Program is not available on Vertex at this time.                                                                                                                                                                                                                                                 |
| **Third-party platform** (coding tools and other apps powered by Claude) | Reach out to your platform directly to check if Anthropic CVP is available and if so request access to the Cyber Use Case Form through the platform. Not all platforms participate in the CVP at this time.                                                                                                             |
| **Bring your own key (BYOK) Customers**                                  | Follow instructions under **Anthropic first-party**                                                                                                                                                                                                                                                                     |

[Verification Portal](https://portal.anthropic.com/programs/cvp)

**Are you a platform owner?** If you use Claude to power products or services available to your customers and want to learn whether your platform is eligible to participate in the Cyber Verification Program, please **[fill out this Platform CVP Interest Form](https://claude.com/form/platform-cvp-interest)**.

## Appeals

We expect to occasionally decline eligible applications incorrectly, and approved users may still experience blocks on legitimate work. We’re actively working to reduce both.

If you’re encountering one of these issues, we recommend checking the following:

**Are you signed in to the right organization?** CVP approval is tied to a specific organization ID. If you're hitting blocks on a different organization—for example, your personal workspace instead of your team's organization—the approval doesn't carry over. Compare the organization ID where you're seeing blocks against the one on your approval email.

**Is the activity actually dual use?** CVP approval only lifts blocks on dual use activities. Prohibited use activities (e.g., mass data exfiltration, ransomware code development) remain blocked regardless of CVP status.

If you've checked both and still believe something is wrong, you can **[submit a report or appeal form](https://claude.com/form/cyber-block-false-positive-report-cvp-rejection-appeal)**. Your feedback helps us refine these safeguards.
---

SOURCE: https://support.claude.com/en/articles/15591275-child-safety-guidance-for-developers

# Child safety guidance for developers

## **Our commitments to child safety**

Anthropic takes a Safety by Design approach to child safety. We are signatories to **[Thorn and All Tech Is Human’s Safety by Design Principles for Generative AI](https://www.anthropic.com/news/child-safety-principles)** and report on our progress in the **[Transparency Hub](https://www.anthropic.com/transparency/voluntary-commitments)**. In practice, this means that we apply safety training designed to make our models refuse requests that sexualize or endanger minors, operate detection and monitoring systems across our services, and report apparent CSAM and other forms of child exploitation to the National Center for Missing & Exploited Children (NCMEC). Our first-party consumer services are restricted to users 18 years and older, and Claude does not produce photorealistic image or video output.

These protections apply across our platform. Because you control your product's design, user base, and content flows, you are best positioned to address risks specific to your deployment.

## **Your obligations under Anthropic's Usage Policy**

All developers building on Anthropic's API are required to comply with our **[Usage Policy](https://www.anthropic.com/aup)**, which prohibits using our products or services to compromise children's safety. This includes, among other things, creating, distributing, or promoting CSAM, including AI-generated CSAM; facilitating grooming, trafficking, sextortion, or other exploitation of a minor; and sexualizing minors in any context, including fiction or roleplay.

These obligations apply regardless of your platform's size or use case. While you may already prohibit this activity, your end users or customers may upload CSAM, elicit sexualized content involving minors, or use outputs to facilitate grooming or sextortion. You are responsible for implementing appropriate safeguards against these risks on your deployment. We monitor API usage for violations of the Usage Policy and take enforcement action consistent with our policies and legal obligations.

Additionally, if your product allows minors to interact directly with our models, please refer to our **[Guidelines for Organizations Serving Minors](https://support.claude.com/en/articles/9307344)**, which sets out the additional safeguards Anthropic requires for that audience. This guidance covers a range of possible measures, including but not limited to age verification systems, content moderation and filtering, monitoring and reporting mechanisms, and regulatory compliance and disclosure requirements.

Whether you've received a notification from Anthropic about prohibited content or are proactively building out your safeguards, the resources below can help you get oriented in standing up detection, reporting, and response infrastructure appropriate to your platform.

## **Building a child safety program**

There is no single correct architecture for a child safety program. The viable approach depends on your platform; its size; the surfaces where users can engage, submit, or generate content; and your jurisdiction. Many platforms have already built prevention and response capabilities suited to their own contexts, and the field has developed shared guidance, tooling, and reporting infrastructure that newer programs can draw on. The organizations below offer resources that many platforms use as a starting point. Anthropic does not require you to use any specific vendor or program.

**Design principles.** Thorn and All Tech Is Human have published **[Safety by Design for Generative AI](https://www.thorn.org/blog/generative-ai-principles/)**, a set of principles and practical mitigations for preventing child sexual abuse across the develop, deploy, and maintain phases of an AI product. Anthropic is a **[signatory](https://www.anthropic.com/news/child-safety-principles)** to these principles, and we encourage developers building on our models to consider them when designing their own safeguards.

**Detection & blocking services.** If your deployment allows users to upload or generate images or videos, or interact with other users, you can implement detection on your own infrastructure. Organizations may choose to build custom classifiers tailored to their threat model, though for many, a vendor or partner solution may be the more practical path. There are several providers that offer hash-matching, image, video, or text classifier solutions. For example, one widely deployed option is **[Thorn's Safer](https://safer.io/solutions/)**, which provides hash-matching against known CSAM and classifiers for novel material and grooming signals. The **[Internet Watch Foundation](https://www.iwf.org.uk/our-technology/our-services/)** (IWF) offers its member companies a **[suite of services](https://www.iwf.org.uk/our-technology/our-services/)** for detecting, blocking, and responding to CSAM on their platforms, including hash lists and a URL blocklist. The Tech Coalition's Pathways program (described below) can help companies evaluate and access detection options suited to their platform.

**Program development and operational guidance.** The **[Tech Coalition](https://technologycoalition.org/)** is an industry alliance focused on preventing online child sexual exploitation and abuse. Its free **[Pathways](https://technologycoalition.org/programs/pathways/)** program is designed for startups and small to mid-sized platforms and provides templates for building a child safety program, guidance on CSAM detection and NCMEC reporting, insight into global regulatory requirements, and support on emerging risks such as financial sextortion and AI-generated harms. Anthropic is a Tech Coalition member. You can contact the **[Tech Coalition team](mailto:md@technologycoalition.org)** for an initial consultation.

**Reporting.** US-based platforms with actual knowledge of apparent CSAM are legally required to report to **[NCMEC's CyberTipline](https://report.cybertip.org/)**. Platforms can **[register with NCMEC](https://esp.ncmec.org/registration)** to gain access to the CyberTipline reporting system, and NCMEC publishes additional **[legal resources](https://www.missingkids.org/gethelpnow/support/legalresources)** on reporting obligations. Platforms operating in other jurisdictions should consult local reporting requirements; INHOPE maintains a **[directory of national hotlines](https://www.inhope.org/EN#hotlineReferral)**. As you build your program, consider incorporating logging for the purposes of transparency reporting.

*This page is provided for informational purposes only and does not constitute legal advice or endorsement by Anthropic. Consult your own legal counsel regarding your specific obligations.*
---

SOURCE: https://support.claude.com/en/articles/8106465-our-approach-to-user-safety

# Our Approach to User Safety

User safety is core to Anthropic’s mission of creating reliable, interpretable, and steerable AI systems. As we launch new ways for people to interact with Claude, we also expect to see new types of potential harm materialize, whether through the generation of misinformation, objectionable content, hate speech or other misuses. We are actively investing in and experimenting with additional safety features to supplement our existing model safety efforts and are working to provide helpful tools to a wide audience while also doing our best to mitigate harm. Launching new products in open beta allows us to experiment, iterate and hear your feedback. Here are some of the safety features we’ve introduced:

- Detection models that flag potentially harmful content based on our [Usage Policy](https://vault.pactsafe.io/s/9f502c93-cb5c-4571-b205-1e479da61794/legal.html#aup).

- Safety filters on prompts, which may block responses from the model when our detection models flag content as harmful.

- Enhanced safety filters, which allow us to increase the sensitivity of our detection models. We may temporarily apply enhanced safety filters to users who repeatedly violate our policies, and remove these controls after a period of no or few violations.

These features are not failsafe, and we may make mistakes through false positives or false negatives. Your feedback on these measures and how we explain them to users will play a key role in helping us improve these safety systems, and we encourage you to reach out to us at <usersafety@anthropic.com> with any feedback you may have. To learn more, [read about our core views on AI safety](https://www.anthropic.com/index/core-views-on-ai-safety).
---

SOURCE: https://support.claude.com/en/articles/8241253-safeguards-warnings-and-appeals

# Safeguards warnings and appeals

**Note:** Our response times are currently longer than normal due to our recent launch and an increase in email volume. We will reply to your appeal/email as soon as we can and we ask for your patience in the meantime.

## Appeals

As part of our safety process, we may ban an account for a variety of reasons:

- Repeated violations of our **[Usage Policy](https://www.anthropic.com/legal/aup)**

- Account creation from an **[unsupported location](https://support.claude.com/en/articles/8461763-where-can-i-access-claude)**

- **[Terms of Service](https://www.anthropic.com/legal/consumer-terms)** violations

If you feel your account has been wrongly suspended or terminated, please go to **[claude.ai](http://claude.ai)**, log in with your banned account, and fill out the appeal form linked below. Our Safeguards team can further investigate why your account was disabled.

[Submit an appeal](https://claude.ai/restricted)

**Important:** You must be logged in to access the appeal form.

## Export your data or delete your account

If your Free, Pro, or Max account has been banned for violating our Usage Policy, you can still log in at **[claude.ai](https://claude.ai)** to export your data or delete your account. You don't need to contact Anthropic to do this. The options available to your account are shown on the same screen as the appeal form after you log in.

All banned users can delete their own account. Self-serve data exports are available to all banned users, but the data you’re able to access and export may be restricted depending upon the Usage Policy violation associated with your account.

For more information on exporting and deleting your Claude data, see **[Export your Claude data](https://support.claude.com/en/articles/9450526)** and **[How can I delete my Claude account?](https://support.claude.com/en/articles/9028421)**

## If your organization is on hold

If your own account is in good standing but an organization you belong to has been paused because of unusual activity, this will be noted when you log in to your Claude account. The restricted account screen lists each organization that's on hold.

Click "Request a review" on the affected organization to ask our Safeguards team to take another look.

## Warnings

As part of our safety process, we warn users if we believe their prompts are violating our **[Usage Policy](https://www.anthropic.com/legal/aup)**. For API customers, these warnings are linked to ongoing thresholds of violative behavior across their entire API account.

If you believe we’ve made a mistake in issuing you a warning, please email **<usersafety@anthropic.com>** with the details of your situation and your account information.
---

SOURCE: https://support.claude.com/en/articles/9199617-api-safeguards-tools

# API Safeguards Tools

Whether you are just starting the process of setting up safeguards for your API deployment of Claude, or your deployment is already running, here are some strategies to consider when building your own AI safety program. These suggestions are designed to help you comply with our [Terms of Service](https://www.anthropic.com/legal/commercial-terms) and [Usage Policy](https://www.anthropic.com/legal/aup), which prohibit certain uses of Claude. Failure to comply with the [Terms](https://www.anthropic.com/legal/commercial-terms) and [Usage Policy](https://www.anthropic.com/legal/aup) may result in suspension or termination of your access to the services.

**Basic Safeguards**

- Store IDs linked with each API call, so if you need to pinpoint specific violative content you have the ability to find it in your systems.

- Consider assigning IDs to users, which can help you track specific individuals who are violating Anthropic’s AUP, allowing for more targeted action in cases of misuse.

  - The choice to [pass IDs to Anthropic through the API](https://docs.anthropic.com/claude/reference/messages_post#:~:text=models%20for%20details.-,metadata,object,-An%20object%20describing) is up to you. But, if provided, we can more precisely pinpoint violations. To help protect end-users' privacy, any IDs passed should be cryptographically hashed.

- Consider requiring customer to sign-up for an account on your platform before utilizing Claude

- Ensure your customers understand permitted uses

- Warn, throttle, or suspend users who repeatedly violate Anthropic’s [Terms of Service](https://www.anthropic.com/legal/commercial-terms) and [Usage Policy](https://www.anthropic.com/legal/aup)

**Intermediate Safeguards**

- Create customization frameworks that restrict end-user interactions with Claude to a limited set of prompts or only allow Claude to review a specific knowledge corpus that you already have, which will decrease the ability of users to engage in violative behavior.

- Enable additional safety filters - free real-time moderation tooling built by Anthropic for helping detect potentially harmful prompts and managing real-time actions to reduce harm

  - For more information about how to enable our additional safety filters, please reach out to <usersafety@anthropic.com>.

- *For Bedrock Customers:*

  - Activate your private S3 bucket in order to store prompts and completions for your own evaluation

**Advanced Safeguards**

- [Use Claude for your content moderation](https://docs.anthropic.com/claude/docs/content-moderation)

- Run a moderation API against all end-user prompts before they are sent to Claude to ensure they are not harmful

**Comprehensive Safeguards**

- Set up an internal human review system to flag prompts that are marked by Claude (being used for content moderation) or a moderation API as harmful so you can intervene to restrict or remove users with high violation rates.
---

SOURCE: https://support.claude.com/en/articles/9205721-why-am-i-receiving-an-output-blocked-by-content-filtering-policy-error

# Why am I receiving an 'Output blocked by content filtering policy' error?

Some Claude users may encounter refusals or errors with the message ‘Output blocked by content filtering policy’. These refusals do not reflect Anthropic’s judgments about the propriety of any content. Instead, they generally arise from Anthropic’s efforts to prevent Claude from being used to replicate or regurgitate pre-existing materials. Anthropic takes these steps because Claude’s purpose is to generate new content and ideas, not to reproduce content that already exists. We also prohibit in our terms and policies use of our services in ways that infringe, misappropriate, or violate intellectual property or other legal rights.

We’re mindful that some users may encounter these refusals or errors when they aren’t intending for Claude to replicate or regurgitate anything. We know this can be frustrating, and welcome your feedback and insights as we iterate on our tooling to improve our users’ experiences with our services.

Conversely, if you are receiving these messages because you *are* trying to elicit copyrighted content, we may warn you or, in cases of repeat violations, suspend or terminate your account.
---

SOURCE: https://support.claude.com/en/articles/9519291-what-is-anthropic-s-policy-for-handling-governmental-requests-for-user-information

# What is Anthropic’s policy for handling governmental requests for user information?

Trust and transparency are paramount values. Accordingly:

1. Anthropic does not disclose information about customers or end users of our services in response to government requests except in accordance with valid legal process (eg., a validly issued subpoena or warrant). We will make an exception to this policy if we believe there is an emergency that may result in imminent physical harm or death, and providing such information without delay may avert that emergency.

2. We evaluate each request to ensure that it’s legally valid, and we may reject requests that are overly broad or vague.

3. We will also provide users notice if their data is requested, unless we believe we're legally prohibited from doing so, or other rare exceptions apply, including where a child is at risk of harm or in cases of emergency. In particular, if data is sought on an API or enterprise customer, we will generally ask the requester to contact our customer in the first instance.