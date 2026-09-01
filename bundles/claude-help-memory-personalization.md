
---

SOURCE: https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features

# Understanding Claude's personalization features

Claude offers several ways to personalize your experience. Each serves a different purpose in helping Claude better understand and meet your needs.

## Instructions for Claude

Instructions are account-wide settings that help Claude understand your general instructions that Claude should consider in responses.

To set your instructions:

1. Click your initials in the lower left corner.

2. Select "Settings."

3. Under "Instructions for Claude," describe your instructions, such as:

  - Your preferred approaches or methods

  - Common terms or concepts you use

  - Typical scenarios you encounter

  - General communication instructions

Any instructions you add here will be applied to all of your conversations with Claude.

---

## Project instructions

Project instructions help Claude understand the specific context and requirements for a particular project. These instructions only apply to chats within that project.

Projects are available to all users, including those with free Claude accounts. Free users can create a maximum of five projects.

Use project instructions when you want to:

- Provide project-specific context

- Set guidelines for a particular workflow

- Establish requirements for a specific set of tasks

- Define roles or perspectives Claude should adopt within the project

Project instructions are particularly useful when you're working on focused tasks or need Claude to maintain consistent context across multiple conversations within the same project.

For detailed information on using projects, see our article on **[creating and managing projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)**.

---

## Skills

Skills add specific behaviors or capabilities to your conversations with Claude. They can customize how Claude communicates, apply specialized expertise, or define repeatable behaviors you activate on demand.

Use skills when you want to:

- Adjust the tone and format of Claude's responses

- Apply communication patterns based on your own writing or preferences

- Add specialized capabilities for particular tasks or topics

For more information, see **[What are skills?](https://support.claude.com/en/articles/12512176-what-are-skills)**

---

## Choosing the right feature

- Use profile instructions for account-wide settings that affect all your interactions with Claude.

- Use project instructions when you need specific guidance or context for a particular project (paid plans only).

- Use skills when you want to customize how Claude formats and delivers its responses.

You can use these features independently or in combination to create the most effective experience for your needs.
---

SOURCE: https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context

# Use Claude’s chat search and memory to build on previous context

You can prompt Claude to search through your previous conversations to find and reference relevant information in new chats. Claude can also remember context from your chats and carry it into new conversations and Cowork tasks. This article explains how chat search and memory work, what Claude does and doesn't remember, how to review and edit what's saved, and how to turn these features on or off.

**Important:** We have introduced an improved experience for memory and migrated users off the legacy experience. If you think Claude has forgotten something in that migration:

- Navigate to **[Settings > Memory](https://claude.ai/new#settings/customize-memory)** and until September 9, 2026, you will see the option to export your legacy memory.

- Once you have exported your legacy memory, paste it back into Claude, highlighting the portion that may have been forgotten.

---

## Search past chats with Claude

Searching past chats is available to users on paid plans (Pro, Max, Team, and Enterprise plans) on the web, Claude Desktop, and Claude Mobile apps.

You can prompt Claude to search through your previous conversations to find relevant information across sessions and reference specific details when needed. Simply ask Claude to find what you discussed before, and it will pull together the appropriate context to keep your conversation flowing. These searches use Retrieval-Augmented Generation (RAG) and will appear as tool calls during your conversations.

## What Claude can search

You can prompt Claude to search conversations within these boundaries:

- All chats outside of projects.

- Individual project conversations (searches are limited to within each specific project).

## Search and reference past chats

Once the ability to search past chats is rolled out to your account, it will be enabled by default. Just ask Claude about your previous conversations naturally to use it, such as:

- "What did we discuss about [topic]?"

- "Can you find our conversation about [subject]?"

- "Let's continue where we left off with [project]."

When Claude searches your previous chats, you will see this reflected in your current chat as a tool call.

## Can I prevent Claude from searching my past chats?

Yes, navigate to **[Settings > Memory](https://claude.ai/new#settings/customize-memory)** and switch the toggle next to "Search and reference chats" off:



## Can I exclude a specific past chat from searches?

Incognito chats are available to all Claude users (free, Pro, Max, Team, and Enterprise plans). See **[Use incognito chats](https://support.claude.com/en/articles/12260368)** for more information.

When starting a new chat with Claude outside of a project, you'll see a ghost icon in the upper right corner of your screen.

Clicking the ghost icon will open an incognito chat, creating a temporary conversation that isn’t saved to your chat history. Claude won’t pull information from incognito chats when searching previous conversations.

**Important:** If you’re using an Enterprise or Team plan account, incognito chats are included in standard data exports and follow your organization's data retention policies. You can't search past chats if your organization uses customer-managed encryption keys on an Enterprise plan because conversation content is encrypted.

---

## What is Claude's memory?

Claude can generate memory based on your chats. With the addition of memory, Claude transforms from a stateless chat interface into a knowledgeable collaborator that builds understanding over time.

Memory is on by default for Free, Pro, and Max plans on the web, Claude Desktop, and Claude Mobile (update to the latest version of the app). On Team and Enterprise plans, memory is off by default and can be turned on by an owner. Memory is shared between Chat and Claude Cowork when Cowork runs in the cloud; Cowork sessions that run locally on your computer don't use memory.

## How does Claude’s memory work?

In addition to searching past chats, enabling Claude's memory feature adds several capabilities.

### How Claude stores memory

Claude saves memory as a set of individual topics as you chat, rather than summarizing conversations after they end. Mention that a deadline moved, and your next conversation already knows. Claude saves on its own, and you can also tell Claude to "remember this" to save something directly.

### Project memory and summary

Each project has its own separate memory space and dedicated project summary, so the context within each of your projects is focused, relevant, and separate from other projects or non-project chats.

### One memory across chat and Claude Cowork

What Claude remembers from your chats is available when you hand it a task in Cowork in the cloud, and what comes up in a Cowork task carries back to chat. For example, ask Cowork to draft an update for your manager, and it already knows who that is and how they like updates written.

**Note:** Memory across Cowork and chat only works when Cowork runs in the cloud. It isn't available in Cowork sessions that run locally on your computer. Learn more about **Cowork in the cloud**.

## Turn memory on or off

**Note:** Members of Enterprise plans can only enable this feature individually when it’s enabled by an owner for their organization. For more information, see **[Controls for Enterprise plan owners](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context#h_18b0f4a7ce)**.

You can toggle Claude’s memory on by navigating to **[Settings > Memory](https://claude.ai/new#settings/customize-memory)** and turning on **Generate memory from chats**:



If you want to disable Claude’s memory, click the toggle and you'll see two options:

- **Pause memory:** Claude keeps its existing memory, including sensitive topics if you have it turned on, but won't use memory or make new memories. Conversations while memory is paused won't be added to memory if you turn it back on. If you unpause memory, both your memory and sensitive topics memory will be on.

- **Reset memory:** Permanently deletes all memories including project memories. Once you select this option and click "Reset memory," this cannot be undone. Upon re-enabling the feature, you’ll start from scratch and Claude will not have its previous memory.

## What Claude remembers

Claude remembers the everyday context that helps it work with you, such as:

- Your role, projects, and professional context

- The people and places in your work and life

- Communication preferences and working style

- Technical preferences and coding style

- Project details and ongoing work

​We apply safeguards and conduct evaluations to memory to help keep users safe.

### Sensitive topics in memory

By default, Claude does not store topics related to personal or sensitive subject matter, like your health, race, ethnicity, religious beliefs, politics, gender identity, and other similar areas.

If these are topics you'd rather not keep re-explaining, you can choose to include them. Turn on **Include sensitive topics in memory** in **[Settings > Memory](https://claude.ai/new#settings/customize-memory)**. You can also turn it on from the one-time notice Claude shows in chat the first time it declines to save a memory because it referenced a sensitive topic.

Once the setting is on:

- Claude saves sensitive topics going forward. Anything from before you turned it on isn't saved retroactively.

- Each time Claude saves something on one of these topics, a notice appears above the message box so you can review it or update your settings.

  - If you’re using Claude for iOS or Android, this notice will only appear if you’re on the latest version of the mobile app. If you’re using an older version or the mobile app, you will not see this notice, and Claude won't save the sensitive topic to its memory.

If you decline the notice, or turn the setting off later, Claude removes any sensitive items already saved to memory.

**Important:** Some information is never saved to memory, even if you ask. This includes government ID numbers, criminal history, financial account numbers, and immigration status. Claude will let you know when it can't save something for this reason.

## What Claude doesn't remember

### Incognito chats

Incognito chats are available to all Claude users (free, Pro, Max, Team, and Enterprise plans).

When starting a chat with Claude outside of a project, you will see a ghost icon in the upper right corner of your screen; clicking this enables incognito chats. When this mode is switched on, Claude won’t remember your chats, so they won’t be saved to Claude’s memory or your chat history. Close your current incognito chat when you’re ready for Claude to start remembering your conversations again.

---

## Data retention and privacy

All memory will be retained in accordance with existing chat data retention policies.

- Claude’s memory reflects changes to your conversations as they happen.

- When a conversation expires or is deleted, related memory entries generated from it won’t be removed, but you can delete individual memories at any time.

- All memory data is included in data exports.

- Enterprise data retention policies apply to all memory-related data, including incognito chats.
​

---

## User controls and visibility

You have several mechanisms for managing and overseeing Claude's memory.

### View and manage your memory

See exactly what Claude remembers about you in **[Settings > Memory](https://claude.ai/new#settings/customize-memory)**. Everything Claude remembers is listed under **Topics**. Select any topic to read it, then use the edit icon to change it or select "Delete" to remove it. Fix something in one topic and the change applies to every conversation from then on.

You can also update memory directly from a chat. Tell Claude what you'd like it to remember, change, or forget, and the update applies to your next conversation.

### Past chat citations

When Claude references previous conversations, you'll see citations linking back to the original chats, along with the option to delete specific conversations.

### Toggle search past chats and memory on/off

You maintain control over Claude’s ability to search past chats and use memory–you can always disable these features and enable them again when needed in **[Settings > Memory](https://claude.ai/new#settings/customize-memory).**

### Importing your memory from other AI tools

You can now transfer your memory between Claude and other AI services. This feature lets you import memories from other AI assistants or export your Claude memory for backup or migration. This feature is experimental and still in active development, but for best practices, see this article: **[Importing and exporting your memory from Claude](https://support.claude.com/en/articles/12123587-importing-and-exporting-your-memory-from-claude)**.

---

## Controls for Team and Enterprise plan owners

Memory and sensitive topics are two separate controls for your organization, and both are off by default.

### Organization-level memory controls

Owners and Primary Owners can turn memory on for the organization in **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)**. Once enabled, individual users manage their own memory settings. Enabling memory doesn't enable sensitive topics, and even if you allow sensitive topics for your organization, nothing in those categories is saved until each user opts in themselves. Once a user has opted in, they control their own sensitive memories: they can view and delete individual entries, or turn sensitive topics off to stop saving new ones. Owners can't view or edit a user’s individual memories.

When an owner turns memory off for the organization, all existing memory entries for all users are deleted immediately, and users can't access the memory setting.

**Important:** Turning off memory at the organization level permanently deletes all memory data for everyone in your organization.

Memory isn't available to organizations with HIPAA, public-sector, or custom data retention agreements.

### Data handling and compliance

- **Memory entries** are stored with encryption at rest. When a conversation expires or is deleted, related memory entries aren't removed, but members can delete individual memories at any time.

- **Incognito chats** don't contribute to memory and aren't visible in members' chat histories, but they remain available to owners through data export and are subject to your data retention policies (retained for at least 30 days for safety purposes).

### Audit logging and data exports

- **Audit logging:** The system logs when owners turn org-level memory controls on or off. Standard conversation access logging applies to memory entries. Individual member memory edits aren't logged.

- **Data exports:** Memory entries are included in standard conversation history exports. Incognito chats are included in organizational data exports.

**Important:** All memory is retained and exportable by admins in accordance with your organization's chat data retention policies.

---

## Information for legacy memory users

**Important:** We are gradually introducing an improved experience for memory from chats. The sections below only apply to people who have the legacy memory experience and see **Memory** in **[Settings > Capabilities](https://claude.ai/settings/capabilities)**. If you see **[Settings > Memory](https://claude.ai/new#settings/customize-memory)**, you’re using the new memory experience and the sections above apply to you.

### Search past chats with Claude

Searching past chats is available to users on paid plans (Pro, Max, Team, and Enterprise plans) on the web, Claude Desktop, and Claude Mobile apps.

You can prompt Claude to search through your previous conversations to find relevant information across sessions and reference specific details when needed. Simply ask Claude to find what you discussed before, and it will pull together the appropriate context to keep your conversation flowing. These searches use Retrieval-Augmented Generation (RAG) and will appear as tool calls during your conversations.

### What Claude can search

You can prompt Claude to search conversations within these boundaries:

- All chats outside of projects.

- Individual project conversations (searches are limited to within each specific project).

### Search and reference past chats

Once the ability to search past chats is rolled out to your account, it will be enabled by default. Just ask Claude about your previous conversations naturally to use it, such as:

- "What did we discuss about [topic]?"

- "Can you find our conversation about [subject]?"

- "Let's continue where we left off with [project]."

When Claude searches your previous chats, you will see this reflected in your current chat as a tool call.

### Can I prevent Claude from searching my past chats?

Yes, navigate to **[Settings > Capabilities](https://claude.ai/settings/capabilities)** and find the **Preferences** section. Switch the toggle next to “Search and reference chats” off:



### Can I exclude a specific past chat from searches?

Incognito chats are available to all Claude users (free, Pro, Max, Team, and Enterprise plans). See **[Use incognito chats](https://support.claude.com/en/articles/12260368)** for more information.

When starting a new chat with Claude outside of a project, you'll see a ghost icon in the upper right corner of your screen:



Clicking the ghost icon will open an incognito chat, creating a temporary conversation that isn’t saved to your chat history. Claude won’t pull information from incognito chats when searching previous conversations.

**Important:** If you’re using an Enterprise or Team plan account, incognito chats are included in standard data exports and follow your organization's data retention policies. You can’t search past chats if your organization uses customer-managed encryption keys on an Enterprise plan because conversation content is encrypted.

---

### What is Claude's memory?

The legacy memory from chats experience is available for Enterprise plans. Memory applies to chats on the web, Claude Desktop, and Claude Mobile, and is not currently available for Cowork.

Claude can now generate memory based on your chat history. With the addition of memory, Claude transforms from a stateless chat interface into a knowledgeable collaborator that builds understanding over time.

### How does Claude’s memory work?

In addition to searching past chats, enabling Claude’s memory feature adds several capabilities.

**Memory summary**

Claude will automatically summarize your conversations and create a synthesis of key insights across your chat history (not including chats in projects). This synthesis is updated every 24 hours and provides context for every new standalone conversation.

**Project memory and summary**

Each project has its own separate memory space and dedicated project summary, so the context within each of your projects is focused, relevant, and separate from other projects or non-project chats.

### Enable Claude’s memory

**Note:** Members of Enterprise plans can only enable this feature individually when it’s enabled by an Owner for their organization. See **[Controls for Enterprise plan Owners](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context#h_f7d6b307e2)** for more information.

You can toggle Claude’s memory on by navigating to **[Settings > Capabilities](https://claude.ai/settings/capabilities)**:



If you want to disable Claude’s memory, click the toggle to see two options:

- **Pause memory:** Claude keeps its existing memory but won’t use memory or make new memories. Conversations with Claude while memory is paused will not be summarized into its memory should you turn the feature back on.

- **Reset memory:** Permanently deletes all memories including project memories. Once you select this option and click “Reset memory,” this cannot be undone. Upon re-enabling the feature, you’ll start from scratch and Claude will not have its previous memory.

**Note:** Pausing or resetting memory also hides your monthly recap, since Claude builds the recap from the same chat history. Learn more about **[the monthly recap](https://support.claude.com/en/articles/15672559)**.

### What does Claude remember?

Claude focuses on work-related context that helps improve collaboration. You will see this information reflected in your memory or project summary:

- Your role, projects, and professional context

- Communication preferences and working style

- Technical preferences and coding style

- Project details and ongoing work

### What Claude doesn't remember

**Incognito chats**

Incognito chats are available to all Claude users (free, Pro, Max, Team, and Enterprise plans).

When starting a chat with Claude outside of a project, you will see a ghost icon in the upper right corner of your screen; clicking this enables incognito chats. When this mode is switched on, Claude won’t remember your chats, so they won’t be saved to Claude’s memory or your chat history. Close your current incognito chat when you’re ready for Claude to start remembering your conversations again.

---

### Data retention and privacy

All memory will be retained in accordance with existing chat data retention policies.

- Deleted conversations are removed from memory synthesis.

- Claude’s memory is updated within 24 hours when conversations are created, modified, or deleted.

- All memory data is included in data exports.

- Enterprise data retention policies apply to all memory-related data, including incognito chats.

---

### User controls and visibility

You have several mechanisms for managing and overseeing Claude's memory.

**View and manage your memory summary**

See exactly what Claude remembers about you by navigating to **[Settings > Capabilities](https://claude.ai/settings/capabilities)** and clicking “View and edit memory.” The **Manage memory** modal displays everything Claude remembers about you. In addition to asking Claude to edit the existing summary, you can also tell Claude what you want it to remember. To add custom instructions to Claude’s memory, click the pencil icon in the lower left corner of the summary.

You can also update your memory summary directly from your chats. Simply tell Claude what you'd like it to remember, and it will update your memory summary without needing to leave the conversation. Any edits made in this way will immediately apply to your next conversation, so you don’t need to wait for the daily synthesis to run.

**Past chat citations**

When Claude references previous conversations, you'll see citations linking back to the original chats, along with the option to delete specific conversations.

**Toggle search past chats and memory on/off**

You maintain control over Claude’s ability to search past chats and use memory – you can always disable these features and enable them again when needed in **[Settings > Capabilities](https://claude.ai/settings/capabilities)**.

**Importing your memory from other AI tools**

You can now transfer your memory between Claude and other AI services. This feature lets you import memories from other AI assistants or export your Claude memory for backup or migration. This feature is experimental and still in active development, but for best practices, see this article: **[Importing and exporting your memory from Claude](https://support.claude.com/en/articles/12123587-importing-and-exporting-your-memory-from-claude)**.

---

### Controls for Enterprise plan owners

Enterprise plan Owners and Primary Owners have specific controls for managing memory features across their organization.

**Organization-level memory controls**

The organization-wide **Generate memory from chat history** toggle is enabled by default. When enabled, individual users can manage their own memory settings. Owners can disable the memory summary feature for their entire organization by navigating to **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)**. When disabled by an Owner, it immediately deletes all existing memory synthesis data for all users, and individual users cannot modify or access the memory synthesis setting.

**Important:** Disabling Claude's memory at the organization level will automatically and permanently delete all memory data for all users in your organization.

**Data handling and compliance**

- **Chat summaries** are stored alongside conversation data and follow your organization's existing data retention policies. When a conversation is deleted, its summary is also deleted.

- **Memory synthesis** is stored with encryption at rest and is tied to underlying conversations. As conversations expire or are deleted according to your retention settings, the synthesis updates accordingly.

- **Incognito chats** don't contribute to memory and aren't visible in users' chat histories, but they remain available to Owners through data export features and are subject to your existing data retention policies (retained for at least 30 days for safety purposes).

**Audit logging and data exports**

- **Audit logging:** The system logs when org-level memory toggles are enabled or disabled by Owners. Standard conversation access logging applies to memory synthesis. Individual user memory edits are not logged.

- **Data exports:** Memory synthesis and chat summaries are included in standard conversation history exports. Incognito chats are included in organizational data exports. All exported chat summaries remain tied to their source conversations.

**Important:** All memory will be retained and exportable by admins in accordance with existing enterprise chat data retention policies.

**Team plan limitations**

Team plans do not have organization-level controls for memory features. Individual Team plan members manage their own memory settings directly.
---

SOURCE: https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude

# Import and export your memory from Claude

Memory imports are available for Free, Pro, Max, and Team plans on the web and Claude Desktop.

You can transfer your memory between Claude and other AI providers. This lets you import memories from other AI providers into Claude, or export your Claude memory for backup or migration.

**Important:** We are gradually introducing an improved experience for memory from chats. The new experience will be the default for new users, and users on free, Pro and Max plans will be migrated to the new experience. Team and Enterprise plan admins will receive more information about a rollout in the coming weeks. In the interim, users on Team and Enterprise plans will stay on the legacy experience.

- If you see **[Settings > Memory](https://claude.ai/new#settings/customize-memory)**, you’re using the new memory experience, and the main sections that follow apply to you.

- If you see **Memory** in **[Settings > Capabilities](https://claude.ai/settings/capabilities)**, you’re using the legacy memory experience and can skip to **[Information for legacy memory users](#h_6e403e5d1a)**.

## Import memory into Claude

You can bring your memory over from other AI providers using Claude's built-in import flow.

## Step 1: Export your memory from your current AI service

We recommend using the following prompt. It’s written specifically to help you get all of your context in one chat.

*I'm moving to another service and need to export my data. List every memory you have stored about me, as well as any context you've learned about me from past conversations. Output everything in a single code block so I can easily copy it. Format each entry as: [date saved, if available] - memory content. Make sure to cover all of the following — preserve my words verbatim where possible: Instructions I've given you about how to respond (tone, format, style, 'always do X', 'never do Y'). Personal details: name, location, job, family, interests. Projects, goals, and recurring topics. Tools, languages, and frameworks I use. Preferences and corrections I've made to your behavior. Any other stored context not covered above. Do not summarize, group, or omit any entries. After the code block, confirm whether that is the complete set or if any remain.*

You can customize this prompt to exclude any sensitive information before importing into Claude. If your current service supports generating files, you can also ask it to export your memory as a Markdown file so you can save a copy for your records.

## Step 2: Open the import flow in Claude

To start the import:

- Go to **[Settings > Memory](https://claude.ai/new#settings/customize-memory)** and select "Start import."

The import flow will display the prompt shown above, along with a text box where you can paste the results.

## Step 3: Paste your exported memory and import

Paste the exported text from your previous AI provider into the text box and click the "Add to memory" button to submit it. Claude will extract key information and store it as individual memory entries. You can review the entries in the memory panel.

Once the import is complete, you'll see your updated memory shortly after. Click the "See what Claude learned about you" button to start a new conversation using this prompt: "I updated my memory. What did you learn about me?"

Claude's memory is designed to focus on work-related topics to enhance its effectiveness as a collaborator. As a result, Claude may not retain imported personal details unrelated to work. If you want to add specific information into Claude's memory, go to **[Settings > Memory](https://claude.ai/new#settings/customize-memory)** and add that information using the "Tell Claude what to change or remove" box, or by asking Claude in chat.

**Important:** Memory imports are **experimental and still in active development,** and at this stage,  Claude may not always successfully incorporate imported memories.

## Export memory from Claude

To view your memory exactly how Claude sees it, go to **[Settings > Capabilities](https://claude.ai/settings/capabilities)** and click “View and edit your memory.” Alternatively, you can access memory directly in a chat with Claude by asking it, "Write out your memories of me verbatim, exactly as they appear in your memory." You can save this exported memory as a backup or bring it to another AI service by copying and pasting it into a local file on your computer.

---

## Information for legacy memory users

**Important:** We are gradually introducing an improved experience for memory from chats. The sections below only apply to people who have the legacy memory experience and see **Memory** in **[Settings > Capabilities](https://claude.ai/settings/capabilities)**. If you see **[Settings > Memory](https://claude.ai/new#settings/customize-memory)**, you’re using the new memory experience and the sections above apply to you.

### Import memory into Claude

You can bring your memory over from other AI providers using Claude's built-in import flow.

**Step 1: Export your memory from your current AI service**

We recommend using the following prompt. It’s written specifically to help you get all of your context in one chat.

*I'm moving to another service and need to export my data. List every memory you have stored about me, as well as any context you've learned about me from past conversations. Output everything in a single code block so I can easily copy it. Format each entry as: [date saved, if available] - memory content. Make sure to cover all of the following — preserve my words verbatim where possible: Instructions I've given you about how to respond (tone, format, style, 'always do X', 'never do Y'). Personal details: name, location, job, family, interests. Projects, goals, and recurring topics. Tools, languages, and frameworks I use. Preferences and corrections I've made to your behavior. Any other stored context not covered above. Do not summarize, group, or omit any entries. After the code block, confirm whether that is the complete set or if any remain.*

You can customize this prompt to exclude any sensitive information before importing into Claude. If your current service supports generating files, you can also ask it to export your memory as a Markdown file so you can save a copy for your records.

**Step 2: Open the import flow in Claude**

There are two ways to start the import:

- Go to **[Settings > Capabilities](https://claude.ai/settings/capabilities)**, find the **Memory** section, and select “Start import.”

- From the home screen, click “Get started” on the "Import memory to Claude" card.

The import flow will display the prompt shown above, along with a text box where you can paste the results.

**Step 3: Paste your exported memory and import**

Paste the exported text from your previous AI provider into the text box and click the “Add to memory” button to submit it. Claude will extract key information and store it as individual memory edits. You can review these edits by clicking “Manage edits.”

Once the import is complete, you'll see your updated memory within 24 hours. Click the “See what Claude learned about you” button to start a new conversation using this prompt: "I updated my memory. What did you learn about me?"

Claude's memory is designed to focus on work-related topics to enhance its effectiveness as a collaborator. As a result, Claude may not retain imported personal details unrelated to work. If you want to add specific information into Claude's memory, go to **[Settings > Capabilities](https://claude.ai/settings/capabilities)**, click “View and edit your memory,” and add that information as an edit.

**Important:** Memory imports are **experimental and still in active development,** and at this stage,  Claude may not always successfully incorporate imported memories.

### Export memory from Claude

To view your memory exactly how Claude sees it, go to **[Settings > Capabilities](https://claude.ai/settings/capabilities)** and click “View and edit your memory.” Alternatively, you can access memory directly in a chat with Claude by asking it, "Write out your memories of me verbatim, exactly as they appear in your memory." You can save this exported memory as a backup or bring it to another AI service by copying and pasting it into a local file on your computer.