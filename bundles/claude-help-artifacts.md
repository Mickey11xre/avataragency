
---

SOURCE: https://support.claude.com/en/articles/14729249-use-live-artifacts-in-claude-cowork

# Use live artifacts in Claude Cowork

This article explains how to use live artifacts in **[Claude Cowork](https://claude.com/product/cowork)**. Live artifacts are persistent, interactive HTML dashboards that Claude builds for you. They refresh with current data from your connected apps and appear alongside your chat artifacts in the Artifacts view on Claude Desktop.

## Availability

Live artifacts are available on paid Claude plans (Pro, Max, Team, Enterprise) on:

- **Claude Desktop for macOS**

- **Claude Desktop for Windows**

- **Claude Desktop for Linux (beta)**

Using Cowork on Claude Desktop requires the latest version of the app. Download or update at **[claude.com/download](https://claude.com/download)**.

**Note:** Live artifacts are available on the desktop app only. They don't appear in the Artifacts view on web or mobile.

---

## What are live artifacts?

A live artifact is a persistent, interactive HTML page that Claude creates for you in Cowork, shaped around your specific work. It might be a tracker, a dashboard, a comparison tool, or a reference. Every live artifact you create is saved to the Artifacts view in your Cowork sidebar, marked with a "Cowork" label.

Live artifacts differ from **[artifacts in chat](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)** in a few ways:

- **They live on their own.** You don’t have to find the chat they came from. Every live artifact shows up in the “Live artifacts” tab in your Cowork sidebar.

- **They refresh with current data.** When you open a live artifact, it can pull from your connected apps and local files so the view reflects today, not the day it was built.

- **They keep their history.** Each update saves a version. You can review how the artifact has evolved and restore an earlier version.

Artifacts you create in chat and in Cowork appear together in the Artifacts view. Live artifacts show a "Cowork" label so you can tell them apart from chat artifacts, and because they're desktop-only, they appear in the Artifacts view on Claude Desktop only.

---

## Create a live artifact

There are two ways to create a live artifact in Cowork.

### From a Cowork task

Ask Claude to build what you need. A few examples:

- “Build me a dashboard that shows open tasks by project, pulling from Asana and Linear.”

- “Create a tracker that monitors my top five competitors: recent releases, blog posts, pricing changes.”

- “Put together a morning brief with my Slack mentions, today’s calendar, and open pull requests.”

When you describe the artifact, mention the connected apps or local files Claude should use. The result saves automatically to the Artifacts view.

### From the Artifacts view

1. Open Cowork on Claude Desktop and select "Artifacts" from the sidebar.

2. Click “New artifact” in the top right.

3. Select "Create Cowork artifact."

A new session opens with a starting prompt, and Claude asks a few questions about your connectors and what you want to build.

**Note:** In the Artifacts view, live artifacts are labeled "Cowork."

---

## Open and refresh an artifact

To reopen an artifact, select "Artifacts" from the Cowork sidebar and click the one you want. Use the "Filter by" dropdown at the top right to narrow the view.

When you open a live artifact, it pulls fresh data from your connected apps. Most of the time you won’t need to refresh manually, as a short cache holds recent data so the artifact loads quickly, and it re-queries your connected apps on its own. If you want to force new data, use the refresh button in the artifact’s header.

---

## Version history

Each time you iterate on a live artifact with Claude, the previous version is saved. Open the artifact’s version history to:

- See how the artifact has changed over time.

- Compare an earlier version with the current one.

- Restore an earlier version if an update didn’t work out.

---

## Share a live artifact

Sharing live artifacts is available on Team and Enterprise plans. On Pro and Max plans, live artifacts can't be shared or published.

You can share a live artifact with other people in your Claude organization:

1. Open the artifact you want to share.

2. In the artifact's header, click the "Share" button

3. Click "Share & copy link" and copy the link.

4. Send the link to people in your organization. The artifact opens in the Claude Desktop app.

If someone shares a live artifact with you, open the link on a computer with Claude Desktop installed. You can also click "Import from link" at the top of the Artifacts view and paste the link.

How sharing works:

- **Sharing stays within your organization.** There are no external or public links and no per-person recipient selection. Anyone in your organization who has the link can open the artifact.

- **Shared artifacts use the viewer's access, not yours.** When someone opens your artifact, it connects to their connectors and data sources. If they don't have access to an underlying data source, that part of the artifact shows an error instead of your data.

---

## Example use cases

- **Persistent team dashboard:** A weekly metrics view that pulls from your connected analytics tools and spreadsheets. Built once, refreshed every time you open it.

- **Working project tracker:** A tracker pulling from Linear, Slack, and your calendar. Close the session, open it next week, and it's refreshed with current data.

- **Competitive intelligence:** A dashboard that tracks what your top competitors are shipping. Built in one session, updated from any future thread.

- **Morning brief:** A single page with your Slack mentions, today’s calendar, and open pull requests. Open it each morning to see the current state.

---

## Current limitations

- **Local, not remote.** Live artifacts live on your computer. If you switch devices, they don’t come with you.

- **Live artifacts use your connectors without asking.** Live artifacts can only use the connectors you approved during creation or update. However, artifacts don't ask for permission before using connectors, even if your session mode would normally require approval. Use care when creating live artifacts that use connectors that can make changes to your data.
---

SOURCE: https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them

# What are artifacts and how do I use them?

Accessing artifacts in the sidebar and Claude-powered artifacts are supported on Free, Pro, Max, Team, and Enterprise plans. Artifacts are available in Claude Code on Team and Enterprise plans.

Artifacts allow you to turn ideas into shareable apps, tools, or content—build tools, visualizations, and experiences by simply describing what you need. Claude can share substantial, standalone content with you in a dedicated window separate from the main conversation. This makes it easy to work with significant pieces of content that you may want to modify, build upon, or reference later.

**Important:** We no longer support artifacts without **Code execution and file creation** enabled in **[Settings > Capabilities](https://claude.ai/settings/capabilities)** (Free, Pro, Max) or **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)** (Team, Enterprise).

Artifacts are available in Claude, Claude Desktop, and Claude Code. This article focuses on Claude and Claude Desktop. To learn how to create, update, and share artifacts in Claude Code, see the **[artifacts documentation on Claude Code Docs](https://code.claude.com/docs/en/artifacts)**.

---

## What are artifacts?

Claude creates an artifact when the content it's sharing meets these criteria:

- It is significant and self-contained, typically over 15 lines.

- It is something you're likely to want to edit, iterate on, or reuse outside the conversation.

- It represents a complex piece of content that stands on its own without requiring extra conversation context.

- It is content you're likely to want to refer back to or use later.

Common examples of artifact content include:

- Documents (Markdown or plain text)

- Code snippets

- Single-page HTML websites

- SVG images

- Diagrams and flowcharts

- Interactive React components

---

## Enable artifacts

To enable artifacts individually on a Free, Pro, or Max plan:

1. Click your initials or name in the lower left corner.

2. Navigate to **[Settings > Capabilities](https://claude.ai/settings/capabilities)**.

3. Toggle **Code execution and file creation** on.

To enable artifacts organization-wide on a Team or Enterprise plan:

1. Log in as an Owner.

2. Click your initials or name in the lower left corner.

3. Navigate to **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)**.

4. Toggle **Code execution and file creation** on.

---

## Access your artifacts

You can access all your artifacts through the dedicated **[Artifacts](https://claude.ai/artifacts)** section in your Claude sidebar. This space allows you to:

- View all your creations in one organized location

- Create new artifacts from scratch

- Manage and organize your artifact collection

**Note:** Artifacts you create in a conversation don't appear in your sidebar automatically. To add an artifact to your **Artifacts** section, open it and click "Publish." Learn more about **[publishing and sharing artifacts](https://support.claude.com/en/articles/9547008)**.

---

## Work with artifacts

When Claude creates an artifact, you'll see the content displayed in a dedicated window to the right of the main chat.

### Edit and iterate

- Ask Claude to modify or update the artifact content.

- For Markdown documents, you can edit in place: highlight the text you want changed, click "Edit with Claude," and type your request. Claude makes the edit right where you marked it, so you don't have to describe which section you mean in the chat.

- Changes appear directly in the artifact window.

- Switch between different versions using the version selector.

- Your edits won't change Claude's memory of the original content.

- Edit prior chat messages to create a different version of the conversation, with its own set of artifacts—this lets you explore different directions without losing previous work.

**Note:** When Claude drafts content across multiple Markdown files, such as a skill or plugin, you can leave edit requests in several files before submitting. Each request is added to your next message, and the file list shows how many requests are waiting in each file. Send the message and Claude applies the whole batch in one pass.

### View and export

In the lower right corner of the artifact window, you can:

- View the underlying code of any artifact

- Copy content to your clipboard, including the code behind an artifact

- Download files to use outside the conversation

Copying the code is also how you build on an artifact someone else published. Learn more about **[building on a published artifact](https://support.claude.com/en/articles/9547008-publish-and-share-artifacts#h_eb779b5c95)**.

### Multiple artifacts

- Open and work with several artifacts in one conversation

- Use the chat controls (slider icon in upper right) to switch between them

- Select which artifact you want Claude to reference for updates

### Fixing errors

If an artifact generates an error, look for the “Try fixing with Claude” button near the error message. Click the button to automatically copy the error details into a new message, then send it to Claude to diagnose the issue and suggest a fix.

**Note:** While Claude will attempt to fix the error, success isn't guaranteed. Some errors may require additional troubleshooting.

---

## AI-powered artifacts

You can build artifacts that embed AI capabilities, turning them into AI-powered apps. Users of your artifacts can access Claude's intelligence through a text-based API—answering questions, generating creative content, providing personalized coaching, playing games, solving problems, and adapting responses based on input.

### Create AI-powered artifacts

1. Describe what you want to Claude.

2. Claude writes the code.

3. The app runs on Anthropic's infrastructure.

4. Users authenticate with their Claude account and interact with their own instance of the artifact.

### How usage works

When you share AI-powered artifacts, others can use them immediately—no API keys required, and no costs to you. Whether your artifact helps 10 people or 10,000, sharing is free. Usage counts against each user's own Claude subscription limits, not yours.

For Team and Enterprise plans, when you share AI-powered artifacts within your organization, team members can use them without incurring additional costs to the creator.

---

## MCP integration

MCP integration for artifacts is available on Pro, Max, Team, and Enterprise plans on Claude web and desktop.

Artifacts can connect to external services through the Model Context Protocol (MCP), enabling interactive applications that read from and write to tools like Asana, Google Calendar, and Slack. In addition to Anthropic's official MCP integrations, artifacts can connect to any **[custom MCP servers](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)** you've configured.

When an artifact needs to access an MCP tool, you'll be prompted to approve access on first interaction. Your preferences persist for subsequent uses of that artifact.

**Important:** Each user must authenticate MCP servers independently, even when using shared or published artifacts. Organization admins can enable or disable artifact MCP access at the organization level but cannot manage which specific MCP servers artifacts can use.

---

## Persistent storage

Persistent storage for artifacts is available on Pro, Max, Team, and Enterprise plans on Claude web and desktop.

Artifacts can store data across sessions, enabling stateful applications like journals, trackers, and collaborative tools. Storage can be configured as either personal or shared:

- **Personal storage:** Each user maintains their own private data. For example, in a journal artifact, your entries remain visible only to you.

- **Shared storage:** All users see and interact with the same data. For example, in a game leaderboard, everyone sees the same scores and rankings.

When you interact with an artifact that uses shared storage for the first time, you'll see a confirmation dialog explaining that your data will be visible to other users of that artifact.

**Note:** Persistent storage is only available for published artifacts. During development and testing, storage operations will not succeed until the artifact is published.

**Storage specifications:**

- 20 MB storage limit per artifact

- Text-only input—no images, files, or binary data

- Personal and shared storage are isolated

- Unpublishing an artifact permanently deletes all associated storage data

**Privacy consideration:** Artifact creators determine which data uses personal versus shared storage when building the artifact. Before entering sensitive information, consider whether the artifact uses shared storage.

---

## Artifacts in Claude Code

Artifacts are available in Claude Code on Team and Enterprise plans.

Claude Code can publish its session output as an artifact—a live, interactive page at a private URL. The page updates in place as your session continues, and you can share it with people in your organization. An artifact might be a pull-request walkthrough with annotated diffs, a dashboard built from session data, or an investigation timeline that fills in as Claude works.

By default, artifacts in Claude Code are only visible to the individual who created them. They can choose to share artifacts with the rest of their organization, and they can’t be shared publicly.

To learn how to create, update, and share artifacts in Claude Code, see the **[artifacts documentation on Claude Code Docs](https://code.claude.com/docs/en/artifacts)**.

---

## Learn more

To share your artifacts publicly, embed them on websites, or discover artifacts created by others, see **[Publish and share artifacts](https://support.claude.com/en/articles/9547008)**.
---

SOURCE: https://support.claude.com/en/articles/9547008-publish-and-share-artifacts

# Publish and share artifacts

Artifacts are a powerful way to create content within Claude. You can take your creations further by sharing them so others can view and interact with them. If you see a published artifact you like, you can copy the code into a chat of your own and build on it from there. This article covers how to publish artifacts publicly and share them within your organization.

**Important:** We no longer support artifacts without **Code execution and file creation** enabled in **[Settings > Capabilities](https://claude.ai/settings/capabilities)** (Free, Pro, Max) or **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)** (Team, Enterprise).

---

## Publishing vs. sharing

Claude uses different terms depending on your plan:

- **Publishing** (Free, Pro, Max): Makes your artifact publicly available. Anyone with the link can view and interact with it.

- **Sharing** (Team, Enterprise): Makes your artifact available within your organization only. Viewers must be logged into your Team or Enterprise account to access it.

**Note:** Live artifacts created in Claude Cowork follow different rules. They can be shared on Team and Enterprise plans only, within your organization, and can't be published publicly on any plan. Learn more about **[using live artifacts in Claude Cowork](https://support.claude.com/en/articles/14729249-use-live-artifacts-in-claude-cowork)**.

---

## Publish artifacts

Publishing is available on Free, Pro, and Max plans.

**To publish an artifact:**

1. Navigate to the artifact you want to publish.

2. Ensure you're on the correct artifact version.

3. Click the “Publish” button.

4. Copy the public link to share with others.

Publishing also adds the artifact to the **[Artifacts](https://claude.ai/artifacts)** section in your sidebar so you can find it again outside the original conversation.

### Who can access published artifacts

**Non-users:**

- View and interact with any published artifact without signing up.

- Try all basic functionality without a Claude account.

- Prompted to sign up only for advanced features like using AI-powered capabilities.

**Claude users (Free, Pro, Max):**

- Full access to view, interact with, and copy any published artifact.

- Can use AI-powered features within their usage limits.

- Can save and organize artifacts they discover.

### Embed artifacts

After publishing, you'll see a “Get embed code” button.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1951684960/0cd917c4455b31e86b70a97f8234/image.png?expires=1785257100&amp;signature=078ba340d1a7fbd020423a867a8baa647961001cc8cebf4a92c0cecd9731eda1&amp;req=dSkiF892mYhZWfMW1HO4zdcpD1NQ4ASAR8xgMH3ra8hbCH7liFoJAEXut7Ha%0ApChkDEHc%2FyIDDZQAx9Y%3D%0A)

Click it to open a modal with automatically generated code you can copy and paste to embed your artifact on another website.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1951685860/6bf1aa2c57d6ff95804797779e9c/image.png?expires=1785257100&amp;signature=66cfca42a4fb4a6d45bafd5820b4c30f45d14774f8370e6033afa4d51cfff5dc&amp;req=dSkiF892mIlZWfMW1HO4zcqH79yBzINsf3CUbx4Ru6Ux37jmQ5NuYqGkKKjp%0A3GtpDOb5DvJedRUcQtA%3D%0A)

You must specify which websites can embed your artifact by entering URLs in the **Allowed domains** field, separated by commas.

### Unpublish artifacts

After publishing an artifact, an “Unpublish” button appears, giving you the option to revoke access.

**Important:** Once you unpublish an artifact, you cannot publish that same artifact again. You'll need to create a new artifact if you want to publish it later. Unpublishing also permanently deletes all associated storage data (both personal and shared) if the artifact used persistent storage.

---

## Build on a published artifact

Building on a published artifact is available on Free, Pro, and Max plans.

If someone publishes an artifact you like, you can use it as a starting point for your own version. Copy the code into a new chat and ask Claude to make the changes you want. Your version is separate from the original, so nothing you do affects the artifact you started from.

**Note:** The "Remix" button is no longer available. Copying the code into a new chat replaces it.

**Important:** Only do this with artifacts from people you trust. You're bringing someone else's code and content into your own conversation, so treat it the way you'd treat a file from an unknown sender. If you aren't sure about the source, don't use it.

**To build on a published artifact**

1. Open the published artifact and click “Copy” to copy the code to your clipboard.

2. Start a new chat, paste the code, and describe the changes you want. For example: "Here's the code for a quiz game. Can you change the questions to be about movies and add a timer?"

3. Claude creates a new artifact with your changes. Refine it from there the same way you would any artifact you made yourself.

**What happens when you build on an artifact**

- The code you paste becomes the starting point for a new artifact in your own chat.

- You can modify it, expand on it, or use it as inspiration.

- Your changes don't affect the original. You're working on your own copy.

---

## Share artifacts within your organization

Internal sharing is available on Team and Enterprise plans.

Artifacts created on Team or Enterprise accounts can only be shared within your organization—they cannot be published publicly.

**To share an artifact:**

1. Navigate to the artifact you want to share.

2. Ensure you're on the correct artifact version.

3. Click the “Share” button.

4. Click “Share & copy link” to make this version shareable.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1951680160/d5a38784df4c6d0cc55eda339279/Screenshot%2B2025-10-28%2Bat%2B2_00_15-E2-80-AFPM.png?expires=1785257100&amp;signature=9c06984572e19758b0dcbe1526a12e9e97b21a0aa118a156b6f7201ac9fd6988&amp;req=dSkiF892nYBZWfMW1HO4zbvYOlTnKH6SK6hAzMpXfmMfxYywkm9Oss%2B7Kl3G%0APhunhvr%2BVodit4fJ2QI%3D%0A)

### Who can access shared artifacts

- Only members of your Team or Enterprise organization.

- Viewers must authenticate with their Team or Enterprise account.

- If the artifact was created from a project, viewers must also have access to that project.

### Share artifacts with attachments

When you share an artifact, viewers also gain access to any attachments and files in the conversation that created it. Consider this before sharing artifacts from conversations containing sensitive documents.

### Unshare artifacts

**To unshare an artifact:**

1. Click the “Share” button in the upper right corner of the artifact.

2. In the **Artifact shared** modal, click “Unshare.”

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1951676927/c66153a2c075c6a64404306aefd0/Screenshot%2B2025-10-28%2Bat%2B1_58_24-E2-80-AFPM.png?expires=1785257100&amp;signature=c5ef14d09f7157e9cc0cc4af192890f37f05c733d5bfa65ca8de446a06f65ec8&amp;req=dSkiF895m4hdXvMW1HO4zW9Ewgy%2F%2FHOygj8mTHivCKbWxmZ36kBc%2FPL2XsPI%0A4VPMTxQ7aXppaZwFX3E%3D%0A)

---

## Learn more

For information about creating artifacts, AI-powered capabilities, MCP integration, and persistent storage, see **[What are artifacts and how do I use them?](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)**