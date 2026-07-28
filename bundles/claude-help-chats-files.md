
---

SOURCE: https://support.claude.com/en/articles/10593882-share-and-unshare-chats

# Share and unshare chats

Learn how to create shareable links to your chats with Claude. While chats are always private by default, you can easily create snapshots of your conversations to share via direct link. This guide walks you through the process of sharing and unsharing chats.

## Share chats

To share a chat:

1. Click the "Share" button in the upper right corner of your chat.

2. Click the "Share" button in the pop out to create a shareable link.

Once a chat has been shared, anyone with the link can view the chat snapshot. The chat snapshot includes all messages that were sent prior to sharing the chat, including any artifacts. All messages sent after sharing a chat will remain private by default. However, if you unshare the chat and share it again, the snapshot will be updated to include any new messages.

**Note:** Users on Team and Enterprise plans can only share chats with other members of the same organization, not publicly. Read more here: **[Project visibility and sharing](https://support.claude.com/en/articles/9519189-project-visibility-and-sharing)**.

### Share chats with files or MCP integrations

When sharing chats that include uploaded files or MCP (Model Context Protocol) integrations, it's important to understand what information is included in the shared snapshot.

**Attached files:** If you share a chat that contains an attached file, the file itself is not included in the shared snapshot and remains private. Only the conversation and Claude's responses will be visible to anyone with the link.

**MCP tool calls:** When sharing chats that use MCP integrations, the raw data retrieved from MCP tool calls remains hidden in the shared snapshot. Only the final chat output and conversation will be visible to viewers. The underlying tool call data stays private.

This ensures that sensitive information from your files and connected tools is protected, even when you share a chat snapshot.

## Unshare chats

To unshare a chat:

1. Navigate to the "Share" menu.

2. Click the visibility dropdown.

3. Change the chat from "Public" to "Private" to disable the direct link.

## Manage shared chats

Users on free, Pro, or Max plans can review a log of shared chats by navigating to **[Settings > Privacy](https://claude.ai/settings/data-privacy-controls)**. Find the **Privacy settings** section and click “Manage” next to **Shared chats:**

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1921669913/7cc7be48cfc7a18f9f469d6cd83c/CleanShot+2026-01-08+at+10_20_43%402x.png?expires=1785257100&amp;signature=abd0ceae664de79851449d6741ed6c60e44f2d973628ba9ab1dfe373f9257ca5&amp;req=dSklF894lIheWvMW1HO4zWn5HzYfZ0Jqc9cNIYuX0GHTf6AoOiDfUe4olvvM%0AWtdKC6LScbtmhhIM61Y%3D%0A)

This will open a **Shared chats** modal listing the title, date shared, and link to each chat, allowing you to easily review and access all your previously-shared content. From here, you also have the option to click “Unshare” next to each listed chat to revoke access to the last snapshot you shared:

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1624243810/e6fe1d262597446c7fe21dff9f10/AD_4nXdW-GhByF8uKV7fCq9lTbkVB91FglSL6TSyXAOUk_MLcTV9YsEMBMkm9rgm1oXqv0k3sJh1JhlzZP6tHVkKbDJJ71pDRRtM3aVNG64MDuKDIzgmknh-XDZdNa7biTsTdwGoPr5GRg?expires=1785257100&amp;signature=3000153d8d8d71c976f7d1075194a5331c1c07bf4f4cc1a64bbf02e39acfa0b5&amp;req=dSYlEst6noleWfMW1HO4ze44eCJjkRU%2FguvTv9woD7ZmkrVXsJkJrXQe1c1A%0A2WxvqwNZnkohev%2BnmN4%3D%0A)

If you don’t have any shared chat snapshots, the **Shared chats** modal will show “No shared content found”:

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1624243808/b025db8e598f0c88fb16d83d48d5/AD_4nXeUwCKnmFzzrjMHhfr5By4zk5pJlkEn3wbJ8-aNfu13Yl99IjBywpqPx9G07QRzpH1EwRY7uG7Q9m9fib98Gql1cIV7XwUCTzEgBNu79Ey8tCOS5CEVmwveIcEOxJ4fonBhe3g9MA?expires=1785257100&amp;signature=16b10768a5737a2c0335ea2f14b02979923f1e0445265e53ba6921fa99796282&amp;req=dSYlEst6nolfUfMW1HO4zdaFncB2hI6wDeZsm0Gz1HsW2S%2FKcYxUZ9NGED3v%0AVEO4lP9wzV2mdbiYn28%3D%0A)
---

SOURCE: https://support.claude.com/en/articles/10684626-enable-and-use-web-search

# Enable and use web search

You can have Claude search the internet to provide you with up-to-date information and insights when using the following models:

- Opus 5

- Sonnet 5

- Fable 5

- Opus 4.8

- Opus 4.7

- Sonnet 4.6

- Opus 4.6

- Haiku 4.5

Web search expands Claude's knowledge with real-time data, helping you make better-informed decisions with current information.

**To access this feature on a Team or Enterprise plan account:**

An Owner or Primary Owner must first enable web search for the entire workspace. This can be found in **[Admin settings > Capabilities](https://claude.ai/admin-settings/capabilities)**:

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2032032614/ad907328c4d9a26ee4bd9ca27a52/CleanShot+2026-02-05+at+09_01_42%402x.png?expires=1785257100&amp;signature=7adfeaba70709407d3bbfaa644a1ec949bad268638d921abe482e869a0c83500&amp;req=diAkFMl9n4deXfMW1HO4zetvyre4HclRUJIbgsqS2%2BP%2BCl9qlmt5q8e5HOtN%0A%2Bw53HUpvFGFprvqnCnM%3D%0A)

Once this is enabled at the workspace level, any member of the organization can switch it on while starting a chat by clicking the “+” button in the lower left corner of the chat window and selecting “Web search." Users can toggle this off for chats that don’t require web search capabilities.

## How to enable web search in a chat

1. Click on the slider icon in your chat input interface.

2. Locate **Web search** in the dropdown.

3. Switch the toggle on.

You can disable the feature at any time by following the same steps and turning the toggle off.

## How web search works

When you ask about topics that benefit from current information, Claude invokes a search tool to inform and ground its generated responses with content from the live web. Every response includes citations, so you can easily verify sources yourself.

### During a search

When Claude searches the web:

1. You'll see an indicator that Claude is searching the web.

2. Claude processes multiple sources to find relevant content.

3. Claude provides a conversational response that includes:

  - Direct citations to sources

  - Source links for further reading

  - Relevant quotes when appropriate

### Web fetch and direct links

When “Web search” is toggled on, Claude can also retrieve content directly from web pages when provided with specific URLs. This feature, called web fetch, allows Claude to access and analyze the full content of articles, blog posts, and other web pages you want to discuss.

**Important note for free Claude accounts:** When you provide Claude with a direct link to a long article or document and ask it to analyze or summarize the contents, the entire article is retrieved into Claude's context window. This can consume a significant portion of your usage capacity, especially for lengthy content. For example, asking Claude to summarize a 10,000-word article will use substantially more of your context window than a regular web search query.

## Image results

When web search is enabled, Claude can also search for and display images directly in your conversation. You don't need to enable a separate setting — image results are part of web search.

For example, you might ask Claude to:

- Show you what a recipe looks like before you start cooking

- Find photos of a product you're considering

- Help identify a plant, insect, or object by searching for visual matches

- Compare what similar items look like side by side

Claude selects images from web search results, powered by Bing, and displays them alongside its text response. Each image includes a source link so you can visit the original page for more details.

Image search is powered by Bing (<https://www.microsoft.com/en-us/privacy/privacystatement>).

Claude can also display interactive content in search results. For more detailed information, see here: **[Visual and interactive content](https://support.claude.com/en/articles/13641943-visual-responses-and-interactive-widgets)**.

## Managing usage on free Claude accounts

As a free user, you have daily usage limits for Claude. Since web search and fetch both contribute to these limits, here are some tips to make the most of your capacity:

- **Be mindful of direct links:** Before asking Claude to analyze a long article via its URL, consider whether you need the full analysis or just key points.

- **Toggle web search off when not needed:** If you're having a conversation that doesn't require current information, disable web search to conserve your usage.

- **Use web search strategically:** Focus on queries where up-to-date information is essential.

To disable web search and conserve your capacity:

1. Click on the slider icon in the lower left corner of your chat input.

2. Find **Web search** in the dropdown.

3. Toggle it off.

You can re-enable it anytime you need current information.

## Tips for effective use

1. **Ask about recent information**: If you ask questions like "Are there any upcoming meteor showers?" or "What are the latest developments in quantum computing?", Claude will search the web for current data.

2. **Specify in your prompt:**

  - If you want to ensure that Claude uses web search, include "Search the web" or "Use web search" in your prompt to Claude.

  - You can also instruct Claude not to use web search in the prompt.

3. **Request multiple sources**: Claude can gather and synthesize information from various sources to give you a comprehensive view.

4. **Verify important information**: While Claude strives for accuracy:

  - Cross-reference cited sources to understand the full picture.

  - Use authoritative sources for critical decisions.

## Limitations

- Search availability may vary based on connectivity.

- Occasionally, website links may not function.

- Claude may use your location (inferred from your IP address) when responding to a request for localized results.

- Search times may vary based on query complexity.

- Usage of web search and web fetch counts toward your daily limits.

## Support

- For web search questions or support, please visit our **[Online Safety Contacts](https://support.claude.com/en/articles/11174660-online-safety-contacts)** page.

- For content removal requests, please visit our **[Blocking and Removing Content from Claude](https://support.claude.com/en/articles/10684638-reporting-blocking-and-removing-content-from-claude)** page.
---

SOURCE: https://support.claude.com/en/articles/11088861-use-research-on-claude

# Use research on Claude

Research is available for users with paid Claude plans (Pro, Max, Team, or Enterprise) using Claude on the web, Claude Desktop, or Claude Mobile.

Research transforms how Claude finds and analyzes information. Claude operates agentically, conducting multiple searches that build on each other while determining exactly what to investigate next. It explores different angles of your question automatically and works through open questions systematically.

With research, Claude delivers thorough answers in minutes, complete with easy-to-check citations so you can trust Claude's findings.

**Important:**  You must have **[web search](https://support.claude.com/en/articles/10684626)** turned on for research to function.

## How to enable or disable research

Click the “+” button on the bottom left of your chat interface, then "Research." A blue indicator will appear on the bottom of the chat window. Click the indicator again to disable research.

## Use research

Once research is turned on, you can ask Claude a question. Claude will kick off the research process across your internal context (such as **[Gmail, Google Calendar, and Google Docs when connected](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors)**) and the web.

To see an example of using Claude's Research feature to plan a team offsite, watch the video here: **[Using Research](https://claude.com/resources/tutorials/using-research)**.

## Frequently asked questions

### I enabled research, but Claude doesn’t seem to be researching. What should I do?

In this case, you can steer and prompt Claude to use Research by saying “Claude, please use the research tool to…”

### I have research on, which should be pulling against my internal documentation via the Google integrations I have turned on, but isn’t. What should I do?

In this case, you should steer and prompt Claude to “Pull relevant context from [relevant internal knowledge source].”

To see an overview of Claude's research capabilities with the Google Workspace integration, watch the video here: **[Using research and Google Workspace](https://claude.com/resources/tutorials/using-research-and-google-workspace)**.

### Does research count against usage limits differently than normal conversations?

Research is subject to the same limits as standard Claude conversations. However, research sessions can use up your limits faster due to Claude retrieving multiple sources and providing comprehensive responses.
---

SOURCE: https://support.claude.com/en/articles/11095361-when-should-i-use-web-search-extended-thinking-and-research

# When should I use web search, extended thinking, and research?

Claude offers several powerful capabilities to help you find information and solve problems. Understanding when to use each option—web search, extended thinking, and research—can help you get the best results for your specific needs. This guide explains the ideal use cases for each feature and how they can work together to enhance your experience.

For more information on availability, enabling, and using each feature, explore the resources below:

- **[Web search](https://support.claude.com/en/articles/10684626)**

- **[Extended thinking](https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings#h_fe39272335)**

- **[Research](https://support.claude.com/en/articles/11088861)**

## Web search

Web search is best for straightforward, factual queries that can be answered with one or two tool calls, such as checking the weather, getting info about a specific company, retrieving recent news headlines, or getting up-to-date details like "who won the Lakers game last night?"

It's also helpful if you want to steer Claude more—you want to tell it generally what to search, but also want it to handle the process of actually running the web searches and analyzing the results.

## Extended thinking

Extended thinking shines when tackling complex reasoning tasks that don't require recent info from the web—like solving mathematical problems, debugging code, or analyzing philosophical concepts—allowing Claude to explore multiple angles before reaching a conclusion. For example, "optimize this algorithm for better performance," or "analyze the bioethics of organ donation from multiple perspectives."

Extended thinking on its own is best if you don't want to search the web or use integrations, but just want Claude to think harder about your query to figure out the answer.

## Research

Research is optimal for comprehensive information gathering requiring five or more tool calls over 1-3 minutes, creating in-depth reports by synthesizing information from multiple sources across the web and your integrations. It can do things like compare business competitors, update outdated internal documents with info from the web, help you prioritize or action items from your calendar and email, and more.

## Use research and extended thinking together

Combining extended thinking with research allows Claude to both plan its approach thoughtfully and execute comprehensive information gathering, as when researching emerging technologies for a business proposal or analyzing multiple scientific papers for a research project. The research feature can synthesize information across multiple sources with proper citations and produces a longer final report.
---

SOURCE: https://support.claude.com/en/articles/12260368-use-incognito-chats

# Use incognito chats

Incognito chats are available to all Claude users (Free, Pro, Max, Team, and Enterprise plans).

## What are incognito chats?

Incognito chats are temporary conversations that aren't saved to your chat history or to **[Claude’s memory](https://support.claude.com/en/articles/11817273-using-claude-s-chat-search-and-memory-to-build-on-previous-context)**. These differ from regular chats in several ways:

- Incognito chats are not used for training. See our Privacy Center for more information:

  - **[Is my data used for model training?](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training)** (for Free, Pro, and Max plans)

  - **[Is my data used for model training?](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training)** (for Team and Enterprise plans)

- While incognito chats aren't saved to your chat history, they are retained for either 30 days (default), or longer in accordance with your organization's custom data retention setting (available for Enterprise plans).

- Claude won’t pull information from incognito chats when searching previous conversations.

- If you are using Claude’s memory:

  - Starting an incognito chat won’t use Claude’s existing memory.

  - Incognito chats will not be included in future memory entries.

- Incognito chats aren't included in **[your monthly recap](https://support.claude.com/en/articles/15672559)**.

---

## How to start an incognito chat

When starting a new chat with Claude outside of a project, you'll see a ghost icon in the upper right corner of your screen:

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1719768744/c7a2fa56cf284e48472f3b9c4dbf/030563f8-9f97-4891-a749-9ae95968a063?expires=1785257100&amp;signature=616fadae527e8256f03178c9762fadd14446232be626099bf27e75bdff0bb360&amp;req=dScmH854lYZbXfMW1HO4zeUcuwe%2Fa%2BKKDCAt3Cx%2FSO0BB%2B%2FcQdGnS5bt%2FhmV%0AUwmptymTvc7IdHYWsRI%3D%0A)

1. Click the ghost icon to enable incognito mode.

2. The interface will indicate you're in an incognito chat with a black border and “Incognito chat” label in the upper left corner.

3. Begin your conversation with Claude.

4. When you’re finished chatting, click the “x” in the upper right corner to close the incognito chat.

---

## Important information for Team and Enterprise plans

If you're using incognito chats on a Team or Enterprise plan:

- Incognito chats are included in organizational data exports available to account Owners.

- While incognito chats aren’t saved to your chat history, they are retained for 30 days for safety, or longer in accordance with your organization's data retention policy.

- Incognito chats are included in the **[Compliance API](https://support.claude.com/en/articles/13015708-access-the-compliance-api)** (available for Enterprise plans).

---

## Frequently asked questions

### Can Claude access my profile information (custom styles, personal preferences, etc.) in incognito chats?

Yes, Claude can access this information within an incognito chat.

### Can I convert an incognito chat to a regular chat?

No, once you start an incognito chat, it cannot be converted to a regular chat or saved to your history.

### Can I use incognito mode in projects?

Incognito mode is currently only available for chats outside of projects, so you will not see the ghost icon when starting a chat within a project.

### What happens if I accidentally close an incognito chat?

Once closed, incognito chats cannot be reopened. Make sure to save any important information before ending your session.
---

SOURCE: https://support.claude.com/en/articles/12466728-troubleshoot-claude-error-messages

# Troubleshoot Claude error messages

This article explains common error messages and warnings you may encounter when using Claude and provides guidance on how to address them.

## Usage limit warnings and errors

Usage limit warnings appear when you're approaching your plan’s limit within a five-hour session: *“Approaching 5-hour limit.”*

If you hit your plan’s limit after the warning appears, you’ll see a blocking error message letting you know when you can use Claude again: *“5-hour limit reached - resets [time].”*

Looking for ways to maximize your Claude usage? Refer to **[Usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices)**.

### Usage credits

Paid Claude users with usage credits enabled in Usage settings will see a slightly different usage limit error: *"5-hour limit resets [time] - continuing with usage credits."* Note that this will only appear for members with access to usage credits.

Refer to these articles for more information about this feature depending on your plan:

- **[Manage usage credits for paid Claude plans](https://support.claude.com/en/articles/12429409-)**

- **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-)**

## Length limit errors

You may encounter a length limit error when your message to Claude exceeds the maximum input length allowed: "Your message will exceed the length limit for this chat. Try attaching fewer or smaller files or starting a new conversation." This error indicates that your message is too long and needs to be shortened before sending it to Claude.

For users on paid plans with code execution enabled, Claude automatically manages long conversations by summarizing earlier messages when context limits are approached. This means most users will rarely encounter length limit errors during normal use. Your full chat history is preserved so Claude can reference it even after summarization. In rare cases where you still encounter this error (such as when sending a very large first message), you can:

- Break your content into smaller chunks and process them separately

- Summarize or extract key sections before sending to Claude

- Use Claude to first identify the most relevant portions of your content

- Start a new conversation

## Login errors

If you see a generic error message when attempting to log in to your Claude account (e.g, "There was an error logging you in"), try the following troubleshooting steps:

- Ensure you’re not using a VPN when accessing Claude.

- Disable any browser extensions that you currently have active.

- Clear your browser’s cache and cookies.

If you're still seeing an error, check **[our status page](http://status.claude.com)** for active incidents.

## Capacity constraints

Capacity issues occur when Claude’s infrastructure experiences high demand system-wide. When capacity is constrained, you may see this message when chatting with Claude: *"Due to unexpected capacity constraints, Claude is unable to respond to your message. Please try again soon."*

**Important:** Capacity constraints are not outages. The system is functioning normally but managing high demand across all users. These issues are temporary and typically resolve as demand patterns shift throughout the day. If you encounter this message, try again in a few minutes.

Capacity issues will not appear on our status page because they represent normal load management rather than technical problems.

## Service incidents and outages

Service incidents are disruptions where Claude is unavailable or significantly degraded for all or most users. These represent actual technical problems with our systems. To check for confirmed incidents, visit status.claude.com, where you'll find real-time updates on scope, impact, and resolution progress for any active incidents.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1753796247/e6a8c6ef8653b229c5758e881242/c2fc6fc0-d163-4119-93e0-394104d86bc9?expires=1785257100&amp;signature=bea9974124ff7fb073dfb5ca772b15fbb57e6a08c79e2f0c715c71545975c345&amp;req=dSciFc53m4NbXvMW1HO4za4BXqoh17XF7y68oYp%2BYg8vV0yVVeqWJfv8RWtg%0AxAxuLfMpej8iaOMLdZc%3D%0A)
---

SOURCE: https://support.claude.com/en/articles/14503520-available-beta-and-research-preview-features

# Available beta and research preview features

Claude offers some features in beta or research preview before they become generally available. This article explains what those labels mean, which features they apply to, and what to expect when you use them.

## What the labels mean

Some Claude features are marked as beta or research preview. Both labels signal that a feature is still evolving, but they describe different stages of development.

### Research preview

Research preview features are earlier in development. They give you a first look at something we're exploring, and they're more likely to change significantly before they become generally available.

### Beta

Beta features are further along in development. They're stable enough for regular use, and we're still refining how they work based on what we learn from people using them.

## What to expect

When you use a beta or research preview feature, keep the following in mind:

- **The experience may change.** We iterate on these features based on how they're used and what we hear from people using them.

- **Performance and reliability may vary.** These features haven't gone through the same level of polish as generally available features.

- **Not every feature graduates.** Some beta and research preview features become a permanent part of Claude. Others don't, and we sometimes remove features that don't work out.

---

## Current beta and research preview features

This table below lists the beta and research preview features currently available across our products; click on the feature name to learn more.

| **Feature**                                                                                                                  | **Category**      | **Status**       |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- |
| **[Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)**                                     | API and developer | Research preview |
| **[Claude Code usage tracking](https://support.claude.com/en/articles/12157520-claude-code-usage-analytics)**                | Billing and usage | Beta             |
| **[Claude Code Desktop](https://code.claude.com/docs/en/desktop#use-claude-code-desktop)**                                   | Claude Code       | Beta             |
| **[Claude Code Security Center](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code)** | Claude Code       | Research preview |
| **[Claude Code web (CCR)](https://support.claude.com/en/articles/12618689-claude-code-on-the-web)**                          | Claude Code       | Research preview |
| **[Code review](https://support.claude.com/en/articles/14233555-set-up-code-review-for-claude-code)**                        | Claude Code       | Research preview |
| **[Claude for Word](https://support.claude.com/en/articles/14465370-use-claude-for-word)**                                   | Integrations      | Beta             |
| **[GitHub integration](https://support.claude.com/en/articles/10167454-using-the-github-integration)**                       | Integrations      | Beta             |

**Note:** Availability varies by plan. Check each linked article to confirm which plans support the feature.

---

## Share feedback

Feedback on beta and research preview features helps inform our decisions. You can share feedback with **[our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)**.
---

SOURCE: https://support.claude.com/en/articles/15363606-why-claude-switched-models-in-your-conversation-with-fable-5

# Why Claude switched models in your conversation with Fable 5

This article explains why a request might be blocked, what happens when your conversation switches to a different Claude model, and how to manage automatic switching.

## Why some requests get blocked

Claude Fable 5's capabilities far exceed those of every model we've previously made generally available. It is state-of-the-art on nearly all tested benchmarks of AI capability, showing exceptional performance in software engineering, knowledge work, vision, and many other areas.

Releasing a model this capable comes with risks. Without strong safeguards, Claude Fable 5's advanced capabilities in areas like cybersecurity and biology could be misused by users to create large-scale cyberattacks or bioweapons that could result in catastrophic damage. These capabilities are the reason we’ve previously only released Mythos-class models (like Mythos Preview) to a small number of selected and vetted partners.

Recognizing these risks, to allow general users to access the vast majority of Fable 5's capabilities, we've launched the model with safeguards that block its responses in some specific areas in line with our **[Terms of Service](https://www.anthropic.com/legal/commercial-terms)** and **[Acceptable Use Policy](https://www.anthropic.com/legal/aup)**. We’ve also **[been iterating](https://www.anthropic.com/news/redeploying-fable-5)** on safeguards since our first launch of Claude Fable 5.

Most user queries blocked by these safeguards on Fable 5 may instead receive a response from our next-most-capable model, Claude Opus 4.8 (i.e., "fallback"). We're working on making these safeguards more discerning to precisely block uses of the model that directly relate to targeting risks, with fewer false positives than there are today.

## What requests may fallback

**Claude Fable 5 runs automated safety checks on every user request. These checks are intended to visibly fallback from Fable 5 to a non-Mythos model (e.g., Opus 4.8) when users submit requests in four areas:**

- Offensive cybersecurity techniques, such as building exploits, malware, or attack tooling. Claude Fable 5 can assist with routine cybersecurity tasks, but users should expect high fallback rates. The safeguards are designed to block access to Mythos-level capabilities.

- Majority of biology, chemistry, and life sciences queries, such as lab methods or molecular mechanisms. In the near-term, this may impact the model’s ability to help with benign biology research and related topics, such as biotech business documentation, medical imaging and diagnostics, clinical and diagnostic healthcare questions, or basic educational content in biology.

- Distillation attacks on Fable 5, including attempts to extract the model’s **[summarized thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking#summarized-thinking).**

- A narrow set of frontier LLM development tasks, such as distributed training infrastructure, ML accelerator design, and kernel development for certain non-standard chips.

These blocking safeguards are intentionally broad, and we work to continuously improve the safeguards to reduce their user-experience impact. When requests are blocked, they may fallback to a non-Mythos model, currently Opus 4.8.

The checks also review everything the model reads, not just your latest message—including memory, content from connectors, web search results, and files, so a block can be triggered by content you didn't type.

## What happens after a block

By default, automatic model switching is active in Claude, Claude Cowork, Claude Code, Claude Design, and Claude for Microsoft 365. When automatically switching models, Claude re-runs your blocked Claude Fable 5 request on Claude Opus 4.8 in the same conversation. You’ll see a notice explaining that the model switched, and the response will be labeled with the model that answered. Opus is a highly capable model with strong safeguards of its own, and for most otherwise legitimate requests blocked on Fable 5, Opus should give you a helpful answer.

After the switch, the model picker stays on Opus for the rest of the conversation. You can switch back to Claude Fable 5 anytime from the model picker.

**Note:** If you switch back to Claude Fable 5 after an automatic model switch occurs, note that the same Fable 5 safeguards may block the conversation again because the original request is still part of it. Editing your previous message before retrying often helps.

### If the request is also blocked on Opus

Opus has its own safety systems. If your request is also blocked on Opus, you can edit your message and retry. For cyber specifically, if your use case has a legitimate defensive purpose and is being affected by these safeguards, you can apply for the Cyber Verification Program (CVP) for Opus. Learn more about **[real-time cyber safeguards and the Cyber Verification Program](https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude)**.

## Manage automatic model switching

Automatic switching is enabled by default the first time you select Claude Fable 5. It stays on by default, and you can turn it off anytime:

1. Go to **[Settings > Capabilities](http://claude.ai/settings/capabilities)** (or **Config > MODEL & OUTPUT** in Claude Code).

2. Toggle **Switch models when a message is flagged** off.

With automatic model switching off, a blocked request pauses the conversation instead of switching models. You can then:

- Edit your message and retry on  Claude Fable 5

- Send the same message to Opus manually

## Usage and billing

Blocked requests are billed differently depending on when the block happens:

- **Blocked on input:** If a request is blocked before Claude Fable 5 produces any output, the conversation switches to Opus immediately. You're charged only at Opus rates, and the Opus response counts toward your usage limit or consumption.

- **Blocked midstream:** If a request is blocked midstream, the input and the tokens streamed before the block are charged at Claude Fable 5 rates. The rest of the response is charged at Opus rates.

## Give feedback

If your blocked request seems unrelated to security or biology topics, or if your legitimate work in these areas keeps getting blocked, let us know. Use "Send feedback" to report it. Reports of incorrectly blocked requests help us narrow and improve these safeguards.

## Stay tuned for updates

Moving forward, we plan to consider ways to open up allocations for dual-use cyberdefense and biology research. As our safety systems mature, we aim to support legitimate biology and defensive cybersecurity work while keeping strong protections against misuse in place.

We'll share more details about the program, including eligibility and how to apply, as they become available. Watch this Help Center for updates, or **[sign up for notifications here](https://claude.com/form/mythos-access-interest)**.

## Where automatic model switching applies

Automatic model switching works the same way everywhere you can use Claude Fable 5:

- Claude on the web

- Claude Mobile

- Claude Desktop

- Claude Cowork

- Claude Code

- Claude Design

- Claude for Microsoft 365

- Claude for Teams

- Claude in Slack

- Claude Tag

**Important:** If you're using the Claude API, model switching works differently. Automatic switching isn't automatic, and API customers must opt into and configure the switching in the API. See the **[developer documentation](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback)** for details.

Read our blog to learn more about Claude Fable 5: **[Claude Fable 5 and Claude Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5)**.
---

SOURCE: https://support.claude.com/en/articles/16049681-why-claude-switched-models-in-your-conversation-with-opus-5

# Why Claude switched models in your conversation with Opus 5

This article explains why a request might fallback on Claude Opus 5, what happens when your conversation switches to another model, and how to manage automatic switching.

## Why some requests get blocked

Claude Opus 5 improves on Claude Opus 4.8 across the board, including in software engineering and cybersecurity. We've set its safeguards in line with those capability gains.

Most cyber requests sent to Opus 5 will not encounter fallback safety interventions. A narrow set of higher-risk cybersecurity requests fallback to Opus 4.8, our next-most-capable model, so we can keep supporting everyday security work while limiting the risk of misuse. We're continuing our work to reduce false positives, and your feedback helps inform these improvements.

## What requests may fallback

Claude Opus 5 runs automated safety checks, or classifiers, on every user request. These checks cause Claude to visibly fallback from Opus 5 to Opus 4.8 when you submit higher-risk offensive cybersecurity requests, such as:

- Exploit generation

- Binary-based vulnerability scanning

- Penetration testing

You can still use Opus 5 for security work, including scanning source code for vulnerabilities, triaging security issues, and building secure code.

The checks also review everything the model reads, not just your latest message. This includes memory, content from connectors, web search results, and files, so a fallback can be triggered by content you didn't type.

In early testing, Opus 5 traffic ran into cyber fallbacks 85% less than Fable 5.

**Note:** While Claude Opus 5 improves on Opus 4.8 in biology, it is not as capable as Fable 5 at real world long-horizon tasks for novel research discoveries that could lead to significant risk. As a result, Opus 5 doesn't fallback on biology, chemistry, or life-sciences questions. It uses similar safeguards for these topics as Opus 4.8.

## What happens after a fallback

Automatic model switching is active by default. When your request falls back, Claude re-runs your blocked Opus 5 request on a less capable model in the same conversation. You'll see a notice explaining that the model switched, and the response will be labeled with the model that answered.

After the switch, the model picker stays on the less capable model for the rest of the conversation. You can switch back to Opus 5 anytime from the model picker.

**Note:** If you switch back to Opus 5 after an automatic model switch, the same Opus 5 safeguards may cause Claude to fallback again if your original request is still part of the conversation. Editing your previous message before retrying often helps.

## If the fallback request is also blocked

Opus 4.8 has its own safety systems. If your request is also blocked on Opus 4.8, you can edit your message and retry. For cybersecurity specifically, if your use case has a legitimate defensive purpose and is affected by these safeguards, you can apply for the Cyber Verification Program (CVP). Learn more about **[real-time cyber safeguards on Claude Opus and Sonnet](https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude-opus-and-sonnet)**.

**Note:** If your organization already uses Opus 4.8 through the Cyber Verification Program, access to Opus 5 with fewer cyber restrictions is available now. Opus 5 is also compatible with Zero Data Retention.

## Manage automatic model switching

Automatic switching is enabled by default the first time you select Claude Opus 5. It stays on by default, and you can turn it off anytime:

1. Go to **[Settings > Capabilities](http://claude.ai/settings/capabilities)** (or **Config > MODEL & OUTPUT** in Claude Code).

2. Toggle **Switch models when a message is flagged** off.

With automatic model switching off, a request that falls back pauses the conversation instead of switching models. You can then:

- Edit your message and retry on Opus 5

- Send the same message to a less capable model manually

## Give feedback

If your request is blocked but seems unrelated to cybersecurity, or if your legitimate security work keeps falling back, let us know. Use "Send feedback" to report it. Reports of incorrectly blocked requests help us narrow and improve these safeguards.

## Where automatic model switching applies

Automatic model switching works the same way everywhere you can use Claude Opus 5:

- Claude on the web

- Claude Mobile

- Claude Desktop

- Claude Cowork

- Claude Code

- Claude Design

- Claude for Microsoft 365

- Claude Tag

- Claude Science

**Important:** If you're using the Claude API, model switching works differently. Automatic switching isn't active by default, and API customers must opt into and configure the fallbacks. Until fallbacks are configured, the model will return a 200 response with a stop reason on the API. See the **[developer documentation](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback)** for details.

Read our blog to learn more about**[Claude Opus 5](https://www.anthropic.com/news/claude-opus-5)**.

Our safeguards are built to match the capabilities of a model. For how safeguards work on Claude Fable 5, see **[Why Claude switched models in your conversation with Fable 5](https://support.claude.com/en/articles/15363606-why-claude-switched-models-in-your-conversation-with-fable-5).**
---

SOURCE: https://support.claude.com/en/articles/8230524-how-can-i-delete-or-rename-a-conversation

# How can I delete or rename a conversation?

*This article is about our consumer products (e.g. Claude Free, Claude Pro). For our commercial products (e.g. Claude for Work, Claude API), see [here](https://privacy.claude.com/en/articles/11117329-how-can-i-delete-or-rename-a-conversation).*

## Deleting and renaming individual conversations

To delete or rename an individual conversation:

1. Navigate to the conversation you want to delete or rename.

2. Click on the name of the conversation at the top of the screen.

3. Select either "Delete" or "Rename" from the options that appear:

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1621955348/4844057e0f0847b580b95bc01625/Screenshot+2025-07-15+at+11_43_18%E2%80%AFAM.png?expires=1785257100&amp;signature=1e770b9f25dbb823574d4598ef1846b7c3112221db0e9ee130b0a2b4f8c9a46d&amp;req=dSYlF8B7mIJbUfMW1HO4zVBo5Ob1aIdbt5RK2C3E1TdCn1XDAPqPzwnDafUC%0ABK6%2BYbi5l8u1BqHwi%2BM%3D%0A)

## Deleting conversations in bulk

To delete multiple conversations at once:

1. Navigate to [your chat history](https://claude.ai/recents) by clicking "Chats" on the left sidebar.

2. Hover over the conversations you want to delete, and check the selection box that appears.

3. Once you've selected the conversations to delete, click on the "Delete Selected" button.
---

SOURCE: https://support.claude.com/en/articles/8241126-upload-files-to-claude

# Upload files to Claude

This article explains how to upload documents and images to Claude, including supported file types, size limits, and how to get started.

## Supported file types

### Documents

Claude can work with the following document types:

- PDF

- DOCX

- CSV

- TXT

- HTML

- ODT

- RTF

- EPUB

- JSON

- XLSX*

**Note:** You must enable **[code execution and file creation](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude#h_1c99382190)** in your account to upload XLSX files.

### Images

Claude supports the following image formats:

- JPEG

- PNG

- GIF

- WebP

---

## How to upload files

You can upload files to Claude in several ways:

1. Click the "+" button in the lower left corner of the chat box

2. Select "Add files or photos" from the menu.

3. Choose files from your device for upload.

4. Click "Open" to attach the files, or drag and drop the files directly into the chat window.

5. You can also copy images and paste them from your clipboard into Claude.

Files can be uploaded to individual chats or uploaded to a project's **Files** section for persistent reference across conversations.

---

## File limits

### Chat uploads

- **File size:** 500MB per file

- **Number of files:** Up to 20 files per chat

- **Image dimensions:** Up to 8000x8000 pixels

- **Number of pages:** PDFs are limited to 1000 pages

### Project files

- **File size:** 30MB per file

- **Number of files:** Unlimited, but total content must fit within Claude's context window

- **Content type:** Text extraction only (except for multimodal PDFs)

**Note:** Additional token limits may apply based on the length of extracted content.

---

## PDF processing

Claude analyzes both text and visual elements (like images, charts, and graphics) in PDFs of 100 pages or fewer. For PDFs from 101 to 1000 pages, Claude processes text only and doesn't analyze visual elements. You can't upload PDFs over 1000 pages. If you try, you'll see an "Uploaded file is too large" error.

---

## Tips for best results

**For images:** Use images that are 1000x1000 pixels or larger. Avoid small or low-resolution images where possible.

**For PDFs:** When referring to specific pages, use the PDF page numbers as shown in your PDF viewer, not the page numbers printed on the document itself.

**For large documents:** If you're working with larger files, consider dividing them into smaller sections to stay within limits.

**For non-PDF documents:** Claude extracts text only from these files. If they contain embedded images, Claude won't be able to read or interpret them.
---

SOURCE: https://support.claude.com/en/articles/9125743-what-is-the-external-researcher-access-program

# What is the External Researcher Access Program?

Our External Researcher Access Program is specifically designed to support and lower the barrier to entry for researchers working on AI safety and alignment topics that we consider high priority by providing free API credits.

If you are an alignment researcher and are interested in receiving free API credits for AI safety and alignment research purposes, you might qualify for our External Researcher Access Program.

Please complete the following application form with details about your team and research topic:

**[Application Form - Anthropic's External Researcher Access Program](https://forms.gle/pZYC8f6qYqSKvRWn9)**

**Note:** In special cases, we support API access to certain retired models (models that are no longer generally available). Users may request access via [this form](https://docs.google.com/forms/d/1O2Om9t4CQoLKHQew7XguQYKrPGS8-sCmK42KNXcwn3k/edit). This is separate from our External Researcher Access Program. Standard API pricing applies.

## About this Program

**Note:** You can access the Claude model family immediately via API by simply creating a [Claude Console](https://platform.claude.com/dashboard) account – you do not need to contact us first.

1. This program provides **free API credits** for our **standard model suite** to researchers working on AI safety and alignment topics we consider high priority.

2. Note that these credits are for **API use** and *do not* apply to the Claude web app.

3. This program does *not* provide access to **non-standard or nonpublic models.**

4. **Applicants through this program do *not* receive exemption from our [Usage Policy](https://www.anthropic.com/legal/aup).** Our Trust & Safety team will follow our standard enforcement procedures and take action whenever an organization’s prompt activity hits our violation rate thresholds.

## About our Process

1. **We evaluate submissions on the first Monday of each month**. This schedule helps us manage the program sustainably. Please note that if this timeline poses a significant obstacle for the applicant, it does not block them from simply purchasing API credits in the interim.

2. If successful, we will apply $1000 in API credits to the account. For rare special cases, we may approve a higher quantity of credit.

3. **Please note that given the substantial number of applications we receive (sometimes thousands in a single week), we regret that we cannot provide individual responses to unapproved submissions.** In addition, we reserve the right to reject submissions for any reason and will not be able to provide explanations for each individual applicant. However, we appreciate the time and effort put into each submission and will carefully review all entries. Thank you for your understanding.

If you are having an issue that requires a response urgently (e.g., you’ve suddenly run out of your credits before a major conference), please email <researcheraccess@anthropic.com>. However, please note that we will not be able to respond if your question is already addressed by the following FAQ.

---

## FAQ

### I would like access to non-standard or nonpublic models for my research. Is this possible?

We understand the potential value this could bring to your work, however, to balance supporting valuable research with maintaining the safety and integrity of our systems, we currently have the following policy in place:

- To maintain the sustainability of this free, high-volume program, we are unable to extend access to any nonpublic or experimental models through this External Researcher Access program. This non-standard or nonpublic model access is reserved for a very limited number of pre-deployment testing partnerships, which are not part of this program.

- We do not currently provide finetuning access via an API at this time. Finetuning access to Claude models is in preview mode via [AWS Bedrock](https://aws.amazon.com/about-aws/whats-new/2024/07/fine-tuning-anthropics-claude-3-haiku-bedrock-preview/) and not covered via this program.

- We continually evaluate our offerings and may consider expanding access to additional models in the future.

### I run a research program with many researchers and collaborators. What's the best way for us to apply for free API credits via this program?

For research programs with multiple researchers and collaborators, we recommend setting up a single account to represent your entire program, and submit an application through our application form: [Application Form - Anthropic's External Researcher Access Program](https://forms.gle/pZYC8f6qYqSKvRWn9)

If approved, we'll allocate credits to a single Claude Console organization ID, which you can then flexibly distribute among your researchers. This enables you to easily add or remove collaborators as needed, monitor usage across your team, and ensure compliance with our policies.

If your program's needs change significantly over time, please submit an updated application to discuss potential adjustments to your allocation.

### I am performing red-teaming or jailbreaking research. Is there a way to make sure our account does not get flagged for potentially breaking your [Usage Policy](https://www.anthropic.com/legal/aup) while our researchers are purposefully red-teaming?

We appreciate your interest in conducting red-teaming or jailbreaking research, as it plays a crucial role in improving AI safety. However, to maintain the sustainability of our External Researcher Access Program, participants *are not exempt* from our [Usage Policy](https://www.anthropic.com/legal/aup). Our Trust & Safety team will follow our standard enforcement procedures and take action whenever an organization’s prompt activity hits our violation rate thresholds.

However, to balance supporting valuable research with maintaining the safety and integrity of our systems, we have created two alternative opportunities:

1. **Close collaborators of Anthropic employees**: If you are already collaborating closely with an Anthropic employee on your research and require an exemption to our Usage Policy, please inform your Anthropic collaborator about your needs. They can initiate our internal approval process, and, *if approved via this process*, your account will be appropriately labeled.

2. **Model Safety Bug Bounty Program**: For researchers focusing specifically on jailbreaking, we encourage you to apply to our Model Safety Bug Bounty Program. This program is designed to support and reward research in this area.

### Does your Researcher Access Program provide free API credits for other areas of research?

Our Researcher Access Program is specifically designed to support and lower the barrier to entry for researchers working on AI safety and alignment topics that we consider high priority. To maintain the sustainability of this free, high-volume program, we are currently focusing our resources on these specific areas.

While we're unable to extend free API credits to other fields of research at this time, we want to emphasize that this doesn't prevent you from accessing our API for your research purposes. We welcome researchers from all disciplines to purchase API credits and conduct their studies using our platform. We value the diverse range of research being conducted with our API and are always excited to hear about the innovative ways it's being used across various fields.

### I am a researcher based in a country where Claude is currently unavailable. Can I access your API through this program?

We greatly appreciate your interest in using Claude for your research. However, we are unable to provide API access in countries where Claude is not yet officially available.

We understand this may be disappointing. In the meantime, we encourage you to stay informed about Claude's availability updates through our news updates.

### I have contacted you about free API credits through your Researcher Access Program and have not heard back about my application. Who should I contact?

Thank you for your interest in our Researcher Access Program and for taking the time to submit an application. We appreciate your patience. Here's what you need to know about our application process:

1. **High volume of applications:** We receive thousands of applications each month. To maintain the sustainability of this free, high-volume program, we are unable to provide individual responses to all applicants.

2. **Monthly evaluation schedule:** We evaluate submissions on the 1st Monday of each month. This schedule helps us manage the program sustainably and ensure fair consideration for all applicants.

3. **Other options:** If our monthly evaluation schedule poses a significant obstacle for your research timeline, please note that you're welcome to purchase API credits in the interim to begin your work immediately.

4. **Approval notifications:**

  1. If your application is approved, you will be notified promptly after the monthly evaluation.

  2. If you haven't heard back from us, it means that your application has not been approved.

5. **Reapplication:** Please note that this program was substantially revised in **July 2024**. If you contacted us before that time, or if significant time has passed since your initial application, you're welcome to submit a new application through the new application form with any updated information about your research: [Application Form - Anthropic's External Researcher Access Program](https://forms.gle/pZYC8f6qYqSKvRWn9).

​Thank you for your understanding. We're committed to supporting the AI research community to the best of our ability while maintaining a sustainable process.