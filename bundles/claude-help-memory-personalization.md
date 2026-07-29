
---

SOURCE: https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features

# Understanding Claude's personalization features

Claude offers several ways to personalize your experience: profile instructions, project instructions, and styles. Each serves a different purpose in helping Claude better understand and meet your needs.

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

- Use styles when you want to customize how Claude formats and delivers its responses.

You can use these features independently or in combination to create the most effective experience for your needs.
---

SOURCE: https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context

# Use Claude’s chat search and memory to build on previous context

You can now prompt Claude to search through your previous conversations to find and reference relevant information in new chats. Additionally, Claude can remember context from previous chats, creating continuity across your conversations. This article introduces Claude’s chat search and memory capabilities and explains how they work, what Claude can and can’t remember, and how you can toggle the features on/off.

**Important:** We are gradually introducing an improved experience for memory from chats. The new experience will be the default for new users, and users on free, Pro and Max plans will be migrated to the new experience. Team and Enterprise plan admins will receive more information about a rollout in the coming weeks. In the interim, users on Team and Enterprise plans will stay on the legacy experience.

- If you see **[Settings > Memory](https://claude.ai/new#settings/customize-memory)**, you’re using the new memory experience, and the main sections that follow apply to you.

- If you see **Memory** in **[Settings > Capabilities](http://claude.ai/settings/capabilities)**, you’re using the legacy memory experience and can skip to **[Information for legacy memory users](#h_89fe1c2710)**.

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

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2533482439/4dee2d7b267f865205feefc8f4f3/cb60c334-d1e2-4828-a01d-dfb36bbaa7eb?expires=1785363300&amp;signature=389ac061d8a0b97a3b2ab267a77d2c097b72d290d32421649aa5e796ede91af1&amp;req=diUkFc12n4VcUPMW1HO4zY9IRA9vU9J0YNcz5nFaZkGMiUvur4JhmtKvkHAY%0AkNVMpiudmzoheh6HD2Y%3D%0A)

## Can I exclude a specific past chat from searches?

Incognito chats are available to all Claude users (free, Pro, Max, Team, and Enterprise plans). See **[Use incognito chats](https://support.claude.com/en/articles/12260368)** for more information.

When starting a new chat with Claude outside of a project, you'll see a ghost icon in the upper right corner of your screen.

Clicking the ghost icon will open an incognito chat, creating a temporary conversation that isn’t saved to your chat history. Claude won’t pull information from incognito chats when searching previous conversations.

**Important:** If you’re using an Enterprise or Team plan account, incognito chats are included in standard data exports and follow your organization's data retention policies. You can't search past chats if your organization uses customer-managed encryption keys on an Enterprise plan because conversation content is encrypted.

---

## What is Claude's memory?

The new memory experience is available for Claude users on free, Pro, and Max plans. Memory applies to chats on the web, Claude Desktop, and Claude Mobile, and is not currently available for Cowork.

Claude can now generate memory based on your chats. With the addition of memory, Claude transforms from a stateless chat interface into a knowledgeable collaborator that builds understanding over time.

## How does Claude’s memory work?

In addition to searching past chats, enabling Claude's memory feature adds several capabilities.

### How Claude stores memory

Claude builds memory as a set of individual entries that are organized into categories. Claude reads, writes and updates these entries in real time as you chat rather than on a fixed daily schedule.

We apply safeguards and conduct evaluations to memory to help keep users safe.

### Project memory and summary

Each project has its own separate memory space and dedicated project summary, so the context within each of your projects is focused, relevant, and separate from other projects or non-project chats.

## Enable Claude’s memory

**Note:** Members of Enterprise plans can only enable this feature individually when it’s enabled by an Owner for their organization. See **[Controls for Enterprise plan Owners](#h_f7d6b307e2)** for more information.

You can toggle Claude’s memory on by navigating to **[Settings > Memory](https://claude.ai/new#settings/customize-memory)** and turning on **Generate memory from chats**:

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2533482441/b5c806a8e3f68bf34c4a70724d38/d30be013-d099-4c93-99d1-23d404792f08?expires=1785363300&amp;signature=5500d43a18020f1905996d7b16fbc5d1ced68555a199dc299c2d56b51ed6a315&amp;req=diUkFc12n4VbWPMW1HO4zRlYrp5u5FMvNshWSMEMw9ce0WSXDIZA3Cir66Xw%0Ayp1o0SR4y4f7iuU7zh4%3D%0A)

If you want to disable Claude’s memory, click the toggle and you'll see two options:

- **Pause memory:** Claude keeps its existing memory but won’t use memory or make new memories. Conversations with Claude while memory is paused will not be summarized into its memory should you turn the feature back on.

- **Reset memory:** Permanently deletes all memories including project memories. Once you select this option and click "Reset memory," this cannot be undone. Upon re-enabling the feature, you’ll start from scratch and Claude will not have its previous memory.

## What Claude remembers

Claude focuses on work-related context that helps improve collaboration. You will see this information reflected in your memory or project summary:

- Your role, projects, and professional context

- Communication preferences and working style

- Technical preferences and coding style

- Project details and ongoing work
​

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

See exactly what Claude remembers about you by navigating to **[Settings > Memory](https://claude.ai/new#settings/customize-memory).** The Memory panel lists everything Claude remembers, grouped by category. Select any entry to see its summary and details.

To change an entry, use the "Tell Claude what to change or remove" box. To remove an entry entirely, select "Delete." You can also update your memory directly from your chats. Simply tell Claude what you'd like it to remember, and it will update Claude’s memory of you without needing to leave the conversation. Any edits made in this way will immediately apply to your next conversation.

### Past chat citations

When Claude references previous conversations, you'll see citations linking back to the original chats, along with the option to delete specific conversations.

### Toggle search past chats and memory on/off

You maintain control over Claude’s ability to search past chats and use memory–you can always disable these features and enable them again when needed in **[Settings > Memory](https://claude.ai/new#settings/customize-memory).**

### Importing your memory from other AI tools

You can now transfer your memory between Claude and other AI services. This feature lets you import memories from other AI assistants or export your Claude memory for backup or migration. This feature is experimental and still in active development, but for best practices, see this article: **[Importing and exporting your memory from Claude](https://support.claude.com/en/articles/12123587-importing-and-exporting-your-memory-from-claude)**.

---

## Information for legacy memory users

**Important:** We are gradually introducing an improved experience for memory from chats. The sections below only apply to people who have the legacy memory experience and see **Memory** in **[Settings > Capabilities](http://claude.ai/settings/capabilities)**. If you see **[Settings > Memory](https://claude.ai/new#settings/customize-memory)**, you’re using the new memory experience and the sections above apply to you.

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

Yes, navigate to **[Settings > Capabilities](http://claude.ai/settings/capabilities)** and find the **Preferences** section. Switch the toggle next to “Search and reference chats” off:

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1719730889/3fafbf5ecaa0ae31d7d84a66229b/c25536c1-7433-4b94-a5e9-cd5acf97a4fd?expires=1785363300&amp;signature=d1cf0d6c1e0009430f801b6a49fa6dec4a17034a0f2d1d1cde93ba85ce7d2c2b&amp;req=dScmH859nYlXUPMW1HO4zRzXH1ozJTLBJG68qZhl781A69%2FL3SiHSZ93%2FXVm%0AhgnMkGjuRzKiukWZlVs%3D%0A)

### Can I exclude a specific past chat from searches?

Incognito chats are available to all Claude users (free, Pro, Max, Team, and Enterprise plans). See **[Use incognito chats](https://support.claude.com/en/articles/12260368)** for more information.

When starting a new chat with Claude outside of a project, you'll see a ghost icon in the upper right corner of your screen:

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1719730893/9549b21954e0070ceb6b85231fd5/88e59234-6fc2-4229-84fe-733b33efff26?expires=1785363300&amp;signature=6647435e9462f3e9e89fb9df810175577cd4add223b9652659a0c22423202956&amp;req=dScmH859nYlWWvMW1HO4za54sKZvOoW4XDpzhlKsgjOWlJgvaDPhEZdUQz5f%0A3PGfA%2BYpSEHQF2oP%2Bbg%3D%0A)

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

**Note:** Members of Enterprise plans can only enable this feature individually when it’s enabled by an Owner for their organization. See **[Controls for Enterprise plan Owners](#h_f7d6b307e2)** for more information.

You can toggle Claude’s memory on by navigating to **[Settings > Capabilities](http://claude.ai/settings/capabilities)**:

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1719730892/62f9f2b68d675a8e33393f06024f/89198978-192f-4c52-915d-5294b16f3fe1?expires=1785363300&amp;signature=22891242c2316853eb413ad2d79c6e98c89b98989380bf04ee1ab134d4b59ffb&amp;req=dScmH859nYlWW%2FMW1HO4zTD5MMTlcedGBq9N9dRTKYddrjrYmadqbAJxpggK%0AfCGRbzcA4bB43jvbnWc%3D%0A)

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

See exactly what Claude remembers about you by navigating to **[Settings > Capabilities](http://claude.ai/settings/capabilities)** and clicking “View and edit memory.” The **Manage memory** modal displays everything Claude remembers about you. In addition to asking Claude to edit the existing summary, you can also tell Claude what you want it to remember. To add custom instructions to Claude’s memory, click the pencil icon in the lower left corner of the summary.

You can also update your memory summary directly from your chats. Simply tell Claude what you'd like it to remember, and it will update your memory summary without needing to leave the conversation. Any edits made in this way will immediately apply to your next conversation, so you don’t need to wait for the daily synthesis to run.

**Past chat citations**

When Claude references previous conversations, you'll see citations linking back to the original chats, along with the option to delete specific conversations.

**Toggle search past chats and memory on/off**

You maintain control over Claude’s ability to search past chats and use memory – you can always disable these features and enable them again when needed in **[Settings > Capabilities](http://claude.ai/settings/capabilities)**.

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

- If you see **Memory** in **[Settings > Capabilities](http://claude.ai/settings/capabilities)**, you’re using the legacy memory experience and can skip to **[Information for legacy memory users](#h_6e403e5d1a)**.

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

To view your memory exactly how Claude sees it, go to **[Settings > Capabilities](http://claude.ai/settings/capabilities)** and click “View and edit your memory.” Alternatively, you can access memory directly in a chat with Claude by asking it, "Write out your memories of me verbatim, exactly as they appear in your memory." You can save this exported memory as a backup or bring it to another AI service by copying and pasting it into a local file on your computer.

---

## Information for legacy memory users

**Important:** We are gradually introducing an improved experience for memory from chats. The sections below only apply to people who have the legacy memory experience and see **Memory** in **[Settings > Capabilities](http://claude.ai/settings/capabilities)**. If you see **[Settings > Memory](https://claude.ai/new#settings/customize-memory)**, you’re using the new memory experience and the sections above apply to you.

### Import memory into Claude

You can bring your memory over from other AI providers using Claude's built-in import flow.

**Step 1: Export your memory from your current AI service**

We recommend using the following prompt. It’s written specifically to help you get all of your context in one chat.

*I'm moving to another service and need to export my data. List every memory you have stored about me, as well as any context you've learned about me from past conversations. Output everything in a single code block so I can easily copy it. Format each entry as: [date saved, if available] - memory content. Make sure to cover all of the following — preserve my words verbatim where possible: Instructions I've given you about how to respond (tone, format, style, 'always do X', 'never do Y'). Personal details: name, location, job, family, interests. Projects, goals, and recurring topics. Tools, languages, and frameworks I use. Preferences and corrections I've made to your behavior. Any other stored context not covered above. Do not summarize, group, or omit any entries. After the code block, confirm whether that is the complete set or if any remain.*

You can customize this prompt to exclude any sensitive information before importing into Claude. If your current service supports generating files, you can also ask it to export your memory as a Markdown file so you can save a copy for your records.

**Step 2: Open the import flow in Claude**

There are two ways to start the import:

- Go to **[Settings > Capabilities](http://claude.ai/settings/capabilities)**, find the **Memory** section, and select “Start import.”

- From the home screen, click “Get started” on the "Import memory to Claude" card.

The import flow will display the prompt shown above, along with a text box where you can paste the results.

**Step 3: Paste your exported memory and import**

Paste the exported text from your previous AI provider into the text box and click the “Add to memory” button to submit it. Claude will extract key information and store it as individual memory edits. You can review these edits by clicking “Manage edits.”

Once the import is complete, you'll see your updated memory within 24 hours. Click the “See what Claude learned about you” button to start a new conversation using this prompt: "I updated my memory. What did you learn about me?"

Claude's memory is designed to focus on work-related topics to enhance its effectiveness as a collaborator. As a result, Claude may not retain imported personal details unrelated to work. If you want to add specific information into Claude's memory, go to **[Settings > Capabilities](http://claude.ai/settings/capabilities)**, click “View and edit your memory,” and add that information as an edit.

**Important:** Memory imports are **experimental and still in active development,** and at this stage,  Claude may not always successfully incorporate imported memories.

### Export memory from Claude

To view your memory exactly how Claude sees it, go to **[Settings > Capabilities](http://claude.ai/settings/capabilities)** and click “View and edit your memory.” Alternatively, you can access memory directly in a chat with Claude by asking it, "Write out your memories of me verbatim, exactly as they appear in your memory." You can save this exported memory as a backup or bring it to another AI service by copying and pasting it into a local file on your computer.