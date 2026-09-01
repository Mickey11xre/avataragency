
---

SOURCE: https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects

# Retrieval augmented generation \(RAG\) for projects

RAG for projects is available for all Claude plans (free, Pro, Max, Team, and Enterprise).

Projects can now handle much more content without running into limits, giving Claude better context to help you. As you add more files and information to your projects, Claude automatically switches to a faster mode (powered by RAG) that keeps response times quick while maintaining quality responses.

## What is RAG for projects?

RAG or retrieval augmented generation is a technology that allows your projects to store and access significantly more knowledge than before. When your project knowledge approaches the context window limit, Claude will automatically enable RAG mode to expand your project's capacity by up to 10x while maintaining quality responses.

Previously, projects had a knowledge capacity limit based on the **[context window](https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans)**. Once you reached this threshold, it wasn't possible to add more content. With RAG, you can continue adding knowledge beyond these limits while maintaining full functionality.

## How RAG works

When RAG is enabled for your project, Claude uses a **project knowledge search tool** to retrieve relevant information from your uploaded documents. Instead of loading all project content into memory at once, Claude intelligently searches and retrieves only the most relevant information needed to answer your questions.

This approach allows for:

- **Enhanced capacity**: Store up to 10x more content in your projects.

- **Maintained quality**: Response accuracy remains consistent with in-context processing.

- **Faster responses**: Optimized retrieval keeps response times quick.

- **Seamless transition**: Automatic activation when needed, no setup required.

## When RAG activates

RAG automatically activates when your project approaches or exceeds the context window limits. You'll see a visual indicator showing that your project is RAG-enabled.

If your project knowledge later drops below the context window threshold, Claude can automatically convert back to context-based processing.

## Using projects with RAG

Working with RAG-enabled projects feels similar to working with regular projects. You can:

- Upload documents, images, and other files as usual

- Ask questions about your project knowledge

- Reference specific documents or information

- Add and remove content at any time

The main difference is that you'll see Claude using a **project knowledge search tool** when it needs to find relevant information from your uploaded content.

## Best practices for RAG projects

To get the most out of your RAG-enabled projects:

### Upload comprehensive content

Add all relevant documents and files to your project upfront. The more context Claude has access to, the better it can assist you.

### Use clear, descriptive filenames

Well-named files help Claude understand and retrieve the right information more effectively.

### Organize related content together

Group related documents in the same project to enable Claude to draw connections between different sources.

### Reference specific documents

When asking questions, you can reference specific documents by name to help Claude focus its search.

---

## Frequently asked questions

### Will having RAG enabled on my project affect response quality?

No. RAG maintains consistent response quality as in-context processing while enabling larger project capacity.

### Do I need to do anything to enable RAG?

No, RAG activates automatically when needed. No setup or configuration is required.

### Can I control when RAG is used?

RAG activation is handled automatically based on the size of your project knowledge. When possible, projects will use in-context processing for optimal performance.

### Will my existing projects work with RAG?

Yes. All existing projects will automatically benefit from RAG when the project knowledge exceeds context limits.

### Does RAG work with all Claude tools?

Yes. RAG works with all Claude features, including web search, extended thinking, and Research.
---

SOURCE: https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork

# Organize your tasks with projects in Claude Cowork

Projects in Claude Cowork let you group related tasks into dedicated workspaces with their own files, context, instructions, and memory. If you use projects on Claude, Cowork projects work similarly, but they live locally on your desktop and are built around the tasks you run through Cowork.

## Availability

**Important:** This feature requires the latest version of Claude Desktop. Start by updating your desktop app if you’re not using the latest version.

Cowork is available for paid plans (Pro, Max, Team, Enterprise) on:

- **Claude Desktop for macOS**

  - **[Click here](https://claude.ai/api/desktop/darwin/universal/dmg/latest/redirect)** to download

- **Claude Desktop for Windows**

  - Cowork requires the latest version of Claude for Windows. Download or update at **[our download page](https://claude.com/download)**.

---

## Create a project

Find **Projects** in the left navigation panel and click the “+” button to see the three different ways to create a project:



### Start from scratch

Selecting “Start from scratch” allows you to set up a new folder with instructions and files:



### Import from a Claude project

After selecting “Import from project,” you’ll see a “Search projects in Chat…” field:



Clicking into the field will display a drop-down showing your recent projects, but you can also use it to search all your projects. After you select a chat project (bulk upload is not supported), you can name the new Cowork project and choose where to save it on your computer:



Clicking “Create” will transfer the files and instructions from your existing Claude project and create a new Cowork project.

### Use an existing folder on your computer

If you select “Use an existing folder,” you’ll be prompted to pick a file to use as context for the new Cowork project:



After selecting a folder, you can name the new Cowork project, choose where to save it on your computer, add instructions, and attach any additional files. Click “Create” to start using your new project:



---

## What's included in a project

Each project has its own:

- **Instructions** — Add tone, formatting, or rules to help guide how Claude works on all tasks in the project.

- **Scheduled tasks** — Set up recurring tasks that are specific to the project.

- **Context** — Add a local folder, link a chat project, or paste in a URL for Claude to reference.

- **Memory** — Claude remembers context from your work within the project.

---

## Memory in projects

Memory is enabled for Cowork projects. This means Claude can remember context from tasks you've run in a project and apply it to future tasks in the same project. Memory is scoped to the project, so what Claude learns in one project doesn't carry over to others.

For more information about how memory works, see **[Use Claude’s chat search and memory to build on previous context](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context)**.

---

## Archive a project

When you archive a project in Cowork:

- The project's metadata is removed from the UI, but is not removed locally.

- Any related files or folders stored on your computer are not affected.

---

## Current limitations

- Projects are only available in Cowork, not in Claude Code. Support for Claude Code is planned for a future update.

- Projects are desktop-only and stored locally. There's no cloud sync for project data at this time.

- For members of Team and Enterprise plans, Cowork projects do not support **[project sharing](https://support.claude.com/en/articles/9519189-manage-project-visibility-and-sharing)**.
---

SOURCE: https://support.claude.com/en/articles/9517075-what-are-projects

# What are projects?

Projects are available to all users, including those with free Claude accounts. Free users can create a maximum of five projects.

Projects allow you to create self-contained workspaces with their own chat histories and knowledge bases. Within each project, you can upload documents, provide context, and have focused chats with Claude.

## Project knowledge

A key benefit of projects is the ability to provide context for your chats with Claude. You can upload relevant documents, text, code, or other files to a project's knowledge base, which Claude will use to better understand the context and background for your individual chats within that project.

In addition, you can define project instructions for each project to further tailor Claude's responses. For example, instructing Claude to use a more formal tone or answer questions from the perspective of a specific role or industry.

## Enhanced project knowledge with RAG

Enhanced project knowledge with RAG is only available to users with paid Claude plans (Pro, Max, Team, or Enterprise).

When using a paid plan, your projects automatically scale to handle large amounts of content through Retrieval Augmented Generation (RAG). When your project knowledge approaches context limits, Claude seamlessly enables RAG mode to expand capacity by up to 10x while maintaining response quality.

For more information on leveraging expanded project knowledge capacity, see **[Retrieval augmented generation (RAG) for projects](https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects)**.

## Collaboration and sharing (Team and Enterprise plans only)

For users on Team and Enterprise plans, projects can be shared with other members of your organization, enabling powerful collaboration and knowledge sharing capabilities. The sharing system includes:

**Permission levels:**

- **Can view:** Members can see project contents, knowledge, and instructions, and chat within the project, but cannot edit it.

- **Can edit:** Members can modify project instructions and knowledge, add/remove members, update member settings, and actively contribute to the project.

- **Project creators can:**

  - Share to specific members instead of making a project fully private or public to the entire organization.

  - Make a previously-created private project visible to the whole organization.

**Sharing options:**

- **Individual sharing:** Share projects with specific team members by email.

- **Bulk sharing:** Add multiple users at once using email lists.

- **Organization-wide sharing:** Make projects available to everyone in your organization either when creating the project or afterward.

  - **Note:** If an Owner or Primary Owner disables public projects, organization-wide sharing will be disabled both when creating the project and afterward.

**Collaboration features:**

- **Shared with me tab:** Easily find projects that others have shared with you.

- **Email notifications:** Get notified when someone shares a project with you.

- **Access management:** Project creators can modify permissions or remove access as needed.

Multiple members can contribute documents, create chats, and work together within the same project environment, making projects ideal for team collaboration.

For more information on getting started with projects, see **[How can I create and manage projects?](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)**

For more information on private projects and visibility settings on Team and Enterprise plans, see **[Project visibility and sharing](https://support.claude.com/en/articles/9519189-project-visibility-and-sharing)**.
---

SOURCE: https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects

# How can I create and manage projects?

Projects are available to all users, including those with free Claude accounts. Free users can create a maximum of five projects.

## How to create a project

1. Hover over the left side of your account and click “Projects,” or navigate directly to this section: **[claude.ai/projects](https://claude.ai/projects)**.

2. Click "+ New Project" in the upper right corner.

3. Give your project a name and description (note that Claude will not have access to these details).

4. If you are on a Team or Enterprise plan, choose the visibility settings:

  - **Keep it private:** Only you and members you invite can view or use this project.

  - **Share with your broader organization:** Everyone in your organization can view and use this project (where enabled by administrators).

Once your project is set up, you can initiate chats with Claude within the project.

## Add content to project knowledge

You'll find the project knowledge base on the right side of your project's main page. Anything you upload to this space will be used across all of your chats within that project.

### Add content to your project knowledge base

1. Click on the "+" button to add content to the project.

2. Upload relevant documents, text files, or code snippets.

3. Claude will process this information and use it as context in your chats within the project.

4. If you are using a paid Claude plan, when your project knowledge approaches the context window limit, **[Claude will automatically enable RAG mode to expand your project's capacity](https://support.anthropic.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects)**.

### Add project instructions to your project knowledge base

1. Click on "Set project instructions."

2. Add instructions for how you'd like Claude to behave and respond and click "Save instructions."

3. Claude will use these instructions for all the chats within the project.

**Note:** Context is not shared across chats within a project unless the information is added into the project knowledge base.

---

## Share projects

If you are a member of a Team or Enterprise plan organization, you can share projects with other members of your organization.

### To share a project

1. Open the project you want to share.

2. Click the "Share project" button to the right of the project name.

3. Add individual members using their name or email address, or copy and paste a list of email addresses for bulk sharing.

4. Select the appropriate permission level for each member:

  - **Can view:** Members can see project contents, knowledge, and instructions, and chat within the project, but cannot edit it.

  - **Can edit:** Members can modify project instructions and knowledge, update member settings, and actively contribute to the project.

5. Click "Share" to send invitations.

### Manage shared project access

- **To change permissions:** Open the sharing menu and select a new role for the member.

- **To view who has access:** The sharing menu shows all current members and their permission levels.

- **To remove access:** The project creator can click on the member's current role and select "Remove access."

### Find shared projects

Projects that others have shared with you will appear in the "Shared with me" tab on your **[Projects page](https://claude.ai/projects)**. You'll also receive an email notification when someone shares a project with you.

---

## Star projects for quick access

Starring a project allows for quick access from your projects and chats list, visible when hovering over the left side of your account. You can star a project from two different areas:

### From the “Projects” page

1. Locate the project on the “Projects” page.

2. Click on the three dots ("..." button) on the upper right corner of the project.

3. Select "Star" from the menu that appears.

### From the project

1. Open the relevant project.

2. Click on the star icon in the upper right corner.

3. The project will now appear in your starred items in the left side panel of your account.

---

## How to move chats into projects

You can move a standalone chat into a project by clicking on the dropdown arrow next to the chat name, then “Add to project”:



Browse or search for the correct project in the **Move chat** modal that appears, then click on it to move the chat.



You can also remove chats from projects, or move them between projects, using the same dropdown menu within the chat:



You can move chats into projects in bulk from **[Your chat history page](https://claude.ai/recents)**:



Select the chats you want to move, then click the icon next to the number of selected chats to move them into your project.

---

## Move chats to manage Claude’s memory

Memory is on by default for Free, Pro, and Max plans on the web, Claude Desktop, and Claude Mobile. On Team and Enterprise plans, memory is available when an owner has enabled it.

For Team and Enterprise plans using Claude’s memory, the ability to move chats into and out of projects allows you to manage what’s included in Claude’s memory. Each project has its own memory, kept separate from your non-project chats. For example, if you accidentally start an unrelated chat in a project and need to remove it from the project-specific memory summary, you can click “Remove from project” so it will be included in Claude’s non-project memory instead.

Refer to our article on chat search and memory for more information: **[What is Claude’s memory?](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context#h_82126ebcc9)**

---

## How to archive projects

Archiving is a way to organize your projects and declutter your project list. It's particularly useful for completed projects or those you're not actively working on but may need to reference in the future.

**Important:** Archiving a project doesn't reset its sharing permissions or remove members. All members, permission levels, and project knowledge are preserved, and everything is restored exactly as it was when you unarchive the project. To revoke someone's access, remove them in the project's sharing settings.

Here's what you need to know about archiving:

- Archived projects will appear at the bottom of your main projects list.

- You can still access conversations from archived projects.

- There is no way to delete archived projects at this time (you must unarchive it first).

### To archive a project, follow these steps

1. Navigate to the project you want to archive.

2. Click on the three dots ("..." button) in the upper right corner.

3. Confirm that you want to archive the project.

### How to access archived projects

You can access an archived project in the archived projects tab on the **[Projects page](https://claude.ai/projects)**.

## How to unarchive a project

There are two ways to make archived project active again:

### From the archived projects tab

1. Locate the archived project.

2. Click on the three dots ("..." button) in the upper right corner.

3. Select "Unarchive" from the menu that appears.

### From the project

1. Navigate to the archived project.

2. Click on the three dots ("..." button) in the upper right corner.

3. Confirm that you want to unarchive the project.

---

## Delete projects

**Note:** It's not possible to delete archived projects. To see the option to delete an archived project, you must unarchive it first.

### From the “Projects” page

1. Locate the project on the **[Projects page](https://claude.ai/projects)**.

2. Click on the three dots ("..." button) on the upper right corner of the project.

3. Select "Delete" from the menu that appears.

4. Confirm deletion in the pop-up by clicking "Yes, delete."

### From the project

1. Navigate to the project

2. Click on the three dots ("..." button) next to the star.

3. Select "Delete."

4. Confirm deletion in the pop-up by clicking "Yes, delete."
---

SOURCE: https://support.claude.com/en/articles/9519189-manage-project-visibility-and-sharing

# Manage project visibility and sharing

Project visibility and sharing features are available to users on Team or Enterprise plans. This article assumes that public projects are enabled for your organization. For more information, see **[How can I disable public projects?](https://support.claude.com/en/articles/9927533-how-can-i-disable-public-projects)**

Sharing a project with a group requires an Enterprise plan and is currently in beta.

## Understand the two project visibility options

When creating a project on a Team or Enterprise plan, you can choose between two initial visibility options:

- **Public:** Everyone in your organization can view and use the project.

- **Private:** Only invited members can view and use the project.



## What are public projects?

If you choose to share a project with the rest of your organization upon creation, this means that any other member of your team can find it by browsing or searching the [Team tab in the Projects section](https://claude.ai/projects?category=team), and use it to start a chat. Even if a project is public, your chats within that project will be private and inaccessible to other members of your organization unless you manually share them.

### Can I change a project from public to private?

Yes, you can switch the visibility of a project you created as public to private at any time by opening the project and clicking the “Share” button to the right of the project name:



Click “Everyone at [your organization]” under **General access** and select “Only people invited” to change the project from public to private:



## What are private projects?

Choosing “Only people invited” keeps your project private so that you are the only user with access by default. All content within the project (chats, project knowledge, and artifacts) remains inaccessible to other members unless they are explicitly invited.

### Can I change a project from private to public?

Yes, you can switch the visibility of a project you created as private to public at any time by opening the project and clicking the “Share” button to the right of the project name:



Click “Only people invited” under General access and select “Everyone at [your organization]” to change the project from private to public:



## Add and remove access to private projects

### To add members to a private project

1. Click the "Share" button to the right of the project name.

2. In the window that appears, add people from your organization by name or email address. On Enterprise plans, you can also add a group if its visibility settings allow project sharing. Groups appear in the results with a group icon and the label **Group**.

3. Select the appropriate permission level:

  - **Can view:** Members can see project contents, knowledge, and instructions, and chat within the project, but cannot edit it.

  - **Can edit:** Members can modify project instructions and knowledge, update member settings, and actively contribute to the project.

This will share the project and knowledge base with the member, but your chats will remain private unless you choose to share them.

### To remove members from a private project

1. A project member with "Can edit" permissions can open the project's "Share" menu.

2. Click on the role to the right of the member's name.

3. Select "Remove access."

4. After being removed, they will no longer be able to access this project or its content.

### Add members in bulk

You can add multiple users at once by copying and pasting a list of email addresses into the **Add people or groups** field after clicking “Share."

### Share a project with a group

Sharing a project with a group is currently in beta for Enterprise plans.

On Enterprise plans, you can share a project with a group instead of adding each member individually. Access follows group membership, so members who join the group later get access automatically, and members who leave lose it.

Before you can share with a group, an admin needs to turn on **Share resources with this group** in the group's visibility settings. See **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**.

1. Click the "Share" button to the right of the project name.

2. Type the group name in the **Add people or groups** field.

3. Select the group from the results.

4. Select "Can view" or "Can edit."

5. Click "Share."

A few things to know:

- A newly visible group can take a few minutes to appear in the picker.

- Access changes can take up to five minutes to apply.

- Group members only get access if they're also members of the organization the project belongs to. A group can span child organizations, but a shared project stays scoped to its own organization.

- Once a project is shared with a group, every member of that group can open it, even if the group isn't visible to their organization. Visibility controls who can find a group in the picker, not who can reach a project that's already shared.

- If a member leaves a group, they lose access to projects shared through it unless they have access another way.

- Deleting a group removes its access to any projects shared with it.

### Email notifications

When someone shares a project with you, you'll receive an email notification letting you know about the new shared project and your permission level.
​

### “Shared with you” tab

Projects that have been shared with you will appear in a "Shared with you" tab on your **[Projects section](https://claude.ai/projects?category=shared_with_me)**, making it easy to find and access collaborative work.

### What happens when archiving a shared project?

Archiving a project doesn't reset its sharing permissions or remove members. All members, permission levels, and project knowledge are preserved, and everything is restored exactly as it was when you unarchive the project. To revoke someone's access, remove them in the project's sharing settings before or after archiving.

## Share and unshare chats

Chats within a project are not shared by default.

### To share a chat

1. Click the "Share" button in the upper right corner of your chat.

2. Click the "Share" button in the pop-up to create a shareable link.

The chat snapshot includes all messages that were sent prior to sharing the chat, including any artifacts. All messages sent after sharing a chat will remain private by default. However, you can choose to update the shared snapshot to include new messages.

### To update a shared chat

1. Open the "Share" menu.

2. Click “Update" next to “New messages since last shared” to include any new messages in the shared snapshot.

### To unshare a chat

1. Navigate to the "Share" menu.

2. Click the visibility dropdown.

3. Change the chat from "Shared" to "Private" to disable the direct link.
---

SOURCE: https://support.claude.com/en/articles/9927533-disable-public-projects-for-your-organization

# Disable public projects for your organization

This feature is available to Primary Owners and Owners on Team and Enterprise plans.

Disabling the public project feature allows Team and Enterprise owners to restrict the creation of public projects across their organization while maintaining internal sharing capabilities.

Follow these steps:

1. Navigate to **[Organization settings > Data and privacy](https://claude.ai/admin-settings/data-privacy-controls)**.

2. Find **Public projects** and toggle it off



## How does disabling public projects work?

By default, **[public projects](https://support.claude.com/en/articles/9519189-project-visibility-and-sharing#h_2c0e9eb7c4)** are enabled for all Team and Enterprise plans. When you disable public projects:

1. All existing public projects will be converted to private projects.

2. Users will be prevented from creating new public projects.

**Important:** Users can still share **[private projects](https://support.claude.com/en/articles/9519189-project-visibility-and-sharing#h_a088ccfaa3)** with individual users within your organization after disabling public projects. Any private projects that were shared with individuals will retain their shared settings.

## Impact on project sharing

Disabling public projects does not affect the internal project sharing capabilities available to Team and Enterprise users:

- **Individual project sharing:** Users can still share projects with specific team members using email-based invitations.

- **Organization-wide sharing:** Projects can still be shared across your entire organization (where permissions allow).

- **Permission management:** All view and edit permission levels remain available for internal sharing.

- **Collaboration features:** The "Shared with me" tab and other collaborative features will continue to function as expected.

This setting specifically controls external public sharing while preserving all internal collaboration functionality.

## Re-enable public projects

If you choose to re-enable public projects after disabling them:

- Existing projects will remain private.

- Users will regain the ability to create new public projects.

- Internal sharing settings and permissions will remain unchanged.