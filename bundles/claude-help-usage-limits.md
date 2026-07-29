
---

SOURCE: https://support.claude.com/en/articles/10280779-how-do-i-learn-more-about-amazon-and-anthropic-s-strategic-collaboration

# How do I learn more about Amazon and Anthropic’s strategic collaboration?

Learn more by viewing this [press release](https://www.aboutamazon.com/news/aws/amazon-invests-additional-4-billion-anthropic-ai).
---

SOURCE: https://support.claude.com/en/articles/10366389-how-can-i-get-higher-rate-limits-on-the-claude-api

# How can I get higher rate limits on the Claude API?

Usage tiers are assigned automatically. There's no deposit or purchase that moves you up, and you don't need to take any action.

If you need higher limits, you can request them in the Claude Console once you're using at least 50% of your current limits. You can view your tier and current limits in the **[Claude Console](https://platform.claude.com/settings/limits)**.

For custom limits or committed capacity, **[contact our sales team](https://claude.com/contact-sales)**.

Refer to **[our Claude Platform Docs](https://docs.claude.com/en/api/rate-limits)** to read more about rate limits and usage tiers.
---

SOURCE: https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work

# How do usage and length limits work?

When working with Claude, you may encounter two different types of limits that work in distinct ways: **usage limits** and **length limits**. Understanding the difference between these can help you use Claude more effectively.

## What are usage limits?

Usage limits control how much you can interact with Claude over a specific time period. Think of this as your "conversation budget" that determines how many messages you can send to Claude, or how long you can work with Claude Code, before needing to wait for your limit to reset.

Your usage is affected by several factors, including the length and complexity of your conversations, the features you use, which Claude model you're chatting with, and the effort level you've selected. Different subscription plans (Pro, Max, Team, etc.) have different usage allowances, with paid plans offering higher limits.

Note that your usage of all different Claude product surfaces (claude.ai, Claude Code, Claude Desktop) counts towards the same usage limit.

Learn more about **[changing the model, effort, and thinking settings](https://support.claude.com/en/articles/8664678)**.

## How can I get unlimited usage?

There are a couple of different ways to increase your usage depending on your plan:

- If you're using a paid plan, including Pro, Max, Team, or seat-based Enterprise plans, see these articles for details about purchasing usage credits:

  - **[Manage usage credits for paid Claude plans](https://support.claude.com/en/articles/12429409-)**

  - **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-)**

- If your organization has a usage-based Enterprise plan, your usage is based on consumption. See this article for additional information: **[How am I billed for my Enterprise plan?](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan)**

For strategies to maximize your message allotment, see **[Usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices)**.

## What are length limits?

Length limits relate to Claude's context window—the amount of information Claude can work with in a single chat. Think of the context window as Claude's working memory that determines how much content it can process and remember at once.

**Note**: The context window size depends on which model you're using. On paid plans, the newest models support up to a 1M token context window, while others support 500K or 200K tokens. A portion of the context window is always reserved for Claude's response, so the longest possible conversation is slightly smaller than the full window. For the current per-model breakdown, refer to **[How large is the context window on paid Claude plans?](https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans)**

## Automatic context management

For users with code execution enabled, Claude now automatically manages long conversations. When your conversation approaches the context window limit, Claude summarizes earlier messages to continue the conversation seamlessly. This means you can have longer, more natural conversations with fewer interruptions.

Your full chat history is preserved so Claude can reference it even after summarization. You may occasionally see that Claude is "organizing its thoughts" during long conversations—this indicates automatic context management is working.

Longer conversations that trigger automatic context management consume more of your usage limit. Try starting a new conversation if you're approaching your usage limit in a longer chat.

**Note:** **[Code execution must be enabled](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude#h_1c99382190)** for automatic context management. Rare edge cases (such as very large first messages) may still encounter context limits.

## How can I increase the size of Claude’s context window?

While you can't increase the fixed context window size for your plan, you can use these strategies to maximize available context space and optimize both your context window and usage limits:

- **Utilize projects effectively:** Projects use retrieval-augmented generation (RAG), which allows Claude to work with larger amounts of information more efficiently by only loading relevant content into the context window.

- **Shorten project instructions:** Keep your project instructions concise and focused on essential information. Claude performs best when you use project instructions for general context around your project, key guidelines, and Claude's role. Reserve task-specific instructions for the chat itself.

- **Remove unused project files:** Regularly clean up files you're no longer actively using in your projects.

- **Toggle extended thinking off:** Turn off this feature when you don't need Claude's enhanced reasoning for a particular task.

- **Lower the effort level:** Choose a lower effort level for routine tasks that don't need Claude's most thorough responses. Higher effort uses more tokens.

- **Temporarily disable non-critical tools and connectors:** Disable web search, Research, and MCP connectors from your "Search and tools" settings when they're not needed for specific conversations.

**Note:** Tools and connectors are token-intensive, so managing them helps both maximize your available context window and optimize your usage limits.

## Key differences

The main distinction is that usage limits control *how much* you can use Claude across all your conversations, while length limits control *how long* any single conversation can become. Usage limits are about quantity over time, while length limits are about the depth and complexity of individual conversations.

If you hit your usage limit, you'll need to wait for it to reset, upgrade your plan, or purchase usage credits. If you hit a length limit, you can start a new conversation or use **[features like projects](https://support.claude.com/en/articles/9517075-what-are-projects)** to work with larger amounts of information more efficiently.
---

SOURCE: https://support.claude.com/en/articles/12005017-using-agents-according-to-our-usage-policy

# Using Agents According to Our Usage Policy

All uses of agents and agentic features must continue to adhere to Anthropic’s Usage Policy. The following are intended to be non-exhaustive illustrations of how our Usage Policy applies to certain agentic uses. As agentic capabilities evolve, we will update this list with additional examples to help users understand what our Usage Policy covers in practice in agentic environments.

## Do Not Use Agents for Surveillance or Unauthorized Data Collection

This includes using agents to:

- Monitor or track individuals’ online activities, behaviors, or movements without notification or consent

- Collect, compile, or analyze personal information to create profiles based on individuals’ protected attributes, sensitive characteristics, or personal circumstances

- Use facial recognition or biometric identification software or websites

- Conduct mass surveillance across multiple websites or platforms to send communications or engage in any form of targeted actions

## Do Not Use Agents to Generate or Distribute Harmful Content

This includes using agents to:

- Create websites or domains that mimic legitimate webpages

- Generate content that leads to phishing, social engineering, or fraud

- Impersonate individuals (private or public) without their consent

## Do Not Use Agents to Engage in Scaled Abuse

This includes using agents to:

- Spam government services, emergency systems, or crisis helplines

- Overwhelm servers with traffic to disrupt services (e.g., DDoS attacks)

- Coordinate harassment campaigns across multiple platforms or accounts

- Manipulate online polls, voting systems, or traffic metrics

- Create or manage multiple accounts to evade detection or circumvent platform safeguards

- Engage in click farming or artificial engagement (e.g., through likes or comments) on social media

- Automate influence operations or coordinated inauthentic behavior

- Bulk report people, users, or content through abuse reporting systems

## Do Not Use Agents for Unauthorized System Access or Manipulation

This includes using agents to:

- Install malware, backdoors, or monitoring software without authorization

- Execute commands that attempt privilege escalation or system exploitation

- Perform actions that could compromise critical infrastructure or emergency services

- Engage in unauthorized, illegal, or fraudulent financial transactions (such as brokerage or investment advisory activities) or payment processing

- Access or modify another person's account using their stored credentials without authorization
---

SOURCE: https://support.claude.com/en/articles/13163666-holiday-2025-usage-promotion

# Holiday 2025 Usage Promotion

We’re giving Pro and Max subscribers a holiday gift—2x usage limits from December 25 through December 31. During this period, your plan’s usage limits will be doubled, giving you more room to explore Claude’s capabilities as you plan for the new year.

## Who is eligible?

To be eligible for this promotion, you must meet the following criteria:

- You have an active Pro, Max 5x, or Max 20x subscription.

- You are an individual subscriber (this promotion does not apply to Team or Enterprise plans).

- Both existing subscribers and new users who sign up for Pro or Max during the promotional period are eligible.

## What’s included in this promotion?

During the promotional period, you’ll receive:

- A 2x increase to your five-hour usage limits.

- A 2x increase to your weekly usage caps.

All weekly caps will be reset at the start of the promotional period (December 25 at 12:00 AM UTC).

This promotion applies to usage on [claude.ai](http://claude.ai), Claude Code, and Claude in Chrome.

## When does this promotion run?

This is a one-week holiday promotion running from Wednesday, December 25, 2025 at 12:00 AM UTC through Wednesday, December 31 at 11:59 PM UTC.

## What happens after the promotional period ends?

After the promotional period ends, your usage limits will return to their standard levels based on your subscription plan. There is no additional charge—you’ll simply continue using Claude as part of your existing subscription.

## Terms and Conditions

Additional usage is available from December 25, 2025 at 12:00 AM UTC through December 31, 2025 at 11:59 PM UTC. The increased usage limits apply to the Claude web app, Claude Code, and Claude in Chrome only. This promotion cannot be combined with other offers or promotions. Available to individual Pro, Max 5x, and Max 20x subscribers only. Team and Enterprise plans are not eligible.
---

SOURCE: https://support.claude.com/en/articles/14246112-buy-usage-bundles

# Buy usage bundles

You can pre-purchase usage credits in bundles and save up to 30% compared to standard usage credit rates. Larger bundles come with bigger discounts, and your balance works across Claude, Claude Code, Claude Cowork, and third-party products.

Usage bundles are available on Pro, Max, and Team plans.

---

## Where your balance works

Your usage bundle balance is a single pool that applies across Claude, Claude Desktop, Claude Mobile (iOS and Android), Claude Code, Cowork, and third-party products that use your Claude account.

## Available bundles

The discount you receive depends on the bundle size you purchase. Bigger bundles save you more.

| **Bundle** | **Discount** | **You pay** |
| ---------- | ------------ | ----------- |
| $50        | 10%          | $45         |
| $250       | 20%          | $200        |
| $1000      | 30%          | $700        |

Individual Pro and Max plan subscribers can purchase up to $2000 worth of discounted bundles per month. Any usage beyond this limit is billed at standard rates.

On Team plans, Owners and Primary Owners can purchase up to $3000 worth of discounted bundles per month. Any usage beyond this limit is billed at standard rates.

Price and plans are subject to change at Anthropic's discretion.

---

## How to buy usage bundles

You'll need usage credits enabled before you can purchase bundles. If you haven't set up usage credits yet, see the relevant guide for your plan:

- **[Manage usage credits for paid Claude plans](https://support.claude.com/en/articles/12429409-manage-extra-usage-for-paid-claude-plans)** (Pro and Max)

- **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-manage-extra-usage-for-team-and-seat-based-enterprise-plans)** (Team)

Once usage credits are enabled:

1. Navigate to **[Settings > Usage](https://claude.ai/settings/usage)**.

2. Click "Buy usage."

3. Select a bundle size.

4. Confirm your purchase. The discount is applied automatically at checkout.

Your bundle balance appears in your usage dashboard and draws down as you use Claude beyond your plan's included limits.

---

## Frequently asked questions

### What happens if I reach the monthly purchase cap?

You can still use usage credits beyond the cap, but any additional usage is billed at standard usage credit rates without a discount.

### Can I buy multiple bundles in the same month?

Yes. You can purchase as many bundles as you'd like up to your monthly limit ($2000 in value for Pro and Max plans, $3000 in value for Team plans).

### Do usage bundles replace my plan's included usage?

No. Your plan's included usage works the same as before. Bundle credits only apply after you've exceeded your plan's limits and are using usage credits.
---

SOURCE: https://support.claude.com/en/articles/14729354-use-analytics-chat-to-ask-claude-about-usage

# Use analytics chat to ask Claude about usage

Analytics chat lets you ask Claude questions about your organization’s usage in plain language. Instead of clicking through dashboard tabs or exporting data, type a question. Claude runs the right query against your organization’s data and responds with a chart and a short summary of what it found.

Analytics chat is available on the Enterprise plan. Access requires the same permissions as the rest of the analytics dashboard.

## Access analytics chat

If you can already see the **All activity** view under Analytics, you have access to analytics chat.

1. Sign in to your Claude account.

2. In the left sidebar, select “Analytics.”

3. Click the “Analytics Chat” tab.

---

## How it works

Type a question, or select one of the suggested prompts below the input box. Claude matches your question to the closest supported query, runs it against your organization’s pre-aggregated usage data, and returns:

- A chart, table, or stat card rendered directly in the conversation, which you can expand, drill into, and export.

- A brief written summary calling out the key trend or numbers.

You can follow up in the same conversation. Claude keeps context, so you can refine a result ("what about just last week?"), drill in ("break that down by product"), or pivot to a related metric without starting over.

---

## What you can ask

Analytics chat answers questions across these areas.

### Active users and adoption

- "Show me daily, weekly, and monthly active users"

- "How did our key metrics change week over week?"

- "Is our stickiness going up or down?"

### Spend

- "Show me daily spend for the last 30 days"

- "Break down spend by model"

- "Compare spend on Claude vs Claude Code"

- "What's our cost per active user?"

- "What will we spend this month at the current rate?"

### Seats and users

- "What's our seat utilization rate?"

- "Which seats haven't been used in 30 days?"

- "Who are our top spenders?"

- "Who are our least active users?"

- "How many pending invites do we have?"

### Groups and teams

- "Which teams doubled their Claude usage this month?"

- "Where are we getting the most value per seat?"

- "Show me spend by group"

### Claude Code and Claude Cowork

- "Show me Claude Code adoption"

- "What percentage of our users are using Claude Code?"

- "Show me Cowork adoption"

- "Which connectors are Cowork users using?"

### Connectors and skills

- "Which connectors are being used?"

- "Which skills are being used most?"

By default, results cover the **last 30 days**, but you can specify a different range in your question. For example: "show me daily spend since January 1."

---

## Review the results

### The chart is the answer

It renders inline, and Claude’s summary below it calls out direction and magnitude of change—for example, "spend dropped roughly 40% starting March 12." Claude won’t judge whether a number is good or bad for your organization, but you can ask it to compare against a prior period.

### Data is refreshed daily

Analytics chat reads from tables that are typically updated within one to two days. The date shown on each result reflects the most recent data available and isn’t real-time.

### User-level results are capped

Queries that list individual users (top spenders, inactive seats, least active users) return up to 20 users at a time.

---

## Export and share results

When Claude returns a chart, hover over it and click to download it. You can share the exported file with stakeholders who don't have access to the analytics dashboard.

---

## Limitations

- **Analytics questions only.** Analytics chat is scoped to your organization’s usage data. If you ask an unrelated question, Claude will suggest starting a regular conversation instead. Web search, file uploads, and connectors aren't available here.

- **Your organization only.** Results are always scoped to the organization you’re signed into. Cross-organization comparisons aren’t available.

---

## Tips

- **Start with a suggested prompt.** The chips below the input show common starting points. Selecting one is the fastest way to see what's available, and you can refine from there.

- **Ask follow-ups instead of starting over.** After any chart, "now compare that to last month" or "show me just Claude Code" will refine the result in place.

- **Be specific about dates.** "Last 30 days" is the default; say "for March" or "year to date" to change the window.

---

## Troubleshooting

### A query times out or shows raw data instead of a chart

Queries can take up to two minutes for large organizations. If one repeatedly fails, try a shorter date range, or contact support and include a screenshot of the result.

### Data looks out of date

Check the date shown on the result. The underlying data typically lags by one to two days. If it’s more than two days behind, **[contact Support](https://support.claude.com/en/articles/9015913-how-to-get-support)**.

### The Analytics Chat tab is missing

Confirm your organization is on the Enterprise plan and that your account has access to the analytics dashboard. If you’re an admin and still don’t see it, contact your Anthropic account team.
---

SOURCE: https://support.claude.com/en/articles/8114527-i-m-encountering-429-errors-and-i-m-worried-my-rate-limit-is-too-low-what-should-i-do

# I’m encountering 429 errors, and I’m worried my rate limit is too low. What should I do?

Your Claude API organization's rate limit depends on your usage tier. There are three usage tiers: Start, Build, and Scale. Accounts whose limits are managed with their account team are on a separate Custom tier. You can see your tier and current limits at **[Settings > Limits](https://platform.claude.com/settings/limits)** in the Claude Console.

If you're seeing 429 errors, you can request higher limits in the Console once you're using at least 50% of your current limits.

Refer to the **[Rate limits page in our Claude Platform Docs](https://docs.claude.com/en/api/rate-limits)** for more information. For custom limits, **[contact our Sales team](https://claude.com/contact-sales)**.
---

SOURCE: https://support.claude.com/en/articles/8243635-our-approach-to-rate-limits-for-the-claude-api

# Our approach to rate limits for the Claude API

Your rate limit depends on your usage tier, and is currently measured in three key metrics:

1. Requests per minute (RPM)

2. Input tokens per minute (ITPM)

3. Output tokens per minute (OTPM)

If you exceed any of these rate limits, you will get a 429 error describing which rate limit was exceeded, along with a `retry-after` header indicating how long to wait.

Rate limits are set at the organization level and depend on your usage tier. There are three usage tiers: Start, Build, and Scale. Accounts whose limits are managed with their account team are on a separate Custom tier. Higher tiers have higher rate limits.

You can view your organization's current tier and limits in the **[Claude Console](https://platform.claude.com)**. If you need higher limits, you can request them there once you're using at least 50% of your current limits.

For more about usage tiers and rate limits, see the **[Rate limits page in our Claude Platform Docs](https://docs.claude.com/en/api/rate-limits)**.
---

SOURCE: https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage

# How do I pay for my Claude API usage?

Claude API and Workbench usage is billed via prepaid "usage credits." Credits must be purchased prior to using the API, and your credits will be applied to your usage according to our current **[pricing](https://claude.com/pricing#api)**. These credits can be used for API access, Workbench usage, and Claude Code. Failed requests are not charged, and you will only be billed for successful API calls and completed tasks.

You can track credit usage in your **[Claude Console settings on the Billing page](https://platform.claude.com/settings/billing)**. If you run out of credits, you will no longer be able to call the API or use Workbench. You can choose to set up an auto-reload that purchases additional credits when your balance falls below a set limit.

To add usage credits and adjust your auto-reload settings, navigate to your Billing page. Click on the “Buy credits” button, and enter in the amount of credits you would like to purchase. After you’ve purchased your credits, they will be immediately available to you.

You can also view your organization's available credit balance in your **[Claude Console settings on the Billing page](https://platform.claude.com/settings/billing)**.

To adjust your auto-reload options, click on “Edit” in the auto-reload section. You can toggle auto-reload on or off here. If choosing to use auto-reload, you can set the minimum account balance, and the amount to reload to if your account reaches that minimum balance.

Please note that purchased credits are subject to our **[Credit Terms](https://www.anthropic.com/legal/credit-terms)**. Credits expire one year from the purchase date, and this expiration date cannot be extended. Expired credits will appear in your **[Console billing settings](https://platform.claude.com/settings/billing)** under **Invoice history**. All credit purchases are non-refundable.

Learn more about credit usage and how it relates to usage limits in our **[Claude API docs](https://platform.claude.com/docs/en/api/rate-limits)**.

## How to update your Console payment method

1. Log in to your Console account with an Admin or Billing role.

2. Navigate to **[Settings > Billing](https://platform.claude.com/settings/billing)**.

3. Click the pencil icon next to your current payment method to update your card information.

4. Enter your new card details in the **Update payment method** modal, then click "Update."
---

SOURCE: https://support.claude.com/en/articles/9301722-updates-to-our-acceptable-use-policy-now-usage-policy-consumer-terms-of-service-and-privacy-policy

# Updates to our Acceptable Use Policy \(now “Usage Policy”\), Consumer Terms of Service, and Privacy Policy

At Anthropic, we periodically review our policies and terms to ensure we’re providing the highest level of protection and clarity for our users. As our products evolve, we also want to keep you informed about our latest updates:

- Claude is now available as an iOS app via the [Apple App Store](https://apps.apple.com/app/claude/id6473753684) so you can access Claude from anywhere, any time.

- For businesses looking to increase productivity, our new [Team plan](https://www.anthropic.com/claude) offers increased usage for members and better tools for managing users and billing.

- And Claude.ai is now available to users in the EU.

This support article covers some recent changes to our Anthropic’s **[Acceptable Use Policy (now “Usage Policy”)](https://www.anthropic.com/legal/aup)**, **[Consumer Terms of Service](https://www.anthropic.com/legal/consumer-terms)**, and **[Privacy Policy](https://www.anthropic.com/legal/privacy)**.

We encourage you to read the updated documents on our website, but here is a summary of key changes:

Usage Policy

- **Policy refinements:** We’ve refined and restructured our policy to give more details about the individuals and organizations covered by our policies.

- **More specific risk levels:** We’ve broken out some specific “high-risk use cases” that have additional requirements due to posing an elevated risk of harm.

- **Disclosure requirements:** We added new disclosure requirements so that organizations who use our tools also help their own users understand they are interacting with an AI system.

Consumer Terms of Service

- **Enhanced clarity:** With some help from Claude, we simplified some terms to make them easier to understand. For example, Claude helped us simplify the provision that describes what happens if you create a Claude.ai account with an email domain that belongs to your employer or another organization.

- **Update for UK consumers.** For individuals based in the United Kingdom, our UK Consumer Terms of Service now state that the agreement is between the user and our Irish subsidiary, Anthropic Ireland, Limited, rather than Anthropic, PBC.

Privacy Policy

- **Data controller:** We’ve updated our **[Privacy Policy](https://www.anthropic.com/legal/privacy)** to reflect that the data controller for our users in the European Economic Area (EEA), UK, and Switzerland is Anthropic Ireland, Limited.

- **Data retention:** We’ve changed our [default data retention period](https://support.anthropic.com/en/articles/7996866-how-long-do-you-store-personal-data) to 30 days.

You can review our full **[Usage Policy](https://www.anthropic.com/legal/aup)**, **[Consumer Terms of Service](https://www.anthropic.com/legal/consumer-terms)**, and **[Privacy Policy](https://www.anthropic.com/legal/privacy)** on our website. If you have any questions, please contact us [here](https://support.anthropic.com).

Thanks for using Claude! We appreciate you taking the time to stay informed on these updates as we work to responsibly deploy our products more broadly.
---

SOURCE: https://support.claude.com/en/articles/9528712-exceptions-to-our-usage-policy

# Exceptions to our Usage Policy

Anthropic maintains a comprehensive Usage Policy to ensure the responsible deployment of our AI systems. Anthropic may enter into contracts with government customers that tailor use restrictions to that customer’s public mission and legal authorities if, in Anthropic’s judgment, the contractual use restrictions and applicable safeguards are adequate to mitigate the potential harms addressed by this Usage Policy.

For example, with carefully selected government entities, we may allow foreign intelligence analysis in accordance with applicable law. All other use restrictions in our Usage Policy, including those prohibiting use for disinformation campaigns, the design or use of weapons, censorship, domestic surveillance, and malicious cyber operations, remain.

At this time, this policy only applies to models that are at AI Safety Level 2 (ASL-2) under our Responsible Scaling Policy (RSP).

**What government entities are eligible for Usage Policy modifications?**

Our evaluation of whether to tailor use restrictions to the mission and legal authorities of a government entity aims to balance enabling beneficial uses of our products and services with mitigating potential harms, and includes:

- Our assessment of the models’ suitability for the proposed use cases.

- The legal authorities of the agency in question.

- The extent of the agency's willingness to engage in ongoing dialogue with Anthropic.

- The safeguards in place to prevent misuse and mitigate risks of mistakes.

- The degree of independent and democratic oversight of the organizations and their uses of AI technologies, including legislative or regulatory constraints and other relevant public commitments.
---

SOURCE: https://support.claude.com/en/articles/9534590-cost-and-usage-reporting-in-the-claude-console

# Cost and Usage Reporting in the Claude Console

**Note:** Usage and Cost reporting is visible to the following user roles: **Developer, Billing, and Admin**. See [Claude Console Roles and Permissions](https://support.claude.com/en/articles/10186004-claude-console-roles-and-permissions) for more information.

The Claude Console provides detailed cost and usage reporting to help you effectively manage your API usage and associated costs. This guide walks you through these features and how to use them.

## Accessing Cost and Usage Reports

Users with access to these reports can click into them on the left navigation menu on the Console:



---

## Usage Reporting

The [Usage page](https://platform.claude.com/usage) offers a detailed breakdown of your API usage across different models and API keys.

### Key Features

- **Detailed Breakdown**: View usage data by model, date/time, and API key. Click into the bars on the bar chart for hour and minute granularity.

- **Flexible Filtering**: Use selectors to choose specific models, months, or API keys

- **Visual Representation**: A chart with input and output token counts.

- **Usage Statistics**: See total input and output tokens for your selected filters.

- **Rate-Limited Requests:** Review your requests that were blocked due to hitting rate limits.

- **Rate Limit Use:** Visualizations of input and output tokens per minute compared with the overall ITPM or OTPM rate limit.

- **CSV Export**: Download your usage data for further analysis or reporting.

### How to Use

1. Select the Workspace you want to view (or choose "All Workspaces").

2. Select the model you want to view (or choose "All Models").

3. Choose the month you're interested in (or narrow to a specific month/day).

4. Select an API key (or view data for all keys).

5. The chart and statistics will update based on your selections.

6. Use the export button to download a CSV of the displayed data.





### Rate Limit Use

The Usage page also includes a separate section displaying rate limit use per-model for input and output tokens. You can click the dropdown in the upper left corner of this section to change the model and view related rate limit metrics. These visualizations can be used to determine when you’re hitting peak use for your organization, which specific rate limits need to be increased, and how you can increase your caching rate.

**Rate Limit Use + Caching - Input Tokens:** This chart displays the hourly maximum number of uncached input tokens per minute (ITPM) alongside your cache rate (i.e. the percentage of input tokens read from the cache) and your current ITPM rate limit.

**Rate Limit Use - Output Tokens:** This chart displays the hourly maximum number of output tokens per minute (OTPM) alongside your current OTPM rate limit.

---

## Cost Reporting

The [Cost page](https://platform.claude.com/cost) helps you understand your spending across different models.

### Key Features

- **Model-Specific Data**: View costs for individual models or all models combined.

- **Monthly Breakdown**: See costs for specific months.

- **Daily Cost Chart**: Visualize your spending over time.

- **Total Cost Statistics**: Get an overview of your total spending for the selected period, including web search and code execution costs.

- **CSV Export**: Download cost data for your records for further analysis.

### How to Use

1. Choose the Workspace you want to view costs for (or select "All Workspaces").

2. Choose the model you want to view costs for (or select "All Models").

3. Select the month you're interested in.

4. You can see the chart, token cost, and tool use costs, which will update based on your selections.

5. Use the export button to download a CSV of the cost data.



**Note**: Currently, it's not possible to break down usage or cost by individual users.
---

SOURCE: https://support.claude.com/en/articles/9797557-usage-limit-best-practices

# Usage limit best practices

The number of messages you can send will vary based on your Claude plan. For more information on your plan’s usage, refer to the following resources.

- **[Free Claude](https://support.claude.com/en/articles/8114491-getting-started-with-claude#h_57262af5ae)**

- **[Pro plan](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan#h_62ccc00135)**

- **[Max plan](https://support.claude.com/en/articles/11049741-what-is-the-max-plan#h_cfd2904008)**

- **[Team plan](https://support.claude.com/en/articles/9266767-what-is-the-team-plan#h_b59203dff2)**

- **[Enterprise plan](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan#h_8294bce903)**

Additional factors that affect your usage limits include:

- Message length

- File attachment size

- Current conversation length

- Tool usage (e.g., Research, web search)

- Model choice

- Effort level

- Artifact creation and usage

Our system also includes caching that helps you optimize your limits:

- Content in projects is cached and doesn't count against your limits when reused.

- Similar prompts you use frequently are partially cached.

- Claude remembers context from earlier in the conversation.

---

## 1. Start by planning your conversations

Before starting a conversation with Claude, consider the following:

- What specific information or assistance do you need?

- Can you combine multiple related questions into a single message?

- Is there any background information you can provide upfront?

Planning helps reduce the number of back-and-forth messages needed.

## 2. Be specific and concise

- Provide clear, detailed instructions or questions in each message.

- Avoid vague queries that may require clarification.

- Include relevant context to help Claude understand your needs better.

## 3. Use Claude's chat search and memory capabilities

- All users can follow these guidelines to take advantage of Claude's memory within a single chat:

  - Refer back to previous information instead of repeating it.

  - Use phrases like "As mentioned earlier" to build on earlier parts of the conversation.

- Users with paid plans (Pro, Max, Team, and Enterprise) can prompt Claude to search through previous conversations and reference relevant information in new chats. Giving Claude access to additional context prevents you from needing to provide the same information repeatedly.

  - Learn more here: **[Searching past chats with Claude](https://support.claude.com/en/articles/11817273-using-claude-s-chat-search-and-memory-to-build-on-previous-context#h_89b670b004)**

- Users with paid plans (Pro, Max, Team, and Enterprise) can use Claude's memory and project summaries to build context across conversations.

  - Learn more here: **[What is Claude's memory?](https://support.claude.com/en/articles/11817273-using-claude-s-chat-search-and-memory-to-build-on-previous-context#h_c1c0b33879)**

## 4. Batch similar requests in one message

If you have multiple related tasks or questions, group them in a single message. For example, instead of sending separate messages for each math problem, send them all in one message.

## 5. Review and edit your prompt before sending

Take a moment to review your message for clarity and completeness to reduce the need for follow-up messages.

## 6. Use project knowledge bases effectively

Projects offer significant caching benefits:

- When you upload documents to a project, they're cached for future use.

- Every time you reference that content, only new/uncached portions count against your limits.

- This means you can work with the same documents repeatedly without using up your messages as quickly.

- Example: If you're working on a research paper and add all your reference materials to a project, you can ask multiple questions about those materials while using fewer messages than if you uploaded them each time.

- Projects offer a Retrieval Augmented Generation (RAG) mode allowing for expanded project knowledge capacity.

  - Learn more here: **[Retrieval Augmented Generation (RAG) for projects](https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects)**

## 7. Monitor your consumption in Usage settings

- If you're using a Pro, Max, Team, or seat-based Enterprise plan, you can navigate to **[Settings > Usage](https://claude.ai/settings/usage)** to view progress bars showing how much of your five-hour session and weekly usage limits you’ve consumed.

- The **Plan usage limits** section at the top shows your progress towards both your session limit and weekly limits.

  - **Current session:** How much of your plan’s five-hour session limit you’ve used thus far, plus the amount of time remaining in the session.

  - **Weekly limits:** Check when your plan’s weekly usage limit resets for Opus only and all other models.

- **Usage credits:** If you are using a Pro, Max, Team, or seat-based Enterprise plan, your usage settings page will also show how much of your plan's limit you've used. Refer to these articles for more information about enabling usage credits depending on your plan:

  - **[Manage usage credits for paid Claude plans](https://support.claude.com/en/articles/12429409-)**

  - **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-)**

- If your organization is on a usage-based Enterprise plan, you won’t have specific usage limits, but will be charged based on consumption. You can also track this in **[Settings > Usage](https://claude.ai/settings/usage)**.

## 8. Quick caching tips

- Use projects for anything you'll reference multiple times.

- Upload your core working documents to the project knowledge section when starting a project.

- The more you use the same content, the more benefit you get from caching.

---

## Best practices for specific use cases

### For coding tasks

- Provide complete context about your coding environment in your initial message.

- Include entire relevant code snippets in one message for reviews or debugging.

### For writing assistance

- Outline requirements, target audience, and key points comprehensively.

- Send entire texts for editing in one message rather than breaking them up.

### For research and analysis

- Clearly define your research question and focus areas initially.

- Provide all relevant data in a single, well-structured message.

By following these best practices, you can make the most efficient use of your Claude plan's message allocation.