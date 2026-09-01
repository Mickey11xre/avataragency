
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

5. The merge proposal will be sent to the invited organization's Admins/Owners, with the email subject "Parent Organization Update: New Member Organization Proposed," and must be approved within 14 days.

**Note:** If the person initiating the merge is also an Admin/Owner in the invited organization, only one approval is required.

### To approve a merge proposal

Approving a merge takes two steps, one on each side, and completes only after both are done:

1. **Invited organization:** An organization Owner or Primary Owner needs to go to **[claude.ai/settings/join-proposal](https://claude.ai/settings/join-proposal)** to accept.

2. **Parent organization:** An Owner or Admin of an organization already under the parent approves from Organization settings > Organization and access > Pending Organizations, or from the link in the "Parent Organization Update: New Member Organization Proposed" email.

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

This guide helps Admins, Owners, and Primary Owners set up and manage Claude for Education at universities. Account users can find more information in our **[FAQs for student](https://support.claude.com/en/articles/11139144-faqs-on-using-claude-for-education-at-your-university)**[, **faculty**, **and other users**](https://support.claude.com/en/articles/11139144-faqs-on-using-claude-for-education-at-your-university).

**K-12 educator?** Claude for Teachers is built for you. **[Get started](https://claude.com/solutions/teachers)**.

---

## Get started

Before setting up your Claude for Education account, review these essential resources:

- **[Important considerations before enabling single sign-on (SSO) and JIT/SCIM provisioning](https://support.claude.com/en/articles/10276682)**

- **[Set up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso)**

- **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)**

Note the following information from **[Important considerations before enabling single sign-on (SSO) and JIT/SCIM provisioning](https://support.claude.com/en/articles/10276682)**:

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

- **[Project visibility and sharing](https://support.claude.com/en/articles/9519189-project-visibility-and-sharing)**

- **[Use connectors to extend Claude's capabilities](https://support.claude.com/en/articles/11176164)**

- **[Enable and use web search](https://support.claude.com/en/articles/10684626)**

Familiarize yourself with audit logs, data retention controls, and other administrative features:

- **[How to access audit logs](https://support.claude.com/en/articles/9970975-how-to-access-audit-logs)**

- **[Purchase and manage seats on Enterprise plans](https://support.claude.com/en/articles/13393991)**

- **[Configure custom data retention controls](https://support.claude.com/en/articles/10440198)**

- **[Manage user feedback settings](https://support.claude.com/en/articles/10504844)**

- **[How can I disable public projects?](https://support.claude.com/en/articles/9927533-how-can-i-disable-public-projects)**

## Set up support paths

Anthropic Support assists Primary Owners and Owners directly. See **[How to get support](https://support.claude.com/en/articles/9015913-how-to-get-support)** for more information on your support options.

Individual users should follow one of two paths to receive support:

1. Self-serve with our **[Help Center](https://support.claude.com/en/)**.

2. Escalate questions through university support channels.

We recommend setting up a documented support channel for any user escalations prior to going live at your university.

In addition, share the **[FAQs on using Claude for Education at your university](https://support.claude.com/en/articles/11139144-faqs-on-using-claude-for-education-at-your-university)** to help users get started successfully.

## Privacy and data retention

Visit our **[Privacy Center](https://privacy.claude.com/en/collections/10663361-commercial-customers)** for comprehensive information about your account's data retention and handling. The Privacy Center includes:

- FAQs on Anthropic's policies

- Terms of service details

- Privacy controls information
---

SOURCE: https://support.claude.com/en/articles/12053672-what-happens-to-a-user-s-data-when-they-are-removed-from-a-team-or-enterprise-organization

# What happens to a user's data when they are removed from a Team or Enterprise organization?

This article explains what happens to projects, chats, and skills when a member is removed from your Team or Enterprise plan organization.

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

## Will a user's skills still be accessible after removing them?

Removing a user from your Team or Enterprise organization doesn't delete the skills they uploaded to their own account. Skills the user uploaded and never shared stay on their account and remain recoverable. If the user is later added back to the organization with the same email address, those skills will reappear under **[Customize > Skills](https://claude.ai/new#settings/customize-skills)**, where they can download them.

## What happens if a member is re-added to an organization?

If a team member is removed and later added back to the same organization using the same email address, previous chats, projects, and skills will be restored. The Primary Owner can also always export the member's project data and chats (note that customer data retention settings may impact this).

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

- Revisit **[Settings > Connectors](https://claude.ai/settings/connectors)** to verify authentication status.

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

3. Try reconnecting the tool through **[Settings > Connectors](https://claude.ai/settings/connectors)**.

4. Contact an organization owner if the issue persists.

---

## Frequently asked questions

### Can I add my own custom connectors to the search project?

Yes. You can add connectors available through **[Settings > Connectors](https://claude.ai/settings/connectors)**, and you can also add custom connectors if permitted by your organization. The guided onboarding recommends a few connectors, but you're not limited to those.

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

1. Navigate to your **Organization and access** settings in Claude (**[claude.ai/admin-settings/organization](https://claude.ai/admin-settings/organization)**) or your **Identity and access** settings in Console (**[platform.claude.com/settings/identity](https://platform.claude.com/settings/identity)**) – note this page will only appear on Console if you've worked with Sales to enable SSO or completed a merge proposal.

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

1. Navigate to your **Organization and access** settings in Claude (**[claude.ai/admin-settings/organization](https://claude.ai/admin-settings/organization)**) or your **Identity and access** settings in Console (**[platform.claude.com/settings/identity](https://platform.claude.com/settings/identity)**).

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

  - For Team and Enterprise plans: **[claude.ai/admin-settings/organization](https://claude.ai/admin-settings/organization)**

  - For Claude Console: **[platform.claude.com/settings/identity](https://platform.claude.com/settings/organization)**

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

| **Mode**              | **Provisioning**                                                                                                                                                | **Role and seat type changes**                                                | **Removal**                                                                                                                                                                                                                                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Invite only           | Users are manually added                                                                                                                                        | Roles and seat types are manually changed                                     | Users are manually removed                                                                                                                                                                                                                                                                             |
| Just-in-time (JIT)    | Users assigned to your IdP app are provisioned at login with the User role                                                                                      | Roles and seat types are manually changed                                     | Manual removal required. JIT never removes members automatically. If you unassign someone from your IdP app, they can no longer log in, but they stay in your member list and keep their seat until an admin removes them.                                                                             |
| JIT + group mappings  | Users in at least one mapped group are provisioned at login with the highest-permissioned role from their group memberships                                     | Roles and seat types update on next login based on group membership           | Mostly manual. A user who is removed from all of your mapped groups (but still assigned to the app) is removed from the org the next time they log in. A user you unassign from the app entirely can no longer log in, but stays in your member list and keeps their seat until an admin removes them. |
| SCIM directory sync   | Users assigned to your IdP app are automatically provisioned to all organizations joined to your parent org.                                                    | Roles and seat types are manually changed                                     | Users removed from your IdP app are automatically removed                                                                                                                                                                                                                                              |
| SCIM + group mappings | Users in at least one mapped group are automatically provisioned, with appropriate role, to just the org(s) joined to the parent org where that group is added. | Role and seat types changes automatically propagate based on group membership | Automatic removal when group access is revoked                                                                                                                                                                                                                                                         |

**Note:** To remove a JIT user permanently, remove them in Claude and unassign them in your IdP. A user you remove only in Claude will be re-added the next time they log in with SSO.

Both JIT and SCIM can be combined with **Enable group mappings** to control role or seat tier assignment based on IdP group membership. If you select either of these options for your provisioning mode, **Enable group mappings** will appear within the **User provisioning** section:



**Important:** Group mappings set a user’s role type and seat tier only. Users with the Custom role get their permissions from groups in Claude, and those groups sync from your IdP only when your provisioning mode is SCIM directory sync. With JIT, you need to create groups and add users to them manually in **[Organization settings > Groups](https://claude.ai/admin-settings/groups)**. If you map an IdP group to the Custom role under JIT without doing this, those users have no permissions when they log in. Learn more about **[managing groups on Enterprise plans](https://support.claude.com/en/articles/13799932)**.

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

1. Navigate to your **Organization and access** settings in Claude (**[claude.ai/admin-settings/organization](https://claude.ai/admin-settings/organization)**) or your **Identity and access** settings in Console (**[platform.claude.com/settings/identity](https://platform.claude.com/settings/identity)**)

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

  2. You can map an IdP group to the “Custom” role. Users assigned this role have no default permissions; their access is determined entirely by the custom roles assigned to their groups in Claude. If you use JIT, add these users to groups manually in **[Organization settings > Groups](https://claude.ai/admin-settings/groups)** before they log in, since JIT doesn't sync group memberships from your IdP.

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

  

### Users mapped to the Custom role can't access anything after logging in

This happens when your provisioning mode is JIT and an IdP group is mapped to the Custom role. JIT assigns the role type but doesn't sync group memberships from your IdP, so these users aren't in any group with a custom role attached and have no permissions.

To fix this, do one of the following:

1. Add the affected users to the appropriate groups manually in **[Organization settings > Groups](https://claude.ai/admin-settings/groups)**. Learn more about **[managing groups on Enterprise plans](https://support.claude.com/en/articles/13799932)**.

2. Switch your provisioning mode to SCIM directory sync, which syncs groups and their memberships from your IdP. Learn more about **[how SCIM sync works](https://support.claude.com/en/articles/14499648)**.

### I lost Admin/Owner access after enabling group mappings

This happens when the person configuring group mappings isn't assigned to a group mapped to an Admin or Owner role, causing their permissions to be downgraded to User.

To fix this, do one of the following:

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

- **Enterprise plans (non-SSO):** Invite links are disabled by default. Admins can enable them from **[Organization settings > Identity and access](https://claude.ai/admin-settings/identity)**.

- **SSO organizations:** Invite links are not available. Member provisioning is managed through your Identity Provider.

### Find and share your invite link

1. Navigate to **[Organization settings > Identity and access](https://claude.ai/admin-settings/identity)**.

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

Your repository must be **private or internal**—public repos aren't allowed for organization marketplaces. You can connect a repo hosted on github.com or on your organization’s GitHub Enterprise host.

GitHub-synced marketplaces support a narrower set of `source` types in `marketplace.json` than Claude Code does. Relative paths to plugin folders inside the marketplace repository (for example, `"source": "./plugins/my-plugin"`) are fully supported, and are the simplest option. The `github`, `url`, and `git-subdir` source types are also supported. The `npm`, `archive`, and `command` source types are not supported.

A plugin source can be private in two cases: a github.com source that shares your marketplace repository's owner, which organization sync fetches through the Claude GitHub App, or a source on your organization's GitHub Enterprise host with your organization's GitHub Enterprise App installed on that repository. Every other source is fetched without credentials, so github.com repositories under a different owner and repositories on other hosts (such as GitLab or Bitbucket) must be public.

If your plugin code lives in a private repository that doesn't meet the criteria above, copy those plugin folders into the marketplace repository and change each plugin's source to a relative path (a git subtree or a CI step that vendors the files works well).

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

3. Click "Add plugins" and select "GitHub" as the source.

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

Common causes: the file exceeds 50 MB, it isn't a valid ZIP file, or the marketplace has reached the 100-plugin limit. Check the file size and format, and remove unused plugins if you're at capacity. If skill and plugin scanning is on, a plugin can also be rejected because it was flagged for malicious content. Review the reason, fix the issue, and upload the plugin again.

### Plugin not appearing for members

Check the plugin's installation preference in your marketplace settings. If it's set to **Not available**, members won't see it. Also confirm that Cowork and Skills are both enabled for your organization.

### Updated plugin not reflecting for members

Changes take effect on each member's next session or plugin refresh. If the update still isn't showing, confirm the upload succeeded by checking the plugin version in your marketplace.

### GitHub sync fails with a content error

One or more plugins in your repo is likely formatted incorrectly. Fix the formatting issue, push the update to GitHub, and trigger the sync again. For plugin structure requirements, see the **[plugin reference documentation](https://code.claude.com/docs/en/plugins-reference)**.

### Sync fails with "External plugin source is not yet supported," or plugins are skipped with "Repository not found on github.com. Check the URL and make sure the repository is public."

One or more plugin entries in your `marketplace.json` use a `source` that points outside the connected repository (a `github`, `url`, or `git-subdir` source), and organization sync can't fetch it. A private source only works in two cases: a github.com repository shares your marketplace repository's owner, or a repository on your organization's GitHub Enterprise host with your GitHub Enterprise App installed on it.

For any other private source, move the plugin folders into the marketplace repository and change each entry's `source` to a relative path (for example, `"./plugins/my-plugin"`), then push and re-sync. Alternatively, upload the affected plugins individually via **Organization settings > Plugins > Add plugins > Upload a file**, then select "Add to an existing marketplace." Plugins uploaded through a member's own Customize menu are installed only for that member and aren't distributed to your organization.

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

- Your domain verified in Claude's Identity and access settings—see **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full setup path including domain verification

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

- Your domain verified in Claude's Identity and access settings—see **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full setup path including domain verification

## Where to find your configuration values

The Audience (Entity ID), ACS URL, and SCIM credentials referenced below are provided in the WorkOS setup flow within your Identity and access settings—not by contacting Support.

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

**Note:** SCIM provisioning is available on Enterprise plans and eligible Console organizations only. If you're on a Team plan, skip this step—you can use JIT provisioning instead. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)**.

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

- Your domain verified in Claude's Identity and access settings—see **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full setup path including domain verification

## Where to find your configuration values

The ACS URL, Entity ID, and SCIM credentials referenced below are provided in the WorkOS setup flow within your Identity and access settings—not by contacting Support.

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

**Note:** SCIM provisioning is available on Enterprise plans and eligible Console organizations only. If you're on a Team plan, skip this step—you can use JIT provisioning instead. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)**.

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

- **Export your member list.** Go to **[Organization settings > Members](https://claude.ai/admin-settings/members)** and click "Export CSV" to download the current view of your membership.

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

  1. **SCIM endpoint URL:** `https://claude.fedstart.com/v1/scim/v2`

  2. **API key / Bearer token:** The key generated in Step 1

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

**Note:** Anthropic support will work with you during provisioning to configure parent/child organization relationships. Contact your account representative or **[our Support team](https://support.claude.com/en/articles/13047024)** if you need to set up a multi-org structure.
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

Organization instructions let owners of Team and Enterprise plans set custom instructions that Claude follows in every conversation across your organization. Use them to apply communication standards, formatting requirements, compliance guidance, or domain-specific context that should show up everywhere your team works with Claude.

Organization instructions are available to Owners and Primary Owners on Team and Enterprise plans.

## How organization and user instructions interact

Claude supports two levels of instructions. Understanding how they interact helps owners and the people on your team get the most out of both.

| **Level**                    | **Set by**                | **Scope**                                           | **Visibility**                         |
| ---------------------------- | ------------------------- | --------------------------------------------------- | -------------------------------------- |
| Organization instructions    | Owners and Primary Owners | All people in your organization, every conversation | Only Owners and above can view or edit |
| Individual user instructions | Each user                 | That individual’s conversations only                | Only that user can view or edit        |

When both are set, organization instructions take precedence. If an individual instruction directly contradicts an organization instruction, Claude favors the organization-level instruction. For example, if an organization instruction says “Always respond in formal English” but an individual instruction says “use a casual tone,” Claude responds formally.

Individual instructions still apply for anything the organization instructions don’t address.

**Note:** Instruction prioritization relies on prompt-level instructions. In rare edge cases involving directly contradictory instructions, behavior may vary. Test your instructions to confirm they produce the results you expect.

## Set up organization instructions

You need at least an Owner role to configure organization instructions.

1. Go to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

2. Find the **Organization instructions** section.

3. Enter your instructions in the text area. The maximum length is 3,000 characters.

4. Click “Save changes.”

5. Changes may take up to an hour to take effect across Claude products.

To remove instructions entirely, clear the text area and click “Save changes.”

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

**Referral guidance.** “When users ask about HR policies, direct them to <hr@acme.com> rather than giving specific policy advice.”

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

**Note:** If your organization has turned on HIPAA readiness or customer-managed encryption keys (CMEK), the merge and join option isn't available. Your only option is to join fresh. Export your data before the deadline if you want a copy. Your subscription is still canceled and refunded as described below. Learn more about **[HIPAA-ready Enterprise plans](https://support.claude.com/en/articles/13296973)** and **[customer-managed encryption keys](https://support.claude.com/en/articles/15505325)**.

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

If you have a Pro or Max subscription, it will be automatically canceled when you migrate or when the deadline passes. You’ll receive a prorated refund for any unused time.

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

Claude Enterprise gives your organization access to powerful AI across chat, Claude Code, Claude Cowork, Claude Design, and Claude in the tools your teams already use, including Microsoft 365, Chrome, and Slack. With that access comes the responsibility of managing consumption effectively—ensuring your team gets maximum value while keeping usage predictable and within budget.

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

Other surfaces also draw on your organization's usage and appear as separate products in Analytics, the spend export, and the Analytics API: (a) Claude for M365 (Excel, PowerPoint, Word, Outlook add-ins), subject to the same org, group, and per-user spend limits and model restrictions; (b) Claude Design (beta), which bills from your organization's consumption at standard API rates with org, group, and per-user limits applying; (c) Claude in Chrome, whose side panel runs as a Claude Cowork session, so multi-step browsing tasks consume like other Cowork agentic work (manage under Organization settings > Cowork); (d) Claude Tag (Claude in Slack, beta), whose channel work bills to the organization's usage balance rather than to individual seats, so per-user and group limits don't cap it; set the Claude Tag spend limit (and optional per-channel limits) at **[claude.ai/admin-settings/usage/claude-tag](https://claude.ai/admin-settings/usage/claude-tag)**. DMs with Claude Tag bill to the sender's own seat.

**Admin tip: Set expectations with your team**

Users running Claude Code or Cowork workflows may not realize how token-intensive their sessions are. A single Cowork task or Claude Code debug session can consume many more tokens than chat. Include this context in any user onboarding you send.

---

## Role-based access controls

Role-based access controls (RBAC) let you group users and manage their access to Claude surfaces and consumption budgets as a unit rather than individual by individual. This is the most scalable way to govern usage in larger organizations.

### How to structure groups

Think about groups in terms of job function and use case, not organizational hierarchy. A few principles:

- Create groups that map to distinct usage patterns, not org chart boxes. "Engineering" and "Sales" are more useful than "North America" and "EMEA" for consumption management.

- Limit group proliferation. More than 8–10 groups becomes hard to manage. Start with 4–6 and split only if usage patterns clearly diverge.

- Use groups to gate access to high-intensity surfaces. For example: only members of the "Engineering" group can access Claude Code; other users see Chat and Cowork only. Access is granted by the custom roles you assign to each group, and it only takes effect for members whose organization role is set to Custom. Members left on the built-in User role keep everything enabled org-wide. Groups can be created manually or synced from your identity provider. See **[Set up role-based permissions on Enterprise plans](https://support.claude.com/en/articles/13930458-set-up-role-based-permissions-on-enterprise-plans)**.

- Assign group-level spend caps as a starting point, then override at the user level for outliers (e.g., a non-technical PM who needs Claude Code for a specific project).

### Group spend management

Once groups are configured:

- Review group consumption weekly during initial rollout, monthly thereafter.

- When a group consistently approaches its cap, investigate before automatically raising it—the right response might be model guidance (use Sonnet instead of Opus) rather than more budget.

- Consider assigning a "group owner" in each department who is responsible for reviewing usage and fielding questions from their team. This distributes the admin burden and puts someone with business context in the loop. You don't need to make these people Owners or Admins: create a custom role that grants the Analytics (Can view) admin permission—and optionally Billing (Can view) so they can see the Usage page—and assign it to a small 'usage reviewers' group. Admin permissions only apply to members whose role is set to Custom, and Analytics view access is organization-wide rather than limited to their group.

**Governance tip: Surface access as a first gate**

Before worrying about token-level limits, make sure the right people have access to the right surfaces. Giving everyone Claude Code and Cowork access on day one is the fastest way to generate unexpected consumption. Roll out higher-intensity surfaces in waves, starting with the teams most likely to use them productively.

---

## Set spend limits

Spend limits are your primary tool for controlling consumption. Claude Enterprise lets admins set limits at three levels: the organization level, the group level (with RBAC), and the individual user level. **Our recommended approach is to start with RBAC group-level limits and per-user limits**—these give you precise, targeted control without the risk of cutting off your entire org if a limit is hit.

### Org-level spend limits

The org-level limit is available as a hard ceiling across all users and surfaces, but use it carefully: hitting it affects everyone simultaneously, which can be disruptive. Most admins find that managing consumption at the group and user level gives them better outcomes with less operational risk.a

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

---

## Model selection guidance

One of the most impactful things an admin can do is set clear guidance for users on which model to use for which tasks. Model choice has a direct and significant impact on spend.

Effort level is a second consumption lever. Users can choose how much thinking Claude applies to each response, and higher effort levels consume more tokens than lower ones. Encourage users to reserve Max effort for only the most demanding tasks and to use lower effort for routine tasks.

### The right model for the right task

| **Model**     | **Best for**                                      | **Token intensity** | **Recommended use**                                                                                         |
| ------------- | ------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Claude Fable  | Days-long agentic coding work and reasoning tasks | Very High           | Reserve for your highest-value, most complex agentic work. Premium pricing and faster usage draw than Opus. |
| Claude Opus   | Complex reasoning, research, multi-step tasks     | High                | Reserve for power users or specific workflows only                                                          |
| Claude Sonnet | Everyday tasks, writing, analysis, Q&A            | Moderate            | Default model for all users—set as your org-wide default (see below)                                        |
| Claude Haiku  | Simple lookups, summaries, fast responses         | Low                 | High-volume, lightweight automation tasks                                                                   |

### Set your organization's default model

Beyond guiding users toward the right model, you can set the model that new conversations start with for everyone in your org. This is one of the most direct consumption levers available—the default shapes what the majority of users run day to day.

You have two options:

- **Anthropic recommended** — automatically updates as new models ship, so your org always starts on our current recommended general-purpose model with no manual upkeep.

- **Choose your own** — sets a specific model as the org default and holds it there until you change it. Use this when you want to standardize on a known model for consumption predictability (for example, defaulting to Sonnet rather than Opus).

This setting applies to new conversations in chat, Claude Cowork, Claude Code (CLI 2.1.199 or later), and Claude for Microsoft 365. If the selected model isn't available in a product, Anthropic's recommended default is used. If you also pin a model for Claude Code through managed settings, that setting takes precedence for the CLI and IDE. See **[Set a default model for your organization](https://support.claude.com/en/articles/15330088-set-a-default-model-for-your-organization)**.

You can also set model defaults by role through Custom Roles, so different groups can start on different models—for example, defaulting your engineering group to one model and the rest of the org to another. This pairs naturally with the RBAC groups you've already configured (see Section 2).

**How to configure:** Organization settings → Models.

**Note:** Users' current model selection for new conversations may be cleared, so they'll pick up the org default on their next conversation.

### Manage model access for your organization

Beyond setting a default, you can restrict which models are available at all—a firmer lever than guidance alone. This works at two levels:

- **Organization level:** each model is enabled or disabled for everyone, including Owners and Admins. Disabling a model here removes it from every picker org-wide.

- **Custom role level:** for members on Custom roles, each role grants access to a *subset* of what's enabled at the org level. A role can't grant a model the org has disabled — the org setting is always the ceiling.

If a member belongs to multiple groups with different custom roles, access is **additive** — they get every model any of their roles grants (as long as it's enabled org-wide).

**Capping effort level by role**

Beyond restricting which models a role can use, you can cap the **maximum effort level** members on that role can select per model — a more granular version of the effort guidance already covered above. This only applies to Custom roles, not at the org level. If a member has multiple roles, the highest effort cap across those roles wins.

**Admin tip: Pair model + effort restrictions**

If model guidance (the "Sonnet is your default" messaging) isn't landing and you're still seeing heavy Opus consumption, restricting Opus access to specific roles—or capping effort to Medium/High instead of Max for non-power-user roles—is the next lever. Reserve full access for the roles where deep reasoning actually pays off.

**Where this applies**

Model access and effort restrictions are enforced across most Claude products, including chat (web, desktop, mobile), Claude Cowork, and Claude Code (CLI 2.1.199 or later—earlier versions still show restricted options but requests using them are rejected). Claude in Chrome and Claude Security don't support this yet. For the current list of supported products, see **[Manage model access for your organization](https://support.claude.com/en/articles/15694740)**.

**How to configure:** Organization settings → Roles → select a role → Models tab. Set model access, an optional effort cap per model, and an optional role-level default model. To manage configuration across the org, go to **Organization settings → Models**.  More details in **[Manage model access for your organization](https://support.claude.com/en/articles/15694740)**.

### Admin configuration recommendations

- If you have high-volume, low-complexity workflows (e.g., summarizing support tickets, generating first-draft emails), evaluate whether Haiku is a better fit—it can significantly reduce consumption for these use cases.

- Periodically audit which models your users are actually selecting. If most of your consumption is on Opus, that's a signal that your model guidance isn't landing.

### What to tell your users about model choice

**Sonnet is your daily driver.** It's fast, highly capable, and is designed for the vast majority of tasks—writing, analysis, coding help, and Q&A.

**Opus is for the harder, more complex work.** Use it when you're working on a genuinely complex multi-step problem, or when quality matters more than speed.

**When in doubt, start with Sonnet.** You can always switch the model mid conversation to Opus if you need more depth.

---

## Using organization instructions to shape user behavior

Organization instructions let admins inject standing guidance into every Claude conversation across your organization—effectively giving Claude a system prompt that reflects your team's norms, best practices, and guardrails. This is a high-leverage tool for shifting user behavior without adding friction, because the guidance shows up in-product at the moment of use rather than in documentation users have to go find.

A few ways you can use organization instructions to manage consumption and usage patterns:

- **Nudge-against token-intensive output formats**. If you've noticed proliferation of a particular artifact type (e.g., HTML dashboards being shared in cross-functional threads where a simpler format would do), you can instruct Claude to confirm with the user before generating one. This adds a lightweight check without removing the capability entirely.

- **Point users to internal resources.** Reference your team's wiki, best-practices docs, or usage guidelines directly in the preference. Claude will surface them when relevant—steering users toward the right internal context instead of reinventing it each time.

- **Reinforce model selection norms.** Remind Claude (and by extension, users) that Sonnet is the default and Opus is reserved for specific workflows. This complements user education without requiring everyone to internalize it up front.

---

## Tracking usage and spend

### Analytics page

The Analytics page within the user menu (**claude.ai/analytics**) is the fastest way to get a read on your org. It shows weekly active users, seat utilization, top connectors, total spend (MTD/QTD/YTD), spend by model, and a top-10 users-by-spend leaderboard. Product-specific views for chat, Claude Code, Cowork, and Claude Design break down activity for each surface. **[Learn more](https://support.claude.com/en/articles/12883420-view-usage-analytics-for-team-and-enterprise-plans)**.

### Skills analytics and per-skill ROI

Each skill represents a repeatable workflow—prepping a sales call, reviewing a contract—so its cost can be weighed directly against what that workflow is worth. The Skills view in Analytics shows users, cost per use, and total uses for every skill in your org, filterable by group ("what skills is my legal team using?") or product surface.

To run an ROI analysis:

1. Export the skills table to CSV from the Skills view.

2. Assign a value per run to each skill—a rough estimate of what the completed task is worth, such as the employee time it replaces (e.g., "prepping a sales call is worth ~$20 to us").

3. Compute in your spreadsheet: (value per run − cost per use) × total uses gives the net value each skill has generated.

The calculation currently happens outside the product, but the CSV export makes it a quick spreadsheet exercise. Even rough estimates tell a compelling story: a call-prep skill costing $0.90 per run against $20 of value returns 20x on every use.

### Spend report CSV export

If you need a one-off detailed breakdown, you can export a per-user, per-model spend report as a CSV from the Analytics page: in the spend section ("How much is Claude costing?") on the Overview tab, click "Export spend report" and choose MTD, last month, last 90 days, or a custom range up to 90 days back.

### Analytics chat

Analytics chat lets you ask questions about your org's usage in plain language. Type a question—"show me daily spend for the last 30 days," "who are our top spenders," "what's our seat utilization rate"—and Claude returns a chart and a short written summary of what it found. You can follow up to refine, drill in, or pivot without starting over.

Use this when you have a specific question and don't want to navigate the dashboard, or when you're exploring trends and want fast back-and-forth. Results cover the last 30 days by default; specify a different range in your question if you need it. Data refreshes daily. **[Learn more](https://support.claude.com/en/articles/14729354-use-analytics-chat-to-ask-claude-about-usage)**.

### Analytics API

For programmatic access, use the Claude Enterprise Analytics API. Pull a ranked list of users by tokens used or dollars spent, or look at usage and cost trends over time broken down by product, model, RBAC group, context window, region, or service tier (standard vs. fast). Grouping the cost report by RBAC group gives per-department spend for chargeback without exporting per-user rows. Each request is capped at 31 days wide, starting within the last 365 days, and no earlier than January 1, 2026.

Your Primary Owner can create a key with the read:analytics scope under Organization settings > API. Cost and usage data typically lands within about four hours (occasionally up to 24) and can be revised for up to 30 days, so query dates 30+ days in the past for invoicing-grade totals. Engagement endpoints such as users, skills, plugins, and connectors update daily with roughly a one-day lag. **[Learn more](https://platform.claude.com/docs/en/manage-claude/analytics-api)** and review the **[API reference guide](https://platform.claude.com/docs/en/api/admin/analytics)**.

### Per-user skills, plugin, and connector usage

The Analytics API also breaks skill, plugin, and connector usage down per user. The `skills`, `plugins`, and `connectors` endpoints each support a `group_by[]=user_id` parameter, turning the org-wide totals you see in the dashboard into one row per user per skill (or plugin, or connector)—so you can see exactly who is running a given skill, how often, and which team members have actually invoked a plugin you rolled out. You can also group by RBAC group or product surface, or filter down to a single skill, plugin, or connector by name.

This is useful for the same per-skill ROI questions above, just broken down by individual user instead of exported to a spreadsheet—for example, confirming a plugin rollout actually landed with the team it was distributed to, rather than just checking that it was installed. Learn more in the API reference: **[skills](https://platform.claude.com/docs/en/api/admin/analytics/skills/list)**, **[plugins](https://platform.claude.com/docs/en/api/admin/analytics/plugins/list)**, **[connectors](https://platform.claude.com/docs/en/api/admin/analytics/connectors/list)**.

### Admin API

For organizations managing limits across many groups, the **[Admin API](https://support.claude.com/en/articles/15330651-claude-enterprise-admin-api-reference-guide)** moves cost-control workflows into scripts — automating increase-request reviews, flagging members near their limits, and surfacing rapidly changing usage at scale. The API reads every member's effective limit and month-to-date spend and sets or clears per-user overrides. Group, seat-type, and org-level limits are still configured in Organization settings. The Admin API's user-management endpoints (currently in beta for Enterprise organizations) also let you create groups, add or remove members, and read your custom roles programmatically. See **[User management](https://platform.claude.com/docs/en/manage-claude/user-management)**.

### Spend-threshold alerts

Spend-threshold alerts notify admins at 75% and 90% of an org-level spend limit, giving you time to raise the cap before anyone is blocked mid-task.

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

- Users are notified in-product as they approach their spend limit and, once they hit it, can click "Request more usage" to send an increase request to admins without leaving Claude. Tell users who their approver is and your expected turnaround.

- Nothing they've already produced is lost. The request that's already in flight completes, but further requests are blocked, so a multi-step Claude Code or Claude Cowork task may pause before it finishes. They can pick the work back up as soon as an admin raises the limit, or when limits reset at 00:00 UTC on the 1st of the month.

**Resources to share with users**

- **[Anthropic Academy](https://www.anthropic.com/learn)**

- **[Change the model, effort, and thinking settings](https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings)**
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

Default model settings are available for Enterprise plan organizations. Primary Owners, Owners, and members whose custom role grants the Identity & Access permission can manage them in **[Organization settings > Models](https://claude.ai/admin-settings/models)**.

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

1. Navigate to **[Organization settings > Models](https://claude.ai/admin-settings/models)**.

2. Under **Default model**, select an option:

  1. “Use Anthropic’s recommended default”: Anthropic’s recommended model that updates automatically when new models are released.

  2. “Choose a specific model”: a specific model that won’t change when new models are released.

3. If you select “Choose a specific model,” choose a model from the list.

4. Click “Save changes.”



---

## Set a default model for a custom role

Custom role defaults let you set different starting models for different teams. For example, you can keep most of your organization on the recommended default while a specific group starts on a different model.

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click the role you want to edit, or create a new role.

3. Select the **Models** tab, then under **Default model**, select a model. Roles are set to “None selected” unless you choose a specific model. Only models the role has access to can be selected.

4. Click “Save role” to save your changes.

A role’s default model takes precedence over the organization default for members assigned to that role.

If a member belongs to multiple groups whose custom roles set different default models, the most capable model will be the default. Capability is determined first by model family (Haiku, Sonnet, Opus), then release date, so more capable model families take precedence, and newer models within the same family take precedence.

**Note:** Custom roles only affect members whose role is set to “Custom.” Members with the User, Admin, or Owner roles get the default model from the organization setting, not from custom roles.

For details on creating roles and assigning them to groups, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452)**.

---

## Default model and Claude Code managed settings

If your organization also configures Claude Code through `managed-settings.json`, the model setting there takes precedence. When model is set in managed settings, Claude Code CLI and IDE start on that model and ignore the default you set in **[Organization settings > Models](https://claude.ai/admin-settings/models)**.

If `managed-settings.json` specifies `availableModels` that doesn't contain the default model, Claude CLI bypasses `availableModels` and starts on the selected default model unless `enforceAvailableModels` is set.

Managed settings for models apply only to Claude Code CLI and IDE, not to Claude Code on web or desktop. For consistent behavior across all Claude Code surfaces, we recommend setting the default here alone. For more on managed settings, see **[Claude Code settings](https://code.claude.com/docs/en/settings#settings-files)**.
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

Model access settings are available for Enterprise plan organizations. Primary Owners, Owners, and members whose custom role grants the Identity & Access permission can manage them in **[Organization settings > Models](https://claude.ai/admin-settings/models)**.

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

1. Navigate to **[Organization settings > Models](https://claude.ai/admin-settings/models)**.

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

Managed settings for models apply only to Claude Code CLI and IDE, not to Claude Code on web or desktop. For consistent behavior across all Claude Code surfaces, we recommend using model access settings alone. For more on managed settings, see **[Claude Code settings](https://code.claude.com/docs/en/settings#settings-files)**.
---

SOURCE: https://support.claude.com/en/articles/8114513-business-associate-agreements-baa-for-commercial-customers

# Business Associate Agreements \(BAA\) for Commercial Customers

*This article is about our commercial products such as Claude for Work and the Anthropic API. For our consumer products such as Claude Free, Pro, Max and when accounts from those plans use Claude Code, see **[here](https://privacy.claude.com/en/collections/10663362-consumers)**.*

*For Claude Enterprise features to be covered under a Business Associate Agreement (BAA), the Primary Owner of the organization must activate HIPAA compliance in the HIPAA-ready Claude Enterprise organization settings under “Data and privacy” and accept Anthropic's BAA. Standard Claude Enterprise plans do not include BAA coverage without action from a Primary Owner.*

Anthropic provides a BAA covering our HIPAA-ready services, such as use of our first-party API or Enterprise plans. Claude Enterprise Primary Owners can accept the BAA directly when activating HIPAA compliance in the organization settings under “Data and privacy.”

**Important:** To use the 1P API with PHI, your organization’s Primary Owner will need to sign a BAA and then reach out to your Anthropic contact or our[**Sales team**](https://claude.com/contact-sales) to get this turned on.

For clarity, the BAA only covers the single organization that accepted it, and excludes features such as Claude Console, Claude Cowork, or features currently in beta such as Claude in Office and Claude Design. As part of the BAA, customers of Anthropic’s HIPAA-ready services are subject to certain configuration requirements and limitations on what features/integrations are available.

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

To use the Claude API and the playground, add usage credits to your organization's balance. You’ll need to fill out some additional information about your organization and use case. Then, you’ll enter your payment details and fund your account.

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

**Note:** Enterprise organizations that have turned on HIPAA readiness or customer-managed encryption keys (CMEK) can't receive data from a personal account. If your organization uses either, you won't be offered the option to bring your data with you, and a domain claim won't offer to merge your account. You can export your data first if you want a copy. Learn more about **[HIPAA-ready Enterprise plans](https://support.claude.com/en/articles/13296973)** and **[customer-managed encryption keys](https://support.claude.com/en/articles/15505325)**.

---

## What moves when you migrate

Both paths move the same content for each person.

### What moves

- Chats

- Artifacts within chats

- Projects, project instructions, and files, including projects created through or used with Cowork

- Uploaded files and attachments

- Project sync configurations (which Drive folders and repositories a project syncs)

- Claude's memory from chats and projects, unless your organization has memory turned off

- Claude Code memory and personal settings such as tool settings, notification preferences, and consents, unless your organization account already has its own values set

- Claude Design systems and projects migrated since 14 August 2026

### What doesn't move

- Custom skills.  There's no migration path for skills. Export any you want to keep before you migrate.

- Sign-ins to connected apps and services**.** All authorizations are revoked. You'll reconnect each app from your organization account.

- Custom connectors you added yourself. You'll need to add them again in your organization account, and your organization's policy may not allow them.

- Published artifacts. Publishing isn't available on Team and Enterprise plans.

- Public share links to chats. These stop working permanently.

- Pending share invites

- Cowork sessions in the desktop app. Desktop sessions and the folders you've connected are stored locally, not in the cloud, so they stay on your computer. Copy anything you want to keep after you migrate.

- Cowork cloud sessions (web and mobile). Download any files or outputs you want to keep before you migrate.

- Claude Code cloud sessions (web, scheduled tasks, and mobile)

- Claude Design systems and projects migrated before 14 August 2026

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

If your organization has turned on HIPAA readiness or CMEK, **Bring your data with you** isn't offered.

### How do refunds work for migrated accounts?

What happens to your Pro or Max plan after migrating depends on where you bought it:

- **Directly (not through a mobile app):** Your Pro or Max subscription is canceled automatically when your personal account closes, and you receive a prorated refund for unused time.

- **Google Play Store:** Your Pro or Max subscription is canceled automatically when your personal account closes, and you receive a prorated refund for unused time. Refunds for Google Play purchases can take a few days to appear.

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

Enterprise admins can claim all existing personal accounts on their organization's verified domain and move them into the Enterprise workspace. If your admin initiates a domain claim, you'll receive an email and in-product notification with a deadline (at least 30 days out) to choose between merging your data into a new Enterprise account or starting fresh. If your organization has turned on HIPAA readiness or CMEK, you'll still get the notification and deadline, but merging isn't offered. Export anything you want to keep before the deadline, then start fresh.

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