
---

SOURCE: https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan

# Use Claude Code with your Pro or Max plan

This article applies to individual consumers using Pro or Max plan subscriptions to access Claude Code. If you’re a member of a Team or Enterprise plan organization, see **[Use Claude Code with your Team or Enterprise plan](https://support.claude.com/en/articles/11845131)**.

## What is Claude Code?

Claude Code is a coding tool that gives you access to Claude models directly in your terminal or supported IDE, allowing you to delegate complex coding tasks while maintaining transparency and control. With Pro and Max plans, you now have access to both Claude on the web, desktop, and mobile apps and Claude Code in your terminal with one unified subscription.

### Why use Claude and Claude Code?

Use two powerful AI products in one simple subscription.

- Use Claude for writing, research, analysis, and more—at work and at home.

- Use Claude Code for your terminal-based coding workflows.

---

## How to connect Claude Code to your Pro or Max plan

1. **Ensure you have an active Pro or Max plan subscription**

  - If you're not already subscribed, upgrade at **[claude.ai/upgrade](https://claude.ai/upgrade)**

2. **Install Claude Code**

  - Visit the **[Claude Code page in our Claude Docs](https://code.claude.com/docs/en/quickstart#step-1-install-claude-code)** to download and install Claude Code.

  - Follow the installation instructions for your operating system.

3. **Authenticate with your Claude credentials**

  - When prompted during setup or first use, log in with the same credentials you use for Claude.

  - This will connect your Pro or Max plan subscription to Claude Code.

  - If you're already logged in to Claude Code via Claude Console PAYG, run /login from within Claude Code to switch to your subscription plan.

### Having trouble using your Pro or Max plan to access Claude Code?

If you're not seeing the option to authenticate with your preferred account, follow these steps to update Claude Code:

1. Log out of your active session completely using the `/logout` command.

2. Run `claude update`.

3. Restart your terminal completely for the change to take effect.

4. Run `claude` and select the correct account to use Claude Code.

**Important:** If you have an ANTHROPIC_API_KEY environment variable set on your system, Claude Code will use this API key for authentication instead of your Claude subscription (Pro, Max, Team, or Enterprise plans), resulting in API usage charges rather than using your subscription's included usage. See this article for more information: **[Managing API key environment variables in Claude Code](https://support.claude.com/en/articles/12304248-managing-api-key-environment-variables-in-claude-code).**

## Use Claude Code in your IDE

Your Pro or Max plan also covers Claude Code in supported IDEs, including VS Code, Cursor and other VS Code forks, and JetBrains IDEs like IntelliJ and PyCharm. Log in with the same Claude credentials you use in the terminal. IDE usage counts toward the same usage limits shared across Claude and Claude Code.

To install and set up the extension for your IDE, see **[Platforms and integrations](https://code.claude.com/docs/en/platforms)** in our Claude Code Docs.

---

## What happens when you hit usage limits

Both Pro and Max plans offer usage limits that are shared across Claude and Claude Code, meaning all activity in both tools counts against the same usage limits. To help you monitor your usage, you will see warning messages about remaining capacity.

When you reach your usage limits, you can select from a few options based on your needs:

### Pro plan users

- Consider upgrading to the Max 5x plan if you consistently hit limits and need more capacity for larger repositories.

- **[Enable usage credits](https://support.claude.com/en/articles/12429409-)** to continue using Claude with your Pro plan after hitting the included usage limit.

- You will have the flexibility to switch to **[pay-as-you-go usage](https://support.claude.com/en/articles/8114526-how-will-i-be-billed-for-claude-api-use)** with a Claude Console account for intensive coding sprints.

- Wait until your usage limits reset.

### Max plan users

- If you're on the Max 5x plan, consider upgrading to the Max 20x plan if you consistently hit limits.

- **[Enable usage credits](https://support.claude.com/en/articles/12429409-)** to continue using Claude with your Max plan after hitting the included usage limit.

- You will have the flexibility to switch to **[pay-as-you-go usage](https://support.claude.com/en/articles/8114526-how-will-i-be-billed-for-claude-api-use)** with a Claude Console account for intensive coding sprints.

- Wait until your usage limits reset.

For more details on efficient usage, refer to our **[Usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices)**.

---

## Claude Code billing

### Understanding two distinct systems

It's important to recognize these are separate systems:

- **Claude Code:** Presents options for continuing usage through API credits.

- **Claude Console / Claude API:** Contains optional auto-reload settings for API credit management where your terminal is located.

### Choosing to use API credits

If you want to use API credits through Claude Code:

- Usage will be billed at **[standard API rates](https://claude.com/pricing#api)** (distinct from Pro/Max Plan pricing).

- If auto-reload is enabled in your Console account, additional credits will be automatically added when your balance runs low.

### Staying within your plan

To maintain usage strictly within your Pro or Max Plan allocation:

- Decline the API credit option when presented.

- Allow your usage period to reset before continuing to use Claude Code.

- Monitor your remaining allocation using the /status command.

### Opting out of API credits for Claude Code

If you prefer to prevent the API credit option from appearing entirely:

- Run `claude logout` in your terminal.

- Run `claude login` and authenticate using only your Pro or Max plan credentials.

- Avoid adding any Claude Console credentials during the login process.

This ensures Claude Code will only use your plan allocation and you won't be prompted to use API credits when you reach your limits.

### Managing auto-reload settings

Auto-reload functionality is managed within your Claude Console account, not through Claude Code:

- Review your **[Console Billing settings](https://platform.claude.com/settings/billing)** to check auto-reload status.

- Adjust these settings in the Console if you prefer to avoid automatic credit purchases.

- Remember, auto-reload only applies when you've chosen to use API credits.

### Summary

- Claude Code maintains strict user control over billing decisions.

- All transitions to API credit usage require explicit user consent.

- Auto-reload is an independent Claude Console feature.

- To maintain your Pro or Max plan budget, simply decline API credit options when offered.
---

SOURCE: https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan

# Use Claude Code with your Team or Enterprise plan

This article applies to members of Team or Enterprise plan organizations using their subscription plans to access Claude Code. If you’re an individual consumer using a Pro or Max plan subscription, see **[Use Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan)**.

## What is Claude Code?

Claude Code is a coding tool that gives you access to Claude models directly in your terminal or supported IDE, allowing you to delegate complex coding tasks while maintaining transparency and control.

Claude Code is included with every Team plan seat. Premium seats offer more usage for team members with heavier workloads. For Enterprise plans, Claude Code is included with the single Enterprise seat on new and self-serve plans. On older Enterprise plans, Claude Code is available on Chat + Claude Code seats (usage-based billing) and Premium seats (seat-based billing).

With a Team or Enterprise plan, you can access Claude on the web, desktop, and mobile apps, plus Claude Code in your terminal—all with one unified subscription.

### Why use Claude and Claude Code?

Combine two powerful AI products in one unified subscription:

- Use Claude for writing, research, analysis, and collaboration across teams.

- Use Claude Code for terminal-based coding workflows and development tasks.

---

## Connect Claude Code to your Team or Enterprise plan

### Step 1: Confirm Claude Code access (Enterprise plans only)

If your organization is on a new or self-serve Enterprise plan, Claude Code is already included with every Enterprise seat—no additional purchase is needed. Proceed to Step 2.

**Note:** If your organization has a HIPAA-ready Enterprise plan, Claude Code is included in your seat but is not covered under the HIPAA-ready offering. See **[HIPAA-ready Enterprise plans](https://support.claude.com/en/articles/13296973-hipaa-ready-enterprise-plans)** for details.

If your organization is on an older Enterprise plan with Chat and Chat + Claude Code seats, or Standard and Premium seats, you'll need to ensure you have a seat type that includes Claude Code. Owners can purchase or reassign **Chat + Claude Code / Premium seats** in **[Organization settings > Organization](https://claude.ai/admin-settings/organization)**. See **[Purchase and manage seats on Enterprise plans](https://support.claude.com/en/articles/13393991-purchase-and-manage-seats-on-enterprise-plans)** for details.

### Step 2: Download and install Claude Code

**Note:** If you already have Claude Code installed on your computer, proceed to Step 3.

Once you confirm you have access, follow the installation instructions in our **[Claude Code Docs](https://code.claude.com/docs/en/quickstart#step-1-install-claude-code)** for the environment you're using.

### Step 3: Authenticate with the Team or Enterprise account

1. Type `claude` within your Terminal window to start a Claude Code session.

2. When prompted during setup or first use, select a login method.

  1. If you're already logged in to Claude Code via a different account, run /login to select a different login method.

3. Select “Claude account with subscription” to be routed to an OAuth prompt.

4. Select your Team or Enterprise plan and click “Authorize.”

5. Your premium seat subscription will be linked to Claude Code.

### Having trouble using your Team or Enterprise account to access Claude Code?

If you're not seeing the option to authenticate with your preferred account, follow these steps to update Claude Code:

1. Log out of your active session completely using the `/logout` command.

2. Run `claude update`.

3. Restart your terminal completely for the change to take effect.

4. Run `claude` and select the correct account to use Claude Code.

## Use Claude Code in your IDE

Your seat also covers Claude Code in supported IDEs, including VS Code, Cursor and other VS Code forks, and JetBrains IDEs like IntelliJ and PyCharm. Log in with the same Team or Enterprise account you use in the terminal. IDE usage is limited and billed the same way as terminal usage on your plan.

To install and set up the extension for your IDE, see **[Platforms and integrations](https://code.claude.com/docs/en/platforms)** in our Claude Code Docs.

---

## What happens when you hit usage limits

If your organization is on a **usage-based Enterprise plan** (including self-serve Enterprise), there are no per-seat usage limits—usage is based on consumption and billed at API rates. See **[How am I billed for my Enterprise plan?](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan)** for details on how usage billing works.

If your organization is on a Team plan or a seat-based Enterprise plan, you can enable usage credits to allow team members to continue working with Claude, Cowork, and Claude Code after reaching their included usage limits. For more information, see **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-)**.
---

SOURCE: https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code

# Automated Security Reviews in Claude Code

Claude Code now includes automated security review features to help you identify and fix vulnerabilities in your code. This guide explains how to use the /security-review command and GitHub Actions to improve your code security.

**Note:** While automated security reviews help identify many common vulnerabilities, they should complement, not replace, your existing security practices and manual code reviews.

## Overview

Automated security reviews in Claude Code help developers catch vulnerabilities before they reach production. These features check for common security issues including SQL injection risks, cross-site scripting (XSS) vulnerabilities, authentication flaws, insecure data handling, and dependency vulnerabilities.

You can use security reviews in two ways: through the /security-review command for on-demand checks in your terminal, or through GitHub Actions for automatic review of pull requests.

## Availability

These features are available for all Claude Code users, including:

- Users on individual paid plans (Pro or Max).

- Individual users or enterprises with pay-as-you-go API Console accounts.

## Using the /security-review command

The /security-review command lets you run security analysis directly from your terminal before committing code.

### Running a Security Review

To check your code for vulnerabilities:

1. Open Claude Code in your project directory.

2. Run /security-review in the terminal.

3. Claude will analyze your codebase and identify potential security concerns.

4. Review the detailed explanations provided for each issue found.

### Implementing Fixes

After Claude identifies vulnerabilities, you can ask it to implement fixes directly. This keeps security reviews integrated into your development workflow, allowing you to address issues when they're easiest to resolve.

### Customizing the Command

You can customize the /security-review command for your specific needs. See the[security review documentation](https://github.com/anthropics/claude-code-security-review/tree/main?tab=readme-ov-file#security-review-slash-command) for configuration options.

## Setting up GitHub Actions for automated PR reviews

After installing and configuring the GitHub action, it will automatically review every pull request for security vulnerabilities when it's opened.

### Installation

To set up automated security reviews for your repository:

1. Navigate to your repository's GitHub Actions settings

2. Follow the[step-by-step installation guide](https://github.com/anthropics/claude-code-security-review) in our documentation

3. Configure the action according to your team's security requirements

### How It Works

Once configured, the GitHub action:

- Triggers automatically when new pull requests are opened.

- Reviews code changes for security vulnerabilities.

- Applies customizable filtering rules to reduce false positives.

- Posts inline comments on the PR with identified concerns and recommended fixes.

This creates a consistent security review process across your entire team, ensuring code is checked for vulnerabilities before merging.

### Customization Options

You can customize the GitHub action to match your team's security policies, including setting specific rules for your codebase and adjusting sensitivity levels for different vulnerability types.

## What security issues can be detected?

Both the /security-review command and GitHub action check for common vulnerability patterns:

- **SQL injection risks**: Identifies potential database query vulnerabilities.

- **Cross-site scripting (XSS)**: Detects client-side script injection vulnerabilities.

- **Authentication and authorization flaws**: Finds issues with access control.

- **Insecure data handling**: Identifies problems with data validation and sanitization.

- **Dependency vulnerabilities**: Checks for known issues in third-party packages.

## Getting Started

To start using automated security reviews:

- **For the /security-review command**: Update Claude Code to the latest version (run), then run `/security-review` in your project directory.

  - Claude Code automatically keeps itself up to date to ensure you have the latest features and security fixes, but you can also run `claude update` to update manually.

- **For the GitHub actions**: Visit our[documentation](https://github.com/anthropics/claude-code-security-review) for installation and configuration instructions.

## Best Practices

For optimal results, we recommend running /security-review before committing significant changes and configuring the GitHub action for all repositories containing production code. Consider adjusting the filtering rules based on your team's specific security requirements and codebase characteristics.
---

SOURCE: https://support.claude.com/en/articles/11940350-claude-code-model-configuration

# Claude Code model configuration

This guide shows you three ways to change which Claude model you're using with Claude Code: the quick `/model` command for instant changes, the `--model` flag for one-time session changes, and environment variables to set your preferred model as the permanent default.

## Easiest method: Use /model command

The simplest way to change models is to use the /model command directly within Claude Code. This works immediately without restarting your terminal.

1. Start Claude Code: `claude`

2. Type `/model` and choose your desired model from the interactive menu.

3. Your model change takes effect immediately.

**Note:** You can check your current model anytime by running `/status` in Claude Code.

## Supported models

- Opus 5, `claude-opus-5`

- Sonnet 5, `claude-sonnet-5`

- Fable 5, `claude-fable-5`

- Opus 4.8, `claude-opus-4-8`

- Opus 4.7, `claude-opus-4-7`

- Sonnet 4.6, `claude-sonnet-4-6`

- Opus 4.6, `claude-opus-4-6`

- Opus 4.5, `claude-opus-4-5-20251101`

- Haiku 4.5, `claude-haiku-4-5-20251001`

- Sonnet 4.5, `claude-sonnet-4-5-20250929`

## Change model for current session only

Use the `--model` flag when starting Claude Code.

1. Start a fresh Terminal session.

2. Enter the following commands (depending on the model you’d like to use for that session):

  - **For Opus 5**: `claude --model claude-opus-5`

  - **For Sonnet 5**: `claude --model claude-sonnet-5`

  - **For Fable 5**: `claude --model claude-fable-5`

  - **For Opus 4.8**: `claude --model claude-opus-4-8`

  - **For Opus 4.7**: `claude --model claude-opus-4-7`

  - **For Sonnet 4.6**:  `claude --model claude-sonnet-4-6`

  - **For Opus 4.6**:  `claude --model claude-opus-4-6`

  - **For Opus 4.5**:  `claude --model claude-opus-4-5-20251101`

  - **For Haiku 4.5:** `claude --model claude-haiku-4-5-20251001`

  - **For Sonnet 4.5**: `claude --model claude-sonnet-4-5-20250929`

## Change default model for all future sessions

**Step 1)** Check your shell type by running: `echo $SHELL`

- `/bin/zsh` → You're using zsh (macOS default)

- `/bin/bash` → You're using bash (Linux default)

**Step 2)** Add model setting to your shell config:

### For ZSH users (macOS)

- Opus 5: `echo 'export ANTHROPIC_MODEL="claude-opus-5"' >> ~/.zshrc`

- Sonnet 5: `echo 'export ANTHROPIC_MODEL="claude-sonnet-5"' >> ~/.zshrc`

- Fable 5: `echo 'export ANTHROPIC_MODEL="claude-fable-5"' >> ~/.zshrc`

- Opus 4.8: `echo 'export ANTHROPIC_MODEL="claude-opus-4-8"' >> ~/.zshrc`

- Opus 4.7: `echo 'export ANTHROPIC_MODEL="claude-opus-4-7"' >> ~/.zshrc`

- Sonnet 4.6: `echo 'export ANTHROPIC_MODEL="claude-sonnet-4-6"' >> ~/.zshrc`

- Opus 4.6: `echo 'export ANTHROPIC_MODEL="claude-opus-4-6"' >> ~/.zshrc`

- Opus 4.5: `echo 'export ANTHROPIC_MODEL="claude-opus-4-5-20251101"' >> ~/.zshrc`

- Haiku 4.5: `echo 'export ANTHROPIC_MODEL="claude-haiku-4-5-20251001"' >> ~/.zshrc`

- Sonnet 4.5: `echo 'export ANTHROPIC_MODEL="claude-sonnet-4-5-20250929"' >> ~/.zshrc`

### For BASH users (Linux)

- Opus 5: `echo 'export ANTHROPIC_MODEL="claude-opus-5"' >> ~/.bashrc`

- Sonnet 5: `echo 'export ANTHROPIC_MODEL="claude-sonnet-5"' >> ~/.bashrc`

- Fable 5: `echo 'export ANTHROPIC_MODEL="claude-fable-5"' >> ~/.bashrc`

- Opus 4.8: `echo 'export ANTHROPIC_MODEL="claude-opus-4-8"' >> ~/.bashrc`

- Opus 4.7: `echo 'export ANTHROPIC_MODEL="claude-opus-4-7"' >> ~/.bashrc`

- Sonnet 4.6: `echo 'export ANTHROPIC_MODEL="claude-sonnet-4-6"' >> ~/.bashrc`

- Opus 4.6: `echo 'export ANTHROPIC_MODEL="claude-opus-4-6"' >> ~/.bashrc`

- Opus 4.5: `echo 'export ANTHROPIC_MODEL="claude-opus-4-5-20251101"' >> ~/.bashrc`

- Haiku 4.5: `echo 'export ANTHROPIC_MODEL="claude-haiku-4-5-20251001"' >> ~/.bashrc`

- Sonnet 4.5: `echo 'export ANTHROPIC_MODEL="claude-sonnet-4-5-20250929"' >> ~/.bashrc`

**Step 3)** Apply the changes:

- For ZSH: `source ~/.zshrc`

- For BASH: `source ~/.bashrc`

**Step 4)** Close Terminal completely, then reopen it.

**Step 5)** Start Claude Code in a fresh Terminal session: `claude`.

Now your chosen model will be the default for all future Claude Code sessions.
---

SOURCE: https://support.claude.com/en/articles/12157520-claude-code-usage-analytics

# Claude Code usage analytics

This feature allows Console users and owners of Team and Enterprise plans to monitor how their organization uses Claude Code, tracking productivity metrics and adoption patterns across teams.

Claude Code usage analytics are available to:

- **Team plans:** Owners and Primary Owners

- **Enterprise plans:** Owners, Primary Owners, and Admins (requires a Chat + Claude Code seat for usage-based plans or Premium seat for seat-based plans)

- **API Console:** Admin, Billing, and Developer roles

## Access Claude Code analytics

### Team and Enterprise plans

1. Log in to your Owner or Primary Owner account.

2. Click your initials or name in the lower left corner.

3. Navigate to **[Analytics > Claude Code](https://claude.ai/analytics/claude-code)**.

4. Select the “Usage” or “Value”  tab.

### API Console users

1. Log in to your **[Claude Console account](https://platform.claude.com)**.

2. Expand the left side panel.

3. Click “Claude Code” under **Analytics**.

4. View Claude Code usage analytics on **[Settings > Claude Code](https://platform.claude.com/claude-code)**.

---

## Usage tab

The **Usage** tab displays the following metrics for your organization. Data on this tab refreshes daily.

### Organization-level metrics

- **Lines of code accepted**: Total lines of code your team has accepted from Claude Code suggestions.

- **Suggestion accept rate**: Percentage of Claude Code suggestions that your team accepts.

- **Activity trends**: Daily view of active users and sessions over time.

- **Lines accepted over time**: Daily breakdown of accepted code lines.

- **Top commands**: The Claude Code commands used most often across your organization.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1717579277/46c512f4b3ed05c359cecd78ed5c/e0ce2c19-39e2-411f-9a1f-cb1d46439a42?expires=1785363300&amp;signature=484e746c1a194f3a9cfc07028dbeb321a9a35d440cdc534e536e23d6b49fb55a&amp;req=dScmEcx5lINYXvMW1HO4zfiEP6NTiXrNCX9h5MbdDjMiwePYDzEv78udy%2BUq%0A5xyjCfsBNBpvKAV%2F7Wo%3D%0A)

### User-level metrics

**Individual usage**: View each team member's email address and their total lines of code accepted for the current month. You can search for specific users or click the “Export” button to generate a CSV of members’ email addresses and total lines of code.

---

## Value tab

The **Value** tab summarizes usage and cost data to help you understand what Claude Code is returning to your organization at a glance.

- **Estimated productivity lift**

- **Cost per commit**

- **Estimated annual value**

Every formula used on this tab is shown inline. Click any input to adjust it to match your organization's assumptions, and the estimates recalculate.

---

## Contribution metrics (beta)

Contribution metrics are a new feature in public beta that helps Team and Enterprise organizations measure how Claude Code affects engineering velocity. By connecting to your organization's GitHub account, these metrics track code shipping activity with and without Claude Code, so you can see where it's making a difference.

Contribution metrics require GitHub Cloud and are not available to Console users at this time.

For a more in-depth look at contribution metrics, see **[our Claude Code docs](https://code.claude.com/docs/en/analytics#enable-contribution-metrics)**.

### Set up contribution metrics

Contribution metrics require a few steps beyond the base analytics setup:

1. Install the **[Claude GitHub App](https://github.com/apps/claude)** on your organization's GitHub account.

2. Log in with an Owner or Primary Owner account.

3. Navigate to **[Organization settings > Claude Code](https://claude.ai/admin-settings/claude-code)**.

4. Enable the Claude Code analytics feature if you haven't already.

5. Toggle on **GitHub analytics**.

6. Select the GitHub organization(s) you want included in the comparison.

After setup, metrics begin populating automatically. Allow up to 24 hours for data to appear. The dashboard currently processes data once daily.

If you see "GitHub app required. Install the GitHub app to view analytics," the GitHub App hasn't been installed yet. If the app is authenticated but no data appears, confirm the GitHub App is installed and that your team has started using Claude Code.

### Available contribution metrics

Once enabled, the following metrics appear in your Claude Code analytics dashboard:

1. **Pull requests merged**: Total PRs merged with and without Claude Code assistance, at both the organization and user level.

2. **Lines of code committed**: Total lines committed with and without Claude Code assistance, at both the organization and user level.

3. **Pull requests opened per user**: Individual PR activity across your team.

Data is collected by correlating Claude Code session activity with GitHub commits and pull requests.

---

## Data reset and availability

Usage metrics display data for the current calendar month and reset at the beginning of each month. Historical data visualization shows daily granularity for tracking trends over time.

## Use analytics to optimize Claude Code adoption

Review your organization's code acceptance rate to understand if teams are finding Claude Code's suggestions valuable. If rates are lower than expected, consider providing additional training on effective prompting techniques.

Monitor individual usage patterns to identify power users who can share best practices with the broader team, or to spot team members who might benefit from additional support.

Track activity trends to understand when your team uses Claude Code most effectively and ensure adequate seat allocation during peak periods.

---

## Frequently asked questions

### I'm using an individual paid plan; how can I access usage analytics for Claude Code?

Claude Code usage analytics are not available to individual Pro or Max plans at this time.

### I'm looking for a specific user but they're missing from the reports.

If you notice that a specific user isn't showing up in your analytics, you should have them update Claude Code to the most recent version. The first Claude Code version to support this feature is **version 2.0.28**, so users should run `claude update` to manually update Claude Code if needed.

### Where can I find more information?

See **[Analytics](https://code.claude.com/docs/en/analytics)** in our Claude Code docs for more information.
---

SOURCE: https://support.claude.com/en/articles/12304248-manage-api-key-environment-variables-in-claude-code

# Manage API key environment variables in Claude Code

When using Claude Code, it's important to understand how authentication methods are prioritized to avoid unexpected API charges and ensure you're using your intended account.

## How authentication works

- Claude Code prioritizes environment variable API keys over authenticated subscriptions.

- This is intentional behavior designed to give you flexibility in choosing your authentication method.

- When an API key is set as an environment variable, you'll be charged via API pay-as-you-go rates using the API account associated with that key.

- This happens even if you're logged into Claude Code with a claude.ai subscription or a different Console account.

## Best practices

**To use Claude Code with your Claude subscription:** Keep the ANTHROPIC_API_KEY environment variable unset.

- This prevents unexpected API charges and ensures you're using your subscription's included usage.

- If you need to use a specific API key occasionally, set it temporarily only when needed.

- Run /status in Claude Code periodically to verify your current authentication method.

## Authentication conflict warnings

Claude Code will notify you when there's a conflict between your authenticated subscription and an environment variable API key:

1. During initial setup, if an API key is detected in your environment variables, Claude Code will ask you to confirm which authentication method you want to use.

2. After successful login, you'll see a notification if both credentials are active, alerting you to the potential for unexpected API charges.

## Check your current configuration

To verify if an API key is set as an environment variable, run /status in Claude Code. This will show you which authentication method is currently active.

To check your environment variable directly, run one of these commands in a terminal (outside of Claude Code):

macOS/Linux:

```
echo $ANTHROPIC_API_KEY
```

Windows CMD:

```
echo %ANTHROPIC_API_KEY%
```

Windows PowerShell:

```
echo $env:ANTHROPIC_API_KEY
```

## Set an API key temporarily

If you need to use an API key for the current terminal session only:

macOS/Linux:

```
export ANTHROPIC_API_KEY='your-api-key-here'
```

Windows CMD:

```
set ANTHROPIC_API_KEY=your-api-key-here
```

Windows PowerShell:

```
$env:ANTHROPIC_API_KEY="your-api-key-here"
```

## Set an API key environment variable permanently

macOS/Linux:

```
For zsh (default on macOS):
bash
# Add to shell config file
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.zshrc

# Apply changes
source ~/.zshrc
For bash:
bash
# Add to shell config file
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bash_profile

# Apply changes
source ~/.bash_profile
```

Windows:

1. Open System Properties → Advanced → Environment Variables

2. Under "User variables", click "New"

3. Variable name: ANTHROPIC_API_KEY

4. Variable value: your-api-key-here

5. Click OK and restart your terminal

## Remove an API key environment variable

macOS/Linux (temporary):

```
unset ANTHROPIC_API_KEY
```

macOS (permanent):

```
# Remove from config file
sed -i '' '/ANTHROPIC_API_KEY/d' ~/.zshrc
source ~/.zshrc
```

Linux (permanent)

```
sed -i '/ANTHROPIC_API_KEY/d' ~/.zshrc
```

Windows CMD:

```
set ANTHROPIC_API_KEY=
```

Windows PowerShell:

```
Remove-Item Env:ANTHROPIC_API_KEY
```

Windows (permanent): Delete the variable from System Environment Variables settings.

## Common issues to avoid

- Setting environment variables in shell configuration files and forgetting about them.

- Not restarting your terminal after changing environment variables.

- Assuming you're using your subscription when an API key is configured in your environment.

If you have any questions, please **[contact our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)**.
---

SOURCE: https://support.claude.com/en/articles/12386420-claude-code-faq

# Claude Code FAQ

This article is a compilation of commonly-asked questions about Claude Code related to authentication, integrations, configuration, and more. If you're interested in learning more about Claude Code, please refer to our Claude Docs here: **[Claude Code overview](https://docs.claude.com/en/docs/claude-code/overview)**.

## How do I set up single sign-on (SSO) for Claude Code?

We have detailed instructions for setting up single sign-on on a Team, Enterprise, or Console organization here: **[Set up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso)**.

## Is there a way to disable Opus model access across our entire organization in Claude Code?

If you are a Claude Console user, this can be configured through rate limiting in your Console organization. If you are using Bedrock or Vertex, set the Opus rate limit to 0 in your Vertex/Bedrock project settings. Note that even if disabled in Vertex, users may be able to switch models in Claude Code, so rate limiting is the most effective approach.

## What are Claude Code dynamic workflows, and how do we control access?

Dynamic workflows (available for Claude Enterprise plans) let Claude run large engineering tasks—migrations, audits, codebase-wide bug hunts—from start to finish in a single Claude Code session. They become available and turn on by default for your whole Enterprise organization on June 8, 2026. Because a single run can last for hours and use more tokens than a typical session, admins should decide who has access before that date.

You have three ways to control access:

1. **At the role level (Enterprise plans with custom roles):** Grant or restrict the Claude Code dynamic workflows capability per group. This only affects members whose role is set to "Custom." See **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452)**.

2. **Disable org-wide via `managed-settings.json`:** Add `"disableWorkflows": true` to your managed settings. This holds before and after June 8.

3. **Organization-wide:** After June 8, an owner can disable dynamic workflows for everyone by going to **[Organization settings > Claude Code](https://claude.ai/admin-settings/claude-code)** and toggling **Workflows** off.

We apply the more restrictive of your managed settings and custom role permissions on a per-user basis. If either one disables workflows for a given user, that user won't have access.

## Does Claude Code support Microsoft Visual Studio IDE integration (not VS Code)?

No current Visual Studio 2022 integration exists. Claude Code currently supports VS Code, Cursor (and other VS Code forks), Intellij, Pycharm (and other Jetbrains IDEs).

## How can we implement PR review automation with Claude Code?

While there isn't a turnkey PR reviewer solution yet, you can use the **[Claude Code GitHub Actions integration](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code)** for automated reviews. For now, you can use the security review action as a template and customize it for general PR reviews. This is also a good use case for the **[Claude Code SDK](https://docs.claude.com/en/docs/claude-code/sdk/sdk-overview)**.

## I’m getting an error message that “Claude Max or Pro is required to connect to Claude Code” but I should have access through my organization’s Team or Enterprise plan. How can I troubleshoot?

This indicates that you selected the wrong login method from the Claude Code setup screen. Try running /login again and selecting the account associated with your primary work email address. If you’re still unable to connect, see **[Having trouble using your Team or Enterprise account to access Claude Code?](https://support.claude.com/en/articles/11845131-using-claude-code-with-your-team-or-enterprise-plan#h_540f9e65d8)**

## What data is sent to Anthropic when using Claude Code with Bedrock/Vertex API keys?

When configured with Bedrock/Vertex and CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC is set, only essential telemetry is sent. All model API requests go directly to your Bedrock/Vertex endpoints. Review the [d**ata flow documentation**](https://docs.claude.com/en/docs/claude-code/security) for complete details.

## Is there a way to access Claude Code via Bedrock/Vertex without exposing a secret key/access key?

Yes. Our setup guides for **[Bedrock](https://docs.claude.com/en/docs/claude-code/amazon-bedrock)** and **[Vertex](https://docs.claude.com/en/docs/claude-code/google-vertex-ai)** show how you can enable this. For example, in the Bedrock case you can run `aws configure` to configure the AWS CLI before adding the necessary **[configs](https://docs.claude.com/en/docs/claude-code/amazon-bedrock#3-configure-claude-code)** and running Claude Code with the Bedrock, or you can use Bedrock API keys, which is a new feature from AWS that enables API keys for Bedrock usage that don’t require full AWS credentials.

## How can we deploy Claude Code with custom environment variables and permissions across our organization?

Create wrapper scripts that set environment variables before running Claude Code. For permissions, use .claude/settings.json files with allow/deny lists. Note that wildcard patterns (*) don't always match as expected - test permissions thoroughly. Enterprise teams often inject standardized Claude.md files for consistent configurations.

## Does Claude Code have public code filtering or attribution capabilities on the roadmap?

No, public code filtering and attribution capabilities are not currently on the roadmap. Some customers use BlackDuck for code scanning, though feedback on cost and false positives has been mixed. We are aware that this is a blocker for scaling Claude Code to more users and are looking into solutions.

## Are subagents available in Claude Code SDK and GitHub Actions?

Subagents are available via the **[Claude Code SDK](https://docs.claude.com/en/docs/claude-code/sdk/sdk-overview)**. They're not yet integrated into GitHub Actions, but we are considering this. The UX collapses outputs when more than three subagents run in parallel to manage complexity.

## Can subagents be configured to use specific MCP tools?

Yes, when creating a subagent, you can specify which tools it has access to using the `tools` field in the configuration. In the subagent configuration file, you can either omit the tools field to inherit all tools from the main thread, or you can specify individual tools as a comma-separated list for more granular control. Learn more about this in our Claude Docs: **[Subagents - Available tools](https://docs.claude.com/en/docs/claude-code/sub-agents#available-tools)**.

## How can we manage Claude Code costs, especially for automated workflows?

For automated workflows like security reviews, switch from Opus to Sonnet using the **[claude --model <alias|name> configuration option](https://docs.claude.com/en/docs/claude-code/model-config)** for cost savings. You can also monitor usage through your console dashboard and set appropriate rate limits. Note that you can use Workspaces to set more granular spend limits for different user groups. Read more about Workspaces here: **[Creating and managing Workspaces in the Claude Console](https://support.claude.com/en/articles/9796807-creating-and-managing-workspaces-in-the-claude-console)**. We also allow you to view spend per API key in the Console. Refer to this article for more information: **[Cost and Usage Reporting in the Claude Console](https://support.claude.com/en/articles/9534590-cost-and-usage-reporting-in-the-claude-console)**.

## Can Claude Code work through corporate proxies like LiteLLM?

Yes, Claude Code supports corporate proxy configurations as long as they support the Anthropic API spec. Follow the proxy setup instructions in our Claude Docs: **[Proxy configuration](https://docs.claude.com/en/docs/claude-code/network-config#proxy-configuration)**. Common issues arise from port restrictions in restricted environments.

## How do we add users to Claude Code when using a Console account?

Add users directly to your Console organization with a Claude Code User or Developer role - that's all that's needed. Users then run /login from within Claude Code and select the intended Console account. Do not try to manually create API keys in the Claude Code workspace.

## Is there team-based memory or knowledge sharing beyond Claude.md files?

Currently, Claude.md files are the primary mechanism. IT teams can inject standardized Claude.md files into every machine's .claude directory for org-wide configurations. More advanced team memory features are being explored but not yet available.

## How do permissions work in Claude Code, and why aren’t my allow lists being respected?

Permissions use pattern matching in .claude/settings.json or settings.local.json. Wildcard syntax can be tricky - "Bash(atlassian-api:*)" should work but may need exact command matching. Use "Yes, and don't ask again for similar commands" to build up permissions incrementally. Check both global (~/.claude/settings.json) and local settings files.

## Does Claude Code index my entire codebase or use a vector database to store information about my codebase?

No. Claude Code has access to a system prompt and a series of tools that it can use to navigate your codebase on command. For example, if Claude Code needs to understand something about your codebase, it will use a search tool to search through your codebase and read files on command. We find that this is more effective and flexible than full codebase indexing: Claude Code is *really* good at knowing how to sift through a codebase to gather context it needs on the fly!

## Can Claude Code integrate with CI/CD, version control, and observability platforms?

Yes, Claude Code integrates with GitHub Actions for CI/CD, supports git operations, and can connect to various platforms via MCP servers. See our Claude Docs for more information:

- **[Claude Code GitHub Actions](https://docs.claude.com/en/docs/claude-code/github-actions)**

- **[Claude Code GitLab CI/CD](https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd)**

## Why am I seeing "Workflow validation failed" errors in GitHub Actions?

This typically occurs with reusable workflows. Check that your workflow syntax is correct and that all required parameters are passed. If the error persists, file an issue here with your workflow configuration: **[github.com/anthropics/claude-code-action](http://github.com/anthropics/claude-code-action)**.
---

SOURCE: https://support.claude.com/en/articles/12618689-claude-code-on-the-web

# Claude Code on the web

Claude Code on the web runs Claude Code tasks remotely, working with code from your GitHub repositories. This article explains how it works, when to use it instead of running Claude Code in your terminal or IDE, and what workflows it enables.

## What Claude Code on the web provides

Claude Code on the web lets you delegate tasks to Claude that run without your active supervision. In your browser, you select a GitHub repository, describe what you want done, and Claude works on the task in a remote environment. Once Claude Code has started working on a task, you can leave the page completely; Claude will continue its work. When finished, Claude will automatically create a pull request with changes for you to review.

This feature works with repositories you may not have on your local machine. You can kick off tasks on any GitHub repository you have access to without needing to clone it locally or set up a development environment. This makes it useful for projects you contribute to occasionally or for exploring codebases you're still learning about.

Claude Code for web enables asynchronous development workflows. With Claude Code in your terminal or editor, you typically work synchronously: you make a request, wait for Claude to respond, review the changes, then make another request. Synchronous work like this gives you fine-grained control but requires your attention throughout the process. Claude Code on the web handles this differently: you can assign a larger task, let Claude work independently, and return later to review the completed work.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1786446157/07ec74cd46317f8278083a317841/6448f3ee-c6df-4417-8a13-90d8c2ca3d55?expires=1785363300&amp;signature=7711ea27657b40fed011b2d21100cd167b4e50cd1f39fc9e19db3413118643c9&amp;req=dScvEM16m4BaXvMW1HO4zR8%2BAFaDRJ517XrRA1YwWGsFlVyVIl5O87J1h42B%0AkMNNyrMkNNQZwP4qVDo%3D%0A)

You can also run multiple tasks in parallel. Since each task runs in its own isolated environment, you can have Claude working on several different issues or repositories simultaneously. Each task proceeds independently and creates its own pull request when complete. More than one task can work on the same repository at the same time.

## How It Works

When you start a task, Claude Code on the web creates an isolated virtual machine for your work. Your GitHub repository is cloned into this environment, which comes pre-configured with common development tools and language ecosystems.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1786446158/c092f1383826cb871493f74169d4/97b7cb98-5da2-438e-a920-e170b8b9790e?expires=1785363300&amp;signature=5496f02f5ad7e063a90bdc07dbff31ff2ea6b3fb32660579ec36702fdf3f6ae8&amp;req=dScvEM16m4BaUfMW1HO4zcR0rZM3ierD7DtpMiX%2FBYmkcM2%2B55VAOAVhZz82%0A%2B4m9fZwyoA5po5mpAL8%3D%0A)

Claude prepares the environment by running any setup commands you've defined in your repository's configuration. This includes installing dependencies, setting up databases, or running other initialization steps your project needs. If your task requires network access, maybe to install packages or fetch data, you can configure the level of internet access the environment has.

Once the environment is ready, Claude begins working on your task. Claude reads your code, makes changes, writes tests, and runs commands to verify the work. You can monitor progress and provide guidance through the web interface if needed.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1786446156/83ecf0a5b98eddc9ffc9694c50f7/353589ce-b678-441d-8909-71b45fa2d065?expires=1785363300&amp;signature=66b5c77f02d4cfa0afa897ccdb0102dd309c2f8e0089c01c7e53d6526cbe0e3c&amp;req=dScvEM16m4BaX%2FMW1HO4zVbcTGaA5cfNUQl3YqgIJdbX%2BVDskuB8%2BwOMX6mk%0AtNMHtB%2FRQrgJsv8JX48%3D%0A)

When Claude completes the task, it pushes the changes to a new branch in your GitHub repository. You receive a notification and can review the changes, then create a pull request directly from the interface. The pull request includes all of Claude's work, ready for your review and any additional changes you want to make.

Each task runs in complete isolation. The virtual machine exists only for that specific task and includes security controls like restricted network access and protected credential handling. Your GitHub authentication is managed through a secure proxy, so credentials never exist directly in the environment where Claude is working.

## When to use Claude Code on the web vs. terminal

Claude Code on the web is a new way of working with Claude Code. Some tasks are well-suited for asynchronous execution on the web, while others will continue to be best run with Claude Code via your terminal or IDE.

### Use Claude Code on the web for:

- **Well-defined tasks with clear requirements:** When you can describe exactly what needs to be done and don't expect to need to steer Claude mid-task, the web interface lets you start the work and return when it's complete.

- **Background work on bug backlogs:** You can assign Claude multiple issues from your backlog and let them run in parallel. Each task proceeds independently, allowing you to tackle several fixes at once without monitoring each one individually.

- **Repositories you don't have locally:** If you need to make changes to a repository you haven't cloned or don't want to set up on your machine, Claude Code on the web handles the environment setup for you.

- **Tasks you want to queue up:** When you have a list of changes to make but don't want to work on them right now, you can start tasks on the web and review the results later. This lets you batch similar work or delegate tasks during times when you're focused on something else.

### Use Claude Code in your terminal/IDE for:

- **Tasks needing frequent course correction:** When you're not sure exactly what the right approach is or expect you'll need to redirect Claude based on what you see, working in your terminal gives you immediate feedback. You can adjust direction as Claude works rather than waiting for a complete result.

- **Exploratory work with unclear requirements:** If you're figuring out how to solve a problem or investigating different approaches, the terminal lets you refine your request as you learn. The back-and-forth helps clarify requirements that weren't obvious at the start.

- **Local development with uncommitted changes:** When you're actively developing and have uncommitted work in your local repository, using Claude Code in your terminal keeps everything in one place. You can iterate quickly on changes without needing to commit or push work that isn't ready yet.

- **Tasks requiring immediate feedback:** If you need to see results quickly and want to iterate rapidly, the terminal provides lower latency. You can watch Claude work in real-time and stop or redirect if something goes wrong early in the process.

## Example Use Cases

### Backend Changes with Test-Driven Development

Let Claude write tests that define the expected behavior, then implement the code to make those tests pass. This works particularly well for backend changes where behavior can be validated through automated testing.

**Example prompt:**

```
Add rate limiting to the /api/search endpoint.

The rate limiter should:
- Allow 100 requests per minute per API key
- Return 429 status when limit exceeded
- Reset limits after 60 seconds
- Track different API keys independently

Use a TDD approach: write comprehensive tests first, then implement the rate limiting logic to pass them.
```

**When to use this approach:** This works well on the web because the tests give Claude clear validation criteria to work towards. You don't need to monitor Claude's progress since the tests will catch issues and guide iteration toward a working solution. The self-contained nature of the task, where Claude writes tests then makes them pass, doesn't require your input once started.

**What makes this effective:** Claude can iterate on the implementation without your supervision, using test failures to identify and fix problems. The task runs longer than a simple code change, but you can let it complete in the background. When you review the pull request, both the tests and implementation are ready, and you have confidence the solution works because the tests pass.

### Documentation Updates

Generate or update technical documentation such as README files, API documentation, code comments, or user guides.

**Example prompt:**

```
Update CHANGELOG.md with all changes since the v2.3.0 release:
  - Review commits on main branch since that tag.
  - Categorize changes into "Added, "Changed, "Fixed", and "Removed" sections.
  - Include the commit hash for each entry.
```

**When to use this approach:** Changelog updates are well-suited for the web because Claude can review commit history independently and format entries without guidance. The task is tedious to do manually but straightforward enough that Claude can complete it without questions about which commits to include or how to categorize them.

**What makes this effective:** You can delegate the entire changelog update and review the result when complete. Claude reads through commits, extracts meaningful changes, and follows your existing changelog format.

### Refactoring with Clear Scope

Restructure code to improve organization or readability when you can define clear boundaries for the change. This includes extracting code, splitting up large files, or organizing module structure.

**Example prompt:**

```
The UserService class in /src/services/user.go has 800 lines long.
Split it into three focused services:
  - UserAuthService (login/logout/sessions)
  - UserProfileService (profile CRUD operations)
  - UserPreferencesService (settings/preferences)

Ensure all tests still pass.
```

**When to use this approach:** Refactoring with clear constraints works well on the web because you can set clear boundaries for Claude to follow. Test suites can provide validation, allowing Claude to verify the refactor didn't break any existing functionality.

**What makes this effective:** The task takes time, but doesn't need your active input once the structure is defined. You can start the refactor and review the organized result later, rather than monitoring Claude as it works through the task. The clear scope means Claude is unlikely to need guidance mid-task.

## Tips for Effective Use

- Consider adding a test suite to your repository so Claude more easily verify that it has successfully completed a task

- Specify success criteria rather than vague goals like "improve" or "fix"

- Define what should change and what should stay the same in your prompt

- Scope tasks with clear boundaries so Claude doesn't need guidance mid-task

- If you're thinking "I'll need to see how this goes first," consider using your terminal instead

- Use "Open in CLI" if you realize mid-task that you need to provide guidance
---

SOURCE: https://support.claude.com/en/articles/14128775-claude-code-on-console-to-enterprise-migration

# Claude Code on Console to Enterprise migration

## Overview

This guide is built for teams migrating from Console-based Claude Code access to Claude Enterprise. Note that individual users don’t need to migrate session history for CLI sessions since these are stored locally. You only need to provision Claude Enterprise accounts for each user, and then users should switch their login method from Console to Claude Enterprise.

## Why migrate to Claude Enterprise

Claude Code on the Console API is a fast way to get developers started, but it leaves governance up to each individual machine. Claude Enterprise puts the same Claude Code your developers already use behind the controls that security, IT, and finance teams need to run it at scale. You get centralized identity and access through your existing IdP, server-managed settings that enforce tool, file, and MCP policies on every client without MDM, and granular spend caps that cascade from the org down to individual users.

Claude Enterprise adds rich analytics and audit logs (including contribution metrics like PRs and lines committed), custom data retention controls, and additional product surfaces—Claude Code on the web, mobile, and Slack (Claude Tag), plus Code Review—that aren't available on Console. And because Claude Enterprise is available via AWS Marketplace, procurement can run through the channel you already have.

---

## Claude Enterprise compared to Console

| **Capability**                           | **Claude Console/API**                                                                                                                                                 | **Claude Enterprise**                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Claude Code on the web and mobile app    | ❌                                                                                                                                                                      | ✅                                                                                                                                                                                                                                                                                                                                                            |
| Claude Tag                               | ❌                                                                                                                                                                      | ✅                                                                                                                                                                                                                                                                                                                                                            |
| Code Review                              | ❌                                                                                                                                                                      | ✅                                                                                                                                                                                                                                                                                                                                                            |
| Enforce which tools Claude Code can use  | ❌ No native UI<br>*\*Settings can be pushed to developer machines via MDM (Jamf, Intune) or config management (Ansible, Puppet, etc.)*                                 | ✅ Native UI to set managed-settings.json allow/deny rules                                                                                                                                                                                                                                                                                                    |
| Block specific bash commands             | ❌ No native UI\*                                                                                                                                                       | ✅ Bash(curl:\*), Bash(sudo:\*), etc.                                                                                                                                                                                                                                                                                                                         |
| Prevent access to sensitive files        | ❌ No native UI\*                                                                                                                                                       | ✅ Read(.env), Read(./secrets/\*\*)                                                                                                                                                                                                                                                                                                                           |
| Control which MCP servers are allowed    | ❌ No native UI\*                                                                                                                                                       | ✅ allowedMcpServers / deniedMcpServers                                                                                                                                                                                                                                                                                                                       |
| Deploy pre-approved MCP servers org-wide | ❌ No native UI\*                                                                                                                                                       | ✅ managed-mcp.json                                                                                                                                                                                                                                                                                                                                           |
| Force sandbox mode                       | ❌ No native UI\*                                                                                                                                                       | ✅ sandbox.enabled                                                                                                                                                                                                                                                                                                                                            |
| Disable --dangerously-skip-permissions   | ❌ No native UI\*                                                                                                                                                       | ✅ permissions.disableBypassPermissionsMode: disable                                                                                                                                                                                                                                                                                                          |
| Disable auto mode                        | ❌ No native UI\*                                                                                                                                                       | ✅ disableAutoMode: disable                                                                                                                                                                                                                                                                                                                                   |
| Custom roles (RBAC)                      | ❌                                                                                                                                                                      | ✅ Scope feature access by group and delegate specific admin areas like billing, user management, and identity without granting the Owner role. **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**                                                                        |
| Model governance                         | ❌ No native UI\*                                                                                                                                                       | ✅ Set an organization default model for chat and Cowork (beta) from the admin console, and restrict Claude Code model selection with `availableModels` in managed settings. **[Set a default model for your organization](https://support.claude.com/en/articles/15330088-set-a-default-model-for-your-organization)**                                       |
| Audit logs                               | ❌ No audit log support<br>🟡 Claude Code does have support for **[OpenTelemetry](https://code.claude.com/docs/en/monitoring-usage)**                                    | 🟡 Audit logs and the **[Compliance API](https://support.claude.com/en/articles/13015708-access-the-compliance-api)**, which includes audit log events. Transcripts of local CLI sessions stay on the developer's machine and aren't available via the Compliance API.                                                                                        |
| Usage analytics                          | ✅ Lines of code written, acceptance rate, daily active users, daily spend.<br>**[Docs](https://code.claude.com/docs/en/analytics#access-analytics-for-api-customers)** | ✅ Lines of code written, acceptance rate, daily active users, and month-to-date spend per member in **Organization settings** → **Usage.**<br>**[Docs](https://code.claude.com/docs/en/analytics#access-analytics-for-teams-and-enterprise)**                                                                                                                |
| Programmatic usage and cost reporting    | ✅ **[Claude Code Analytics API](https://platform.claude.com/docs/en/manage-claude/claude-code-analytics-api)**                                                         | ✅ The **[Claude Enterprise Analytics API](https://platform.claude.com/docs/en/manage-claude/analytics-api)** returns per-user engagement and Claude Code metrics (commits, pull requests, lines of code) plus usage and cost endpoints. The **[Admin API](https://platform.claude.com/docs/en/manage-claude/admin-api)** covers programmatic org management. |
| Contribution metrics                     | ✅ Via the Claude Code Analytics API                                                                                                                                    | ✅ PRs created and lines of code committed with Claude Code assistance.                                                                                                                                                                                                                                                                                       |
| Granular spend controls                  | ✅ Org and workspace limits, plus per-developer limits in Claude Code workspaces                                                                                        | ✅ Org → Group → Individual, integrated with RBAC groups                                                                                                                                                                                                                                                                                                      |

**Docs: [Roles and permissions](https://support.claude.com/en/articles/9267276-roles-and-permissions)**, **[Purchasing and managing seats on Enterprise plans](https://support.claude.com/en/articles/13393991-purchasing-and-managing-seats-on-enterprise-plans), [How am I billed for my Enterprise plan?](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan)**, **[Using Claude Code with your Enterprise plan](https://support.claude.com/en/articles/11845131-using-claude-code-with-your-team-or-enterprise-plan)**

---

## SCIM provisioning

Here’s what your identity team needs to do:

1. **Update IdP group mappings** — Create or repurpose IdP groups to map users to the Claude Enterprise organization. Enable group mappings to assign seats automatically.

2. **Ensure sufficient seats are purchased** — Before triggering a SCIM sync, verify the Claude Enterprise org has enough seats available. Users without available seats will be set to “Unassigned” status.

3. **Confirm Claude Code access is enabled** — Confirm Claude Code is enabled for the Enterprise organization in admin settings, and — if you scope features with custom roles or groups — that your developer groups are granted Claude Code access.

4. **Trigger a sync** — Navigate to **[Organization settings → Organization and access](https://claude.ai/admin-settings/organization)**, find **Directory sync (SCIM)**, and click “Sync.” Note that this may be slow as this can trigger a big sync.

5. **Verify seat assignments** — After sync, check **[Organization settings → Organization and access](https://claude.ai/admin-settings/organization)** to confirm users landed on the correct seat type.

6. **Optional: Adjust Console org mappings** — If some users should retain Console API access, keep their group mapped to the Console organization. Users can belong to both orgs simultaneously.

**Note:** Microsoft Entra SCIM changes sync every ~40 minutes. Use the “Sync” button to trigger on-demand after group changes.

If your Enterprise organization's SSO is configured as login-only, signing in does not create accounts — users must be invited manually. Enable JIT or SCIM provisioning before directing developers to log in. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning).**

---

## Spend limits

Claude Enterprise plans offer a hierarchical spend control system. Limits cascade—a user can never exceed the org limits.

| **Level**         | **Scope**             | **Who sets it**       | **What it controls**                             |
| ----------------- | --------------------- | --------------------- | ------------------------------------------------ |
| 1. Organization   | Entire Enterprise org | Primary Owner / Owner | Maximum monthly spend across all seats and usage |
| 2. Group controls | Groups with RBAC      | Primary Owner / Owner | Spend limit for a group using RBAC               |
| 3. Individual     | Specific user         | Primary Owner / Owner | Spend limit for a single team member             |

### How to set and edit spend limits

1. Sign in as an Owner or Primary Owner.

2. Navigate to **[Organization settings → Usage](https://claude.ai/admin-settings/usage)**.

3. Set the Organization level limit — this is the global ceiling for all monthly spend.

4. Set Group level limits — under the "By group" tab. See **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**.

5. Set Individual level limits — find specific users in the **Spending defaults** section under the “By member” tab.

Owners can set limits to "unlimited," but all consumption is still billed. If a user on a consumption seat hits their limit, they cannot use Claude or Claude Code until the next billing period or until an admin increases their limit.

**Docs: [Configuring spend limits](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan)**, **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**

---

## Issuing new seats and re-authentication

### Adding seats

1. Log in as Primary Owner or Owner.

2. Go to **[Organization settings → Billing](https://claude.ai/admin-settings/billing)**.

3. Click the pencil icon under Seats.

4. Enter the new seat counts.

5. Review and click “Upgrade” to confirm. New seats are prorated.

### Assigning users to seats

1. Go to **[Organization settings → Members](https://claude.ai/admin-settings/members)**.

2. Click “Add member” (or “Bulk add” for multiple).

3. Enter the user’s @ email address.

4. Set role (User, Admin, Owner) and send invite.

For SCIM-provisioned users, seat assignment happens automatically based on group mappings. Users default to the highest-available seat tier if no group mapping is configured.

### Re-authentication for Claude Code users

Developers currently authenticated against the Console org will need to re-authenticate against the Claude Enterprise organization:

1. Remove any leftover Console credentials before logging in. Check for `ANTHROPIC_API_KEY` or `ANTHROPIC_AUTH_TOKEN` environment variables in shell profiles, dotfiles, and CI configs, and remove any `apiKeyHelper` setting. Also check for `CLAUDE_CODE_OAUTH_TOKEN`, `ANTHROPIC_BASE_URL`, and the `CLAUDE_CODE_USE_BEDROCK / _VERTEX / _FOUNDRY` flags — these also override or bypass `/login`. Credentials can also hide in the env block of Claude Code's own settings files (~/.claude/settings.json, and the .claude/settings*.json files in repos). If these remain, they silently take precedence over the new login: `/login` will appear to succeed, but usage continues billing to the old Console organization.

2. In the terminal, run `claude` and then run `/login` to switch authentication method.

3. Select “Claude account with subscription” as the login method.

4. Choose the Claude Enterprise organization (not the Console org or a personal account).

5. Authorize, return to the terminal, and run `/status` to confirm Claude Code shows your Enterprise organization.

**CI and automation**

Pipelines and scripts don't use `/login`. Either keep a Console org (and its API keys) for automation and migrate only interactive developer seats, or switch CI to an Enterprise credential: run `claude setup-token` while signed in to the Enterprise organization and set the printed token as `CLAUDE_CODE_OAUTH_TOKEN` in your CI environment. Don't remove CI credentials until one of these is in place.

**Tip for IT:** Deploy managed settings with `forceLoginOrgUUID` set to your Enterprise organization UUID as a standard part of every migration. Deliver the pin as an endpoint-managed file or MDM policy — server-managed settings only arrive after a user signs in, so they can't catch a wrong first login. If you also use server-managed settings, set `forceLoginOrgUUID` there too: the two channels don't merge. This blocks login to any other organization, and it turns the leftover-credential failure mode above from silent misbilling into a loud one: Claude Code refuses to start and tells the user that a leftover credential (`ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or `apiKeyHelper`) must be removed.

**After validating the migration**

Remove migrated developers from the Console org (or rotate their keys). Removal revokes their Console login tokens and disables their Claude Code workspace key, stopping further Console billing from interactive use. API keys they created in other Console workspaces are not disabled by removal — review and disable those separately. Don't remove members until you've confirmed Enterprise access works; there is no automated rollback.

**Docs: [Purchasing and managing seats on Enterprise plans](https://support.claude.com/en/articles/13393991-purchasing-and-managing-seats-on-enterprise-plans)**

---

## Improvements in reporting

Moving from Console API to Claude Enterprise unlocks richer analytics for Claude Code usage:

| **Metric**                                          | **Console API**                                       | **Claude Enterprise**                                                                                                                                                                                                                           |
| --------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Token consumption                                   | ✅                                                     | ✅                                                                                                                                                                                                                                               |
| Lines of code accepted                              | ✅                                                     | ✅                                                                                                                                                                                                                                               |
| Suggestion acceptance rate                          | ✅                                                     | ✅                                                                                                                                                                                                                                               |
| PRs created with Claude Code assistance             | ✅ Via the Claude Code Analytics API                   | ✅                                                                                                                                                                                                                                               |
| Lines of code committed with Claude Code assistance | ✅ Via the Claude Code Analytics API                   | ✅                                                                                                                                                                                                                                               |
| Spend limit notifications                           | ✅ Notify-at-limit emails with configurable recipients | ✅<br>Threshold alerts                                                                                                                                                                                                                           |
| Month-to-date spend per member                      | ❌                                                     | ✅<br>Admin settings → Usage                                                                                                                                                                                                                     |
| Compliance audit trail                              | ❌                                                     | ✅ The **[Compliance API](https://support.claude.com/en/articles/13015708-access-the-compliance-api)** includes audit log events. Transcripts of local CLI sessions stay on the developer's machine and aren't available via the Compliance API. |

All reporting is accessible from **[Analytics](https://claude.ai/analytics/activity)** in the Claude admin panel. For programmatic access, the **[Claude Enterprise Analytics API](https://platform.claude.com/docs/en/manage-claude/analytics-api)** returns per-user engagement metrics, Claude Code activity (commits, pull requests, lines of code), and usage and cost data. Analytics do not migrate: the Enterprise organization starts with fresh reporting history, and its Analytics/Admin API requires a new API key created in the Enterprise organization — Console keys don't carry over. Export any Console analytics you need for historical dashboards before cutover. Traffic that remains on Console API keys (for example CI) continues to appear only in Console reporting.

**Docs: [Claude Code Usage Analytics](https://support.claude.com/en/articles/12157520-claude-code-usage-analytics)**

---

## Managed policy settings — deep dive

This is the most significant upgrade for the security and IT teams. **[Server-managed settings](https://code.claude.com/docs/en/server-managed-settings)** allow centralized, enforceable control over what Claude Code can and cannot do across every developer’s machine. There are two ways to deliver them, and you don't need MDM to use the first one.

### How it works

Claude Code reads configuration from a hierarchy of settings sources. The managed-settings.json file sits at the top and cannot be overridden by user or project settings:

| **Priority** | **Source**                                            | **Scope**                | **Who controls it**                                                                                                 |
| ------------ | ----------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| 1 (Highest)  | Managed settings (server-managed or endpoint-managed) | Enterprise-wide          | Owner / Primary Owner (when pushed from the claude.ai admin console) or your IT/MDM team (when deployed as a file). |
| 2            | Command-line arguments                                | Session                  | Developer                                                                                                           |
| 3            | .claude/settings.local.json                           | Project (personal)       | Developer                                                                                                           |
| 4            | .claude/settings.json                                 | Project (shared, in Git) | Team                                                                                                                |
| 5 (Lowest)   | ~/.claude/settings.json                               | User (global)            | Developer                                                                                                           |

### Two ways to deliver managed settings

**Server-managed settings (no MDM required):** An Owner or Primary Owner defines settings in **Organization settings** → **Claude Code** → **Managed settings** in the admin console. Every Claude Code client signed in to the organization fetches them automatically at startup and polls hourly for updates. This is the right choice for organizations without device management infrastructure or with users on unmanaged devices. Learn more about **[server-managed settings](https://code.claude.com/docs/en/server-managed-settings)**.

**Endpoint-managed settings:** IT deploys settings directly to devices, either through native OS policies (macOS managed preferences or the Windows registry, via Jamf, Intune, Group Policy, etc.) or as a managed-settings.json file pushed to the system paths below. Protect the file with OS-level permissions so end users cannot modify it. On enrolled devices, this provides stronger guarantees than server-managed delivery because the OS prevents user tampering.

**Note:** Both channels occupy the same highest-priority tier and use the same JSON format, but they don't merge. The first source that delivers a non-empty configuration wins: server-managed settings are checked first, and if they deliver any keys at all, endpoint-managed settings are ignored entirely. Run /status to see which managed source is active.

### File locations (endpoint-managed)

| **OS**  | **Path**                                                      |
| ------- | ------------------------------------------------------------- |
| macOS   | /Library/Application Support/ClaudeCode/managed-settings.json |
| Linux   | /etc/claude-code/managed-settings.json                        |
| Windows | C:\Program Files\ClaudeCode\managed-settings.json             |

### Key settings reference

These are the settings most relevant to a Console-to-Enterprise migration. Claude Code supports many more: for the complete, current list, see **[Claude Code settings](https://code.claude.com/docs/en/settings)**.

| **Setting**                                | **Purpose**                                                                                                                                                                                  | **Example**                    |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `permissions.deny`                         | Block specific tools/commands org-wide                                                                                                                                                       | Bash(curl:\*), Read(.env)      |
| `permissions.allow`                        | Explicitly allow trusted commands                                                                                                                                                            | Bash(npm run test:\*)          |
| `permissions.ask`                          | Require user approval each time                                                                                                                                                              | Bash(rm:\*)                    |
| `permissions.disableBypassPermissionsMode` | Prevent --dangerously-skip-permissions                                                                                                                                                       | "disable"                      |
| `forceLoginOrgUUID`                        | Restrict login to specific Enterprise org(s). Accepts one org UUID or an array; login to any other org is blocked. A single UUID also auto-selects that org at login.                        | "298e7cb2…"                    |
| `forceLoginMethod`                         | Force the login method (claudeai, console, or gateway). Recommended alongside `forceLoginOrgUUID` so users skip the account-type chooser, but not required for the org restriction to apply. | "claudeai"                     |
| `allowedMcpServers`                        | Allow only approved MCP servers, matched by name, command, or URL pattern                                                                                                                    | [{"serverName": "github"}]     |
| `deniedMcpServers`                         | Blacklist specific MCP servers                                                                                                                                                               | [{"serverName": "filesystem"}] |
| `allowManagedPermissionRulesOnly`          | Only permission rules from managed settings apply; users and projects can't add their own                                                                                                    | true                           |
| `allowManagedMcpServersOnly`               | Only the managed MCP allowlist applies; deny lists still merge from all sources                                                                                                              | true                           |
| `allowManagedHooksOnly`                    | Only managed and admin-approved hooks run                                                                                                                                                    | true                           |
| `enforceAvailableModels`                   | Extends the `availableModels` allowlist to the Default model option                                                                                                                          | true                           |
| `sandbox.enabled`                          | Force sandbox mode                                                                                                                                                                           | true                           |
| `sandbox.allowUnsandboxedCommands`         | Block unsandboxed execution                                                                                                                                                                  | false                          |
| `cleanupPeriodDays`                        | Retention period for local session data (transcripts and other application files). Default: 30 days                                                                                          | 7                              |
| `companyAnnouncements`                     | Display messages to all Claude Code users                                                                                                                                                    | Array of strings               |

**Deployment:** Use your MDM tool (Intune, Jamf, SCCM, Puppet, etc.) to push managed-settings.json to all developer machines. Protect the file with OS-level permissions so end users cannot modify it.

**Docs: [Claude Code settings](https://code.claude.com/docs/en/settings)**, **[Managed settings](https://code.claude.com/docs/en/permissions#managed-settings)**, **[MCP installation scopes](https://code.claude.com/docs/en/mcp#managed-mcp-configuration)**
---

SOURCE: https://support.claude.com/en/articles/14233555-set-up-code-review-for-claude-code

# Set up Code Review for Claude Code

Code Review analyzes your GitHub pull requests and posts findings as inline comments on the lines of code where it found issues. A fleet of specialized agents examine the code changes in the context of your full codebase, looking for logic errors, security vulnerabilities, broken edge cases, and regressions.

This article covers how to enable Code Review, configure review triggers, customize what gets flagged, and troubleshoot common setup issues.

**Note:** Code Review is in research preview and available on Team and Enterprise plans. It isn’t available for organizations with zero data retention enabled. Code Review usage is billed separately through usage credits and doesn’t count against your plan’s included usage.

---

## How Code Review works

Once an organization enables Code Review, it can trigger automatically when a pull request opens, on every push, or only when someone manually requests a review. When a review runs, multiple agents analyze the diff and surrounding code in parallel. Each agent looks for a different class of issue, then a verification step checks results against actual code behavior to filter out false positives.

Findings are deduplicated, ranked by severity, and posted as inline comments on the specific lines where issues were found. If no issues are found, Claude posts a short confirmation comment on the PR. Reviews don’t approve or block your PR, so existing review workflows stay intact.

Reviews scale in cost with PR size and complexity, completing in 20 minutes on average.

### Severity levels

Each finding is tagged with a severity level:

| **Marker** | **Severity** | **Meaning**                                                        |
| ---------- | ------------ | ------------------------------------------------------------------ |
| 🔴          | Normal       | A bug that should be fixed before merging                          |
| 🟡          | Nit          | A minor issue, worth fixing but not blocking                       |
| 🟣          | Pre-existing | A bug that exists in the codebase but wasn’t introduced by this PR |

Findings include a collapsible extended reasoning section you can expand to see why Claude flagged the issue and how it verified the problem.

### What Code Review checks

By default, Code Review focuses on correctness: bugs that would break production, not formatting preferences or missing test coverage. You can expand what it checks by adding guidance files to your repository.

---

## Set up Code Review

The steps below cover setup for repositories on github.com. If your repositories are on a self-hosted GitHub Enterprise Server (GHES) instance, see **[Claude Code with GitHub Enterprise Server](https://code.claude.com/docs/en/github-enterprise-server)** for the full setup guide.

Owners and Primary Owners of Team and Enterprise plans can enable Code Review once for the organization and select which repositories to include. In addition to an owner role within your Claude organization, you’ll need permission to install GitHub Apps in your GitHub organization.

1. Go to **[Organization settings > Claude Code](http://claude.ai/admin-settings/claude-code)** and find the **Code Review** section.

2. Click “Configure” to begin the GitHub App installation flow.

3. Follow the prompts to install the Claude GitHub App to your GitHub organization. The app requests read and write permissions for contents, issues, and pull requests.

4. Choose which repositories to enable for Code Review. If you don’t see a repository, confirm you gave the Claude GitHub App access to it during installation.

5. Set a review trigger for each repository using the **Review Behavior** dropdown (see the next section for details on each option).

To verify setup, open a test PR. If you chose an automatic trigger, a check run named **Claude Code Review** should appear within a few minutes. If you chose Manual, comment “@claude review” on the PR to start the first review.

---

## Choose a review trigger

After setup, the **Code Review** section shows your repositories in a table. For each repository, choose when reviews run:

- **Once after PR creation:** The review runs once when a PR is opened or marked ready for review.

- **After every push:** The review runs on every push to the PR branch, catching new issues as the PR evolves. Claude auto-resolves threads when you fix previously flagged issues. This runs the most reviews and costs the most.

- **Manual:** Reviews start only when someone comments “@claude review” on a PR. Useful for high-traffic repos where you want to select which PRs get reviewed.

The repositories table also shows the average cost per review for each repo based on recent activity.

---

## Manually trigger reviews

Comment “@claude review” on a pull request to start a review and opt that PR into push-triggered reviews going forward. This works regardless of the repository’s configured trigger.

For the comment to trigger a review:

- Post it as a top-level PR comment, not an inline comment on a diff line.

- Put “@claude review” at the start of the comment.

- You must have owner, member, or collaborator access to the repository.

- The PR must be open and not a draft.

If a review is already running, the request is queued until the in-progress review completes.

---

## Customize reviews

Code Review reads two files from your repository to guide what it flags. Both are additive on top of the default correctness checks.

### CLAUDE.md

Code Review reads your repository’s CLAUDE.md files and treats newly introduced violations as nit-level findings. If your PR changes code in a way that makes a CLAUDE.md statement outdated, Claude flags that the docs need updating too.

Claude reads CLAUDE.md files at every level of your directory hierarchy, so rules in a subdirectory’s CLAUDE.md apply only to files under that path.

### REVIEW.md

Add a REVIEW.md file to your repository root for review-specific rules. Use it to encode:

- Company or team style guidelines

- Language- or framework-specific conventions not covered by linters

- Things Claude should always flag (for example, “any new API route must have an integration test”)

- Things Claude should skip (for example, “don’t comment on generated code”)

Claude auto-discovers REVIEW.md at the repository root. No configuration is needed.

---

## Pricing and usage

Code Review is billed based on token usage. Each review averages $15–25 in cost, scaling with PR size, codebase complexity, and how many issues require verification.

Code Review usage is billed separately through usage credits and doesn’t count against your plan’s included usage. The review trigger you choose affects total cost:

- **Once after PR creation** runs once per PR.

- **After every push** runs on each push, multiplying cost by the number of pushes.

- **Manual** incurs no cost until someone comments “@claude review.” After that comment, additional pushes to the PR trigger reviews automatically.

Costs appear on your Anthropic bill regardless of whether your organization uses AWS Bedrock or Google Vertex AI for other Claude Code features.

To set a monthly spend cap, go to **[Organization settings > Usage](https://claude.ai/admin-settings/usage)** and configure the limit for the Claude Code Review service.

Monitor spend via the weekly cost chart in the analytics dashboard or the per-repo average cost column in admin settings.

### View usage

Go to the **[Code Review analytics dashboard](https://claude.ai/analytics/code-review)** to see activity across your organization. The dashboard shows:

- **PRs reviewed:** Daily count of pull requests reviewed over the selected time range.

- **Cost weekly:** Weekly spend on Code Review.

- **Feedback:** Count of review comments that were auto-resolved because someone addressed the issue.

- **Repository breakdown:** Per-repo counts of PRs reviewed and comments resolved.

---

## Troubleshooting

### Repositories don’t appear after installing the GitHub App

If you’ve installed the Claude GitHub App but your repositories don’t appear in the admin panel:

1. Confirm the Claude GitHub App has access to the repositories you expect. Go to your GitHub organization’s settings, find the Claude GitHub App under **Installed GitHub Apps**, and check whether it has access to all repositories or only selected ones.

2. If your organization uses GitHub Enterprise Cloud with Enterprise Managed Users (EMU), make sure the Claude GitHub OAuth App is authorized at the enterprise level. EMU enterprises can restrict which OAuth apps are approved, and the Claude app must be explicitly allowed.

3. Try disconnecting and reconnecting your GitHub account in Claude. Go to **[Customize > Connectors](https://claude.ai/customize/connectors)**, disconnect GitHub, and connect it again. Which repositories the App can access is managed on GitHub's side, covered in step 1.

4. If the issue persists, **[contact our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)** with your organization name and GitHub organization name so we can investigate.

### Code Review doesn’t start on a new PR

If no check run appears after opening a PR:

- Confirm the repository is listed and enabled in your admin settings.

- Check the review trigger setting. If it’s set to Manual, you’ll need to comment “@claude review” on the PR to start a review.

- Make sure the PR isn’t a draft. Code Review doesn’t run on draft PRs.

- Verify the Claude GitHub App still has access to the repository in your GitHub organization’s settings.

### GitHub Enterprise Cloud with IP restrictions

If your GitHub Enterprise Cloud organization restricts access by IP address, the Claude GitHub App may be unable to access your repositories. To fix this, **[enable IP allow list inheritance for installed GitHub Apps](https://docs.github.com/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/managing-allowed-ip-addresses-for-your-organization#allowing-access-by-github-apps)** in your GitHub enterprise settings. The Claude GitHub App registers its IP ranges, so enabling this setting allows access without manual configuration. To **[add the ranges to your allow list manually](https://docs.github.com/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/managing-allowed-ip-addresses-for-your-organization#adding-an-allowed-ip-address)** instead, or to configure other firewalls, see the **[Anthropic API IP addresses](https://platform.claude.com/docs/en/api/ip-addresses)**.

### GitHub Enterprise Server (self-hosted)

Self-hosted GitHub Enterprise Server (GHES) is supported through a separate setup flow. See **[Claude Code with GitHub Enterprise Server](https://code.claude.com/docs/en/github-enterprise-server)** for full instructions.

Common GHES setup issues:

- **"Public cannot be private" error during setup:** Your GHES hostname must resolve to a publicly routable IP address. Code Review reaches your server over the internet, so internal or private network addresses won't work. Update DNS or your network configuration so the hostname resolves to a public IP, then retry.

- **GitHub Enterprise Cloud with Data Residency is a different product.** Data Residency tenants (hostnames matching `*.ghe.com`) aren't supported by Code Review. Only self-hosted GitHub Enterprise Server and standard github.com repositories are supported.

---

## Frequently asked questions

### Is Code Review available as a capability when creating a custom role?

No, Code Review is not available to add to a **[custom role](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)** at this time.

---

## Related resources

- **[Plugins](https://code.claude.com/docs/en/discover-plugins)** — Browse the plugin marketplace, including a code-review plugin for running on-demand reviews locally before pushing.

- **[GitHub Actions](https://code.claude.com/docs/en/github-actions)** — Run Claude in your own GitHub Actions workflows for custom automation beyond Code Review.

- **[GitLab CI/CD](https://code.claude.com/docs/en/gitlab-ci-cd)** — Self-hosted Claude integration for GitLab pipelines.
---

SOURCE: https://support.claude.com/en/articles/14552382-your-first-day-in-claude-code

# Your first day in Claude Code

**Goal:** In about 15 minutes, you will install Claude Code, sign in, and complete your first AI-assisted change. This guide covers only what is needed on day one; links to deeper material appear at the end.

---

## Step 1: Install Claude Code (2 minutes)

Pick the command that matches your machine and paste it into a terminal.

| **Your setup**       | **Command**                                |
| -------------------- | ------------------------------------------ |
| macOS / Linux / WSL  | `curl -fsSL <https://claude.ai/install.sh> |
| Windows (PowerShell) | `irm <https://claude.ai/install.ps1>       |
| Homebrew             | `brew install --cask claude-code`          |
| npm (Node 18+)       | `npm install -g @anthropic-ai/claude-code` |

**Tip:** Do not run the npm install with `sudo`, as this causes file-permission problems later.

Verify the installation:

```
claude --version
```

---

## Step 2: Sign in (2 minutes)

How you authenticate depends on how your organization has provisioned access. Pick one of the following:

| **If your organization uses…** | **Do this**                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Claude Enterprise seats        | Run `claude`, then `/login` and approve the request in your browser (including SSO if prompted). This is the most common path. |
| An Anthropic Console API key   | Run `export ANTHROPIC_API_KEY=sk-ant-…`, then run `claude`.                                                                    |
| Amazon Bedrock                 | Run `export CLAUDE_CODE_USE_BEDROCK=1`, configure your AWS credentials, then run `claude`.                                     |
| Google Vertex AI               | Run `export CLAUDE_CODE_USE_VERTEX=1`, configure your GCP credentials, then run `claude`.                                      |

If you are unsure which method applies, check with your administrator or try `/login` first, which is the default for most organizations.

---

## Step 3: Open a project (1 minute)

```
cd path/to/your/project claude
```

Claude Code reads your files on demand, so there is nothing to upload or attach. Simply start it from inside the repository you want to work on.

---

## Step 4: Understand the one safety rule (1 minute)

Claude will **always ask before changing a file or running a command.** When it proposes a change, you will see a diff and three choices:

- **Yes** — apply this single change.

- **Yes, and don't ask again for edits** — auto-approve file edits for the remainder of the session.

- **No** — reject the change and explain why.

You can press **Shift+Tab** at any time to cycle between modes (Plan → Accept Edits → default). If a change produces an unexpected result, your git history remains untouched until you commit, so `git checkout` will undo it.

---

## Step 5: Five things to try first

Copy and paste these into the prompt one at a time. Each example demonstrates a different core capability.

### 1. Get oriented

```
Give me a 5-bullet summary of what this codebase does and where the entry point is.
```

*Why this is useful:* It shows how Claude explores files on its own, without being pointed at specific paths.

### 2. Find something

```
Where is user authentication handled? Show me the file and the key function.
```

*Why this is useful:* It is often faster than `grep` when you do not know the exact symbol or filename.

### 3. Make a safe edit

```
Add a docstring to the function <name> in <file>. Keep it to 2 lines.
```

*Why this is useful:* It lets you practice reviewing and approving a diff on a low-risk change.

### 4. Fix something real

```
This test is failing: <paste the error>. Find the cause and fix it.
```

*Why this is useful:* This is the primary workflow—you describe the symptom, and Claude investigates and proposes a fix.

### 5. Let it handle git

```
Stage my changes and write a commit message that follows our existing style.
```

*Why this is useful:* Claude can run `git` on your behalf (with approval) and will match your repository's existing commit conventions.

---

## Step 6: Before you finish for the day

Run this once per project:

```
/init
```

This generates a `CLAUDE.md` file at your project root that captures your codebase's conventions. Claude reads it automatically at the start of every session, so future responses will already be tailored to your project. It is the single highest-value setup step you can take.

---

## Next steps

You have now installed Claude Code, authenticated, made an edit, and set up project memory. When you are ready to go further, the official documentation covers **[memory and CLAUDE.md](https://code.claude.com/docs/en/memory)**, **[built-in commands](https://code.claude.com/docs/en/commands)**, and **[interactive-mode shortcuts](https://code.claude.com/docs/en/interactive-mode)** in depth.

If you ran into problems during install or login, see the **[troubleshooting guide](https://code.claude.com/docs/en/troubleshooting)**.
---

SOURCE: https://support.claude.com/en/articles/14552646-troubleshoot-claude-code-installation-and-authentication

# Troubleshoot Claude Code installation and authentication

These ten issues account for the large majority of installation and authentication support tickets related to Claude Code. Each entry includes the most reliable fix.

## 1. **claude: command not found** right after installing.

The installer added `claude` to your PATH, but your current shell has not picked it up yet. Open a new terminal, or run `source ~/.zshrc` (or `~/.bashrc`). On Windows, close and reopen PowerShell.

## 2. npm install fails with `EACCES` / permission denied.

This usually means the install was run with `sudo`, or your global npm directory is root-owned. Do not use sudo. Instead, use the native installer (`curl -fsSL https://claude.ai/install.sh | bash`), or fix npm's prefix with `npm config set prefix ~/.npm-global` and add that `bin` directory to your PATH.

## 3. "Node version not supported" or silent crash on launch.

Claude Code requires **Node 18 or later**. Check your version with `node -v`. If it is older, install a current version via `nvm install --lts`, or use the native installer, which bundles its own runtime and avoids this issue entirely.

## 4. WSL: **claude** runs the Windows Node instead of Linux Node.

Windows PATH leaks into WSL and overrides nvm. Prepend your Linux node to PATH in `~/.bashrc`: `export PATH="$HOME/.nvm/versions/node/$(nvm current)/bin:$PATH"`

## 5. Installer hangs or fails behind a corporate network.

The download host (`storage.googleapis.com`) is likely blocked. Set your proxy first with `export HTTPS_PROXY=http://proxy.example.com:port`, then re-run the installer. If that is not possible, ask your IT team for the offline package.

## 6. **SELF_SIGNED_CERT_IN_CHAIN** or other TLS errors.

Your company injects its own certificate. Point Node at the corporate CA bundle: `export NODE_EXTRA_CA_CERTS=/path/to/company-ca.pem` Add it to your shell profile so it persists.

## 7. **/login** opens a browser but the terminal never finishes ("Waiting for authentication…").

This usually means the localhost callback is blocked, which is common over remote SSH, in devcontainers, or behind a strict firewall. Use the manual flow instead: copy the URL printed in the terminal, complete login in any browser, then paste the returned code back into the terminal.

## 8. "Not authenticated" even though you set `ANTHROPIC_API_KEY`.

There are three common causes: the key was exported in a different shell (run `echo` `$ANTHROPIC_API_KEY` to check), Claude Code has not yet been told to trust this key (it prompts once on first use; until you approve, `ANTHROPIC_API_KEY` takes precedence over any OAuth session only after that approval), or the key is a Console key but your organization requires SSO login instead.

## 9. Bedrock / Vertex: "Could not load credentials."

Claude Code uses the standard provider SDKs, so the fix is the same as for any AWS/GCP CLI tool. For Bedrock, confirm `aws sts get-caller-identity` works and `AWS_REGION` is set to a region where your model is enabled. For Vertex, confirm `gcloud auth application-default login` has been run and that `ANTHROPIC_VERTEX_PROJECT_ID` and `CLOUD_ML_REGION` are set.

## 10. It installed and authenticated, but every request errors with 403 / "model not available."

Your account exists but does not have access to the model Claude Code is requesting. For Enterprise seats, confirm that your seat is active in your organization's admin settings. On Bedrock or Vertex, confirm that the specific Claude model is enabled in that region or project. As a quick workaround, run `/model` and select a model you know you have access to.

## Still stuck?

Run `claude doctor` from your normal shell (not from inside a Claude session). It prints a diagnostic report you can attach to a support ticket. For the full list of known issues, see the **[troubleshooting guide](https://code.claude.com/docs/en/troubleshooting)**.
---

SOURCE: https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code

# Models, usage, and limits in Claude Code

This guide explains which model you are using, how usage is metered, and how to keep long sessions within their context and usage limits.

---

## How usage is metered

How you signed in determines how usage is metered. Everything else about Claude Code behaves the same way regardless.

| **You signed in with…**                                  | **You get**                                                                      | **What "running out" looks like**                      |
| -------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Claude Enterprise seat (via `/login`)                    | A pool of usage included in your organization's plan, reset on a rolling window. | A "limit reached, resets at *time*" message.           |
| API key (Console, Bedrock, Vertex, or Microsoft Foundry) | Pay-as-you-go, billed per token to that cloud or Console account.                | No hard stop; the account is charged for what it uses. |

If you signed in with an Enterprise seat, you generally do not need to think about tokens until you reach a limit. If you are using an API key, the **`/cost`** command shows your running spend for the current session.

---

## Choosing a model

Run **`/model`** at any time to see which models are available to your account and to switch between them. As a rough guide:

- **Sonnet** is the default and is the right choice for the large majority of coding work. It is fast, capable, and cost-efficient.

- **Opus** offers deeper reasoning for harder problems such as large cross-cutting refactors, difficult debugging, or architectural decisions. It uses meaningfully more of your quota, so switch to it when you need it rather than leaving it on by default.

- **Haiku** is the fastest and cheapest option, well suited to quick lookups, simple edits, or high-volume scripted runs.

You can change models mid-session without losing your conversation. A common pattern is to plan with Opus and execute with Sonnet.

**Note:** Exact model names, versions, and availability change over time. The `/model` command is always the source of truth for your account.

---

## What actually consumes tokens

Every turn sends three things to the model:

1. **The conversation so far** — every previous message in this session.

2. **Project context** — your `CLAUDE.md` and any files Claude has read.

3. **Your new prompt.**

Of these, the first item grows the fastest. A long debugging session in which Claude has read twenty files and produced fifteen diffs is carrying all of that on every subsequent message. This is where both cost and context limits originate.

---

## Managing the context window

The **context window** is the maximum amount of text the model can consider at once. Claude Code shows a live indicator of how full it is. When it fills up, Claude can no longer see the oldest parts of the conversation clearly and quality drops.

Two commands keep it under control:

- **`/clear`** wipes the conversation and starts fresh. Your `CLAUDE.md` and project files remain available; only the chat history is removed. Use this whenever you switch tasks, as it is the single most effective lever for both quality and cost.

- **`/compact`** summarizes the conversation so far into a short recap, freeing up space while preserving the essential context. Use this when you are mid-task and need to keep going. Claude Code also auto-compacts when you get close to the limit, so you will rarely hit a hard wall.

**Rule of thumb:** use `/clear` when starting a new task, and `/compact` when continuing a long one.

---

## Five habits that stretch your usage furthest

Almost every "I burned through my limit by lunchtime" report traces back to one of these five.

### 1. Clear between tasks

Every previous message is resent on every turn, so a session that has wandered through three unrelated problems pays for all three on each new message.

**In practice:** you just finished debugging a login redirect and now want to write a database migration. Run `/clear` first. A simple test: if your next prompt would make perfect sense in a brand-new terminal, clear before sending it. Your `CLAUDE.md` and project files stay put; only the chat history goes.

**One warning:** `/clear` cannot be undone. If you might still need something from the history, copy it out first or run `/compact` instead, which preserves a summary rather than wiping everything.

### 2. Match the model to the job

Opus costs several times more per turn than Sonnet, and Sonnet more than Haiku. Spending Opus on routine work is the fastest way to drain a daily limit.

**Reasonable defaults:** Sonnet for most coding (features, tests, known bugs, refactors); Opus when you're genuinely stuck or the change is wide (hard debugging, cross-cutting refactors, architecture calls); Haiku for quick mechanical work (renames, log lines, regex explanations, boilerplate).

### 3. Point at files instead of pasting them

Anything you paste sits in context, in full, for the rest of the session. Referencing a file by path lets Claude read selectively and focus on the part you care about.

**In practice:** instead of pasting `auth.ts`, write look at the `validateToken` function in `src/auth.ts` — mentioning the path lets Claude open and read selectively. (Note that the @ prefix injects the entire file plus its `CLAUDE.md` tree into context, so use a bare path when you are trying to *save* tokens.) For logs and stack traces, trim to the relevant 20 or 30 lines before pasting. For anything large (lockfiles, build logs, data dumps), put it on disk and reference the path.

### 4. Keep **CLAUDE.md** lean

This file is prepended to *every* turn. Prompt caching means turns after the first are billed at the much cheaper cache-read rate, so the dollar cost is lower than the raw line count suggests, but it still occupies context-window space on every message.

**The rule: two strikes, keep it tight.** Only add a note the second time you have to correct Claude on the same thing (first-time issues are usually one-offs). Keep the file under roughly 200 lines; if something new needs to go in and there's no room, something old has to come out.

**When to update it:** right after a session where you had to correct Claude twice on the same thing. That's when the fix is fresh and takes a minute to write down. Every few weeks, read the whole file and delete anything that is no longer true or whose purpose you can't remember. Stale notes are worse than missing notes because they actively misdirect Claude.

### 5. Ask for a plan before big changes

A plan costs a few hundred tokens. A wrong 400-line diff that you revert and regenerate costs thousands, twice, plus the turns spent explaining what went wrong. **In practice:** for anything touching more than two or three files, switch to Plan Mode or just ask: "Before changing anything, list the files you'll touch and what you'll do in each." Read the list, correct it in plain English ("skip `legacy/`, and don't touch the tests yet"), then let it execute.

**Pro tip: plan with Opus, execute with Sonnet.** The highest-value use of Opus is writing the plan itself, where deeper reasoning actually pays off. Once a good plan exists, execution is mostly mechanical and Sonnet handles it at a fraction of the cost. This pattern is built in as `/model opusplan`, which uses Opus while planning and Sonnet for execution. Switching models doesn't clear the conversation, so Sonnet still sees everything Opus produced.

---

## What to do when you reach a limit

- **Enterprise seat users:** the message tells you when your window resets. In the meantime you can switch to a lighter model with `/model`, or, if your organization allows it, temporarily fall back to an API key.

- **API key users:** there is no usage cap, but check `/cost` and your Console or cloud-provider dashboard if spend is a concern. Unexpectedly high numbers almost always trace back to very long sessions that were never cleared.

- **Context window full** (which is different from a usage limit): run `/compact` to keep going, or `/clear` if the older history is no longer needed.

---

## Quick reference

| **Command** | **What it does**                                          |
| ----------- | --------------------------------------------------------- |
| `/model`    | See and switch available models.                          |
| `/cost`     | Show this session's token and dollar usage (API billing). |
| `/clear`    | Start a fresh conversation (project memory stays).        |
| `/compact`  | Summarize history to free up context.                     |
| `/context`  | Inspect what is currently loaded into context.            |
---

SOURCE: https://support.claude.com/en/articles/14553413-claude-code-cheatsheet

# Claude Code cheatsheet

This page collects the vocabulary, commands, and keyboard shortcuts that are worth committing to muscle memory. Keep it open in a browser tab (or printed beside your keyboard) during your first few weeks with Claude Code. Most of the friction new users hit comes from not knowing a command already exists for what they are trying to do, so a quick scan here before reaching for a workaround usually pays off.

---

## Glossary

| **Term**                         | **Definition**                                                                                                                                                                                                                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Session**                      | One run of `claude` in a directory, from launch to exit. Each session has its own conversation history, while project memory (`CLAUDE.md`) persists across sessions.                                                                                                              |
| **Context window**               | The total amount of text — your prompts, Claude's replies, and any files it has read — that the model can hold in mind at once. When it fills up, older content is compacted or dropped. It is managed with `/clear` and `/compact`.                                              |
| **Token**                        | The unit models use to measure text (roughly ¾ of a word). Usage limits and API billing are counted in tokens. You will mostly encounter this via `/cost` or the context indicator.                                                                                               |
| **CLAUDE.md**                    | A markdown file (project root, home directory, or subfolder) that Claude reads automatically at the start of every session. It holds your project's conventions, commands, and constraints so you do not have to repeat them.                                                     |
| **Plan mode**                    | A read-only mode in which Claude explores, explains, and proposes but will not edit files or run commands. Use it to review an approach before letting Claude execute. Toggle with **Shift+Tab** or enter directly with `/plan`.                                                  |
| **Accept Edits mode**            | A mode that auto-approves file edits for the rest of the session, while other actions such as shell commands still prompt for approval. It is useful once you trust the direction of the work and no longer want to confirm every diff. Toggle with **Shift+Tab**.                |
| **Permissions**                  | The rules governing which actions Claude can take without asking. By default it asks for everything that touches your machine. You can adjust these per project with `/permissions` or in settings.                                                                               |
| **Tool**                         | A capability Claude can invoke, such as reading a file, editing, running bash, or searching the web. Each tool call appears in the transcript so you can see exactly what happened.                                                                                               |
| **MCP (Model Context Protocol)** | An open standard for plugging external systems — such as GitHub, Jira, databases, or internal APIs — into Claude as tools. If your team has MCP servers configured, Claude can query and act on those systems directly.                                                           |
| **Subagent**                     | A secondary Claude instance that the main session can spawn to handle a focused subtask, such as running tests, searching a large codebase, or reviewing code, in its own context window before reporting back. Subagents are configured via `/agents`.                           |
| **Hook**                         | A shell command that runs automatically at a defined point in Claude's lifecycle, such as before a tool runs, after an edit, or on session start. Hooks are commonly used for auto-formatting, linting, or blocking unsafe commands.                                              |
| **Skill**                        | A packaged set of instructions and helper files that teaches Claude a specific workflow, such as generating a PDF report, scaffolding a component, or following a deploy runbook. Skills are invoked with / like built-in commands and can also load automatically when relevant. |
| **Command**                      | Any input starting with /. Built-in commands control the session (see the table below); custom ones are skills your team defines in `.claude/skills/<name>/SKILL.md` (the legacy `.claude/commands/` path still works).                                                           |

---

## Commands

Type `/` on an empty prompt to see every command available in your setup, including custom, plugin, and MCP-provided ones. The list below covers the built-in defaults (and the bundled skills that ship with every install) you will reach for most often while learning the tool. A few entries vary by platform and plan.

| **Command**          | **What it does**                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `/help`              | List all available commands.                                                                                   |
| `/init`              | Explore the codebase and generate a starter `CLAUDE.md`.                                                       |
| `/clear`             | Wipe conversation history and start fresh (project memory stays). Aliases: `/reset`, `/new`.                   |
| `/compact`           | Summarize the conversation so far to free up context. Accepts optional focus instructions.                     |
| `/btw`               | Ask a quick side question without adding it to the main conversation or consuming context.                     |
| `/rewind`            | Roll the conversation and/or your code back to an earlier checkpoint.                                          |
| `/model`             | View or switch the active model.                                                                               |
| `/cost`              | Show token usage and spend for this session.                                                                   |
| `/usage`             | Show your plan's usage limits and current rate-limit status.                                                   |
| `/context`           | Visualize what is currently loaded into the context window and where it is being spent.                        |
| `/memory`            | View or edit the `CLAUDE.md` files in scope.                                                                   |
| `/add-dir`           | Grant Claude file access to an additional directory for this session.                                          |
| `/permissions`       | View or change which tools require approval.                                                                   |
| `/config`            | Open configuration settings (theme, defaults, editor mode). Alias: `/settings`.                                |
| `/plan`              | Drop straight into Plan Mode, optionally with a task description.                                              |
| `/diff`              | Open an interactive viewer of uncommitted changes and per-turn diffs.                                          |
| `/copy`              | Copy the last response (or a selected code block) to your clipboard.                                           |
| `/export`            | Save the current conversation to a file or the clipboard.                                                      |
| `/mcp`               | Manage MCP server connections and authentication.                                                              |
| `/agents`            | List, create, or edit subagents.                                                                               |
| `/hooks`             | View hook configuration for tool events.                                                                       |
| `/skills`            | List the skills available in this session.                                                                     |
| `/simplify`          | Bundled skill: review your recently changed files for reuse, quality, and efficiency issues, then apply fixes. |
| `/status`            | Show account, model, working directory, and version.                                                           |
| `/doctor`            | Diagnose install and environment issues.                                                                       |
| `/feedback`          | Report an issue to Anthropic with session context attached. Alias: `/bug`.                                     |
| `/resume`            | Reopen a previous session and continue where you left off. Alias: `/continue`.                                 |
| `/login` / `/logout` | Authenticate, switch accounts, or sign out.                                                                    |
| `/exit`              | Quit the CLI. Alias: `/quit`.                                                                                  |

---

## Keyboard shortcuts

| **Key**         | **Action**                                                                                                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shift + Tab** | Cycle permission mode: `default → acceptEdits → plan`. Also includes auto after running `claude --enable-auto-mode`, and `bypassPermissions` when that mode is enabled. |
| **Esc**         | Interrupt Claude mid-response so you can type again.                                                                                                                    |
| **Esc, Esc**    | Open the rewind/checkpoint menu to roll back to an earlier point in the session.                                                                                        |
| **Ctrl + C**    | Cancel the current input, or exit on an empty prompt.                                                                                                                   |
| **Ctrl + R**    | Reverse search through your prompt history.                                                                                                                             |
| **Ctrl + O**    | Expand to the verbose, full transcript view.                                                                                                                            |
| **↑ / ↓**       | Scroll through your prompt history.                                                                                                                                     |
| **`@` + path**  | Reference a file or directory in your prompt.                                                                                                                           |
| **`/`**         | Open the command menu.                                                                                                                                                  |
| **`?`**         | Show shortcuts for your current terminal or IDE.                                                                                                                        |

Shortcuts vary slightly by terminal and IDE. Press **`?`** inside a session for the exact list in your environment.
---

SOURCE: https://support.claude.com/en/articles/14553517-claude-code-common-developer-use-cases

# Claude Code: Common developer use cases

Claude Code is a command-line agent that runs in your terminal, reads your repository, edits files, executes commands, and requests confirmation before performing potentially destructive actions. It is designed to assist at every stage of the software development lifecycle—from exploring an unfamiliar codebase to shipping and maintaining production code.

The table below summarizes where Claude Code fits across the development lifecycle. The remainder of this article walks through the ten tasks developers most frequently use it for, with a sample prompt and expected result for each.

| **1. Discover**              | **2. Design**       | **3. Build**            | **4. Deploy**          | **5. Support and scale**      |
| ---------------------------- | ------------------- | ----------------------- | ---------------------- | ----------------------------- |
| Explore codebase and history | Plan project        | Implement code          | Automate CI/CD         | Debug errors                  |
| Search documentation         | Develop tech specs  | Write and execute tests | Configure environments | Large-scale refactor          |
| Onboard and learn            | Define architecture | Create commits and PRs  | Manage deployments     | Monitor usage and performance |

## How to use this guide

Each use case below includes when to use it, an example prompt, and the expected result. No configuration is required for any of them except §9 (issue-tracker integration), which requires a one-time MCP connector setup.

Use cases are ordered roughly by how early most developers encounter them. Select the one that matches your current task.

---

## Use cases

### 1. Fix a failing test

**When to use this:** A test is failing and the cause is not immediately obvious. Use this to have Claude Code locate the root cause and propose a fix without you needing to identify the source file first.

**Example prompt:**

```
> the tests in tests/auth.test.ts are failing, can you figure out why and fix them
```

**Expected result:** Claude Code reads the test file, traces the code path through the modules under test, identifies the mismatch, and proposes an edit. After you approve the change, it re-runs the test suite to confirm the fix.

### 2. Understand unfamiliar code

**When to use this:** You need to understand how a module, function, or subsystem works before making changes—for example, when inheriting code or reviewing an unfamiliar area.

**Example prompt:**

```
> walk me through how the payment retry logic works
```

**Expected result:** Claude Code locates the relevant files, reads the implementation, and explains the control flow in plain language: entry points, decision branches, edge cases, and how the code connects to the rest of the system. Ask follow-up questions (e.g., “where does X get set”) to drill deeper.

## 3. Find where something happens

**When to use this:** You know a behavior exists in the codebase but cannot locate it via filename or simple text search.

**Example prompt:**

```
> where do we validate email addresses in this codebase? I want to add a new rule
```

**Expected result:** Claude Code searches the repository, opens candidate files, and returns file paths and line numbers with enough surrounding context to identify the correct match. If multiple locations exist, it indicates which one is the source of truth.

### 4. Triage an error or stack trace

**When to use this:** You have a runtime error, stack trace, or log output and need to map it back to the responsible code.

**Example prompt:**

```
<table class="prompt"> <colgroup> <col style="width: 100%" /> </colgroup>
<tbody> <tr class="odd"> <td>&gt; getting this in production:<br />
TypeError: Cannot read properties of undefined (reading 'sessionId')<br />
at validateSession (src/auth/session.ts:47)<br />     at middleware
(src/auth/middleware.ts:12)<br /> what's going on?</td> </tr> </tbody>
</table>
```

**Expected result:** Claude Code reads the files referenced in the trace, explains what is undefined and why, and proposes a fix. For errors without a clean stack trace, paste any available log output and Claude Code will reconstruct the failure from context.

### 5. Refactor with a plan

**When to use this:** A change spans multiple files and you want to review the full scope before any edits are made.

**Prerequisite:** Press **Shift+Tab** until the mode indicator shows “plan."

**Example prompt:**

```
> refactor the auth module to use the new session store instead of SessionCache
```

**Expected result:** Claude Code analyzes the code and produces a numbered plan listing every file it will modify and the change in each. You can approve the plan as-is or amend it (e.g., “don’t touch the logout route”). No files are edited until you approve.

**Reference:** **[Permissions](https://code.claude.com/docs/en/permissions)**

### 6. Write tests for existing code

**When to use this:** A source file lacks coverage, or you need additional edge-case tests that match your project’s existing test conventions.

**Example prompt:**

```
> add tests for @src/billing/invoice.ts — cover the edge cases around partial refunds. match the style of the existing tests in tests/billing/
```

**Expected result:** Claude Code reads both the source file and the reference test directory, generates a new test file in the existing style, and runs it to confirm the tests pass. If obvious coverage gaps remain, it flags them and asks whether to address them.

### 7. Review a pull request

**When to use this:** You need to review or summarize a PR, particularly in an area of the codebase you do not know well.

**Prerequisite:** GitHub CLI authenticated (run `gh auth login` once).

**Example prompt:**

```
> /pr https://github.com/example/api/pull/4471
> is the error handling solid?
```

**Expected result:** Claude Code fetches the diff, review comments, and CI status, then reads the changed files in their full repository context. It can produce a focused review, draft review comments, verify a specific concern, or summarize the PR.

### 8. Onboard to a new repository

**When to use this:** You are working in a repository for the first time and need a structured overview of its architecture, build commands, and conventions.

**Example prompt:**

```
<table class="prompt"> <colgroup> <col style="width: 100%" /> </colgroup>
<tbody> <tr class="odd"> <td>&gt; /init<br /> &gt; give me a tour of this
codebase — where's the entry point, how is it structured, what should I
read first</td> </tr> </tbody> </table>
```

**Expected result:** `/init` scans the project and writes a `CLAUDE.md` file summarizing build commands, architecture, and conventions. The follow-up tour prompt produces a guided walkthrough of the project structure. Project context remains loaded for the rest of the session.

**Reference:** **[Memory and CLAUDE.md](https://code.claude.com/docs/en/memory)**

### 9. Work an issue end to end

**When to use this:** You want to read a ticket, implement the fix, and validate it in a single conversation without switching tools.

**Prerequisite:** Issue tracker connected via MCP (one-time `.mcp.json` configuration).

**Example prompt:**

```
<table class="prompt"> <colgroup> <col style="width: 100%" /> </colgroup>
<tbody> <tr class="odd"> <td>&gt; what's the top-priority issue assigned
to me?<br /> &gt; go ahead and fix it</td> </tr> </tbody> </table>
```

**Expected result:** Claude Code queries the issue tracker, reads the ticket, locates the relevant code, proposes a fix, and runs the tests. The session ends with a reviewable diff and the context needed to close the ticket.

**Reference:** **[MCP](https://code.claude.com/docs/en/mcp)**

### 10. Turn a recurring task into a Skill

**When to use this:** You repeat the same multi-step prompt regularly (pre-commit checks, standup summaries, PR descriptions, release notes) and want to make it reusable for the whole team.

**Example prompt:**

```
> make me a /ship skill that runs the tests, runs the linter, looks at git diff, and drafts a conventional-commit message — then shows me the message without committing
```

**Expected result:** Claude Code writes a `SKILL.md` file to `.claude/skills/ship/`. The `/ship` command is available immediately, with no restart required, and is shared with anyone who clones the repository. (The legacy `.claude/commands/` path is still supported, but skills are the recommended form.)

**Reference:** **[Skills](https://code.claude.com/docs/en/skills)**

## Appendix: Quick reference

| **#** | **Use case**                 | **Sample prompt**                                               |
| ----- | ---------------------------- | --------------------------------------------------------------- |
| 1     | Fix a failing test           | `the tests in [file] are failing — figure out why and fix them` |
| 2     | Understand unfamiliar code   | `walk me through how [module] works`                            |
| 3     | Find where something happens | `where do we [action] in this codebase?`                        |
| 4     | Triage an error              | Paste the stack trace, then ask: `what’s going on?`             |
| 5     | Refactor with a plan         | Shift+Tab → plan mode → describe the refactor                   |
| 6     | Write tests                  | `add tests for @[file] — match the style in [dir]`              |
| 7     | Review a PR                  | `/pr [URL]` then ask your question                              |
| 8     | Onboard to a repo            | `/init` then “give me a tour”                                   |
| 9     | Work an issue end to end     | `what’s my top-priority issue?` → `go ahead and fix it`         |
| 10    | Create a skill               | `make me a /[name] skill that [steps]`                          |

## Appendix: Resource directory

| **Resource**           | **Link**                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Quickstart             | **[code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)**             |
| Common workflows       | **[code.claude.com/docs/en/common-workflows](https://code.claude.com/docs/en/common-workflows)** |
| Permissions            | **[code.claude.com/docs/en/permissions](https://code.claude.com/docs/en/permissions)**           |
| Memory and `CLAUDE.md` | **[code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory)**                     |
| MCP connectors         | **[code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp)**                           |
| Skills                 | **[code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)**                     |
| Built-in commands      | **[code.claude.com/docs/en/commands](https://code.claude.com/docs/en/commands)**                 |

For details on `/init`, @-references, permission modes, skills, MCP, and hooks, see **[code.claude.com/docs](https://code.claude.com/docs)**. Claude Code ships frequently—verify version-specific details against **[code.claude.com/docs](https://code.claude.com/docs)** before distributing internally.
---

SOURCE: https://support.claude.com/en/articles/14554000-claude-code-power-user-tips

# Claude Code power user tips

This article collects workflow tips from the Claude Code team at Anthropic. These practices cover parallel execution, planning, automation, verification, and customization—the patterns the team uses every day to ship code faster. Everyone’s setup is different, so experiment to see what works for you.

**Important:** The single most impactful tip in this guide is **verification**—giving Claude a way to check its own output. If you only adopt one practice, make it that one. See the **[Verification](#h_7dd53c5c29)** section below.

**Before you start: scope of this guide**

These are power-user patterns collected from individual engineers on the Claude Code team. As a result:

- Most commands shown here ship with Claude Code: /color and /btw are **built-in commands**, and /simplify and /loop are **bundled skills** that ship with the CLI. See the **[commands reference](https://code.claude.com/docs/en/commands)** and **[skills](https://code.claude.com/docs/en/skills)**. You can build your own skills by adding a SKILL.md file under .claude/skills/<name>/.

- The iMessage plugin ships in the official claude-plugins-official marketplace. Community plugins (for example the “ralph-wiggum” plugin) are not reviewed or sanctioned by Anthropic — check with your administrator before installing third-party plugins in a managed environment.

- Some capabilities—auto mode, sandboxing, remote control, scheduled cloud jobs, voice—are **off by default** and may be disabled by your organization's policy. If a command or flag here returns "not available," your admin has likely not enabled it for your workspace.

Everything else in this guide works on a stock Claude Code install. When in doubt, run `/help` to see what is actually available in your session.

## Contents

| **Section**                     | **Covers**                                               |
| ------------------------------- | -------------------------------------------------------- |
| Working in Parallel             | Worktrees, subagent isolation, `/batch`                  |
| Planning Before Building        | Plan mode, model choice, effort levels                   |
| Prompting Effectively           | Pushback prompts, `/btw`                                 |
| Learning With Claude            | Explanatory output, diagrams, spaced repetition          |
| CLAUDE.md and Memory            | `/init`, @claude in PRs, auto-memory, auto-dream         |
| Verification                    | Chrome extension, Desktop app, `/simplify`               |
| Commands, Skills, and Subagents | Custom commands, agent definitions, code-review agents   |
| Hooks                           | Lifecycle events and patterns                            |
| Permissions and Safety          | Pre-approvals, auto mode, sandboxing, long-running tasks |
| Scheduled and Recurring Tasks   | `/loop`, `/schedule`                                     |
| Mobile and Remote Control       | Mobile app, teleport, remote control, Dispatch           |
| Tool Integrations (MCP)         | Data analytics, bug fixing, plugins                      |
| Customizing Your Environment    | Terminal, status line, voice, output styles              |
| SDK and Multi-Repo Work         | `--bare`, `--add-dir`, forking, setup scripts            |

---

## Working in parallel

### Run multiple sessions at once

The biggest productivity unlock is running 3–5 Claude sessions in parallel, each in its own git worktree. Claude Code has native worktree support built in.

- From the CLI, run `claude --worktree` (or `claude --worktree my_worktree`) to start a session in an isolated worktree. Add `--tmux` to launch in its own Tmux session.

- From the Desktop app, open the Code tab and check the worktree checkbox.

- For non-git VCS (Mercurial, Perforce, SVN), define `WorktreeCreate` and `WorktreeRemove` hooks in your `settings.json` to get the same isolation.

To stay oriented across many sessions, name your worktrees, set up shell aliases (`za`, `zb`, `zc`) to jump between them, color-code your terminal tabs, and enable terminal notifications so you know when any Claude needs your attention. Many engineers keep a dedicated “analysis” worktree just for reading logs and running queries.

### Subagents with worktree isolation

Subagents can also run in isolated worktrees, which is especially powerful for large batched changes. Add `isolation: worktree` to your agent’s frontmatter:

```
# .claude/agents/worktree-worker.md
---
name: worktree-worker
model: haiku
isolation: worktree
---
```

Then prompt naturally: *“Migrate all sync IO to async. Batch the changes and launch 10 parallel agents with worktree isolation. Each agent should test its changes end to end, then put up a PR.”*

### /batch for large migrations

The `/batch` command interviews you about a migration, then fans the work out to as many worktree agents as needed — dozens, hundreds, or more. Each agent works in isolation, tests its own changes, and creates a PR independently.

```
> /batch migrate src/ from Solid to React
```

---

## Planning before building

### Start complex tasks in plan mode

Press **Shift+Tab** to cycle into plan mode. Pour your effort into the plan so Claude can one-shot the implementation. The typical flow is: enter plan mode → refine the plan → switch to auto-accept edits → Claude executes.

A few patterns from the team:

- Have one Claude write a plan, then spin up a second Claude to review it as a staff engineer.

- The moment something goes sideways, switch back to plan mode and re-plan rather than course-correcting mid-stream.

- After plan mode, Claude **automatically names your session** based on what you’re working on—you can also set a name upfront with `claude --name "auth-refactor"`.

### Use Opus with thinking for everything

Claude Code team’s reasoning: *“It’s the best coding model I’ve ever used, and even though it’s bigger & slower than Sonnet, since you have to steer it less and it’s better at tool use, it is almost always faster than using a smaller model in the end.”*

**The math:** less steering + better tool use = faster overall results, even with a larger model.

### Effort level

Run /effort to choose your effort level. The available levels are **low** (fewer tokens, faster), **medium**, **high** (more tokens, more intelligence), **xhigh**, **max**, and **auto** (Claude chooses per request). The default is **high** on Team, Enterprise, and direct API access, and **medium** on other plans. The Claude Code team uses high for everything. For complex coding and agentic work, switch to xhigh for deeper reasoning than high without the full token cost of max. Switch to max for hard debugging or architecture decisions where you want Claude to reason for as long as it needs. Max burns through usage limits faster, so activate it per session.

---

## Prompting effectively

Don’t accept the first solution—push Claude to do better. A few prompts that work well:

- **“Grill me on these changes and don’t make a PR until I pass your test.”** Forces Claude to validate your understanding before shipping.

- **“Prove to me this works.”** Have Claude diff behavior between `main` and your feature branch.

- **“Knowing everything you know now, scrap this and implement the elegant solution.”** Useful after a mediocre first attempt.

Write detailed specs to reduce ambiguity before handing work off. The more specific you are, the better the output.

### /btw for side questions

While Claude is actively working, use `/btw` to ask a quick question without interrupting it. It’s single-turn with no tool calls, but has full context of the conversation.

```
> /btw what does the retry logic do?
```

---

## Learning with Claude

Claude Code isn’t just for writing code—it’s a powerful learning tool when you configure it to explain and teach.

- **Enable “Explanatory” or “Learning” output style** in `/config` to have Claude explain the *why* behind changes.

- **Generate visual HTML presentations** explaining unfamiliar code.

- **Ask for ASCII diagrams** of new protocols and codebases.

- **Build a spaced-repetition skill:** explain your understanding, Claude asks follow-ups to fill gaps.

---

## CLAUDE.md and memory

### Invest in your CLAUDE.md

Share a single `CLAUDE.md` file at your repo root, checked into git, with the whole team contributing. The key practice: **anytime Claude does something incorrectly, add it to CLAUDE.md** so it knows not to repeat the mistake.

After every correction, end with: *“Update your CLAUDE.md so you don’t make that mistake again.”* Claude is very good at writing rules for itself.

### @claude in Code Reviews

Install the GitHub Action with `/install-github-app`, then tag `@claude` in PR comments to add learnings to `CLAUDE.md` as part of the review:

```
nit: use a string literal, not ts enum  @claude add to CLAUDE.md to never use enums, always prefer literal unions
```

This is “Compounding Engineering”—each correction makes every future session better.

### Auto-memory

Run `/memory` to configure Claude Code’s built-in memory system.

**Auto-memory** automatically saves preferences, corrections, and patterns between sessions. Memories are written to ~/.claude/projects/<project>/memory/ (one directory per git repo root). This is separate from your user-level ~/.claude/CLAUDE.md and project-level ./CLAUDE.md files, which you maintain by hand.

The naming maps to how REM sleep consolidates short-term memory into long-term storage.

### Advanced: Notes directory

One engineer on the team tells Claude to maintain a notes directory for every task and project, updated after every PR — then points `CLAUDE.md` at it.

---

## Verification — the #1 Tip

Giving Claude a way to verify its work will markedly improve the quality of the final result. If Claude can close the feedback loop on its own, it will iterate until the output is right.

Verification looks different per domain—bash commands, test suites, simulators, browser testing—but the principle is the same. Invest in domain-specific verification.

### The Chrome extension

For frontend work, install the Claude Code Chrome extension. Think of it like any other engineer: if you ask someone to build a website but don’t let them use a browser, will it look good? Probably not. With a browser, they’ll iterate until it does.

The team uses the Chrome extension every time they work on web code. Download it for Chrome or Edge at **[code.claude.com/docs/en/chrome](https://code.claude.com/docs/en/chrome)**.

### Desktop app for web servers

The Claude Desktop app bundles the ability to **automatically start and test web servers** in a built-in browser. You can set up something similar in CLI or VS Code using the Chrome extension, or just use the Desktop app directly.

### /simplify for Code Quality

Append `/simplify` to any prompt after making changes. It runs parallel agents that review changed code for reuse, quality, efficiency, and `CLAUDE.md` compliance—all in one pass.

```
> hey claude make this code change then run /simplify
```

---

## Commands, skills, and subagents

### Skills for repeated workflows

If you do something more than once a day, turn it into a skill. Skills are checked into `.claude/skills/<name>/SKILL.md` and shared with the team (the legacy `.claude/commands/` path still works, but skills are the recommended approach). A few ideas:

- A `/techdebt` command that runs at the end of every session to find duplicated code.

- A command that syncs 7 days of Slack, GDrive, Asana, and GitHub into one context dump.

- Analytics-engineer agents that write dbt models, review code, and test in dev.

Slash commands can include **inline Bash** to pre-compute info (like `git status`) without extra model calls.

### Subagents for PR workflows

Think of subagents as automations for your most common PR workflows. Drop `.md` files into `.claude/agents/`:

```
.claude/agents/   build-validator.md   code-architect.md   code-simplifier.md   verify-app.md
```

Each agent can have a custom name, color, tool set, allowed/disallowed tools, permission mode, and model. Set the **default agent for your main conversation** by adding `"agent"` to `settings.json` or using `claude --agent <name>`. Run `/agents` to get started.

### --agent for custom system prompts

Custom agents are a powerful primitive that often gets overlooked. Define a new agent in `.claude/agents`, then run `claude --agent=<name>`. Example of a read-only agent:

```
# .claude/agents/ReadOnly.md --- name: ReadOnly description: Read-only agent restricted to the Read tool only color: blue tools: Read ---  You are a read-only agent that cannot edit files or run bash.
```

### Leveraging subagents at runtime

- **Append “use subagents”** to any request where you want Claude to throw more compute at the problem.

- **Offload individual tasks to subagents** to keep your main agent’s context window clean and focused.

- **Route permission requests to Opus via a hook** — let it scan for attacks and auto-approve the safe ones.

### Code review agents

When a PR opens, Claude can dispatch a team of agents that each focus on a different concern — logic errors, security issues, performance regressions — and post inline comments. The Anthropic team built this for themselves first; code output per engineer increased significantly and reviews were the bottleneck.

---

## Hooks

Hooks let you deterministically run logic at points in the agent lifecycle. Ask Claude to add a hook to get started.

### Common hook patterns

| **Event**           | **Use case**                                                          |
| ------------------- | --------------------------------------------------------------------- |
| `SessionStart`      | Dynamically load context each time you start Claude                   |
| `PreToolUse`        | Log every bash command the model runs                                 |
| `PostToolUse`       | Auto-format code after Write/Edit to prevent CI failures              |
| `PermissionRequest` | Route permission prompts to Slack, WhatsApp, or Opus for review       |
| `Stop`              | Run deterministic checks on long tasks, or nudge Claude to keep going |
| `PostCompact`       | Re-inject critical instructions after context compression             |

Example `PostToolUse` hook for auto-formatting:

```
"PostToolUse": [
  {
    "matcher": "Write|Edit",
    "hooks": [{ "type": "command", "command": "bun run format || true" }]
  }
]
```

---

## Permissions and safety

### Pre-approve common commands

Run `/permissions` to pre-allow common safe commands and check them into your team’s `.claude/settings.json`. This is the **recommended alternative** to skipping permissions entirely — you get fewer prompts while keeping an auditable allowlist. **Full wildcard syntax is supported**—try `"Bash(bun run *)"` or `"Edit(/docs/**)"`.

Claude Code’s permission system layers prompt-injection detection, static analysis, sandboxing, and human oversight. A small set of safe commands is pre-approved out of the box; everything you add via `/permissions` is additive to that baseline.

### Auto mode

Auto mode lets Claude make permission decisions on your behalf. Classifiers evaluate each action before it runs — safe operations get auto-approved, risky ones still get flagged. Enable it with `claude --enable-auto-mode`; once enabled, **Shift+Tab** cycles `default → acceptEdits → plan → auto` during a session. Without that flag, the cycle is `default → acceptEdits → plan`.

### Sandboxing

Run `/sandbox` to opt into Claude Code’s open-source sandbox runtime. It runs on your machine and supports both **file and network isolation**, improving safety while reducing permission prompts. Three modes are available:

- Sandbox BashTool, with auto-allow

- Sandbox BashTool, with regular permissions

- No sandbox

### Long-running tasks

For very long-running tasks, ensure Claude can work uninterrupted. Recommended approaches:

- Prompt Claude to verify with a background agent when done.

- Use an agent `Stop` hook for deterministic checks (preferred for auditable workflows).

- Use the “ralph-wiggum” community plugin.

For sandboxed environments, use `--permission-mode=dontAsk` or `--dangerously-skip-permissions` to avoid blocks.

---

## Scheduled and recurring tasks

### /loop for local recurring tasks

`/loop` schedules a recurring task locally for up to 3 days at a time. A few examples the Claude Code team runs:

```
/loop 5m /babysit         # auto-address review, rebase, shepherd PRs /loop 30m /slack-feedback # auto put up PRs for Slack feedback /loop 1h /pr-pruner       # close out stale PRs
```

### /schedule for Cloud Jobs

Unlike `/loop`, scheduled jobs run in the **cloud** — they keep working even when your laptop is closed.

```
> /schedule a daily job that looks at all PRs shipped since   yesterday and updates our docs based on the changes. Use   the Slack MCP to message #docs-update with the changes
```

**Note:** Experiment with turning your most common workflows into a skill + a loop. It’s powerful.

---

## Mobile and remote control

### Work from your phone

Claude Code has a **mobile app**—download the Claude app for iOS/Android and tap the Code tab. An **iMessage plugin** is also available (`/plugin install imessage@claude-plugins-official`) to send tasks from any Apple device.

### Teleport sessions between devices

Move sessions back and forth between mobile, web, desktop, and terminal:

- `claude --teleport` (or `/teleport` from inside a session) continues a cloud session on your machine.

- `/remote-control` lets you control a local session from your phone or the web.

- `claude remote-control` lets you spawn a new local session from the mobile app. *Availability: Pro, Max, Team, and Enterprise plans on CLI v2.1.51+.*

You can also enable **“Enable Remote Control for all sessions”** in `/config`.

### Claude Cowork Dispatch

Dispatch is a secure remote control for the Claude Desktop app. It can use your MCPs, browser, and computer with your permission—useful for catching up on Slack and emails, managing files, and doing things on your laptop when you’re away from it.

---

## Tool integrations (MCP)

Connect Claude to your existing tools so it can search Slack, run BigQuery, grab Sentry logs, and more. Add MCP servers via claude mcp add or the "mcpServers" block in settings.json — see **[code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp)** for configuration.

### Data and analytics

Ask Claude to use the `bq` CLI to pull and analyze metrics on the fly—keep a BigQuery skill checked into your codebase. The Claude Code team's take: “Personally, I haven’t written a line of SQL in 6+ months.” This works for any database that has a CLI, MCP, or API.

### Bug fixing

Enable the Slack MCP, paste a bug thread into Claude, and just say **“fix”**—zero context switching. Or say **“go fix the failing CI tests”** without micromanaging how. Point Claude at **docker logs** to troubleshoot distributed systems—it’s surprisingly capable at this.

### Plugins

Plugins bundle LSPs (available for every major language), MCPs, skills, agents, and custom hooks. Install from the official Anthropic plugin marketplace, or stand up an internal marketplace for your organization—then check the marketplace reference into `settings.json` so it’s auto-added for every developer. Run `/plugin` to get started.

---

## Customizing your environment

### Terminal setup

Run `/config` to set light/dark mode and /terminal-setup to enable **Shift+Enter** for newlines in IDE terminals, Warp, or Alacritty (Apple Terminal is not supported by `/terminal-setup`). For Vim keybindings, open `/config` → Editor mode. The team recommends **Ghostty** for synchronized rendering and 24-bit color.

### Status line, color, and keybindings

- `/statusline` generates a custom status line based on your `.bashrc`/`.zshrc`—show model, directory, remaining context, cost, or anything else.

- `/color` changes the prompt input color—useful when you have 3–5 sessions open and need to tell them apart at a glance.

- `/keybindings` remaps any key. Settings live-reload and are stored in `~/.claude/keybindings.json`.

### Voice input

Voice mode is available to all users, including Claude Code Desktop and Cowork. Most of the Claude Code team's coding is done by speaking—you speak roughly 3× faster than you type, and your prompts get more detailed as a result.

- **CLI:** run `/voice` then hold the space bar

- **Desktop:** press the voice button (microphone icon)

- **iOS:** enable dictation in your system settings

- **macOS native:** hit fn×2 for system dictation in any terminal

### Web sessions

Beyond the terminal, run additional sessions on [claude.ai/code](https://claude.ai/code). Use the `&` command to background a session, or the `--teleport` flag to switch contexts between local and web.

### Output styles

Run `/config` and set an output style. **Explanatory** has Claude explain frameworks and patterns as it works (great for new codebases). **Learning** has Claude coach you through changes. You can also create **custom** styles to adjust Claude’s voice.

### Spinner verbs

It’s the little things that make Claude Code feel personal. Ask Claude to customize your spinner verbs to add to or replace the default list. Check the `settings.json` into source control to share verbs with your team.

### Customize everything

Claude Code is built to work great out of the box, but when you do customize, **check `settings.json` into git** so your team benefits too. Configuration is supported per-codebase, per-subfolder, per-user, or via enterprise-wide policies.

**By the numbers:** dozens of settings and environment variables—see the **[settings reference](https://code.claude.com/docs/en/settings)**. Use the `"env"` field in `settings.json` to avoid wrapper scripts.

---

## SDK and multi-repo work

### --bare for Faster SDK Startup

By default, `claude -p` (and the TypeScript/Python SDKs) searches for local `CLAUDE.md` files, settings, and MCPs. For non-interactive usage, you usually want to specify these explicitly via `--system-prompt`, `--mcp-config`, `--settings`, etc. Add `--bare` for roughly 10× faster startup:

```
claude -p "summarize this codebase" \
    --output-format=stream-json \
    --verbose \
    --bare
```

**Note:** This was a design oversight when the SDK was first built. In a future version, the default will flip to `--bare`. For now, opt in with the flag.

### --add-dir for multi-repo work

When working across repositories, use `--add-dir` (or `/add-dir`) to give Claude access and permissions to additional folders. Or add `"additionalDirectories"` to your team’s `settings.json` to always include them.

### Forking a session

To branch off an existing session, run `/branch` from inside it, or `claude --resume <session-id> --fork-session` from the CLI.

### Setup scripts for cloud environments

In Claude Code on web and desktop, add a **setup script** that runs before each new cloud session—install dependencies, configure settings, set environment variables. The script is skipped on resume.

---

## Appendix: Quick reference

| **Area**         | **Key commands**                                             |
| ---------------- | ------------------------------------------------------------ |
| Parallel work    | `claude --worktree`, `/batch`, `isolation: worktree`         |
| Planning         | Shift+Tab, `/effort max`, `claude --name`                    |
| Memory           | `CLAUDE.md`, `/memory`, `/dream`, `@claude` in PRs           |
| Verification     | Chrome extension, `/simplify`, Desktop app                   |
| Automation       | `.claude/skills/`, `.claude/agents/`, `--agent`              |
| Hooks            | `PostToolUse`, `Stop`, `PostCompact`, `PermissionRequest`    |
| Permissions      | `/permissions`, auto mode, `/sandbox`                        |
| Scheduling       | `/loop`, `/schedule`                                         |
| Remote           | `--teleport`, `/remote-control`, mobile app, iMessage        |
| Customization    | `/statusline`, `/color`, `/voice`, `/keybindings`, `/config` |
| SDK & multi-repo | `--bare`, `--add-dir`, `/branch`                             |

---

## Appendix: Related articles

| **Resource**                | **Link**                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| Hooks reference             | **[code.claude.com/docs/en/hooks](https://code.claude.com/docs/en/hooks)**                     |
| Subagents and custom agents | **[code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents)**           |
| Scheduled tasks             | **[code.claude.com/docs/en/scheduled-tasks](https://code.claude.com/docs/en/scheduled-tasks)** |
| Chrome extension            | **[code.claude.com/docs/en/chrome](https://code.claude.com/docs/en/chrome)**                   |

Claude Code ships frequently. Verify version-specific details against **[code.claude.com/docs](https://code.claude.com/docs)** before distributing internally.
---

SOURCE: https://support.claude.com/en/articles/14554922-claude-code-user-faq

# Claude Code user FAQ

Short answers to the questions that come up most at office hours, with a link to go deeper. Organized by where you are in your first few weeks.

## How to use this guide

Five sections follow the arc of a developer’s first weeks: getting started, day-to-day use, leveling up, common gotchas, privacy, and trust. Skim the section that matches where you are, or search for a specific question.

## 1. Getting started

| **Question**                                                    | **Answer**                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1.1 How do I install it?**                                    | **macOS/Linux:** `curl -fsSL <https://claude.ai/install.sh> | bash`
​**Windows PowerShell:** `irm <https://claude.ai/install.ps1> | iex`
​**Homebrew:** `brew install --cask claude-code`
​**WinGet:** `winget install Anthropic.ClaudeCode`
Then run `claude` from any repo.<br>
Reference: **[Quickstart](https://code.claude.com/docs/en/quickstart)**                                                     |
| **1.2 Installed, but “claude: command not found”**              | The native installer puts the binary at `~/.local/bin/claude` (Windows: `%USERPROFILE%\.local\bin`). Add that directory to your PATH, e.g. `export PATH="$PATH:$HOME/.local/bin"` in `~/.zshrc` or `~/.bashrc`, then restart your terminal.<br>
Reference: **[Troubleshooting: PATH](https://code.claude.com/docs/en/troubleshooting)**                                                                               |
| **1.3 Login opens a browser on the wrong machine / I’m on SSH** | Press `c` at the login prompt to copy the auth URL. Open it in a local browser, then paste the code back into the terminal.<br>
Reference: **[Troubleshooting: auth](https://code.claude.com/docs/en/troubleshooting)**                                                                                                                                                                                               |
| **1.4 Auth errors right after login, but I have access**        | **400 “organization disabled”:** a stray `ANTHROPIC_API_KEY` env var is overriding your login. Unset it, remove from your shell profile, restart. Run `/status` to confirm which auth is active.
​**403 Forbidden:** your admin hasn’t enabled Claude Code for your workspace yet, or a corporate proxy is interfering.<br>
Reference: **[Troubleshooting: auth](https://code.claude.com/docs/en/troubleshooting)** |
| **1.5 Is Claude Code included in my plan?**                     | Yes. It’s included with Team and Enterprise seats and with Console (API) access. Log in with your work account; SSO is handled automatically. A 403 after login usually means your admin still needs to enable it for the workspace.<br>
Reference: **[Authentication](https://code.claude.com/docs/en/authentication)**                                                                                              |
| **1.6 Claude Code vs. desktop app vs. claude.ai?**              | **Claude Code:** terminal agent that reads your repo, edits files, runs commands.
​**Desktop / claude.ai:** chat interfaces for conversations and one-off questions.
Same model family underneath, different shape of tool.<br>
Reference: **[Overview](https://code.claude.com/docs/en/overview)**                                                                                                               |
| **1.7 Does it work in my IDE?**                                 | Yes. Extensions are available for VS Code and JetBrains IDEs (IntelliJ, PyCharm, etc.). Same features, embedded in the editor instead of a separate terminal.<br>
Reference: **[VS Code](https://code.claude.com/docs/en/vs-code)** · **[JetBrains](https://code.claude.com/docs/en/jetbrains)**                                                                                                                      |
| **1.8 How is this different from Copilot/Cursor autocomplete?** | Autocomplete suggests the next few lines. Claude Code is an agent: give it a task (“fix the failing tests”) and it reads files, runs commands, and makes multi-file edits until done. Less “finish my sentence,” more “here’s a problem, go work it.”<br>
Reference: **[Overview](https://code.claude.com/docs/en/overview)**                                                                                         |
| **1.9 What should I try first?**                                | Point it at a tedious-but-not-hard bug you’ve been putting off. Example: *“the test in [file] is flaky, figure out why.”* Let it read the code instead of you explaining the code.<br>
Reference: **[Common use cases](https://code.claude.com/docs/en/common-workflows)**                                                                                                                                            |
| **1.10 How do I update it?**                                    | Native installs auto-update in the background. To force one now, run `claude update`.
Homebrew/WinGet don’t auto-update: run `brew upgrade claude-code` or `winget upgrade Anthropic.ClaudeCode` periodically.<br>
Reference: **[Setup: updates](https://code.claude.com/docs/en/setup)**                                                                                                                           |

---

## 2. Day-to-day use

| **Question**                                             | **Answer**                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2.1 It keeps asking permission for the same commands** | Approvals last for the current session by default. To make them persist:
• Pick “always allow” at the prompt
• Add the pattern to `permissions.allow` in `.claude/settings.json`
• Or run `/permissions` to manage interactively<br>
Reference: **[Permissions](https://code.claude.com/docs/en/permissions)**                                                                                                                                                                |
| **2.2 Permission modes and how to switch**               | Press **Shift+Tab** to cycle modes:<br>     **default** · asks before risky edits or commands<br>**acceptEdits** · file edits go through; still asks before running commands<br>**plan** · read-only; proposes a plan and waits for approval<br>**auto** · auto-approves with a background safety check. Requires your org to enable it *and* you to opt in with claude --enable-auto-mode.<br>
Reference: **[Permission modes](https://code.claude.com/docs/en/permission-modes)** |
| **2.3 What is /init and when do I run it?**              | Run it once, early, in any repo you’ll work in more than once. It scans the project and writes `CLAUDE.md` with build commands, architecture, and conventions. Every future session loads it automatically, so Claude starts with context.<br>
Reference: **[Memory and CLAUDE.md](https://code.claude.com/docs/en/memory)**                                                                                                                                                        |
| **2.4 What goes in CLAUDE.md?**                          | Things tooling can’t enforce that a new teammate would get wrong on day one: “deploy from `release`, not `main`”, “all IDs are strings”, “never call the DB directly from a route handler.” Keep it under two screens; longer gets skimmed.<br>
Reference: **[Memory and CLAUDE.md](https://code.claude.com/docs/en/memory)**                                                                                                                                                       |
| **2.5 Claude isn’t following my CLAUDE.md**              | • Too long or too vague: trim to the rules that actually matter
• Buried in prose: put hard rules near the top, use imperative language (“Never X. Always Y.”)<br>
Reference: **[Best practices](https://code.claude.com/docs/en/best-practices)**                                                                                                                                                                                                                                |
| **2.6 Point it at a specific file without pasting it**   | Type `@` then the path (tab-completes). The mentioned file is read before Claude responds.<br>
Reference: **[Common workflows](https://code.claude.com/docs/en/common-workflows)**                                                                                                                                                                                                                                                                                                  |
| **2.7 Paste a screenshot into the prompt**               | Drag the image into the terminal, or press **Ctrl+V**. On Mac that’s Ctrl, not Cmd (Cmd+V pastes text). Works for error dialogs, UI mockups, whiteboard photos.<br>
Reference: **[Working with images](https://code.claude.com/docs/en/common-workflows#work-with-images)**                                                                                                                                                                                                         |
| **2.8 Copy Claude’s response out of the terminal**       | `/copy` puts the last response on your clipboard. `/export` writes the whole conversation to a file.                                                                                                                                                                                                                                                                                                                                                                                  |
| **2.9 Get a previous session back**                      | `claude --continue` resumes the most recent one. `claude --resume` opens a list to pick from. Sessions are stored locally per project directory.<br>
Reference: **[Common workflows: resume](https://code.claude.com/docs/en/common-workflows#resume-previous-conversations)**                                                                                                                                                                                                      |
| **2.10 Switch models**                                   | `/model` opens the picker. Set a default in `.claude/settings.json` if you want the same model every session.<br>
Reference: **[Model configuration](https://code.claude.com/docs/en/model-config)**                                                                                                                                                                                                                                                                                |
| **2.11 Extended thinking**                               | On by default. The reasoning itself is hidden in the normal view; press **Ctrl+O** to switch to the verbose transcript if you want to read it. Use `/effort` to dial depth up or down. Worth the extra latency for tricky debugging or architecture calls.<br>
Reference: **[Extended thinking](https://code.claude.com/docs/en/common-workflows#use-extended-thinking-thinking-mode)**                                                                                             |
| **2.12 Stop it mid-task**                                | Press **Ctrl+C** to cancel the current generation, then tell it what to do instead. No need to start the conversation over.                                                                                                                                                                                                                                                                                                                                                           |

---

## 3. Leveling up

| **Question**                                 | **Answer**                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **3.1 What is MCP?**                         | MCP connects Claude Code to your external tools: GitHub, Linear, Slack, your database, your observability stack. One `.mcp.json` config and Claude can read your issues, query your data, and work the same tools you do. Common first connector: your issue tracker.<br>
Reference: **[MCP](https://code.claude.com/docs/en/mcp)**                                                        |
| **3.2 Wire up your first MCP server**        | • Add a `.mcp.json` at the project root, or use `claude mcp add`
• Each entry names a server package plus any env vars (usually an auth token)
• Restart Claude Code and run `/mcp` to confirm it’s connected<br>
Reference: **[MCP setup](https://code.claude.com/docs/en/mcp)**                                                                                                      |
| **3.3 What are hooks for?**                  | Shell scripts that fire on events (before a tool runs, after a file edit, when Claude is waiting on you). Common first hook: a **Notification** hook that pings your desktop when Claude needs input. Same mechanism can run your linter after every edit, post to Slack, or block edits to protected paths.<br>
Reference: **[Hooks guide](https://code.claude.com/docs/en/hooks-guide)** |
| **3.4 Make a reusable prompt / skill**       | Create `.claude/skills/ship/SKILL.md` and the folder name becomes the command: `/ship`. Plain English, no special syntax. Easiest path: ask Claude to write it for you. (The legacy `.claude/commands/ship.md` path still works.)<br>
Reference: **[Skills](https://code.claude.com/docs/en/skills)**                                                                                      |
| **3.5 Skills vs. legacy commands**           | Same mechanism; commands have been merged into skills. `.claude/commands/foo.md` and `.claude/skills/foo/SKILL.md` both create `/foo`. The skill form is preferred and gives you a folder for supporting files (reference docs, templates, helper scripts).<br>
Reference: **[Skills](https://code.claude.com/docs/en/skills)**                                                            |
| **3.6 What are subagents good for?**         | Parallel work: search different parts of the codebase, review a diff along separate dimensions, or generate competing implementations at the same time. The main session aggregates the results.<br>
Reference: **[Subagents](https://code.claude.com/docs/en/sub-agents)**                                                                                                                |
| **3.7 Run non-interactively (CI / scripts)** | `claude -p "your prompt"` runs once and prints the result. Good for CI hooks, pre-commit checks, or piping into other tools. Auth via your logged-in session or `ANTHROPIC_API_KEY`.<br>
Reference: **[Unix-style usage](https://code.claude.com/docs/en/common-workflows)**                                                                                                               |
| **3.8 Undo what it did**                     | `/rewind` rolls back to an earlier checkpoint. Checkpoints are taken automatically at every prompt you send. For anything already committed, use a normal `git revert`.<br>
Reference: **[Checkpointing](https://code.claude.com/docs/en/checkpointing)**                                                                                                                                  |
| **3.9 Share your setup with the team**       | Check `.claude/` into the repo (CLAUDE.md, commands, MCP config). Anyone who clones the repo gets the same setup automatically. Skills can also be packaged as a **plugin** that teams install via `/plugin`.<br>
Reference: **[Plugins](https://code.claude.com/docs/en/plugins)**                                                                                                        |

---

## 4. Common gotchas

| **Question**                                             | **Answer**                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **4.1 Can’t find files / search returns nothing**        | Claude Code ships with a bundled copy of ripgrep, so you do not need to install it. The bundled binary can fail on Alpine/musl systems; in that case install a system copy (`apk add ripgrep`) and set `USE_BUILTIN_RIPGREP=0` so Claude uses it instead.<br>
Reference: **[Troubleshooting: search](https://code.claude.com/docs/en/troubleshooting#search-and-discovery-issues)** |
| **4.2 Copy/paste and scroll broken over SSH or in tmux** | The terminal UI captures mouse events. Hold Shift while selecting to bypass it, or configure tmux to pass mouse events through. `/copy` and `/export` sidestep the issue entirely.                                                                                                                                                                                                    |
| **4.3 Slow on WSL**                                      | Reading Windows files through `/mnt/c/` is a known penalty. Move the repo into the WSL filesystem (`~/` instead of `/mnt/c/...`). The speed difference is dramatic.<br>
Reference: **[Troubleshooting: WSL](https://code.claude.com/docs/en/troubleshooting)**                                                                                                                      |
| **4.4 Image paste isn’t working on Mac**                 | Use **Ctrl+V**, not Cmd+V. Cmd+V pastes text; Ctrl+V is the image-from-clipboard path.                                                                                                                                                                                                                                                                                                |
| **4.5 Wildcard permission rule doesn’t match**           | Build rules incrementally: approve commands interactively first, check what got written to settings, then generalize.<br>
Reference: **[Permissions patterns](https://code.claude.com/docs/en/permissions)**                                                                                                                                                                        |
| **4.6 Non-interactive -p mode behaves differently**      | MCP servers that need OAuth can’t prompt in non-interactive mode<br>Interactive approvals don’t carry over<br>For non-interactive/CI runs, prefer API-key auth and MCP servers configured with env-var tokens.                                                                                                                                                                        |
| **4.7 Ran out of context mid-task**                      | `/compact` summarizes earlier conversation to free up space. `/clear` starts fresh while keeping `CLAUDE.md` and settings loaded. For long tasks, break into steps with a `/clear` between phases.<br>
Reference: **[Managing context](https://code.claude.com/docs/en/common-workflows)**                                                                                          |

---

## 5. Privacy and trust

| **Question**                                                          | **Answer**                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **5.1 Does Anthropic train on my code?**                              | No. Under your organization’s Team/Enterprise terms, your code and conversations are not used to train models.<br>
Reference: **[Data usage](https://code.claude.com/docs/en/data-usage)**                                                                                                                                            |
| **5.2 Where does my code actually go?**                               | Claude Code runs on your machine. Source files are read locally, and only the portions needed for the current task are sent to the API to generate a response. Nothing is indexed, uploaded as a whole repo, or used for training.<br>
Reference: **[Data usage](https://code.claude.com/docs/en/data-usage)**                        |
| **5.3 Can anyone else see my conversations?**                         | No. Sessions are stored locally on your machine, per project directory, and are not shared with teammates or visible in any dashboard. Use `/export` if you *want* to share a conversation.<br>
Reference: **[Data usage](https://code.claude.com/docs/en/data-usage)**                                                               |
| **5.4 How do I keep secrets and .env files out of the conversation?** | Claude only reads files it needs for the task; it doesn’t scan your whole repo. To hard-block specific files, add a Read deny rule in `.claude/settings.json` (e.g. `"Read(.env*)"`). Denied files can’t be read even if you accidentally ask for them.<br>
Reference: **[Permissions](https://code.claude.com/docs/en/permissions)** |
| **5.5 What can “acceptEdits” mode do without asking me?**             | File edits go through without a prompt. It still asks before running shell commands, making network calls, or touching anything outside your working directory. For tighter control, stay in default mode.<br>
Reference: **[Permissions](https://code.claude.com/docs/en/permissions)**                                              |

---

## Appendix: Still stuck?

| **Resource**                                  | **What it’s for**                                         |
| --------------------------------------------- | --------------------------------------------------------- |
| `/help`                                       | Built-in command listing what’s available in your session |
| `/feedback`                                   | File an issue from the terminal (alias for `/bug`)        |
| **[Full docs](https://code.claude.com/docs)** | Everything here, in detail                                |
| Your team’s `#claude-code` channel            | Small wins and weird errors both belong there             |

---

## Appendix: Resource directory

| **Page**             | **Link**                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| Quickstart           | **[code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)**           |
| Troubleshooting      | **[code.claude.com/docs/en/troubleshooting](https://code.claude.com/docs/en/troubleshooting)** |
| Permissions          | **[code.claude.com/docs/en/permissions](https://code.claude.com/docs/en/permissions)**         |
| Memory and CLAUDE.md | **[code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory)**                   |
| MCP                  | **[code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp)**                         |
| Data usage           | **[code.claude.com/docs/en/data-usage](https://code.claude.com/docs/en/data-usage)**           |

Claude Code ships frequently. Verify version-specific details against **[code.claude.com/docs](https://code.claude.com/docs)** before distributing internally.
---

SOURCE: https://support.claude.com/en/articles/14555399-claude-code-champion-kit

# Claude Code champion kit

Adoption of a new developer tool rarely happens just because of a rollout announcement. It happens because someone on the team begins using the tool well, talks about it openly, and makes it easy for others to follow. This kit is designed to support that effort without turning it into a second job. It gives shape to things you are likely already doing and provides material you can hand directly to colleagues.

The work you do as a champion has a disproportionate effect. Every example you share shortens the learning curve for the engineers who come after you, and every question you answer in public turns one person’s experience into something the whole team can build on. You are acting as a multiplier for your team, not as a help desk, and this guide is structured to keep the role sustainable on those terms.

## How to use this guide

The champion role consists of three behaviors that reinforce one another: sharing what you discover, being the person people ask, and growing the circle of active users. The sections below cover each in turn, followed by a thirty-day playbook, guidance for responding to common concerns, and a quick-reference sheet you can hand to anyone.

Use whatever fits your team and set aside whatever does not. Nothing here is a checklist you are expected to complete; it is a set of patterns that have worked across many engineering organizations.

---

## Phase 1: The champion role

### What a champion does

| **Behavior**             | **What it looks like in practice**                                                                                                                                                       | **Why it matters**                                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Share what you discover  | Post the prompts, screenshots, and small wins from your own work in the places your team already reads, such as an engineering channel, a standup thread, or a pull-request description. | Examples drawn from your own codebase are more persuasive than any external documentation, because colleagues can see exactly how the tool applies to the problems they share with you. |
| Be the person people ask | When a colleague asks how you accomplished something, respond with the actual prompt you used so they can apply it directly to their own task.                                           | A concrete, runnable example removes the gap between curiosity and a first successful use, which is where most adoption efforts stall.                                                  |
| Grow the circle          | Establish a small number of lightweight, recurring habits—such as a dedicated channel or a weekly thread—so that momentum continues even when your attention is elsewhere.               | Adoption that depends on a single person is fragile. Adoption that is carried by shared habits continues to compound on its own.                                                        |

Most of this fits naturally inside the work you are already doing. The difference is a small amount of additional intention about where your discoveries are posted and how your answers travel.

### Why this matters

Tools spread inside an organization when someone trusted demonstrates that they are worth the effort. Documentation can describe what is possible, but a colleague’s example—drawn from the same codebase, the same workflows, and the same constraints—is what moves people from curiosity to a first attempt. By making your own experience visible, you remove the most common reason adoption stalls: not knowing where to start.

### What this should cost you

It is worth setting expectations with yourself and with your lead. The activities below are intended to fit inside a normal working week, and the role should remain a multiplier on your existing work rather than an additional support responsibility.

| **Activity**                            | **Time per week** | **Guidance**                                                                                                                                                   |
| --------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Posting wins and prompts                | About 15 minutes  | Capture these in the moment with a screenshot and one or two sentences; avoid turning them into formal write-ups.                                              |
| Answering questions in a shared channel | About 20 minutes  | Answer publicly once, then link back to that answer when the question recurs.                                                                                  |
| Hosting a weekly show-and-tell thread   | About 5 minutes   | You post the opening prompt; the team supplies the content.                                                                                                    |
| Optional pairing or walkthroughs        | 0–30 minutes      | Reserve this for colleagues who are genuinely blocked, and offer the **[Quickstart](https://code.claude.com/docs/en/quickstart)** link before scheduling time. |

---

## Phase 2: Share what you discover

Your own experience is the most persuasive material your colleagues will encounter, because it is specific to the codebase, workflows, and problems you all share. Documentation tells people what is possible; your posts show them what is actually working in your environment.

### What is worth sharing

The most useful posts describe a technique a colleague can reuse tomorrow rather than an outcome that is already complete. Techniques compound as they spread through a team; status updates do not.

| **Worth sharing (a technique others can reuse)**                                                                                                       | **Less useful (a status update)**              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| “I learned that @-mentioning a directory works — pointing it at `@src/components/` and asking which were missing tests surfaced two I had overlooked.” | “I migrated the payments service with Claude.” |
| “Plan mode (Shift+Tab) shows exactly which files will be touched before any edit is made, which is why I am comfortable using it on shared code.”      | “Claude saved me a lot of time this sprint.”   |
| “I configured a Stop hook so I receive a desktop notification when a long task completes; configuration is in the thread.”                             | “I closed eight tickets this week.”            |
| “Running `/init` generates a `CLAUDE.md` from the repository so the assistant stops re-asking about our conventions.”                                  | “Claude is really good; you should try it.”    |

### Where to share it

Post wherever your team already reads. The goal is to place examples in the path of normal work rather than to create a new destination.

| **Location**                                    | **Best suited for**                                                        | **Recommended format**                                                                      |
| ----------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| A `#claude-code` or general engineering channel | Discoveries, prompts, and “today I learned” moments                        | A screenshot accompanied by one or two sentences of context                                 |
| Pull-request descriptions                       | Demonstrating the approach on real code that reviewers are already reading | A single line such as “Claude and I did this refactor; happy to walk through the approach.” |
| Standups or weekly written updates              | Normalizing usage with leads and skip-level managers                       | One sentence describing one concrete outcome                                                |
| Team wiki or internal documentation             | Durable patterns, custom skills, and `CLAUDE.md` examples                  | A short page, linked from the channel topic so it remains discoverable                      |

### The format that works

A screenshot accompanied by a single line of context, or a brief before-and-after description, is generally the right level of detail. Keep each post short enough that someone scrolling past still absorbs the point. A long write-up tends to be saved for later and forgotten, whereas a short post with a screenshot tends to be copied and tried.

### Example posts

The following are illustrations of tone and length rather than templates to copy verbatim.

*Learned today that @-mentioning a directory works. I pointed it at `@src/components/` and asked which components were missing tests, and it surfaced two I had forgotten about.*

*I configured a Stop hook so I receive a desktop notification when a long task completes. I started a refactor, stepped away, and was notified when it finished. Configuration is in the thread.*

*Plan mode is the reason I am comfortable using this on code that matters. Press Shift+Tab until you see “plan”; it lays out exactly which files it intends to touch before changing anything.*

---

## Phase 3: Be the person people ask

Once you have shared a few examples, questions will follow. This is where the champion role has the greatest leverage, because a good answer to one person frequently unblocks several others who are watching the same channel.

### Answer with a prompt rather than an explanation

When a colleague asks how you accomplished something, the most useful response is the prompt you actually used. They will learn more from running that prompt against their own problem than from any description you could write, and it gives them something they can act on immediately.

**Colleague:** *How did you get it to find that race condition?*

**Champion:** *I asked, “The test in @tests/scheduler.test.ts is flaky — figure out why,” and it traced two unjoined promises in the scheduler. Try the same phrasing on your test.*

### Point at the feature rather than the documentation

A response such as “Try plan mode—press Shift+Tab until you see it” is more useful in the moment than a link to the documentation. If the person needs more depth later they will find it on their own; right now they need the single thing that unblocks them.

### Questions you are likely to hear

The table below covers the questions champions are asked most frequently, along with a suggested response and the resource to offer when the person is ready for more depth.

| **Question you are likely to hear**                | **Suggested response**                                                                                                                                                                                                       | **Follow-up resource**                                                                                                  |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| “What should I try it on first?”                   | Recommend a real but contained task — ideally a bug or chore the person has been postponing because it is tedious rather than difficult.                                                                                     | **[Common workflows](https://code.claude.com/docs/en/common-workflows)**                                                |
| “How do I trust it with my code?”                  | Introduce plan mode: pressing Shift+Tab cycles into it, Claude proposes exactly what it intends to change, and nothing is modified until the user approves.                                                                  | **[Permission modes](https://code.claude.com/docs/en/permission-modes)**                                                |
| “Is the setup worth the effort?”                   | Installation takes roughly two minutes, runs in the terminal, and requires no IDE extension. Running `/init` once is sufficient to begin working.                                                                            | **[Quickstart](https://code.claude.com/docs/en/quickstart)**                                                            |
| “It produced an incorrect result.”                 | Encourage them to provide the failure back to Claude — pasting the error message or failing test is far more effective than rephrasing the original request.                                                                 | **[Common workflows](https://code.claude.com/docs/en/common-workflows)**                                                |
| “It does not understand our codebase conventions.” | Suggest running `/init` to generate a `CLAUDE.md` file, then adding the team’s conventions, test commands, and any directories that should be avoided.                                                                       | **[CLAUDE.md documentation](https://code.claude.com/docs/en/memory)**                                                   |
| “Is this just autocomplete?”                       | Offer a brief demonstration in which Claude explains an unfamiliar file, traces a bug across services, or drafts a migration plan — tasks that require reasoning across the repository rather than completing a single line. | A two-minute live demonstration                                                                                         |
| “What about security and data handling?”           | Refer this question to your administrator. Your organization’s deployment and data-handling policy is already configured, and champions should not improvise this answer.                                                    | **[Security](https://code.claude.com/docs/en/security)** · **[Data usage](https://code.claude.com/docs/en/data-usage)** |

---

## Phase 4: Grow the circle

The objective is not to build a program or to own a rollout. It is to establish a small number of lightweight habits that allow momentum to continue after you have stopped actively driving it. When questions in the channel are being answered by people other than you, the role has done its job.

### Patterns that tend to work

| **Pattern**                       | **How to run it**                                                                                                                                                                                                                                      | **Effort required**                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| **A dedicated channel**           | Create a `#claude-code` channel (or a recurring thread in an existing one), pin the **[Quickstart](https://code.claude.com/docs/en/quickstart)** link and one strong example, and answer questions publicly so each answer benefits everyone watching. | Approximately five minutes to set up, then ambient |
| **A weekly show-and-tell thread** | Each Friday, post “What did Claude help you with this week?” No preparation, slides, or meeting are required; screenshots and short descriptions are sufficient.                                                                                       | Approximately two minutes per week                 |
| **Share a custom skill**          | Post your most useful `.claude/skills/<name>/SKILL.md` file — for example a `/ship` skill that runs tests and lint before committing — with a one-line description. Because skills are plain Markdown, colleagues can adopt them immediately.          | Approximately five minutes per skill               |
| **Pair on a first task**          | Offer a single fifteen-minute pairing session to anyone getting started. One successful outcome on their own code is more persuasive than any presentation.                                                                                            | Approximately fifteen minutes per person           |
| **Identify the next champion**    | The colleague who asks you the most questions is usually ready to take on this role. Forward them this kit and divide the channel responsibilities between you.                                                                                        | Negligible                                         |

### A thirty-day playbook

If a loose plan is helpful, the sequence below reflects what tends to work across most teams. Adjust freely to fit your context.

| **Week** | **Recommended activity**                                                                                                                                        | **Signal that it is working**                                                              |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Week 1   | Create the channel, pin the **[Quickstart](https://code.claude.com/docs/en/quickstart)**, and post two or three of your own examples with the prompts included. | A few colleagues react or reply, and at least one question is asked in the channel.        |
| Week 2   | Start the weekly show-and-tell thread, answer every question publicly, and share one custom skill or `CLAUDE.md` snippet.                                       | Someone other than you posts an example of their own.                                      |
| Week 3   | Offer two or three short pairing sessions and consolidate the most common questions and answers into a pinned FAQ message.                                      | You see repeat usage — the same colleagues returning rather than trying once and stopping. |
| Week 4   | Identify a second champion and share a brief summary of what is working and what is not with your lead or administrator.                                        | Questions in the channel are being answered by people other than you.                      |

### When someone wants to go deeper

You are the warm introduction rather than the onboarding program. When a colleague moves past “should I try this” into “how do I become effective with it,” point them to the official **[Quickstart](https://code.claude.com/docs/en/quickstart)** and **[Common workflows](https://code.claude.com/docs/en/common-workflows)** pages. They contain short sections covering the features that are genuinely useful but difficult to discover on your own.

---

## Phase 5: Responding to common concerns

Healthy skepticism is to be expected; engineers should be cautious about new tools. The most effective response is rarely to argue the general case. Instead, acknowledge the concern, offer a brief reframe, and propose one concrete demonstration on the person’s own code. Most concerns are resolved by a single successful experience.

| **Concern**                                   | **Suggested response**                                                                                                                                                                               | **Evidence to offer**                                     |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| “I am faster without it.”                     | That is likely true for code the person writes routinely. Suggest trying it on the work they tend to avoid — legacy files, unfamiliar services, or test scaffolding — where the leverage is highest. | Time one tedious task both ways and compare.              |
| “I do not trust AI to touch production code.” | Agree that no change should land unread. Plan mode combined with normal diff review means nothing is applied that the engineer has not inspected — the same standard as any pull request.            | Demonstrate plan mode on a real file.                     |
| “It will make junior engineers weaker.”       | Used well, it is an effective explainer. Encourage junior engineers to ask Claude to explain a file and its call sites before asking it to change anything.                                          | Run “Explain @file and where it is called from” together. |
| “I tried it once and it hallucinated.”        | This is usually a context problem rather than a model problem. @-mentioning the relevant files, running `/init`, and providing the actual error output typically resolves it.                        | Re-run their original prompt with proper @-context.       |
| “We do not have time to learn another tool.”  | Claude Code is a terminal command rather than a platform. If it does not return value within the first session, it is reasonable to set it aside.                                                    | A two-minute install followed by one real bug.            |

---

## Appendix: Quick-reference sheet

The techniques below are the ones that most reliably move someone from a first trial to daily use. This table is intended to be pinned in a channel or shared on its own.

| **Technique**                    | **How to apply it**                                                                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provide the right context        | Use `@file` or `@directory/` references, or paste the error or log output directly. Supplying relevant context is more effective than elaborate prompting. |
| Review the plan before the edit  | Press **Shift+Tab** to enter plan mode. Claude will describe the intended changes for your approval before executing them.                                 |
| Teach it your repository         | Run `/init` to generate a `CLAUDE.md` file, then add your conventions, test commands, and any directories that should not be modified.                     |
| Reuse a workflow                 | Save a `SKILL.md` file in `.claude/skills/<name>/` to create a `/name` skill that the entire team can use.                                                 |
| Stay informed during long tasks  | Configure a Stop hook to receive a desktop notification when a long-running task completes.                                                                |
| Recover from an incorrect result | Rather than rephrasing the request, paste the failing test or stack trace back to Claude and ask it to address that specific failure.                      |
| Keep edits surgical              | Ask for a diff, or specify “only change X.” Claude respects scope when scope is stated.                                                                    |

---

## Appendix: Resource directory

| **Resource**                   | **Link**                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| Quickstart                     | **[code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)**             |
| Common workflows               | **[code.claude.com/docs/en/common-workflows](https://code.claude.com/docs/en/common-workflows)** |
| Skills                         | **[code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)**                     |
| Anthropic Academy              | **[anthropic.com/learn](https://www.anthropic.com/learn)**                                       |
| Full Claude Code documentation | **[code.claude.com/docs](https://code.claude.com/docs)**                                         |

Thank you for taking on this role. People adopt new tools because someone they trust showed them it was worth the effort, and that is the contribution you are making. Claude Code is updated frequently; please verify version-specific details against **[code.claude.com/docs](https://code.claude.com/docs)** before distributing this material internally.
---

SOURCE: https://support.claude.com/en/articles/14555877-claude-code-communications-kit

# Claude Code communications kit

This kit covers launch communications, a twenty-message "tips and tricks" drip campaign, and a quick-reference FAQ for the questions you’ll get asked most. Each message links out to a docs page developers can go deeper on.

## How to use this kit

Three parts, in the order you’ll need them. **Part 1** is your launch announcement—one primary message in email and Slack formats, with swap-in variants for an executive-sponsored send and pilot groups. **Part 2** provides twenty drip-campaign messages packaged as ready-to-paste Slack/Teams posts. **Part 3** is a quick-reference FAQ and link directory.

**Treat everything in this kit as draft copy, not finished copy.** Rewrite each message in your org’s voice, swap the example tasks for real bugs and modules from your own codebase, and replace the [bracketed placeholders] before sending. The announcements that actually drive adoption are the ones that read like someone at your company wrote them.

---

## Part 1: Launch communications

One announcement in two formats, plus two optional variants. Pick whichever fits your rollout and rewrite it from there.

### 1.1 Before you send

| **Item**                                                                                                                     | **Why it matters**                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`#claude-code` channel created** and linked in the message                                                                 | Gives questions one place to land                                                   |
| **Install command tested** on at least one machine in your environment                                                       | Catches proxy/firewall issues before 200 people hit them                            |
| **Security/data-handling link** ready — [Data Usage](https://code.claude.com/docs/en/data-usage) or your internal equivalent | “Where does my code go?” will be the first reply                                    |
| **One concrete first task** chosen — a real bug or file in *your* codebase                                                   | Generic examples don’t convert; “fix the flaky test in `auth_test.go`” does         |
| **A named owner** for the channel for the first 48 hours                                                                     | Unanswered launch-day questions kill momentum                                       |
| **A C-suite sponsor** lined up to send (or co-sign) the announcement                                                         | Exec-sent launches consistently see higher first-week adoption than admin-sent ones |

### 1.2 The announcement

Use this as your standard org-wide rollout message. It covers what Claude Code is, gives a two-minute install, hands readers one concrete task to try, and answers “where does my code go?” before anyone has to ask.

**Email**

- **Subject:** Claude Code is live for [Engineering / your team]Team —As of today you have access to **Claude Code** — an AI coding agent that runs in your terminal, reads your actual codebase, and works through real tasks end-to-end: debugging, refactors, tests, PRs. It’s not autocomplete and it’s not a chat window. It edits files, runs your commands, and asks permission before anything risky.**Get running in two minutes:**```
curl -fsSL https://claude.ai/install.sh | bash
cd <your-repo>
claude
```

Then run `/init` once — Claude reads your project and writes a `CLAUDE.md` with your build commands and conventions, so you stop re-explaining the basics.Then try one of these on the repo you’re already in:

- *“The test in [file] is flaky — figure out why and fix it”*

- *“Walk me through how [module] handles [X]”*

- *“Look at my working diff and tell me what’s risky before I push”*

**Where your code goes.** Claude Code runs in your terminal and talks directly to Anthropic’s API — no third-party servers in the loop. It asks before editing files or running commands. Under our Enterprise agreement, Anthropic does not use your code or prompts to train its models. Details: **[Data Usage](https://code.claude.com/docs/en/data-usage)** · **[Security](https://code.claude.com/docs/en/security)****Where to go with questions:** `#claude-code`. [Owner name] is watching it this week.— [Name]**P.S.** Prefer your editor? There’s a **[VS Code extension](https://code.claude.com/docs/en/vs-code)** and **[JetBrains plugin](https://code.claude.com/docs/en/jetbrains)** — same agent, no terminal.

**Slack / Teams**

- 🚀 **Claude Code is live for [team]**AI coding agent, runs in your terminal, reads your repo, does real work — bugs, refactors, tests, PRs. Asks before it touches anything.```
curl -fsSL https://claude.ai/install.sh | bash
cd <your-repo>
claude
```

**First thing to try** → run `/init`, then: *“the test in [file] is flaky — figure out why and fix it.”*🔒 Runs in your terminal, talks only to Anthropic’s API. Under our Enterprise plan your code and prompts aren’t used to train models. **[Data usage →](https://code.claude.com/docs/en/data-usage)**📚 **[Quickstart](https://code.claude.com/docs/en/quickstart)** · **[VS Code](https://code.claude.com/docs/en/vs-code)** · **[Free 1-hr course](https://anthropic.skilljar.com/claude-code-in-action)**Questions → this thread. [Owner] is on point.

### 1.3 Variant: Executive sponsor send

**Send this from your sponsoring C-suite executive**—CTO, CIO, or SVP Engineering — under their name and from their account. Launches that go out under an exec’s name consistently see higher open rates and faster first-week activation than the same message from an admin or tooling team. It signals a company priority rather than an optional experiment.

This version is deliberately stripped to **one ask**: install it and run it on one real task. No feature tour, no FAQ. The exec’s job is to make the ask land that day; 1.2 and `#claude-code` handle the how.

**Email**

| **Subject:** One thing I’d like every engineer to try this week<br>Team —<br>We’ve turned on **Claude Code** for all of engineering. It’s an AI agent that works directly in your terminal, on your actual codebase — and the early results from teams already using it are strong enough that I want everyone on it this week.<br>I’m asking for ten minutes:

```
curl -fsSL https://claude.ai/install.sh | bash
cd <your-repo>
claude
```

<br>Then hand it one real task — the bug you’ve been putting off, or *“walk me through how [module] works.”*<br>That’s the whole ask. [Owner name] and team are in `#claude-code` for anything you hit along the way.<br>— [Exec Name]
[Title]<br> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Slack / Teams**

| 📣 **From [Exec Name]: one thing to try this week**<br>We’ve turned on **Claude Code** for all of engineering. Early results are strong enough that I’m asking everyone to give it ten minutes on real work this week.<br>

```
curl -fsSL https://claude.ai/install.sh | bash
cd <your-repo>
claude
```

<br>→ hand it one real task.<br>That’s it. Questions → `#claude-code`.<br> |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 1.4 Variant: Pilot / early-access group

Use for a phased rollout. Send to the pilot cohort only.

| **Subject:** You’re in the Claude Code pilot<br>[Name / team] —<br>You’re in the first wave of Claude Code at [company]. We picked this group because you’ll put it on real problems and tell us the truth about it.<br>**The ask:** use it on at least one real task this week, then drop a note in `#claude-code-pilot` — what worked, what was annoying, what surprised you. That feedback decides how we roll it out to everyone else.<br>*[Continue with “Get running in two minutes” from 1.2]*<br>**One extra thing for pilots:** on your first multi-file change, hit **Shift+Tab** until you see “plan.” Claude will lay out exactly what it intends to do before it touches a file — it’s the fastest way to calibrate how much to trust it.<br> |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 1.5 Champion recruitment DM

After launch, DM the two or three people who are most active in `#claude-code`.

| Hey [name] — your `#claude-code` posts are doing more for adoption than my announcement did. A couple of people told me your [thread / screenshot] was why they actually tried it.<br>Want to make that semi-official? Low lift — mostly keep posting what you’re posting, plus first crack at new features and a direct line to the Anthropic team. I can share a short playbook for that if you’re in.<br> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

---

## Part 2: Tips and tricks campaign

Twenty ready-to-paste Slack/Teams messages designed to drive feature activation after launch. Each follows the same pattern: a hook, the payoff, a **“try it now”** prompt, and a docs link. Drip them one or two a week in `#claude-code`, or pick the five that match your team’s gaps. They stand alone—no required order.

Copy the message body from each table below directly into Slack or Teams. Replace [bracketed placeholders] before sending.

### 2.1 Getting started

**Message 1 — Choosing the right model**

| 🎯 **Tip: Match the model to the moment**<br>Using Opus to fix a typo? Burning compute. Using Haiku for a 12-file refactor? Asking for a re-do.<br>Claude Code runs on the same models as the Claude app—and you can switch mid-session. **Sonnet** is the workhorse default for everyday feature work, bugs, tests, and reviews. Reach for **Opus** on large refactors, gnarly debugging, or anything high-stakes. Drop to **Haiku** for quick questions, formatting, and mechanical edits where speed wins.<br>**Try it now:** type `/model` in your session and pick Sonnet if you haven’t already—it’s the right default for most tasks.<br>📖 **[Model configuration](https://code.claude.com/docs/en/model-config)**<br> |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

*Quick reference:*

| **Model**                      | **Best for**                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| Opus                           | Large-scale refactors, complex debugging, architecture decisions, high-stakes changes |
| Sonnet *(recommended default)* | Everyday feature work, bug fixes, tests, documentation, code review                   |
| Haiku                          | Quick questions, formatting, mechanical edits, rapid iteration                        |

**Message 2 — Quick wins to try first**

| 🚀 **Tip: Three things to try in your first 10 minutes**<br>Installed Claude Code but not sure what to actually ask it? Start with the stuff that’s been bugging you all week.<br>     Fix something annoying — *“the test in [file] is flaky — figure out why”*<br>Get oriented in code you didn’t write — *“walk me through how [module] works”*<br>Sanity-check before you push — *“look at my working diff and tell me what looks risky”*<br>None of these need setup. Just `cd` into your repo and run `claude`.<br>**Try it now:** pick the bug you’ve been avoiding and paste the error message in. That’s it.<br>📖 **[Quickstart](https://code.claude.com/docs/en/quickstart)**<br> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

### 2.2 Project memory

**Message 3 — /init and CLAUDE.md**

| 📁 **Tip: Stop re-explaining your repo every session**<br>Telling Claude “we use pnpm, not npm” for the fifth time? There’s a one-time fix for that.<br>Run `/init` once per repo. Claude reads your project structure and writes a `CLAUDE.md` file — your build commands, architecture, conventions. Every future session in that repo starts from this file automatically. Keep it under two screens. It’s a cheat sheet, not documentation.<br>**Try it now:** open your main repo, run `claude`, type `/init`. Thirty seconds, pays off every session after.<br>📖 **[CLAUDE.md and project memory](https://code.claude.com/docs/en/memory)**<br> |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Message 4 — @-references**

| 📎 **Tip: Stop pasting file contents into the chat**<br>Copying 200 lines of a component into your prompt so Claude can “see” it? You don’t have to.<br>Type `@` then a file path — Claude pulls the file directly into context. Works for whole directories too.<br>*> the styles in @src/components/Button.tsx look off, check against @docs/design-system.md*<br>**Try it now:** type `@` then Tab — autocomplete shows you every file in reach.<br>📖 **[Referencing files](https://code.claude.com/docs/en/common-workflows#reference-files-and-directories)**<br> |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Message 5 — Memory — “remember that…”**

| 🧠 **Tip: Teach Claude your team’s quirks once**<br>Claude just suggested deploying from `main` — but you deploy from `release`. Don’t correct it again next week.<br>When Claude misses something it should’ve known about your project, just say it out loud: *“remember that we deploy from the release branch, not main.”* Claude saves the fact to auto memory and starts every future session knowing it.<br>**Try it now:** next time you correct Claude on a project detail, prefix it with *“remember that…”* instead.<br>📖 **[Memory and CLAUDE.md](https://code.claude.com/docs/en/memory)**<br> |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 2.3 Control and safety

**Message 6 — Permission modes**

| 🛡️ **Tip: One keystroke between “look but don’t touch” and “just do it”**<br>Sometimes you want Claude to ask before every edit. Sometimes you just want it to ship. You shouldn’t have to pick one forever.<br>**Shift+Tab** cycles through how much leash Claude gets — **default** (asks before risky stuff), **acceptEdits** (file edits and common filesystem commands like mkdir/mv/cp flow through; still checks before other shell commands), **plan** (proposes, you approve before anything changes). Plan mode is the trust-builder—start there for anything touching multiple files.<br>**Try it now:** on your next refactor, hit Shift+Tab until you see “plan”, then describe the change. You’ll get a full proposal before a single file moves.<br>📖 **[Permission modes](https://code.claude.com/docs/en/permissions)**<br> |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

*Quick reference (the three you’ll use most — see **[docs](https://code.claude.com/docs/en/permissions)** for the full list):*

| **plan**                                             | **default**                                | **acceptEdits**                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Claude proposes, you approve before anything changes | Claude asks before risky edits or commands | File edits and common filesystem Bash commands go through without asking; still checks before other shell commands |

**Message 7 — Checkpointing and /rewind**

| ⏪ **Tip: There’s an undo button for the whole conversation**<br>Claude went down the wrong path three turns ago and now you’re untangling spaghetti? You don’t have to fix forward.<br>`/rewind` rolls back to an earlier point in the conversation — including the file changes Claude made along the way. Checkpointing is automatic; you don’t set anything up.<br>**Try it now:** hit **Esc** twice to open the rewind menu, or type `/rewind`. Pick the point before things went sideways.<br>📖 **[Checkpointing](https://code.claude.com/docs/en/checkpointing)**<br> |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 2.4 Connect Your Tools

**Message 8 — MCP connectors**

| 🔌 **Tip: Let Claude read your issue tracker so you don’t have to paste tickets**<br>Copy-pasting Jira tickets into the terminal feels like a step backward. It is.<br>One config file (`.mcp.json` at your project root) wires Claude into GitHub, Jira, Linear, or whatever tracker you use. Then *“what’s the top-priority issue assigned to me?”* and *“go ahead and fix it”* happen in the same conversation. Wire up your issue tracker first — it’s the highest-leverage connector.<br>**Try it now:** ask Claude *“set up an MCP connector for [GitHub/Jira/Linear] in this repo”* — it’ll write the config for you.<br>📖 **[MCP connectors](https://code.claude.com/docs/en/mcp)**<br> |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Message 9 — IDE integrations**

| 💻 **Tip: You don’t have to leave your editor**<br>Terminal not your thing? The same agent runs inside VS Code and JetBrains.<br>VS Code extension and JetBrains plugin available now — same model, same features, embedded in your editor. No alt-tabbing to the terminal.<br>**Try it now:** search “Claude Code” in your editor’s extension marketplace and hit install. You’ll be running in under a minute.<br>📖 **[VS Code extension](https://code.claude.com/docs/en/vs-code)**<br> |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 2.5 Automate Your Workflows

**Message 10 — Slash commands and skills**

| ⚡ **Tip: Turn that prompt you keep retyping into a command**<br>Typed “summarize what I worked on today from git log, format it for standup” three times this week? That’s a slash command waiting to happen.<br>A `SKILL.md` file in `.claude/skills/<name>/` becomes a reusable prompt—type /name to run it. The rule of thumb: make one the second time you type a multi-step prompt you’ve typed before. Easiest path? Ask Claude to make it for you.<br>**Try it now:** type *“make me a /standup skill that summarizes what I worked on today from git log”* — then run `/standup` tomorrow morning.<br>📖 **[Skills](https://code.claude.com/docs/en/skills)**<br> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Message 11 — Hooks**

| 🔔 **Tip: Get pinged when your refactor finishes — go get coffee**<br>Sitting at your desk watching Claude work through a long task? You’ve got better things to do for those eight minutes.<br>Hooks are shell commands that fire on Claude Code events. A `Stop` hook that sends a desktop notification means you can kick off a long refactor, walk away, and get pinged the moment it’s done.<br>**Try it now:** ask Claude *“add a Stop hook that sends a desktop notification when you finish”* — it’ll write the script and wire it up.<br>📖 **[Hooks guide](https://code.claude.com/docs/en/hooks-guide)**<br> |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Message 12 — Subagents**

| 🤖 **Tip: Big tasks get parallelized**<br>Ever notice some tasks finish faster than the math says they should? That’s subagents.<br>For large jobs — multi-file refactors, broad codebase searches — Claude can spin up specialized subagents that work in parallel without cluttering your main conversation. It’ll often do this on its own, and you can also define your own custom subagents for repeat workflows.<br>**Try it now:** on your next big refactor, just describe the whole job at once instead of file-by-file: *“update every API call in src/ to use the new client”*. Watch it parallelize.<br>📖 **[Subagents](https://code.claude.com/docs/en/sub-agents)**<br> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

### 2.6 Day-to-day dev

**Message 13 — Effort levels**

| 🧩 **Tip: Give Claude permission to actually think about the hard ones**<br>Got a bug that’s defeated you twice? Don’t ask for a fast answer — ask for a careful one.<br>`/effort max` pushes reasoning depth to the top of the scale. Claude takes longer, explores more branches, and the answer is more likely to hold up under scrutiny. Team and Enterprise plans already default to high, so max is the step up. Save it for the problems where being wrong costs you an afternoon.<br>**Try it now:** type `/effort max ` before describing your hardest open bug. Then go refill your water while it works.<br>📖 **[Effort levels](https://code.claude.com/docs/en/model-config#adjust-effort-level)**<br> |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Message 14 — Screenshots and images**

| 📸 **Tip: Stop describing the error dialog — just show it**<br>Typing out “there’s a red box that says something about a null reference and it’s pointing at line 47-ish”? Screenshot it.<br>Drag a screenshot straight into the terminal and Claude sees it — error dialogs, UI mockups, whiteboard photos, Figma exports. **Ctrl+V** pastes from clipboard (use Ctrl+V on macOS too — not Cmd+V).<br>**Try it now:** next time something visual breaks, screenshot it and paste it right into the prompt. Then just type *“what’s wrong here?”*<br>📖 **[Working with images](https://code.claude.com/docs/en/common-workflows#work-with-images)**<br> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Message 15 — Git workflows**

| 🌿 **Tip: Hand off the whole git ceremony**<br>The fix took 5 minutes. The commit message, branch, and PR description took 15. That ratio is wrong.<br>Claude handles the full git flow — commits with conventional messages, branches, PRs with proper summaries. One ask: *“fix the off-by-one, commit with a conventional commit message, and open a PR.”* Reviewing someone else’s work? Paste the PR URL and ask Claude to walk you through the diff.<br>**Try it now:** after your next fix, instead of switching to your git client, just type *“commit this with a good message and open a PR”*.<br>📖 **[Creating pull requests](https://code.claude.com/docs/en/common-workflows#create-pull-requests)**<br> |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Message 16 — Background tasks**

| ⏱️ **Tip: Don’t block on the test suite — keep talking**<br>Full test suite takes 4 minutes? That’s 4 minutes you could spend planning the next change.<br>Long-running commands — builds, test suites, dev servers — can run in the background while you keep working with Claude. You just have to ask for it explicitly.<br>**Try it now:** instead of *“run the tests”*, say *“run the tests in the background”*. Then keep going: *“while that runs, walk me through the auth module.”*<br>📖 **[Background commands](https://code.claude.com/docs/en/interactive-mode#background-bash-commands)**<br> |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 2.7 Share and scale

**Message 17 — Plugins**

| 📦 **Tip: Someone probably already built that skill**<br>About to spend an hour building a `/deploy` command? Check if it already exists.<br>Skills get bundled and shared as plugins. `/plugin` browses what’s available and installs in one step. Five minutes of browsing can save an hour of building.<br>**Try it now:** type `/plugin` right now and scroll through. You’ll find at least one thing you didn’t know you wanted.<br>📖 **[Plugins](https://code.claude.com/docs/en/plugins)**<br> |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Message 18 — Keyboard shortcuts**

| ⌨️ **Tip: Five shortcuts that pay rent every day**<br>If you only learn five things, make it these — they each save a click dozens of times a day.<br>**Shift+Tab** → cycle permission modes · **@** then Tab → autocomplete file paths · **/** then pause → see every command · **Ctrl+C** → stop mid-task · **Esc** twice → open rewind menu<br>**Try it now:** right now, hit `/` and pause. That’s your full command list. Anything you didn’t know about?<br>📖 **[Interactive mode and shortcuts](https://code.claude.com/docs/en/interactive-mode)**<br> |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 2.8 Security and admin

**Message 19 — Security architecture**

| 🔐 **Tip: The answer to “is this safe?” — for the next time you’re asked**<br>Someone on your team is going to ask “wait, where does my code go?” Here’s the short version you can paste.<br>Permission-first by design. Every file edit, shell command, and external call is gated by your approval. The CLI runs in your terminal and talks directly to Anthropic’s API — no third-party servers — with optional OS-level sandboxing for shell commands. Under our Enterprise plan, Anthropic does not use your code or prompts to train its models.<br>**Try it now:** save these two links for the next time the question comes up — they answer most security-review questions.<br>📖 **[Security and permissions](https://code.claude.com/docs/en/security)** · **[Data usage](https://code.claude.com/docs/en/data-usage)**<br> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Message 20 — Best practices**

| ✅ **Tip: The 4 habits that separate “tried it once” from “use it daily”**<br>Most people who bounce off Claude Code skipped one of these. Most people who stick did all four in week one.<br>     Start in plan mode for anything touching multiple files.<br>Run `/init` early — context compounds.<br>Review diffs before committing — Claude can be confidently wrong.<br>Verify changes that touch critical paths; treat it like a sharp junior, not an oracle.<br>**Try it now:** if you’ve only done one or two of these, pick the one you’re missing and do it on your next task. Post what changed in `#claude-code`.<br>📖 **[Best practices](https://code.claude.com/docs/en/best-practices)**<br> |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

---

## Part 3: Quick reference

### 3.1 FAQ responses

One-line Slack replies for the questions you’ll get asked most.

| **Question**                             | **Response**                                                                                                                                                                                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “Does it work in VS Code?”               | Yes — VS Code extension and JetBrains plugin. Same features, embedded in your editor. **[Docs →](https://code.claude.com/docs/en/vs-code)**                                                                                                             |
| “Do I have to configure anything first?” | No — install, then `claude` in any repo. Run `/init` once and you’re set. **[Quickstart →](https://code.claude.com/docs/en/quickstart)**                                                                                                                |
| “Where does my code go?”                 | The CLI runs in your terminal and sends context to Anthropic’s API for inference — no third-party servers. Under our Enterprise plan, your code and prompts aren’t used to train models. **[Data Usage →](https://code.claude.com/docs/en/data-usage)** |
| “Can it see my whole repo?”              | It reads what you give it access to. File reads inside your working directory don’t prompt; permission prompts gate edits, shell commands, and anything outside that directory. **[Permissions →](https://code.claude.com/docs/en/permissions)**        |
| “How is this different from Copilot?”    | Copilot autocompletes lines. Claude Code is an agent — reads files, runs commands, makes multi-file edits. **[Overview →](https://code.claude.com/docs/en/overview)**                                                                                   |
| “What should I try first?”               | A bug you’ve been putting off because it’s tedious. *“the test in [file] is flaky — figure out why.”* **[Quickstart →](https://code.claude.com/docs/en/quickstart)**                                                                                    |

### 3.2 Prompt templates

| **Task**             | **Prompt**                                                                    |
| -------------------- | ----------------------------------------------------------------------------- |
| Fix a bug            | *“the tests in [file] are failing — figure out why and fix it”*               |
| Understand code      | *“walk me through how [module] works, then tell me where the entry point is”* |
| Safe refactor        | *“refactor [module] to [goal] — use plan mode so I can review first”*         |
| Write tests          | *“write tests for [file] that cover the edge cases around [scenario]”*        |
| Review before commit | *“look at my working diff and tell me what looks risky”*                      |
| Open a PR            | *“fix [issue], write a conventional commit, and open a PR with a summary”*    |
| Make a skill         | *“make me a /ship skill that runs tests and lint before commit”*              |
| Debug a stack trace  | *“here’s the stack trace — find the root cause, don’t just paper over it”*    |

---

## Appendix: Verified links reference

| **Resource**                        | **URL**                                                                                                  |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Claude Code docs (home)             | **[code.claude.com/docs](https://code.claude.com/docs)**                                                 |
| Quickstart & install                | **[code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)**                     |
| Claude Code in Action (free course) | **[anthropic.skilljar.com/claude-code-in-action](https://anthropic.skilljar.com/claude-code-in-action)** |
| VS Code extension                   | **[code.claude.com/docs/en/vs-code](https://code.claude.com/docs/en/vs-code)**                           |
| JetBrains plugin                    | **[code.claude.com/docs/en/jetbrains](https://code.claude.com/docs/en/jetbrains)**                       |
| CLAUDE.md & memory                  | **[code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory)**                             |
| Permission modes                    | **[code.claude.com/docs/en/permission-modes](https://code.claude.com/docs/en/permission-modes)**         |
| MCP connectors                      | **[code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp)**                                   |
| Skills                              | **[code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)**                             |
| Hooks                               | **[code.claude.com/docs/en/hooks-guide](https://code.claude.com/docs/en/hooks-guide)**                   |
| Subagents                           | **[code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents)**                     |
| Plugins                             | **[code.claude.com/docs/en/plugins](https://code.claude.com/docs/en/plugins)**                           |
| Checkpointing                       | **[code.claude.com/docs/en/checkpointing](https://code.claude.com/docs/en/checkpointing)**               |
| Model configuration                 | **[code.claude.com/docs/en/model-config](https://code.claude.com/docs/en/model-config)**                 |
| Common workflows                    | **[code.claude.com/docs/en/common-workflows](https://code.claude.com/docs/en/common-workflows)**         |
| Interactive mode & shortcuts        | **[code.claude.com/docs/en/interactive-mode](https://code.claude.com/docs/en/interactive-mode)**         |
| Security                            | **[code.claude.com/docs/en/security](https://code.claude.com/docs/en/security)**                         |
| Data usage                          | **[code.claude.com/docs/en/data-usage](https://code.claude.com/docs/en/data-usage)**                     |
| Best practices                      | **[code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)**             |

Claude Code ships frequently—verify version-specific details against **[code.claude.com/docs](https://code.claude.com/docs)** before distributing internally.
---

SOURCE: https://support.claude.com/en/articles/15282265-claude-enterprise-activation-promo-for-claude-code-and-cowork

# Claude Enterprise activation promo for Claude Code and Cowork

We're issuing $1,000 in usage credits to every user in a Claude Enterprise organization—up to $10M per organization—who activates Claude Code or Claude Cowork for the first time. Credits are issued automatically and are scoped to the activating seat.

Available on usage-based Claude Enterprise plans only.

This article explains who’s eligible for the promo, how it works, and where admins can see activations in their organization. Additional offer terms apply and are available here: **[Claude Promotional Credit Offer Terms](https://www.anthropic.com/legal/promotion-credit-terms)**.

## Eligibility

## Plan eligibility

The promo is available on new and existing usage-based Claude Enterprise organizations, both sales-assisted and self-serve.

The promo isn’t available on:

- Legacy seat-based Claude Enterprise plans

- Team plans

- Pro and Max plans

Your organization’s subscription must be active and in good standing when a credit is issued and when it’s consumed.

### Seat eligibility

A seat earns a credit on its first successful message in Claude Code or Cowork, provided that:

- The user hasn’t previously sent a message in Claude Code or Cowork on any Claude Enterprise plan.

- The seat is in an eligible organization

- The seat is not associated with a free email domain (e.g. Gmail).

Each user can earn the credit on at most one Claude Enterprise organization, so a user who’s a member of multiple organizations earns the credit once.

## How the credit works

When a user in your Claude Enterprise organization sends their first successful message in Claude Code or Cowork, $1,000 in usage credits is issued automatically to that seat. There’s nothing for admins or users to claim.

Once a credit is issued:

- It applies only to that user’s Claude Code and Cowork usage, not to Claude chat or any other product.

- It expires 90 days after issuance. Any unused portion is forfeited at expiration, with no expiration notification.

- Up to 10,000 seats per organization can earn a credit ($10M maximum per organization). Once 10,000 seats in your organization have earned a credit, additional first-time activations don't earn one.

## Track activations in your organization

Admins can see who’s eligible by going to the **[usage page in organization settings](http://claude.ai/admin-settings/usage)** or:

- For Claude Code, go to **[Organization settings > Claude Code](https://claude.ai/admin-settings/claude-code)**

- For Cowork, go to **[Organization settings > Cowork](https://claude.ai/admin-settings/cowork)**

## Activation window

The activation window opens June 2, 2026 and ends on July 2, 2026 at 11:59:59 PM PT. Anthropic may contract or extend the window at its discretion.

Seats that activate during the window earn the credit. Credits issued during the window remain valid for 90 days from issuance, even if the window has closed by then.

## Temporary holds on eligibility

If we detect abuse, we may put the promotion on hold and hide the promotion admin panel. Your admin will also receive an email if that is the case. You can fill out **[this form](https://docs.google.com/forms/d/e/1FAIpQLSdVQd-gfK63yowPR0PfTZs74PuYcB1qJUHh3VxGdR7tN9rYQg/viewform)** to request a review of your organization’s recent activation activity.
---

SOURCE: https://support.claude.com/en/articles/15924927-use-claude-code-cli-with-a-screen-reader

# Use Claude Code CLI with a screen reader

The screen reader mode brings Claude Code back to the basic terminal experience: plain, sequential text with added labels and cues and no visual embellishments. It was built with and for screen reader users, and it's useful to anyone who wants plain output for braille displays, slow connections, or transcripts.

## Turn on the screen reader mode

The screen reader mode requires Claude Code version 2.1.181 or later and it can be enabled in multiple ways:

- For one session: run `claude --ax-screen-reader`

- For every session in a terminal: set the environment variable `CLAUDE_AX_SCREEN_READER=1`

- Permanently: add `"axScreenReader": true` to your Claude Code settings file (`~/.claude/settings.json`)

The first line of the session announces that the screen reader mode is on. In Claude Code v2.1.206 and later it announces: `[Screen Reader Mode: on via flag]` (or `via env` / `via settings`).

## What to expect

- **Your prompts and Claude’s responses are labeled.** Your messages start with `you:` and Claude's replies start with `claude:`. Tool activity starts with `tool:` and permission prompts with `Permission Required:`. The labels are also searchable, so you can use your terminal's search to jump between parts of the conversation.

- **Menus become numbered lists.** Instead of moving a highlight with the arrow keys, you hear each option as a numbered line, then type the number of the option you want and press Enter. For yes-or-no prompts, type `y` or `n` and press Enter.

- **Visual decorations are removed.** Spinners, progress animations, and in-place redraws become plain text that reads in order, and decorative characters such as box-drawing lines are removed.

- **A terminal bell tells you when Claude needs you.** You'll hear your terminal's alert sound when Claude finishes a reply, when a permission prompt appears, and when a long-running tool finishes. If you don't hear it, check the bell setting in your terminal application—some terminals keep the alert sound off by default. Claude Code's own notification channel can be set with `/config` under notifications.

To explore comprehensive documentation regarding line markers, list navigation, and existing constraints, visit the **[Accessibility section of the Claude Code guide](https://code.claude.com/docs/en/accessibility)**.

## Report an issue

​​If something doesn't work with your screen reader or terminal, open an issue at **[the Claude Code GitHub repository](https://github.com/anthropics/claude-code/issues)** and mention your screen reader in the title. Please include your operating system, terminal application, and screen reader name and version.

**Note:** One setting that's easy to mix up: `CLAUDE_CODE_ACCESSIBILITY=1` is a different, unrelated setting—it keeps the terminal cursor visible for screen magnifiers and does not turn on screen reader mode. For a screen reader, use the methods above.