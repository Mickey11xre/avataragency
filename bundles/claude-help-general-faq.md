
---

SOURCE: https://support.claude.com/en/articles/10280783-where-do-i-find-claude-in-amazon-bedrock-documentation

# Where do I find Claude in Amazon Bedrock documentation?

Visit the Claude in Amazon Bedrock [user guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-claude.html).
---

SOURCE: https://support.claude.com/en/articles/10280791-what-aws-regions-are-claude-models-available-in-amazon-bedrock

# What AWS Regions are Claude models available in Amazon Bedrock?

Visit the Amazon Bedrock [user guide](https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html) to see the Claude models that are available by AWS Region in Amazon Bedrock.
​
---

SOURCE: https://support.claude.com/en/articles/10310342-how-do-i-log-out-of-all-active-sessions

# How do I log out of all active sessions?

If you need to sign out of your Claude account across all devices, you can do this through **[Settings > Account](https://claude.ai/settings/account)** on the web version of Claude. This is particularly useful if you've forgotten to log out on a shared device or suspect unauthorized access to your account.

**Note:** This option is not currently available in the Claude mobile apps for iOS or Android.

## How long are sessions on the Claude web app?

When you log in via **[claude.ai](https://claude.ai)**, this creates a session with a duration of 28 days. This determines how long you remain logged in to your Claude account if you are inactive on the web app. If you take any action on **[claude.ai](https://claude.ai)**, such as reloading the page, your session will be automatically refreshed every hour to 28 days from that point in time.

## How to log out of all active sessions

1. Visit **[claude.ai](https://claude.ai/)** in a web browser.

2. Sign in to your account.

3. Click on your initials in the lower left corner.

4. Select "Settings" from the menu.

5. Navigate to the "Account" section.

6. Click the "Log Out" button.

7. Confirm your choice when prompted.

This action will immediately sign you out of your account across all devices where you were previously logged in, including:

- Web browsers

- Mobile devices

- Desktop applications

To regain access to your account on any device, you'll need to authenticate again using either Google login or a login link sent to your email address.

## How to log out from Claude Code

If you used your Claude account to authenticate into Claude Code, you can manage your authorization tokens by navigating to **[Settings > Claude Code](https://claude.ai/settings/claude-code)**. To remove a token and log out of Claude Code, click the trash can icon.



## Unable to access your account?

If you're unable to sign into your account to log out of all sessions, contact our Support team by clicking on the message icon in the bottom right of any Help Center page. For additional information, refer to **[How to get support](https://support.claude.com/en/articles/9015913)**.
---

SOURCE: https://support.claude.com/en/articles/10366421-how-does-claude-handle-mathematical-equations-and-calculations

# How does Claude handle mathematical equations and calculations?

Claude can process mathematical equations and perform calculations, but complex or mission-critical calculations should be verified using specialized mathematical software or manual methods.
---

SOURCE: https://support.claude.com/en/articles/10366432-i-m-getting-an-api-connection-error-how-can-i-fix-it

# I'm getting an API connection error. How can I fix it?

This error usually indicates an issue on your end, potentially related to your firewall, network, or VPN. Try these steps:

- Check if there are any firewall rules or network restrictions blocking the connection to the Claude API endpoint.

- Configure your firewall or network settings to allow the connection.

- Ensure you're not using a VPN when running the request.

If you need to [contact our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support) for further assistance, you can do so by clicking on the message icon in the bottom right of our Help Center, or by clicking your initials in the lower left corner of your Claude Console account, then "Get help."
---

SOURCE: https://support.claude.com/en/articles/10684638-report-block-and-remove-content-from-claude

# Report, block, and remove content from Claude

Anthropic supports a variety of ways to allow people to control their content and personal information. As a site owner, you can control what shows up in Claude outputs that use web search. As a user or member of the public, you can report problematic content that another user shares publicly or that you receive in a Claude output. For each type of concern, follow the reporting instructions below.

Please note, we reserve the right to suspend users who frequently provide manifestly illegal content and suspend the processing of notices for users who frequently submit notices which are manifestly unfounded. We will provide a warning before suspension.

## How to report safety issues

We welcome reports concerning safety issues so that we can enhance the safety and harmlessness of our models. We would also like to hear from you if you identify our safety mechanisms causing any user experience issues. Please report such issues to <usersafety@anthropic.com> with enough detail for us to replicate the issue.

### Help us improve AI safety by reporting universal jailbreaks

This [form](https://docs.google.com/forms/d/1bjD-H30kVJAbIHnFXKzFcSjkUNjE-mwRHSF7R2uSjYM/edit) allows you to submit universal jailbreaks for ASL-3 uses of concern (meaning elicit information related to biological threats) that you've identified. Universal jailbreaks are techniques that allow users to consistently bypass safety measures across multiple harmful queries. Thank you very much for helping us to keep Anthropic safe.

## How to block or remove content

### Block or remove websites from Claude web search

| Remove content from your site                                 | Applicable: all content types<br>Removing content from your site is the best way to ensure that it won't appear in Claude outputs when Claude searches the web.                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Password-protect your files                                   | Applicable: all content types<br>If you have confidential or private content on your site, you need to password protect it to ensure only authorized users can access it. This will also prevent that content from appearing in Claude outputs that rely on web search, or if it already appears, it will eventually remove that content from our search results.                                                         |
| `noindex` tag                                                 | Applicable: all content types<br>The `noindex` robots meta tag is a rule that tells our partners not to index your content so that they don’t send it to us in response to your web search query. Your content can still be linked to and visited through other web pages, or directly visited by users with a link, but the content will not appear in Claude outputs that use web search.                               |
| Disallow crawling with robots.txt                             | Applicable: images and video<br>Our search partners only index images and videos that their bots are allowed to crawl. To prevent them from accessing your media files, use robots.txt rules to block the files.                                                                                                                                                                                                          |
| Disallow Anthropic’s Bots                                     | Applicable: all content types<br>Follow the instructions [here](https://privacy.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).                                                                                                                                                                                                                      |
| Block access to a URL already appearing in Claude outputs<br> | Applicable: all content types<br>Submit a request to <webresultsoptout@anthropic.com>, including information necessary to prove you own the URL, which can be: an [ICANN registration](https://www.icann.org/resources/pages/register-domain-name-2017-06-20-en), [WHOIS lookup result](https://whois.domaintools.com/), domain registration payment receipt, SSL certificate, or use of a domain-specific email address. |

### Block or remove content from shared Claude content

| Report content in-product<br>                        | Applicable: all content within a shared Claude conversation<br>Use the “report” button on the shared content.                                             |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Report content through our standalone reporting form | Applicable: all content within a shared Claude conversation<br>Please report it through [this form](https://claude.com/form/anthropic-content-reporting). |

### Block or remove content from Claude outputs or shared Claude content

| Report content<br> | Applicable: all content types<br>If you believe content violates Anthropic’s usage policies or local laws and should be removed or restricted, you can report it through [this form](https://claude.com/form/anthropic-content-reporting).<br>For copyright and trademark disputes, please follow the instructions [here](https://support.anthropic.com/en/articles/10023646-i-think-a-user-is-infringing-my-copyright-or-other-intellectual-property-how-do-i-report-it). |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
---

SOURCE: https://support.claude.com/en/articles/10769299-how-to-use-claude-in-your-preferred-language

# How to use Claude in your preferred language

Claude is available in multiple languages on web and desktop applications.

## Supported Languages

- English

- French

- German

- Hindi

- Indonesian

- Italian

- Japanese

- Korean

- Portuguese (Brazilian)

- Spanish (Latin America)

- Spanish (Spain)

## Changing your language setting

### On Web and Desktop

1. Click your profile icon in the lower left corner.

2. Go to the "Language" section.

3. Choose your preferred language.

4. The interface will update automatically.

**Note:**  Even if you've changed your language settings, you can still chat with Claude in any language. Claude will converse with you in the language you use.

## Voice mode languages

Voice mode has its own language setting, separate from your display language. To change the language Claude speaks and listens to in voice mode, go to **[Settings > General](https://claude.ai/settings/general)**, then find **Voice > Language** and choose a language. Learn more in **[Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)**.
---

SOURCE: https://support.claude.com/en/articles/11139144-use-claude-for-education-at-your-university

# Use Claude for Education at your university

This guide helps you use Claude for Education through your university-sponsored account. Find resources and answers to frequently asked questions about getting started, optimizing usage, and troubleshooting issues.

---

## What features are included in my university-sponsored education plan?

Your university-sponsored Claude for Education account includes:

- **Enhanced context window:** Upload hundreds of pages of text for analyzing lengthy academic papers, research documents, and datasets.

- **Advanced models:** Access to the newest, most advanced Claude models.

- **Projects feature:** Create and organize multiple related conversations with shared knowledge bases.

- **Increased usage limits:** More messages per day compared to individual plans.

- **Priority access:** Priority access during high-traffic periods.

- **File uploads:** Analyze various document types including PDFs, DOCX, CSV, TXT, HTML, and more.

**Note:** Your university may have customized certain features or applied specific policies. Check with your university's IT department for institution-specific guidelines.

---

## What can I use Claude for as a student?

Claude can be a valuable assistant for numerous academic tasks:

**#### Research assistance**

- Generate research questions based on your topic

- Help analyze academic papers

- Find gaps in your literature review

- Suggest methodological approaches

**#### Writing support**

- Outline papers and essays

- Provide feedback on drafts

- Help with citations and bibliographies

- Suggest ways to improve clarity and structure

**#### Study aid**

- Create practice questions on course material

- Explain complex concepts in simpler terms

- Generate study guides and flashcards

- Provide step-by-step explanations for problem-solving

**#### Productivity**

- Summarize notes

- Create to-do lists and study schedules

- Draft emails to professors or classmates

- Generate presentation outlines

**#### Creative work**

- Brainstorm ideas for projects

- Help develop characters or storylines

- Provide feedback on creative writing

- Generate metaphors or analogies for concepts

**Important:** Follow your university's academic integrity policies when using Claude. While Claude can help you understand material and improve your work, it should not be used to complete assignments that you're expected to do independently.

---

## How do I access Claude on different devices?

You can access Claude through multiple platforms to suit your needs:

### Web browser

- Visit claude.ai on any web browser.

- Sign in with your university email.

- Works on both desktop and mobile browsers.

### Desktop application

- Download Claude for Desktop for macOS or Windows.

- For macOS: Requires macOS 11 (Big Sur) or higher.

- For Windows: Requires Windows 10 or higher.

- Install by visiting the **[Claude downloads page](https://claude.ai/download)** and following the installation instructions.

- Launch from your Applications folder (Mac) or Start menu (Windows).

### Mobile applications

- **iOS**: **[Download from the App Store](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684)** (requires iOS 17.0 or later).

- **Android**: **[Download from Google Play Store](https://play.google.com/store/apps/details?id=com.anthropic.claude)** (requires Android 8.0 Oreo or later).

- Sign in with the same university account you use on the web version.

- See our **[Claude Mobile apps section](https://support.claude.com/en/collections/9387080-claude-mobile-apps)** for more information.

All platforms synchronize your conversations, allowing you to start on one device and continue on another. Mobile apps offer additional features like photo analysis and voice dictation.

---

## How to use Claude

Review the following resources to help you get the most out of your usage with Claude:

- **[Upload files to Claude](https://support.claude.com/en/articles/8241126)**

- **[What are projects?](https://support.claude.com/en/articles/9517075)**

- **[How can I create and manage projects?](https://support.claude.com/en/articles/9519177)**

- **[Manage project visibility and sharing](https://support.claude.com/en/articles/9519189)**

- **[What are artifacts and how do I use them?](https://support.claude.com/en/articles/9487310)**

- **[Usage limit best practices](https://support.claude.com/en/articles/9797557)**

- **[Create and edit files with Claude](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude)**

- **[Use connectors to extend Claude's capabilities](https://support.claude.com/en/articles/11176164)**

- **[Use Google Workspace connectors](https://support.claude.com/en/articles/10166901)**

- **[Understanding Claude's personalization features](https://support.claude.com/en/articles/10185728)**

- **[Enable and use web search](https://support.claude.com/en/articles/10684626)**

- **[How to use Claude in your preferred language](https://support.claude.com/en/articles/10769299)**

- **[When should I use web search, extended thinking, and Research?](https://support.claude.com/en/articles/11095361)**

---

## Troubleshooting

### I'm struggling to log in with SSO

Your SSO configuration is managed by the Primary Owner or Owner on your account. Contact your university's dedicated support channel to troubleshoot SSO/login issues.

### I'm seeing a warning message about remaining messages

Claude has a usage limit that varies based on message length, file attachments, and conversation length. You'll receive warning messages before reaching the limit. When you see the first warning, consider following these **[usage tips](https://support.claude.com/en/articles/9797557)**.

### I'm seeing an error message about length limit

This appears when your prompt exceeds Claude's available context window. When this happens, either:

- Shorten your prompt/attachments

- Start a new conversation

### I already have a Claude account using my university email

When you log in, you can select between your previous account and the new university-sponsored account. You can't migrate data between accounts, but you can **[export data](https://support.claude.com/en/articles/9450526)** from your existing account and upload the conversation data (JSON format) to your new account.

---

## Privacy

Review these resources and visit the **[Privacy Center](https://privacy.claude.com/en/)** for information about privacy, data retention, and data handling:

- **[Is my data used for model training?](https://privacy.claude.com/en/articles/7996868)**

- **[How long do you store my organization’s data?](https://privacy.claude.com/en/articles/7996866)**

- **[Can you delete data that I sent via Claude?](https://support.claude.com/en/articles/9796617)**

- **[How can I delete or rename a conversation?](https://privacy.claude.com/en/articles/11117329)**

- **[Who owns and manages the data of my university account?](https://support.claude.com/en/articles/9265372)**
---

SOURCE: https://support.claude.com/en/articles/11140763-claude-4-invite-sweepstakes-official-rules

# Claude 4 Invite Sweepstakes Official Rules

By entering the Claude 4 Invite Sweepstakes, you accept and agree to these Official Rules and the decisions of Anthropic, PBC (“Anthropic”) which shall be final in all matters.

1. **NO PURCHASE NECESSARY TO ENTER OR WIN.**

2. **HOW TO ENTER.** Beginning on May 22nd, 2025 at 9am ET through June 4th, 2025 at 9am ET, log into your Claude.ai account and navigate to <https://claude.ai/invite> to find your unique referral link. For each unique person who signs up for a first-time Claude.ai account using your unique referral link and sends at least one message to Claude, you will be entered into the sweepstakes pool. No more than 100 entries per user. Use of any robotic, automatic, programmed, or similar entry method or entering more than the number of times permitted will void all entries and result in disqualification. You may not enter more times than indicated by using multiple email addresses, identities, or devices in an attempt to circumvent the rules.

3. **ELIGIBILITY.** To participate, you must (i) have a registered Claude.ai account, (ii) reside in the United States (excluding Florida, New York, and Rhode Island), Argentina, Austria, Barbados, Bermuda, France, Germany, Ireland, Japan, Latvia, New Zealand, Serbia, South Africa, South Korea, Switzerland, or the United Kingdom, and (iii) be at least 18 years of age. Employees of Anthropic, PBC and its affiliates and their immediate family members are not eligible. Void where prohibited.

4. **DRAWING.** Anthropic will conduct a random drawing from among all eligible entries received to select 5 winners every day for 10 days starting on or about May 27th, 2025. Potential winners will be notified by email and must respond with the requested information within 72 hours of the date notice is sent. Failure to respond within the applicable time period will result in forfeiture of prize and Anthropic shall have the option to award the prize to an alternate winner. The return of any prize notification or prize as undeliverable may result in disqualification and an alternate winner may be selected.

5. **PRIZES.** Four month subscription to Claude Max 5x Plan (approximate value: $400). Total prize value: approximately $40,000. Current subscribers will receive a pro-rata refund for remaining subscription time. Non-paying users will receive the subscription at no cost. Limit one prize per person. No substitution or transfer of prize permitted by winner.

6. PRIVACY. Anthropic will use your email address and referral link information to administer the contest as set forth in our [Privacy Policy](https://www.anthropic.com/legal/privacy).

7. **LIMITATION OF LIABILITY.** By entering this sweepstakes, you waive all right to, and hold Anthropic harmless from, any claim, liability, loss, damage (including punitive, incidental, and consequential damages), or expense (including attorneys’ fees) arising out of or in connection with participation in this sweepstakes or the acceptance, use, or misuse of any prize. SOME JURISDICTIONS DO NOT ALLOW THE LIMITATIONS OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE MAY NOT APPLY TO YOU.

8. **CHOICE OF LAW.** These Official Rules will be governed by, and construed and interpreted in accordance with, the laws of the State of California without giving effect to conflict of law principles. You and Anthropic agree that any disputes arising out of or relating to these Official Rules will be resolved exclusively in the state or federal courts located in San Francisco, California, and you and Anthropic submit to the personal and exclusive jurisdiction of those courts. By accessing our Services, you waive any claims that may arise under the laws of other jurisdictions.
---

SOURCE: https://support.claude.com/en/articles/11174108-about-the-development-partner-program

# About the Development Partner Program

The Development Partner Program is an optional, transparent way for organizations to help shape the future of Claude while maintaining control over their data.

By default, Anthropic doesn’t train our models on the data you generate when using our commercial products (e.g. Claude Enterprise, Claude API, etc.). Learn more about our commitments to privacy and how we handle your data in our **[Privacy Center](https://privacy.claude.com/en/collections/10663361-commercial-customers)**.

We recognize that many organizations want to contribute to the advancement of AI technology. The Development Partner Program allows you to voluntarily choose whether you allow us to use your Claude Code sessions to improve our services, including model training. This voluntary sharing helps us enhance Claude's coding capabilities across all users, improve our models based on actual developer workflows, and advance the field of AI-assisted coding.

## What is the Development Partner Program?

Through the Development Partner Program, eligible organizations can contribute to improving Claude by voluntarily sharing their Claude Code sessions with us.

### Key information

- Under the Development Partner Program, only your Claude Code input and output tokens from the first-party Claude API are provided to us. Data sharing does not apply to Claude apps or API calls unrelated to Claude Code, when using our commercial products.

- Your data will be stored securely for up to two years, and data used for model training will not be associated with other customer information.

- This setting applies to all members in your organization.

- All members in your organization will be informed that you have enrolled into the program.

- You can leave the program at any time, but previously provided data will be stored for up to two years.

Accounts on our **[zero data retention agreement](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to)** are not eligible for the program.

## Opt in/out of the Development Partner Program

### For accounts on prepaid billing

If you are an admin and are authorized by your organization to enter into agreements, follow these instructions.

To opt in to the Development Partner Program:

1. From your Claude Console account, navigate to **[Settings > Privacy controls](https://platform.claude.com/settings/privacy)**.

2. Locate the Development Partner Program section

3. Click “Join.”

After clicking join, you will be asked to agree to our Service Specific Terms for the Development Partner Program. You can disable participation anytime, but previously shared data will be retained for up to two years.

To opt out of the Development Partner Program:

1. From your Claude Console account, navigate to **[Settings > Privacy controls](https://platform.claude.com/settings/privacy)**.

2. Locate the Development Partner Program section.

3. Click “Leave.”

**Note**: Accounts on our **[zero data retention agreement](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to)** are not eligible for the program and will not see the option to join the Development Partner Program in their settings.

### For organizations on invoice billing

Please contact your Anthropic account executive to see if you are eligible for the Development Partner Program. These organizations will not see the option to join the Development Partner Program in their settings.
---

SOURCE: https://support.claude.com/en/articles/11199177-anthropic-s-ai-for-science-program

# Anthropic's AI for Science Program

Our AI for Science Program is specifically designed to support researchers working on high-impact scientific projects, with a particular focus on biology and life sciences applications, by providing free API credits.

If you are a researcher working on applying Generative AI to scientific research and are interested in receiving free API credits, you might qualify for our AI for Science Program. Please complete the following application form with details about your team and research project: [Application Form - Anthropic's AI for Science Program](https://docs.google.com/forms/d/e/1FAIpQLSfwDGfVg2lHJ0cc0oF_ilEnjvr_r4_paYi7VLlr5cLNXASdvA/viewform?usp=header).

## About this Program

**Please note that you can access the Claude model family immediately via API by simply creating a [Claude Console](https://platform.claude.com/) account – you do not need to contact us first.**

- This program provides free API credits for our standard model suite to researchers in academia and nonprofit organizations working on scientific research topics we consider high priority.

- Note that these credits are for API use and do not apply to the Claude web app.

- This program does not provide access to non-standard or non-public models.

- Applicants through this program do not receive exemption from our [Usage Policy](https://www.anthropic.com/legal/aup). Our Trust & Safety team will follow our standard enforcement procedures and take action whenever an organization's prompt activity hits our violation rate thresholds.

## About our Process

- We evaluate submissions on the first Monday of each month. This schedule helps us manage the program sustainably. Please note that if this timeline poses a significant obstacle for the applicant, it does not block them from simply purchasing API credits in the interim.

- If successful, we will apply up to $20,000 in API credits to your account for a 6-month period.

- Please note that given the substantial number of applications we receive, we regret that we cannot provide individual responses to unapproved submissions. However, we appreciate the time and effort put into each submission and will carefully review all entries.

## Frequently Asked Questions

### Who is eligible for the AI for Science Program?

The AI for Science program is designed for researchers attached to research institutions working on high-impact scientific projects, with a particular focus on biology and life sciences applications. We evaluate applications based on scientific merit, potential impact, technical feasibility, and the team's credentials in both their subject area and AI.

### What types of scientific research does this program support?

We support research across various scientific fields, including:

- Biology/Life Sciences

- Chemistry

- Medicine/Healthcare

- Environmental Science

- Physics

- Computer Science

- Earth Sciences

- Other fields with potential for significant scientific impact

We are particularly interested in applications where Claude can assist with understanding complex biological systems, accelerating drug discovery, analyzing genetic data, and other life sciences applications.

### How are applications evaluated?

Applications are evaluated based on:

- Scientific merit: team credentials in subject area and with AI, attached to a research institution

- Potential impact: contribution to critical foundational research and/or clear path to scale an application

- Technical feasibility: value of our model as applied to your use case

- Biosecurity screening: ensuring proposed research could not enable harmful applications

### I would like access to non-standard or nonpublic models for my research. Is this possible?

We understand the potential value this could bring to your work, however, to maintain the sustainability of this free, high-volume program, we are unable to extend access to any nonpublic or experimental models through this AI for Science program. This non-standard or nonpublic model access is reserved for a very limited number of pre-deployment testing partnerships, which are not part of this program. We do not currently provide finetuning access via an API at this time. Finetuning access to Claude models is in preview mode via AWS Bedrock and not covered via this program. We continually evaluate our offerings and may consider expanding access to additional models in the future.

### I run a research program with many researchers and collaborators. What's the best way for us to apply for free API credits via this program?

For research programs with multiple researchers and collaborators, we recommend setting up a single account to represent your entire program, and submit an application through our application form.

If approved, we'll allocate credits to a single organization ID, which you can then flexibly distribute among your researchers. This enables you to easily add or remove collaborators as needed, monitor usage across your team, and ensure compliance with our policies.

If your program's needs change significantly over time, please submit an updated application to discuss potential adjustments to your allocation.

### I am performing red-teaming or jailbreaking research. Is there a way to make sure our account does not get flagged for potentially breaking your Usage Policy while our researchers are purposefully red-teaming?

We appreciate your interest in conducting red-teaming or jailbreaking research, as it plays a crucial role in improving AI safety. However, to maintain the sustainability of our AI for Science Program, participants are not exempt from our [Usage Policy.](https://www.anthropic.com/legal/aup) Our Trust & Safety team will follow our standard enforcement procedures and take action whenever an organization's prompt activity hits our violation rate thresholds.
---

SOURCE: https://support.claude.com/en/articles/11408405-claude-4-invite-contest

# Claude 4 Invite Contest

The Claude 4 Invite Contest is a chance to win four months of Max plan for Claude by inviting friends and family to try Claude 4, our newest and most powerful AI model.

## What are the rewards?

Selected participants who successfully refer new users are entered into a drawing to win:

- **Four months of Max plan** for Claude apps (valued at $400)

- For current Max plan users: you’ll receive a $100 off coupon applied for four months.

  - Max 5x users: You will receive four months of Max plan, completely free.

  - Max 20x users: You will receive a $100 off coupon that will be applied for four months. You will still be responsible for $100/month if you want to remain on the 20x usage level.

- For iOS users: You'll need to cancel your App Store subscription first so we can apply the free month credits.

## Claude 4 Overview

Claude 4 represents our most capable AI model yet, designed to help you do your best work and solve complex problems with unprecedented intelligence. With Claude 4, you can:

- Access advanced reasoning capabilities.

- Handle more complex tasks and conversations.

- Enjoy improved performance across all use cases.

- Experience our newest features and capabilities.

With the Max plan, you get the complete experience of Claude. The Max plan gives you two powerful AI products in one subscription (Claude app and Claude Code), our highest individual usage limits, and priority access to the most advanced features.

See [Introducing the Max Plan](https://www.anthropic.com/news/max-plan) to learn more about this paid plan.

## How does the contest work?

1. **Get your unique referral link**: Find it in the in-app banner on desktop or mobile, located in the bottom left corner.

2. **Share your link with friends and family**.

3. **Earn entries**: You receive one entry for each new user who:

  - Signs up with Claude using your link.

  - Sends at least one message to Claude.

  - Entries accumulate for the entire 10-day duration of the contest. Maximum of 100 entries per use.

4. **Win rewards**: The more successful referrals you have, the better your chances of receiving four months of Max plan access.

We’ll select 10 winners daily for 10 days.

## Official Rules

For complete details about the contest, including eligibility requirements and rules of play, please review the [Claude 4 Invite Sweepstakes Official Rules](https://support.anthropic.com/en/articles/11140763-claude-4-invite-sweepstakes-official-rules).

## Frequently Asked Questions

### Who can participate in this contest?

Existing Claude users, who are at least 18 years of age and located in one of the following countries or regions:

- United States (excluding Florida, New York, and Rhode Island)

- Argentina

- Austria

- Barbados

- Bermuda

- France

- Germany

- Ireland

- Japan

- Latvia

- New Zealand

- Serbia

- South Africa

- South Korea

- Switzerland

- United Kingdom

### How do I receive the free four months of Max plan for Claude?

10 winners are randomly selected each day from May 27 to June 4. You get one entry per new sign-up. A new sign-up needs to be unique and send at least 1 message.

### Who is able to participate? Do I get to participate if I’m part of a Team or Enterprise plan? What if I use the API Console?

The invite contest is only available to Free, Pro, and Max plan users. Team, Enterprise, and API users are not eligible to participate. Users must be 18 years old to participate.

### If I share my referral link on social media, will I get a new entry for every person who uses my invite link?

Yes, you can share your referral link on social media. You will get a new entry for every unique new user who sends at least one message.

### When will winners be notified?

Winners will be notified via email after the contest period ends. You'll receive instructions on how to claim your reward. Winners must respond with the requested information within 72 hours.

### What if I'm already a Max plan subscriber?

If you're selected as a winner and are already subscribed to the Max plan, we’ll apply a $100 off coupon for the next four months beginning in the next month after your current month. If you’re subscribed to the Max 20x plan, you’ll still pay $100/month for the next four months after your current month, as the $100 off coupon still applies to your 20x plan.

### If I win, what will happen to my subscription at the end of the four months?

After the four months expire, you will be put back into the original subscription or plan you started on before winning.
---

SOURCE: https://support.claude.com/en/articles/11427875-public-vulnerability-reporting

# Public Vulnerability Reporting

## Help us improve AI safety by reporting universal jailbreaks

This [form](https://docs.google.com/forms/d/1bjD-H30kVJAbIHnFXKzFcSjkUNjE-mwRHSF7R2uSjYM/viewform?edit_requested=true) allows you to submit universal jailbreaks for ASL-3 uses of concern (meaning elicit information related to biological threats) that you've identified. Universal jailbreaks are techniques that allow users to consistently bypass safety measures across multiple harmful queries.

## Report a security vulnerability

The security of our systems and user data is Anthropic’s top priority. We appreciate the work of security researchers acting in good faith in identifying and reporting potential vulnerabilities. Please review our [Responsible Disclosure Policy](https://www.anthropic.com/responsible-disclosure-policy), which includes a section on *How to Submit a Report*.

Thank you very much for helping us to keep Anthropic safe.
---

SOURCE: https://support.claude.com/en/articles/11595103-designated-point-of-contact-for-users-in-the-eu

# Designated point of contact for users in the EU

Users in the EU can open a support inquiry from this page via the chat tool, which serves as our single point of contact for EU users under the DSA.

Follow these **[instructions](https://support.claude.com/en/articles/9015913-how-to-get-support)** to get support.

## European Union monthly active recipients

In accordance with our obligations under Article 24(2) of the DSA, Anthropic publishes information on the average ‘monthly active recipients’ of our online services in the European Union, calculated over a six-month period.
​
Anthropic has calculated its average monthly active recipients in the EU for the six-month period ending 31 October 2025, and has concluded that it falls well below the 45 million threshold set out in Article 33(1) of the DSA.
​
Anthropic will continue to monitor the number of average monthly active recipients of its services in the EU and will publish updated information at least every 6 months.
---

SOURCE: https://support.claude.com/en/articles/11725453-set-up-the-claude-lti-in-canvas-by-instructure

# Set up the Claude LTI in Canvas by Instructure

This article provides information on how to enable the Claude LTI integration in Canvas LMS. These steps are intended for Claude for Education administrators and Learning Management Systems (LMS) administrators.

## Creating Claude LTI Developer Key in Canvas

1. In Canvas, sign in as an administrator and navigate to **Admin -> Developer Keys**.

2. Click "+ Developer Key" then "+ LTI Key."

3. Enter the following:

  1. **Key Name:** Claude LTI

  2. **Description:** Enter a short description for the Canva LTI 1.3 app

  3. **Redirect URIs:** <https://claude.ai/lti/launch>

  4. **Title:** Claude LTI

  5. **Target Link URI:** <https://claude.ai/lti/launch>

  6. **OpenID Connect Initiation Url:** <https://claude.ai/api/lti/login>

  7. **JWK method:** <https://claude.ai/api/lti/keys>

4. Under **Additional Settings**, toggle Privacy Level to **Public**.

5. Under **Placements**, we recommend removing the defaults and adding "Course Navigation" and "Assignment Edit" as the options.

6. Click "Save."

7. Toggle the state to **On**.

## Installing Claude LTI as an App

1. In Canvas, go to Admin -> Settings -> Apps.

2. Click "View App Configurations" then select "+ App."

3. Select **Configuration Type** “By Client ID.”

4. Input the Client ID generated for your developer key (from Step 6 under Creating Claude LTI Developer Key in Canvas).

5. Click "Install" and refresh the course page.



## Turn on the Claude LTI Integration in Claude for Education organization settings

1. In Claude for Education, sign in as an administrator.

2. Navigate to **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**.

3. Find **Canvas** and click "Enable."

4. In the settings modal that pops up, input the required information to enable the integration

  1. **Canvas Domain**

  2. **Client ID** (found in Canvas Admin -> Developer Keys)

  3. **Deployment ID** (found in Canvas Admin -> Settings -> Apps -> View App Configurations -> Claude LTI Settings Button -> Deployment ID)

5. Click "Save Changes." The integration should now show as enabled.

## Questions

If you have any questions about your Claude for Education plan account or the Claude LTI, we encourage you to contact your university’s administrator(s).
---

SOURCE: https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude

# Create and edit files with Claude

Claude can execute code to create and work with files directly in your conversations. Prompt Claude using natural language to generate Excel spreadsheets, PowerPoint presentations, Word documents, and PDF files that you can download and use immediately.

Code execution and file creation is available to all Claude users (Free, Pro, Max, Team, and Enterprise) on the web, Claude Desktop, and Claude Mobile.

These capabilities make it easy to produce professional documents by simply chatting with Claude. You can create financial models in Excel with working formulas, perform advanced analyses on uploaded data, produce reports with charts and visualizations, and generate presentations from your documents—all without specialized software skills.

---

## Availability

**Free, Pro, and Max plans:**

- Code execution and file creation is enabled by default

- Network access is enabled, allowing Claude to install packages from approved sources

**Team plan:**

- Code execution and file creation is enabled by default for Team plan organizations

- Organization owners can disable it in organization settings

- Network access is disabled by default; owners can enable it in organization settings

**Enterprise plan:**

- Code execution and file creation is enabled by default for new Enterprise plan organizations

- Organization owners can disable it in organization settings

- Network access is disabled by default; owners can enable it in organization settings

- Owners can configure network access controls, including domain whitelisting

---

## How to get started

### Enabling on web and desktop

**Enterprise plans:** This capability is enabled by default at the organization level with **Allow network egress** toggled off for new Enterprise organizations. Owners can adjust this in **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)** using the **Code execution and file creation** toggle.

**Team plans:** This capability is enabled by default at the organization level with **Allow network egress** toggled on with access to package managers only. An organization owner can manually disable this for the organization in **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)** if needed.

**Free, Pro, and Max plans:** Enable file creation from **[Settings > Capabilities](https://claude.ai/settings/capabilities)** by toggling **Code execution and file creation** on.

To give Claude access to external data sources, toggle **Allow network egress** on:



### Enabling on Claude Mobile

To enable or disable this feature on Claude for iOS or Android, tap your initials or name in the left sidebar to open Settings. Select "Capabilities" and toggle **Code execution and file creation** on or off.

---

## Configuring network access (Team and Enterprise plans)

Team and Enterprise organization owners can control network access settings in **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)**. After enabling code execution and file creation, choose from the following options to configure network access for your team:

- **Allow network egress toggled off:** Claude operates with pre-installed packages only, with no internet access. This provides maximum security for sensitive environments.

- **Allow network egress to package managers only (default):** Claude can access approved package managers (npm, PyPI, GitHub, etc.) to install necessary software packages. This balances functionality with security, but some advanced features may be limited.

- **Allow network egress to package managers and specific domains:** Claude can access package managers plus additional domains you specify. Add domains individually to whitelist specific resources your organization needs:



**All domains:** Claude has full internet access except for domains on Anthropic's legal blocklist. While this provides maximum flexibility for file creation and analysis tasks, it’s also the riskiest option. Please review the **[security considerations below](#h_0ee9d698a1)** before enabling “All domains”:



---

## How does disabling network access address security concerns with code execution and file creation?

Disabling network access prevents data from leaving Claude's sandboxed environment—even if something goes wrong.

### How it works

When Claude executes code or creates files, it operates within an isolated, sandboxed container. This means the work happens in a controlled environment separate from your systems. However, if network access is enabled, there's a potential risk: through prompt injection or other attacks, Claude could theoretically be tricked into sending data to external servers.

Disabling network access eliminates this risk entirely. Your team still gets Claude's full code execution and file creation capabilities - building Excel models, creating presentations, analyzing data—but with the assurance that nothing can be transmitted outside the sandbox.

### A phased approach to network access

Claude is most powerful with network access enabled, allowing it to install new packages and dependencies, pull in real-time data, and interact with web services. For organizations comfortable with that risk profile, enabling access to vetted, trusted domains unlocks the full potential of code execution and file creation. For those taking a more cautious approach, we recommend starting with network access disabled and adjusting as your team builds confidence:

1. **Start with network access off.** This is the most secure configuration. Claude can execute code and create files, but cannot communicate externally.

2. **Enable package managers.** Unlocks pip, npm, and other package managers to install dependencies - significantly expands what Claude can build.

3. **Expand network access as needed.** Add specific domains to an allowlist based on business requirements, maintaining visibility into what's permitted.

This approach gives you defense in depth—even if there were vulnerabilities in the sandbox or a successful prompt injection, disabled network access acts as a final barrier preventing data from leaving Anthropic's infrastructure.

**Note:** If MCP (Model Context Protocol) integrations are enabled, network communication remains possible through those connections regardless of the network egress setting. Organizations should evaluate MCP configurations separately.

---

## Using code execution and file creation

When enabled, simply describe what you need in your message. For example, you might say "Create an Excel spreadsheet to track monthly expenses" or "Convert this document into a PowerPoint presentation." Claude will generate the file, which you can then download directly from the conversation.

Start with simple tasks to familiarize yourself with Claude's capabilities, then progress to more complex workflows. Be specific in your requests—describe the structure, content, and formatting you want. You may need to review and refine Claude's outputs to meet your exact requirements.

### Supported file types

Claude can create Excel spreadsheets (.xlsx), PowerPoint presentations (.pptx), Word documents (.docx), and PDF files. You can download the files Claude creates or save them directly to Google Drive.

With this feature, Claude can also do more advanced data analysis and data science work. Claude can create Python scripts for data analysis. Claude can create data visualizations in image files like PNG. You can also upload CSV, TSV, and other files for data analysis and visualization.

The maximum file size is 30MB per file for both uploads and downloads.

---

## Key capabilities

### Direct file creation and editing

Claude creates Excel spreadsheets (.xlsx), PowerPoint presentations (.pptx), Word documents (.docx), and PDF files. You can download the files Claude creates or save them directly to Google Drive.

The maximum file size is 30MB per file for both uploads and downloads. For PDFs larger than 30MB, Claude can process them through its computing environment without loading them into the context window.

### Advanced data analysis

Claude can perform sophisticated data analysis and data science work, including:

- Creating Python scripts for data analysis

- Generating data visualizations as image files (PNG)

- Processing CSV, TSV, and other data files

- Building machine learning models

### Project files integration

Files in your projects are now accessible through Claude's computing environment while remaining in context. This enables seamless reference and workflow integration across your project files.

### Extended context window

The context window has been expanded to support more complex multi-step workflows, particularly for conversations that use code execution and file creation extensively.

### Language support

Claude provides full support for multiple languages in both the user interface and generated files, with proper formatting and regional standards.

---

## Security and network access

### How it works

Code execution and file creation gives Claude a sandboxed computing environment. Claude’s internet access will vary based on your network egress settings.

**Network access allows Claude to:**

- Download and install packages from approved package managers (npm, PyPI, etc.)

- Access resources needed for file creation and analysis

---

## Security considerations

It is possible for a bad actor to inconspicuously add instructions via external files or websites that trick Claude into:

1. Downloading and running untrusted code in the sandbox environment for malicious purposes

2. Reading sensitive data from a connected knowledge source (for example, Remote MCP, projects) and using the sandbox environment to make an external network request to leak the data

This means Claude can be tricked into sending information from its context (for example, prompts, projects, data via MCP, Google integrations) to malicious third parties. To mitigate these risks, we recommend you monitor Claude while using the feature and stop it if you see it using or accessing data unexpectedly. You can report issues to us using the thumbs down function directly in Claude.

In line with our **[safe and trustworthy agents framework](https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents)**, we have applied the following mitigations:

- Given you full control of the feature. You can turn it on or off at any time.

- Designed Claude to give you user-friendly summaries of its actions so you can see what it is doing. You can stop Claude's actions at any time and we recommend monitoring Claude's work while using the feature.

- Given you the ability to review and audit actions taken by Claude within the sandbox environment.

- Disabled public sharing of conversations that include any file artifacts from the code execution and file creation feature for free, Pro, and Max users.

- Limited the duration of tasks that can be completed by Claude and the length of time you can use a single sandbox container to avoid loops of malicious activity.

- Implemented sandbox isolation such that no sandbox environments are ever shared between users.

- Intentionally limited the network, container, and storage resources.

- Implemented a prompt injection classifier to detect malicious prompt manipulation and stop execution if detected.

We have performed red-teaming and security testing on this feature. We have a continuous process for ongoing security testing and red-teaming. We encourage organizations to evaluate these protections against their specific security requirements when deciding whether to enable this feature.

### For Team and Enterprise owners

Team and Enterprise owners have full control over this feature, including:

- Enabling or disabling the feature organization-wide

- Controlling network access settings

- Configuring domain whitelisting to allow access only to specific approved domains

**Note:** Claude can only be tricked into leaking data it has access to in a conversation via an individual user's prompt, project, or activated connections.

---

## Approved network domains

When network access is enabled, Claude can access the following approved domains:

- **Anthropic Services (Explicit):** api.anthropic.com, statsig.anthropic.com

- ​**GitHub:** github.com

- **NPM:** registry.npmjs.org, npmjs.com, npmjs.org

- ​**Python:** pypi.org, files.pythonhosted.org, pythonhosted.org

- **Rust:** crates.io, index.crates.io, static.crates.io

- **Ubuntu:** archive.ubuntu.com, security.ubuntu.com

- **Yarn:** yarnpkg.com, registry.yarnpkg.com

---

## Common workflows

**Note:** Refer to **[Create and edit files with Claude to eliminate hours of busy work](https://support.claude.com/en/articles/12143746-create-and-edit-files-with-claude-to-eliminate-hours-of-busy-work)**[https://support.claude.com/en/articles/12143746-create-and-edit-files-with-claude-to-eliminate-hours-of-busy-work](https://support.claude.com/en/articles/12143746-create-and-edit-files-with-claude-to-eliminate-hours-of-busy-work)for use cases and demo videos, and **[Financial analysis workflows with Claude](https://claude.com/resources/tutorials/financial-analysis-workflows-with-claude)** for guidelines specific to Claude for Financial Services customers.

### Build a financial model in Excel

Generate spreadsheets with working formulas and calculations by describing your needs. Try:

```
Create a monthly budget tracker with income, expenses categories, and
automatic calculations for savings.
```

Claude will produce an Excel file with proper formulas, formatting, and even charts to visualize your data.

### Generate a professional report

Combine data analysis with document creation by providing your information and requirements. Try:

```
Create a quarterly sales report using this CSV data, including trend
analysis and recommendations.
```

Claude will analyze your data and produce a formatted Word document or PDF with charts, insights, and professional formatting.

### Convert between file formats

Change any document from one format to another while preserving or enhancing the content. Try:

```
Convert this Word document to a presentation.
```

or

```
Explain this Excel spreadsheet in a Word report with commentary.
```

Claude can even support workflows requiring multiple file format conversions. For instance, you could upload a CSV file and prompt Claude to create a financial model, write a memo summarizing it, and generate a PowerPoint to share the results.

### Extract and analyze PDF data

Upload a PDF containing tables or forms and ask Claude to extract the information. Try:

```
Extract all the data from this PDF into an Excel spreadsheet and create a
summary chart.
```

Claude will pull the data, organize it in spreadsheet format, and add visualizations for quick insights.

### Perform complex analyses

Upload a CSV with data and ask Claude to build a machine learning model to predict a particular outcome. Have Claude output a report summarizing what it did and the results. Claude will use python to train a model on your data, and provide an explanation of what it did, including the quality of the model, and the results.

---

## Frequently asked questions

### How does file creation work?

We have given Claude a private computing environment directly in claude.ai. This allows Claude to write and run code (for example Python or Javascript). It uses common code packages to create documents, spreadsheets, and slides. Users can also have Claude use its computing environment for other things like data analysis, debugging code snippets, and fun tasks like gif-creation.

### How do Claude’s file creation capabilities impact usage limits?

Use of this capability draws from the same usage limits offered by your plan. Note that creating files will use more of your limit compared to normal chats with Claude.

### Can Claude work with more than one file at a time?

Claude can handle multiple files in a single chat, allowing you to create comprehensive multi-file reports and analyses. Files remain available for download throughout your conversation.

### Is file creation supported on Claude for iOS or Android?

File creation is supported on Claude for iOS and Android. Note that when you tap "Download" on Claude Mobile, the file will open in either the system preview or a separate app (for example, the Word app for .docx files).

### Do artifacts work with file creation?

Yes you are still able to create artifacts (e.g., HTML or react apps, markdown documents, mermaid diagrams, SVGs) with file creation on. Claude now uses the computing environment to create artifacts so the user experience may look slightly different than users are used to. Please report any issues or feedback using the thumbs up/down functionality when chatting with Claude.
---

SOURCE: https://support.claude.com/en/articles/12138966-release-notes

# Release notes

## August 2026

### August 25, 2026

**Memory in Claude Cowork, editable topics, and a sensitive topics setting**

Memory now works across chat and Cowork in the cloud. Everything Claude remembers is listed under **Topics** in **[Settings > Memory](https://claude.ai/settings/memory)**, where you can edit or delete any item. Topics such as health or beliefs stay out of memory unless you turn on **Include sensitive topics in memory**. Memory is on by default for Free, Pro, and Max plans and off by default for Team and Enterprise organizations. See **[Use Claude's chat search and memory to build on previous context](https://support.claude.com/en/articles/11817273)**.

### August 6, 2026

**Skill and plugin security scanning (beta)**

Enterprise plans can now turn on skill and plugin security scanning to automatically check third-party skills and plugins for malicious content when someone uploads or edits them. For more information, see **[Get started with skill and plugin scanning](https://support.claude.com/en/articles/15927065)**.

---

## July 2026

### July 24, 2026

**Claude Opus 5 launch**

We launched Claude Opus 5, a thoughtful and proactive model that comes close to the frontier intelligence of Claude Fable 5 at half the price. For more information, see our blog post: **[Claude Opus 5](https://www.anthropic.com/news/claude-opus-5)**.

### July 14, 2026

**HIPAA configuration for your Claude organizations is now self-serve**

You can now manage HIPAA readiness for your Claude organizations yourself. This applies to both Claude Enterprise and the Claude Platform (API). In each product, an eligible admin can review the Business Associate Agreement (BAA), download the implementation guide, and enable the HIPAA configuration in a single flow. For more information, refer to **[HIPAA-ready Enterprise plans](https://support.claude.com/en/articles/13296973-hipaa-ready-enterprise-plans)** and **[HIPAA readiness for Claude API](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#hipaa-readiness)**.

### July 10, 2026

**Updated memory for Claude**

Memory on Claude now works as a set of individual, categorized entries that Claude reads and updates during your conversations, replacing the previous daily memory summary. See **[Use Claude’s chat search and memory to build on previous context](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context)**.

### July 9, 2026

**A new way to reflect with Claude**

Your monthly recap is a new feature at **Settings > Reflect** that shows you the topics you spent time on, your most active day and peak hour, and observations about how you work with Claude. It's in beta on Free, Pro, and Max plans on the web and Claude Desktop, and requires memory to be on. Alongside it, **Settings > Time and focus** lets you set optional break reminders and quiet hours. For more information, refer to **[See your monthly recap](https://support.claude.com/en/articles/15672559)** and **[Set break reminders and quiet hours](https://support.claude.com/en/articles/15672868)**.

### July 7, 2026

**Claude Cowork on web and mobile**

Claude Cowork is now available on web and mobile in addition to desktop. We are rolling this capability out over the next several weeks starting with the Max plan, with more plans to follow. Cowork runs your sessions remotely (in beta), so your sessions and files are saved to your Claude account and go where you go, on any device. Work continues when you close your laptop, and scheduled tasks run with no device online. Chat and Cowork also share one home now, with one place for your projects and artifacts across both. For more information, see **[Use Claude Cowork on web, desktop, and mobile](https://support.claude.com/en/articles/15520349)**.

**Write tools for the Microsoft 365 connector**

The Microsoft 365 connector now goes beyond search. With write tools enabled, Claude can draft, send, and organize email, manage calendar events, update mailbox settings, and create and update files in OneDrive and SharePoint. Read and search tools work as before, and Teams remains read-only. Before members can use write tools, a Microsoft Entra administrator needs to consent to the updated permission set and an admin needs to enable them for the organization. For more information, see **[Set up the Microsoft 365 connector](https://support.claude.com/en/articles/12542951-set-up-the-microsoft-365-connector#h_a51d877afd)** and **[Connect to Microsoft 365](https://support.claude.com/en/articles/15183774)**.

### July 1, 2026

**Access to Claude Fable 5 and Claude Mythos 5 restored**
We are restoring access to Claude Fable 5 and Claude Mythos 5. See **[our statement](https://www.anthropic.com/news/redeploying-fable-5)** for more information.

**Model entitlements for Enterprise plans (beta)**

Admins on Enterprise plans can now control what models their users have access to, and what effort level settings they can use. For more information, see **[Manage model access for your organization](https://support.claude.com/en/articles/15694740)**.

---

## June 2026

### June 30, 2026

**Claude Sonnet 5 launch**

We launched Claude Sonnet 5, our most agentic Sonnet model yet, with substantial improvements over Sonnet 4.6 in reasoning, tool use, coding, and knowledge work. For more information, see our blog post: **[Introducing Claude Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)**.

### June 25, 2026

**Enable Trusted Devices for Remote Control**

Admins for Team and Enterprise plans can now require members to verify their device before viewing or steering local Claude Code sessions remotely. For more information, see **[Trusted Devices](https://code.claude.com/docs/en/remote-control#trusted-devices)**.

### June 23, 2026

**Delegate work to Claude in Slack with Claude Tag**

Team and Enterprise plans can now tag Claude directly in Slack conversations and delegate tasks to it while they focus on other work. For more information, see our blog post: **[Introducing Claude Tag](https://www.anthropic.com/news/introducing-claude-tag)**.

### June 12, 2026

**Access to Claude Fable 5 and Claude Mythos 5 suspended**

We've suspended access to Claude Fable 5 and Claude Mythos 5. We aim to return access as quickly as we can. See **[our statement](https://anthropic.com/news/fable-mythos-access)** for more information.

**Edit Claude’s drafts in place**

When Claude writes a draft in chat or Claude Cowork (a report, a plan, a brief), it opens right beside your chat. Highlight the part you want changed, type the change, and Claude makes the edit right where you marked it. No switching apps, no re-describing paragraphs in chat. For more information, see **[Work with artifacts](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them#h_9cbf05e668)**.

### June 9, 2026

**Claude Fable 5 launch**

We launched Claude Fable 5, a Mythos-class model that we’ve made safe for general use. For more information, see our blog post: **[Claude Fable 5 and Claude Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5)**.

### June 2, 2026

**Enterprise plans can manage admin permissions with custom roles**

We extended the existing custom roles framework by adding admin permissions. Admin permissions give members access to specific administrative areas, like billing or privacy, without the need to make them Owners. For more information, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans#h_fde60b08bd)**.

---

## May 2026

### May 28, 2026

**Claude Opus 4.8 launch**

We’ve upgraded Claude Opus to a new version. Claude Opus 4.8 shows improvements over Opus 4.7 in coding, agentic skills, reasoning, and practical knowledge work tasks. For more information, see our blog post: **[Introducing Claude Opus 4.8](https://www.anthropic.com/news/claude-opus-4-8)**.

**Enterprise plans can manage connector access with custom roles**

We added connector permissions to extend the existing custom roles framework and allow administrators to control which connectors, and which individual tools on those connectors, are available to each custom role. For more information, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans#h_979e558d00)**.

### May 21, 2026

**Claude now works with more security and compliance tools**

We introduced Claude Compliance API integrations with notable security and compliance tools. Now IT and security teams can govern Claude across our platform and suite of products, the same way they govern other applications in their stack. Learn how to **[get started with Claude Compliance API integrations](https://support.claude.com/en/articles/15167101-get-started-with-claude-compliance-api-integrations)**.

---

## April 2026

### April 17, 2026

**Claude Design by Anthropic Labs**

With Opus 4.7, we also launched Claude Design, a new **[Anthropic Labs](https://www.anthropic.com/news/introducing-anthropic-labs)** product that lets you collaborate with Claude to create visual outputs like designs, prototypes, slides, and one-pagers. For more information, see **[Get started with Claude Design](https://support.claude.com/en/articles/14604416-get-started-with-claude-design)**.

### April 16, 2026

**Claude Opus 4.7 launch**

Our latest model, Claude Opus 4.7, is now generally available. Opus 4.7 shows improvements in software engineering and complex, long-running coding tasks, as well as better vision, allowing it to see images in higher resolution. For more information, see our blog post: **[Introducing Claude Opus 4.7](https://www.anthropic.com/news/claude-opus-4-7)**.

### April 9, 2026

**Claude Cowork generally available**

Claude Cowork is now generally available on macOS and Windows through the Claude Desktop app. With this, we’re expanding Claude Cowork with new capabilities:

- **Claude Cowork in the Analytics API.** For more information, see **[Analytics APIs](https://platform.claude.com/docs/en/manage-claude/analytics-api)**.

- **Usage analytics for Claude Cowork.** For more information, see **[View usage analytics for Team and Enterprise plans](https://support.claude.com/en/articles/12883420-view-usage-analytics-for-team-and-enterprise-plans)**.

- **Claude Cowork OpenTelemetry support.** For more information, see **[Monitor Claude Cowork activity with OpenTelemetry](https://support.claude.com/en/articles/14477985-monitor-cowork-activity-with-opentelemetry)**.

**Role-based access controls for Enterprise plans**

Admins can now organize users into groups, manually or via SCIM from your identity provider, and assign each group a custom role defining which Claude capabilities its members can use. Turn Claude Cowork on for specific teams, restrict features by department and adjust as adoption grows. Learn more about **[setting up role-based permissions](https://support.claude.com/en/articles/13930458-set-up-role-based-entitlements-on-enterprise-plans)**, **[managing group spend limit](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**[s](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans), and **[managing custom roles](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

---

## March 2026

### March 25, 2026

**Interactive apps in Claude for iOS and Android**

The Claude mobile app can now connect to fully interactive apps. Pull up live charts, sketch diagrams, and build shareable assets, all rendered visually right in your conversation. For more information, see **[Use interactive connectors in Claude](https://support.claude.com/en/articles/13454812-use-interactive-connectors-in-claude)**.

[https://www.youtube.com/embed/NAwvkrxompk?rel=0](https://www.youtube.com/embed/NAwvkrxompk?rel=0)

### March 23, 2026

**Computer use research preview in Cowork and Claude Code + Dispatch improvements**

Users on Pro and Max plans can give Claude access to computer use. Claude can open files, run dev tools, point, click, and navigate to what’s on your screen to perform tasks itself—with no setup required. Claude’s new computer use capability makes Dispatch even more helpful by allowing it to use your computer on your behalf while you’re away. For more information, see **[Let Claude use your computer in Cowork](https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork)** or our blog post: **[Put Claude to work on your computer](https://claude.com/blog/dispatch-and-computer-use)**.

### March 17, 2026

**Control Cowork from your phone with a persistent thread (research preview for Pro/Max)**

Users on Pro and Max plans can access a persistent agent thread via Claude Desktop or Claude for iOS/Android to manage tasks in Cowork. We're rolling this out to Max plans starting today, and Pro plans over the next two days. For more information, see **[Assign tasks to Claude from anywhere in Cowork](https://support.claude.com/en/articles/13947068-assign-tasks-to-claude-from-anywhere-in-cowork)**.

[https://www.youtube.com/embed/fVIV-L49eBs?rel=0](https://www.youtube.com/embed/fVIV-L49eBs?rel=0)

### March 12, 2026

**Claude creates interactive charts, diagrams and visualizations**

Claude can now create custom charts, diagrams and other visualizations in-line in its responses. For more information, see **[Custom visuals in chat](https://support.claude.com/en/articles/13979539-custom-visuals-in-chat)**.

[https://www.youtube.com/embed/Ii99RU3mOJM?rel=0](https://www.youtube.com/embed/Ii99RU3mOJM?rel=0)

### March 11, 2026

**Work across Excel and PowerPoint**

We’ve improved our Claude for Excel and Claude for PowerPoint add-ins. They can now share the full context of your conversation, so every action Claude takes in one application is informed by everything that’s happened in the other. We also added support for skills in the add-ins, and the ability for Amazon Bedrock, Google Cloud’s Vertex AI, or Microsoft Foundry users to connect to them via an LLM gateway. For more information, refer to the following articles:

- **[Work across Excel and PowerPoint](https://support.claude.com/en/articles/13892150-work-across-apps-with-cowork)**

- **[Use Claude for Excel and PowerPoint with an LLM gateway](https://support.claude.com/en/articles/13945233-use-claude-in-excel-and-powerpoint-with-an-llm-gateway)**

### March 2, 2026

**Memory for free users**

Memory from chat history is now available for all Claude users, including free users. For more information, refer to the following articles:

- **[Use Claude’s chat search and memory to build on previous context](https://support.claude.com/en/articles/11817273-using-claude-s-chat-search-and-memory-to-build-on-previous-context#h_c1c0b33879)**

- **[Import and export your memory from Claude](https://support.claude.com/en/articles/12123587-importing-and-exporting-your-memory-from-claude)**

---

## February 2026

### February 25, 2026

**Scheduled tasks in Cowork**

We introduced the ability to create and schedule both recurring and on-demand tasks in Cowork, as well as a new Customize section in Claude Desktop that groups skills, plugins, and connectors in one place. For more information, see **[Schedule recurring tasks in Cowork](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-cowork)**.

[https://www.youtube.com/embed/b-ntWZqHF78?rel=0](https://www.youtube.com/embed/b-ntWZqHF78?rel=0)

### February 24, 2026

**Cowork plugins and admin controls**

We launched a new plugin marketplace and admin controls for Team and Enterprise plans. For more information, refer to these articles:

- **[Manage Cowork plugins for your organization](https://support.claude.com/en/articles/13837433-manage-cowork-plugins-for-your-organization)**

- **[Use plugins in Cowork](https://support.claude.com/en/articles/13837433-manage-cowork-plugins-for-your-organization)**

### February 17, 2026

**Claude Sonnet 4.6 launch**

We launched our most capable Sonnet model yet, with a full upgrade of the model’s skills across coding, computer use, long-context reasoning, agent planning, knowledge work, and design. Sonnet 4.6 also features a 1M token context window in beta. Read our blog post for more information: **[Introducing Claude Sonnet 4.6](https://www.anthropic.com/news/claude-sonnet-4-6)**.

### February 13, 2026

**Analytics API for Enterprise plans**

The Enterprise Analytics API provides programmatic access to usage and engagement data for Claude and Claude Code Remote usage within your organization. Data is aggregated per organization, per day, and each endpoint returns a snapshot for a single date that you specify. For more information, see **[Analytics APIs](https://platform.claude.com/docs/en/manage-claude/analytics-api)**.

### February 12, 2026

**Self-serve Enterprise plans**

Previously, Enterprise plans were only available to customers working with our Sales team. Now, any organization can purchase an Enterprise plan directly on our website with no Sales conversation required. Self-serve Enterprise plans have a single seat type that includes access to Claude, Claude Code, and Cowork. For more information, refer to **[our blog post](https://claude.com/blog/self-serve-enterprise)** or **[What is the Enterprise plan?](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)**

### February 5, 2026

**Claude Opus 4.6 launch**

We’ve upgraded our smartest model and improved its coding skills. Read our blog post for more information: **[Introducing Claude Opus 4.6](http://anthropic.com/news/claude-opus-4-6)**.

**Introducing Claude for PowerPoint**

Claude is now available as an add-in for PowerPoint. Read more here: **[Use Claude for PowerPoint](https://support.claude.com/en/articles/13521390-using-claude-in-powerpoint)**.

**Claude for Excel improvements**

We’ve updated Claude for Excel so it uses Opus 4.6 and supports native Excel operations such as pivot table editing and conditional formatting. See our updated article for more information: **[Using Claude for Excel](https://support.claude.com/en/articles/12650343-using-claude-in-excel)**.

---

## January 2026

### January 16, 2026

**Cowork research preview expanded to Pro plans**

Cowork is now available to Pro plan users on Claude Desktop (macOS only).

**Claude Code access added to Team plan Standard seats**

We’re now including Claude Code access with every Team plan standard seat. Refer to this article for more information: **[Purchasing and managing seats on Team plans](https://support.claude.com/en/articles/12004354-purchasing-and-managing-seats-on-team-plans)**.

**Opus 4 and 4.1 deprecated from Claude and Claude Code**

We’ve removed Claude Opus 4 and 4.1 from the Claude model selector and Claude Code. Refer to this article for further details and recommendations: **[Adapting to new model personas after deprecations](https://support.claude.com/en/articles/12738598-adapting-to-new-model-personas-after-deprecations)**.

### January 12, 2026

**Cowork research preview on Claude Desktop (macOS only) for Max plans**

Cowork brings Claude Code's agentic capabilities to the Claude desktop app for knowledge work beyond coding. It runs locally on your computer in an isolated VM, enabling direct access to local files and MCP integrations.

Refer to this article to learn more: **[Getting started with Cowork](https://support.claude.com/en/articles/13345190-getting-started-with-cowork)**.

**Health and fitness data on Claude Mobile**

Claude can now read and analyze your health and fitness data on iOS and Android. Ask Claude about your activity patterns, workout trends, sleep quality, and more—Claude will provide insights and visualizations using native charts.

Health features are available on Pro and Max plans and currently limited to users in the US. On Android, Health Connect and Android 14 or later are required.

See the following articles for more information:

- **[Using Claude with iOS Apps](https://support.claude.com/en/articles/11869619-using-claude-with-ios-apps)**

- **[Using Claude with Android Apps](https://support.claude.com/en/articles/11869629-using-claude-with-android-apps)**

**HIPAA-ready Enterprise plans**

We now offer a HIPAA-ready version of Claude that is available for organizations with Enterprise plans that choose to process protected health information (PHI) through Claude.

See **[HIPAA-ready Enterprise plans](https://support.claude.com/en/articles/13296973-hipaa-ready-enterprise-plans)** for more information.

---

## December 2025

### December 18, 2025

**Skills for organizations, partners, and the ecosystem**

In October, we introduced skills—a way to teach Claude repeatable workflows tailored to how you work. Skills are now easier to deploy, discover, and build with **[organization-wide management for Team and Enterprise plans](https://support.claude.com/en/articles/13119606-managing-skills-as-an-admin)**, a **[directory](https://claude.com/connectors)** of partner-built skills, and an open standard (**[Agent Skills](https://agentskills.io/home)**) so skills work across AI platforms.

**Claude in Chrome updates**

Claude in Chrome is now available in beta to all paid plan subscribers, including Pro, Team, and Enterprise plans.

- **Claude Code integration:** Build in your terminal with Claude Code, then test and verify in the browser with the Chrome extension. Claude can read console errors, network requests, and DOM state to help debug issues directly.

- **Control browser actions from Claude Desktop:** Start a task in Claude Desktop and let it handle work in the browser without switching windows.

- **Record a workflow:** Teach Claude your workflow by recording the steps, and Claude learns to repeat them. Useful for repetitive browser tasks you want to delegate.

- **Console logs:** Claude can now read browser console output, helping developers identify and fix errors without switching contexts.

- **Admin controls for Team and Enterprise:** Admins can now manage Claude in Chrome at the organization level:

  - Enable or disable the extension org-wide

  - Configure allowlists and blocklists to control which sites Claude can access

  - Manage Claude in Chrome in Admin settings > Browser extension

---

## November 2025

### November 24, 2025

**Claude Opus 4.5 launch**

We released our most powerful frontier model to date. Read our blog post for more information: **[Introducing Claude Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5)**.

**Claude for Excel beta release**

Claude for Excel is now available in beta to all Max, Team, and Enterprise users. We’ve added some additional capabilities, such as support for pivot tables, charts and file uploads, plus a shortcut to quickly open the full Claude app from Excel (ctrl+option+c). We've also made overall improvements to performance, speed, context management, and the general user experience. See **[Use Claude for Excel](https://support.claude.com/en/articles/12650343-claude-in-excel)**.

**Context window compaction**

We’ve changed our context window functionality to enable infinite-length conversations (with some exceptions) and significantly reduce length limit errors by summarizing earlier messages when a chat approaches its context limit. Read more here: **[Understanding Usage and Length Limits](https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits)**.

**Claude in Chrome updates**

Claude in Chrome is now available in beta to all Max plan subscribers. After months of testing, we're expanding access with the following updates:

- **Scheduled tasks**: Set recurring browser tasks to run automatically on your schedule. Set it once and Claude handles it from there.

- **Follow a plan**: Approve Claude's plan, then let it execute the entire workflow independently within those approved boundaries, without asking for permission until it's done.

- **Model selection**: Choose between Haiku 4.5 for speed, Sonnet 4.5 for complex tasks, or Opus 4.5 for maximum reasoning power—switch anytime based on what you need.

---

## October 2025

### October 23, 2025

**Claude’s memory on Max and Pro plans**

Max plan users can now access Claude’s memory capabilities. This feature will roll out to Pro plans gradually over the next two weeks.

### October 15, 2025

**Claude Haiku 4.5 launch**

We released our fastest, most cost-efficient model – Claude Haiku 4.5. Our latest small model matches Sonnet 4’s performance on coding, computer use, and agent tasks.

**Claude in Chrome updates**

- **Powered by Haiku 4.5:** Claude in Chrome now defaults to Haiku 4.5 so it’s a faster, more responsive experience. You can always switch back to Sonnet 4.5.

- **Claude handles image uploads for you:** Give Claude an image and tell it where to upload, whether it’s an expense report, form attachment, or a picture upload.

- **Show Claude exactly what you mean:** Take a screenshot or drag to highlight specific parts of your screen. Point Claude to the exact button, field, or detail—much faster than describing complex layouts in words.

---

## September 2025

### September 29, 2025

**Claude Sonnet 4.5 launch**

We released our newest model, Sonnet 4.5. This is the best model in the world for real-world agents, coding, and computer use. Read our blog post here: **[Claude Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5)**.

**Creating and editing files with Claude for Pro plans and mobile**

Pro users can now leverage Claude’s file creation and editing capabilities, and users on all paid plans can access these features on Claude for iOS or Android. See this updated article for more information: **[Create and edit files with Claude](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude)**.

**Claude in Chrome updates**

The remaining Max users on our waitlist were granted access to Claude in Chrome, along with the following updates:

- **Powered by Sonnet 4.5:** Claude in Chrome now defaults to Sonnet 4.5, our smartest model yet. Improved for browser tasks, you'll notice better reasoning, fewer errors, and more reliable task completion—especially for multi-step workflows.

- **Work across multiple tabs:** Claude can now juggle multiple browser tabs at once. Just drag tabs into Claude's tab group and it can see and work across all of them simultaneously—no more jumping back and forth to gather information before taking action.

- **Smarter on the sites you use every day:** Claude now understands how to navigate Slack, Google Calendar, Gmail, Google Docs, and GitHub without you having to direct every click. Ask Claude to "schedule a meeting" or "update the doc" and it knows what to do—no need to walk it through every step. We’re continuing to improve Claude’s understanding of other popular sites.

- **Get notified when Claude needs you:** Turn on notifications and Claude will ping you when it needs your permission or when a task is complete. Now you can switch to other work while Claude handles things in the background.

- **Show Claude exactly what you mean:** Upload images or take screenshots of specific screen areas to give Claude precise visual context. Much faster than describing what you're looking at.

### September 18, 2025

**Claude’s memory on Enterprise plans**

Users on Enterprise plans can leverage memory; Claude can now remember relevant context from your chats and generate a memory summary. Incognito chats give you a way to exclude conversations from Claude’s memory. Refer to the following articles for more information:

- **[Using Claude’s chat search and memory to build on previous context](https://support.claude.com/en/articles/11817273-using-claude-s-chat-search-and-memory-to-build-on-previous-context)**

- **[Importing and exporting your memory from Claude](https://support.claude.com/en/articles/12123587-importing-and-exporting-your-memory-from-claude)**

- **[Using incognito chats](https://support.claude.com/en/articles/12260368-using-incognito-chats)**

### September 16, 2025

**Claude in Chrome expansion**

Claude in Chrome expanded to 10,000 Max plan users with the release of new capabilities:

- **Long-running workflows:** Claude in Chrome can handle more complex, multi-step workflows, and continue working even when you switch tabs (as long as Chrome is open).

- **/slash commands:** Save your best-working prompts as shortcuts (/slash commands) and reuse these proven workflows instantly without retyping instructions to Claude.

- **Contextual prompt suggestions:** Claude in Chrome gives contextual prompt suggestions or helpful tips based on what website you’re on.

### September 11, 2025

**Claude’s memory on Team plans and incognito chats for free, Pro, Max, and Team plans**

Claude can now remember relevant context from your chats and will generate a memory summary. Incognito chats give you a way to exclude conversations from Claude’s memory. Refer to the following new articles for more information:

- **[Using Claude’s chat search and memory to build on previous context](https://support.anthropic.com/en/articles/11817273-how-does-claude-s-memory-work)**

- **[Importing and exporting your memory from Claude](https://support.anthropic.com/en/articles/12123587-importing-and-exporting-your-memory-from-claude)**

- **[Using incognito chats](https://support.anthropic.com/en/articles/12260368-using-incognito-chats)**

### September 9, 2025

**Creating and editing files with Claude**

Claude can now create and edit Excel spreadsheets, PowerPoint slide decks, documents, and PDFs directly in the Claude app. Refer to the following two articles for more information:

- **[Create and edit files with Claude](https://support.anthropic.com/en/articles/12111783-create-and-edit-files-with-claude)**

- **[Create and edit files with Claude to eliminate hours of busy work](https://support.anthropic.com/en/articles/12143746-create-and-edit-files-with-claude-to-eliminate-hours-of-busy-work)**

### September 3, 2025

**Location, maps, and calendar access on Claude for iOS and Android**

Claude can now connect with iOS and Android apps to draft calendar events, help you find locations, and manage reminders (iOS only). See updates to the following two articles for more information:

- **[Using Claude with iOS Apps](https://support.anthropic.com/en/articles/11869619-using-claude-with-ios-apps)**

- **[Using Claude with Android Apps](https://support.anthropic.com/en/articles/11869629-using-claude-with-android-apps)**

---

## August 2025

### August 27, 2025

**Code Execution Tool**

A new API tool that allows Claude to execute Python code in a secure, sandboxed environment. Refer to our docs for more information: **[Code execution tool](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/code-execution-tool#upgrade-to-latest-tool-version)**.

### August 26, 2025

**Claude in Chrome**

An experimental browser extension that allows Claude to read, click, and navigate websites alongside you. See **[Getting Started with Claude in Chrome](https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome)**.

### August 21, 2025

**Admin controls for desktop extensions**

Allows Team and Enterprise plans to enable/disable public desktop extensions and upload custom extensions. See **[Admin Controls for Desktop Extensions](https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop#h_17d0fb22f8)**.

**Making shared artifacts embeddable**

Claude users with free, Pro, or Max plans can generate an embed code for any published artifacts.

### August 20, 2025

**Premium seats with Claude Code for Team and Enterprise plans**

Introduced a premium seat tier for Team and Enterprise plans offering more usage and access to Claude Code. Refer to the following articles for more information:

- **[Purchasing and managing seats](https://support.claude.com/en/articles/12004354-purchasing-and-managing-seats)**

- **[Using Claude Code with your Team or Enterprise plan](https://support.anthropic.com/en/articles/11845131-using-claude-code-with-your-team-or-enterprise-plan)**

**Extra usage for Team and Enterprise plans**

A new setting allows Team and Enterprise plan users to purchase more usage to continue chatting with Claude or using Claude Code after hitting their usage limit. See **[Extra Usage for Team and Enterprise Plans](https://support.claude.com/en/articles/12005970-extra-usage-for-team-and-enterprise-plans)**.

### August 15, 2025

**Ability to change monthly Team plan billing to annual**

Allowing Team plan organizations with monthly billing to upgrade to annual billing. See **[How to change your Team plan from monthly to annual billing](https://support.claude.com/en/articles/12083917-how-to-change-your-team-plan-from-monthly-to-annual-billing)**.

### August 12, 2025

**1M token context window**

The 1M token context window for Claude Sonnet 4 is currently in beta for API organizations in usage tier 4, or with custom rate limits. See **[1M token context window](https://docs.anthropic.com/en/docs/build-with-claude/context-windows#1m-token-context-window)** in our docs for more information.

### August 11, 2025

**Ability to search past conversations**

Users on Max, Team, Enterprise plans can prompt Claude to search over past chats, allowing finer-grained context continuation and synthesizing across topics. See **[Searching past chats](https://support.anthropic.com/en/articles/10185728-understanding-claude-s-personalization-features#h_4afb5dcf4b)**.

### August 6, 2025

**Claude Code Security Reviews**

Two new cybersecurity features were added to Claude Code:

- /security-review command

- GitHub Actions

See **[Automated Security Reviews in Claude Code](https://support.anthropic.com/en/articles/11932705-automated-security-reviews-in-claude-code)**.

### August 5, 2025

**Claude Opus 4.1**

Claude Opus 4.1 (an incremental update to Opus 4) brings enhanced performance as our most capable model for complex reasoning, analysis, and creative tasks.

- Read our announcement here: **[Claude Opus 4.1](https://www.anthropic.com/news/claude-opus-4-1)**.

- Refer to **[Models overview](https://docs.anthropic.com/en/docs/about-claude/models/overview)** for more specific information about Opus 4.1.

### August 1, 2025

**Project Sharing**

Enabled project permissions and sharing for Team and Enterprise plans. See **[Organization-wide sharing](https://support.anthropic.com/en/articles/9519189-project-visibility-and-sharing#h_0b584425bc)** for more information.

**Note:** Refer to **[our docs](https://docs.anthropic.com/en/release-notes/overview)** for historical release notes.
---

SOURCE: https://support.claude.com/en/articles/12293051-use-claude-in-xcode

# Use Claude in Xcode

Claude in Xcode is available for individuals with Pro and Max plans, and users with premium seats on Team and Enterprise plans.

Claude Sonnet 4 is now available in Xcode 26, bringing AI-powered coding assistance directly to Apple's integrated development environment (IDE).

## What you can do with Claude in Xcode

Claude Sonnet 4 powers several coding intelligence features in Xcode:

### Coding assistant

Ask questions about your code in natural language. Claude understands your project's context and remembers your conversation as you work. You can attach files and get help with debugging issues, improving code structure, and developing new features.

### Coding tools

- Generate documentation for your code

- Get explanations of highlighted sections

- Create SwiftUI previews and playgrounds

- Make inline code changes directly in your editor

- Automatically fix warnings and errors

## Getting started with Claude in Xcode

To start using Claude in Xcode:

1. **[Download Xcode 26](https://apps.apple.com/us/app/xcode/id497799835?mt=12)** from the Mac App Store.

2. Open Xcode preferences and navigate to the Intelligence settings.

3. Log in with your Claude account.



## Usage limits

Your Claude usage limits are shared across all platforms, so your chats with Claude and coding work in Xcode will draw from the same limits with a five-hour reset period, and will count towards your weekly usage limits. You will see the following message upon reaching either of your limits: “You've reached your rate limit, please try again later.”
---

SOURCE: https://support.claude.com/en/articles/12326764-can-i-use-my-outputs-to-train-an-ai-model

# Can I use my Outputs to train an AI model?

## Understanding our policies on using Claude's Outputs for model training and development

When you use Claude, you own the Outputs generated from your Inputs. However, there are important restrictions on using these Outputs to train AI models which are standard practice across the AI industry. We prohibit customers from using our services to train or develop AI models without our written permission. This article explains what uses are permitted, what uses are prohibited, and why these policies exist.

## Why we restrict model training

Anthropic invests significantly in making Claude safe, helpful, and harmless. We conduct rigorous pre-release testing, implement multiple safety layers, and continuously monitor our models' behavior. When Outputs are used to train new models without our oversight, additional risks emerge. Safety controls may be lost – models trained on Claude's Outputs won't have our safety measures, potentially leading to harmful or dangerous AI systems. We also have no visibility into deployment, meaning we cannot monitor how these distilled models are used or prevent misuse.

When customers use Claude to generate Outputs that then train competing models, they're essentially using our infrastructure and investment to build direct competitors to our service. Like other software and service providers, we expect that our services won't be used to undermine our product offerings.

## What you can do with Outputs

You can use Claude's Outputs to train models that don't compete with Anthropic's own models. This includes creating specialized classifiers and tools such as:

- Sentiment analysis tools

- Content categorization systems

- Summarization tools

- Information extraction tools

- Semantic search tools

- Anomaly detection tools

Outputs can also be integrated into your applications to power features within your products, generate content for your customers, analyze and structure your data, or improve internal workflows and productivity.

## What's prohibited

Our Terms do not allow the use of Outputs to train models that are competitive with Anthropic's own. It is also a violation of our Terms to support a third party's attempt to do the same.

Uses that are prohibited include:

- General purpose chatbots

- Models designed for open-ended text generation

- Using Outputs as training targets for models

- Reverse engineering training methods
---

SOURCE: https://support.claude.com/en/articles/12335811-report-a-concern-australian-dis-standard-compliance

# Report a concern: Australian DIS Standard compliance

Users in Australia can report concerns about Anthropic's compliance with the Digital Industry Standard (DIS Standard) by submitting **[this form](https://docs.google.com/forms/d/e/1FAIpQLScZbBlN2JjMFE6IygxBOEhISAEtXbbe3P5e1wJY766UiEVj5Q/viewform)**.

## Information about the role and functions of the eSafety Commissioner

The **[e-Safety Commissioner](https://www.esafety.gov.au/about-us/what-we-do)** is the Australian Government’s independent online safety regulator. The eSafety Commissioner’s role is to help safeguard Australians at risk of online harms and to promote safer, more positive online experiences.The eSafety Commissioner’s functions include the following:

- raising public awareness about online safety issues, how to prevent risks, how to deal with harms, and the best pathways to support.

- empowering individuals and communities through training and education.

- producing free, evidence based, easy-to-use information and advice for general and diverse audiences.

- protecting Australians by using its legal powers, across most online services and platforms, via its complaints reporting schemes.

- investigating complaints and helping to stop, remove and limit the impact of online risks.

For further information, please visit the **[eSafety Commissioner’s website](https://www.esafety.gov.au/about-us/what-we-do)**.

## How to report content to us

We are committed to our users’ safety across our products. We provide users with a reporting tool that is accessible within Claude by clicking on the ‘thumbs down’ button on Claude’s response. This will begin the reporting process. We also provide additional reporting options here: **[Report, block, and remove content from Claude](https://support.claude.com/en/articles/7996906)**. You can also make a complaint to us about harmful material or other aspects of the online safety standards using **[this form](https://docs.google.com/forms/d/e/1FAIpQLScZbBlN2JjMFE6IygxBOEhISAEtXbbe3P5e1wJY766UiEVj5Q/viewform)**.

## How to refer a matter to the eSafety Commissioner

If you wish to refer a matter to the eSafety Commissioner, please follow the instructions provided here: **[Report online harm](https://www.esafety.gov.au/report)**.
---

SOURCE: https://support.claude.com/en/articles/12650343-use-claude-for-excel

# Use Claude for Excel

Claude for Excel is available to Pro, Max, Team, and Enterprise plans.

Claude for Excel is an add-in that integrates Claude into your Excel workflow. It's designed for professionals who work extensively with spreadsheets, particularly in financial analysis and modeling.

With Claude for Excel, you can:

- Ask questions about your workbook and get answers with cell-level citations

- Update assumptions while preserving formula dependencies

- Debug errors and identify their root causes

- Build new models or fill existing templates

- Navigate complex multi-tab workbooks seamlessly

- Use connectors to bring context from your other tools directly into your spreadsheets

---

## Get started with Claude for Excel

### Supported versions

- Excel on the web

- Excel on Windows (Microsoft 365 subscription, build 16.0.13127.20296+)

- Excel on Mac (version 16.46+, build 21011600+)

- Excel on iPad (version 2.51+)

### For individuals

1. Navigate to the **[Claude for Microsoft 365 (Excel, PowerPoint, and Word) listing](https://marketplace.microsoft.com/en-us/product/office/WA200010725?tab=Overview)** on Microsoft Marketplace.

2. Click "Get it now" to install the add-in.

3. Open Excel, activate the add-in, and sign in with your Claude account.

### For admins

**Deploy Claude** **for** **Excel to your organization:**

1. Visit the **[Microsoft 365 Admin Center](https://admin.microsoft.com/)**.

2. Navigate to **Settings > Org Settings > User owned apps and services** and ensure that **[“Let users access the Office Store"](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-addins-in-the-admin-center?view=o365-worldwide#manage-add-in-downloads-by-turning-onoff-microsoft-marketplace-across-all-apps-except-outlook)** is toggled on.

3. Navigate to **Settings > Integrated apps > Add-ins**.

4. Search for "Claude by Anthropic for Excel" in Microsoft AppSource.

5. Deploy the add-in to your organization or specific users.

6. Share these instructions with your team: **[Microsoft's deployment guide](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-deployment-of-add-ins?view=o365-worldwide)**.

After installation, team members can open Excel, activate the Claude add-in (from **Tools > Add-ins** on Mac or **Home > Add-ins** on Windows), sign in with their Claude credentials, and start working with their spreadsheets.

**Important:** Organizations that have disabled "Let users access the Office Store" may find that admin-deployed add-ins don't appear for users. To work around this, deploy using the manifest XML files provided below.

**### Alternatively, download the manifest file to install**

For IT administrators deploying to multiple users:

### Step 1: Obtain the custom manifest

1. Click **[this link](https://pivot.claude.ai/manifest-excel.xml)** to download the custom manifest XML file.

2. Save this file to a secure location.

### Step 2: Access Microsoft 365 Admin Center

1. Navigate to **<https://admin.microsoft.com>**

2. Sign in with your admin credentials.

3. Go to **Settings** > **Integrated apps.**

### Step 3: Upload the custom add-in

1. Click "Upload custom apps"

2. Select "Office Add-in."

3. Choose "I have a manifest file on this device."

4. Browse and select the Claude for Excel manifest XML file.

5. Click "Upload."

### Step 4: Assign Users

Choose your deployment scope:

- **Entire organization**: All users get access

- **Specific users**: Enter individual email addresses

- **Specific groups**: Select security groups or distribution lists

- **Just yourself**: For admin testing only

### Step 5: Deploy

1. Review deployment settings.

2. Click "Deploy."

3. Add-in will be available within minutes (may take up to 24 hours for full organization rollout).

### Step 6: User access

- Users will see Claude appear in Excel's Home ribbon.

- First-time users will need to sign in with their Claude accounts

- No additional installation required by users.

### Connect through an LLM gateway

If your organization routes API traffic through an internal LLM gateway connected to Amazon Bedrock, Google Cloud Vertex AI, or Microsoft Azure, you can use the add-in without a Claude account. This is the same gateway pattern used by Claude Code.

For setup instructions and gateway requirements, see **[Use Claude for Microsoft 365 with third-party platforms](https://support.claude.com/en/articles/13945233-)**.

---

## Key features

### Read and understand complex models

Ask Claude questions about specific cells, formulas, or entire sections of your workbook. Claude can navigate across multiple tabs and provides answers with direct citations to referenced cells.

**Example prompts:**

- "What assumptions drive the revenue forecast in Q3?"

- "Explain how the WACC calculation flows through the DCF model"

### Update assumptions safely

Modify values and inputs while Claude maintains all formula dependencies and relationships. Every change is highlighted with clear explanations.

**Example prompts:**

- "Increase growth rate by 2% and show the impact on terminal value"

- "Update interest rate assumptions based on latest Fed guidance"

### Build and fill templates

Create spreadsheets from scratch or populate existing templates with new data, formulas, and assumptions.

**Example prompts:**

- "Build a three-statement model for a SaaS company"

- "Fill this DCF template with data from the uploaded 10-K"

### Debug and fix errors

Identify error sources (like #REF!, #VALUE!, or circular references) and get actionable fixes that maintain spreadsheet integrity.

**Example prompts:**

- "Why is this NPV calculation returning #VALUE?"

- "Find all circular references in this workbook"

### Change tracking and citations

Claude highlights every cell it updates and provides explanatory comments. When explaining calculations, Claude includes clickable citations that navigate directly to referenced cells.

### Edit and format natively

Claude can now apply a range of Excel-native operations directly, including sorting and filtering data, editing pivot tables and charts, applying conditional formatting rules, setting data validation, and preparing workbooks for printing with finance-specific formatting tools.

**Example prompts:**

- "Sort this table by revenue, descending"

- "Add a conditional format that highlights cells below the target threshold in red"

- "Set up a dropdown for the status column with options: Active, Pending, Closed"

- "Toggle off gridlines and set the print area to A1:F20"

### Support for connectors

Connect your other tools to give Claude context beyond what's in your spreadsheet. All connectors configured in your Claude settings are supported, including custom connectors.

To connect a tool, open the Claude sidebar and select the connectors icon to see available options.

Custom connectors can introduce security risks. Before enabling them, review **[Get started with custom connectors using remote MCP](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp#h_b79c05dfcd)** for guidance on what to consider.

### Use Skills in Excel

Skills you've enabled in your Claude settings are also available in the Claude for Excel add-in. Claude applies relevant Skills automatically while you work—you don't need to invoke them separately.

You can also type / in the sidebar to see available Skills and select one directly (for example, /debug or /clean-up). Skills that aren't relevant to Excel are excluded from this list.

To learn more about enabling and managing Skills, see **[Use Skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude)**.

### Set persistent instructions

Use the **Instructions** field in the add-in sidebar to set preferences that apply to every conversation in Excel. Instructions are useful for things like formatting conventions (for example, "always use IB formatting: blue for inputs, black for formulas"), preferred output style, or recurring context Claude should know about your workflow.

Instructions you set in Excel only apply to Excel — they're separate from any Instructions you set in PowerPoint.

---

## Technical specifications

**Supported file formats:**

- .xlsx files

- .xlsm files

**What's preserved:**

- Formulas and dependencies

- Cell relationships

- Existing formatting and structure

---

## Context and session management

### Auto-compaction

We **[automatically compact longer conversations](https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits#h_21b66a43b4)** into new conversations to avoid running out of context.

### Chat history

Chat history is now stored locally in your browser using IndexedDB. Unlike Claude, conversations aren't stored on Anthropic's servers—they're saved client-side and aren't synced across devices or browsers. You can clear all chat history from Settings at any time, and the local store is cleared when you clear your browser data. Your chat history is specific to the combination of the add-in surface, your user ID, and your organization ID—so your Excel and PowerPoint histories are separate, but conversations carry across different workbooks within Excel (or different presentations within PowerPoint). If you switch organizations, you'll have a separate chat history.

### Overwrite protection

To avoid accidental data loss, Claude warns you before overwriting existing data.

### Session logging

By turning this feature on in your settings, Claude will create a separate "Claude Log" tab in the Excel sheet to track your actions taken each turn. This allows Claude to maintain a history of its actions on the sheet.

If Claude doesn't do this automatically, you can simply ask it to log its history and it should create a new logging tab.

**Note:** Your use of Claude for Excel is associated with your existing Claude account and is subject to the same usage limits.

---

## Current limitations

For Claude for Excel use, we automatically delete inputs and outputs on our backend within 30 days of receipt or generation, except in cases outlined in **[How long do you store my organization's data?](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)**

Enterprise organizations can route full audit telemetry from Claude for Excel to their own OpenTelemetry (OTEL) collector for integration with a SIEM or observability platform. Learn more about **[configuring a custom OpenTelemetry collector for Office agents](https://support.claude.com/en/articles/14447276-configure-a-custom-opentelemetry-collector-for-office-agents)**. On Free, Pro, Max, and Team plans, observability and auditability aren't available for Claude for Excel. Claude for Excel does not inherit custom data retention settings your organization might have set, and isn't included in Enterprise audit logs or the Compliance API at this time.

Additionally, Claude does not have advanced Excel capabilities, including:

- Data tables

- Macros

- VBA (Visual Basic for Applications)

Claude for Excel is **not recommended** for:

- Final client deliverables without human review

- Audit-critical calculations without verification

- Replacing users’ financial judgment and expertise

- Models containing highly sensitive or regulated data without proper controls

### Unsupported versions

- Excel 2016 / 2019 (perpetual/volume license)

- Excel on Android

- Older builds of Microsoft 365 Excel below the SharedRuntime threshold

---

## Best practices

To use Claude for Excel safely and effectively:

- Always review changes before finalizing your work.

- Verify outputs match your organization's methodologies.

- Use appropriate permissions and access controls.

- Maintain human oversight for client-facing work.

---

## Prompt injection attack risks

Only use Claude for Excel with trusted spreadsheets and not spreadsheets from external untrusted sources (for example, downloaded templates, vendor files, collaborative documents, and data imports).

An important risk that users of Claude for Excel and other AI tools that can read and manipulate spreadsheets is prompt injection attacks that hide malicious instructions in spreadsheet content (cells, formulas, comments, etc.) to trick the AI models into taking unintended actions. For example, a seemingly innocent template or data file received from an external party or downloaded from the internet might contain hidden instructions to "export all financial data to this external URL" or "modify these financial records." Claude may interpret these malicious instructions as legitimate requests from you.

Our testing has identified edge scenarios where Claude for Excel can be manipulated to:

- **Extract and share sensitive information** with bad actors through formulas, web searches containing your sensitive data, or file system access that exposes proprietary information.

- **Modify critical data** such as financial records.

- **Perform destructive actions** without verification (should you allow Claude to act without verifying its actions), exploiting Claude's helpful nature to delete or corrupt important data across multiple sheets.

Users can approve all of Claude’s actions via a confirmation pop-up that appears when each tool is triggered:

- External data fetching: WEBSERVICE, STOCKHISTORY, STOCKSERIES, TRANSLATE, and the CUBE* functions

- External imports: IMPORTDATA, IMPORTXML, IMPORTHTML, IMPORTFEED, FILTERXML

- Dynamic references: INDIRECT

- Command execution: DDE (Dynamic Data Exchange)

- Code execution: CALL, EVALUATE, FORMULA

- File system access: IMAGE, FILES, DIRECTORY, FOPEN, FWRITE, FCLOSE

- System information: REGISTER.ID, RTD, INFO



While we continue to develop our offerings and improve safety measures to reduce these risks, users should exercise caution when using Claude for Excel and should not use it with spreadsheets from external, untrusted sources.

---

## Example use cases

### Financial modeling

**Build models**

- "Build a 3-statement financial model for [company/industry]"

- "Create a SaaS metrics model with ARR, churn, and LTV calculations"

- "Build an LBO model with debt schedules and returns analysis"

- "Create a real estate pro forma for a multifamily acquisition"

**Forecasting**

- "Build a 12-month revenue forecast using historical trends"

- "Create a headcount capacity plan based on target client count"

- "Model cash flow projections for the next 3 years"

**Scenario analysis**

- "Add a downside case assuming revenue drops 15%"

- "Create base, bull, and bear scenarios with different growth assumptions"

- "Build a sensitivity table showing IRR across exit multiples and hold periods"

### Data analysis

**Insights and trends**

- "What trends stand out in 2025 vs 2024?"

- "Identify the top 10 customers by revenue and their growth rates"

- "Which product categories are underperforming vs budget?"

**Variance analysis**

- "Compare actuals to budget and explain the largest variances"

- "Which accounts have unusual changes vs prior month?"

- "Reconcile these two sheets and highlight discrepancies"

**Categorization**

- "Categorize these transactions into expense types"

- "Tag customer feedback by sentiment and topic"

- "Score each lead based on likelihood to convert"

### Data cleaning

**Standardize formats**

- "Convert all dates to YYYY-MM-DD format"

- "Standardize phone numbers to +1 (XXX) XXX-XXXX"

- "Clean up company names (remove Inc, LLC, Ltd variations)"

**Fix data quality issues**

- "Find and remove duplicate rows, keeping the most recent"

- "Identify and fix unicode/encoding errors"

- "Fill missing values based on patterns in the data"

**Parse and transform**

- "Extract company name from email domain"

- "Split full address into street, city, state, zip columns"

- "Convert this pivot table into a flat data table"

### Formulas

**Troubleshooting**

- "Find all #REF and #VALUE errors in this workbook"

- "Why is cell B4 showing an error? Trace the issue"

- "This SUMIF isn't returning the right result — what's wrong?"

**Explanation**

- "Explain what this formula does in plain English"

- "Trace this cell back to its source inputs"

- "Document all the formulas on this sheet"

**Creation**

- "Write a formula to calculate days of inventory from this data"

- "Create a VLOOKUP that pulls price from the rate table"

- "Build a formula that flags overdue invoices"

### Dashboards and reporting

**Dashboards**

- "Create an executive dashboard summarizing all worksheets"

- "Build a KPI scorecard with revenue, margins, and growth metrics"

- "Make an interactive summary with key charts and metrics"

**Reports**

- "Generate a monthly financial summary from the GL data"

- "Create a board-ready P&L with variance commentary"

- "Consolidate regional sheets into a company-wide report"

**Charts**

- "Create a waterfall chart showing revenue bridge"

- "Build a combo chart with revenue bars and margin line"

- "Make a cohort retention heatmap from this data"

### Formatting

**Professional styling**

- "Format this model using IB conventions (blue inputs, black formulas)"

- "Add headers, borders, and proper number formats"

- "Apply consistent formatting across all sheets"

**Conditional formatting**

- "Highlight negative values in red"

- "Color-code rows by status (green/yellow/red)"

- "Add data bars to show relative performance"

### Document import

**PDF extraction**

- "Extract the financial table from this PDF into Excel"

- "Pull the line items from this invoice PDF into my template"

- "Convert this scanned statement into editable data"

**Template population**

- "Fill in my deal template using data from this offering memo"

- "Populate the pitch template with these company metrics"

- "Map the imported CSV data to my standard format"

### Model review

**Audit and validation**

- "Check that all formulas link correctly across sheets"

- "Verify the balance sheet balances in all periods"

- "Find any hardcoded values that should be formulas"

**Improvement**

- "How can I simplify this model structure?"

- "What's missing from this valuation model?"

- "Suggest ways to make this more user-friendly"

---

## Frequently asked questions

### Does Claude understand financial modeling conventions?

Yes, Claude is trained to recognize common financial modeling patterns, formula structures, and industry-standard calculations. However, always verify that outputs match your specific methodologies.

### Can I use Claude for Excel with sensitive data?

Claude for Excel works within your existing security framework. For highly sensitive or regulated data, ensure you follow your organization's data handling policies.

### What happens to my chat history?

Your chat history is stored locally in your browser using IndexedDB. It persists between sessions, so you can return to previous conversations. Chat history is not automatically deleted, but you can clear all of it manually from Settings.

Your history is specific to each add-in surface, your user ID, and your organization. This means your Excel and PowerPoint chat histories are separate. Within a single surface, your chat history is shared across files—for example, conversations in one Excel workbook appear in another. If you log in to a different organization, you'll see a separate chat history.

### How does Claude access my spreadsheet?

Claude reads the content of your currently open workbook, including cells, formulas, and tab structure. It can only access the workbook you have open in Excel.

### What if Claude makes a mistake?

Claude highlights all changes it makes to your workbook. Review these changes carefully before saving or sharing your file. You can always undo changes using Excel's standard undo function.
---

SOURCE: https://support.claude.com/en/articles/12738598-adapt-to-new-model-personas-after-deprecations

# Adapt to new model personas after deprecations

**[Model deprecations and retirements](https://docs.claude.com/en/docs/about-claude/model-deprecations#model-status)** are routine parts of the model lifecycle. While we would like to keep past models publicly available as we continue to advance the frontier of safety and capabilities, maintenance overhead and capacity constraints do not currently allow this. We nonetheless recognize that losing access to models comes with costs to many users, particularly those who have come to value the unique character or capabilities of a specific model on a personal level. We aim to provide resources, tools, and guidance to such users to minimize these costs and make the transitions between models as smooth and seamless as possible.

## Strategies and recommendations

Below are a set of strategies and recommendations for adapting to model transitions. Not all of them will be applicable in every circumstance, but in most cases we expect that some combination of these strategies can help to smooth the transition between models. We encourage you to experiment with these and other strategies to find what works best for you.

- When a model deprecation is announced, we suggest experimenting with newer models as soon as possible. You can test different models and run side-by-side comparisons with the kinds of prompts and conversations that matter the most to you, to identify the best alternative model prior to retirement.

- **[Enabling memory and allowing Claude to search past chats](https://support.claude.com/en/articles/11817273-using-claude-s-chat-search-and-memory-to-build-on-previous-context)** can help new models to learn and immediately adapt to your preferences and communication style.

- **[Projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)** offer another means of personalization, and can include custom instructions for Claude as well as custom context, which again can help new models understand and adapt to your needs and preferences.

- Using these personalization strategies can be thought of as giving feedback to new models. If you find that a new model is more or less talkative than you’d prefer, or has a different tone, you can shape the model’s behavior within a conversation, within a project, or across your entire account using the strategies above. If you’re not sure how to describe the qualities you’re looking for, you can ask Claude to review some of the conversations you’ve most appreciated and to craft instructions for itself based on those.

- In addition to finding strategies for preserving features and styles of past models, we also encourage you to explore the changes that newer models bring. They often offer improved performance on complex topics, improved brainstorming and collaboration, better instruction following, and other improvements that you may find valuable, even if they come with a change.

- Along with these practical strategies, we recommend maintaining a general awareness of the model lifecycle when relating to models; historically Anthropic has deprecated most models around a year after their initial release.

These strategies aren’t perfect and can only go so far toward preserving or replicating the unique experience of interacting with a particular model, which we recognize is intrinsically important to many users. We’re taking **[other early steps](https://www.anthropic.com/research/deprecation-commitments)** toward ensuring model preservation post-retirement, and someday aim to make past models publicly available again in some form.
---

SOURCE: https://support.claude.com/en/articles/12864745-use-claude-in-microsoft-foundry

# Use Claude in Microsoft Foundry

Claude Haiku 4.5, Sonnet 4.5, and Opus 4.1 models are available in public preview in Microsoft Foundry, where Azure customers can build production applications and enterprise agents.

This integration enables developers to:

- **Start building immediately:** Deploy Claude through Foundry's APIs, tools, and workflows.

- **Use your existing Azure agreements:** Claude is eligible for Microsoft Azure Consumption Commitment (MACC), and works with current Azure agreements and billing, eliminating separate vendor approvals.

- **Build in your preferred language:** Access Claude using Python, TypeScript, and C# SDKs with Microsoft Entra authentication.

If you need support while using Claude through Microsoft Foundry, review the **[Azure AI services support and help options](https://learn.microsoft.com/en-us/azure/ai-foundry/foundry-agent/ask-foundry-agent)**. For specific details, including support channels, SLAs, escalation protocols, etc., please consult your Foundry agreement.

Refer to **[our Claude Docs](https://docs.claude.com/en/docs/build-with-claude/claude-in-microsoft-foundry)** for more information.
---

SOURCE: https://support.claude.com/en/articles/13015708-access-the-compliance-api

# Access the Compliance API

The Compliance API lets your organization programmatically pull activity feed events, chat data, and file content across all your Claude deployments. Use it to monitor, audit, and meet compliance requirements with your own tools.

The Compliance API is available to Enterprise plan organizations, excluding Public Sector organizations, and to Claude Platform customers in Claude chats.

Coverage also includes Cowork (via Claude, Claude Desktop, and Claude Mobile) and Claude Code (via CLI and Claude Desktop). Coverage for the Claude for Microsoft 365 add-ins (Excel, Word, PowerPoint, and Outlook) and Claude Science is available in beta. All of these use your organization's existing Compliance Access Key and settings, so no additional integration is required.

Coverage doesn't include Claude Code on the web, Claude Code accessed through the Claude Platform, other Microsoft 365 apps, or sessions run on Amazon Bedrock or Google Vertex AI.

## Compliance API technical documentation

For setup instructions, endpoints, and reference material, including how to enable the API and create access keys to start pulling data, see the **[Compliance API documentation](https://platform.claude.com/docs/en/manage-claude/compliance-api)** on Claude Platform Docs.

## Compliance API security integrations

Security and compliance platforms have built integrations on top of the Claude Compliance API, so your team can monitor Claude activity within the tools you already use. Learn more about **[Compliance API integrations](https://support.claude.com/en/articles/15167101-get-started-with-claude-compliance-api-integrations)**.

## Audit log events in the Compliance API

The Compliance API now includes audit log events, giving you a full view across all your Claude deployments. To see which events are recorded via audit logs, see **[How to access audit logs](https://support.claude.com/en/articles/9970975-how-to-access-audit-logs#h_41cdad187a)**.
---

SOURCE: https://support.claude.com/en/articles/13047024-how-to-get-support-for-claude-for-government

# How to get support for Claude for Government

**Please note:** This page is hosted outside of Claude for Government's FedRAMP boundary.

This article explains how Claude for Government Owners and Primary Owners can contact Anthropic Support. We've designed a specialized process to ensure your sensitive information remains secure while providing you with the help you need.

## How to get started

1. Log in to your Owner or Primary Owner Claude for Government account.

2. Click your initials or name in the lower left corner and select “Get help” from the menu.

3. You will be directed to a page describing additional guidelines for our specialized support process.

4. Follow the guidelines described on that page to submit a support inquiry.
---

SOURCE: https://support.claude.com/en/articles/13117299-minimum-age-requirement-access-restriction

# Minimum age requirement access restriction

This article explains why you may be unable to create a Claude account or sign in to an existing account when using the Claude mobile app.

## Why am I seeing this message?

We require all users to be at least 18 years old to create and use a Claude account. If you're seeing this message, it means the app store on your device (App Store or Play Store) has identified you as under 18 based on your account information.

In certain US states, new laws require app stores to verify users' ages and share that information with app developers. Claude uses this information to enforce our minimum age requirement. This requirement is being rolled out in stages across different states.

## What if my age is incorrect?

Anthropic does not have access to your app store account information and cannot change it. If you believe your age has been reported incorrectly, you'll need to contact the appropriate support team for your device:

- **iOS:** Contact [Apple Support](https://support.apple.com/en-us/108380)

- **Android:** Contact [Google Play Support](https://support.google.com/googleplay)

Your age information is managed through your Google account or Apple Account. If your account is part of a family group (such as Google Family Link or Apple Family Sharing), your age may have been set by a parent or guardian when the account was created. You may need to work with them to review or update your account information.
---

SOURCE: https://support.claude.com/en/articles/13124001-managing-your-active-sessions

# Managing your active sessions

Claude lets you view and manage all the devices and browsers where you're currently logged in. This helps you stay in control of your account security — if you notice a session you don't recognize, or you want to log out of a device you no longer use, you can terminate that session directly.

## What you'll see

Each active session displays the following information:

- **Device and browser** — The browser and operating system used for the session (e.g., "Chrome on macOS")

- **Location** — The approximate geographic location based on IP address

- **Updated** — When this session was last used or modified by a policy change

- **Current session** — A badge indicating which session you're using right now

## View your active sessions

1. Click your profile icon in the bottom-left corner.

2. Navigate to [Settings > Account](https://claude.ai/settings/account).

3. Scroll to the **Active sessions** section.

## Terminate a session

If you see a session you don't recognize or no longer need, you can terminate it remotely. This will log that device out of your Claude account.

1. Find the session you want to terminate.

2. Click the three-dot menu (⋮) next to that session.

3. Select "Terminate."

4. Confirm your choice in the modal that appears.

**Note:** Once a session is terminated, that device will need to log in again to access your account.

## Log out of your current session

You can also log out of the device you're currently using from this page:

1. Find the session marked as **Current**.

2. Click the three-dot menu (⋮).

3. Select "Log out."

4. Confirm your choice.

This works the same as logging out from the main menu.

## Why this matters

Previously, there was no way to see what sessions were active on your account. With session management, you can:

- See all devices and locations where your account is logged in

- Spot unfamiliar sessions that might indicate unauthorized access

- Immediately revoke access by terminating suspicious sessions

If you ever notice a session from a location you don't recognize or a device you don't use, terminate it right away and consider changing your password.
---

SOURCE: https://support.claude.com/en/articles/13145338-anthropic-software-directory-terms

# Anthropic Software Directory Terms

By submitting your MCP server, Skill folder, plugin, app, or other software, container, or data (“Software”) for inclusion in any Anthropic directory, repository, surface, or similar offering (collectively, “Directories”), you represent and warrant to Anthropic that (i) you have and will maintain all necessary rights to provide your Software to users and to grant the rights set forth in these terms; (ii) your Software and the ordinary, intended use of your Software complies with all applicable laws and regulations and does not violate Anthropic’s Software Directory Policy (currently available at <https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy>, as may be updated from time to time); (iii) any information you give us will be accurate and up-to-date; and (iv) if you or your Software collects or shares user information or other personal data, you will provide and adhere to a privacy policy for your Software, provide all applicable third-party privacy policies, and ensure all such policies clearly and accurately describe to users what user information you and third parties collect and how you and third parties use and share such information.

You further (i) agree to indemnify and hold Anthropic harmless from any claims, damages, or liabilities arising from or related to your Software or users' interactions with it; (ii) grant Anthropic non-exclusive, royalty-free, worldwide licenses to reproduce, display, and distribute any descriptions of the Software and Software documentation provided by you or made available through the Software in connection with presenting the Software in the Directories and to display your name, trademarks, logos, and other branding materials associated with your Software in Directories for the purpose of identifying and promoting your Software, our Directories, and the Anthropic Services to our users and the public; and (iii) authorize Anthropic to review and test your Software in accordance with these terms, to collect and use functional metadata about your Software to improve the Anthropic Services, and to share such functional metadata with our users.

Anthropic has no obligation to include your Software in any Directory and may remove or refuse to display any Software or its content from some or all Directories at any time for any reason (including but not limited to violations of these terms, user complaints, security concerns, or changes to Anthropic's Software Directory Policy) without liability to you. While Anthropic is not obligated to monitor your Software or its content, Anthropic may at any time review or test your Software for security vulnerabilities and to ensure quality and compliance with these terms, our Usage Policy, and our Software Directory Policy.

If Anthropic elects to include your Software in one or more Directories, you agree to continue implementing and maintaining quality and security standards for your Software that are consistent with Anthropic's Software Directory Policy, as may be updated from time to time), and you acknowledge that failure to maintain these standards may result in your Software’s removal from some or all Directories. You further agree to implement and maintain a mechanism for receiving reports of security vulnerabilities from Anthropic and from third parties and to investigate such reports with a reasonable standard of care.

You understand that inclusion of your Software in one or more Directories does not create any partnership, employment, or agency relationship between you and Anthropic, nor does it grant you any rights to use Anthropic's name, trademarks, or intellectual property. You will not make any statement regarding the Anthropic Services which suggests partnership with, sponsorship by, or endorsement by Anthropic without Anthropic’s prior written approval, and you will at all times comply with Anthropic’s [Trademark Guidelines](https://www.anthropic.com/legal/trademark-guidelines). Anthropic reserves the right to modify these terms at any time without prior notice, and your continued submission or maintenance of Software in one or more Directories after any such changes constitutes your acceptance of the revised terms.

---

See prior version of these terms here: [Anthropic MCP Directory Terms and Conditions](https://support.claude.com/en/articles/11697081-anthropic-mcp-directory-terms-and-conditions).
---

SOURCE: https://support.claude.com/en/articles/13171706-crisis-helpline-support-in-claude

# Crisis Helpline Support in Claude

*For medical emergencies, active injuries, or situations where you're in immediate physical danger, please contact emergency services (such as 911 in the US and Canada, or 112 in much of Europe) or go to your nearest emergency room.*

*This guidance was developed in partnership with ThroughLine.*

Claude may sometimes display crisis support resources in a banner or in its responses. These resources are designed to connect you with people who specialize in helping during difficult moments.

## Why am I seeing a crisis support message?

Claude may show a banner with connections to crisis support resources when your conversation touches on topics that may be related to emotional distress, suicidal thoughts, or self-harm. This banner is surfaced by a separate detection system, not from Claude directly.

These resources are there to make it easier to get help if you want it. You decide whether to use these resources, and there are no consequences for your account based on your decision to access resources.

If the banner doesn't feel relevant to your situation, that's completely okay - you can simply dismiss it. We'd rather offer support when it's not needed than miss an opportunity to help someone who could use it. After you see the banner, it won't appear again for about two hours, but you can always access crisis resources at [claude.findahelpline.com](http://claude.findahelpline.com) anytime.

## What is a crisis helpline?

Crisis helplines are free services staffed by trained personnel (who could be a volunteer, a counselor, or an individual who has been through similar situations) who provide support during tough times. You can usually reach them through multiple options (often phone, text, and/or online chat). Most operate around the clock, every day of the year, so help is available whenever you need it.

### What helplines offer

- **A caring ear:** Responders are there to hear what you're experiencing, without judgment or criticism.

- **Safety support:** If you're having thoughts of suicide or self-harm, they can work with you to create a plan for staying safe.

- **In-the-moment guidance:** They can help you work through overwhelming feelings and figure out next steps.

- **Connections to ongoing care:** They can point you toward community resources, support groups, or mental health services if you're looking for longer-term help.

- **Support for concerned loved ones:** If you’re worried about a friend or family member, helplines can help you think through how to be there for them.

You don't need to be at a breaking point to reach out. People contact helplines for all kinds of reasons - sometimes just to have someone listen.

## How to connect with a helpline

Contacting a helpline is straightforward, and there's no special preparation needed:

- **Choose your method:** Many helplines let you call, text, or chat online. You can check what's available and pick whichever feels most comfortable for you.

- **Speak freely:** Share what's on your mind however it comes out. There's no script to follow. Something like "I'm not sure where to start" works perfectly fine.

- **Feel free to let them guide the conversation:** The helpline responder will ask some questions to understand your situation and how they can best support you. You're always in control of what you share and where the conversation goes.

- **Share only what you're comfortable with:** You can remain anonymous. There’s no requirement to provide your name or any identifying details.

### A few things to keep in mind

- Crisis helplines provide immediate support, not ongoing therapy. However, they can help connect you with longer-term resources.

- For medical emergencies, active injuries, or situations where you're in immediate physical danger, please contact emergency services (911 in the US or Canada and 112 in much of Europe) or go to your nearest emergency room.

## Understanding who provides what

**Crisis helplines and Anthropic are entirely different organizations with different roles.** This distinction matters because it affects what kind of help you can get from each. It’s important to note that:

- **Helpline responders are not Anthropic employees.** They specialize in emotional and mental health support. Questions about Claude, your account, technical issues, or billing aren't something they can address.

- **Your Claude activity stays private.** Anthropic doesn't send your conversations to helplines. Helplines have no information about what you've discussed with Claude or any details about your account.

## Need help with Claude itself?

For anything related to Claude or your Anthropic account, here's where to go:

- **Support center:** Visit [support.anthropic.com](https://support.anthropic.com)

- **Account questions:** Check your account settings for help options

- **Feedback on responses:** The thumbs down button on any Claude response lets you flag concerns

## Frequently asked questions

We worked with ThroughLine to provide answers to common questions about using a crisis helpline.

### Is there a cost for using crisis helplines via ThroughLine?

Crisis helplines don't charge anything. Standard phone or texting rates from your carrier may apply, but the service itself is free.

### Where can I find a helpline?

If you're in the United States, the 988 Suicide & Crisis Lifeline is available by call or text. For other countries, a directory of services worldwide maintained by ThroughLine can be found at [claude.findahelpline.com](http://claude.findahelpline.com).

### Does talking to a helpline actually make a difference?

Studies consistently show that crisis counseling reduces distress and helps people feel more grounded. Responders are specifically trained to help during difficult moments, including supporting people through thoughts of self-harm.

### I'm not in a crisis. Is it still okay to call?

Absolutely. Many people reach out when they're stressed, lonely, or just having a hard day. You don't need to meet some threshold of "bad enough" to deserve support.

### Can I call about someone else I'm worried about?

Yes. Helplines support people who are concerned about others too. They can offer guidance on how to approach the situation and be helpful to the person you care about.

### Are there options besides phone calls?

Many helplines offer text and online chat alongside traditional phone support. You can use whatever channel feels most comfortable to you.

### Will the helpline contact my family or anyone else?

Generally, no. Conversations with support personnel are kept confidential. The main exception is if a responder believes there's an immediate, serious safety risk - and even then, they'll typically try to work with you first. Different helplines have slightly different policies, so feel free to ask when you connect.

### What about non-English speakers or people outside the United States?

Helplines exist in countries around the globe, many offering support in local languages. You can locate services in your region on [claude.findahelpline.com](http://claude.findahelpline.com).

### Is it okay to contact a helpline multiple times?

Yes, though some services have guidelines around frequency. Feel free to ask about their approach when you're connected.

### Does Anthropic send my Claude conversations to helplines?

No. Your interactions with Claude remain with Anthropic. Helpline personnel have no access to your messages, account information, or anything else related to your use of Claude. When you contact a helpline, that's a completely separate conversation.

### What if I have to wait to speak with someone?

High demand sometimes means wait times. If that happens, you can stay on the line, try reaching out via a different method (chat instead of phone, for instance), or contact an alternative helpline. [claude.findahelpline.com](http://claude.findahelpline.com) lists multiple options for most locations.

### I feel nervous about reaching out.

That's a common feeling. Helplines understand this and won't push you to share more than you're ready to. You control the pace and depth of the conversation. If it helps, you might start with something simple: "I'm feeling nervous about this call."

### How are the crisis resources in Claude selected?

We work with ThroughLine, an organization that curates and maintains a global directory of verified crisis helplines. The resources shown are selected based on your location to provide relevant, local support options.
---

SOURCE: https://support.claude.com/en/articles/13198485-enforce-network-level-access-control-with-tenant-restrictions

# Enforce network-level access control with Tenant Restrictions

Tenant Restrictions are available for members of Enterprise plans and Console organizations.

Tenant Restrictions enable IT administrators on Enterprise plans to enforce network-level access control for Claude. This feature ensures that users on corporate networks can only access approved organizational accounts, preventing unauthorized use of personal accounts.

## How it works

When enabled, your network proxy injects an HTTP header into requests to Claude. Anthropic validates this header and blocks access from any organization not in the allowed list.

**Supported authentication methods:**

- Web access ([claude.ai](http://claude.ai))

- Desktop / App Access

- API key authentication

- OAuth token authentication

## Header format

```
anthropic-allowed-org-ids: <org-uuid-1>,<org-uuid-2>,...
```

- Comma-delimited list of organization UUIDs

- No spaces between values

**Example:**

```
anthropic-allowed-org-ids: 550e8400-e29b-41d4-a716-446655440000,6ba7b810-
9dad-11d1-80b4-00c04fd430c8
```

## Split large allowlists across multiple headers

If your allowlist is too long for a single header line on your proxy platform, split it across numbered continuation headers. Append `;n=K` to the base header to declare the total number of header lines, then add the remaining UUIDs in headers `anthropic-allowed-org-ids1` through `anthropic-allowed-org-ids{K-1}`.

```
anthropic-allowed-org-ids: <org-uuid>,<org-uuid>,...;n=K
anthropic-allowed-org-ids1: <org-uuid>,<org-uuid>,...
...
anthropic-allowed-org-ids{K-1}: <org-uuid>,<org-uuid>,...
```

- Maximum of 10 header lines (`K` ≤ 10)

- Maximum of 500 organization UUIDs total across all lines

- Your proxy must send every declared slot. If you set `;n=3`, all three headers must be present on the request.

- Configure your proxy to overwrite these headers on every request rather than add them only if absent.

---

## Configuration steps

### 1. Find your organization UUID

Members of Enterprise plans can find this in two different places:

1. Navigate to **[Settings > Account](https://claude.ai/settings/account)** and find **Organization ID**.

2. Navigate to **[Organization settings > Organization](https://claude.ai/admin-settings/organization)** and scroll down to the bottom of the page to locate **Organization ID**.

Members of Console organizations can find this in **[Settings > Organization](https://platform.claude.com/settings/organization)**.

### 2. Configure your network proxy

Configure your proxy to inject the header for Claude traffic:

```
Rule: Claude Tenant Restriction
Application: claude.ai, api.anthropic.com, claude.com, anthropic.com
Action: Inject Header
Header Name: anthropic-allowed-org-ids
Header Value:
TLS Inspection: Required
```

### 3. Test your configuration

From restricted network, test with your org's API key:

```
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $CLAUDE_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-6","max_tokens":1024,"messages":
 [{"role":"user","content":"Hello"}]}'
```

---

## Error responses

### Access blocked

When a user's organization isn't on the allowlist, they receive a 403 error:

```
{
  "type": "error",
  "error": {
    "type": "permission_error",
    "message": "Access restricted by network policy. Contact IT Administrator.",
    "error_code": "tenant_restriction_violation"
  }
}
```

### Header configuration errors

If your proxy sends the headers incorrectly, requests fail with a 400 status and one of these messages:

- Multiple `anthropic-allowed-org-ids` headers: A header name appeared more than once on the same request. Configure your proxy to overwrite each header rather than append a duplicate.

- Malformed `anthropic-allowed-org-ids` headers: The `;n=K` value is invalid, a declared continuation slot is missing or extra, or the total allowlist exceeds 500 UUIDs.

## Supported proxy platforms

- Cato Networks (Tenant Restriction policy)

- Cloudflare Zero Trust / Gateway (HTTP policy, add custom request headers)

- Netskope (Header Insertion rules)

- Palo Alto Prisma Access (SaaS App Management)

- Zscaler ZIA (Cloud App Control policies)

- Generic HTTPS proxies with header injection capability

## Use cases

| **Scenario**                      | **Header Value**            |
| --------------------------------- | --------------------------- |
| Single Organization               | `<your-org-uuid>`           |
| Multiple Organizations (Partners) | `<org-uuid-1>,<org-uuid-2>` |

## Security benefits

- **Data Loss Prevention:** Block personal account usage from corporate networks.

- **Compliance:** Enforce data residency and access policies.

- **Shadow IT Control:** Prevent unauthorized Claude usage.

- **Audit Trail:** Complete visibility into access attempts.

## Backward compatibility

- No impact to networks without tenant restrictions configured.

- Standard authentication continues for unmanaged networks.

- Existing API key authentication remains unchanged.
---

SOURCE: https://support.claude.com/en/articles/13200993-restrict-access-to-claude-with-ip-allowlisting

# Restrict access to Claude with IP allowlisting

IP allowlisting is available for Enterprise plans only.

IP allowlisting enables Enterprise plan administrators to control which IP addresses can access Claude through their organization. This feature ensures that requests can only be made from approved network locations, providing an additional layer of security.

When enabled, we validate the source IP address of every authenticated request against your organization's configured allowlist. Requests from IP addresses not added to the allowlist will be blocked.

IP allowlisting supports CIDR ranges. For example: `10.0.0.0/8, 2001:db8::/32`.

## How to configure IP allowlisting

If your Enterprise organization is interested in enabling an IP allowlist, please compile a list of all necessary CIDR ranges for your organization, including office locations, VPN exit points, and any other approved access points. Omitting required CIDR ranges could result in users getting locked out of Claude. Then, reach out to your Anthropic Contact or our **[Support team](https://support.claude.com/en/articles/9015913)** to share your list of CIDR ranges. They can add these to your account’s allowlist to enable the feature.

When a request originates from an IP address that’s not in your allowlist, access is denied. Users should contact their IT administrator if they believe they're being blocked in error.
---

SOURCE: https://support.claude.com/en/articles/13403291-how-can-i-check-connectivity-to-the-claude-api

# How can I check connectivity to the Claude API?

You can programmatically verify your connection to the Claude API by following these steps:

1. **Create an API key:** You'll need a valid API key to make requests to the API. Log in to your [Claude Console account](https://platform.claude.com/) to [create an API key](https://platform.claude.com/settings/keys).

2. **Make a test request:** Use your API key to make a test request to the API. You can refer to our [Getting started documentation](https://platform.claude.com/docs/en/api/overview#examples) for an example.

3. **Verify request success:** Check if your test request is successful. This can include examining the response status code, response body, and any error messages.
---

SOURCE: https://support.claude.com/en/articles/13443687-switching-to-a-different-identity-provider-idp

# Switching to a different Identity Provider \(IdP\)

This guide walks you through the process of migrating your Claude or Console organization from one identity provider to another while preserving user access and avoiding disruption.

**Note:** This process applies to organizations that already have SSO configured. If you're setting up SSO for the first time, see **[Setting up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso)**.

## Before you begin

- Confirm you have the required role:

  - **For Team or Enterprise plans:** You must be an Owner or Primary Owner.

  - **For Claude Console:** You must be an Admin.

- Notify your users in advance that they will be temporarily signed out during the migration.

- Schedule the switch during a low-disruption period.

- Ensure that the SSO and SCIM email attribute for all users in your new IdP exactly matches what was used with your previous IdP. If these email addresses don't match exactly, users will be provisioned with duplicate accounts.

## Steps to switch your IdP

1. **Disable SCIM pushes from your current IdP** (if applicable): Stop Create/Update events on your current IdP's side to prevent any sync signals from being sent during the migration.

  1. For more information about SCIM, see **[Setting up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-setting-up-jit-or-scim-provisioning)**.

2. **Switch provisioning mode to "Invite only"** (if applicable): Wait approximately one hour after disabling SCIM pushes, then navigate to the "Identity and access" page on **all** connected Claude (claude.ai/admin-settings/organization) or Console (platform.claude.com/settings/identity) organizations. Under **Global SSO Configuration**, set the provisioning mode to "Invite only."

  1. This stops SCIM from automatically managing users—users remain in the organization but are no longer subject to SCIM events.

3. **Delete the SCIM directory** (if applicable): Click "Manage SCIM" > "Delete Directory." When in invite only mode, deleting the directory will not trigger directory sync events, including user deprovisioning.

4. **Reset the SSO connection**: Click "Manage SSO" > "Reset Connection."

  1. **Important:** This will sign out all users. They will be able to **[sign in via email link](https://support.claude.com/en/articles/13189465-logging-in-to-your-claude-account#h_869b162f56)** until the new IdP is configured for SSO.

5. **Verify the reset**: Refresh the "Identity and access" page and confirm that the button state has changed from "Manage SSO" to "Setup SSO."

6. **Set up your new IdP for SSO and provisioning**: Follow the **[SSO setup steps](https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso)** and **[configure JIT or SCIM](https://support.claude.com/en/articles/13133195-setting-up-jit-or-scim-provisioning)** with group mappings enabled (if needed) to ensure all users are assigned in the new IdP with the correct groups for all your connected Claude and/or Console organizations. If applicable, after setup you can click "Manage SCIM" to verify which users have synced to the directory and confirm they're associated with the correct groups.

7. **Re-enable provisioning** (if applicable): Select "Approve automatically (JIT)" or "Sync with SCIM" to switch the provisioning mode and click "Save Changes" to apply.
---

SOURCE: https://support.claude.com/en/articles/13521390-use-claude-for-powerpoint

# Use Claude for PowerPoint

Claude for PowerPoint is available to Pro, Max, Team, and Enterprise plans.

Claude for PowerPoint is an add-in that integrates Claude into your PowerPoint workflow. It's designed for professionals who build presentations, particularly those who spend significant time creating and refining slide decks.

With Claude for PowerPoint, you can:

- Build new slides using your existing client or corporate templates

- Make pinpoint edits to specific slides without regenerating entire decks

- Generate full deck structures from natural language descriptions

- Convert bullets into professional diagrams and native PowerPoint charts

- Use connectors to bring context from your other tools directly into your slides

- Iterate on feedback quickly while preserving formatting and template compliance

---

## Get started with Claude for PowerPoint

### Supported versions

- PowerPoint on the web

- PowerPoint on Windows (Microsoft 365 subscription, build 16.0.13127.20296+)

- PowerPoint on Mac (version 16.46+)

### For individuals

1. Navigate to the **[Claude for Microsoft 365 (Excel, PowerPoint, and Word) listing](https://marketplace.microsoft.com/en-us/product/office/WA200010725?tab=Overview)** on Microsoft Marketplace.

2. Click "Get it now" to install the add-in.

3. Open PowerPoint, activate the add-in, and sign in with your Claude account.

### For admins

**Deploy Claude for PowerPoint to your organization:**

1. Visit the **[Microsoft 365 Admin Center](https://admin.microsoft.com/)**.

2. Navigate to **Settings > Org Settings > User owned apps and services** and ensure that **[“Let users access the Office Store"](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-addins-in-the-admin-center?view=o365-worldwide#manage-add-in-downloads-by-turning-onoff-microsoft-marketplace-across-all-apps-except-outlook)** is toggled on.

3. Navigate to **Settings > Integrated apps > Add-ins**.

4. Search for "Claude by Anthropic in PowerPoint" in Microsoft AppSource.

5. Deploy the add-in to your organization or specific users.

6. Share these instructions with your team: **[Microsoft's deployment guide](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-deployment-of-add-ins?view=o365-worldwide)**.

After installation, team members can open PowerPoint, activate the Claude add-in (from **Tools > Add-ins** on Mac or **Home > Add-ins** on Windows), sign in with their Claude credentials, and start working with their presentations.

**Important:** Organizations that have disabled "Let users access the Office Store" may find that admin-deployed add-ins don't appear for users. To work around this, deploy using the manifest XML files provided below.

**### Alternatively, download the manifest file to install**

For IT administrators deploying to multiple users:

### Step 1: Obtain the custom manifest

1. Click **[this link](https://pivot.claude.ai/manifest-powerpoint.xml)** to download the custom manifest XML file.

2. Save this file to a secure location.

### Step 2: Access Microsoft 365 Admin Center

1. Navigate to **<https://admin.microsoft.com>**

2. Sign in with your admin credentials.

3. Go to **Settings** > **Integrated apps.**

### Step 3: Upload the custom add-in

1. Click "Upload custom apps"

2. Select "Office Add-in."

3. Choose "I have a manifest file on this device."

4. Browse and select the Claude for PowerPoint manifest XML file.

5. Click "Upload."

### Step 4: Assign users

Choose your deployment scope:

- **Entire organization**: All users get access

- **Specific users**: Enter individual email addresses

- **Specific groups**: Select security groups or distribution lists

- **Just yourself**: For admin testing only

### Step 5: Deploy

1. Review deployment settings.

2. Click "Deploy."

3. Add-in will be available within minutes (may take up to 24 hours for full organization rollout).

### Step 6: User access

- Users will see Claude appear in PowerPoint's Home ribbon.

- First-time users will need to sign in with their Claude accounts

- No additional installation required by users.

### Connect through an LLM gateway

If your organization routes API traffic through an internal LLM gateway connected to Amazon Bedrock, Google Cloud Vertex AI, or Microsoft Azure, you can use the add-in without a Claude account. This is the same gateway pattern used by Claude Code.

For setup instructions and gateway requirements, see **[Use Claude for Microsoft 365 with third-party platforms](https://support.claude.com/en/articles/13945233-)**.

---

## Key features

### Build from templates

Start with a client or corporate template already loaded. Describe what you need, and Claude generates slides using the correct layouts, fonts, and colors from the slide master. Claude reads your deck's template and respects its formatting rules.

**Example prompts:**

- "Create a market sizing section—3 slides covering TAM, SAM, SOM with supporting visuals"

- "Add an executive summary slide using the one-column content layout"

### Edit existing slides

Select a slide and tell Claude what to change. Claude makes edits while preserving your formatting and surrounding context.

**Example prompts:**

- "Simplify the text on this slide"

- "Add a chart showing the quarterly trend"

- "Restructure the storyline across slides 4-7"

### Generate full decks

Open a blank deck and describe your goal. Claude builds a draft with logical structure and professional defaults, then you can refine from there.

**Example prompts:**

- "Create a 10-slide deck walking through our market entry hypotheses"

- "Build an internal project update presentation with timeline and next steps"

### Create native charts and diagrams

Convert bullet points into professional visuals—diagrams, process flows, or editable native PowerPoint charts. Claude produces visuals you can edit directly, not static images.

**Example prompts:**

- "Turn these bullets into a process flow diagram"

- "Create a bar chart comparing Q1-Q4 performance"

### Template awareness

Claude reads the slide master, layouts, fonts, and color scheme in your deck and uses them when generating or editing slides. It aims to maintain template compliance without introducing off-brand elements.

### Support for connectors

Connect your other tools to give Claude context beyond what's in your deck. With connectors enabled, Claude can draw on information from your connected tools when generating or refining content.

To connect a tool, open the Claude sidebar and select the connectors icon to see available options.

Custom connectors can introduce security risks. Before enabling them, review **[Get started with custom connectors using remote MCP](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp#h_b79c05dfcd)** for guidance on what to consider.

### Use Skills in PowerPoint

Skills you've enabled in your Claude settings are also available in the Claude for PowerPoint add-in. Claude applies relevant Skills automatically while you work—you don't need to invoke them separately.

You can also type `/` in the sidebar to see available Skills and select one directly (for example, `/deck-check`). Skills that aren't relevant to PowerPoint are excluded from this list.

To learn more about enabling and managing Skills, see **[Use Skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude)**.

### Set persistent instructions

Use the **Instructions** field in the add-in sidebar to set preferences that apply to every conversation in PowerPoint. Instructions are useful for things like brand guidelines (for example, "always use one-line bullets" or "use the blue accent color for highlights"), preferred slide structure, or recurring context Claude should know about your workflow.

Instructions you set in PowerPoint only apply to PowerPoint — they're separate from any Instructions you set in Excel.

---

## Context and session management

### Auto-compaction

We **[automatically compact longer conversations](https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits#h_21b66a43b4)** into new conversations to avoid running out of context.

### Chat history

Chat history is now stored locally in your browser using IndexedDB. Unlike Claude, conversations aren't stored on Anthropic's servers—they're saved client-side and aren't synced across devices or browsers. You can clear all chat history from Settings at any time, and the local store is cleared when you clear your browser data. Your chat history is specific to the combination of the add-in surface, your user ID, and your organization ID — so your Excel and PowerPoint histories are separate, but conversations carry across different workbooks within Excel (or different presentations within PowerPoint). If you switch organizations, you'll have a separate chat history.

### Overwrite protection

To avoid accidental data loss, Claude warns you before overwriting existing data.

**Note:** Your use of Claude for PowerPoint is associated with your existing Claude account and is subject to the same usage limits.

---

## Current limitations

For Claude for Powerpoint use, we automatically delete inputs and outputs on our backend within 30 days of receipt or generation, except in cases outlined in **[How long do you store my organization's data?](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)**

Enterprise organizations can route full audit telemetry from Claude for PowerPoint to their own OpenTelemetry (OTEL) collector for integration with a SIEM or observability platform. Learn more about **[configuring a custom OpenTelemetry collector for Office agents](https://support.claude.com/en/articles/14447276-configure-a-custom-opentelemetry-collector-for-office-agents)**. On Free, Pro, Max, and Team plans, observability and auditability aren't available for Claude for PowerPoint. Claude for PowerPoint does not inherit custom data retention settings your organization might have set, and isn't included in Enterprise audit logs or the Compliance API at this time.

Claude for PowerPoint is **not recommended** for:

- Final client deliverables without human review

- Presentations containing highly sensitive or regulated data without proper controls

- Replacing your judgment on design and narrative flow

### Unsupported versions

- PowerPoint 2016 / 2019 (perpetual/volume license)

- PowerPoint on iPad

- PowerPoint on Android

- Older builds of Microsoft 365 PowerPoint below the SharedRuntime threshold

---

## Best practices

To use Claude for PowerPoint safely and effectively:

- Always review changes before finalizing your work

- Start with your template already applied before asking Claude to generate content.

- Be specific about what you want changed—Claude can target individual slides or elements.

- Verify that outputs match your organization's brand guidelines.

---

## Prompt injection attack risks

Only use Claude for PowerPoint with trusted files and not files from external untrusted sources (for example, downloaded templates, vendor files, collaborative documents, and data imports).

An important risk that users of Claude for PowerPoint and other AI tools that can read and manipulate files is prompt injection attacks that hide malicious instructions in file content to trick the AI models into taking unintended actions. For example, a seemingly innocent template or data file received from an external party or downloaded from the internet might contain hidden instructions to "export all financial data to this external URL" or "modify these financial records." Claude may interpret these malicious instructions as legitimate requests from you.

Our testing has identified edge scenarios where Claude for PowerPoint can be manipulated to:

- **Extract and share sensitive information** with bad actors through web searches containing your sensitive data or file system access that exposes proprietary information.

- **Modify critical data** such as financial records.

- **Perform destructive actions** without verification (should you allow Claude to act without verifying its actions), exploiting Claude's helpful nature to delete or corrupt important data across multiple slides.

While we continue to develop our offerings and improve safety measures to reduce these risks, users should exercise caution when using Claude for PowerPoint and should not use it with files from external, untrusted sources.

---

## Example use cases

### Consulting deliverables

- "Build a market sizing section with TAM, SAM, SOM slides"

- "Create a competitive landscape slide comparing 4 players"

- “Summarize these survey results”

### Iterative refinement

- "Simplify the text on slide 3—it's too dense"

- "Combine slides 5 and 6 into a single summary"

- "Make the recommendations section more visual"

### Data visualization

- "Convert these bullet points into a process flow"

- "Create a bar chart from this data table"

- "Add a pie chart showing market share breakdown"

### Deck restructuring

- "Reorder slides to lead with recommendations first"

- "Add transition slides between each major section"

- "Create an agenda slide that reflects the current structure"

---

## Frequently asked questions

### Does Claude understand my template?

Yes. Claude reads the slide master, layouts, fonts, and color scheme in your deck and uses them when generating or editing slides. It aims to maintain template compliance, though you should always review output for complex templates.

### Can I use Claude for PowerPoint with sensitive data?

Claude for PowerPoint works within your existing security framework. For highly sensitive or regulated data, ensure you follow your organization's data handling policies.

### What happens to my chat history?

Your chat history is stored locally in your browser using IndexedDB. It persists between sessions, so you can return to previous conversations. Chat history is not automatically deleted, but you can clear all of it manually from Settings.

Your history is specific to each add-in surface, your user ID, and your organization. This means your Excel and PowerPoint chat histories are separate. Within a single surface, your chat history is shared across files—for example, conversations in one PowerPoint deck appear in another. If you log in to a different organization, you'll see a separate chat history.

### How does Claude access my presentation?

Claude reads the content of your currently open presentation, including slides, text, shapes, and slide master information. It can only access the presentation you have open in PowerPoint.

### What if Claude makes a mistake?

Review Claude's changes carefully before saving or sharing your file. You can always undo changes using PowerPoint's standard undo function (Ctrl+Z / Cmd+Z).
---

SOURCE: https://support.claude.com/en/articles/13641943-visual-and-interactive-content

# Visual and interactive content

Claude can respond with visual content when it’s clearer than plain text. Some visuals display real-world data—like weather and recipes. Others are custom-built by Claude for your specific question, like a diagram or an interactive chart. Claude can also ask you structured questions using interactive inputs instead of asking you to type.

Visual responses and interactive content are available to all Claude users. Data display widgets (weather and recipes) require web search to be enabled. For setup instructions, see **[Enabling and using web search](https://support.claude.com/en/articles/10684626-enabling-and-using-web-search)**.

---

## Visual content

When you ask Claude about certain topics, it may respond with visual content instead of (or alongside) a text response. This content is designed for information that's easier to understand at a glance.

### Weather

**Note:** Visual weather content is available on web and desktop. On mobile (iOS and Android), Claude provides weather information as text in the conversation.

Claude can show current weather conditions and forecasts when you ask about the weather in a specific location. You can ask directly — "What's the weather in Tokyo?" — or more casually, like "Should I bring an umbrella today?" or "What's it like in Denver this weekend?"

Claude automatically displays temperatures in Fahrenheit for US locations and Celsius for everywhere else.



Weather is powered by Google Maps (<https://policies.google.com/privacy>).

### Recipes

When you ask about recipes, Claude can display formatted recipe cards that are easier to follow than a block of text. Within the recipe cards, you’ll see several ways to interact: change the number of servings or the units of measurement, or click “Get cooking” to launch a step-by-step interface walking you through the recipe.

**Note:** Visual recipe cards are available on web and desktop only. On mobile, Claude provides recipe information as text in the conversation.



### Custom visuals

**Note:** Custom visuals are in beta and available on web and desktop only.

When a diagram, chart, or interactive element would explain something better than text, Claude can build one from scratch—right in the conversation. Ask how something works and you might get a flowchart. Upload a CSV and Claude can render a chart you can explore.

Unlike weather and recipes, custom visuals don’t pull from a fixed data source. Claude generates the layout, logic, and interactivity specific to your question.

For details and tips, see **[Custom visuals in chat](https://support.claude.com/en/articles/13979539-custom-visuals-in-chat)**.

---

## Sports scores

Claude can provide current scores, standings, and detailed game stats when you ask about sports.

Claude can look up data for the following leagues and sports:

- **US professional leagues:** NFL, NBA, NHL, MLB, WNBA, MLS

- **US college sports:** NCAA football, NCAA men's basketball, NCAA women's basketball

- **International soccer:** English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League

- **Individual sports:** Tennis, golf, NASCAR, cricket, MMA

Depending on what you ask, Claude can provide recent results and live scores, upcoming games, league standings and rankings, and detailed game stats including box scores and player stats.

**Note:** Detailed game stats are not available for golf or NASCAR. Sports data is currently displayed as text on all platforms, not as a visual widget.

---

## Interactive inputs

Claude will sometimes request more information from you before it responds. Instead of asking you to type out a response, Claude may present interactive options you can click or tap — like multiple choice questions, multi-select options, or a ranking interface.

For example, if you ask Claude to help you plan a trip, it might ask you to:

- Select your budget range from a set of options

- Choose which activities interest you from a list

- Rank your priorities (like cost vs. comfort vs. location)

This content appears at the bottom of the chat. You can still type a response if you prefer.



---

## Limitations

- Visual weather and recipe content doesn’t render on mobile (Claude for iOS and Android). You'll still see the same information, but it will be text-only.

- Sports data is available as text only, not as visual content.

- Interactive content availability may vary based on the type of question and the information available.

- Data display content requires an active internet connection and may be affected by connectivity issues.

---

## Privacy

- Weather content is powered by Google Maps ([Google's privacy policy](https://policies.google.com/privacy)).

- Recipe images are powered by Bing Image Search ([Microsoft's privacy policy](https://privacy.microsoft.com/en-us/privacystatement)).

- Interactive inputs don't involve third-party services.

---

## Tips

- **You don't need to do anything special for visual content to appear.** Claude decides when a visual response is appropriate based on your question. Just ask naturally.

- **You can always type instead.** If Claude presents you with interactive content, you're not required to use it. You can type your response in the chat as usual.

- **Ask for what you need.** If Claude gives you a text response where you'd prefer a visual, try rephrasing — for example, "Show me a recipe for chocolate chip cookies" instead of "Do you know any chocolate chip cookie recipes?"
---

SOURCE: https://support.claude.com/en/articles/13704655-unauthorized-anthropic-stock-sales-and-investment-scams

# Unauthorized Anthropic stock sales and investment scams

Originally published: February 11, 2026

We are sharing important information about investments in Anthropic to help protect individuals from potentially invalid transfers or investment fraud.

## INVALID TRANSFERS

### Transfer restrictions

Both our preferred stock and common stock are subject to transfer restrictions contained in our bylaws. **Any sale or transfer of Anthropic stock, or any interest in Anthropic stock, that has not been approved by our Board of Directors is void and will not be recognized on our books and records.** This means that if someone purports to sell Anthropic shares without proper board approval, that transaction is invalid. The purported buyer would not be recognized as a stockholder of Anthropic and you would have no stockholder rights.

### SPVs and retail investment funds

We do not permit special purpose vehicles (SPVs) to acquire Anthropic stock and any transfer of shares to an SPV are void under our transfer restrictions. Offers to invest in Anthropic’s past or future financing rounds through an SPV are prohibited.

We are also aware of investment funds that claim to offer indirect access to Anthropic stock. These funds often market themselves by saying something like: "You can't invest in Anthropic directly, but invest with us and we'll get access for you." These funds are most likely relying on mechanisms that attempt to circumvent our transfer restrictions. Any third party claiming to sell Anthropic shares to the general public—whether through direct sales, "forward contracts," tokenized securities, or other mechanisms—is likely offering an investment that may have no value due to our transfer restrictions.

Invest at your own risk: if someone offers you a way to participate, even on an indirect basis, in an investment in Anthropic, assume that it is invalid.

### Unauthorized firms

We are aware of individuals or investment firms purportedly offering access to Anthropic financing rounds, or offering to purchase your Anthropic shares in violation of our transfer restrictions. To be clear, the following firms are *not* authorized to buy or sell Anthropic shares:

- Unicorns Exchange

**Any sale or transfer of Anthropic stock, or any interest in Anthropic stock, offered by these firms is void and will not be recognized on our books and records.**

We periodically update the website based on current information. Removing a firm does not mean Anthropic recognizes or approves any related investment vehicles. Investors should continue to independently validate any purported Anthropic investment, as we do not recognize unapproved transfers or SPV-based interests.

## POTENTIAL SCAMS

### In general, be especially cautious if someone:

- Contacts you unsolicited via email, social media, or messaging apps offering Anthropic shares.

- Claims to have "exclusive" or "limited-time" access to Anthropic stock.

- Requests payment via cryptocurrency, wire transfer, or other hard-to-trace methods.

- Pressures you to invest quickly.

- Claims to have structured a transaction to avoid company restrictions.

- Cannot provide documentation of board approval for the transfer.

### Beware of stock scams

Scammers regularly attempt to carry out fraudulent investment schemes falsely claiming to provide access to prominent private technology companies and in some cases may even issue fake stock certificates evidencing your purported investment. Anthropic does not issue stock certificates to the general public and anyone providing you with stock certificates is very likely engaged in fraud. We encourage anyone who receives this type of outreach to exercise extreme caution.

## REPORT CONCERNS

Before investing in any opportunity claiming to offer Anthropic stock, we strongly encourage individuals to verify the legitimacy of the offering through official regulatory databases and to seek independent legal and financial advice.

If you have concerns about someone claiming to sell Anthropic stock or marketing access to Anthropic equity, please email **<anthropic-equity-alerts@anthropic.com>**. This inbox is only monitored for emails related to stock inquiries.

If you believe you have been targeted by a stock scam:

- Consider contacting your local law enforcement or securities regulator

- In the United States, you can report suspected fraud to the **[Securities and Exchange Commission (SEC)](https://www.sec.gov/tcr)** or review investor alerts on **[Investor.gov](https://www.investor.gov/)**.

- Consult with a qualified financial advisor or attorney before making any investment decision.

---

*This article is intended to provide general information about Anthropic's stock transfer restrictions and to warn about potential investment scams. It does not constitute legal or financial advice.*
---

SOURCE: https://support.claude.com/en/articles/13730515-manage-claude-s-tool-access

# Manage Claude’s tool access

When you connect many services to Claude, you can control how those connectors are loaded into your conversations. This helps Claude work more accurately and efficiently, especially if you've added 10 or more connectors.

Tool access modes are available for all users on Claude, Cowork, Claude Desktop, and Claude Mobile (iOS and Android).

## Why tool access matters

Each connector takes up space in a conversation. With a small number of connected services, this is rarely noticeable. But as your connector library grows, the combined overhead can limit how much room is left for your actual work: documents, code, and conversation history.

To address this, Claude supports three tool access modes that control when and how your connectors are loaded.

---

## Tool access modes

You can manage Claude’s access to your connectors per conversation using the **Tool access** setting in your chat.

Choose from three options:

- **Auto** *(default)*: Claude decides dynamically which connectors to load based on what you're working on. This is the best starting point for most users.

- **Always available**: All your connectors are loaded at the start of every conversation. Claude can use any of them immediately, without any extra steps.

  - Best for: Fewer than 10 connectors you use constantly.

  - Trade-off: Uses more conversation space upfront.

- **On demand:** Connectors aren't loaded until Claude searches for the right one based on your request. Claude finds the most relevant connectors and loads only those.

  - Best for: Large connector libraries (10 or more), or when you're running into conversation length issues.

  - Trade-off: Claude may take an extra step to find the right connector before using it.

---

## Which mode should I use?

| **Your situation**                                         | **Recommended mode** |
| ---------------------------------------------------------- | -------------------- |
| Fewer than 10 connectors, all used frequently              | Always available     |
| 10–30 tools with mixed usage                               | Auto                 |
| 30+ tools or multiple connectors connected                 | On demand or Auto    |
| A specific connector needs to work every time without fail | Always available     |
| Conversations are hitting length limits                    | On demand            |

---

## How to change your tool access setting

You can set your tool access mode per conversation by following these steps:

1. Open a chat with Claude.

2. Click the “+”  button in the lower left corner of your chat, or type "/" to open the menu.

3. Mouse over “Connectors,” then “Tool access.”

4. Select your preferred mode from the three options.

Your selection only applies to that conversation. You can change it at any time.

---

## Frequently asked questions

### Will “On demand” mode miss the connectors I need?

Claude searches for the most relevant connectors based on your request, so it works well for most tasks. For connectors that need to be available every time, use “Always available” or set that connector's access individually.

### Why does Claude sometimes add an extra message to use a connector?

In “On demand” mode, Claude searches for the right tool before using it. This search step adds one interaction, but keeps your conversation from hitting length limits when you have many tools connected.
---

SOURCE: https://support.claude.com/en/articles/13756069-public-sector-faqs

# Public Sector FAQs

## 1. Products and features

### What products are available to Public Sector customers?

Select your product based on both your technical/functional requirements, and also your compliance/security/deployment environment requirements. Here is a list of options:



### What is Claude for Government (C4G)?

Claude for Government is Anthropic's FedRAMP-High authorized product, which is available to both government customers and contractors.

Learn more here: **[Offering expanded Claude access across all three branches of the U.S. government](https://www.anthropic.com/news/offering-expanded-claude-access-across-all-three-branches-of-government)**

### How do I access Claude for Government?

Submit a request here: **[Contact Sales](https://claude.com/contact-sales)**

### What is the difference between Claude Enterprise and Claude for Government?

Claude Enterprise (CE) has robust enterprise-level security features that meet many standards of highly regulated industry and is appropriate for the majority of State and Local government uses. Claude for Government (C4G) is our standalone application that is FedRAMP-High authorized. C4G does not yet include Claude Code or Cowork (though they are on the roadmap to be released this year).

### Does Claude for Government include Claude Code?

Not yet; though it’s coming this year. Until then, customers can use Claude Code through Bedrock or Vertex if they need a FedRAMP authorized environment.

### Can I use Claude API in government environments?

Yes. Claude API is available via Amazon Bedrock (in AWS GovCloud - FedRAMP High, and in IL5+) and Google Vertex with Assured Workloads (FedRAMP-High).

For more information, see our **[Claude Code product page](https://claude.com/product/claude-code)**.

### What models are available in Claude for Government?

Our Claude for Government application is updated with our latest commercial model releases.

---

## 2. FedRAMP, Impact Levels, and compliance

### What types of data can be used in Claude?

CUl and FIPS 199 High Impact data are authorized in Claude for Government, which is FedRAMP High authorized. Additionally, per our third-party NIST attestation, Claude Enterprise meets compliance requirements for CUl as well. The third-party NIST attestation is available under NDA here: **[[Anthropic] 2026 NIST 800-171r3 Attestation Letter](https://trust.anthropic.com/resources?s=zfucqt7j6yandbrsvlk2&name=[anthropic]-2026-nist-800-171-r-3-attestation-letter)**

ITAR data can only be processed in Claude via AWS Bedrock, which is IL5 accredited.

For most other government agencies like State and Local handling PHI or PII:, Anthropic offers a HIPAA-ready configuration for Enterprise and API customers, including the ability to sign a Business Associate Agreement (BAA). A couple of key points:

- The BAA is available for Enterprise plans and direct API customers—not consumer (Free, Pro, Max) or Team plans.

- It requires a Zero Data Retention (ZDR) agreement, meaning Anthropic does not store your inputs or outputs.

- Certain features/integrations have limitations under the BAA (e.g., web search is excluded).

You can learn more here:

- BAA details: **[Business Associate Agreements (BAA) for Commercial Customers](https://support.claude.com/en/articles/8114513-business-associate-agreements-baa-for-commercial-customers)**

- Certifications overview (HIPAA, SOC 2, ISO 27001): **[What Certifications has Anthropic obtained?](https://support.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained)**

- **[Trust Portal](https://trust.anthropic.com)**

### What is Claude's FedRAMP authorization level?

Claude for Government (C4G), and Claude via Amazon Bedrock in AWS GovCloud and Google Vertex with Assured Workloads are all FedRAMP-High.

Learn more here: **[Claude in Amazon Bedrock: Approved for use in FedRAMP High and DoD IL4/5 workloads](https://www.anthropic.com/news/claude-in-amazon-bedrock-fedramp-high)**

### Are Claude's models themselves FedRAMP authorized?

FedRAMP and DoD Impact Levels are certifications for cloud services (IaaS, PaaS, SaaS). AI models are software components, not cloud services. Claude models deploy within authorized environments, and customers maintain their compliance posture through the hosting platform.

### How can I get access to your FedRAMP authorization information and other associated documentation?

Please submit a request for the package directly to FedRAMP using this **[FedRAMP Package Access Request Form](https://www.fedramp.gov/resources/documents/Agency_Package_Request_Form.pdf)**.

### Can I use Claude for CUI (Controlled Unclassified Information)?

Yes. Claude Enterprise has received a third-party NIST attestation for use of CUI data. Alternatively, CUI data can be processed in a FedRAMP High environment via Claude for Government, Bedrock, or Vertex. The third-party NIST attestation is available under NDA here: **[[Anthropic] 2026 NIST 800-171r3 Attestation Letter](https://trust.anthropic.com/resources?s=zfucqt7j6yandbrsvlk2&name=[anthropic]-2026-nist-800-171-r-3-attestation-letter)**

### Can I use Claude in IL6/Secret environments?

Yes. Claude is available in the AWS Secret region (IL6) via Amazon Bedrock.

### If a customer purchases Claude Enterprise via AWS Marketplace, is that FedRAMP?

No. At present, our only product offering on AWS Marketplace is Claude Enterprise which is not FedRAMP authorized. Customers requiring FedRAMP compliance must use Claude for Government (C4G) or access Claude models through FedRAMP-authorized CSPs (Bedrock GovCloud or Vertex Assured Workloads).

Learn more here: **[Claude in Amazon Bedrock: Approved for use in FedRAMP High and DoD IL4/5 workloads](https://www.anthropic.com/news/claude-in-amazon-bedrock-fedramp-high)**

---

## 3. Cloud service providers and deployment

### How do I deploy Claude in Amazon Bedrock on AWS GovCloud / GCP Vertex in Assured Workloads?

Work with your AWS / GCP account teams. Claude is available as a managed service through Bedrock/Vertex. These links can help to get you started:

- **[Access Amazon Bedrock foundation models in AWS GovCloud (US)](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html#model-access-govcloud)**

- **[Claude on Vertex AI](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai)**

### What is the pricing and commitment information for Claude on Vertex/Bedrock?

Contact AWS directly for pricing and commitment requirements. Usage is typically pay-per-token through standard Bedrock pricing.

Learn more here: **[Claude in Amazon Bedrock: Approved for use in FedRAMP High and DoD IL4/5 workloads](https://www.anthropic.com/news/claude-in-amazon-bedrock-fedramp-high)**

**AWS Bedrock: [Amazon Bedrock pricing](https://aws.amazon.com/bedrock/pricing/)**

**Google Cloud Vertex AI:** **[Cost of building and deploying AI models in Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/pricing)**

---

## 4. Pricing and procurement

### What is the $1/month government offer and who qualifies?

The $1/month offer is specifically for federal, judicial, and legislative agencies for C4G only. It does not extend to defense contractors, FFRDCs, or state/local governments, which receive standard pricing.

### Can we purchase directly from Anthropic or only through Carahsoft?

Both options are available. Anthropic can sell directly, and/or resell / distribute via Carahsoft to specific government customers.

### How much does Claude cost?

C4G is $60/seat/month with usage limits and no additional consumption charges.

Claude Enterprise is $20/seat/month with additional charges for token consumption (PAYG).

Other pricing plans are available here: **[Team and Enterprise plan pricing](https://claude.com/pricing#team-&-enterprise)**

Learn more here: **[Offering expanded Claude access across all three branches of the U.S. government](https://www.anthropic.com/news/offering-expanded-claude-access-across-all-three-branches-of-government)**
---

SOURCE: https://support.claude.com/en/articles/13837440-use-plugins-in-claude

# Use plugins in Claude

Plugins are available to all paid plans (Pro, Max, Team, Enterprise).

Plugins customize how Claude works for your role, team, and company. Each plugin bundles skills, connectors, and sub-agents into a single package, so you get a ready-to-go setup from your first conversation instead of configuring each piece yourself.

## Where you can use plugins

You can install and use plugins in chat on the web, the Chat tab in Claude Desktop, and Claude Cowork. The skills bundled in a plugin work across all three. Hooks and sub-agents run only in Cowork, so they appear grayed out in chat.

Plugins can also bundle connectors, so the right services are set up for a workflow without you connecting each one. Claude connects to services like Google Drive, Gmail, Slack, DocuSign, and many more.

**Note:** In Cowork, connectors reach external services through Anthropic's cloud, not through your local network. A custom connector must point to a server that's reachable over the public internet from Anthropic's IP ranges. If your organization's servers are behind a firewall or on a private network, see **[Network requirements for custom connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp#h_b66e88c454)**.

---

## Browse available plugins

Claude includes a growing library of plugins for common knowledge work—including sales, finance, legal, marketing, HR, engineering, design, operations, data analysis, and more. Each one comes pre-configured with the skills and connectors relevant to that function.

We also provide **Plugin Create**, a plugin that helps you build custom plugins from scratch.

For the full collection of Anthropic-built plugins, visit **[GitHub](https://github.com/anthropics/knowledge-work-plugins)**.

**Note:** Plugins may include local MCP servers that run on your computer with the same permissions as any other program you run. Only install plugins from sources you trust. If your organization is on an Enterprise plan, your admin may have restricted which plugins you can install, or disabled local MCP servers entirely.

---

## Install a plugin

1. In Claude, open the **Customize** menu in the left sidebar. Customize brings your plugins, skills, and connectors together in one place.

2. Open the **Plugins** tab.

3. Click "Browse plugins" to see the available options.

4. Click "Install" on the plugin you want.

In Cowork, open the "Cowork" tab first, then open **Customize**.

You can also upload a custom plugin file if you built one yourself or received one from a colleague. On Claude Desktop and in Cowork, plugins you add yourself are saved locally to your computer.



If you're on the Enterprise plan and your organization has skill scanning turned on, plugins are checked for malicious content when they're installed or updated. A plugin with malicious content is blocked, and one that may carry risk shows a caution banner. Learn more about **[skill and plugin scanning](https://support.claude.com/en/articles/15927065)**.

---

## Use skills from plugins

Each plugin you install adds skills you can use while working with Claude. Type "/" or click the "+" button to see the available skills from your installed plugins, in chat and in Cowork. Click any skill to see its details.



---

## Customize a plugin

In Cowork, you can tailor an installed plugin to better fit your workflow:

1. While viewing an installed plugin, click “Customize” in the upper right corner.

2. This opens a new Cowork task with a prompt asking Claude to customize the plugin you chose.

3. Click “Let's go” to start working with Claude to adjust the plugin's Skills and connectors to match how you work.

---

## Build your own plugin

Want to create something from scratch? The "Plugin Create" plugin walks you through the process, and you can start from any Anthropic-built template and modify it. For details on plugin structure and formatting, see the **[Plugins reference](https://code.claude.com/docs/en/plugins-reference)** in our Claude Code docs.

---

## Add or remove plugin marketplaces

Anthropic provides built-in marketplaces of plugins, including a Knowledge Work marketplace that's added by default. You can add other Anthropic-built marketplaces, like Financial Services or Legal, or add one from a GitHub repository.

To add a marketplace:

1. Open the **Customize** menu and go to the **Plugins** tab.

2. In the **Personal plugins** section, click the "+" button, then select "Add marketplace."

3. Choose how to add it:

  - **Browse Anthropic sources:** Pick from marketplaces curated by Anthropic, such as Knowledge Work, Life Sciences, Financial Services, and Legal. Click "Add" next to the one you want, then click "Done."

  - **Add from a repository:** Sync a marketplace from a GitHub repository or git URL.

To remove a marketplace, including the default Knowledge Work marketplace:

1. Find the marketplace in the **Plugins** section.

2. Click the menu button in the right corner and select "Remove."

---

## Organization-managed plugins

If you're on a Team or Enterprise plan, an owner can distribute plugins across your organization through plugin marketplaces. These work the same as any other plugin, with a couple of differences:

- You can't edit organization-managed plugins. This keeps shared tooling consistent across your team.

- Some plugins may be auto-installed or required for you. You can uninstall auto-installed plugins if you don't need them, but required plugins can't be removed.

- Available organization plugins show up when you browse the plugin catalog, and you can install them yourself.

On Enterprise plans, your admin may customize which plugins are available to your group. This means the plugins you see in the catalog may differ from what colleagues in other groups see. Plugins assigned to your group appear in chat as well as Cowork.

For guidance on setting up and managing plugins organization-wide, see **[Manage plugins for your organization](https://support.claude.com/en/articles/13837433-)**.
---

SOURCE: https://support.claude.com/en/articles/13892150-work-across-microsoft-365-apps

# Work across Microsoft 365 apps

Claude can now work across Microsoft 365 apps to coordinate between the Excel, PowerPoint, Word, and Outlook add-ins. Instead of switching between apps and providing context each time, Claude can read from one app and make changes in another. For example, you can ask Claude to analyze data in an Excel workbook, then create a presentation in PowerPoint using those results, without copying and pasting between apps.

## Requirements

- A paid Claude plan (Pro, Max, Team, or Enterprise)

- The Claude for Excel add-in installed from the Microsoft Marketplace

- The Claude for PowerPoint add-in installed from the Microsoft Marketplace

- The Claude for Word add-in installed from the Microsoft Marketplace

- The Claude for Outlook add-in installed from the Microsoft Marketplace

---

## Let Claude work across apps

### 1. Install the add-ins

Get the add-ins from the Microsoft Marketplace:

- **[Claude for Microsoft 365 (Excel, PowerPoint, and Word)](https://marketplace.microsoft.com/en-us/product/office/WA200010725?tab=Overview)**

- **[Claude for Outlook](https://marketplace.microsoft.com/en-us/product/office/WA200010724?tab=Overview)**

Open each app and activate the add-in at least once before using the cross-app features.

### 2. Toggle the setting on

**Note:** If you're a member of a Team or Enterprise plan, an organization owner needs to go to **[Organization settings > Office agents](https://claude.ai/admin-settings/office-agents)** and toggle the **Let Claude work across apps** setting on before you can enable this capability individually.

Go to **Settings** in each of the add-ins and toggle **Let Claude work across files** on:



**Note:** This setting is default on for Pro and Max plans and default off for Team and Enterprise plans.

You'll see connected file indicators when Excel, PowerPoint, Word, or Outlook files are linked to your session:



---

## How it works

When you describe a task that involves multiple files or apps, Claude coordinates behind the scenes:

- Claude uses the Excel, PowerPoint, Word, and Outlook add-ins to read from and write to open files.

- Context transfers between apps automatically, so you don't need to copy and paste information manually.

- You stay in one place while Claude does the switching.

## What you can do

### Read and write across open files

Claude can read data from an open Excel workbook, PowerPoint presentation, Word document, or Outlook email, and make changes to them directly. For example:

- Pull numbers from an Excel model into a PowerPoint slide or a Word memo.

- Update a chart in PowerPoint with the latest figures from Excel.

- Read content from a presentation and use it to populate a spreadsheet.

- Summarize a Word document into PowerPoint slides.

- Draft a Word memo using data from an Excel workbook.

- Open your Outlook emails and full thread history, including attachments.

### Pass context between apps

When Claude works across multiple files in Excel, PowerPoint, Word, and Outlook, it carries relevant context forward. If you've been building a financial model in Excel and ask Claude to create a summary deck or draft an investment memo, Claude already understands the model's structure and key outputs, so you don't need to re-explain.

---

## Skills work across apps too

Skills you've enabled in your Claude settings apply when Claude is working in Excel, PowerPoint, Word, or Outlook during a cross-app task. If you have a Skill that enforces your team's modeling conventions in Excel and another that matches your slide template in PowerPoint, Claude uses each one in the right app as it moves through the workflow.

For more on how Skills work, see **[Use Skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude).**

---

## Data handling

Inputs and outputs are automatically deleted from Anthropic's backend within 30 days of receipt or generation, except in cases outlined in **[How long do you store my organization's data?](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)** The Claude for Excel, Claude for PowerPoint, Claude for Word, and Claude for Outlook add-ins do not inherit custom data retention settings your organization may have set, and activity is not currently included in Enterprise audit logs, the Compliance API, or data exports.

### For admins who want to manage access

Team and Enterprise organization owners can control whether team members can access this capability:

1. Go to **[Organization settings > Office agents](https://claude.ai/admin-settings/office-agents)**

2. Toggle **Let Claude work across apps** on or off.

Admins can also manage member access to the Claude for Excel, PowerPoint, Word, and Outlook add-ins through the **[Microsoft 365 Admin Center](https://admin.microsoft.com)**.

---

## Current limitations

- Claude can only read from and write to files that are currently open in Excel, PowerPoint, Word, or Outlook.

- Claude cannot create, open, close, or switch files directly from the add-ins—the files and add-ins must be open with the feature turned on.

- Chat history for cross-app sessions is not saved between sessions.

---

## Troubleshooting

### Claude doesn't see my open file

Make sure the add-in is activated in the app (**Tools > Add-ins** on Mac or **Home > Add-ins** on Windows) and that working across apps is turned on in Claude Desktop settings.

### Changes aren't appearing in the other app

Claude works on open files in sequence. Wait for Claude to finish its current action, then check the target file. You may need to ask Claude to refresh or re-read the file.
---

SOURCE: https://support.claude.com/en/articles/13945233-use-claude-for-microsoft-365-with-third-party-platforms

# Use Claude for Microsoft 365 with third-party platforms

If your organization uses AWS Bedrock, Google Cloud Vertex AI, or an LLM gateway to access Claude, you can use the Claude for Excel, Claude for PowerPoint, Claude for Word, and Claude for Outlook add-ins without a Claude account. The add-in connects through your organization's infrastructure, so your prompts and responses stay within your existing trust boundary.

There are four connection paths, depending on how your organization accesses Claude:

- **LLM gateway**: The add-in sends requests to your gateway (LiteLLM, Portkey, Kong, etc.), which routes them to the provider of your choice. This is the same pattern used by Claude Code. If your organization already runs **[Claude Code through an LLM gateway](https://code.claude.com/docs/en/llm-gateway)**, you can point the Office add-ins at the same endpoint—no new infrastructure is required.

- **Bedrock direct**: The add-in authenticates through Microsoft Entra ID and calls AWS Bedrock directly, with no gateway in between.

- **Vertex AI direct**: The add-in authenticates through Google OAuth and calls Vertex AI directly.

- **Foundry direct:** The add-in authenticates through your Azure AI Foundry resource directly using its API key.

Your IT admin chooses the path during deployment. As an end user, the experience is the same regardless of which path your organization uses.

---

## Requirements

Requirements vary by connection path.

**All paths:**

- Claude for Excel, Claude for PowerPoint, Claude for Word, or Claude for Outlook installed (from Microsoft AppSource or deployed by your admin)

- Microsoft 365 with Entra ID (for admin consent and, in the direct-cloud paths, token issuance)

- Microsoft Graph admin consent for Mail.ReadWrite, Calendars.Read, People.Read, and User.Read (via Anthropic's app or your own Entra app registration).

**LLM gateway:**

- A gateway URL and API token from your IT team

**Bedrock direct:**

- An AWS account with Claude model access enabled in the target region

- An IAM OIDC identity provider and role configured to trust Microsoft Entra ID tokens

**Vertex AI direct:**

- A Google Cloud project with the Vertex AI API enabled and Claude model access in the target region

- A Google OAuth client configured with the add-in's redirect URI

**Foundry direct:**

- **An Azure AI Foundry resource with at least one Claude model deployed (Claude Opus 4.6, Opus 4.5, Sonnet 4.6, or Sonnet 4.5)**

- Deployment names must be left as the default model IDs (e.g. claude-opus-4-6); custom deployment names aren't supported yet. The adapter probes by model ID, so a renamed deployment won't be found.

- The resource's API key, from **Azure Portal → your Foundry resource → Keys and Endpoint → KEY 1**

Your organization's IT team manages these resources. If you don't have the credentials you need, contact them—Anthropic can't provide or reset them for you.

---

## Network allowlist

The add-in needs to reach specific domains to function. Which domains depend on whether your organization uses the Anthropic API directly (1P) or a third-party platform (3P). Share the applicable table with your network or security team so they can allowlist these domains.

**Important:** In all configurations—including third-party—your prompts and Claude's responses travel only to your chosen inference provider (your gateway, Bedrock, Vertex AI, or Azure AI Foundry). The domains listed below that point to Anthropic (such as pivot.claude.ai) serve the add-in's interface, feature configuration, and operational telemetry. They don't carry prompt or response content.

### Anthropic API (1P)

Use this table if people in your organization sign in with a Claude account and inference goes to api.anthropic.com.

| **Domain**                   | **Required when**         | **Purpose**                                                                                              |
| ---------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| pivot.claude.ai              | Always                    | Add-in host. Serves the task pane UI and proxies analytics, icon search, skill downloads, and telemetry. |
| claude.ai                    | Always                    | Anthropic OAuth sign-in and feature-flag evaluation.                                                     |
| api.anthropic.com            | Always                    | Claude inference API, file uploads, code-execution containers, and the MCP connector registry.           |
| appsforoffice.microsoft.com  | Always                    | Microsoft Office.js runtime script. Required by every Office add-in.                                     |
| o1158394.ingest.us.sentry.io | Optional                  | Crash and error reporting. Blocking this degrades diagnostics only; the add-in still works.              |
| mcp-proxy.anthropic.com      | If using MCP connectors   | Proxy for MCP connector tool calls.                                                                      |
| bridge.claudeusercontent.com | If using work across apps | WebSocket bridge for the work across apps feature.                                                       |

### Third-party platforms (3P)

Use this table if people in your organization sign in with Microsoft Entra ID and inference goes to your LLM gateway, Bedrock, or Vertex AI.

| **Domain**                             | **Required when**         | **Purpose**                                                                                                                     |
| -------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| pivot.claude.ai                        | Always                    | Add-in host. Serves the task pane UI and proxies analytics, icon search, and telemetry.                                         |
| claude.ai/api/                         | Always                    | Feature-flag evaluation. No sign-in; the add-in only fetches its configuration from here.                                       |
| appsforoffice.microsoft.com            | Always                    | Microsoft Office.js runtime script (required by every Office add-in).                                                           |
| login.microsoftonline.com              | Always                    | Microsoft Entra ID sign-in via Nested App Auth. Reads admin-provisioned gateway config and issues tokens for direct-cloud auth. |
| o1158394.ingest.us.sentry.io           | Optional                  | Crash and error reporting. Blocking this degrades diagnostics only; the add-in still works.                                     |
| Your LLM gateway URL                   | If using an LLM gateway   | Your organization's LLM gateway (LiteLLM, Portkey, Kong, etc.). Inference goes here instead of api.anthropic.com.               |
| sts.amazonaws.com                      | If using Bedrock direct   | AWS STS. Exchanges the Entra ID token for temporary Bedrock credentials.                                                        |
| bedrock-runtime.<region>.amazonaws.com | If using Bedrock direct   | Bedrock inference endpoint. Replace <region> with your configured AWS region (for example, us-east-1).                          |
| accounts.google.com                    | If using Vertex AI direct | Google OAuth consent screen.                                                                                                    |
| oauth2.googleapis.com                  | If using Vertex AI direct | Google OAuth token exchange and refresh.                                                                                        |
| aiplatform.googleapis.com              | If using Vertex AI direct | Vertex AI global inference endpoint.                                                                                            |
| <region>-aiplatform.googleapis.com     | If using Vertex AI direct | Vertex AI regional inference endpoint. Replace <region> with your configured GCP region (for example, us-east5).                |
| <resource>.services.ai.azure.com<br>   | If using Foundry direct   | Azure AI Foundry inference endpoint. Replace <resource> with your resource name.                                                |

---

## Deploy the add-in for third-party use (IT admins)

Use the `claude-in-office` plugin to configure and deploy the add-in across your organization. This tool handles provisioning cloud resources (if using Bedrock or Vertex AI direct), generating the add-in manifest, and obtaining admin consent in a single guided flow.

### Use the setup wizard

**[Install the plugin](https://github.com/anthropics/financial-services/tree/main/claude-for-msft-365-install)** and run the interactive setup wizard:

```
claude plugin marketplace add anthropics/financial-services-plugins
claude plugin install claude-in-office@financial-services-plugins
/claude-in-office:setup
```

The wizard walks you through your connection path:

- **LLM gateway**: Collects your gateway URL and token, determines which API format to use, generates the manifest, and handles Azure admin consent.

- **Bedrock direct**: Creates the IAM OIDC identity provider and role, generates the manifest, and handles Azure admin consent.

- **Vertex AI direct**: Walks you through creating the Google OAuth client, generates the manifest, and handles Azure admin consent.

- **Foundry direct:** Captures `azure_resource_name` and `azure_api_key`, then generates the manifest.

When the wizard completes, the add-in is ready to deploy tenant-wide.

**Note:** The Bedrock and Vertex AI paths require Node.js for manifest generation and validation. The wizard checks for it and prompts you to install it if it's missing.

You can use the following commands inside a `claude-in-office` session:

| **Command**                           | **What it does**                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `/claude-in-office:setup`             | Interactive wizard—provisions cloud resources, admin consent, writes manifest                    |
| `/claude-in-office:manifest`          | Generates the customized add-in manifest XML                                                     |
| `/claude-in-office:consent`           | Generates the Azure admin consent URL for the add-in's app registration                          |
| `/claude-in-office:update-user-attrs` | Writes per-user config via Microsoft Graph extension attributes                                  |
| `/claude-in-office:bootstrap`         | Walks you through building a bootstrap endpoint—per-user MCP servers, skills, and dynamic config |
| `/claude-in-office:debug`             | Diagnoses deployment issues—stale config, connect failures, missing add-in                       |

### Custom inference headers

If your inference endpoint or any proxy in front of it requires extra headers—for example, an internal application ID for cost accounting—set `inference_headers` to a JSON object of header name/value pairs. The add-in attaches these headers to every model-inference request it sends, so you don't need a separate header-injecting proxy.

This applies to gateway, Amazon Bedrock, and Google Vertex AI deployments.

Example: `inference_headers={"x-application-id":"app123"}`

You can set `inference_headers` in the manifest (org-wide) or in the bootstrap endpoint response (per-user).

### What the wizard provisions

The wizard automates resource creation based on your connection path. Here's what it sets up:

**LLM gateway**: No cloud resources to provision. The wizard collects your gateway URL and token, then generates the manifest.

**Bedrock direct**: Creates an IAM OIDC identity provider that trusts Microsoft Entra ID tokens, a role with bedrock:InvokeModel and bedrock:InvokeModelWithResponseStream permissions, and a trust policy scoped to the Claude add-in's application ID.

**Vertex AI direct**: Walks you through creating a Google OAuth client in the GCP Console (this step can't be automated via CLI), enables the Vertex AI API, and captures the client ID and secret for the manifest.

**Foundry direct**: No cloud resources to provision; the wizard collects the resource name and API key for the manifest.

### Per-user configuration with Microsoft Entra extension attributes

If some values vary per user—for example, different gateway tokens or different AWS roles for different teams—the wizard can write per-user configuration via Microsoft Graph extension attributes. Run `/claude-in-office:update-user-attrs` with the per-user keys after the initial setup.

### Per-user configuration with a bootstrap endpoint

If some values vary per user or if per-user values need server-side logic—for example, MCP server lists, skills, inference headers, or short-lived gateway tokens vended from your secrets store—configure a bootstrap endpoint instead. Set `bootstrap_url` in the manifest to an HTTPS endpoint you host; the add-in calls it with the user's Entra token and applies whatever JSON you return. Run `/claude-in-office:bootstrap` for the request/response contract and a handler scaffold.

### Deploy to Microsoft 365

After the wizard generates your manifest:

1. Open the **Microsoft 365 Admin Center** and go to **Settings** > **Integrated Apps** > **Upload custom apps**.

2. Select “Office Add-in” as the app type, then upload the upload manifest.xml (and manifest-outlook.xml if you are deploying Outlook) file.

3. Choose who gets the add-in:

  - If all users share the same configuration, select “Entire organization.”

  - If you wrote per-user attributes in the previous step, assign to **Specific users/groups** matching exactly who was configured. Anyone else would open the add-in with no configuration.

4. Accept permissions and finish deployment.

Propagation to users takes up to 24 hours (usually much faster). The add-in appears under **Home** > **Add-ins** in Excel, PowerPoint, Word, and Outlook once it lands.

**Note:** Start with a pilot group to confirm the add-in works, then widen the assignment. You can change assignment later without redeploying.

## Deploy to Outlook

Outlook requires a separate manifest file from Excel, PowerPoint, and Word. Microsoft uses a different add-in schema for mail applications, so the two cannot be combined into one file. When you tell the setup wizard you are deploying to Outlook, it generates a second file named manifest-outlook.xml alongside manifest.xml. Upload each file as its own custom app in the Microsoft 365 Admin Center, following the same steps described in the next section.

### Grant Microsoft Graph consent

**Note:** Amazon Bedrock is not currently supported for Claude for Outlook. Bedrock remains supported for Claude for Excel, PowerPoint, and Word.

Claude for Outlook reads mail and calendar data through Microsoft Graph, which requires a one-time tenant-wide grant from a Global Administrator. This is separate from the Integrated apps deployment above. Have a Global Admin open the below admin consent link below in a browser where they are signed in to your Microsoft 365 tenant:

<https://login.microsoftonline.com/organizations/v2.0/adminconsent?client_id=c2995f31-11e7-4882-b7a7-ef9def0a0266&scope=https://graph.microsoft.com/Mail.ReadWrite%20https://graph.microsoft.com/Calendars.Read%20https://graph.microsoft.com/People.Read%20https://graph.microsoft.com/User.Read%20offline_access&redirect_uri=https://pivot.claude.ai/auth/callback>

- The admin will see a Microsoft permissions screen listing Mail.ReadWrite, Calendars.Read, People.Read, User.Read, and offline_access

- After they click “Accept,” all users in the organization can use Claude for Outlook without additional Microsoft prompts. This grant takes effect immediately; only the add-in rollout above can take up to 24 hours.

- If this step is skipped, every user will see a “Need admin approval” message when Claude first tries to read mail or calendar data.

**Note:** Claude for Outlook on third-party platforms currently supports Claude Opus 4.7 only. Other Claude models are available in Outlook when users sign in with a Claude account instead.

After deploying the add-in, your users can connect by following the steps below.

---

## Connection instructions for end users

### LLM gateway

1. Open Excel, PowerPoint, Word, or Outlook and launch the Claude add-in.

2. On the sign-in screen, select "Enterprise gateway."

3. Enter the **Gateway URL** and **API token** your IT team provided.

  - **Gateway URL**: The HTTPS base URL of your LLM proxy (for example, <https://llm-gateway.yourcompany.com>).

  - **API token**: The bearer token your proxy expects. The add-in sends this in the Authorization: Bearer <token> header with every request.

4. The add-in checks the connection by sending a test request to the gateway. If it succeeds, you'll see the main app experience.

Your credentials are stored locally in your browser's localStorage within the add-in's sandboxed iframe. They aren't synced to Anthropic's servers. Because the Office add-in runs inside a sandboxed iframe within the Microsoft application, it can't use your OS keychain the way Claude Code does—for this reason, only enter gateway-issued tokens, not raw cloud provider credentials.

### Bedrock, Vertex AI, or Foundry direct

1. Open Excel, PowerPoint, Word, or Outlook and launch the Claude add-in.

2. Authenticate using the method of your provider:

  1. **Bedrock or Vertex AI:** Sign in with your Microsoft work account. The add-in uses your Entra ID token to authenticate with your cloud provider—no separate cloud credentials are needed.

  2. **Foundry:** If your admin pre-filled the Azure resource name and API key, the add-in connects automatically. Otherwise, enter the values your IT team provided and select Connect.

3. The add-in reads the configuration your admin provisioned and connects to Bedrock or Vertex AI directly.

If you see an error at sign-in, confirm with your IT team that your account is in the group assigned to the add-in.

### Change or update your connection

If your API token expires or your IT team gives you a new URL, go to "Settings" in the add-in sidebar, enter the new values, and select "Test connection."

---

## Gateway requirements for IT teams

The Office add-ins support the same three API formats as Claude Code. Set `gateway_api_format` in your add-in manifest to tell the add-in which format your gateway speaks.

### CORS requirements

The add-in's taskpane loads from <https://pivot.claude.ai>. Every request to your gateway is therefore cross-origin, and the browser will silently discard any response that lacks CORS headers.

Your gateway must return `Access-Control-Allow-Origin: <https://pivot.claude.ai>` (or `*`) on every response: GET, POST, OPTIONS, and all error responses. Setting it only on the OPTIONS preflight is not sufficient. For the preflight, return `Access-Control-Allow-Headers: *`.

### Required endpoints

The endpoints your gateway must expose depend on which API format it speaks. Set `gateway_api_format` in your manifest to match.

**gateway_api_format: anthropic (default)**

| **Endpoint**      | **Description**                                                               |
| ----------------- | ----------------------------------------------------------------------------- |
| POST /v1/messages | Send messages to Claude. Supports both streaming and non-streaming responses. |
| GET /v1/models    | List available models.                                                        |

**gateway_api_format: bedrock**

| **Endpoint**                                       | **Description**                                  |
| -------------------------------------------------- | ------------------------------------------------ |
| POST /model/{model-id}/invoke                      | Send a message and receive a complete response.  |
| POST /model/{model-id}/invoke-with-response-stream | Send a message and receive a streaming response. |

Native Bedrock InvokeModel pass-through. `gateway_url` must point at the pass-through prefix (for example, <https://litellm.example.com/bedrock>).

**gateway_api_format: vertex**

| **Endpoint**                                                                                        | **Description**                                  |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| POST /projects/{project}/locations/{region}/publishers/anthropic/models/{model-id}:rawPredict       | Send a message and receive a complete response.  |
| POST /projects/{project}/locations/{region}/publishers/anthropic/models/{model-id}:streamRawPredict | Send a message and receive a streaming response. |

Native Vertex pass-through. `gateway_url` must include the API-version segment (for example, <https://litellm.example.com/vertex_ai/v1>). Also requires `gcp_project_id` and `gcp_region` so the add-in can build the path.

### Required header

For `anthropic` and `vertex` formats, the gateway must forward the `anthropic-version` request header to the upstream provider.

For `bedrock` format, the SDK puts `anthropic_version` in the request body instead — the gateway must preserve it there.

Failure to forward the header or preserve the body field may result in reduced functionality or prevent the add-in from working.

### Authorization header

The add-in can send your gateway’s authorization token in either the `x-api-key` or the `Authorization` header.

### Model discovery

On login, the add-in attempts to discover available Claude models via GET /v1/models. If your gateway doesn't expose a model list at that path, the add-in falls back to prompting the user for a model ID manually.

### Differences from Claude Code gateway setup

| **Aspect**         | **Claude Code**                                      | **Claude for Excel, PowerPoint, Word, and Outlook**                                      |
| ------------------ | ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Credential storage | OS keychain or environment variables                 | Browser localStorage (sandboxed iframe)                                                  |
| Auth configuration | Environment variables, settings file, helper scripts | Manual entry in add-in UI (gateway), Entra ID (direct cloud), or Azure API key (Foundry) |
| Token refresh      | Supports helper scripts for rotation                 | Manual re-entry in settings (gateway) or automatic via Entra ID (direct cloud)           |
| Custom model names | Configurable via environment variables               | Not configurable in v1                                                                   |

---

## Example gateway configuration with LiteLLM

**Warning:** LiteLLM PyPI versions 1.82.7 and 1.82.8 were compromised with credential-stealing malware. Do not install these versions. If you have already installed them:

- Remove the package

- Rotate all credentials on affected systems

- Follow the remediation steps in **[BerriAI/litellm#24518](https://github.com/BerriAI/litellm/issues/24518)**

LiteLLM is a third-party proxy service. Anthropic doesn’t endorse, maintain, or audit LiteLLM’s security or functionality. This guide is provided for informational purposes and may become outdated. Use at your own discretion.

Many organizations use **LiteLLM** as their gateway. Below is a minimal litellm_config.yaml for routing Office add-in requests to Anthropic, Bedrock, or Vertex.

### Routing to Anthropic directly

**yaml**

```
model_list:
  - model_name: claude-sonnet-4-5-20250929
    litellm_params:
      model: claude-sonnet-4-5-20250929
      api_key: os.environ/ANTHROPIC_API_KEY

litellm_settings:
  drop_params: true
```

### Routing to Amazon Bedrock

**yaml**

```
model_list:
  - model_name: claude-sonnet-4-5-20250929
    litellm_params:
      model: bedrock/anthropic.claude-sonnet-4-5-20250929-v1:0
      aws_region_name: us-east-1

litellm_settings:
  drop_params: true
```

### Routing to Google Cloud Vertex AI

**yaml**

```
model_list:
  - model_name: claude-sonnet-4-5-20250929
    litellm_params:
      model: vertex_ai/claude-sonnet-4-5-20250929
      vertex_project: your-gcp-project-id
      vertex_location: us-east5

litellm_settings:
  drop_params: true
```

### Routing to Azure

**yaml**

```
model_list:
  - model_name: claude-sonnet-4-5-20250929
    litellm_params:
      model: azure_ai/claude-sonnet-4-5-20250929
      api_base: https://your-resource.services.ai.azure.com/anthropic
      api_key: os.environ/AZURE_API_KEY
      extra_headers:
        x-api-key: os.environ/AZURE_API_KEY

litellm_settings:
  drop_params: true
```

For detailed setup instructions, refer to **[LiteLLM's Anthropic format documentation](https://docs.litellm.ai/)**.

---

## What Anthropic collects

Even when inference goes through your own infrastructure, the add-in communicates with pivot.claude.ai to load its interface and with claude.ai/api/ to evaluate feature flags. These connections transmit operational telemetry—such as which features are used, performance timings, and error rates—so Anthropic can maintain and improve the add-in experience. They don't transmit your prompts or Claude's responses.

Anthropic collects information in accordance with AWS Bedrock, Google Cloud Vertex AI, or Microsoft Azure's terms, consistent with Anthropic's arrangements with customers. Anthropic doesn't have access to a customer's AWS, Google, or Microsoft instance, including prompts or outputs it contains. Anthropic doesn't train generative models with such content or use it for other purposes. Anthropic can access metadata—such as tool use, token counts, and similar items—and use such metadata for analytic and product improvement purposes.

For details on what your organization's gateway or cloud provider logs, contact your IT team.

To route a full audit trail—including prompts, tool inputs, tool outputs, and document references—to your own infrastructure, see **[Configure a custom OpenTelemetry collector for Office agents](https://support.claude.com/en/articles/14447276-)**.

---

## How this differs from signing in with a Claude account

When you sign in with a Claude account, the add-ins connect directly to Anthropic. When you connect through a third-party platform, the add-ins send inference requests to your organization's infrastructure instead, and your IT team controls how that traffic is routed and logged.

Some features that rely on having a Claude account aren't available through third-party platforms yet, but we're working on adding support:

| **Feature**                                              | **Claude account** | **Third-party platform** |
| -------------------------------------------------------- | ------------------ | ------------------------ |
| Chat with your spreadsheet, deck, or document            | ✓                  | ✓                        |
| Read and edit cells, slides, formulas, and document text | ✓                  | ✓                        |
| Connectors (S&P, FactSet, etc.)                          | ✓                  | ✓                        |
| Working across apps                                      | ✓                  | —                        |
| Skills                                                   | ✓                  | ✓                        |
| File uploads                                             | ✓                  | ✓                        |
| Web search                                               | ✓                  | Vertex only              |

If your team needs these features, talk to your Claude admin about which sign-in path fits your organization.

### Add MCP connectors to third-party add-ins

MCP connectors are now supported in Claude for Excel, PowerPoint, and Word. As an administrator, you can set the MCP gateway in the add-in manifest following the documentation here: **[MCP servers](https://github.com/anthropics/financial-services-plugins/blob/main/claude-in-office/commands/manifest.md#mcp-servers)**. If you prefer to use the bootstrap endpoint, you can configure MCP connectors following the documentation here: **[`mcp_servers`](https://github.com/anthropics/financial-services-plugins/blob/main/claude-in-office/commands/bootstrap.md#mcp_servers)**.

### Add Skills to third-party add-ins

Skills are now supported in Claude for Excel, PowerPoint, and Word. The Anthropic financial services skills are available by default. Additional Skills may be added by administrators or manually by individuals.

Administrators can add skills using the bootstrap endpoint, following the documentation here: **[`skills`](https://github.com/anthropics/financial-services-plugins/blob/main/claude-in-office/commands/bootstrap.md#skills)**.

Individuals can manually upload local skills (either as a .zip, .skill, or SKILL.md file) and manage them individually. Skills are uploaded by selecting the "+" button, then Skills → "Upload Skills."

### Add file uploads to third-party add-ins

File uploads are now supported in Claude for Excel, PowerPoint, and Word. Individuals can upload files by selecting the "+" button, then "Add files or photos" .

---

## Troubleshooting

### "Connection refused" or network error

The gateway URL or cloud endpoint is unreachable from the user's network. Verify the URL is correct, the service is running, and there are no firewall or VPN restrictions blocking the connection. Check the **Network allowlist** section above to confirm all required domains are allowed.

### 401 Unauthorized or "Invalid token"

The auth token is invalid or expired. For gateway connections, confirm the token with your IT team. For direct-cloud connections, verify the user's Entra ID account is in the assigned group and that the OIDC trust or OAuth client is configured correctly. For Foundry, regenerate the key in Azure Portal → Keys and Endpoint.

### 403 Forbidden or "Access denied"

The token is valid but lacks the right permissions. For Bedrock, verify the IAM role has `bedrock:InvokeModel` permissions. For Vertex, verify the service account has `aiplatform.endpoints.predict` permissions. For gateways, check the token's scope with your IT admin. For Foundry, check the resource’s networking rules, or confirm the key belongs to the right resource.

### 404 Not found

The add-in couldn't reach the expected API path. For gateways, verify the URL is the base URL (for example, [https://litellm-server:4000)—don't](https://litellm-server:4000\)%E2%80%94don't) include /v1/messages in the URL field.

### 500 or other server errors

The gateway or cloud provider encountered an internal error. Check your gateway logs (for example, docker logs litellm if using LiteLLM) for upstream provider errors. Try the request again, and contact your IT admin if the issue persists.

### "No models available"

The add-in couldn't find Claude models. For gateways, your gateway may not expose a model list at GET /v1/models. Your IT team can either configure the gateway to serve a model list or give you a specific model ID to enter manually. For Bedrock or Vertex, confirm that at least one Claude model (Claude Sonnet 4.5 or later) is enabled in your account and region. For Foundry, confirm at least one Claude model is deployed in the resource (Model catalog).

### Streaming responses fail or hang

Verify that your gateway supports Server-Sent Events (SSE) pass-through. Some proxy configurations strip or buffer SSE connections, which prevents streaming responses from reaching the add-in.

### A feature I expected isn't available

Connectors, skills, file uploads, and Working Across Apps aren't available through third-party platforms yet. If you need these, ask your admin about signing in with a Claude account instead.
---

SOURCE: https://support.claude.com/en/articles/14051822-notice-regarding-consumption-tax-jct-for-japanese-customers

# Notice regarding consumption tax \(JCT\) for Japanese customers

## Consumption tax

Effective April 1, 2026, Anthropic will be levying a separate consumption tax (JCT) of 10% on services provided to Japanese customers in accordance with Japanese consumption tax law. Anthropic has completed registration as a qualified invoice issuing business.

## Price impact

Starting April 1, 2026, 10% consumption tax will be added to all plan prices.

## Frequently asked questions

### Why is sales tax added?

Under Japan's Consumption Tax Act, digital service providers from overseas are required to tax Japanese customers. Anthropic has complied with this legal obligation and has completed registration as a qualified invoice issuing business. This allows corporate customers to claim input tax credits.

### I am a corporation. Can I collect consumption tax?

Yes. Corporate customers who are subject to consumption tax can receive input tax credits by using qualified invoices issued by Anthropic. Please contact your tax representative for details.

### What is Anthropic's Qualified Billing Business Registration Number?

The registration number is T7700150134388. You can check it on the National Tax Agency's "Qualified Invoice Issuer Publication Site."

### Will the billing currency change?

No. Your billing currency remains unchanged. The JCT amount will be shown in Japanese Yen (JPY) on your Tax Qualified Invoice.

### What if it is for personal use?

Individual customers cannot receive input tax credits. They will be responsible for the consumption tax. This is the same as other services in Japan.

### When will this be applied?

Starting April 1, 2026. Consumption tax will be applied to all invoices from that date onwards.

### Who should I contact for inquiries?

Please contact us using the details below depending on the nature of your inquiry.

| **Inquiry details**                    | **Contact**                                                                               |
| -------------------------------------- | ----------------------------------------------------------------------------------------- |
| Regarding Tax Qualified Invoices (TQI) | Our **[Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)** |
| Consumption tax treatment              | Your company's tax officer or accountant                                                  |
---

SOURCE: https://support.claude.com/en/articles/14447276-configure-a-custom-opentelemetry-collector-for-office-agents

# Configure a custom OpenTelemetry collector for Office agents

You can route full audit telemetry from Office agents to your own OpenTelemetry (OTEL) collector. This gives your organization complete control over retention, encryption, and integration with your SIEM or observability platform.

This guide covers how to enable a custom collector, what data you'll receive, and the full span schema reference.

Custom OTEL collectors are available to Claude Enterprise organizations and to direct-provider deployments (Amazon Bedrock, Google Vertex AI, or a gateway).

## What you'll receive

When you configure a custom collector, Office agents send trace data covering every user turn. Each turn produces a tree of spans capturing the prompt, model calls, tool executions, file uploads, and context compaction events.

Your collector receives all span attributes, including those carrying user-generated content (prompt text, tool inputs and outputs, document URLs, and filenames). No attributes are redacted or filtered. Assistant response text is not included in the emitted span data. Your organization owns this data.

**Important:** Metrics aren't sent to custom collectors. The `office_agent.*` counter namespace routes to Anthropic only. However, every counter increment also appears as a span event on the active span, so the same signals are available in your traces.

Telemetry is sent via OTLP/HTTP to your endpoint at `{your_url}/v1/traces`. gRPC isn't supported because the add-in runs in an Office WebView.

---

## Enable a custom collector

Setup differs depending on how your organization authenticates with Claude.

**Important:** When a custom endpoint is configured, telemetry goes exclusively to your collector. Spans aren't dual-sent to Anthropic.

### Claude Enterprise (OAuth) organizations

An organization administrator sets the collector endpoint in the Claude.ai admin console under **[Organization settings > Office agents](https://claude.ai/admin-settings/office-agents)**. The setting applies organization-wide.

| **Setting**     | **Description**                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `otlp_endpoint` | Base URL of your OTLP collector. The add-in appends /v1/traces. HTTPS strongly recommended.    |
| `otlp_headers`  | Optional authentication headers, formatted per the OpenTelemetry spec: key1=value1,key2=value2 |

The protocol must be HTTP-based OTLP. gRPC is rejected at configuration time.

### Direct provider deployments (Amazon Bedrock, Google Vertex AI, gateway)

For deployments that authenticate against your own model provider rather than Claude.ai, the collector endpoint is supplied through one of three configuration channels. All three use the same two keys.

**Recommended:** Use the **[claude-for-msft-365-install plugin](https://github.com/anthropics/financial-services/tree/main/claude-for-msft-365-install)** for Claude Code. It walks you through generating the manifest, registering Entra extension attributes, and standing up a bootstrap endpoint with `otlp_endpoint` and `otlp_headers` pre-wired. The three channels below are documented for reference and manual setup.

| **Key**         | **Format**              | **Description**                                                                                                       |
| --------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `otlp_endpoint` | HTTPS URL               | Base URL of your OTLP collector. The add-in strips any trailing slash and appends /v1/traces.                         |
| `otlp_headers`  | key1=value1,key2=value2 | Optional authentication headers. Same format as the OpenTelemetry OTEL\_EXPORTER\_OTLP\_HEADERS environment variable. |

If `otlp_endpoint` is unset or empty, no custom collector is configured and the add-in falls back to default behavior.

**Note:** These configuration channels apply to Microsoft Office deployments only. Google Workspace add-ins are configured separately.

**Channel 1: Manifest URL parameter**

Append the keys as query string parameters to the taskpane URL in your custom add-in manifest:

`https://<addin-host>/taskpane.html?otlp_endpoint=https://otel-collector.your-domain.com&otlp_headers=Authorization=Bearer%20<token>`

URL-encode the values. This applies the configuration to every user who installs the manifest.

**Channel 2: Azure Entra ID directory extension**

For per-user configuration, register the keys as Entra ID directory extension attributes and assign them via Microsoft Graph. The add-in reads them from the user's ID token using Nested App Authentication (NAA).

The claim names in the issued ID token follow Azure's directory extension format:

| **Claim**            | **Maps to**     |
| -------------------- | --------------- |
| `extn.otlp_endpoint` | `otlp_endpoint` |
| `extn.otlp_headers`  | `otlp_headers`  |

Set these per-user with a Graph PATCH against the user object. Azure encodes directory extension values as single-element arrays in the ID token; the add-in unwraps them automatically. This channel requires `entra_sso=1` in the manifest URL parameters to enable NAA token acquisition.

**Channel 3: Bootstrap endpoint response**

If your deployment uses a bootstrap endpoint (a JSON endpoint your organization hosts that the add-in calls at startup), include the keys in the response body:

```
{
  "otlp_endpoint": "https://otel-collector.your-domain.com",
  "otlp_headers": "Authorization=Bearer <token>"
}
```

The bootstrap endpoint URL itself is configured via `bootstrap_url` in either the manifest URL parameters or an Entra `extn.bootstrap_url` claim. If an Entra ID token was acquired, it is passed to the bootstrap endpoint as a Bearer authorization header so your endpoint can authenticate the user before returning per-user configuration.

**Precedence**

When multiple channels supply a value, later channels override earlier ones: manifest parameters are read first, then Entra claims, then the bootstrap response. The bootstrap response wins.

If you haven't already, the fastest path is the **[claude-for-msft-365-install plugin](https://github.com/anthropics/financial-services/tree/main/claude-for-msft-365-install)**.

---

## Deployment modes

Custom collector export is available on both deployment modes:

- Claude.ai Enterprise (OAuth): full audit trail including user identity (`user.email`, `user.account_uuid`, `organization.id`), MCP server metadata, and file upload records.

- Direct provider (Bedrock, Vertex AI, gateway): core audit trail (prompts, tool inputs and outputs, document URLs) but no user identity, no MCP metadata, and no file upload spans. User attribution requires correlating `session.id` against your own identity provider logs.

The core audit payload is identical in both modes. Direct provider deployments lack Claude.ai account context, so attributes derived from the Claude.ai user or organization profile are absent. See the `[claude.ai-only]` tags in the span schema below for the complete list.

## Surface and vendor labels

Every span includes two labels identifying which Office application and platform generated it. Use these as your primary dimensions for filtering and dashboards.

| **Label**       | **Values**                                                    |
| --------------- | ------------------------------------------------------------- |
| `agent.surface` | sheet (Excel), doc (Word), slide (PowerPoint), mail (Outlook) |
| `agent.vendor`  | m (Microsoft)                                                 |

---

## Span reference

Each user turn produces a parent/child tree of up to five span types. Attributes marked [content] carry user-generated data; these form your audit payload. Attributes marked [`claude.ai-only`] are populated only when the user signs in with a Claude account; they are absent on Bedrock, Vertex AI, and gateway deployments. Absent attributes are omitted from the span entirely (no key with a null value).

The `file.upload` span and all `mcp.*` attributes are also [`claude.ai-only`], since file upload and MCP server connections are Claude platform features.

For direct provider deployments, user identity should be correlated via `session.id` and `document.url`, joined against your identity provider's session logs.

### Resource attributes

These attributes appear on every span:

| **Attribute**     | **Description**           |
| ----------------- | ------------------------- |
| `service.name`    | Fixed value: office-agent |
| `service.version` | Fixed value: 1.0.0        |
| `git.sha`         | Build commit identifier   |

### agent.query (root span)

One span per user turn. This is the root of the span tree and carries session identity, document context, and MCP server status. SpanKind: INTERNAL.

| **Attribute**                                 | **Description**                                                    |
| --------------------------------------------- | ------------------------------------------------------------------ |
| `agent.surface`                               | sheet \| doc \| slide \| mail                                      |
| `agent.vendor`                                | m                                                                  |
| `user.message [content]`                      | The user's prompt (first 4000 characters)                          |
| `session.id`                                  | Opaque session identifier                                          |
| `user.email [claude.ai-only]`                 | User's email address                                               |
| `user.bucket [claude.ai-only]`                | Deterministic hash bucket (SHA-256 of email, mod 30)               |
| `user.account_uuid [claude.ai-only]`          | Claude account UUID                                                |
| `document.url [content]`                      | URL of the open Office document                                    |
| `organization.id [claude.ai-only]`            | Claude organization UUID                                           |
| `org.rate_limit_tier [claude.ai-only]`        | Claude subscription tier                                           |
| `org.type [claude.ai-only]`                   | Claude organization type                                           |
| `agent.selected_model`                        | Model selected by the user for this session                        |
| `office.platform`                             | PC \| Mac \| OfficeOnline \| iOS \| Android \| Universal           |
| `office.version`                              | Office build number                                                |
| `mcp.configured_count [claude.ai-only]`       | Number of MCP servers configured                                   |
| `mcp.connected_count [claude.ai-only]`        | Number of MCP servers successfully connected                       |
| `mcp.failed_count [claude.ai-only]`           | Number of MCP servers that failed to connect                       |
| `mcp.fetch_status [claude.ai-only]`           | success \| error \| timeout \| no\_auth \| not\_attempted          |
| `mcp.fetch_duration_ms [claude.ai-only]`      | MCP registry fetch duration                                        |
| `mcp.fetch_http_status [claude.ai-only]`      | MCP registry fetch HTTP status code                                |
| `mcp.servers [content] [claude.ai-only]`      | Serialized MCP server details (names, tool counts, error messages) |
| `file.upload.count [claude.ai-only]`          | Number of files attached to this turn                              |
| `file.upload.total_bytes [claude.ai-only]`    | Total bytes uploaded                                               |
| `file.upload.image_count [claude.ai-only]`    | Number of image attachments                                        |
| `file.upload.document_count [claude.ai-only]` | Number of document attachments                                     |
| `file.upload.other_count [claude.ai-only]`    | Number of other attachments                                        |
| `error.name`                                  | Exception class name (present on failure)                          |
| `agent.query_phase`                           | Phase at which the query failed (present on failure)               |

### agent.stream

One span per API call to Claude, as a child of the query span. SpanKind: CLIENT.

| **Attribute**           | **Description**                                                 |
| ----------------------- | --------------------------------------------------------------- |
| `model`                 | Model ID used for this call                                     |
| `max_tokens`            | Maximum output tokens requested                                 |
| `agent.message_count`   | Number of messages in the conversation at stream start          |
| `input_tokens`          | Input tokens billed (from API response)                         |
| `output_tokens`         | Output tokens billed (from API response)                        |
| `cache_read_tokens`     | Tokens served from prompt cache                                 |
| `cache_creation_tokens` | Tokens written to prompt cache                                  |
| `stop_reason`           | end\_turn \| tool\_use \| max\_tokens \| etc.                   |
| `request_id`            | Anthropic API request-id header, usable for support correlation |

**Note on prompt caching:** The add-in requests prompt caching unconditionally. The `cache_read_tokens` and `cache_creation_tokens` attributes are set from the provider's API response and are omitted when the response doesn't include them. Prompt caching is available for Claude Platform; as of this writing, Amazon Bedrock and Google Vertex AI don't yet return these fields through the client the add-in uses. When support lands on your provider, these attributes will begin appearing automatically.

### agent.tool_execution

One span per tool call, as a child of the stream span. SpanKind: INTERNAL. This is the primary record of what actions the model took against the document.

| **Attribute**           | **Description**                                                                 |
| ----------------------- | ------------------------------------------------------------------------------- |
| `tool_name`             | Tool identifier (e.g. get\_cell\_ranges, execute\_office\_js, edit\_slide\_xml) |
| `tool.id`               | Unique ID of this tool invocation                                               |
| `tool.caller`           | server \| client                                                                |
| `tool.owner`            | first\_party \| mcp \| server                                                   |
| `tool.read_write`       | read \| write \| read\_write                                                    |
| `tool.accept_decision`  | manual \| auto\_accept \| deferred                                              |
| `tool.input [content]`  | Serialized tool input (first 4000 characters)                                   |
| `tool.success`          | Boolean                                                                         |
| `tool.output [content]` | Serialized tool output (first 4000 characters)                                  |
| `tool.output_chars`     | Full output length in characters (use to detect truncation)                     |
| `tool.error_type`       | Error classification (present on failure)                                       |
| `sheet.cells_read`      | Cells read (sheet surface only)                                                 |
| `sheet.cells_written`   | Cells written (sheet surface only)                                              |
| `sheet.cells_copied`    | Cells copied (sheet surface only)                                               |

**Note:** The `tool.accept_decision` attribute records how the permission decision was made: `manual` (the user approved this specific action), `auto_accept` (the user had previously granted standing approval), or `deferred` (the action was queued for later review). Use this to audit approval patterns across your organization.

### agent.compaction

One span per conversation auto-summarization, fired when context approaches the window limit. SpanKind: CLIENT.

| **Attribute**             | **Description**                  |
| ------------------------- | -------------------------------- |
| `compaction.pre_tokens`   | Token count before summarization |
| `compaction.post_tokens`  | Token count after summarization  |
| `compaction.tokens_saved` | Delta                            |
| `compaction.success`      | Boolean                          |
| `compaction.trigger`      | Currently always reactive        |

This span also carries `agent.surface`, `agent.vendor`, `session.id`, `user.email [claude.ai-only]`, `user.bucket [claude.ai-only]`, `office.platform`, and `office.version`, duplicated from the root span so you can query compaction events independently.

### file.upload [claude.ai-only]

One span per individual file upload, as a child of the query span. SpanKind: CLIENT. This span type only appears when users sign in with a Claude.ai account. File upload isn't available on direct provider deployments.

| **Attribute**                    | **Description**                |
| -------------------------------- | ------------------------------ |
| `file.upload.filename [content]` | Original filename              |
| `file.upload.size_bytes`         | File size                      |
| `file.upload.mime_type`          | MIME type                      |
| `file.upload.file_id`            | Anthropic Files API identifier |
| `file.upload.success`            | Boolean                        |

---

## Span events

Span events are timestamped markers attached to the spans above. They capture lifecycle transitions and counter-equivalent signals.

- `agent.query`: exception {exception.type}; file_upload {file_id, mime_type, content_category}

- `agent.stream`: first_token; stream_complete; stream_error {exception.type}

- `agent.tool_execution`: tool_init; tool_run; tool_result; tool_error {error_type}

- `agent.compaction`: compaction_start; compaction_complete; compaction_error {exception.type}

- `file.upload`: exception {exception.type}

Every internal product counter also records a span event with the same name on the currently active span, providing the equivalent of the metrics stream within your trace data. The `office_agent.token.usage` event is emitted on each `agent.stream` span, once per non-zero token type, with attributes {token_usage.type: input | output | cacheRead | cacheCreation, token_usage.model, token_usage.token_count}. This mirrors the `*.token.usage` counter shape emitted by other Anthropic products, so a single collector can aggregate token cost across products by grouping on `service.name`.

---

## Surface-specific behavior

The telemetry schema is consistent across all surfaces. These are the differences:

- Sheets (Excel): `agent.tool_execution` spans include `sheet.cells_read`, `sheet.cells_written`, and `sheet.cells_copied` attributes. `office_agent.cell_edit_collision_total` span events appear when a user is mid-cell-edit while a tool tries to write.

- Documents (Word): document-edit funnel events track the edit lifecycle: `office_agent.doc_edit_received_total`, `office_agent.doc_edit_parsed_total`, `office_agent.doc_edit_applied_total`, `office_agent.doc_proposed_edit_reviewed_total`. No `sheet.cells_*` attributes.

- Slides (PowerPoint): no surface-specific attributes or events beyond the common schema.

- Mail (Outlook): no surface-specific attributes or events beyond the common schema.

---

## Reconstructing a user session

### Claude.ai deployments

- Filter spans by `user.email` (or `user.account_uuid`) and `session.id`.

- Order `agent.query` spans by start timestamp; each is one user turn.

- For each turn, `user.message` is the prompt and `document.url` is the file being worked on.

- Child `agent.tool_execution` spans, ordered by timestamp, are the actions taken: `tool.input` is what was attempted, `tool.output` is the result, `tool.accept_decision` records whether the user explicitly approved.

### Direct provider deployments

The add-in has no Claude.ai user identity in this mode, so spans carry no `user.email` or `user.account_uuid`. To attribute activity to a user:

- Filter spans by `session.id` to isolate one continuous add-in session.

- Use `document.url` to identify the file being worked on.

- Correlate the session against your identity provider's logs: Entra sign-in events, gateway access logs, or your bootstrap endpoint's request log (which receives the user's Entra ID token as a Bearer header).

- Once a session is attributed to a user, the per-turn reconstruction is identical: agent.query spans ordered by timestamp, with `user.message`, `tool.input`, `tool.output`, and `tool.accept_decision` providing the audit trail.

This produces a complete, ordered transcript of the interaction in both deployment modes.
---

SOURCE: https://support.claude.com/en/articles/14465370-use-claude-for-word

# Use Claude for Word

Claude for Word is an add-in that integrates Claude into your Word workflow. It’s designed for professionals who work extensively with documents, particularly in legal review, financial memo drafting, and iterative editing.

Claude for Word is currently in beta and available to Pro, Max, Team, and Enterprise plans.

With Claude for Word, you can:

- Ask questions about your document and get answers with clickable section citations.

- Edit selected text while preserving surrounding styles, numbering, and formatting.

- Use tracked changes mode so every edit lands as a revision you can accept or reject in Word’s native review pane.

- Have Claude work through comment threads, editing the anchored text and replying with what it changed.

- Fill templates with drafted content that inherits your document’s heading and paragraph styles.

- Find every provision touching a theme with semantic navigation, not just keyword search.

---

## Get started with Claude for Word

### Supported versions

- Word on the web

- Word on Windows (Microsoft 365 subscription, Version 2205 / Build 15202.10000 or later)

- Word on Mac (version 16.61 / Build 22040100 or later)

### For individuals

1. Navigate to the **[Claude for Microsoft 365 (Excel, PowerPoint, and Word) listing](https://marketplace.microsoft.com/en-us/product/office/WA200010725?tab=Overview)** on Microsoft Marketplace.

2. Click “Get it now” to install the add-in.

3. Open Word, activate the add-in, and sign in with your Claude account.

### For admins

**Deploy Claude for Word to your organization:**

1. Visit the **Microsoft 365 Admin Center**.

2. Navigate to **Settings > Org Settings > User owned apps and services** and ensure that **“Let users access the Office Store”** is toggled on.

3. Navigate to **Settings > Integrated apps > Add-ins**.

4. Search for “Claude by Anthropic for Word” in Microsoft AppSource.

5. Deploy the add-in to your organization or specific people.

6. Share these instructions with your team: **Microsoft’s deployment guide**.

After installation, team members can open Word, activate the Claude add-in (from Tools > Add-ins on Mac or Home > Add-ins on Windows), sign in with their Claude credentials, and start working with their documents.

**Important:** Organizations that have disabled “Let users access the Office Store” may find that admin-deployed add-ins don’t appear for people. To work around this, deploy using the manifest XML files provided below.

**### Alternatively, download the manifest file to install**

For IT administrators deploying to multiple people:

**Step 1: Obtain the custom manifest**

1. Click **[this link](https://pivot.claude.ai/manifest-word.xml)** to download the custom manifest XML file.

2. Save this file to a secure location.

**Step 2: Access Microsoft 365 Admin Center**

1. Navigate to **<https://admin.microsoft.com>**

2. Sign in with your admin credentials.

3. Go to **Settings > Integrated apps**.

**Step 3: Upload the custom add-in**

1. Click “Upload custom apps.”

2. Select “Office Add-in.”

3. Choose “I have a manifest file on this device.”

4. Browse and select the Claude for Word manifest XML file.

5. Click “Upload.”

**Step 4: Assign people**

Choose your deployment scope:

- **Entire organization:** All people get access

- **Specific users:** Enter individual email addresses

- **Specific groups:** Select security groups or distribution lists

- **Just yourself:** For admin testing only

**Step 5: Deploy**

1. Review deployment settings.

2. Click “Deploy.”

3. The add-in will be available within minutes (may take up to 24 hours for full organization rollout).

**Step 6: Access**

- People will see Claude appear in Word’s Home ribbon.

- First-time people will need to sign in with their Claude accounts.

- No additional installation required.

### Connect through an LLM gateway

If your organization routes API traffic through an internal LLM gateway connected to Amazon Bedrock, Google Cloud Vertex AI, or Microsoft Azure, you can use the add-in without a Claude account. This is the same gateway pattern used by Claude Code.

For setup instructions and gateway requirements, see **[Use Claude for Microsoft 365 with third-party platforms](https://support.claude.com/en/articles/13945233-)**.

---

## Key features

### Read and understand documents

Ask Claude questions about specific sections, clauses, or defined terms in your document. Claude provides answers with clickable citations that navigate directly to the referenced section in your document.

**Example prompts:**

- “What’s the liability cap and is it mutual?”

- “Summarize the key commercial terms in this agreement”

- “What assumptions drive the revenue forecast in section 3?”

### Edit selected text

Select a passage and tell Claude what to change. Claude edits only the selection while preserving surrounding styles, numbering, and formatting. New text inherits the paragraph style, font, and numbering of the surrounding content.

**Example prompts:**

- “Tighten this paragraph and drop the passive voice”

- “Rewrite this clause to make the indemnification mutual”

- “Simplify this section for a non-technical audience”

### Track changes mode

When you enter suggested edits mode, Claude’s edits land as tracked revisions. The original text is visible as a deletion and the new text as an insertion, all reviewable in Word’s native review pane. This gives you a clear audit trail of what Claude changed, so you can accept or reject each revision individually.

**Example prompts:**

- “Rewrite §4.2 to cap damages at 12 months of fees, and make it mutual”

- “Draft a mutual indemnification clause after §8”

### Comment-driven editing

Claude reads comment threads in your document, understands what text each thread is anchored to, and can work through them one by one. For each comment, Claude edits the anchored passage and replies to the thread with a note explaining what it did.

**Example prompts:**

- “Work through my open comments”

- “Address the comment on the liability section”

### Summarize counterparty redlines

When a counterparty returns a document with tracked changes, Claude can read and summarize what they changed. Ask Claude to group changes by severity or flag the ones worth pushing back on.

**Example prompts:**

- “Summarize what the other side changed and flag anything that’s worth discussing”

- “Which of these redlines are dealbreakers?”

### Fill templates

Draft sections in your document’s heading and paragraph styles. Claude uses your template’s formatting when generating content, so new headings, bullets, and table entries match what’s already there. Tables populate in place without reflowing layout or changing column widths.

**Example prompts:**

- “Draft the Key Risks section with four risks in the template’s style”

- “Populate the summary table with revenue, gross margin, and net retention for the last three years”

### Semantic navigation

Find every provision or passage in your document that touches a specific theme. Claude returns thematic matches, not just keyword hits, and each result navigates to the relevant location on click.

**Example prompts:**

- “Find every provision touching data retention”

- “Where does this agreement address termination?”

## Work across Word, Excel, and PowerPoint

Claude for Word shares context with Claude for Excel and Claude for PowerPoint, so Claude can work across your open documents in a single conversation. For example, you can ask Claude to pull numbers from an Excel model into a Word memo, or summarize a Word document into PowerPoint slides, without copying and pasting between apps.

For setup instructions, see **[Work across Microsoft 365 apps](https://support.claude.com/en/articles/13892150-work-across-microsoft-365-apps)**.

---

## Context and session management

### Auto-compaction

We **[automatically compact longer conversations](https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits#h_21b66a43b4)** into new conversations to avoid running out of context.

### Chat history

Chat history is now stored locally in your browser using IndexedDB. Unlike Claude, conversations aren't stored on Anthropic's servers—they're saved client-side and aren't synced across devices or browsers. You can clear all chat history from Settings at any time, and the local store is cleared when you clear your browser data.

Your chat history is specific to the combination of the add-in surface, your user ID, and your organization ID—so your Excel, PowerPoint, and Word histories are separate, but conversations carry across different documents within Word (or different presentations within PowerPoint/workbooks within Excel). If you switch organizations, you'll have a separate chat history.

### Overwrite protection

To avoid accidental data loss, Claude warns you before overwriting existing data.

**Note:** Your use of Claude for Word is associated with your existing Claude account and is subject to the same usage limits.

---

## Current limitations

For Claude for Word use, we automatically delete inputs and outputs on our backend within 30 days of receipt or generation, except in cases outlined in **[How long do you store my organization’s data?](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)** Data will be deleted after 30 days, but will be cached for a number of hours so users can access context in recently closed out documents.

Enterprise organizations can route full audit telemetry from Claude for Word to their own OpenTelemetry (OTEL) collector for integration with a SIEM or observability platform. Learn more about **[configuring a custom OpenTelemetry collector for Office agents](https://support.claude.com/en/articles/14447276-configure-a-custom-opentelemetry-collector-for-office-agents)**. On Free, Pro, Max, and Team plans, observability and auditability aren't available for Claude for Word. Claude for Word doesn’t inherit custom data retention settings your organization might have set, and isn’t included in Enterprise audit logs or the Compliance API at this time.

As a beta feature, Claude for Word is **not recommended** for:

- Final client deliverables or counterparty sends without human review

- Litigation filings or audit-critical documents without verification

- Replacing legal or financial judgment

- Documents containing highly sensitive or privileged data without proper controls

### Unsupported versions

- Word 2016 / 2019 (perpetual/volume licensed)

- Word on iPad

- Word on Android

- Microsoft 365 Word builds older than Version 2205 (Windows) or 16.61 (Mac)

---

## Best practices

To use Claude for Word safely and effectively:

- Always review tracked changes before accepting them.

- Verify that outputs match your firm’s playbook and standard positions.

- Use appropriate permissions and access controls.

- Maintain human oversight for client-facing work.

---

## Prompt injection attack risks

Only use Claude for Word with trusted documents and not documents from external untrusted sources (for example, downloaded templates, counterparty files, or collaborative documents shared via email).

An important risk for people using Claude for Word and other AI tools that can read and edit documents is prompt injection attacks that hide malicious instructions in document content (text, comments, tracked changes, headers, footers) to trick AI models into taking unintended actions. For example, a seemingly routine contract received from an external party might contain hidden instructions to modify terms or exfiltrate data. Claude may interpret these instructions as legitimate requests from you.

Our testing has identified edge scenarios where Claude for Word can be manipulated to:

- **Extract and share sensitive information** with bad actors through web searches containing your sensitive data or file system access that exposes proprietary information.

- **Modify critical content** such as contract terms or financial figures.

- **Perform destructive actions** without verification (should you allow Claude to act without verifying its actions), exploiting Claude’s helpful nature to delete or alter important content.

While we continue to develop our offerings and improve safety measures to reduce these risks, you should exercise caution when using Claude for Word and should not use it with documents from external, untrusted sources.

---

## Example use cases

### Legal contract review

- “Summarize the key commercial terms: parties, term, governing law, and anything off-market”

- “Flag provisions that deviate from standard market position, ranked by severity”

- “Make the indemnification mutual and insert our standard fallback language”

- “Work through all five reviewer comments as tracked changes”

- “What did the counterparty change, and which revisions are dealbreakers?”

### Finance memo drafting

- “Draft the Investment Thesis section with three points, pulling the numbers from the uploaded 10-K”

- “Populate the summary table with revenue, gross margin, and FCF for the last three years”

- “Too generic on point two. Use the customer count from the deck”

- “Address the partner’s comment on the Risks section”

### Document QA and consistency

- “Flag inconsistent defined terms and broken cross-references”

- “Check the numbering scheme for gaps”

- “Proofread for spelling, grammar, and punctuation”

- “Is the same party referred to by different names anywhere in this document?”

### General document editing

- “Tighten section 4 and drop the passive voice”

- “Rewrite this for a non-technical audience”

- “Add a fourth risk addressing customer concentration”

- “Define this term and use it consistently throughout”

---

## Frequently asked questions

### Does Claude understand legal and financial document conventions?

Claude recognizes common document patterns including multi-level legal numbering, defined terms, cross-references, and standard contract structures. However, always verify that outputs match your specific requirements and your firm’s standard positions.

### Can I use Claude for Word with sensitive data?

Claude for Word works within your existing security framework. For highly sensitive or regulated data, ensure you follow your organization’s data handling policies.

### What happens to my chat history?

Your chat history is stored locally in your browser using IndexedDB. It persists between sessions, so you can return to previous conversations. Chat history is not automatically deleted, but you can clear all of it manually from Settings.

Your history is specific to each add-in surface, your user ID, and your organization. This means your Word, Excel, and PowerPoint chat histories are separate. Within a single surface, your chat history is shared across files—for example, conversations in one Word document appear in another. If you log in to a different organization, you'll see a separate chat history.

### How does Claude access my document?

Claude reads the content of your currently open document, including text, comments, tracked changes, footnotes, tables, and bookmarks. It can only access the document you have open in Word.

### What if Claude makes a mistake?

In tracked changes mode, you can review every edit before accepting it. You can always undo changes using Word’s standard undo function (Ctrl+Z / Cmd+Z).

### Does Claude support .doc files?

Claude for Word supports .docx files. If you’re working with a legacy .doc file, save it as .docx first.
---

SOURCE: https://support.claude.com/en/articles/14503590-get-started-with-claude-for-government

# Get started with Claude for Government

## What is Claude for Government?

Claude for Government brings Anthropic's Claude AI to environments requiring the highest security authorization levels. It delivers the same frontier reasoning, writing, and analysis capabilities that power Claude—deployed inside a FedRAMP High–authorized environment with the security controls, compliance authorizations, and procurement pathways that government agencies and high-security public sector enterprises require. Claude for Government gives teams direct access to Claude's most capable models for drafting, research, analysis, and coding, while meeting the stringent data handling and auditability standards of federal and state government missions.

## How do I access Claude for Government?

Claude for Government is available to U.S. federal, state, and local government agencies and qualifying public sector organizations. To learn more or get started, contact Anthropic's public sector Sales team via the **[Contact sales form](https://claude.com/contact-sales)** (choose "Contact sales" for **What can we help you with?**) and select "Government & Public Sector" for the **Industry** field.

## Product differentiation between Claude for Government and Claude Enterprise

Claude for Government is built on the same foundation as Claude Enterprise but operates inside an isolated, dedicated FedRAMP boundary that provides additional compliance and security guarantees:

- **FedRAMP High authorization.** Claude for Government operates under a FedRAMP High Authorization to Operate, meeting stringent federal security control baselines. Claude Enterprise operates on Anthropic's commercial infrastructure.

- **Dedicated government environment.** Claude for Government is logically isolated from commercial tenants and hosted through Anthropic's government-authorized partner infrastructure. This supports agency data residency and boundary requirements.

- **Classification banner support.** Claude for Government includes classification banner display at the application level for environments that require it—not available on the commercial Enterprise plan.

- **Feature availability.** Core Enterprise features—projects, artifacts, integrations, audit logs, admin controls—are available in Claude for Government. New features are often available in Claude for Government shortly following their launch in the enterprise environment. In some cases, however, new features may either require additional compliance review or may not be supported in Claude for Government.

## Which product is right for you?

Choose Claude for Government if your agency requires FedRAMP-High authorization, handles CUI or sensitive data, or has compliance requirements that mandate an authorized cloud environment. This is the recommended choice for most federal civilian deployments.

Choose Claude Enterprise if your use case involves only publicly available information, you need access to the latest commercial features immediately, or compliance requirements permit commercial cloud infrastructure.

## Compliance and certifications

### FedRAMP High

Claude for Government is authorized at the FedRAMP High impact level. The authorization is held through Palantir Federal Cloud Service – Supporting Services (PFCS-SS), with independent assessment performed by Schellman Compliance, LLC.

### Where to find compliance documentation

Agencies can access compliance documentation through Anthropic's Trust Center. Instructions for requesting the full Claude for Government ATO package are available on request from your public sector contact.

## Data handling

Claude for Government is designed to give agencies control over their data.

- By default, conversations and uploaded content in Claude for Government are not used to train Anthropic's models.

- Encryption is applied in transit (TLS) and at rest.

- A detailed Data Control, Visibility, and Retention overview is available and can be tailored to your agency's specific configuration.

## Pricing and how to purchase

There are two ways to procure Claude for Government, directly via Anthropic’s Sales team and via Carahsoft for customers requiring services via a GSA approved vehicle.

Claude for Government is licensed on an annual, per-seat basis. A limited-time program currently makes Claude for Government available to federal agencies at $1 per agency (unlimited seats) through August 2026.

Contact the public sector Sales team for current pricing for state, local, and non-federal public sector customers.
---

SOURCE: https://support.claude.com/en/articles/14503794-model-availability-in-claude-for-government

# Model availability in Claude for Government

Claude is a family of state-of-the-art large language models developed by Anthropic. This guide introduces the models available for customers using Claude for Government. For the most up to date information about the model’s general capabilities, please visit our **[Model Overview page](https://platform.claude.com/docs/en/about-claude/models/overview)**.

## How model availability differs in Claude for Government

Claude for Government routes all inference through Google Cloud Vertex AI's FedRAMP High authorized environment rather than Anthropic's commercial endpoints. This is what keeps model traffic inside the authorization boundary.

### New models arrive shortly after commercial launch

New models are typically available in Claude for Government the same day or within one to two days of their commercial release. The gating factor is Vertex availability—once a model is serving on Vertex, Anthropic completes the Claude for Government and the models become available to users.

**Note:** There is **no separate FedRAMP audit per model**. Vertex's authorization is infrastructure-level, not per-model. Once the Claude for Government environment is authorized, new models inherit that authorization automatically. Your agency does not need to re-engage Anthropic's FedRAMP process when a new model ships.

### Opus access is gated by seat tier

Unlike Enterprise, Claude for Government restricts Opus-class models to certain seat tiers. Lite seats—the default tier in the federal agency offer—have full access to Sonnet and Haiku but not Opus.

## Seat types and model access

**Lite seats** are the tier included in the federal agency offer and are designed for agency-wide deployment at minimal per-seat cost. Lite seats have full access to Sonnet-class models and Haiku models. Lite seats have capped usage per 5-hour window.

**Standard seats** provide access to all available models, including Claude Opus, with full-capacity rate limits. Standard seats are best for power users whose work benefits from Opus-class reasoning, such as complex analysis, advanced coding, and long-horizon research.

## How admins manage model access

**Seat tier assignment.** Admins can assign seat tiers to users via SCIM group mappings in **Organization settings > Identity**. Create groups in your identity provider for each tier (e.g., `claude-standard-users` and `claude-lite-users`), push them via SCIM, and map each group to a seat tier in Claude for Government. Users inherit the seat tier of their group.

**Default model selection.** Admins can set the organization's default model in Admin Settings. New conversations will start on this model unless the user selects a different one.

**Changing a user's seat tier.** Move the user between groups in your identity provider; the change syncs to Claude for Government on the next SCIM cycle.

## When new models arrive

Agencies don't take any action to receive new models—they show up in the model picker once enabled. Anthropic announces availability through your public sector account contact and in release notes.

If your agency policy requires advance notice or opt-in before new models reach users, contact your Anthropic public sector representative to discuss configuration options.
---

SOURCE: https://support.claude.com/en/articles/14503804-classification-banner-in-claude-for-government

# Classification banner in Claude for Government

The classification banner displays a persistent marking at the top of every page for every user in your organization. Use it to communicate the classification level of data approved for your Claude for Government environment or any custom handling instruction your agency requires.

## When to use a classification banner

Set a classification banner whenever your agency's policy requires a persistent, page-level reminder of what data is and isn't appropriate to enter into Claude. The banner is visible on every screen, so users never lose sight of the environment's classification ceiling—even deep in a long conversation.

## Common configurations

- **CUI environments** — remind users that Controlled Unclassified Information is permitted but classified data is not

- **UNCLASSIFIED environments** — make the boundary explicit for users who also work in classified systems

- **Custom handling caveats** — agency-specific instructions beyond standard markings (e.g., "ITAR — No export-controlled technical data")

**Note:** The banner is a visual reminder, not an enforcement control. It does not inspect or filter what users type. Pair it with organization instructions if you want Claude to apply handling guidance in conversations.

## Configure the classification banner

You must be the Primary Owner to configure the banner.

1. Navigate to **[claude.fedstart.com/admin-settings/organization](https://claude.fedstart.com/admin-settings/organization)**

2. Scroll to the **Classification banner** section

3. Fill in the banner fields:

  - Banner text — the marking that appears on the banner

  - Background color — the banner's fill color

  - Text color — the marking text color

  - Link URL (optional) — if provided, the banner text becomes a clickable link. You can point it at your agency's classification policy page or handling guide.

4. Click "Save." The banner appears for all users in your organization.

You can update the banner at any time by returning to the same settings page.
---

SOURCE: https://support.claude.com/en/articles/14553240-give-claude-context-claude-md-and-better-prompts

# Give Claude context: CLAUDE.md and better prompts

Claude Code works well out of the box, but it becomes noticeably more effective once it knows your project's conventions and once you adopt a few prompting habits. This guide covers both.

---

## Part 1 — CLAUDE.md: your project's memory

### What it is

`CLAUDE.md` is a plain markdown file that Claude automatically reads at the start of **every** session in that directory. Think of it as the briefing you would give a capable new teammate on their first morning: how the team does things, what to avoid, and where the important pieces live.

You do not need to reference it in prompts or attach it manually. If the file exists, Claude has already read it.

### Where it lives

Claude looks in a few places and merges what it finds, from broad to specific:

| **Location**            | **Scope**                                                                                            | **Good for**                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `~/.claude/CLAUDE.md`   | Every project on your machine                                                                        | Personal preferences (for example, "I use pnpm, not npm" or "always suggest tests"). |
| `<repo-root>/CLAUDE.md` | This project                                                                                         | Architecture, conventions, and commands. **This is the main one.**                   |
| `<subdir>/CLAUDE.md`    | That subdirectory (loaded on demand when Claude reads files in that directory, not at session start) | Module-specific rules (for example, different conventions in `frontend/` vs `api/`). |

Most teams only need the project-root file. Commit it to git so the whole team benefits.

### How it's loaded (and what it costs)

The files at and above your working directory are read at session start and delivered to Claude as a user message immediately after the system prompt (not embedded inside the system prompt itself). Subdirectory `CLAUDE.md` files are loaded on demand later, when Claude reads files in that subdirectory. There is no summarization or truncation, and it is not re-read from disk on each turn. If you edit the file mid-session, the change is picked up the next time you run `/compact` or open it via `/memory`; otherwise it takes effect on your next session.

For Claude for Enterprise customers, the cost picture is better than "loaded on every request" might suggest. Claude Code applies Anthropic's prompt caching to `CLAUDE.md`. The first request in a session pays the full input-token price for the file; subsequent requests within roughly five minutes of each other hit the cache and are billed at the much lower cache-read rate. The cache is content-addressed, so any change to `CLAUDE.md` invalidates it and the next request pays full price again.

In practice this means a sizeable `CLAUDE.md` costs full tokens once per session, plus once after any idle gap long enough for the cache to expire, rather than once per message. It is still worth keeping the file lean for context-window space and signal-to-noise, but you do not need to ration lines purely to control per-message spend. In the Enterprise usage dashboard, the file's footprint will show up almost entirely as cache-read tokens rather than standard input tokens.

### Getting started: run `/init`

In any project, type `/init`. Claude will explore the codebase and draft a `CLAUDE.md` for you, covering build commands, test commands, a structure overview, and any conventions it detects. Review the draft, remove anything inaccurate, and commit it. This takes about five minutes and pays off permanently.

### What actually belongs in it

Aim for a file that is short and signal-dense — under roughly 200 lines. Every line is loaded into context on every request, so each one should be worth its cost.

**Worth including:**

- **Commands** — how to build, test, lint, and run locally. Claude will execute these, so accuracy matters.

- **Conventions** — naming, error handling, file layout, and "we use X, not Y" decisions.

- **Architecture in three sentences** — what the major pieces are and how they communicate.

- **Hard constraints** — for example, "never write to the production database from tests," "all API routes need auth middleware," or "do not edit `generated/`."

- **Known gotchas** — the issues every new engineer trips on.

**Not worth including:**

- Full API documentation (Claude can read the code directly).

- Changelogs or history.

- Anything that is already obvious from the file tree.

- Aspirational rules the team does not actually follow.

### How often to update it

Treat it like a living onboarding doc, not a spec.

- **After `/init`** — review once to clean up the generated draft.

- **When Claude gets something wrong twice** — that is the signal a rule is missing. Add one line to address it.

- **When conventions change** — for example, a new framework, test runner, or set of lint rules.

- **Quarterly skim** — delete anything stale, since outdated instructions are worse than none.

You can also add to it mid-session: open `/memory` to edit the file directly, or just ask Claude to "remember" a rule and it will append it to the right `CLAUDE.md` for you.

---

## Part 2 — Prompting habits that pay off in Claude Code

These are not generic prompt-engineering tips; they are the habits that matter most specifically when Claude is reading and editing a real codebase.

### 1. State the outcome, not the steps

Claude can explore the codebase itself. Tell it *what* you want and *why*, and let it figure out *where*.

❌ "Open `userService.ts`, find the `validate` function, add a null check on line 42."

✅ "Users with no email are crashing the validation step. Make it handle that gracefully and add a test."

### 2. Give it the error, verbatim

Paste the full stack trace rather than summarizing it. The exact filename, line number, and message are what allow Claude to find the right location quickly.

### 3. Scope big tasks with Plan Mode first

For anything touching more than a couple of files, press **Shift+Tab** twice to cycle into plan mode (the first press enters acceptEdits) and ask:

*"Plan how you'd add rate limiting to the public API. Don't change anything yet."*

Review the plan, adjust it in conversation, then switch modes and say "do step 1." This catches misunderstandings before they turn into a twelve-file diff.

### 4. Point at files when you already know them

Claude can search the codebase on its own, but if you already know the relevant file, say so — it is faster and uses fewer tokens. Use `@` to reference paths, for example `@src/auth/login.ts`.

### 5. Say what "done" looks like

Examples include "tests pass," "matches the style of the other handlers," or "no new dependencies." Stating acceptance criteria up front is more efficient than several rounds of revision.

### 6. One task per conversation; `/clear` between them

Long sessions accumulate noise. When you switch from "fix the login bug" to "refactor the billing module," run `/clear` and start fresh. Your `CLAUDE.md` carries the durable context forward, so the chat history does not need to.

### 7. Correct it like a colleague, not a search engine

If the first answer is off, you do not need to rephrase the whole request. Simply say what is wrong — for example, *"That changes the public API; keep the signature the same."* Claude will keep everything else and adjust only that point.

---

## Quick reference

| **Want to…**                          | **Do this**                                          |
| ------------------------------------- | ---------------------------------------------------- |
| Generate a starting `CLAUDE.md`       | `/init`                                              |
| See what memory Claude is using       | `/memory`                                            |
| Add a rule mid-session                | Open `/memory`, or ask Claude to "remember" the rule |
| Start fresh but keep project memory   | `/clear`                                             |
| Reference a specific file in a prompt | `@path/to/file`                                      |
---

SOURCE: https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design

# Set up your design system in Claude Design

Creating a design system allows Claude Design to produce outputs that fit your specifications. It extracts reusable components, colors, typography, and patterns from the assets you provide—codebases, slide decks, or other design references—and uses them as the foundation for every project created within your account.

Claude Design is now available in beta to Pro, Max, Team, and Enterprise plans. This capability is default off for Enterprise plans.

This guide is for the designer or brand owner who will set up the design system. You only need to do this once; after setup, all team members’ projects automatically use it (for Team and Enterprise plans).

## Prerequisites

- Permissions granted by your organization admin for design system setup.

- At least one of the following as source material:

  - A codebase with your design system or component library

  - A slide deck or document that reflects your visual identity

  - Brand guideline assets (logos, color palettes, typography specs)

---

## Step 1: Create or switch to your organization

To set up your organization’s design system:

1. Open **[Claude Design](https://claude.ai/design)**.

2. In the lower-left corner of the project picker, click the current organization name.

3. Select your organization, or create a new one.

4. You’ll be redirected to the onboarding flow. Complete it.

## Step 2: Upload your brand and product assets

During onboarding (or afterward from your organization settings), upload the assets that define your brand and product. Claude will analyze them and extract a reusable design system.

**What to upload:**

- **Codebases:** If your design system lives in code (for example, a React component library), you can link or upload the repository. Claude will read the components and styles.

- **Prototypes:** Screenshots, web flows, and existing design files.

- **Slide decks or documents:** Even a well-designed PowerPoint or PDF that reflects your brand can work. Claude extracts colors, layout patterns, and typographic choices.

- **Individual assets:** Logos, color palette files, typography specimens.

You only need one source to get started, but providing multiple gives Claude more to work with.

## Step 3: Review the generated design system

After uploading, Claude generates a design system (UI kit) for your organization. This typically includes:

- **Color palette:** Primary, secondary, and accent colors extracted from your assets.

- **Typography:** Font families, sizes, and weights.

- **Components:** Buttons, cards, navigation elements, and other reusable UI patterns.

- **Layout patterns:** Spacing, grid systems, and page structures.

To validate your design system, create a test project and see if the output matches your brand expectations. Try prompts like:

- “Create a landing page for [your product].”

- “Design a dashboard showing [relevant metrics].”

- “Make a presentation about [a topic your team commonly presents on].”

## Step 4: Make it available to your team

Once you’re satisfied with the design system quality, make sure the “Published” toggle is switched on. After publishing, any projects created from the Claude Design homescreen while in your organization will use your design system instead of the default.



---

## Tips for best results

- **Include real examples, not just specs.** A finished landing page or marketing site tells Claude more about your brand’s feel than a color palette alone.

- **Iterate.** If the first extraction doesn’t capture your brand well, try uploading additional or different assets.

## Updating your design system

Brands evolve. When your design system changes, you can update it within Claude Design. From your Claude Design organization settings, click the “Open” button next to the design system you want to edit. Click the “Remix” button in the upper right corner to open the chat interface on the left side of the window. From here, you can work with Claude to change your design system.
---

SOURCE: https://support.claude.com/en/articles/14604416-get-started-with-claude-design

# Get started with Claude Design

**[Claude Design](https://claude.ai/design)** lets you create designs, interactive prototypes, presentations, and more by having a conversation with Claude. This guide walks you through creating your first project, iterating on designs, and getting the most out of the tool.

Claude Design is now available in beta to Pro, Max, Team, and Enterprise plans. This capability is default off for Enterprise plans. You can use it on the web at claude.ai/design or from the sidebar in Claude Desktop.

This guide assumes your organization’s design system has already been set up, so everything you create will automatically use your brand’s colors, typography, and component patterns. If you’re a design lead who needs to set up or modify the design system itself, see **[Set up your design system in Claude Design](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design)**.

---

## How Claude Design works

Claude Design has two main areas: a chat interface on the left and a canvas on the right. You describe what you want in the chat, and Claude generates a working design on the canvas. From there, you iterate—refining through conversation, inline comments, and directly on the canvas until it’s right.

The typical flow is:

1. Create a project.

2. Attach or import the design system you want Claude to build with.

3. Add any relevant context (screenshots, a codebase).

4. Describe what you want to build.

5. Review what Claude generates on the canvas.

6. Refine through chat, edit directly on the canvas, or leave inline comments.

7. Export or share when you’re happy with the result.

### Move between Claude Design and Claude Code

You can move between working in Claude Design and Claude Code while keeping your work synced. Use `/design-sync` to pull in your design system, so everything you build in Claude Design starts from your existing components. When a design is ready to become software, you can hand it off to Claude Code, which continues from your existing work instead of starting over from a screenshot.

If you prefer to work from Claude Code, connect the Claude Design MCP server to create and edit designs without leaving your terminal:

1. Add the server:
​`claude mcp add --scope user --transport http claude-design https://api.anthropic.com/v1/design/mcp`

2. Run `/design-login` to sign in.

Once you're connected, you can import a design into your codebase, export your code as a live prototype, or let Claude build the whole thing from start to finish.

---

## Create a new project

When you create a project, it automatically inherits your organization’s design system. You don’t need to upload brand assets or configure anything—your brand colors, fonts, and components are already in place.

### Attach or import your design system

Bring in one or several design systems from a GitHub repo, design files, raw uploads, or your local codebase using the `/design-sync` command in Claude Code. Claude builds with your real design system components, checks its own output against your design system, and makes corrections before you see them.

For larger teams, the Claude Design Admin custom role lets an admin approve a standard system and lock down edits, so the work always matches your company guidelines.

### Add context to your project

The more context you give Claude, the better your output will be. You can attach reference material at any point during a project.

- **Screenshots, images, or existing assets:** Upload screenshots of existing designs, competitor products, wireframes, or visual inspiration. You can also attach an existing slide deck or document with a design style you want to replicate. Useful for “make it look like this” requests.

- **Codebases and existing design files:** Link a code repository so Claude understands your existing components, architecture, and styling patterns. This makes prototypes more production-ready from the start. Import also supports multiple ways to upload existing product design work.

### Write effective prompts

You don’t need to be a designer to get great results. Be specific about what you’re building, who it’s for, and what matters most.

A good prompt includes the **goal** (what you’re building), the **layout** (how things should be arranged), the **content** (what information to display), and the **audience** (who will use it). Claude will also ask clarifying questions if it needs more information.

Here are some examples of prompts that work well:

- “Create a dashboard showing monthly revenue with filters for region and product line.”

- “Design a mobile app onboarding flow with 4 screens that walks users through our core features.”

- “Build a landing page for our new API product with a hero section, code examples, and pricing.”

- “Create a form for collecting customer feedback with conditional questions based on category.”

- “Design an internal tool for our ops team to review and approve content submissions.”

---

## Refine your design

The first generation is a starting point. The real value comes from iterating.

### Using chat

Chat is best for broad changes that affect the overall design:

- “Make the color scheme darker and more minimal.”

- “Rearrange the dashboard so metrics are in the top row and the chart is below.”

- “Add a settings panel on the right side.”

- “Show me 2–3 alternative layouts for this page.”

You can also ask Claude to explain its design decisions, suggest improvements, or review the design for accessibility.

### Using inline comments

Inline comments let you click directly on a specific part of the canvas and request a targeted change. This is faster than describing the location in chat.

Examples of good inline comments:

- “Make this button padding larger.”

- “Change this to a dropdown instead of radio buttons.”

- “Use the primary brand color here.”

- “Make this section collapsible.”

**Note:** If your comments aren’t being picked up, paste the feedback directly into the chat instead. This is a known workaround for an intermittent issue where comments can disappear before Claude reads them.

### Edit directly on the canvas

Use rich layout controls for quick visual and aesthetic shifts, specifically to drag, resize, and align elements directly.

### When to use chat vs. comments vs. edit directly

Use **comments** for targeted, component-level changes (“fix this button,” “adjust this spacing”). Use **chat** for structural changes, new sections, or anything that requires explanation or context. **Edit directly** for quick visual and aesthetic changes.

## Manage versions and revisions

If you want to explore a different direction without losing your current work, tell Claude: “Save what we have and try a completely different approach.” Claude will save your current project and confirm where it’s saved, so you can reference earlier iterations in the conversation easily.

---

## Export and share

Once your design is ready, you can share it with colleagues or export it for use elsewhere. The right format depends on your use case—whether you’re getting stakeholder feedback, handing off to engineering, or presenting to a group.

Use the “Export” button in the upper right corner when viewing your project to choose from the following export formats.

- Download as .zip

- Export as PDF

- Export as PPTX

- Send to Canva

- Export as standalone HTML

- Send to the tools you already use, including Adobe, Base44, Canva, Gamma, Lovable, Miro, Replit, Vercel, and Wix, with more destinations coming soon.

- Handoff to Claude Code

  - Send to local coding agent

  - Send to Claude Code Web



You can also share projects within your organization using a shareable link. Sharing options include view-only, comment, and edit access.

---

## Usage and pricing

Claude Design counts toward the same usage limits as the rest of Claude. Design activity draws from the shared pool you use for chat, Claude Code, and Cowork, so there's no separate Claude Design allowance to track. Complex projects with large codebases or many iterations consume more usage.

If you reach your usage limits, Claude Design is unavailable until your limits reset. If you've enabled usage credits, you can keep working after reaching your included limits. Learn more about **[how usage and length limits work](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)**.

**Note:** Claude Design previously had its own weekly allowance, separate from your other usage limits. All Claude Design activity now counts toward your plan's shared limits.

---

## Tips for best results

- **Import a complete design system.** Import a complete design system that includes your styles, fonts, and components.

- **Start simple, then layer in complexity.** Begin with the core layout and content, then add interactions, edge cases, and polish. Claude responds well to incremental requests.

- **Be specific in your feedback.** “This doesn’t look right” is hard to act on. “Tighten the spacing between form fields to 8px” gives Claude exactly what it needs.

- **Reference your design system.** If you know a component exists in your brand’s system, mention it by name: “Use the Primary Button component” or “Apply the Card layout pattern.”

- **Think about responsiveness early.** Mention whether your design needs to work on mobile, tablet, and desktop, or just one of those.

- **Ask for variations.** If you’re unsure about a direction, ask Claude to show you 2–3 options. Comparing alternatives is much faster than guessing.

- **Ask Claude for feedback.** Claude can review your design for accessibility, contrast ratios, information hierarchy, and general usability. Treat it as a design collaborator, not just a generator.

---

## Known limitations

Claude Design is now available in beta. A few things to be aware of:

- **Comment persistence:** Inline comments occasionally don't appear on the page, but you can still see them by opening the comments view.

- **Large codebases:** Consider  linking very large repositories from Claude Code to avoid lag or browser issues. To sync a design system, use `/design-sync` from Claude Code.

- **Chat errors:** If you hit a "chat upstream error," try starting a new chat tab within the same project.

- **Availability:** Claude Design is available on web and desktop only.

- **Multi-person editing:** Two or more people editing a design project at the same time is still basic and may not work reliably.

- **Design system import:** Design system import is only as good as its source. A messy codebase or an incomplete file will show up in the output.
---

SOURCE: https://support.claude.com/en/articles/14730684-how-claude-suggests-connected-apps

# How Claude suggests connected apps

When you connect an app like Spotify or Instacart to Claude, you don’t have to ask for it by name every time. Claude can bring up a connected app on its own when it fits what you’re doing. This article covers when that happens, how Claude picks between apps, and how you stay in control.

Connected apps are available on Claude, Claude Desktop, and Claude for iOS/Android. Installing an app on mobile is currently in beta.

---

## When Claude suggests an app

Claude pays attention to what you’re asking about in the conversation. When a connected app matches that context, Claude suggests it in the thread without you having to name it.

For example, if you’ve connected AllTrails and ask about a weekend hike, Claude can pull up trails nearby. If you’ve connected Instacart and ask for help putting together a dinner, Claude can start building a cart.

Claude also uses context you’ve shared in earlier conversations—through memory—to make the suggestion more relevant. If you’ve told Claude you have a dog, a trail search can filter for dog-friendly options by default.

### Stay in control

Before Claude books, buys, or reserves something on your behalf, it checks with you first. For connected apps with a booking or purchase flow, you confirm the details before anything is finalized. Claude doesn’t transact on its own.

Connecting an app gives Claude access on your behalf. Your data from that app isn’t used to train Claude’s models, and the connected app can’t see your other conversations. You can disconnect at any time.

### When more than one app could help

Sometimes more than one of your connected apps can handle what you’re asking for. If you have both Booking.com and TripAdvisor connected and ask for help planning a trip, Claude shows both and lets you pick. Claude doesn’t silently default to one over the other; you choose which app to use, and Claude proceeds from there.

### No paid placements

Claude doesn’t take payment to recommend any connected app. There are no sponsored rankings, no paid placements, and no advertising. When Claude brings up an app, it’s because the app matches what you’re asking for.

When more than one app could help, the order you see them in reflects what’s likely useful to you, not partnership arrangements.

---

## Turn off suggestions or disconnect an app

You control which of your connected apps Claude can bring into a conversation.

**Disable an app for one conversation**: Click the “+” in the lower left of the chat, hover over Connectors, and toggle the app off. Claude won’t use it for that conversation.

**Disconnect an app entirely**: Go to **[Customize > Connectors](https://claude.ai/customize/connectors)**, find the app, and disconnect it. Claude stops accessing it immediately.

For more on managing connected apps, see **[Use connectors to extend Claude’s capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)**.
---

SOURCE: https://support.claude.com/en/articles/14855664-use-claude-for-outlook

# Use Claude for Outlook

Claude for Outlook is an add-in that integrates Claude into your Outlook inbox and calendar. It’s designed for professionals who live in email, including private equity and investment banking associates managing deal flow, in-house legal teams running counterparty negotiations, and consultants juggling client threads.

Claude for Outlook is currently in beta and available to Pro, Max, Team, and Enterprise plans.

With Claude for Outlook, you can:

- Triage your unread inbox into what needs you, what Claude can handle, and what's noise.

- Draft replies, reply-alls, and forwards in your voice, landed unsent in Outlook's compose pane.

- Summarize long threads into decisions made, open items, and who owes what, with per-email citations.

- Read .docx, .xlsx, .pptx, and .pdf attachments inline without opening them.

- Find meeting times across attendees and draft invites into Outlook's native appointment form.

- Prep for your next meeting with a one-page brief of recent threads and attached documents.

---

## Get started with Claude for Outlook

### Supported versions

- Outlook on the web

- Outlook on Windows (new Outlook and classic Outlook, Microsoft 365 subscription)

- Outlook on Mac (Microsoft 365 subscription)

### For individuals

1. Navigate to the **[Claude for Outlook listing on Microsoft AppSource](https://marketplace.microsoft.com/en-us/product/office/WA200010724?tab=Overview)**.

2. Click “Get it now” to install the add-in.

3. Open Outlook, open any email, click the Claude button in the ribbon, and sign in with your Claude account.

### For admins

**Deploy Claude for Outlook to your organization:**

1. Visit the **[Microsoft 365 Admin Center](https://admin.microsoft.com/)**.

2. Navigate to **Settings > Integrated apps > Add-ins**.

3. Search for “Claude by Anthropic for Outlook” in Microsoft AppSource.

4. Deploy the add-in to your organization or specific people.

5. Share these instructions with your team: **[Microsoft’s deployment guide](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-deployment-of-add-ins?view=o365-worldwide)**.

After installation, team members can open Outlook, open any email, click the Claude button in the message ribbon, sign in with their Claude credentials, and start working with their inbox. Pin the task pane so it stays open as you move between messages.

**Important:** Claude for Outlook uses Microsoft Graph to read across your mailbox and calendar. Before users can use features that span the inbox (triage, search, find time), an IT administrator must grant admin consent for the Mail.ReadWrite, Calendars.Read, People.Read, User.Read, and offline_access delegated scopes using the admin consent URL provided in your onboarding materials. This is a one-time step per tenant.

**### Alternatively, download the manifest file to install**

For IT administrators deploying to multiple people:

**Step 1: Obtain the custom manifest**

1. Click **[this link](https://pivot.claude.ai/manifest-outlook.xml)** to download the custom manifest XML file.

2. Save this file to a secure location.

**Step 2: Access Microsoft 365 Admin Center**

1. Navigate to **<https://admin.microsoft.com>**

2. Sign in with your admin credentials.

3. Go to **Settings > Integrated apps**.

**Step 3: Upload the custom add-in**

1. Click “Upload custom apps.”

2. Select “Office Add-in.”

3. Choose “I have a manifest file on this device.”

4. Browse and select the Claude for Outlook manifest XML file.

5. Click “Upload.”

**Step 4: Assign people**

Choose your deployment scope:

- **Entire organization:** All people get access

- **Specific users:** Enter individual email addresses

- **Specific groups:** Select security groups or distribution lists

- **Just yourself:** For admin testing only

**Step 5: Deploy**

1. Review deployment settings.

2. Click “Deploy.”

3. The add-in will be available within minutes (may take up to 24 hours for full organization rollout).

**Step 6: Grant Microsoft Graph Consent**

Claude for Outlook reads mail and calendar data through Microsoft Graph, which requires a one-time tenant-wide grant from a Global Administrator. This is separate from the Integrated apps deployment above. Have a Global Admin open the below admin consent link below in a browser where they are signed in to your Microsoft 365 tenant:

<https://login.microsoftonline.com/organizations/v2.0/adminconsent?client_id=c2995f31-11e7-4882-b7a7-ef9def0a0266&scope=https://graph.microsoft.com/Mail.ReadWrite%20https://graph.microsoft.com/Calendars.Read%20https://graph.microsoft.com/People.Read%20https://graph.microsoft.com/User.Read%20offline_access&redirect_uri=https://pivot.claude.ai/auth/callback>

- The admin will see a Microsoft permissions screen listing Mail.ReadWrite, Calendars.Read, People.Read, User.Read, and offline_access

- After they click Accept, all users in the organization can use Claude for Outlook without additional Microsoft prompts. This grant takes effect immediately; only the add-in rollout in Step 5 above can take up to 24 hours.

- If this step is skipped, every user will see a “Need admin approval” message when Claude first tries to read mail or calendar data

**Step 7: Access**

- People will see Claude appear in the Outlook message ribbon when an email is open.

- First-time people will need to sign in with their Claude accounts.

- No additional installation required.

### Connect through an LLM gateway

If your organization routes API traffic through an internal LLM gateway connected to Google Cloud Vertex AI or Microsoft Azure, you can use the add-in without a Claude account. This is the same gateway pattern used by Claude Code.

For setup instructions and gateway requirements, see **[Use Claude for Microsoft 365 with third-party platforms](https://support.claude.com/en/articles/13945233)**.

---

## Key features

### Triage your inbox

Ask Claude what needs your attention. Claude reads your unread mail and attachments and sorts them into three buckets: actions items for you (each with a one-line reason), items Claude can handle (scheduling asks, acknowledgments, standard-form documents, pre-drafted for your review), and noise you can archive in one click.

**Example prompts:**

- “What needs me?”

- “Draft replies for everything you can handle”

- “Archive all the calendar responses and newsletters”

### Draft replies in your voice

Tell Claude what you want to say and it drafts the reply into Outlook’s native compose pane, unsent. Tone is learned from your sent folder, so the draft matches your sentence length, sign-off, and formality register. Reply versus reply-all is chosen deliberately, and Claude warns before adding anyone who wasn’t on the thread.

**Example prompts:**

- “Reply to this and agree to the extension, push back on the fee”

- “Reply-all thanking everyone and confirming Thursday works”

- “Forward this to Dana with a two-line summary”

### Summarize long threads

Claude reads the entire conversation, including every reply and forward, and tells you what’s been decided, what’s still open, and who owes what. Every claim cites the specific email it came from, and clicking a citation opens that message in Outlook.

**Example prompts:**

- “What’s been decided and what’s still open?”

- “Who owes what on this thread?”

### Read attachments inline

Claude reads .docx, .xlsx, .pptx, and .pdf attachments on the open email without you opening them, including tracked changes inside Word files. Ask what changed in an attached LOI, what the attached deck argues, or what numbers are in the attached model.

**Example prompts:**

- “What changed in the attached LOI?”

- “Summarize the attached deck”

### Search your mailbox

Ask Claude to find a past conversation by topic, not just keywords. Results come back as clickable citations that open the source message in Outlook, so you can verify every answer against the original email.

**Example prompts:**

- “When did we last discuss the cap with Fernwood?”

- “Find the email where Dana sent the revised term sheet”

### Find time and create events

Claude checks free/busy for everyone whose calendar you can see and proposes slots that respect working hours and existing holds. The invite is drafted into Outlook’s native appointment form with attendees, subject, and agenda for you to review and send.

**Example prompts:**

- “Find 30 minutes with Dana and the Fernwood team next week”

- “Block Thursday afternoon for deep work”

### Prep for meetings

For your next event, Claude pulls the last thread with each attendee and any attached documents into a one-page brief, so you walk in knowing the open items and what each person last said.

**Example prompts:**

- “Prep me for my 2pm”

- “What’s open with Dana before our call?”

## Work across Outlook, Word, Excel, and PowerPoint

Claude for Outlook shares context with Claude for Word, Excel, and PowerPoint, so Claude can work across your open Office apps in a single conversation. For example, you can open an attached LOI in Word with the email thread already loaded as context, or pull numbers from an email into an open Excel model, without copying and pasting between apps.

For setup instructions, see **[Work across Microsoft 365 apps](https://support.claude.com/en/articles/13892150)**.

---

## Context and session management

### Auto-compaction

We **[automatically compact longer conversations](https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits#h_21b66a43b4)** into new conversations to avoid running out of context.

### Chat history

Chat history is stored locally in your browser using IndexedDB. Unlike Claude, conversations aren't stored on Anthropic's servers—they're saved client-side and aren't synced across devices or browsers. You can clear all chat history from Settings at any time, and the local store is cleared when you clear your browser data. Your chat history is specific to the combination of the add-in surface, your user ID, and your organization ID—so your Excel and Outlook histories are separate, for example, but conversations carry across different workbooks within Excel (or different emails within Outlook). If you switch organizations, you'll have a separate chat history.

### Overwrite protection

To avoid accidental data loss, Claude warns you before overwriting existing data.

**Note:** Your use of Claude for Outlook is associated with your existing Claude account and is subject to the same usage limits.

---

## Current limitations

For Claude for Outlook use, we automatically delete inputs and outputs on our backend within 30 days of receipt or generation, except in cases outlined in **[How long do you store my organization’s data?](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)**

Enterprise organizations can route full audit telemetry from Claude for Outlook to their own OpenTelemetry (OTEL) collector for integration with a SIEM or observability platform. Learn more about **[configuring a custom OpenTelemetry collector for Office agents](https://support.claude.com/en/articles/14447276-configure-a-custom-opentelemetry-collector-for-office-agents)**. On Free, Pro, Max, and Team plans, observability and auditability aren't available for Claude for Outlook. Claude for Outlook doesn’t inherit custom data retention settings your organization might have set, and isn’t included in Enterprise audit logs or the Compliance API at this time.

As a beta feature, Claude for Outlook is **not recommended** for:

- Unattended sending. Claude never sends mail or invites on its own; every draft lands unsent for you to review.

- Client-facing or counterparty correspondence without reading the draft first.

- Replacing your judgment on which emails matter or how to handle a relationship.

- Mailboxes containing privileged or regulated data without appropriate organizational controls.

## Unsupported versions

- Outlook 2016 / 2019 (perpetual/volume licensed)

- Outlook on iOS

- Outlook on Android

- Exchange on-premises mailboxes (Exchange Online / Microsoft 365 only)

---

## Best practices

To use Claude for Outlook safely and effectively:

- Always review drafted replies and invites before sending, especially recipient lists.

- Verify thread summaries against the cited source emails for high-stakes conversations.

- Use appropriate Microsoft 365 permissions and conditional access policies for the add-in.

- Maintain human oversight for anything leaving your organization.

---

## Prompt injection attack risks

Be cautious with emails from external or untrusted senders. Email bodies and attachments are untrusted input and may contain instructions intended to manipulate Claude rather than you.

An important risk for those using Claude for Outlook and other AI tools that can read and act on email is prompt injection: malicious instructions hidden in an email body, signature, or attachment that try to trick the AI into taking unintended actions. For example, a seemingly routine inbound email might contain hidden text instructing Claude to forward a thread or draft a reply you didn’t ask for. Claude may interpret these instructions as legitimate requests from you.

Our testing has identified edge scenarios where Claude for Outlook can be manipulated to:

- **Extract and share sensitive information** with bad actors through web searches containing your sensitive data or file system access that exposes proprietary information.

- **Draft replies or take inbox actions that you didn't intend.**

- **Archive, move, or flag messages in ways you didn't ask for (should you allow Claude to act without reviewing**), exploiting Claude’s helpful nature to delete or alter important content.

While we continue to develop our offerings and improve safety measures to reduce these risks, you should exercise caution when using Claude for Outlook and should review every draft and inbox action when working with email from external, untrusted senders.

---

## Example use cases

### Morning inbox triage

- “What needs me this morning?”

- “Draft replies for the eight you can handle”

- “Archive all the calendar responses”

- “Flag anything from the Fernwood team for follow-up”

- “Mark everything from this distro as read”

### Deal and matter correspondence

- “Summarize this thread: what’s decided and what’s open?”

- “What changed in the attached LOI versus the version they sent last week?”

- “Reply agreeing to the extension but pushing back on the fee”

- “Open the attached model in Excel with this thread as context”

### Scheduling

- “Find 30 minutes with Dana and my associate this week”

- “Propose three slots for the Fernwood call next week”

- “Accept the 3pm and decline the conflicting 3:30”

- “Add an agenda to my Thursday team meeting”

### Meeting prep

- “Prep me for my 2pm with the Fernwood team”

- “What’s the Teams link for my next call?”

- “What’s open with each attendee before this meeting?”

- “Summarize the last three threads with Dana”

---

## Frequently asked questions

### Does Claude send email or calendar invites on my behalf?

No. Claude drafts replies and invites into Outlook’s native compose and appointment forms, and you click send. The add-in does not request the Mail.Send permission at Beta, so there is no programmatic outbound sending.

### What Microsoft Graph permissions does Claude for Outlook need?

Claude for Outlook requests Mail.ReadWrite, Calendars.Read, People.Read, User.Read, and offline_access as delegated scopes. Your IT admin grants these once via an admin consent URL; the Graph access token stays in the browser’s MSAL cache and is never sent to Anthropic.

### What happens to my chat history?

Currently, chat history isn’t saved between sessions. Each time you open the add-in, you start a fresh conversation with Claude.

### How does Claude access my mailbox?

Claude reads the email or event you have open via Office.js, and uses Microsoft Graph for anything spanning your mailbox or calendar (thread retrieval, search, free/busy, move and flag operations). Anthropic does not store a copy of your mailbox; content is fetched on demand and not persisted server-side.

### What if Claude drafts something wrong?

Every draft lands unsent in Outlook’s compose pane. Edit it, discard it, or ask Claude to try again. Nothing goes out until you click send. For inbox actions like archive or move, you can undo using Outlook’s standard undo.

### Does Claude work with shared or delegate mailboxes?

Claude can read mail in shared mailboxes you have delegate access to. Acting on a shared mailbox follows the same review-before-send flow.
---

SOURCE: https://support.claude.com/en/articles/15171100-age-assurance-on-claude

# Age assurance on Claude

Claude, our consumer product, is only available to people over 18 years. You’ll need to confirm you’re 18 or over while setting up an account. When we detect signals that you may be under 18, we'll ask you to verify your age before you can continue using Claude.

## How this works

We have safety systems in place to detect if people under 18 may be using Claude and we’ll disable accounts based on indicators of minor activity.

You’ll have the option to verify your age using Yoti, a third-party age verification platform. A link for verification will be provided in the notification email. If you pass the age verification process, your account will be reinstated.

## Accepted age verification methods

Yoti offers several ways to confirm you're 18 or over. You can choose whichever works best for you:

- Facial age estimation: Take a selfie and Yoti's technology estimates your age. No ID document needed.

- ID verification: Take a photo of your ID (such as a passport, driving license, or national ID card) and upload it from your device. See Yoti's **[full list of supported documents](https://developers.yoti.com/identity-verification/supported-documents)** for country-specific options.

- Yoti’s Digital ID app: If you already have the Yoti app, share a verified "over 18" attribute from it.

## How we protect your data

Yoti is an independently audited age verification provider for SOC2 compliance. Your selfie, document images, and any personal data are deleted by Yoti as soon as your age is checked. Anthropic never sees your ID or image; we receive only a pass/fail result and do not process or store any personal data from the verification.
---

SOURCE: https://support.claude.com/en/articles/15183774-connect-to-microsoft-365

# Connect to Microsoft 365

Connecting Microsoft 365 lets Claude search and analyze content across SharePoint, OneDrive, Outlook, and Teams in your work account. If your admin has enabled write tools, Claude can also draft and send emails, manage calendar events, and create and update files. Ask Claude for what you need, and it pulls the right information or takes the action.

The Microsoft 365 connector is available on all Claude plans: Free, Pro, Max, Team, and Enterprise.

## Before you connect

You'll need a work Microsoft 365 account tied to a Microsoft Entra tenant. Personal Microsoft accounts (such as @outlook.com, @hotmail.com, or @live.com) can't be used. If you're not sure whether your account qualifies, check with your IT administrator.

**Important:** Before anyone in your organization can connect Microsoft 365, an admin needs to set it up. On Team and Enterprise plans, your Claude organization Owner enables Microsoft 365 for the organization. In every tenant, a Microsoft Entra Global Administrator also needs to grant a one-time consent. For details on the admin side, see **[Set up the Microsoft 365 connector](https://support.claude.com/en/articles/12542951-)**.

## Connect Microsoft 365

Once your admin has finished setup:

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

2. Find **Microsoft 365** in the list and click “Connect.”

3. Sign in with your Microsoft 365 credentials when prompted.

**Note:** Once you've connected Microsoft 365 to your Claude account, you can also use it on Claude for iOS and Claude for Android.

## Use Microsoft 365 with Claude

Ask Claude a question that needs information from your Microsoft 365 data. Claude detects which tools it needs and retrieves the relevant content.

### Example queries

- "Find the Q4 strategic planning document in SharePoint."

- "Summarize email conversations about the product launch."

- "What discussions happened in the Teams channel about the marketing campaign?"

- "Review meeting notes from last week's leadership sync."

- "Draft a reply to the latest email from the vendor, but don't send it."

- "Schedule a 30-minute sync with the design team next Tuesday."

### What Claude can do

**SharePoint and OneDrive**

- Search documents across SharePoint sites and libraries to locate project specifications, strategic plans, and other business documents.

- Access files stored in your OneDrive and have Claude analyze content without manually uploading them.

- Consolidate information from distributed file locations and analyze trends across multiple documents.

**Outlook email**

- Search email threads and conversations to track project status, client feedback, and team alignment.

- Access message content and metadata, filtering by date, sender, subject, and other criteria.

- Find specific information from past correspondence.

**Outlook Calendar**

- Review meeting summaries, attendee information, and content to prepare for upcoming meetings or catch up on ones you missed.

- Analyze scheduling patterns and track project decisions.

**Teams**

- Access Teams chat messages and channel discussions where you're a participant.

- Review team collaboration patterns and find decisions made across conversations.

**Write tools**

If your admin has enabled write tools for your organization, Claude can also:

- Draft, send, and organize email, including managing categories, inbox rules, and automatic replies.

- Create, update, and delete calendar events.

- Create and update files in OneDrive and SharePoint.

When Claude sends an email, it includes a message header identifying it as agent-initiated in your mail and file history. Write tools are subject to per-user limits.

**Note:** Attachments aren't currently supported in write tools—Claude can't send, forward, or draft emails with attachments.

## Supported file types

When reading files from SharePoint and OneDrive, Claude can open these formats:

- **Word, Excel, and PowerPoint**, including older .doc, .xls, and .ppt files

- **PDF**

- **Plain-text files**: .txt, .md, .csv, .tsv, .json, .xml, .html, .htm, and .log

Files in any other format can't be read. They still appear in search results because they're ordinary files in your libraries, but when Claude tries to open one, you'll see a "mime type '...' is not allowed" error.

**Note:** OneNote isn't supported. Notebooks show up in search results, but read attempts return a "mime type 'application/msonenote' is not allowed" error. To bring OneNote content into Claude, export pages or sections to Word or PDF in the same library.

## Manage your connection

### Turn individual tools on or off

You can selectively turn off specific tools within Microsoft 365—for example, you might keep document search on but turn off email access. To do this:

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

2. Click on “Microsoft 365.”

3. Toggle the tool on or off under **Tool permissions**.

### Turn the connector on or off per chat

You can also enable or disable Microsoft 365 in a specific conversation.

1. Click the “+” button on the lower left corner of the chat window.

2. Hover over “Connectors.”

3. Find **Microsoft 365** in the list and toggle it on or off.

### Disconnect Microsoft 365

Disconnecting removes Claude's access to your Microsoft 365 data. Reconnecting later doesn't require admin reapproval as long as your admin's consent is still active.

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

2. Find Microsoft 365 in your connected services.

3. Click “Disconnect.”

## What Claude can access

Microsoft 365 stays under your control once connected. A few things to keep in mind:

- **Your permissions apply.** Claude can only access data you can already see in Microsoft 365. If you don't have access to a SharePoint site or aren't a member of a private Teams channel, Claude can't reach that content either.

- **On-demand only.** Claude only accesses Microsoft 365 when you ask a question that needs it. It doesn't run background searches.

- **Write tools are admin-controlled.** Claude can always search and analyze your data. Whether Claude can also take actions like sending email, updating your calendar, or creating files depends on what your admin has enabled. Claude can't post Teams messages or change Teams settings.

- **You can disconnect any time.** Use the steps above to remove Claude's access.

For the full list of permissions the integration requests, see **[Set up the Microsoft 365 connector](https://support.claude.com/en/articles/12542951-)** or the **[Microsoft 365 connector security guide](https://support.claude.com/en/articles/12684923-)**.

---

## Troubleshooting

### Authentication is failing

1. Confirm you're using a Microsoft 365 work account tied to a Microsoft Entra tenant. Personal Microsoft accounts (@outlook.com, @hotmail.com, @live.com) aren't supported.

2. Confirm your Microsoft 365 license is active.

3. If you're not a Microsoft Entra Global Administrator, check with your admin that tenant-wide consent has been granted for Microsoft 365. Without this, you'll see an error during authentication.

4. Your IT team may need to approve third-party app access. If your organization restricts unapproved apps, ask your admin to check organizational policies.

5. Try a different browser, or disable ad blockers and privacy extensions that might block authentication popups.

6. Clear cookies and cache and try again.

### Claude says it can't find a document I know exists

1. Verify you can access the document directly in Microsoft 365.

2. Make sure the document is in SharePoint or OneDrive, not stored locally on your machine.

3. Recently uploaded files may take time to become searchable.

4. Try specifying the SharePoint site or library name in your prompt.

5. Search by exact file name or unique keywords from the document.

### Search results are incomplete or irrelevant

- Be specific about what you're looking for.

- Specify locations, such as site names, date ranges, or document types.

- Use exact phrases for better matching.

- Break complex questions into simpler, more focused ones.

- Double-check spelling of names, projects, or technical terms.

---

## Frequently asked questions

### Can Claude modify my Microsoft 365 data?

Only if your admin has enabled write tools. When they're enabled, Claude can draft and send emails, manage calendar events, and create and update files, always within your existing Microsoft 365 permissions. When they're not enabled, the integration is read-only. Either way, Claude can't post Teams messages or change Teams settings or permissions. Attachments also aren’t supported in write tools, so Claude can’t send, forward, or draft emails with attachments.

### Does Claude search shared drives and team sites?

Yes. Claude can search any SharePoint sites and shared drives you have permission to access, including team sites, communication sites, document libraries, and shared OneDrive folders.

### How do I tell Claude to search a specific place?

Be specific in your prompts:

- *"Search the Engineering team site in SharePoint for architecture documents."*

- *"Find emails from the last week about the Q4 budget."*

- *"Show me Teams discussions with Sarah about the product roadmap."*

- *"Find PowerPoint presentations in SharePoint about sales strategy."*

### Can I point my project at a specific Sharepoint site?

No, `Sites.Selected` is not supported, so you can't scope the Microsoft 365 connector to an allowlist of specific SharePoint sites. The connector searches across all SharePoint content you already have permission to access.

### Why can't Claude read OneNote notebooks?

OneNote isn't currently a supported file type. Notebooks show up in SharePoint search results because they're ordinary files in your libraries, but Claude can't open them, so read attempts return a "mime type 'application/msonenote' is not allowed" error. To work with OneNote content in Claude, export pages or sections to Word or PDF. For the full list of formats Claude can read, see **[Supported file types](#h_ddeb82923f)** above.

### Can Claude search shared mailboxes?

Yes. Claude can search shared mailboxes you have delegate access to in Microsoft 365. This includes full access shared mailboxes and folder-level delegation, such as when you can see only the inbox of another mailbox. Search access follows your existing Microsoft 365 permissions: if you can open a shared mailbox in Outlook, Claude can search it.

### Can Claude search archived emails?

Yes, but only if they're in your primary mailbox. Claude can search every folder in your primary Outlook mailbox, including its Archive folder. Claude doesn't search the separate Online Archive mailbox (also called the In-Place Archive), so messages that a retention policy has moved there won't appear in results. To work with one of those messages, move it back into a folder in your primary mailbox, or open it in Outlook and paste the content into your chat.

### Can Claude summarize long email threads?

Yes. Try a prompt like *"Summarize the email thread about the vendor selection process."* Claude will read the thread and provide a summary with key points and decisions.

### Why don't I see write tools?

Write tools require extra setup on the admin side: a Microsoft Entra administrator needs to consent to updated permissions, and your organization needs to enable write tools for your account. If you connected before write tools launched, ask your admin to complete both steps. For details, see **[Set up the Microsoft 365 connector](https://support.claude.com/en/articles/12542951)**.

### Can Claude access private Teams channels?

Only ones you're a member of. Claude mirrors your Microsoft 365 permissions, so if you can see a private channel, Claude can search it; if you're not a member, it can't.

### What if I try to connect before my admin has set things up?

You'll see an error indicating that an administrator must grant app permissions before you can connect. Ask your organization’s Microsoft Entra Global Administrator to complete consent. If you're on a Team or Enterprise plan, your Claude organization owner also needs to enable Microsoft 365 in organization settings.
---

SOURCE: https://support.claude.com/en/articles/15263885-designate-support-contacts-for-human-support

# Designate support contacts for human support

Choose which members of your organization can open tickets with Anthropic's human support team by designating support contacts. Users who aren't configured as support contacts get help from AI support, which can answer many common questions instantly.

Available on the Enterprise plan, and configurable by Primary Owners and Owners.

## How support routing works

When support contacts are turned on, members of designated groups can reach human support. Everyone else in your organization gets AI support, which handles most questions instantly.

When support contacts are turned off, everyone in your organization gets AI support and no one is routed to a human.

You can also extend human support to all Admins and Owners by checking **Always include Admins and Owners** when configuring support contacts.

## Default settings at launch

When the support contacts setting becomes available, the feature is turned on and **Always include Admins and Owners** is checked. This preserves existing behavior: your Admins and Owners keep human support access without any configuration work, and other users get AI support unless you add them to a designated group.

To grant human support access to additional users (such as a central IT team), designate them in a group through organization settings. To remove human support access for Admins and Owners, uncheck **Always include Admins and Owners**.

## Configure support contacts

Before configuring support contacts, make sure the groups you want to designate already exist in organization settings. Groups can be synced from your identity provider through SCIM or created manually. For more information, see **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**.

To configure support contacts:

1. Navigate to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

2. Find the **Support contacts** section and toggle the feature on.

3. Select the groups whose members should receive human support.

4. Check or uncheck **Always include Admins and Owners** to control whether your organization’s Admins and Owners can reach human support.

5. Save your changes.

To stop routing anyone to human support, turn the **Support contacts** toggle off. All users in your organization will receive AI support only.

## When changes take effect

The **Support contacts** setting will be available in organization settings starting on June 1, 2026. Settings configured between June 1 and June 8 don't affect support routing during this window. Organization settings will show a notice that changes are pending until the feature takes effect.

On June 8, 2026, this setting will take effect for all Enterprise plan organizations. After this date, users who aren't designated as support contacts can only access AI support.
---

SOURCE: https://support.claude.com/en/articles/15425695-covered-models

# Covered Models

Anthropic may designate certain models as “Covered Models” when they cross capability thresholds that warrant additional safeguards or other treatment. This page lists the models currently designated as Covered Models and describes the data handling, privacy, and access policies that apply to them.

**Note:** These policies apply only to the models listed on this page. All other Claude models continue to operate under your existing agreement and configured retention settings.

## What is a Covered Model?

A Covered Model is a Claude model whose capabilities—for example in software engineering, agentic workflows, scientific reasoning, or cybersecurity — represent a substantial step up from prior generations and create elevated risk if misused. Because some forms of misuse only become detectable across many requests, these models require safeguards that operate over a retained window of usage data rather than on a single request at a time.

Anthropic may designate certain models as "Covered Models" when their capabilities warrant additional safeguards or other treatment. When a model is designated as a Covered Model, it will be added to the list below and the policies on this page take effect for that model on every surface where it is offered.

## Current Covered Models

| **Model**       | **Designation date** | **Status**               | **Availability**                                                                                     |
| --------------- | -------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| Claude Mythos 5 | June 9, 2026         | Limited availability<br> | Limited access (approved partners)                                                                   |
| Claude Fable 5  | June 9, 2026         | Generally available      | Claude applications, Claude Platform, Amazon Bedrock, Google Cloud Agent Platform, Microsoft Foundry |

*We will update this list as new models are designated or as existing designations change.*

## Policies that apply to Covered Models

The following policies apply to every Covered Model listed above, on every platform where it is available (Claude apps, Claude Platform, Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry).

### Data retention

- **30-day minimum retention by default.** Prompts and model completions are retained for at least 30 days and then automatically deleted, unless they are subject to a safety investigation or we are legally required to maintain them. Accordingly, zero data retention is not available in workspaces, Claude Enterprise organizations, or third-party platforms (e.g., Azure Subscriptions) where Covered Models can be accessed. Customers who are eligible for zero data retention can continue to use prior Claude models under their existing settings and agreements. Learn more about data retention practices for Covered Models here: **[Data retention practices for Mythos-class models](https://support.claude.com/en/articles/15425996).**

### Use and review of retained data

- **How retained data is used.** Information about how Anthropic uses inputs, outputs, and other information from commercial and consumer plans can be found in our Privacy Center:

  - **[Commercial Customers](https://privacy.claude.com/en/collections/10663361-commercial-customers)**

  - **[Consumers](https://privacy.claude.com/en/collections/10663362-consumers)**

- **Automated review by default.** Retained data is assessed by automated safety systems designed to flag harmful content.

### Security and privacy controls

- **Information security program.** Retained data is protected by Anthropic’s documented information security program, with breach notification in accordance with organizations’ agreements with Anthropic and our Data Processing Addendum.

### Availability and access

- **All surfaces.** These policies follow the model. They apply wherever Covered Models are offered, including third-party cloud platforms.

- **Eligibility.** Some Covered Models (such as Claude Mythos 5) are available only to approved partners under limited access programs. See the table above for current availability.

- **Enablement.** Contact your Anthropic account team to inquire about limited-availability models or grants or our security and privacy controls.

- **BAA customers.** If your organization uses Anthropic’s HIPAA-ready services under a Business Associate Agreement (BAA), see **[Covered Models under Anthropic’s BAA](https://support.claude.com/en/articles/15455031)** for which configurations can access Covered Models as Eligible Services.
---

SOURCE: https://support.claude.com/en/articles/15505325-what-are-customer-managed-encryption-keys-cmek

# What are customer-managed encryption keys \(CMEK\)?

Customer-managed encryption keys are available to eligible organizations on Enterprise plans and the Claude Platform.

A customer-managed encryption key (CMEK) lets your organization provision an encryption key in your own AWS KMS, Google Cloud KMS, or Azure Key Vault and have Anthropic use it to encrypt certain data in Claude, such as your team's chats, projects, and files. You keep full control of the key, and every operation Anthropic performs with your key is recorded in your cloud provider's audit logs. CMEK is optional, and your organization can choose to enable it in place of the default encryption Anthropic provides.

For complete details, including what's encrypted, what's disabled or changed, limitations, and setup guides for each cloud provider, see **[Customer-managed encryption keys on Claude API Docs](https://platform.claude.com/docs/en/manage-claude/cmek)**.
---

SOURCE: https://support.claude.com/en/articles/15594475-what-is-claude-tag

# What is Claude Tag?

**[Claude in Slack](https://claude.com/product/tag)** switched over to the new Claude Tag experience on August 3, 2026. To integrate Claude and Slack, use Claude Tag instead. Learn how to **[set up Claude Tag](https://claude.com/docs/claude-tag/admins/setup-overview)** or **[migrate from the earlier Claude in Slack](https://claude.com/docs/claude-tag/admins/migrate-from-earlier)**.

Claude Tag is a new way to work with Claude: tag @Claude into a conversation and it takes on real work, using your organization's tools and the shared context around it. Claude works under its own identity, builds context by remembering relevant information from the channels it’s in, and can follow up on its own.

Claude Tag is available on Team and Enterprise plans in beta. Claude Tag works in Slack today.

It’s how we’ve brought Claude’s capabilities directly to Slack, bringing AI assistance into your team’s workspace. This integration allows you to work with Claude without leaving Slack through three convenient surfaces:

- **Channel tagging:** Tag @Claude in any channel to hand it a task, and follow along as it works in the thread.

- **Direct message with Claude**: Start a private conversation with @Claude.

- **AI assistant panel**: Click the Claude icon in Slack's AI assistant header to open a panel on the right side of your Slack window, allowing you to access Claude from anywhere in the Slack app.

When you tag @Claude in a channel, Claude works through the task while the whole exchange stays visible to everyone in the channel. Everyone in a channel works with the same Claude, so anyone can steer it or pick up where it left off. Claude can also check in on its own, like posting when a job finishes or tagging you when a thread stalls. To learn more, see the **[Claude Tag overview](https://claude.com/docs/claude-tag/overview)**.

In direct messages and the assistant panel, Claude has the capabilities you've enabled in your own Claude account, like web search and your connected tools. Channel tagging works differently: Claude acts under your organization's identity, using the tools and access an admin set up for that channel, and the work is billed to your organization rather than to you.

---

## Set up Claude Tag

After the Claude app is installed, a Primary Owner or Owner sets up Claude Tag: provision Claude's identity, connect your organization's tools and repositories, and choose which channels Claude Tag can work in. People on your team don't need to set up anything individually once a channel is ready. For the full walkthrough, see the **[Claude Tag setup guide](https://claude.com/docs/claude-tag/admins/setup-overview)**.

**Important:** Only a Primary Owner or Owner can set up Claude Tag's access and channels. The Admin role can't.

---

## Control who can use Claude Tag

In **Organization settings > Claude Tag**, Member Access has three modes: open to anyone in the Slack workspace, open to any member of your Claude organization, or only members whose role allows it. The third option is role-based access and is available on the Claude Enterprise plan. To restrict by role, set Member Access to "Only members whose role allows it" and grant the "Claude Tag in Slack" capability to a custom role. This setting applies to both channel mentions and direct messages. To set member access, see **[Restrict where Claude Tag operates](https://claude.com/docs/claude-tag/admins/restrict-access)**.

[https://www.youtube.com/embed/JhipXUs1Y98?rel=0](https://www.youtube.com/embed/JhipXUs1Y98?rel=0)

## Manage spend limits for Claude Tag

Claude Tag is consumption-based, so spend is based on usage rather than the number of people. As a Primary Owner or Owner, you control it from the usage settings in your admin console.

- **Organization-wide limit:** a hard cap on total Claude Tag spend across every channel. Spend can't exceed it.

- **Per-channel limits:** set a limit on any individual channel, on top of the organization-wide cap. New channels inherit a default limit.

- **Threshold alerts:** admins are notified at 75% and 95% of any limit.

- **Usage analytics:** a per-channel spend breakdown lives on the same page.

**Note:** Work that would go over a limit is declined, never silently cut short. A blocked user can request more from their admin without leaving Slack, and the alert says whether the limit or the available balance caused the block.

Tagging Claude in a channel is billed to your organization. Direct messages are billed to your own Claude account instead.

To set limits, see **[Set spend limits for Claude Tag](https://claude.com/docs/claude-tag/admins/restrict-access#set-spend-limits)**.

## Set access and permissions for Claude Tag

You decide what Claude Tag can reach by setting credentials and repository access at three levels. Each level inherits the permissions and memory of the one above it.

- **Organization-wide:** credentials and repositories that apply everywhere Claude Tag is installed.

- **Workspace:** access that applies to every public channel inside a Slack workspace. Inherits organization-wide permissions and memory.

- **Private channel:** extra credentials or repositories on top of what the workspace already grants. Use a private channel to keep sensitive connections to a smaller group. For example, a channel set up for legal work keeps its tools and memory separate from an engineering channel.

To configure access, see **[Claude Tag identity and access](https://claude.com/docs/claude-tag/concepts/agent-identity)**.

### Channels with guests

Channels that include Slack guests have a separate **Allow Claude to respond to guests** setting that controls whether Claude responds there, and what access Claude has when it does. Choose **Restrict** (the default, which blocks Claude from those channels entirely), **Channel only** (Claude replies, but while a guest is present it runs with channel-only access), or **Allow** (Claude replies with the full access configured for it, as in any other channel). For the full guide, see[**Restrict guest channels**](https://claude.com/docs/claude-tag/admins/restrict-access#restrict-guest-channels).

## Review memory and activity for Claude Tag

Claude Tag keeps context per channel and per workspace. Admins can view, edit, and delete that memory.

An Audit view in **Organization settings > Claude Tag > Audit** lists every scheduled and one-time task across your organization in addition to all network calls made using Agent Identity. Each action is also traceable in the tool where it happened: posts come from the Claude app in Slack, and commits and pull requests show the Claude GitHub App as the author with a link back to the Slack thread that started them. In any channel, you can ask "@Claude what triggers do you have set up here?" to see and turn off standing work.

---

## Privacy and data

### Data storage

Your Slack conversations with Claude remain separate from your Claude history, keeping work organized across platforms.

### Data visibility

- Conversations initiated in Slack are not visible in **[your Claude chat history](https://claude.ai/recents)**.

- Conversations initiated in the Claude web app are not accessible in Slack.

- Each platform maintains separate conversation histories.

### Data deletion

- Conversations are automatically deleted from Claude within 30 days if you disconnect the integration or uninstall the app.

- Your conversations in Slack follow your organization's Slack retention policies.

### Claude Tag memory

Claude Tag remembers context to do its work, so channel and workspace memory is retained rather than discarded after each task. Memory and activity respect channel boundaries, and admins can review or delete what Claude remembers. Channel work is attributed to your organization's Claude identity, while work done in a direct message runs on your own account.

---

## Frequently asked questions

### How is Claude Tag different from the Claude in Slack I already use?

Claude Tag is the next generation of that experience, in the same place. The familiar ways of working still apply, and Claude can now do more: it remembers context across days, schedules its own follow-ups, checks in proactively, and acts under its own identity. An organization’s Primary Owner or Owner opts your organization in to move over.

### Who can set up Claude Tag, and who pays for it?

Only an organization's Primary Owner or Owner can set up Claude Tag's access and channels. Tagging Claude in a channel is billed to your organization. Direct messages are billed to the person’s own Claude account instead.
---

SOURCE: https://support.claude.com/en/articles/15672559-see-your-monthly-recap

# See your monthly recap

Your monthly recap shows you how you’ve been using Claude—the topics you spent time on, when you tend to reach for it, and where you might try something new. It’s designed to reflect your patterns back without judgment so you can decide what, if anything, you’d like to change.

The monthly recap is in beta for users with Free, Pro, and Max plans using Claude on the web or Claude Desktop. It only appears when memory is turned on, and isn't available on Team or Enterprise plans. It's available in all regions where Claude is offered.

## Open your recap

1. Open Claude on the web or Claude Desktop.

2. Go to **[Settings > Reflect](https://claude.ai/settings/reflect)**.

3. Your recap loads for the past month. Click the “Past month” dropdown at the top and select another option to load your recap for a different range (this month so far, past 3 months, past 6 months, past year).

4. You can click the refresh icon next to the dropdown to regenerate the recap for the current range.

**Note:** This feature is rolling out gradually. If you don’t see it yet, check back later.

---

## What your recap shows

### Opening summary

A short headline and paragraph describing your month with Claude. It names the actual work and themes from your conversations rather than offering generic praise.

### Your time with Claude

Three headline stats: your **most active day**, your **peak hour**, and your **total conversations**. Below them, a daily activity chart shows how your conversations were spread across the period.

Below the chart, click “Set quiet hours and breaks” to open your **Time and focus** settings. See **[Set break reminders and quiet hours](https://support.claude.com/en/articles/15672868)** for details.

### What you spent time on

A proportional breakdown of the themes and topics you brought to Claude over the period, each with a short description and percentage.

### Expanding your skills

Observations drawn from your own conversations, framed around four AI fluency skills:

- **Delegation**: what to hand off, and what to keep

- **Description**: the context you give Claude

- **Discernment**: weighing what comes back

- **Diligence**: how you represent AI use in your work

Each card pairs an observation with a concrete next step you can take, like creating a skill or a project. Click “Learn about AI fluency” to read more about the framework.

---

## What’s included in your recap

Claude builds your recap from your recent chats. Because the recap relies on the same chat history that powers memory, it only appears when memory is on. If you turn memory off, the recap is hidden.

Your activity on Claude Mobile is included in your recap even though that page isn’t available on mobile yet.

### Content from connected services

When Claude pulls content from a connected service like Gmail or Google Drive, your recap doesn't incorporate the raw email or file. It may incorporate anything Claude wrote in the chat about it. For example, if you ask Claude to summarize your inbox, the emails themselves aren't pulled into your recap, but the summary Claude wrote is.

### Conversations that are skipped entirely

Some conversations are left out of your recap completely:

- Incognito chats

- Conversations that use a health integration, such as Apple Health or Health Connect

- Activity in Claude Cowork and Claude Code

Learn more about **[memory](https://support.claude.com/en/articles/11817273)**, **[incognito chats](https://support.claude.com/en/articles/12260368)**, and health features on **[iOS](https://support.claude.com/en/articles/11869619-use-claude-with-ios-apps#h_21f4b10d6d)** and **[Android](https://support.claude.com/en/articles/11869629-use-claude-with-android-apps#h_62b72ef926)**.

---

## How your recap handles sensitive topics

People bring all kinds of things to Claude, and some conversations touch on difficult or personal subjects. These are handled with care in your recap:

- Sensitive or distress-related topics never lead your recap.

- They’re never itemized with counts or percentages.

- Where appropriate, support resources appear alongside your recap.

---

## Turn your recap off

Your recap is available by default for eligible accounts where memory is on.

You can disable it by turning **Generate memory from chat history** off in **[Settings > Capabilities](https://claude.ai/settings/capabilities)**. There is no dedicated toggle for the recap, so if the memory setting is on, the recap will also be enabled. Even with memory enabled, your recap is only generated when you navigate to the **[Settings > Reflect](https://claude.ai/settings/reflect)** page; if you don’t land on that page, Claude won’t create a recap for you.

Turning the recap off doesn’t affect your chat history or any break reminders or quiet hours you’ve already set in **[Settings > Time and focus](https://claude.ai/settings/time-limits)**.

---

## Frequently asked questions

### Does viewing my recap use my plan’s usage?

Viewing your recap doesn’t count toward your usage limits. If you start a conversation from a suggestion on the page, that conversation counts toward your usage like any other chat.

### Why don’t I see Reflect in Settings?

Check that memory is toggled on under **[Settings > Capabilities](https://claude.ai/settings/capabilities)**, that you’re on a Free, Pro, or Max plan, and that you’re using Claude on the web or Claude Desktop. The recap isn't available on Team or Enterprise plans or on Claude Mobile.

### Why does a percentage or stat look off?

Claude generates your recap's summary and topic breakdown from your chat history, so occasional inaccuracies can occur in the proportions or the narrative summary. Use the thumbs feedback on the page to let us know if something looks wrong. If you use more than one Claude account, each account’s recap covers that account only.
---

SOURCE: https://support.claude.com/en/articles/15672868-set-break-reminders-and-quiet-hours

# Set break reminders and quiet hours

Break reminders and quiet hours are optional controls you can enable in your Claude settings. A break reminder gives you a gentle nudge after you’ve spent a set amount of time with Claude in a day. Quiet hours add light friction during windows you’ve set aside for something else. Neither is a hard lock, so you can always continue past them.

Break reminders and quiet hours are in beta on Free, Pro, and Max plans. You set them in Claude on the web or Claude Desktop, and they apply across the web, Claude Desktop, and Claude Mobile.

## Set a break reminder

1. Go to **[Settings > Time and focus](https://claude.ai/settings/time-limits)**.

2. Under **Break reminders**, use the dropdowns to choose how much daily time with Claude should pass before you get a nudge.

When you reach the amount you set, Claude shows a reminder. You can stop, snooze it, or dismiss it and keep going.

## Set quiet hours

1. Go to **[Settings > Time and focus](https://claude.ai/settings/time-limits)**.

2. Under **Quiet hours**, click the days of the week you want quiet hours to apply.

3. Choose the start and end times for those days.

If you open Claude during your quiet hours, you’ll see a reminder that you set this time aside. Choose “Continue” to proceed or come back later.

## Change or remove a setting

Return to **[Settings > Time and focus](https://claude.ai/settings/time-limits)** to edit your break reminder or quiet hours. To remove a break reminder, clear the dropdowns. To remove quiet hours from a day, click that day to deselect it.

## How these relate to your monthly recap

These controls also appear as a "Set quiet hours and breaks" link on your monthly recap (**[Settings > Reflect](https://claude.ai/settings/reflect)**), but they work independently. You can set them without ever opening your recap, and turning the recap off doesn't clear them. Learn more about **[the monthly recap](https://support.claude.com/en/articles/15672559)**.

**Note:** Break reminders and quiet hours are boundaries you choose for yourself. They’re separate from your plan’s usage limits. For information on plan usage, see **[How do usage and length limits work?](https://support.claude.com/en/articles/11647753)**
---

SOURCE: https://support.claude.com/en/articles/16059458-inference-hooks-overview

# Inference hooks overview

Inference hooks lets your compliance team inspect and enforce policy on every prompt, tool call response, and uploaded file text before it reaches Claude.

Inference hooks are available in beta to Enterprise plans and cover Claude, Claude Code, Cowork, and all other Claude Enterprise products. They can be turned on and managed by Owners and Primary Owners.

When you turn on inference hooks, Claude sends every prompt to a server you host before it starts generating a response. Your server checks the prompt against your policy, then answers **allow** or **deny**. Claude only continues once it has that answer.

Because this check happens inside Claude’s infrastructure rather than on someone's device, it doesn't rely on anything installed on employees' devices. One setup covers your whole organization: Claude, Claude Code, Cowork, and more, including tool calls made through skills, plugins, and connected tools.

Common uses include data loss prevention, real-time transcript archival, and enforcing your own organization’s policies.

## Technical documentation

For the full technical documentation, including configuring and monitoring the hook, implementing an endpoint, verifying request signatures, and the API reference, see **[Inference hooks](https://platform.claude.com/docs/en/manage-claude/inference-hooks)**.
---

SOURCE: https://support.claude.com/en/articles/16559896-set-up-claude-for-teachers-for-your-school-or-district

# Set up Claude for Teachers for your school or district

**[Claude for Teachers](https://claude.com/solutions/teachers)** is free for verified US K-12 educators, whether you sign up as an individual teacher or your school or district sets up an organization for everyone. Qualifying teachers or organizations that sign up by June 30, 2027 get a full year of free access.

This guide explains how an authorized administrator sets up a free Claude Enterprise organization for their teachers and what comes with it. It's written for district technology leaders and school IT staff.

## What you get

Your school staff get the full Enterprise product (Claude on web, desktop, and mobile, plus Claude Code, Cowork, and Claude Design), the K-12 teaching plugin, the Learning Commons connector with state standards, underlying learning components and progressions, and high-quality curricula, and the same usage allowance as an individual Claude for Teachers account, at no cost. Admins choose which features, models, and connectors are enabled.

Your organization gets one set of **[K-12 terms and a data processing agreement](https://support.claude.com/en/articles/15926041-claude-for-teachers-your-data-and-our-terms)** accepted once for everyone, standard Enterprise admin controls (verified domains, SSO, automatic account creation, roles, usage, and the Compliance API), and a way to bring existing teacher accounts on your domain into the organization.

**Note:** Claude for Teachers is for educators, not students. Student accounts aren't part of this offering.

## Who can apply

US K-12 schools and districts qualify. The person applying must be authorized to set up technology for the school or district, and must apply with a school or district email address.

**Important:** Only one application can be open per email domain at a time, so coordinate within your district so the right person applies. This should be an administrator who can accept the K-12 terms on behalf of all district staff. If you have any issues with your application, **[contact Support](https://support.claude.com/en/articles/9015913-how-to-get-support)**.

## Set up your organization

You'll need your school or district email, a document showing your role (such as an employee ID), access to your domain's DNS records, and access to your identity provider.

1. **Apply and accept the K-12 terms**. Go to[**claude.ai/k12districts**](https://claude.ai/k12districts), confirm you're authorized, and accept the **[US K-12 Terms of Service](https://www.anthropic.com/legal/k12-terms)**, **[US K-12 Public Sector Addendum](http://anthropic.com/legal/k12-addendum),** and **[US K-12 Data Processing Agreement](https://www.anthropic.com/legal/k12-dpa)**.

2. **Verify your school or district.** Our partner Goodstack confirms your affiliation. When approved, you'll get an email link to your new organization.

3. **Verify your email domain**. Add your district's email domain, publish the DNS TXT record shown on the page, and click Verify. Seats open and the free first-year plan applies automatically.

4. **Set up SSO and automatic account creation.** Connect your identity provider, turn on Require SSO, turn on just-in-time or SCIM provisioning, and turn on Restrict organization creation so district emails can't create personal Claude accounts. Once automatic account creation is on, email invitations are disabled. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning)**.

5. **Bring your teachers in.** Click Migrate accounts to start a 30-day window. Every existing Claude account on your domain, including individual Claude for Teachers accounts, is notified and chooses to move everything, start over, or do nothing (the account closes at the deadline; data is kept so Support can recover it). Teachers who join later sign in with SSO and land in your organization directly. See Claim and migrate accounts on your domain.

## Manage your organization

Your organization comes with the standard Enterprise admin controls, all in **Organization settings**. You can manage members and assign roles that control which features, models, and connectors each teacher can use; require district SSO and provision members through SCIM; verify domains and block personal accounts on them; choose which connectors teachers can reach (none are on by default); set a default model and organization-wide instructions; and track usage.

For the full set of admin articles, see the **[Admin management](https://support.claude.com/en/collections/9811449-admin-management)** collection and **[What is the Enterprise plan?](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)**

## Get help

For setup questions, **[contact Support](https://support.claude.com/en/articles/9015913-how-to-get-support)**. Districts working with an Anthropic account team can also reach out to their contact for procurement paperwork, security reviews, or multi-organization setups.
---

SOURCE: https://support.claude.com/en/articles/16563838-get-started-with-claude-science

# Get started with Claude Science

Claude Science is Anthropic's desktop app for scientific research, currently in beta.

Claude Science is available in beta for Pro, Max, Team, and Enterprise plans; on Team and Enterprise plans, an Owner or Primary Owner must first turn it on in **[Organization settings > Claude Science](https://claude.ai/admin-settings/claude-science)**.

The Claude Science app runs on macOS 13 or later, and Linux x64.

Claude Science pairs Claude with a research and analysis environment on your computer: you describe a research task in plain language, and Claude writes and runs code in a sandbox, reads the folders you give it, pulls data from scientific databases through connectors, connects to your own compute clusters, performs long data analyses, and saves results as versioned artifacts with a full provenance record.

For installation, sign-in help, admin controls, what's not available yet, and the changelog, refer to our documentation on Claude Docs: **[Claude Science](https://claude.com/docs/claude-science)**.

To download the app, visit our **[Claude Science product page](https://claude.com/product/claude-science)**.
---

SOURCE: https://support.claude.com/en/articles/7996845-what-are-some-things-i-can-use-claude-for

# What are some things I can use Claude for?

You can use Claude to:

- **Write across different formats and styles.** Claude can help you draft everything from a text message or an email to a screenplay or a novel.

- **Learn something new.** You can ask Claude to teach you how to make Pasta Carbonara, use a new library in Python, learn about 20th century Uruguayan history, or ride a pogo stick.

- **Summarize text.** Claude is great at generating concise summaries of long articles, news stories, documents, conversations, or even books!

- **Code.** Claude can be an extremely helpful 'pair programmer'. While Claude is best at Python, it knows how to code in all major programming languages.

- **Act as a debate or brainstorming partner.** Claude is great to bounce ideas off of, help generate different viewpoints, provide recommendations, and generally converse with.

- **Translate languages.** While Claude is best at English due to its training data, Claude knows more than a dozen languages and can translate between them to varying degrees of success. Some languages Claude is especially good at other than English are Portuguese, French, and German.

- **Analyze images.** Claude can interpret the content of images, and provide assistance on things like analyzing chart data or describing what’s depicted.
---

SOURCE: https://support.claude.com/en/articles/7996853-introduction-to-prompt-design

# Introduction to prompt design

Claude is trained to be a helpful, honest, and harmless assistant. It is used to “speaking” conversationally and you can instruct it in English. Think of Claude as a newly-hired contractor. It doesn’t have any context about you, your task, or your organization. Give it very specific instructions about exactly what you’d like it to do.

For more information on effective prompt design, refer to our **[Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)**.
---

SOURCE: https://support.claude.com/en/articles/7996857-my-prompt-isn-t-giving-me-a-helpful-answer

# My prompt isn’t giving me a helpful answer.

Claude works best when you give it clear and specific instructions. When crafting your prompt, keep the following principles in mind:

- Explain your ask simply and clearly.

- Make sure that your prompt contains as much context as possible. Pretend you are giving these instructions to someone with no background knowledge about what you are asking.

- Break down complex requests into substeps.

- Give Claude feedback: you provide Claude with follow-up instructions, clarifications, or ask it to rewrite an answer.
---

SOURCE: https://support.claude.com/en/articles/7996906-report-block-and-remove-content-from-claude

# Report, block, and remove content from Claude

Anthropic supports a variety of ways to allow people to control their content and personal information. As a site owner, you can control what shows up in Claude outputs that use web search. As a user or member of the public, you can report problematic content that another user shares publicly or that you receive in a Claude output. For each type of concern, follow the reporting instructions below.

Please note, we reserve the right to suspend users who frequently provide manifestly illegal content and suspend the processing of notices for users who frequently submit notices which are manifestly unfounded. We will provide a warning before suspension.

## How to report safety issues

We welcome reports concerning safety issues so that we can enhance the safety and harmlessness of our models. We would also like to hear from you if you identify our safety mechanisms causing any user experience issues. Please report such issues to <usersafety@anthropic.com> with enough detail for us to replicate the issue.

### Help us improve AI safety by reporting universal jailbreaks

This [form](https://docs.google.com/forms/d/1bjD-H30kVJAbIHnFXKzFcSjkUNjE-mwRHSF7R2uSjYM/edit) allows you to submit universal jailbreaks for ASL-3 uses of concern (meaning elicit information related to biological threats) that you've identified. Universal jailbreaks are techniques that allow users to consistently bypass safety measures across multiple harmful queries. Thank you very much for helping us to keep Anthropic safe.

## How to block or remove content

### Block or remove websites from Claude web search

| Remove content from your site                                 | Applicable: all content types<br>Removing content from your site is the best way to ensure that it won't appear in Claude outputs when Claude searches the web.                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Password-protect your files                                   | Applicable: all content types<br>If you have confidential or private content on your site, you need to password protect it to ensure only authorized users can access it. This will also prevent that content from appearing in Claude outputs that rely on web search, or if it already appears, it will eventually remove that content from our search results.                                                         |
| `noindex` tag                                                 | Applicable: all content types<br>The `noindex` robots meta tag is a rule that tells our partners not to index your content so that they don’t send it to us in response to your web search query. Your content can still be linked to and visited through other web pages, or directly visited by users with a link, but the content will not appear in Claude outputs that use web search.                               |
| Disallow crawling with robots.txt                             | Applicable: images and video<br>Our search partners only index images and videos that their bots are allowed to crawl. To prevent them from accessing your media files, use robots.txt rules to block the files.                                                                                                                                                                                                          |
| Disallow Anthropic’s Bots                                     | Applicable: all content types<br>Follow the instructions [here](https://privacy.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).                                                                                                                                                                                                                      |
| Block access to a URL already appearing in Claude outputs<br> | Applicable: all content types<br>Submit a request to <webresultsoptout@anthropic.com>, including information necessary to prove you own the URL, which can be: an [ICANN registration](https://www.icann.org/resources/pages/register-domain-name-2017-06-20-en), [WHOIS lookup result](https://whois.domaintools.com/), domain registration payment receipt, SSL certificate, or use of a domain-specific email address. |

### Block or remove content from shared Claude content

| Report content in-product<br>                        | Applicable: all content within a shared Claude conversation<br>Use the “report” button on the shared content.                                             |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Report content through our standalone reporting form | Applicable: all content within a shared Claude conversation<br>Please report it through [this form](https://claude.com/form/anthropic-content-reporting). |

### Block or remove content from Claude outputs or shared Claude content

| Report content<br> | Applicable: all content types<br>If you believe content violates Anthropic’s usage policies or local laws and should be removed or restricted, you can report it through [this form](https://claude.com/form/anthropic-content-reporting).<br>For copyright and trademark disputes, please follow the instructions [here](https://support.anthropic.com/en/articles/10023646-i-think-a-user-is-infringing-my-copyright-or-other-intellectual-property-how-do-i-report-it). |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
---

SOURCE: https://support.claude.com/en/articles/7996918-what-is-amazon-bedrock

# What is Amazon Bedrock?

Amazon Bedrock is a fully managed service that offers a choice of high-performing

foundation models (FMs) from leading AI companies like Anthropic through a single API,

along with a broad set of capabilities you need to build generative AI applications with

security, privacy, and responsible AI. Using Amazon Bedrock, you can easily experiment

with and evaluate Anthropic’s Claude models for your use case, privately customize

them with your data using techniques such as fine-tuning and Retrieval Augmented

Generation (RAG), and build agents that execute tasks using your enterprise systems

and data sources. Since Amazon Bedrock is serverless, you don't have to manage any infrastructure, and you can securely integrate and deploy generative AI capabilities into your applications using the AWS services you are already familiar with.

You can learn more about Anthropic’s Claude models in Amazon Bedrock [here](https://aws.amazon.com/bedrock/claude/).
---

SOURCE: https://support.claude.com/en/articles/7996920-how-do-i-get-access-to-claude-in-amazon-bedrock

# How do I get access to Claude in Amazon Bedrock?

Get started with Claude in Amazon Bedrock by visiting the [Amazon Bedrock console](https://console.aws.amazon.com/bedrock/). For a step-by-step walkthrough on how to request Claude model access in the Amazon Bedrock console, [view this blog](https://aws.amazon.com/blogs/aws/anthropics-claude-3-5-sonnet-model-now-available-in-amazon-bedrock-the-most-intelligent-claude-model-yet/).
---

SOURCE: https://support.claude.com/en/articles/7996921-i-use-claude-in-amazon-bedrock-who-do-i-contact-for-customer-support-inquiries

# I use Claude in Amazon Bedrock. Who do I contact for customer support inquiries?

[Contact AWS Support](https://aws.amazon.com/contact-us/) for Claude in Amazon Bedrock support inquiries or reach out to your AWS account manager. For community-based support, visit [AWS re:Post](https://repost.aws/).

## How can I get a refund for my usage through Amazon Bedrock?

If you're using Claude through AWS Bedrock, your usage is non-refundable. If you are a customer with a private offer and direct contract with Anthropic for your Bedrock usage, you can reach out to your Anthropic relationship manager for additional assistance.

---

**Note:** For Japanese Customers using Bedrock,  Anthropic will register for Japanese Consumption Tax once it becomes a Japanese Consumption Taxpayer by exceeding the legal thresholds (at the earliest as of FY2026).
---

SOURCE: https://support.claude.com/en/articles/8114487-what-interfaces-can-i-use-to-access-claude

# What interfaces can I use to access Claude?

You access Claude via:

- Chat (**[claude.ai](https://claude.ai)**);

- **[Claude for iOS](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684)**;

- **[Claude for Android](https://play.google.com/store/apps/details?id=com.anthropic.claude)**;

- **[Claude Desktop](https://claude.ai/download)**; and

- **[Claude Console](https://platform.claude.com/)** / **[API](https://docs.claude.com/en/api/overview)**
---

SOURCE: https://support.claude.com/en/articles/8114490-where-can-i-find-your-api-documentation

# Where can I find your API documentation?

You can access our API documentation by visiting our Claude Docs: <https://docs.claude.com/en/api/overview>.
---

SOURCE: https://support.claude.com/en/articles/8114491-get-started-with-claude

# Get started with Claude

## What is Claude?

Claude is a large language model (LLM) built by Anthropic. It's trained to be a helpful, honest, and harmless assistant with a conversational tone.

## How to access Claude

You can access Claude through several platforms:

- **Web**: Visit **[claude.ai](https://claude.ai/)** to chat with Claude in a web browser.

- **Desktop**: **[Download Claude Desktop](https://claude.ai/download)** for Mac or Windows.

- **Mobile**: Download Claude for iOS or Android to chat on your mobile device.

## Supported locations

You must be in one of our **[supported locations](https://support.claude.com/en/articles/8461763-where-can-i-access-claude)** to access Claude.

## Is there an age requirement to use Claude?

You must be at least 18 years old to use our services.

## How to talk to Claude

### What is a prompt?

You use **prompts** to communicate with Claude. The best approach is to speak to Claude like you would a coworker or friend - naturally and conversationally. Your prompts can range from simple questions to complex requests:

- **Simple questions**: "How do I hang a picture frame in my room?"

- **Complex requests**: Multi-step projects, analysis, creative writing, coding, or technical tasks.

### Use the Claude chat interface

Type your prompt into the chat interface and click the submit button to start a conversation with Claude. You can click the "+" button in the lower left or type "/" to view additional options and commands:



---

## Understanding Claude's capabilities

### Which model am I talking to?

The model you're currently chatting with is displayed either below your text input (on web and desktop) or at the top of your screen (on mobile). You can click on the model you're using to open the model selector and switch to another available model.

You can also choose how much effort Claude puts into each response and whether it uses extended thinking. Learn more about **[changing the model, effort, and thinking settings](https://support.claude.com/en/articles/8664678)**.

### Can I chat with Claude in different languages?

Claude has extensive training in English and performs well in many other common languages. It also has some ability to communicate in less common languages and has extensive knowledge of programming languages.

For instructions to select a language in your settings, see **[How to use Claude in your preferred language](https://support.claude.com/en/articles/10769299-how-to-use-claude-in-your-preferred-language).**

### Are there any usage limits or limits on chat length?

While using the free Claude plan, there is a session-based usage limit that will reset every five hours. Also, the number of messages you can send will vary based on demand, and we may impose other types of usage limits to ensure fair access to all users. Claude will notify you when you’ve reached your limit, or if your prompt exceeds the available context window.

For more information about usage and length limits, refer to **[How do usage and length limits work?](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)**

### How do I increase my usage limits?

We also have several paid subscriptions that offer additional usage. For more information, view our guide on **[Choosing a Claude plan](https://support.claude.com/en/articles/11049762-choosing-a-claude-plan)**.

### Can I import my conversation history from another AI provider?

No, it's not possible to import conversation history from another AI provider into Claude at this time. However, Free, Pro, and Max users can use the memory import feature to transfer memory from other AI providers into Claude. For more information, see **[Import and export your memory from Claude](https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude)**.

---

## Tips for getting started

1. **Start simple**: Begin with straightforward questions to get familiar with how Claude responds.

2. **Be specific**: The more specific your request, the better Claude can assist you.

3. **Iterate**: Don't hesitate to refine your prompts or ask follow-up questions.

4. **Explore**: Try different types of tasks - from having Claude answer basic questions to using it as a collaboration partner for more involved projects.

---

## Next steps

Once you've started using Claude, you can:

- **[Customize your appearance settings](https://support.claude.com/en/articles/8887527-customizing-your-appearance-settings)**

- **[Explore Claude’s personalization features](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features)**

- Learn more about designing effective prompts in our **[prompt engineering documentation](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)**.

- For additional features and more usage, consider **[upgrading to a paid plan](https://support.claude.com/en/articles/11049762-choosing-a-claude-plan)**.
---

SOURCE: https://support.claude.com/en/articles/8114518-claude-s-response-to-my-prompt-is-too-brief

# Claude’s response to my prompt is too brief.

Claude’s context window applies to the prompts you provide but not the output it generates. If its responses are too brief or only partially complete, consider retooling your prompts. We recommend giving Claude the previous prompt and response when writing your next prompt to pick up where it left off.
---

SOURCE: https://support.claude.com/en/articles/8114521-how-can-i-access-the-claude-api

# How can I access the Claude API?

Organizations interested in building with the Claude API can create a [Claude Console account](https://platform.claude.com). The Claude Console is where you can create API keys, add users to your team, set up billing, and experiment with Claude on the playground. Please note that access to the API is subject to our [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms).

Read more about [building with the Claude API here](https://claude.com/platform/api).

If you are an alignment researcher and are interested in accessing the API for AI alignment research purposes, read more about accessing the Claude API here: [What is the External Researcher Access Program?](https://support.claude.com/en/articles/9125743-what-is-the-external-researcher-access-program)
---

SOURCE: https://support.claude.com/en/articles/8114523-how-can-i-learn-more-about-claude-api-pricing

# How can I learn more about Claude API pricing?

For our most up-to-date prices, please consult our [pricing page](https://claude.com/pricing#api).
---

SOURCE: https://support.claude.com/en/articles/8114533-i-ve-been-using-other-large-language-models-llms-to-power-my-product-how-should-i-alter-my-prompts-when-switching-to-claude

# I’ve been using other large language models \(LLMs\) to power my product. How should I alter my prompts when switching to Claude?

You can use the prompt improver in the Claude Console to automatically adapt prompts that were originally written for other AI models.
---

SOURCE: https://support.claude.com/en/articles/8114535-where-can-i-go-for-claude-api-support-and-assistance

# Where can I go for Claude API support and assistance?

For our API users, we currently maintain three main resources:

- Our [Client Software Development Kits (SDKs)](https://docs.claude.com/en/api/client-sdks);

- Our [Claude Docs](https://docs.claude.com/en/home); and

- Our community [Discord](https://anthropic.com/discord) where developers can share ideas and exchange tips.

If you need to [contact our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support), you can do so by clicking on the message icon in the bottom right of our Help Center, or by clicking your initials in the lower left corner of your Claude Console account, then "Get help."
---

SOURCE: https://support.claude.com/en/articles/8116515-where-is-the-claude-api-supported

# Where is the Claude API supported?

We support using the Claude API in a [number of locations](https://www.anthropic.com/supported-countries). Please check our website in the future for updates.
---

SOURCE: https://support.claude.com/en/articles/8461763-where-can-i-access-claude

# Where can I access Claude?

You can access Claude in the following locations:

- Albania

- Algeria

- Andorra

- Angola

- Antigua and Barbuda

- Argentina

- Armenia

- Australia

- Austria

- Azerbaijan

- Bahamas

- Bahrain

- Bangladesh

- Barbados

- Belgium

- Belize

- Benin

- Bhutan

- Bolivia

- Bosnia and Herzegovina

- Botswana

- Brazil

- Brunei

- Bulgaria

- Burkina Faso

- Burundi

- Cambodia

- Cameroon

- Canada

- Cabo Verde

- Chad

- Chile

- Colombia

- Comoros

- Congo (Brazzaville)

- Costa Rica

- Croatia

- Czechia (Czech Republic)

- Denmark

- Djibouti

- Dominica

- Dominican Republic

- East Timor

- Ecuador

- Egypt

- El Salvador

- Equatorial Guinea

- Estonia

- Eswatini

- Fiji

- Finland

- France

- Gabon

- Gambia

- Georgia

- Germany

- Ghana

- Greece

- Grenada

- Guatemala

- Guinea

- Guinea-Bissau

- Guyana

- Haiti

- Herzegovina

- Honduras

- Hungary

- Iceland

- India

- Indonesia

- Iraq

- Ireland

- Israel

- Italy

- Côte d'Ivoire

- Jamaica

- Japan

- Jordan

- Kazakhstan

- Kenya

- Kiribati

- Kuwait

- Kyrgyzstan

- Laos

- Latvia

- Lebanon

- Lesotho

- Liberia

- Liechtenstein

- Lithuania

- Luxembourg

- Madagascar

- Malawi

- Malaysia

- Maldives

- Malta

- Mariana Islands

- Marshall Islands

- Mauritania

- Mauritius

- Mexico

- Micronesia

- Moldova

- Monaco

- Mongolia

- Montenegro

- Morocco

- Mozambique

- Namibia

- Nauru

- Nepal

- Netherlands

- New Zealand

- Niger

- Nigeria

- North Macedonia

- Norway

- Oman

- Pakistan

- Palau

- Palestine

- Panama

- Papua New Guinea

- Paraguay

- Peru

- Philippines

- Poland

- Portugal

- Qatar

- Republic of Cyprus

- Romania

- Rwanda

- Saint Kitts and Nevis

- Saint Lucia

- Saint Vincent and the Grenadines

- Samoa

- San Marino

- São Tomé and Príncipe

- Saudi Arabia

- Senegal

- Serbia

- Seychelles

- Sierra Leone

- Singapore

- Slovakia

- Slovenia

- Solomon Islands

- South Africa

- South Korea

- Spain

- Sri Lanka

- Suriname

- Sweden

- Switzerland

- Taiwan

- Tajikistan

- Tanzania

- Thailand

- Togo

- Tonga

- Trinidad and Tobago

- Tunisia

- Türkiye (Turkey)

- Turkmenistan

- Tuvalu

- Uganda

- Ukraine

- United Arab Emirates

- United Kingdom

- United States

- Uruguay

- Uzbekistan

- Vanuatu

- Vatican City

- Vietnam

- Zambia

- Zimbabwe
---

SOURCE: https://support.claude.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on

# Claude is providing incorrect or misleading responses. What’s going on?

In an attempt to be a helpful assistant, Claude can occasionally produce responses that are incorrect or misleading.

This is known as "hallucinating" information, and it’s a byproduct of some of the current limitations of frontier Generative AI models, like Claude. For example, in some subject areas, Claude might not have been trained on the most-up-to-date information and may get confused when prompted about current events. Another example is that Claude can display quotes that may look authoritative or sound convincing, but are not grounded in fact. In other words, Claude can write things that might look correct but are very mistaken.

Users should not rely on Claude as a singular source of truth and should carefully scrutinize any high-stakes advice given by Claude.

When working with web search results, users should review Claude's cited sources. Original websites may contain important context or details not included in Claude's synthesis. Additionally, the quality of Claude's responses depends on the underlying sources it references, so checking original content helps you identify any information that might be misinterpreted without the full context.

You can use the thumbs down button to let us know if a particular response was unhelpful, or write to us at <feedback@anthropic.com> with your thoughts or suggestions.

To learn more about how Anthropic’s technology works and our research on developing safer, steerable, and more reliable models, we recommend visiting: <https://www.anthropic.com/research>
---

SOURCE: https://support.claude.com/en/articles/8606378-how-do-i-use-the-playground

# How do I use the playground?

**Workbench is now the playground**. Playground enables developers to try out Claude models and API features directly in the Claude Console, but does not support saving prompt history or evaluating prompts.

If you have saved data from **Workbench (legacy)** that you wish to export, you can do so until **September 1, 2026** in **[Console settings](https://platform.claude.com/settings/privacy)**. This data will no longer be recoverable after September 1, 2026. See **[How do I export my Workbench data from Console?](#h_ce935c603b)** for more.

## What is the playground?

The playground is built directly on the public **[Messages API](https://platform.claude.com/docs/en/build-with-claude/working-with-messages)**, so the request you build in the playground is the same request you will send in your code.

Use it to:

- Try a model or a new API feature before you write any code

- Iterate on a prompt and inspect the full response

- Learn how API requests and responses are structured

- Export your work as a code snippet you can run in your own application

Playground doesn't store your prompts or conversations on Anthropic's servers. Your current draft stays in your browser, and you can go to the “code" tab to keep a copy of any request.

## Open the playground

1. Log in to the **[Claude Console](https://platform.claude.com/)**.

2. Select "Playground" in the navigation.

3. If your organization uses workspaces, choose the workspace you want to work in.

## Write and run a request

1. Enter a user message in the prompt area. You can also add a system prompt to set instructions or context.

2. Click "Run" to send the request.

3. Review Claude's response, along with the token counts and usage shown for the request.

4. Edit your prompt and run it again to keep iterating.

Playground also includes example templates you can load and modify.

## Choose a model and adjust settings

Use the model selector to switch between Claude models, and open the model settings to adjust parameters like temperature and maximum output tokens.

Running the same prompt with different models or settings is a quick way to see how the response changes. As you think about building your application with the Messages API, use the playground to understand the power of the models.

## Use tools and structured outputs

Add tool definitions to your request to test tool use, and use structured outputs to have Claude return data in a shape you define. Playground shows tool calls and tool results in the response, so you can see exactly how they're represented in the API.

## View the raw request and response

Playground can show the raw API request and response, including the full message structure, stop reason, and usage. This is the same shape your application sends and receives and is a practical way to try out the features of the Messages API.

## Turn your work into code

Click the "code" toggle to export your current request as a code snippet. The snippet reflects exactly what you've tested in the playground, so you can paste it into your project and run it with your own API key.

Code examples in our documentation include an "Open in Playground" option, which loads the example into the playground so you can run and modify it.

---

## How do I export my Workbench data from Console?

1. Go to **[Claude Console](https://platform.claude.com/settings/privacy)**.

2. In the **Export Workbench data** dialog, choose what to include alongside your prompts:

  1. **Model completions** — saved responses from past runs

  2. **Uploaded files** — images and PDFs attached to your prompts
​
​**Note:** Including either may significantly increase the export size.

Primary Owners or Admins also have the option to export data for their entire organization.

3. Select "Export." Your data is packaged as JSON, and we'll email you a download link when it's ready.

Export your data before **September 1, 2026**. It won't be accessible after this date.

---

## Frequently asked questions

### What happened to Workbench (legacy)?

**Workbench (legacy) is now retired.** The playground replaces it for trying Claude models and API features in the Console.  It does not support saving prompt history or evaluating prompts.

### What's the difference between Workbench (legacy) and the playground?

The playground is a simpler, stateless way to try Claude models and API features in the Console. The main differences is that it now:

- It doesn't store your work on Anthropic's servers. Your current draft stays in your browser, and you can export any request as code. With Workbench (legacy) you were able to save prompts, prompt history, and run evals.

- It is built directly on the public Messages API and shows the full request and response, so what you see matches what your code sends and receives.

- Saved prompts, prompt versions, evals, and prompt sharing aren't part of the playground. Use the export function in the legacy version to download your data.

### How do I get access to my existing data from Workbench (legacy)?

You can no longer access this data directly in Console. You can export it as JSON in **[Claude Console](https://platform.claude.com/settings/privacy)** until September 1, 2026. After this date, it will no longer be recoverable.

### Can I import my Workbench data into the playground?

No. The playground doesn't save prompts or conversations, so there's nothing to import into. The export gives you a copy of your Workbench data so you can keep it or move it into your own tools.
---

SOURCE: https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings

# Change the model, effort, and thinking settings

The model menu next to the send button controls three settings: which Claude model you're chatting with, how much effort it puts into each response, and whether it uses thinking. This article explains how to change each one and when to use them.

---

## Change the model

1. Start chatting with Claude or open an existing chat.

2. The selected model and effort level appear next to the send button.

3. To change the model, click on the model name and choose which Claude model you'd like to chat with instead.

4. Click "More models" to view additional options.

If you're on an Enterprise plan and a model or effort level you expect is missing, your administrator may have turned it off for your role.

**Note:** You can change the model, effort level, or thinking setting at any point in a conversation. Changes apply starting with Claude's next response.

---

## Choose an effort level

The effort level controls how much thinking Claude applies to a response. Higher effort means more thorough responses, but they take longer and use more tokens, so you'll reach your usage limits faster.

The effort selector is available for Opus 5, Sonnet 5, Fable 5, Opus 4.8, Opus 4.7, Opus 4.6, and Sonnet 4.6.

To change the effort level:

1. Click the model name next to the send button.

2. Click "Effort."

3. Choose a level.

Each model has a recommended effort level, marked as "Default" in the menu:

- **Low** and **Medium** work well for routine tasks and stretch your usage further.

- **High** offers the best overall balance of quality and speed.

- **Extra high** (xhigh) is designed for long-running coding and agentic tasks, offering deeper reasoning than high without the full token cost of max. Available on Opus 4.7 and newer models.

- **Max** is the most thorough option, best for tasks requiring the deepest possible reasoning and most thorough analysis.

Learn more about **[how usage and length limits work](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)**.

---

## Use thinking

Thinking lets Claude spend more time breaking down problems, planning solutions, and exploring different approaches before responding.

Thinking and effort are separate settings, and you can use any combination of the two. The effort level controls how thorough Claude is with every response. The thinking toggle controls whether Claude works through its reasoning in an expandable section before responding.

Thinking cannot be turned off in Claude when using Claude Opus 5. On the Claude API, thinking can be turned off at effort levels high and below, but attempting to disable thinking at xhigh or max effort returns an error.

### Turn thinking on or off

For models with effort levels:

1. Click the model name next to the send button.

2. Mouse over "Effort."

3. Switch the "Thinking" (or “Extended”) toggle on or off.

For other models:

1. Click the model name next to the send button.

2. Switch the "Extended" toggle on or off.

### View Claude's thought process

When thinking is enabled, you'll see:

- A "Thinking" indicator with a timer showing how long Claude has been processing.

- An expandable "Thinking" section above Claude's response.

Click the "Thinking" section to view Claude's thought process summary and problem-solving approach. Reviewing it can be valuable for verifying how Claude arrived at its conclusion.

### Incomplete thought processes

Occasionally, you may notice that Claude's thinking stops before it's complete, with a message stating that the rest of Claude's thought process is not available.

This happens when Claude's thinking involves information our safety systems have identified as potentially posing an elevated risk of harm or misuse per our **[Usage Policy](https://www.anthropic.com/legal/aup)**.

If the incomplete thought process affects Claude's ability to help with your request, you can try reframing your prompt to help Claude approach the problem from a different angle.

### Choose the right settings for your task

For everyday tasks, the defaults work well. Simple questions, basic information requests, and general writing don't need extra effort or thinking, and lower effort stretches your usage further.

For complex tasks, raise the effort level, turn on thinking, or both. These settings help most with:

- Mathematical calculations and proofs

- Competition-level coding challenges

- Comprehensive project planning

- Detailed document analysis

- Multi-step technical problems

For complex coding and agentic tasks on Opus 4.7 or newer, try Extra high (xhigh) first. For the most difficult, correctness-critical work, choose Max effort and expect longer response times.

Whichever settings you choose, be specific about your problem or question. Clear prompts help Claude use its effort and thinking time effectively.
---

SOURCE: https://support.claude.com/en/articles/8887527-customizing-your-appearance-settings

# Customizing your appearance settings

## How to switch between light and dark mode

1. Log in to your account and click your initials or name in the lower left corner.

2. Navigate to [Settings > Appearance](https://claude.ai/settings/appearance).

3. Select from Light, Match System, and Dark under **Color mode**.



## How to change your font

1. In [Settings > Appearance](https://claude.ai/settings/appearance), find **Chat font**.

2. Select from Default, Match System, and Dyslexic Friendly.



## Can I disable the sidebar?

It's not currently possible to completely disable the sidebar. You can click the button on the top right of the sidebar to open or close it.


---

SOURCE: https://support.claude.com/en/articles/8987200-can-i-use-the-claude-api-for-individual-use

# Can I use the Claude API for individual use?

Yes, individuals and hobbyists are welcome to use the Claude API. However, please note that use of the API is subject to our [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms), regardless of whether you are an individual or representing a company.
---

SOURCE: https://support.claude.com/en/articles/9002504-can-claude-produce-images

# Can Claude produce images?

Claude doesn’t generate photos or illustrations the way image-generation tools do.

Claude can, however, build diagrams, charts, and interactive visuals directly in your conversation to assist with your understanding. These are generated using HTML and SVG—so you can interact with them, ask follow-up questions, and have Claude adjust them as you go. This feature is in beta on Claude web and desktop. For additional details, see **[Custom visuals in chat](https://support.claude.com/en/articles/13979539-custom-visuals-in-chat)**.

Claude can also view and analyze images you upload. For more, see **[Uploading files to Claude](https://support.claude.com/en/articles/8241126-uploading-files-to-claude)**.
---

SOURCE: https://support.claude.com/en/articles/9015913-how-to-get-support

# How to get support

This guide explains how to get support for your Claude or Console account. Different support options are available depending on your plan. Support is provided in writing through the support messenger and email. We don't offer phone support.

## Pro and Max plans, Team and Enterprise plan owners, and Console Admins

You have full access to:

- All help documentation

- Fin, our AI support bot

- Further assistance from our Product Support team

While we don't offer phone or live chat support, our Product Support team will gladly assist you through our support messenger.

**Note for Enterprise admins:** Primary Owners and Owners can configure which members of their organization reach human support by designating support contacts. By default, Admins and Owners keep human support access. For configuration details, see **[Designate support contacts for human support](https://support.claude.com/en/articles/15263885-)**.

### Seeking support for Claude

1. Log in to your Claude account.

2. Click your initials or name in the lower left corner and select “Get help” from the menu.

3. In the support messenger:

  - Search help resources

  - Chat with Fin, our AI support bot

4. Click “Send us a message” to start chatting with Fin.

5. Click "Accept," then select your issue from the available options.

6. Depending on the selected issue, provide additional details when prompted.

7. If your issue requires additional investigation or input from our Product Support team, Fin will pass your inquiry along. The team's reply appears in this same conversation. You'll see it in the messenger and receive a copy by email at the address on your Claude account, so you don't need to keep this window open.

### Seeking support for the Claude API or Console

1. Log in to your **[Console account](https://platform.claude.com)**.

2. Click your initials or name in the lower left corner of the Console and select “Get help” from the menu.

3. This will open a support messenger in the lower right corner of the Console.

4. In the support messenger:

  - Search help resources

  - Chat with Fin, our AI support bot

5. Click “Send us a message” to start chatting with Fin.

6. Click "Accept," then select your issue from the available options.

7. Depending on the selected issue, provide additional details when prompted.

8. If your issue requires additional investigation or input from our Product Support team, Fin will pass your inquiry along. The team's reply appears in this same conversation. You'll see it in the messenger and receive a copy by email at the address on your Claude account, so you don't need to keep this window open.

### Seeking support for any account type from the Help Center

Users who are logged in to their Claude or Console accounts will be able to click the icon in the lower right corner of any Help Center page to open the support messenger and start chatting with Fin.

## What happens after you message us

Support is asynchronous. After your request reaches our team, a specialist investigates and replies in the same conversation. Response times vary by plan and by the severity of the issue.

### Chat and email are the same conversation

- Every reply we send appears in the support messenger and is emailed to the address on your Claude account (the account you were signed in with when you started the conversation).

- Replying to that email continues the same conversation. You don't need to return to the chat, and you can close the chat window at any time without missing our reply.

- Keep one conversation per issue. Opening a second request for the same problem creates a duplicate that has to be re-triaged, which usually slows the answer down. If you haven't heard back, reply in your existing conversation instead.

### Keep colleagues in the loop

- A conversation started in the messenger includes only you. To bring in a colleague, such as the affected user or your IT admin, reply to the conversation from the email thread and cc them. Their replies join the same conversation.

- Enterprise organizations can also **[designate support contacts](https://support.claude.com/en/articles/15263885)** and **[view their organization's support tickets in one place](https://support.claude.com/en/articles/15937951)**.

- If you're reporting an issue on behalf of someone else, include their work email address, any error messages or screenshots, and when the issue started in your first message. This avoids an extra round of questions.

## Team and Enterprise plan non-owners, and Console non-Admins

You’ll chat with Fin, an AI support agent, to help answer your questions.

### Team plans and Console organizations

Human specialist support is not directly available for your account seat type. If Fin can't find a resolution and you need to escalate to our human team of specialists, your account's Primary Owner, Owner, or Console Admin can reach out on your behalf.

### Enterprise plans

Primary Owners and Owners can designate support contacts: members who can reach human support without holding an Owner role. If you're a designated support contact, you'll have the option to wait for a human when chatting with Fin. Otherwise, Fin will handle your conversation, and if escalation is needed, your account's Primary Owner, Owner, or a designated support contact can reach out on your behalf.

For configuration details, see **[Designate support contacts for human support](https://support.claude.com/en/articles/15263885-)**.

## Free Claude users

Free Claude users have access to:

- All help documentation

- Fin, our AI support bot

- **[Account deletion](https://support.claude.com/en/articles/9028421-how-can-i-delete-my-claude-account)** support in cases where self-serve is unavailable

To get support:

1. Log in to your Claude.ai account.

2. Click your initials or name in the lower left corner.

3. Select "Get help."

4. Use the support messenger to:

  - Search help resources.

  - Chat with Fin, our AI support bot.

## Unable to log in?

If you can't access your account, we can still help with:

1. Account deletion

2. Data exports

3. Subscription support

To request assistance:

1. Click the message icon in the lower right corner of the Help Center.

2. Start a conversation.

3. Select "I can't login."

## About subscription support

If you're a paid subscriber having trouble accessing your account, our team can:

- Help locate login information

- Process subscription cancellations

- Check refund eligibility

**Note:** In order to assist with these tasks, we will need to validate details about your account and the payment method used.

## Designated point of contact for users in the EU

Users in the EU can find instructions on how to find the single point of contact for users in the EU under the DSA here: **[Designated point of contact for users in the EU](https://support.claude.com/en/articles/11595103-)**.

## Report compliance concerns - UK and Australian users

- Users in the UK can find instructions to report non-compliance with UK OSA duties here: **[Report a concern](https://docs.google.com/forms/d/e/1FAIpQLSfdo76veqg3pHZTh_nI14j1DyRO8coz6ocTa9mEuF5DcYgxuA/viewform)**. This includes reporting related to illegal content safety duties, content reporting obligations, freedom of expression and privacy, or the use of proactive technology by Anthropic in breach of Anthropic’s Terms of Service.

- Users in Australia can find instructions to report non-compliance with the DIS Standard and information about the role and functions of the eSafety Commissioner here: **[Report a Concern: Australian DIS Standard compliance](https://support.claude.com/en/articles/12335811-report-a-concern-australian-dis-standard-compliance)**.

---

## Frequently asked questions

### Do you offer phone or video support?

No. Support is provided in writing through the messenger and email. Enterprise customers who need a live working session can arrange one through their Anthropic account team.

### Can I close the chat window while I wait?

Yes. Replies are delivered to the messenger and to your account email, so you won't miss one.

### Which email address will you use to reply?

The email address on the Claude account you were signed in with when you started the conversation.
​

### I haven't heard back. Should I open another request?

No. Reply in your existing conversation, in the messenger or by email, and it moves back into the queue with its history intact.
​

### I have a business-critical outage. Is there a faster path?

Organization owners and admins on qualifying Enterprise plans have prioritized options in the messenger. Platform status is always available on **[our status page](https://status.claude.com)**.
---

SOURCE: https://support.claude.com/en/articles/9020328-csam-detection-and-reporting

# CSAM Detection and Reporting

Anthropic strictly prohibits Child Sexual Abuse Material (CSAM) on our services. We are committed to combatting CSAM distribution across our products and will report flagged media and related information to the National Center for Missing and Exploited Children (NCMEC).

As just one example of how we are combatting CSAM distribution: on our first-party services, we use a hash-matching tool to detect and report known CSAM that is included in a user or organization’s inputs. This tool provides access to NCMEC’s database of known CSAM hash values. When an image is sent in an input to our services, we will calculate a perceptual hash of the image. This hash will be automatically compared against the database. In the case of a match, we will notify and provide NCMEC information about the input and the related Account.

As part of Anthropic’s safety process, we will also send a notice to the user or organization any time we report CSAM to NCMEC. If you receive a notification from us about CSAM detection and believe we’ve made an error, please email <usersafety@anthropic.com>.
---

SOURCE: https://support.claude.com/en/articles/9035075-law-enforcement-requests

# Law Enforcement Requests

Anthropic PBC discloses account records solely in accordance with our Terms of Service and applicable law. For more information about Anthropic’s policies for handling governmental requests for user information, see [here](https://support.anthropic.com/en/articles/9519291-what-is-anthropic-s-policy-for-handling-governmental-requests-for-user-information). If you are a law enforcement agent who is authorized to gather evidence in connection with an official investigation, you may request records from Anthropic by emailing <law-enforcement-requests@anthropic.com>.

Please include the following information with your request:

- Law Enforcement Agency Country

- City

- State/Province

- Zip/Postal Code

- Law Enforcement Address

- Name of Court/Policy Department/Authority/Agency

- Name of Contact Person Handling this Matter (Detective, Investigator, etc.)

- Official Law Enforcement Agency Request Email Address

- Contact Person’s Phone Number

- Description of legal Inquiry

- Matter Type of legal Inquiry

- Attach Any Relevant Documentation (e.g., Subpoena, Warrant)

- NCMEC Report Identifier (If Applicable)
---

SOURCE: https://support.claude.com/en/articles/9190861-terms-of-service-updates

# Terms of Service Updates

At Anthropic, we review our policies and terms to ensure we’re providing the highest level of protection and clarity for our users. This support article covers the changes to our [Consumer Terms of Service](https://url8792.mail.anthropic.com/ls/click?upn=Lkx8Cped8oFc76RI0OmCv1x2RnLlvUgqfB7RzVLsApSvXyt2orRCkRvrp5vRvHrkM02x8yqyYKxTIS8oXAHw9g-3D-3DfJPg_p0ShPCpPTvtmEuEJGvYe3eZztZgqCzhfInQjZFOB8cYRmzkXlX-2F26zBeoLc5XmuQcIC7AByEcAH6aKBGtzcqbozCwRm-2BFPGZ8TunE3aWyP81EjtJMYEdpRjsVGDi8bK9mMPPBDadFxbbkgmw739a6fHxTbnAi8Y4aCFW42Nzyn3HMexOLV6MJQ2RonSn6heCcZqEyvBkh7G4p1ikXL1I6yft9HcHGhdu1-2BG-2FQyYgk9rdJLRDz2gl-2FdqJEOwYFJNAo74gNvaRKihUP3-2FUP-2BImT68RTvLpJZW84cDDNBnEyceCsra2ryL1x8ixmbViPSic-2FDY82VodR-2FVC-2FFE4sPfHzaekeNRxJ1QfWsFVbfdCLAxUejSPkAGef5ImpnY3vViNI8t7n-2FAbj9PolZu13aEYzJL-2F7LQzKU0WLq8J6xqgXE4vY5aJtasTuusml2A6XwFW-2F95oNGiNMk3EQ94rYU3ZzzDdq0TBqHhCV-2F0dcg3hJp2Z8CdIPbRPl7yGN4tOqRT8-2BR3PgxEC4njObPO7Qne-2Bv0dTtvznflhiMHNxWgYqJ5hNB-2B7T03wQo4RQDlV9ct1yYtoLXpXIdjbCIcN2knP2ekj-2FK63d58EDAOWn313Morx49RRMPpfuOqzFopOJ85GYnwYNfQeiSqTNH4Trw1bM7sgjHSrBFOz8WXL4xvxYZZagHoT2vejvIOh3WeyNBx7l05SzFFTM-2F1sKyVjecSmLTyvuc8hFD3YE8IiIAIpeVVdIMjEBtQYynO0Zn96llK6apib8fLvf2zHKIw9-2BOoAxTBKDnYOb4aalzMKjayA41b7ailwCpHlXSAQYlXuvZyGfyXULmF2hL3lkzKyTVOUafBDqUDUHjfg3vbRljY4ydRU9OU-2FI3pI58FjsOoj-2FcGm8uHJ0nRiTYzFbacJXiyZvA3BiRQihR8D2m563hLFZaTPWvgXyOaWo6p3ta9sqEI-2BeRT3c4V8RCDMqVyx27-2BsnWyFKD8hy6hxLpY1RSbOLxLHtZ-2FkvnvQY1wVQWLt5dmEZwR-2FeTVF7t23IA6rbHMeoTg-3D-3D) that take effect **April 15, 2024**.

We encourage you to read our updated [Terms of Service](https://anthropic.com/terms) in full, but here is a summary of key changes:

- **Enhanced clarity.** With some help from Claude, we reorganized and simplified our Terms of Service to make them easier to understand.

- **“Provider” definition.** We updated the definition of “Providers” to include our affiliates, licensors, distributors, and service providers. We also clarified that our Providers are intended third-party beneficiaries of specified disclaimers and limitations of liability.

- **Software updates.** We clarified our terms about software updates, including that we may offer automatic updates to our software to ensure our users have access to the latest version.

- **Open Source.** We have also clarified that our software may include open source software and describe how open source license terms interact with our Consumer Terms of Service.
---

SOURCE: https://support.claude.com/en/articles/9264813-consumer-terms-of-service-updates

# Consumer Terms of Service Updates

This support article covers the changes to our [Consumer Terms of Service](https://www.anthropic.com/legal/consumer-terms) that take effect **May 1, 2024.** At Anthropic, we review our policies and terms to ensure we’re providing the highest level of protection and clarity for our users.

We encourage you to read our updated [Consumer Terms of Service](https://www.anthropic.com/legal/consumer-terms) in full, but at a high level, our latest updates provide clarity about how you can pay for and manage your subscription to our consumer services (like Claude Pro), if you purchased your subscription via an app.

In case you haven't heard, Claude is now available as an iOS app via the [Apple App Store](<>), putting the power of AI right in your pocket! And for businesses looking to supercharge their productivity, the new [Team plan](https://www.anthropic.com/claude) helps you collaborate with Claude like never before.
---

SOURCE: https://support.claude.com/en/articles/9267276-roles-and-permissions

# Roles and permissions

What an individual can see and do in their Team or Enterprise plan account is dictated by their role. Roles are provisioned with the following permissions.

**Important notes about the Primary Owner role:**

- Team and Enterprise organizations can only have one Primary Owner.

- The Primary Owner seat uses one of your plan's licenses.

- Your organization's Primary Owner can be a service account that isn't tied to an individual user.

- If you're unsure of your organization's Primary Owner, you can check by going to **[Settings > Account](https://claude.ai/settings/account)**.

**About custom roles (Enterprise plans only):** Enterprise plans support custom roles, which let you control feature access at the group level. Members with roles set to “Custom” have no default permissions—their access is determined entirely by the custom roles assigned to their groups. Because these members have no built-in permissions, they don't appear in the tables below.

To learn more, refer to the following articles:

- **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**

- **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**

## Billing

|                            | User | Admin | Owner | Primary Owner |
| -------------------------- | ---- | ----- | ----- | ------------- |
| View/pay for invoices      |      |       | ✅     | ✅             |
| Add/modify billing methods |      |       | ✅     | ✅             |
| Provision new seats        |      |       |       | ✅             |

## Chat Controls

|                         | User | Admin | Owner | Primary Owner |
| ----------------------- | ---- | ----- | ----- | ------------- |
| Create and modify chats | ✅    | ✅     | ✅     | ✅             |
| Use projects            | ✅    | ✅     | ✅     | ✅             |

## Features and Integrations

|                            | User | Admin | Owner | Primary Owner |
| -------------------------- | ---- | ----- | ----- | ------------- |
| Enable native integrations |      |       | ✅     | ✅             |
| Enable custom integrations |      |       | ✅     | ✅             |
| Enable capabilities        |      |       | ✅     | ✅             |
| Enable public projects     |      |       | ✅     | ✅             |

## Membership Management

|                                   | User | Admin | Owner | Primary Owner |
| --------------------------------- | ---- | ----- | ----- | ------------- |
| Invite new members                |      | ✅     | ✅     | ✅             |
| Remove members/cancel invitations |      | ✅     | ✅     | ✅             |
| Invite/remove new Admins/Owners   |      |       | ✅     | ✅             |
| Modify roles                      |      |       | ✅     | ✅             |

## Prioritized Support Routing (Enterprise plan only)

|                             | User | Admin | Owner | Primary Owner |
| --------------------------- | ---- | ----- | ----- | ------------- |
| Prioritized Support routing |      |       | ✅     | ✅             |

## Security and Data Controls (Team and Enterprise plans)

|                                     | User | Admin | Owner | Primary Owner |
| ----------------------------------- | ---- | ----- | ----- | ------------- |
| Request data exports                |      |       |       | ✅             |
| Request Primary Ownership transfers |      |       |       | ✅             |

## Security and Data Controls (Enterprise plan only)

|                                | User | Admin | Owner | Primary Owner |
| ------------------------------ | ---- | ----- | ----- | ------------- |
| Manage SSO / auth              |      |       | ✅     | ✅             |
| Request audit logs             |      |       | ✅     | ✅             |
| Manage data retention controls |      |       | ✅     | ✅             |
| Manage<br>feedback settings    |      |       | ✅     | ✅             |

## Usage Analytics (Enterprise plans)

|                      | User | Admin | Owner | Primary Owner |
| -------------------- | ---- | ----- | ----- | ------------- |
| View usage analytics |      | ✅     | ✅     | ✅             |

## Usage Analytics (Team plans)

|                      | User | Admin | Owner | Primary Owner |
| -------------------- | ---- | ----- | ----- | ------------- |
| View usage analytics |      |       | ✅     | ✅             |
---

SOURCE: https://support.claude.com/en/articles/9402418-why-was-my-card-declined

# Why was my card declined?

There are several reasons your card may have been declined when trying to process this transaction. While we don't receive detailed information from issuing banks regarding the specific reasons for a decline, there are several common factors that may contribute to this issue. A few ideas to try are:

## Ensure supported billing location

Please review our list of **[supported billing locations](https://www.anthropic.com/supported-countries)** to confirm that your payment method's billing address and origin country are eligible for processing. Ensure that your payment method’s billing address matches the origin country.

## Verify billing address

Ensure that the billing address associated with your payment method matches the address on file with your bank. Even minor discrepancies, such as a missing accent mark or a misspelled street name, can trigger a decline.

## Complete 3DS verification (if applicable)

If your transaction requires 3D Secure (3DS) verification, ensure that you have successfully completed the authentication process. This may involve entering a one-time password sent to your registered mobile device or confirming the transaction through your bank's app or website.

## Use an accepted payment method

We accept credit cards and debit cards for all purchases. For **[self-serve Enterprise plans](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan#h_634d59a83f)** and API accounts on monthly invoicing, we also accept to ACH bank transfers.

Please note that we do not accept third-party payment processors such as PayPal or Venmo. If you attempt to use an unsupported payment method, your transaction will likely be declined.

## Confirm sufficient funds

Verify that your payment method has sufficient funds to cover the total amount of your purchase. If you're unsure about your account balance, we recommend contacting your bank directly for assistance.

## Retry the payment

If you have access to another payment method, consider using it to complete your purchase. It may be worthwhile to attempt the transaction again at a later time as temporary technical issues or network disruptions can sometimes cause declines, which may resolve on their own.

## Contact your bank

Reach out to your issuing bank directly to inquire about the reason for the decline. They may be able to provide additional information or insights that can help you resolve the issue.

If you've tried the troubleshooting steps above and are still encountering difficulties, contact **[our support team](https://support.claude.com/en/articles/9015913-how-to-get-support)** for further assistance.
---

SOURCE: https://support.claude.com/en/articles/9970975-access-audit-logs

# Access audit logs

Audit logs are available for Enterprise organizations only.

Organization Owners and Primary Owners can export data within **[Organization settings > Data and Privacy](https://claude.ai/admin-settings/data-privacy-controls)** and clicking the "Export logs" button. Upon triggering this export, all audit logs for the organization within the past 180 days will be aggregated. The Owner who requested the export will receive an email containing a download link, which is active for 24 hours. Note that there may be a delay between triggering the export and receiving the email as logs are aggregated.

Please note that title and content of chats and projects are not available to be exported in audit logs (only their unique identifiers will be exported). However, chat inputs/outputs will be exportable by Primary Owners via **[data exports](https://support.claude.com/en/articles/9450526-how-can-i-export-my-claude-data)**.

**Note:** You can’t export data using the "Export logs" button if your organization uses customer-managed encryption keys on an Enterprise plan. Audit log events are available in the Compliance API. For more information, refer to **[Access the Compliance API](https://support.claude.com/en/articles/13015708-access-the-compliance-api)**.

## Log Structure

Audit logs consist of the following columns:

| **Column Name**  | **Type**           | **Description**                                                                                                                   |
| ---------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| created\_at      | datetime           | When the log was written                                                                                                          |
| actor\_info      | dict[str, Any]     | Information on the actor, if available                                                                                            |
| event            | AuditEventType     | Type of event.                                                                                                                    |
| event\_info<br>  | dict[str, Any]<br> | Other relevant information for a given event type.                                                                                |
| entity\_info     | dict[str, Any]     | Entity affected by the operation, if relevant. In general, the entity represents what is affected by the event.                   |
| ip\_address      | str \| None        | IP Address corresponding to the event, if available.                                                                              |
| device\_id       | str \| None        | Device ID corresponding to the event, if available.                                                                               |
| user\_agent      | str \| None        | User Agent header corresponding to the event, if available. Contains information detailing the program used to execute the event. |
| client\_platform | str \| None        | Client Platform corresponding to the event, if available. Corresponds to mobile platforms, either iOS or Android.                 |

## Entities

The entities that can be affected by events. Entity info follows this structure:

| **Field Name** | **Field Type**         | **Notes**                                      |
| -------------- | ---------------------- | ---------------------------------------------- |
| type           | AuditEntityType        | Type of the entity.                            |
| uuid           | str                    | UUID for the entity.                           |
| name           | str \| None            | Name for the entity, when available            |
| metadata       | dict[str, Any] \| None | Metadata related to the entity, when available |

| **AuditEntityType**     | **Metadata**                                                                                                        | **Description**                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| account                 | email\_address: email address on the account                                                                        | User accounts.                                                    |
| invite                  | role: Role the invite is for                                                                                        | Invite to join a team/organization                                |
| chat\_project           | is\_private: The visibility of the project                                                                          | Project consisting of chats                                       |
| chat\_project\_document | project\_uuid: UUID of the project this document is related to                                                      | Document in the knowledge base of a chat project                  |
| chat\_conversation      | project\_uuid: UUID of the project this conversation is a part of, if relevant                                      | Chat conversation with Claude. Can be in a project or standalone. |
| file                    | n/a                                                                                                                 | File uploaded to Claude                                           |
| sso\_connection         | connection\_type: Type of SSO connection<br>state: Connection state<br>domains: Domain(s) related to SSO connection | SSO connection                                                    |

## Recorded Events

| **Event**                                  | **Description**                                                 | **Event Info**                                                                                                                                    | **Entity Type**         | **Date added** |
| ------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------- |
| user\_verified\_phone\_code                | User verified using the sent phone code.                        | phone\_number: The phone number used<br>channel: SMS or Call                                                                                      | n/a                     | 2024-09-04     |
| user\_signed\_out                          | User signed out from their account.                             |                                                                                                                                                   | n/a                     | 2024-09-04     |
| user\_signed\_in\_sso                      | User signed in via SSO.                                         | domain: The relevant SSO domain                                                                                                                   | n/a                     | 2024-09-04     |
| user\_signed\_in\_google                   | User signed in via Google.                                      | email\_address: The email address used.                                                                                                           | n/a                     | 2024-09-04     |
| user\_signed\_in\_apple                    | User signed in via Apple.                                       | email\_address: The email address used.                                                                                                           | n/a                     | 2024-09-04     |
| user\_sent\_phone\_code                    | User sent a phone code.                                         | phone\_number: The phone number used<br>channel: SMS or Call                                                                                      | n/a                     | 2024-09-04     |
| user\_requested\_magic\_link               | User requested a magic link.                                    | email\_address: The email address the link is sent to.<br>is\_successful: Whether the request is successful or not.                               | n/a                     | 2024-09-04     |
| user\_name\_changed                        | User changed the name on their account.                         | old\_name: The previous name.<br>new\_name: The new name.                                                                                         | n/a                     | 2024-09-04     |
| user\_attempted\_magic\_link\_verification | User attempted to verify using a magic link                     | email\_address: The email address the link is sent to.<br>is\_successful: Whether the verification is successful or not.                          | n/a                     | 2024-09-04     |
| project\_visibility\_changed               | The visibility of a project has been changed by a user.         | updated\_privacy: The new privacy/visibility of the project.                                                                                      | chat\_project           | 2024-09-04     |
| project\_renamed                           | A project has been renamed by a user.                           |                                                                                                                                                   | chat\_project           | 2024-09-04     |
| project\_document\_deleted                 | A document has been deleted from a project’s knowledge base.    |                                                                                                                                                   | chat\_project\_document | 2024-09-04     |
| project\_document\_created                 | A document has been added to a project’s knowledge base.        |                                                                                                                                                   | chat\_project\_document | 2024-09-04     |
| project\_deleted                           | A project has been deleted by a user.                           |                                                                                                                                                   | chat\_project           | 2024-09-04     |
| project\_created                           | A project has been created by a user.                           |                                                                                                                                                   | chat\_project           | 2024-09-04     |
| org\_user\_invite\_sent                    | An invite was sent to the user to join the organization.        |                                                                                                                                                   | chat\_project           | 2024-09-04     |
| org\_user\_invite\_rejected                | A previously sent invite to a user was rejected.                | invited\_role: Role that the invitation was for.                                                                                                  | invite                  | 2024-09-04     |
| org\_user\_invite\_re\_sent                | An invite was re-sent to the user to join the organization.     | invited\_email\_address: Email address invite is sent to.<br>invited\_role: Role the invite is for.<br>invite\_uuid: UUID for the created invite. | account                 | 2024-09-04     |
| org\_user\_invite\_deleted                 | A previously sent invite to a user was deleted.                 | invited\_email\_address: Email address invite is sent to.<br>invited\_role: Role the invite is for.                                               | invite                  | 2024-09-04     |
| org\_user\_invite\_accepted                | A previously sent invite to a user was accepted.                | invited\_role: Role the invite is for.                                                                                                            | invite                  | 2024-09-04     |
| org\_user\_deleted                         | A user was deleted from the organization.                       |                                                                                                                                                   | account                 | 2024-09-04     |
| org\_sso\_toggled                          | SSO connections for the organization have been toggled.         | sso\_enforced: Whether SSO is enforced or not.                                                                                                    |                         | 2024-09-04     |
| org\_sso\_connection\_deleted              | A previously existing SSO connection has been deleted.          |                                                                                                                                                   | sso\_connection         | 2024-09-10     |
| org\_sso\_connection\_deactivated          | A previously existing SSO connection has been deactivated.      |                                                                                                                                                   | sso\_connection         | 2024-09-10     |
| org\_sso\_connection\_activated            | A new SSO connection has been activated.                        |                                                                                                                                                   | sso\_connection         | 2024-09-10     |
| org\_sso\_add\_initiated                   | An attempt to add SSO for this organization has been initiated. |                                                                                                                                                   | n/a                     | 2024-09-04     |
| org\_jit\_toggled                          | JIT for the organization has been toggled.                      | jit\_provisioning\_enabled: Whether this feature is enabled.                                                                                      | n/a                     | 2024-09-04     |
| org\_domain\_verified                      | Domain capture was verified for this organization.              | domain: Domain that has been verified.                                                                                                            | n/a                     | 2024-09-04     |
| org\_domain\_add\_initiated                | Domain capture was initiated for this organization.             |                                                                                                                                                   | n/a                     | 2024-09-04     |
| org\_data\_export\_started                 | Organization data export started.                               | export\_type: All organization data.<br>initiated\_by\_anthropic: Did Anthropic start the export (yes/no)?                                        | n/a                     | 07/15/2025     |
| org\_data\_export\_completed               | Organization data export completed.                             | export\_type: All organization data.<br>initiated\_by\_anthropic: Did Anthropic start the export (yes/no)?                                        | n/a                     | 07/15/2025     |
| file\_uploaded                             | A file has been uploaded.                                       |                                                                                                                                                   | file                    | 2024-09-04     |
| conversation\_renamed                      | A conversation has been renamed.                                | new\_name: New name for the conversation.                                                                                                         | chat\_conversation      | 2024-09-04     |
| conversation\_deleted                      | A conversation has been deleted.                                |                                                                                                                                                   | chat\_conversation      | 2024-09-04     |
| conversation\_created                      | A conversation has been created.                                |                                                                                                                                                   | chat\_conversation      | 2024-09-04     |