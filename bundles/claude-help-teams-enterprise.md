
---

SOURCE: https://support.claude.com/en/articles/10276682-important-considerations-before-enabling-single-sign-on-sso-and-jit-scim-provisioning

# Important considerations before enabling single sign-on \(SSO\) and JIT/SCIM provisioning

Before setting up SSO for your Claude or Claude Console organization, review this guide to understand key concepts, plan your approach, and complete any prerequisite steps.

## Understanding parent organizations

Our single sign-on feature uses the concept of a "parent organization." This is an entity that stores SSO settings that can be shared across multiple Claude or Console organizations. Your plan type determines whether or not you have a parent organization by default:

| **Plan type**   | **Parent organization**                                |
| --------------- | ------------------------------------------------------ |
| Enterprise plan | Created automatically when the organization is set up  |
| Team plan       | Created when SSO is enabled for the first time         |
| Claude Console  | Not created automatically; requires action (see below) |

### Key things to know

- **Domain verification is required before you can configure SSO.** Domains are verified at the parent organization level. Once a domain is verified, other parent organizations can't claim it.

- **Multiple organizations can be linked to the same parent organization** to share domain verification and SSO configuration. This is useful if you have both Claude (Team/Enterprise plans) and Console organizations.

- **Each parent organization can only be linked to one Identity Provider.** This means that every organization linked to a single parent organization must be managed through the same IdP.

- **Enabling group mappings** allows you to control which users are provisioned to which organizations under your parent, and with which roles. See **[Configure groups and assign users in your IdP](https://support.claude.com/en/articles/13133195-setting-up-jit-or-scim-provisioning#h_0178209cfa)** for details.

- **Parent organizations manage identity and access only**—specifically, domain verification, SSO configuration, and user provisioning. Billing, invoicing, and usage tracking are handled at the individual organization level and aren't affected by parent organization relationships.

### What this means for you

You'll need to check the parent organization dynamic depending on your plan:

- **If you have a Team or Enterprise plan:** You can proceed directly to the **[Setting up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso)** guide. Your parent organization is already in place (or will be created when you enable SSO for Team plans).

- **If you have a Claude Console organization and an existing Team or Enterprise plan:** Your Console organization may already be linked to your Team or Enterprise parent organization. Check if you can access **[platform.claude.com/settings/identity](http://platform.claude.com/settings/identity)**. If so, this indicates that the org is linked to the parent organization and SSO is already configured. If not, an Owner on your Team or Enterprise plan can initiate a merge to link your Console organization (see **[Merge organizations](#h_3bad8701c8)** below) to their parent organization and the existing SSO configuration.

- **If you have a Claude Console organization without a Team or Enterprise plan:** **[Contact our Sales team](https://claude.com/contact-sales)** to request a parent organization for your Console account. Once we create your parent organization, you'll see the Identity settings page in Claude Console and can proceed with SSO setup.

---

## Merge organizations

Team or Enterprise organizations can invite other organizations to join an existing parent organization and share SSO configuration.

**Important:** The **Merge Organizations** option is only available on Claude (claude.ai). Console organizations can't initiate a merge; they must be invited by a Team or Enterprise organization.

### Requirements for merging

- The Team or Enterprise organization initiating the proposal must have verified domains in their parent organization.

- All members in the organization being invited must have email addresses matching those verified domains.

- An Admin (Console) or Owner (Claude) for the invited organization needs to approve the merge.

- The organization being invited can't already belong to another parent organization.

**Note:** If an organization you want to invite doesn't appear in the invite list, it may already belong to its own parent organization with separate verified domains and SSO. **[Contact support](https://support.claude.com/en/articles/9015913-how-to-get-support)** to have it detached from its current parent. Detaching clears that organization's existing domain verification and SSO/SCIM configuration, so confirm its admins are aware before you request it.

### To initiate a merge proposal

1. Navigate to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

2. Click "Invite" under **Merge Organizations**.

3. Select the organization you want to invite and click "Next."

4. Review the member count and click "Invite."

5. The merge proposal will be sent to the invited organization's Admins/Owners, with the email subject “*Parent Organization Update: New Member Organization Proposed*,” and must be approved within 14 days.

**Note:** If the person initiating the merge is also an Admin/Owner in the invited organization, only one approval is required.

### To approve a merge proposal

An organization Owner or Primary Owner needs to go to **[claude.ai/settings/join-proposal](https://claude.ai/settings/join-proposal)** to accept the merge.

Once a Console organization is merged, it gains access to the **[Identity and access page](http://platform.claude.com/settings/identity)**, in the Organization settings, to configure SSO and provisioning settings.

---

## Authentication

You'll find settings you can use to configure SSO in the **Authentication** section. This is where you configure the primary SSO connection and policies that apply across multiple joined Claude or Console organizations.

---

## Restrict new organization creation

Once your organization's domains are verified, owners will see a **Restrict organization creation** toggle under **Security** on the Organization and access page. Toggle this on to prevent users from creating new Claude or Console organizations, including personal accounts, using any of your verified domains.

---

## Provisioning options

Once SSO is configured, you can choose how users are provisioned to your organization.

| **Provisioning method** | **Team plan** | **Enterprise plan** | **Console org** |
| ----------------------- | ------------- | ------------------- | --------------- |
| Invite only             | ✓             | ✓                   | ✓               |
| JIT                     | ✓             | ✓                   | ✓               |
| SCIM                    | ✗             | ✓                   | ✓\*             |

***Note:** Only Enterprise plan organizations can enable SCIM provisioning; if a Console organization is merged with a Team plan's parent organization, it won't have access to SCIM provisioning.

For detailed information on how each provisioning method works, see **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning)**.

---

## What happens to existing users when SSO is enabled

After enabling SSO for your organization, there are two distinct scenarios to consider for users who have individual accounts associated with your verified company domain:

### Users with existing Free/Pro/Team/Max accounts who ARE added to your SSO application

These users keep access to their existing Free/Pro/Team/Max accounts. They can toggle between the Team or Enterprise plan account and their previous accounts by clicking the profile icon with their initials in the bottom left corner.

### Users with existing Free/Pro/Team/Max accounts who are NOT added to your SSO application

- **If "Require SSO for Claude" is NOT enabled:** These users can still access their existing accounts using the "Continue with email" option.

- **If "Require SSO for Claude" IS enabled:** These users will be unable to access their existing Free/Pro/Team/Max accounts. Please note that these accounts are not deleted, but will be inaccessible as users are unable to log in via SSO.

---

## How to view existing Claude / Console accounts associated with your verified domain

To view or download information about your verified domains and their usage across Claude organizations:

1. Navigate to the **Organization and access** section in Claude (**[claude.ai/admin-settings/organization](https://claude.ai/admin-settings/organization)**) or the **Identity and access** section in Console (**[platform.claude.com/settings/identity](http://platform.claude.com/settings/identity)**).

2. Click “Domain memberships” in the **Domains** section.

3. Review the information or download details in CSV or JSON format.

---

## Recommended steps before implementing SSO

### Communicate clearly with your team

- Notify all employees about the upcoming migration to SSO.

- Provide a clear timeline for when the change will occur.

- Advise employees who won't be added to the SSO application to save or **[export their conversation history](https://support.claude.com/en/articles/9450526-how-can-i-export-my-claude-data)** if SSO will be enforced.

### Plan for a smooth transition

- Schedule the SSO implementation during a time that minimizes disruption.

- Ensure your IT team is prepared to support employees with the transition.

- Have a clear process in place for granting access to authorized users.

- If possible, implement both SSO and provisioning features at the same time.

Taking time to test, communicate, and plan before enabling domain verification and SSO will help ensure a successful transition and positive experience for your organization.

---

## Next steps

Once you've reviewed these considerations and completed any necessary prerequisite steps (such as merging organizations), proceed to **[Set up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso)** for detailed implementation instructions.
---

SOURCE: https://support.claude.com/en/articles/11139094-get-started-with-claude-for-education-at-your-university-for-owners-admins

# Get started with Claude for Education at your university \(for Owners/Admins\)

This guide helps Admins, Owners, and Primary Owners set up and manage Claude for Education at universities. Account users can find more information in our [FAQs for student, faculty, and other users](https://support.claude.com/en/articles/11139144-faqs-on-using-claude-for-education-at-your-university).

**K-12 educator?** Claude for Teachers is built for you. [Get started](https://claude.com/solutions/teachers).

---

## Get started

Before setting up your Claude for Education account, review these essential resources:

- [Important Considerations Before Enabling Single Sign-On (SSO) and JIT/SCIM Provisioning](https://support.claude.com/en/articles/10276682-important-considerations-before-enabling-single-sign-on-sso-and-jit-scim-provisioning)

- [Setting up Single Sign-On](https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso)

- [Setting up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-setting-up-jit-or-scim-provisioning)

Note the following information from [Important Considerations Before Enabling Single Sign-On (SSO) and JIT/SCIM Provisioning](https://support.claude.com/en/articles/10276682-important-considerations-before-enabling-single-sign-on-sso-and-jit-scim-provisioning):

When enforcing SSO on your Education account, there are two distinct categories to consider for existing users who are using their university email:

1. Users with existing Free/Pro/Team accounts who ARE added to your SSO application

  - These users will maintain access to their existing Free/Pro/Team accounts

  - They will have the ability to toggle between the Education account and their previous accounts by clicking the profile icon with their initials in the bottom left corner
​

2. Users with existing Free/Pro/Team accounts who are NOT added to your SSO application

  - If "Enforce SSO for Claude.ai" is NOT enabled: These users can still access their existing accounts using the "Continue with email" option

  - If "Enforce SSO for Claude.ai" IS enabled: These users will be unable to access their existing Free/Pro/Team accounts

    - Please note, these accounts are not deleted, but can no longer be accessed as the user is unable to login via SSO.

## Enable and use Education features

After getting started with your plan, choose which Education features you’d like use and configure them in your account:

- [Project visibility and sharing](https://support.claude.com/en/articles/9519189-project-visibility-and-sharing)

- [Setting Up Claude Integrations](https://support.claude.com/en/articles/10168395-setting-up-claude-integrations)

- [Enabling and Using Web Search](https://support.claude.com/en/articles/10684626-enabling-and-using-web-search)

Familiarize yourself with audit logs, data retention controls, and other administrative features:

- [How to Access Audit Logs](https://support.claude.com/en/articles/9970975-how-to-access-audit-logs)

- [Purchasing and managing seats on Enterprise plans](https://support.claude.com/en/articles/13393991-purchasing-and-managing-seats-on-enterprise-plans)

- [Custom Data Retention Controls](https://support.claude.com/en/articles/10440198-custom-data-retention-controls-for-enterprise-plans)

- [Managing user feedback settings on Team and Enterprise plans](https://support.claude.com/en/articles/10504844-managing-user-feedback-settings-on-team-and-enterprise-plans)

- [How can I disable public projects?](https://support.claude.com/en/articles/9927533-how-can-i-disable-public-projects)

## Set up support paths

Anthropic Support assists Primary Owners and Owners directly. See [How to Get Support](https://support.claude.com/en/articles/9015913-how-to-get-support) for more information on your support options.

Individual users should follow one of two paths to receive support:

1. Self-serve with our [Help Center](https://support.claude.com/en/).

2. Escalate questions through university support channels.

We recommend setting up a documented support channel for any user escalations prior to going live at your university.

In addition, share the [FAQs on using Claude for Education at your university](https://support.claude.com/en/articles/11139144-faqs-on-using-claude-for-education-at-your-university) to help users get started successfully.

## Privacy and data retention

Visit our [Privacy Center](https://privacy.claude.com/en/collections/10663361-commercial-customers) for comprehensive information about your account's data retention and handling. The Privacy Center includes:

- FAQs on Anthropic's policies

- Terms of service details

- Privacy controls information
---

SOURCE: https://support.claude.com/en/articles/12053672-what-happens-to-a-user-s-data-when-they-are-removed-from-a-team-or-enterprise-organization

# What happens to a user's data when they are removed from a Team or Enterprise organization?

This article explains what happens to projects and chats when a member is removed from your Team or Enterprise plan organization.

## Deleting individual accounts within an organization

If you are a non-Owner member of a Team or Enterprise plan, you will need to contact an organization Owner to have your account removed.

## Deleting organization-level accounts

For help with deleting your organization’s Team or Enterprise plan, please **[reach out to our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)**. Note that organization level account deletion requests must be made by your account's Primary Owner.

## Will a user’s projects still be accessible after removing them?

Once a user is removed from your Team or Enterprise organization, whether remaining members can access their projects or not depends on the project's visibility settings.

### Private projects

If the project’s visibility was set to private, other members of the organization will not be able to access it once the team member has been removed from the account. If a team member knows they're working on something in a private project they want to pass on, they will need to adjust the project’s permissions so either everyone in the organization can edit it, or invite specific users and grant them "Can edit" permissions.

### Shared projects

If a deleted team member shared their project with the entire organization, it will appear under the "Team" tab where remaining members can view or edit the project, depending on their permissions. If the deleted team member shared the project with specific users only, it will appear under the "Shared with me" tab for those specific users after the member is removed from the organization.

## Will a user’s chats still be accessible after removing them?

When a user is removed from your Team or Enterprise organization, remaining members will no longer be able to access their chats. This applies to chat snapshots that are shared with the organization. After the user who created the chat is removed, remaining members will see this message when they try to access any shared chat URLs: "Conversation not found. The requested conversation either doesn't exist or you don't have permission to access it."

Note that the removed user’s data will still be included in any **[data exports](https://support.claude.com/en/articles/9450526-how-can-i-export-my-claude-data)** run by your organization’s Primary Owner. For Enterprise organizations specifically, the removed user’s data will still be subject to any configured **[custom data retention settings](https://support.claude.com/en/articles/10440198-custom-data-retention-controls-for-enterprise-plans)**.

## What happens if a member is re-added to an organization?

If a team member is removed and later added back to the same organization using the same email address, previous chats and projects will be restored. The Primary Owner can also always export the member's project data and chats (note that customer data retention settings may impact this).

To learn more about Anthropic’s data retention periods see **[here](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)**.
---

SOURCE: https://support.claude.com/en/articles/12489464-use-enterprise-search

# Use enterprise search

Enterprise search capabilities are available for users on Team and Enterprise plans.

Enterprise search adds a dedicated project for searching across your organization's knowledge sources with optimized instructions and seamless connector integrations.

## What is enterprise search?

We’ve added a pre-configured “Ask Your Org” **[project](https://support.claude.com/en/articles/9517075-what-are-projects)** that appears in your sidebar. This project is designed specifically for unified knowledge access across your company's tools and data sources. This dedicated workspace provides:

- **Guided setup:** Easy onboarding flow for connecting your work apps.

- **Organization-wide availability:** Available to all members of your organization after an Owner completes the initial setup process.

  - Owners can control which apps are connected to the project.

  - Users need to authenticate with the connected apps before they can start using them.

- **Optimized instructions:** Specialized system prompts maintained by Anthropic for effective searches.

- **Unified access:** Search across multiple data sources (Slack, Microsoft 365, and more) in one place.

---

## Get started

### For owners

The enterprise search project is enabled by default for all Team and Enterprise plan organizations within Admin settings, but Owners will need to complete this initial setup process before other members can use it:

1. Click “Ask Your Org” in the menu on the left of your screen.

2. Click the “Set up for your org” button to continue or “Disable” to turn the project off for your team.

3. If setting up the project, you’ll be prompted to connect some tools to the project.

  1. You are required to choose a connector for both **Documents** and **Chat**; **Email** is recommended but optional.

  2. Only enabled connectors will be available in the enterprise search project.

4. Click “+ Add more” to set up any other tools your team needs.

  1. Choose between “Select another MCP” to open the Connectors directory, or “+ Add custom connector”

5. Click “Next” when you’re finished.

6. On the last screen, you can edit the name of your project. The format will be “Ask [Name field],” so whatever you enter here will impact what shows on the left panel.

7. Enter a description, then click “Finish set up.”

If you decide to stop using the project after setting it up, an Owner will need to manually disable this feature organization-wide to remove it from users’ accounts:

1. Navigate to **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)**.

2. Locate "Ask Your Org"

3. Click the “Disable” button to turn the feature off.

### For users

The enterprise search project will be starred in your sidebar by default when the feature is enabled for your organization.

**First-time setup:**

1. Click on the "Ask {org name}" project in your sidebar.

2. Follow the guided onboarding flow to connect to recommended services.

3. Authenticate with the services you want to search (Slack, Google, Microsoft 365).

  1. The more connectors you enable, the more comprehensive your search results will be.

4. Start asking Claude questions about your organization’s knowledge.

## Customize your enterprise search project

**Connecting additional tools:**

After initial setup, you can enable additional connectors in your search project by clicking “Connect” in the **Instructions** section and allowing access to the tools and connectors shown in the modal.

**To unstar or hide the project:**

1. Click the “...” next to the project in your sidebar

2. Select "Unstar"

**To adjust connected tools:**

1. Open the search project.

2. Click "Search and tools" in the lower left.

3. Enable or disable specific connectors.

4. Changes apply to new conversations in the project.

---

## How does enterprise search work?

When you ask a question within your organization’s dedicated project, Claude searches across all your connected data sources to generate comprehensive, well-cited responses.

**Example queries:**

- "What is our company's remote work policy?"

- "Summarize discussions about the Q4 product roadmap."

- "Find information about our customer onboarding process."

- "What were the key decisions from last week's leadership meetings?"

Claude will search your connected tools—such as SharePoint documents, Slack conversations, Gmail threads, and Google Drive files—and synthesize information into a unified response with source citations.

## Compare enterprise search to standard projects

|                     | **Projects**                   | **Enterprise Search**                         |
| ------------------- | ------------------------------ | --------------------------------------------- |
| **System prompt**   | Customizable by users          | Managed by Anthropic (optimized for search)   |
| **Purpose**         | General-purpose workspace      | Specialized for organization knowledge search |
| **Connector setup** | Manual configuration each time | Guided onboarding with recommended connectors |
| **Availability**    | User-created                   | Automatically provisioned for organization    |
| **Updates**         | Static unless manually changed | Automatic improvements from Anthropic         |

## Use cases

Enterprise search is particularly valuable for:

**Executive briefings:**

- "What happened yesterday while I was out?"

- "Summarize key updates across the business"

**Project research:**

- "What are the main reasons customers cite for why they pick our competitors?"

- "What are the current blockers on the Infrastructure project?"

**Policy and process questions:**

- "What is our vacation policy?"

- "How do I submit an expense report?"

**Onboarding:**

- "How does our authentication system work?"

- "Who should I talk to, to learn about X?"

**Performance reviews:**

- "Find discussions and documents related to [employee]'s Q3 projects"

- "Summarize team contributions to the Platform initiative"

---

## Privacy and permissions

- **Permission-aware:** You only see search results from data you have permission to access in the original systems.

- **User-level authentication for connectors:** Each user authenticates with their own credentials to enable connectors.

- **No external indexing:** Search results are generated by making MCP calls. No data from connected services are indexed in our systems for serving queries.

- **Data security:** All data access follows your organization's existing security controls and policies.

## Best practices

**Be specific about sources:** Instead of "Find information about the product launch,” try "Search Slack and Google Drive for discussions about the Q4 product launch."

**Use date ranges:** "Summarize emails from last week about the budget review."

**Combine multiple sources:** "Compile information from SharePoint documents, Slack discussions, and meeting notes about our hiring process."

**Break complex queries into steps:** For thorough research, ask Claude to search one source at a time, then synthesize findings.

---

## Troubleshooting

### The search project isn't appearing in my sidebar

- Verify you’re using a Team or Enterprise plan.

- Have an owner check that the feature is enabled for your organization.

- Try refreshing your browser or signing out and back in.

### I can't connect a recommended connector

- Check that an owner has enabled the connector at the organization level.

- Confirm that you have an active account with the service.

- Ensure your organization's policies don't block third-party integrations.

- Make sure you've completed the authentication flow properly.

- Contact your administrator or IT department if problems persist.

### My search results seem incomplete

- Verify you've connected the relevant services through the onboarding flow.

- Check that you've authenticated successfully with each connected service.

- Confirm you have permissions to access the content in the original systems.

- Try being more specific about which tools to search or what information you need.

- Narrow your search with date ranges or specific keywords.

- Break complex queries into smaller, focused sections.

### Connected tools aren't working

- Revisit **[Settings > Connectors](http://claude.ai/settings/connectors)** to verify authentication status.

- Try disconnecting and reconnecting the problematic connector.

- Check if the connector was recently disabled at the organization level.

### Claude is responding slowly in my search project – what should I do?

**Possible causes:**

- Searching across many large data sources takes time

- Network connectivity issues

- High load on connected services

**Try:**

- Narrowing your search scope

- Searching one tool at a time

- Being more specific about what you're looking for

### What happens if a connector stops working?

If a connector fails:

1. The dedicated project will search remaining connected tools.

2. You'll see a notice about the failed connector.

3. Try reconnecting the tool through **[Settings > Connectors](http://claude.ai/settings/connectors)**.

4. Contact an organization owner if the issue persists.

---

## Frequently asked questions

### Can I add my own custom connectors to the search project?

Yes. You can add connectors available through **[Settings > Connectors](http://claude.ai/settings/connectors)**, and you can also add custom connectors if permitted by your organization. The guided onboarding recommends a few connectors, but you're not limited to those.

For more information, refer to **[Get started with custom connectors using remote MCP](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)**.

### Can I use enterprise search on mobile or desktop apps?

The search project is fully functional on Claude Desktop, but not available on Claude Mobile (iOS/Android).

### Will using the search project count against my usage limits?

Yes. Search queries within the project count toward your plan's standard usage limits, just like other projects and conversations.

### How is this feature different from using Research?

**Research**:

- Designed for deep, multi-step research on specific topics

- Performs extensive web and internal data searches automatically

- Takes longer and may use more messages

- Best for complex research projects

**Enterprise search:**

- Optimized for quick knowledge retrieval

- Searches internal sources you've connected

- Faster responses for finding specific information

- Best for everyday knowledge access

For more guidance, see **[When should I use web search, extended thinking, and Research?](https://support.claude.com/en/articles/11095361)**

### What data can Claude access in my search project?

Claude can only access data within the project that:

1. Comes from connectors you've individually added and authenticated to.

2. You have permission to view within the original systems.

3. Is potentially relevant based on your search queries.

### Does everyone in my organization see the same search results?

No. Search results are permission-aware. You only see data that you have permission to access in each connected system.

### Is my search history visible to others?

No. Conversations within your search project are private to you unless you choose to manually share them, just like other conversations with Claude. However, on Enterprise plans, conversations follow your **[organization's data retention policies](https://support.claude.com/en/articles/10440198-custom-data-retention-controls-for-enterprise-plans)**.

### How long are search results retained?

Search results are retained with their associated chats. You can delete search data by deleting the associated conversation. Enterprise organizations may have custom data retention policies that apply to all conversations, including those within the search project. Check with your organization owner for details.
---

SOURCE: https://support.claude.com/en/articles/12923668-claude-for-nonprofits-partnership-success-guide-for-admins

<!DOCTYPE html><!-- Last Published: Fri Jul 24 2026 17:32:56 GMT+0000 (Coordinated Universal Time) --><html data-wf-domain="websitemain.claude.com" data-wf-page="69309a14a0016339f07e9a97" data-wf-site="6889473510b50328dbb70ae6" data-wf-intellimize-customer-id="117902971" lang="en-US" data-wf-collection="69309a14a0016339f07e9a7f" data-wf-item-slug="claude-for-nonprofits-partnership-success-guide-for-admins"><head><meta charset="utf-8"/><link href="https://cdn.prod.website-files.com" rel="preconnect" crossorigin="anonymous"/><title>Claude for nonprofits partnership success guide for admins | Claude by Anthropic</title><link rel="alternate" hrefLang="x-default" href="https://claude.com/resources/tutorials/claude-for-nonprofits-partnership-success-guide-for-admins"/><link rel="alternate" hrefLang="en-US" href="https://claude.com/resources/tutorials/claude-for-nonprofits-partnership-success-guide-for-admins"/><meta content="A phased implementation framework to help nonprofit admins launch, scale, and sustain Claude adoption across their organization." name="description"/><meta content="Claude for nonprofits partnership success guide for admins | Claude by Anthropic" property="og:title"/><meta content="A phased implementation framework to help nonprofit admins launch, scale, and sustain Claude adoption across their organization." property="og:description"/><meta content="Claude for nonprofits partnership success guide for admins | Claude by Anthropic" name="twitter:title"/><meta content="A phased implementation framework to help nonprofit admins launch, scale, and sustain Claude adoption across their organization." name="twitter:description"/><meta property="og:type" content="website"/><meta content="summary_large_image" name="twitter:card"/><meta content="width=device-width, initial-scale=1" name="viewport"/><meta content="tPMMBQMBzgZlNmCBal5cMPAx3nhO2iyM4rT9nxuRcdk" name="google-site-verification"/><link href="https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/css/claude-brand.shared.5312f2c27.min.css" rel="stylesheet" type="text/css" integrity="sha384-UxLywnZtG6+/1E9QIAP82Jh1hcFUJ9C1EMlnNZ9XWqf6lKRuDyImm9MWG/pGhNwD" crossorigin="anonymous"/><script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script><link href="https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/689f4a9aff1f63fde75cf733_favicon.png" rel="shortcut icon" type="image/x-icon"/><link href="https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/68c33859cc6cd903686c66a2_apple-touch-icon.png" rel="apple-touch-icon"/><link href="https://claude.com/resources/tutorials/claude-for-nonprofits-partnership-success-guide-for-admins" rel="canonical"/><style>.anti-flicker, .anti-flicker * {visibility: hidden !important; opacity: 0 !important;}</style><style>[data-wf-hidden-variation], [data-wf-hidden-variation] * {
        display: none !important;
      }</style><!-- Additional meta -->
<meta property="og:site_name" content="Claude" />
<meta name="apple-itunes-app" content="app-id=6473753684" />
<meta name="twitter:site" content="@claudeai" />
<meta name="twitter:creator" content="@claudeai" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Prevent flicker from global GSAP animations -->
<style>
  html:not(.gsap-not-found) [data-prevent-flicker='true'] { visibility: hidden; }
  .line-mask, .word-mask, .char-mask { padding-block: 0.1em; margin-block: -0.1em; }
</style>
<noscript><style>[data-prevent-flicker='true'] { visibility: visible !important; }</style></noscript>
<style>
  .transition_wrap {
    display: block;
  }
</style>
<script>
  // Hide the transition_wrap in Webflow preview mode w/ custom code enabled
  if (window.location.hostname.includes('.canvas.webflow.com')) {
    document.write('<style>.transition_wrap{display:none!important}[data-prevent-flicker="true"]{visibility:visible!important}</style>');
  }
</script>

<!-- Swiper CSS for Slider component -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" /><meta property="og:image:alt" content="Claude for nonprofits partnership success guide for admins | Claude by Anthropic" />
<meta property="og:url" content="https://claude.com/resources/tutorials/claude-for-nonprofits-partnership-success-guide-for-admins" />
<meta name="twitter:image" content="https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/68c469d23594abeb9ab6ee48_70ed020ecf8fa028b9bc95fa819720b6_og_claude-generic.jpg" />
<meta property="og:image" content="https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/68c469d23594abeb9ab6ee48_70ed020ecf8fa028b9bc95fa819720b6_og_claude-generic.jpg"/>

<!-- Instead of this (loads ALL Finsweet attributes) -->
<script async type="module" src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js" fs-copyclip></script>

<!-- Use this (loads ONLY CopyClip)
<script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-copyclip@1/copyclip.js"></script> --></head><body><div class="page_wrap"><div class="u-position-fixed"><div class="w-embed"><style>
  :root {
    --grid-breakout: [full-start] minmax(0, 1fr) [content-start] repeat(var(--_grid---column-count), minmax(0, var(--_grid---column-width))) [content-end] minmax(0, 1fr) [full-end];
    --grid-breakout-single: [full-start] minmax(0, 1fr) [content-start] minmax(0, calc(100% - var(--site--margin) * 2)) [content-end] minmax(0, 1fr) [full-end];
  }
  ::before, ::after {
    box-sizing: border-box;
  }
  .w-embed:before, .w-embed:after,
  .w-richtext:before, .w-richtext:after {
    content: unset;
  }
  html {
    background-color: var(--_theme---background);
  }
  button {
    background-color: unset;
    padding: unset;
    text-align: inherit;
  }
  button:not(:disabled) {
    cursor: pointer;
  }
  video {
    width: 100%;
    object-fit: cover;
  }
  /* remove padding of empty element */
  .wf-empty {
    padding: 0;
  }
  svg {
    max-width: 100%;
  }
  @media (prefers-color-scheme: light) {
    option { color: black; }
  }
  img::selection {
    background: transparent;
  }
  /* Typography */
  body {
    text-transform: var(--_text-style---text-transform);
    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
  }

  /* Clear Defaults */
  a:not ([class]) {
    text-decoration: underline;} 

  [class~="u-rich-text"] a,
  [class~="u-rich-text-cs"] a,
  [class~="u-rich-text-blog"] a,
  [class~="u-rich-text-tutorials"] a,
  a.u-rich-text,
  [class~="command_instruction"] a {
    transition: color .15s ease-out, text-decoration-color .15s ease-out;
    text-underline-offset: 3px;
    text-decoration: underline;
    color: currentcolor;
    text-decoration-color: var(--_theme---border-primary);
  }

  [class~="u-rich-text"] a:hover,
  [class~="u-rich-text-cs"] a:hover,
  [class~="u-rich-text-blog"] a:hover,
  [class~="u-rich-text-tutorials"] a:hover,
  a.u-rich-text:hover,
  [class~="command_instruction"] a:hover {
    text-decoration-color: var(--_theme---foreground-primary);
    color: var(--_theme---foreground-primary);
  }

  h1,h2,h3,h4,h5,h6,p,blockquote,label {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    text-wrap: inherit;
    margin-top: 0;
    margin-bottom: 0;
  }
  select:has(option[value=""]:checked) {
    color: color-mix(in lab, currentcolor 60%, transparent)
  }
  /* Selection Color */
  ::selection {
    background-color: var(--_theme---selection--background);
    color: var(--_theme---selection--text);
  }
  /* Margin Trim */
  :is(.u-margin-trim,.u-rich-text) > :not(:not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim) ~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim)),
  :is(.u-margin-trim,.u-rich-text) > :not(:not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim) ~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim)).u-display-contents > :first-child {
    margin-top: 0;
  }
  :is(.u-margin-trim,.u-rich-text) > :not(:has(~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim))),
  :is(.u-margin-trim,.u-rich-text) > :not(:has(~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim))).u-display-contents > :last-child {
    margin-bottom: 0;
  }
  /* Line Height Trim */
  :is(h1,h2,h3,h4,h5,h6,p):not(.u-text-trim-off,:has([class*="u-text-style-"]))::before,
  [class*="u-text-style-"]:not(.u-text-trim-off,:has(h1,h2,h3,h4,h5,h6,p))::before {
    content: "";
    display: table;
    margin-bottom: calc(-0.5lh + var(--_text-style---trim-top));
  }
  :is(h1,h2,h3,h4,h5,h6,p):not(.u-text-trim-off,:has([class*="u-text-style-"]))::after,
  [class*="u-text-style-"]:not(.u-text-trim-off,:has(h1,h2,h3,h4,h5,h6,p))::after {
    content: "";
    display: table;
    margin-bottom: calc(-0.5lh + var(--_text-style---trim-bottom));
  }
  /* Rich Text Links */
  .w-richtext a {
    position: relative;
    z-index: 4;
  }
  /* Line Clamp */
  .u-line-clamp-1, .u-line-clamp-2, .u-line-clamp-3, .u-line-clamp-4 {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .u-line-clamp-2 { -webkit-line-clamp: 2; }
  .u-line-clamp-3 { -webkit-line-clamp: 3; }
  .u-line-clamp-4 { -webkit-line-clamp: 4; }
  /* Child Contain */
  .u-child-contain > * {
    width: 100%;
    max-width: inherit !important;
    margin-inline: 0 !important;
    margin-top: 0 !important;
  }
  /* Hide */
  .u-hide-if-empty:empty,
  .u-hide-if-empty:not(:has(> :not(.w-condition-invisible))),
  .u-hide-if-empty-cms:not(:has(.w-dyn-item)),
  .u-embed-js,
  .u-embed-css {
    display: none !important;
  }
  /* Focus State */
  a, button, :where([tabindex]), [data-outline] {
    outline-offset: var(--focus--offset-outer);
  }
  a:focus-visible,
  button:focus-visible,
  [tabindex]:focus-visible,
  label:has(input:focus-visible) [data-outline] {
    outline-color: color-mix(in srgb, var(--_button-style---border) 50%, transparent);
    outline-width: var(--focus--width);
    outline-style: solid;
  }

  /* Global / Clickable Component */
  .wf-design-mode .clickable_wrap {
    z-index: 0;
  }
  .clickable_wrap a[href="#"] {
    display: none;
  }
  .clickable_wrap a[href="#"] ~ button {
    display: block;
  }
  /* Responsive Above */
  @container threshold-large (width >= 62em) {
    .u-order-unset-above { order: unset !important; }
    .u-all-unset-above { all: unset !important; }
    .u-grid-below { display: flex !important; }
    .u-max-width-unset-above { max-width: unset !important; }
    .u-width-unset-above { width: unset !important; }
    .u-hide-above { display: none !important; }
  }
  @container threshold-medium (width >= 48em) {
    .u-order-unset-above { order: unset !important; }
    .u-all-unset-above { all: unset !important; }
    .u-grid-below { display: flex !important; }
    .u-max-width-unset-above { max-width: unset !important; }
    .u-width-unset-above { width: unset !important; }
    .u-hide-above { display: none !important; }
  }
  @container threshold-small (width >= 30em) {
    .u-order-unset-above { order: unset !important; }
    .u-all-unset-above { all: unset !important; }
    .u-grid-below { display: flex !important; }
    .u-max-width-unset-above { max-width: unset !important; }
    .u-width-unset-above { width: unset !important; }
    .u-hide-above { display: none !important; }
  }
  /* Responsive Below */
  @container threshold-large (width < 62em) {
    .u-order-unset-below { order: unset !important; }
    .u-all-unset-below { all: unset !important; }
    .u-grid-above { display: flex !important; }
    .u-max-width-unset-below { max-width: unset !important; }
    .u-width-unset-below { width: unset !important; }
    .u-alignment-unset-below {
      --_alignment---direction: start;
      align-self: start;
    }
    .u-hide-below { display: none !important; }
  }
  @container threshold-medium (width < 48em) {
    .u-order-unset-below { order: unset !important; }
    .u-all-unset-below { all: unset !important; }
    .u-grid-above { display: flex !important; }
    .u-max-width-unset-below { max-width: unset !important; }
    .u-width-unset-below { width: unset !important; }
    .u-alignment-unset-below {
      --_alignment---direction: start;
      align-self: start;
    }
    .u-hide-below { display: none !important; }
  }
  @container threshold-small (width < 30em) {
    .u-order-unset-below { order: unset !important; }
    .u-all-unset-below { all: unset !important; }
    .u-grid-above { display: flex !important; }
    .u-max-width-unset-below { max-width: unset !important; }
    .u-width-unset-below { width: unset !important; }
    .u-alignment-unset-below {
      --_alignment---direction: start;
      align-self: start;
    }
    .u-hide-below { display: none !important; }
  }
  /* Form Radio */
  .form_main_radio_label:has(input:checked) .form_main_radio_circle_inner {
    opacity: 1;
  }
  /* Form Checkbox */
  .form_main_checkbox_label:has(input:checked) .form_main_checkbox_box {
    background-color: currentColor;
    border-color: currentColor;
  }
  .form_main_checkbox_label:has(input:checked) .form_main_checkbox_icon {
    opacity: 1;
  }
  /* State Manager */
  [data-state] { --_state---true: 1; --_state---false: 0; }
  .is-active,
  [data-state~="checked"]:is(:checked, :has(:checked)),
  [data-state~="current"]:is(.w--current, :has(.w--current)),
  [data-state~="open"]:is(.w--open, :has(.w--open)),
  [data-state~="expanded"]:is([aria-expanded="true"], :has([aria-expanded="true"])),
  [data-state~="external"]:is([target="_blank"], :has([target="_blank"])) { 
    --_state---true: 0; --_state---false: 1;
  }
  .wf-design-mode [data-trigger~="preview"],
  [data-trigger~="focus"]:is(:focus-visible, :has(:focus-visible)),
  [data-trigger~="group"]:has([data-trigger~="focus-other"]:focus-visible, [data-trigger~="focus-other"] :focus-visible)
  [data-trigger~="focus-other"]:not(:focus-visible, :has(:focus-visible)) {
    --_trigger---on: 0; --_trigger---off: 1;
  }
  @media (hover: hover) {
    [data-button]:hover,
    [data-trigger~="hover"]:is(a:hover,button:hover,:has(a:hover,button:hover)),
    [data-trigger~="group"]:has([data-trigger~="hover-other"]:hover) [data-trigger~="hover-other"]:not(:hover) { 
      --_trigger---on: 0; --_trigger---off: 1;
    }
    [data-trigger~="hover-other"]:hover { --_trigger---on: 1 !important; --_trigger---off: 0 !important; }
  }
  @media (hover: none) {
    [data-trigger~="mobile"] { --_trigger---on: 0; --_trigger---off: 1; }
  }
</style></div><div class="w-embed"><style>
  code,
  kbd,
  pre,
  samp {
    font-family: var(--_typography---font--mono-family);
  }
  body * {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge Legacy */
  }
  body *::-webkit-scrollbar {
    display: none; /* Unreliable */
    width: 0px; /* WebKit/Blink */
  }

  @media (prefers-color-scheme: dark) {
    body,
    .u-theme-ivory,
    [data-wf--section--theme='ivory'] {
      --_theme---background-primary: var(--swatch--gray-950);
      --_theme---background-secondary: var(--swatch--gray-900);
      --_theme---background-tertiary: var(--swatch--gray-850);
      --_theme---border-primary: var(--swatch--gray-600);
      --_theme---border-secondary: var(--swatch--gray-700);
      --_theme---border-tertiary: var(--swatch--gray-750);
      --_theme---foreground-primary: var(--swatch--gray-050);
      --_theme---foreground-secondary: var(--swatch--gray-400);
      --_theme---foreground-tertiary: var(--swatch--gray-500);
      --_theme---pictogram-accent: var(--swatch--gray-750);
      --_theme---button-primary--background: var(--swatch--gray-050);
      --_theme---button-primary--text: var(--swatch--gray-950);
      --_theme---button-primary--border: var(--swatch--transparent);
      --_theme---button-primary--icon: var(--_theme---button-primary--text);
      --_theme---button-primary--background-hover: var(--_theme---button-primary--background);
      --_theme---button-primary--text-hover: var(--_theme---button-primary--text);
      --_theme---button-primary--border-hover: var(--_theme---button-primary--border);
      --_theme---button-primary--icon-hover: var(--_theme---background-primary);
      --_theme---button-secondary--background: var(--swatch--gray-750);
      --_theme---button-secondary--text: var(--swatch--gray-050);
      --_theme---button-secondary--border: var(--_theme---border-secondary);
      --_theme---button-secondary--icon: var(--_theme---button-secondary--text);
      --_theme---button-secondary--background-hover: var(--_theme---button-secondary--background);
      --_theme---button-secondary--text-hover: var(--_theme---button-secondary--text);
      --_theme---button-secondary--border-hover: var(--_theme---button-secondary--background);
      --_theme---button-secondary--icon-hover: var(--_theme---foreground-secondary);
      --_theme---button-tertiary--background: var(--_theme---background-primary);
      --_theme---button-tertiary--text: var(--swatch--gray-050);
      --_theme---button-tertiary--border: var(--_theme---border-secondary);
      --_theme---button-tertiary--icon: var(--_theme---button-tertiary--text);
      --_theme---button-tertiary--background-hover: var(--_theme---button-tertiary--background);
      --_theme---button-tertiary--text-hover: var(--_theme---button-tertiary--text);
      --_theme---button-tertiary--border-hover: var(--_theme---button-tertiary--border);
      --_theme---button-tertiary--icon-hover: var(--_theme---foreground-primary);
      --_theme---error-text: #df6666;
      --_theme---heroes-accent: #c46849;
      --_theme---white: var(--_theme---background-primary);
    }
    .u-theme-white,
    [data-wf--section--theme='white'] {
      --_theme---background-primary: var(--swatch--gray-850);
      --_theme---background-secondary: var(--swatch--gray-800);
      --_theme---background-tertiary: var(--swatch--gray-750);
      --_theme---border-primary: var(--swatch--gray-550);
      --_theme---border-secondary: var(--swatch--gray-650);
      --_theme---border-tertiary: var(--swatch--gray-700);
      --_theme---foreground-primary: var(--swatch--gray-050);
      --_theme---foreground-secondary: var(--swatch--gray-350);
      --_theme---foreground-tertiary: var(--swatch--gray-450);
      --_theme---pictogram-accent: var(--swatch--gray-700);
      --_theme---button-primary--background: var(--swatch--gray-050);
      --_theme---button-primary--text: var(--swatch--gray-950);
      --_theme---button-primary--border: var(--swatch--transparent);
      --_theme---button-primary--icon: var(--_theme---button-primary--text);
      --_theme---button-primary--background-hover: var(--_theme---button-primary--background);
      --_theme---button-primary--text-hover: var(--_theme---button-primary--text);
      --_theme---button-primary--border-hover: var(--_theme---button-primary--border);
      --_theme---button-primary--icon-hover: var(--_theme---background-primary);
      --_theme---button-secondary--background: var(--swatch--gray-700);
      --_theme---button-secondary--text: var(--swatch--gray-050);
      --_theme---button-secondary--border: var(--_theme---border-secondary);
      --_theme---button-secondary--icon: var(--_theme---button-secondary--text);
      --_theme---button-secondary--background-hover: var(--_theme---button-secondary--background);
      --_theme---button-secondary--text-hover: var(--_theme---button-secondary--text);
      --_theme---button-secondary--border-hover: var(--_theme---button-secondary--background);
      --_theme---button-secondary--icon-hover: var(--_theme---foreground-secondary);
      --_theme---button-tertiary--background: var(--_theme---background-primary);
      --_theme---button-tertiary--text: var(--swatch--gray-050);
      --_theme---button-tertiary--border: var(--_theme---border-secondary);
      --_theme---button-tertiary--icon: var(--_theme---button-tertiary--text);
      --_theme---button-tertiary--background-hover: var(--_theme---button-tertiary--background);
      --_theme---button-tertiary--text-hover: var(--_theme---button-tertiary--text);
      --_theme---button-tertiary--border-hover: var(--_theme---button-tertiary--border);
      --_theme---button-tertiary--icon-hover: var(--_theme---foreground-primary);
      --_theme---error-text: #df6666;
      --_theme---heroes-accent: #c46849;
      --_theme---white: var(--_theme---background-primary);
    }
    .u-theme-neutral-1,
    [data-wf--section--theme='neutral-1'] {
      --_theme---background-primary: var(--swatch--gray-800);
      --_theme---background-secondary: var(--swatch--gray-750);
      --_theme---background-tertiary: var(--swatch--gray-700);
      --_theme---border-primary: var(--swatch--gray-500);
      --_theme---border-secondary: var(--swatch--gray-600);
      --_theme---border-tertiary: var(--swatch--gray-650);
      --_theme---foreground-primary: var(--swatch--gray-050);
      --_theme---foreground-secondary: var(--swatch--gray-300);
      --_theme---foreground-tertiary: var(--swatch--gray-400);
      --_theme---pictogram-accent: var(--swatch--gray-650);
      --_theme---button-primary--background: var(--swatch--gray-050);
      --_theme---button-primary--text: var(--swatch--gray-950);
      --_theme---button-primary--border: var(--swatch--transparent);
      --_theme---button-primary--icon: var(--_theme---button-primary--text);
      --_theme---button-primary--background-hover: var(--_theme---button-primary--background);
      --_theme---button-primary--text-hover: var(--_theme---button-primary--text);
      --_theme---button-primary--border-hover: var(--_theme---button-primary--border);
      --_theme---button-primary--icon-hover: var(--_theme---background-primary);
      --_theme---button-secondary--background: var(--swatch--gray-650);
      --_theme---button-secondary--text: var(--swatch--gray-050);
      --_theme---button-secondary--border: var(--_theme---border-secondary);
      --_theme---button-secondary--icon: var(--_theme---button-secondary--text);
      --_theme---button-secondary--background-hover: var(--_theme---button-secondary--background);
      --_theme---button-secondary--text-hover: var(--_theme---button-secondary--text);
      --_theme---button-secondary--border-hover: var(--_theme---button-secondary--background);
      --_theme---button-secondary--icon-hover: var(--_theme---foreground-secondary);
      --_theme---button-tertiary--background: var(--_theme---background-primary);
      --_theme---button-tertiary--text: var(--swatch--gray-050);
      --_theme---button-tertiary--border: var(--_theme---border-secondary);
      --_theme---button-tertiary--icon: var(--_theme---button-tertiary--text);
      --_theme---button-tertiary--background-hover: var(--_theme---button-tertiary--background);
      --_theme---button-tertiary--text-hover: var(--_theme---button-tertiary--text);
      --_theme---button-tertiary--border-hover: var(--_theme---button-tertiary--border);
      --_theme---button-tertiary--icon-hover: var(--_theme---foreground-primary);
      --_theme---error-text: #df6666;
      --_theme---heroes-accent: #c46849;
      --_theme---white: var(--_theme---background-primary);
    }

    .logo_light {
      display: none;
    }
    .logo_dark {
      display: block;
    }
    .illustration_light {
      display: none;
    }
    .illustration_dark {
      display: block;
    }
  }

  @media (prefers-color-scheme: light) {
    .logo_light {
      display: block;
    }
    .logo_dark {
      display: none;
    }
    .illustration_light {
      display: block;
    }
    .illustration_dark {
      display: none;
    }
  }

  .u-text-font-mono {
    --_text-style---trim-top: var(--_typography---font--mono-text-trim-top);
    --_text-style---trim-bottom: var(--_typography---font--mono-text-trim-bottom);
  }

  .w-richtext li > ul,
  .w-richtext li > ol {
    margin-top: 0.75rem;
  }

  .u-checklist ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .u-checklist ul li {
    position: relative;
    padding-left: 2rem;
  }

  .u-checklist ul li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.1em;
    width: 1.5rem;
    height: 1.5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M18.226%206.13068C18.4439%205.95655%2018.7615%205.95361%2018.9842%206.13888C19.2067%206.32458%2019.2604%206.63728%2019.1283%206.88304L19.0604%206.98382L10.0602%2017.784C9.95233%2017.9133%209.7949%2017.9908%209.62665%2017.9984C9.45844%2018.0059%209.29454%2017.9429%209.17547%2017.8238L4.97541%2013.6237L4.89806%2013.53C4.7446%2013.2971%204.7705%2012.9802%204.97541%2012.7753C5.18032%2012.5704%205.49726%2012.5445%205.73011%2012.698L5.82386%2012.7753L9.55868%2016.5101L18.1393%206.21506L18.226%206.13068Z%22%20fill%3D%22%235E5D59%22/%3E%3C/svg%3E');
  }

  [class^='card_'][class$='_wrap'] .clickable_wrap.u-cover-absolute .clickable_link,
  [class^='card_'][class$='_wrap'] .clickable_wrap.u-cover-absolute .clickable_btn {
    outline-offset: var(--focus--offset-inner);
  }

  textarea[data-autogrow] {
    overflow-y: hidden;
    resize: none;
    height: 1.75rem;
    min-height: 0;
  }

  .btn_main_wrap::hover,
  .btn_small_wrap::hover,
  .btn_tiny_wrap::hover,
  .button_toggle_wrap::hover,
  .btn_icon_main_wrap::hover,
  .btn_icon_small_wrap::hover,
  .btn_icon_tiny_wrap::hover {
    transition: /* Transition to click/active */
      box-shadow ease-in-out 100ms,
      background ease-in-out 100ms,
      color ease-in-out 50ms;
  }

  .btn_main_wrap::active,
  .btn_small_wrap::active,
  .btn_tiny_wrap::active,
  .button_toggle_wrap::active,
  .btn_icon_main_wrap::active,
  .btn_icon_small_wrap::active,
  .btn_icon_tiny_wrap::active {
    transition: /* Transition to click/active */
      box-shadow ease-in-out 50ms,
      background ease-in-out 50ms,
      color ease-in-out 25ms;
  }

  .card_cs_grid_img img {
    max-width: 60%;
    max-height: 60%;
  }

  @container viewport (width < 30em) {
    [data-wf--grid--column-count='4']:has(.card_feature_wrap) .c-grid {
      --_column-count---value: 1;
    }
  }
  @container viewport (min-width: 30em) and (max-width: 62em) {
    [data-wf--grid--column-count='4']:has(.card_feature_wrap) .c-grid {
      --_column-count---value: 2;
    }
  }

  /* Mods for spacing and visibility of embed in accordian content used for schema */
  .accordion_content_text p:has(+ .w-embed.w-script) {
    margin-bottom: 0;
  }

  /* Absolute inner SVG of lottie to prevent page jump */
  .heroes_lottie_component svg {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<style>
  /* Sticky scroll */
  @media screen and (min-width: 992px) {
    .sticky_image_link_wrap:has(.sticky_image_link.w--current) {
      opacity: 1;
      width: calc((100% - var(--_grid---gutter)) * (6 / 12));
    }
  }
  @media screen and (max-width: 767px) {
    .c-grid:last-child .sticky_image_block,
    .sticky_image_block:last-child {
      padding: 0;
    }
    .c-grid:last-child .sticky_image_wrap {
      margin-bottom: 0;
    }
  }

  #send,
  #threads,
  #get-help,
  #collaborate {
    display: block; /* or grid, flex - anything but contents */
  }

  /* Removes padding from the last-item in the Download page cards */
  .download_card_bar_wrap:last-child {
    padding-bottom: 0;
  }
</style></div><div class="w-embed"><style>
  /* Select text below clickable overlay */
  html.wf-design-mode .clickable_wrap {
    pointer-events: none;
  }

  html.wf-design-mode .pictogram_lottie_wrap {
    border: 1px dashed var(--_theme---border-secondary);
  }
</style></div><div class="u-embed-css w-embed"><style>
  html[lang="de-DE"] h1, html[lang="de-DE"] h2, html[lang="de-DE"] h3, 
  html[lang="de-DE"] h4, html[lang="de-DE"] h5, html[lang="de-DE"] h6,
  html[lang="de-DE"] p, html[lang="de-DE"] li,
  html[lang="fr-FR"] h1, html[lang="fr-FR"] h2, html[lang="fr-FR"] h3,
  html[lang="fr-FR"] h4, html[lang="fr-FR"] h5, html[lang="fr-FR"] h6,
  html[lang="fr-FR"] p, html[lang="fr-FR"] li {
    overflow-wrap: break-word;
    hyphens: auto;
  }
</style></div><div><div class="u-embed-js w-embed w-script"><script>
  document.addEventListener("DOMContentLoaded", function () {
    // ---------------- Config ----------------
    const EDGE_PADDING = 16;   // >= 1rem from edges
    const OFFSET_Y     = 10;   // gap under trigger
    const DIM_OPACITY  = 0.3;
    const DIM_EASE_MS  = 350;
    const CLOSE_DELAY  = 120;
    const isCoarse = () => matchMedia("(hover: none), (pointer: coarse)").matches;

    // ---------------- Bubble (single instance) ----------------
    function ensureBubble(){
      let el = document.querySelector(".tt-bubble");
      if (el) return el;
      el = document.createElement("div");
      el.className = "tt-bubble u-theme-white";
      el.setAttribute("role","tooltip");
      el.setAttribute("aria-hidden","true");
      el.style.left = "0px";
      el.style.top  = "0px";
      el.innerHTML = `
        <div class="tt-inner">
          <div class="tt-h" id="tt-title"></div>
          <p class="tt-b" id="tt-body"></p>
          <button type="button" class="tt-close" aria-label="Close">×</button>
        </div>`;
      document.body.appendChild(el);
      return el;
    }
    const bubble  = ensureBubble();
    const elH     = bubble.querySelector("#tt-title");
    const elB     = bubble.querySelector("#tt-body");
    const elClose = bubble.querySelector(".tt-close");

    // ---------------- Parse [[term|heading|body]] anywhere ----------------
    const TOKEN_RE = /\[\[([^|\]]+)\|([^|\]]+)\|([^\]]+)\]\]/g;
    const BLOCK_SKIP = new Set(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT","SELECT","CODE","PRE","TEMPLATE","IFRAME"]);
    function shouldSkipTextNode(n){
      let el = n.parentElement;
      while (el){
        if (BLOCK_SKIP.has(el.tagName) || el.isContentEditable) return true;
        el = el.parentElement;
      }
      return false;
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()){
      const n = walker.currentNode;
      if (!n.nodeValue || shouldSkipTextNode(n)) continue;
      if (TOKEN_RE.test(n.nodeValue)) textNodes.push(n);
      TOKEN_RE.lastIndex = 0;
    }
    textNodes.forEach(node => {
      const frag = document.createDocumentFragment();
      const insideLink = !!node.parentElement.closest("a");
      let text = node.nodeValue, last = 0; TOKEN_RE.lastIndex = 0; let m;
      while ((m = TOKEN_RE.exec(text))){
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const term=m[1].trim(), heading=m[2].trim(), body=m[3].trim();
        const t = insideLink ? document.createElement("span") : document.createElement("button");
        if (insideLink){ t.setAttribute("role","button"); t.setAttribute("tabindex","0"); } else { t.type="button"; }
        t.className="tt-trigger";
        t.textContent=term;
        t.setAttribute("data-tt-h", heading);
        t.setAttribute("data-tt-b", body);
        t.setAttribute("aria-haspopup","dialog");
        t.setAttribute("aria-expanded","false");
        frag.appendChild(t);
        last = TOKEN_RE.lastIndex;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });

    // ---------------- State ----------------
    let current = null;
    let hoverCount = 0;
    let closeTimer = null;

    // Dimming bookkeeping
    let dimCtx = null; // { container, dimEls:[], wrappedTexts:[], pathEls:[] }

    // ---------------- Find the correct "text element" container ----------------
    function findTextContainer(trigger){
      // Prefer common RTE wrappers
      let el = trigger.closest(".w-richtext, .rich-text, .rte, [data-rte]");
      if (el) return el;

      // Otherwise climb until we find an ancestor that contains multiple block nodes anywhere inside.
      const BLOCK_SEL = "p,h1,h2,h3,h4,h5,h6,ul,ol,li,blockquote,pre,figure,figcaption";
      el = trigger.parentElement;
      while (el && el !== document.body){
        const blockCount = el.querySelectorAll(BLOCK_SEL).length;
        if (blockCount >= 2) return el;
        el = el.parentElement;
      }

      // Fallback: nearest non-inline container
      el = trigger.parentElement || document.body;
      while (el && el !== document.body){
        const d = getComputedStyle(el).display;
        if (d !== "inline" && d !== "contents") return el;
        el = el.parentElement;
      }
      return document.body;
    }

    // Utility: child of `ancestor` that contains `target` (direct child)
    function directChildContaining(ancestor, target){
      for (const ch of ancestor.children){
        if (ch === target || ch.contains(target)) return ch;
      }
      return null;
    }

    function getElementTarget(e) {
    // If target is already an Element, use it
    if (e.target instanceof Element) return e.target;
    // Otherwise, walk the composed/path for the first Element
    const path = (typeof e.composedPath === 'function') ? e.composedPath() : [];
    for (const n of path) if (n instanceof Element) return n;
    return null;
  }

    // ---------------- Dim everything except the trigger branch (sibling branches only) ----------------
    function dimAllOtherBranches(container, trigger){
      undim(); // clear previous

      const dimEls = [];
      const wrappedTexts = [];
      const pathEls = [];

      // Build ELEMENT-only path [container -> ... -> trigger]
      const path = [];
      for (let el = trigger; el && el !== container; el = el.parentElement) path.push(el);
      path.push(container);
      path.reverse();

      // At each ancestor level, find the *direct* child that leads to the trigger
      for (let i = 0; i < path.length; i++){
        const anc = path[i];
        const branchChild = (i < path.length - 1) ? directChildContaining(anc, path[i+1]) : path[i]; // last step is the trigger itself

        // Fade element siblings (whole branches)
        for (const child of anc.children){
          if (child === branchChild) continue; // keep the path branch crisp
          // Never fade any element that is (or contains) the trigger
          if (child === trigger || child.contains(trigger)) continue;
          child.style.transition = `opacity ${DIM_EASE_MS}ms ease`;
          child.style.opacity = String(DIM_OPACITY);
          dimEls.push(child);
        }

        // Fade TEXT NODE siblings directly under this ancestor (outside branchChild)
        anc.childNodes.forEach(node => {
          if (node.nodeType !== 3) return; // text only
          if (!node.nodeValue || !node.nodeValue.trim()) return;
          // If this text node sits inside branchChild, skip
          if (branchChild && branchChild.contains && branchChild.contains(node)) return;
          const span = document.createElement("span");
          span.style.transition = `opacity ${DIM_EASE_MS}ms ease`;
          span.style.opacity = String(DIM_OPACITY);
          span.textContent = node.nodeValue;
          node.parentNode.replaceChild(span, node);
          wrappedTexts.push(span);
        });

        // Keep a reference to the path elements (so we can explicitly restore opacity if needed)
        if (anc && anc.nodeType === 1) pathEls.push(anc);
      }

      // Hard-guard: explicitly set opacity:1 on the entire path to neutralize any inherited fade
      pathEls.forEach(el => {
        el.style.opacity = "1";
      });

      dimCtx = { container, dimEls, wrappedTexts, pathEls };
    }

    function undim(){
      if (!dimCtx) return;
      const { dimEls, wrappedTexts, pathEls } = dimCtx;

      // Animate back
      dimEls.forEach(el => {
        el.style.transition = `opacity ${DIM_EASE_MS}ms ease`;
        el.style.opacity = "1";
        // remove inline style after the animation so we don't override site CSS
        setTimeout(() => { if (el) el.style.opacity = ""; }, DIM_EASE_MS + 50);
      });

      wrappedTexts.forEach(span => {
        span.style.transition = `opacity ${DIM_EASE_MS}ms ease`;
        span.style.opacity = "1";
        span.addEventListener("transitionend", () => {
          if (!span.parentNode) return;
          span.parentNode.replaceChild(document.createTextNode(span.textContent || ""), span);
        }, { once:true });
      });

      // Clear hard-guard on path
      pathEls.forEach(el => { if (el) el.style.opacity = ""; });

      dimCtx = null;
    }

    // ---------------- Positioning (centered, edge-aware, flip) ----------------
    function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }
    function measureBubbleForPlacement(){
      const wasOpen = bubble.classList.contains("is-open");
      if (!wasOpen){ bubble.style.visibility="hidden"; bubble.classList.add("is-open"); }
      const rect = bubble.getBoundingClientRect();
      if (!wasOpen){ bubble.classList.remove("is-open"); bubble.style.visibility=""; }
      return { w: rect.width, h: rect.height };
    }
    function placeAnchored(trigger){
      const vw=innerWidth, vh=innerHeight;
      const r = trigger.getBoundingClientRect();
      const { w, h } = measureBubbleForPlacement();

      let left = r.left + (r.width/2) - (w/2);
      left = clamp(left, EDGE_PADDING, Math.max(EDGE_PADDING, vw - EDGE_PADDING - w));

      const topBelow   = r.bottom + OFFSET_Y;
      const spaceBelow = vh - topBelow - EDGE_PADDING;
      const placeBelow = spaceBelow >= h;
      let top = placeBelow ? topBelow : (r.top - h - OFFSET_Y);
      top = clamp(top, EDGE_PADDING, Math.max(EDGE_PADDING, vh - EDGE_PADDING - h));

      bubble.style.left = left + "px";
      bubble.style.top  = top  + "px";

      const br = bubble.getBoundingClientRect();
      if (br.bottom > vh - EDGE_PADDING){
        bubble.style.maxHeight = (vh - 2*EDGE_PADDING) + "px";
        bubble.style.overflowY = "auto";
      } else {
        bubble.style.maxHeight = "none";
        bubble.style.overflowY = "visible";
      }
    }

    // ---------------- Open / Close (place → fade/scale) ----------------
    function animateIn(){
      bubble.style.transition = "none";
      bubble.style.opacity = "0";
      bubble.style.transform = "scale(0.95)";
      void bubble.offsetWidth;
      bubble.style.transition = "opacity .18s ease, transform .18s ease";
      bubble.style.opacity = "1";
      bubble.style.transform = "scale(1)";
    }
    function animateOut(done){
      bubble.style.transition = "opacity .16s ease, transform .16s ease";
      bubble.style.opacity = "0";
      bubble.style.transform = "scale(0.95)";
      const end = () => { bubble.removeEventListener("transitionend", end); done && done(); };
      bubble.addEventListener("transitionend", end);
      setTimeout(end, 260);
    }

    function openFromTrigger(trigger){
      if (current && current !== trigger) forceClose();
      current = trigger;
      trigger.setAttribute("aria-expanded","true");

      elH.textContent = trigger.getAttribute("data-tt-h") || "";
      elB.textContent = trigger.getAttribute("data-tt-b") || "";

      bubble.classList.add("is-open");
      bubble.setAttribute("aria-hidden","false");

      placeAnchored(trigger);
      animateIn();

      const container = findTextContainer(trigger);
      dimAllOtherBranches(container, trigger);

      hoverCount = 0;
      cancelCloseTimer();
    }

    function forceClose(){
      if (!current) return;
      bubble.classList.remove("is-open");
      bubble.setAttribute("aria-hidden","true");
      current.setAttribute("aria-expanded","false");
      current = null;
      undim();
      hoverCount = 0;
      cancelCloseTimer();
    }

    function closeWithAnim(){
      if (!current) return;
      const t = current;
      animateOut(() => {
        bubble.classList.remove("is-open");
        bubble.setAttribute("aria-hidden","true");
        t.setAttribute("aria-expanded","false");
        current = null;
        undim();
      });
    }

    function scheduleClose(){
      cancelCloseTimer();
      closeTimer = setTimeout(() => {
        if (hoverCount <= 0 && !isCoarse()) closeWithAnim();
      }, CLOSE_DELAY);
    }
    function cancelCloseTimer(){ if (closeTimer){ clearTimeout(closeTimer); closeTimer = null; } }

    // ---------------- Hover-intent (desktop) ----------------
    function onZoneEnter(){ if (isCoarse()) return; hoverCount++; cancelCloseTimer(); }
    function onZoneLeave(){ if (isCoarse()) return; hoverCount = Math.max(0, hoverCount - 1); if (hoverCount === 0) scheduleClose(); }

    bubble.addEventListener("pointerenter", onZoneEnter, true);
    bubble.addEventListener("mouseenter",   onZoneEnter, true);
    bubble.addEventListener("pointerleave", onZoneLeave, true);
    bubble.addEventListener("mouseleave",   onZoneLeave, true);

    const handleEnter = (e) => {
      if (isCoarse()) return;
      const target = getElementTarget(e);
      if (!target) return;
      const t = target.closest(".tt-trigger");
      if (!t) return;
      onZoneEnter();
      if (!current || current !== t) openFromTrigger(t);
    };
    const handleLeave = (e) => {
      if (isCoarse()) return;
      const target = getElementTarget(e);
      if (!target) return;
      const t = target.closest(".tt-trigger");
      if (!t) return;
      onZoneLeave();
    };
    document.addEventListener("pointerenter", handleEnter, true);
    document.addEventListener("mouseenter",   handleEnter, true);
    document.addEventListener("pointerleave", handleLeave, true);
    document.addEventListener("mouseleave",   handleLeave, true);

    // ---------------- Keyboard ----------------
    document.addEventListener("focusin", (e) => {
      if (!e.target) return;
      const t = e.target.closest(".tt-trigger");
      if (t) openFromTrigger(t);
    });
    document.addEventListener("focusout", (e) => {
      if (!e.target) return;
      const t = e.target.closest(".tt-trigger");
      if (t && current === t) closeWithAnim();
    });

    // ---------------- Mobile / coarse ----------------
    document.addEventListener("pointerdown", (e) => {
      if (!isCoarse()) return;

      const t = e.target.closest(".tt-trigger");
      if (!t) return;
      e.preventDefault();
      e.stopPropagation();
      if (current === t && bubble.classList.contains("is-open")) { closeWithAnim(); return; }
      openFromTrigger(t);
    }, true);

    document.addEventListener("click", (e) => {
      if (!isCoarse()) return;
      if (!bubble.classList.contains("is-open")) return;
      const inBubble  = !!e.target.closest(".tt-bubble");
      const onTrigger = !!e.target.closest(".tt-trigger");
      if (!inBubble && !onTrigger) closeWithAnim();
    }, true);

    // Close button + ESC
    elClose.addEventListener("click", closeWithAnim);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeWithAnim(); });

    // Reposition on resize/scroll while open
    const reposition = () => { if (!current) return; placeAnchored(current); };
    addEventListener("resize", reposition, { passive: true });
    addEventListener("scroll", reposition, { passive: true });
  });
  </script></div><div class="u-embed-css w-embed"><style>
/* Tooltip Styles */

  /* Trigger */
  .tt-trigger {
    cursor: help;
    text-decoration: underline dotted;
    text-underline-offset: .2em;
    color: inherit;
  }
  .tt-trigger:focus-visible{ outline:2px solid currentColor; outline-offset:2px; }

  /* Bubble */
  .tt-bubble{
    position: fixed;
    z-index: 10;
    max-width: 17rem;
    background: var(--_theme---background-primary);
    box-shadow: 0 4px 24px rgba(0,0,0,.05);
    border-radius: var(--radius--large);
    border-style: solid;
    border-color: var(--_theme---border-tertiary);
    padding: var(--_spacing---space--1-5rem);
    pointer-events: none;
    opacity: 0;
    transform: translate3d(0,0,0) scale(.98);
    transition: opacity .3s ease, transform .3s ease;
    will-change: transform, opacity;
  }
  .tt-bubble.is-open{ opacity:1; transform:translate3d(0,0,0) scale(1); pointer-events:auto; }

  .tt-h{ 
    margin-bottom: var(--_spacing---space--0-5rem); 
    font-size: var(--_typography---font-size--body-3); 
    font-family: var(--_typography---font--secondary-family);
    line-height: var(--_typography---line-height--1-6); 
    color: var(--_theme---foreground-primary);
  }
  .tt-b{ 
    margin:0; 
    font-size: var(--_typography---font-size--caption);
    line-height: var(--_typography---line-height--1-6);
    color: var(--_theme---foreground-tertiary);
  }

  /* Mobile close button */
  .tt-close {
    display: none;
  }
  @media (hover: none), (pointer: coarse) {
    .tt-close {
      display: inline-flex;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 32px;
      height: 32px;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: 999px;
      background: transparent;
      font-size: 22px; 
      line-height: 1;
      color: inherit;
      cursor: pointer;
      touch-action: manipulation;
    }
    .tt-close:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
    .tt-close:hover { opacity: 1; }
  }

</style></div></div></div><div class="nav_component"><div class="w-embed"><style>
  :root {
    --nav--icon-thickness: var(--border-width--main);
    --nav--hamburger-thickness: var(--nav--icon-thickness);
    --nav--hamburger-gap: var(--_spacing---space--0-25rem);
    --nav--hamburger-rotate: 45;
    --nav--dropdown-duration: 300ms;
    --nav--dropdown-open-duration: 600ms;
    --nav--dropdown-delay: 0ms;
    --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ========== GENERAL RESPONSIVE RULES ========== */

  /* Lock body when nav is open (script toggles .is-nav-open) */
  @media (width < 56em) {
    body.is-nav-open { overflow: hidden; }
  }

  @container (min-width: 56em) {
    .nav_wrap.is-desktop { display: block; }
    .nav_wrap.is-mobile  { display: none;  }
  }
  @container (max-width: 50.5em) {
    /* Mega dropdown */
    .nav_dropdown_main_scroll.is-desktop.is-mega {
      flex-flow: column;
    }
    .nav_dropdown_main_wrap.is-desktop.u-theme-white.is-mega.w--open {
      width: 100%;
      left: 0 !important;
    }
    .nav_dropdown_list_wrap.is-mega:first-child .nav_dropdown_label.u-text-style-caption {
      margin-top: 0;
    }
  }
  @container (width < 28em) {
    .nav_mobile_layout .nav_actions_mobile { display: none; }
  }

  /* ========== DROPDOWN STYLING ========== */

  html:not(.wf-design-mode) .nav_dropdown_component > .w-dropdown-list {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 0fr;
    transition:
      grid-template-rows var(--nav--dropdown-duration) var(--ease-expo-out),
      visibility 0s var(--nav--dropdown-duration),
      opacity var(--nav--dropdown-duration) var(--ease-expo-out);
    visibility: hidden;
    opacity: 0;
  }
  html:not(.wf-design-mode) .nav_dropdown_component > .w-dropdown-list.w--open {
    visibility: visible;
    opacity: 1;
    transition:
      grid-template-rows var(--nav--dropdown-duration) var(--ease-expo-out),
      visibility 0s 0s,
      opacity var(--nav--dropdown-duration) var(--ease-expo-out);
  }
  .nav_dropdown_component > .w-dropdown-list > * { overflow: hidden; }
  .nav_dropdown_component:has(> .w-dropdown-toggle[aria-expanded="true"]) > .w-dropdown-list {
    --nav--dropdown-duration: var(--nav--dropdown-open-duration);
    grid-template-rows: 1fr;
  }
  /*.nav_wrap.is-desktop:has(.nav_dropdown_component > .w-dropdown-toggle.w--open[aria-expanded="false"])
  .nav_dropdown_component:has(> .w--open[aria-expanded="true"]) > .w-dropdown-list {
  transition-delay: var(--nav--dropdown-duration);
  }*/

  /* Dropdown caret rotation */
  .nav_links_svg.is-desktop { transition: transform 750ms var(--ease-expo-out); }
  .w-dropdown-toggle[aria-expanded="true"] .nav_links_svg.is-desktop { transform: rotate(-180deg); }

  .nav_links_svg_line.is-2 { transition: transform 500ms var(--ease-expo-out); }
  .w-dropdown-toggle[aria-expanded="true"] .nav_links_svg_line.is-2 { transform: rotate(0deg); }

  /* open (replicates your original transforms) */
  .nav_btn_wrap[aria-expanded="true"] .nav_btn_line:nth-child(1),
  .nav_btn_wrap[aria-expanded="true"] > * > :first-child {
    transform:
      translateY(calc(var(--nav--hamburger-thickness) * 1 + var(--nav--hamburger-gap) * 1))
      rotate(calc(var(--nav--hamburger-rotate) * -1deg));
  }
  .nav_btn_wrap[aria-expanded="true"] .nav_btn_line:nth-child(2),
  .nav_btn_wrap[aria-expanded="true"] > * > :nth-child(2) {
    opacity: 0;
  }
  .nav_btn_wrap[aria-expanded="true"] .nav_btn_line:nth-child(3),
  .nav_btn_wrap[aria-expanded="true"] > * > :last-child {
    transform:
      translateY(calc(var(--nav--hamburger-thickness) * -1 + var(--nav--hamburger-gap) * -1))
      rotate(calc(var(--nav--hamburger-rotate) * 1deg));
    width: 1rem;
  }


  /* ========== HOVER & THEME EFFECTS ========== */
  @media (hover: hover) and (pointer: fine) {
    body:has(.nav_dropdown_item:hover) .nav_dropdown_item:not(:hover) > * > * {
      color: var(--_theme---foreground-tertiary);
    }
    .nav_dropdown_link {
      transition:
        background-color 300ms ease,
        color 300ms ease;
    }
    .nav_dropdown_item:hover .nav_dropdown_link {
      background: var(--_theme---background-tertiary);
      color: var(--_theme---foreground-primary);
    }
    .nav_secondary_wrap .nav_dropdown_item:hover .nav_dropdown_link {
      background: var(--_theme---background-tertiary);
      color: var(--_theme---foreground-primary);
    }
    .nav_wrap.is-mobile .nav_dropdown_item:hover .nav_dropdown_link {
      color: var(--_theme---foreground-primary);
    }
    .nav_links_text { transition: color 500ms var(--ease-expo-out); }
    .nav_links_svg {
      transition:
        transform 500ms var(--ease-expo-out),
        color 500ms var(--ease-expo-out);
    }
    .nav_links_item:hover .nav_links_text,
    .nav_links_item:hover .nav_links_svg { color: var(--_theme---foreground-primary); }
  }

  /* ========== LAYOUT / UTILITY (kept, de-Webflow’d) ========== */
  .nav_wrap.is-mobile [data-open-on-mobile] > .w-dropdown-toggle { display: none; }
  .nav_wrap.is-mobile [data-open-on-mobile] > .w-dropdown-list {
    visibility: visible;
    opacity: 1;
    display: block;
    grid-template-rows: 1fr;
  }
  .nav_buttons_item .button_main_wrap { width: 100%; min-width: max-content; }

  /* Optional: fade out mobile actions while open */
  .nav_actions_wrap { transition: opacity 500ms var(--ease-expo-out); }
  body.is-nav-open .nav_actions_mobile .nav_actions_wrap {
    opacity: 0;
    pointer-events: none;
  }

  .nav_links_item:first-child {
    border-top: none;
  }

  /* ========== Breadcrumbs ========== */
  .breadcrumb_text.is_linked[href="#"],
  .breadcrumb_text:has(+.breadcrumb_text.is_linked:not([href="#"])) {
    display: none;
  }
  .breadcrumb_text.is_linked:not([href="#"]) {
    display: block;
  }

</style></div><div class="u-embed-js w-embed w-script"><script>
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".nav_component").forEach((root) => {
    if (root.dataset.scriptInitialized) return;
    root.dataset.scriptInitialized = "true";

    if (!window.gsap) { console.error("GSAP not found"); return; }

    const btn  = root.querySelector('.nav_btn_wrap');
    const menu = root.querySelector('.nav_menu_wrap');
    if (!btn || !menu) { console.warn('Missing .nav_btn_wrap or .nav_menu_wrap in', root); return; }

    // a11y setup (scoped)
    if (!btn.hasAttribute('type')) btn.setAttribute('type', 'button');
    if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
    if (!menu.id) menu.id = 'primary-nav-' + Math.random().toString(36).slice(2);
    if (!btn.hasAttribute('aria-controls')) btn.setAttribute('aria-controls', menu.id);
    menu.setAttribute('aria-hidden', 'true');

    // targets (scoped)
    const items   = Array.from(menu.querySelectorAll('.nav_links_item'));
    const actions = menu.querySelector('.nav_menu_actions_wrap');

    // feature detection
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canClipInset = !!(window.CSS && CSS.supports && (
      CSS.supports('clip-path','inset(0 0 100% 0)') || CSS.supports('-webkit-clip-path','inset(0 0 100% 0)')
    ));
    const useClip = canClipInset && !prefersReduced;

    // durations from CSS vars
    function readDur(varName, fallbackSec) {
      const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      if (!v) return fallbackSec;
      if (v.endsWith('ms')) return parseFloat(v)/1000;
      if (v.endsWith('s'))  return parseFloat(v);
      const n = parseFloat(v);
      return isNaN(n) ? fallbackSec : n;
    }
    const OPEN_DUR  = readDur('--nav--menu-open-duration', 0.8);
    const CLOSE_DUR = readDur('--nav--menu-close-duration', 0.4);

    // state per component
    let isOpen = false;
    let current = null;

    function setMenuVisibleForAnim() {
      menu.style.display = 'flex';       // ensure it's shown before anim
      menu.removeAttribute('hidden');
      menu.setAttribute('aria-hidden', 'false');
      menu.style.willChange = useClip ? 'clip-path' : 'transform, opacity';
    }
    function clearMenuInline() {
      gsap.set(menu, { clearProps: 'clipPath,webkitClipPath,opacity,transform,willChange,pointerEvents' });
    }

    // OPEN
    function playOpen() {
      setMenuVisibleForAnim();
      menu.style.pointerEvents = 'none';
      document.body.classList.add('is-nav-open');
      btn.setAttribute('aria-expanded', 'true');

      if (useClip) {
        gsap.set(menu, { clipPath: 'inset(0 0 100% 0)', webkitClipPath: 'inset(0 0 100% 0)' });
      } else {
        gsap.set(menu, { yPercent: -2, opacity: 0 });
      }
      if (items.length) gsap.set(items, { y: 20, autoAlpha: 0 });
      if (actions)      gsap.set(actions, { y: 20, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (useClip) {
        tl.to(menu, {
          clipPath: 'inset(0 0 0% 0)',
          webkitClipPath: 'inset(0 0 0% 0)',
          duration: prefersReduced ? 0.01 : OPEN_DUR,
          ease: 'expo.out'
        }, 0);
      } else {
        tl.to(menu, { yPercent: 0, opacity: 1, duration: prefersReduced ? 0.01 : Math.min(OPEN_DUR, 0.36) }, 0.02);
      }

      if (items.length) {
        tl.to(items, { y: 0, autoAlpha: 1, stagger: prefersReduced ? 0 : 0.08, duration: prefersReduced ? 0.01 : 0.4 }, 0.10);
      }
      if (actions) {
        const base = 0.10 + (items.length ? items.length * (prefersReduced ? 0 : 0.08) : 0);
        tl.to(actions, { y: 0, autoAlpha: 1, duration: prefersReduced ? 0.01 : 0.4 }, base);
      }

      tl.add(() => { menu.style.pointerEvents = 'auto'; }, '>-0.1');

      // listeners (per open)
      document.addEventListener('keydown', onKeydown);
      menu.addEventListener('click', onMenuLinkClick);

      return tl;
    }

    // CLOSE (fade all together, then clip inset close)
    function playClose() {
      menu.style.pointerEvents = 'none';
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-nav-open');

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      const fadeTargets = items.concat(actions ? [actions] : []);
      if (fadeTargets.length) tl.to(fadeTargets, { autoAlpha: 0, y: 0, duration: prefersReduced ? 0.01 : 0.2 }, 0);

      if (useClip) {
        gsap.set(menu, { clipPath: 'inset(0 0 0% 0)', webkitClipPath: 'inset(0 0 0% 0)' });
        tl.to(menu, {
          clipPath: 'inset(0 0 100% 0)',
          webkitClipPath: 'inset(0 0 100% 0)',
          duration: prefersReduced ? 0.01 : CLOSE_DUR
        }, '>-0.02');
      } else {
        tl.to(menu, { yPercent: -2, opacity: 0, duration: prefersReduced ? 0.01 : Math.min(CLOSE_DUR, 0.28) }, '>-0.02');
      }

      tl.add(() => {
        menu.style.display = 'none';
        menu.setAttribute('aria-hidden', 'true');
        clearMenuInline();
        if (items.length) gsap.set(items, { clearProps: 'all' });
        if (actions)      gsap.set(actions, { clearProps: 'all' });

        // remove listeners added on open
        document.removeEventListener('keydown', onKeydown);
        menu.removeEventListener('click', onMenuLinkClick);
      });

      return tl;
    }

    function openMenu() {
      if (isOpen) return;
      isOpen = true;
      if (current && current.isActive()) current.kill();
      current = playOpen();
    }
    function closeMenu() {
      if (!isOpen) return;
      isOpen = false;
      if (current && current.isActive()) current.kill();
      current = playClose();
    }

    function onKeydown(e){ if (e.key === 'Escape' && isOpen) { e.preventDefault(); closeMenu(); } }

    function onMenuLinkClick(e){
      const a = e.target.closest('a[href]');
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.origin === location.origin) {
        e.preventDefault();
        const tl = playClose();
        tl.eventCallback('onComplete', () => { window.location.href = a.href; });
        isOpen = false;
      }
    }

    // Toggle (scoped)
    btn.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()));

    // Normalize if visible on load (scoped)
    if (getComputedStyle(menu).display !== 'none') {
      btn.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-nav-open');
      isOpen = true;
    }
  });
});
</script></div><div class="u-embed-js w-embed w-script"><script>
  (function () {
    'use strict';

    // ---------- tiny utils ----------
    var NS = 'navBundleInit';
    function onceFlag(el, k){ k=k||'scriptInitialized'; if (el.dataset[k]) return true; el.dataset[k]='true'; return false; }
    function ready(fn){ if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn,{once:true});} else { fn(); } }

    // ---------- 1) Ask Claude about this page ----------
    function initAskPage(){
      var buttons = document.querySelectorAll('[data-ask-page]');
      if (!buttons.length) return; // Early exit if no buttons

      buttons.forEach(function(btn){
        if (onceFlag(btn, NS)) return;
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var pageUrl = window.location.href;
          var prompt = "Read this page " + pageUrl + " so that I can ask you questions about it";
          var claudeUrl = new URL('https://claude.ai/new');
          claudeUrl.searchParams.set('q', prompt);
          window.open(claudeUrl.toString(), '_blank', 'noopener');
        });
      });
    }

    // ---------- 2) Copy page content as Markdown (Turndown) ----------
    var _turndownReady;
    function ensureTurndown(){
      if (window.TurndownService) return Promise.resolve();
      if (_turndownReady) return _turndownReady;
      _turndownReady = new Promise(function(resolve, reject){
        var s = document.createElement('script');
        s.src = 'https://unpkg.com/turndown/dist/turndown.js';
        s.async = true;
        s.onload = function(){ resolve(); };
        s.onerror = function(){ reject(new Error('Failed to load Turndown')); };
        document.head.appendChild(s);
      });
      return _turndownReady;
    }

    function initCopyAsMarkdown(){
      var copyButton = document.getElementById('copy-as-markdown');
      if (!copyButton) return; // Early exit

      if (onceFlag(copyButton, NS)) return;

      var buttonTextEl = copyButton.querySelector('.nav_dropdown_text') || copyButton;
      var originalText = buttonTextEl.textContent;

      copyButton.addEventListener('click', function(){
        ensureTurndown().then(function(){
          try {
            var TurndownService = window.TurndownService;
            var turndownService = new TurndownService({
              headingStyle: 'atx',
              codeBlockStyle: 'fenced',
              fence: '```',
              emDelimiter: '*',
              strongDelimiter: '**',
              linkStyle: 'inlined'
            });

            // Skip junk
            turndownService.addRule('skipWebflowElements', {
              filter: function(node){
                return node.nodeName === 'SCRIPT' ||
                  node.nodeName === 'STYLE'  ||
                  (node.className && (String(node.className).includes('w-editor') || String(node.className).includes('w-embed')));
              },
              replacement: function(){ return ''; }
            });

            buttonTextEl.textContent = 'Copying...';
            copyButton.disabled = true;

            var contentElement = document.querySelector('main') ||
                document.querySelector('.main-content') ||
                document.querySelector('body');
            if (!contentElement) throw new Error('No content found to copy');

            var cloned = contentElement.cloneNode(true);
            cloned.querySelectorAll('script, style, nav, footer, .w-nav, .footer').forEach(function(el){ el.remove(); });

            var markdown = turndownService.turndown(cloned);

            var done = function(){
              buttonTextEl.textContent = 'Copied!';
              setTimeout(function(){
                buttonTextEl.textContent = originalText;
                copyButton.disabled = false;
              }, 2000);
            };

            if (navigator.clipboard && window.isSecureContext) {
              navigator.clipboard.writeText(markdown).then(done, function(err){ throw err; });
            } else {
              var ta = document.createElement('textarea');
              ta.value = markdown; ta.style.position='fixed'; ta.style.opacity='0';
              document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
              done();
            }
          } catch (err){
            console.error('Copy failed:', err);
            buttonTextEl.textContent = 'Copy failed';
            setTimeout(function(){
              buttonTextEl.textContent = originalText;
              copyButton.disabled = false;
            }, 2000);
          }
        }).catch(function(err){
          console.error('Turndown load failed:', err);
          buttonTextEl.textContent = 'Copy failed';
          setTimeout(function(){
            buttonTextEl.textContent = originalText;
            copyButton.disabled = false;
          }, 2000);
        });
      });
    }

    // ---------- init all ----------
    ready(function(){
      initAskPage();
      initCopyAsMarkdown();
    });

    // Optional: expose minimal API for debugging (comment out in production if not needed)
    // window.NavBundle = {
    //   initCopyAsMarkdown: initCopyAsMarkdown,
    //   initAskPage: initAskPage
    // };
  })();
</script></div><div role="banner" class="nav_wrap is-desktop"><div class="nav_contain u-container"><a aria-label="Home page" href="https://claude.com" class="nav_logo_wrap w-inline-block"><div STYLE="" class="u-max-width-full"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 573 125" fill="none" class="u-svg"><path d="M200.168 110.625C190.376 110.625 181.647 108.688 173.98 104.813C166.355 100.896 160.397 95.4167 156.105 88.375C151.814 81.3333 149.668 73.25 149.668 64.125C149.668 54.4167 151.855 45.7917 156.23 38.25C160.647 30.7083 166.751 24.8542 174.543 20.6875C182.335 16.4792 191.189 14.375 201.105 14.375C207.064 14.375 213.001 15.0208 218.918 16.3125C224.876 17.5625 230.105 19.5208 234.605 22.1875V42.75H228.98C227.397 35.2083 224.293 29.7292 219.668 26.3125C215.085 22.8958 208.814 21.1875 200.855 21.1875C193.23 21.1875 186.897 22.8958 181.855 26.3125C176.814 29.7292 173.085 34.5 170.668 40.625C168.251 46.7083 167.043 53.7917 167.043 61.875C167.043 69.8333 168.397 76.9792 171.105 83.3125C173.814 89.6458 177.835 94.6458 183.168 98.3125C188.501 101.979 194.918 103.813 202.418 103.813C207.501 103.813 211.855 102.813 215.48 100.813C219.147 98.8125 222.23 96.0833 224.73 92.625C227.23 89.125 229.564 84.8333 231.73 79.75H237.605L233.605 102.313C229.272 105.104 224.105 107.188 218.105 108.563C212.105 109.938 206.126 110.625 200.168 110.625ZM243.168 103.938C245.626 103.646 247.543 103.271 248.918 102.813C250.335 102.313 251.355 101.646 251.98 100.813C252.605 99.9792 252.918 98.9167 252.918 97.625V29.5625L243.168 25.875V21.6875L262.793 14.375H267.793V97.625C267.793 98.9167 268.105 99.9792 268.73 100.813C269.355 101.646 270.355 102.313 271.73 102.813C273.147 103.271 275.085 103.646 277.543 103.938V109.375H243.168V103.938ZM300.355 110.625C296.772 110.625 293.605 109.958 290.855 108.625C288.105 107.292 285.96 105.417 284.418 103C282.918 100.583 282.168 97.7917 282.168 94.625C282.168 90 283.626 86.1875 286.543 83.1875C289.501 80.1458 294.043 77.75 300.168 76L322.855 69.5625V62.75C322.855 58.2917 321.793 54.9167 319.668 52.625C317.585 50.3333 314.48 49.1875 310.355 49.1875C306.73 49.1875 303.855 50.2917 301.73 52.5C299.647 54.7083 298.605 57.7083 298.605 61.5V67.125H288.48C287.272 66.375 286.335 65.3958 285.668 64.1875C285.043 62.9375 284.73 61.5625 284.73 60.0625C284.73 57.1042 285.876 54.3958 288.168 51.9375C290.46 49.4375 293.564 47.4583 297.48 46C301.397 44.5417 305.689 43.8125 310.355 43.8125C316.189 43.8125 321.147 44.6875 325.23 46.4375C329.314 48.1875 332.418 50.7708 334.543 54.1875C336.668 57.6042 337.73 61.7292 337.73 66.5625V96.25C337.73 97.7083 338.022 98.875 338.605 99.75C339.23 100.625 340.23 101.333 341.605 101.875C343.022 102.375 344.98 102.771 347.48 103.063V108.5C343.855 109.792 340.376 110.438 337.043 110.438C333.001 110.438 329.751 109.479 327.293 107.563C324.876 105.646 323.439 102.896 322.98 99.3125C319.939 103.063 316.522 105.896 312.73 107.813C308.939 109.688 304.814 110.625 300.355 110.625ZM307.668 100.625C310.335 100.625 312.98 100 315.605 98.75C318.272 97.4583 320.689 95.6667 322.855 93.375V75.3125L305.855 80.375C302.939 81.25 300.71 82.625 299.168 84.5C297.626 86.3333 296.855 88.5833 296.855 91.25C296.855 93.0833 297.314 94.7083 298.23 96.125C299.147 97.5417 300.418 98.6458 302.043 99.4375C303.71 100.229 305.585 100.625 307.668 100.625ZM376.543 110.625C369.876 110.625 364.814 108.938 361.355 105.563C357.897 102.146 356.168 97.1667 356.168 90.625V58.375L346.418 54.9375V50.75L366.105 43.8125H371.043V88.0625C371.043 92.0208 372.043 94.9583 374.043 96.875C376.043 98.7917 379.126 99.75 383.293 99.75C385.96 99.75 388.814 99.1458 391.855 97.9375C394.939 96.7292 397.814 95.0625 400.48 92.9375V58.375L390.73 54.9375V50.75L410.418 43.8125H415.355V92.5C415.355 93.9583 415.647 95.125 416.23 96C416.855 96.875 417.855 97.5625 419.23 98.0625C420.605 98.5625 422.564 98.9792 425.105 99.3125V104.75L405.418 110H400.48V98.9375C396.98 102.563 393.085 105.417 388.793 107.5C384.543 109.583 380.46 110.625 376.543 110.625ZM458.73 110.625C453.105 110.625 448.043 109.354 443.543 106.813C439.085 104.229 435.585 100.688 433.043 96.1875C430.501 91.6458 429.23 86.5625 429.23 80.9375C429.23 73.6042 430.751 67.125 433.793 61.5C436.876 55.875 441.189 51.5208 446.73 48.4375C452.272 45.3542 458.689 43.8125 465.98 43.8125C468.355 43.8125 470.772 44.0625 473.23 44.5625C475.73 45.0625 478.085 45.7708 480.293 46.6875V29.5625L470.543 25.875V21.6875L490.168 14.375H495.168V92.5C495.168 93.9583 495.46 95.125 496.043 96C496.668 96.875 497.668 97.5625 499.043 98.0625C500.418 98.5625 502.376 98.9792 504.918 99.3125V104.75L485.23 110H480.293V101.438C477.168 104.396 473.751 106.667 470.043 108.25C466.335 109.833 462.564 110.625 458.73 110.625ZM464.855 100.563C467.355 100.563 469.96 100.042 472.668 99C475.376 97.9167 477.918 96.4583 480.293 94.625V56C476.21 52.6667 471.751 51 466.918 51C462.168 51 458.126 52.125 454.793 54.375C451.46 56.625 448.939 59.7083 447.23 63.625C445.564 67.5417 444.73 71.9792 444.73 76.9375C444.73 81.6458 445.48 85.7708 446.98 89.3125C448.48 92.8542 450.73 95.625 453.73 97.625C456.772 99.5833 460.48 100.563 464.855 100.563ZM541.293 110.625C535.168 110.625 529.647 109.229 524.73 106.438C519.814 103.646 515.96 99.7708 513.168 94.8125C510.418 89.8125 509.043 84.1875 509.043 77.9375C509.043 71.6042 510.46 65.8333 513.293 60.625C516.126 55.4167 520.001 51.3125 524.918 48.3125C529.876 45.3125 535.376 43.8125 541.418 43.8125C546.001 43.8125 550.272 44.7708 554.23 46.6875C558.189 48.6042 561.501 51.2917 564.168 54.75C566.876 58.2083 568.668 62.1667 569.543 66.625L524.168 80.375C525.418 85.875 527.897 90.1875 531.605 93.3125C535.355 96.3958 539.96 97.9375 545.418 97.9375C550.001 97.9375 554.105 96.8542 557.73 94.6875C561.355 92.4792 564.564 89.1458 567.355 84.6875L572.168 86.1875C571.001 91.1042 568.939 95.4167 565.98 99.125C563.064 102.792 559.48 105.625 555.23 107.625C550.98 109.625 546.335 110.625 541.293 110.625ZM553.293 64.75C552.71 61.9583 551.751 59.5208 550.418 57.4375C549.126 55.3125 547.501 53.6875 545.543 52.5625C543.585 51.3958 541.397 50.8125 538.98 50.8125C535.939 50.8125 533.231 51.7083 530.856 53.5C528.481 55.2917 526.626 57.8333 525.293 61.125C523.96 64.375 523.293 68.1458 523.293 72.4375C523.293 73.1458 523.314 73.7083 523.355 74.125L553.293 64.75Z" fill="currentColor"></path><path d="M54.375 118.75L56.125 111L58.125 101L59.75 93L61.25 83.125L62.125 79.875L62 79.625L61.375 79.75L53.875 90L42.5 105.375L33.5 114.875L31.375 115.75L27.625 113.875L28 110.375L30.125 107.375L42.5 91.5L50 81.625L54.875 76L54.75 75.25H54.5L21.5 96.75L15.625 97.5L13 95.125L13.375 91.25L14.625 90L24.5 83.125L49.125 69.375L49.5 68.125L49.125 67.5H47.875L43.75 67.25L29.75 66.875L17.625 66.375L5.75 65.75L2.75 65.125L0 61.375L0.25 59.5L2.75 57.875L6.375 58.125L14.25 58.75L26.125 59.5L34.75 60L47.5 61.375H49.5L49.75 60.5L49.125 60L48.625 59.5L36.25 51.25L23 42.5L16 37.375L12.25 34.75L10.375 32.375L9.625 27.125L13 23.375L17.625 23.75L18.75 24L23.375 27.625L33.25 35.25L46.25 44.875L48.125 46.375L49 45.875V45.5L48.125 44.125L41.125 31.375L33.625 18.375L30.25 13L29.375 9.75C29.0417 8.625 28.875 7.375 28.875 6L32.75 0.750006L34.875 0L40.125 0.750006L42.25 2.625L45.5 10L50.625 21.625L58.75 37.375L61.125 42.125L62.375 46.375L62.875 47.75H63.75V47L64.375 38L65.625 27.125L66.875 13.125L67.25 9.125L69.25 4.375L73.125 1.87501L76.125 3.25L78.625 6.875L78.25 9.125L76.875 18.75L73.875 33.875L72 44.125H73.125L74.375 42.75L79.5 36L88.125 25.25L91.875 21L96.375 16.25L99.25 14H104.625L108.5 19.875L106.75 26L101.25 33L96.625 38.875L90 47.75L86 54.875L86.375 55.375H87.25L102.125 52.125L110.25 50.75L119.75 49.125L124.125 51.125L124.625 53.125L122.875 57.375L112.625 59.875L100.625 62.25L82.75 66.5L82.5 66.625L82.75 67L90.75 67.75L94.25 68H102.75L118.5 69.125L122.625 71.875L125 75.125L124.625 77.75L118.25 80.875L109.75 78.875L89.75 74.125L83 72.5H82V73L87.75 78.625L98.125 88L111.25 100.125L111.875 103.125L110.25 105.625L108.5 105.375L97 96.625L92.5 92.75L82.5 84.375H81.875V85.25L84.125 88.625L96.375 107L97 112.625L96.125 114.375L92.875 115.5L89.5 114.875L82.25 104.875L74.875 93.5L68.875 83.375L68.25 83.875L64.625 121.625L63 123.5L59.25 125L56.125 122.625L54.375 118.75Z" fill="var(--swatch--clay)"></path></svg></div></a><nav role="navigation" class="nav_desktop_layout"><div class="nav_links_component is-desktop"><ul data-wf--nav-links--variant="desktop" role="list" class="nav_links_wrap w-list-unstyled"><li class="nav_links_item"><div data-delay="400" data-hover="true" class="nav_dropdown_component w-dropdown"><div class="nav_links_link w-dropdown-toggle"><div class="nav_links_text u-text-style-body-3">Meet Claude</div><div class="nav_links_svg is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop u-theme-white is-mega is-products w-dropdown-list"><div class="nav_dropdown_main_content"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop is-mega"><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Products</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="/product/overview" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Claude</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/product/claude-code" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Claude Code</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a><link rel="prefetch" href="/product/claude-code"/></li><li class="nav_dropdown_item"><a href="/product/cowork" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Claude Cowork</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a><link rel="prefetch" href="/product/cowork"/></li><li class="nav_dropdown_item"><a href="/product/tag" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">@Claude</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a><link rel="prefetch" href="/product/tag"/></li></ul></div><div class="nav_dropdown_divider_wrap is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Features</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="/claude-for-chrome" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Claude for Chrome</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/claude-for-microsoft-365" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Claude for Microsoft 365</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/skills" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Skills</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Claude apps built for</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="/product/design" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Design</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/product/claude-science" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Science</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/product/claude-security" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Security</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Models</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="https://www.anthropic.com/claude/mythos" target="_blank" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Mythos</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="https://www.anthropic.com/claude/fable" target="_blank" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Fable</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="https://www.anthropic.com/claude/opus" target="_blank" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Opus</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="https://www.anthropic.com/claude/sonnet" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Sonnet</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="https://www.anthropic.com/claude/haiku" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Haiku</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div></div></div></nav></div></li><li class="nav_links_item"><div data-delay="400" data-hover="true" class="nav_dropdown_component w-dropdown"><div class="nav_links_link w-dropdown-toggle"><div class="nav_links_text u-text-style-body-3">Platform</div><div class="nav_links_svg is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop u-theme-white is-mega is-platform w-dropdown-list"><div class="nav_dropdown_main_content"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop is-mega"><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Build on Claude</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="/platform/api" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Overview</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="http://claude.com/pricing#api" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Pricing</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="https://platform.claude.com/docs" target="_blank" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Developer docs</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="https://platform.claude.com/" target="_blank" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Console login</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Works with Claude</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="/ecosystem" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Ecosystem</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/platform/marketplace" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Marketplace</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/connectors" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Connectors</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/plugins" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Plugins</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div></div></div></nav></div></li><li class="nav_links_item"><div data-delay="400" data-hover="true" class="nav_dropdown_component w-dropdown"><div class="nav_links_link w-dropdown-toggle"><div class="nav_links_text u-text-style-body-3">Solutions</div><div class="nav_links_svg is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop u-theme-white is-mega is-solutions w-dropdown-list"><div class="nav_dropdown_main_content"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop is-mega"><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Use cases</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="/solutions/agents" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">AI agents</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/solutions/coding" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Coding</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Company size</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="/solutions/enterprise" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Enterprise</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/programs/startups" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Startups</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Departments</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="/solutions/cybersecurity" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Cybersecurity</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/solutions/legal" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Legal</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega is-solutions-2col"><div class="nav_dropdown_label u-text-style-caption">Industries</div><ul role="list" class="nav_dropdown_list is-2col"><li class="nav_dropdown_item"><a href="/solutions/customer-support" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Customer support</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/solutions/financial-services" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Financial services</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/solutions/government" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Government</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/solutions/healthcare" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Healthcare</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/solutions/education" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Higher education</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/solutions/teachers" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">K-12 teachers</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/solutions/life-sciences" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Life sciences</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/solutions/nonprofits" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Nonprofits</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div></div></div></nav></div></li><li class="nav_links_item"><div data-delay="400" data-hover="true" class="nav_dropdown_component w-dropdown"><div class="nav_links_link w-dropdown-toggle"><div class="nav_links_text u-text-style-body-3">Pricing</div><div class="nav_links_svg is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop u-theme-white w-dropdown-list"><div class="nav_dropdown_main_content"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop"><div class="nav_dropdown_list_wrap"><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="/pricing" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Overview</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a><link rel="prefetch" href="/pricing"/></li><li class="nav_dropdown_item"><a href="/pricing#api" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">API</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div></div></div></nav></div></li><li class="nav_links_item"><div data-delay="400" data-hover="true" class="nav_dropdown_component w-dropdown"><div class="nav_links_link w-dropdown-toggle"><div class="nav_links_text u-text-style-body-3">Resources</div><div class="nav_links_svg is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop u-theme-white is-mega is-learn is-resources w-dropdown-list"><div class="nav_dropdown_main_content"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop is-mega"><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Insights</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="/blog" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Blog</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/customers" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Customer stories</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="https://www.anthropic.com/news" target="_blank" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Anthropic news</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Learn</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="https://www.anthropic.com/learn" target="_blank" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Anthropic Academy</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/resources/courses" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Courses</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/resources/tutorials" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Tutorials</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/resources/use-cases" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Use cases</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption">Connect</div><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a href="https://www.anthropic.com/events" target="_blank" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Events</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item"><a href="/community" class="nav_dropdown_link w-inline-block"><div class="nav_dropdown_text">Community</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div></div></div></nav></div></li><li class="nav_links_item"><a href="https://claude.ai/login" class="nav_links_link w-inline-block"><div class="nav_links_text u-text-style-body-3">Login</div></a></li></ul><ul data-wf--nav-actions--variant="desktop" role="list" class="nav_actions_wrap w-list-unstyled"><li class="nav_buttons_item is-main is-desktop"><div data-wf--button-small--style="tertiary" class="button_small_wrap w-variant-a8c9bb6a-76f8-d6fa-8374-826ae4429994"><div class="u-embed-css w-embed"><style>
.button_small_icon {
  transition: color 300ms ease;
}
.button_small_wrap:hover .button_small_icon {
  color: var(--_button-style---icon-hover); 
}
.button_small_wrap:focus-within .button_small_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_small_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_small_text u-text-style-body-3">Contact sales</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Contact sales" target="" data-cta="" data-cta-position="" href="/contact-sales" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Contact sales</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Contact sales</span></button></div></div></li><li class="nav_buttons_item is-main is-desktop"><div data-wf--button-small--style="primary" class="button_small_wrap"><div class="u-embed-css w-embed"><style>
.button_small_icon {
  transition: color 300ms ease;
}
.button_small_wrap:hover .button_small_icon {
  color: var(--_button-style---icon-hover); 
}
.button_small_wrap:focus-within .button_small_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_small_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_small_text u-text-style-body-3">Try Claude</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Try Claude" target="" data-cta="" data-cta-position="" href="https://claude.ai/" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Try Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Try Claude</span></button></div></div></li><li class="nav_buttons_item is-main is-mobile"><div data-wf--button-main--style="tertiary" class="button_main_wrap w-variant-53cd577f-e297-ccd8-fb9d-999cb11e323c"><div class="u-embed-css w-embed"><style>
.button_main_icon {
  transition: color 300ms ease;
}
.button_main_wrap:hover .button_main_icon {
  color: var(--_button-style---icon-hover); 
}
.button_main_wrap:focus-within .button_main_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_main_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_main_text u-text-style-body-2">Contact sales</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Contact sales" target="" data-cta="" data-cta-position="Navigation" href="/contact-sales" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Contact sales</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Contact sales</span></button></div></div></li><li class="nav_buttons_item is-main is-mobile"><div data-wf--button-main--style="primary" class="button_main_wrap"><div class="u-embed-css w-embed"><style>
.button_main_icon {
  transition: color 300ms ease;
}
.button_main_wrap:hover .button_main_icon {
  color: var(--_button-style---icon-hover); 
}
.button_main_wrap:focus-within .button_main_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_main_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_main_text u-text-style-body-2">Try Claude</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Try Claude" target="" data-cta="" data-cta-position="" href="https://claude.ai/" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Try Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Try Claude</span></button></div></div></li></ul></div></nav></div></div><nav class="nav_wrap is-mobile"><div class="nav_mobile_contain u-container"><a aria-label="Home Page" href="#" class="nav_logo_wrap w-inline-block"><div STYLE="" class="u-max-width-full"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 573 125" fill="none" class="u-svg"><path d="M200.168 110.625C190.376 110.625 181.647 108.688 173.98 104.813C166.355 100.896 160.397 95.4167 156.105 88.375C151.814 81.3333 149.668 73.25 149.668 64.125C149.668 54.4167 151.855 45.7917 156.23 38.25C160.647 30.7083 166.751 24.8542 174.543 20.6875C182.335 16.4792 191.189 14.375 201.105 14.375C207.064 14.375 213.001 15.0208 218.918 16.3125C224.876 17.5625 230.105 19.5208 234.605 22.1875V42.75H228.98C227.397 35.2083 224.293 29.7292 219.668 26.3125C215.085 22.8958 208.814 21.1875 200.855 21.1875C193.23 21.1875 186.897 22.8958 181.855 26.3125C176.814 29.7292 173.085 34.5 170.668 40.625C168.251 46.7083 167.043 53.7917 167.043 61.875C167.043 69.8333 168.397 76.9792 171.105 83.3125C173.814 89.6458 177.835 94.6458 183.168 98.3125C188.501 101.979 194.918 103.813 202.418 103.813C207.501 103.813 211.855 102.813 215.48 100.813C219.147 98.8125 222.23 96.0833 224.73 92.625C227.23 89.125 229.564 84.8333 231.73 79.75H237.605L233.605 102.313C229.272 105.104 224.105 107.188 218.105 108.563C212.105 109.938 206.126 110.625 200.168 110.625ZM243.168 103.938C245.626 103.646 247.543 103.271 248.918 102.813C250.335 102.313 251.355 101.646 251.98 100.813C252.605 99.9792 252.918 98.9167 252.918 97.625V29.5625L243.168 25.875V21.6875L262.793 14.375H267.793V97.625C267.793 98.9167 268.105 99.9792 268.73 100.813C269.355 101.646 270.355 102.313 271.73 102.813C273.147 103.271 275.085 103.646 277.543 103.938V109.375H243.168V103.938ZM300.355 110.625C296.772 110.625 293.605 109.958 290.855 108.625C288.105 107.292 285.96 105.417 284.418 103C282.918 100.583 282.168 97.7917 282.168 94.625C282.168 90 283.626 86.1875 286.543 83.1875C289.501 80.1458 294.043 77.75 300.168 76L322.855 69.5625V62.75C322.855 58.2917 321.793 54.9167 319.668 52.625C317.585 50.3333 314.48 49.1875 310.355 49.1875C306.73 49.1875 303.855 50.2917 301.73 52.5C299.647 54.7083 298.605 57.7083 298.605 61.5V67.125H288.48C287.272 66.375 286.335 65.3958 285.668 64.1875C285.043 62.9375 284.73 61.5625 284.73 60.0625C284.73 57.1042 285.876 54.3958 288.168 51.9375C290.46 49.4375 293.564 47.4583 297.48 46C301.397 44.5417 305.689 43.8125 310.355 43.8125C316.189 43.8125 321.147 44.6875 325.23 46.4375C329.314 48.1875 332.418 50.7708 334.543 54.1875C336.668 57.6042 337.73 61.7292 337.73 66.5625V96.25C337.73 97.7083 338.022 98.875 338.605 99.75C339.23 100.625 340.23 101.333 341.605 101.875C343.022 102.375 344.98 102.771 347.48 103.063V108.5C343.855 109.792 340.376 110.438 337.043 110.438C333.001 110.438 329.751 109.479 327.293 107.563C324.876 105.646 323.439 102.896 322.98 99.3125C319.939 103.063 316.522 105.896 312.73 107.813C308.939 109.688 304.814 110.625 300.355 110.625ZM307.668 100.625C310.335 100.625 312.98 100 315.605 98.75C318.272 97.4583 320.689 95.6667 322.855 93.375V75.3125L305.855 80.375C302.939 81.25 300.71 82.625 299.168 84.5C297.626 86.3333 296.855 88.5833 296.855 91.25C296.855 93.0833 297.314 94.7083 298.23 96.125C299.147 97.5417 300.418 98.6458 302.043 99.4375C303.71 100.229 305.585 100.625 307.668 100.625ZM376.543 110.625C369.876 110.625 364.814 108.938 361.355 105.563C357.897 102.146 356.168 97.1667 356.168 90.625V58.375L346.418 54.9375V50.75L366.105 43.8125H371.043V88.0625C371.043 92.0208 372.043 94.9583 374.043 96.875C376.043 98.7917 379.126 99.75 383.293 99.75C385.96 99.75 388.814 99.1458 391.855 97.9375C394.939 96.7292 397.814 95.0625 400.48 92.9375V58.375L390.73 54.9375V50.75L410.418 43.8125H415.355V92.5C415.355 93.9583 415.647 95.125 416.23 96C416.855 96.875 417.855 97.5625 419.23 98.0625C420.605 98.5625 422.564 98.9792 425.105 99.3125V104.75L405.418 110H400.48V98.9375C396.98 102.563 393.085 105.417 388.793 107.5C384.543 109.583 380.46 110.625 376.543 110.625ZM458.73 110.625C453.105 110.625 448.043 109.354 443.543 106.813C439.085 104.229 435.585 100.688 433.043 96.1875C430.501 91.6458 429.23 86.5625 429.23 80.9375C429.23 73.6042 430.751 67.125 433.793 61.5C436.876 55.875 441.189 51.5208 446.73 48.4375C452.272 45.3542 458.689 43.8125 465.98 43.8125C468.355 43.8125 470.772 44.0625 473.23 44.5625C475.73 45.0625 478.085 45.7708 480.293 46.6875V29.5625L470.543 25.875V21.6875L490.168 14.375H495.168V92.5C495.168 93.9583 495.46 95.125 496.043 96C496.668 96.875 497.668 97.5625 499.043 98.0625C500.418 98.5625 502.376 98.9792 504.918 99.3125V104.75L485.23 110H480.293V101.438C477.168 104.396 473.751 106.667 470.043 108.25C466.335 109.833 462.564 110.625 458.73 110.625ZM464.855 100.563C467.355 100.563 469.96 100.042 472.668 99C475.376 97.9167 477.918 96.4583 480.293 94.625V56C476.21 52.6667 471.751 51 466.918 51C462.168 51 458.126 52.125 454.793 54.375C451.46 56.625 448.939 59.7083 447.23 63.625C445.564 67.5417 444.73 71.9792 444.73 76.9375C444.73 81.6458 445.48 85.7708 446.98 89.3125C448.48 92.8542 450.73 95.625 453.73 97.625C456.772 99.5833 460.48 100.563 464.855 100.563ZM541.293 110.625C535.168 110.625 529.647 109.229 524.73 106.438C519.814 103.646 515.96 99.7708 513.168 94.8125C510.418 89.8125 509.043 84.1875 509.043 77.9375C509.043 71.6042 510.46 65.8333 513.293 60.625C516.126 55.4167 520.001 51.3125 524.918 48.3125C529.876 45.3125 535.376 43.8125 541.418 43.8125C546.001 43.8125 550.272 44.7708 554.23 46.6875C558.189 48.6042 561.501 51.2917 564.168 54.75C566.876 58.2083 568.668 62.1667 569.543 66.625L524.168 80.375C525.418 85.875 527.897 90.1875 531.605 93.3125C535.355 96.3958 539.96 97.9375 545.418 97.9375C550.001 97.9375 554.105 96.8542 557.73 94.6875C561.355 92.4792 564.564 89.1458 567.355 84.6875L572.168 86.1875C571.001 91.1042 568.939 95.4167 565.98 99.125C563.064 102.792 559.48 105.625 555.23 107.625C550.98 109.625 546.335 110.625 541.293 110.625ZM553.293 64.75C552.71 61.9583 551.751 59.5208 550.418 57.4375C549.126 55.3125 547.501 53.6875 545.543 52.5625C543.585 51.3958 541.397 50.8125 538.98 50.8125C535.939 50.8125 533.231 51.7083 530.856 53.5C528.481 55.2917 526.626 57.8333 525.293 61.125C523.96 64.375 523.293 68.1458 523.293 72.4375C523.293 73.1458 523.314 73.7083 523.355 74.125L553.293 64.75Z" fill="currentColor"></path><path d="M54.375 118.75L56.125 111L58.125 101L59.75 93L61.25 83.125L62.125 79.875L62 79.625L61.375 79.75L53.875 90L42.5 105.375L33.5 114.875L31.375 115.75L27.625 113.875L28 110.375L30.125 107.375L42.5 91.5L50 81.625L54.875 76L54.75 75.25H54.5L21.5 96.75L15.625 97.5L13 95.125L13.375 91.25L14.625 90L24.5 83.125L49.125 69.375L49.5 68.125L49.125 67.5H47.875L43.75 67.25L29.75 66.875L17.625 66.375L5.75 65.75L2.75 65.125L0 61.375L0.25 59.5L2.75 57.875L6.375 58.125L14.25 58.75L26.125 59.5L34.75 60L47.5 61.375H49.5L49.75 60.5L49.125 60L48.625 59.5L36.25 51.25L23 42.5L16 37.375L12.25 34.75L10.375 32.375L9.625 27.125L13 23.375L17.625 23.75L18.75 24L23.375 27.625L33.25 35.25L46.25 44.875L48.125 46.375L49 45.875V45.5L48.125 44.125L41.125 31.375L33.625 18.375L30.25 13L29.375 9.75C29.0417 8.625 28.875 7.375 28.875 6L32.75 0.750006L34.875 0L40.125 0.750006L42.25 2.625L45.5 10L50.625 21.625L58.75 37.375L61.125 42.125L62.375 46.375L62.875 47.75H63.75V47L64.375 38L65.625 27.125L66.875 13.125L67.25 9.125L69.25 4.375L73.125 1.87501L76.125 3.25L78.625 6.875L78.25 9.125L76.875 18.75L73.875 33.875L72 44.125H73.125L74.375 42.75L79.5 36L88.125 25.25L91.875 21L96.375 16.25L99.25 14H104.625L108.5 19.875L106.75 26L101.25 33L96.625 38.875L90 47.75L86 54.875L86.375 55.375H87.25L102.125 52.125L110.25 50.75L119.75 49.125L124.125 51.125L124.625 53.125L122.875 57.375L112.625 59.875L100.625 62.25L82.75 66.5L82.5 66.625L82.75 67L90.75 67.75L94.25 68H102.75L118.5 69.125L122.625 71.875L125 75.125L124.625 77.75L118.25 80.875L109.75 78.875L89.75 74.125L83 72.5H82V73L87.75 78.625L98.125 88L111.25 100.125L111.875 103.125L110.25 105.625L108.5 105.375L97 96.625L92.5 92.75L82.5 84.375H81.875V85.25L84.125 88.625L96.375 107L97 112.625L96.125 114.375L92.875 115.5L89.5 114.875L82.25 104.875L74.875 93.5L68.875 83.375L68.25 83.875L64.625 121.625L63 123.5L59.25 125L56.125 122.625L54.375 118.75Z" fill="var(--swatch--clay)"></path></svg></div></a><div class="nav_mobile_layout"><div class="nav_actions_mobile"><ul data-wf--nav-actions--variant="desktop" role="list" class="nav_actions_wrap w-list-unstyled"><li class="nav_buttons_item is-main is-desktop"><div data-wf--button-small--style="tertiary" class="button_small_wrap w-variant-a8c9bb6a-76f8-d6fa-8374-826ae4429994"><div class="u-embed-css w-embed"><style>
.button_small_icon {
  transition: color 300ms ease;
}
.button_small_wrap:hover .button_small_icon {
  color: var(--_button-style---icon-hover); 
}
.button_small_wrap:focus-within .button_small_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_small_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_small_text u-text-style-body-3">Contact sales</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Contact sales" target="" data-cta="" data-cta-position="" href="/contact-sales" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Contact sales</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Contact sales</span></button></div></div></li><li class="nav_buttons_item is-main is-desktop"><div data-wf--button-small--style="primary" class="button_small_wrap"><div class="u-embed-css w-embed"><style>
.button_small_icon {
  transition: color 300ms ease;
}
.button_small_wrap:hover .button_small_icon {
  color: var(--_button-style---icon-hover); 
}
.button_small_wrap:focus-within .button_small_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_small_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_small_text u-text-style-body-3">Try Claude</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Try Claude" target="" data-cta="" data-cta-position="" href="https://claude.ai/" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Try Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Try Claude</span></button></div></div></li><li class="nav_buttons_item is-main is-mobile"><div data-wf--button-main--style="tertiary" class="button_main_wrap w-variant-53cd577f-e297-ccd8-fb9d-999cb11e323c"><div class="u-embed-css w-embed"><style>
.button_main_icon {
  transition: color 300ms ease;
}
.button_main_wrap:hover .button_main_icon {
  color: var(--_button-style---icon-hover); 
}
.button_main_wrap:focus-within .button_main_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_main_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_main_text u-text-style-body-2">Contact sales</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Contact sales" target="" data-cta="" data-cta-position="Navigation" href="/contact-sales" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Contact sales</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Contact sales</span></button></div></div></li><li class="nav_buttons_item is-main is-mobile"><div data-wf--button-main--style="primary" class="button_main_wrap"><div class="u-embed-css w-embed"><style>
.button_main_icon {
  transition: color 300ms ease;
}
.button_main_wrap:hover .button_main_icon {
  color: var(--_button-style---icon-hover); 
}
.button_main_wrap:focus-within .button_main_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_main_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_main_text u-text-style-body-2">Try Claude</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Try Claude" target="" data-cta="" data-cta-position="" href="https://claude.ai/" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Try Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Try Claude</span></button></div></div></li></ul></div><button aria-controls="nav-menu" aria-expanded="false" aria-label="Open Menu" class="nav_btn_wrap"><div class="nav_btn_layout"><div class="nav_btn_line"></div><div class="nav_btn_line"></div><div class="nav_btn_line is-bottom"></div></div></button><div class="nav_menu_wrap u-theme-white"><div class="nav_menu_inner"><div class="nav_menu_links_wrap"><ul data-wf--nav-links--variant="mobile" role="list" class="nav_links_wrap w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-list-unstyled"><li class="nav_links_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div data-delay="400" data-hover="true" class="nav_dropdown_component w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-dropdown"><div class="nav_links_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-dropdown-toggle"><div class="nav_links_text u-text-style-body-3 w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Meet Claude</div><div class="nav_links_svg w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb u-theme-white is-mega is-products w-dropdown-list"><div class="nav_dropdown_main_content w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Products</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/product/overview" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Claude</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/product/claude-code" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Claude Code</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a><link rel="prefetch" href="/product/claude-code"/></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/product/cowork" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Claude Cowork</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a><link rel="prefetch" href="/product/cowork"/></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/product/tag" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">@Claude</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a><link rel="prefetch" href="/product/tag"/></li></ul></div><div class="nav_dropdown_divider_wrap w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Features</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/claude-for-chrome" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Claude for Chrome</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/claude-for-microsoft-365" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Claude for Microsoft 365</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/skills" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Skills</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Claude apps built for</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/product/design" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Design</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/product/claude-science" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Science</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/product/claude-security" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Security</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Models</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://www.anthropic.com/claude/mythos" target="_blank" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Mythos</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://www.anthropic.com/claude/fable" target="_blank" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Fable</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://www.anthropic.com/claude/opus" target="_blank" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Opus</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://www.anthropic.com/claude/sonnet" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Sonnet</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://www.anthropic.com/claude/haiku" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Haiku</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div></div></div></nav></div></li><li class="nav_links_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div data-delay="400" data-hover="true" class="nav_dropdown_component w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-dropdown"><div class="nav_links_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-dropdown-toggle"><div class="nav_links_text u-text-style-body-3 w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Platform</div><div class="nav_links_svg w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb u-theme-white is-mega is-platform w-dropdown-list"><div class="nav_dropdown_main_content w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Build on Claude</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/platform/api" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Overview</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="http://claude.com/pricing#api" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Pricing</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://platform.claude.com/docs" target="_blank" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Developer docs</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://platform.claude.com/" target="_blank" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Console login</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Works with Claude</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/ecosystem" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Ecosystem</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/platform/marketplace" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Marketplace</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/connectors" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Connectors</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/plugins" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Plugins</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div></div></div></nav></div></li><li class="nav_links_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div data-delay="400" data-hover="true" class="nav_dropdown_component w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-dropdown"><div class="nav_links_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-dropdown-toggle"><div class="nav_links_text u-text-style-body-3 w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Solutions</div><div class="nav_links_svg w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb u-theme-white is-mega is-solutions w-dropdown-list"><div class="nav_dropdown_main_content w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Use cases</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/agents" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">AI agents</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/coding" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Coding</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Company size</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/enterprise" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Enterprise</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/programs/startups" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Startups</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Departments</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/cybersecurity" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Cybersecurity</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/legal" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Legal</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega is-solutions-2col"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Industries</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-2col"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/customer-support" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Customer support</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/financial-services" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Financial services</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/government" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Government</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/healthcare" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Healthcare</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/education" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Higher education</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/teachers" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">K-12 teachers</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/life-sciences" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Life sciences</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/solutions/nonprofits" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Nonprofits</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div></div></div></nav></div></li><li class="nav_links_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div data-delay="400" data-hover="true" class="nav_dropdown_component w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-dropdown"><div class="nav_links_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-dropdown-toggle"><div class="nav_links_text u-text-style-body-3 w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Pricing</div><div class="nav_links_svg w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb u-theme-white w-dropdown-list"><div class="nav_dropdown_main_content w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div class="nav_dropdown_list_wrap"><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/pricing" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Overview</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a><link rel="prefetch" href="/pricing"/></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/pricing#api" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">API</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div></div></div></nav></div></li><li class="nav_links_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div data-delay="400" data-hover="true" class="nav_dropdown_component w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-dropdown"><div class="nav_links_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-dropdown-toggle"><div class="nav_links_text u-text-style-body-3 w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Resources</div><div class="nav_links_svg w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb u-theme-white is-mega is-learn is-resources w-dropdown-list"><div class="nav_dropdown_main_content w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Insights</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/blog" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Blog</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/customers" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Customer stories</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://www.anthropic.com/news" target="_blank" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Anthropic news</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Learn</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://www.anthropic.com/learn" target="_blank" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Anthropic Academy</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/resources/courses" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Courses</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/resources/tutorials" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Tutorials</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/resources/use-cases" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Use cases</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div><div class="nav_dropdown_divider_wrap w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb is-mega"><div class="nav_dropdown_divider_fill"></div></div><div class="nav_dropdown_list_wrap is-mega"><div class="nav_dropdown_label u-text-style-caption w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Connect</div><ul role="list" class="nav_dropdown_list w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://www.anthropic.com/events" target="_blank" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Events</div><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li><li class="nav_dropdown_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="/community" class="nav_dropdown_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_dropdown_text">Community</div><div class="nav_dropdown_icon u-display-none"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.5374 3 16.5747 3.00436 16.6113 3.0127C16.6347 3.01803 16.6574 3.02559 16.6797 3.03418C16.687 3.03701 16.6939 3.04076 16.7012 3.04395C16.7213 3.05283 16.7409 3.06272 16.7598 3.07422C16.7675 3.07892 16.7757 3.08274 16.7832 3.08789C16.8082 3.10508 16.8317 3.12471 16.8535 3.14648L16.918 3.22461C16.9289 3.24116 16.9356 3.25988 16.9443 3.27734C16.95 3.28857 16.9572 3.29894 16.9619 3.31055C16.9789 3.35212 16.9888 3.39547 16.9941 3.43945C16.9966 3.45953 17 3.47957 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z" fill="currentColor"></path></svg></div></div></a></li></ul></div></div></div></nav></div></li><li class="nav_links_item w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb"><a href="https://claude.ai/login" class="nav_links_link w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb w-inline-block"><div class="nav_links_text u-text-style-body-3 w-variant-a32dbd8b-fe5b-f07d-4c02-33134a110ceb">Login</div></a></li></ul></div><div class="nav_menu_actions_wrap"><ul data-wf--nav-actions--variant="mobile" role="list" class="nav_actions_wrap w-variant-8af8ad28-28c5-f3ef-7a42-268c913b0cc3 w-list-unstyled"><li class="nav_buttons_item is-main is-desktop w-variant-8af8ad28-28c5-f3ef-7a42-268c913b0cc3"><div data-wf--button-small--style="tertiary" class="button_small_wrap w-variant-a8c9bb6a-76f8-d6fa-8374-826ae4429994"><div class="u-embed-css w-embed"><style>
.button_small_icon {
  transition: color 300ms ease;
}
.button_small_wrap:hover .button_small_icon {
  color: var(--_button-style---icon-hover); 
}
.button_small_wrap:focus-within .button_small_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_small_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_small_text u-text-style-body-3">Contact sales</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Contact sales" target="" data-cta="" data-cta-position="" href="/contact-sales" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Contact sales</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Contact sales</span></button></div></div></li><li class="nav_buttons_item is-main is-desktop w-variant-8af8ad28-28c5-f3ef-7a42-268c913b0cc3"><div data-wf--button-small--style="primary" class="button_small_wrap"><div class="u-embed-css w-embed"><style>
.button_small_icon {
  transition: color 300ms ease;
}
.button_small_wrap:hover .button_small_icon {
  color: var(--_button-style---icon-hover); 
}
.button_small_wrap:focus-within .button_small_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_small_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_small_text u-text-style-body-3">Try Claude</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Try Claude" target="" data-cta="" data-cta-position="" href="https://claude.ai/" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Try Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Try Claude</span></button></div></div></li><li class="nav_buttons_item is-main is-mobile w-variant-8af8ad28-28c5-f3ef-7a42-268c913b0cc3"><div data-wf--button-main--style="tertiary" class="button_main_wrap w-variant-53cd577f-e297-ccd8-fb9d-999cb11e323c"><div class="u-embed-css w-embed"><style>
.button_main_icon {
  transition: color 300ms ease;
}
.button_main_wrap:hover .button_main_icon {
  color: var(--_button-style---icon-hover); 
}
.button_main_wrap:focus-within .button_main_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_main_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_main_text u-text-style-body-2">Contact sales</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Contact sales" target="" data-cta="" data-cta-position="Navigation" href="/contact-sales" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Contact sales</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Contact sales</span></button></div></div></li><li class="nav_buttons_item is-main is-mobile w-variant-8af8ad28-28c5-f3ef-7a42-268c913b0cc3"><div data-wf--button-main--style="primary" class="button_main_wrap"><div class="u-embed-css w-embed"><style>
.button_main_icon {
  transition: color 300ms ease;
}
.button_main_wrap:hover .button_main_icon {
  color: var(--_button-style---icon-hover); 
}
.button_main_wrap:focus-within .button_main_icon {
  color: var(--_button-style---text-hover) !important;
}
.button_main_wrap:focus-within {
  color: var(--_button-style---text-hover) !important;
}
</style></div><div aria-hidden="true" class="button_main_text u-text-style-body-2">Try Claude</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Try Claude" target="" data-cta="" data-cta-position="" href="https://claude.ai/" data-wf-event-ids="157059830" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Try Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Try Claude</span></button></div></div></li></ul></div></div></div></div></div></nav><div class="nav_secondary_wrap"><div class="nav_secondary_contain u-container"><nav class="breadcrumb_nav"><ol itemtype="https://schema.org/BreadcrumbList" itemscope="https://schema.org/BreadcrumbList" role="list" class="breadcrumb_list w-list-unstyled"><li itemprop="itemListElement" itemscope="https://schema.org/ListItem" itemtype="https://schema.org/ListItem" class="breadcrumb_item is_first"><div class="u-position-relative"><div itemprop="name" class="breadcrumb_text u-text-style-caption">Tutorials</div><a itemprop="item" href="https://claude.com/resources/tutorials" class="breadcrumb_text u-text-style-caption is_linked w-inline-block"><div itemprop="name">Tutorials</div></a></div><meta itemprop="position" content="1"/><span data-bc-sep="" class="breadcrumb_text u-text-style-caption is_divider">/</span></li><li itemprop="itemListElement" itemscope="https://schema.org/ListItem" itemtype="https://schema.org/ListItem" class="breadcrumb_item is_second"><span itemprop="item" itemtype="https://schema.org/WebPage"><div itemprop="name" class="breadcrumb_text u-text-style-caption is_second_item">Claude for nonprofits partnership success guide for admins</div></span><meta itemprop="position" content="2"/></li></ol></nav><div data-delay="400" data-hover="true" class="nav_dropdown_component is-secondary w-dropdown"><div class="nav_links_link is-secondary w-dropdown-toggle"><div class="nav_links_text u-text-style-caption">Explore here</div><div class="nav_links_svg is-desktop"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z" fill="currentColor"></path></svg></div></div><div class="nav_links_svg is-mobile"><div class="nav_links_svg_line"></div><div class="nav_links_svg_line is-2"></div></div></div><nav class="nav_dropdown_main_wrap is-desktop u-theme-white is-secondary w-dropdown-list"><div class="nav_dropdown_main_content"><div data-lenis-prevent="" class="nav_dropdown_main_scroll is-desktop"><div class="nav_dropdown_list_wrap u-margin-trim"><ul role="list" class="nav_dropdown_list"><li class="nav_dropdown_item"><a data-cta-copy="Ask Claude about this page" data-ask-page="" data-cta="Claude for nonprofits partnership success guide for admins" data-cta-position="Explore here dropdown" href="#" class="nav_dropdown_link is-secondary w-inline-block"><div class="nav_dropdown_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5H3C2.79779 17.5 2.61549 17.3782 2.53809 17.1914C2.4607 17.0046 2.50349 16.7895 2.64648 16.6465L4.35547 14.9365C3.20124 13.6175 2.5 11.8906 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5ZM10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 11.7952 4.22659 13.4199 5.40332 14.5967L5.46582 14.6729C5.52017 14.7544 5.5498 14.8508 5.5498 14.9502C5.5498 15.0828 5.49709 15.2099 5.40332 15.3037L4.20703 16.5H10C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5ZM13.29 9.30371C13.3986 9.05001 13.6925 8.93174 13.9463 9.04004C14.2 9.14863 14.3183 9.44253 14.21 9.69629C13.8506 10.536 13.1645 11.25 12.25 11.25C11.6372 11.25 11.128 10.9289 10.75 10.4648C10.372 10.9289 9.86276 11.25 9.25 11.25C8.63724 11.25 8.12801 10.9289 7.75 10.4648C7.37198 10.9289 6.86276 11.25 6.25 11.25C5.97386 11.25 5.75 11.0261 5.75 10.75C5.75 10.4739 5.97386 10.25 6.25 10.25C6.58764 10.25 7.00448 9.97056 7.29004 9.30371L7.32422 9.2373C7.41431 9.09121 7.5749 9 7.75 9C7.9501 9 8.13123 9.11975 8.20996 9.30371L8.32227 9.53516C8.59804 10.0359 8.95442 10.25 9.25 10.25C9.58764 10.25 10.0045 9.97056 10.29 9.30371L10.3242 9.2373C10.4143 9.09121 10.5749 9 10.75 9C10.9501 9 11.1312 9.11975 11.21 9.30371L11.3223 9.53516C11.598 10.0359 11.9544 10.25 12.25 10.25C12.5876 10.25 13.0045 9.97056 13.29 9.30371Z" fill="currentColor"></path></svg></div></div><div class="nav_dropdown_text">Ask questions about this page</div></a></li><li class="nav_dropdown_item"><a id="copy-as-markdown" data-cta="Claude for nonprofits partnership success guide for admins" data-cta-position="Explore here dropdown" data-cta-copy="Copy markdown" href="#" class="nav_dropdown_link is-secondary w-inline-block"><div class="nav_dropdown_icon"><div class="icon_wrap"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 21" fill="none" class="u-svg"><path d="M12.5 3.60938C13.3284 3.60938 14 4.28095 14 5.10938V6.60938H15.5C16.3284 6.60938 17 7.28095 17 8.10938V16.1094C17 16.9378 16.3284 17.6094 15.5 17.6094H7.5C6.67157 17.6094 6 16.9378 6 16.1094V14.6094H4.5C3.67157 14.6094 3 13.9378 3 13.1094V5.10938C3 4.28095 3.67157 3.60938 4.5 3.60938H12.5ZM14 13.1094C14 13.9378 13.3284 14.6094 12.5 14.6094H7V16.1094C7 16.3855 7.22386 16.6094 7.5 16.6094H15.5C15.7761 16.6094 16 16.3855 16 16.1094V8.10938C16 7.83323 15.7761 7.60938 15.5 7.60938H14V13.1094ZM4.5 4.60938C4.22386 4.60938 4 4.83323 4 5.10938V13.1094C4 13.3855 4.22386 13.6094 4.5 13.6094H12.5C12.7761 13.6094 13 13.3855 13 13.1094V5.10938C13 4.83323 12.7761 4.60938 12.5 4.60938H4.5Z" fill="currentColor"></path></svg></div></div><div class="nav_dropdown_text">Copy as markdown</div></a></li></ul></div></div></div></nav></div></div></div><div aria-hidden="true" class="transition_wrap"></div></div><div class="u-embed-css w-embed"><style>
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - 
THUMBNAIL BG COLORS
- - - - - - - - - - - - - - - - - - - - - - - - - - - - */
[data-thumbnail-bg="Clay"]    { background-color: var(--swatch--clay); }
[data-thumbnail-bg="Cactus"]  { background-color: var(--swatch--cactus); }
[data-thumbnail-bg="Coral"]   { background-color: var(--swatch--coral); }
[data-thumbnail-bg="Fig"]     { background-color: var(--swatch--fig); }
[data-thumbnail-bg="Heather"] { background-color: var(--swatch--heather); }
[data-thumbnail-bg="Oat"]     { background-color: var(--swatch--oat); }
[data-thumbnail-bg="Olive"]   { background-color: var(--swatch--olive); }
[data-thumbnail-bg="Sky"]     { background-color: var(--swatch--sky); }
[data-thumbnail-bg="Peach"]   { background-color: var(--swatch--peach); }
[data-thumbnail-bg="Plum"]    { background-color: var(--swatch--plum); }
[data-thumbnail-bg="Mineral"] { background-color: var(--swatch--mineral); }

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - 
CONDITIONAL STYLES BASED ON IF IMAGE OR VIDEO ARE VISIBLE
- - - - - - - - - - - - - - - - - - - - - - - - - - - - */
.hero_tutorial_post_wrap:has(+ .tutorial_post_media_wrap :is(.tutorial_post_image_wrap, .tutorial_post_video_wrap):not(.w-condition-invisible)) {
  border-bottom: none !important;
}

.tutorial_post_media_wrap:has(+ .tutorial_post_wrap:not(.w-condition-invisible)) .u-section-spacer {
  display: none !important;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - 
TABLE OF CONTENTS
Adding here so classes don't get accidentally cleared
- - - - - - - - - - - - - - - - - - - - - - - - - - - - */
.tutorial_post_toc_list {
  color: var(--_theme---foreground-tertiary); 
  font-size: var(--_typography---font-size--body-3);
}

.tutorial_post_toc_item {
  margin-left: -0.0625rem; 
  padding-top: var(--_spacing---space--0-25rem);
  padding-bottom: var(--_spacing---space--0-25rem); 
  padding-left: var(--_spacing---space--1rem); 
  border-left-style: solid; 
  border-left-width: var(--border-width--main); 
  border-left-color: var(--_theme---border-secondary);
}

.tutorial_post_toc_item.active {
  border-left-color: var(--_theme---heroes-accent);
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - 
ANCHOR LINK
- - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* offset for <span class="anchor"> that takes fixed header height into account */
.anchor { 
	position: relative;
  top: calc(-1 * var(--_spacing---space--4rem) - 120px); 
}
/* Copy anchor link to clipboard button */
.anchor-link-box {
	/* quick btn reset */
	background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  /* other styles */
  position: absolute !important;
  left: -3rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s ease;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--_theme---background-tertiary);
  border: var(--border-width--main) solid var(--_theme---border-tertiary);
  border-radius: var(--radius--main);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--_spacing---space--0-5rem);
}

.anchor-link-box:hover {
  opacity: 1;
}

.tooltip {
  opacity: 0;
  transition: opacity 0.2s ease;
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.5rem);
  transform: translateX(-50%);
  background: var(--_theme---button-primary--background);
  color: var(--_theme---button-primary--text);
  white-space: nowrap;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius--x-small);
  font-family: var(--_typography---font--primary-family);
  font-size: var(--_typography---font-size--caption);
  line-height: var(--_typography---line-height--1-6);
}

.tooltip.active {
  opacity: 1;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - 
HIDE EMPTY <p> TAGS
- - - - - - - - - - - - - - - - - - - - - - - - - - - - */
p:empty,
p:has(> br:only-child) {
  display: none;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - 
BORDER RADIUS ON RICH TEXT VIDEOS
- - - - - - - - - - - - - - - - - - - - - - - - - - - - */
.w-richtext-figure-type-video {
	border-radius: var(--radius--main);
	overflow: hidden;
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - 
FIX GRID SPACING IF TUTORIAL HAS NO VIDEO
- - - - - - - - - - - - - - - - - - - - - - - - - - - - */
.tutorial_post_video_layout:has(.w-dyn-bind-empty) {
  display: none;
}
</style></div><div class="u-embed-js w-embed w-script"><script>
document.addEventListener('DOMContentLoaded', function() {
    // Helper function to convert text to slug
    function textToSlug(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[''"&]/g, '')
            .replace(/"([^"]+)"/, '$1')
            .replace(/\s*[:.,?—–\\/-]\s*/g, '-')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    
    // Track used slugs to prevent duplicate IDs
    const usedSlugs = new Set();
    
    function getUniqueSlug(baseSlug) {
        let slug = baseSlug;
        let counter = 1;
        while (usedSlugs.has(slug)) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        usedSlugs.add(slug);
        return slug;
    }
    
    // Add/Remove class helper functions
    const addClass = (element, className) => {
        if (element && className) {
            element.classList.add(className);
        }
    };
    
    const removeClass = (element, className) => {
        if (element && className) {
            element.classList.remove(className);
        }
    };
    
    // Debounce helper for resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Get elements
    const tutorialContent = document.getElementById('tutorial_content');
    const tocContainer = document.getElementById('tutorial_toc');
    
    if (!tutorialContent || !tocContainer) {
        return;
    }
    
    const h2Elements = tutorialContent.querySelectorAll('h2');
    
    if (h2Elements.length === 0) {
        tocContainer.style.display = 'none';
        return;
    }
    
    // Create ToC list
    const tocList = document.createElement('ul');
    addClass(tocList, 'tutorial_post_toc_list');
    
    const tocItems = [];
    
    // Copy anchor link to clipboard with tooltip
    const copyAnchorToClipboard = (element, spanElement, mouseEnterTime = 750) => {
        let hoverTimeout;
        let tooltip;
        
        element.addEventListener("mouseenter", function () {
            clearTimeout(hoverTimeout);
            tooltip = document.createElement("span");
            addClass(tooltip, 'tooltip');
            tooltip.innerText = "Copy anchor link";
            this.appendChild(tooltip);
            hoverTimeout = setTimeout(() => {
                addClass(tooltip, "active");
            }, mouseEnterTime);
        });

        element.addEventListener("mouseleave", function () {
            clearTimeout(hoverTimeout);
            if (tooltip) {
                removeClass(tooltip, "active");
                this.removeChild(tooltip);
                tooltip = null;
            }
        });

        element.addEventListener("click", function (event) {
            event.preventDefault();
            clearTimeout(hoverTimeout);

            if (spanElement && spanElement.classList.contains("anchor")) {
                const id = spanElement.id;

                if (tooltip) {
                    tooltip.innerText = "Copied!";
                    addClass(tooltip, "active");

                    const url = new URL(window.location.href);
                    url.searchParams.delete("topic");
                    const anchorLink = `${url.origin}${url.pathname}#${id}`;

                    if (navigator && navigator.clipboard) {
                        navigator.clipboard.writeText(anchorLink).catch((err) => {
                            console.error("Could not copy text: ", err);
                        });
                    }
                    hoverTimeout = setTimeout(() => {
                        removeClass(tooltip, "active");
                    }, 1500);
                }
            } else {
                console.error("Couldn't find Span with the ID");
            }
        });
    };
    
    // Anchor link SVG icon
    const anchorLinkSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.59608 7.99088C9.01909 7.43035 10.5884 7.86617 11.5326 8.96256L11.7123 9.19108C11.7695 9.27004 11.8243 9.35165 11.8754 9.4362L12.018 9.69792L12.0531 9.79362C12.1116 10.0184 12.0068 10.2611 11.7904 10.3678C11.5738 10.4744 11.3168 10.4098 11.1742 10.2262L11.1205 10.1403L11.018 9.95377C10.9816 9.8936 10.9434 9.83515 10.9027 9.77897L10.7738 9.61491C10.0992 8.83195 8.97855 8.52172 7.96327 8.92155C6.67866 9.42757 6.04713 10.8791 6.55311 12.1637L7.83631 15.4206C8.34249 16.7049 9.794 17.3357 11.0785 16.8298C12.3629 16.3236 12.9937 14.8721 12.4877 13.5876L12.3969 13.3551C12.2957 13.0983 12.4213 12.808 12.6781 12.7067C12.935 12.6055 13.2253 12.732 13.3265 12.9889L13.4183 13.2214C14.1268 15.0198 13.2432 17.052 11.4447 17.7604C9.64625 18.4688 7.61412 17.5852 6.90565 15.7868L5.62245 12.5299C4.91434 10.7317 5.79792 8.69938 7.59608 7.99088ZM8.55506 2.23991C10.3536 1.53146 12.3857 2.41505 13.0941 4.21354L14.3773 7.4694C15.0857 9.26779 14.202 11.2999 12.4037 12.0085C10.9807 12.569 9.41236 12.1332 8.46815 11.0368L8.28749 10.8092C8.17297 10.6512 8.07027 10.481 7.98182 10.3014C7.86013 10.0539 7.96206 9.75458 8.20936 9.63249C8.4571 9.5105 8.7573 9.61229 8.87928 9.86002C8.9425 9.98839 9.0156 10.1089 9.09706 10.2214L9.22596 10.3844C9.90056 11.1677 11.022 11.4788 12.0375 11.0788C13.3218 10.5727 13.9524 9.12105 13.4467 7.83659L12.1644 4.57975C11.6584 3.29511 10.2059 2.66356 8.92128 3.1696C7.63695 3.67569 7.00633 5.12732 7.5121 6.41178L7.60389 6.64518C7.70479 6.902 7.57845 7.19247 7.32167 7.29362C7.06479 7.39475 6.77446 7.26823 6.67323 7.01139L6.58143 6.77897C5.87303 4.98058 6.75677 2.94846 8.55506 2.23991Z" fill="currentColor"/></svg>`;

    // Process each H2 and build ToC
    h2Elements.forEach((h2) => {
        const headingText = h2.textContent;
        const baseSlug = textToSlug(headingText);
        const slug = getUniqueSlug(baseSlug);
        
        // Add anchor span
        const anchorSpan = document.createElement('span');
        anchorSpan.id = slug;
        addClass(anchorSpan, 'anchor');
        h2.prepend(anchorSpan);
        
        // Add anchor link box
				const anchorLinkBox = document.createElement('button');
        anchorLinkBox.type = 'button';
				addClass(anchorLinkBox, 'anchor-link-box');
        anchorLinkBox.innerHTML = anchorLinkSVG;
        h2.prepend(anchorLinkBox);
        
        // Initialize copy functionality
        copyAnchorToClipboard(anchorLinkBox, anchorSpan);
        
        // Create ToC item
        const listItem = document.createElement('li');
        addClass(listItem, 'tutorial_post_toc_item');
        
        const link = document.createElement('a');
        link.href = `#${slug}`;
        
        const textDiv = document.createElement('div');
        textDiv.textContent = headingText;
        
        link.appendChild(textDiv);
        listItem.appendChild(link);
        tocList.appendChild(listItem);
        
        tocItems.push({
            element: listItem,
            target: h2
        });
    });
    
    tocContainer.appendChild(tocList);
    
    // Configuration
    const headerHeight = 134;
    const activationOffset = 100;
    
    // State
    let currentActive = 0;
    let ranges = [];
    let frameRequested = false;
    
    // Calculate activation ranges using getBoundingClientRect for reliability
    // (offsetTop can be relative to offsetParent, not document)
    function calculateRanges() {
        const scrollY = window.scrollY;
        
        ranges = tocItems.map((item, index) => {
            const rect = item.target.getBoundingClientRect();
            const absoluteTop = rect.top + scrollY;
            const activationPoint = absoluteTop - headerHeight - activationOffset;
            
            const nextAbsoluteTop = index < tocItems.length - 1
                ? tocItems[index + 1].target.getBoundingClientRect().top + scrollY
                : Infinity;
            const nextActivation = nextAbsoluteTop === Infinity 
                ? Infinity 
                : nextAbsoluteTop - headerHeight - activationOffset;
            
            return {
                index: index,
                start: Math.max(0, activationPoint),
                end: nextActivation
            };
        });
    }
    
    // Update active section
    function updateActiveSection() {
        if (ranges.length === 0) return;
        
        const scrollPosition = window.scrollY;
        let newActive = 0;
        
        // Find current range
        if (scrollPosition < ranges[0].start) {
            newActive = 0;
        } else {
            for (let i = 0; i < ranges.length; i++) {
                if (scrollPosition >= ranges[i].start && scrollPosition < ranges[i].end) {
                    newActive = i;
                    break;
                }
            }
        }
        
        // Special case: if near bottom of page, activate last item
        const scrollBottom = scrollPosition + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (documentHeight - scrollBottom < 100) {
            newActive = tocItems.length - 1;
        }
        
        // Update classes if changed
        if (newActive !== currentActive) {
            tocItems.forEach(item => removeClass(item.element, 'active'));
            currentActive = newActive;
            if (tocItems[currentActive]) {
                addClass(tocItems[currentActive].element, 'active');
            }
        }
        
        frameRequested = false;
    }
    
    // Scroll handler
    function handleScroll() {
        if (!frameRequested) {
            frameRequested = true;
            window.requestAnimationFrame(updateActiveSection);
        }
    }
    
    // Recalculate on resize (debounced)
    const handleResize = debounce(() => {
        calculateRanges();
        updateActiveSection();
    }, 250);
    
    // Smooth scroll behavior for ToC links
    tocItems.forEach(item => {
        item.element.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const scrollTo = targetElement.parentElement.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize
    calculateRanges();
    addClass(tocItems[0].element, 'active');
    
    // Handle hash on initial page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetIndex = tocItems.findIndex(item => 
            item.target.querySelector('.anchor')?.id === hash
        );
        if (targetIndex !== -1) {
            tocItems.forEach(item => removeClass(item.element, 'active'));
            addClass(tocItems[targetIndex].element, 'active');
            currentActive = targetIndex;
        }
    }
    
    // Re-check after browser might restore scroll position
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            calculateRanges();
            updateActiveSection();
        });
    });
    
    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Visual Viewport API for mobile viewport changes (keyboard, browser chrome)
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
        window.visualViewport.addEventListener('scroll', handleResize);
    }
    
    // Browser back/forward navigation with hash changes
    window.addEventListener('popstate', () => {
        calculateRanges();
        updateActiveSection();
    });
    
    // Handle dynamic content changes (if Webflow adds/removes content)
    const observer = new MutationObserver(debounce(() => {
        calculateRanges();
        updateActiveSection();
    }, 500));
    
    observer.observe(tutorialContent, {
        childList: true,
        subtree: true,
        attributes: false
    });
    
    // Recalculate after images load (affects layout positions)
    const images = tutorialContent.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.addEventListener('load', handleResize, { once: true });
            img.addEventListener('error', handleResize, { once: true });
        }
    });
    
    // Recalculate after fonts load
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(handleResize);
    }
});
</script></div><div class="page_main"><section data-prevent-flicker="true" data-animate-hero-wrap="" class="hero_tutorial_post_wrap"><div data-wf--spacer--section-space="page-top" class="u-section-spacer w-variant-e359d2da-de19-6775-b122-3e06f925f39e u-ignore-trim"></div><div class="hero_tutorial_post_contain u-container u-threshold-medium"><div class="hero_tutorial_post_layout u-grid-custom"><div id="w-node-_699e48db-7997-939c-cf08-428dd78f53a9-f07e9a97" class="hero_tutorial_post_content u-column-custom"><h1 class="u-text-style-display-2 u-mb-text">Claude for nonprofits partnership success guide for admins</h1><div class="u-text-style-body-large-2-sans">A phased implementation framework to help nonprofit admins launch, scale, and sustain Claude adoption across their organization.</div></div><div id="w-node-_755aef86-2d20-ec28-dac1-1ff881b4b71e-f07e9a97" class="hero_tutorial_post_details u-column-custom"><ul role="list" class="hero_tutorial_details_list"><li class="hero_tutorial_details_item"><div class="hero_tutorial_details_icon"><div class="icon_wrap"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M12.5 17C12.7761 17 13 17.2239 13 17.5C13 17.7761 12.7761 18 12.5 18H7.5C7.22386 18 7 17.7761 7 17.5C7 17.2239 7.22386 17 7.5 17H12.5ZM10 2C13.3137 2 16 4.68629 16 8C16 9.73776 15.2608 11.3033 14.0811 12.3984L13.8389 12.6113C13.3268 13.0382 13 13.5753 13 14.124V15.5C13 15.7761 12.7761 16 12.5 16H7.5C7.22386 16 7 15.7761 7 15.5V14.124C6.99998 13.6438 6.7495 13.1727 6.34375 12.7764L6.16113 12.6113C4.84147 11.5115 4 9.85368 4 8C4 4.68629 6.68629 2 10 2ZM10 3C7.23858 3 5 5.23858 5 8C5 9.5443 5.69948 10.9248 6.80078 11.8428L7.03711 12.0557C7.57356 12.5787 7.99998 13.2899 8 14.124V15H9.5V11.207L7.14648 8.85352L7.08203 8.77539C6.95387 8.58131 6.97562 8.31735 7.14648 8.14648C7.31735 7.97562 7.58131 7.95387 7.77539 8.08203L7.85352 8.14648L10 10.293L12.1465 8.14648L12.2246 8.08203C12.4187 7.95387 12.6827 7.97562 12.8535 8.14648C13.0244 8.31735 13.0461 8.58131 12.918 8.77539L12.8535 8.85352L10.5 11.207V15H12V14.124C12 13.1706 12.5575 12.3776 13.1992 11.8428L13.4004 11.665C14.3848 10.7513 15 9.44786 15 8C15 5.23858 12.7614 3 10 3Z" fill="currentColor"></path></svg></div></div><div class="hero_tutorial_details_content"><div class="u-text-style-caption">Category</div><div class="u-text-style-body-3">Nonprofits</div></div></li><li class="hero_tutorial_details_item"><div class="hero_tutorial_details_icon"><div class="icon_wrap"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M12.5 3C13.3284 3 14 3.67157 14 4.5V6H14.5C16.433 6 18 7.567 18 9.5V15.5C18 16.3284 17.3284 17 16.5 17H3.5C2.72334 17 2.08461 16.4097 2.00781 15.6533L2 15.5V9.5C2 7.567 3.567 6 5.5 6H6V4.5C6 3.67157 6.67157 3 7.5 3H12.5ZM3 15.5L3.00977 15.6006C3.05629 15.8286 3.25829 16 3.5 16H16.5C16.7761 16 17 15.7761 17 15.5V12H13V12.5C13 12.7761 12.7761 13 12.5 13C12.2239 13 12 12.7761 12 12.5V12H8V12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5V12H3V15.5ZM5.5 7C4.11929 7 3 8.11929 3 9.5V11H7V10.5C7 10.2239 7.22386 10 7.5 10C7.77614 10 8 10.2239 8 10.5V11H12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V11H17V9.5C17 8.11929 15.8807 7 14.5 7H5.5ZM7.5 4C7.22386 4 7 4.22386 7 4.5V6H13V4.5C13 4.22386 12.7761 4 12.5 4H7.5Z" fill="currentColor"></path></svg></div></div><div class="hero_tutorial_details_content"><div class="u-text-style-caption">Product</div><div class="u-text-style-body-3">Claude.ai</div></div></li><li class="hero_tutorial_details_item"><div class="hero_tutorial_details_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M11.5 2C11.7761 2 12 2.22386 12 2.5C12 2.77614 11.7761 3 11.5 3H10.5V4.01953C12.0566 4.12942 13.4719 4.74753 14.582 5.70996L15.3037 4.98926C15.499 4.79436 15.8156 4.79412 16.0107 4.98926C16.2059 5.1844 16.2056 5.501 16.0107 5.69629L15.2891 6.41699C16.3542 7.64511 17 9.24674 17 11C17 14.866 13.866 18 10 18C6.13401 18 3 14.866 3 11C3 7.30217 5.86743 4.27597 9.5 4.01953V3H8.5C8.22386 3 8 2.77614 8 2.5C8 2.22386 8.22386 2 8.5 2H11.5ZM10 5C6.68629 5 4 7.68629 4 11C4 14.3137 6.68629 17 10 17C13.3137 17 16 14.3137 16 11C16 7.68629 13.3137 5 10 5ZM7.17188 8.17188C7.29007 8.05368 7.45914 8.0024 7.62305 8.03516H7.62695C7.62846 8.03541 7.63045 8.03566 7.63281 8.03613C7.63847 8.03729 7.64687 8.03982 7.65723 8.04199C7.67822 8.04638 7.70875 8.05315 7.74707 8.06152C7.82438 8.07842 7.93535 8.10307 8.07031 8.13574C8.34023 8.20109 8.7112 8.29808 9.11133 8.42383C9.51008 8.54915 9.94691 8.70603 10.3467 8.89258C10.7387 9.07552 11.132 9.30384 11.4141 9.58594C12.1951 10.367 12.1951 11.633 11.4141 12.4141C10.633 13.1951 9.36699 13.1951 8.58594 12.4141C8.30384 12.132 8.07552 11.7387 7.89258 11.3467C7.70603 10.9469 7.54915 10.5101 7.42383 10.1113C7.29808 9.7112 7.20109 9.34023 7.13574 9.07031C7.10307 8.93535 7.07842 8.82438 7.06152 8.74707C7.05315 8.70876 7.04638 8.67822 7.04199 8.65723C7.03982 8.64687 7.03729 8.63847 7.03613 8.63281C7.03566 8.63045 7.03541 8.62846 7.03516 8.62695V8.62305L7.02637 8.56055C7.01616 8.41702 7.06868 8.27507 7.17188 8.17188ZM8.37793 9.81152C8.49565 10.1861 8.63741 10.5779 8.79883 10.9238C8.96389 11.2775 9.13316 11.5472 9.29297 11.707C9.68349 12.0975 10.3165 12.0975 10.707 11.707C11.0975 11.3165 11.0975 10.6835 10.707 10.293C10.5472 10.1332 10.2775 9.96389 9.92383 9.79883C9.57792 9.63741 9.18607 9.49565 8.81152 9.37793C8.59583 9.31014 8.38783 9.25179 8.20215 9.20215C8.25179 9.38783 8.31014 9.59583 8.37793 9.81152Z" fill="currentColor"></path></svg></div></div><div class="hero_tutorial_details_content"><div class="u-text-style-caption">Reading time</div><div class="u-text-style-caption w-condition-invisible">Watch time</div><div class="u-flex-horizontal-wrap u-gap-0-25"><div data-readtime="minutes" class="u-text-style-body-3">5</div><div class="u-text-style-body-3">min</div></div><div class="u-flex-horizontal-wrap u-gap-0-25 w-condition-invisible"><div class="u-text-style-body-3 w-dyn-bind-empty"></div><div class="u-text-style-body-3">min</div></div></div></li><li class="hero_tutorial_details_item"><div class="hero_tutorial_details_icon"><div class="icon_wrap"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 33 32" fill="none" class="u-svg"><path d="M19.9047 4.26392C20.2002 3.93606 20.7077 3.90944 21.036 4.20455L29.036 11.4047L29.1485 11.5297C29.2466 11.6649 29.2999 11.8301 29.3 12C29.3 12.2266 29.2043 12.4436 29.036 12.5953L21.036 19.7954L20.9047 19.8907C20.5839 20.0792 20.1634 20.0233 19.9047 19.736C19.6463 19.4486 19.635 19.0243 19.8563 18.7251L19.9641 18.6048L26.4141 12.8H18.9C13.1565 12.8 8.50039 17.4566 8.50002 23.2001V26.4002L8.4844 26.5611C8.40996 26.9259 8.08677 27.2002 7.70002 27.2002C7.31328 27.2002 6.99009 26.9259 6.91565 26.5611L6.90002 26.4002V23.2001C6.90039 16.5729 12.2728 11.2 18.9 11.2H26.4141L19.9641 5.39519C19.6361 5.09956 19.6093 4.5922 19.9047 4.26392Z" fill="currentColor"></path></svg></div></div><div class="hero_tutorial_details_content"><div class="u-text-style-caption">Share</div><a fs-copyclip-message="Copied!" fs-copyclip-element="click" href="#" class="u-rich-text u-text-style-body-3">Copy link</a><div fs-copyclip-element="copy-sibling" class="u-display-none w-embed">https://claude.com/resources/tutorials/claude-for-nonprofits-partnership-success-guide-for-admins</div></div></li></ul></div></div><div data-wf--spacer--section-space="main" class="u-section-spacer w-variant-60a7ad7d-02b0-6682-95a5-2218e6fd1490 u-ignore-trim"></div></div></section><section class="tutorial_post_media_wrap"><div class="tutorial_post_media_contain u-container"><div class="tutorial_post_media_layout u-grid-custom"><div data-thumbnail-bg="" class="tutorial_post_image_wrap u-column-custom w-condition-invisible"><img src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" class="tutorial_post_thumbnail_image w-dyn-bind-empty"/></div><div class="tutorial_post_video_wrap u-column-custom w-condition-invisible"><div class="w-dyn-bind-empty w-video w-embed"></div></div></div></div><div data-wf--spacer--section-space="even" class="u-section-spacer w-variant-41fc0c0a-cac3-53c9-9802-6a916e3fb342 u-ignore-trim"></div></section><section class="tutorial_post_wrap"><div data-wf--spacer--section-space="main" class="u-section-spacer w-variant-60a7ad7d-02b0-6682-95a5-2218e6fd1490 u-ignore-trim"></div><div class="tutorial_post_contain u-container"><div class="tutorial_post_layout u-grid-custom"><div class="tutorial_post_content_wrap u-column-custom"><div id="tutorial_content" data-readtime="content" class="u-rich-text-tutorials u-margin-trim w-richtext"><p>Welcome to the Claude for nonprofits community. This guide provides everything you need to successfully launch and scale Claude at your organization.</p><p>The framework below is flexible and self-paced. Move through the phases at whatever speed works for your team.</p><h2>Phase 1: Foundation (technical setup and access)</h2><h4>Key resources</h4><ul><li><a href="https://support.claude.com/en/articles/12166798-getting-started-with-claude-for-enterprise">Getting started guides</a> covering SSO, user management, and technical configuration</li><li><a href="https://anthropic.skilljar.com/driving-enterprise-adoption-of-claude">Driving adoption at your organization</a> course with customizable templates for change management</li></ul><h4>Recommended actions</h4><ol><li>Complete user management and technical configuration (SSO, SCIM)</li><li>Set data retention and sharing policies</li><li>Define success metrics using audit log data and surveys</li><li>Plan your change management strategy with success criteria</li></ol><h4>Implementation tips</h4><ul><li>Identify an implementation leader to complete adoption training</li><li>Acknowledge challenges early and maintain open communication</li><li>Establish Slack or Teams channels and office hours with designated ownership</li><li>Bookmark the <a href="https://support.claude.com/en/">Claude help center</a> for technical support</li></ul><h2>Phase 2: Activation (first users and early wins)</h2><h4>Key resources</h4><ul><li><a href="https://anthropic.skilljar.com/">On-demand AI fluency courses</a></li><li><a href="https://claude.com/resources/use-cases/workflow-improvement-planner">Use case and workflow planning</a></li></ul><h4>Recommended actions</h4><ol><li>Create shared projects and upload Claude documentation</li><li>Recruit 3–5 champion team members for pilot feedback</li><li>Select use cases strategically: start with a horizontal productivity win, then add department-specific cases</li></ol><h4>Implementation tips</h4><ul><li>Launch Slack or Teams channels for ongoing discussion</li><li>Host 30-day retrospectives to capture lessons learned</li><li>Use Claude itself to facilitate planning. Try a prompt like: <code>Help me design a 30-day pilot plan for introducing Claude to our fundraising team. Include milestones, success metrics, and potential challenges.</code></li><li>Send baseline surveys to track progress and use cases</li></ul><h2>Phase 3: Acceleration (scaling and integration)</h2><h4>Key resources</h4><ul><li><a href="https://claude.com/resources/use-cases/category/nonprofits">Nonprofit use cases</a></li><li><a href="https://support.claude.com/en/articles/9970975-how-to-access-audit-logs">How to access audit logs</a></li><li><a href="https://claude.ai/artifacts?category=learn">Claude artifact inspiration gallery</a></li><li><a href="https://claude.com/connectors">MCP connector directory</a></li></ul><h4>Recommended actions</h4><ol><li>Build a weekly use case spotlight schedule</li><li>Track activity metrics via audit logs and surveys</li><li>Enable appropriate connectors and capabilities in admin settings</li><li>Participate in monthly webinars (third week of each month)</li></ol><h4>Implementation tips</h4><ul><li>Monitor leading indicators: weekly active users %, users with 10+ chats %, project adoption %</li><li>Share success stories internally on a regular basis</li></ul><h2>Phase 4: Expansion (advanced use cases and impact)</h2><h4>Key resources</h4><ul><li><a href="https://anthropic.skilljar.com/enterprise-train-the-trainer">Claude train the trainer program</a> (self-paced course)</li><li><a href="https://claude.com/customers">Case studies hub</a></li></ul><h4>Recommended actions</h4><ol><li>Run internal train the trainer programs to build expertise</li><li>Identify new organizational functions interested in Claude adoption</li></ol><h4>Implementation tips</h4><p>Sustainable adoption means building internal expertise. As AI becomes embedded in role expectations rather than remaining optional, your trained champions become the peer support network that scales organizational impact.</p><p><em>Note: There's no "right" timeline for implementation. Whether you're moving quickly toward organization-wide adoption or taking a measured, department-specific approach, we're here to support your journey.</em></p></div></div><div class="tutorial_post_toc_col u-column-custom"><div id="tutorial_toc" class="tutorial_post_toc_wrap"></div></div></div></div><div data-wf--spacer--section-space="main" class="u-section-spacer w-variant-60a7ad7d-02b0-6682-95a5-2218e6fd1490 u-ignore-trim"></div></section><section class="related_wrap u-section u-hide-if-empty-cms"><div data-wf--spacer--section-space="main" class="u-section-spacer w-variant-60a7ad7d-02b0-6682-95a5-2218e6fd1490 u-ignore-trim"></div><div class="related_contain u-container"><div data-animate-header-wrap="" data-wf--module-header-main--heading-style="h1" class="header_main_wrap u-margin-trim u-alignment-center"><div class="u-pictogram-wrap"><div class="header_icon"><div class="pictogram_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 500 500" fill="none" class="u-svg"><path d="M247.15 165.17C247.15 165.17 277.89 88.4301 342.16 98.5601C406.43 108.7 408.05 193.79 400.94 220.83C393.83 247.87 372.53 319.12 309.6 335.05C274.5 343.93 245.27 287.15 245.27 287.15C245.27 287.15 236.37 332.85 206.12 335.18C175.87 337.51 124.35 275.84 110.18 240.7C86.1098 181.01 106.21 139.81 122.65 119.88C139.08 99.9501 167.97 99.6701 192.85 108.64C229.06 121.7 247.16 165.17 247.16 165.17H247.15Z" fill="var(--_theme---pictogram-accent)"></path><path d="M245.82 302.36C243.87 307.61 241.99 311.43 240.29 314.56C238.59 317.69 236.97 320.09 235.27 322.44C233.55 324.78 231.62 327.02 228.91 329.57C226.18 332.07 222.56 334.93 216.95 337.36C211.33 339.75 206.73 340.4 203.01 340.7C202.54 340.73 202.09 340.77 201.64 340.8C201.42 340.82 201.2 340.83 200.98 340.85C200.75 340.85 200.47 340.84 200.22 340.83C199.22 340.77 198.18 340.77 197.32 340.62C196.47 340.46 195.64 340.31 194.82 340.16C194.01 340 193.31 339.75 192.56 339.55C186.71 337.76 181.45 335.35 172.2 329.12C169.95 327.5 167.95 326.11 166.27 324.76C165.42 324.1 164.62 323.47 163.86 322.88C163.12 322.27 162.43 321.69 161.76 321.14C159.09 318.97 157.08 317.09 155.02 315.28C153.04 313.38 151 311.55 148.62 309.09C147.41 307.88 146.08 306.54 144.64 304.97C143.91 304.19 143.14 303.36 142.31 302.47C141.5 301.58 140.66 300.6 139.76 299.58C137.93 297.54 136.44 295.67 135.1 294.01C133.74 292.36 132.63 290.84 131.61 289.47C129.55 286.75 128.06 284.44 126.53 282.18C123.6 277.57 120.55 273.02 115.27 263.45C113.99 261.03 112.87 258.92 111.87 257.03C110.91 255.11 110.07 253.43 109.3 251.89C108.49 250.37 107.87 248.96 107.23 247.64C106.59 246.32 106 245.08 105.4 243.84C104.85 242.57 104.31 241.3 103.73 239.95C103.16 238.59 102.53 237.17 101.99 235.52C101.42 233.88 100.79 232.08 100.13 230.02C99.5597 227.93 98.9097 225.58 98.2397 222.88C97.6897 220.15 97.1997 217.76 96.8197 215.62C96.5297 213.46 96.2897 211.56 96.0897 209.83C95.8497 208.11 95.8497 206.52 95.7497 205.05C95.6797 203.57 95.6197 202.18 95.5797 200.78C95.5997 199.38 95.6197 197.99 95.6497 196.51C95.6797 195.03 95.6497 193.45 95.7597 191.76C95.8297 190.05 95.9097 188.18 95.9997 186.05C96.0497 183.92 96.2997 181.53 96.4497 178.79C96.5697 176.06 96.9297 173.66 97.1197 171.52C97.2397 170.45 97.3097 169.44 97.4297 168.49C97.5697 167.54 97.6897 166.64 97.8097 165.78C98.0597 164.07 98.2197 162.52 98.4697 161.06C98.7297 159.6 98.9797 158.23 99.2297 156.86C99.3497 156.17 99.4797 155.48 99.5997 154.79C99.7697 154.1 99.9397 153.39 100.11 152.67C100.48 151.22 100.83 149.68 101.31 147.98C101.86 146.3 102.47 144.44 103.19 142.35C103.62 141.32 104.08 140.23 104.56 139.06C105.05 137.9 105.56 136.66 106.25 135.39C106.91 134.11 107.53 132.91 108.12 131.79C108.79 130.7 109.42 129.68 110.02 128.72C111.16 126.77 112.46 125.22 113.53 123.75C115.8 120.9 117.81 118.76 119.98 116.79C121.01 115.76 122.17 114.85 123.38 113.87C123.99 113.39 124.59 112.86 125.27 112.37C125.95 111.89 126.66 111.39 127.41 110.87C128.87 109.77 130.64 108.81 132.57 107.61C133.55 107.06 134.58 106.53 135.69 105.93C136.81 105.37 138 104.78 139.28 104.18C144.44 101.82 148.53 100.51 151.97 99.5798C153.71 99.1698 155.27 98.7598 156.78 98.5098C157.53 98.3798 158.26 98.2498 158.98 98.1198C159.71 98.0298 160.43 97.9298 161.14 97.8398C162.56 97.6198 164.03 97.5898 165.57 97.4598C167.13 97.4498 168.76 97.3498 170.6 97.4598C174.26 97.6398 178.76 98.0598 184.51 100.1C189.58 102.03 193.39 103.48 196.56 104.69C199.75 105.91 202.35 106.91 204.97 108.09C207.58 109.27 210.24 110.59 213.34 112.69C216.45 114.78 219.84 117.74 223.66 121.81C227.49 125.93 230.06 129.23 232.15 132C234.22 134.78 235.77 137.06 237.29 139.35C238.8 141.65 240.26 143.96 242.04 146.86C243.36 149.05 244.94 151.68 247.04 155.18C247.14 155.31 247.22 155.55 247.33 155.51C247.43 155.43 247.51 155.34 247.59 155.25C247.64 155.2 247.68 155.16 247.72 155.11L247.78 155.05L247.91 154.86C248.11 154.58 248.3 154.3 248.49 154.03C250.04 151.84 251.38 149.95 252.79 147.96C255.66 144.01 258.72 139.65 264.58 132.13C267.95 127.84 270.65 124.74 272.97 122.2C275.29 119.67 277.23 117.7 279.23 115.79C281.23 113.88 283.28 112 285.95 109.76C288.64 107.53 291.92 104.89 296.75 101.86C301.61 98.8598 305.6 97.0198 309.07 95.7498C312.54 94.4798 315.46 93.7098 318.47 93.2298C320.03 92.9798 321.39 92.8598 322.87 92.7098C324.35 92.5398 325.94 92.4798 327.7 92.3898C331.23 92.2998 335.49 92.2598 341.16 93.0198C346.83 93.7798 351.02 94.9098 354.48 95.9298C357.92 97.0398 360.64 98.0898 363.28 99.3098C365.92 100.54 368.52 101.89 371.58 103.89C372.34 104.4 373.14 104.93 373.99 105.49C374.8 106.11 375.65 106.76 376.55 107.46C377.47 108.14 378.37 108.94 379.33 109.8C380.29 110.66 381.33 111.55 382.32 112.62C382.83 113.14 383.32 113.65 383.8 114.14C384.04 114.39 384.27 114.63 384.5 114.87C384.73 115.13 384.95 115.39 385.17 115.64C386.07 116.65 386.81 117.64 387.53 118.57C388.89 120.45 390.01 122.15 390.91 123.71C392.74 126.83 393.94 129.37 395.1 131.9C396.25 134.42 397.31 136.94 398.62 140.04C399.27 141.58 399.99 143.27 400.8 145.19C401.21 146.14 401.65 147.14 402.11 148.21C402.34 148.74 402.59 149.29 402.84 149.85C403.11 150.48 403.38 151.13 403.66 151.8C405.88 157.29 406.74 161.62 407.35 165.14C407.93 168.68 408.18 171.48 408.38 174.26C408.58 177.04 408.67 179.79 408.73 183.18C408.74 184.86 408.76 186.72 408.78 188.82C408.78 190.93 408.81 193.19 408.73 195.99C408.69 197.37 408.7 198.67 408.62 199.88C408.54 201.1 408.47 202.24 408.4 203.31C408.29 205.47 408.03 207.35 407.85 209.06C407.68 210.78 407.43 212.31 407.2 213.76C406.96 215.21 406.78 216.57 406.49 217.92C406.22 219.27 405.96 220.62 405.67 222.06C405.35 223.49 405 224.99 404.62 226.67C403.83 230.01 402.8 234.01 401.22 239.27C400.38 241.88 399.69 244.19 398.97 246.21C398.63 247.23 398.31 248.18 398.01 249.09C397.69 249.99 397.38 250.84 397.09 251.64C396.52 253.26 396.01 254.72 395.49 256.09C394.97 257.46 394.53 258.76 394.01 260.04C393.49 261.32 392.98 262.6 392.43 263.96C391.86 265.31 391.2 266.71 390.48 268.28C389.76 269.85 388.86 271.52 387.87 273.43C387.37 274.39 386.79 275.37 386.19 276.43C385.58 277.49 384.96 278.6 384.18 279.81C381.17 284.6 378.71 287.9 376.63 290.66C374.56 293.41 372.82 295.54 371.07 297.66C369.31 299.77 367.51 301.85 365.18 304.4C362.83 306.94 359.99 309.95 355.77 313.75C354.72 314.7 353.65 315.56 352.68 316.37C351.63 317.16 350.7 317.91 349.72 318.58C349.22 318.91 348.74 319.24 348.27 319.55C348.04 319.7 347.81 319.85 347.59 320C347.39 320.12 347.2 320.25 347 320.37C346.23 320.85 345.5 321.31 344.8 321.74C342.01 323.48 339.79 324.87 337.56 326.26C335.33 327.66 333.12 329.09 330.35 330.94C327.57 332.78 324.32 335.08 319.57 338.1C314.77 341.11 310.37 343.05 306.52 343.98C302.66 344.92 299.55 345.06 296.55 345.08C293.51 344.95 290.43 344.78 286.71 343.8C283.01 342.87 278.59 341.3 273.52 338.05C268.47 334.77 265.35 331.61 262.9 328.94C261.64 327.62 260.68 326.33 259.7 325.15C258.8 323.92 257.9 322.8 257.13 321.61C255.49 319.27 254.04 316.85 252.31 313.79C250.6 310.72 248.7 306.97 246.55 301.85C243.27 293.91 242.64 289.45 242.85 287.02C243.11 284.58 244.35 284.11 245.86 283.76C247.39 283.41 248.88 283.17 250.53 284.88C252.23 286.58 253.96 290.28 256.95 297.49C258.91 302.14 260.6 305.51 262.1 308.23C263.62 310.94 264.87 313.09 266.27 315.1C266.93 316.14 267.69 317.09 268.44 318.15C269.26 319.14 270.07 320.26 271.1 321.34C273.1 323.56 275.65 326.13 279.52 328.64C283.39 331.13 286.57 332.29 289.27 333.04C291.97 333.84 294.24 334.03 296.52 334.23C298.84 334.3 301.14 334.28 303.83 333.7C306.52 333.11 309.64 331.86 313.91 329.23C318.18 326.53 321.41 324.15 324.11 322.21C326.82 320.24 328.99 318.66 331.16 317.09C333.34 315.52 335.54 313.94 338.34 312.06C341.36 310.03 344 308.41 347.79 304.99C351.52 301.65 354.17 298.84 356.33 296.46C358.48 294.07 360.14 292.1 361.77 290.09C363.38 288.08 364.99 286.05 366.91 283.47C368.82 280.89 371.13 277.77 373.8 273.53C374.47 272.49 375.07 271.45 375.64 270.46C376.21 269.48 376.76 268.57 377.25 267.69C378.2 265.92 379.08 264.39 379.81 262.96C380.54 261.53 381.19 260.24 381.81 259.02C382.39 257.79 382.94 256.63 383.49 255.46C384.06 254.31 384.53 253.11 385.09 251.87C385.36 251.24 385.64 250.6 385.93 249.93C386.2 249.25 386.48 248.54 386.78 247.8C387.08 247.05 387.39 246.27 387.72 245.44C388.02 244.6 388.34 243.71 388.68 242.77C389.39 240.89 390.06 238.75 390.84 236.31C391.58 233.86 392.19 231.7 392.71 229.76C393.18 227.81 393.65 226.11 393.98 224.55C394.32 222.99 394.62 221.58 394.91 220.25C395.15 218.91 395.38 217.65 395.61 216.39C395.86 215.13 396.02 213.86 396.21 212.52C396.39 211.17 396.63 209.75 396.77 208.16C397.1 204.98 397.46 201.15 397.54 196.03C397.61 193.51 397.6 191.13 397.62 189.07C397.64 187.01 397.65 185.21 397.67 183.56C397.69 180.3 397.7 177.71 397.62 175.17C397.54 172.63 397.42 170.1 397 167.04C396.56 163.99 395.87 160.37 394.11 155.91C393.88 155.36 393.66 154.82 393.44 154.3C393.18 153.72 392.93 153.16 392.69 152.62C392.21 151.54 391.76 150.52 391.33 149.57C390.48 147.68 389.74 146.01 389.06 144.49C387.7 141.49 386.57 139.14 385.41 136.86C384.24 134.58 383.05 132.34 381.43 129.73C380.63 128.41 379.69 127.04 378.59 125.55C377.46 124.07 376.19 122.56 374.42 120.82C373.99 120.39 373.59 119.95 373.18 119.56C372.75 119.18 372.34 118.82 371.93 118.46C371.12 117.76 370.39 117.06 369.61 116.52C368.85 115.95 368.14 115.42 367.47 114.91C366.78 114.43 366.09 114.02 365.46 113.61C364.21 112.76 362.98 112.17 361.84 111.56C360.73 110.92 359.58 110.51 358.48 110C356.26 109.05 353.97 108.26 351.08 107.38C348.16 106.58 344.64 105.65 339.78 104.98C334.92 104.32 331.18 104.23 328.08 104.1C326.52 104.1 325.11 104.02 323.78 104.06C322.47 104.09 321.12 104.06 320.05 104.13C317.78 104.25 315.48 104.58 312.65 105.43C309.82 106.27 306.45 107.65 302.23 110.23C298.03 112.84 295.12 115.29 292.78 117.4C290.45 119.53 288.69 121.38 286.98 123.28C285.27 125.18 283.61 127.12 281.55 129.57C279.49 132.03 277.03 134.99 273.83 139.06C268.14 146.34 265.05 150.5 262.12 154.26C260.66 156.15 259.28 157.96 257.69 160.11C257.49 160.38 257.29 160.65 257.08 160.93C256.76 161.38 256.43 161.84 256.1 162.31C255.35 163.37 254.55 164.5 253.7 165.62C252.85 166.71 251.94 167.88 250.93 168.65C249.91 169.47 248.89 169.71 247.81 170.16C247.69 170.19 247.55 170.2 247.41 170.22C247.34 170.23 247.27 170.24 247.19 170.24H247.07C247.03 170.14 246.99 170.21 246.95 170.19C246.61 170.17 246.33 170.13 246.05 170.08C245.5 169.94 244.98 169.71 244.42 169.39C243.87 169.06 243.28 168.63 242.7 168.05C242.12 167.47 241.54 166.73 240.97 165.92C240.31 164.97 239.69 163.98 239.1 163.03C238.55 162.12 238.01 161.23 237.49 160.38C236.88 159.38 236.31 158.44 235.77 157.56C234.69 155.8 233.73 154.28 232.85 152.91C231.08 150.17 229.6 148.03 228.09 145.93C226.58 143.83 225.03 141.76 223.06 139.23C221.07 136.72 218.67 133.72 215.24 130.01C211.76 126.29 209.06 123.9 206.65 122.23C204.25 120.54 202.15 119.43 199.94 118.36C197.74 117.3 195.4 116.33 192.41 115.12C190.9 114.52 189.24 113.86 187.35 113.11C186.39 112.74 185.38 112.34 184.3 111.92C183.76 111.71 183.2 111.49 182.62 111.27C182.33 111.16 182.04 111.04 181.74 110.93C181.43 110.81 181.14 110.69 180.9 110.62C176.8 109.14 173.37 108.7 170.49 108.45C169.05 108.3 167.72 108.31 166.46 108.27C165.2 108.3 164 108.28 162.8 108.38C160.39 108.52 157.96 108.84 154.95 109.49C151.95 110.2 148.36 111.27 143.81 113.33C142.67 113.84 141.63 114.39 140.64 114.87C139.67 115.4 138.77 115.9 137.91 116.37C137.11 116.88 136.36 117.36 135.65 117.81C135.3 118.04 134.95 118.26 134.62 118.48C134.3 118.72 134 118.96 133.69 119.19C132.49 120.11 131.39 120.91 130.47 121.82C129.53 122.7 128.6 123.46 127.81 124.39C126.13 126.12 124.58 127.99 122.77 130.42C122.34 131.04 121.88 131.7 121.4 132.39C121.16 132.74 120.91 133.09 120.65 133.46C120.42 133.85 120.18 134.25 119.94 134.66C119.45 135.48 118.92 136.34 118.37 137.27C117.85 138.22 117.35 139.26 116.78 140.35C116.5 140.9 116.21 141.42 115.97 141.95C115.74 142.49 115.52 143.01 115.31 143.51C114.88 144.52 114.48 145.46 114.1 146.36C113.43 148.19 112.91 149.83 112.4 151.31C111.93 152.8 111.62 154.19 111.26 155.48C111.09 156.13 110.93 156.75 110.77 157.37C110.62 157.99 110.52 158.62 110.39 159.24C110.15 160.48 109.9 161.72 109.64 163.04C109.37 164.36 109.22 165.79 108.97 167.36C108.73 168.93 108.44 170.65 108.27 172.65C108.16 173.64 108.05 174.7 107.93 175.82C107.87 176.38 107.8 176.96 107.74 177.56C107.7 178.16 107.66 178.78 107.62 179.43C107.48 182 107.25 184.23 107.2 186.25C107.13 188.27 107.07 190.04 107.02 191.66C106.92 193.29 106.96 194.7 106.96 196.05C106.96 197.4 106.96 198.66 106.96 199.93C107.26 204.98 107.3 210.13 109.54 220.12C110.14 222.61 110.72 224.77 111.2 226.71C111.74 228.64 112.28 230.32 112.72 231.86C113.15 233.41 113.63 234.77 114.07 236.06C114.51 237.36 114.92 238.57 115.33 239.79C115.77 241 116.26 242.2 116.75 243.47C117.26 244.74 117.74 246.11 118.43 247.57C119.1 249.04 119.83 250.66 120.67 252.5C121.6 254.3 122.63 256.31 123.82 258.61C128.82 267.69 132.14 271.75 135.3 275.84C136.95 277.84 138.54 279.88 140.64 282.34C141.68 283.58 142.77 284.97 144.1 286.49C145.41 288.02 146.83 289.78 148.56 291.7C149.41 292.67 150.21 293.58 150.96 294.44C151.74 295.28 152.46 296.06 153.15 296.8C154.5 298.3 155.74 299.57 156.88 300.71C159.11 303.05 161 304.79 162.84 306.6C164.75 308.32 166.61 310.11 169.08 312.15C169.69 312.67 170.34 313.21 171.02 313.79C171.72 314.34 172.46 314.92 173.24 315.53C174.79 316.79 176.62 318.06 178.68 319.56C187.06 325.22 191.58 327.39 195.8 328.84C196.32 329 196.86 329.21 197.37 329.34C197.87 329.45 198.37 329.56 198.9 329.67C199.18 329.75 199.4 329.76 199.62 329.77C199.85 329.79 200.08 329.81 200.32 329.83L200.68 329.87C200.84 329.87 201.01 329.85 201.18 329.85C201.52 329.83 201.87 329.81 202.23 329.79C205.08 329.64 208.5 329.19 212.64 327.44C216.76 325.66 219.53 323.57 221.71 321.67C223.87 319.73 225.51 318.02 227 316.14C228.49 314.26 229.93 312.3 231.47 309.64C233.01 306.98 234.71 303.65 236.46 298.93C237.78 295.26 238.79 292.45 239.56 290.29C240.37 288.13 241.05 286.64 241.71 285.64C243.02 283.64 244.3 283.59 245.86 283.8C247.39 284.01 248.58 284.51 248.92 287.06C249.08 288.34 249.03 290.13 248.6 292.63C248.16 295.13 247.37 298.35 245.86 302.41L245.82 302.36Z" fill="currentColor"></path><path d="M248.88 152.08C253.53 144.95 255.95 141.45 258.37 137.95C260.78 134.44 263.2 130.93 267.57 123.62C271.91 116.29 274.08 112.63 276.25 108.97C278.4 105.3 280.56 101.63 284.59 94.1298C288.6 86.6198 290.34 82.7398 292.08 78.8498C293.8 74.9598 295.53 71.0798 299.11 63.3998C302.66 55.7098 304.23 51.7898 305.77 47.8698C306.53 45.9098 307.28 43.9498 308.18 41.5098C308.4 40.8998 308.63 40.2598 308.88 39.5798C308.99 39.2598 309.11 38.9398 309.23 38.6098H309.22C309.22 38.6098 309.31 38.5198 309.22 38.4198C309.21 38.4098 309.2 38.3898 309.18 38.3798C309.17 38.3798 309.15 38.3698 308.96 38.3998L308.52 38.4598C307.94 38.5398 307.39 38.6198 306.85 38.6998C305.77 38.8598 304.75 39.0098 303.73 39.1898C299.67 39.8898 295.53 40.6098 287.76 43.4698C280.05 46.4498 276.44 48.4498 272.9 50.4898C271.15 51.5398 269.4 52.5898 267.3 53.9998C266.22 54.6698 265.13 55.5298 263.82 56.4198C263.18 56.8798 262.53 57.3998 261.83 57.9398C261.48 58.2098 261.11 58.4898 260.74 58.7698C260.38 59.0698 260.01 59.3898 259.63 59.7098C258.07 60.9698 256.82 62.1898 255.68 63.2498C254.57 64.3398 253.66 65.3498 252.8 66.2398C252.01 67.1798 251.29 68.0298 250.62 68.8398C250 69.6798 249.41 70.4698 248.83 71.2598C248.22 72.0298 247.76 72.8998 247.18 73.7598C246.91 74.1998 246.59 74.6398 246.32 75.1198C246.05 75.6098 245.78 76.1198 245.48 76.6498C245.2 77.1898 244.86 77.7298 244.57 78.3398C244.29 78.9498 243.99 79.5998 243.67 80.2898C243.51 80.6298 243.34 80.9898 243.17 81.3498C243.04 81.6898 242.91 82.0398 242.78 82.4098C242.65 82.7798 242.49 83.1298 242.38 83.5398C242.27 83.9498 242.15 84.3798 242.03 84.8198C241.1 88.3998 240.85 91.4098 240.62 93.8798C240.44 96.3798 240.35 98.4098 240.33 100.46C240.3 104.56 240.36 108.71 241.4 117.03C242.53 125.35 243.5 129.48 244.43 133.59C245.39 137.7 246.37 141.82 248.41 150.03C249.94 156.09 250.38 159.63 250.03 161.8C249.69 163.96 248.58 164.73 247.19 165.16C245.8 165.59 244.52 165.52 243.16 163.79C241.8 162.06 240.34 158.68 238.77 152.46C236.68 144.04 235.56 139.84 234.45 135.62C233.37 131.39 232.26 127.16 231.07 118.44C229.97 109.69 230.05 105.19 230.22 100.7C230.32 98.4498 230.48 96.1998 230.74 93.3698C231.06 90.5298 231.35 87.1098 232.53 82.4398C232.85 81.2698 233.14 80.1798 233.56 79.1398C233.75 78.6198 233.94 78.1198 234.12 77.6398C234.32 77.1998 234.52 76.7798 234.71 76.3698C235.1 75.5498 235.46 74.7798 235.8 74.0498C236.14 73.3198 236.55 72.6798 236.89 72.0398C237.6 70.7798 238.23 69.6398 238.94 68.6298C239.63 67.6198 240.22 66.6198 240.94 65.7198C241.64 64.8098 242.34 63.8898 243.08 62.9298C243.88 62.0098 244.72 61.0298 245.66 59.9498C246.64 58.9198 247.72 57.7798 248.99 56.5298C250.29 55.3198 251.72 53.9298 253.48 52.5098C253.91 52.1398 254.33 51.7898 254.74 51.4498C255.16 51.1198 255.56 50.8098 255.96 50.4998C256.75 49.8898 257.48 49.3098 258.18 48.7698C259.61 47.7498 260.83 46.7798 261.99 45.9998C264.28 44.3698 266.15 43.1198 268.03 41.8798C271.82 39.4698 275.69 37.0798 284.04 33.8598C292.42 30.7698 296.82 29.9098 301.19 29.0498C302.28 28.8398 303.38 28.6498 304.55 28.4498C305.13 28.3498 305.74 28.2498 306.36 28.1498C306.71 28.0898 307.07 28.0298 307.44 27.9698C308.01 27.8798 308.6 27.7898 309.2 27.6998C310.4 27.5198 311.67 27.2998 312.96 27.1898C313.6 27.1398 314.3 27.0098 314.94 27.0098C315.56 27.0198 316.21 27.0398 316.87 27.0498C317.51 27.0898 318.01 27.2598 318.61 27.3698C318.92 27.4198 319.08 27.5798 319.33 27.6798C319.56 27.7998 319.81 27.8998 320 28.0498C320.2 28.1898 320.41 28.3198 320.61 28.4998C320.85 28.6998 321 28.9998 321.13 29.2298C321.38 29.7198 321.57 30.2498 321.7 30.8798C321.98 32.1298 321.82 33.7098 321.42 35.2798C321.02 36.8498 320.54 38.3698 320.05 39.7998C319.8 40.5098 319.56 41.1998 319.32 41.8798C319.16 42.3098 319.01 42.7298 318.86 43.1298C318.59 43.8398 318.34 44.5198 318.09 45.1598C317.11 47.7198 316.28 49.7298 315.44 51.7398C313.75 55.7398 312.04 59.7398 308.42 67.5898C304.76 75.4298 302.85 79.3098 300.95 83.1898C299.03 87.0598 297.11 90.9298 293.05 98.5498C288.96 106.16 287.02 110.02 285.08 113.88C283.13 117.74 281.18 121.6 276.76 129.03C272.31 136.44 270.09 140.14 267.86 143.84C265.62 147.53 263.38 151.23 258.66 158.46C251.65 169.12 249.56 166.78 247.16 165.16C244.72 163.52 241.99 162.6 248.9 152.09L248.88 152.08Z" fill="currentColor"></path><path d="M240.12 161.38C239.1 157.64 238.78 155.72 238.45 153.8C238.29 152.84 238.13 151.88 237.88 150.69C237.75 150.1 237.62 149.44 237.42 148.71C237.21 147.98 236.96 147.17 236.67 146.25C235.49 142.56 234.96 140.7 234.43 138.83C234.16 137.9 233.89 136.97 233.56 135.8C233.21 134.64 232.82 133.24 232.11 131.44C230.75 127.82 229.88 126.08 229.02 124.35C228.59 123.48 228.16 122.62 227.66 121.52C227.42 120.97 227.16 120.36 226.86 119.67C226.54 118.99 226.19 118.23 225.8 117.35C224.26 113.84 223.41 112.11 222.57 110.39C222.14 109.53 221.74 108.66 221.2 107.6C220.63 106.55 219.96 105.29 219.09 103.6C217.34 100.22 216.8 98.3398 216.11 96.5398C215.4 94.7598 214.68 92.9698 212.73 89.6898C212.23 88.8798 211.83 88.1398 211.4 87.5398C210.96 86.9398 210.58 86.4098 210.23 85.9398C209.51 84.9998 208.94 84.2398 208.36 83.4898C207.19 81.9998 206.12 80.4298 203.69 77.5598C202.5 76.0998 201.61 75.0098 200.86 74.0998C200.1 73.1998 199.41 72.5798 198.76 71.8998C198.11 71.2298 197.45 70.5598 196.64 69.7298C196.24 69.3098 195.79 68.8498 195.29 68.3198C194.75 67.8298 194.15 67.2898 193.46 66.6598C192.08 65.4098 191.07 64.4498 190.23 63.6298C189.35 62.8598 188.65 62.2498 187.95 61.6398C187.25 61.0198 186.55 60.3998 185.66 59.6398C184.76 58.8998 183.58 58.1298 182.04 57.0698C175.68 53.0398 175.44 53.5698 168.6 50.0198C166.07 48.7398 164.76 47.4398 164.37 46.2098C163.96 44.9598 164.39 43.7298 165.06 42.4298C165.73 41.1298 166.46 40.1698 167.65 39.8398C168.86 39.5198 170.45 39.8098 173.1 41.1498C180.18 44.8298 180.77 43.8998 187.76 48.3398C189.48 49.5098 190.76 50.4098 191.73 51.2698C192.7 52.1498 193.43 52.8998 194.16 53.6498C194.89 54.3998 195.63 55.1298 196.56 56.0198C197.45 56.9598 198.55 58.0498 200.07 59.4298C200.83 60.1298 201.49 60.7298 202.08 61.2798C202.63 61.8698 203.11 62.3798 203.54 62.8498C204.4 63.7998 205.09 64.5598 205.78 65.3198C206.45 66.0898 207.18 66.8198 207.99 67.8098C208.79 68.7998 209.74 69.9998 211.02 71.5898C213.65 74.7098 214.97 76.2498 216.39 77.7398C217.1 78.4898 217.8 79.2398 218.63 80.2198C219.04 80.7098 219.48 81.2598 219.97 81.8998C220.46 82.5398 220.89 83.3098 221.42 84.1798C223.51 87.6698 224.35 89.5398 225.18 91.3898C226 93.2498 226.64 95.1798 228.5 98.7598C229.41 100.55 230.09 101.9 230.66 103.02C231.2 104.15 231.56 105.09 231.96 106C232.75 107.84 233.55 109.68 235.13 113.35C235.53 114.27 235.89 115.07 236.2 115.79C236.48 116.52 236.73 117.16 236.96 117.74C237.42 118.9 237.78 119.83 238.14 120.76C238.87 122.62 239.61 124.48 241.01 128.22C241.71 130.09 242.24 131.49 242.68 132.66C243.14 133.82 243.54 134.74 243.95 135.65C244.76 137.48 245.57 139.32 246.79 143.13C247.1 144.08 247.37 144.91 247.61 145.65C247.83 146.4 248.02 147.05 248.2 147.65C248.56 148.84 248.85 149.8 249.13 150.75C249.71 152.66 250.3 154.56 251.35 158.41C252.9 164.1 249.93 164.47 247.1 165.18C244.27 165.89 241.59 166.92 240.08 161.39L240.12 161.38Z" fill="currentColor"></path><path d="M446.05 472.03C395.55 472.03 395.55 471.25 345.06 471.25C311.38 471.156 277.7 471.066 244.02 470.98C218.76 470.98 206.13 471.18 193.49 471.38C187.17 471.46 180.86 471.55 172.96 471.65C170.99 471.67 168.91 471.68 166.72 471.7C165.62 471.7 164.49 471.71 163.33 471.72C162.17 471.71 160.97 471.64 159.74 471.59C154.8 471.38 149.27 471.14 142.95 470.87C130.31 470.32 120.83 469.91 112.93 469.57C108.98 469.41 105.42 469.27 102.07 469.13C101.65 469.11 101.23 469.1 100.82 469.08H100.51C100.51 469.08 100.5 469.08 100.49 469.07C100.49 469.07 100.48 469.07 100.47 469.07C99.7597 469.2 99.0697 469.32 98.3697 469.45C96.6897 469.79 94.9797 469.94 93.2897 470.16C91.5997 470.35 89.8797 470.43 88.1397 470.52C86.3897 470.52 84.6097 470.6 82.7697 470.46C79.0997 470.31 75.1797 469.79 70.9497 468.73C66.7197 467.68 62.1797 466.06 57.3897 463.66C55.0297 462.43 52.5397 461.07 50.0697 459.46C48.8097 458.67 47.5797 457.84 46.2697 456.92C45.6197 456.45 44.9597 455.96 44.2897 455.48C43.9597 455.23 43.6197 454.99 43.2797 454.74C42.9497 454.47 42.6197 454.2 42.2897 453.93C36.9497 449.62 32.8597 445.12 29.6897 440.74C26.5197 436.36 24.2797 432.11 22.5697 428.12C21.8197 426.08 21.0297 424.18 20.5197 422.26C20.2597 421.31 19.9297 420.39 19.7397 419.46C19.5397 418.53 19.3397 417.62 19.1397 416.72C18.9197 415.82 18.8197 414.92 18.6797 414.04C18.5597 413.15 18.4297 412.28 18.3097 411.41C18.1997 409.66 17.9997 407.94 17.9897 406.22C17.9997 404.5 17.9197 402.78 18.0897 401.05C18.1497 400.18 18.2097 399.31 18.2697 398.43C18.3397 397.55 18.4697 396.69 18.5697 395.81C19.0197 392.28 19.6697 388.55 20.7697 384.46C21.8697 380.38 23.4197 375.95 25.8397 371.18C28.2397 366.43 31.5597 361.33 36.3297 356.4C38.6997 353.93 41.1497 351.83 43.5597 350.04C44.1697 349.6 44.7497 349.14 45.3497 348.73C45.9597 348.33 46.5597 347.93 47.1397 347.54C48.2997 346.73 49.5097 346.1 50.6497 345.41C55.2697 342.81 59.5797 341.06 63.5397 339.73C67.5097 338.43 71.1397 337.45 74.6097 336.79C76.3297 336.41 78.0197 336.19 79.6797 335.89C81.3397 335.69 82.9797 335.43 84.6197 335.28C86.2597 335.13 87.8997 334.95 89.5697 334.88C90.3997 334.83 91.2397 334.79 92.0897 334.74C92.9597 334.72 93.8397 334.7 94.7397 334.68C95.1897 334.68 95.6397 334.66 96.0897 334.65C96.3197 334.65 96.5297 334.64 96.8297 334.65L97.5097 334.68C98.3697 334.71 99.2397 334.75 100.13 334.78C101.92 334.84 103.78 334.9 105.73 334.96C109.65 335.07 113.95 335.18 118.84 335.24C123.72 335.29 129.2 335.32 135.33 335.09C136.87 335.04 138.33 334.95 139.75 334.85C140.47 334.82 141.12 334.73 141.8 334.67C142.51 334.61 143.21 334.54 143.91 334.48C147.02 334.19 149.59 334.16 152.14 334.05C154.63 333.99 156.97 333.94 159.19 333.89C161.4 333.86 163.48 333.84 165.46 333.81C173.39 333.73 179.72 333.72 186.05 333.72C198.7 333.72 211.35 333.77 236.64 334.09C261.95 334.44 274.56 334.81 287.19 335.05C299.82 335.3 312.45 335.6 337.69 335.6C350.3 335.58 359.76 335.43 367.55 335.12C369.52 335.07 371.31 334.92 373.06 334.82C374.89 334.7 376.64 334.59 378.34 334.48C381.77 334.3 384.96 334.16 388.14 334.07C400.87 333.7 413.54 333.53 438.86 333.74C476.25 334.15 481.22 336.63 481.16 339.51C481.1 342.46 476.06 344.09 438.77 343.68C413.57 343.46 400.96 343.76 388.45 344.25C385.32 344.36 382.21 344.54 378.94 344.73C377.3 344.85 375.61 344.97 373.85 345.1C372 345.22 370.03 345.39 368.05 345.45C360.04 345.82 350.55 345.99 337.89 346.02C312.58 346.02 299.95 345.56 287.32 345.15C274.69 344.74 262.04 344.22 236.82 343.87C211.59 343.6 198.98 343.47 186.37 343.33C180.07 343.29 173.77 343.26 165.9 343.3C161.97 343.32 157.65 343.37 152.77 343.48C151.56 343.52 150.32 343.57 149.04 343.62C148.41 343.65 147.73 343.66 147.11 343.7C146.49 343.75 145.86 343.79 145.22 343.84C144.9 343.86 144.58 343.89 144.25 343.91C143.88 343.94 143.52 343.98 143.14 344.01C142.38 344.08 141.61 344.15 140.83 344.22C139.3 344.31 137.7 344.43 136.09 344.48C129.63 344.73 124.06 344.72 119.08 344.69C114.11 344.66 109.74 344.59 105.77 344.51C103.78 344.47 101.9 344.43 100.09 344.39C99.1797 344.37 98.2897 344.35 97.4197 344.33C97.0197 344.33 96.6297 344.31 96.2297 344.3C95.8297 344.32 95.4397 344.33 95.0497 344.35C93.4897 344.41 91.9797 344.47 90.4297 344.6C88.8897 344.69 87.3997 344.86 85.8997 345.03C79.9197 345.73 74.0197 346.88 67.0597 349.21C63.5897 350.39 59.8697 351.93 55.9497 354.14C52.0597 356.37 47.9097 359.23 43.9497 363.27C41.9697 365.29 40.2697 367.34 38.8597 369.39C37.4197 371.43 36.2097 373.45 35.2097 375.44C33.1797 379.4 31.8497 383.15 30.8897 386.64C29.0397 393.65 28.3797 399.68 28.4497 405.36C28.5397 411.11 29.5297 416.87 32.1697 423.59C33.5697 426.91 35.4097 430.46 38.0597 434.16C40.6997 437.85 44.1497 441.69 48.7097 445.4C50.9697 447.26 53.2497 448.82 55.4997 450.29C57.7297 451.73 59.8597 452.94 61.8997 454C65.9897 456.11 69.7397 457.46 73.2297 458.38C76.7197 459.31 79.9497 459.74 83.0297 459.92C86.0997 460.15 89.0297 460.01 91.9597 459.79C92.6897 459.71 93.4197 459.62 94.1597 459.54C94.8997 459.47 95.6297 459.37 96.3797 459.23C97.1197 459.1 97.8697 458.98 98.6297 458.85L99.7997 458.65C100.17 458.65 100.54 458.68 100.91 458.69C101.33 458.71 101.75 458.73 102.18 458.75C105.52 458.9 109.06 459.07 113 459.25C120.87 459.61 130.31 460.04 142.9 460.61C149.2 460.89 154.71 461.14 159.63 461.36C160.86 461.41 162.05 461.47 163.21 461.52C164.37 461.52 165.5 461.52 166.6 461.52C168.8 461.52 170.87 461.52 172.84 461.52C180.73 461.5 187.05 461.49 193.36 461.48C205.99 461.46 218.62 461.45 243.88 461.41C294.43 461.41 294.44 460.56 344.99 460.56C378.69 460.48 412.39 460.4 446.09 460.32C483.41 460.32 481.14 463.29 481.14 466.2C481.14 469.11 483.42 471.97 446.06 471.97L446.05 472.03Z" fill="currentColor"></path><path d="M453.09 469.63C448.91 467.76 446.89 466.65 445.03 465.27C444.09 464.61 443.15 463.96 441.95 463.17C440.82 462.29 439.45 461.25 437.59 459.93C435.79 458.51 434.54 457.33 433.46 456.39C432.91 455.93 432.48 455.45 432.07 455C431.66 454.55 431.27 454.13 430.89 453.71C429.31 452.05 427.87 450.28 425.13 446.63C424.48 445.69 423.92 444.87 423.41 444.14C422.9 443.41 422.42 442.79 422.06 442.17C421.3 440.97 420.66 440.02 420.01 439.07C419.33 438.14 418.84 437.11 418.15 435.85C417.82 435.22 417.46 434.51 417.07 433.71C416.72 432.89 416.37 431.96 415.97 430.89C415.59 429.82 415.19 428.9 414.94 428.04C414.68 427.19 414.45 426.45 414.24 425.77C413.81 424.41 413.44 423.33 413.18 422.23C412.9 421.13 412.63 420.02 412.28 418.65C412 417.26 411.74 415.58 411.4 413.34C411.18 411.09 411.11 409.39 411.11 407.97C411.18 406.55 411.3 405.42 411.42 404.3C411.49 403.73 411.52 403.19 411.62 402.57C411.72 401.95 411.81 401.3 411.9 400.58C411.99 399.86 412.07 399.07 412.15 398.17C412.29 397.29 412.44 396.3 412.58 395.17C412.82 392.89 413.25 391.26 413.47 389.86C413.69 388.46 413.96 387.37 414.23 386.27C414.5 385.18 414.72 384.07 415.13 382.72C415.58 381.39 416.08 379.78 416.9 377.69C417.8 375.63 418.43 374.07 419.02 372.8C419.64 371.54 420.14 370.54 420.64 369.53C420.89 369.03 421.13 368.52 421.41 367.99C421.71 367.47 422.03 366.93 422.38 366.32C423.12 365.13 423.88 363.62 425.2 361.79C427.7 358.04 429.34 356.45 430.81 354.75C431.57 353.92 432.42 353.16 433.4 352.15C433.89 351.65 434.43 351.09 435.05 350.46C435.7 349.86 436.43 349.19 437.26 348.43C438.09 347.66 438.82 346.99 439.47 346.39C440.16 345.83 440.76 345.33 441.31 344.88C442.41 343.98 443.24 343.19 444.16 342.51C446.04 341.21 447.78 339.66 451.96 337.64C452.73 337.26 453.4 336.9 454.06 336.72C454.72 336.53 455.31 336.4 455.85 336.33C456.92 336.18 457.75 336.26 458.4 336.51C459.7 337 460.3 338.15 460.76 339.53C461.22 340.91 461.4 342.12 460.82 343.24C460.53 343.8 460.06 344.34 459.33 344.86C458.97 345.12 458.54 345.38 458.03 345.63C457.52 345.88 456.99 346.24 456.36 346.55C452.89 348.21 451.49 349.67 450 350.86C449.27 351.49 448.62 352.23 447.72 353.02C447.28 353.42 446.78 353.86 446.21 354.33C445.66 354.85 445.05 355.43 444.35 356.09C443.64 356.75 443 357.29 442.44 357.79C441.9 358.32 441.42 358.78 440.97 359.19C440.08 360.02 439.27 360.6 438.55 361.27C437.14 362.64 435.55 363.91 433.36 367.22C432.18 368.82 431.5 370.15 430.82 371.19C430.49 371.72 430.19 372.19 429.91 372.64C429.64 373.09 429.42 373.54 429.17 373.97C428.7 374.85 428.22 375.72 427.63 376.82C427.08 377.93 426.51 379.31 425.7 381.13C424.98 382.98 424.59 384.42 424.27 385.62C423.98 386.83 423.91 387.83 423.77 388.81C423.65 389.79 423.51 390.77 423.41 391.98C423.31 393.19 422.97 394.61 422.79 396.5C422.67 397.44 422.55 398.27 422.42 399C422.36 399.73 422.3 400.37 422.23 400.95C422.09 402.11 421.91 403.05 421.86 404.05C421.78 405.04 421.69 406.03 421.64 407.27C421.65 408.51 421.74 409.99 421.91 411.97C422.21 413.93 422.43 415.39 422.62 416.61C422.87 417.82 423.08 418.78 423.28 419.75C423.45 420.73 423.73 421.67 424.07 422.85C424.41 424.03 424.77 425.47 425.5 427.29C425.84 428.21 426.15 429.01 426.42 429.73C426.74 430.42 427.03 431.03 427.29 431.58C427.83 432.67 428.18 433.6 428.7 434.42C429.19 435.26 429.67 436.11 430.28 437.16C430.56 437.7 430.95 438.25 431.38 438.87C431.8 439.5 432.28 440.2 432.82 441C435.15 444.1 436.57 445.44 438.09 446.63C438.46 446.94 438.83 447.25 439.22 447.58C439.61 447.91 440 448.28 440.5 448.62C441.47 449.32 442.55 450.26 444.04 451.44C445.6 452.53 446.78 453.35 447.76 454.03C448.81 454.6 449.66 455.06 450.5 455.51C452.14 456.48 453.95 457.18 457.45 458.77C462.79 460.68 461.63 463.42 460.76 466.2C459.89 468.98 459.47 471.88 453.08 469.58L453.09 469.63Z" fill="currentColor"></path><path d="M410.99 431.63C394.01 431.99 393.99 431.21 377.01 431.56C360.02 431.9 360.02 431.63 343.03 431.95C326.04 432.27 326.06 433.07 309.06 433.36C292.07 433.64 292.07 433.98 275.07 434.21C266.57 434.32 262.3 434.04 258.04 433.78C253.77 433.5 249.5 433.23 240.97 433.15C223.95 432.95 223.95 433.31 206.95 432.99C189.94 432.64 189.94 432.77 172.94 432.38C155.93 431.99 155.94 431.5 138.94 431.11C121.94 430.74 121.93 431.22 104.95 430.93C92.4297 430.74 90.7997 428.54 90.7897 425.61C90.7697 422.72 92.5097 420.79 105.11 420.99C122.12 421.29 122.13 420.31 139.12 420.68C156.11 421.06 156.08 422.19 173.06 422.58C190.04 422.96 190.04 423.17 207.01 423.52C223.98 423.84 224.01 422.64 240.95 422.84C249.41 422.92 253.62 423.12 257.86 423.33C262.1 423.52 266.34 423.73 274.83 423.61C286.143 423.47 297.456 423.33 308.77 423.19C320.096 422.943 331.423 422.696 342.75 422.45C359.75 422.13 359.74 421.28 376.74 420.94C393.74 420.59 393.74 420.35 410.74 419.99C423.29 419.72 422.59 422.7 422.66 425.62C422.72 428.53 423.55 431.38 410.99 431.64V431.63Z" fill="currentColor"></path><path d="M149.86 380.89C159.25 380.52 159.28 381.3 168.67 380.94C178.06 380.59 178.07 380.86 187.47 380.53C196.87 380.2 196.84 379.4 206.24 379.1C215.65 378.81 215.63 378.47 225.06 378.23C229.77 378.11 232.15 378.39 234.53 378.65C236.91 378.93 239.31 379.2 244.07 379.27C253.53 379.46 253.53 379.1 262.95 379.41C272.36 379.75 272.37 379.62 281.77 380C291.17 380.38 291.15 380.87 300.55 381.25C309.93 381.61 309.97 381.13 319.31 381.41C322.75 381.5 324.67 382.1 325.73 383.03C326.8 383.97 327.04 385.26 327.04 386.72C327.04 388.18 326.81 389.37 325.68 390.19C324.54 391.02 322.53 391.45 319.03 391.35C309.59 391.06 309.57 392.04 300.16 391.68C290.76 391.3 290.81 390.18 281.43 389.8C272.05 389.43 272.06 389.22 262.69 388.88C253.33 388.57 253.27 389.77 243.98 389.58C239.35 389.5 237.06 389.31 234.74 389.1C232.41 388.91 230.08 388.71 225.39 388.82C216.03 389.06 216.02 388.97 206.65 389.26C197.26 389.56 197.27 389.7 187.88 390.02C178.49 390.35 178.52 391.2 169.12 391.55C159.73 391.91 159.73 392.15 150.34 392.52C143.4 392.79 143.71 389.82 143.59 386.9C143.47 383.99 142.93 381.15 149.88 380.87L149.86 380.89Z" fill="currentColor"></path></svg></div></div></div><div data-animate-header-heading="" class="c-heading-header u-child-contain u-mb-text w-richtext u-max-width-30ch"><h2>Related tutorials</h2></div><div data-animate-header-cta="" class="header_main_cta"><div data-wf--button-wrapper--mobile-styling="full-width-mobile" id="" class="u-display-contents"><div class="u-button-group w-variant-92fe68b6-7437-d0c6-3fc0-cc8114f8d03d"><div class="u-display-contents"></div></div></div></div><div data-wf--spacer--section-space="main" class="u-section-spacer w-variant-60a7ad7d-02b0-6682-95a5-2218e6fd1490 u-ignore-trim"></div></div><div class="related_list_wrap w-dyn-list"><div role="list" class="related_list u-grid-autofill w-dyn-items"><div role="listitem" class="related_item w-dyn-item"><div data-cta-copy="Using the Candid connector in Claude" data-cta-position="Related tutorial" data-animate-card-card="" data-cta="Tutorial page" data-wf--card-link--card-style="without-visual" class="card_link_wrap w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1 u-theme-white"><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Using the Candid connector in Claude" target="" data-cta="Tutorial page" data-cta-position="Related tutorial" href="/resources/tutorials/using-the-candid-connector-in-claude" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Using the Candid connector in Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Using the Candid connector in Claude</span></button></div><div class="card_link_layout w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div class="card_link_visual w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div></div><div data-wf--background-color--background-color="cactus" class="background_wrap w-variant-6a7cf8e4-a0fd-dfb2-14c5-1e4f4184afdc u-cover-absolute u-zindex-negative"></div></div><div class="card_link_content w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div class="card_link_title w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1 u-text-style-body-2">Using the Candid connector in Claude</div><div class="card_link_bottom"><div class="card_link"><div class="card_link_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M13.6229 9.64789C13.8798 9.54672 14.1701 9.6724 14.2714 9.92914L15.2792 12.4878C16.0889 14.5432 15.0788 16.8666 13.0233 17.6763C11.0323 18.4603 8.79012 17.5367 7.91585 15.6098L7.83577 15.4204L6.82795 12.8618C6.72674 12.6048 6.85325 12.3145 7.11018 12.2133C7.36701 12.1122 7.65732 12.2379 7.75862 12.4946L8.76645 15.0532C9.37368 16.5947 11.1156 17.3528 12.6571 16.7456C14.1986 16.1384 14.9557 14.3965 14.3485 12.8549L13.3407 10.2963C13.2395 10.0395 13.3661 9.74917 13.6229 9.64789ZM8.90024 7.20842C9.15717 7.10721 9.44747 7.23372 9.54868 7.49065L11.3817 12.143C11.4826 12.3998 11.3563 12.6903 11.0995 12.7915C10.8426 12.8925 10.5523 12.766 10.451 12.5092L8.61898 7.85686C8.5178 7.59999 8.64342 7.30969 8.90024 7.20842ZM7.16975 2.25331C9.17539 1.57852 11.3796 2.58838 12.1639 4.5795L13.1718 7.13811C13.273 7.39504 13.1465 7.68534 12.8895 7.78655C12.6327 7.88749 12.3423 7.76113 12.2411 7.50432L11.2333 4.94571C10.6259 3.40439 8.88406 2.6471 7.3426 3.25429C5.80118 3.86161 5.04399 5.60345 5.65118 7.14494L6.659 9.70355C6.76021 9.96048 6.6337 10.2508 6.37677 10.352C6.11988 10.4531 5.82952 10.3266 5.72833 10.0698L4.7205 7.51116C3.91111 5.45581 4.92107 3.13323 6.97639 2.32362L7.16975 2.25331Z" fill="currentColor"></path></svg></div></div><div class="card_link_text u-text-style-caption">Tutorial</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/resources/tutorials/using-the-candid-connector-in-claude" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Tutorial</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Tutorial</span></button></div></div></div></div></div></div></div><div role="listitem" class="related_item w-dyn-item"><div data-cta-copy="Using the Blackbaud connector in Claude" data-cta-position="Related tutorial" data-animate-card-card="" data-cta="Tutorial page" data-wf--card-link--card-style="without-visual" class="card_link_wrap w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1 u-theme-white"><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Using the Blackbaud connector in Claude" target="" data-cta="Tutorial page" data-cta-position="Related tutorial" href="/resources/tutorials/using-the-blackbaud-connector-in-claude" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Using the Blackbaud connector in Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Using the Blackbaud connector in Claude</span></button></div><div class="card_link_layout w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div class="card_link_visual w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div></div><div data-wf--background-color--background-color="cactus" class="background_wrap w-variant-6a7cf8e4-a0fd-dfb2-14c5-1e4f4184afdc u-cover-absolute u-zindex-negative"></div></div><div class="card_link_content w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div class="card_link_title w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1 u-text-style-body-2">Using the Blackbaud connector in Claude</div><div class="card_link_bottom"><div class="card_link"><div class="card_link_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M13.6229 9.64789C13.8798 9.54672 14.1701 9.6724 14.2714 9.92914L15.2792 12.4878C16.0889 14.5432 15.0788 16.8666 13.0233 17.6763C11.0323 18.4603 8.79012 17.5367 7.91585 15.6098L7.83577 15.4204L6.82795 12.8618C6.72674 12.6048 6.85325 12.3145 7.11018 12.2133C7.36701 12.1122 7.65732 12.2379 7.75862 12.4946L8.76645 15.0532C9.37368 16.5947 11.1156 17.3528 12.6571 16.7456C14.1986 16.1384 14.9557 14.3965 14.3485 12.8549L13.3407 10.2963C13.2395 10.0395 13.3661 9.74917 13.6229 9.64789ZM8.90024 7.20842C9.15717 7.10721 9.44747 7.23372 9.54868 7.49065L11.3817 12.143C11.4826 12.3998 11.3563 12.6903 11.0995 12.7915C10.8426 12.8925 10.5523 12.766 10.451 12.5092L8.61898 7.85686C8.5178 7.59999 8.64342 7.30969 8.90024 7.20842ZM7.16975 2.25331C9.17539 1.57852 11.3796 2.58838 12.1639 4.5795L13.1718 7.13811C13.273 7.39504 13.1465 7.68534 12.8895 7.78655C12.6327 7.88749 12.3423 7.76113 12.2411 7.50432L11.2333 4.94571C10.6259 3.40439 8.88406 2.6471 7.3426 3.25429C5.80118 3.86161 5.04399 5.60345 5.65118 7.14494L6.659 9.70355C6.76021 9.96048 6.6337 10.2508 6.37677 10.352C6.11988 10.4531 5.82952 10.3266 5.72833 10.0698L4.7205 7.51116C3.91111 5.45581 4.92107 3.13323 6.97639 2.32362L7.16975 2.25331Z" fill="currentColor"></path></svg></div></div><div class="card_link_text u-text-style-caption">Tutorial</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/resources/tutorials/using-the-blackbaud-connector-in-claude" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Tutorial</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Tutorial</span></button></div></div></div></div></div></div></div><div role="listitem" class="related_item w-dyn-item"><div data-cta-copy="Using the Benevity connector in Claude" data-cta-position="Related tutorial" data-animate-card-card="" data-cta="Tutorial page" data-wf--card-link--card-style="without-visual" class="card_link_wrap w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1 u-theme-white"><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Using the Benevity connector in Claude" target="" data-cta="Tutorial page" data-cta-position="Related tutorial" href="/resources/tutorials/using-the-benevity-connector-in-claude" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Using the Benevity connector in Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Using the Benevity connector in Claude</span></button></div><div class="card_link_layout w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div class="card_link_visual w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div></div><div data-wf--background-color--background-color="cactus" class="background_wrap w-variant-6a7cf8e4-a0fd-dfb2-14c5-1e4f4184afdc u-cover-absolute u-zindex-negative"></div></div><div class="card_link_content w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div class="card_link_title w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1 u-text-style-body-2">Using the Benevity connector in Claude</div><div class="card_link_bottom"><div class="card_link"><div class="card_link_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M13.6229 9.64789C13.8798 9.54672 14.1701 9.6724 14.2714 9.92914L15.2792 12.4878C16.0889 14.5432 15.0788 16.8666 13.0233 17.6763C11.0323 18.4603 8.79012 17.5367 7.91585 15.6098L7.83577 15.4204L6.82795 12.8618C6.72674 12.6048 6.85325 12.3145 7.11018 12.2133C7.36701 12.1122 7.65732 12.2379 7.75862 12.4946L8.76645 15.0532C9.37368 16.5947 11.1156 17.3528 12.6571 16.7456C14.1986 16.1384 14.9557 14.3965 14.3485 12.8549L13.3407 10.2963C13.2395 10.0395 13.3661 9.74917 13.6229 9.64789ZM8.90024 7.20842C9.15717 7.10721 9.44747 7.23372 9.54868 7.49065L11.3817 12.143C11.4826 12.3998 11.3563 12.6903 11.0995 12.7915C10.8426 12.8925 10.5523 12.766 10.451 12.5092L8.61898 7.85686C8.5178 7.59999 8.64342 7.30969 8.90024 7.20842ZM7.16975 2.25331C9.17539 1.57852 11.3796 2.58838 12.1639 4.5795L13.1718 7.13811C13.273 7.39504 13.1465 7.68534 12.8895 7.78655C12.6327 7.88749 12.3423 7.76113 12.2411 7.50432L11.2333 4.94571C10.6259 3.40439 8.88406 2.6471 7.3426 3.25429C5.80118 3.86161 5.04399 5.60345 5.65118 7.14494L6.659 9.70355C6.76021 9.96048 6.6337 10.2508 6.37677 10.352C6.11988 10.4531 5.82952 10.3266 5.72833 10.0698L4.7205 7.51116C3.91111 5.45581 4.92107 3.13323 6.97639 2.32362L7.16975 2.25331Z" fill="currentColor"></path></svg></div></div><div class="card_link_text u-text-style-caption">Tutorial</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/resources/tutorials/using-the-benevity-connector-in-claude" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Tutorial</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Tutorial</span></button></div></div></div></div></div></div></div><div role="listitem" class="related_item w-dyn-item"><div data-cta-copy="Claude for nonprofits partnership guide for all users" data-cta-position="Related tutorial" data-animate-card-card="" data-cta="Tutorial page" data-wf--card-link--card-style="without-visual" class="card_link_wrap w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1 u-theme-white"><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Claude for nonprofits partnership guide for all users" target="" data-cta="Tutorial page" data-cta-position="Related tutorial" href="/resources/tutorials/claude-for-nonprofits-partnership-guide-for-all-users" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude for nonprofits partnership guide for all users</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude for nonprofits partnership guide for all users</span></button></div><div class="card_link_layout w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div class="card_link_visual w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div></div><div data-wf--background-color--background-color="cactus" class="background_wrap w-variant-6a7cf8e4-a0fd-dfb2-14c5-1e4f4184afdc u-cover-absolute u-zindex-negative"></div></div><div class="card_link_content w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1"><div class="card_link_title w-variant-fb0e80c2-7e25-32c4-36bb-e08a8b3fe3b1 u-text-style-body-2">Claude for nonprofits partnership guide for all users</div><div class="card_link_bottom"><div class="card_link"><div class="card_link_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M13.6229 9.64789C13.8798 9.54672 14.1701 9.6724 14.2714 9.92914L15.2792 12.4878C16.0889 14.5432 15.0788 16.8666 13.0233 17.6763C11.0323 18.4603 8.79012 17.5367 7.91585 15.6098L7.83577 15.4204L6.82795 12.8618C6.72674 12.6048 6.85325 12.3145 7.11018 12.2133C7.36701 12.1122 7.65732 12.2379 7.75862 12.4946L8.76645 15.0532C9.37368 16.5947 11.1156 17.3528 12.6571 16.7456C14.1986 16.1384 14.9557 14.3965 14.3485 12.8549L13.3407 10.2963C13.2395 10.0395 13.3661 9.74917 13.6229 9.64789ZM8.90024 7.20842C9.15717 7.10721 9.44747 7.23372 9.54868 7.49065L11.3817 12.143C11.4826 12.3998 11.3563 12.6903 11.0995 12.7915C10.8426 12.8925 10.5523 12.766 10.451 12.5092L8.61898 7.85686C8.5178 7.59999 8.64342 7.30969 8.90024 7.20842ZM7.16975 2.25331C9.17539 1.57852 11.3796 2.58838 12.1639 4.5795L13.1718 7.13811C13.273 7.39504 13.1465 7.68534 12.8895 7.78655C12.6327 7.88749 12.3423 7.76113 12.2411 7.50432L11.2333 4.94571C10.6259 3.40439 8.88406 2.6471 7.3426 3.25429C5.80118 3.86161 5.04399 5.60345 5.65118 7.14494L6.659 9.70355C6.76021 9.96048 6.6337 10.2508 6.37677 10.352C6.11988 10.4531 5.82952 10.3266 5.72833 10.0698L4.7205 7.51116C3.91111 5.45581 4.92107 3.13323 6.97639 2.32362L7.16975 2.25331Z" fill="currentColor"></path></svg></div></div><div class="card_link_text u-text-style-caption">Tutorial</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/resources/tutorials/claude-for-nonprofits-partnership-guide-for-all-users" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Tutorial</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Tutorial</span></button></div></div></div></div></div></div></div></div></div></div><div data-wf--spacer--section-space="main" class="u-section-spacer w-variant-60a7ad7d-02b0-6682-95a5-2218e6fd1490 u-ignore-trim"></div></section></div><section class="footer_wrap u-section"><div class="u-embed-css w-embed"><style>
  @container (width < 52em) {
    .footer_layout {
      display: flex;
      column-gap: var(--_spacing---space--4rem);
      row-gap: var(--_spacing---space--4rem);
    }
    .footer_content_wrap.u-column-custom {
      display: contents;
    }
  }

  .footer_link {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  .footer_links_list:has(.footer_link:hover) .footer_link:not(:hover) {
    opacity: 0.4;
  }
</style></div><div data-wf--background-color--background-color="background-primary" class="background_wrap w-variant-cd5f9287-5b9f-b1bf-cfe9-3449eb06f297 u-cover-absolute"></div><div data-wf--spacer--section-space="small" class="u-section-spacer w-variant-d422cbd0-f212-c815-68df-63414354c21d u-ignore-trim"></div><div class="footer_contain u-container"><div class="footer_layout u-grid-custom"><div class="footer_content_wrap u-column-custom"><div class="footer_content_top"><div class="footer_logo"><div STYLE="" class="u-max-width-full"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 573 125" fill="none" class="u-svg"><path d="M200.168 110.625C190.376 110.625 181.647 108.688 173.98 104.813C166.355 100.896 160.397 95.4167 156.105 88.375C151.814 81.3333 149.668 73.25 149.668 64.125C149.668 54.4167 151.855 45.7917 156.23 38.25C160.647 30.7083 166.751 24.8542 174.543 20.6875C182.335 16.4792 191.189 14.375 201.105 14.375C207.064 14.375 213.001 15.0208 218.918 16.3125C224.876 17.5625 230.105 19.5208 234.605 22.1875V42.75H228.98C227.397 35.2083 224.293 29.7292 219.668 26.3125C215.085 22.8958 208.814 21.1875 200.855 21.1875C193.23 21.1875 186.897 22.8958 181.855 26.3125C176.814 29.7292 173.085 34.5 170.668 40.625C168.251 46.7083 167.043 53.7917 167.043 61.875C167.043 69.8333 168.397 76.9792 171.105 83.3125C173.814 89.6458 177.835 94.6458 183.168 98.3125C188.501 101.979 194.918 103.813 202.418 103.813C207.501 103.813 211.855 102.813 215.48 100.813C219.147 98.8125 222.23 96.0833 224.73 92.625C227.23 89.125 229.564 84.8333 231.73 79.75H237.605L233.605 102.313C229.272 105.104 224.105 107.188 218.105 108.563C212.105 109.938 206.126 110.625 200.168 110.625ZM243.168 103.938C245.626 103.646 247.543 103.271 248.918 102.813C250.335 102.313 251.355 101.646 251.98 100.813C252.605 99.9792 252.918 98.9167 252.918 97.625V29.5625L243.168 25.875V21.6875L262.793 14.375H267.793V97.625C267.793 98.9167 268.105 99.9792 268.73 100.813C269.355 101.646 270.355 102.313 271.73 102.813C273.147 103.271 275.085 103.646 277.543 103.938V109.375H243.168V103.938ZM300.355 110.625C296.772 110.625 293.605 109.958 290.855 108.625C288.105 107.292 285.96 105.417 284.418 103C282.918 100.583 282.168 97.7917 282.168 94.625C282.168 90 283.626 86.1875 286.543 83.1875C289.501 80.1458 294.043 77.75 300.168 76L322.855 69.5625V62.75C322.855 58.2917 321.793 54.9167 319.668 52.625C317.585 50.3333 314.48 49.1875 310.355 49.1875C306.73 49.1875 303.855 50.2917 301.73 52.5C299.647 54.7083 298.605 57.7083 298.605 61.5V67.125H288.48C287.272 66.375 286.335 65.3958 285.668 64.1875C285.043 62.9375 284.73 61.5625 284.73 60.0625C284.73 57.1042 285.876 54.3958 288.168 51.9375C290.46 49.4375 293.564 47.4583 297.48 46C301.397 44.5417 305.689 43.8125 310.355 43.8125C316.189 43.8125 321.147 44.6875 325.23 46.4375C329.314 48.1875 332.418 50.7708 334.543 54.1875C336.668 57.6042 337.73 61.7292 337.73 66.5625V96.25C337.73 97.7083 338.022 98.875 338.605 99.75C339.23 100.625 340.23 101.333 341.605 101.875C343.022 102.375 344.98 102.771 347.48 103.063V108.5C343.855 109.792 340.376 110.438 337.043 110.438C333.001 110.438 329.751 109.479 327.293 107.563C324.876 105.646 323.439 102.896 322.98 99.3125C319.939 103.063 316.522 105.896 312.73 107.813C308.939 109.688 304.814 110.625 300.355 110.625ZM307.668 100.625C310.335 100.625 312.98 100 315.605 98.75C318.272 97.4583 320.689 95.6667 322.855 93.375V75.3125L305.855 80.375C302.939 81.25 300.71 82.625 299.168 84.5C297.626 86.3333 296.855 88.5833 296.855 91.25C296.855 93.0833 297.314 94.7083 298.23 96.125C299.147 97.5417 300.418 98.6458 302.043 99.4375C303.71 100.229 305.585 100.625 307.668 100.625ZM376.543 110.625C369.876 110.625 364.814 108.938 361.355 105.563C357.897 102.146 356.168 97.1667 356.168 90.625V58.375L346.418 54.9375V50.75L366.105 43.8125H371.043V88.0625C371.043 92.0208 372.043 94.9583 374.043 96.875C376.043 98.7917 379.126 99.75 383.293 99.75C385.96 99.75 388.814 99.1458 391.855 97.9375C394.939 96.7292 397.814 95.0625 400.48 92.9375V58.375L390.73 54.9375V50.75L410.418 43.8125H415.355V92.5C415.355 93.9583 415.647 95.125 416.23 96C416.855 96.875 417.855 97.5625 419.23 98.0625C420.605 98.5625 422.564 98.9792 425.105 99.3125V104.75L405.418 110H400.48V98.9375C396.98 102.563 393.085 105.417 388.793 107.5C384.543 109.583 380.46 110.625 376.543 110.625ZM458.73 110.625C453.105 110.625 448.043 109.354 443.543 106.813C439.085 104.229 435.585 100.688 433.043 96.1875C430.501 91.6458 429.23 86.5625 429.23 80.9375C429.23 73.6042 430.751 67.125 433.793 61.5C436.876 55.875 441.189 51.5208 446.73 48.4375C452.272 45.3542 458.689 43.8125 465.98 43.8125C468.355 43.8125 470.772 44.0625 473.23 44.5625C475.73 45.0625 478.085 45.7708 480.293 46.6875V29.5625L470.543 25.875V21.6875L490.168 14.375H495.168V92.5C495.168 93.9583 495.46 95.125 496.043 96C496.668 96.875 497.668 97.5625 499.043 98.0625C500.418 98.5625 502.376 98.9792 504.918 99.3125V104.75L485.23 110H480.293V101.438C477.168 104.396 473.751 106.667 470.043 108.25C466.335 109.833 462.564 110.625 458.73 110.625ZM464.855 100.563C467.355 100.563 469.96 100.042 472.668 99C475.376 97.9167 477.918 96.4583 480.293 94.625V56C476.21 52.6667 471.751 51 466.918 51C462.168 51 458.126 52.125 454.793 54.375C451.46 56.625 448.939 59.7083 447.23 63.625C445.564 67.5417 444.73 71.9792 444.73 76.9375C444.73 81.6458 445.48 85.7708 446.98 89.3125C448.48 92.8542 450.73 95.625 453.73 97.625C456.772 99.5833 460.48 100.563 464.855 100.563ZM541.293 110.625C535.168 110.625 529.647 109.229 524.73 106.438C519.814 103.646 515.96 99.7708 513.168 94.8125C510.418 89.8125 509.043 84.1875 509.043 77.9375C509.043 71.6042 510.46 65.8333 513.293 60.625C516.126 55.4167 520.001 51.3125 524.918 48.3125C529.876 45.3125 535.376 43.8125 541.418 43.8125C546.001 43.8125 550.272 44.7708 554.23 46.6875C558.189 48.6042 561.501 51.2917 564.168 54.75C566.876 58.2083 568.668 62.1667 569.543 66.625L524.168 80.375C525.418 85.875 527.897 90.1875 531.605 93.3125C535.355 96.3958 539.96 97.9375 545.418 97.9375C550.001 97.9375 554.105 96.8542 557.73 94.6875C561.355 92.4792 564.564 89.1458 567.355 84.6875L572.168 86.1875C571.001 91.1042 568.939 95.4167 565.98 99.125C563.064 102.792 559.48 105.625 555.23 107.625C550.98 109.625 546.335 110.625 541.293 110.625ZM553.293 64.75C552.71 61.9583 551.751 59.5208 550.418 57.4375C549.126 55.3125 547.501 53.6875 545.543 52.5625C543.585 51.3958 541.397 50.8125 538.98 50.8125C535.939 50.8125 533.231 51.7083 530.856 53.5C528.481 55.2917 526.626 57.8333 525.293 61.125C523.96 64.375 523.293 68.1458 523.293 72.4375C523.293 73.1458 523.314 73.7083 523.355 74.125L553.293 64.75Z" fill="currentColor"></path><path d="M54.375 118.75L56.125 111L58.125 101L59.75 93L61.25 83.125L62.125 79.875L62 79.625L61.375 79.75L53.875 90L42.5 105.375L33.5 114.875L31.375 115.75L27.625 113.875L28 110.375L30.125 107.375L42.5 91.5L50 81.625L54.875 76L54.75 75.25H54.5L21.5 96.75L15.625 97.5L13 95.125L13.375 91.25L14.625 90L24.5 83.125L49.125 69.375L49.5 68.125L49.125 67.5H47.875L43.75 67.25L29.75 66.875L17.625 66.375L5.75 65.75L2.75 65.125L0 61.375L0.25 59.5L2.75 57.875L6.375 58.125L14.25 58.75L26.125 59.5L34.75 60L47.5 61.375H49.5L49.75 60.5L49.125 60L48.625 59.5L36.25 51.25L23 42.5L16 37.375L12.25 34.75L10.375 32.375L9.625 27.125L13 23.375L17.625 23.75L18.75 24L23.375 27.625L33.25 35.25L46.25 44.875L48.125 46.375L49 45.875V45.5L48.125 44.125L41.125 31.375L33.625 18.375L30.25 13L29.375 9.75C29.0417 8.625 28.875 7.375 28.875 6L32.75 0.750006L34.875 0L40.125 0.750006L42.25 2.625L45.5 10L50.625 21.625L58.75 37.375L61.125 42.125L62.375 46.375L62.875 47.75H63.75V47L64.375 38L65.625 27.125L66.875 13.125L67.25 9.125L69.25 4.375L73.125 1.87501L76.125 3.25L78.625 6.875L78.25 9.125L76.875 18.75L73.875 33.875L72 44.125H73.125L74.375 42.75L79.5 36L88.125 25.25L91.875 21L96.375 16.25L99.25 14H104.625L108.5 19.875L106.75 26L101.25 33L96.625 38.875L90 47.75L86 54.875L86.375 55.375H87.25L102.125 52.125L110.25 50.75L119.75 49.125L124.125 51.125L124.625 53.125L122.875 57.375L112.625 59.875L100.625 62.25L82.75 66.5L82.5 66.625L82.75 67L90.75 67.75L94.25 68H102.75L118.5 69.125L122.625 71.875L125 75.125L124.625 77.75L118.25 80.875L109.75 78.875L89.75 74.125L83 72.5H82V73L87.75 78.625L98.125 88L111.25 100.125L111.875 103.125L110.25 105.625L108.5 105.375L97 96.625L92.5 92.75L82.5 84.375H81.875V85.25L84.125 88.625L96.375 107L97 112.625L96.125 114.375L92.875 115.5L89.5 114.875L82.25 104.875L74.875 93.5L68.875 83.375L68.25 83.875L64.625 121.625L63 123.5L59.25 125L56.125 122.625L54.375 118.75Z" fill="var(--swatch--clay)"></path></svg></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Claude logo" target="" data-cta="" data-cta-position="Footer section" href="https://claude.com" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Homepage</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Homepage</span></button></div></div><div class="footer_prompt"><div data-prompt-scope="" class="prompt_wrap"><div class="u-display-contents"><div class="form_footer_prompt_wrap w-form"><form method="get" name="wf-form-Footer-Prompt" data-name="Footer Prompt" data-claude-mode="intercept" data-claude-form="" id="wf-form-Footer-Prompt" class="form_footer_prompt_list" data-wf-page-id="69309a14a0016339f07e9a97" data-wf-element-id="f35deeee-ff20-8187-beb0-116f6969e231"><div class="form_footer_prompt"><textarea class="form_footer_prompt_textarea u-text-style-caption w-input" data-autogrow="" data-claude-textarea="" maxlength="5000" name="field" data-name="Field" placeholder="How can I help you today?" id="footerPrompt"></textarea><div data-wf--button-icon-tiny--style="brand" data-claude-button="" class="button_icon_tiny_wrap w-variant-65d2c5b5-e995-8873-5672-27bf4768a028 u-flex-noshrink"><div class="button_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M10 3C10.1326 3.00003 10.2598 3.05274 10.3535 3.14648L15.3536 8.14648C15.5486 8.34174 15.5487 8.6583 15.3536 8.85352C15.1583 9.04873 14.8418 9.04863 14.6465 8.85352L10.5 4.70703V16.5C10.5 16.7761 10.2761 16.9999 10 17C9.72389 17 9.50003 16.7761 9.50003 16.5V4.70703L5.35353 8.85352C5.15827 9.04862 4.84172 9.04868 4.6465 8.85352C4.45128 8.6583 4.45138 8.34176 4.6465 8.14648L9.64651 3.14648L9.72268 3.08398C9.8042 3.02967 9.90062 3 10 3Z" fill="currentColor"></path></svg></div></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Next</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Next</span></button></div></div></div></form><div class="w-form-done"><div>Thank you! Your submission has been received!</div></div><div class="w-form-fail"><div>Oops! Something went wrong while submitting the form.</div></div></div></div><div class="prompt_button_list"><div class="u-embed-js w-embed w-script"><script>
  (function () {
    const ROOT_SEL = "[data-prompt-scope]";
    const TRIGGER_SEL = "[data-prompt-trigger]";
    const MENU_ATTR = "data-prompt-menu";
    const CLOSE_SEL = "[data-prompt-menu-close]";
    const ACTION_SEL = "a, button, [data-prompt-menu-action]";
    const ITEM_SEL = "[data-prompt-item], li, .menu-item, .w-dyn-item";

    // ---------- Claude helper ----------
    function buildClaudeUrl(text) {
      const url = new URL("https://claude.ai/new");
      url.searchParams.set("q", text || "");
      return url.toString();
    }
    function openClaude(text) {
      const q = (text || "").trim();
      if (!q) return;
      window.open(buildClaudeUrl(q), "_blank", "noopener");
    }

    // ---------- Utilities ----------
    let uid = 0;
    function makeId(prefix = "prompt-menu") {
      uid += 1;
      return `${prefix}-${Date.now().toString(36)}-${uid}`;
    }

    // Limit queries to elements that belong to THIS scope (ignore nested scopes)
    function qsaInScope(root, sel) {
      return Array.from(root.querySelectorAll(sel)).filter(
        (el) => el.closest(ROOT_SEL) === root
      );
    }

    // Lightweight shield to stop click-through during the brief close animation
    function deployClickShield(ms = 300) {
      const sh = document.createElement("div");
      sh.style.cssText =
        "position:fixed;inset:0;z-index:2147483647;pointer-events:auto;background:transparent";
      document.body.appendChild(sh);
      setTimeout(() => {
        sh.remove();
      }, ms);
    }

    // Pairing: find which menu a trigger controls (no manual ids needed)
    function resolveMenuForTrigger(root, trigger) {
      // 1) explicit data-prompt-trigger="x" -> [data-prompt-menu="x"]
      const explicit = trigger.getAttribute("data-prompt-trigger");
      if (explicit) {
        const m = qsaInScope(root, `[${MENU_ATTR}="${explicit}"]`)[0];
        if (m) return m;
      }
      // 2) aria-controls
      const ctrl = trigger.getAttribute("aria-controls");
      if (ctrl) {
        const m = qsaInScope(root, `#${ctrl.replace(/(["'\\])/g, "\\$1")}`)[0];
        if (m) return m;
      }
      // 3) nearest following sibling with [data-prompt-menu]
      let sib = trigger.nextElementSibling;
      while (sib && sib !== root) {
        if (
          sib.hasAttribute &&
          sib.hasAttribute(MENU_ATTR) &&
          sib.closest(ROOT_SEL) === root
        )
          return sib;
        sib = sib.nextElementSibling;
      }
      // 4) first menu in this root
      return qsaInScope(root, `[${MENU_ATTR}]`)[0] || null;
    }

    function ensurePairing(trigger, menu) {
      if (!menu.id) menu.id = makeId();
      trigger.setAttribute("aria-controls", menu.id);
      if (trigger.tagName === "BUTTON" && !trigger.hasAttribute("type"))
        trigger.type = "button";
    }

    // ---------- Animations (GSAP) ----------
    function revealMenu(menu) {
      return new Promise((resolve) => {
        gsap.set(menu, {
          visibility: "visible",
          pointerEvents: "auto",
          willChange: "transform, opacity",
        });
        gsap.killTweensOf(menu);
        gsap.fromTo(
          menu,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.28,
            ease: "power3.out",
            clearProps: "willChange",
            onComplete: resolve,
          }
        );
      });
    }
    function hideMenu(menu) {
      return new Promise((resolve) => {
        gsap.killTweensOf(menu);
        gsap.to(menu, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(menu, {
              visibility: "hidden",
              pointerEvents: "none",
              clearProps: "opacity,scale,willChange",
            });
            resolve();
          },
        });
      });
    }

    // ---------- Per-scope controller ----------
    const stateMap = new WeakMap(); // root -> { openMenuEl, openTrigger, isAnimating }

    function getState(root) {
      let s = stateMap.get(root);
      if (!s) {
        s = { openMenuEl: null, openTrigger: null, isAnimating: false };
        stateMap.set(root, s);
      }
      return s;
    }

    function setTriggersInteractive(root, enabled) {
      qsaInScope(root, TRIGGER_SEL).forEach((el) => {
        el.style.pointerEvents = enabled ? "auto" : "none";
      });
    }

    // ---------- Button fade animations ----------
    function fadeOutButtons(root) {
      return new Promise((resolve) => {
        const buttons = qsaInScope(root, TRIGGER_SEL);
        if (buttons.length === 0) {
          resolve();
          return;
        }

        gsap.killTweensOf(buttons);
        gsap.to(buttons, {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: resolve,
        });
      });
    }

    function fadeInButtons(root) {
      return new Promise((resolve) => {
        const buttons = qsaInScope(root, TRIGGER_SEL);
        if (buttons.length === 0) {
          resolve();
          return;
        }

        gsap.killTweensOf(buttons);
        gsap.to(buttons, {
          autoAlpha: 1,
          duration: 0.2,
          ease: "power2.out",
          onComplete: resolve,
        });
      });
    }

    async function openMenuIn(root, menu, trigger) {
      const s = getState(root);
      if (s.isAnimating || s.openMenuEl === menu) return;
      s.isAnimating = true;

      // close any currently open in THIS scope only
      if (s.openMenuEl && s.openMenuEl !== menu) {
        await hideMenu(s.openMenuEl);
        if (s.openTrigger) s.openTrigger.setAttribute("aria-expanded", "false");
      }

      // Fade out buttons when opening menu
      await fadeOutButtons(root);

      await revealMenu(menu);
      s.openMenuEl = menu;
      s.openTrigger = trigger || null;
      if (s.openTrigger) s.openTrigger.setAttribute("aria-expanded", "true");

      // Disable only this scope's triggers while open
      setTriggersInteractive(root, false);

      s.isAnimating = false;
    }

    async function closeMenuIn(root) {
      const s = getState(root);
      if (!s.openMenuEl || s.isAnimating) return;
      s.isAnimating = true;

      deployClickShield(280); // prevent click-through during closing
      await hideMenu(s.openMenuEl);

      if (s.openTrigger) s.openTrigger.setAttribute("aria-expanded", "false");
      s.openMenuEl = null;
      s.openTrigger = null;

      // Re-enable only this scope's triggers
      setTriggersInteractive(root, true);

      // Fade in buttons when closing menu
      await fadeInButtons(root);

      s.isAnimating = false;
    }

    // ---------- Initializer ----------
    const initedRoots = new WeakSet();

    function initScope(root) {
      if (!root || initedRoots.has(root)) return;
      initedRoots.add(root);

      if (!window.gsap) {
        console.warn("GSAP is required for prompt menus.");
        return;
      }

      // Normalize ALL menus in this scope to hidden on init (prevents “open on load” bugs)
      qsaInScope(root, `[${MENU_ATTR}]`).forEach((menu) => {
        if (menu.dataset.pmMenuInit) return;
        menu.dataset.pmMenuInit = "true";
        gsap.set(menu, {
          visibility: "hidden",
          opacity: 0,
          scale: 1,
          pointerEvents: "none",
        });

        // Optional close button
        const closer = menu.querySelector(CLOSE_SEL);
        if (closer) {
          if (closer.tagName === "BUTTON" && !closer.hasAttribute("type"))
            closer.type = "button";
          closer.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMenuIn(root);
          });
        }

        // Menu item -> Claude
        menu.addEventListener("click", (e) => {
          const target = e.target.closest(ACTION_SEL);
          if (!target || !menu.contains(target)) return;

          const container = target.closest(ITEM_SEL) || target;
          const hiddenP = container.querySelector("[data-prompt-menu-text]");
          if (!hiddenP) return;

          e.preventDefault();
          e.stopPropagation();

          const text = hiddenP.textContent || hiddenP.innerText || "";
          openClaude(text);

          // close after action
          closeMenuIn(root);
        });
      });

      // Bind triggers (auto-wire)
      qsaInScope(root, TRIGGER_SEL).forEach((trigger) => {
        if (trigger.dataset.pmTrigInit) return;
        trigger.dataset.pmTrigInit = "true";

        const menu = resolveMenuForTrigger(root, trigger);
        if (menu) ensurePairing(trigger, menu);

        trigger.setAttribute("aria-expanded", "false");

        trigger.addEventListener("click", async (e) => {
          e.preventDefault();

          const targetMenu = resolveMenuForTrigger(root, trigger);
          if (!targetMenu) return;

          const s = getState(root);
          if (s.openMenuEl === targetMenu) {
            await closeMenuIn(root); // toggle close
            return;
          }
          await openMenuIn(root, targetMenu, trigger);
        });
      });

      // Outside click (this scope only)
      document.addEventListener("click", (e) => {
        const s = getState(root);
        if (!s.openMenuEl) return;
        const insideMenu = s.openMenuEl.contains(e.target);
        const onTrigger =
          !!e.target.closest(TRIGGER_SEL) && root.contains(e.target);
        if (!insideMenu && !onTrigger) closeMenuIn(root);
      });

      // ESC (this scope only)
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenuIn(root);
      });
    }

    // ---------- Boot + observe ----------
    function boot(container = document) {
      const roots = container.querySelectorAll
        ? container.querySelectorAll(ROOT_SEL)
        : [];
      roots.forEach(initScope);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => boot(), {
        once: true,
      });
    } else {
      boot();
    }

    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        for (const node of m.addedNodes || []) {
          if (node.nodeType !== 1) continue;
          if (node.matches && node.matches(ROOT_SEL)) initScope(node);
          if (node.querySelectorAll) {
            node.querySelectorAll(ROOT_SEL).forEach(initScope);
          }
        }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  })();
</script></div><div class="u-embed-js w-embed w-script"><script>
(function () {
  // ---------- Claude helper ----------
  function buildClaudeUrl(text) {
    const url = new URL('https://claude.ai/new');
    url.searchParams.set('q', text || '');
    return url.toString();
  }

  // ---------- Auto-grow helpers ----------
  function sizeTextarea(el) {
    // Ensure UA defaults don't force a starting height
    el.setAttribute('rows', el.getAttribute('data-min-rows') || '1');
    el.style.minHeight = '0px';
    el.style.height = 'auto'; // allow shrink
    el.style.height = el.scrollHeight + 'px'; // fit content
  }

  function initAutogrow(root = document) {
    root.querySelectorAll('textarea[data-autogrow]').forEach((el) => {
      if (el.dataset.autogrowInit) return;
      el.dataset.autogrowInit = 'true';

      // Respect your existing pattern for default text
      const preset = el.getAttribute('data-default-text');
      if (preset != null && !el.value) el.value = preset;

      // Initial sizing
      sizeTextarea(el);

      // Resize as you type
      el.addEventListener('input', () => sizeTextarea(el));

      // In case fonts/styles load late and change line-height
      window.addEventListener('load', () => sizeTextarea(el), { once: true });
    });
  }

  // ---------- Claude form initializer ----------
  function initClaudeForms(root = document) {
    root.querySelectorAll('form[data-claude-form]').forEach((form) => {
      if (form.dataset.claudeInit) return;
      form.dataset.claudeInit = 'true';

      const textarea = form.querySelector('[data-claude-textarea], textarea');
      const trigger  = form.querySelector('[data-claude-button], button[type="button"], a[data-claude-button]');

      if (!textarea || !trigger) {
        console.warn('Claude form: missing textarea or trigger in', form);
        return;
      }

      // If the trigger is a <button> but has no type, force "button" so it won't submit
      if (trigger.tagName === 'BUTTON' && !trigger.hasAttribute('type')) {
        trigger.type = 'button';
      }

      // Keep <a> from navigating away while still opening Claude
      if (trigger.tagName === 'A') {
        trigger.addEventListener('click', (e) => e.preventDefault());
      }

      // Optional: support data-default-text on the textarea
      const preset = textarea.getAttribute('data-default-text');
      if (preset != null && !textarea.value) textarea.value = preset;

      // Click opens Claude; submission is optional
      trigger.addEventListener('click', () => {
        const text = (textarea.value || '').trim();
        if (!text) {
          textarea.focus();
          return;
        }

        window.open(buildClaudeUrl(text), '_blank', 'noopener');

        const mode = form.getAttribute('data-claude-mode') || 'intercept';
        if (mode === 'also') {
          // Submit after opening Claude
          form.submit();
        }
        // intercept mode: do nothing (no submit)
      });

      // (Optional) Keep an <a data-claude-button> href in sync for right-click/open-in-new-tab UX
      if (trigger.tagName === 'A') {
        const syncHref = () => trigger.setAttribute('href', buildClaudeUrl((textarea.value || '').trim()));
        syncHref();
        textarea.addEventListener('input', syncHref);
        textarea.addEventListener('change', syncHref);
      }
    });
  }

  // ---------- Boot ----------
  function initAll(root = document) {
    initAutogrow(root);
    initClaudeForms(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll(), { once: true });
  } else {
    initAll();
  }

  // Re-init if content is injected later (Webflow CMS / IX / tabs)
  const mo = new MutationObserver((muts) => {
    for (const m of muts) {
      for (const node of m.addedNodes || []) {
        if (node.nodeType === 1) initAll(node);
      }
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
</script></div><div class="u-embed-css w-embed"><style>
  .prompt_menu_item {
    transition: border-color 0.2s ease, color 0.2s ease;
  }
  .prompt_menu_item_base, .prompt_menu_item_icon {
    transition: opacity 0.2s ease;
  }
  .prompt_menu_list .prompt_menu_item:first-child {
    border-color: transparent;
  }
  .prompt_menu_item:hover {
    border-color: transparent;
    color: var(--_theme---foreground-primary);
  }
  .prompt_menu_item:hover .prompt_menu_item_base {
    opacity: 1;
  }
  .prompt_menu_item:hover .prompt_menu_item_icon {
    opacity: 1;
  }
  .prompt_menu_item:hover + .prompt_menu_item {
    border-top-color: transparent;
  }

  .button_prompt_icon {
    transition: color 0.3s ease;
  }
  .button_prompt_wrap:hover .button_prompt_icon {
    color: var(--_button-style---icon-hover); 
  }
  .button_prompt_wrap:focus-within .button_prompt_icon {
    color: var(--_button-style---text-hover) !important;
  }
  .button_prompt_wrap:focus-within {
    color: var(--_button-style---text-hover) !important;
  }

</style></div><div data-prompt-trigger="1" class="button_prompt_wrap"><div class="button_prompt_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.72821 2.87934C10.0318 2.10869 10.9028 1.72933 11.6735 2.03266L14.4655 3.13226C15.236 3.43593 15.6145 4.30697 15.3112 5.07758L11.3903 15.0307C11.2954 15.2717 11.1394 15.4835 10.9391 15.6459L10.8513 15.7123L7.7077 17.8979C7.29581 18.1843 6.73463 17.9917 6.57294 17.5356L6.54657 17.4409L5.737 13.6987C5.67447 13.4092 5.69977 13.107 5.80829 12.8315L9.72821 2.87934ZM6.73798 13.1987C6.70201 13.2903 6.69385 13.3906 6.71454 13.4868L7.44501 16.8627L10.28 14.892L10.3376 14.8452C10.3909 14.7949 10.4325 14.7332 10.4597 14.6645L13.0974 7.96723L9.37567 6.50141L6.73798 13.1987ZM11.3073 2.96332C11.0504 2.86217 10.7601 2.98864 10.6589 3.24555L9.74188 5.57074L13.4636 7.03754L14.3806 4.71137C14.4817 4.45445 14.3552 4.16413 14.0983 4.06293L11.3073 2.96332Z" fill="currentColor"></path></svg></div></div><div aria-hidden="true" class="button_prompt_text u-text-style-caption">Write</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Write" target="" data-cta="" data-cta-position="Footer" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Button Text</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Button Text</span></button></div></div><div data-prompt-trigger="2" class="button_prompt_wrap"><div class="button_prompt_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M11.5859 2C11.9837 2.00004 12.3652 2.15818 12.6465 2.43945L15.5605 5.35352C15.8418 5.63478 16 6.01629 16 6.41406V16.5C16 17.3284 15.3284 18 14.5 18H5.5C4.72334 18 4.08461 17.4097 4.00781 16.6533L4 16.5V3.5C4 2.67157 4.67157 2 5.5 2H11.5859ZM5.5 3C5.22386 3 5 3.22386 5 3.5V16.5C5 16.7761 5.22386 17 5.5 17H14.5C14.7761 17 15 16.7761 15 16.5V7H12.5C11.6716 7 11 6.32843 11 5.5V3H5.5ZM12.54 13.3037C12.6486 13.05 12.9425 12.9317 13.1963 13.04C13.45 13.1486 13.5683 13.4425 13.46 13.6963C13.1651 14.3853 12.589 15 11.7998 15C11.3132 14.9999 10.908 14.7663 10.5996 14.4258C10.2913 14.7661 9.88667 14.9999 9.40039 15C8.91365 15 8.50769 14.7665 8.19922 14.4258C7.89083 14.7661 7.48636 15 7 15C6.72386 15 6.5 14.7761 6.5 14.5C6.5 14.2239 6.72386 14 7 14C7.21245 14 7.51918 13.8199 7.74023 13.3037L7.77441 13.2373C7.86451 13.0913 8.02513 13 8.2002 13C8.40022 13.0001 8.58145 13.1198 8.66016 13.3037C8.88121 13.8198 9.18796 14 9.40039 14C9.61284 13.9998 9.9197 13.8197 10.1406 13.3037L10.1748 13.2373C10.2649 13.0915 10.4248 13.0001 10.5996 13C10.7997 13 10.9808 13.1198 11.0596 13.3037C11.2806 13.8198 11.5874 13.9999 11.7998 14C12.0122 14 12.319 13.8198 12.54 13.3037ZM12.54 9.30371C12.6486 9.05001 12.9425 8.93174 13.1963 9.04004C13.45 9.14863 13.5683 9.44253 13.46 9.69629C13.1651 10.3853 12.589 11 11.7998 11C11.3132 10.9999 10.908 10.7663 10.5996 10.4258C10.2913 10.7661 9.88667 10.9999 9.40039 11C8.91365 11 8.50769 10.7665 8.19922 10.4258C7.89083 10.7661 7.48636 11 7 11C6.72386 11 6.5 10.7761 6.5 10.5C6.5 10.2239 6.72386 10 7 10C7.21245 10 7.51918 9.8199 7.74023 9.30371L7.77441 9.2373C7.86451 9.09126 8.02513 9 8.2002 9C8.40022 9.00008 8.58145 9.11981 8.66016 9.30371C8.88121 9.8198 9.18796 10 9.40039 10C9.61284 9.99978 9.9197 9.81969 10.1406 9.30371L10.1748 9.2373C10.2649 9.09147 10.4248 9.00014 10.5996 9C10.7997 9 10.9808 9.11975 11.0596 9.30371C11.2806 9.8198 11.5874 9.99989 11.7998 10C12.0122 10 12.319 9.81985 12.54 9.30371ZM12 5.5C12 5.77614 12.2239 6 12.5 6H14.793L12 3.20703V5.5Z" fill="currentColor"></path></svg></div></div><div aria-hidden="true" class="button_prompt_text u-text-style-caption">Learn</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Learn" target="" data-cta="" data-cta-position="Footer" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Button Text</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Button Text</span></button></div></div><div data-prompt-trigger="3" class="button_prompt_wrap"><div class="button_prompt_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M11.6318 4.01757C11.898 4.09032 12.055 4.36555 11.9824 4.63183L8.98242 15.6318C8.90966 15.8981 8.63449 16.0551 8.36816 15.9824C8.10193 15.9097 7.94495 15.6345 8.01758 15.3682L11.0176 4.36816C11.0904 4.102 11.3656 3.94497 11.6318 4.01757ZM13.124 6.17089C13.3059 5.96325 13.6213 5.9423 13.8291 6.12402L17.8291 9.62402L17.9014 9.70215C17.9647 9.78754 18 9.89182 18 10C18 10.1441 17.9375 10.281 17.8291 10.376L13.8291 13.876L13.7471 13.9346C13.5449 14.0498 13.2833 14.011 13.124 13.8291C12.9649 13.6472 12.9606 13.3824 13.1016 13.1973L13.1709 13.124L16.7412 10L13.1709 6.87597C12.9632 6.69411 12.9422 6.37866 13.124 6.17089ZM6.25293 6.06542C6.45509 5.95025 6.71675 5.98908 6.87598 6.17089C7.03513 6.35279 7.03933 6.6176 6.89844 6.80273L6.8291 6.87597L3.25879 10L6.8291 13.124C7.03682 13.3059 7.05771 13.6213 6.87598 13.8291C6.69413 14.0369 6.37869 14.0578 6.1709 13.876L2.1709 10.376L2.09863 10.2979C2.03528 10.2124 2 10.1082 2 10C2.00005 9.85591 2.06247 9.71893 2.1709 9.62402L6.1709 6.12402L6.25293 6.06542Z" fill="currentColor"></path></svg></div></div><div aria-hidden="true" class="button_prompt_text u-text-style-caption">Code</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Code" target="" data-cta="" data-cta-position="Footer" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Button Text</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Button Text</span></button></div></div><div data-prompt-menu="1" class="prompt_menu_wrap"><div class="prompt_menu_header"><div class="prompt_menu_label_wrap"><div class="prompt_menu_label_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M9.72821 2.87934C10.0318 2.10869 10.9028 1.72933 11.6735 2.03266L14.4655 3.13226C15.236 3.43593 15.6145 4.30697 15.3112 5.07758L11.3903 15.0307C11.2954 15.2717 11.1394 15.4835 10.9391 15.6459L10.8513 15.7123L7.7077 17.8979C7.29581 18.1843 6.73463 17.9917 6.57294 17.5356L6.54657 17.4409L5.737 13.6987C5.67447 13.4092 5.69977 13.107 5.80829 12.8315L9.72821 2.87934ZM6.73798 13.1987C6.70201 13.2903 6.69385 13.3906 6.71454 13.4868L7.44501 16.8627L10.28 14.892L10.3376 14.8452C10.3909 14.7949 10.4325 14.7332 10.4597 14.6645L13.0974 7.96723L9.37567 6.50141L6.73798 13.1987ZM11.3073 2.96332C11.0504 2.86217 10.7601 2.98864 10.6589 3.24555L9.74188 5.57074L13.4636 7.03754L14.3806 4.71137C14.4817 4.45445 14.3552 4.16413 14.0983 4.06293L11.3073 2.96332Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_label_text u-text-style-caption">Write</div></div><button aria-label="Close menu" data-prompt-menu-close="" class="prompt_menu_close_wrap"><span class="prompt_menu_close_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M15.1465 4.14642C15.3418 3.95121 15.6583 3.95118 15.8536 4.14642C16.0487 4.34168 16.0488 4.65822 15.8536 4.85346L10.7071 9.99997L15.8536 15.1465C16.0487 15.3417 16.0488 15.6583 15.8536 15.8535C15.6828 16.0244 15.4187 16.0461 15.2247 15.918L15.1465 15.8535L10 10.707L4.85352 15.8535C4.65827 16.0486 4.34168 16.0486 4.14648 15.8535C3.95129 15.6583 3.95142 15.3418 4.14648 15.1465L9.293 9.99997L4.14648 4.85346C3.95142 4.65818 3.95129 4.34162 4.14648 4.14642C4.34168 3.95128 4.65825 3.95138 4.85352 4.14642L10 9.29294L15.1465 4.14642Z" fill="currentColor"></path></svg></div></span></button></div><ul role="list" class="prompt_menu_list"><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Help me develop a unique voice for an audience</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">Hi Claude! Could you help me develop a unique voice for an audience? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational. <br/><br/>Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!</p></li><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Improve my writing style</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">Hi Claude! Could you improve my writing style? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational. <br/><br/>Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!</p></li><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Brainstorm creative ideas</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">Hi Claude! Could you brainstorm creative ideas? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational. <br/><br/>Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!</p></li></ul></div><div data-prompt-menu="2" class="prompt_menu_wrap"><div class="prompt_menu_header"><div class="prompt_menu_label_wrap"><div class="prompt_menu_label_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M11.5859 2C11.9837 2.00004 12.3652 2.15818 12.6465 2.43945L15.5605 5.35352C15.8418 5.63478 16 6.01629 16 6.41406V16.5C16 17.3284 15.3284 18 14.5 18H5.5C4.72334 18 4.08461 17.4097 4.00781 16.6533L4 16.5V3.5C4 2.67157 4.67157 2 5.5 2H11.5859ZM5.5 3C5.22386 3 5 3.22386 5 3.5V16.5C5 16.7761 5.22386 17 5.5 17H14.5C14.7761 17 15 16.7761 15 16.5V7H12.5C11.6716 7 11 6.32843 11 5.5V3H5.5ZM12.54 13.3037C12.6486 13.05 12.9425 12.9317 13.1963 13.04C13.45 13.1486 13.5683 13.4425 13.46 13.6963C13.1651 14.3853 12.589 15 11.7998 15C11.3132 14.9999 10.908 14.7663 10.5996 14.4258C10.2913 14.7661 9.88667 14.9999 9.40039 15C8.91365 15 8.50769 14.7665 8.19922 14.4258C7.89083 14.7661 7.48636 15 7 15C6.72386 15 6.5 14.7761 6.5 14.5C6.5 14.2239 6.72386 14 7 14C7.21245 14 7.51918 13.8199 7.74023 13.3037L7.77441 13.2373C7.86451 13.0913 8.02513 13 8.2002 13C8.40022 13.0001 8.58145 13.1198 8.66016 13.3037C8.88121 13.8198 9.18796 14 9.40039 14C9.61284 13.9998 9.9197 13.8197 10.1406 13.3037L10.1748 13.2373C10.2649 13.0915 10.4248 13.0001 10.5996 13C10.7997 13 10.9808 13.1198 11.0596 13.3037C11.2806 13.8198 11.5874 13.9999 11.7998 14C12.0122 14 12.319 13.8198 12.54 13.3037ZM12.54 9.30371C12.6486 9.05001 12.9425 8.93174 13.1963 9.04004C13.45 9.14863 13.5683 9.44253 13.46 9.69629C13.1651 10.3853 12.589 11 11.7998 11C11.3132 10.9999 10.908 10.7663 10.5996 10.4258C10.2913 10.7661 9.88667 10.9999 9.40039 11C8.91365 11 8.50769 10.7665 8.19922 10.4258C7.89083 10.7661 7.48636 11 7 11C6.72386 11 6.5 10.7761 6.5 10.5C6.5 10.2239 6.72386 10 7 10C7.21245 10 7.51918 9.8199 7.74023 9.30371L7.77441 9.2373C7.86451 9.09126 8.02513 9 8.2002 9C8.40022 9.00008 8.58145 9.11981 8.66016 9.30371C8.88121 9.8198 9.18796 10 9.40039 10C9.61284 9.99978 9.9197 9.81969 10.1406 9.30371L10.1748 9.2373C10.2649 9.09147 10.4248 9.00014 10.5996 9C10.7997 9 10.9808 9.11975 11.0596 9.30371C11.2806 9.8198 11.5874 9.99989 11.7998 10C12.0122 10 12.319 9.81985 12.54 9.30371ZM12 5.5C12 5.77614 12.2239 6 12.5 6H14.793L12 3.20703V5.5Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_label_text u-text-style-caption">Learn</div></div><button aria-label="Close menu" data-prompt-menu-close="" class="prompt_menu_close_wrap"><span class="prompt_menu_close_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M15.1465 4.14642C15.3418 3.95121 15.6583 3.95118 15.8536 4.14642C16.0487 4.34168 16.0488 4.65822 15.8536 4.85346L10.7071 9.99997L15.8536 15.1465C16.0487 15.3417 16.0488 15.6583 15.8536 15.8535C15.6828 16.0244 15.4187 16.0461 15.2247 15.918L15.1465 15.8535L10 10.707L4.85352 15.8535C4.65827 16.0486 4.34168 16.0486 4.14648 15.8535C3.95129 15.6583 3.95142 15.3418 4.14648 15.1465L9.293 9.99997L4.14648 4.85346C3.95142 4.65818 3.95129 4.34162 4.14648 4.14642C4.34168 3.95128 4.65825 3.95138 4.85352 4.14642L10 9.29294L15.1465 4.14642Z" fill="currentColor"></path></svg></div></span></button></div><ul role="list" class="prompt_menu_list"><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Explain a complex topic simply</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">Hi Claude! Could you explain a complex topic simply? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational. <br/><br/>Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!</p></li><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Help me make sense of these ideas</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">Hi Claude! Could you help me make sense of these ideas? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational. <br/><br/>Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!</p></li><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Prepare for an exam or interview</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">Hi Claude! Could you prepare for an exam or interview? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational. <br/><br/>Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!</p></li></ul></div><div data-prompt-menu="3" class="prompt_menu_wrap"><div class="prompt_menu_header"><div class="prompt_menu_label_wrap"><div class="prompt_menu_label_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M11.6318 4.01757C11.898 4.09032 12.055 4.36555 11.9824 4.63183L8.98242 15.6318C8.90966 15.8981 8.63449 16.0551 8.36816 15.9824C8.10193 15.9097 7.94495 15.6345 8.01758 15.3682L11.0176 4.36816C11.0904 4.102 11.3656 3.94497 11.6318 4.01757ZM13.124 6.17089C13.3059 5.96325 13.6213 5.9423 13.8291 6.12402L17.8291 9.62402L17.9014 9.70215C17.9647 9.78754 18 9.89182 18 10C18 10.1441 17.9375 10.281 17.8291 10.376L13.8291 13.876L13.7471 13.9346C13.5449 14.0498 13.2833 14.011 13.124 13.8291C12.9649 13.6472 12.9606 13.3824 13.1016 13.1973L13.1709 13.124L16.7412 10L13.1709 6.87597C12.9632 6.69411 12.9422 6.37866 13.124 6.17089ZM6.25293 6.06542C6.45509 5.95025 6.71675 5.98908 6.87598 6.17089C7.03513 6.35279 7.03933 6.6176 6.89844 6.80273L6.8291 6.87597L3.25879 10L6.8291 13.124C7.03682 13.3059 7.05771 13.6213 6.87598 13.8291C6.69413 14.0369 6.37869 14.0578 6.1709 13.876L2.1709 10.376L2.09863 10.2979C2.03528 10.2124 2 10.1082 2 10C2.00005 9.85591 2.06247 9.71893 2.1709 9.62402L6.1709 6.12402L6.25293 6.06542Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_label_text u-text-style-caption">Code</div></div><button aria-label="Close menu" data-prompt-menu-close="" class="prompt_menu_close_wrap"><span class="prompt_menu_close_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M15.1465 4.14642C15.3418 3.95121 15.6583 3.95118 15.8536 4.14642C16.0487 4.34168 16.0488 4.65822 15.8536 4.85346L10.7071 9.99997L15.8536 15.1465C16.0487 15.3417 16.0488 15.6583 15.8536 15.8535C15.6828 16.0244 15.4187 16.0461 15.2247 15.918L15.1465 15.8535L10 10.707L4.85352 15.8535C4.65827 16.0486 4.34168 16.0486 4.14648 15.8535C3.95129 15.6583 3.95142 15.3418 4.14648 15.1465L9.293 9.99997L4.14648 4.85346C3.95142 4.65818 3.95129 4.34162 4.14648 4.14642C4.34168 3.95128 4.65825 3.95138 4.85352 4.14642L10 9.29294L15.1465 4.14642Z" fill="currentColor"></path></svg></div></span></button></div><ul role="list" class="prompt_menu_list"><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Explain a programming concept</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">Hi Claude! Could you explain a programming concept? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational. <br/><br/>Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!</p></li><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Look over my code and give me tips</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">Hi Claude! Could you look over my code and give me tips? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational. <br/><br/>Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!</p></li><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Vibe code with me</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">Hi Claude! Could you vibe code with me? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational. <br/><br/>Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!</p></li></ul></div><div data-prompt-menu="4" class="prompt_menu_wrap"><div class="prompt_menu_header"><div class="prompt_menu_label_wrap"><div class="prompt_menu_label_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M4.5 8.5C5.32843 8.5 6 9.17157 6 10C6 10.8284 5.32843 11.5 4.5 11.5C3.67157 11.5 3 10.8284 3 10C3 9.17157 3.67157 8.5 4.5 8.5ZM10 8.5C10.8284 8.5 11.5 9.17157 11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5ZM15.5 8.5C16.3284 8.5 17 9.17157 17 10C17 10.8284 16.3284 11.5 15.5 11.5C14.6716 11.5 14 10.8284 14 10C14 9.17157 14.6716 8.5 15.5 8.5Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_label_text u-text-style-caption">More</div></div><button aria-label="Close menu" data-prompt-menu-close="" class="prompt_menu_close_wrap"><span class="prompt_menu_close_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M15.1465 4.14642C15.3418 3.95121 15.6583 3.95118 15.8536 4.14642C16.0487 4.34168 16.0488 4.65822 15.8536 4.85346L10.7071 9.99997L15.8536 15.1465C16.0487 15.3417 16.0488 15.6583 15.8536 15.8535C15.6828 16.0244 15.4187 16.0461 15.2247 15.918L15.1465 15.8535L10 10.707L4.85352 15.8535C4.65827 16.0486 4.34168 16.0486 4.14648 15.8535C3.95129 15.6583 3.95142 15.3418 4.14648 15.1465L9.293 9.99997L4.14648 4.85346C3.95142 4.65818 3.95129 4.34162 4.14648 4.14642C4.34168 3.95128 4.65825 3.95138 4.85352 4.14642L10 9.29294L15.1465 4.14642Z" fill="currentColor"></path></svg></div></span></button></div><ul role="list" class="prompt_menu_list"><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Write case studies</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">This is another test</p></li><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Write grant proposals</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">Hi Claude! Could you write grant proposals? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to — like Google Drive, web search, etc. — if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational. <br/><br/>Please execute the task as soon as you can - an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!</p></li><li data-prompt-item="" class="prompt_menu_item"><div class="prompt_menu_item_text u-text-style-body-3">Write video scripts</div><div class="prompt_menu_item_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.12771 5.16489C7.28926 4.98544 7.55225 4.95072 7.75273 5.0682L7.83477 5.12778L12.835 9.62788C12.9402 9.72264 12.9999 9.85833 13 9.99995C13 10.1063 12.9667 10.2093 12.9053 10.2939L12.835 10.372L7.83477 14.8721C7.62952 15.0567 7.31242 15.0402 7.12771 14.835C6.94336 14.6298 6.95983 14.3126 7.16482 14.128L11.7519 9.99995L7.16482 5.87193L7.09744 5.79674C6.95939 5.60969 6.96617 5.34444 7.12771 5.16489Z" fill="currentColor"></path></svg></div></div><div class="prompt_menu_item_base u-cover-absolute"></div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="#" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only"></span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only"></span></button></div><p data-prompt-menu-text="" class="prompt_menu_text u-display-none">this is a test</p></li></ul></div></div></div></div></div><div class="footer_content_bottom"><div class="footer_anthropic_link"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 133 12" fill="none" class="u-svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.194981V11.7972H6.0205C8.73304 11.7972 10.1389 10.5044 10.1389 8.4657C10.1389 7.07343 9.36155 6.06239 8.00529 5.68117C9.09692 5.36625 9.84121 4.38835 9.84121 3.29443C9.84121 1.37178 8.56764 0.194981 6.15282 0.194981H0ZM2.48098 6.85796H5.62355C6.9302 6.85796 7.55871 7.32205 7.55871 8.28338C7.55871 9.24471 6.9302 9.70881 5.62355 9.70881H2.48098V6.85796ZM2.48098 2.2668H5.77241C6.7648 2.2668 7.27753 2.69775 7.27753 3.52647C7.27753 4.3552 6.7648 4.78614 5.78895 4.78614H2.48098V2.2668Z" fill="currentColor"></path><path d="M18.1608 11.7972V7.18946L22.6265 0.194981H19.7982L16.8706 4.80272L13.8604 0.194981H10.9825L15.5971 7.13973V11.7972H18.1608Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M89.9633 6.01267C89.9633 2.48228 92.3285 -0.00390625 95.6696 -0.00390625C98.9941 -0.00390625 101.343 2.48228 101.343 6.01267C101.343 9.50991 98.9941 11.9961 95.6696 11.9961C92.3285 11.9961 89.9633 9.50991 89.9633 6.01267ZM98.7791 6.01267C98.7791 3.7088 97.6047 2.31654 95.6696 2.31654C93.7179 2.31654 92.527 3.7088 92.527 6.01267C92.527 8.28339 93.7179 9.67565 95.6696 9.67565C97.6047 9.67565 98.7791 8.28339 98.7791 6.01267Z" fill="currentColor"></path><path d="M50.4662 11.7972H47.6544L42.4443 3.67565V11.7972H40.0461V0.194987H42.8578L48.0679 8.31654V0.194987H50.4662V11.7972Z" fill="currentColor"></path><path d="M52.451 0.194987H62.7057V2.43256H58.8188V11.7972H56.3378V2.43256H52.451V0.194987Z" fill="currentColor"></path><path d="M67.1714 7.05687H72.6296V11.7972H75.1105V0.194987H72.6296V4.8193H67.1714V0.194987H64.6904V11.7972H67.1714V7.05687Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M109.315 0.194987H103.658V11.7972H106.139V7.58725H109.315C111.945 7.58725 113.549 6.19499 113.549 3.89112C113.549 1.58725 111.945 0.194987 109.315 0.194987ZM106.139 5.34968V2.43256H109.199C110.423 2.43256 111.068 2.9298 111.068 3.89112C111.068 4.85245 110.423 5.34968 109.199 5.34968H106.139Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M78.1704 0.194987H83.827C86.4569 0.194987 88.0612 1.53753 88.0612 3.72538C88.0612 5.26681 87.2673 6.37731 85.8945 6.9077L85.8922 6.9086L88.6401 11.7972H85.8945L83.4134 7.25576H80.6514V11.7972H78.1704V0.194987ZM80.6514 2.43256V5.01819H83.7113C84.9352 5.01819 85.5803 4.57068 85.5803 3.72538C85.5803 2.88007 84.9352 2.43256 83.7113 2.43256H80.6514Z" fill="currentColor"></path><path d="M133 7.90217H130.354C129.924 9.02924 129.064 9.67565 127.889 9.67565C125.937 9.67565 124.747 8.28339 124.747 6.01267C124.747 3.7088 125.937 2.31654 127.889 2.31654C129.064 2.31654 129.924 2.96294 130.354 4.09002H132.983C132.338 1.60383 130.403 -0.00390625 127.889 -0.00390625C124.548 -0.00390625 122.183 2.48228 122.183 6.01267C122.183 9.50991 124.548 11.9961 127.889 11.9961C130.42 11.9961 132.355 10.3718 133 7.90217Z" fill="currentColor"></path><path d="M117.072 0.194987H114.542L119.156 11.7972H121.687L117.072 0.194987Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M35.6465 11.7972L34.7028 9.36073H29.875L28.9313 11.7972H26.3511L30.9657 0.194987H33.6121L38.2267 11.7972H35.6465ZM32.2889 3.12869L33.8682 7.20604H30.7096L32.2889 3.12869Z" fill="currentColor"></path></svg><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Anthropic</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Anthropic</span></button></div></div><div class="footer_copyright u-text-style-micro">© <span data-current-year="">[year]</span> <span data-copyright-text="">Anthropic PBC</span></div></div></div><div class="footer_links_wrap u-column-custom"><div class="footer_links_layout u-grid-custom"><div class="footer_links_col"><div class="footer_links_list_wrap"><div class="footer_links_heading u-text-style-caption">Products</div><ul role="list" class="footer_links_list"><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/product/overview" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude Code</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/product/claude-code" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude Code</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude Code</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude Code for Enterprise</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/product/claude-code/enterprise" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude Code for Enterprise</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude Code for Enterprise</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude Cowork</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/product/cowork" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude Cowork</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude Cowork</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">@Claude</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/product/tag" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">@Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">@Claude</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude Design</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/product/design" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude Design</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude Design</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude Science</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/product/claude-science" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude Science</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude Science</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude Security</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/product/claude-security" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude Security</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude Security</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Download app</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/download" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Download app</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Download app</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Pricing</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/pricing" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Pricing</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Pricing</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Log in</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="https://claude.ai/login" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Log in</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Log in</span></button></div></li></ul></div><div class="footer_links_list_wrap"><div class="footer_links_heading u-text-style-caption">Features</div><ul role="list" class="footer_links_list"><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude for Chrome</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/claude-for-chrome" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude for Chrome</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude for Chrome</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude for Microsoft 365</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/claude-for-microsoft-365" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude for Microsoft 365</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude for Microsoft 365</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Skills</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/skills" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Skills</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Skills</span></button></div></li></ul></div><div class="footer_links_list_wrap"><div class="footer_links_heading u-text-style-caption">Models</div><ul role="list" class="footer_links_list"><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Mythos</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/claude/mythos" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Mythos</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Mythos</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Fable</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/claude/fable" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Fable</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Fable</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Opus</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/claude/opus" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Opus</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Opus</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Sonnet</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/claude/sonnet" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Sonnet</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Sonnet</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Haiku</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/claude/haiku" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Haiku</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Haiku</span></button></div></li></ul></div></div><div class="footer_links_col"><div class="footer_links_list_wrap"><div class="footer_links_heading u-text-style-caption">Solutions</div><ul role="list" class="footer_links_list"><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">AI agents</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/agents" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">AI agents</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">AI agents</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Code modernization</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/code-modernization" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Code modernization</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Code modernization</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Coding</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/coding" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Coding</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Coding</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Customer support</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/customer-support" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Customer support</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Customer support</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Cybersecurity</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/cybersecurity" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Cybersecurity</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Cybersecurity</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Enterprise</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/enterprise" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Enterprise</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Enterprise</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Financial services</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/financial-services" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Financial services</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Financial services</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Government</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/government" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Government</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Government</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Healthcare</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/healthcare" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Healthcare</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Healthcare</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Higher education</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/education" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Higher education</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Higher education</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">K-12 teachers</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/teachers" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">K-12 teachers</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">K-12 teachers</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Legal</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/legal" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Legal</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Legal</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Life sciences</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/life-sciences" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Life sciences</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Life sciences</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Nonprofits</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/nonprofits" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Nonprofits</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Nonprofits</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Small business</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/solutions/small-business" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Small business</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Small business</span></button></div></li></ul></div><div class="footer_links_list_wrap"><div class="footer_links_heading u-text-style-caption">Claude Platform</div><ul role="list" class="footer_links_list"><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Overview</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/platform/api" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Overview</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Overview</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Developer docs</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="https://platform.claude.com/docs" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Developer docs</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Developer docs</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Pricing</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="https://claude.com/pricing#api" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Pricing</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Pricing</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Ecosystem</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/ecosystem" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Ecosystem</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Ecosystem</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Marketplace</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/platform/marketplace" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Marketplace</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Marketplace</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude on AWS</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/partners/claude-on-aws" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude on AWS</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude on AWS</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Google Cloud</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/partners/google-cloud" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Google Cloud</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Google Cloud</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Microsoft Foundry</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/partners/microsoft-foundry" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Microsoft Foundry</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Microsoft Foundry</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Regional compliance</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/regional-compliance" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Regional compliance</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Regional compliance</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Console login</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://platform.claude.com/" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Console login</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Console login</span></button></div></li></ul></div></div><div class="footer_links_col"><div class="footer_links_list_wrap"><div class="footer_links_heading u-text-style-caption">Resources</div><ul role="list" class="footer_links_list"><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Blog</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/blog" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Blog</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Blog</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Claude partner network</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/partners" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Claude partner network</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Claude partner network</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Community</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/community" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Community</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Community</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Connectors</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/connectors" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Connectors</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Connectors</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Courses</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/learn" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Courses</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Courses</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Customer stories</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/customers" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Customer stories</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Customer stories</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Engineering at Anthropic</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/engineering" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Engineering at Anthropic</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Engineering at Anthropic</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Events</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/events" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Events</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Events</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Plugins</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/plugins" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Plugins</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Plugins</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Powered by Claude</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/partners/powered-by-claude" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Powered by Claude</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Powered by Claude</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Service partners</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/partners/services" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Service partners</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Service partners</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Tutorials</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/resources/tutorials" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Tutorials</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Tutorials</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Use cases</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="" data-cta="" data-cta-position="" href="/resources/use-cases" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Use cases</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Use cases</span></button></div></li></ul></div><div class="footer_links_list_wrap"><div class="footer_links_heading u-text-style-caption">Company</div><ul role="list" class="footer_links_list"><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Anthropic</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Anthropic</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Anthropic</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Careers</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/careers" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Careers</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Careers</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Policy</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/policy" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Policy</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Policy</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Economic Futures</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/economic-futures" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Economic Futures</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Economic Futures</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Research</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/research" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Research</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Research</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">News</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/news" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">News</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">News</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Policy on the AI Exponential</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/policy-on-the-ai-exponential" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Policy on the AI Exponential</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Policy on the AI Exponential</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Responsible Scaling Policy</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/news/announcing-our-updated-responsible-scaling-policy" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Responsible Scaling Policy</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Responsible Scaling Policy</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Security and compliance</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://trust.anthropic.com/" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Security and compliance</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Security and compliance</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Transparency</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://anthropic.com/transparency" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Transparency</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Transparency</span></button></div></li></ul></div></div><div class="footer_links_col"><div class="footer_links_list_wrap"><div class="footer_links_heading u-text-style-caption">Programs</div><ul role="list" class="footer_links_list"><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Startups</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://claude.com/programs/startups" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Startups</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Startups</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Research Labs</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://claude.com/programs/claude-team-plan-for-research-labs" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Research Labs</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Research Labs</span></button></div></li></ul></div><div class="footer_links_list_wrap"><div class="footer_links_heading u-text-style-caption">Help and security</div><ul role="list" class="footer_links_list"><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Availability</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/supported-countries" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Availability</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Availability</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Status</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://status.anthropic.com/" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Status</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Status</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Support center</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://support.claude.com/en/" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Support center</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Support center</span></button></div></li></ul></div><div class="footer_links_list_wrap"><div class="footer_links_heading u-text-style-caption">Terms and policies</div><ul role="list" class="footer_links_list"><li class="footer_link u-flex-horizontal-nowrap"><button id="privacy-choices-btn"><div id="privacy-choices-btn" aria-hidden="true" class="footer_link_text u-text-style-caption">Privacy choices</div></button><div><div class="privacy_choices_dialog w-embed"><style>
  /* Dialog styling */
  dialog#consent-container {
    margin: 0;
    padding: 8px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }

  dialog#consent-container.show {
    opacity: 1;
    transform: translateY(0);
  }

  dialog#consent-container::backdrop {
    background: transparent;
  }

  dialog button span {
    display: inline !important;
  }

  /* Toggle switch styling */
  .toggle_switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 24px;
  }

  .toggle_switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle_slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #87867f;
    transition: .4s;
    border-radius: 24px;
  }

  .toggle_slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .toggle_slider {
    background-color: #d97757;
  }

  input:checked + .toggle_slider:before {
    transform: translateX(12px);
  }

  input:disabled + .toggle_slider {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media only screen and (max-width: 501px) {
    dialog#consent-container {
      left: 8px !important;
      bottom: 8px !important;
      right: 8px !important;
    }
    #consent-banner {
      padding: 24px 16px 16px !important;
    }
    #simple-options {
      grid-template-columns: repeat(3, 1fr) !important;
      grid-template-rows: auto auto !important;
    }
    #customize-btn {
      grid-column: span 1 !important;
    }
    dialog button span {
    	display: none !important;
    }
</style></div><div class="privacy_choices_dialog w-embed"><dialog id="consent-container" style="position: fixed; bottom: 24px; right: 24px; left: auto; max-width: 456px; padding: 0; background: transparent; z-index: 101; line-height: 1.25;">
  <div id="consent-banner" class="u-flex-vertical-nowrap u-gap-1" style="background-color: #141413; border-radius: 24px; padding: 32px;">
    <h3 class="u-text-style-h5" style="color: #fff;">Cookie settings</h3>
    <p class="u-text-style-body-3" id="consent-description" style="color: #e8e6dc; font-size: 0.875rem; line-height: 1.25rem;">
      We use cookies to deliver and improve our services, analyze site usage, and if you agree, to customize or personalize your experience and market our services to you. You can read our Cookie Policy <a href="https://www.anthropic.com/legal/cookies" style="color: #a1a0a0; text-decoration: underline;">here</a>.
    </p>

    <div id="simple-options" style="display: grid; gap: 8px; grid-template-columns: 1fr 1fr; text-align: center; width: 100%;">
      <button id="customize-btn" style="grid-column: span 2; background: transparent; border: 1px solid #87867f; border-radius: 8px; color: #fff; padding: 8px 16px; cursor: pointer; font-weight: 500; font-size: 1rem;">
        Customize<span> cookie settings</span>
      </button>
      <button id="reject-btn" style="background: transparent; border: 1px solid #87867f; border-radius: 8px; color: #fff; padding: 8px 16px; cursor: pointer; font-weight: 500; font-size: 1rem;">
        Reject<span> all cookies</span>
      </button>
      <button id="accept-btn" style="background: #fff; border: none; border-radius: 8px; color: #141413; padding: 8px 16px; cursor: pointer; font-weight: 500; font-size: 1rem;">
        Accept<span> all cookies</span>
      </button>
    </div>

    <div id="detailed-options" style="display: none; width: 100%;">
      <form id="consent-form">
        <!-- Necessary option (always enabled) -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #3d3d3a; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
          <div>
            <h6 style="color: #f0eee6; font-size: 0.75rem; margin-bottom: 8px; font-weight:500;">Necessary</h6>
            <p style="color: #b0aea5; font-size: 0.75rem; margin: 0;">Enables security and basic functionality.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: #f0eee6; font-size: 0.75rem;">Required</span>
            <label class="toggle_switch">
              <input type="checkbox" checked disabled>
              <span class="toggle_slider"></span>
            </label>
          </div>
        </div>

        <!-- Analytics option -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #3d3d3a; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
          <div>
            <h6 style="color: #f0eee6; font-size: 0.75rem; margin-bottom: 8px; font-weight:500;">Analytics</h6>
            <p style="color: #b0aea5; font-size: 0.75rem; margin: 0;">Enables tracking of site performance.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span id="analytics-status" style="color: #f0eee6; font-size: 0.75rem;">Off</span>
            <label class="toggle_switch">
              <input type="checkbox" id="analytics-consent">
              <span class="toggle_slider"></span>
            </label>
          </div>
        </div>

        <!-- Marketing option -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #3d3d3a; border-radius: 8px; padding: 12px; margin-bottom: 32px;">
          <div>
            <h6 style="color: #f0eee6; font-size: 0.75rem; margin-bottom: 8px; font-weight:500;">Marketing</h6>
            <p style="color: #b0aea5; font-size: 0.75rem; margin: 0;">Enables ads personalization and tracking.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span id="marketing-status" style="color: #f0eee6; font-size: 0.75rem;">Off</span>
            <label class="toggle_switch">
              <input type="checkbox" id="marketing-consent">
              <span class="toggle_slider"></span>
            </label>
          </div>
        </div>
      </form>

      <button id="save-preferences-btn" class="button_main_wrap" style="text-align: center; width: 100%; background: #fff; border: none; border-radius: 8px; color: #141413; padding: 8px 16px; cursor: pointer; font-weight: 500; font-size: 1rem;">
        Save preferences
      </button>
    </div>
  </div>
</dialog></div></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Privacy policy</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/legal/privacy" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Privacy policy</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Privacy policy</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Responsible disclosure policy</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/responsible-disclosure-policy" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Responsible disclosure policy</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Responsible disclosure policy</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Terms of service: Commercial</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/legal/commercial-terms" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Terms of service: Commercial</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Terms of service: Commercial</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Terms of service: Consumer</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/legal/consumer-terms" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Terms of service: Consumer</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Terms of service: Consumer</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Terms of Service: US K-12</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://anthropic.com/legal/k12-terms" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Terms of Service: US K-12</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Terms of Service: US K-12</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Data Processing Agreement: US K-12</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://anthropic.com/legal/k12-dpa" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Data Processing Agreement: US K-12</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Data Processing Agreement: US K-12</span></button></div></li><li class="footer_link"><div aria-hidden="true" class="footer_link_text u-text-style-caption">Usage policy</div><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="" target="_blank" data-cta="" data-cta-position="" href="https://www.anthropic.com/legal/aup" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Usage policy</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Usage policy</span></button></div></li></ul></div></div></div></div></div><div class="footer_footer"><div class="footer_social_icon_wrap"><div class="footer_social_icon"><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="X.com" target="_blank" data-cta="" data-cta-position="Footer" href="https://x.com/claudeai" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">x.com</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">x.com</span></button></div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 17 17" fill="none" class="u-svg"><g clip-path="url(#clip0_10449_2796)"><path d="M10.058 7.1894L15.9061 0.417969H14.5203L9.44241 6.29751L5.38673 0.417969H0.708984L6.84197 9.30887L0.708984 16.4098H2.09487L7.45723 10.2008L11.7403 16.4098H16.4181L10.0577 7.1894H10.058ZM8.15987 9.3872L7.53847 8.50187L2.59422 1.45718H4.72285L8.71292 7.14247L9.33432 8.0278L14.5209 15.4178H12.3923L8.15987 9.38754V9.3872Z" fill="currentColor"></path></g><defs><clippath id="clip0_10449_2796"><rect width="15.7091" height="16" fill="currentColor" transform="translate(0.708984 0.417969)"></rect></clippath></defs></svg></div><div class="footer_social_icon"><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Linkedin" target="_blank" data-cta="" data-cta-position="Footer" href="https://www.linkedin.com/showcase/claude/" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">LinkedIn</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">LinkedIn</span></button></div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 17 17" fill="none" class="u-svg"><path d="M14.3818 0.5625C15.3456 0.562625 16.1268 1.34386 16.127 2.30762V14.5264C16.1268 15.4902 15.3456 16.2714 14.3818 16.2715H2.16309C1.19933 16.2713 0.418093 15.4901 0.417969 14.5264V2.30762C0.418151 1.3439 1.19937 0.562682 2.16309 0.5625H14.3818ZM2.8252 14.0898H5.16797V6.52539H2.8252V14.0898ZM11.1924 6.29492C9.58733 6.29492 8.91211 7.54492 8.91211 7.54492V6.52539H6.66504V14.0898H8.91211V10.1191C8.91211 9.05529 9.40154 8.42188 10.3389 8.42188C11.2005 8.42189 11.6143 9.03057 11.6143 10.1191V14.0898H13.9453V9.30078C13.9453 7.2746 12.7967 6.29494 11.1924 6.29492ZM3.98535 2.74414C3.22012 2.74414 2.59961 3.36889 2.59961 4.13965C2.59963 4.91039 3.22014 5.53516 3.98535 5.53516C4.75044 5.53501 5.3701 4.9103 5.37012 4.13965C5.37012 3.36898 4.75046 2.74429 3.98535 2.74414Z" fill="currentColor"></path></svg></div><div class="footer_social_icon"><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="YouTube" target="_blank" data-cta="" data-cta-position="Footer" href="https://www.youtube.com/@anthropic-ai" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">YouTube</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">YouTube</span></button></div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 17" fill="none" class="u-svg"><g clip-path="url(#clip0_13050_28878)"><path d="M6.248 10.855V6.18441L10.354 8.51999L6.248 10.855ZM15.3808 4.71414C15.1954 4.03269 14.6716 3.50576 14.0058 3.31929L13.9917 3.31615C12.3192 3.10349 10.3849 2.98197 8.42172 2.98197C8.22216 2.98197 8.02312 2.98302 7.8246 2.98564L7.85498 2.98511C7.68632 2.98302 7.48781 2.98145 7.28824 2.98145C5.32508 2.98145 3.38968 3.10296 1.4899 3.33815L1.71722 3.3151C1.03787 3.50523 0.514081 4.03164 0.332326 4.69947L0.329184 4.71309C0.119668 5.81776 0.000244141 7.089 0.000244141 8.38799C0.000244141 8.43409 0.000244165 8.48018 0.000767954 8.52575V8.51842C0.000767954 8.55718 0.000244141 8.60327 0.000244141 8.64936C0.000244141 9.94836 0.120192 11.2191 0.349088 12.4515L0.329184 12.3237C0.514605 13.0052 1.03839 13.5321 1.70413 13.7186L1.71827 13.7217C3.39073 13.9344 5.32508 14.0559 7.28824 14.0559C7.48728 14.0559 7.68632 14.0549 7.88536 14.0522L7.85498 14.0528C8.02364 14.0549 8.22268 14.0564 8.42172 14.0564C10.3854 14.0564 12.3203 13.9349 14.2201 13.6997L13.9927 13.7228C14.6726 13.5332 15.1964 13.0062 15.3787 12.3384L15.3818 12.3248C15.5908 11.2201 15.7102 9.94888 15.7102 8.65041C15.7102 8.60432 15.7102 8.55823 15.7097 8.51266V8.51946C15.7097 8.4807 15.7102 8.43461 15.7102 8.38852C15.7102 7.08952 15.5903 5.81881 15.3614 4.58633L15.3808 4.71414Z" fill="currentColor"></path></g><defs><clippath id="clip0_13050_28878"><rect width="15.71" height="15.71" fill="currentColor" transform="translate(0 0.664551)"></rect></clippath></defs></svg></div><div class="footer_social_icon"><div class="clickable_wrap u-cover-absolute"><a data-cta-copy="Instagram" target="_blank" data-cta="" data-cta-position="Footer" href="https://www.instagram.com/claudeai" data-wf-event-ids="" class="clickable_link w-inline-block"><span class="clickable_text u-sr-only">Instagram</span></a><button type="button" class="clickable_btn"><span class="clickable_text u-sr-only">Instagram</span></button></div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 17" fill="none" class="u-svg"><g clip-path="url(#clip0_10449_2794)"><path d="M4.60152 0.617433C3.7658 0.656863 3.19508 0.790233 2.69616 0.986282C2.17981 1.18752 1.74215 1.45756 1.30669 1.89458C0.871239 2.33161 0.603085 2.76958 0.403265 3.28672C0.209886 3.78674 0.0788724 4.35792 0.041956 5.19412C0.00503965 6.03031 -0.00312908 6.2991 0.000955282 8.43208C0.00503964 10.5651 0.0144651 10.8324 0.0549946 11.6703C0.0948956 12.5059 0.227795 13.0765 0.423844 13.5755C0.625392 14.0919 0.895117 14.5294 1.3323 14.965C1.76948 15.4006 2.20714 15.6682 2.72554 15.8683C3.22509 16.0614 3.79643 16.193 4.63247 16.2296C5.4685 16.2662 5.7376 16.2747 7.86995 16.2706C10.0023 16.2665 10.2708 16.2571 11.1085 16.2173C11.9463 16.1776 12.5139 16.0438 13.0131 15.8487C13.5295 15.6466 13.9673 15.3774 14.4026 14.94C14.8379 14.5027 15.1059 14.0644 15.3055 13.547C15.4991 13.0474 15.6306 12.4761 15.6668 11.6407C15.7034 10.8023 15.7121 10.5346 15.708 8.40192C15.7039 6.26925 15.6943 6.00188 15.6546 5.16427C15.6148 4.32666 15.4818 3.75784 15.2859 3.25845C15.084 2.74209 14.8146 2.3049 14.3776 1.86898C13.9406 1.43305 13.502 1.16521 12.9847 0.966018C12.4848 0.772639 11.9138 0.640839 11.0777 0.604708C10.2417 0.568578 9.97262 0.559309 7.83948 0.563394C5.70634 0.567478 5.43929 0.576589 4.60152 0.617433ZM4.69326 14.8166C3.92744 14.7833 3.51162 14.656 3.23451 14.5495C2.86755 14.4081 2.60615 14.2372 2.32999 13.9637C2.05382 13.6902 1.88416 13.4279 1.74089 13.0617C1.63329 12.7846 1.50369 12.3692 1.46787 11.6034C1.42891 10.7757 1.42074 10.5272 1.41619 8.43019C1.41163 6.33319 1.41964 6.08498 1.45593 5.25696C1.48861 4.49177 1.61664 4.07548 1.72299 3.79852C1.86437 3.43109 2.03465 3.17016 2.30878 2.89415C2.5829 2.61814 2.84446 2.44817 3.21095 2.3049C3.48775 2.19682 3.90309 2.06832 4.6686 2.03188C5.49694 1.99261 5.74514 1.98475 7.84183 1.9802C9.93853 1.97564 10.1874 1.9835 11.016 2.01994C11.7812 2.05324 12.1977 2.18002 12.4743 2.28699C12.8414 2.42838 13.1027 2.59819 13.3787 2.87279C13.6547 3.14738 13.8248 3.408 13.9681 3.77527C14.0763 4.05128 14.2048 4.46647 14.2409 5.23245C14.2804 6.06079 14.2893 6.30915 14.2931 8.40569C14.2969 10.5022 14.2895 10.7512 14.2532 11.5789C14.2197 12.3447 14.0928 12.7607 13.9861 13.0381C13.8447 13.4049 13.6743 13.6665 13.4 13.9424C13.1257 14.2182 12.8645 14.3882 12.4979 14.5314C12.2214 14.6394 11.8056 14.7682 11.0407 14.8046C10.2123 14.8436 9.96413 14.8518 7.86665 14.8563C5.76918 14.8609 5.52176 14.8524 4.69342 14.8166M11.0964 4.21906C11.0968 4.40549 11.1523 4.58764 11.2562 4.74247C11.36 4.89731 11.5075 5.01787 11.6798 5.08891C11.8522 5.15995 12.0417 5.17829 12.2245 5.14159C12.4073 5.10489 12.5751 5.01481 12.7067 4.88274C12.8383 4.75067 12.9277 4.58255 12.9638 4.39963C12.9998 4.21671 12.9808 4.02722 12.9091 3.85512C12.8374 3.68302 12.7163 3.53603 12.5611 3.43276C12.4059 3.32949 12.2235 3.27457 12.0371 3.27494C11.7872 3.27544 11.5477 3.37518 11.3713 3.55223C11.1949 3.72927 11.096 3.96913 11.0964 4.21906ZM3.82156 8.42485C3.82596 10.6524 5.63502 12.4541 7.8621 12.4498C10.0892 12.4456 11.8921 10.6367 11.8879 8.40914C11.8836 6.18159 10.0741 4.37945 7.8467 4.38384C5.61931 4.38824 3.81732 6.19762 3.82156 8.42485ZM5.23632 8.42202C5.2353 7.90419 5.38786 7.39768 5.6747 6.96654C5.96154 6.53541 6.36979 6.19901 6.84781 5.9999C7.32584 5.80079 7.85217 5.74789 8.36026 5.84791C8.86835 5.94793 9.33536 6.19637 9.70225 6.56181C10.0691 6.92725 10.3194 7.39328 10.4215 7.90097C10.5235 8.40865 10.4727 8.93519 10.2755 9.41401C10.0782 9.89282 9.74347 10.3024 9.31348 10.5909C8.88348 10.8795 8.37758 11.034 7.85974 11.0351C7.5159 11.0358 7.17528 10.9688 6.85734 10.8378C6.53941 10.7069 6.25037 10.5146 6.00676 10.272C5.76314 10.0293 5.56972 9.74105 5.43752 9.42363C5.30533 9.10622 5.23696 8.76587 5.23632 8.42202Z" fill="currentColor"></path></g><defs><clippath id="clip0_10449_2794"><rect width="15.7091" height="15.7091" fill="currentColor" transform="translate(0 0.5625)"></rect></clippath></defs></svg></div></div><div class="locale_picker_component"><div class="w-locales-list"><div data-delay="0" data-hover="true" class="locale_picker_dropdown w-dropdown"><div class="locale_picker_dropdown_button w-dropdown-toggle"><div class="locale_picker_icon"><div class="icon_wrap u-display-contents"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="u-svg"><path d="M7.2705 3.0498C11.1054 1.5437 15.4369 3.42942 16.9473 7.26367C18.4585 11.1003 16.5729 15.4359 12.7363 16.9473C8.89982 18.4583 4.56416 16.5736 3.05272 12.7373C1.54288 8.90435 3.42282 4.57201 7.25194 3.05663C7.25547 3.05522 7.25914 3.05413 7.26269 3.05273C7.26523 3.05172 7.26795 3.05079 7.2705 3.0498ZM8.64159 14.5283C8.05764 14.958 7.56418 15.4198 7.17772 15.8896C8.21355 16.3858 9.37633 16.6096 10.5508 16.5098C10.2224 16.2862 9.89754 16.0029 9.58202 15.6748C9.26312 15.3432 8.94744 14.9583 8.64159 14.5283ZM13.1572 12.5351C12.5305 12.6659 11.8818 12.8585 11.2275 13.1162C10.5729 13.3741 9.96666 13.6758 9.41894 14.0078C9.6946 14.3937 9.97385 14.7371 10.2539 15.0283C10.7036 15.4959 11.1332 15.8156 11.5117 15.9863C11.8879 16.1559 12.1765 16.1643 12.3935 16.0791C12.6107 15.9936 12.8179 15.7903 12.9775 15.4092C13.1379 15.0262 13.2342 14.4991 13.2441 13.8506C13.2503 13.4466 13.2187 13.0053 13.1572 12.5351ZM3.63768 8.51855C3.34594 9.76629 3.4167 11.1121 3.92186 12.3945C4.42675 13.6762 5.29203 14.7083 6.35546 15.4219C6.82009 14.8304 7.4201 14.2628 8.12694 13.748C7.6691 12.9972 7.2458 12.1466 6.88378 11.2275C6.52163 10.3082 6.25055 9.397 6.07323 8.53515C5.20566 8.64053 4.38055 8.63422 3.63768 8.51855ZM16.081 12.3828C15.4777 12.3027 14.8015 12.3016 14.081 12.3857C14.1506 12.9087 14.1838 13.4053 14.1767 13.8652C14.1698 14.3208 14.124 14.75 14.0361 15.1377C14.9636 14.4096 15.6617 13.4524 16.081 12.3828ZM11.0947 6.7705C10.4885 7.14026 9.82394 7.47239 9.11425 7.75195C8.40436 8.03157 7.69176 8.2418 6.99608 8.38476C7.16147 9.17591 7.41289 10.0225 7.75292 10.8857C8.09272 11.7483 8.48601 12.5376 8.90429 13.2285C9.51056 12.8587 10.176 12.5276 10.8857 12.248C11.5954 11.9685 12.3075 11.7572 13.0029 11.6143C12.8376 10.8236 12.5869 9.97794 12.2471 9.11523C11.907 8.25206 11.5133 7.46188 11.0947 6.7705ZM13.6426 4.57714C13.178 5.16855 12.5788 5.73625 11.8721 6.25097C12.3302 7.00222 12.754 7.85307 13.1162 8.77245C13.4782 9.69152 13.7485 10.6024 13.9258 11.4639C14.7932 11.3584 15.6185 11.3649 16.3613 11.4805C16.6528 10.233 16.5841 8.88752 16.0791 7.60546C15.5738 6.32297 14.707 5.29067 13.6426 4.57714ZM5.9619 4.86327C5.03547 5.59096 4.33712 6.54756 3.91796 7.6162C4.52106 7.69641 5.19677 7.69821 5.91698 7.61425C5.84736 7.09104 5.81616 6.59385 5.82323 6.13378C5.83026 5.679 5.87418 5.25038 5.9619 4.86327ZM8.48827 4.01367C8.11174 3.8439 7.82256 3.83644 7.60546 3.92187C7.38849 4.0075 7.182 4.20998 7.02245 4.59081C6.86212 4.97369 6.76585 5.50006 6.75585 6.14843C6.74965 6.55226 6.78027 6.99382 6.84179 7.46386C7.46863 7.33317 8.11803 7.14252 8.77245 6.88476C9.42675 6.62702 10.0316 6.32305 10.5791 5.9912C10.3036 5.6057 10.0259 5.26167 9.74608 4.9707C9.29651 4.50322 8.8667 4.18435 8.48827 4.01367ZM12.8223 4.10937C11.7866 3.61351 10.6234 3.3904 9.44921 3.49023C9.77744 3.71355 10.1026 3.99633 10.418 4.32421C10.7368 4.65579 11.0526 5.04068 11.3584 5.4707C11.9424 5.04095 12.4358 4.57931 12.8223 4.10937Z" fill="currentColor"></path></svg></div></div><div>English (US)</div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true" data-dropdown="arrow" class="locale_picker_dropdown_arrow"><path d="M16.293 9.29297L12 13.586L7.70697 9.29297L6.29297 10.707L12 16.414L17.707 10.707L16.293 9.29297Z" fill="currentColor"></path></svg></div><nav class="locale_picker_dropdown-content w-dropdown-list"><div role="list" class="locale_picker_dropdown-list w-locales-items"><div role="listitem" class="locale_picker_dropdown-item w-locales-item"><a hreflang="en-US" href="/resources/tutorials/claude-for-nonprofits-partnership-success-guide-for-admins" aria-current="page" class="locale_picker_dropdown-option w--current">English (US)</a></div><div role="listitem" class="locale_picker_dropdown-item w-locales-item"><a hreflang="ja-JP" href="/ja" class="locale_picker_dropdown-option">日本語 (Japan)</a></div><div role="listitem" class="locale_picker_dropdown-item w-locales-item"><a hreflang="de-DE" href="/de" class="locale_picker_dropdown-option">Deutsch (Germany)</a></div><div role="listitem" class="locale_picker_dropdown-item w-locales-item"><a hreflang="fr-FR" href="/fr" class="locale_picker_dropdown-option">Français (France)</a></div><div role="listitem" class="locale_picker_dropdown-item w-locales-item"><a hreflang="ko-KR" href="/ko" class="locale_picker_dropdown-option">한국어 (South Korea)</a></div><div role="listitem" class="locale_picker_dropdown-item w-locales-item"><a hreflang="it-IT" href="/it" class="locale_picker_dropdown-option">Italian (Italy)</a></div></div></nav></div></div></div></div></div><div data-wf--spacer--section-space="small" class="u-section-spacer w-variant-d422cbd0-f212-c815-68df-63414354c21d u-ignore-trim"></div><div class="u-embed-js w-embed w-script"><script>
  // ---- Update copyright year ----
  function initDynamicCurrentYear() {
    const currentYear = new Date().getFullYear();
    const currentYearElements = document.querySelectorAll('[data-current-year]');
    currentYearElements.forEach((currentYearElement) => {
      currentYearElement.textContent = currentYear;
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    initDynamicCurrentYear();
  });

  // ---- Update copyright text for EU countries ----
  (function () {
    var EU = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];

    function updateCopyright() {
      var els = document.querySelectorAll('[data-copyright-text]');
      for (var i = 0; i < els.length; i++) {
        els[i].textContent = 'Anthropic PBC. Services in the EU are provided by Anthropic Ireland Limited.';
      }
    }

    function handleCountry(code) {
      if (EU.indexOf(code) === -1) return;
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateCopyright);
      } else {
        updateCopyright();
      }
    }

    // QA override: ?loc=DE forces a country, skipping the Cloudflare lookup
    var override = new URLSearchParams(window.location.search).get('loc');
    if (override) {
      handleCountry(override.toUpperCase());
      return;
    }

    fetch('/cdn-cgi/trace')
      .then(function (res) {
        return res.text();
      })
      .then(function (text) {
        var match = text.match(/^loc=([A-Z]{2})$/m);
        if (match) handleCountry(match[1]);
      })
      .catch(function () {
        /* fail silently, default text stays */
      });
  })();
</script></div></section></div><script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6889473510b50328dbb70ae6" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script><script src="https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/js/claude-brand.0bac9fa5.d54d5e4dee708bad.js" type="text/javascript" integrity="sha384-6WoTuYdN1BH99H4vO/E4/osoOeYa1DLwOvTlqDQCh1ODOQAQcljvpZhi54TmN+Nd" crossorigin="anonymous"></script><script src="https://cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js" type="text/javascript"></script><script src="https://cdn.prod.website-files.com/gsap/3.15.0/ScrollTrigger.min.js" type="text/javascript"></script><script src="https://cdn.prod.website-files.com/gsap/3.15.0/SplitText.min.js" type="text/javascript"></script><script src="https://cdn.prod.website-files.com/gsap/3.15.0/TextPlugin.min.js" type="text/javascript"></script><script src="https://cdn.prod.website-files.com/gsap/3.15.0/Flip.min.js" type="text/javascript"></script><script src="https://cdn.prod.website-files.com/gsap/3.15.0/Draggable.min.js" type="text/javascript"></script><script src="https://cdn.prod.website-files.com/gsap/3.15.0/InertiaPlugin.min.js" type="text/javascript"></script><script type="text/javascript">gsap.registerPlugin(ScrollTrigger,SplitText,TextPlugin,Flip,Draggable,InertiaPlugin);</script><!-- Swiper JS for Slider component -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- Lottie libraries -->
<script type="module" src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
<script async src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>

<script>
  /**
   * claude-animations.js
   * GSAP-powered animations for claude.com
   *
   * Contains:
   * - Page transitions & hero animations
   * - Heading animations (scroll-triggered)
   * - Columns & cards animations
   * - Artifact toggle & metadata animations
   *
   * Dependencies: GSAP, SplitText, ScrollTrigger, jQuery
   *
   * ---------------------------------------------------------------------------
   * SEO NOTE (read before changing the scroll-triggered blocks below)
   *
   * Two problems were found via GSC URL Inspection on /product/tag:
   *
   *   1. SplitText's default element is <div>, which is flow content and is
   *      invalid inside <h1>/<h2>. Fixed with `tag: 'span'` (phrasing content,
   *      renders identically since words are inline-block).
   *
   *   2. `from()` tweens have immediateRender: true, so their start state
   *      (autoAlpha: 0 => opacity: 0; visibility: hidden) was written to the DOM
   *      at timeline-construction time. Crawlers execute JS but never scroll, so
   *      the ScrollTrigger never advanced and their render captured every
   *      heading and body paragraph as visibility: hidden.
   *
   * The important, non-obvious part: Googlebot renders with a VERY TALL viewport
   * (this is how it triggers lazy-loaded images below the fold). So *nothing* is
   * below the fold for it, and any "only do this when it's in the viewport"
   * laziness collapses — every ScrollTrigger fires onEnter at load, while
   * onLeave (which actually plays the animation) never fires without a scroll.
   *
   * Therefore the gate below is NOT viewport-based and NOT bot detection. It is:
   *   "if this element is already at/past its play line AND the user has not
   *    scrolled at all, the animation will never be triggered by arrival — so
   *    play it now rather than leaving it hidden forever."
   *
   * Every client is judged by the same rule. It also fixes real user cases:
   * deep links to mid-page anchors, restored scroll on refresh, and very tall
   * displays where content starts above the play line.
   *
   * When testing, render at a TALL viewport (e.g. 1200x5000) — a normal browser
   * window will not reproduce the crawler's behaviour.
   * ---------------------------------------------------------------------------
   */

  // FAILSAFE: the global head CSS hides [data-prevent-flicker='true'] behind
  // html:not(.gsap-not-found), but nothing ever set that class — so a failed
  // GSAP CDN load would leave hero/content permanently hidden for JS-enabled
  // clients (including Googlebot). The <noscript> fallback doesn't cover that
  // case. This runs after the GSAP <script> tags (they load synchronously
  // before this footer code), so a missing global here means the load failed.
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof SplitText === 'undefined') {
    document.documentElement.classList.add('gsap-not-found');
  }

  function isValidSameOriginUrl(urlString) {
    if (!urlString || typeof urlString !== 'string') {
      return false;
    }

    try {
      // Use URL constructor for safe parsing
      const url = new URL(urlString, window.location.origin);

      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(url.protocol)) {
        return false;
      }

      // Only allow same origin
      if (url.origin !== window.location.origin) {
        return false;
      }

      return true;
    } catch (e) {
      // Invalid URL format
      return false;
    }
  }

  /**
   * Shared scroll-state flag.
   *
   * Set once, on the first scroll event of the page's life. Used by the
   * scroll-triggered blocks to distinguish "this element is about to arrive"
   * (normal user scrolling) from "this element was already past its play line
   * on load and will never arrive" (tall viewport, deep link, restored scroll).
   */
  const claudeScrollState = { userHasScrolled: false };
  window.addEventListener(
    'scroll',
    () => {
      claudeScrollState.userHasScrolled = true;
    },
    { once: true, passive: true },
  );

  document.addEventListener('DOMContentLoaded', () => {
    // PRE-INITIALIZE SplitText BEFORE any animations run
    // This prevents layout thrashing during animation frames
    const heroData = [];
    document.querySelectorAll('[data-animate-hero-wrap]').forEach((hero) => {
      const heading = hero.querySelector('[data-animate-hero-heading]');
      const text = hero.querySelector('[data-animate-hero-text]');
      const cta = hero.querySelector('[data-animate-hero-cta]');
      const visual = hero.querySelectorAll('[data-animate-hero-visual]');

      let split = null;
      if (heading) {
        const targetElement = heading.children.length > 0 ? heading.children : heading;
        split = SplitText.create(targetElement, {
          type: 'words',
          wordsClass: 'word',
          // <div> is flow content and is invalid inside <h1>/<h2>.
          // <span> is phrasing content and renders identically (inline-block).
          tag: 'span',
        });
        // Set initial state immediately (batch DOM writes)
        if (split.words && split.words.length > 0) {
          gsap.set(split.words, { autoAlpha: 0 });
        }
      }

      heroData.push({ hero, heading, text, cta, visual, split });
    });

    // Force a single reflow before animations start
    document.body.offsetHeight;

    // HERO ANIMATION FUNCTION - uses pre-split text (no DOM modification)
    // NOTE: the hero always animates on page load regardless of scrolling, so it
    // resolves to opacity: 1 for crawlers too. No gate needed here.
    function animateHero() {
      heroData.forEach(({ hero, text, cta, visual, split }) => {
        const heroTl = gsap.timeline();

        // Animate pre-split words (no DOM modification here)
        if (split && split.words && split.words.length > 0) {
          heroTl.to(split.words, {
            autoAlpha: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: { amount: 0.2 },
          });
        }

        // Animate text
        if (text) {
          heroTl.from(
            text,
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.75,
              ease: 'power2.out',
            },
            '<+30%',
          );
        }

        // Animate CTA
        if (cta) {
          heroTl.from(
            cta,
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.75,
              ease: 'power2.out',
            },
            '<+25%',
          );
        }

        // Animate Visual
        if (visual && visual.length) {
          heroTl.from(
            visual,
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.75,
              ease: 'power2.out',
            },
            '<',
          );
        }

        gsap.set(hero, { visibility: 'visible' });

        return heroTl;
      });
    }

    // PAGE LOAD SEQUENCE
    let tl = gsap.timeline();

    // Only animate elements that exist on the page
    const transitionWrap = document.querySelector('.transition_wrap');
    const navWrap = document.querySelector('.nav_wrap');
    const navSecondaryWrap = document.querySelector('.nav_secondary_wrap');
    const pageMain = document.querySelector('.page_main');

    if (transitionWrap) {
      tl.to(transitionWrap, { autoAlpha: 0, duration: 1, ease: 'none' });
    }
    if (navWrap) {
      tl.from(navWrap, { autoAlpha: 0, y: -20, duration: 1, ease: 'power2.out' }, transitionWrap ? '>-50%' : 0);
    }
    if (navSecondaryWrap) {
      tl.from(navSecondaryWrap, { autoAlpha: 0, y: -20, duration: 1, ease: 'power2.out' }, '<');
    }

    // Only animate hero if one exists on the page
    if (heroData.length > 0) {
      tl.add(() => animateHero(), '<+25%');
      // Animate main wrapper excluding hero section
      if (pageMain) {
        const nonHeroChildren = pageMain.querySelectorAll(':scope > *:not([data-animate-hero-wrap])');
        if (nonHeroChildren.length > 0) {
          tl.from(
            nonHeroChildren,
            {
              autoAlpha: 0,
              y: 20,
              duration: 1,
              ease: 'power2.out',
            },
            '>-20%',
          );
        }
      }
    } else if (pageMain) {
      // Animate entire main wrapper if no hero exists
      tl.from(
        pageMain,
        {
          autoAlpha: 0,
          y: 20,
          duration: 1,
          ease: 'power2.out',
        },
        '>-50%',
      );
    }

    if (transitionWrap) {
      tl.set(transitionWrap, { display: 'none' });
    }

    // LINK CLICK TRANSITIONS
    $('a:not(.ignore-transition)').on('click', function (e) {
      // Let browser handle new-tab/window behaviors
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.which === 2 || e.button === 1) {
        return;
      }

      let currentUrl = $(this).attr('href');
      if ($(this).prop('hostname') === window.location.host && !currentUrl.includes('#') && $(this).attr('target') !== '_blank') {
        // SECURITY: Validate URL before navigation to prevent injection attacks
        if (!isValidSameOriginUrl(currentUrl)) {
          console.warn('Navigation blocked: Invalid or unsafe URL', currentUrl);
          return;
        }

        e.preventDefault();
        let tl = gsap.timeline({ onComplete: () => (window.location.href = currentUrl) }); // nosemgrep: unsafe-url-manipulation
        if (transitionWrap) {
          tl.set(transitionWrap, { display: 'block' });
          tl.fromTo(transitionWrap, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.75, ease: 'none' });
        }
      }
    });

    // BACK BUTTON HANDLING
    window.onpageshow = function (event) {
      if (event.persisted) window.location.reload();
    };
  });

  /* Heading Animation  */

  document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    document.querySelectorAll('[data-animate-header-wrap]').forEach((header) => {
      const heading = header.querySelector('[data-animate-header-heading]');
      const text = header.querySelector('[data-animate-header-text]');
      const cta = header.querySelector('[data-animate-header-cta]');

      let tl = null;

      // Builds the timeline on first call. Creating the from() tweens here is
      // what writes the hidden start state to the DOM, so this must not run
      // until we are ready to either play it or hand it to a scrolling user.
      function buildTimeline() {
        if (tl) return tl;

        tl = gsap.timeline({ paused: true });

        // Animate heading with split text
        if (heading && heading.children.length > 0) {
          const split = SplitText.create(heading.children, {
            type: 'words',
            wordsClass: 'word',
            tag: 'span', // valid inside <h2>; see SEO NOTE at top
          });
          if (split.words && split.words.length > 0) {
            tl.from(split.words, {
              autoAlpha: 0,
              duration: 1,
              ease: 'power2.out',
              stagger: { amount: 0.2 },
            });
          }
        }
        // Animate text
        if (text) {
          tl.from(
            text,
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.75,
              ease: 'power2.out',
            },
            '<+30%',
          );
        }
        // Animate CTA
        if (cta) {
          tl.from(
            cta,
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.75,
              ease: 'power2.out',
            },
            '<+25%',
          );
        }

        return tl;
      }

      ScrollTrigger.create({
        trigger: header,
        start: 'top bottom',
        end: 'top 80%',

        onEnter: () => {
          const t = buildTimeline();

          // Is this element already at/past the point where it would play
          // ("top 80%"), on a page nobody has scrolled? Then arrival will never
          // happen and onLeave will never fire. Play it now instead of leaving
          // it hidden. See SEO NOTE at top — this is geometry, not bot sniffing.
          //
          // For a normal user scrolling down, onEnter fires exactly when
          // rect.top === innerHeight, which is never <= innerHeight * 0.8, so
          // this branch is skipped and behaviour is unchanged.
          // progress(1) (not play()) — a synchronous jump to the end state.
          // Google's renderer can snapshot the page without ever ticking an
          // animation frame, so a play()ed tween can be captured stuck at
          // opacity:0. progress(1) needs no frames. Also gate on the full
          // viewport height (not * 0.8) so nothing in the first paint can be
          // left hidden with no scroll to rescue it.
          if (!claudeScrollState.userHasScrolled && header.getBoundingClientRect().top <= window.innerHeight) {
            t.progress(1);
          }
        },

        // Normal path: plays when the header's top hits 80% of the viewport,
        // matching the original toggleActions: 'none play none reset'.
        onLeave: () => {
          buildTimeline().play();
        },

        // Mirrors the original 'reset' on leave-back.
        onLeaveBack: () => {
          if (tl) tl.pause(0);
        },
      });
    });
  });

  /* Columns & Cards Animation */

  document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    document.querySelectorAll('[data-animate-card-wrap]').forEach((cardWrap) => {
      const cards = cardWrap.querySelectorAll('[data-animate-card-card]');

      // NodeList is always truthy, so check length instead
      if (cards.length === 0) return;

      let tl = null;

      function buildTimeline() {
        if (tl) return tl;

        tl = gsap.timeline({ paused: true });

        tl.from(cards, {
          autoAlpha: 0,
          y: 20,
          duration: 0.75,
          stagger: { each: 0.1 },
          ease: 'power2.out',
        });

        return tl;
      }

      ScrollTrigger.create({
        trigger: cardWrap,
        start: 'top bottom',
        end: 'top 70%',

        onEnter: () => {
          const t = buildTimeline();
          // Same geometry gate as the headings, matching this block's end
          // position ("top 70%").
          // Same reasoning as the headings gate: synchronous jump, full
          // viewport height. See comment there.
          if (!claudeScrollState.userHasScrolled && cardWrap.getBoundingClientRect().top <= window.innerHeight) {
            t.progress(1);
          }
        },

        onLeave: () => {
          buildTimeline().play();
        },
      });
    });
  });

  /* Combined Artifact Toggle & Metadata Animation */

  document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const TOGGLE_ENABLED = true; // Set to false to disable toggle functionality

    // Initially hide all artifact_metadata elements for animation
    // NOTE: known outstanding issue — this hides content via CSS at load and only
    // reveals it via IntersectionObserver. Opacity-only (no visibility: hidden),
    // so it is a weaker signal than the heading problem was, but it is the same
    // shape of defect. Left as-is for now; see recap doc.
    const style = document.createElement('style');
    style.textContent = `.artifact_metadata { opacity: 0; transform: translateY(32px); }`;
    document.head.appendChild(style);

    // Track which columns have been animated and which have toggles
    const animatedColumns = new Set();
    const toggleManagedColumns = new Set();

    // ============================================
    // METADATA ANIMATION FUNCTIONALITY
    // ============================================

    // Function to animate metadata items
    function animateMetadata(column) {
      // Skip if already animated or if this column is toggle-managed and hidden
      if (animatedColumns.has(column)) return;
      if (toggleManagedColumns.has(column) && column.style.display === 'none') return;

      const metadataItems = column.querySelectorAll('.artifact_metadata');
      if (metadataItems.length > 0) {
        animatedColumns.add(column);
        gsap.fromTo(
          metadataItems,
          {
            opacity: 0,
            y: 32,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.2,
          },
        );
      }
    }

    // Intersection Observer for viewport visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only animate if not hidden by toggle
            if (!toggleManagedColumns.has(entry.target) || entry.target.style.display !== 'none') {
              animateMetadata(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -80px 0px',
      },
    );

    // ============================================
    // TOGGLE FUNCTIONALITY
    // ============================================

    if (TOGGLE_ENABLED) {
      const toggleButtons = document.querySelectorAll('.artifact_toggle');
      const MOBILE_BREAKPOINT = 768; // Adjust as needed

      toggleButtons.forEach((button) => {
        const container = button.closest('.artifact_component_wrap') || button.parentElement;
        const metadataColumn = container.querySelector('.artifact_column_metadata');
        const contentColumn = container.querySelector('.artifact_column_content');

        if (!metadataColumn || !contentColumn) return;

        // Check if this is variant 1-1 (toggle always visible)
        const artifactWrapper = button.closest('[data-wf--artifact-wrapper--variant]');
        const isVariant11 = artifactWrapper?.getAttribute('data-wf--artifact-wrapper--variant') === '1-1';

        // Mark this metadata column as toggle-managed
        toggleManagedColumns.add(metadataColumn);

        // Track current state
        let showingContent = true;

        // Helper function to check if we're on mobile
        function isMobile() {
          return window.innerWidth <= MOBILE_BREAKPOINT;
        }

        // Helper function to check if toggle should be active
        function shouldToggleBeActive() {
          // Toggle is active if:
          // 1. It's variant 1-1 (always active), OR
          // 2. We're on mobile/tablet
          return isVariant11 || isMobile();
        }

        // Helper function to update button text
        function updateButtonText(newText) {
          const walker = document.createTreeWalker(
            button,
            NodeFilter.SHOW_TEXT,
            {
              acceptNode: function (node) {
                return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
              },
            },
            false,
          );

          let textNode;
          while ((textNode = walker.nextNode())) {
            textNode.textContent = newText;
            break;
          }
        }

        // Set initial states based on viewport and variant
        function initializeToggleState() {
          if (shouldToggleBeActive()) {
            // Toggle is active: Hide metadata initially
            gsap.set(metadataColumn, {
              display: 'none',
              opacity: 0,
              y: -24,
            });
            gsap.set(contentColumn, {
              display: 'flex',
              opacity: 1,
              y: 0,
            });

            updateButtonText('View prompt');
            showingContent = true;
            button.style.display = ''; // Show toggle button (let CSS control it)
          } else {
            // Toggle not active: Show both columns, hide toggle button
            gsap.set([metadataColumn, contentColumn], {
              clearProps: 'display,opacity,y',
            });
            button.style.display = 'none'; // Hide toggle button

            // Reset the state flag
            showingContent = true;

            // Trigger metadata animation if in viewport and not yet animated
            if (!animatedColumns.has(metadataColumn)) {
              // Check if already in viewport
              const rect = metadataColumn.getBoundingClientRect();
              const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
              if (inViewport && metadataColumn.offsetParent !== null) {
                animateMetadata(metadataColumn);
              }
            }
          }
        }

        // Toggle animation function
        button.addEventListener('click', () => {
          if (!shouldToggleBeActive()) return; // Safety check

          if (showingContent) {
            // Switch to metadata/prompt view
            gsap.to(contentColumn, {
              opacity: 0,
              y: 24,
              duration: 0.3,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.set(contentColumn, { display: 'none' });
              },
            });

            gsap.set(metadataColumn, { display: 'flex' });

            // Check if metadata needs initial animation
            if (!animatedColumns.has(metadataColumn)) {
              // First time showing - animate the metadata items
              animateMetadata(metadataColumn);
              // Also animate the column itself
              gsap.fromTo(
                metadataColumn,
                {
                  opacity: 0,
                  y: -24,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                  ease: 'power2.inOut',
                  delay: 0.15,
                },
              );
            } else {
              // Already animated before - just show it
              gsap.fromTo(
                metadataColumn,
                {
                  opacity: 0,
                  y: -24,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                  ease: 'power2.inOut',
                  delay: 0.15,
                },
              );
            }

            updateButtonText('View result');
            showingContent = false;
          } else {
            // Switch back to content view
            gsap.to(metadataColumn, {
              opacity: 0,
              y: -24,
              duration: 0.3,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.set(metadataColumn, { display: 'none' });
              },
            });

            gsap.set(contentColumn, { display: 'flex' });
            gsap.fromTo(
              contentColumn,
              {
                opacity: 0,
                y: 24,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.inOut',
                delay: 0.15,
              },
            );

            updateButtonText('View prompt');
            showingContent = true;
          }
        });

        // Initialize toggle state
        initializeToggleState();

        // Handle resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            initializeToggleState();
          }, 250);
        });
      });
    }

    // ============================================
    // OBSERVE ALL COLUMNS
    // ============================================

    // Observe all artifact columns for animation
    const artifactColumns = document.querySelectorAll('.artifact_column_metadata');
    artifactColumns.forEach((column) => {
      observer.observe(column);
    });

    // ============================================
    // TAB & SLIDER LISTENERS
    // ============================================

    // Tab activation listener
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('[role="tab"], .tab-button, .w-tab-link, [data-w-tab]');
      if (tab) {
        setTimeout(() => {
          document.querySelectorAll('.artifact_column_metadata').forEach((column) => {
            // Check if column is visible and not toggle-hidden
            if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) {
              animateMetadata(column);
            }
          });
        }, 100);
      }
    });

    // Slider change listener
    document.addEventListener('click', (e) => {
      const sliderControl = e.target.closest('[data-aside-prev], [data-aside-next], [data-aside-dot], .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet');
      if (sliderControl) {
        setTimeout(() => {
          document.querySelectorAll('.artifact_column_metadata').forEach((column) => {
            if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) {
              animateMetadata(column);
            }
          });
        }, 300);
      }
    });

    // Swiper events
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll('.swiper').forEach((swiperEl) => {
        const swiper = swiperEl.swiper;
        if (swiper) {
          swiper.on('slideChange', () => {
            setTimeout(() => {
              document.querySelectorAll('.artifact_column_metadata').forEach((column) => {
                if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) {
                  animateMetadata(column);
                }
              });
            }, 100);
          });
        }
      });
    }
  });
</script>

<!-- Directly loaded external custom scripts -->
<!-- <script src="https://cdn.amplitude.com/libs/session-replay-browser-1.29.8-min.js.gz"></script> -->
<script src="https://claude.com/shared/webflow-privacy-banner.js"></script>
<script src="https://claude.com/shared/webflow-custom-tracking.js"></script>

<!-- Conditionally load external custom scripts
<script>
  (function() {
    const productionDomains = ['claude.com', 'www.claude.com'];
    const isProduction = productionDomains.includes(window.location.hostname);
    const env = isProduction ? '' : '?env=staging';

	/*
    if (isProduction) {
      document.write('<script src="https://cdn.amplitude.com/libs/session-replay-browser-1.29.8-min.js.gz"><\/script>');
    }*/

    document.write('<script src="https://claude.com/shared/webflow-privacy-banner.js' + env + '"><\/script>');
    document.write('<script src="https://claude.com/shared/webflow-custom-tracking.js' + env + '"><\/script>');

  })();
</script> --><script>
  document.addEventListener('DOMContentLoaded', function() {
    const contentElement = document.querySelector('[data-readtime="content"]');
    const minutesElement = document.querySelector('[data-readtime="minutes"]');

    if (!contentElement || !minutesElement) return;

    const text = contentElement.innerText || contentElement.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const wordsPerMinute = 250;
    const minutes = Math.round(wordCount / wordsPerMinute);

    minutesElement.textContent = minutes || 1; // minimum 1 minute
  });
  
  // Hide all empty paragraph tags from the main content RTF
  document.querySelectorAll('#tutorial_content p').forEach(p => {
    if (p.textContent.trim() === '' || /^[\u200B-\u200D\uFEFF]+$/.test(p.textContent)) {
      p.remove();
    }
  });
</script></body></html>
---

SOURCE: https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso

# Set up single sign-on \(SSO\)

Single sign-on is available for Team plans, Enterprise plans, and Console organizations.

This guide covers the steps to configure SSO for Team and Enterprise plans, and Claude Console organizations.

## Step 1: Review prerequisites and important considerations

Before proceeding with SSO setup, complete the following:

**Review the considerations guide:** Read **[Important considerations before enabling single sign-on (SSO) and JIT/SCIM provisioning](https://support.claude.com/en/articles/10276682-important-considerations-before-enabling-single-sign-on-sso-and-jit-scim-provisioning)** to understand parent organizations, determine your setup path, and complete any prerequisite steps such as merging organizations.

**Confirm you have the required role:**

- For Team or Enterprise plans: You must be an Owner or Primary Owner

- For Claude Console: You must be an Admin

**Confirm you have access to the following:**

- DNS settings for your company's email address domain

- Your company's SSO Identity Provider (IdP) used to log in to third-party applications (e.g., Okta, Google Workspace, etc.)

Please contact your organization's IT Administrator if you do not have permissions to manage Claude or company DNS settings.

**Note:** WorkOS is Anthropic's provider for domain verification and SSO setup. More details can be found in **[Anthropic's Subprocessor List](https://trust.anthropic.com/subprocessors)**. You will be taken through a WorkOS setup flow when configuring SSO and provisioning features—find your Identity Provider in their **[Integration documentation](https://workos.com/docs/integrations)**.

---

## Step 2: Verify your domain(s)

Domain verification proves that you own your company's domain. Once verified, you can configure SSO for accounts with your company's domain.

You can verify multiple domains for a single organization, but all domains must be managed through a single IdP. We don't support verifying domains from separate IdPs within the same organization.

**Note:** Verifying your domain by itself will not impact existing users' ability to access our products. End users’ access is only affected once SSO is set up and explicitly enforced.

1. Navigate to your **Organization and access** settings in Claude (**[claude.ai/admin-settings/organization](http://claude.ai/admin-settings/organization)**) or your **Identity and access** settings in Console (**[platform.claude.com/settings/identity](http://platform.claude.com/settings/identity)**) – note this page will only appear on Console if you've worked with Sales to enable SSO or completed a merge proposal.

2. In the **Domains** section, click “Add or edit domains.”

3. Enter the domain(s) you want to verify in the **Update organization email domains** modal and click the “+” button:



4. Click “Save” when you’re finished adding domains.

5. The domain(s) you added will now appear in the **Domains** section; click “Verify” to the right of the domain(s) to begin the verification process.

6. Enter your domain in the text box and click “Continue”:



7. The setup screen displays a TXT record. **Copy the full Value using the copy button**—it begins with `anthropic-domain-verification-` and is longer than what's visible in the box. In your DNS provider, add a TXT record with **Host/Name** set to `@` (the root of your domain) and **Value** set to the copied string. Add it alongside any existing TXT records; don't replace them. The value is case-sensitive, so paste it exactly.

  1. **Important:** Save the TXT value before leaving the setup screen. Once the domain shows as Pending, the admin console doesn't display the value again. If you lose it, you'll need to remove and re-add the domain, which generates a new value.

8. Wait 10 minutes for your DNS change to propagate.

  - **Note:** *DNS changes can take 24-48 hours to propagate globally.*

9. When you see the green "Verified" badge, you can close the instructions page.

10. If your domain shows as "Pending," use the "Refresh" button.

### If your domain stays Pending

Clicking "Refresh" re-checks your DNS; it won't show Verified until the published TXT record exactly matches the expected value. If it stays Pending after DNS has propagated, check the following:

- **The record exists at the root.** Look up your domain's TXT records with a tool such as **[DNSChecker](https://dnschecker.org/#TXT)** and confirm a record beginning with `anthropic-domain-verification-` appears for `yourdomain.com` (not `www.yourdomain.com` or another subdomain). If it doesn't appear, the record may have been added at the wrong host or hasn't propagated yet.

- **The value matches exactly.** The check is case-sensitive and requires the full string including the `anthropic-domain-verification-…=` prefix. A single character difference will keep it Pending.

- **You haven't removed and re-added the domain.** Each re-add generates a new verification value. If you re-added the domain after publishing the TXT record, the published value no longer matches—you'll need to update the DNS record with the new value.

If the record is correct and propagated but the status still shows Pending, contact Support.



**Note:** Once your domain is verified, you'll see a **Restrict organization creation** toggle under **Security** on the Organization and access organization settings page. Enable this if you want to prevent users from creating new Claude or Console organizations—including personal accounts—using your verified domains.

---

## Step 3: Set up SSO with your Identity Provider

1. Navigate to your **Organization and access** settings in Claude (**[claude.ai/admin-settings/organization](http://claude.ai/admin-settings/organization)**) or your **Identity and access** settings in Console (**[platform.claude.com/settings/identity](http://platform.claude.com/settings/identity)**).

2. In the **Authentication** section, click “Setup SSO” (or “Manage SSO”).

3. Follow the setup guide provided for your Identity Provider (see below for additional guides).

4. At the end of these steps, you’ll be prompted to Test Single Sign-on to confirm there are no errors and the configuration is successful.

5. Once complete, navigate back to the **Organization and access** settings page for further configuration options.

**Important:** SSO enforcement might result in users being unable to log in if they are not correctly assigned to the Anthropic app in the IdP. If you have more than one Claude/Console org connected to your “parent org,” you will want to consider creating a unique IdP Group for each. For more information, see **[enable group mappings](https://support.claude.com/en/articles/13133195-setting-up-jit-or-scim-provisioning#h_adee31eeba)**.

For IdP-specific setup instructions, see:

- **[Okta SAML](https://workos.com/docs/integrations/okta-saml)**

- **[Entra ID SAML (formerly Azure AD)](https://workos.com/docs/integrations/entra-id-saml)**

- **[Google SAML](https://workos.com/docs/integrations/google-saml)**

- **[OneLogin SAML](https://workos.com/docs/integrations/onelogin-saml)**

- **[JumpCloud SAML](https://workos.com/docs/integrations/jumpcloud-saml)**

- **[Duo SAML](https://workos.com/docs/integrations/duo-saml/4-enter-duo-saml-settings-in-your-workos-dashboard)**

---

## Step 4: Choose to require SSO

You can now choose to toggle on **Require SSO for Console** and/or **Require SSO for Claude,** on the **Organization and access** page, under the **Authentication** section:



When SSO is required, users must use the “Continue with SSO” option to log in to their Claude/Console accounts. When SSO is not required, they will have the option to choose “Continue with SSO” or “Continue with email.”

Before you decide, review **[What happens to existing users when SSO is enabled](https://support.claude.com/en/articles/10276682-important-considerations-before-enabling-single-sign-on-sso-and-jit-scim-provisioning#h_644f467167)**.

---

## Step 5: Choose your provisioning approach

Once SSO is enabled, you need to decide how users will be added to your organization by choosing an option within the **User provisioning** section of your **Organization and access** settings.

**Invite only** is the default. Users are added and removed directly in your Claude or Console settings. Please see **[Manage members on Team and Enterprise plans](https://support.claude.com/en/articles/13133750-managing-members-on-team-and-enterprise-plans)**.

**Just-in-Time (JIT) provisioning** can be enabled to automatically provision users when they first log in. By default, users assigned to your Anthropic IdP app first login, they will receive the User role. This is the simplest automated option and requires no additional configuration beyond selecting "Just-in-Time (JIT)" as your provisioning mode.

### Enable group mappings - when to configure additional provisioning features

For more control over provisioning, see **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-setting-up-jit-or-scim-provisioning)**. You'll want to review this guide if you need to:

- Automatically assign roles or seat tiers based on IdP group membership.

- Use SCIM directory sync for automatic provisioning and deprovisioning.

- Manage access across multiple organizations (e.g., if you have both a Team/Enterprise organization and a Console organization linked to the same parent and need to control which users are provisioned to each).

**Note:** We don't currently support IdP-initiated login for Claude Console organizations that share SSO settings with a Team or Enterprise plan organization. Users will be redirected to claude.ai with IdP-initiated login. As a workaround, if possible in your IdP, create a bookmark called "Claude Console" that links to platform.claude.com/login?sso=true to redirect users to Console for SP-initiated login.

---

## Updating your SSO certificate

When your Identity Provider's X.509 signing certificate expires or is rotated, you'll need to update it in Claude or Console to maintain SSO functionality.

1. Navigate to your settings:

  - For Team and Enterprise plans: **[claude.ai/admin-settings/organization](http://claude.ai/admin-settings/organization)**

  - For Claude Console: **[platform.claude.com/settings/identity](http://platform.claude.com/settings/organization)**

2. In the **Authentication** section, click “Manage SSO.”

3. Find the **Metadata configuration** section and click “Edit.”

4. Update your certificate information and save your changes.

5. Click "Test sign-in" on the same page to confirm everything is working.

---

## Turning off SSO

You can toggle **Require SSO for Claude** or **Require SSO for Console** off at any time. This will make SSO optional for all users.

To fully disconnect SSO, click “Manage SSO” then “Reset connection.” This will end all users’ sessions and require them to sign back in via email login link.
---

SOURCE: https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning

# Set up JIT or SCIM provisioning

This guide covers how to configure user provisioning and role assignment for your Claude or Claude Console organization.

JIT provisioning is available for Team plans, Enterprise plans, and Console organizations. SCIM provisioning is available for Enterprise and Console organizations only.

**Before you begin:** This guide assumes you have already completed the steps in **[Set up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso)**, including domain verification and SSO configuration with your Identity Provider (IdP), and you have an Admin (Console) or Owner (Claude) role.

---

## Step 1: Choose your provisioning mode

Once SSO is configured, you need to decide how users will be provisioned to your organization. This is controlled via the **User provisioning** section in **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

### Provisioning options

**Invite only** is the default. Users are added and removed directly in Claude or Console settings.

**Just-in-time (JIT):** Users assigned to your Anthropic IdP app are automatically provisioned when they first log in. This option is available to all plans.

**SCIM directory sync:** Users are automatically provisioned and deprovisioned based on assignments in your IdP, without requiring them to log in first. SCIM is available for Enterprise plans and Console organizations with their own parent organization or joined to an Enterprise parent organization. SCIM is not available for Team plans or Console organizations joined to a Team plan's parent organization.

### Provisioning behavior overview

Use this table to help decide which provisioning mode is right for your organization:

| **Mode**              | **Provisioning**                                                                                                                                                | **Role and seat type changes**                                                | **Removal**                                                                                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Invite only           | Users are manually added                                                                                                                                        | Roles and seat types are manually changed                                     | Users are manually removed                                                                                                                             |
| Just-in-time (JIT)    | Users assigned to your IdP app are provisioned at login with the User role                                                                                      | Roles and seat types are manually changed                                     | Manual removal required: users removed from your IdP app can no longer log in, but remain in the user list until they attempt to log in or are removed |
| JIT + group mappings  | Users in at least one mapped group are provisioned at login with the highest-permissioned role from their group memberships                                     | Roles and seat types update on next login based on group membership           | Users without group access can't log in but remain in the list until login attempt or manual removal                                                   |
| SCIM directory sync   | Users assigned to your IdP app are automatically provisioned to all organizations joined to your parent org.                                                    | Roles and seat types are manually changed                                     | Users removed from your IdP app are automatically removed                                                                                              |
| SCIM + group mappings | Users in at least one mapped group are automatically provisioned, with appropriate role, to just the org(s) joined to the parent org where that group is added. | Role and seat types changes automatically propagate based on group membership | Automatic removal when group access is revoked                                                                                                         |

Both JIT and SCIM can be combined with **Enable group mappings** to control role or seat tier assignment based on IdP group membership. If you select either of these options for your provisioning mode, **Enable group mappings** will appear within the **User provisioning** section:



### Available roles and seat tiers

| **Product**                                       | **Roles**                                                            | **Seat types**           |
| ------------------------------------------------- | -------------------------------------------------------------------- | ------------------------ |
| Team plan                                         | Owner, Admin, User                                                   | Premium, Standard        |
| Seat-based Enterprise plan                        | Owner, Admin, User, Custom                                           | Premium, Standard        |
| Usage-based Enterprise plan (with two seat types) | Owner, Admin, User, Custom                                           | Chat, Chat + Claude Code |
| Usage-based Enterprise plan (single seat type)    | Owner, Admin, User, Custom                                           | Enterprise               |
| Console                                           | Admin, Developer, Limited Developer, Billing, Claude Code User, User | —                        |

For information on purchasing seats or adjusting your plan's seat allocation, see our guides for **[Team plans](https://support.claude.com/en/articles/12004354-purchasing-and-managing-seats)** and **[Enterprise plans](https://support.claude.com/en/articles/13393991-purchasing-and-managing-seats-on-enterprise-plans)**.

---

## Step 2: Set up SCIM directory sync (if using SCIM)

**Note:** Skip this step if you're using Invite only or JIT provisioning.

If you chose SCIM as your provisioning mode, you need to establish the connection between your Identity Provider and Anthropic before enabling it.

1. Navigate to your **Organization and access** settings in Claude (**[claude.ai/admin-settings/organization](http://claude.ai/admin-settings/organization)**) or your **Identity and access** settings in Console (**[platform.claude.com/settings/identity](http://platform.claude.com/settings/identity)**)

2. In the **User provisioning** section, click “Setup SCIM” (or “Manage SCIM”)next to **SCIM directory sync**.

3. Follow the WorkOS setup guide to configure SCIM in your Identity Provider. You'll need to copy values from WorkOS into your IdP's Anthropic application.

**‼️ When you reach the IdP Group step, pause to review Steps 3 and 4 of this guide, alongside the other guides.**

For IdP-specific JIT / SCIM setup instructions, see:

- **[Okta SAML](https://workos.com/docs/integrations/okta-saml)** / **[OKTA SCIM](https://workos.com/docs/integrations/okta-scim)**

- **[Entra ID SAML](https://workos.com/docs/integrations/entra-id-saml)** / **[Entra ID SCIM](https://workos.com/docs/integrations/entra-id-scim)**

- **[Google SAML](https://workos.com/docs/integrations/google-saml)** / **[Directory Sync](https://workos.com/docs/integrations/google-directory-sync)**

- **[OneLogin SAML](https://workos.com/docs/integrations/onelogin-saml)** / **[OneLogin SCIM](https://workos.com/docs/integrations/onelogin-scim)**

- **[JumpCloud SAML](https://workos.com/docs/integrations/jumpcloud-saml)** / **[JumpCloud SCIM](https://workos.com/docs/integrations/jumpcloud-scim)**

- See additional IdPs **[here](https://workos.com/docs/integrations)**

Once your IdP is connected, continue to Step 3.

---

## Step 3: Configure provisioning mode and enable group mappings

1. Find the **User provisioning** section of your settings.

2. Select your chosen option:

  1. **Invite only**: New members can only join if manually invited by an existing member. SSO access alone won't add them to your org.

  2. **Just-in-time (JIT)**: Allow people with SSO access to join when they first log in. Each new member uses one of your available seats.

  3. **SCIM directory sync**: Add or remove members automatically as your directory changes. Your org always stays current.

3. If you selected “Just-in-time (JIT)” or “SCIM directory sync,” do NOT click “Save changes” immediately. You must first ensure all users are assigned to your Anthropic application in your IdP.

4. Once you’ve confirmed all users are assigned in your IdP you can either:

  1. Click “Save changes” to complete the set up and trigger the initial provisioning, or

  2. Toggle on **Enable group mappings** and move to Step 4.

**Important**: Saving before users are properly assigned will result in those users being deprovisioned from the organization. Where it's available, the admin console shows a preview of what the sync will change, including how many members will be removed, before it applies. Review it before you confirm, and cancel if the removal count is higher than you expect. Learn more about **[how SCIM sync works](https://support.claude.com/en/articles/14499648-how-scim-sync-works-for-enterprise-organizations)**.

---

## Step 4: Configure groups in your Identity Provider and map groups to roles and seat types

1. Create groups in your IdP for each role you want to assign. Unless you're on the single-seat Enterprise plan, create groups for each seat type as well.

  1. While there are no longer naming requirements for these groups, we recommend including something in the group name (e.g., `anthropic-claude-` or `anthropic-console-`) to make them easier to identify.

2. Add users to the groups you created, ensuring at least one user (including yourself) is in a group that will be mapped to an Admin (Console) or Owner (Claude) role.

3. Return to your **Organization and access** or **Identity and access** settings in Claude or Console, and find **User provisioning**.

4. Toggle **Enable group mappings** on (if it’s not already):



5. In the **Enable group mappings** section, click “Add” next to each role and select the corresponding group from your IdP in the dropdown.

  1. When using group mappings, you *must* assign all users to a role-based group in order to ensure they’re provisioned an account. Assigning users to seat-tier based groups is optional.

  2. You can map an IdP group to the “Custom” role. Members assigned this role have no default permissions—their access is determined entirely by the custom roles assigned to their groups in Claude.

6. **For all plans except single-seat Enterprise:** In the **Assign seat tiers to IdP groups** section (optional), click "Add" next to each seat type and select the corresponding group from your IdP. If a user isn't assigned to a seat type group, they will be assigned to the highest available type by default.

  1. **For single-seat Enterprise:** Seat type mapping does not apply. All provisioned users are automatically assigned an Enterprise seat, provided one is available in your organization.

7. Verify all necessary groups are mapped to the appropriate roles and seat types.

8. Click “Save changes.”

  1. **Note:** Microsoft Entra only pushes SCIM changes every 40 minutes, so there may be a delay before changes appear. You can check which users are synced from your IdP by clicking "Manage SCIM" and viewing the Directory. Those users in the Directory will be provisioned to Claude / Console.

**Important:** All users who need access must be assigned to the appropriate groups before you save your group mappings configuration. These users should already be assigned to your Anthropic application in your IdP from when you enabled SSO.

### How the Primary Owner role works with SCIM

- Your organization's Primary Owner is exempt from SCIM reconciliation. If the Primary Owner account is not present in the IdP directory, or is not a member of any group mapped to a role, it will be skipped when SCIM syncs. The Primary Owner's membership and role are preserved.

- This exemption applies only to the single Primary Owner role. Owner and Admin roles are **not** exempt and **must** be in a group mapped to a role, or they will be removed when SCIM group mappings are enabled.

- The Primary Owner role cannot be assigned via SCIM group mappings. It can only be transferred manually from **[Organization settings > Members](https://claude.ai/admin-settings/members)**. Set your intended Primary Owner before enabling SCIM.

- The Primary Owner is not exempt from SSO sign-in enforcement. SSO enforcement is applied by email domain; if the Primary Owner's email is on an enforced domain, they must authenticate through SSO.

---

## Troubleshooting

### Users assigned correctly and showing in the directory but aren’t being added to the Claude as members?

Verify you have enough seats purchased and available to add members to your org.

1. Check the number of available seats shown in **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)** and purchase additional seats if needed (see our guides for **[Team plans](https://support.claude.com/en/articles/12004354-purchasing-and-managing-seats)** and **[Enterprise plans](https://support.claude.com/en/articles/13393991-purchasing-and-managing-seats-on-enterprise-plans)**).

2. Once you have available seats, go back to the Organization and access page and click “Sync now,” next to **Directory sync (SCIM)**. This will trigger a sync to provision accounts for those users not yet added as members.

### Users aren't being provisioned with the correct role

1. Verify the user is assigned to the correct group in your IdP.

2. Verify the group is mapped to the correct role in your **Organization and access** settings.

3. **For JIT:** The user needs to log out and log back in for role changes to take effect.

4. **For SCIM:** Click "Sync" to prompt an immediate sync, or wait for the automatic sync cycle:



### I lost Admin/Owner access after enabling group mappings

This happens when the person configuring group mappings isn't assigned to a group mapped to an Admin or Owner role, causing their permissions to be downgraded to User.

To fix this:

**Option 1: Have another Admin/Owner reinstate your role**

1. Contact another Admin or Owner of your organization.

2. Ask them to navigate to **[Organization settings > Organization](https://claude.ai/admin-settings/organization)** (for Claude) or **[Settings > Members](https://platform.claude.com/settings/members)** (for Console).

3. Have them change your role back to Admin or Owner.

**Option 2: Fix via your Identity Provider**

1. In your IdP, assign yourself to a group with the correct prefix that maps to an Admin or Owner role.

2. **For JIT:** Log out and log back in to regain access.

3. **For SCIM:** Ask another Admin or Owner to click "Sync" in the **Organization and access** settings, or wait for the automatic sync cycle.
---

SOURCE: https://support.claude.com/en/articles/13346720-export-your-organization-s-data

# Export your organization's data

Organization data exports are only available to Team and Enterprise plan Primary Owners. Data exports include conversation data and the user data for your account. Individual members of Team and Enterprise organizations do not have a self-serve export option.

If you're an individual Claude user on a Free, Pro, or Max plan looking to export your data, see **[Export your Claude data](https://support.claude.com/en/articles/9450526)**.

Primary Owners of Team and Enterprise plans can export organization data from **[Organization settings > Data and privacy](https://claude.ai/admin-settings/data-privacy-controls)** on the web app or Claude Desktop.

Follow these steps to export your organization's data:

1. Click on your initials in the lower left corner of your account.

2. Select "Organization settings" from the menu.

3. Click "Data and privacy" to open that section.

4. Click on the "Export Data" button.

Once the export has been processed, you will receive a download link via email.

**Important:** Messages, files, and projects deleted from your account, either manually by individual users or via enterprise retention settings, will not be included in data exports initiated after the deletion.

Please note:

- There may be a small delay while the export is generated.

- The email will be sent to the address associated with your account.

- You must be signed in to your account to download your data using this link.

- The download link will expire 24 hours after delivery.

- If your link expires, you can always request a new one by repeating the export process.

If you're an Enterprise Primary Owner looking to export audit logs, see **[How to access audit logs](https://support.claude.com/en/articles/9970975-how-to-access-audit-logs)**.
---

SOURCE: https://support.claude.com/en/articles/13566435-find-and-join-a-team-or-enterprise-organization

# Find and join a Team or Enterprise organization

Organization discovery allows you to find and join your company's existing Team or Enterprise plan organization when you start the sign-up flow with a work email address. Instead of creating a separate personal account, you can request to join—or be added automatically—depending on your organization's configuration.

Organization discovery must be enabled by an admin before the capability is available. It’s unavailable for organizations that have **[single sign-on (SSO) enabled](https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso)**. If your organization uses SSO, your existing provisioning settings remain in effect.

---

## Admin setup

### Enable discoverability

Admins and above can manage organization discovery from **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

- **New organizations:**

  - **Team plans:** Discoverability is on by default. Admins see the option during plan onboarding with it pre-selected.

  - **Enterprise plans:** Discoverability is off by default. Admins will see the option disabled on the Organization and access page.

- **Existing organizations:** Discoverability is off by default. Admins can turn it on from settings at any time.

To enable discoverability:

1. Log in as an Admin, Owner, Primary Owner.

2. Navigate to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

3. Your organization’s domains are listed at the top of the page.

4. Find the domain you want users to search for and click the toggle under **Discoverable**.

5. Find **New member approval** under **User provisioning** and choose either “Approve automatically” or “Require admin approval.”

### Configure allowed domains

Admins can specify which email domains are allowed to discover and join the organization by clicking “+ Add domain” under **Domains** on the organization and access page. The organization owner’s domain will appear on the **Domains** list automatically, but admins can configure additional allowed domains by adding them here, verifying them, and toggling **Discoverable** on. Personal email domains (like Gmail) and .edu domains can't be added to the allowed list.

### Choose an approval mode

Admins select how join requests are handled:

**Approve automatically:** Users are added to the organization’s lowest available seat tier automatically when they ask to join. Billing begins as soon as a user joins—if the organization has no available seats, billing auto-expands and a new seat is purchased immediately.

**Require admin approval:** The admin reviews and approves each join request individually. Users aren't added to the organization until the admin approves. Billing begins when the request is approved—if no seats are available at that point, a new seat is purchased.

This approval mode also applies to invitations sent by existing members of your organization. For additional details, see **[Manage members on Team and Enterprise plans](https://support.claude.com/en/articles/13133750-managing-members-on-team-and-enterprise-plans)**.

---

## How to find and join an organization

When someone signs up for Claude with a work email address that matches a discoverable organization, they'll see the option to join during the signup flow. They can choose to join or continue with a personal account.

- If the organization uses **instant approval**, they're added right away.

- If the organization uses **request + approve**, a request is sent to the admin. The requester can choose to continue with a personal account (as long as "Restrict organization creation" is disabled) until the request is approved or denied.

If multiple organizations share the same email domain and are all discoverable, users will see all of them and can choose which one to join. You can be a member of multiple Team or Enterprise organizations at the same time.

---

## Join when you already have a personal Claude account

If you have a Free, Pro, or Max account on the same email address as the organization you're joining, you can choose what to do with it:

- **Keep both accounts.** Your personal account stays active, and you switch between it and your organization account from your account menu.

- **Use your organization account only.** Your personal account closes. You choose whether to bring your data with you or delete it.

Some things don't move either way, including custom skills and your connected apps. Before you choose, review **[Move your personal Claude account to a Team or Enterprise organization](https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization)**.

On Team plans, you're prompted when you accept the invite. On Team and Enterprise plans, you can start the migration from **[Settings > Account](https://claude.ai/settings/account)** at any time after joining. Start from your organization account rather than your personal one—if you're signed in to the personal account, switch first by clicking your initials or name in the lower left corner.

---

## Other ways to join an organization

In addition to organization discovery, there are a few other ways to join a Team or Enterprise organization:

- **Invite link:** Your admin may share an invite link that lets you join directly. See **[Join an organization via invite link](https://support.claude.com/en/articles/13776697-join-an-organization-via-invite-link#h_af9f6b7825)**.

  - **Note:** If the invite link has been disabled or regenerated by your admin, it will no longer work. Ask your admin to share a new link.

- **Email invitation:** An admin or existing member of the organization may send you an email invitation to join.

- **Admin invitation:** An admin can add you directly from admin settings. See **[Manage members on Team and Enterprise plans](https://support.claude.com/en/articles/13133750-managing-members-on-team-and-enterprise-plans)**.

---

## SSO and organization discovery

Organization discovery is not available for organizations with single sign-on enabled. If your organization uses SSO, the feature doesn't apply—your existing provisioning settings (including any just-in-time provisioning) remain unchanged.

If you'd like to enable organization discovery, SSO must be turned off first.
---

SOURCE: https://support.claude.com/en/articles/13776697-join-an-organization-via-invite-link

# Join an organization via invite link

Admins on Team and Enterprise plans can share an invite link that lets teammates join the organization directly—without requiring individual email invitations.

## For admins: Set up and share an invite link

### Who can manage invite links

Admins and above can generate, copy, disable, and regenerate the invite link for their organization.

### Availability

- **Team plans:** Invite links are enabled by default for new organizations.

- **Enterprise plans (non-SSO):** Invite links are disabled by default. Admins can enable them from **[Organization settings > Identity and access](http://claude.ai/admin-settings/identity)**.

- **SSO organizations:** Invite links are not available. Member provisioning is managed through your Identity Provider.

### Find and share your invite link

1. Navigate to **[Organization settings > Identity and access](http://claude.ai/admin-settings/identity)**.

2. Find **Invite link** in the **Global access settings** section.

3. Click the button to the right of the link to copy it.

4. Share the link with the teammates you'd like to add—for example, in a Slack channel, email thread, or team wiki.

**Important:** Invite links expire automatically 90 days after creation, so you’ll need to regenerate the link when this happens so prospective members can use it.

### Manage your invite link

| **Action**          | **What it does**                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------- |
| Disable the link    | Immediately invalidates all existing links. No one can join via link until it's re-enabled. |
| Regenerate the link | Creates a new link and immediately invalidates the previous one.                            |

### How seat assignment works

Members who join via link are assigned to the lowest available seat tier. If no seats are available, a standard seat is created automatically.

### Security

Invite link joins respect your organization's existing security controls:

- **Allowed domains:** Only users with an email address on your organization's **[allowed domains list](https://support.claude.com/en/articles/13325567-account-management-faqs#h_b54c41c86c)** can join. Anyone else will see an error.

- **Seat limits:** If your organization has reached its seat limit, link joiners will see an error prompting them to contact their admin.

**Note:** Members who join via invite link are always added automatically, regardless of your organization's new member approval setting. If you need to review members before they join, share individual email invitations instead of the invite link.

---

## For members: Join via an invite link

1. Click the invite link your admin shared.

2. If you're not already logged in, you'll be prompted to sign up or log in.

3. After authenticating, your email domain will be checked against your organization's allowed domains.

  - If your domain matches, you can proceed to join.

  - If your domain doesn't match, you'll see an error. Contact your admin if you believe this is incorrect.

4. After your domain is verified, you'll be added to the organization automatically and assigned to the lowest available seat tier.

If you're already a member of the organization, you'll be redirected to the chat interface automatically.

**Note:** If the link has been disabled or regenerated by your admin, it will no longer work. Ask your admin to share a new link.
---

SOURCE: https://support.claude.com/en/articles/13779868-migrate-your-organization-from-team-to-enterprise

# Migrate your organization from Team to Enterprise

When upgrading from a Team plan to an Enterprise plan, we recommend you keep the same Team organization and follow the upgrade path to change it to Enterprise. This will allow you to preserve your data (memberships/roles, conversations, and projects) and some of the settings from your Team plan organization. If you create a brand new Enterprise organization, then you'll need to set up everything from scratch.

There are two ways to upgrade: upgrade using the self-serve flow, or follow the sales-assisted flow if you’re working with an Anthropic account executive on an invoiced or contracted agreement. The steps and timing differ, so use the section that matches your situation.

## What's retained (same organization upgrade)

- All chat history and conversations

- Projects and shared content

- User memberships and roles

## Before you migrate

If you previously set a spend limit on your Team plan, consider increasing it before your go-live date so users aren’t locked out. Once the org-level spend limit is reached, all users lose access immediately until the spend limit is raised or the new month begins.

## Migrate from Team to self-serve Enterprise

You can migrate from a Team plan to a self-serve Enterprise plan by following these steps:

1. Navigate to **[claude.ai/upgrade](https://claude.ai/upgrade)** and click "Get Enterprise plan."

2. When prompted, choose "Upgrade an existing organization" and select your Team plan organization.

3. Add the number of seats needed for all your team members (Enterprise organizations have a 20 seat minimum).

4. Set a per-user spend limit and a starting usage balance for the whole team.

5. Your payment information will be saved from previous Team plan payments, but you can click the pencil icon to change it if needed.

  1. When you migrate from a Team to a self-serve Enterprise plan, we only support credit card payments. After you migrate to a self-serve Enterprise plan, you can choose to use a credit card, debit card, or bank transfer. For more information, see **[Self-serve vs. sales-assisted Enterprise](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan#h_3058c781c5)**.

6. Review your order summary and click "Confirm upgrade."

**Important:** Migrating an organization from Team to Enterprise via this pathway is not reversible. Please ensure that an Enterprise plan is the right fit for your organization before initiating this change.

## Migrate from Team to sales-assisted Enterprise

You can migrate from a Team plan to a sales-assisted Enterprise plan through the Anthropic **[sales team](https://claude.com/contact-sales?utm_source=support&utm_medium=article&utm_content=enterprise-plan_contact-sales_intro)**. If your organization is migrating to a sales-assisted Enterprise plan, review the following before your go-live date:

- **Plan your activation timing:** Work with your account executive to agree on a go-live time before your contract is countersigned. Once your agreement is countersigned, your organization is provisioned on your contracted start date. Activation may not complete until later that day, so plan your internal rollout for the next business morning to avoid disruption mid-workday.

- **Expect a brief disruption at cutover:** Your users won’t be able to access Claude while provisioning is in progress. After the migration is complete, all users, including admins and standard users, should log out and log back in to refresh their session and clear any cached legacy settings.

## After you migrate

After your self-serve or sales-assisted migration is complete, we recommend reviewing the following settings.

### Capabilities

Some features that are turned on by default on Team plans may be turned off by default on Enterprise plans, so it's worth checking that your configuration matches your preferences.

Your underlying data is preserved even when a capability is turned off. For example, if your Team plan had skills enabled and members had created custom skills, those skills are not deleted during the migration—they're retained in your organization. When an admin re-enables skills on the Enterprise plan, any previously created custom skills will be available again. The same applies to other default-off capabilities: turning the setting back on restores access to existing content rather than starting from scratch.

The following capabilities are default-off for Enterprise plans:

- Skills and by dependency, Skill creation and Skill sharing (both public and within the organization)

- Code execution and file creation

- Interactive content in artifacts

- Claude Design

- Claude in Chrome

### Per-user spend limits

Go to **[Organization settings > Usage](https://claude.ai/admin-settings/usage)** and review per-user spend limits for all members. Clear or adjust any that are no longer appropriate for your Enterprise plan configuration.

### Seat assignments

During migration, some users may appear as **No seat assigned** rather than being automatically mapped to seat tiers. Admins should verify all users have correct seat assignments after the cutover. Pay attention to your highest-usage members, and note that users without a seat won't have access until an admin corrects their seat assignment.

For detailed guidance, refer to **[Purchase and manage seats on Enterprise plans](https://support.claude.com/en/articles/13393991)**.

### Role-based access controls

After migrating your organization from a Team plan to an Enterprise plan, an Owner or Primary Owner can follow the instructions to configure custom roles, groups, and group spend limits: **[Set up role-based permissions on Enterprise plans](https://support.claude.com/en/articles/13930458-set-up-role-based-permissions-on-enterprise-plans)**.

Read more about groups, group spend limits, and custom roles:

- **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**

- **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**

---

## Additional information

### SSO and identity setup timeline

- **Domain verification (DNS):** Allow 24–48 hours for DNS changes to propagate globally, though many changes take effect within 10 minutes.

- **SCIM provisioning sync:** Microsoft Entra ID pushes changes approximately every 40 minutes. Okta syncs more frequently.

For detailed setup instructions, refer to **[Set up single sign-on (SSO)](https://support.claude.com/en/articles/13132885)** and **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195).**

**Note:** Once you turn on SSO, existing users will be forced to log out and log back in.

### Billing and usage configuration

For usage-based Enterprise plans, usage is billed based on actual consumption. For more detailed information, refer to **[How am I billed for my Enterprise plan?](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan)**

If you had purchased usage credits for your Team plan, any unused balance will roll over and become available on your new usage-based Enterprise plan.

### Provisioning process

On the start date, you'll be provisioned and able to use the new features by the end of the day. After initial setup, Owners and Primary Owners can self-serve additional seats by navigating to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)** and clicking "Manage" under **Total seats**.

---

## Helpful resources

- **[Set up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso)**

- **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning)**

- **[Purchase and manage seats on Enterprise plans](https://support.claude.com/en/articles/13393991-purchase-and-manage-seats-on-enterprise-plans)**

- **[Manage members on Team and Enterprise plans](https://support.claude.com/en/articles/13133750-manage-members-on-team-and-enterprise-plans)**

- **[Enterprise billing information](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan)**

- **[Use Claude Code with your Team or Enterprise plan](https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan)**
---

SOURCE: https://support.claude.com/en/articles/13837433-manage-plugins-for-your-organization

# Manage plugins for your organization

Plugin marketplaces let Team and Enterprise plan owners distribute curated plugins to everyone in their organization. You create a marketplace, add plugins to it, and control exactly which plugins your team members can see and use. Plugins you distribute appear in both chat (on the web and the Chat tab in Claude Desktop) and Claude Cowork.

Owners and Primary Owners of Team and Enterprise plans can manage organization plugins in **[Organization settings > Plugins](https://claude.ai/admin-settings/plugins)**.

**Requirements:** Cowork and Skills must both be enabled for your organization before you can use plugin marketplaces.

---

## Use Anthropic-built marketplaces

Anthropic provides built-in marketplaces of plugins for different functions, such as legal and finance. A Knowledge Work marketplace is added to your organization by default.

To add an Anthropic-built marketplace:

1. Go to **[Organization settings > Plugins](https://claude.ai/admin-settings/plugins)**.

2. Click "Add plugins."

3. Select "Browse Anthropic sources."

4. Click "Add" on each one you want to appear for everyone in your organization.

To remove the Knowledge Work marketplace if it isn't relevant to your teams:

1. Go to **[Organization settings > Plugins](https://claude.ai/admin-settings/plugins)**.

2. Find **Knowledge Work**.

3. Click the menu button in the upper right corner.

4. Select "Remove."

Anthropic-built marketplaces show readable names, like "Knowledge Work," instead of the underlying repository slug.

---

## Create your own marketplace

Beyond the Anthropic-built marketplaces, you can create your own. There are two ways to add plugins to a marketplace you create:

- **Manual upload:** Upload individual plugin ZIP files through the admin UI. Best for quick iteration, one-off tools, or teams that don't use GitHub for plugin development.

- **GitHub syncing:** Connect a private GitHub repository and Cowork automatically syncs plugins from it. Best when multiple developers collaborate on plugins or you want version-controlled updates.

You can use both approaches in parallel. For example, run a GitHub-synced marketplace for your core plugins and a separate manual marketplace for ad-hoc tools.

### Set up a manual marketplace

1. Go to **[Organization settings > Plugins](https://claude.ai/admin-settings/plugins)**.

2. Click "Add plugins" and select "Upload a file" as the source.

3. If this is your first time setting up a marketplace, "Upload to a new marketplace" is auto-selected. You'll be able to choose "Add to an existing marketplace" when uploading plugins later.

4. Enter a name for your marketplace.

5. Either drag your files in, or click the upload prompt and select your file. The file must be a valid .zip under 50 MB.

6. Repeat for each plugin you want to add.

7. Click "Upload" to add your plugins to a new marketplace.

If you upload a plugin with the same name as an existing one, it overwrites the previous version automatically. You don't need to delete the old one first.

### Set up a GitHub-synced marketplace

GitHub syncing lets you manage plugins as code in a repository. When you push changes, you can trigger a sync to update your marketplace, either manually or automatically.

**Prepare your repository**

Your repository must be **private or internal**—public repos aren't allowed for organization marketplaces. You can connect a repo hosted on github.com or on a self-hosted GitHub Enterprise Server instance.

GitHub-synced marketplaces support a narrower set of `source` types in `marketplace.json` than the Claude Code CLI does. Relative paths to plugin folders inside the connected repository (for example, `"source": "./plugins/my-plugin"`) are fully supported. The `github`, `url`, and `git-subdir` source types are supported only when the target repository is public. The `npm` and `pip` source types are not supported. If your plugin code lives in separate private repositories, copy those plugin folders into the marketplace repository (a git submodule, git subtree, or a CI step works well) and reference them with relative paths.

For details on plugin structure and formatting, see the **[plugin reference documentation](https://code.claude.com/docs/en/plugins-reference)**.

Additional resources:

- **[Create and distribute a plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces)**

- **[Create plugins](https://code.claude.com/docs/en/plugins)**

- **[Creating a new GitHub repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)**

**Connect the repository**

1. Make sure both Cowork and Skills are enabled for your organization.

  1. **[Enable Cowork](https://support.claude.com/en/articles/13455879-use-cowork-on-team-and-enterprise-plans#h_71cdc52dfc)**

  2. **[Enable Skills](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization#h_7673241237)**

2. Go to **[Organization settings > Plugins](https://claude.ai/admin-settings/plugins)**.

3. Click "Add plugin" and select "GitHub" as the source.

4. Enter the repository in `owner/repo` format (for example, `acme-corp/claude-plugins`).

Your personal GitHub token is verified to confirm you have access, then Cowork uses its GitHub App installation token for sync operations.

**Can't see your repo?** Make sure the Claude GitHub App is installed in that repository.

**How syncing works**

An initial sync runs automatically when you connect a repository. After that, organization owners can opt-in to continued automatic updates per marketplace by going to **[Organization settings > Plugins](https://claude.ai/admin-settings/plugins)**, clicking the menu button in the upper right corner of the marketplace, then toggling "Sync automatically" on:



Enabling automatic sync creates a webhook on the connected repository. The person turning the toggle on must have admin-level access to that repository on GitHub. This is checked through their personal GitHub connection, which is separate from the Claude GitHub App installation. Without admin access, the page shows "Cannot access repository. Ensure the repository exists and the Claude GitHub App is installed," even when the App is installed correctly and manual updates work.

The Claude GitHub App's **Webhooks (Read & Write)** permission must also be approved on the installation. On installations created before this permission was introduced, GitHub shows a "Claude is requesting updated permissions" prompt that a repository or organization admin needs to approve.

Once enabled, automatic sync runs when a pull request that includes a plugin version bump is merged to the repository's default branch. Direct pushes to the default branch don't trigger a sync. You can always trigger a sync manually by clicking "Update" on the marketplace.

During a sync, Cowork compares the latest commit in your repo against the last-synced commit. If nothing has changed, the sync is skipped. If there are changes, Cowork reads the manifest, validates each plugin, and replaces all plugins in the marketplace with the current state of the repo. Syncs can take up to 30 minutes depending on the number of plugins.

**Important:** If a sync fails, plugins may be temporarily removed for your team members. If this happens, check the failure message, fix the issue in your repo, push the update, and trigger the sync again. Once the sync succeeds, verify that your installation preferences are still set correctly, since they may have been reset during the failure.

### Choose between manual upload and GitHub sync

| **Scenario**                                         | **Recommended approach** |
| ---------------------------------------------------- | ------------------------ |
| Plugins are maintained in version control with CI/CD | GitHub sync              |
| Multiple developers collaborate on plugins           | GitHub sync              |
| You want automatic update propagation                | GitHub sync              |
| You need more than 100 plugins in a marketplace      | GitHub sync              |
| Quick prototyping or one-off tools                   | Manual upload            |
| Plugins built by non-engineering teams               | Manual upload            |
| Environments without GitHub access                   | Manual upload            |
| Testing a plugin before adding it to a synced repo   | Manual upload            |

---

## Control plugin distribution

Once your marketplace has plugins, you control how they're distributed using installation preferences. For each plugin, you can set one of four options:

| **Preference**        | **What it does**                                                            | **What members see**                                                                                 |
| --------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Installed by default  | Automatically installed for all org members                                 | The plugin appears in their installed list without any action. Members can uninstall if they choose. |
| Available for install | Listed in the plugin catalog                                                | Members see it when browsing plugins and can install it themselves.                                  |
| Not available         | Hidden from the catalog entirely                                            | Members can't see or install the plugin. Useful for staging or deprecating plugins.                  |
| Required              | Automatically installed for all org members without the option to remove it | The plugin appears in their installed list without any action and cannot be disabled or uninstalled. |

### Set preferences

1. In **[Organization settings > Plugins](https://claude.ai/admin-settings/plugins)**, navigate to your marketplace.

2. Select the installation preference for each plugin.

3. Changes take effect on each member's next session or plugin refresh.

### What members experience

Members browse available plugins through the **Browse plugins** modal. Auto-installed plugins appear in their installed list automatically. Available plugins show up in the catalog for self-service installation.

Members can't edit organization-managed plugins, which prevents conflicting changes to shared tooling.

---

## Customize plugin access by group

Enterprise admins can override a plugin's organization-wide installation preference for specific groups. For example, you can auto-install a plugin for the Engineering group, make it available for Legal to install on their own, and hide it from everyone else.

Group-level plugin access is available on Enterprise plans and configurable by Admins and above.

### How group overrides work

Each plugin in your marketplace has an organization-wide installation preference (Installed by default, Available for install, Required, or Not available). By default, every group inherits that organization-wide setting.

When you set a group-level override for a plugin, it replaces the org-wide setting for members of that group. The resolution order is: group setting, then org-wide setting, then marketplace default.

### Set plugin access for a group

1. In **[Organization settings > Plugins](https://claude.ai/admin-settings/plugins)**, navigate to your marketplace.

2. Find the plugin you want to customize.

3. In the **Custom access** column, click “Add groups.”

4. Select the group and choose one of the installation preferences listed above.

Both manually created groups and SCIM-provisioned groups from your identity provider appear in the group picker and work the same way.

### What happens when a member is in multiple groups

If a member belongs to two or more groups with different settings for the same plugin, the **most permissive** setting applies. The order from most to least permissive is: Required > Installed by default > Available for install > Not available.

For example, if Group A sets a plugin to "Not available" and Group B sets it to "Installed by default," a member in both groups gets the plugin installed by default.

**Note:** This differs from how group spend limits resolve. Spend limits apply either the higher or lower group value depending on your **Multi-group spend limit** setting. Plugin access applies the most permissive value, because groups here are meant to enable access for teams that need a tool, not to act as a security boundary. If you need to hard-block a plugin, set its org-wide preference to "Not available" and only grant access to the groups that should have it.

### What happens when a group is deleted

If a group is removed (for example, deleted from your identity provider), the override remains in the admin UI but is flagged as orphaned. It has no effect on members (since no one belongs to a deleted group) and doesn't count toward the custom access badge. You can clear orphaned overrides from the plugin's custom access settings.

### Do group settings persist across marketplace re-syncs?

Yes. Group-level overrides persist when you re-sync a GitHub-connected marketplace. They're only removed if the plugin itself is deleted from the marketplace.

---

## Update and remove plugins

### Manual marketplaces

To update a plugin, upload a new ZIP file with the same plugin name. The new version overwrites the existing one automatically. Plugin names are the unique identifier, so `legal` will always replace `legal`.

To remove a plugin, delete it from your marketplace in **[Organization settings > Plugins](https://claude.ai/admin-settings/plugins)**.

### GitHub-synced marketplaces

Push your changes to the connected repository, then go to **[Organization settings > Plugins](https://claude.ai/admin-settings/plugins)**, find your marketplace, and click "Update" to trigger a sync. Each sync replaces all plugins with the current state of the repo. If an owner has enabled "Sync automatically" for the marketplace, a sync also runs whenever a pull request with a plugin version bump is merged to the repository's default branch.

To remove a plugin, delete it from the repository and trigger a sync.

---

## Limits

| **Limit**                                 | **Value**                | **Notes**                                                                        |
| ----------------------------------------- | ------------------------ | -------------------------------------------------------------------------------- |
| Max plugin ZIP size (upload)              | 50 MB                    | Enforced both client-side and server-side                                        |
| Max plugins per marketplace (manual)      | 100                      | Per marketplace                                                                  |
| Max plugins per marketplace (GitHub sync) | 500                      | Per marketplace                                                                  |
| Max plugin name length                    | 64 characters            | Must use lowercase words separated by hyphens                                    |
| Sync timeout                              | 30 minutes               | Per sync operation                                                               |
| GitHub repo visibility                    | Private or internal only | Hosted on github.com or GitHub Enterprise Server. Public repos aren't supported. |

---

## Naming rules

Plugin names must use **lowercase words separated by hyphens** (for example, `deployment-tools`, not `Deployment Tools`). The following marketplace names are reserved and can't be used:

- `claude-code-marketplace`

- `claude-code-plugins`

- `claude-plugins-official`

- `anthropic-marketplace`

- `anthropic-plugins`

- `agent-skills`

- `life-sciences`

Names that impersonate official Anthropic marketplaces are also blocked.

**Note:** Plugin authors can set a `displayName` so a plugin shows a readable name in the catalog instead of its slug. If an author doesn't set one, the plugin shows its slug (for example, `deployment-tools`).

---

## Troubleshooting

### Upload rejected

Common causes: the file exceeds 50 MB, it isn't a valid ZIP file, or the marketplace has reached the 100-plugin limit. Check the file size and format, and remove unused plugins if you're at capacity.

### Plugin not appearing for members

Check the plugin's installation preference in your marketplace settings. If it's set to **Not available**, members won't see it. Also confirm that Cowork and Skills are both enabled for your organization.

### Updated plugin not reflecting for members

Changes take effect on each member's next session or plugin refresh. If the update still isn't showing, confirm the upload succeeded by checking the plugin version in your marketplace.

### GitHub sync fails with a content error

One or more plugins in your repo is likely formatted incorrectly. Fix the formatting issue, push the update to GitHub, and trigger the sync again. For plugin structure requirements, see the **[plugin reference documentation](https://code.claude.com/docs/en/plugins-reference)**.

### Sync fails with "External plugin sources are not yet supported," or plugins are skipped with "Repository not found on github.com. Check the URL and make sure the repository is public."

One or more plugin entries in your `marketplace.json` use a `source` that points outside the connected repository (a `github`, `url`, or `git-subdir` source), and the target repository is private. The organization sync can currently only fetch external sources from public repositories. Move the plugin folders into the marketplace repository and change each entry's `source` to a relative path (for example, `"./plugins/my-plugin"`), then push and re-sync. Alternatively, upload the affected plugins individually via **Customize > Add plugin > Create plugin > Upload plugin**.

### Plugins disappeared after a failed sync

A failed GitHub sync can temporarily remove plugins from your marketplace. Fix the underlying issue, re-sync successfully, then verify that installation preferences are set correctly, since they may have been reset.

### Can't see a GitHub repo when connecting

Make sure the Claude GitHub App is installed in that repository. Your personal GitHub token is checked first to confirm access, but the sync itself uses the GitHub App installation token.

### "Cannot access repository" when turning on "Sync automatically"

If manual updates work but turning on "Sync automatically" shows "Cannot access repository. Ensure the repository exists and the Claude GitHub App is installed," there are two likely causes:

- **You don't have admin access to the repository.** Turning on automatic sync creates a webhook, which requires admin-level access to the repo through your personal GitHub connection. Ask a repository admin to enable the toggle, or have your GitHub access upgraded.

- **The Claude GitHub App's Webhooks permission hasn't been approved.** On older installations, GitHub shows a "Claude is requesting updated permissions" prompt. A repository or organization admin needs to approve the **Webhooks (Read & Write)** permission on the installation.
---

SOURCE: https://support.claude.com/en/articles/13917829-microsoft-entra-id-sso-scim-email-mismatch

# Microsoft Entra ID SSO/SCIM email mismatch

Claude uses email as the primary identifier to match SSO logins to provisioned seats. In Microsoft Entra ID, SCIM provisioning and SSO authentication are configured in *separate places* and can pull email from different user attributes—causing a mismatch that blocks access. This guide walks through how to identify the problem, fix the attribute mapping, and clean up any side effects.

**Applies to:** Enterprise plans and Console organizations using SCIM provisioning. Team plans don't have SCIM provisioning, so this mismatch scenario doesn't apply — see **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)** for what's available on each plan.

---

## Symptoms

People may experience one or more of the following when attempting to access your organization via SSO:

- **"Account creation is blocked"** — The person authenticates via SSO but Claude cannot find a matching provisioned account. If organization creation is restricted (recommended), the person is blocked entirely.

- **Landing on a free personal account** — If organization creation is not restricted, the person bypasses your organization and creates or lands on a free personal account.

- **"Please confirm your email" mismatch** — The SSO callback shows a different email than the one the person entered at login.

- **Claude Code authentication failure** — The Claude Code CLI shows an email mismatch error during the authentication flow.

---

## How this happens

Microsoft Entra ID user accounts have multiple email-like attributes that can hold *different values*. SCIM provisioning and SSO authentication are configured in separate admin areas and each can pull from a different attribute:

| **Entra attribute** | **Typical value**                                   | **Commonly used by**            |
| ------------------- | --------------------------------------------------- | ------------------------------- |
| `userPrincipalName` | `testuser1@example.com` (may be employee ID format) | Default SCIM userName mapping   |
| `mail`              | `test.user.one@example.com` (standard email)        | OIDC / SAML email claim         |
| `proxyAddresses`    | `SMTP:test.user.one@example.com`                    | Exchange / M365 primary address |
| `otherMails`        | May contain aliases or secondary addresses          | Alternative contact emails      |

The mismatch occurs when SCIM pulls email from one attribute while SSO sends the email from another. Even a subtle difference blocks access—Claude requires an **exact string match**.

**Common confusion:** Entra has two separate admin areas. The **SCIM provisioning app** lives under **Enterprise applications** (Microsoft's term for integrated apps—unrelated to your Claude plan). The **SSO/OIDC app** lives under **App registrations**. IT admins frequently navigate to the wrong location.

---

## Diagnostic steps

### Step 1 — Confirm the mismatch

1. **Check the SCIM email:** In Entra Admin Center → **Enterprise applications → [Claude SCIM app] → Provisioning → Provisioning logs**, find a recently provisioned person and inspect **Modified attributes**. The value mapped to emails[type eq "work"].value is what SCIM sent to Claude.

2. **Check the SSO email:** In **Enterprise applications → [Claude app] → Single sign-on → Attributes & Claims**, find the email claim. For OIDC apps, check **App registrations → [Claude app] → Token configuration**.

3. If the two source attributes point to **different fields**, you've confirmed the mismatch.

### Step 2 — Identify the scope

- If **most or all** provisioned people share the same format mismatch, this is a **systemic attribute mapping problem**. The fix is in the SCIM attribute mapping config.

- If only **one or two people** are affected, check their user profile directly in Entra.

### Step 3 — Check the OIDC token claims (OIDC apps only)

1. In Entra Admin Center, go to **App registrations** (not Enterprise applications).

2. Find the Claude OIDC app and click "Token configuration."

3. Check the email optional claim.

4. Cross-reference with your SCIM attribute mapping to confirm whether they match.

---

## Resolution

### Fix the SCIM attribute mapping

Navigate to the **SCIM provisioning app** — not the SSO/OIDC app:

1. Go to **Entra Admin Center → Enterprise applications**.

2. Search for the Claude SCIM app. Look for the app with a **Provisioning** section.

3. Click **Provisioning → Edit provisioning → Attribute mappings**.

4. Find the row where the SCIM attribute is emails[type eq "work"].value. Click it to edit.

5. Change the **Source attribute** to match what SSO sends — typically mail.

6. Also check the userName mapping and update if needed.

7. Click "Save."

### Trigger a full provisioning sync

**Full sync required — incremental won't work.** You must trigger a **full restart** of the provisioning cycle.

1. Go to the **Provisioning** overview page.

2. Click **Restart provisioning**.

3. Wait for the sync to complete.

4. Verify in provisioning logs that emails have updated to the correct format.

---

## Post-fix cleanup

After correcting the attribute mapping and completing the full sync:

- **Rogue free accounts:** If organization creation wasn't restricted before the fix, some people may have created free personal Claude accounts. Contact **[our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)** for removal.

- **Ghost accounts (wrong-email seats):** The originally provisioned accounts with the incorrect email may still exist in your organization, occupying seats that can never be used. Contact our Support team to deprovision these.

- **Seat availability:** If ghost accounts are occupying all contracted seats, new logins will fail with an out-of-seats error even after the mapping is fixed.

- **Re-adding affected people:** After ghost accounts are removed, people with the corrected email may need to be re-invited or re-provisioned.

- **Prevent future occurrences:** Enable "Restrict organization creation" in your organization's Identity and access settings.

---

## Verification

1. Check a sample of provisioned people—confirm their email in the provisioning log matches the email format that SSO sends.

2. Ask an affected person to clear browser cookies for claude.ai, then log in via SSO. They should land directly in your organization's workspace.

3. Confirm people aren't creating free accounts—with organization creation restricted, blocked people see a clear error instead of landing on a personal account.

4. If Claude Code was affected, have the person re-run `claude auth login --enterprise` and confirm the email matches their provisioned seat.

---

## Common issues

| **Issue**                                                      | **Solution**                                                                                                                                                                           |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SCIM mapping updated but SSO claim not checked (or vice versa) | Both must be updated. SCIM under **Enterprise applications → Provisioning**; SSO claims under **Single sign-on → Attributes & Claims** or **App registrations → Token configuration**. |
| userPrincipalName is in employee-ID format, not a real email   | Switch SCIM to use the mail attribute instead.                                                                                                                                         |
| Incremental sync runs but emails don't update                  | **Restart provisioning** is required after an attribute mapping change.                                                                                                                |
| OIDC app email claim not configured as an optional claim       | Add email under **App registrations → Token configuration**.                                                                                                                           |
| Emails updated but person still can't log in                   | Look for rogue free orgs or ghost accounts. Clear browser cookies and retry.                                                                                                           |

---

## When to contact Support

Contact **[our Support team](https://support.claude.com/en/articles/9015913)** with your organization's domain, the affected person's email, and attribute mapping screenshots when:

- SCIM and SSO attributes appear identical but people still cannot access their seats.

- You need confirmation of the email Claude recorded during SCIM provisioning for specific people.

- You need help cleaning up ghost accounts or rogue free orgs.

- People are hitting an out-of-seats error despite available contracted seats.
---

SOURCE: https://support.claude.com/en/articles/13917840-okta-sso-scim-email-mismatch

# Okta SSO/SCIM email mismatch

Claude uses email as the primary identifier to match SSO logins to provisioned seats. In Okta, SCIM provisioning and SSO are configured separately and can pull email from different user profile fields. This guide explains how to identify and resolve the mismatch.

**Applies to:** Enterprise plans and Console organizations using SCIM provisioning. Team plans don't have SCIM provisioning, so this mismatch scenario doesn't apply—see **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)** for what's available on each plan.

---

## Symptoms

People may experience one or more of the following when attempting to access your organization via SSO:

- **"Account creation is blocked"** — SSO authentication succeeds but Claude cannot locate a matching provisioned account. If your organization has organization creation restricted (recommended), the person is blocked entirely.

- **Landing on a free personal account** — If organization creation is not restricted, the person bypasses your organization entirely and creates or lands on a free personal account instead of their provisioned seat.

- **"Please confirm your email" mismatch** — The SSO callback shows a different email than the one the person entered at login.

- **Claude Code authentication failure** — The Claude Code CLI shows an email mismatch error during the authentication flow.

---

## How this happens

Okta user profiles contain multiple fields that represent identity. SCIM provisioning (under **Provisioning → To App**) and SAML/OIDC SSO (under **Sign On**) are configured independently.

| **Okta attribute** | **Typical value**                      | **Commonly used by**                            |
| ------------------ | -------------------------------------- | ----------------------------------------------- |
| `user.login`       | `testuser1` or <testuser1@example.com> | Default SCIM userName mapping; sometimes NameID |
| `user.email`       | <test.user.one@example.com>            | SAML/OIDC email claim (recommended)             |
| `appuser.email`    | App-level override of user email       | Custom app-level attribute mapping              |

A common mismatch: SCIM uses `user.login` while SAML sends `user.email`. Claude requires an exact string match.

**Common confusion:** Okta's SCIM attribute mappings and SAML attribute statements live in two different tabs — **Provisioning → To App** for SCIM, and **Sign On** for SSO.

---

## Diagnostic steps

### Step 1 — Confirm the mismatch

1. **Check SCIM email:** Navigate to **Applications → [Claude App] → Provisioning → To App → Attribute Mappings**. Locate the `email` (or `userName`) row. The **Value** column shows the Okta expression being sent.

2. **Check SSO email (SAML):** Go to **Applications → [Claude App] → Sign On → SAML Settings → Edit → Attribute Statements**. Find the `email` attribute. The **Value** column indicates which Okta field is asserted.

3. **Check SSO email (OIDC):** Go to **Applications → [Claude App] → Sign On → OpenID Connect ID Token** and review the **Claims** section for email.

4. If SCIM and SSO values reference different Okta fields, the mismatch is confirmed.

### Step 2 — Identify the scope of the problem

- **Most or all provisioned people affected:** This is a systemic attribute mapping problem. The fix is in your IdP's SCIM attribute mapping.

- **One or two people affected:** The issue is specific to those accounts. Check their user profile directly.

### Step 3 — Verify Okta user profiles directly

1. Go to **Directory → People → [User] → Profile**.

2. Compare the Login and Email field values. Differences between these fields will produce mapping mismatches.

---

## Resolution

### Align both mappings to the same Okta field

The safest fix is to use `user.email` for both SCIM and SSO, as this field contains the canonical email address in Okta.

1. **Update SCIM mapping:** In **Provisioning → To App → Attribute Mappings**, change the `email` (or `userName`) source to `user.email`.

2. **Update SSO claim (SAML):** In **Sign On → SAML Settings → Attribute Statements**, change the email attribute value to user.email.

3. **Update SSO claim (OIDC):** In **Sign On → OpenID Connect ID Token → Claims**, update the email claim to map to `user.email`.

4. Click “Save.”

### Force a full re-sync

**Critical — Full sync required:** An incremental sync will not update existing records after you change an attribute mapping.

1. In **Provisioning → To App**, click “Force Sync” to trigger a full re-evaluation of everyone assigned.

2. Alternatively, for specific people: **Provisioning → Push Users → select affected people → Push Now**.

3. Check Okta System Log (**Reports → System Log**) for provisioning errors.

4. Verify updated email values appear in provisioning logs before people retry login.

---

## Post-fix cleanup

After correcting the attribute mapping and completing the full sync:

- **Rogue free accounts:** If organization creation wasn't restricted before the fix, some people may have created free personal Claude accounts. Contact **[our Support team](https://support.claude.com/en/articles/9015913)** for removal.

- **Ghost accounts (wrong-email seats):** The originally provisioned accounts with the incorrect email may still exist in your organization, occupying seats that can never be used. Contact our Support team for deprovisioning.

- **Seat availability:** If ghost accounts are occupying all contracted seats, new logins will fail with an out-of-seats error even after the mapping is fixed.

- **Re-adding affected people:** After ghost account removal, people with the corrected email may need to be re-invited or re-provisioned.

- **Prevent future occurrences:** Enable "Restrict organization creation" in your organization's Identity and access settings to prevent unprovisioned people from creating free accounts.

---

## Verification

After completing the fix and any cleanup:

1. Check a sample of provisioned people—confirm their email in the provisioning log matches the email format that SSO sends.

2. Ask an affected person to clear browser cookies for claude.ai, then log in via SSO. They should land directly in your organization's workspace without error.

3. Confirm people aren't creating free accounts—with organization creation restricted, blocked people see a clear error instead of landing on a personal account.

4. If Claude Code was affected, have the person re-run `claude auth login --enterprise` and confirm the email matches their provisioned seat.

---

## Common issues

| **Issue**                                                                              | **Solution**                                                                                                        |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Admin updates SAML claims but forgets SCIM attribute mappings (or vice versa)          | Both must be updated. SCIM mappings under **Provisioning → To App**; SAML claims under **Sign On → SAML Settings**. |
| `user.login` contains a username (not email) for some people                           | Switch both to `user.email` and verify email fields are populated for everyone.                                     |
| Incremental sync runs but emails don't update                                          | **Force Sync** or **Push Users** is required after an attribute mapping change.                                     |
| App-level profile attribute (`appuser.email`) differs from user profile (`user.email`) | Check if app-level attribute mappings override user profile values.                                                 |
| Emails updated but person still can't log in                                           | Look for rogue free orgs or ghost accounts. Clear browser cookies and retry. Contact Support if it persists.        |
| OIDC and SAML apps are separate Okta apps for Claude                                   | Some organizations configure both. Ensure attribute alignment in both apps.                                         |

---

## When to contact Support

Contact **[our Support team](https://support.claude.com/en/articles/9015913)** with your organization's domain, the affected person's email, and attribute mapping screenshots when:

- SCIM and SSO attributes appear identical but people still cannot access their seats.

- You need confirmation of the email Claude recorded during SCIM provisioning for specific people.

- You need help cleaning up ghost accounts or rogue free organizations.

- People are hitting an out-of-seats error despite available contracted seats.
---

SOURCE: https://support.claude.com/en/articles/13917861-onelogin-sso-scim-email-mismatch

# OneLogin SSO/SCIM email mismatch

Claude uses email as the primary identifier to match SSO logins to provisioned seats. In OneLogin, SCIM provisioning and SAML SSO are configured in separate tabs of the app and can reference different user profile fields, causing a mismatch that blocks access.

**Applies to:** Enterprise plans and Console organizations using SCIM provisioning. Team plans don't have SCIM provisioning, so this mismatch scenario doesn't apply—see **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)** for what's available on each plan.

---

## Symptoms

People may experience one or more of the following when attempting to access your organization via SSO:

- **"Account creation is blocked"** — The person authenticates via SSO but Claude cannot find a matching provisioned account. If your organization has organization creation restricted (recommended), the person is blocked entirely.

- **Landing on a free personal account** — If organization creation is not restricted, the person bypasses your organization entirely and creates or lands on a free personal account instead of their provisioned seat.

- **"Please confirm your email" mismatch** — The SSO callback shows a different email than the one the person entered at login.

- **Claude Code authentication failure** — The Claude Code CLI shows an email mismatch error during the authentication flow.

---

## How this happens

OneLogin user profiles contain distinct fields for username and email, which may hold different values. SCIM provisioning parameters and SAML attribute statements are configured independently and can each pull from a different field:

| **OneLogin field** | **Typical value**                                         | **Commonly used by**                    |
| ------------------ | --------------------------------------------------------- | --------------------------------------- |
| `Username`         | `testuser1` or <testuser1@example.com>                    | Sometimes used in SCIM userName mapping |
| `Email`            | <test.user.one@example.com>                               | Recommended for both SCIM and SAML      |
| `Login Name`       | May differ from email if SSO is used for non-email logins | Legacy or custom configurations         |
| Custom user fields | Custom attributes defined per org                         | Advanced attribute mappings             |

A common mismatch: the SCIM parameters tab maps the email attribute to Username (which may be an employee ID or short name) while the SAML attribute statement sends the Email field. Claude requires an **exact string match**.

**Common confusion:** OneLogin's SCIM parameters and SAML attribute statements are in different tabs of the same app — **Parameters** for SCIM and **SSO** (or **Parameters** with SAML-specific fields) for SSO. Both must be checked and aligned.

---

## Diagnostic steps

## Step 1 — Confirm the mismatch

1. **Check the SCIM email:** In the OneLogin Admin portal, go to **Applications → [Claude app] → Parameters**. Find the field mapped to the email Claude receives. Note the **OneLogin value** column — this shows which user field is sent.

2. **Check the SAML email:** In the same app, go to the **SSO** tab. Click **More Actions → Edit SAML Response** or check the **SAML Attribute Statements** section. Find the attribute for email and note its source field.

3. **Check a specific person:** In **Users → [User]**, compare the **Username** and **Email** fields. If they differ, any mapping using one vs. the other will cause a mismatch.

## Step 2 — Identify the scope of the problem

- If **most or all** provisioned people share the same email format mismatch, this is a **systemic attribute mapping problem**. The fix is in your IdP's SCIM attribute mapping.

- If only **one or two people** are affected, the issue is likely specific to those accounts. Check their profile directly.

## Step 3 — Review user field values

1. Go to **Users → [Affected User] → User Info**.

2. Check both the **Username** and **Email** fields.

3. If Username is in a format that doesn't match a valid email, SCIM may be sending an invalid or non-matching value.

---

## Resolution

## Align both mappings to the Email field

OneLogin's Email field is the most reliable source for both SCIM and SAML, as it's designed to hold a valid email address.

1. **Update SCIM parameter:** In **Applications → [Claude app] → Parameters**, find the row for the email attribute Claude receives. Change the **Value** to **Email** (the OneLogin Email field).

2. **Update SAML attribute statement:** In the **SSO** tab (or **Parameters** for SAML attributes), update the email attribute value to use the same **Email** field.

3. Click "Save."

## Trigger a full re-sync

**Critical — Full sync required:** An incremental sync will *not* update existing records after you change an attribute mapping. You must trigger a **full restart** of the provisioning cycle.

1. In the app's **Provisioning** tab, look for a **Re-sync** or **Sync All** option and run it.

2. To reprovision individual people: Go to **Users → [User] → Applications**, find the Claude app, and use **Re-provision**.

3. Check the OneLogin provisioning activity log for errors.

4. Verify updated email values appear in the log before asking people to retry login.

---

## Post-fix cleanup

After correcting the attribute mapping and completing the full sync:

- **Rogue free accounts:** If organization creation was not restricted before the fix, some people may have inadvertently created free personal Claude accounts. Contact **[our Support team](https://support.claude.com/en/articles/9015913)** to have these removed.

- **Ghost accounts (wrong-email seats):** The originally provisioned accounts with the incorrect email may still exist in your organization, occupying seats that can never be used. Contact our Support team to deprovision these.

- **Seat availability:** If ghost accounts are occupying all contracted seats, new logins will fail with an out-of-seats error even after the mapping is fixed.

- **Re-adding affected people:** After ghost accounts are removed, people with the corrected email may need to be re-invited or re-provisioned.

- **Prevent future occurrences:** Enable "Restrict organization creation" in your organization's Identity and access settings.

---

## Verification

1. Check a sample of provisioned people—confirm their email in the provisioning log matches the email format that SSO sends.

2. Ask an affected person to clear browser cookies for claude.ai, then log in via SSO.

3. Confirm people aren't creating free accounts.

4. If Claude Code was affected, have the person re-run `claude auth login --enterprise` and confirm the email matches their provisioned seat.

---

## Common issues

| **Issue**                                                      | **Solution**                                                                                  |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Username field holds a short name or employee ID, not an email | Switch SCIM to use the **Email** field.                                                       |
| SAML attributes updated but SCIM parameters were not changed   | Both the Parameters tab (for SCIM) and the SSO/SAML attributes must be updated independently. |
| Re-sync doesn't appear to trigger                              | Try removing and re-assigning affected people from the app.                                   |
| Custom user fields are mapped but blank for some people        | Switch to the standard **Email** field.                                                       |
| Emails updated in SCIM but person still can't log in           | Check for rogue free orgs or ghost accounts. Clear browser cookies and retry.                 |
| "Invite domain not allowed" when trying to re-add people       | Your organization's domain may not be verified in Claude. Contact Support.                    |

---

## When to contact Support

Contact **[our Support team](https://support.claude.com/en/articles/9015913)** with your organization's domain, the affected person's email, and screenshots of your attribute mappings when:

- SCIM and SSO attributes appear identical but people still cannot access their seats.

- You need confirmation of the email Claude recorded during SCIM provisioning for specific people.

- You need help cleaning up ghost accounts or rogue free orgs.

- People are hitting an out-of-seats error despite available contracted seats.
---

SOURCE: https://support.claude.com/en/articles/13917875-ping-identity-sso-scim-email-mismatch

# Ping Identity SSO/SCIM email mismatch

Claude uses email as the primary identifier to match SSO logins to provisioned seats. Ping Identity products (PingOne and PingFederate) have flexible, layered attribute configuration. When SCIM provisioning and SAML/OIDC SSO pull from different user attributes, a mismatch blocks access.

**Applies to:** Enterprise plans and Console organizations using SCIM provisioning. Team plans don't have SCIM provisioning, so this mismatch scenario doesn't apply—see **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)** for what's available on each plan.

---

## Symptoms

People may experience one or more of the following when attempting to access your organization via SSO:

- **"Account creation is blocked"** — The person authenticates via SSO but Claude cannot find a matching provisioned account.

- **Landing on a free personal account** — If organization creation is not restricted, the person bypasses your organization entirely.

- **"Please confirm your email" mismatch** — The SSO callback shows a different email than the one the person entered at login.

- **Claude Code authentication failure** — The Claude Code CLI shows an email mismatch error during the authentication flow.

---

## How this happens

Ping Identity products allow granular attribute mapping at multiple levels (directory, IdP adapter, SP connector, application). SCIM and SSO can each traverse different paths through these layers, resulting in different email values reaching Claude:

| **Ping attribute**                   | **Typical value**                              | **Commonly used by**                            |
| ------------------------------------ | ---------------------------------------------- | ----------------------------------------------- |
| `email` (PingOne)                    | `test.user.one@example.com`                    | Recommended for both SCIM and SAML/OIDC         |
| `username` (PingOne)                 | `testuser1` or `testuser1@example.com`         | Default login identifier; may differ from email |
| IdP adapter attribute (PingFederate) | Varies by adapter type (LDAP, HTML Form, etc.) | PingFederate identity sources                   |
| LDAP `mail` attribute                | `test.user.one@example.com`                    | Directory-sourced email in PingFederate         |
| LDAP `sAMAccountName` or uid         | May be employee ID or short username           | Sometimes mapped to email by mistake            |
| Custom population attributes         | Custom fields defined per environment          | Advanced PingOne configurations                 |

Claude requires an exact string match between the SCIM-provisioned email and the SSO-asserted email.

**PingFederate note:** PingFederate's attribute contract system is especially complex—email can pass through multiple layers (LDAP → IdP adapter → adapter contract → SP connector → assertion). A mismatch at any layer will cause the wrong value to reach Claude. Trace the value end-to-end.

---

## Diagnostic steps

### Step 1 — Confirm the mismatch (PingOne)

1. **Check SCIM attribute mapping:** In PingOne Admin, go to **Connections → Applications → [Claude app] → Attribute Mappings**. Find the attribute mapped to emails[primary].value or email. Note the PingOne user attribute used as the source.

2. **Check SSO attribute mapping:** In the same app, go to the **SAML** or **OIDC** tab and find the attribute or claim mapped to email. Note its source attribute.

3. If SCIM and SSO reference different PingOne attributes, you've confirmed the mismatch.

### Step 1 (alternate) — Confirm the mismatch (PingFederate)

1. In the PingFederate Admin console, locate the **SP Connection** for Claude.

2. In **Attribute Contract Fulfillment**, find the email attribute and trace its source back to the IdP adapter or LDAP data store.

3. Separately, check the SCIM provisioning connector or outbound provisioning channel for Claude and trace the source of the email attribute being sent.

4. If the two traces lead to different directory attributes, you've confirmed the mismatch.

### Step 2 — Identify the scope of the problem

- If **most or all** provisioned people share the same email format mismatch, this is a **systemic attribute mapping problem**. The fix is in your IdP's SCIM attribute mapping.

- If only **one or two people** are affected, the issue is likely specific to those accounts. Check their profile directly.

### Step 3 — Check attribute values for a specific person

1. **PingOne:** Go to **Identities → Users → [User]** and compare the Username and Email field values.

2. **PingFederate with LDAP:** Check the person's LDAP record and compare mail, userPrincipalName, sAMAccountName, and any other attributes being used in your adapter mapping.

---

## Resolution

### PingOne — Align both mappings to the email attribute

1. In **Connections → Applications → [Claude app]**, open **Attribute Mappings**.

2. For SCIM: Ensure emails[primary].value maps to PingOne's **Email Address** attribute.

3. For SAML/OIDC: Ensure the email attribute or claim also maps to PingOne's **Email Address** attribute.

4. Save changes.

### PingFederate — Align attribute contract across all layers

1. In the SP Connection for Claude, go to **Attribute Contract Fulfillment**.

2. Find the email attribute. Ensure its source is the same LDAP or data store attribute used in your SCIM outbound provisioning channel.

3. If using a custom IdP adapter, ensure the adapter's contract includes the canonical email attribute and that it's correctly mapped through to the SP connection.

4. Update SCIM provisioning to use the same source attribute.

### Trigger a full re-sync

**Critical — Full sync required:** An incremental sync will not update existing records after you change an attribute mapping. You must trigger a **full restart** of the provisioning cycle.

1. **PingOne:** In the app's provisioning settings, trigger a full provisioning cycle. You may need to disable and re-enable provisioning to force a complete re-push.

2. **PingFederate:** Trigger a full sync in your outbound provisioning channel. Check your provisioning logs to confirm the updated email values are being sent.

3. Verify that updated email values appear in provisioning logs before asking people to retry login.

---

## Post-fix cleanup

After correcting the attribute mapping and completing the full sync:

- **Rogue free accounts:** If organization creation was not restricted before the fix, some people may have inadvertently created free personal Claude accounts. Contact **[our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)** to have these removed.

- **Ghost accounts (wrong-email seats):** Contact our Support team to deprovision these.

- **Seat availability:** If ghost accounts are occupying all contracted seats, new logins will fail. Contact our Support team.

- **Re-adding affected people:** After ghost accounts are removed, people may need to be re-invited or re-provisioned.

- **Prevent future occurrences:** Enable "Restrict organization creation" in your organization's Identity and access settings.

---

## Verification

1. Check a sample of provisioned people—confirm their email in the provisioning log matches the email format that SSO sends.

2. Ask an affected person to clear browser cookies for claude.ai, then log in via SSO.

3. Confirm people aren't creating free accounts.

4. If Claude Code was affected, have the person re-run `claude auth login --enterprise` and confirm the email matches their provisioned seat.

---

## Common issues

| **Issue**                                                                 | **Solution**                                                                                                   |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| PingOne `username` field used instead of `email`                          | Switch the SCIM mapping to PingOne's **Email Address** attribute.                                              |
| PingFederate attribute mismatch across contract layers                    | Trace the email attribute end-to-end: LDAP source → IdP adapter → adapter contract → SP connector → assertion. |
| LDAP `sAMAccountName` or `uid` mapped as email source                     | Use the LDAP `mail` attribute instead.                                                                         |
| Incremental provisioning sync doesn't update existing records             | A full re-sync is required after changing attribute mappings.                                                  |
| Attribute contract updated in PingFederate but SCIM connector not updated | Both SP connection and outbound SCIM provisioning channel must be updated independently.                       |
| Emails updated in SCIM but person still can't log in                      | Check for rogue free orgs or ghost accounts. Clear browser cookies and retry.                                  |

---

## **When to contact Support**

Contact **[our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)** with your organization's domain, the affected person's email, and screenshots of your attribute mappings when:

- SCIM and SSO attributes appear identical but people still cannot access their seats.

- You need confirmation of the email Claude recorded during SCIM provisioning for specific people.

- You need help cleaning up ghost accounts or rogue free orgs.

- People are hitting an out-of-seats error despite available contracted seats.
---

SOURCE: https://support.claude.com/en/articles/13917889-microsoft-entra-id-sso-setup

# Microsoft Entra ID SSO setup

This guide walks you through configuring single sign-on (SSO) for Claude using Microsoft Entra ID (formerly Azure Active Directory) as your identity provider. It applies to Team plans, Enterprise plans, and Console organizations.

## Prerequisites

- A Claude Team plan, Enterprise plan, or Console organization with a parent organization (see **[Important considerations before enabling SSO](https://support.claude.com/en/articles/10276682)** for Console parent org requirements)

- Owner or Primary Owner role (Team and Enterprise) or Admin role (Console)

- Microsoft Entra ID P1 or P2 license (required for SCIM provisioning)

- Global Administrator or Application Administrator role in Entra

- Your domain verified in Claude's Identity and access settings — see **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full setup path including domain verification

## Where to find your configuration values

The Entity ID, Reply URL (ACS URL), and SCIM credentials referenced below are provided in the WorkOS setup flow within your Identity and access settings — not by contacting Support.

- **Team and Enterprise plans:** go to **[claude.ai/admin-settings/identity](https://claude.ai/admin-settings/identity)**

- **Console organizations:** go to **[platform.claude.com/settings/identity](https://platform.claude.com/settings/identity)**

Start the SSO setup flow there and keep it open alongside the Entra Admin Center as you work through the steps below.

---

## Step 1 — Add Claude as an enterprise application in Entra

**Note:** "Enterprise applications" below refers to the section in Microsoft Entra's admin center—it's Microsoft's term for any app you integrate, and is unrelated to your Claude plan type.

1. In the **Entra Admin Center**, go to **Enterprise applications → New application**.

2. Search for "Claude" in the gallery. If available, select it; otherwise choose **Create your own application** and name it "Claude".

3. Select **Integrate any other application you don't find in the gallery** and click "Create."

## Step 2 — Configure SAML SSO

1. In your new application, click **Single sign-on → SAML**.

2. In **Basic SAML Configuration**, enter: **Identifier (Entity ID)** from the WorkOS setup flow, **Reply URL (ACS URL)** from the WorkOS setup flow, and **Sign-on URL:** **<https://claude.ai/login>**.

3. In **Attributes & Claims**, ensure the email claim is set to send user.mail (or the same attribute you'll use for SCIM).

4. Download the **Federation Metadata XML** and upload it in the WorkOS setup flow when prompted.

## Step 3 — Configure SCIM provisioning

**Note:** SCIM provisioning is available on Enterprise plans and eligible Console organizations only. If you're on a Team plan, skip this step — you can use JIT provisioning instead. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)**.

1. In the application, go to **Provisioning → Get Started**.

2. Set **Provisioning Mode** to **Automatic**.

3. Enter the **Tenant URL** and **Secret Token** from the WorkOS setup flow.

4. Click **Test Connection** to verify.

5. Under **Mappings**, ensure the email attribute mapping points to the same field as your SSO email claim (typically user.mail).

6. Set **Provisioning Status** to **On** and save.

**Critical:** The attribute used for SCIM email and SSO email must be identical. Mismatches are the most common cause of login failures. For troubleshooting, see **[Microsoft Entra ID SSO/SCIM email mismatch](https://support.claude.com/en/articles/13917829)**.

## Step 4 — Assign people and groups

1. In **Users and groups**, assign the people or groups who should have access to Claude.

2. Only assigned people and groups will be provisioned and allowed to SSO.

## Step 5 — Verify

1. If you enabled SCIM, trigger a provisioning cycle and confirm people appear in Claude's admin settings.

2. Have a test user complete SSO login and verify they land in your organization's workspace.

---

## Need help?

See **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full end-to-end flow including domain verification and choosing a provisioning approach. If you run into issues, contact **[our Support team](https://support.claude.com/en/articles/9015913)** with your Entra tenant ID and a screenshot of your SAML configuration.
---

SOURCE: https://support.claude.com/en/articles/13917894-okta-sso-setup

# Okta SSO setup

This guide covers configuring SSO and SCIM provisioning for Claude with Okta as your identity provider. It applies to Team plans, Enterprise plans, and Console organizations.

## Prerequisites

- A Claude Team plan, Enterprise plan, or Console organization with a parent organization (see **[Important considerations before enabling SSO](https://support.claude.com/en/articles/10276682)** for Console parent org requirements)

- Owner or Primary Owner role (Team and Enterprise) or Admin role (Console)

- Okta administrator access

- Your domain verified in Claude's Identity and access settings — see **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full setup path including domain verification

## Where to find your configuration values

The ACS URL, Entity ID, and SCIM credentials referenced below are provided in the WorkOS setup flow within your Identity and access settings.

- **Team and Enterprise plans:** go to **[claude.ai/admin-settings/identity](https://claude.ai/admin-settings/identity)**

- **Console organizations:** go to **[platform.claude.com/settings/identity](https://platform.claude.com/settings/identity)**

Start the SSO setup flow there and keep it open alongside the Okta Admin console as you work through the steps below.

---

## Step 1 — Create the Okta application

1. In the Okta Admin console, go to **Applications → Applications → Create App Integration**.

2. For the SSO method, choose "SAML 2.0" (recommended) or "OIDC."

3. Name the app "Claude" and click "Next."

## Step 2 — Configure SAML

1. In the **Configure SAML** tab, enter: **Single sign-on URL (ACS URL)** from the WorkOS setup flow, **Audience URI (Entity ID)** from the WorkOS setup flow, **Name ID format:** EmailAddress, and **Application username:** Email.

2. Under **Attribute Statements**, add an attribute named email with value user.email.

3. Download the **Identity Provider metadata** XML and upload it in the WorkOS setup flow when prompted.

## Step 3 — Enable SCIM provisioning

**Note:** SCIM provisioning is available on Enterprise plans and eligible Console organizations only. If you're on a Team plan, skip this step—you can use JIT provisioning instead. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)**.

1. In the app, go to the **Provisioning** tab and click “Configure API Integration.”

2. Check **Enable API integration** and enter the SCIM Base URL and API Token from the WorkOS setup flow.

3. Click “Test API credentials” to verify, then save.

4. Under **To App**, enable **Create Users**, **Update User Attributes**, and **Deactivate Users**.

5. In **Attribute Mappings → To App**, confirm the email attribute maps to user.email — the same field as your SAML assertion.

**Important:** SCIM and SAML must use the same Okta field for email. A common issue is SCIM using user.login while SAML uses user.email. See **[Okta SSO/SCIM email mismatch](https://support.claude.com/en/articles/13917840)** if people can't log in after provisioning.

## Step 4 — Assign people or groups

1. In the **Assignments** tab, assign the people or Okta groups that should access Claude.

2. If you enable SCIM, Okta will automatically provision assigned people. If you're using JIT, people will be provisioned on their first SSO login.

## Step 5 — Verify

1. If you enabled SCIM, check provisioning logs to confirm people were successfully created in Claude.

2. Have a test user complete SSO and verify they land in your organization's workspace.

---

## Need help?

For the full end-to-end flow including domain verification and choosing a provisioning approach, see **[Set up single sign-on](https://support.claude.com/en/articles/13132885)**. If you run into issues, contact **[our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)** with your organization's domain and a screenshot of your Okta SAML configuration.
---

SOURCE: https://support.claude.com/en/articles/13917899-onelogin-sso-setup

# OneLogin SSO setup

This guide walks through configuring SSO and SCIM for Claude with OneLogin as your identity provider. It applies to Team plans, Enterprise plans, and Console organizations.

## Prerequisites

- A Claude Team plan, Enterprise plan, or Console organization with a parent organization (see **[Important considerations before enabling SSO](https://support.claude.com/en/articles/10276682)** for Console parent org requirements)

- Owner or Primary Owner role (Team and Enterprise) or Admin role (Console)

- OneLogin Super User access

- Your domain verified in Claude's Identity and access settings — see **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full setup path including domain verification

## Where to find your configuration values

The Audience (Entity ID), ACS URL, and SCIM credentials referenced below are provided in the WorkOS setup flow within your Identity and access settings — not by contacting Support.

- **Team and Enterprise plans:** go to **[claude.ai/admin-settings/identity](https://claude.ai/admin-settings/identity)**

- **Console organizations:** go to **[platform.claude.com/settings/identity](https://platform.claude.com/settings/identity)**

Start the SSO setup flow there and keep it open alongside the OneLogin Admin portal as you work through the steps below.

---

## Step 1 — Create a new application in OneLogin

1. In the OneLogin Admin portal, go to **Applications → Applications → Add App**.

2. Search for "SAML Custom Connector" and select "SAML Custom Connector (Advanced)."

3. Name it "Claude" and click "Save."

## Step 2 — Configure SAML settings

1. In the **Configuration** tab, enter the values from the WorkOS setup flow: **Audience (EntityID)**, **ACS (Consumer) URL**, and **ACS URL Validator** (regex or exact match of the ACS URL).

2. Set **SAML initiator** to **Service Provider**.

3. Set **SAML nameID format** to **Email**.

4. In the **SSO** tab, download the **Issuer URL** metadata and upload it in the WorkOS setup flow when prompted.

## Step 3 — Map attributes

1. In the **Parameters** tab, add a field: **Field name:** email, **Value:** Email (OneLogin's Email field for the person).

2. Ensure this same Email field is used for SCIM provisioning in the next step.

## Step 4 — Enable SCIM provisioning

**Note:** SCIM provisioning is available on Enterprise plans and eligible Console organizations only. If you're on a Team plan, skip this step — you can use JIT provisioning instead. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)**.

1. In the **Provisioning** tab, enable **Enable provisioning**.

2. Enter the SCIM Base URL and Bearer Token from the WorkOS setup flow.

3. Enable **Create user**, **Delete user**, and **Update user**.

4. In **Entitlements**, map the email attribute to the same OneLogin field as SAML.

5. Click "Save."

**Critical:** SAML and SCIM must send the same email value. If people experience login failures after provisioning, see **[OneLogin SSO/SCIM email mismatch](https://support.claude.com/en/articles/13917861)**.

## Step 5 — Assign people

In the **Users** tab, assign individual people or use **Rules** to automatically assign based on role or group.

## Step 6 — Verify

1. If you enabled SCIM, check the OneLogin provisioning activity log to confirm people were created in Claude.

2. Have a test user complete SSO login and verify they land in your organization's workspace.

---

## Need help?

See **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full end-to-end flow including domain verification and choosing a provisioning approach. If you run into issues, contact **[our Support team](https://support.claude.com/en/articles/9015913)** with your OneLogin domain and a screenshot of your SAML configuration.
---

SOURCE: https://support.claude.com/en/articles/13917902-ping-identity-sso-setup

# Ping Identity SSO setup

This guide covers configuring Claude with PingOne or PingFederate as your identity provider. It applies to Team plans, Enterprise plans, and Console organizations.

## Prerequisites

- A Claude Team plan, Enterprise plan, or Console organization with a parent organization (see **[Important considerations before enabling SSO](https://support.claude.com/en/articles/10276682)** for Console parent org requirements)

- Owner or Primary Owner role (Team and Enterprise) or Admin role (Console)

- PingOne Environment Admin or PingFederate Admin access

- Your domain verified in Claude's Identity and access settings — see **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full setup path including domain verification

## Where to find your configuration values

The ACS URL, Entity ID, and SCIM credentials referenced below are provided in the WorkOS setup flow within your Identity and access settings — not by contacting Support.

- **Team and Enterprise plans:** go to **[claude.ai/admin-settings/identity](https://claude.ai/admin-settings/identity)**

- **Console organizations:** go to **[platform.claude.com/settings/identity](https://platform.claude.com/settings/identity)**

Start the SSO setup flow there and keep it open alongside your Ping admin console as you work through the steps below.

---

## PingOne setup

### Step 1 — Create an application connection

1. In the PingOne admin console, go to **Connections → Applications → + Add Application**.

2. Select "SAML Application."

3. Name it "Claude" and click "Configure."

### Step 2 — Configure SAML

1. Choose "Manually Enter" and provide the SP details from the WorkOS setup flow: **ACS URL** and **Entity ID**.

2. Download the PingOne **IdP metadata** and upload it in the WorkOS setup flow when prompted.

3. In **Attribute Mappings**, map `email` to the PingOne **Email Address** attribute.

### Step 3 — Enable SCIM provisioning

**Note:** SCIM provisioning is available on Enterprise plans and eligible Console organizations only. If you're on a Team plan, skip this step — you can use JIT provisioning instead. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)**.

1. In the application settings, go to the **Provisioning** tab.

2. Enable **Outbound Provisioning** and enter the SCIM endpoint URL and access token from the WorkOS setup flow.

3. Map `emails[primary].value` to the PingOne **Email Address** attribute—the same attribute used in SAML.

**Critical:** Ensure SAML and SCIM use identical attribute sources. See **[Ping Identity SSO/SCIM email mismatch](https://support.claude.com/en/articles/13917875)** for troubleshooting.

### Step 4 — Assign population

1. Under **Populations**, assign the user population that should access Claude.

2. Enable the application and click "Save."

---

## PingFederate setup

PingFederate configurations vary significantly by version and deployment. The general approach is:

1. Create a new **SP Connection** using the SP metadata from the WorkOS setup flow.

2. Configure the **Attribute Contract** to include `email`.

3. Map the email attribute in the **Adapter Mapping** to the person's primary email field.

4. For SCIM (Enterprise plans and eligible Console organizations only), configure an outbound provisioning channel targeting the SCIM endpoint from the WorkOS setup flow.

Contact **[our Support team](https://support.claude.com/en/articles/9015913)** for PingFederate-specific guidance.

---

## Need help?

See **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full end-to-end flow including domain verification and choosing a provisioning approach. If you run into issues, contact **[our Support team](https://support.claude.com/en/articles/9015913)** with your Ping environment details.
---

SOURCE: https://support.claude.com/en/articles/14499648-how-scim-sync-works-for-enterprise-organizations

# How SCIM sync works for Enterprise organizations

SCIM provisioning keeps your Enterprise organization's membership and groups in sync with your identity provider. This article covers what gets synced, how syncs are triggered, how to preview a sync before it applies, and what to watch for when resyncing.

Available on the Enterprise plan. For setup instructions, see **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning)**.

## What gets synced

When you connect your identity provider (IdP) to your Enterprise organization through the WorkOS integration, two things sync from your IdP:

- **Members** from your SCIM directory

- **SCIM groups** that you've pushed from your IdP to WorkOS

Group membership in your organization determines which capabilities members with custom roles can access, along with group spend limits.

## Automatic syncing

Your Enterprise organization receives changes from your IdP automatically whenever your IdP pushes member or group updates (adds, removes, or edits) to WorkOS.

Behind the scenes, your organization polls WorkOS for update events every minute and processes them in a queue. This method is eventually consistent—syncs typically complete within minutes, but can take several hours during periods of high system traffic.

## Manual syncing

Some actions trigger a manual sync immediately, and you can also run one on demand.

### Actions that trigger a manual sync

- **Changing the provisioning mode to SCIM.** Any member not in your IdP directory is removed, and any member in your IdP directory is added. You'll need to wait for this initial resync before configuring group mappings.

- **Enabling group mappings.** The full list of members and groups updates. New and existing members' roles and seat tiers are enforced by the group mapping and can't be overridden manually. After saving a new mapping, click "Sync."

- **Sync now** to recompute roles and seat tiers for existing members.

  - Using the "Check for updates" button at **[Organization settings > Groups](https://claude.ai/admin-settings/groups)**.

  - Using the "Sync" button at **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)** under **User provisioning**.

**Note:** When you update seat provisioning or seat roles through group mappings, existing members aren't resynced automatically. Trigger a manual sync to apply the changes.

When you disable group mappings, you regain the ability to manually assign member roles and seat tiers. Existing members keep their current roles. New members are assigned the User role—change their role to "Custom" if you want to enable custom role permissions.

## How to manually trigger a sync

You can trigger a manual sync from two places in your admin settings.

**From the Groups page**

1. Go to **[Organization settings > Groups](https://claude.ai/admin-settings/groups)**.

2. Click "Check for updates" under **SCIM sync**:



3. Select whether to sync members, groups, or both.

**From the Manage SCIM page**

1. Go to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)** and scroll to the **User provisioning** section.

2. Click "Sync."

3. Select whether to sync members, groups, or both:



**Note:** If you trigger a manual sync while background changes are processing, your organization takes the most recent change for each member or group. If multiple changes are queued for the same member or group, you may need to resync again to make sure everything applies correctly.

## Preview a sync before it applies

When you run a sync—by resyncing manually or saving a mapping change—the admin console shows a preview of what the sync will do before anything applies. The preview appears automatically in the sync flow and shows how many members the sync will add, remove, or modify, along with how recent the directory data is.

Review the preview before you confirm. If the numbers don't match what you expect (for example, far more removals than people who actually left) cancel the sync and check your IdP directory and group mappings before continuing.

If a sync would remove an unusually large share of your members, the preview shows a warning. This helps you catch a misconfigured mapping before it removes people who should keep access. When you see this warning, stop and confirm the change is intentional before continuing.

## Member sync vs. group sync

When you trigger a manual sync, you can choose to sync members, groups, or both. Here's what each does:

- **Member sync** updates your organization's record of which members are mapped to seats, seat tiers, and seat roles (Custom, User, Admin, Owner). This can affect members' login access to Claude.

- **Group sync** updates your organization's record of which SCIM groups exist and who belongs to them. Group membership determines which capabilities members with custom roles can use, along with group spend limits.

## How long manual syncs take

Manual syncs rescan WorkOS for the full list of members and groups to establish an up-to-date baseline. Expect roughly one minute per 100 members in your organization—so a 1,000-member organization takes about 10 minutes to fully resync.

## Verifying your sync status

To check whether your organization's membership and groups are current, you have two options:

- **Export your member list.** Go to **[Organization settings > Members](http://claude.ai/admin-settings/members)** and click "Export CSV" to download the current view of your membership.

- **View the WorkOS integration's record.** Go to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)** and click "Manage SCIM" to see what WorkOS currently holds for your organization.

## Risks to watch for when resyncing

Before you trigger a manual resync, keep these in mind:

- **Changing the provisioning mode to SCIM removes members not in your IdP directory.** Confirm that all existing members are in your IdP directory before changing provisioning mode.

- **Updating a member's email creates a new member record.** The member with the old email is removed, and a new member with the new email is created.

- **Resyncing cascades to child organizations.** If you have multiple organizations with SCIM provisioning under the same **parent organization**, resyncing one triggers resyncing in the others. This includes sandbox organizations sharing the same parent.

- **Incomplete group mappings remove members from the organization.** When enabling group mapping for SCIM, finish assigning all groups before saving. Any member not included in a role group mapping is removed from the organization. If you enable seat tier mapping, any member not in a seat tier group mapping is also removed.
---

SOURCE: https://support.claude.com/en/articles/14503613-sso-login

# SSO login

Claude for Government requires Single Sign-on (SSO) for user authentication. Unlike the commercial Claude Enterprise plan, email based (magic link) login is only available to the Primary Owner during account setup. All other users must authenticate through your organization's identity provider (IdP).

Once SSO is configured, the Primary Owner can disable magic link login entirely so that all authentication flows through your IdP.

For SSO setup on Claude Enterprise, see **[Set up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso)**.

## How SSO differs for Claude for Government

| **Feature**              | **Claude for Government**                | **Claude Enterprise**  |
| ------------------------ | ---------------------------------------- | ---------------------- |
| Email (magic link) login | Primary Owner only, during initial setup | Available to all users |
| SSO Requirement          | Required for all non-Primary Owner users | Optional               |

## Steps for setting up SSO

### Prerequisites

Before you begin, confirm that you have:

- **Primary Owner access** — The email address registered as Primary Owner when the license was purchased.

- **DNS access** — Ability to create TXT records for your organization's login domain(s).

- **IdP admin access** — Permission to create a SAML application in your identity provider (e.g., Entra ID, Okta).

### Step 1: Sign in as Primary Owner

1. Navigate to **[claude.fedstart.com](http://claude.fedstart.com)**

2. Enter the email address registered as Primary Owner.

3. Complete the email-based login using the magic link sent to the Primary Owner’s inbox.

4. After signing in, the Primary Owner will be redirected to the identity settings page at **[claude.fedstart.com/admin-settings/identity](https://claude.fedstart.com/admin-settings/identity)**

**Tip**: It often makes sense to appoint someone from your IT team as the Primary Owner, since they will need DNS and IdP access for the remaining steps.

### Step 2: Verify your domain

Before configuring your Identity Provider (IdP), you must verify ownership of your login domain.

1. On the identity settings page, locate your domain and select the **"View instructions"** tab. There you’ll be able to see the required DNS challenge record that must be set.

2. Create the displayed TXT record in your domain’s DNS settings.

3. Wait for the DNS propagation. Once the platform detects the record, the domain status will update to “**Verified**.”





**Important:** Each domain can only have one identity provider. If multiple organizations share a single login domain, IT administrators from both organizations will be able to modify login settings. Contact **[Anthropic Support](https://claude.fedstart.com/support)** for assistance with multi-organization setups. For more details about multi-organization setups, see our **[SCIM provisioning guide](https://support.claude.com/en/articles/14503643-set-up-scim-in-claude-for-government)**.

### Step 3: Configure your Identity Provider

Anthropic acts as the **Service Provider (SP)** in the SAML SSO flow. Your organization’s IdP (e.g., Entra or Okta) acts as the **Identity Provider.**

1. On the identity settings page, locate the **SP Metadata** section. This contains the values your IdP needs:

  1. Entity ID (Audience URI)

  2. ACS URL (Reply URL)

2. In your IdP, create a new SAML application using these SP metadata values

### Step 4: Configure Anthropic with your IdP details

Once your SAML application is set up in your IdP, provide Anthropic with the details it needs to verify SAML assertions. On the identity settings page, enter:

- Signing Certificate — The X.509 certificate from your IdP.

- IdP Entity ID — Your IdP's entity identifier.

- SSO URL — The IdP's SAML sign-on endpoint.

- Claims Information — Attribute mappings for user name and email.



**Tip:** Using a metadata XML file: Most IdPs let you download a metadata.xml file. Upload it on the identity settings page to auto-fill the Signing Certificate, IdP Entity ID, and SSO URL. Some IdPs (like Entra ID) also include claims information in the metadata file; if present, the system will suggest field mappings automatically.

**Troubleshooting attribute mappings**

Attribute mapping is where most configuration issues occur. If login fails after setup:

1. Install a SAML debugging extension such as SAML-tracer.

2. Attempt an SSO login and inspect the SAML response.

3. Confirm that the email claim returns an address under your verified domain. Email claims for unverified domains will be rejected.

### Step 5: Test and finalize

1. Log out of Claude for Government.

2. Log back in using your SSO configuration to confirm it works.

3. (Optional) Once SSO login is verified, return to the identity settings page and disable magic link login.

**Warning**: Only disable magic link login after you have confirmed that SSO login works. If SSO is misconfigured and the magic link is disabled, the Primary Owner will be unable to access the admin console. Contact Anthropic support if you are locked out.

After SSO is configured, any user assigned to the SAML application in your IdP can log in and will be provisioned a seat automatically, provided your organization has available licenses. If no seats are available, users will see an error at login. Contact your Anthropic account representative to add licenses. For more controlled provisioning—including role assignment and multi-organization support—see **[SCIM provisioning](https://support.claude.com/en/articles/14503643-set-up-scim-in-claude-for-government)**.
---

SOURCE: https://support.claude.com/en/articles/14503643-set-up-scim-in-claude-for-government

# Set up SCIM in Claude for Government

System for Cross-domain Identity Management (SCIM) lets your identity provider automatically manage user accounts in Claude for Government. With SCIM, your IdP controls who has access, what role they hold, and what seat tier they're assigned—without manual intervention in the Claude admin console.

For SCIM setup on Claude Enterprise, see **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning)**.

## How SCIM differs for Claude for Government

Claude for Government uses a first-party SCIM implementation hosted within the FedRAMP-authorized environment. The commercial Claude Enterprise plan uses a different SCIM backend.

| **Feature**                 | **Claude for Government**                  | **Claude Enterprise**           |
| --------------------------- | ------------------------------------------ | ------------------------------- |
| SCIM endpoint               | claude.fedstart.com/v1/scim/v2             | Configured via claude.ai        |
| SCIM implementation         | Anthropic first-party (FedRAMP-authorized) | Third-party integration         |
| API key management          | Self-service via identity settings page    | Self-service via admin settings |
| Parent Organization Support | Yes — for multi-org identity management    | Not applicable                  |

## Prerequisites

Before setting up SCIM, you must complete:

1. **SSO configuration** — Complete the steps outlined in the SSO setup guide.

2. **Domain verification** — Your login domain must be verified (this is completed during SSO setup).

3. **IdP admin access** — Permission to configure a SCIM integration in your identity provider.

## How provisioning works with and without SCIM

Without SCIM, Claude for Government uses just-in-time (JIT) provisioning: any user who authenticates through SSO is automatically assigned a seat, as long as licenses are available. You control who can authenticate by managing membership in the SAML application within your IdP.

With SCIM, login and provisioning are separate. Your IdP tells Anthropic who should have access and at what role/tier. SSO is used only for authentication. This gives you fine-grained control over roles, seat tiers, and offboarding.

### Step 1: Generate a SCIM API key

1. Navigate to claude.fedstart.com/admin-settings/identity.

2. In the SCIM section, generate a new API key.

3. Copy the key — you'll need it when configuring your IdP.

**Important**: Store this key securely. It cannot be retrieved after you leave the page.



### Step 2: Configure SCIM in your Identity Provider

1. In your IdP (e.g., Entra ID, Okta), create or open a SCIM provisioning integration.

2. Enter the following values:

  1. SCIM endpoint URL: **<https://claude.fedstart.com/v1/scim/v2>**

  2. API key / Bearer token: The key generated in Step 1

3. Configure the user attributes your IdP will sync (typically name and email).

4. Assign users and groups to the SCIM integration within your IdP.

### Step 3: Verify sync status

After enabling the integration in your IdP:

1. Return to the identity settings page at claude.fedstart.com/admin-settings/identity.

2. Check the SCIM sync status indicator to confirm users are syncing.

**Warning**: When you fully enable SCIM provisioning, any users who were **not** synced via SCIM will be removed from the organization. Confirm that all expected users appear in the sync before proceeding.



### Step 4: Map groups to roles and seat tiers

SCIM provisioning uses IdP groups to assign roles and seat tiers within Claude for Government.

1. On the identity settings page, open the role mappings table.

2. For each IdP group, assign:

  1. Role — The user's role within the organization (e.g., Member, Owner).

  2. Seat tier — The license tier, if your organization has purchased multiple tiers.

3. Save your mappings.



If you manage multiple organizations under a single parent (see below), each organization maintains its own role and seat tier mappings. Switch between organizations using the organization selector in the bottom-left corner of the page.

### Parent organizations (multi-org setups)

Every Claude for Government organization belongs to a **parent organization**. For most customers, this is transparent—a parent is created automatically during provisioning and contains a single child organization.

Parent organizations become relevant when multiple organizations share a login domain. Common scenarios include:

- **Regional offices** that purchase Claude for Government independently but share an email domain.

- **Sub-departments** within an agency that require data separation (e.g., preventing cross-org sharing of chats or projects).

In a multi-org setup:

- Identity settings (IdP configuration and SCIM) are managed at the **parent organization** level.

- Role and seat tier mappings are configured **per child organization**, allowing different groups to map to different orgs.

- Any Owner or Primary Owner in a child organization can manage IdP settings. Restrict these roles to centralized IT staff.

**Note:** Anthropic support will work with you during provisioning to configure parent/child organization relationships. Contact your account representative or **[Anthropic support](https://claude.fedstart.com/support)** if you need to set up a multi-org structure.
---

SOURCE: https://support.claude.com/en/articles/14503675-organization-instructions-in-claude-for-government

# Organization instructions in Claude for Government

Organization instructions allow administrators to define custom instructions that Claude follows in every conversation for all users in the organization. Use this to set compliance guidance, communication standards, formatting requirements, or domain-specific context.

## How organization and user instructions interact

Claude supports two levels of instructions. Understanding how they interact helps administrators and users get the most out of both.

| **Level**                    | **Set by**     | **Scope**                      | **Visibility**                       |
| ---------------------------- | -------------- | ------------------------------ | ------------------------------------ |
| Organization instructions    | Administrators | All users, all conversations   | Only administrators can view or edit |
| Individual user instructions | Each user      | That user's conversations only | Only that user can view or edit      |

When both are set, organization preferences take precedence. If a user preference directly contradicts an organization preference, Claude will strongly favor the organization-level instruction. For example, if an organization preference says "Always respond in formal English" but a user preference says "Use casual tone," Claude will respond formally.

Individual user instructions still apply for anything not addressed by the organization instructions.

**Note**: Instruction prioritization relies on prompt-level instructions. In rare edge cases involving directly contradictory instructions, behavior may vary. Test your instructions to confirm they produce the expected results.

## Set up organization instructions

To configure organization instructions, you must have an Owner or Admin role for your organization.

1. Click the gear icon in the lower left corner and select "Organization settings."

2. Select **Organization**.

3. Locate the **Organization instructions** section.

4. Enter your instructions in the text area. You can include guidance such as compliance rules, formatting requirements, communication standards, or domain-specific context. The maximum length is 3,000 characters.

5. Click "Save." Your instructions take effect immediately for all users in the organization.

To remove instructions entirely, clear the text area and click "Save."

---

## Best practices

**Keep instructions concise and clear.** Organization instructions are included in every message sent by every user in your organization, so shorter instructions help keep conversations efficient. Aim for direct, specific guidance rather than lengthy explanations.

**Be specific about what you want**. Instead of vague instructions like "be professional," provide concrete direction such as "Respond in formal English. Do not use contractions, slang, or emojis."

**Focus on consistent behaviors**. Organization instructions work best for instructions that should apply uniformly across all conversations, such as compliance requirements, response formatting standards, or classification handling rules.

**Avoid conflicting instructions.** If your organization instructions contradict each other, Claude may not follow either one reliably. Review your instructions as a whole to ensure they are consistent.

**Do not attempt to override safety behaviors.** Organization instructions cannot disable Claude's built-in safety guidelines or content policies. Instructions that conflict with Claude's core training will not be followed.

**Test your instructions.** After saving, start a new conversation to verify Claude is following your instructions as expected. Try a few different types of questions to make sure the instructions work well across a range of topics.

**Review and update regularly.** As your organization's needs change, revisit your instructions to ensure they remain relevant and accurate. Removing outdated instructions keeps Claude's responses focused.

---

## Example instructions

**Compliance and classification guidance** — "Treat all responses as CUI. Do not include controlled unclassified information in web search queries or file names."

**Communication standards** — "Always respond in formal English. Use active voice."

**Domain-specific context** — "Users are federal agency employees. When they reference 'the system,' they mean our grants management platform."

**Response formatting** — "Prefer concise responses under 300 words. Use bullet points for lists with three or more items."

**Referral guidance** — "When users ask about HR policies, direct them to <hr@example.com> rather than providing specific policy advice."
---

SOURCE: https://support.claude.com/en/articles/14546867-set-organization-instructions

# Set organization instructions

Organization instructions let Admins and above on Team and Enterprise plans set custom instructions that Claude follows in every conversation across your organization. Use them to apply communication standards, formatting requirements, compliance guidance, or domain-specific context that should show up everywhere your team works with Claude.

Organization instructions are available to Admins, Owners, and Primary Owners on Team and Enterprise plans.

## How organization and user instructions interact

Claude supports two levels of instructions. Understanding how they interact helps admins and the people on your team get the most out of both.

| **Level**                    | **Set by**                         | **Scope**                                           | **Visibility**                         |
| ---------------------------- | ---------------------------------- | --------------------------------------------------- | -------------------------------------- |
| Organization instructions    | Admins, Owners, and Primary Owners | All people in your organization, every conversation | Only Admins and above can view or edit |
| Individual user instructions | Each user                          | That individual’s conversations only                | Only that user can view or edit        |

When both are set, organization instructions take precedence. If an individual instruction directly contradicts an organization instruction, Claude favors the organization-level instruction. For example, if an organization instruction says “Always respond in formal English” but an individual instruction says “use a casual tone,” Claude responds formally.

Individual instructions still apply for anything the organization instructions don’t address.

**Note:** Instruction prioritization relies on prompt-level instructions. In rare edge cases involving directly contradictory instructions, behavior may vary. Test your instructions to confirm they produce the results you expect.

## Set up organization instructions

You need at least an Admin role to configure organization instructions.

1. Go to **[Organization settings > Organization and access](http://claude.ai/admin-settings/organization)**.

2. Find the **Organization instructions** section.

3. Enter your instructions in the text area. The maximum length is 3,000 characters.

4. Click “Save.”

5. Changes may take up to an hour to take effect across Claude products.

To remove instructions entirely, clear the text area and click “Save.”

---

## Best practices

**Keep instructions concise and clear.** Organization instructions are included in every message sent by everyone in your organization, so shorter instructions help keep conversations efficient. Aim for direct, specific guidance rather than lengthy explanations.

**Be specific about what you want.** Instead of vague instructions like “be professional,” give concrete direction such as “Respond in formal English. Don’t use contractions, slang, or emojis.”

**Focus on consistent behaviors.** Organization instructions work best for instructions that should apply uniformly across every conversation—response formatting standards, tone requirements, or organization-wide context.

**Avoid conflicting instructions.** If your organization instructions contradict each other, Claude may not follow either one reliably. Review your instructions as a whole to make sure they’re consistent.

**Don’t try to override safety behaviors.** Organization preferences can’t disable Claude’s built-in safety guidelines or content policies. Instructions that conflict with Claude’s core training won’t be followed.

**Test your instructions.** After saving, start a new conversation to verify Claude is following your instructions. Try a few different types of questions to confirm the instructions work across a range of topics.

**Review and update regularly.** As your organization’s needs change, revisit your instructions to make sure they’re still relevant. Removing outdated instructions keeps Claude’s responses focused.

---

## Example instructions

**Team identity.** “Address the team as the Acme Platform team. When users ask about ‘our product,’ they mean Acme Cloud.”

**Communication standards.** “Respond in formal English. Use active voice. Avoid contractions and emojis.”

**Response formatting.** “Prefer concise responses under 300 words. Use bullet points for lists with three or more items.”

**Domain context.** “Our team works in healthcare claims processing. When users mention ‘claims,’ they’re referring to insurance claims, not legal claims.”

**Referral guidance.** “When users ask about HR policies, direct them to **<hr@acme.com>** rather than giving specific policy advice.”

**Data handling reminders.** “Don’t include customer names, account numbers, or other personally identifiable information in responses or generated artifacts.”
---

SOURCE: https://support.claude.com/en/articles/14625626-respond-to-an-enterprise-domain-claim-on-your-claude-account

# Respond to an Enterprise domain claim on your Claude account

If your organization has set up Claude Enterprise, they may claim your existing personal Claude account (Free, Pro, or Max) and move it into their workspace. This article explains what to expect and what your options are.

**Note:** If your admin hasn't claimed your domain yet and you're exploring your options, see **[Move your personal Claude account to a Team or Enterprise organization](https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization)**.

## What it means when your domain is claimed

Your organization’s admin has initiated a process called domain claiming. This means all personal Claude accounts tied to your company’s email domain (for example, *@yourcompany.com*) are being migrated into the organization’s Enterprise workspace.

You’ll receive an email and an in-product notification letting you know that your account has been claimed, along with a deadline to choose what happens to your data. This deadline is at least 30 days from the date your admin initiates the claim.

## Your two options

### Merge and join

Bring your existing data into a new account within your organization's Enterprise workspace. Some things don't move. Most importantly, custom skills and your connected apps stay behind. For the full list of what does and doesn’t move to your new account, see **[What moves when you migrate](https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization#h_4e63ef6e87)**.

After the merge, your personal account is deactivated. **This can’t be undone**—once you merge, your data lives in your Enterprise account and your personal account no longer exists.

### Join fresh

Start with a clean Enterprise account. None of your personal account data transfers.

Before your deadline, you can **[export your data](https://support.claude.com/en/articles/9450526-how-can-i-export-my-claude-data)** if you want to keep a copy. Navigate to **[Settings > Account](https://claude.ai/settings/account)** to request a data export. Note that exported data can’t be imported into your Enterprise account—it’s for your personal records only.

## What happens if you don’t choose

**If you don’t make a choice before the deadline, you’ll get a fresh Enterprise account by default.** You won’t be able to access your personal account after the deadline.

Sign in before the deadline to make your choice.

## What happens to your paid subscription

If you have a Pro or Max subscription, it will be automatically canceled when you migrate or when the deadline passes. You’ll receive a prorated refund for any unused time and usage credits.

**Apple App Store subscriptions:** If you purchased your Pro or Max plan through the Apple App Store, we can’t cancel or refund it directly. You’ll need to cancel it yourself through your Apple ID settings:

1. Open the Settings app on your iPhone or iPad.

2. Tap your name at the top, then tap "Subscriptions."

3. Find your Claude subscription and tap "Cancel Subscription."

If you don’t cancel your App Store subscription, Apple will continue to charge you even though your personal account has been deactivated.

## How to sign in after migration

After migration, you’ll sign in to Claude using your organization’s single sign-on (SSO) provider. Go to claude.ai and sign in with your work email—you’ll be redirected to your company’s login page.

**Can’t sign in?** You may not be set up in your company’s identity provider yet. Contact your IT admin for help.

If you chose to merge, your conversations, projects, and files will be waiting in your new Enterprise account.

---

## Frequently asked questions

### Can I undo a merge?

No. Merging is permanent. Once your personal account data is transferred to your Enterprise account, it can’t be moved back to a personal account.

### Can I keep my personal account and also join the Enterprise workspace?

No. Once your domain is claimed, personal accounts on that domain can’t coexist with the Enterprise workspace. You’ll need to choose merge or join fresh.

### What if I use my personal email, not my work email?

Domain claiming only affects accounts tied to your organization’s verified domain (your work email). If you have a separate Claude account on a personal email address (like Gmail or Yahoo), that account isn’t affected.

### Will my organization be able to see my old conversations?

Data migrated from your personal account into an Enterprise organization will be accessible via the same mechanism as all other organization data. For more information, see **[Who owns and manages the data of my team?](https://support.claude.com/en/articles/9265372-who-owns-and-manages-the-data-of-my-team)**

### What if I’m not in my company’s identity provider?

If you’re not in your organization’s IdP, you won’t be able to sign in to the Enterprise workspace after migration. Contact your IT admin to make sure you’re added before the deadline. You should still choose to merge or join fresh before the deadline so your preference is recorded.

### I have both a personal account and an existing Enterprise account. What happens?

You can migrate your personal account to an existing Enterprise account; data from the individual account will be added to the Enterprise account. If the individual and Enterprise accounts have conflicting settings, the migrated account will use the Enterprise organization’s settings.
---

SOURCE: https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide

# Claude Enterprise consumption guide

Claude Enterprise gives your organization access to powerful AI across chat, Claude Code, and Claude Cowork. With that access comes the responsibility of managing consumption effectively—ensuring your team gets maximum value while keeping usage predictable and within budget.

This guide walks Enterprise admins through the key levers available to control and optimize token consumption: setting spend caps, configuring role-based access controls, educating users, and choosing the right model and effort level for the right task.

---

## Why consumption management matters

Claude Enterprise is priced on a per-seat, usage-based model. Your org's consumption pool is shared across all users, and some surfaces—particularly Claude Code and Cowork—consume tokens at a significantly higher rate than standard chat.

Admins who proactively configure spend limits and educate users can reduce waste and ensure that high-value use cases get the capacity they need.

---

## Understanding token intensity across surfaces

| **Surface**   | **Token intensity and what drives it**                                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core Chat     | Lower intensity. Standard back-and-forth conversation, summarization, drafting, and Q&A. Token usage scales with message length and conversation history.      |
| Claude Code   | Higher intensity. Each coding session includes system prompts, file context, tool calls, and multi-turn reasoning—more tokens per session than chat.           |
| Claude Cowork | Higher intensity. Agentic workflows, multi-step task execution, and Skills generate significant intermediate token usage that may not be visible to end users. |

**Admin tip: Set expectations with your team**

Users running Claude Code or Cowork workflows may not realize how token-intensive their sessions are. A single Cowork task or Claude Code debug session can consume many more tokens than chat. Include this context in any user onboarding you send.

---

## Role-based access controls

Role-based access controls (RBAC) let you group users and manage their access to Claude surfaces and consumption budgets as a unit rather than individual by individual. This is the most scalable way to govern usage in larger organizations.

### How to structure groups

Think about groups in terms of job function and use case, not organizational hierarchy. A few principles:

- Create groups that map to distinct usage patterns, not org chart boxes. "Engineering" and "Sales" are more useful than "North America" and "EMEA" for consumption management.

- Limit group proliferation. More than 8–10 groups becomes hard to manage. Start with 4–6 and split only if usage patterns clearly diverge.

- Use groups to gate access to high-intensity surfaces. For example: only members of the "Engineering" group can access Claude Code; other users see Chat and Cowork only.

- Assign group-level spend caps as a starting point, then override at the user level for outliers (e.g., a non-technical PM who needs Claude Code for a specific project).

### Group spend management

Once groups are configured:

- Review group consumption weekly during initial rollout, monthly thereafter.

- When a group consistently approaches its cap, investigate before automatically raising it—the right response might be model guidance (use Sonnet instead of Opus) rather than more budget.

- Consider assigning a "group owner" in each department who is responsible for reviewing usage and fielding questions from their team. This distributes the admin burden and puts someone with business context in the loop. Please note, this would entail providing these individuals admin rights, which may not be desired.

**Governance tip: Surface access as a first gate**

Before worrying about token-level limits, make sure the right people have access to the right surfaces. Giving everyone Claude Code and Cowork access on day one is the fastest way to generate unexpected consumption. Roll out higher-intensity surfaces in waves, starting with the teams most likely to use them productively.

---

## Set spend limits

Spend limits are your primary tool for controlling consumption. Claude Enterprise lets admins set limits at three levels: the organization level, the group level (with RBAC), and the individual user level. **Our recommended approach is to start with RBAC group-level limits and per-user limits**—these give you precise, targeted control without the risk of cutting off your entire org if a limit is hit.

### Org-level spend limits

The org-level limit is available as a hard ceiling across all users and surfaces, but use it carefully: hitting it affects everyone simultaneously, which can be disruptive. Most admins find that managing consumption at the group and user level gives them better outcomes with less operational risk.

### Group spend limit

Group spend limits let you assign a per-user monthly spend limit to an entire group, so every member of that group inherits the same limit without setting it individually. This is the most scalable way to manage consumption in mid-to-large orgs, and it's where admins should start.

Note the following precedence rules:

- **Individual limits always override group limits**, regardless of which is higher.

- **If a user belongs to multiple groups with different limits**, the **Multi-group spend limit** setting under **Spending defaults** controls whether the higher or lower limit applies. The seat-type default limit is included in this comparison.

- **Org-wide limits remain the hard ceiling.**

- **No limit anywhere = no limit.** If a member has no individual limit and none of their groups have a limit, their spend isn't capped.

**How to configure:** Organization settings → Usage → By group. Set limits to either a specific dollar amount or "Unlimited."

### User-level spend caps

User-level caps let you set consumption limits for individual accounts. These are essential for organizations where usage varies significantly across roles—a developer using Claude Code daily has very different needs than a marketer using chat for copywriting.

**Best practices for user-level caps:**

- Define consumption tiers based on role type before rollout. A tiered structure—e.g., light, standard, power—makes it easier to assign and adjust caps consistently.

- Start conservatively. It's easier to increase a cap based on a user's request than to walk back an overage conversation.

- Give power users (engineers, data scientists, researchers) higher or uncapped individual limits, but offset this by ensuring they use the right Claude model for the right task.

- Monitor individual usage reports monthly to identify outliers—both users consistently hitting their cap (may need more) and users consuming very little (may not be activated yet).

**Recommended starting points**

| **User type**   | **Code** | **Cowork** | **Chat** |
| --------------- | -------- | ---------- | -------- |
| Power (Top 10%) | $500     | $100       | $90      |
| Typical (Mean)  | $215     | $40        | $30      |
| Light (Median)  | $40      | $10        | $5       |

**These figures are rough planning estimates. Actual consumption will vary based on your team's size, workflows, and usage patterns.*

---

## Model selection guidance

One of the most impactful things an admin can do is set clear guidance for users on which model to use for which tasks. Model choice has a direct and significant impact on token consumption—Opus can consume several times more tokens than Sonnet for the same task.

Effort level is a second consumption lever. Users can choose how much thinking Claude applies to each response, and higher effort levels consume more tokens than lower ones. Encourage users to reserve Max effort for only the most demanding tasks and to use lower effort for routine tasks.

### The right model for the right task

| **Model**     | **Best for**                                      | **Token intensity** | **Recommended use**                                                                                         |
| ------------- | ------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Claude Fable  | Days-long agentic coding work and reasoning tasks | Very High           | Reserve for your highest-value, most complex agentic work. Premium pricing and faster usage draw than Opus. |
| Claude Opus   | Complex reasoning, research, multi-step tasks     | High                | Reserve for power users or specific workflows only                                                          |
| Claude Sonnet | Everyday tasks, writing, analysis, Q&A            | Moderate            | Default model for all users—set as your org-wide default (see below)                                        |
| Claude Haiku  | Simple lookups, summaries, fast responses         | Low                 | High-volume, lightweight automation tasks                                                                   |

### Set your organization's default model (beta)

Beyond guiding users toward the right model, you can set the model that new conversations start with for everyone in your org. This is one of the most direct consumption levers available—the default shapes what the majority of users run day to day.

You have two options:

- **Anthropic recommended** — automatically updates as new models ship, so your org always starts on our current recommended general-purpose model with no manual upkeep.

- **Choose your own** — sets a specific model as the org default and holds it there until you change it. Use this when you want to standardize on a known model for consumption predictability (for example, defaulting to Sonnet rather than Opus).

This setting applies to chat and Cowork only. Claude Code model defaults are managed separately through managed settings.

You can also set model defaults by role through Custom Roles, so different groups can start on different models—for example, defaulting your engineering group to one model and the rest of the org to another. This pairs naturally with the RBAC groups you've already configured (see Section 2).

**How to configure:** Organization settings → Models.

**Note:** Users' current model selection for new conversations may be cleared, so they'll pick up the org default on their next conversation.

### Manage model access for your organization

Beyond setting a default, you can restrict which models are available at all—a firmer lever than guidance alone. This works at two levels:

- **Organization level:** each model is enabled or disabled for everyone, including Owners and Admins. Disabling a model here removes it from every picker org-wide.

- **Custom role level:** for members on Custom roles, each role grants access to a *subset* of what's enabled at the org level. A role can't grant a model the org has disabled — the org setting is always the ceiling.

**Note:** Haiku models are always available to every member and can't be disabled, so there's always a fallback model.

If a member belongs to multiple groups with different custom roles, access is **additive** — they get every model any of their roles grants (as long as it's enabled org-wide).

**Capping effort level by role**

Beyond restricting which models a role can use, you can cap the **maximum effort level** members on that role can select per model — a more granular version of the effort guidance already covered above. This only applies to Custom roles, not at the org level. If a member has multiple roles, the highest effort cap across those roles wins.

**Admin tip: Pair model + effort restrictions**

If model guidance (the "Sonnet is your default" messaging) isn't landing and you're still seeing heavy Opus consumption, restricting Opus access to specific roles—or capping effort to Medium/High instead of Max for non-power-user roles—is the next lever. Reserve full access for the roles where deep reasoning actually pays off.

**Where this applies**

Model access and effort restrictions are enforced in chat (web, desktop, mobile), Claude Cowork, Office Agents, and Claude Code (CLI 2.1.199+—earlier versions still show restricted options but requests using them are rejected). Claude in Chrome, Claude Design, and Claude Security don't support this yet.

**How to configure:** Organization settings → Roles → select a role → Models tab. Set model access, an optional effort cap per model, and an optional role-level default model. To manage configuration across the org, go to **Organization settings → Models**.  More details in **[Manage model access for your organization](https://support.claude.com/en/articles/15694740)**.

### Admin configuration recommendations

- If you have high-volume, low-complexity workflows (e.g., summarizing support tickets, generating first-draft emails), evaluate whether Haiku is a better fit—it can significantly reduce consumption for these use cases.

- Periodically audit which models your users are actually selecting. If most of your consumption is on Opus, that's a signal that your model guidance isn't landing.

### What to tell your users about model choice

**Sonnet is your daily driver.** It's fast, highly capable, and is designed for the vast majority of tasks—writing, analysis, coding help, and Q&A.

**Opus is for the harder, more complex work.** Use it when you're working on a genuinely complex multi-step problem, or when quality matters more than speed.

**When in doubt, start with Sonnet.** You can always switch the model mid conversation to Opus if you need more depth.

---

## Using org preferences to shape user behavior

Org Preferences let admins inject standing guidance into every Claude conversation across your organization—effectively giving Claude a system prompt that reflects your team's norms, best practices, and guardrails. This is a high-leverage tool for shifting user behavior without adding friction, because the guidance shows up in-product at the moment of use rather than in documentation users have to go find.

A few ways you can use Org Preferences to manage consumption and usage patterns:

- **Nudge-against token-intensive output formats**. If you've noticed proliferation of a particular artifact type (e.g., HTML dashboards being shared in cross-functional threads where a simpler format would do), you can instruct Claude to confirm with the user before generating one. This adds a lightweight check without removing the capability entirely.

- **Point users to internal resources.** Reference your team's wiki, best-practices docs, or usage guidelines directly in the preference. Claude will surface them when relevant—steering users toward the right internal context instead of reinventing it each time.

- **Reinforce model selection norms.** Remind Claude (and by extension, users) that Sonnet is the default and Opus is reserved for specific workflows. This complements user education without requiring everyone to internalize it up front.

---

## Tracking usage and spend

### Analytics page

The Analytics page within the user menu (**claude.ai/analytics**) is the fastest way to get a read on your org. It shows weekly active users, seat utilization, top connectors, total spend (MTD/QTD/YTD), spend by model, and a top-10 users-by-spend leaderboard. Product-specific views for Chat, Claude Code, Claude Design, and Cowork break down activity for each surface. **[Learn more](https://support.claude.com/en/articles/12883420-view-usage-analytics-for-team-and-enterprise-plans)**.

### Skills analytics and per-skill ROI

Each skill represents a repeatable workflow—prepping a sales call, reviewing a contract—so its cost can be weighed directly against what that workflow is worth. The Skills view in Analytics shows users, cost per use, and total uses for every skill in your org, filterable by group ("what skills is my legal team using?") or product surface.

To run an ROI analysis:

1. Export the skills table to CSV from the Skills view.

2. Assign a value per run to each skill—a rough estimate of what the completed task is worth, such as the employee time it replaces (e.g., "prepping a sales call is worth ~$20 to us").

3. Compute in your spreadsheet: (value per run − cost per use) × total uses gives the net value each skill has generated.

The calculation currently happens outside the product, but the CSV export makes it a quick spreadsheet exercise. Even rough estimates tell a compelling story: a call-prep skill costing $0.90 per run against $20 of value returns 20x on every use.

### Spend report CSV export

If you need a one-off detailed breakdown, you can export a per-user, per-model spend report as a CSV from **Analytics → All Activity → Spend → Export Spend**. Choose MTD, last month, last 90 days, or a custom range up to 90 days back. The CSV includes user email, user ID, account UUID, product, model, request count, prompt and completion tokens, and net and gross spend in USD.

### Analytics chat

Analytics chat lets you ask questions about your org's usage in plain language. Type a question—"show me daily spend for the last 30 days," "who are our top spenders," "what's our seat utilization rate"—and Claude returns a chart and a short written summary of what it found. You can follow up to refine, drill in, or pivot without starting over.

Use this when you have a specific question and don't want to navigate the dashboard, or when you're exploring trends and want fast back-and-forth. Results cover the last 30 days by default; specify a different range in your question if you need it. Data refreshes daily. **[Learn more](https://support.claude.com/en/articles/14729354-use-analytics-chat-to-ask-claude-about-usage)**.

### Analytics API

For programmatic access, use the Claude Enterprise Analytics API. Pull a ranked list of users by tokens used or dollars spent, or look at usage and cost trends over time broken down by product, model, context window, or region. Each request is capped at 31 days wide, starting within the last 365 days, and no earlier than Jan 1, 2026.

Your Primary Owner can generate an admin API key. Data refreshes every four hours; for invoicing-grade totals, query dates 30+ days in the past so late events have time to reconcile. **[Learn more](https://platform.claude.com/docs/en/manage-claude/analytics-api)** and review the **[API reference guide](https://platform.claude.com/docs/en/api/admin/analytics)**.

---

## End user education

Technology controls will get you most of the way, but user behavior drives the rest. A team that understands how consumption works will make better choices independently—and surface fewer edge cases for you to troubleshoot.

### What to communicate to end users

When you onboard users, share the following:

**How Claude is billed**

- Usage is measured in tokens. Long prompts and long conversations consume more tokens.

- Claude Code and Cowork sessions are significantly more token-intensive than chat. A single long coding session can use many more tokens than a typical chat session.

- Check your usage in settings by toggling to **Settings → Usage**.

**How to choose a model**

- Sonnet is the default and handles most tasks well. Use Opus only when Sonnet isn't getting you where you need to go.

- Your org has a default model set for new conversations; you can still switch models mid-conversation when a task needs it.

- The model selector is visible in the interface—remind users to check it, especially if they're running complex tasks.

- The model selector is sticky, so make it a practice to check that it's the model you want to use.

- The effort level appears next to the model name. Higher effort means more thorough responses but higher token consumption, so match it to the task.

**What happens when they hit a cap**

- If a user hits their individual cap, they can contact their group owner or the IT/admin team to request an increase.

- They won't lose work in progress—Claude will complete the current turn before limiting further usage.
---

SOURCE: https://support.claude.com/en/articles/14793921-find-and-join-a-console-organization

# Find and join a Console organization

Organization discovery lets you find and join your company’s existing Console organization when you start the sign-up flow with a business email address. Instead of creating a personal account, you can request to join—or be added automatically—depending on your organization’s configuration.

**Note:** Organization discovery only applies to organization accounts on the Console, not individual accounts, and must be enabled by an Admin before the capability is available. It’s unavailable for organizations that have single sign-on (SSO) enabled. If your organization uses SSO, your existing provisioning settings remain in effect.

## Admin setup

### Enable discoverability

Admins can manage organization discovery from identity and access settings.

**To enable discoverability:**

1. Log in as an Admin.

2. Navigate to **[Organization settings > Identity and access](http://platform.claude.com/settings/identity)**.

3. Your organization’s domains are listed at the top of the page.

4. Find the domain you want people to search for and click the toggle under **Discoverable**.

5. Find **New member approval** under **Authentication** and choose either “Approve automatically” or “Require admin approval.”

### Configure allowed domains

Admins can specify which email domains are allowed to discover and join the organization by clicking “Add domain” under **Domains** on the identity and access settings page. The organization owner’s domain appears on the **Domains** list automatically. Admins can configure additional allowed domains by adding them to the list, verifying them, and toggling **Discoverable** on. Personal email domains (like Gmail) and .edu domains can’t be added to the list.

### Choose an approval mode

Admins select how join requests are handled:

- **Approve automatically:** People are added to the organization automatically when they ask to join. They can immediately access the workspaces and resources their role permits.

- **Require admin approval:** An admin reviews and approves each join request individually. People aren’t added to the organization until an admin approves the request.

---

## How to find and join an organization

When someone signs up for the Console with a business email address that matches a discoverable organization, they’ll see the option to join during the signup flow. They can choose to join or continue with a personal account.

- If the organization uses “Approve automatically” to handle join requests, they’re added to the Console organization immediately.

- If the organization uses “Require admin approval” for join requests, a request is sent to the admin for review. The requester can choose to continue with a personal account until the request is approved or denied.

If multiple organizations share the same email domain and are all discoverable, the requester sees all of them and can choose which one to join.

---

## Other ways to join an organization

In addition to organization discovery, there are a few other ways to join a Console organization:

- **Email invitation:** An Admin or existing member of the organization may send you an email invitation to join.

- **Admin invitation:** An Admin can add you directly from **[Organization settings > Members](https://platform.claude.com/settings/members)**.

---

## SSO and organization discovery

Organization discovery isn’t available for Console organizations with single sign-on enabled. If your organization uses SSO, the feature doesn’t apply—your existing provisioning settings (including any just-in-time provisioning) remain unchanged. To enable organization discovery, SSO must be turned off first.
---

SOURCE: https://support.claude.com/en/articles/15330088-set-a-default-model-for-your-organization

# Set a default model for your organization

This guide explains how to choose the Claude model that new conversations start on across your organization. You can set one default for your whole organization, or set different defaults for specific custom roles.

Default model settings are available for Enterprise plan organizations. Primary Owners, Owners, and members whose custom role grants the Identity & Access permission can manage them in **[Organization settings > Models](http://claude.ai/admin-settings/models)**.

---

## How default models work

When you set or change a default model, it replaces the model currently selected in each member’s model picker. New conversations in chat, Claude Cowork, Claude Code, and Office Agents then start on the model you’ve chosen.

**Note:** Not all models are available in every product. If the selected model is not available in the product, Anthropic’s recommendation is used as default.

Members can still select a different model for any conversation. Claude remembers each member’s last selection, so their next conversation starts on whichever model they last used. When you update the default again, the new default replaces their selection.

For example: you set the organization default to Claude Sonnet 4.6, and every member’s new conversations start on Sonnet 4.6. A member switches a conversation to Claude Opus 4.7, so their next conversations start on Opus 4.7. When you later change the organization default, the new default replaces their selection again.

You can set a default at two levels:

- Organization default: applies to every member of your organization.

- Custom role default: applies to members assigned to that role and takes precedence over the organization default.

**Note:** Members on Claude Code CLI versions earlier than 2.1.199 won't pick up the organization default. Versions 2.1.196 through 2.1.198 also had a bug where setting a specific organization default caused other enabled models to disappear from the model picker in the CLI and VS Code extension; updating to 2.1.199 or later resolves both.

For member-facing CLI instructions, see **[Claude Code model configuration](https://support.claude.com/en/articles/11940350)**.

For member-facing instructions on switching models, see **[Change the model, effort, and thinking settings](https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings)**.

---

## Set the organization default model

The organization default applies to every member. To set it:

1. Navigate to **[Organization settings > Models](http://claude.ai/admin-settings/models)**.

2. Under **Default model**, select an option:

  1. “Use Anthropic’s recommended default”: Anthropic’s recommended model that updates automatically when new models are released.

  2. “Choose a specific model”: a specific model that won’t change when new models are released.

3. If you select “Choose a specific model,” choose a model from the list.

4. Click “Save changes.”



---

## Set a default model for a custom role

Custom role defaults let you set different starting models for different teams. For example, you can keep most of your organization on the recommended default while a specific group starts on a different model.

1. Navigate to **[Organization settings > Roles](http://claude.ai/admin-settings/roles)**.

2. Click the role you want to edit, or create a new role.

3. Select the **Models** tab, then under **Default model**, select a model. Roles are set to “None selected” unless you choose a specific model. Only models the role has access to can be selected.

4. Click “Save role” to save your changes.

A role’s default model takes precedence over the organization default for members assigned to that role.

If a member belongs to multiple groups whose custom roles set different default models, the most capable model will be the default. Capability is determined first by model family (Haiku, Sonnet, Opus), then release date, so more capable model families take precedence, and newer models within the same family take precedence.

**Note:** Custom roles only affect members whose role is set to “Custom.” Members with the User, Admin, or Owner roles get the default model from the organization setting, not from custom roles.

For details on creating roles and assigning them to groups, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452)**.

---

## Default model and Claude Code managed settings

If your organization also configures Claude Code through `managed-settings.json`, the model setting there takes precedence. When model is set in managed settings, Claude Code CLI and IDE start on that model and ignore the default you set in **[Organization settings > Models](http://claude.ai/admin-settings/models)**.

If `managed-settings.json` specifies `availableModels` that doesn't contain the default model, Claude CLI bypasses `availableModels` and starts on the selected default model unless `enforceAvailableModels` is set.

Managed settings apply only to Claude Code CLI and IDE, not to Claude Code on web or desktop. For consistent behavior across all Claude Code surfaces, we recommend setting the default here alone. For more on managed settings, see **[Claude Code settings](https://code.claude.com/docs/en/settings#settings-files)**.
---

SOURCE: https://support.claude.com/en/articles/15330651-claude-enterprise-admin-api-reference-guide

# Claude Enterprise Admin API reference guide

This guide covers **spend limits** and **spend limit increase requests** for your Claude Enterprise organization using the Claude Enterprise Admin API. Spend limits let you cap each member's usage credit spending over a recurring period, see where each member's limit is inherited from, and review or act on members' requests for a higher limit.

For per-user and time-bucketed usage and cost reporting, see the **[Analytics API reference guide](https://platform.claude.com/docs/en/api/admin/analytics)**.

Claude Enterprise Admin API is currently in public beta and available to organizations on Enterprise plans with usage credits enabled.

## Overview

There are eight endpoints across two resources:

| **Resource**                      | **Endpoints**                                                                                                                                                                                                                                                  | **Use for**                                                                                                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Spend limits**                  | `GET /v1/organizations/spend_limits/effective`<br>`GET /v1/organizations/spend_limits/{spend_limit_id}`<br>`POST /v1/organizations/spend_limits`<br>`DELETE /v1/organizations/spend_limits/{spend_limit_id}`                                                   | Read each member's effective limit and period-to-date spend; set or clear a per-user override.              |
| **Spend limit increase requests** | `GET /v1/organizations/spend_limit_increase_requests`<br>`GET /v1/organizations/spend_limit_increase_requests/{id}`<br>`POST /v1/organizations/spend_limit_increase_requests/{id}/approve`<br>`POST /v1/organizations/spend_limit_increase_requests/{id}/deny` | List members' requests for a higher limit, with the context needed to decide; approve or deny each request. |

Use the **spend limits** endpoints to answer, “What limit applies to each member, where does it come from, and how close are they to it?" and to set a per-user override. Use the **spend limit increase requests** endpoints to work the queue of member-submitted requests.

## Prerequisites and authentication

- Your organization must be on a Claude Enterprise plan.

- Usage credits must be enabled for your organization. Your Primary Owner can enable this under **Billing settings** in Claude.

- The Primary Owner needs to mint an Admin API key with one or both of the following scopes:

  - **`read:spend_limits`** (required for all `GET` endpoints)

  - **`write:spend_limits`** (required for `POST` and `DELETE` endpoints)

Pass the key in the **`x-api-key`** header on every request.

**Important:** Don't share API keys publicly or check them into source control.

## Create an Admin API key for your Claude Enterprise organization

1. **Sign in as the Primary Owner**—Only the Primary Owner of your Claude Enterprise parent organization can create these keys.

2. **Open API settings**—Go to **[Organization settings > API](https://claude.ai/admin-settings/api-access)** and find the **Keys** section.

3. **Click and create key**—Name the key and select the scopes you need from the **[scopes table](https://platform.claude.com/docs/en/manage-claude/admin-api-keys#choose-scopes-for-a-claude-enterprise-key)**. You can combine scopes from different APIs (for example, `read:analytics` and `read:spend_limits`) on a single key.

4. **Copy and store the secret**—Copy the displayed secret (starting with `sk-ant-api01-`) and store it in your secrets manager. The full secret is shown only once.

## Base URL

```
https://api.anthropic.com
```

## Rate limiting

All eight endpoints share a single per-organization limit of **60 requests per minute**. Requests over the limit return **429 Too Many Requests**.

## Pagination

`GET /v1/organizations/spend_limits/effective` and `GET /v1/organizations/spend_limit_increase_requests` are paginated with an **opaque cursor**. The first request returns up to `limit` rows plus a `next_page` cursor. Pass that cursor unchanged as the `page` parameter on the next request, and repeat until `next_page` is `null`.

**Important:** Don’t change query parameters mid-sequence. Cursors are bound to the filters that issued them. If you change `user_ids[]`, `status[]`, or `actor_ids[]` and pass an old cursor, you'll get a 400 with "cursor does not match current query parameters". Start a new sequence from the first page instead.

Treat the cursor string as opaque: don't parse, modify, or construct it yourself.

## Serializing list parameters

List parameters use bracket notation: repeat the parameter name with `[]` for each value.

```
user_ids[]=user_01AbCdEfGh&user_ids[]=user_01JkLmNoPq
```

## Error responses

| **Status** | **Meaning**                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400        | Invalid input, unsupported parameter value, page cursor does not match current parameters, or a precondition is not met (see per-endpoint Validations). |
| 401        | Missing `x-api-key` header.                                                                                                                             |
| 403        | API key is missing the required scope (`read:spend_limits` or `write:spend_limits`).                                                                    |
| 404        | Resource not found, or API key is unknown, expired, or revoked.                                                                                         |
| 429        | Rate limit exceeded.                                                                                                                                    |
| 500        | Internal error.                                                                                                                                         |

Error bodies have the shape:

```
{"type": "error", "error": {"type": "<error_type>", "message": "..."}, "request_id": "req_..."}
```

`error.type` is a status-dependent discriminator: `invalid_request_error` (400), `authentication_error` (401), `permission_error` (403), `not_found_error` (404), `rate_limit_error` (429), `api_error` (500). `request_id` is always present and is the value to quote when contacting support. The Validations table under each endpoint lists the specific messages.

---

## Concepts

### The spend limit hierarchy

Each member's usage credit spending is capped by an **effective spend limit**, resolved from a hierarchy of scope levels. When a member has no per-user override, they inherit the limit configured for their seat tier, their group (if your organization uses group-based limits), or the organization-wide default.

Reading `GET /v1/organizations/spend_limits/effective` returns every current member with their resolved effective limit, where that limit was resolved from (`source`), and their period-to-date spend. Setting a per-user override via `POST /v1/organizations/spend_limits` pins a member to a specific limit regardless of what they would otherwise inherit. Deleting the override returns them to the inherited limit.

### Scope

A scope identifies the level a spend limit is written or resolved at:

| **Type**       | **Fields**      | **Meaning**                                                                                                                                                   |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user`         | `user_id`       | A specific member. `user_id` matches the IDs returned by the Admin API users endpoints.                                                                       |
| `seat_tier`    | `seat_tier`     | A seat tier default. `seat_tier` values are fully-qualified identifiers such as `enterprise_standard` or `enterprise_tier_1`; additional values may be added. |
| `rbac_group`   | `rbac_group_id` | A group default, when your organization manages limits by group.                                                                                              |
| `organization` | —               | The organization-wide default.                                                                                                                                |

`scope.type` is an open string. Clients should treat unknown values as opaque and fall through rather than fail. Additional scope types may be added in future.

### Period

`period` is the recurring window over which the limit is enforced and spend resets. The only value today is `"monthly"`.

`period` is an open string. Clients should treat unknown values as opaque and fall through rather than fail. Additional period values may be added in the future.

### Amounts and currency

All monetary values are strings in **minor units of the organization's billing currency** (cents, for USD). For example, `"50000"` represents 500.00 USD. Parse as a decimal and divide by 100 to display dollars. Avoid binary floating-point for large values.

`amount` is **nullable**: `null` means **unlimited** (no limit). `"0"` means usage credits are **disabled** for that member.

`period_to_date_spend` is the member's usage credit accrued since the start of the current `period`, in the same minor-unit format. It may include a fractional part (for example, `"41280.125"`).

### Increase request lifecycle

A **spend limit increase request** is created when a member clicks "request more usage" in claude.ai. Requests are not created via this API.

| **Status** | **Meaning**                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pending`  | Awaiting admin action. The request normally carries a live `spend_summary` so you can see the member's current effective limit and period-to-date spend while deciding. `spend_summary` may be `null` if it couldn’t be computed, so handle that case.                                                                                                                                                     |
| `approved` | The request was resolved with approval: either an admin approved it explicitly (writing a per-user spend limit at the admin-supplied amount), another admin action made usage credits available to the member (for example, raising a seat-tier limit or enabling usage credit billing for the organization), or Anthropic support raised a limit on the organization's behalf. `spend_summary` is `null`. |
| `denied`   | An admin declined. `spend_summary` is `null`. Claude.ai hides that member's request button for 30 days from `resolved_at`; an admin can still raise the member's limit directly at any time.                                                                                                                                                                                                               |

Both `approved` and `denied` are terminal. A member has at most one `pending` request at a time.

Approving via `POST …/approve` writes the same per-user spend limit row that `POST /v1/organizations/spend_limits` writes. Setting a spend limit directly does *not* transition a pending request. Use the approve endpoint to resolve a request.

By default, Anthropic emails the member when their request is approved or denied. Pass `suppress_notification: true` on approve or deny to suppress that email (for example, when your own system notifies the member).

---

## The SpendLimit object

A configured limit at one scope level.

```
{
  "type": "spend_limit",
  "id": "spl_01AbCdEfGhIjKlMnOpQrSt",
  "created_at": "2026-05-01T12:00:00Z",
  "updated_at": "2026-05-03T09:14:11Z",
  "scope": { "type": "user", "user_id": "user_01AbCdEfGh" },
  "amount": "50000",
  "currency": "USD",
  "period": "monthly"
}
```

| **Field**    | **Type**          | **Description**                                                                 |
| ------------ | ----------------- | ------------------------------------------------------------------------------- |
| `type`       | string            | Always `"spend_limit"`.                                                         |
| `id`         | string            | Prefixed `spl_`.                                                                |
| `created_at` | string (RFC 3339) | When this limit was first set.                                                  |
| `updated_at` | string (RFC 3339) | When this limit was last changed.                                               |
| `scope`      | Scope             | The level this limit is written at. See the "Scope" section.                    |
| `amount`     | string or null    | Limit for the `period`, in minor units. `null` means unlimited.                 |
| `currency`   | string            | ISO 4217. The organization's billing currency.                                  |
| `period`     | string            | The recurring window over which `amount` is enforced. See the "Period" section. |

## The SpendSummary object

A computed per-member report row: the member's effective limit, where it came from, and their period-to-date spend. Not an addressable resource (no `id`).

```
{
  "scope": { "type": "user", "user_id": "user_01AbCdEfGh" },
  "amount": "50000",
  "currency": "USD",
  "period": "monthly",
  "source": { "type": "seat_tier", "seat_tier": "enterprise_standard" },
  "spend_limit_id": "spl_01XyZaBcDeFgHiJkLmNoPq",
  "period_to_date_spend": "31402.5"
}
```

| **Field**              | **Type**               | **Description**                                                                                                        |
| ---------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `scope`                | Scope (`type: "user"`) | The member this row is for.                                                                                            |
| `amount`               | string or null         | The effective limit for the `period`, in minor units. `null` means unlimited; `"0"` means usage credits are disabled.  |
| `currency`             | string                 | ISO 4217.                                                                                                              |
| `period`               | string                 | The period of the spend limit that `source` resolved to. See the "Period" section.                                     |
| `source`               | Scope                  | Where `amount` was resolved from in the hierarchy. Equals `scope` when the member has a per-user override.             |
| `spend_limit_id`       | string                 | ID of the `SpendLimit` that `source` resolved to. Fetch it with `GET /v1/organizations/spend_limits/{spend_limit_id}`. |
| `period_to_date_spend` | string                 | The member's usage credits accrued since the start of the current `period`, in minor units.                            |

## The SpendLimitIncreaseRequest object

```
{
  "type": "spend_limit_increase_request",
  "id": "slir_01AbCdEfGhIjKlMnOpQrSt",
  "created_at": "2026-05-04T16:22:09Z",
  "status": "pending",
  "resolved_at": null,
  "resolved_by": null,
  "actor": {
    "type": "user_actor",
    "user_id": "user_01AbCdEfGh",
    "name": "Jane Smith",
    "email_address": "jane@example.com"
  },
  "spend_summary": {
    "scope": { "type": "user", "user_id": "user_01AbCdEfGh" },
    "amount": "50000",
    "currency": "USD",
    "period": "monthly",
    "source": { "type": "seat_tier", "seat_tier": "enterprise_standard" },
    "spend_limit_id": "spl_01XyZaBcDeFgHiJkLmNoPq",
    "period_to_date_spend": "48900"
  }
}
```

| **Field**       | **Type**                  | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | string                    | Always `"spend_limit_increase_request"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `id`            | string                    | Prefixed `slir_`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `created_at`    | string (RFC 3339)         | When the member submitted the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `status`        | string                    | `pending`, `approved`, or `denied`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `resolved_at`   | string (RFC 3339) or null | When the request was approved or denied. `null` while pending.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `resolved_by`   | Actor or null             | Who approved or denied the request: either a `user_actor` (an admin acted in claude.ai) or a `scoped_api_key_actor` (resolved via this API). When a request is auto-resolved by an admin action in claude.ai (for example, raising a seat-tier limit, enabling usage credit billing for the organization, or raising the member's limit), `resolved_by` is the acting admin's `user_actor`. `null` while pending, when the resolving admin's account has since been deleted, or when the request was resolved by Anthropic support. A `scoped_api_key_actor` may reference a key that has since been deleted or revoked. Treat `scoped_api_key_id` as a historical reference and tolerate lookup failures. |
| `actor`         | Actor (`user_actor`)      | The member who submitted the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `spend_summary` | SpendSummary or null      | Live decision context for the requester: their effective limit and period-to-date spend. Present while `status` is pending (may be `null` if the summary couldn’t be computed); always `null` once resolved.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### Actor

| **Field**           | **Type**       | **Description**                                                                                                  |
| ------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| `type`              | string         | `user_actor` or `scoped_api_key_actor`.                                                                          |
| `user_id`           | string         | Present on `user_actor`. The user's ID; same value accepted by `actor_ids[]`.                                    |
| `name`              | string or null | Present on `user_actor`. The user's name; `null` if the account has been deleted or the user has not set a name. |
| `email_address`     | string or null | Present on `user_actor`. The user's email; `null` if the account has been deleted.                               |
| `scoped_api_key_id` | string         | Present on `scoped_api_key_actor`. Prefixed `apikey_`.                                                           |

---

## Spend limits

### 1. List effective spend limits

```
GET /v1/organizations/spend_limits/effective
```

Returns **every current member** of the organization with their resolved effective limit and period-to-date spend. Members without a per-user override appear with `source.type` of `seat_tier`, `rbac_group`, or `organization`. Ex-members aren’t listed.

Requires scope: `read:spend_limits.`

#### Query parameters

| **Field**    | **Type**                | **Required** | **Default** | **Description**                                                                                                           |
| ------------ | ----------------------- | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `user_ids[]` | string, max 100 entries | No           | all members | Narrow to specific members. Accepts `user_...` IDs. An entry that isn’t a current member is silently omitted from `data`. |
| `limit`      | integer 1–1000          | No           | 20          | Rows per page.                                                                                                            |
| `page`       | opaque cursor string    | No           | —           | The `next_page` value from a previous response.                                                                           |

#### Response fields

| **Field**   | **Type**              | **Description**                                                                          |
| ----------- | --------------------- | ---------------------------------------------------------------------------------------- |
| `data`      | array of SpendSummary | One entry per member, ordered by when the member joined the organization (newest first). |
| `next_page` | string or null        | Opaque cursor for the next page; `null` when no more pages.                              |

#### Example request

```
curl "https://api.anthropic.com/v1/organizations/spend_limits/effective?limit=20" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

#### Example response

```
{
  "data": [
    {
      "scope": { "type": "user", "user_id": "user_01AbCdEfGh" },
      "amount": "50000",
      "currency": "USD",
      "period": "monthly",
      "source": { "type": "seat_tier", "seat_tier": "enterprise_standard" },
      "spend_limit_id": "spl_01XyZaBcDeFgHiJkLmNoPq",
      "period_to_date_spend": "31402.5"
    }
  ],
  "next_page": "page_..."
}
```

#### Validations

| **Condition**                                     | **Status** | **Message**                                                 |
| ------------------------------------------------- | ---------- | ----------------------------------------------------------- |
| `user_ids[]` entry malformed                      | 400        | `user_ids[]: entry is not a valid user ID`                  |
| `user_ids[]` has more than 100 entries            | 400        |                                                             |
| `limit` outside 1–1000                            | 400        |                                                             |
| `page` cursor invalid                             | 400        | `page: invalid cursor`                                      |
| `page` cursor does not match current `user_ids[]` | 400        | `page: cursor does not match current query parameters`      |
| `page` cursor from a different API version        | 400        | `page: cursor was issued by a different API version`        |
| Organization is not on an Enterprise plan         | 400        | `this endpoint is not supported for this organization type` |
| Usage credit billing not enabled                  | 400        | `overage billing is not enabled for this organization`      |

---

### 2. Get a spend limit

```
GET /v1/organizations/spend_limits/{spend_limit_id}
```

Returns a single spend limit by ID. Use this to inspect the row that a `SpendSummary.spend_limit_id` or a `POST` response referenced.

Requires scope: `read:spend_limits`.

#### Path parameters

| **Field**        | **Type** | **Description**  |
| ---------------- | -------- | ---------------- |
| `spend_limit_id` | string   | Prefixed `spl_`. |

#### Response

A SpendLimit object.

#### Example request

```
curl "https://api.anthropic.com/v1/organizations/spend_limits/spl_01AbCdEfGhIjKlMnOpQrSt" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

#### Validations

| **Condition**                                   | **Status** | **Message**                                                 |
| ----------------------------------------------- | ---------- | ----------------------------------------------------------- |
| `spend_limit_id` not found in this organization | 404        |                                                             |
| Organization is not on an Enterprise plan       | 400        | `this endpoint is not supported for this organization type` |
| Usage credit billing not enabled                | 400        | `overage billing is not enabled for this organization`      |

---

### 3. Set a spend limit

```
POST /v1/organizations/spend_limits
```

Sets a **per-user** spend limit override. Upsert: setting a limit for a user who already has one overwrites it in place.

Only `scope.type: "user"` is accepted. Seat-tier, group, and organization-level defaults are configured in claude.ai settings.

Setting a spend limit directly does *not* transition a member's pending increase request. Use the approve endpoint to resolve a request.

Requires scope: `write:spend_limits`.

#### Request body

| **Field** | **Type**       | **Required** | **Description**                                                                                                                                                         |
| --------- | -------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scope`   | object         | Yes          | `{ "type": "user", "user_id": "user_..." }`.                                                                                                                            |
| `amount`  | string or null | Yes          | New limit for the `period`, in minor units, as a non-negative integer decimal string. `"0"` disables usage credit for the member. `null` removes the limit (unlimited). |
| `period`  | string         | No           | Default `"monthly"`. See the "Period" section.                                                                                                                          |

#### Response

A SpendLimit object reflecting the written override.

#### Example request

```
curl -X POST "https://api.anthropic.com/v1/organizations/spend_limits" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
  -H "content-type: application/json" \
  -d '{"scope": {"type": "user", "user_id": "user_01AbCdEfGh"}, "amount": "75000"}'
```

#### Example response

```
{
  "type": "spend_limit",
  "id": "spl_01RsTuVwXyZaBcDeFgHiJk",
  "created_at": "2026-05-11T10:02:44Z",
  "updated_at": "2026-05-11T10:02:44Z",
  "scope": { "type": "user", "user_id": "user_01AbCdEfGh" },
  "amount": "75000",
  "currency": "USD",
  "period": "monthly"
}
```

#### Validations

| **Condition**                                                | **Status** | **Message**                                                 |
| ------------------------------------------------------------ | ---------- | ----------------------------------------------------------- |
| `scope.type` is not `"user"`                                 | 400        | `scope.type: not yet supported`                             |
| `scope.user_id` malformed                                    | 400        | `scope.user_id: malformed`                                  |
| `scope.user_id` not a member of this organization            | 400        | `scope.user_id: not a member of this organization`          |
| `amount` negative, fractional, or not a valid decimal string | 400        |                                                             |
| `period` is not `"monthly"`                                  | 400        | `period: not yet supported`                                 |
| Organization is not on an Enterprise plan                    | 400        | `this endpoint is not supported for this organization type` |
| Usage credit billing not enabled                             | 400        | `overage billing is not enabled for this organization`      |

---

### 4. Remove a spend limit

```
DELETE /v1/organizations/spend_limits/{spend_limit_id}
```

Removes a **per-user** override so the member falls back to the inherited limit (seat tier, group, or organization default). Seat-tier, group, and organization-level rows can’t be deleted via this endpoint.

Requires scope: `write:spend_limits`.

#### Path parameters

| **Field**        | **Type** | **Description**                                         |
| ---------------- | -------- | ------------------------------------------------------- |
| `spend_limit_id` | string   | Prefixed `spl_`. Must be the ID of a per-user override. |

#### Response

```
{ "type": "spend_limit_deleted", "id": "spl_01RsTuVwXyZaBcDeFgHiJk" }
```

#### Example request

```
curl -X DELETE "https://api.anthropic.com/v1/organizations/spend_limits/spl_01RsTuVwXyZaBcDeFgHiJk" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

#### Validations

| **Condition**                                               | **Status** | **Message**                                                    |
| ----------------------------------------------------------- | ---------- | -------------------------------------------------------------- |
| `spend_limit_id` not found in this organization             | 404        |                                                                |
| `spend_limit_id` is a seat-tier, group, or organization row | 400        | `Only per-user spend limits can be deleted via this endpoint.` |
| Organization is not on an Enterprise plan                   | 400        | `this endpoint is not supported for this organization type`    |
| Usage credit billing not enabled                            | 400        | `overage billing is not enabled for this organization`         |

---

## Spend limit increase requests

### 5. List increase requests

```
GET /v1/organizations/spend_limit_increase_requests
```

Lists increase requests, most recent first. Requests whose requester is no longer a member of the organization are excluded.

Requires scope: `read:spend_limits`.

#### Query parameters

| **Field**     | **Type**                                       | **Required** | **Default** | **Description**                                             |
| ------------- | ---------------------------------------------- | ------------ | ----------- | ----------------------------------------------------------- |
| `status[]`    | one or more of `pending`, `approved`, `denied` | No           | all         | Filter by status. Repeat the parameter for multiple values. |
| `actor_ids[]` | string                                         | No           | all         | Filter by requester. Accepts `user_...` IDs.                |
| `limit`       | integer 1–1000                                 | No           | 20          | Rows per page.                                              |
| `page`        | opaque cursor string                           | No           | —           | The `next_page` value from a previous response.             |

#### Response fields

| **Field**   | **Type**                           | **Description**                                             |
| ----------- | ---------------------------------- | ----------------------------------------------------------- |
| `data`      | array of SpendLimitIncreaseRequest | Ordered by `created_at` descending.                         |
| `next_page` | string or null                     | Opaque cursor for the next page; `null` when no more pages. |

#### Example request

```
curl "https://api.anthropic.com/v1/organizations/spend_limit_increase_requests?status[]=pending&limit=50" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

#### Example response

```
{
  "data": [
    {
      "type": "spend_limit_increase_request",
      "id": "slir_01AbCdEfGhIjKlMnOpQrSt",
      "created_at": "2026-05-04T16:22:09Z",
      "status": "pending",
      "resolved_at": null,
      "resolved_by": null,
      "actor": {
        "type": "user_actor",
        "user_id": "user_01AbCdEfGh",
        "name": "Jane Smith",
        "email_address": "jane@example.com"
      },
      "spend_summary": {
        "scope": { "type": "user", "user_id": "user_01AbCdEfGh" },
        "amount": "50000",
        "currency": "USD",
        "period": "monthly",
        "source": { "type": "seat_tier", "seat_tier": "enterprise_standard" },
        "spend_limit_id": "spl_01XyZaBcDeFgHiJkLmNoPq",
        "period_to_date_spend": "48900"
      }
    }
  ],
  "next_page": null
}
```

#### Validations

| **Condition**                                                    | **Status** | **Message**                                                             |
| ---------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------- |
| `actor_ids[]` entry malformed                                    | 400        | `actor_ids[]: invalid tagged user ID`                                   |
| `limit` outside 1–1000                                           | 400        |                                                                         |
| `page` cursor malformed                                          | 400        | `invalid page cursor format` or `invalid page cursor`                   |
| `page` cursor does not match current `status[]` or `actor_ids[]` | 400        | `page cursor does not match current query parameters`                   |
| `page` cursor from a different API version                       | 400        | `page cursor was issued by a different API version; restart pagination` |
| Organization is not on an Enterprise plan                        | 400        | `this endpoint is not supported for this organization type`             |
| Usage credit billing not enabled                                 | 400        | `overage billing is not enabled for this organization`                  |

---

### 6. Get an increase request

```
GET /v1/organizations/spend_limit_increase_requests/{spend_limit_increase_request_id}
```

Returns a single increase request.

Requires scope: `read:spend_limits`.

#### Path parameters

| **Field**                         | **Type** | **Description**   |
| --------------------------------- | -------- | ----------------- |
| `spend_limit_increase_request_id` | string   | Prefixed `slir_`. |

#### Response

A SpendLimitIncreaseRequest object.

#### Example request

```
curl "https://api.anthropic.com/v1/organizations/spend_limit_increase_requests/slir_01AbCdEfGhIjKlMnOpQrSt" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

#### Validations

| **Condition**                                        | **Status** | **Message**                                                 |
| ---------------------------------------------------- | ---------- | ----------------------------------------------------------- |
| Request not found in this organization               | 404        |                                                             |
| Requester is no longer a member of this organization | 404        |                                                             |
| Organization is not on an Enterprise plan            | 400        | `this endpoint is not supported for this organization type` |
| Usage credit billing not enabled                     | 400        | `overage billing is not enabled for this organization`      |

---

### 7. Approve an increase request

```
POST /v1/organizations/spend_limit_increase_requests/{spend_limit_increase_request_id}/approve
```

Approves a pending request. Writes a **per-user spend limit** at `amount` for the requester and transitions the request to `approved`. The request doesn’t carry a requested amount, the admin supplies the new limit on approval.

Requires scope: `write:spend_limits`.

#### Path parameters

| **Field**                         | **Type** | **Description**   |
| --------------------------------- | -------- | ----------------- |
| `spend_limit_increase_request_id` | string   | Prefixed `slir_`. |

#### Request body

| **Field**               | **Type** | **Required** | **Default** | **Description**                                                                                |
| ----------------------- | -------- | ------------ | ----------- | ---------------------------------------------------------------------------------------------- |
| `amount`                | string   | Yes          | —           | New per-user limit for the `period`, in minor units, as a non-negative integer decimal string. |
| `period`                | string   | No           | `"monthly"` | See the "Period" section.                                                                      |
| `suppress_notification` | boolean  | No           | `false`     | If `true`, Anthropic doesn’t email the member that their request was approved.                 |

#### Response

The SpendLimitIncreaseRequest in status `approved`, with an additional `spend_limit` field containing the SpendLimit that was written.

#### Example request

```
curl -X POST "https://api.anthropic.com/v1/organizations/spend_limit_increase_requests/slir_01AbCdEfGhIjKlMnOpQrSt/approve" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
  -H "content-type: application/json" \
  -d '{"amount": "75000", "suppress_notification": true}'
```

#### Example response

```
{
  "type": "spend_limit_increase_request",
  "id": "slir_01AbCdEfGhIjKlMnOpQrSt",
  "created_at": "2026-05-04T16:22:09Z",
  "status": "approved",
  "resolved_at": "2026-05-11T10:05:02Z",
  "resolved_by": {
    "type": "scoped_api_key_actor",
    "scoped_api_key_id": "apikey_01ZyXwVuTsRqPoNmLkJiHg"
  },
  "actor": {
    "type": "user_actor",
    "user_id": "user_01AbCdEfGh",
    "name": "Jane Smith",
    "email_address": "jane@example.com"
  },
  "spend_summary": null,
  "spend_limit": {
    "type": "spend_limit",
    "id": "spl_01RsTuVwXyZaBcDeFgHiJk",
    "created_at": "2026-05-11T10:05:02Z",
    "updated_at": "2026-05-11T10:05:02Z",
    "scope": { "type": "user", "user_id": "user_01AbCdEfGh" },
    "amount": "75000",
    "currency": "USD",
    "period": "monthly"
  }
}
```

#### Validations

| **Condition**                                                | **Status** | **Message**                                                 |
| ------------------------------------------------------------ | ---------- | ----------------------------------------------------------- |
| Request not found in this organization                       | 404        |                                                             |
| Requester is no longer a member of this organization         | 404        |                                                             |
| Request already `approved` or `denied`                       | 400        | `spend limit increase request is already resolved`          |
| `amount` negative, fractional, or not a valid decimal string | 400        |                                                             |
| `period` is not `"monthly"`                                  | 400        | `period: not yet supported`                                 |
| Organization is not on an Enterprise plan                    | 400        | `this endpoint is not supported for this organization type` |
| Usage credit billing not enabled                             | 400        | `overage billing is not enabled for this organization`      |

---

### 8. Deny an increase request

```
POST /v1/organizations/spend_limit_increase_requests/{spend_limit_increase_request_id}/deny
```

Denies a pending request. Idempotent on `denied`: denying an already-denied request returns 200 with the existing resource. Denying an already-approved request is rejected so automation can distinguish a retry from a conflicting decision.

Requires scope: `write:spend_limits`.

#### Path parameters

| **Field**                         | **Type** | **Description**   |
| --------------------------------- | -------- | ----------------- |
| `spend_limit_increase_request_id` | string   | Prefixed `slir_`. |

#### Request body

| **Field**               | **Type** | **Required** | **Default** | **Description**                                                              |
| ----------------------- | -------- | ------------ | ----------- | ---------------------------------------------------------------------------- |
| `suppress_notification` | boolean  | No           | `false`     | If `true`, Anthropic doesn’t email the member that their request was denied. |

#### Response

A SpendLimitIncreaseRequest in status denied.

#### Example request

```
curl -X POST "https://api.anthropic.com/v1/organizations/spend_limit_increase_requests/slir_01AbCdEfGhIjKlMnOpQrSt/deny" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
  -H "content-type: application/json" \
  -d '{"suppress_notification": true}'
```

#### Validations

| **Condition**                                        | **Status**          | **Message**                                                 |
| ---------------------------------------------------- | ------------------- | ----------------------------------------------------------- |
| Request not found in this organization               | 404                 |                                                             |
| Requester is no longer a member of this organization | 404                 |                                                             |
| Request already `approved`                           | 400                 | `spend limit increase request is already approved`          |
| Request already `denied`                             | — (200, idempotent) |                                                             |
| Organization is not on an Enterprise plan            | 400                 | `this endpoint is not supported for this organization type` |
| Usage credits not enabled                            | 400                 | `overage billing is not enabled for this organization`      |
---

SOURCE: https://support.claude.com/en/articles/15422948-enable-us-only-inference-for-your-organization

# Enable US-only inference for your organization

This article explains what the **US-only inference** setting does, how to turn it on, and how it affects billing for your Enterprise organization.

US-only inference is available on usage-based Enterprise plans. Primary Owners, Owners, and custom roles with the Privacy permission set to "Can manage" can manage this setting.

## What is US-only inference?

US-only inference keeps your organization's inference, the model processing that happens when Claude generates a response, within the United States.

When the setting is on, all inference for your organization runs on servers located in the United States. This applies to usage across all the Claude apps, including Claude Code, Claude Desktop, etc., and includes background processing like conversation titles and memory. Using US-only inference comes with an increased cost. See **[How billing works](#h_8f4f5c2b9d)** below.

When the setting is off, inference may be routed to servers in other regions for speed and availability.

## Enable US-only inference

1. Navigate to **[Organization settings > Data and privacy](https://claude.ai/admin-settings/data-privacy-controls)**.

2. Find **US-only inference**.

3. Turn on the toggle.

The setting applies to your entire organization. Changes should take effect instantly, but may have some delay based on which of the Claude apps you’re using.

**Note:** If your organization previously opted out of global routing or has US-only inference requirements in its contract, the setting is already on and can't be changed. Your existing pricing terms continue to apply. Contact your account team with questions.

## How billing works

When US-only inference is on, your organization's usage is billed at 1.1x standard API rates for Claude Opus 4.6, Claude Sonnet 4.6, and later models. Your seat fees don't change and the 1.1x rate applies only to usage. Requests on Claude Opus 4.5, Claude Sonnet 4.5, Claude Haiku 4.5, or earlier models are billed at the standard rate.

Learn more about **[how you're billed for your Enterprise plan](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan)**.

## What US-only inference doesn't cover

US-only inference applies to inference only, where Claude's models process your requests.

It doesn't control:

- **Connectors and third-party services.** When Claude works with a connected service like Slack or Google Drive, that service processes data on its own infrastructure, which may be located outside the US. The US-only inference setting doesn't change where third-party services operate.

- **Data storage.** Where your organization's data is stored is separate from where inference runs.

## Frequently asked questions

### Who can see and change this setting?

Primary Owners, Owners, and members with a custom role that has the Privacy permission set to "Can manage" can change the setting. Members with Privacy set to "Can view" can see it but can't change it.

### Does this setting apply to the Claude API?

This setting applies to your Claude Enterprise organization. For inference location options on the Claude API, see the **[data residency documentation on Claude API Docs](https://platform.claude.com/docs/en/manage-claude/data-residency)**.

### Why don't I see this setting?

US-only inference is only available on usage-based Enterprise plans. If your organization is on a Team plan or a legacy seat-based Enterprise plan, the setting won't appear.
---

SOURCE: https://support.claude.com/en/articles/15455031-covered-models-under-a-business-associate-agreement-baa

# Covered Models under a Business Associate Agreement \(BAA\)

This article is for organizations that use Anthropic's HIPAA-ready services under a Business Associate Agreement (BAA). It explains which configurations are Eligible Services under the BAA and whether you can access Covered Models. **Your organization is responsible for ensuring its use of these services complies with applicable legal obligations.** Learn about **[Business Associate Agreements (BAA) for Commercial Customers](https://support.claude.com/en/articles/8114513-business-associate-agreements-baa-for-commercial-customers)** and **[Covered Models](https://support.claude.com/en/articles/15425695-covered-models)**.

**Important:** The primary ways to access Covered Models while covered by Anthropic's BAA are through the HIPAA-ready API and Chat on HIPAA-ready Claude Enterprise plans. There's currently no configuration that allows BAA-covered access to Covered Models in Claude Code or Cowork.

## Covered Models and data retention

Covered Models, like Claude Fable 5, require 30-day data retention on every platform where they're offered, as part of our safety work, and they can't be accessed from organizations or workspaces with zero data retention (ZDR) enabled. Learn about **[data retention practices for Mythos-class models](https://support.claude.com/en/articles/15425996-data-retention-practices-for-mythos-class-models)**.

Access to newly released Covered Models rolls out in stages on subscription and seat-based Enterprise plans, so a model may not appear for your organization right away—no configuration change is needed. Some Covered Models are available only to approved partners under limited access programs.

## Coverage at a glance

Each row in the table is a configuration: a product, how you access it, and whether you're using standard retention or zero data retention. The two right-hand columns show whether that configuration is covered under Anthropic's BAA and whether it can access Covered Models.

**Note:** Coverage under Anthropic's BAA always requires (a) signing the BAA, and (b) accessing Anthropic's products via their HIPAA-ready or (in the case of Claude Code) zero data retention configurations. Learn about **[HIPAA-ready API access](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#hipaa-readiness)** and **[HIPAA-ready Enterprise plans](https://support.claude.com/en/articles/13296973-hipaa-ready-enterprise-plans)**.

| **Product**         | **How you access it**         | **Data retention**                                                             | **Eligible Service under Anthropic's BAA?** | **Can you access Covered Models?** |
| ------------------- | ----------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- | ---------------------------------- |
| Chat                | Claude Enterprise             | Standard retention                                                             | ✅ Yes                                       | ✅ Yes                              |
| Claude Code         | Claude Enterprise             | Zero data retention<br>**Note:** ZDR is available for qualified accounts only. | ✅ Yes<br>                                   | ❌ No                               |
| Claude Code         | Claude Enterprise             | Standard retention                                                             | ❌ No                                        | ✅ Yes                              |
| Claude Code         | 1P API org                    | Zero data retention                                                            | ✅ Yes                                       | ❌ No                               |
| Claude Code         | 1P API org                    | Standard retention                                                             | ❌ No                                        | ✅ Yes                              |
| Claude Code         | 3P API (Google Vertex only)\* | Standard retention                                                             | ❌ No                                        | ✅ Yes                              |
| Cowork              | Claude Enterprise             | Standard retention                                                             | ❌ No                                        | ✅ Yes                              |
| Claude API (1P API) | HIPAA-ready API               | Standard retention                                                             | ✅ Yes                                       | ✅ Yes                              |
| Claude API (1P API) | Regular API                   | Zero data retention                                                            | ✅ Yes                                       | ❌ No                               |
| Claude API (1P API) | Regular API                   | Standard retention                                                             | ❌ No                                        | ✅ Yes                              |

*Anthropic's BAA doesn't apply to services purchased through a third-party cloud provider. For questions about coverage on these platforms, contact your cloud provider and your Anthropic account team.
​

Requests to a Covered Model from a ZDR-enabled organization or workspace return an error.

## How to access Covered Models under the BAA

To access Covered Models in configurations that are covered under the BAA:

- **For API workloads: use a HIPAA-ready API organization.** This configuration operates with standard retention, so your applications can access Covered Models, including Claude Fable 5. If your organization doesn't have a HIPAA-ready API organization yet, contact your Anthropic account team to set one up. Note that Claude Code isn't an Eligible Service on a HIPAA-ready API organization. Learn more **[about HIPAA-ready API access](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#hipaa-readiness)**.

- **For Chat: use a HIPAA-ready Claude Enterprise plan.** Chat operates with standard retention, so it can access Covered Models with no configuration change. If your organization hasn't activated HIPAA readiness on its Enterprise plan, learn how in **[HIPAA-ready Enterprise plans](https://support.claude.com/en/articles/13296973-hipaa-ready-enterprise-plans)**.

**Important:** Claude Code is only covered under the BAA with ZDR enabled, and ZDR blocks Covered Models. Cowork isn't an Eligible Service under the BAA in any configuration. You can use Covered Models in Claude Code or Cowork outside the BAA, but don't submit protected health information (PHI).

## How to access Covered Models outside the BAA

To access Covered Models in configurations that aren't covered under the BAA:

- **On a 1P API organization with zero data retention enabled, you have two options:**

  - Enable standard retention in a dedicated workspace (**Workspace > Manage > Privacy Controls**). Your other workspaces keep ZDR. See **[Data retention practices for Mythos-class models](https://support.claude.com/en/articles/15425996-data-retention-practices-for-mythos-class-models#h_7008995545)** for instructions.

  - Contact your Anthropic account team to remove ZDR from the organization entirely.

- **For Claude Code through Claude Enterprise with zero data retention enabled:** Contact your Anthropic account team to change the retention setting or to set up a separate sandbox organization. You can also access Claude Code through a 1P API organization with standard retention.

**Note:** These configurations are not covered under the BAA. Don't submit protected health information (PHI) through them.

## Before you change your configuration

Some organizations may consider setting up a separate, non-ZDR organization to access Covered Models in Claude Code, Cowork, Chat, or API in production. Before you do, keep in mind:

- **A standard API organization without ZDR or the HIPAA configuration is not an Eligible Service under Anthropic's BAA.** Don't submit protected health information (PHI) through it.

- **HIPAA readiness and ZDR cannot coexist on a single 1P API organization.** If your organization needs both HIPAA-ready production API usage and ZDR for Claude Code, you'll need separate organization IDs.

- **Cowork is not an Eligible Service under Anthropic's BAA in any configuration**, regardless of retention settings or the model in use, and shouldn't be used with PHI.

- **If your teams work across multiple organizations with different coverage, you're responsible for ensuring PHI is only submitted through Eligible Services**, configured according to the **[Implementation Guide for HIPAA Entities](https://trust.anthropic.com/resources?s=rgirr4qe8u7ek8c2igx3&name=claude-for-enterprise-hipaa-ready-offering-implementation-guide)**.
---

SOURCE: https://support.claude.com/en/articles/15694740-manage-model-access-for-your-organization

# Manage model access for your organization

This guide explains how to control which Claude models members of your organization can use, and how to cap the effort level each role can select per model. You can manage model access for your whole organization or for specific custom roles.

Model access settings are available in beta for Enterprise plan organizations. Primary Owners, Owners, and members whose custom role grants the Identity & Access permission can manage them in **[Organization settings > Models](http://claude.ai/admin-settings/models)**.

To set the model new conversations start on, see **[Set a default model for your organization](https://support.claude.com/en/articles/15330088)**.

---

## How model access works

Model access is determined at two levels:

- **Organization level:** each model is enabled or disabled for everyone in your organization. Disabling a model here removes it for every member, including Owners and Admins.

- **Custom role level:** for members on custom roles, each role grants access to a subset of the models enabled at the organization level. A role can also cap the maximum effort level members can select on each model.

The organization setting is the ceiling, so a role can’t grant access to a model that’s disabled for the organization. When the feature first becomes available, every model is enabled at both levels, so nothing changes for your members until you adjust these settings.

**Note:** Haiku models are always available to every member and can’t be disabled. This guarantees members always have at least one model to fall back to.

## Who each level affects

- Disabling a model at the organization level affects every member, including Primary Owners, Owners, Admins, and Users.

- Role-level model access and effort limits affect only members whose role is set to “Custom.” Members with the User, Admin, or Owner roles can use every model enabled at the organization level, at any effort level.

---

## Enable or disable a model for your organization

1. Navigate to **[Organization settings > Models](http://claude.ai/admin-settings/models)**.

2. Under **Model access**, find the model you want to change.

3. To enable a model, switch the toggle next to it on, then click the role dropdown to select the roles that can access it.

4. To disable a model, click the role dropdown and deselect the roles before switching the toggle off.

5. Click "Save."

If any custom role uses the model you’re disabling as its default, you’ll be prompted to change that role’s default before the change can be saved.





---

## Set model access for a custom role

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click the role you want to edit, or click “Add role” to create one.

3. Select the "Models" tab.

4. Under **Model access**, switch each model on or off. Models disabled at the organization level appear but can’t be enabled until you turn them on for the organization.

5. Click “Save.”

Only models the role grants access to can be selected as that role’s default model.



---

## Limit the maximum effort level for a custom role

Effort limits determine how much computation members on a role can apply per response on each model. Higher effort levels produce more thorough responses but consume more usage. Effort limits can only be set per role, not at the organization level.

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click the role you want to edit.

3. Select the "Models" tab.

4. Next to a model, click the gear icon and choose a level.

5. Click "Save" to save your changes.



Members on the role see only effort levels at or below the cap in their model menu. Note that available effort levels differ depending on the model, and some models don’t support effort level settings at all. For an explanation of each level, see **[Change the model, effort, and thinking settings](https://support.claude.com/en/articles/8664678)**.

---

## How access combines across multiple roles

If a member belongs to multiple groups with different custom roles, model settings combine like other role permissions:

- **Model access is additive.** The member can use every model granted by any of their roles, as long as it’s enabled at the organization level.

- **Effort limits take the highest cap.** For each model, the member gets the highest maximum effort level any of their roles allows.

For how default models are chosen across multiple roles, see **[Set a default model for your organization](https://support.claude.com/en/articles/15330088)**.

For details on creating roles and assigning them to groups, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452)**.

---

## What users see

In every covered product, the model picker shows only the models the member has access to. Effort levels above a role’s cap don’t appear in the effort menu.

Model availability also depends on the product. Each product supports a different set of models, so an enabled model appears only in the products that support it.

If you disable a model a member is using in an open conversation or session, that conversation falls back to the member’s default model the next time they open it. If the member sends a message while you’re making the change, they’ll see an error that the model isn’t available and be prompted to switch.

---

## Where model access settings apply

Model access settings are enforced across these products:

| **Product**                        | **Model access settings apply** |
| ---------------------------------- | ------------------------------- |
| Chat (web, desktop, mobile)        | ✅                               |
| Claude Cowork                      | ✅                               |
| Claude Code (CLI, remote, desktop) | ✅ CLI version 2.1.199 or later  |
| Claude for Microsoft 365           | ✅                               |
| Claude Tag                         | ✅                               |
| Claude Design                      | ✅                               |
| Claude in Chrome                   | Not yet supported               |
| Claude Security                    | Not yet supported               |

**Note:** Members on Claude Code CLI versions earlier than 2.1.199 still see disabled models and effort levels in the picker, but requests using them are rejected.

## Model access and Claude Code managed settings

If your organization also configures Claude Code through `managed-settings.json`, the `availableModels` setting and model access work together. In Claude Code CLI and IDE, members see only models that appear in `availableModels` *and* are enabled by their model access settings—a model removed by either one is unavailable.

Managed settings apply only to Claude Code CLI and IDE, not to Claude Code on web or desktop. For consistent behavior across all Claude Code surfaces, we recommend using model access settings alone. For more on managed settings, see **[Claude Code settings](https://code.claude.com/docs/en/settings#settings-files)**.
---

SOURCE: https://support.claude.com/en/articles/8114513-business-associate-agreements-baa-for-commercial-customers

# Business Associate Agreements \(BAA\) for Commercial Customers

*This article is about our commercial products such as Claude for Work and the Anthropic API. For our consumer products such as Claude Free, Pro, Max and when accounts from those plans use Claude Code, see **[here](https://privacy.claude.com/en/collections/10663362-consumers)**.*

*For Claude Enterprise features to be covered under a Business Associate Agreement (BAA), the Primary Owner of the organization must activate HIPAA compliance in the HIPAA-ready Claude Enterprise organization settings under “Data and privacy” and accept Anthropic's BAA. Standard Claude Enterprise plans do not include BAA coverage without action from a Primary Owner.*

Anthropic provides a BAA covering our HIPAA-ready services, such as use of our first-party API or Enterprise plans. Claude Enterprise Primary Owners can accept the BAA directly when activating HIPAA compliance in the organization settings under “Data and privacy.”

**Important:** To use the 1P API with PHI, your organization’s Primary Owner will need to sign a BAA and then reach out to your Anthropic contact or our[**Sales team**](https://claude.com/contact-sales) to get this turned on.

For clarity, the BAA only covers the single organization that accepted it, and excludes features such as Workbench, Claude Console, Claude Cowork, or features currently in beta such as Claude in Office and Claude Design. As part of the BAA, customers of Anthropic’s HIPAA-ready services are subject to certain configuration requirements and limitations on what features/integrations are available.

Not all API features are covered; see the **[Implementation Guide](https://trust.anthropic.com/resources?s=2zblcrsgb00l3x9l2tpjf&name=[anthropic]-2025-type-1-hipaa-report-(-1-p-api).pdf)** for the full list of eligible and non-eligible features.

**Important: [Covered Models](https://support.claude.com/en/articles/15425695-covered-models)** require 30-day data retention and aren't available with zero data retention (ZDR) enabled. Some services, like Claude Code, are only covered under the BAA when ZDR is enabled, which means those services can't use Covered Models under the BAA. See **[Covered Models under Anthropic’s BAA](https://support.claude.com/en/articles/15455031)** for details.

Below is a breakdown of what’s covered under the BAA, by feature and product surface.

## What’s covered under Anthropic’s BAA

| **Claude Enterprise Feature**                         | **Availability**                                                                                                                                                                                                                                             |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Chat                                                  | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| Projects                                              | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| Artifacts                                             | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| File creation & code execution                        | ✅ *Covered as Eligible Services under Anthropic BAA\**<br>⚠️ *excluding network access and use of external websites*                                                                                                                                         |
| Voice                                                 | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| Web Search                                            | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| Research                                              | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| Skills                                                | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| MCPs / Connectors                                     | ⚠️ *Available to use but sending data to 3rd parties via this feature isn’t covered under Anthropic’s BAA. Administrators who enable these features are responsible for ensuring their workforce uses them in compliance with applicable legal obligations.* |
| Enterprise Search / “Ask Your Org”                    | ⚠️ *Available to use but sending data to 3rd parties via this feature isn’t covered under Anthropic’s BAA. Administrators who enable this feature are responsible for ensuring their workforce uses it in compliance with applicable legal obligations.*     |
| Claude in Chrome                                      | ⚠️ *Available to use but sending data to 3rd parties via this feature isn’t covered under Anthropic’s BAA. Administrators who enable this feature are responsible for ensuring their workforce uses it in compliance with applicable legal obligations.*     |
| Cowork                                                | ⚠️ *Available to use but feature is not covered under Anthropic’s BAA. Administrators who enable this feature are responsible for ensuring their workforce uses it in compliance with applicable legal obligations.*                                         |
| Claude for Office (Excel,PowerPoint, and Docs (beta)) | ⚠️ *Available to use but some features are in beta and not covered under Anthropic’s BAA. Administrators who enable this feature are responsible for ensuring their workforce uses it in compliance with applicable legal obligations.*                      |
| Claude Design [beta]                                  | ⚠️ *Available to use but feature is in beta and not covered under Anthropic’s BAA. Administrators who enable this feature are responsible for ensuring their workforce uses it in compliance with applicable legal obligations.*                             |

| **Claude Code Feature**                              | **Availability**                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code CLI<br>(via 1P API console)<br>          | ✅ *Only covered under the BAA with ZDR enabled. If your org needs ZDR for 1P API, please contact a sales representative.*<br>⚠️*Without ZDR enabled, this feature is available to use but is not covered under Anthropic’s BAA.*                                                                                  |
| Claude Code CLI<br>(via Claude Enterprise OAuth)<br> | ✅ *Only covered under the BAA with ZDR enabled.1 ZDR is available for qualified accounts only. If your org needs to use PHI with this feature, please contact a sales representative to evaluate options.*<br>⚠️*Without ZDR enabled, this feature is available to use but is not covered under Anthropic’s BAA.* |
| Claude Code in the desktop (local mode)              | ✅ *Only covered under the BAA with ZDR enabled.1 ZDR is available for qualified accounts only. If your org needs to use PHI with this feature, please contact a sales representative to evaluate options.*<br>⚠️*Without ZDR enabled, this feature is available to use but is not covered under Anthropic’s BAA.* |
| Claude Code in the desktop (remote mode)             | ⚠️ *Available to use without ZDR, but this feature is not covered under Anthropic’s BAA. This feature is incompatible with ZDR.*                                                                                                                                                                                  |
| Claude Code in the web [beta]                        | ⚠️ *Available to use without ZDR, but this feature is not covered under Anthropic’s BAA. This feature is incompatible with ZDR.*                                                                                                                                                                                  |
| Claude Code Review [beta]                            | ⚠️ *Available to use without ZDR but this feature is not covered under Anthropic’s BAA. This feature is incompatible with ZDR.*                                                                                                                                                                                   |
| Claude Code Security [beta]                          | ⚠️ *Available to use without ZDR but this feature is not covered under Anthropic’s BAA. This feature is incompatible with ZDR.*                                                                                                                                                                                   |
| Claude Code Computer Use [beta]                      | ⚠️ *Available to use without ZDR but this feature is not covered under Anthropic’s BAA. This feature is incompatible with ZDR.*                                                                                                                                                                                   |
| Claude Code Remote Control [beta]                    | ⚠️ *Available to use without ZDR but this feature is not covered under Anthropic’s BAA. This feature is incompatible with ZDR.*                                                                                                                                                                                   |

*Covered under versions of the BAA accepted after 12/2/25

| **API Feature (on a HIPAA Ready API Org)** | **Availability**                                                                                                                                                                                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Messages API                               | *See table below*                                                                                                                                                                                                                                            |
| Token Counting API                         | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| Models API                                 | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| Org Management API                         | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| Compliance API                             | ✅ *Covered as Eligible Services under Anthropic BAA\**                                                                                                                                                                                                       |
| Batch API                                  | ❌ *Not covered under Anthropic BAA and not accessible for HIPAA-Ready API users*                                                                                                                                                                             |
| Files API [beta]                           | ❌ *Not covered under Anthropic BAA and not accessible for HIPAA-Ready API users*                                                                                                                                                                             |
| Skills API [beta]                          | ❌ *Not covered under Anthropic BAA and not accessible for HIPAA-Ready API users*                                                                                                                                                                             |
| Code Execution                             | ❌ *Not covered under Anthropic BAA and not accessible for HIPAA-Ready API users*                                                                                                                                                                             |
| Computer Use [beta]                        | ❌ *Not covered under Anthropic BAA and not accessible for HIPAA-Ready API users*                                                                                                                                                                             |
| Web Fetch                                  | ❌ *Not covered under Anthropic BAA and not accessible for HIPAA-Ready API users*                                                                                                                                                                             |
| External MCP                               | ⚠️ *Available to use but sending data to 3rd parties via this feature isn’t covered under Anthropic’s BAA. Administrators who enable these features are responsible for ensuring their workforce uses them in compliance with applicable legal obligations.* |

Data retention periods within a HIPAA-Enabled API Organization are described in Anthropic’s **[public documentation](http://platform.claude.com/docs/en/build-with-claude/api-and-data-retention)**.

The Messages API is covered as an Eligible Service under your BAA. The following Messages API features are covered under your BAA. Messages API features not listed below are not covered under your BAA.

| **Messages API Feature** | **Availability**                                       |
| ------------------------ | ------------------------------------------------------ |
| Prompt Caching           | ✅ *Covered as Eligible Services under Anthropic BAA\** |
| Structured Outputs       | ✅ *Covered as Eligible Services under Anthropic BAA\** |
| Memory                   | ✅ *Covered as Eligible Services under Anthropic BAA\** |
| Web Search               | ✅ *Covered as Eligible Services under Anthropic BAA\** |
| Bash tool                | ✅ *Covered as Eligible Services under Anthropic BAA\** |
| Text Editor tool         | ✅ *Covered as Eligible Services under Anthropic BAA\** |

*Covered under versions of the BAA accepted after 4/1/26

## Product BAA coverage by surface

| **CLAUDE ENTERPRISE**<br>(limited to features listed below)                                        |                                                           |
| -------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Core chat features**                                                                             | **BAA coverage status**                                   |
| Chat                                                                                               | ✅ Eligible under BAA                                      |
| Projects                                                                                           | ✅ Eligible under BAA                                      |
| Artifacts                                                                                          | ✅ Eligible under BAA                                      |
| File creation & code execution                                                                     | ✅ Eligible (excl. network / ext. sites)                   |
| Voice                                                                                              | ✅ Eligible under BAA                                      |
| Web search                                                                                         | ✅ Eligible under BAA                                      |
| Research                                                                                           | ✅ Eligible under BAA                                      |
| Skills                                                                                             | ✅ Eligible under BAA                                      |
| **Integrations (3rd-party data flows)**                                                            | **BAA coverage status**                                   |
| MCPs / Connectors                                                                                  | ⚠️ 3P data flows not covered by Anthropic BAA             |
| Enterprise Search ("Ask Your Org")                                                                 | ⚠️ 3P data flows not covered by Anthropic BAA             |
| Claude in Chrome                                                                                   | ⚠️ 3P data flows not covered by Anthropic BAA             |
| **Claude Code**                                                                                    | **BAA coverage status**                                   |
| Claude Code CLI (via 1P API console)                                                               | ✅ Eligible only with ZDR enabled                          |
| Claude Code CLI (via Claude Enterprise OAuth)                                                      | ✅ Eligible only with ZDR enabled (for qualified accounts) |
| Claude Code in Desktop (local mode)                                                                | ✅ Eligible only with ZDR enabled (for qualified accounts) |
| Claude Code in Desktop (remote mode)                                                               | ❌ Not covered under BAA                                   |
| Claude Code in Web (beta)                                                                          | ❌ Not covered under BAA                                   |
| Claude Code Review (beta)                                                                          | ❌ Not covered under BAA                                   |
| Claude Code Security (beta)                                                                        | ❌ Not covered under BAA                                   |
| Claude Code Computer Use (beta)                                                                    | ❌ Not covered under BAA                                   |
| Claude Code Remote Control (beta)                                                                  | ❌ Not covered under BAA                                   |
| **Other beta features**                                                                            | **BAA coverage status**                                   |
| Cowork                                                                                             | ❌ Not covered under BAA                                   |
| Claude for Office (Excel, PowerPoint, Docs (beta))                                                 | ❌ Not covered under BAA                                   |
| Claude Design (beta)                                                                               | ❌ Not covered under BAA                                   |
| **CLAUDE PLATFORM (1P API)**                                                                       |                                                           |
| **Native 1P API features**                                                                         | **BAA coverage status**                                   |
| Messages API (prompt caching, structured outputs, memory, web search, bash tool, text editor tool) | ✅ Eligible under BAA                                      |
| Token Counting, Models, Org Management, Compliance APIs                                            | ✅ Eligible under BAA                                      |
| Batch API, Files API, Skills API, Code Execution, Computer Use, Web Fetch                          | ❌ Not covered under BAA                                   |
| External MCP                                                                                       | ⚠️ 3P data flows not covered by Anthropic BAA             |
| **ZDR-Eligible (covered under BAA with ZDR)**                                                      | **BAA coverage status**                                   |
| Claude Code via API (CLI)                                                                          | ✅ Eligible only with ZDR enabled (for qualified accounts) |

Please see our **[Trust Portal](https://trust.anthropic.com/resources?s=rgirr4qe8u7ek8c2igx3&name=claude-for-enterprise-hipaa-ready-offering-implementation-guide)** for more information about our compliance commitments.
---

SOURCE: https://support.claude.com/en/articles/8114531-i-created-a-claude-console-organization-how-do-i-start-using-the-claude-api

# I created a Claude Console organization - how do I start using the Claude API?

To use the Claude API and Workbench, add usage credits to your organization's balance. You’ll need to fill out some additional information about your organization and use case. Then, you’ll enter your payment details and fund your account.

Once you’ve purchased usage credits for your account, you’re ready to use the API in your commercial application. You can [find more information on prepaid billing and credits here](https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-api-usage).

If you need custom rate limits, monthly invoicing, or hands-on support, [contact us](https://claude.com/contact-sales) for further information.
---

SOURCE: https://support.claude.com/en/articles/8452276-how-do-i-change-the-email-address-associated-with-my-account

# How do I change the email address associated with my account?

It's not possible to change the email address associated with your Claude account at this time. When creating an account, please make sure you use an email you'll have long-term access to.

If you need to use Claude with a different email address, do the following:

### 1. If you have a paid plan (Pro or Max), follow these steps to cancel it

- Log in to your Claude account.

- Click on your initials or name in the bottom left corner.

- Navigate to [Settings > Billing](https://claude.ai/settings/billing).

- Find the **Cancellation** section and click "Cancel."

Your cancellation will take effect at the end of your current billing period and you can continue using your paid plan until your billing period ends.

**Note:** To avoid charges for the next billing period, cancel at least 24 hours before your next billing date.

If you lost access to the email address you used and can't log in to your account, please contact our Support team from an email address you can access and 'cc' the email in question on your response. Confirm that you want to cancel the subscription associated with the copied email address so our team can assist.

### 2. Unlink your phone number from the account

If you want to use the same phone number to verify your new Claude account, you should also request that we unlink it from the old account when you 'cc' that email address.

### 3. Delete the old account

After cancelling your previous subscription and unlinking your phone number, you can delete your account by navigating to [Settings > Account](https://claude.ai/settings/account), clicking "Delete Account," and following the prompts. **Please note that deleting your account is permanent** and you will no longer have access to saved chats. If you wish to keep your data, we recommend exporting it before deletion by following the steps in [How can I export my Claude data?](https://support.claude.com/en/articles/9450526-how-can-i-export-my-claude-data)

If you see "Contact support" instead of a "Delete account" button, you'll need to [reach out to our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support) to request assistance with deletion.
---

SOURCE: https://support.claude.com/en/articles/9265372-who-owns-and-manages-the-data-of-my-team

# Who owns and manages the data of my team?

This article provides important information about your Claude for Work account associated with your organization's Claude for Work plan (Team or Enterprise plans). It includes details about data access and control that were shared with you when your Claude for Work plan account was set up.

*This article is about our commercial products such as Claude for Work and the Anthropic API. For our consumer products such as Claude Free, Pro, Max and when accounts from those plans use Claude Code, see [here](https://privacy.claude.com/en/collections/10663362-consumers).*

## Account Management

Your organization's designated Primary Owner manages your Work account and all associated data. This includes the ability to request access to your user data through data exports, which may contain your conversations with Claude, uploaded files, and usage patterns. Primary Owners can also remove your access to the Claude for Work plan account if necessary.

Your organization determines which Claude services and features you can access in your Claude for Work plan account and they may choose to limit certain functionality.

## Governing Agreements

The use of your Claude for Work plan account is governed by the agreement between Anthropic and your organization. Please contact your Primary Owner for details of this agreement.

While Anthropic’s [Privacy Policy](https://www.anthropic.com/legal/privacy) describes how we collect, use, and share personal information when acting as a data controller in providing the Claude services to your organization, please note that the Anthropic [Consumer Terms of Service](https://www.anthropic.com/legal/consumer-terms) and [Privacy Policy](https://www.anthropic.com/legal/privacy) do not apply to the use of the Claude for Work plan where Anthropic acts as the data processor.

## Organizational Policies

Your organization may have its own internal policies regarding usage of Claude for Work plan. Please refer to your Primary Owner for guidance.

## Questions about Privacy

If you have any questions about data privacy in your Claude for Work plan account, we encourage you to contact your organization's account owner(s).
---

SOURCE: https://support.claude.com/en/articles/9267385-does-anthropic-act-as-a-data-processor-or-controller

# Does Anthropic Act as a Data Processor or Controller?

*This article is about our commercial products such as Claude for Work and the Anthropic API. For our consumer products such as Claude Free, Pro, Max and when accounts from those plans use Claude Code, see* *[here](https://privacy.claude.com/en/collections/10663362-consumers).*

When a commercial customer creates a Claude for Work account (Team or Enterprise plan), under our [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms) the customer is the "Controller" of the data submitted by its Users. This means:

- The customer has control over who can be a member of their team and provides us with instructions for how submitted data can be used.

- The customer may access and export data (such as conversation history) submitted by its Users.

- Anthropic acts as a "Processor" of the data on behalf of the customer. Anthropic only processes the data as instructed by the customer in order to provide the Claude service.

- Anthropic does not use the data you share when using our commercial products to train our models, unless you choose to participate in our [Development Partner Program](https://support.claude.com/en/articles/11174108-about-the-development-partner-program).

In summary, for Claude for Work, the customer organization maintains control over their Users' data, and Anthropic only processes that data to provide the service on the customer's behalf, according to our agreement. You should consult with your organization's administrators regarding Claude usage policies.

## Resources

For more details on our data practices, please see the:

- [Anthropic Privacy Center](https://privacy.claude.com/en/collections/10663361-commercial-customers)

- [Anthropic Trust Center](http://trust.anthropic.com)

- [Anthropic Privacy Policy](https://www.anthropic.com/legal/privacy)
---

SOURCE: https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization

# Move your personal Claude account to a Team or Enterprise organization

If you're using Claude with a personal account (Free, Pro, or Max) tied to your work email, you may be able to move that account into your organization's Team or Enterprise workspace. There are two paths: you can start a migration yourself (Team and Enterprise) or your admin can claim accounts on your domain (Enterprise only).

---

## What moves when you migrate

Both paths move the same content for each person.

### What moves

- Chats

- Artifacts within chats

- Projects, project instructions, and files, including projects created through or used with Cowork.

- Uploaded files and attachments

- Tasks

- Project sync configurations (which Drive folders and repositories a project syncs)

- Claude's memory from chats and projects, unless your organization has memory turned off

- Claude Code memory and personal settings such as tool settings, notification preferences, and consents, unless your organization account already has its own values set

### What doesn't move

- Custom skills.  There's no migration path for skills. Export any you want to keep before you migrate.

- Sign-ins to connected apps and services**.** All authorizations are revoked. You'll reconnect each app from your organization account.

- Custom connectors you added yourself. You'll need to add them again in your organization account, and your organization's policy may not allow them.

- Published artifacts. Publishing isn't available on Team and Enterprise plans.

- Public share links to chats. These stop working permanently.

- Pending share invites

- Cowork tasks and session history

- Anything Cowork stored on your computer. Local session data and the folders you've connected stay on your machine. Copy anything you want to keep after you migrate.

- Claude Code cloud sessions (web, scheduled tasks, and mobile)

- Claude Design systems and projects

### Before you migrate

1. Export any custom skills you want to keep.

2. Save a copy of anything you've published as an artifact, since published artifacts won't be available afterward.

3. Share any content you've sent out as a public link another way, because those links will break.

4. Make a note of the apps you've connected so you can reconnect them.

---

## Voluntary migration

Voluntary migration is supported on Team and Enterprise plans.

If you have a personal Claude account on the same email address as your organization, you can choose how to handle it when you join a Team or Enterprise organization:

- **Keep both accounts:** Your personal account stays active. You can switch between it and your organization account from your account menu.

- **Use your organization account only:** You'll see two migration options after selecting this.

  - **Bring your data with you:** Your personal data moves into the organization's workspace, as described above in **[What moves when you migrate](#h_4e63ef6e87)**. Your personal account closes, and active Pro or Max subscriptions are canceled and refunded depending on how you purchased the plan.

  - **Delete your data:** Your personal account closes (with a prorated refund if you had a paid subscription), but no content moves into the organization. You start with a clean account. You can choose to download your account data before deleting it.

### How do refunds work for migrated accounts?

What happens to your Pro or Max plan after migrating depends on where you bought it:

- **Directly (not through a mobile app):** Your Pro or Max subscription is canceled automatically when your personal account closes, and you receive a prorated refund for unused time.

- **Google Play Store:** Your Pro or Max subscription is canceled automatically, but it runs to the end of your current billing period. There's no prorated refund. To avoid paying for time you can't use, cancel through Google Play before you migrate.

- **Apple App Store:** Your Pro or Max subscription isn't canceled. Apple doesn't allow third-party cancellation, so you'll need to cancel it yourself through your Apple ID settings. If you don't, Apple keeps charging you after your personal account closes.

For cancellation instructions, see **[Cancel your Pro or Max subscription](https://support.claude.com/en/articles/8325617)**.

### How to start a migration

Start from your organization account, not your personal account. If you're signed in to your personal account, switch first by clicking your initials or name in the lower left corner and selecting your organization.

On a Team plan, you'll be prompted to choose when you accept an invite to your organization. If you don't pick an option right away, you'll see a reminder banner for about seven days. You can also go to **[Settings > Account > Close your personal account](https://claude.ai/settings/account)** at any time to initiate the migration.

On an Enterprise plan, you won't see a prompt when you join. To start the migration, go to **[Settings > Account > Close your personal account](https://claude.ai/settings/account)**.

### If you own both accounts

Owning the Team organization doesn't change where you start the migration. If you created the organization from your personal account, you may still be signed in to the personal one, and **Close your personal account** won't appear there. Switch to your organization account first, then go to **[Settings > Account](https://claude.ai/settings/account)**.

**Important:** Bringing your work into a Team or Enterprise workspace is one-way. Once content has been moved, it can't be moved back to a personal account.

### Apple App Store subscribers

If you subscribed to the Pro or Max plan through the Apple App Store, **Keep both accounts** is your only option. Apple doesn't allow third-party cancellation of App Store subscriptions, so we can't auto-cancel your iOS plan as part of the migration. If you'd rather move your work into the Team, **[cancel your iOS subscription](https://support.claude.com/en/articles/8325617-cancel-your-pro-or-max-subscription#h_54384c9962)** through your Apple ID settings first, then start the migration from the reminder banner or **[Settings > Account](https://claude.ai/settings/account)**.

---

## Domain claiming

Domain claiming is supported on Claude Enterprise plans only.

Enterprise admins can claim all existing personal accounts on their organization's verified domain and move them into the Enterprise workspace. If your admin initiates a domain claim, you'll receive an email and in-product notification with a deadline (at least 30 days out) to choose between merging your data into a new Enterprise account or starting fresh.

For the full walkthrough of your options, deadlines, and what happens to your subscription, see **[Respond to an Enterprise domain claim on your Claude account](https://support.claude.com/en/articles/14625626-respond-to-an-enterprise-domain-claim-on-your-claude-account)**.

---

## Manage personal and organization accounts

You may have both a personal account and an organization account tied to the same email address. You can switch between them by clicking your initials or name in the lower left corner of the screen.



A blue checkmark shows which account you're currently using. Click the other account to switch to it and access its separate conversations and projects.

---

## Discontinue your personal account manually

If you want to close your personal account without moving any of your work into an organization:

1. **[Cancel your individual paid plan](https://support.claude.com/en/articles/8325617-how-do-i-cancel-my-paid-claude-subscription)** if applicable.

2. **[Export your data](https://support.claude.com/en/articles/9450526-how-can-i-export-my-claude-data)** while you still have access.

3. Navigate to **[Settings > Account](https://claude.ai/settings/account)** and click "Delete" to **[delete your account](https://support.claude.com/en/articles/9028421-how-can-i-delete-my-claude-account)**.
---

SOURCE: https://support.claude.com/en/articles/9307344-responsible-use-of-anthropic-s-models-guidelines-for-organizations-serving-minors

# Responsible Use of Anthropic's Models: Guidelines for Organizations Serving Minors

At Anthropic, we recognize the unique vulnerabilities and needs of children in digital spaces. In order to create a safer digital environment and mitigate risks, organizations providing minors with the ability to directly interact with products that incorporate our API(s) should implement the following safeguards:

**1. Additional Technical Measures**

Organizations with products serving minors should implement additional safety features tailored to their unique use cases, as they are best situated to understand the specific ways their end users may interact with products that incorporate Anthropic's services. These safety measures may include, but are not limited to:

- Age verification systems to ensure only intended users can access the product

- Content moderation and filtering to block inappropriate or harmful content

- Monitoring and reporting mechanisms to identify and address potential issues

- Educational resources and guidance for minors on safe and responsible use of the product

In addition to these organization-specific measures, Anthropic may make available technical measures intended to tailor product experiences for certain end users, including minors. For example, we may provide a child-safety system prompt, which organizations serving minors should implement as part of a comprehensive suite of safety measures. It is important to note that, while helpful, these technical measures are not infallible and should be used in conjunction with the organization's own safety features to ensure a robust approach to child safety.

**2. Regulatory Compliance**

It is the responsibility of organizations to comply with all applicable child safety and data privacy regulations, such as the Children's Online Privacy Protection Act (COPPA) in the United States. Compliance with these regulations should be clearly stated on the organization’s website or similar public-facing documentation.

**3. Disclosure Requirements**

Organizations must disclose to their users that they are interacting with an AI system rather than a human.

Anthropic will periodically audit organizations for compliance with these safeguards. If your organization has a high violation rate and has not implemented these safety recommendations, we may ask you to implement them. Failure to implement these recommendations when requested, or a continued high violation rate, may lead to the suspension or termination of your account.
---

SOURCE: https://support.claude.com/en/articles/9796807-creating-and-managing-workspaces-in-the-claude-console

# Creating and managing Workspaces in the Claude Console

This guide will walk you through the process of creating, editing, and managing Workspaces in your Claude Console organization.

## What are Workspaces?

Workspaces are collaborative spaces within Console organizations where teams can separate API resources by use case.

If you need to create a fully separate organization with its own members, billing, and Workspaces, see **[Creating a separate Console organization](#h_816b6c2559)** below.

## How to create a new Workspace

**Note:** Only Organization Admins can create new Workspaces.

1. Log in to your [Claude Console account](https://platform.claude.com/login).

2. Navigate to the **Workspaces** section by clicking on "Settings" in the top level menu and selecting “Workspaces” from the left side bar ([Settings > Workspaces](https://platform.claude.com/settings/workspaces)).

3. Click the "Add Workspace" button near the top right of the page.

4. In the modal that appears, enter a name for your new Workspace, and select a color assignment. This color assignment will be used to help visually identify your workspace in the Claude Console.

5. Click "Create" to finalize the new Workspace.

Your new Workspace will now appear in the list of Workspaces.

**Note:** You are limited to 100 workspaces per organization.

## Editing Workspace Settings

1. From the **Workspaces** list, click on the ellipsis next to the Workspace you want to edit.

2. Select “Edit details."

3. You can modify the following settings:

  - Workspace Name

  - Color

4. After making your changes, click "Save" to apply them.

**Note:** The default Workspace is not editable and cannot be removed.

## Adding members to a Workspace

**Note:** You must add members to your Console organization by following [these instructions](https://support.claude.com/en/articles/13443764-inviting-members-to-the-claude-console) before you can add them to a Workspace.

1. Navigate to the desired Workspace's details page by clicking on it from the Workspaces list.

2. Click on the “Members” tab.

3. Click on “Add to Workspace” near the top right of the page.

4. Choose the individual you’d like to add from the list of your organization’s members.

5. Assign a Workspace role for this member.

6. Confirm your selections by clicking “Add to Workspace."

**Note:** Organization Admins are automatically added as Workspace Admin to every Workspace. Organization Billing role holders are automatically granted ability to see cost, usage, and limit values for all Workspaces, but can be upgraded to the Organization Admin role.

## Deleting members from a Workspace

Click the trash can icon next to the member to remove them from your Workspace.

**Note:** Organization members with Admin and Billing roles are automatically granted permissions on all Workspaces and cannot be removed from Workspaces.

## Managing API Keys in a Workspace

1. Navigate to the desired Workspace's details page by clicking on it from the **Workspaces** list.

2. Click on the "API Keys" tab.

3. To create a new API key for this Workspace:

  - Click "Create Key"

  - Give the key a descriptive name

  - Click "Create Key"

4. To revoke an existing API key:

  - Find the key in the list

  - Click the ellipsis next to it

  - Select "Disable API Key" or “Delete API Key”

    - **Note:** Deleting an API key is a permanent action and cannot be undone.

  - Confirm the action

**Note:** API keys are tied to the Workspace they're created in and cannot be moved between Workspaces.

## Setting Workspace Rate Limits

1. Navigate to the desired Workspace's details page by clicking on it from the **Workspaces** list.

2. Click on the "Limits" tab.

3. Set a limit for each model tier and limit type by clicking on the pencil icon next to each option.

4. Workspace Spend Limits can be reset to the organization rate limit by clicking the “Refresh” icon next to the rate limit you previously set for the Workspace.

**Note:** Anthropic always evaluates all applicable limiters -- at the Workspace and Organization level -- for every request. In other words, if the Workspace limits are unset, Organization limits still apply.

## Setting Workspace Spend Limits or Notifications

1. Navigate to the desired Workspace's details page by clicking on it from the **Workspaces** list.

2. Click on the "Limits" tab.

3. Choose one of the following:

  - Select “Change Limit” to set a specific spend limit for this Workspace.

    - **Note:** You can only set a spend limit that is lower than your organization’s limit. If unset, your spend limit defaults to the organization’s limit.

  - Select “Add notification” to set up an email notification when the Workspace spend reaches a specific amount.

## Viewing Workspace Usage and Costs

1. Navigate to the [Usage or Cost Reports](https://support.claude.com/en/articles/9534590-cost-and-usage-reporting-in-the-claude-console).

2. Choose to view by an individual Workspace, or by “All Workspaces”.

## Archiving a Workspace

If you no longer need a Workspace but want to retain its historical data:

1. Navigate to the **Workspaces** page.

2. Click the ellipsis next to the Workspace you would like to archive.

3. Confirm that you want to archive the Workspace.

**Note:** Archiving a Workspace will archive all API keys in the Workspace. This action cannot be undone.

## Managing the Default Workspace

Every organization has a default Workspace that cannot be renamed, archived, or deleted. To view API keys associated with the default Workspace:

1. Navigate to the **Workspaces** list.

2. Click on "Default" in the list.

**Note:** You can view your default Workspace’s limits from the [Limits settings](https://platform.claude.com/settings/limits).

---

## Creating a separate Console organization

A single email address can create only one Console organization. If you've already created an organization with your email, signing up again routes you back to that organization instead of starting a new one. You can still be invited to other organizations and switch between them on the same email, but you can only create one yourself.

### When you need a separate organization

You might need a fully separate organization for a different legal entity or for separate billing. A separate organization is independent of your existing one, with its own members, billing, and Workspaces.

To create a new organization, sign up with a work email address that isn't already registered with Anthropic.

### How to create a new organization

The person who will own the new organization should complete these steps. Whoever signs up becomes the organization's Primary Owner.

1. Go to **[Claude Console](https://platform.claude.com/)**.

2. Sign up with a work email address using Google or Microsoft single sign-on (SSO), or an email and password.

3. Verify the email address using the link sent to that inbox.

4. Complete the organization details form, including organization name, entity type, country, and intended use, then choose "Complete setup."

The new organization is created automatically with a default Workspace, and the person who signed up is taken to the Console for that organization.

### After setup

From **Settings > Organization**, the Primary Owner can:

- Invite members and assign roles (such as Admin, Billing, and Developer) under "Members."

- Add a payment method in billing settings.
---

SOURCE: https://support.claude.com/en/articles/9889428-add-or-update-your-claude-console-organization-s-tax-or-vat-id

# Add or update your Claude Console organization's tax or VAT ID

## Add your tax or VAT ID during sign-up

When create a Claude Console organization, you may have the option to enter your tax or VAT ID depending on your location:

1. During the signup process, enter your address information.

2. If your address is eligible for tax purposes, an optional field for your tax or VAT ID will appear.

3. Enter your tax or VAT ID in the provided field.

4. If the ID is entered correctly, you'll be able to proceed with your signup.

## Update your tax or VAT ID after sign-up

If you need to add or update your tax or VAT ID after you've already created a Claude Console organization, follow these steps:

1. Log in to your API Console account.

2. Navigate to [Settings > Organization](https://platform.claude.com/settings/organization).

3. Enter or modify your tax or VAT ID as needed.

4. Click "Save changes" when you're finished.

**Note:** Your billing address determines your tax jurisdiction. See [Understanding your billing address and tax calculation](https://support.claude.com/en/articles/12997130-understanding-your-billing-address-and-tax-calculation) for details on how to view or update your billing address.