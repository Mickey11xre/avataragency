
---

SOURCE: https://support.claude.com/en/articles/10186004-claude-console-roles-and-permissions

# Claude Console roles and permissions

The Claude Console uses a role-based access system with six distinct roles: User, Claude Code User, Limited Developer, Developer, Billing, and Admin. Each role has specific permissions and capabilities designed to help teams manage their API access securely.

## Role types and permissions

### User

- Can only use Workbench

- Can view MCP tunnels

- Cannot view API keys, usage logs, or billing details

### Claude Code User

- Can use Workbench and **[Claude Code](https://code.claude.com/docs/en/overview)**

- Can access Claude Code workspace in your org

- Can view MCP tunnels

### Limited Developer

- Can use Workbench and Claude Code

- Can manage API keys and webhook endpoints

- Can view usage and cost data

- Can manage vaults and credentials

- Can view MCP tunnels
​

### Developer

- Can use Workbench and Claude Code

- Can manage API keys and webhook endpoints

- Can view usage and cost data

- Can manage vaults and credentials

- Can view sessions traces

- Can download files

- Can view MCP tunnels

### Billing

- Can use Workbench

- Can manage billing details

- Can view usage and cost data

- Can view MCP tunnels

- Cannot access Claude Code workspace in your org

### Admin

- Can perform all actions available to User, Developer, and Billing roles

- Can manage users and their role assignments

- Can send events to active (non-archived) sessions

- Can create MCP tunnels

## Workspace-Level Permissions

- Organization Admins automatically receive Workspace Admin permissions in all Workspaces.

- Organization Billing role holders can view cost, usage, and limit values across all Workspaces.

- Organization-level roles serve as a baseline, while Workspace roles can grant additional permissions.

  - For example, a User at the organization level can be granted Admin permissions within specific Workspaces

## Important Notes

- Removing an Admin or Billing role does not automatically update the billing email in our payment processor.

- To modify the primary billing email address or add additional billing contact emails, please **[contact our Support Team](https://support.claude.com/en/articles/9015913-how-to-get-support)**.
---

SOURCE: https://support.claude.com/en/articles/10504853-manage-user-feedback-settings-on-claude-console

# Manage user feedback settings on Claude Console

As an Admin of your Claude Console account, you can manage the ability for members of your organization to submit feedback to Anthropic via thumbs up / thumbs down.

To manage feedback for your Console organization:

1. Navigate to [Settings > Privacy controls](https://platform.claude.com/settings/privacy).

2. Toggle the feedback switch on or off.



More information on how Anthropic collects, uses, and stores feedback data can be found in our Privacy Center: [How long do you store my organization’s data?](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)
---

SOURCE: https://support.claude.com/en/articles/10722177-sharing-prompts-in-the-claude-console

# Sharing Prompts in the Claude Console

The prompt sharing feature enables teams to collaborate on prompt development within the Claude Console. This feature allows workspace members to share, edit, and iterate on prompts together, maintaining a clear revision history attributed to the specific contributors.

## Sharing a Prompt

1. Create a prompt in the Workbench within your desired workspace.

2. Click on the prompt title at the top of the page.

3. Select "Share" from the dropdown menu:



4. Change the access settings from "Private" to "Shared."

5. Click the "Copy link" button that appears:



6. Share the link with members of your workspace.

**Note:**  Shared prompts can be viewed and edited by any workspace member with the direct link.

## Collaborating on Shared Prompts

### Editing

When working on a shared prompt:

1. Any workspace member can make edits to the prompt.

2. Each edit is saved as a new revision.

3. Authorship is tracked for each revision.

4. All revisions remain accessible through the version history.

**Note:** If a collaborator saves changes to the prompt while you are viewing it, you will be prompted with a message to “Go to the Latest Version,” where all their changes will be reflected.



## Viewing Version History

To see previous versions of a prompt:

1. Click on the prompt title.

2. Select "Version history" from the dropdown:



3. Choose the specific version you want to view from the list.

**Note:**  Past versions cannot be edited. To restore the prompt to a previous version, select the version from the version history list, and click the “Restore” button in the pop up.



## Unsharing a Prompt

1. Click on the prompt title at the top of the page.

2. Select "Share" from the dropdown menu.

3. Change the access settings from "Shared" to "Private":



**Note:** Unsharing immediately disables access via the direct link. Anyone that the link was previously shared with will no longer be able to view the prompt.
---

SOURCE: https://support.claude.com/en/articles/13346458-customizing-your-console-appearance-settings

# Customizing your Console appearance settings

## How to change your Console color mode

1. Log in to your Console account.

2. Navigate to [Settings > Appearance](https://platform.claude.com/settings/appearance).

3. Select from Light, System, or Dark under **Color mode**.


---

SOURCE: https://support.claude.com/en/articles/13443764-inviting-members-to-the-claude-console

# Inviting members to the Claude Console

The instructions in this article apply to your overall Console organization. If you are working within a specific Console Workspace, see this article: [Creating and managing Workspaces in the Claude Console](https://support.claude.com/en/articles/9796807-creating-and-managing-workspaces-in-the-claude-console).

**Note:** Only organization Admins can manage Console members and invitations. See [Claude Console Roles and Permissions](https://support.claude.com/en/articles/10186004-claude-console-roles-and-permissions).

## Inviting members to your Console organization

1. Log in as a Admin.

2. Navigate to [Settings > Members](https://platform.claude.com/settings/members).

3. Click the "+ Invite" button in the upper right corner of the page.

4. Enter up to 50 email addresses in the text box, separated by commas or new lines.

5. Select the role for the new users from the drop-down.

6. Click "Send Invites."

7. The newly-added users will receive an emailed invite and appear on the **Members** list with a "Pending" badge.

## Do Console invitations expire?

Yes, newly-invited members have three weeks to accept the invitation via email.

## Revoking invitations to your Console organization

1. Locate the "Pending" member in [Settings > Members](https://platform.claude.com/settings/members).

2. Click the trash can icon to the right of the listed user to revoke their invitation.

3. Confirm the action by clicking "Revoke" in the **Revoke invitation?** modal.
---

SOURCE: https://support.claude.com/en/articles/8384961-what-should-i-do-if-i-suspect-my-api-key-has-been-compromised

# What should I do if I suspect my API key has been compromised?

If you suspect that your API key may be compromised, we recommend revoking the key immediately. You can do so by logging into your Claude Console account, going to the [API keys page](https://platform.claude.com/settings/keys) from your profile, clicking the meatball menu (i.e. the three horizontal dots) next to the key in question, and selecting ‘Delete API Key.’

You can generate a new API key by clicking on the ‘Create Key’ button on the same page; make sure to save this key somewhere secure, such as a secrets management system and avoid keeping the key in version control. If you continue to see any suspicious API activity or have other concerns, please [contact our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support).
---

SOURCE: https://support.claude.com/en/articles/8606378-how-do-i-use-the-workbench

# How do I use the Workbench?

We’ve recently updated Workbench. The new Workbench enables developers to try out Claude models and API features directly in the Claude Console, but no longer supports saving prompt history or evaluating prompts.

**Workbench (legacy) is no longer available to new users and will be retired for all users on August 17, 2026**. If you're still using the legacy version, see the section below, **[How do I use Workbench (legacy)?](#h_b659fc7faa)**, and if there are prompts, completions, or evals you wish to retain, **consider exporting your data before August 17, 2026.**

## What is Workbench?

Workbench is built directly on the public **[Messages API](https://platform.claude.com/docs/en/build-with-claude/working-with-messages)**, so the request you build in Workbench is the same request you'll send in your code.

Use it to:

- Try a model or a new API feature before you write any code

- Iterate on a prompt and inspect the full response

- Learn how API requests and responses are structured

- Export your work as a code snippet you can run in your own application

Workbench doesn't store your prompts or conversations on Anthropic's servers. Your current draft stays in your browser, and you can go to the "code" tab to keep a copy of any request.

## Open Workbench

1. Log in to the **[Claude Console](https://platform.claude.com/)**.

2. Select "Workbench" in the navigation.

3. If your organization uses workspaces, choose the workspace you want to work in.

## Write and run a request

1. Enter a user message in the prompt area. You can also add a system prompt to set instructions or context.

2. Click "Run" to send the request.

3. Review Claude's response, along with the token counts and usage shown for the request.

4. Edit your prompt and run it again to keep iterating.

Workbench also includes example templates you can load and modify.

## Choose a model and adjust settings

Use the model selector to switch between Claude models, and open the model settings to adjust parameters like temperature and maximum output tokens.

Running the same prompt with different models or settings is a quick way to see how the response changes. As you think about building your application with the Messages API, use the workbench to understand the power of the models.

## Use tools and structured outputs

Add tool definitions to your request to test tool use, and use structured outputs to have Claude return data in a shape you define. Workbench shows tool calls and tool results in the response, so you can see exactly how they're represented in the API.

## View the raw request and response

Workbench can show the raw API request and response, including the full message structure, stop reason, and usage. This is the same shape your application sends and receives and is a practical way to try out the features of the Messages API.

## Turn your work into code

Click the "code" toggle to export your current request as a code snippet. The snippet reflects exactly what you've tested in the Workbench, so you can paste it into your project and run it with your own API key.

Code examples in our documentation include an "Open in Workbench" option, which loads the example into Workbench so you can run and modify it.

---

## How do I use Workbench (legacy)?

**Note: Workbench (legacy) is no longer available to new users and will be retired for all users on August 17, 2026.** After this date, Workbench (legacy) and any saved prompts, prompt versions, and evals stored in it will no longer be accessible. Use the Export option to download your data before then.

Workbench (legacy) allows you to create and test prompts within your Claude Console account. You can enter your prompt into the "Human" dialogue box and click "Run" to test Claude's output. Click on the + icon in the upper left to create a new prompt, or click on the bulleted list icon to see prompts you've tested in the past:



Workbench (legacy) also allows you to configure several settings when prompting Claude. You can click on the slider icon to review your model settings. This allows you to select the model, temperature, and max tokens to sample:



After crafting your prompt, click on the "Get code" button to generate a sample using our Python and Typescript SDKs:



## How can I access my previous work and prompt history in Workbench (legacy)?

You can access your previous Workbench prompts on your Console account by following these steps:

1. Log in at platform.claude.com.

2. Navigate to your [Workbench](https://platform.claude.com/workbench).

3. Click the "List prompts" button on the upper left corner of the page, next to the "+" button to create a new prompt:



4. A list of your previously-saved prompts will appear.

5. You can use the search bar at the top of the prompt list if you're looking for something specific.

**Important:** When you run a prompt on Workbench (legacy), Claude's response is not saved by default. You need to manually add responses from Claude to your current prompt on the Workbench by clicking "Add to Conversation" at the bottom of the output. If you aren't seeing something in your history that you were expecting, it's possible that it wasn't added to the conversation.

## How do I export my data from Workbench (legacy)?

1. Open **[Workbench (legacy)](https://platform.claude.com/workbench)** in the Claude Console.

2. In the banner at the top of the page, select "Export data."

3. In the **Export Workbench data** dialog, choose what to include alongside your prompts:

  - **Model completions** — saved responses from past runs

  - **Uploaded files** — images and PDFs attached to your prompts
​
​**Note:** Including either may significantly increase the export size.

4. Select "Export." Your data is packaged as JSON, and we'll email you a download link when it's ready.

Export your data before **August 17, 2026**. It will not be accessible after Workbench (legacy) is retired.

---

## Frequently asked questions

### What’s changing in Workbench?

We’re refreshing Workbench to be a simpler, stateless way to try Claude models and API features in the Console. The main differences are that it now:

- It doesn't store your work on Anthropic's servers. Your current draft stays in your browser, and you can export any request as code. With Workbench (legacy) you were able to save prompts, prompt history, and run evals.

- It is built directly on the public Messages API and shows the full request and response, so what you see matches what your code sends and receives.

- Saved prompts, prompt versions, evals, and prompt sharing aren't part of the refreshed Workbench. Use the export function in the legacy version to download your data.

### Will Workbench (legacy) keep working for me right now?

**Workbench (legacy) is no longer available to new users and will be retired for all users on August 17, 2026.** If you used Workbench (legacy) prior to **June 16, 2026**, you'll continue to have access until the retirement date and will see a banner in Workbench linking to the legacy version so you can export your data. Accounts that started using Workbench on or after June 16, 2026 do not have access to Workbench (legacy). After August 17, 2026, Workbench (legacy) will no longer be available to anyone.

### What happens to my saved prompts and evals?

They remain in Workbench (legacy) until it is retired on August 17, 2026. Use the Export option in Workbench (legacy) to download them before that date. The refreshed Workbench doesn't include saved prompts or evals, so keep your exported copies in your own tools, such as the repository where your application code lives.

### How do I get access to my existing data from Workbench (legacy)?

Your saved prompts and completions are available in Workbench (legacy) until August 17, 2026. You'll see an Export option in Workbench (legacy) that lets you download your saved prompts, prompt revisions, and completions. Export your data before the retirement date, as it will not be accessible afterward.

### Can I import my Workbench (legacy) data into refreshed Workbench?

No. The refreshed version of Workbench doesn't save prompts or conversations, so there's nothing to import into. The export gives you a copy of your Workbench data so you can keep it or move it into your own tools.
---

SOURCE: https://support.claude.com/en/articles/9767949-api-key-best-practices-keeping-your-keys-safe-and-secure

# API Key Best Practices: Keeping Your Keys Safe and Secure

API keys enable access to the Claude API, but they can pose significant security risks if not handled properly. Your API key is a digital key to your account. Much like a credit card number, if someone obtains and uses your API key, they incur charges on your behalf. This article outlines best practices for managing API keys to ensure they remain secure and prevent unauthorized access and charges to your Claude Console account.

## **Common Risks and Vulnerabilities**

One of the most frequent causes of API key leaks is accidental exposure in public code repositories or third-party tools. Developers often inadvertently commit plaintext API keys to public GitHub repositories or input them into third party tools, which can lead to unauthorized access and potential abuse of the associated accounts.

## Best Practices for API Key Security

### 1. *Never* share your API key

- **Keep it confidential**: Just as you wouldn't share your personal password, don't share your API key. If someone needs access to the Claude API, they should obtain their own key.

- **Don’t share your key in public forums**: Don't include your API key in public discussions, emails, or support tickets, even between you and Anthropic.

- **Exercise caution with third-party tools**: Consider that when you upload your API key to third-party tools or platforms (such as an web-based IDE, Cloud Provider, or CI/CD platform), you are giving the developer of that tool access to your Claude Console account. If you don’t trust their reputation, don’t trust them with your API key.

  - When using a third-party provider, always add your API key as an encrypted secret. Never include it directly in your code or configuration files.

### 2. Monitor Usage and Logs Closely

We recommend regularly reviewing [logs](https://console.anthropic.com/settings/logs) and [usage](https://console.anthropic.com/settings/usage) patterns for your API keys within the Console.

- **For Custom Rate Limit API orgs**: Implement usage and spend limits in your account settings.

  - These limits act as a safeguard against unexpected usage due to leaked keys or errant scripts.

- **For Standard Rate Limit API orgs**: Enable and configure auto-reload settings in your account.

  - This feature allows you to set a threshold at which your account will automatically charge the card on file to replenish usage credits.

    - Carefully consider auto-reload limits. While they ensure continuous service, they also act as a safeguard against unexpected high usage that could result from leaked keys or mistakes in your code.

### 3. Securely Handling API Keys with environment Variables and Secrets

A best practice for safely handling API keys is to use environment variables to securely inject and share environment variables. When you deploy your application to a cloud environment, you can use their secret management solution to securely pass the API key to your application via an environment variable without inadvertently sharing your API key.

If you are storing secrets locally using dotenv, you must add your `.env` files to your source control ignore file (e.g., `.gitignore` for git) to prevent inadvertently distributing sensitive information publicly. In cloud environments, prefer encypted secret storage instead of dotenv files.

**Python example:**

1. Create a `.env` file in your project directory.

2. Add your API key to the `.env` file:

```
ANTHROPIC_API_KEY=your-api-key-here
```

3. Install the `python-dotenv` package:

```
pip install python-dotenv
```

4. Load the API key in your Python script:

```
from dotenv import load_dotenv

import os

load_dotenv()
my_api_key = os.getenv("ANTHROPIC_API_KEY")
```

5. If you are deploying your application to a cloud hosting environment, refer to your cloud provider’s documentation on how to add your Claude API Key and share it with your application ([AWS](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html), [GCP](https://cloud.google.com/security/products/secret-manager?hl=en#how-it-works), [Azure](https://learn.microsoft.com/en-us/azure/key-vault/general/overview), [Vercel](https://vercel.com/docs/cli/secrets), [Heroku](https://devcenter.heroku.com/articles/config-vars)). Some providers offer multiple ways to securely inject environment variables into your app.

### 4. Rotate API Keys Regularly

Regularly rotate your API keys on a consistent schedule (for example, every 90 days) by creating new ones and deactivating old ones. This routine helps minimize potential risks if a key is ever compromised.

### 5. Use separate keys for different purposes

If possible, use different API keys for development, testing, and production environments. This way, you can correlate your usage to different internal use cases. If your API Key is compromised, this allows you to quickly disable just that use case and limit any potential damage.

### 6. Scan Repositories for Secrets

Regularly check your source control repositories for accidentally committed secrets.

- [Enable secret scanning directly in your source control provider](https://docs.github.com/en/code-security/secret-scanning/enabling-secret-scanning-features/enabling-secret-scanning-for-your-repository) if available.

- Use SAST tools like Gitleaks (<https://github.com/gitleaks/gitleaks>) to scan your repositories for accidentally committed secrets.

- Integrate secret scanning into your CI/CD pipeline to catch any secrets before they are pushed to the main branch..

By incorporating regular secret scanning into your development workflow, you can catch and prevent the accidental exposure of API keys and other sensitive information in your code repositories.

### 7. Use a Secure Key Management System (KMS)

As organizations scale and the number of API keys and other secrets increases, managing these sensitive credentials securely becomes more challenging. This is where Key Management Systems (KMS) come into play. A KMS provides a centralized solution for storing, accessing, and managing secret keys, including API keys.

## Benefits of using a KMS

1. **Centralized Security**: Store all your secrets in one secure, encrypted location.

2. **Access Control**: Implement fine-grained access controls to determine who can view or use specific keys.

3. **Audit Trails**: Track all access and changes to your secrets for compliance and security purposes.

4. **Key Rotation**: Easily rotate keys on a regular basis to enhance security.

5. **Integration**: Many KMS solutions integrate with popular cloud platforms and development tools.

## Anthropic's Partnership with GitHub for API Key Protection

Anthropic has partnered directly with GitHub to provide an extra layer of protection for our users through GitHub's Secret scanning partner program. This partnership offers proactive security measures to prevent the misuse of accidentally exposed API keys:

- GitHub actively scans public repositories for exposed Claude API keys.

- If a Claude API key is detected in a public GitHub repository, GitHub immediately notifies Anthropic.

- To prevent potential abuse, Anthropic automatically deactivates the exposed API key.

- The affected user receives a detailed email notification from Anthropic about the incident.

## What should I do if I suspect my API key has been compromised?

If you suspect that your API key may be compromised, we recommend revoking the key immediately. You can do so by logging into your Claude Console account, going to the [API keys page](https://platform.claude.com/settings/keys) from your profile, clicking the meatball menu (i.e. the three horizontal dots) next to the key in question, and selecting ‘Delete API Key.’

Refer to this article for more information: [What should I do if I suspect my API key has been compromised?](https://support.claude.com/en/articles/8384961-what-should-i-do-if-i-suspect-my-api-key-has-been-compromised)

API key security is an ongoing process that requires vigilance and regular review of your security measure. By following these best practices, you can significantly reduce the risk of API key leaks and unauthorized access.