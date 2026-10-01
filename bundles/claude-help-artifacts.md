
---

SOURCE: https://support.claude.com/en/articles/14729249-use-live-artifacts-in-claude-cowork

# Use live artifacts in Claude Cowork

**Note:** Claude Cowork is now just Claude. Ask for what you need, and Claude decides whether that's a quick answer or a task. This is rolling out gradually to Pro and Max plans, with more plans to follow. If you're on a Pro or Max plan and your message box no longer shows "Chat" and "Cowork" options, you have the new experience, and some steps in this article may look different. Learn more in **[Claude Cowork and chat are one Claude](https://support.claude.com/en/articles/16761823)**, or read our **[blog post](https://claude.com/blog/cowork-is-now-claude)**.

Live artifacts are artifacts made in Claude Cowork before August 19, 2026. They stay in your **Artifacts** view and keep working, and you can still open and share them, but you can't edit them in place. This article explains what you can do with a live artifact and how to republish one so you can keep editing it.

Artifacts made in Cowork on or after August 19, 2026 work like any other artifact. Learn more about **[creating and working with artifacts](https://support.claude.com/en/articles/9487310)** and **[sharing artifacts](https://support.claude.com/en/articles/9547008)**.

If your organization uses customer-managed encryption keys (CMEK), zero data retention (ZDR), or a HIPAA-ready configuration, you'll keep using live artifacts.

---

## Find your live artifacts

Select "Artifacts" from the sidebar. Live artifacts are marked with a "Cowork" label. Use the "Filter by" dropdown at the top right to narrow the view.

## Update a live artifact

To make changes, republish the live artifact as a new artifact:

1. Open the live artifact and click "Share."

2. Choose to republish it as a new artifact.

3. If you already shared the live artifact, the dialog shows its existing link. People with that link see the new version.

People who have the link see the new version without needing a new link. From there, you can edit it like any other artifact.

## Share a live artifact

Sharing a live artifact works the way it always has:

- **Sharing stays within your organization.** There are no external or public links and no per-person recipient selection. Anyone in your organization who has the link can open the artifact.

- **Shared artifacts use the viewer's access, not yours.** When someone opens your artifact, it connects to their connectors and data sources. If they don't have access to an underlying data source, that part of the artifact shows an error instead of your data.

**Important:** Only open shared artifacts from people you trust. Treat someone else's artifact the way you'd treat a file from an unknown sender.
---

SOURCE: https://support.claude.com/en/articles/16994751-artifacts-admin-guide-for-team-and-enterprise-plans

# Artifacts admin guide for Team and Enterprise plans

This guide is for Owners and Primary Owners of Team and Enterprise plans, and explains how to turn on artifacts for your organization, choose which templates users can start from, control who has access, and manage whether or not artifacts can be shared outside your organization.

## Turn on artifacts for your organization

To change organization settings, you need to be an Owner or Primary Owner, or in a custom role (Enterprise plans) with the appropriate admin permissions.

1. Turn on “Cloud code execution and file creation” in Organization settings > Capabilities first.

2. Navigate to **[Organization settings > Artifacts](https://claude.ai/admin-settings/artifacts)**.

3. Turn on **Artifacts**.

This lets users create and publish artifacts to a shareable Anthropic-hosted page, and share artifacts within your organization.

**Important:** Turning **Artifacts** off stops users from sharing artifacts with your organization. Links they already shared keep working.

## Choose which templates users can start from

Templates are the starting points users pick when they create an artifact.

| **Template**   | **What users can do with it**                                                                |
| -------------- | -------------------------------------------------------------------------------------------- |
| Slides         | Start decks they can present, restyle with a design system, and export to PowerPoint         |
| Design         | Lay out screens, flows, and graphics as artboards they can edit by hand                      |
| Design systems | Capture colors, fonts, and components once so Claude applies them to new decks and designs   |
| Docs           | Start docs their team reads, comments on, and edits in place while Claude keeps them current |

**To enable a template:**

1. Navigate to **[Organization settings > Artifacts](https://claude.ai/admin-settings/artifacts)**.

2. Under **Templates**, turn on the templates you want to make available.

**Note:** Turning a template off doesn't impact artifacts users already made using that template.

### Standalone Claude Design at claude.ai/design

Standalone Claude Design is a separate product from the **Design** template, and it has its own setting in **[Organization settings > Claude Design](https://claude.ai/admin-settings/claude-design)**. Turning one on doesn't turn on the other. Users' existing projects stay at **claude.ai/design** and also appear in the **Artifacts** tab.

---

## Manage sharing outside your organization

Two separate settings control what users can share outside your organization. Turning on one doesn't turn on the other. For what users see and which artifacts can't leave your organization, see **[Share artifacts](https://support.claude.com/en/articles/9547008-publish-and-share-artifacts)**.

### External sharing

**External sharing** lets users share artifacts with anyone who has the link.

1. Navigate to **[Organization settings > Artifacts](https://claude.ai/admin-settings/artifacts)**.

2. Turn on **External sharing**.

**Important:** Turning **External sharing** off also stops existing public links from working until you turn it back on, except for artifacts you allow individually.

### Allow external sharing for a single artifact

While **External sharing** is off, you can still let a specific artifact be shared with anyone who has the link.

1. Navigate to **[Organization settings > Artifacts](https://claude.ai/admin-settings/artifacts)**.

2. Under **Published artifacts**, find the artifact. It must already be shared with your organization or invited people to appear here.

3. Open the artifact's menu and select "Allow external sharing."

4. Confirm by selecting "Allow external sharing."

The artifact's owner can then share it with anyone who has the link. **External sharing** stays off for every other artifact in your organization.

### Email invitations outside your organization

**Email invitations outside your organization** lets users invite specific people outside your organization to an artifact by email. It's a separate setting from **External sharing**, so turning on one doesn't turn on the other.

1. Navigate to **[Organization settings > Artifacts](https://claude.ai/admin-settings/artifacts)**.

2. Turn on **Email invitations outside your organization**.

**Important:** Turning **Email invitations outside your organization** off blocks access for people users already invited, until you turn it back on. Accepted invitations aren't deleted, and pending ones still expire 30 days after they were sent.

### See and remove outside access

1. Navigate to **[Organization settings > Artifacts](https://claude.ai/admin-settings/artifacts)**.

2. Under **Published artifacts**, find an artifact marked **Shared outside**.

3. Open the artifact's menu and select "Manage outside access."

4. Select the remove button next to the person, then confirm with "Remove access" or "Remove invitation."

Owners can remove people here but can't change their access level.

### What stays inside your organization

Some artifacts can't leave your organization even with these settings on:

- Docs can't be shared outside your organization yet.

- Artifacts that use connected apps, or that ask Claude questions, can't use “Anyone with the link.”

People need a Claude account to open any artifact except a legacy artifact published from chat.

Learn more about **[sharing artifacts](https://support.claude.com/en/articles/9547008)**.

---

## Let users see who else has an artifact open

**Artifact presence** lets users see who else in your organization has an artifact open, along with live activity in it. Turn it on or off in **[Organization settings > Artifacts](https://claude.ai/admin-settings/artifacts)**.

It's on by default on Team and Enterprise plans, and it only applies while **Artifacts** is on for your organization.

**Note:** Turning **Artifact presence** off applies to new page loads right away, and to tabs that are already open within an hour.

---

## Let artifacts use connected apps

**Enable artifact connectors** lets users work with artifacts that read from and write to their connected apps. Each user connects their own apps, even in a shared artifact. You can turn this on or off for your whole organization, but you can't limit which apps artifacts can reach.

1. Navigate to **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)**.

2. Under **Visuals**, turn on **Enable artifact connectors**.

---

## Limit access to specific groups on Enterprise plans

On Enterprise plans, custom roles let you turn a feature on for specific groups instead of your whole organization. The organization setting is the main switch, and custom roles are the per-user switches underneath it. If a feature is off at the organization level, no custom role can grant access to it.

The capabilities that cover artifacts are:

| **Capability**             | **What it grants**                                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Artifacts                  | Creating and publishing artifacts from Claude Code and Cowork, and sharing chat and Cowork artifacts within the organization |
| Design                     | Starting artifacts from the Design template                                                                                  |
| Design systems             | Creating and editing design systems                                                                                          |
| Docs                       | Starting artifacts from the Docs template                                                                                    |
| Slides                     | Starting artifacts from the Slides template                                                                                  |
| Claude Design [standalone] | Access to standalone Claude Design at claude.ai/design                                                                       |

Users outside those groups can still open, comment on, and use artifacts shared with them.

Learn more about **[managing custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452)** and **[setting up role-based permissions on Enterprise plans](https://support.claude.com/en/articles/13930458)**.

---

## Manage your organization's design systems

Design systems shared with everyone in your organization are listed in **[Organization settings > Artifacts](https://claude.ai/admin-settings/artifacts)**, under **Design systems**, with their owner and when they were last updated. Users see these when they start a new artifact, and the default is preselected.

### Restrict who can manage design systems

By default, any user with access to design systems can publish one, set the organization default, and delete design systems. On Enterprise plans using custom roles, the **Claude Design Admin** permission reserves these actions for specific users, so your organization keeps one authoritative set of design systems.

Users in custom roles with the permission set to “Can manage” can:

- **Publish a design system:** make it available across your organization so anyone can attach it to a project.

- **Set the organization default:** choose the design system new artifacts use automatically.

- **Delete a design system:** permanently remove it from your organization.

Everyone else can still create, edit, and use any published design system. If a user without the permission tries to publish, set the default, or delete, they'll see a note directing them to contact their administrator.

**Note:** If you don't assign this permission to anyone, nothing changes. All users keep the same access to design systems as before.

**To grant the permission:**

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)** and create or edit a custom role.

2. In the “Admin permissions” tab, find **Claude Design Admin** under **Product admin** and set it to “Can manage.”

3. Assign the role to a group. Users in that group inherit the permission.

4. Set each user's role to “Custom.”

Learn more about **[setting up your design system](https://support.claude.com/en/articles/14604397)**.

---

## Usage and billing

Artifacts, including designs, decks, and docs, count toward each user's existing usage limits, shared with the rest of Claude, including Claude Code. There's no separate allowance to provision.

- **Team and seat-based Enterprise plans:** Usage draws from each user's seat usage limits, including session and weekly limits. Admins can purchase **[usage credits](https://support.claude.com/en/articles/12005970)** for users who need more.

- **Usage-based Enterprise plans:** Usage bills from your organization's consumption at standard API rates. Organization, group, and per-user spend limits apply.

## Monitor usage

- **Compliance API:** Artifacts made in conversations and the **Artifacts** tab are recorded at the artifact level. For docs, events for the doc itself are recorded, but activity inside a doc, like edits and comments, isn't recorded yet.

- **Analytics:** Navigate to **[Analytics > Claude Design](https://claude.ai/analytics/claude-design)** for daily, weekly, and monthly active users. These analytics cover claude.ai/design only, and don't include designs made in conversations or the **Artifacts** tab.

- **Audit logs:** Standalone Claude Design doesn't support audit logs.

Learn more about **[viewing usage analytics for Team and Enterprise plans](https://support.claude.com/en/articles/12883420)**.

---

## Data handling and privacy

When users create designs and docs, they may upload design assets, brand guidelines, screenshots, and other materials.

- Uploaded assets are stored persistently, and fall under the same **[data retention and deletion policies](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)** as other Anthropic products for organizations.

- Claude Design doesn't currently support data residency requirements.

### When someone leaves your organization

Removing someone from your organization, including through your identity provider, removes their access to artifacts at the same time.

### Organizations with special configurations

- **CMEK, ZDR, or a HIPAA-ready configuration:** The new artifacts experience, including templates, design systems, and email invitations, isn't available yet. These organizations keep using live artifacts in Cowork.

- **Education and K-12 organizations:** Email invitations aren't available.

---

## Third-party platform availability

Artifacts are available in Claude on web and desktop, in Claude Code, and at claude.ai/design for standalone Claude Design. In Claude for iOS and Claude for Android, users can ask for an artifact and view the result. Artifacts aren't available through third-party cloud platforms.

---

## Frequently asked questions

### Do I need to turn a feature on for the whole organization if only some users need it?

Yes. The organization setting must be on before custom roles can control per-user access. If a feature is off at the organization level, no one can use it regardless of their role.

### Can I restrict templates to specific departments?

Yes, on Enterprise plans, with custom roles. Each template has its own capability, and standalone Claude Design has a separate capability from the **Design** template.

### What's the difference between external sharing and email invitations?

**External sharing** lets users publish an artifact that anyone outside your organization can open with a link. **Email invitations outside your organization** lets users invite named people outside your organization to a specific artifact. Each has its own setting.

### Who can publish, set the default, or delete design systems?

If you haven't assigned the **Claude Design Admin** permission to anyone, any user with access to design systems can take these actions. On Enterprise plans, you can reserve them for specific users.

### Can users export what they make?

Yes. For more information, refer to **[View and export](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them#h_71205f2c4b)** in **[What are artifacts and how do I use them?](https://support.claude.com/en/articles/9487310)**
---

SOURCE: https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them

# What are artifacts and how do I use them?

An **[artifact](https://claude.com/features/artifacts)** is anything Claude makes for you that you'd put in front of someone: a design, a deck, a document, a dashboard, or a small interactive tool. It opens beside your conversation, and you can edit it, come back to it, and share it with others. Ask for one in any conversation with Claude, including in Claude Code, or start from a template in the “Artifacts” tab.

Artifacts are available on Free, Pro, Max, Team, and Enterprise plans, and in Claude Code on every plan that includes Claude Code. Templates (Claude Design, Claude Slides, and Claude Docs) are in beta on paid plans only. They're on by default on Pro, Max, and Team plans. On Enterprise plans, they're off until an owner turns each one on.

| **Feature**                                  | **Free** | **Pro** | **Max** | **Team** | **Enterprise** |
| -------------------------------------------- | -------- | ------- | ------- | -------- | -------------- |
| Create artifacts in a chat                   | ✅        | ✅       | ✅       | ✅        | ✅              |
| Start from a template (Design, Slides, Docs) |          | ✅       | ✅       | ✅        | ✅              |
| Connect your apps to an artifact             |          | ✅       | ✅       | ✅        | ✅              |
| Store data in an artifact                    |          | ✅       | ✅       | ✅        | ✅              |

**Important:** Artifacts require **Cloud code execution and file creation** to be turned on in **[Settings > Capabilities](https://claude.ai/settings/capabilities)** (Free, Pro, Max) or **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)** (Team, Enterprise).

---

## What is an artifact?

**Note:** Legacy artifacts are artifacts made in a chat before September 16, 2026. They keep working, and you can still publish and share them, but you can't make new ones.

Claude creates an artifact when the content it's sharing meets these criteria:

- It's significant and self-contained, typically over 15 lines.

- It's something you're likely to want to edit, iterate on, or reuse outside the conversation.

- It stands on its own without needing extra context from the conversation.

- It's content you're likely to refer back to or use later.

Claude can make an artifact out of almost anything, including documents, code snippets, single-page websites, images, diagrams and flowcharts, dashboards, and small interactive tools.

## Where you can use artifacts

- **Claude on the web and Claude Desktop:** Create, edit, and share artifacts, and start from a template.

- **Claude Code:** Publish session output as an artifact, or make designs and docs. See **[Artifacts in Claude Code](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them#h_dca5623bec)** below.

- **Claude for iOS and Claude for Android:** Ask for a design, deck, or doc in any chat, and view the result in the **Artifacts** tab. To start from a template, edit, or change sharing settings, use Claude on the web or Claude Desktop.

## Start from a template

Templates are starting points for work you'll share with others. Ask for one in any chat, select "Output" in the message box and choose a template, or pick one in the **Artifacts** tab.

- **Docs:** Living documents you write with Claude and your team in real time. Learn more in **[Get started with Claude Docs](https://support.claude.com/en/articles/16923645)**.

- **Slides:** Presentations built from your notes, reports, or the work already in your chat. Edit any slide directly, present without leaving Claude, and export to PowerPoint or PDF.

- **Design:** Visuals, mockups, prototypes, one-pagers, and landing pages, built with your design system. Learn more in **[Get started with Claude Design](https://support.claude.com/en/articles/14604416)**.

Whichever template you start from, the artifact works the same way: edit it by talking to Claude or directly in the artifact, and it updates live as you work. When it's ready, share it or export it.

Designs and decks can use a design system, so new work picks up your colors, fonts, and components. Learn more about **[setting up your design system](https://support.claude.com/en/articles/14604397)**.

## Find your artifacts

Everything you make is saved to the **[Artifacts](https://claude.ai/artifacts)** tab in your Claude sidebar, so you can find it again from any conversation. From there you can view all your artifacts in one place, start a new one from a template, and organize what you've made.

## Work with artifacts

An artifact opens in its own window beside your conversation. Artifacts made from a template open on a canvas or page you can work in directly.

## Edit and iterate

- Ask Claude to change the artifact.

- In an artifact made from a template, edit directly: type in a doc, edit a slide, or move elements on a design canvas.

- In a doc or Markdown document, highlight the text you want changed, click "Edit with Claude," and type your request. Claude makes the edit where you marked it, so you don't have to describe which section you mean.

- Edit an earlier message to create a different version of the chat, with its own artifacts, so you can explore another direction without losing previous work.

**Note:** When Claude drafts content across multiple Markdown files, such as a skill or plugin, you can leave edit requests in several files before submitting. Each request is added to your next message, and the file list shows how many are waiting in each file. Send the message and Claude applies the whole batch in one pass.

## View and export

- **Artifacts made from a template:** Click "Export." Docs export to Word, PDF, Markdown, and Google Docs. Decks export to PowerPoint and PDF. Designs export as a .zip, PDF, PowerPoint, or standalone HTML, or go straight to another tool.

- **Legacy artifacts:** Use the controls at the top of the artifact panel to view the code, copy the content, or download it.

## Build on a published artifact

Available on Free, Pro, and Max plans, for legacy artifacts published from a chat.

If someone publishes an artifact you like, you can use it as a starting point for your own version. Your version is separate, so nothing you do affects the original.

**Important:** Only do this with artifacts from people you trust. You're bringing someone else's code and content into your own chat, so treat it the way you'd treat a file from an unknown sender.

1. Open the published artifact and click "Copy" to copy its code.

2. Start a new chat, paste the code, and describe the changes you want. For example: "Here's the code for a quiz game. Change the questions to be about movies and add a timer."

3. Refine the new artifact the same way you would any artifact you made yourself.

## Fix errors

If an artifact generates an error, look for the "Try fixing with Claude" button near the error message. Click it to copy the error details into a new message, then send it to Claude to diagnose the issue and suggest a fix. Claude will attempt to fix the error, but success isn't guaranteed. Some errors need more troubleshooting.

---

## Artifacts that use Claude

You can build artifacts that call Claude directly, turning them into small apps. People using your artifact can ask questions, generate content, get coaching, play games, and solve problems, with Claude adapting to what they enter.

Describe what you want, Claude writes the code, and the app runs on Anthropic's infrastructure. People using it sign in with their Claude account and interact with their own instance.

No API keys are required, and there's no cost to you. Whether your artifact helps 10 people or 10,000, sharing is free, and usage counts against each person's own plan limits rather than yours. On Team and Enterprise plans, people in your organization can use what you share without adding cost for you.

For legacy artifacts, you can turn this off with the **AI-powered artifacts** setting in **[Settings > Capabilities](https://claude.ai/settings/capabilities)**. New artifacts ask you for permission the first time they want to use Claude.

---

## Connect your apps to an artifact

Available on Pro, Max, Team, and Enterprise plans, on Claude on web and desktop.

Artifacts can connect to the apps you've connected to Claude, so they can read from and write to tools like Asana, Google Calendar, and Slack. They can also connect to any **[custom connectors](https://support.claude.com/en/articles/11175166)** you've set up.

The first time an artifact needs a connected app, Claude shows which apps and tools it will use and asks you to approve them. You can turn individual tools off, and your choice carries over to later uses of that artifact. Connector tools that need approval for each action aren't available to artifacts.

**Important:** Everyone connects their own apps, even when using a shared or published artifact. On Team and Enterprise plans, an owner can turn this off for your whole organization. Learn more in the **[Artifacts admin guide for Team and Enterprise plans](https://support.claude.com/en/articles/16994751)**.

---

## Store data in an artifact

Available on Pro, Max, Team, and Enterprise plans, on Claude on the web and Claude Desktop.

Artifacts can store data between sessions, so you can build things like journals, trackers, and collaborative tools. Storage is either personal or shared:

- **Personal storage:** Everyone keeps their own private data. In a journal artifact, your entries stay visible only to you.

- **Shared storage:** Everyone sees and works with the same data. In a game leaderboard, everyone sees the same scores.

The first time you use an artifact with shared storage, Claude shows a confirmation explaining that your data will be visible to others using it.

**Note:** In legacy artifacts, storage works only after you publish. While you're building and testing, storage operations won't succeed until you publish. New artifacts don't need to be published to store data.

Storage has a 20 MB limit per artifact and accepts text only, no images, files, or binary data. Personal and shared storage are kept separate, and unpublishing a legacy artifact permanently deletes all its stored data.

**Warning:** Whoever builds an artifact decides which data uses personal storage and which uses shared. Before entering anything sensitive, check whether the artifact uses shared storage.

---

## Artifacts in Claude Code

Artifacts are available in Claude Code on every plan that includes Claude Code.

Claude Code can publish its session output as an artifact, a live interactive page at a private URL. The page updates in place as your session continues, and you can share it. An artifact might be a pull-request walkthrough with annotated diffs, a dashboard built from session data, or an investigation timeline that fills in as Claude works.

You can also make designs and docs from Claude Code. Use /design for Claude Design, or ask for a doc. On desktop, the doc opens in the side panel. In the terminal, Claude gives you a link to open it on the web.

To learn how to create, update, and share artifacts in Claude Code, see the **[artifacts documentation on Claude Code Docs](https://code.claude.com/docs/en/artifacts)**.

---

## Live artifacts from Claude Cowork

Artifacts made in Claude Cowork before August 19, 2026 are live artifacts. They keep working, but you can't edit them in place. Learn more in **[Use live artifacts in Claude Cowork](https://support.claude.com/en/articles/14729249)**.

---

## Share an artifact

Artifacts start private to you. Learn more about **[sharing artifacts](https://support.claude.com/en/articles/9547008)**, including who can open them and what they see.
---

SOURCE: https://support.claude.com/en/articles/9547008-share-artifacts

# Share artifacts

This article explains how to share an artifact, who can open it, and what people see when they do. It covers every plan and every place you make artifacts: in a chat, from a template, and in Claude Code.

Artifacts start private to you. Nothing is shared until you share it.

| **Sharing option**                                                 | **Free** | **Pro** | **Max** | **Team** | **Enterprise** |
| ------------------------------------------------------------------ | -------- | ------- | ------- | -------- | -------------- |
| Share with anyone who has the link                                 |          | ✅       | ✅       | ✅        | ✅              |
| Share with everyone, or with specific people, in your organization |          |         |         | ✅        | ✅              |
| Share with groups                                                  |          |         |         |          | ✅              |
| Invite specific people by email (beta)                             |          | ✅       | ✅       | ✅        | ✅              |
| Publish a legacy artifact (made in a chat)                         | ✅        | ✅       | ✅       |          |                |
| Share a legacy artifact with "Share & copy link"                   |          |         |         | ✅        | ✅              |

On Team and Enterprise plans, artifacts stay inside your organization by default. An owner decides whether users can share outside it. Learn more in the **[Artifacts admin guide for Team and Enterprise plans](https://support.claude.com/en/articles/16994751-artifacts-admin-guide-for-team-and-enterprise-plans#h_fd0c095985)**.

**Note:** Live artifacts, which are Cowork artifacts made before August 19, 2026, have their own sharing rules. Learn more about **[using live artifacts in Claude Cowork](https://support.claude.com/en/articles/14729249)**.

**Note:** Legacy artifacts show "Publish" or "Share & copy link" instead of "Share." To share those, see **[Publish or share a legacy artifact](#h_a5750b9176)**.

---

## Share an artifact

1. Open the artifact and click "Share."

2. On Team and Enterprise plans, add people from your organization, and choose each one's access level. Enterprise plans can also add groups.

3. Under **Who has access**, choose who else can open the artifact.

4. Copy the link and send it.

**Note:** You can't change sharing settings in Claude for iOS or Claude for Android. Use Claude on the web or Claude Desktop.

### Choose who has access

- **Pro and Max plans:** "Only you" or "Anyone with the link." To give specific people access, invite them by email.

- **Team and Enterprise plans:** "Only people invited," "Anyone at [your organization's name]," or "Anyone with the link." "Only you" shows when you haven't added anyone. "Anyone with the link" is available only when an Owner has turned on **External sharing** or has allowed that artifact individually. If it's grayed out, ask an Owner or Primary Owner.

### Choose an access level

| **Access**    | **What people can do**                                                                    |
| ------------- | ----------------------------------------------------------------------------------------- |
| **Can view**  | Open the artifact and read its comments.                                                  |
| **Commenter** | Everything in **Can view**, plus add comments and download any files the artifact offers. |
| **Can edit**  | Everything in **Commenter**, plus make changes.                                           |

The levels you can choose depend on the artifact. **Can view** or **Can edit**. Every other type of artifact offers all three levels.

---

## Invite people by email

Available in beta on Pro, Max, Team, and Enterprise plans.

You can invite specific people by email to access an artifact. They sign in to Claude with the email address you used and open the artifact with the access you give them. Unlike "Anyone with the link," an invitation works only for the person you invite.

### Before you invite someone

- **Who can invite:** The artifact's owner. On Team and Enterprise plans, anyone in your organization who can edit the artifact can also invite people. The owner gets an email when someone else sends an invitation.

- **Team and Enterprise plans:** **Email invitations outside your organization** needs to be on in **[Organization settings > Artifacts](https://claude.ai/admin-settings/artifacts)**. It's on by default on Team plans and off on Enterprise plans. If you don't see the option, ask an Owner or Primary Owner.

- **The invitee needs a Claude account** with the email address you invited. If they don't have one, they need to create one with that address before they can open the artifact. Claude doesn't tell you whether or not they have an account.

- **Some artifacts can't be shared this way.** The "Share" menu tells you when this applies:

  - Documents made with Claude Docs

  - Artifacts that connect to other websites

  - Artifacts with an uploaded file that's still being checked or didn't pass the check

### Send an invitation

1. Open the artifact and click "Share."

2. In the field at the top of the **Share** menu (**Add people**, or **Invite people by email** on Pro and Max plans), type the person's email address.

3. Select the **Invite** option that shows their address.

4. Under **Their access**, choose "Can view," "Commenter," or "Can edit."

5. Click "Invite."

On Team and Enterprise plans, if you type the address of someone in your organization, they're added to the artifact directly instead of getting an invitation.

### What people you invite can do

People you invite from outside your organization can't invite others or change sharing settings. Parts of the artifact that use Claude or your connectors don't work for them. People with “Can edit” access can't delete the artifact, and they can upload only images and videos to it.

People you invite with “Commenter” or “Can edit” access can comment, but they can't mention people or ask Claude in a comment, and they don't get email notifications about comments. They can't comment on an artifact that's also shared with "Anyone with the link."

If the artifact is also shared with "Anyone with the link," the people you invited have the same access as anyone with the link, whatever level you gave them.

### Manage people you've invited

In the artifact's **Share** menu, people you've invited appear under **Invited from outside your organization**, and pending invitations show when they expire. From there, you can change someone's access or remove them. Removing someone takes away their access right away.

If someone didn't get an invitation email because they didn't have a Claude account yet, ask them to create one with that address. Then remove the invitation and invite them again.

### When access changes

- **Pending invitations expire after 30 days.** Accepted invitations don't expire.

- **If you change who can open the artifact to "Only you":** On Team and Enterprise plans, everyone you invited from outside your organization loses access, and their invitations are removed. On Pro and Max plans, people you invited keep their access.

- **If you delete the artifact:** Everyone you invited loses access.

- **If the person who sent an invitation leaves your organization or loses edit access:** Their pending invitations stop working. People who already accepted keep access until someone removes them.

- **If an owner turns off email invitations:** People you invited can't open the artifact until the setting is turned back on. Accepted invitations aren't deleted, and pending ones still expire 30 days after they were sent.

### Limits

- You can invite up to 50 people from outside your organization per artifact, counting pending and accepted invitations.

- Invitation emails are in English.

---

## Who can open a shared artifact

- **Everyone needs a Claude account.** People without one can't open a shared artifact, even with the link. The only exception is a legacy artifact published from a chat.

- **Everyone in your organization:** Only people signed in to your organization can open it.

- **Anyone with the link:** Anyone signed in to Claude who has the link can open it. On Team and Enterprise plans, if an owner turns off **External sharing**, these links stop working until it's turned back on, unless an owner has allowed that artifact individually.

### Artifacts that can't be shared outside your organization

- **By link:** Artifacts that connect to your apps or use Claude can't use "Anyone with the link." On Team and Enterprise plans, docs can't use it yet either.

- **By email invitation:** See the list in **[Before you invite someone](#h_4abce57435)**.

### What people see when they open your artifact

- **Viewers use their own access.** An **[artifact that pulls from connected apps](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them#h_1a161da210)** uses the viewer's connections, not yours. If a viewer can't access a data source, that part of the artifact shows an error instead of your data.

- **Stored information can be shared.** Some artifacts save information that everyone who opens them can see, like items in a shared tracker. Before you enter sensitive information, check whether the **[artifact uses shared storage](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them#h_135477d2e6)**.

**Important:** Only open shared artifacts from people you trust. Treat someone else's artifact the way you'd treat a file from an unknown sender.

---

## Stop sharing an artifact

To stop sharing an artifact, open it, click "Share," and under **Who has access**, choose "Only you" (Pro and Max) or "Only people invited" (Team and Enterprise). To remove someone you added, open their access level and select "Remove."

On Team and Enterprise plans, owners can also remove outside access to individual artifacts. Learn more in the **[Artifacts admin guide for Team and Enterprise plans](https://support.claude.com/en/articles/16994751-artifacts-admin-guide-for-team-and-enterprise-plans#h_929aa51571)**.

---

## Open an artifact you were invited to

1. Open the email from Claude (<no-reply-claude@mail.anthropic.com>). It shows the email address of the person who invited you and what access you'll have.

2. Click "View invitation" and sign in to Claude in a web browser with the address the invitation was sent to.

3. Click "Accept and open."

To come back to the artifact later, open the link in the invitation email again or bookmark the artifact.

### Report an invitation you didn't expect

Click "Report this invitation" in the email, or "Didn't expect this? Report this invitation" on the invitation page. Reporting declines the invitation, and the person who sent it isn't notified. After you report an invitation, that person can't invite you by email again.

---

## Publish or share a legacy artifact

Legacy artifacts show "Publish" (Free, Pro, and Max plans) or "Share & copy link" (Team and Enterprise plans) instead of "Share." Use the steps in this section for those artifacts.

### Publish a legacy artifact on Free, Pro, and Max plans

1. Open the artifact you want to publish.

2. Click "Publish."

3. Copy the public link and send it.

Publishing adds the artifact to **[Artifacts](https://claude.ai/artifacts)** in your sidebar, so you can find it again outside the original chat.

**Who can open a published chat artifact:**

- Anyone with the link can view and use it without a Claude account. They're asked to sign up only for features that use Claude.

- People signed in on Free, Pro, or Max plans can also copy and save it. Features that use Claude count toward their own usage limits.

### Embed a published chat artifact

After you publish, click "Get embed code" to get code you can paste into another website. In the **Allowed domains** field, enter the websites that can embed your artifact, separated by commas.

### Unpublish a chat artifact

Click "Unpublish" to revoke access to a published artifact.

**Important:** You can't publish an artifact again after you unpublish it. To share it later, you'll need to create a new artifact. Unpublishing also permanently deletes any personal and shared storage data the artifact used.

### Share a chat artifact on Team and Enterprise plans

1. Open the artifact you want to share.

2. Click "Share."

3. Click "Share & copy link."

**Who can open it:**

- Users in your organization, signed in with their Team or Enterprise account.

- Anyone with the link, if an owner has turned on **External sharing** and you chose "Anyone with the link." They need a Claude account.

- If the artifact was made in a project, viewers also need access to that project.

**Important:** When you share an artifact made in a chat, viewers also get access to the attachments and files in that chat. Check for sensitive documents before you share.

**To unshare a chat artifact:**

1. Click "Share" in the upper right corner of the artifact.

2. In the **Artifact shared** modal, click "Unshare."

---

## Learn more

Learn more about **[creating and working with artifacts](https://support.claude.com/en/articles/9487310)**. For organization settings that control sharing, see the **[Artifacts admin guide for Team and Enterprise plans](https://support.claude.com/en/articles/16994751)**. For Claude Code, see the **[artifacts documentation on Claude Code Docs](https://code.claude.com/docs/en/artifacts)**.