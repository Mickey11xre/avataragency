
---

SOURCE: https://support.claude.com/en/articles/10186004-claude-console-roles-and-permissions

# Claude Console roles and permissions

The Claude Console uses a role-based access system with six distinct roles: User, Claude Code User, Limited Developer, Developer, Billing, and Admin. Each role has specific permissions and capabilities designed to help teams manage their API access securely.

## Role types and permissions

### User

- Can only use the playground

- Can view MCP tunnels

- Cannot view API keys, usage logs, or billing details

### Claude Code User

- Can use the playground and **[Claude Code](https://code.claude.com/docs/en/overview)**

- Can access Claude Code workspace in your org

- Can view MCP tunnels

### Limited Developer

- Can use the playground and Claude Code

- Can manage API keys and webhook endpoints

- Can view usage and cost data

- Can manage vaults and credentials

- Can view MCP tunnels
​

### Developer

- Can use the playground and Claude Code

- Can manage API keys and webhook endpoints

- Can view usage and cost data

- Can manage vaults and credentials

- Can view sessions traces

- Can download files

- Can view MCP tunnels

### Billing

- Can use the playground

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

1. Go to the **Data retention** page (platform.claude.com/settings/privacy) and find **Usage data and feedback**.

2. Toggle the feedback switch on or off.

More information on how Anthropic collects, uses, and stores feedback data can be found in our Privacy Center: **[How long do you store my organization’s data?](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)**
---

SOURCE: https://support.claude.com/en/articles/13346458-customize-your-console-appearance-settings

# Customize your Console appearance settings

## How to change your Console color mode

1. Log in to your Console account.

2. Go to platform.claude.com/settings/general.

3. Under **Appearance**, select System, Light, or Dark.
---

SOURCE: https://support.claude.com/en/articles/13443764-invite-members-to-the-claude-console

# Invite members to the Claude Console

The instructions in this article apply to your overall Console organization. If you are working within a specific Console Workspace, see this article: **[Create and manage Workspaces in the Claude Console](https://support.claude.com/en/articles/9796807)**.

Only organization Admins can manage Console members and invitations. See **[Claude Console roles and permissions](https://support.claude.com/en/articles/10186004-claude-console-roles-and-permissions)**.

## Invite members to your Console organization

1. Log in as a Admin.

2. Go to the **Members** page (platform.claude.com/settings/members).

3. Click the "+ Invite" button in the upper right corner of the page.

4. Enter up to 50 email addresses in the text box, separated by commas or new lines.

5. Select the role for the new users from the drop-down.

6. Click "Send Invites."

7. The newly-added users will receive an emailed invite and appear on the **Members** list with a "Pending" badge.

## Do Console invitations expire?

Yes, newly-invited members have three weeks to accept the invitation via email.

## Revoke invitations to your Console organization

1. Locate the "Pending" member on the **Members** page (platform.claude.com/settings/members).

2. Click the trash can icon to the right of the listed user to revoke their invitation.

3. Confirm the action by clicking "Revoke" in the **Revoke invitation?** modal.
---

SOURCE: https://support.claude.com/en/articles/8384961-what-should-i-do-if-i-suspect-my-api-key-has-been-compromised

# What should I do if I suspect my API key has been compromised?

If you suspect that your API key may be compromised, we recommend revoking the key immediately. You can do so by logging into your Claude Console account, going to the **API keys** page (platform.claude.com/settings/keys), clicking the menu (i.e. the three horizontal dots) next to the key in question, and selecting "Delete API key."

You can generate a new API key by clicking on the "Create key" button on the same page; make sure to save this key somewhere secure, such as a secrets management system and avoid keeping the key in version control. If you continue to see any suspicious API activity or have other concerns, please **[contact our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)**.
---

SOURCE: https://support.claude.com/en/articles/9767949-api-key-best-practices-keep-your-keys-safe-and-secure

# API key best practices: keep your keys safe and secure

API keys enable access to the Claude API, but they can pose significant security risks if not handled properly. Your API key is a digital key to your account. Much like a credit card number, if someone obtains and uses your API key, they incur charges on your behalf. This article outlines best practices for managing API keys to ensure they remain secure and prevent unauthorized access and charges to your Claude Console account.

## Common risks and vulnerabilities

One of the most frequent causes of API key leaks is accidental exposure in public code repositories or third-party tools. Developers often inadvertently commit plaintext API keys to public GitHub repositories or input them into third party tools, which can lead to unauthorized access and potential abuse of the associated accounts.

## Best practices for API key security

### 1. *Never* share your API key

- **Keep it confidential**: Just as you wouldn't share your personal password, don't share your API key. If someone needs access to the Claude API, they should obtain their own key.

- **Don’t share your key in public forums**: Don't include your API key in public discussions, emails, or support tickets, even between you and Anthropic.

- **Exercise caution with third-party tools**: Consider that when you upload your API key to third-party tools or platforms (such as an web-based IDE, Cloud Provider, or CI/CD platform), you are giving the developer of that tool access to your Claude Console account. If you don’t trust their reputation, don’t trust them with your API key.

  - When using a third-party provider, always add your API key as an encrypted secret. Never include it directly in your code or configuration files.

### 2. Monitor usage and logs closely

We recommend regularly reviewing the **Logs** page (platform.claude.com/logs) and the **Usage** page (platform.claude.com/usage) for your API keys in the Console.

- **For custom rate limit API orgs**: Set spend limits on the **Billing** page (platform.claude.com/settings/billing) and workspace rate limits on the **Rate limits** page (platform.claude.com/usage/limits).

  - These limits act as a safeguard against unexpected usage due to leaked keys or errant scripts.

- **For standard rate limit API orgs**: Turn on and configure auto-reload on the **Billing** page (platform.claude.com/settings/billing).

  - This feature allows you to set a threshold at which your account will automatically charge the card on file to replenish usage credits.

    - Carefully consider auto-reload limits. While they ensure continuous service, they also act as a safeguard against unexpected high usage that could result from leaked keys or mistakes in your code.

### 3. Handle API keys securely with environment variables and secrets

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

### 4. Rotate API keys regularly

Regularly rotate your API keys on a consistent schedule (for example, every 90 days) by creating new ones and deactivating old ones. This routine helps minimize potential risks if a key is ever compromised.

### 5. Use separate keys for different purposes

If possible, use different API keys for development, testing, and production environments. This way, you can correlate your usage to different internal use cases. If your API Key is compromised, this allows you to quickly disable just that use case and limit any potential damage.

### 6. Scan repositories for secrets

Regularly check your source control repositories for accidentally committed secrets.

- **[Enable secret scanning directly in your source control provider](https://docs.github.com/en/code-security/secret-scanning/enabling-secret-scanning-features/enabling-secret-scanning-for-your-repository)** if available.

- Use SAST tools like Gitleaks (<https://github.com/gitleaks/gitleaks>) to scan your repositories for accidentally committed secrets.

- Integrate secret scanning into your CI/CD pipeline to catch any secrets before they are pushed to the main branch..

By incorporating regular secret scanning into your development workflow, you can catch and prevent the accidental exposure of API keys and other sensitive information in your code repositories.

### 7. Use a secure Key Management System (KMS)

As organizations scale and the number of API keys and other secrets increases, managing these sensitive credentials securely becomes more challenging. This is where Key Management Systems (KMS) come into play. A KMS provides a centralized solution for storing, accessing, and managing secret keys, including API keys.

## Benefits of using a KMS

1. **Centralized Security**: Store all your secrets in one secure, encrypted location.

2. **Access Control**: Implement fine-grained access controls to determine who can view or use specific keys.

3. **Audit Trails**: Track all access and changes to your secrets for compliance and security purposes.

4. **Key Rotation**: Easily rotate keys on a regular basis to enhance security.

5. **Integration**: Many KMS solutions integrate with popular cloud platforms and development tools.

## Anthropic's partnership with GitHub for API key protection

Anthropic has partnered directly with GitHub to provide an extra layer of protection for our users through GitHub's Secret scanning partner program. This partnership offers proactive security measures to prevent the misuse of accidentally exposed API keys:

- GitHub actively scans public repositories for exposed Claude API keys.

- If a Claude API key is detected in a public GitHub repository, GitHub immediately notifies Anthropic.

- To prevent potential abuse, Anthropic automatically deactivates the exposed API key.

- The affected user receives a detailed email notification from Anthropic about the incident.

## What should I do if I suspect my API key has been compromised?

If you suspect that your API key may be compromised, we recommend revoking the key immediately. You can do so by logging into your Claude Console account, going to the **API keys** page (platform.claude.com/settings/keys), clicking the menu (i.e. the three horizontal dots) next to the key in question, and selecting "Delete API key."

Refer to this article for more information: **[What should I do if I suspect my API key has been compromised?](https://support.claude.com/en/articles/8384961-what-should-i-do-if-i-suspect-my-api-key-has-been-compromised)**

API key security is an ongoing process that requires vigilance and regular review of your security measure. By following these best practices, you can significantly reduce the risk of API key leaks and unauthorized access.