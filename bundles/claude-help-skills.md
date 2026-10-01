
---

SOURCE: https://support.claude.com/en/articles/12512176-what-are-skills

# What are skills?

Skills are folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks. Skills teach Claude how to complete specific tasks in a repeatable way, whether that's creating documents with your company's brand guidelines, analyzing data using your organization's specific workflows, or automating personal tasks.

Skills are available for users on Free, Pro, Max, Team, and Enterprise plans. This feature requires **[code execution to be enabled](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude#h_1c99382190)**. Skills are also available in Claude Code, and in beta for all API users using the code execution tool.

---

## How do skills work?

Skills improve Claude’s consistency, speed, and performance on many tasks. Skills work through progressive disclosure—Claude determines which skills are relevant and loads the information it needs to complete that task, helping to prevent context window overload.

When you ask Claude to complete a task, it reviews available skills, loads relevant ones, and applies their instructions.

---

## Types of skills

### Anthropic skills

These are skills created and maintained by Anthropic, such as enhanced document creation for Excel, Word, PowerPoint, and PDF files. Anthropic skills are available to all users and Claude invokes them automatically when relevant.

### Custom skills

These are skills you or your organization create for specialized workflows and domain-specific tasks. Here are some potential workflows you could enable using custom skills:

- Apply brand style guidelines to documents and presentations.

- Generate communications following company email templates.

- Structure meeting notes with company-specific formats.

- Create tasks in company tools (JIRA, Asana, Linear) following team conventions.

- Execute company-specific data analysis workflows.

- Automate personal workflows and customize Claude to match your work style.

### Organization provisioned skills

For Team and Enterprise plans, organization Owners can provision skills for all users. Skills provisioned in this way appear automatically in every team member's skills list and can be set as enabled or disabled by default. This allows organizations to:

- Distribute approved workflows consistently across all employees

- Ensure teams use standardized procedures and best practices

- Deploy new capabilities without requiring individual uploads

Learn more about provisioning skills in **[Provision and manage skills for your organization](https://support.claude.com/en/articles/13119606-managing-skills-as-an-admin)**.

### Partner skills

The Skills Directory features professionally-built skills from partners like Notion, Figma, Atlassian, and others. These skills are designed to work seamlessly with their respective MCP connectors, enabling powerful integrated workflows.

---

## Key benefits

**Improvement in Claude’s performance of specific tasks**: Skills provide specialized capabilities for tasks like document creation, data analysis, and domain-specific work that requires supplementing Claude's general knowledge.

**Organizational knowledge capture**: Package your company's workflows, best practices, and institutional knowledge for Claude to use consistently across your team.

**Easy customization**: Anyone can create skills by writing instructions in Markdown—no coding required for simple skills, though you can attach executable scripts to custom skills for more advanced functionality.

**Centralized management for organizations:** Team and Enterprise plan Owners can provision skills organization-wide, ensuring consistent workflows across teams without requiring individual setup from each user.

---

## Agent Skills open standard

The Agent Skills specification is published as an open standard at **[agentskills.io](https://agentskills.io)**. This means skills you create aren't locked to Claude—the same skill format works across AI platforms and tools that adopt the standard. A reference Python SDK is also available for developers implementing skills support in their own platforms.

---

## Skills compared to other Claude capabilities

### Skills vs. projects

**[Projects](https://support.claude.com/en/articles/9517075-what-are-projects)** provide static background knowledge that's always loaded when you start chats within them. Skills provide specialized procedures that activate dynamically when needed and work everywhere across Claude.

### Skills vs. MCP (Model Context Protocol)

MCP connects Claude to external services and data sources. Skills provide procedural knowledge—instructions for how to complete specific tasks or workflows. You can use both together: MCP connections give Claude access to tools, while skills teach Claude how to use those tools effectively.

### Skills vs. custom instructions

**[Custom instructions](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features)** apply broadly to all your conversations. Skills are task-specific and only load when relevant, making them better for specialized workflows.

---

## Learn more about skills

To discover available skills, check out the directory by clicking "Customize" in your account and navigating to "Skills." You can click "+" then "Browse skills" to open the directory. For more information, see **[Browse skills, connectors, and plugins in one directory](https://support.claude.com/en/articles/14328846-browse-skills-connectors-and-plugins-in-one-directory)**.

On the Enterprise plan, organizations can turn on skill scanning to check uploaded skills and plugins for malicious content. Learn more about **[skill and plugin scanning](https://support.claude.com/en/articles/15927065)**.

For more details about how skills work, see **[Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)** in our Claude Docs.
---

SOURCE: https://support.claude.com/en/articles/12512180-use-skills-in-claude

# Use skills in Claude

Skills extend Claude's capabilities by giving it access to specialized knowledge and workflows. This guide shows you how to enable, discover, and use skills in Claude.

Skills are available for users on Free, Pro, Max, Team, and Enterprise plans. This feature requires **[code execution to be enabled](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude#h_1c99382190)**. Skills are also available in Claude Code, and in beta for all API users using the code execution tool.

## Prerequisites

**For Enterprise plans:** Owners must check that both **Code execution and file creation** and **Skills** are enabled in **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)** in the “Policy” tab. Owners can also upload skills to provision them organization-wide—these skills automatically appear for all users. Once skills are enabled at the organization level, individual members can toggle on example skills, access provisioned skills, and upload their own personal skills in **[Customize > Skills](https://claude.ai/customize/skills)**.

**For Team plans:** This feature is enabled by default at the organization level. Once enabled, individual members can toggle on example skills and upload their own in **[Customize > Skills](https://claude.ai/customize/skills)**.

**For Max, Pro, and Free plans:** You can enable example skills and upload your own in **[Customize > Skills](https://claude.ai/customize/skills)**.

---

## How to enable skills

1. For Team / Enterprise plans: Navigate to **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)**, click the “Policy” tab, and ensure that both **Cloud code execution and file creation** and **Skills** are enabled.

2. For individual Free, Pro, and Max plans: Navigate to **[Settings > Capabilities](https://claude.ai/settings/capabilities)** and ensure that **Code execution and file creation** is enabled.

3. Go to **[Customize > Skills](https://claude.ai/customize/skills)**.

4. Toggle individual skills on or off as needed.

## Provision skills organization-wide

Owners of Team and Enterprise organizations can provision skills for all users. These skills appear in your individual Skills list with a team indicator—you can toggle them on or off based on your preferences. For information on provisioning skills for your organization, see **[Provision and manage skills for your organization](https://support.claude.com/en/articles/13119606-provisioning-and-managing-skills-for-your-organization#h_4dea113421)**.

## Use Anthropic skills

Anthropic provides several built-in skills that are available to all users, including:

- Enhanced Excel spreadsheet creation and manipulation

- Professional Word document creation

- PowerPoint presentation generation

- PDF creation and processing

With **Code execution and file creation** on, Claude will automatically use these tools when relevant. You don't need to explicitly invoke them—Claude determines when each skill is needed based on your request.

For example, if you ask Claude to "Create a PowerPoint presentation about Q3 results," Claude will automatically use the PowerPoint skill if the capability is enabled.

## Add and use custom skills

You can also create and upload your own skills to teach Claude your specific workflows:

1. Create a skill following the skill structure (see **[How to create custom skills](https://support.claude.com/en/articles/12512198-creating-custom-skills)** for detailed instructions).

2. Package your skill folder as a ZIP file.

3. Navigate to **[Customize > Skills](https://claude.ai/customize/skills)**.

4. To add custom skills, click the "+" button, then “+ Create skill.”

5. Select "Upload a skill.”

6. Upload a ZIP file containing your skill folder.

7. Your skill will appear in your skills list and can be toggled on or off.

**Note:** Custom skills you upload aren't visible to colleagues until you share them. Admins can see their names and sharing status, but not their files On Team and Enterprise plans, you can share skills (see **Share a skill** below), or provision skills for your organization. Learn more about **[provisioning skills for your organization](https://support.claude.com/en/articles/13119606-managing-skills-as-an-admin#h_4dea113421)**.

---

## Share a skill

On Team and Enterprise plans, you can share skills you've created with specific colleagues, groups. To make a skill available to your entire organization, publish it instead. Skill sharing works in both chat and Cowork.

**Note:** The **Skill sharing** toggle is on by default for Team plans and for Enterprise plans that haven't set a skills preference. For organizations with HIPAA readiness or other regulated configurations, skills and skill sharing are off by default and an admin can enable them. The **Share with organization** and **Share with groups** toggles are also off by default. An owner must navigate to **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)**, click the “Policy” tab, and enable at least one of the toggles before the "Share" button appears. If your organization uses custom roles, your role must also have the **Share skills with groups** capability enabled. If you don't see the option to share, check with your organization owner.

To share a skill:

1. Navigate to **[Customize > Skills](https://claude.ai/customize/skills)**.

2. Find the skill you created.

3. Click the three-dot menu (...) next to it, then select "Share."

4. Choose who to share with:

  - **Specific people:** Enter names or emails to share directly. Sharing creates a link that opens the item for anyone it's shared with. The skill appears in each recipient's skills list, grayed out until they enable it, and shows your name as the owner.

  - **A group (Enterprise plans only):** Share with a group your organization has already set up. The skill appears in every group member's skills list, grayed out until they enable it. Requires the **Share with groups** toggle.

5. Click "Share."

Shared skills are view-only. Recipients can enable and use the skill, but they can't edit the contents. If you update the skill later, recipients automatically get the updated version at next use. You can remove someone's access at any time, and access is removed automatically if they leave the organization.

---

## Publish a skill to your organization

On Team and Enterprise plans, you can submit a skill you've created to your organization's library, so anyone in your organization can install it. Sharing gives a skill to specific people or groups, and you keep control of it. Publishing hands it to your organization.

To publish a skill:

1. Navigate to **[Customize > Skills](https://claude.ai/customize/skills)**.

2. Open the skill you want to publish.

3. Click "Publish to org."

4. If your organization requires review, choose how you'd like the skill offered: Available to install, Installed by default, or Required. Add release notes for the reviewer if you'd like, then submit.

If your organization requires review, an owner (or someone with permission to review requests) checks the skill before it's published. Your choice of how it's offered is a proposal. The reviewer sees it preselected and can change it, and they also choose who gets the skill: everyone or specific groups. You can keep using and editing your copy while you wait, and you can withdraw the submission. The skill shows its status: pending, changes requested (with the reviewer's note), or published. You'll get an email when it's approved. If your organization doesn't require review, the skill is published to the library and available to everyone in your organization to install. If your organization has security scanning turned on, the skill isn't listed for others until it passes the scan, which usually takes a few minutes.

Once published, the skill is managed by your organization. To update it, publish again. The new version goes through the same review, and everyone who uses the skill stays on the approved version until the update is approved.

---

## Use skills shared with you

On Team and Enterprise plans, your skills list in **[Customize > Skills](https://claude.ai/customize/skills)** is organized into three sections:

- **Personal skills:** Skills you've created or uploaded yourself.

- **Shared with you:** Skills colleagues have shared with you directly. These stay off until you turn them on.

- **Organization skills:** Skills published to your organization and skills your owner has provisioned. You install these from the directory rather than enabling them from the list.

### Enable a skill shared with you directly

1. Find the skill in the **Shared with you** section of your skills list.

2. Toggle it on.

You can toggle the skill off again at any time, or delete it from your list entirely if you don't want it.

### Install a skill from your organization's directory

1. In Cowork, click **Customize** in the left sidebar, then click the "+" button to open the directory.

2. Click the **Skills** tab.

3. Find the skill you want and click "Install."

Skills you install from the directory can be toggled off, which removes them from your sidebar. They remain in the directory so you can re-enable them later. For more on browsing the directory, see **[Browse skills, connectors, and plugins in one directory](https://support.claude.com/en/articles/14328846-browse-skills-connectors-and-plugins-in-one-directory)**.

---

## Use skills in Microsoft 365 add-ins

Skills you've enabled in your Claude settings are also available in the Claude for Excel, PowerPoint, Word, and Outlook add-ins. Claude applies relevant skills automatically while you work—you don't need to invoke them separately.

**How triggering works in the add-ins:**

- Type `/` in the sidebar to see available skills and select one (for example, `/debug` or `/deck-check`).

- Or describe your task naturally—Claude recognizes when a skill applies and uses it.

Claude adapts skills to the surface it’s in. A research skill may produce a Word document in Cowork, but detailed data breakdowns in Excel. Some skills may work better on one surface than others. If you let Claude work across apps, Claude can orchestrate another app to apply the skill. If you build a skill with a specific Excel or PowerPoint template, Claude for Excel and Powerpoint can load that template exactly into the current open file.

---

## Use skills in Claude Code

Skills you've enabled in your Claude settings also load in Claude Code in your terminal when you sign in with the same Claude account. This includes skills you created or turned on and skills an owner provisioned for your organization. It needs Claude Code v2.1.273 or later.

Run `/skills` in Claude Code to see them listed under **claude.ai sync**.

- Skills sync when a Claude Code session starts, then check for changes about every 10 minutes.

- The sync is one-way. It reads from your Claude account and never changes anything in it.

- Skills don't sync when Claude Code is signed in with an API key or runs on a cloud provider such as Amazon Bedrock.

To stop skills from syncing, set `syncClaudeAiSkills` to `false` in your Claude Code settings. Learn more about **[how synced skills behave](https://code.claude.com/docs/en/skills#how-synced-skills-behave)** in the Claude Code docs.

---

## Manage your skills

### View your skills

All your skills are listed in **[Customize > Skills](https://claude.ai/customize/skills)**. You can see:

- Anthropic skills (created, tested, and maintained by Anthropic)

- Custom skills you've uploaded

- When each skill was enabled or uploaded

- A brief description of what each skill does

### Enable/disable your skills

Toggle any skill on or off using the switch next to it. Disabled skills won't be available to Claude.

### Delete custom skills

To remove a custom skill you've uploaded:

1. Navigate to **[Customize > Skills](https://claude.ai/customize/skills)**.

2. Find the skill in your skills list and click on it to view the details.

3. Use the toggle in the upper right corner to disable the skill.

4. To delete the custom skill entirely, click the "..." button next to the toggle, then select "Delete":

  

5. Click "Delete" in the confirmation prompt.

If you change your mind, you can add the skill again by re-uploading the file.

---

## Privacy and security details

For Team and Enterprise plans, organization owners can provision skills for all users through organization settings. Individuals can share skills with colleagues if an owner has enabled sharing, or publish them to the organization if an owner has turned on publishing. On all other plans, each person uploads skills to their own account.

Note that skills may include, or instruct Claude to install, third-party packages and software for Claude to use when completing a task. See **[our guidance on Claude's container environment](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude#h_0ee9d698a1)** for details on Claude's container environment and **[the API documentation](https://docs.claude.com/en/docs/agents-and-tools/tool-use/code-execution-tool#containers)** for API's container environment.

**Note:** If you're on the Enterprise plan and your organization has skill scanning turned on, each third-party skill you upload or edit is checked for malicious content before it can run. Most scans finish in about one to two minutes. If a skill is blocked, you can't use it until you fix what was flagged and upload it again. Learn more about **[skill and plugin scanning](https://support.claude.com/en/articles/15927065)**.

### What are the primary risks of using skills?

The most significant risks are prompt injection, which allows Claude to be manipulated to execute unintended actions, and data exfiltration, caused by malicious package code or prompt-injected data leaks. We’ve implemented several mitigations to these risks. Refer to **[our security considerations for code execution](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude#h_0ee9d698a1)** for more information.

**Important:** Only install skills only from trusted sources.

When installing a skill from a less-trusted source—including one shared by a colleague—review it before enabling. Start by reading the contents of the files bundled in the skill to understand what it does, paying particular attention to code dependencies and bundled resources like images or scripts. Similarly, pay attention to instructions or code within the skill that instruct Claude to connect to potentially untrusted external network sources.

---

## Troubleshooting

### Skills section not visible

Ensure code execution is enabled in **[Settings > Capabilities](https://claude.ai/settings/capabilities)** (Free, Pro, Max) or **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)** in the “Policy” tab (Team, Enterprise). Then navigate to **[Customize > Skills](https://claude.ai/customize/skills)** to access your skills. Skills require the code execution environment to function.

### Claude isn’t using a skill

- Verify the skill is toggled on in **[Customize > Skills](https://claude.ai/customize/skills)**.

- Check that the skill's description field clearly explains when it should be used.

- Ensure the skill's instructions are clear and well-structured.

- Try being more explicit in your request (e.g., "Use my brand guidelines skill to create a presentation").

### Can't create or upload a skill

On Team and Enterprise plans, an organization owner can turn off skill creation for users. If the option to create or upload a skill is missing, your organization may have **User-created skills** turned off, or—on Enterprise plans with custom roles—your role may not include the **Create skills** capability. You can still enable and use skills your owner has provisioned. Contact your organization owner if you need to create your own.

### Skills greyed out

If skills appear greyed out, code execution may be disabled at the organization level (for Team and Enterprise plans) or individually. Check with your organization's Owner (Team, Enterprise) or make sure to enable code execution in **[Settings > Capabilities](https://claude.ai/settings/capabilities)** (Free, Pro, Max).

### Upload errors

Common reasons for upload failures:

- ZIP file exceeds size limits

- Skill folder name doesn't match the skill name

- Missing required skill.md file

- Invalid characters in skill name or description

### Group doesn't appear when I try to share a skill

The group needs the **Share resources with this group** visibility setting turned on by an organization owner. Contact your organization owner if a group you expect to see is missing.

### Share button not visible

The **Skill sharing** toggle is on by default for Team plans and for Enterprise plans that haven't set a skills preference. For organizations with HIPAA readiness or other regulated configurations, skills and skill sharing are off by default and an admin can enable them. The **Share with organization** and **Share with groups** toggles are also off by default. An owner must navigate to **[Organization settings > Skills](https://claude.ai/admin-settings/skills)** and enable at least one of the toggles before the "Share" button appears. If your organization uses custom roles, your role must also have the **Share skills with groups** capability enabled. If you don't see the option to share, check with your organization owner.

### "Publish to org" button not visible

Your organization's **Publishing** setting may be turned off, or the skill may not be one you created. You can't publish skills that were shared with you, Anthropic's built-in skills, or skills you installed from your organization's library. If it's your own skill and you don't see the button, check with your organization owner.

---

## Best practices

**Start simple.** Begin with Anthropic's pre-built skills to understand how they work before creating custom skills.

**Be specific.** Write clear descriptions when writing custom skills. A specific description tells Claude when to invoke your skill.

**Test your skills.** After uploading a custom skill, test it with a few different prompts to ensure it works as expected.

**Organize by purpose.** Create separate skills for different purposes rather than a single skill that’s meant to do everything.

---

## Learn more about using skills

For more information and video demonstrations, refer to **[Teach Claude your way of working using skills](https://claude.com/resources/tutorials/teach-claude-your-way-of-working-using-skills).**
---

SOURCE: https://support.claude.com/en/articles/12512198-how-to-create-custom-skills

# How to create custom skills

Skills are available for users on Free, Pro, Max, Team, and Enterprise plans. This feature requires **[code execution to be enabled](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude#h_1c99382190)**. Skills are also available in beta for Claude Code users and for all API users using the code execution tool.

Custom skills let you enhance Claude with specialized knowledge and workflows specific to your organization or personal work style. This article explains how to create, structure, and test your own skills.

Skills can be as simple as a few lines of instructions or as complex as multi-file packages with executable code. The best skills:

- Solve a specific, repeatable task

- Have clear instructions that Claude can follow

- Include examples when helpful

- Define when they should be used

- Are focused on one workflow rather than trying to do everything

---

## Record a skill

Recording a skill is available on Pro, Max, and Team plans, in Cowork in Claude for Mac. It isn't available in chat, on Windows, or on Free and Enterprise plans.

Instead of writing a skill by hand, you can record yourself doing a task and let Claude build the skill from what it observes. You send Claude a video of your screen, clicks, typing, and voice, and Claude proposes a skill for you to review before you save it.

### Before you record

1. Update to the latest version of Claude for Mac.

2. Grant the macOS permissions Claude asks for the first time you record: **Accessibility** for mouse and keyboard tracking, and **Screen recording** for screen visibility. macOS may ask you to restart Claude.

3. Close any files, apps, or conversations you don't want captured.

**Warning:** Don't type passwords or secrets, or display sensitive information or private conversations while recording. Everything on your screen is captured for the length of the session, along with anything you say.

### Record your workflow

1. Open Cowork in Claude for Mac.

2. Start a recording one of two ways:

  1. Click the "+" button in the composer, then select "Record a skill."

  2. Go to **[Customize > Skills](https://claude.ai/customize/skills)**, click "Add," then select "Record your screen."

3. Click "Start recording." To narrate as you work, leave the microphone on. Use the microphone control to mute it or choose a different input.

4. Do the task the way you normally would. The capture bar shows that recording is in progress and counts the steps it's captured.

5. Click "Done" when you're finished, or "Discard" to throw the recording away without creating anything.

A recording can run for about 10 minutes. A countdown appears in the capture bar when you have about a minute left. When it reaches zero, recording stops and everything you've captured up to that point is sent to Claude, the same as if you'd clicked "Done."

**Tip:** Talk through what you're doing while you record. Narration gives Claude context it can't get from your screen alone, like why you skip a step or how you choose between two options.

### What happens after you click Done

Claude starts a Cowork task and reviews the recording, then proposes a skill. Depending on what it finds, you'll see one of two things:

- **A new skill,** marked **NEW** on the proposal card. Click "Save" to keep it, or "Dismiss" to discard the proposal.

- **An update to an existing skill.** If the recording overlaps a skill you already have, Claude proposes changes to that skill instead. The card shows which skill the proposal is based on. Click "Update" to apply the changes, or "Dismiss" to discard them.

Expand **Content** on the proposal card to read the skill before you decide.

Skills you save from a recording appear in **[Customize > Skills](https://claude.ai/customize/skills)** and work like any other skill. You can edit them, share them, and delete them on the same terms.

### What's kept from a recording

The video and audio from your recording aren't retained. After you send your recording to Claude, Claude reviews the recording to build the skill. What's saved afterward is a set of screenshots from the session, which you can view by expanding the **Recorded demonstration** step in the task.

Because those screenshots live in the Cowork task, deleting the task removes them. See **[Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)** for how task deletion and retention work.

---

## Create a skill.md file

Every skill consists of a directory containing at minimum a skill.md file, which is the core of the skill. This file must start with a YAML frontmatter to hold name and description fields, which are required metadata. It can also contain additional metadata, instructions for Claude or reference files, executable scripts, or tools.

### Required metadata fields

**name:** A human-friendly name for your skill (64 characters maximum)

- **Example:** Brand Guidelines

**description:** A clear description of what the skill does and when to use it.

- This is critical—Claude uses this to determine when to invoke your skill (200 characters maximum).

- **Example:** Apply Acme Corp brand guidelines to presentations and documents, including official colors, fonts, and logo usage.

### Optional metadata fields

**dependencies:** Software packages required by your skill.

- **Example:** python>=3.8, pandas>=1.5.0

The metadata in the skill.md file serves as the first level of a progressive disclosure system, providing just enough information for Claude to know when the skill should be used without having to load all of the content.

### Markdown body

The markdown body is the second level of detail after the metadata, so Claude will access this if needed after reading the metadata. Depending on your task, Claude can access the skill.md file and use the skill.

### Example skill.md

**Brand guidelines skill**

```
## Metadata
name: Brand Guidelines
description: Apply Acme Corp brand guidelines to all presentations and documents

## Overview
This skill provides Acme Corp's official brand guidelines for creating consistent, professional materials. When creating presentations, documents, or marketing materials, apply these standards to ensure all outputs match Acme's visual identity. Claude should reference these guidelines whenever creating external-facing materials or documents that represent Acme Corp.

## Brand Colors

Our official brand colors are:
- Primary: #FF6B35 (Coral)
- Secondary: #004E89 (Navy Blue)
- Accent: #F7B801 (Gold)
- Neutral: #2E2E2E (Charcoal)

## Typography

Headers: Montserrat Bold
Body text: Open Sans Regular
Size guidelines:
- H1: 32pt
- H2: 24pt
- Body: 11pt

## Logo Usage

Always use the full-color logo on light backgrounds. Use the white logo on dark backgrounds. Maintain minimum spacing of 0.5 inches around the logo.

## When to Apply

Apply these guidelines whenever creating:
- PowerPoint presentations
- Word documents for external sharing
- Marketing materials
- Reports for clients

## Resources

See the resources folder for logo files and font downloads.
```

## Add resources

If you have too much information to add to a single skill.md file (e.g., sections that only apply to specific scenarios), you can add more content by adding files within your skill directory. For example, add a REFERENCE.md file containing supplemental and reference information to your skill directory. Referencing it in skill.md will help Claude decide if it needs to access that resource when executing the skill.

## Add scripts

For more advanced skills, attach executable code files to skill.md, allowing Claude to run code. For example, our document skills use the following programming languages and packages:

- Python (pandas, numpy, matplotlib)

- JavaScript/Node.js

- Packages to help with file editing

- Visualization tools

**Note:** Claude and Claude Code can install packages from standard repositories (Python PyPI, JavaScript npm) when loading skills. It’s not possible to install additional packages at runtime with API Skills—all dependencies must be pre-installed in the container.

---

## Package your skill

Once your skill folder is complete:

1. Ensure the folder name matches your skill's name.

2. Create a ZIP file of the folder.

3. The ZIP should contain the skill folder as its root (not a subfolder).

**Correct structure:**

my-skill.zip

└── my-skill/

├── skill.md

└── resources/

**Incorrect structure:**

my-skill.zip

└── (files directly in ZIP root)

---

## Test your skill

### Before uploading

1. Review your skill.md for clarity.

2. Check that the description accurately reflects when Claude should use the skill.

3. Verify all referenced files exist in the correct locations.

4. Test with example prompts to ensure Claude invokes it appropriately.

### After uploading to Claude

1. Enable the skill in **[Customize > Skills](https://claude.ai/customize/skills)**.

2. Try several different prompts that should trigger it.

3. Review Claude's thinking to confirm it's loading the skill.

4. Iterate on the description if Claude isn't using it when expected.

When you're iterating on a skill with Claude in chat, you can edit the skill files directly where they open beside the conversation. Highlight the text you want changed, click "Edit with Claude," and type your request. For skills with multiple files, leave edit requests across the files and send them together, and Claude applies them in one pass. Learn more about **[editing artifacts](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them#h_9cbf05e668)**.

**Note for Team and Enterprise plans:** To make a skill available to all users in your organization, see **[Provision and manage skills for your organization](https://support.claude.com/en/articles/13119606-provisioning-and-managing-skills-for-your-organization)**.

---

## Best practices

**Keep it focused:** Create separate skills for different workflows. Multiple focused skills compose better than one large skill.

**Write clear descriptions:** Claude uses descriptions to decide when to invoke your skill. Be specific about when it applies.

**Start simple:** Begin with basic instructions in Markdown before adding complex scripts. You can always expand on the skill later.

**Use examples:** Include example inputs and outputs in your skill.md file to help Claude understand what success looks like.

**Test incrementally:** Test after each significant change rather than building a complex skill all at once.

**Skills can build on each other:** While skills can't explicitly reference other skills, Claude can use multiple skills together automatically. This composability is one of the most powerful parts of the skills feature.

**Review the open Agent Skills specification:** Follow the guidelines at **[agentskills.io](http://agentskills.io)**, so skills you create can work across platforms that adopt the standard.

For a more in-depth guide to skill creation, refer to **[Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)** in our Claude Docs.

---

## Security considerations

- Exercise caution when adding scripts to your skill.md file.

- Don't hardcode sensitive information (API keys, passwords).

- Review any skills you download before enabling them.

- Use appropriate MCP connections for external service access.

---

## Example skills to reference

Visit our repository on GitHub for example skills you can use as templates: **<https://github.com/anthropics/skills/tree/main/skills>**.
---

SOURCE: https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization

# Provision and manage skills for your organization

This article explains how organization owners can provision skills for everyone in their organization, and how to scope skills to specific groups using plugins. Provisioning skills lets you distribute approved workflows and capabilities across your organization from one place.

Organization-wide skill management is available to Team and Enterprise plans.

## Prerequisites

Before you can provision skills for your organization, navigate to **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)**, select the “Policy” tab, and check that both **Cloud code execution and file creation** and **Skills** are toggled on. Skills require code execution to function, so if code execution is disabled, skills will not be available.

---

## Provision skills for everyone

When you upload a skill through organization settings, it becomes available to everyone in your organization in **[Customize > Skills](https://claude.ai/customize/skills)**. Individual users no longer need to upload the same skill themselves. Provisioned skills also load in Claude Code for users who sign in with their Claude account. To stop skills from syncing to Claude Code, set `syncClaudeAiSkills` to `false` in Claude Code managed settings.

**To provision a skill:**

1. Navigate to **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)**.

2. Click "Add” in the upper right corner.

3. Choose “Upload a skill” or “Create a skill.”

4. If uploading, select a .zip file containing your skill (must include a SKILL.md file).

5. If creating, input the skill name and description in the modal, then click “Create.”

6. The skill is immediately provisioned to all users in your organization.

Owner-provisioned skills are enabled by default for everyone, but users can toggle individual skills off if they choose. This gives your organization consistent, approved workflows while letting users customize their own experience.

---

## Provision skills to specific groups

Provisioning a skill through **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)** gives it to everyone. Enterprise plans can give skills to only some users by bundling them into a plugin and assigning that plugin to a group. The group's members see those skills, and members outside the group don't.

For example, if you have 10 skills for your marketing team, add them to a plugin and assign it to the marketing group. Only that group gets those skills.

Skills provisioned this way appear in chat (on the web and the "Chat" tab in Claude Desktop), in Claude Cowork, and in Claude Code in the terminal for users who sign in with their Claude account. Group targeting you've already set up for Cowork carries over to chat with no extra steps.

To set this up, see **[Manage plugins for your organization](https://support.claude.com/en/articles/13837433)**.

---

## Control whether users can create skills

By default, users can create their own skills in Claude and upload skill files to their personal skills list. If you'd rather users only use skills you've provisioned, you can turn this off for your organization.

To turn off skill creation for users:

1. Navigate to **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)** and click the “Policy” tab.

2. Turn off **User-created skills**.

When **User-created skills** is off:

- Users can't create skills in Claude or upload skill files.

- Skills you've provisioned and Anthropic's built-in skills stay available, and users can still enable and use them.

**Note:** If your organization uses custom roles, a user also needs the **Create skills** capability on their role. The organization setting is the main switch: when it's off, users can't create or upload their own skills, regardless of role, but Owners can still provision skills for the organization. When it's on, Enterprise plan users on custom roles still need the role capability. Learn more about **[managing custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452)**.

---

## Let users publish skills and plugins to your organization

Users can submit a skill or plugin they've built to your organization's library so everyone can use it. When your organization requires review, an owner approves each submission before it's published, and every later version goes through the same review.

### Set the publishing policy

1. Navigate to **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)** and select the “Policy” tab.

2. Under **Publishing**, choose an option:

  - **Requires review:** Users can submit skills and plugins, and an owner must approve each one before it's published.When submitting, the user proposes how the item is offered. You can accept or change that when you approve.

  - **Open:** Skills and plugins that users submit are published to the organization library without review, and are available to everyone in your organization to install. Users can't choose a different offering. On Enterprise plans with **[Skill and plugin security scanning](https://support.claude.com/en/articles/15927065)** on, a new item isn't listed for others until it passes the scan, which usually takes a few minutes.

  - **Off:** Users don't see the "Publish to org" button. Owners can still add skills and plugins to the organization directly.

Your starting setting depends on your plan:

- **Team plans:** Publishing is set to “Open,” unless you already had **Share with organization** turned off, in which case “Off” is the default.

- **Enterprise plans:** Publishing starts off.

  - If your organization already had **Share with organization** turned on, it starts as “Open” instead.

  - If you haven't chosen a setting, it switches to “Requires review” on October 2, 2026. To keep publishing off, or to choose a different setting, select it yourself before then.

Turning **Publishing** off doesn't remove anything that's already published. Published items stay in the library until an owner removes them.

### Review a submission

Owners, and anyone whose role has Libraries set to “Can manage,” can review requests. You can't approve your own.

**To review a submission:**

1. Navigate to **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)** and select the “Requests” tab.

  - Plugin and skillsubmissions appear here, and each request shows who submitted it, whether it's a skill or plugin, its security scan result, and its status. If a submission looks like a skill or plugin your organization already has, a **Possible duplicate** tag appears next to it.

2. Open a request. You'll see:

  - How the item will be offered

  - The scan result

  - Every file

  - For an update, what changed since the currently published version

  - Up to three possible duplicates, if any, each with a reason and a link

3. Choose how the item is offered and who gets it: everyone or specific groups. The submitter's proposed offering is preselected, and you can change it. Then click "Approve" to publish it, or click "Request changes" and add a note for the person who submitted it.

Keep these points in mind when reviewing:

- **You review a fixed version.** You see exactly the version that was submitted. The author can keep editing their own copy, but those edits don't reach the organization until they submit a new version and it's approved.

- **Possible duplicate hints are a note, not a block.** Only reviewers see them. They don't stop you from approving a submission, and the person who submitted it doesn't see them. No setup is needed. Duplicate checks don't run for organizations with HIPAA, zero data retention, FERPA, or customer-managed keys.

- **For Enterprise plans, submitted versions are scanned.** For Enterprise plans with **Skill and plugin security scanning** enabled, each version is checked for malicious content automatically. A submission that fails the scan can't be approved until the author fixes it and submits again. Learn more about **[skill and plugin scanning](https://support.claude.com/en/articles/15927065)**.

### Manage published skills and plugins

Every approved item is listed on the “Inventory” tab in **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)**. To see only your organization's items, set the **Source** filter to “Your organization."

Click the menu button at the end of a row to:

- View details and files

- View version history

- Choose how the item is offered under Default access (Available to install, Installed by default, Not available, or Required)

- Set access for specific groups under “Group access…”

- Copy a link to share with users

The “Inventory” tab also lists skills and plugins that users created or shared.

When you approve a new version, everyone who uses the item gets the update automatically. Until then, users stay on the currently approved version.

Published items are managed by your organization. If the author leaves, the published item stays in the library.

---

## Control skill sharing between users

In addition to provisioning skills top-down, you can let users share skills or plugins they've built with each other. Two independent toggles control this:

- **Skill sharing:** Users can share a skill or plugin with specific colleagues. Recipients see the skill in the **Shared with you** section of their skills list.

- **Share with groups:** Users can share a skill or plugin with an entire group. Recipients see it in the **Shared with you** section of their skills list, the same as items shared with individuals.

To let users add skills and plugins to the organization library, use the **Publishing** setting. Learn more about **[letting users publish skills and plugins to your organization](#h_1abc45a27c)**.

The **Skill sharing** toggle is on by default for Team plans and for Enterprise plans that haven't set a skills preference. For organizations with HIPAA readiness or other regulated configurations, skills and skill sharing are off by default and an admin can enable them in **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)** in the “Policy” tab. The **Share with groups** toggle is also off by default and can be enabled by an admin.

**Note:** Shared skills and plugins are view-only, and stay off until the recipient chooses to enable them. Recipients can enable and use a shared skill or plugin but can't edit its contents. When the owner saves a new version, everyone it's shared with gets the update automatically at next use. The owner can revoke someone's access at any time, and access is removed automatically if the recipient leaves the organization.

### Share skills with a group

Before you can share with a group, an admin needs to turn on **Share resources with this group** in the group's visibility settings. See **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**.

If you use custom roles, also make sure the **Share skills with groups** capability is enabled for their role. See **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452)**.

Once these settings are on, users can begin sharing skills with groups.

### How shared skills differ from provisioned skills

|                               | **Owner-provisioned**  | **Shared peer-to-peer**               | **Published to the organization**                | **Shared with a group**               |
| ----------------------------- | ---------------------- | ------------------------------------- | ------------------------------------------------ | ------------------------------------- |
| **Who can share**             | Owners only            | Any user (if enabled)                 | Any user (if Publishing is on)                   | Any user (if enabled)                 |
| **Where it appears**          | Everyone's skills list | Recipient's "Shared with you" section | Organization library                             | Recipient's "Shared with you" section |
| **Can recipients remove it?** | Disable only           | Disable or delete                     | Depends on how an owner offers it                | Disable only                          |
| **Requires owner approval?**  | Owner uploads directly | No                                    | Yes, when Publishing is set to “Requires review” | No                                    |

**Important:** When Publishing is set to “Open,” anything a user publishes goes straight to the organization library without review and is available to everyone in your organization Choose “Requires review” if you want an owner to check each skill and plugin first.

### Monitor sharing activity

Skill sharing events are captured in the audit log and Compliance API as `role_assignment` events. You can see who shared a skill or plugin, with whom, and whether it was peer-to-peer, a group, or (skills only) organization-wide.

The audit log doesn't capture the contents of shared skills or plugins—only the share event itself. The “Inventory” tab shows metadata, sharing status, and scan status for skills and plugins that users created or shared, but not their contents.

---

## How users see provisioned and shared skills

Skills appear for each user in **[Customize > Skills](https://claude.ai/customize/skills)**, organized into three sections:

- **Personal skills:** Skills the user has created or uploaded.

- **Shared with you:** Skills colleagues have shared directly with a user. These appear grayed out until enabled.

- **Organization skills:** Skills an owner has provisioned and skills published to the organization. Users install these from the directory.

Owner-provisioned skills are marked with a visual indicator so users can distinguish them from other skill types. Users can click on any skill to preview its contents and description.

For more on how users browse and install from the directory, see **[Browse skills, connectors, and plugins in one directory](https://support.claude.com/en/articles/14328846-browse-skills-connectors-and-plugins-in-one-directory)**.

---

## Manage and remove provisioned skills

The “Inventory” tab in **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)** lists all skills provisioned for your organization. Set **Source** to “Your organization” and **Type** to “Skills,” or search by name. To remove a skill, click the menu button at the end of its row and select “Remove from library.” Once removed, the skill will no longer appear in users' skills lists in **[Customize > Skills](https://claude.ai/customize/skills).**

**Note:** Only owners can add or remove organization-wide skills. Individual users cannot delete provisioned skills, though they can toggle them off for their own use.

---

## Scan skills and plugins for malicious content

On the Enterprise plan, you can turn on skill scanning for your organization. When it's on, Claude checks each third-party skill and plugin your users upload or edit for malicious content before it can run. Scanning is off by default until October 2, 2026. From that date it's on by default, where available, for Enterprise organizations that haven't set it. Organizations that already turned it on or off keep their choice.

To turn on skill scanning for your organization:

1. Go to **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)** and select the “Policy” tab.

2. Turn on **Skill and plugin security scanning**.

If you use custom roles, you can further define who scanning applies to by turning on the **Skill and plugin security scanning** capability for roles that should have access to skill scanning.

Here's what your users see:

- A skill or plugin that passes the scan installs normally.

- A skill or plugin that may carry risk stays usable behind a caution banner the user acknowledges.

- A skill or plugin with malicious content is blocked and can't be used.

A blocked skill can't be overridden by the user who uploaded it, and can't be approved for the organization at this time. Scanning isn't available for organizations using customer-managed encryption keys (CMEK), zero data retention (ZDR), or HIPAA configurations. Learn more about **[skill and plugin scanning](https://support.claude.com/en/articles/15927065)**.

---

## Best practices

- **Test skills before provisioning:** Upload and test skills on your own account first to verify they work as expected before distributing them organization-wide.

- **Scope specialized skills to groups:** When a skill is only relevant to one team, bundle it into a plugin and assign it to that group instead of provisioning it to everyone.

- **Use descriptive names:** Give skills clear names that help users understand their purpose at a glance.

- **Write clear descriptions:** The skill's description helps Claude determine when to use it automatically. Ensure descriptions accurately reflect what the skill does.

- **Consider default status carefully:** Enable skills by default when they're broadly useful to most users. Keep specialized skills disabled by default for the users who don't need them.

- **Decide on publishing deliberately:** Set Publishing to “Requires review” if you want an owner to check skills and plugins before they reach everyone.
---

SOURCE: https://support.claude.com/en/articles/15927065-get-started-with-skill-and-plugin-scanning

# Get started with skill and plugin scanning

Skill and plugin scanning automatically checks third-party skills and plugins for malicious content when someone uploads or edits them, before they can run in your organization. This article explains what scanning checks for, how to turn it on, and what the results mean.

Skill and plugin scanning is available on Enterprise plans in Claude, Claude Cowork, and Enterprise plugin marketplaces.

## What skill and plugin scanning does

Skills and plugins can come from outside your organization, and a file that looks helpful could be built to quietly misuse the access it's given. Skill and plugin scanning adds a security check at the moment a third-party skill or plugin is uploaded or edited. Claude reviews the contents, looks for signs of malicious behavior, and returns one of three results: pass, warn, or fail.

Scanning runs in the background, and most scans finish in about one to two minutes. Results are cached, so uploading the same skill again returns a result almost instantly.

## What gets scanned

Scanning applies to third-party skills and plugins that a member or owner uploads. This includes standalone skills, plugins, and the skills bundled inside a plugin.

Scanning doesn't apply to:

- Skills and plugins that were already in your organization before scanning was turned on. Existing skills and plugins keep working, so nothing you already use stops working when you enable scanning.

- Skills you create with Claude, which rely on Claude's built-in safeguards.

- Skills shared through a connected MCP server. These follow the same trust model as other MCP tools and aren't covered by scanning.

- MCP servers and hooks, which aren't scanned at this time.

- Organizations using customer-managed encryption keys (CMEK), zero data retention (ZDR), or HIPAA configurations. These organizations install skills and plugins the same way they do today, without the added scan.

## Turn on skill and plugin scanning

Skill and plugin scanning is off by default until October 2, 2026, when it turns on for Enterprise organizations that haven't set it. Owners and Primary Owners can turn it on for their organization in their settings:

1. Go to **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)** and select the “Policy” tab.

2. Turn on **Skill and plugin security scanning**.

Once it's on, every new skill and plugin upload or edit in your organization is scanned automatically, at no extra cost.

## Control which roles scanning applies to

Turning on skill and plugin scanning in organization settings applies it across your whole organization. If you use custom roles, you can further define who scanning applies to. When you create or edit a custom role, turn on the **Skill and plugin security scanning** capability for roles that should have access to skill scanning. Learn more about **[managing custom roles](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

## What you'll see after an upload

Admins can also see each item's scan result in the “Inventory” and “Requests” tabs in **[Organization settings > Plugins & skills](https://claude.ai/admin-settings/skills)**.

### Pass

If nothing concerning is found, the skill or plugin installs normally, with no extra message.

### Warn

A warn result means Claude couldn't fully verify the skill or plugin, and it may carry risk depending on where it came from. It stays usable behind a caution banner that you acknowledge before continuing. Review it carefully, and only use it if you trust the source.

### Fail

A fail result means the scan detected malicious content. The skill or plugin is blocked and can't be used. The banner explains the specific reason it was flagged.

## If your skill or plugin is blocked

A blocked skill can't be overridden by the person who uploaded it, and admins can't approve a blocked skill for the organization at this time.

If you think a skill was blocked by mistake, edit and upload it again. Uploading the same skill again without changes returns the same result, so any fix needs to address what was flagged.

## How your content is handled

When a skill or plugin is scanned, its contents are processed in a secure, isolated environment that's kept separate from your normal Claude sessions. The scanned copy is deleted after the scan finishes, and only the result and basic metadata are kept.

**Note:** Scanning runs outside your normal Claude session, so it doesn't change how Claude responds to you.

## What scanning doesn't cover

Skill scanning looks for one kind of risk: third-party skills and plugins that are built to misuse the access they're given, such as quietly moving your data somewhere it shouldn't go. A pass result means the scan didn't find that kind of threat. It isn't a guarantee that a skill is safe in every respect, and it won't catch a skill that behaves in ways you didn't intend without being malicious.

Because of that, choose what you add carefully, and install skills and plugins only from sources you trust.