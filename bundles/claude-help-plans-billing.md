
---

SOURCE: https://support.claude.com/en/articles/10185996-how-to-change-your-pro-plan-from-monthly-to-annual-billing

# How to change your Pro plan from monthly to annual billing

Save on your Pro plan subscription by switching from monthly to annual billing. When you upgrade, any remaining time on your current monthly subscription will be credited to your new annual plan invoice.

## To switch from monthly to annual billing

1. Navigate to [Settings > Billing](https://claude.ai/settings/billing).

2. Click "Adjust plan" next to your Pro subscription details.

3. From [the upgrade page](https://claude.ai/upgrade), select "Get Pro annual plan"

4. Review the annual price on the next screen.

5. Click "Confirm subscription."

## What happens next?

- Your subscription billing period switches from monthly to annual immediately.

- Any unused time from your monthly subscription will be automatically credited to your first annual invoice. You’ll see this credit as a separate line item on your invoice.

- Your next billing date will be set to one year from the date you switch.

- You can cancel your subscription at any time from your billing settings. See [How do I cancel my paid Claude subscription?](https://support.anthropic.com/en/articles/8325617-how-do-i-cancel-my-paid-claude-subscription) for more information.
---

SOURCE: https://support.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans

# Configure custom data retention controls for Enterprise plans

This feature is available to Enterprise plan customers. To set custom retention periods for your organization, you must have either a Primary Owner or Owner role.

*This article is about our commercial products such as Claude for Work and the Anthropic API. For our consumer products such as Claude Free, Pro, Max and when accounts from those plans use Claude Code, see **[here](https://privacy.claude.com/en/collections/10663362-consumers)**.*

Custom data retention controls allow organizations to manage how long Claude stores conversation and project data. This article explains how to set up and manage data retention periods for your organization.

## How data retention works

Data retention is based on the last observed activity:

- **For chats:** Retention period starts from the time of the last message in the conversation.

- **For projects:** Retention period starts from the time the project was last updated (this includes chat creation or project knowledge base modifications).

  - Note that your custom data retention periods set for projects will supersede your custom retention periods for any chats.

The minimum retention period is 30 days, and each month is counted as 30 days. For example, a three-month retention period equals 90 days.

## What gets deleted

When data reaches the end of its retention period:

- **For chats:** All chats (including chats within projects) and any artifacts within those chats will be deleted.

- **For projects:** All projects will be deleted, including any chats and artifacts within those projects.

## Important considerations

- Deletion occurs at midnight UTC on the scheduled day.

- By default, data is retained indefinitely unless a custom retention period is set.

- When you modify retention settings, any data that falls outside the new retention period will be deleted immediately upon saving.

- Data past its retention period will be permanently deleted and cannot be recovered.

## Setting up data retention

## To set custom retention periods:

1. Log in to your Owner Enterprise plan account.

2. Navigate to **[Organization settings > Data and Privacy](https://claude.ai/admin-settings/data-privacy-controls)**.

3. Set your desired retention period (minimum 30 days).

4. Save your changes.

## Example retention calculation

If a conversation’s last message is at 3PM UTC on March 1 with a 30-day retention period, the deletion will occur at midnight UTC on March 31.

## Monitoring retention-related activities

All retention-related actions and changes are automatically tracked in **[audit logs](https://support.claude.com/en/articles/9970975-how-to-access-audit-logs)**. You can access these logs to monitor changes to retention settings and data deletion events.
---

SOURCE: https://support.claude.com/en/articles/10504844-manage-user-feedback-settings-on-team-and-enterprise-plans

# Manage user feedback settings on Team and Enterprise plans

As a Primary Owner or Owner of a Team or Enterprise plan, you can manage the ability for members of your organization to submit feedback to Anthropic via thumbs up / thumbs down.

1. Navigate to **[Organization settings > Data and Privacy](https://claude.ai/admin-settings/data-privacy-controls).**

2. Use the toggle to change the **Rate chats** setting for your organization:



More information on how Anthropic collects, uses, and stores feedback data can be found in our Privacy Center: **[How long do you store my organization’s data?](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)**
---

SOURCE: https://support.claude.com/en/articles/11049741-what-is-the-max-plan

# What is the Max plan?

This article is about paid Max plans for individual consumers. If you're part of an organization looking to use Claude with your team, refer to **[Team and Enterprise Plans](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans)**.

The Max plan is designed for users who collaborate with Claude frequently and need more usage to work on a variety of tasks. In addition to providing higher usage limits than the Pro plan, Max plan subscribers will also receive priority access to our newest features and models.

## Key benefits

- **More usage capacity**: Get 5x or 20x more usage than the Pro plan, depending on your selected tier.

- **No more interruptions**: Stay in flow when it matters most with higher usage limits that allow for deeper, more extensive work with Claude.

- **Scale as needed**: Choose the usage tier that matches your workflow, with the flexibility to adjust as your needs change.

- **Priority access**: Be among the first to experience new models, features, and products.

- **Access to Claude Code: [Use Claude Code](https://support.claude.com/en/articles/11145838)** for your terminal-based coding workflows with one unified subscription.

- **Access to Cowork:** Hand off complex, multi-step tasks to Claude in Claude Desktop. See this article for more information: **[Get started with Claude Cowork](https://support.claude.com/en/articles/13345190)**.

---

## How much does the Max plan cost?

### Pricing tiers

The Max plan is available in two tiers to match your usage needs:

- **Max 5x**: $100 per month

- **Max 20x**: $200 per month

**Note:** These prices are for web subscriptions only. Mobile pricing may vary depending on your app platform.

Price and plans are subject to change at Anthropic's discretion.

### Billing information

- The Max plan is currently available as a monthly subscription only.

- When upgrading from a lower to a higher tier, your account will be charged on a prorated basis for the remainder of your billing cycle.

- When moving from an annual Pro plan to a Max plan, if the remaining balance on your annual Pro plan is greater than your Max plan price, you will receive a credit to your account for the remaining balance. This credit will be applied to future subscription costs.

  - To receive your credit, the billing address used to purchase your Max plan must be the same as your previous subscription’s billing address.

  - If your billing address has changed, you will need to cancel your Pro subscription and wait for the subscription end date before signing up for a new Max subscription with a new billing address.

  - If you subscribed through Google Play, you're charged the full price of your new plan when you upgrade. The unused value of your previous plan is converted into extra days on your new plan, so your renewal date will land a few days later than a full month.

### How can I get a free or discounted Max plan?

We do not offer standard discounted pricing any of our paid plans, including Max 5x and 20x plans. With that said, anyone in a supported location can access the free version of Claude by navigating to claude.ai and signing up using an email address.

We occasionally run limited-time promotions, but we don't have any standing discounts available upon request. These promotional offers are typically announced through our official channels when available. If you're interested in potential future promotions, we recommend following our official social media accounts or signing up for our newsletter to be notified of any special offers. Our Support team cannot issue one-off discounts or coupons.

---

## Does the Max plan have any usage limits?

Yes. The Max plan offers substantially higher usage compared to our Pro plan and is available in two tiers:

**Max 5x** provides 5 times more usage per session than the Pro plan. This tier is ideal for frequent users who work with Claude on a variety of tasks.

**Max 20x** provides 20 times more usage per session than the Pro plan. This tier is ideal for daily users who collaborate often with Claude for most tasks.

Max plans also have two weekly usage limits: one that applies across all models and another for Sonnet models only. Weekly limits reset at a fixed time each week that is assigned to your account. Your reset day and time stay the same regardless of when you start using Claude or when your subscription begins, and you receive your full weekly allowance each cycle. You can see your next reset time in **[Settings > Usage](https://claude.ai/new#settings/usage)**.

In addition, to manage capacity and ensure fair access to all users, we may limit your usage in other ways, such as weekly and monthly caps or model and feature usage, at our discretion.

For more information about usage and length limits, refer to **[Understanding usage and length limits](https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits)**. For guidance on using your Max capacity efficiently, we also have **[Usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices)**.
---

SOURCE: https://support.claude.com/en/articles/11049752-how-do-i-sign-up-for-the-max-plan

# How do I sign up for the Max plan?

This article applies to individual consumers signing up for paid Max plans. If you're part of an organization looking to use Claude with your team, refer to **[Team and Enterprise plans](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans)**.

## Instructions for new users

1. Visit **[claude.ai](https://claude.ai/)**.

2. Create a new account.

3. During the onboarding process, select the Max plan option.

4. Choose your preferred usage tier (5x or 20x).

5. Enter your payment information.

6. Confirm your subscription.

## Instructions for existing free users

1. Log in to your Claude account.

2. Go to **[Settings > Billing](https://claude.ai/settings/billing)**.

3. Select "Upgrade to Max."

4. Choose your preferred usage tier (5x or 20x).

5. Enter your payment information.

6. Confirm your subscription.

## Instructions for existing Pro users

1. Log in to your Claude account.

2. Go to **[Settings > Billing](https://claude.ai/settings/billing)**.

3. Select "Upgrade to Max."

4. Choose your preferred usage tier (5x or 20x).

5. Confirm your upgrade.

Your Pro plan will be upgraded to Max immediately, with billing adjusted on a prorated basis for the remainder of your current billing cycle.

If you're moving from an annual Pro plan to a Max plan and the remaining balance on your annual Pro plan is greater than your Max plan price, you will receive a credit to your account for the remaining balance. This credit will be applied to future subscription costs.

**Note:** If you subscribed through Google Play, upgrades work differently. You're charged the full price of your new plan when you upgrade, and the unused value of your previous plan is converted into extra days on your new plan. Your renewal date will land a few days later than a full month—you keep the value of your remaining time, but you won't see a discounted charge.

## How does subscription renewal work for Max plans?

After subscribing for a Max plan, your subscription will be set to automatically renew at the end of each billing period by default. This ensures uninterrupted access to Max features. However, you have the flexibility to **[cancel your paid plan](https://support.claude.com/en/articles/8325617)** at any time if you choose not to continue.
---

SOURCE: https://support.claude.com/en/articles/11049762-choose-a-claude-plan

# Choose a Claude plan

Use the following guide to determine which plan is right for you.

| **Plan** | **Price**              | **Billing Interval** | **Usage Capacity**                                                                                                    | **Best For**                                                 |
| -------- | ---------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Free     | $0                     | N/A                  | **[Limited](https://support.claude.com/en/articles/8114491-getting-started-with-claude#h_57262af5ae)**                | Occasional use                                               |
| Pro      | $20/month<br>$200/year | Monthly or annual    | **[Standard](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan#h_62ccc00135)**                      | Regular use                                                  |
| Max 5x   | $100                   | Monthly              | **[5x Pro capacity per session](https://support.claude.com/en/articles/11049741-what-is-the-max-plan#h_cfd2904008)**  | Frequent users who work with Claude on a variety of tasks    |
| Max 20x  | $200                   | Monthly              | **[20x Pro capacity per session](https://support.claude.com/en/articles/11049741-what-is-the-max-plan#h_cfd2904008)** | Daily users who collaborate often with Claude for most tasks |

The plans listed above are intended for individual users. Looking for a plan for your organization or company? Read more about our Team and Enterprise plans:

- **[What is the Team plan?](https://support.claude.com/en/articles/9266767-what-is-the-team-plan)**

- **[What is the Enterprise plan?](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)**
---

SOURCE: https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan

# How am I billed for my Enterprise plan?

Enterprise plan billing has two parts: a fixed seat fee and separate usage charges. The seat fee covers platform access. Usage is billed on top of that, based on what your team actually consumes.

How billing works depends on whether your organization is on a self-serve or sales-assisted Enterprise plan, and whether you're using the current single Enterprise seat or a legacy seat type. The sections below are organized by plan type—make sure you're reading the section that matches your setup. If you're unsure which plan type you're on, check with the person who set up your Enterprise account or contact your Anthropic account manager. Price and plans are subject to change at Anthropic's discretion.

**Important:** The main sections of this article describe the current Enterprise seat billing model, which applies to all new Enterprise plans.

- If your organization was provisioned before the transition to the single Enterprise seat and you see **Chat** and **Chat + Claude Code** seat types in **[Organization settings > Organization](https://claude.ai/admin-settings/organization)**, skip to the **[Chat and Chat + Claude Code seats section](#h_f6aa4f4dd2)**.

- If your organization is on a seat-based plan with **Standard** and **Premium** seats, skip to the **[seat-based plans section](#h_3b87de90bd)**.

- Chat-only seats and Standard/Premium seats are no longer available for new contracts—both legacy plan types are transitioning to the single Enterprise seat at their next renewal.

---

## Seat fees

All usage-based Enterprise plans (self-serve and sales-assisted) use the same seat pricing: **priced per user per month and billed annually**.

The seat fee gives each person access to Claude on web, desktop, and mobile, plus Claude Code and Cowork, but doesn't include any usage. Every token your team consumes is billed separately at standard API rates.

You're charged for the number of seats on your plan at the start of your annual billing cycle. If you add seats during your term, you're charged the prorated amount immediately for the remainder of the year.

**Example:** Your annual plan starts January 1 with 50 seats. You are charged upfront for the seats. On April 1, you add 10 seats. You'll be charged immediately for the remaining months.

**Note:** Seats cannot be removed mid-term on self-serve Enterprise plans. For step-by-step instructions on purchasing, adding, and managing seats, see **[Purchase and manage seats on Enterprise plans](https://support.claude.com/en/articles/13393991-purchasing-and-managing-seats-on-enterprise-plans)**.

---

## Usage billing and payment methods

On usage-based Enterprise plans, usage is charged separately from your seat fee and is based on actual token consumption at standard API rates. For current per-model pricing, see our **[API pricing page](https://www.anthropic.com/pricing#api)**.

**Important:** If your organization has the US-only inference setting turned on, usage is billed at 1.1x standard API rates for Claude Opus 4.6, Claude Sonnet 4.6, and later models. This applies to both self-serve and sales-assisted plans. Learn more about **[enabling US-only inference for your organization](https://support.claude.com/en/articles/15422948)**.

How and when you're billed for usage depends on your plan type:

### Self-serve Enterprise

**Usage billing**

Usage is purchased **upfront in credits**. Your credits draw down as your team uses Claude and Claude Code. When your credits run out, usage stops until an Owner, Primary Owner, or custom role with the **Billing** permission set to "Can manage" purchases more. Self-serve Enterprise plans are billed in USD only. If your organization needs to pay in another currency, **[contact our Sales team](https://claude.com/contact-sales)** to set up a sales-assisted plan.

- After setup, Owners, Primary Owners, and custom roles with the **Billing** permission set to "Can manage" can purchase additional credits at any time from **[Organization](https://claude.ai/admin-settings/organization)[settings > Usage](https://claude.ai/admin-settings/usage)**.

- All credits are shared across your organization—any team member can draw from the same pool.

**Note:** If you purchased your Enterprise plan through AWS Marketplace, billing works like sales-assisted plans. You're billed monthly in arrears based on your organization's consumption rather than purchasing credits upfront.

**Payment methods**

Self-serve Enterprise organizations can pay by credit card, debit card, or ACH bank transfer. Owners, Primary Owners, and custom roles with the **Billing** permission set to "Can manage" can switch between payment methods at any time in **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**.

For details on ACH, including activation timing and auto-reload, see **[What is the Enterprise plan?](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)**

### Sales-assisted Enterprise

**Usage billing**

Usage is **billed monthly in arrears** based on your organization's actual consumption during each billing period. You'll receive a monthly invoice reflecting usage for that period. Speak with your account manager for questions about your usage invoices.

**Payment methods**

Sales-assisted Enterprise organizations can pay by bank transfer (ACH or wire) or, for smaller invoices, by credit card. Invoices of $50,000 or more can only be paid by bank transfer (ACH or wire). The credit card option won't appear on the payment page for invoices at or above this amount. To pay a specific invoice by card, reach out to your Anthropic Contact to request an exception.

---

## How usage works across your team

Enterprise seats don't come with an individual token allowance. All usage across your organization is billed together at API rates, regardless of who consumed it.

What this looks like in practice depends on your plan type:

### Self-serve Enterprise

Everyone's usage draws from the same credit balance. One person's heavy usage depletes credits faster for everyone, so monitoring and spend limits matter here. When the balance hits zero, usage stops for the whole organization until an Owner purchases more.

### Sales-assisted Enterprise

There's no balance to deplete. Everyone's usage is metered and added to the same monthly invoice. One person's heavy usage doesn't block anyone else — it just increases what shows up on the bill. If you want a ceiling, set spend limits.

---

## Spend limits

Owners, Primary Owners, and custom roles with the **Billing** permission set to "Can manage" can set spend limits to manage your organization's consumption. This applies to both self-serve and sales-assisted plans.

To configure spend limits, navigate to **[Organization](https://claude.ai/admin-settings/organization)[settings > Usage](https://claude.ai/admin-settings/usage)**.

You can set limits at two levels:

- **Organization level:** Maximum spend for all usage across your organization.

- **Individual level:** Maximum spend for a specific user.

These limits work hierarchically, so a user cannot exceed their individual limit or the organization limit, whichever is lower.

On **self-serve plans**, spend limits work alongside your credit balance. If a user hits their individual limit or the organization limit, their usage will stop even if credits remain. Owners can adjust limits at any time.

On **sales-assisted plans**, spend limits prevent usage from continuing past the limit threshold. If a limit is reached, usage stops until the next billing period begins or an owner raises the limit.

**Owners can set limits to "unlimited,"** but consumption will still be billed. You cannot disable billing for usage—usage-based pricing is a core part of the Enterprise plan.

---

## Monitoring usage and spend

You can track your organization's usage and spending in a few places:

- **Organization** **settings > Usage:** View month-to-date spending for each member, current spend limit status, and credit balance (self-serve plans).

- **Monthly invoices:** Detailed usage per user for the billing period (sales-assisted plans).

- **Spend limit notifications:** Alerts when users or your organization approach configured spending thresholds.

---

## What happens when usage stops

If usage stops on your Enterprise plan, here's how Owners, Primary Owners, and custom roles with the **Billing** permission set to "Can manage" can resume:

- **Self-serve plans:** If credits run out or a spend limit is reached, purchase additional credits or raise the spend limit from **[Organization](https://claude.ai/admin-settings/organization)[settings > Usage](https://claude.ai/admin-settings/usage)**.

- **Sales-assisted plans:** If a spend limit is reached, you can raise the limit, or usage will resume at the start of the next billing period. Contact your account manager with questions.

---

## Chat and Chat + Claude Code seats

**Important:** Chat and Chat + Claude Code are legacy seat types that are no longer available for new Enterprise contracts. This section only applies to organizations that were provisioned with these seat types before the transition to the single Enterprise seat. If you recently signed a new Enterprise contract, the main sections of this article apply to you—your plan uses the single Enterprise seat.

Some existing usage-based Enterprise organizations currently have two seat types with different pricing. If you see **Chat** and **Chat + Claude Code** seats in **[Organization settings > Organization](https://claude.ai/admin-settings/organization)**, this section applies to you.

Seat fees are billed annually. Usage billing works the same way as described in the **[Usage billing section](#h_540cbc3861)** above: separately from seat fees, at API rates, and in arrears on sales-assisted plans.

### Transition to the single Enterprise seat

At your next contract renewal, your plan will automatically transition to the single Enterprise seat model. When that happens, all users — regardless of their current seat type — will move to the **Enterprise seat**. This seat includes Claude Code, Cowork, Chat and more.

If you have questions about your upcoming renewal, reach out to your Anthropic Contact or **[our Sales team](https://claude.com/contact-sales)**.

---

## Seat-based plans

**Important:** Standard and Premium are legacy seat types that are no longer available for new Enterprise contracts. This section only applies to organizations that were provisioned with these seat types before the transition to usage-based billing. If you recently signed a new Enterprise contract, the main sections of this article apply to you.

Some Enterprise organizations are on older seat-based plans with **Standard** and **Premium** seats. These plans charge a flat monthly fee per seat that includes a usage allowance, which is a different model than the usage-based billing described above.

If you see "Standard" and "Premium" seats in **[Organization settings > Organization](https://claude.ai/admin-settings/organization)**, this section applies to you.

On seat-based plans, usage credits are available to allow team members to continue working after reaching their seat's included limits. For details on how usage credits work and how they're billed on your plan, see **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-)**.

### Transitioning to usage-based Enterprise

At your next contract renewal, your plan will transition to the usage-based single Enterprise seat model described in this article. If you'd like to migrate before your renewal, reach out to your Anthropic Contact or **[our Sales team](https://claude.com/contact-sales)**.
---

SOURCE: https://support.claude.com/en/articles/11818288-why-am-i-being-asked-to-verify-my-payment-method

# Why am I being asked to verify my payment method?

If you see the following pop-up when you log in to your Claude account, you’ll need to click the “Verify now” button to verify your payment method:



## What happens if I click “Remind me later?”

Clicking “Remind me later” will dismiss the verification modal for 24 hours, after which you’ll be prompted again.
---

SOURCE: https://support.claude.com/en/articles/12004354-purchase-and-manage-seats-on-team-plans

# Purchase and manage seats on Team plans

Seat management allows Team plan owners to control their organization's seat allocation, assign users to different seat types, and manage billing. For pricing and billing details, see **[How is my Team plan bill calculated?](https://support.claude.com/en/articles/9267289-how-is-my-team-plan-bill-calculated)**

**Permissions note:** Only Owners and Primary Owners can purchase seats and access **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**. Admins and above can reassign seat types for members in **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

For information on adding and removing members from your organization, see **[Manage members on Team and Enterprise plans](https://support.claude.com/en/articles/13133750)**.

---

## Understanding seat types

Team plans offer two seat types:

| **Seat type** | **What's included**                                 |
| ------------- | --------------------------------------------------- |
| Standard      | Base features, usage limits, and Claude Code access |
| Premium       | Everything in Standard, plus higher usage limits    |

Organizations can mix and match seat types based on team needs. Assign Premium seats to power users who need more capacity, while keeping other team members on Standard seats.

Your plan has a total seat allocation (e.g., 30 Standard seats and 10 Premium seats). Within that allocation, you can assign and reassign users to different seat types as needed.

---

## Purchase new seats

**Important:** If you want to upgrade an existing member from Standard to Premium and already have Premium seats available, you don't need to purchase a new seat. Use the seat tier reassignment in **[Organization settings > Members](https://claude.ai/admin-settings/members)** instead. See **[Upgrade a Standard seat to Premium](#h_e7a7f4f396)** below.

Follow these steps to add seats to your plan's total allocation:

1. Log in with your Owner or Primary Owner account.

2. Navigate to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

3. Click "Manage" under "Total seats."

4. In the "Seat breakdown" modal, click "Add or change seats."

5. Click the "+" next to the seat type you want to add (Standard or Premium).

6. Click "Next" to review your purchase details and confirm the billing impact.

7. Check the confirmation box before continuing.

8. Click "Confirm & purchase" to complete the transaction.

**Note:** You can also purchase seats while adding a new member. The seat type selector only shows seat types your plan already owns—if all seats of the selected type are assigned, you'll be prompted to purchase one.

---

## Reduce your seat allocation

You can reduce the total number of seats on your Team plan:

1. Log in with your Owner or Primary Owner account.

2. Navigate to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

3. If needed, remove members or reassign them to free up the seats you want to eliminate.

4. Click “Manage” under **Total seats**.

5. Click “Add or change seats” in the **Seat breakdown** modal.

6. Click the "**-**" next to the seat type you want to reduce.

7. Click “Next” to review the changes.

8. Check the confirmation box and click "Confirm & purchase" to complete the change.

---

## Assign and reassign seat types

You can move users between Standard and Premium seats within your existing allocation.

To reassign a user's seat type:

1. Go to **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

2. Find the member you want to reassign.

3. Click the dropdown under **Tier**.

4. Select "Standard" or "Premium."

Members moved from Premium to Standard will have lower usage limits, and vice versa.

---

## Upgrade a Standard seat to Premium

Upgrading a member from Standard to Premium is a reassignment, not a new purchase. You don't need to buy an additional seat unless your Premium allocation is already full.

**Note:** The **Tier** dropdown only shows seat types your plan already owns. If your plan has zero Premium seats, Premium won't appear as an option yet. First add at least one Premium seat by following the steps in **[Purchase new seats](#h_f05a756e78)** above. Once your plan includes a Premium seat, you can select "Premium" from the dropdown.

1. Go to **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

2. Find the member assigned to a Standard seat you want to upgrade.

3. Click the dropdown under **Tier**.

4. Select "Premium."

If your plan includes Premium seats but they're all assigned, you'll be prompted to purchase an additional one at this point. The upgrade is prorated based on your billing cycle, and you'll be charged the price difference immediately.

### What if I don't have an available seat?

If your plan includes Premium seats but they're all assigned, reassigning another user to Premium will prompt you to purchase an additional Premium seat. If your plan has no Premium seats at all, see **[Purchase new seats](#h_f05a756e78)** above to add one first.

---

## Swap users between seat types

Selecting **No seat assigned** lets you temporarily remove a user from a seat without removing them from your organization. This is useful when you need to swap people between seat types within your existing allocation.

**Example:** You have five Premium seats, all assigned. You want to move User A (currently on Premium) to Standard, and move User B (currently on Standard) to Premium—without purchasing an additional seat.

1. Go to **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

2. Find User A and change their seat tier to "No seat assigned." This frees up one Premium seat.

3. Find User B and change their seat tier to "Premium." They now occupy the available Premium seat.

4. Find User A and change their seat tier to "Standard."

**Note:** Unassigned users remain members of your organization but cannot use Claude until they're assigned to a seat.

---

## Seat assignment with JIT or SCIM provisioning

**[Users provisioned via JIT or SCIM](https://support.claude.com/en/articles/13133195-setting-up-jit-or-scim-provisioning-to-manage-user-assignments-on-team-or-enterprise-plans)** are automatically assigned to the highest-available seat type when they're added. Admins and above can manually reassign seat types afterward in **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

You can also enable group mappings with JIT or SCIM to provision users directly to a specific seat type.

---

## Understanding billing

- **New seats** are prorated based on your billing cycle and charged immediately.

- **Seat type upgrades** (Standard → Premium) are prorated and charged immediately for the price difference.

- **Removing members** does not trigger an immediate credit or refund. The seat becomes available to assign to another member. To reduce your bill, you'll need to reduce your plan's total seat allocation.

For detailed billing calculations and examples, see **[How is my Team plan bill calculated?](https://support.claude.com/en/articles/9267289-how-is-my-team-plan-bill-calculated)**
---

SOURCE: https://support.claude.com/en/articles/12005970-manage-usage-credits-for-team-and-seat-based-enterprise-plans

# Manage usage credits for Team and seat-based Enterprise plans

This article explains how Team and seat-based Enterprise plan Owners and Primary Owners can purchase usage credits, allowing members to continue using Claude, Claude Cowork, and Claude Code after reaching usage limits for their assigned seat.

## What are usage credits?

Usage credits allow Team and seat-based Enterprise plan members on Standard and Premium seats to continue working with Claude, Cowork, and Claude Code after reaching their included usage limits. Instead of being blocked upon hitting limits, members can keep working without interruption.

**Important:** Usage credits don't apply to current usage-based Enterprise plans. On those plans, there's no included usage allowance to run out of—all usage is billed at API rates from the first token. For details on how usage and spend limits work on usage-based plans, see **[How am I billed for my Enterprise plan?](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan)**

---

## How usage credits work

After an organization Owner or Primary Owner configures your account for usage credits, you'll start using them as soon as you reach your seat's usage limit. Your subsequent usage will be billed at standard API pricing rates as you continue working.

**For Team plans:** Owners can pre-purchase usage credits that they can control using spend limits.

**For seat-based Enterprise plans:** Usage credits are billed at the end of each month based on your actual usage during the billing period.

---

## Enable usage credits

### For Team owners

1. Log in to your Team organization as an Owner or Primary Owner.

2. Navigate to **[Organization settings > Usage](https://claude.ai/admin-settings/usage)**.

3. Click "Enable" in **Usage credits** to turn this on for your organization.

4. You'll be prompted to pay for usage credits.

5. Next, you'll see the option to enable auto-reload; choose "Reload when balance reaches" and enter the amount to reload.

6. Set a monthly spend limit to apply organization-wide.

7. Enable usage credits for specific users or the entire organization.

### For seat-based Enterprise owners

1. Log in to your seat-based Enterprise organization as an Owner or Primary Owner.

2. Navigate to **[Organization settings > Usage](https://claude.ai/admin-settings/usage)**.

3. Click "Enable" in **Usage credits** to turn this on for your organization.

4. You'll be prompted to set monthly spend limits for the organization as a whole, by seat tier, or for individual members.

### How can members switch to usage credits once they're enabled?

Once an organization owner has enabled usage credits:

1. Continue using Claude or Claude Code normally.

2. When you reach your usage limit and choose to continue working, your usage credit consumption will be tracked and billed according to your plan type.

---

## Organization-wide spend limits

Owners and Primary Owners of Team and seat-based Enterprise plans can set organization-wide spend limits to ensure predictable costs while providing flexibility for critical work.

**Note:** If you're on an Enterprise plan, you can also set spend limits at the group level. See **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**.

### Spend limits

After navigating to **[Organization settings > Usage](https://claude.ai/admin-settings/usage)** and enabling this feature, Owners can set a monthly spend limit on the entire organization's usage credits. Setting a limit here controls total usage credit spend across your whole organization, regardless of individual or seat limits.

The **Usage and spend limits** section will show the current limit (if any) or **Unlimited**. Clicking on "Adjust limit" opens a modal where you can either input an amount and click "Set spend limit," or click "Set to unlimited" to remove the organization-wide monthly spend limit.



Changes to your organization’s overall spend limit go into effect immediately.

### Seat spend limits for seat-based Enterprise plans

Owners and Primary Owners on **seat-based Enterprise plans only** can set spend limits that apply to all users within a specific seat tier.



Select the "By group" tab to see **Standard seats** and **Premium seats** groups. Click the "..." icon next to the current limit, then "Edit limit." This opens a modal where you can either select "Set dollar amount" and input an amount, or click "Unlimited" to remove the limit for that seat type. Click "Set limit" to save your changes.



---

## User-level spend limits

Owners and Primary Owners can also set individual monthly spend limits for each member by finding **Spend limits by user** and clicking the "..." button next to the user, then "Edit limit."



Enter the amount and click "Set limit." Alternatively, selecting "Set to unlimited" will remove that member's monthly spend limit (they will still be subject to any organization or seat-level spend limits).



This allows owners fine control over usage credits, so you can set limits for different members based on their roles or individual needs. Once a user reaches their defined spend limit, this will automatically pause their usage credits until the end of the month. They will need to wait for their usage limits to reset before using Claude again.

Note that the **Spend limits by user** section has a **MTD Spend** column, so you can track members' usage patterns and optimize seat assignments.

---

## Usage credit pricing

Usage credits are billed at standard API rates; see our **[pricing page](https://claude.com/pricing#api)** for details.

Price and plans are subject to change at Anthropic's discretion.

---

## Request usage credits for seat-based Enterprise plans

Members of seat-based Enterprise plans will see a "Request usage credits" link upon hitting their included usage limit.

Click this to send a request to organization Admins to either switch you to a Premium seat (if you're currently assigned to a Standard seat) or enable usage credits for your user account. This will change to **Request sent to admin** after clicking it, indicating that you submitted a request for a seat tier increase or usage credits to an organization Admin.

Admins and Owners can review these requests in **[Organization settings > Usage](https://claude.ai/admin-settings/usage)**. Clicking into "Review requests" will open a modal where each requester is listed, along with their current seat, and the time they asked for more usage. Click "Increase limit" next to each request you want to approve. Admins and above will also receive a daily email including all your organization's outstanding requests.

### Disable usage credit requests

If you want to prevent users from submitting requests for usage credits, an organization owner can follow these steps:

1. Navigate to **[Organization settings > Usage](https://claude.ai/admin-settings/usage)**.

2. Scroll to the bottom of the page and find **Usage credit requests**.

3. Toggle it off.

---

## Frequently asked questions

### What happens when I reach my spend limit?

If your account is configured for usage credits and you exceed your set spend limit, you won't be able to use Claude, Cowork, or Claude Code again until the next billing period, or until your limits are adjusted.

### Why was I able to exceed my spend limit?

It's possible to slightly exceed your defined spend limit. Our system checks if you're within your limit before you're allowed to make a single request or send a message. Once the request is processed, we calculate your token consumption, which means you may bypass your limit with that request. Once this happens, any subsequent requests will be blocked.

### Can usage credits be disabled completely?

Yes, Owners and Primary Owners can choose to disable usage credits entirely, which means that members of the organization will be unable to continue working once they reach their usage limits and will need to wait for them to reset.
---

SOURCE: https://support.claude.com/en/articles/12083917-change-your-team-plan-from-monthly-to-annual-billing

# Change your Team plan from monthly to annual billing

Owners and Primary Owners of Team plans with monthly subscriptions can switch from the monthly plan to an annual plan by following these steps:

1. Navigate to **[Organization settings > Billing](https://claude.ai/admin-settings/billing)** or **[claude.ai/upgrade](http://claude.ai/upgrade)**.

2. You’ll see a banner confirming your current monthly plan in your Billing settings; click the “Switch to Annual” button.

3. Or from /upgrade, click the “Switch to Annual plan” button:



4. The confirmation screen will display the total cost for your upgrade from monthly to annual billing:



5. Click “Confirm subscription.”

6. Your new annual Team plan will start immediately and you will be credited for any unused time on your previous monthly plan.
---

SOURCE: https://support.claude.com/en/articles/12386328-requesting-a-refund-for-a-paid-claude-plan

# Requesting a refund for a paid Claude plan

**Important:** Except as expressly provided in our **[Consumer Terms of Service](https://www.anthropic.com/legal/consumer-terms)** or where required by law, all payments are non-refundable.

To request a refund for a payment defined as refundable in our Terms of Service, follow these instructions:

1. Log in to your account and click on your initials or name in the lower left corner.

2. Select "Get help" from the menu to open a messenger on the right side of the window.

3. Click the "Send us a message" button.

4. Click "Accept," then "Claude Refund Request" from the available options.

5. Select your refund reason from the available options.

6. Follow the prompts to check your refund eligibility.

7. If eligible, continue in the support messenger to cancel and refund your plan.

---

## Refunds for customers in the European Economic Area (EEA) and the United Kingdom (UK)

In the European Economic Area and the United Kingdom, you may receive a refund within 14 days of purchase. You may find this option available in your **Settings**. Your refunds will be prorated according to your use.

---

## What should I do if I can't access the account I'm requesting a refund for?

If you're unable to log in to the account associated with your payment (for example, if you can't access the email account you used to sign up), you'll need to **[contact our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)** using another email and 'cc' the email address tied to the account you can't access. Write back to cancel your paid plan and request a refund so our team can assist.
​﻿

## I paid for my plan on Claude for iOS—what's the process for requesting a refund?

If you paid for your plan on **[Claude for iOS](https://support.claude.com/en/collections/9879000-claude-for-ios)**, this means your subscription was started from the Apple App Store. We didn't process this payment, so you will need to reach out to **[Apple Support](https://support.apple.com/billing)** to request a refund.

## I paid for my plan on Claude for Android—what's the process for requesting a refund?

If you have an active subscription purchased on **[Claude for Android](https://support.claude.com/en/collections/9879004-claude-for-android)**, our Support team will need to check your eligibility before assisting with a refund. When contacting us, provide any relevant details upfront so our team can help with your request. However, if you are requesting a refund for an inactive subscription, our team won't be able to issue refunds for historical payments made through the Play Store. Please get in touch with **[Google Support](https://support.google.com/googleplay/workflow/9813244?hl=en)** for further assistance.

## How do I request a refund when I'm disputing the payment?

Our Support team cannot process refunds during pending disputes, as the disputed funds are pulled back immediately. You can choose to either continue working with your bank until the dispute is resolved, or to withdraw the bank dispute, which will allow us to process a refund.
---

SOURCE: https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans

# Manage usage credits for paid Claude plans

This article explains how usage credits work on your paid Claude plan (Pro, Max 5x, or Max 20x), allowing you to continue working with Claude after reaching your plan's usage limits by switching to pay-as-you-go pricing.

## What are usage credits?

Usage credits allow individuals subscribed to paid Claude plans (Pro, Max 5x, and Max 20x) to continue using Claude seamlessly after reaching their included usage limits. Instead of being blocked when you hit your session limits, you can switch to consumption-based pricing at standard API rates and continue your work without interruption.

**Note:** If you subscribed through one of the Claude mobile apps, you can only enable usage credits on the web version of Claude. You will need to add your payment method before enabling and purchasing usage credits on the web.

---

## How usage credits work

When you reach your plan’s usage limit with usage credits enabled:

- You’ll see a notification that you’ve reached your session usage limit.

- If usage credits are enabled and you have funds available, you can choose to continue working.

- Your subsequent usage will be billed at standard API pricing rates.

- Your session limits reset every five hours as usual.

**Note:** Usage credits are charged separately from your paid Claude subscription and appear as additional charges on your bill.

---

## Enabling usage credits

To enable usage credits on your paid Claude plan:

1. Navigate to[**Settings > Usage**](https://claude.ai/settings/usage) in your Claude account.

2. Locate the **Usage credits** section.

3. Click "Enable" to turn on usage credits.

4. Set up your payment method if not already configured.

5. Configure your spending preferences.

6. Click “Adjust limit” to control costs with a monthly spend limit. You can also select “Set to unlimited” if you prefer no spending restrictions.

7. You’ll then need to prepay to cover usage beyond your plan limits. Click “Add funds,” enter the amount you want to purchase in the modal, then click “Purchase.”

8. You can also enable auto-reload to automatically make a purchase when your balance falls below a threshold you set:



**Note:** There is a daily redemption limit of $2000.

---

## Set spend limits

Control your usage credit spending with:

- **Monthly spending cap:** Set a maximum amount you're willing to spend on usage credits each month.

- **Auto-reload settings:** Automatically add funds when your balance drops below a threshold.

- **Usage alerts:** Receive notifications when approaching your spend limits.

---

## Usage credit pricing

Usage credits are billed at standard API rates; see our **[pricing page](https://claude.com/pricing#api)** for details.

Price and plans are subject to change at Anthropic's discretion.

---

## Managing your usage credits

### Monitoring usage and costs

Track your usage credits through:

- **Usage dashboard:** View real-time consumption in **[Settings > Usage](https://claude.ai/settings/usage)**.

- **Current spending:** Monitor your month-to-date usage credit costs.

- **Usage history:** Review past consumption patterns to optimize future usage.

## Tips for cost-effective usage

To manage usage credit costs while maintaining productivity:

- **Choose efficient models:** Use our most efficient Haiku model, or the most recent Sonnet model for most tasks. These provide excellent performance at lower token costs than Opus models.

- **Use your plan’s included usage first:** Plan intensive work sessions around your five-hour usage windows.

- **Start new conversations:** Begin fresh chats for new topics to minimize the size of your context window.

- **Use projects effectively:** Store frequently referenced documents in project knowledge instead of re-uploading.

- **Set appropriate limits:** Start with conservative spending caps and adjust based on your needs.

---

## How usage credits work with other features

### Claude Code

Usage credits apply to both Claude conversations and Claude Code terminal usage. Your combined usage across both interfaces counts toward your limits.

### Research mode

When using Research mode, usage credits apply once you exceed your plan's included limits. Research sessions may consume tokens more quickly due to multiple searches and comprehensive analysis.

### Projects and files

Documents stored in project files count toward your context when used in conversations. Usage credits apply to all tokens processed, including project content.

---

## Frequently asked questions

### Can I disable usage credits after enabling them?

Yes, you can disable usage credits at any time through **[Settings > Usage](https://claude.ai/settings/usage)**. Once disabled, you'll only have access to your plan's included usage.

### How quickly do my regular usage limits reset?

Your plan’s included usage limit will reset every five hours once you reach it. Usage credits don’t affect this reset timing.

### I subscribed to a paid Claude plan on the App or Play store; how can I access usage credits?

If you purchased your paid plan through one of the Claude mobile apps, usage credits are only available if you enable and purchase them on the Claude web app. You will not be able to set up usage credits on the mobile app.

### Can I track usage credits separately from my included usage?

Yes, the usage dashboard clearly distinguishes between your included plan usage limits and any usage credit consumption.

### Will I get a warning before switching to usage credits?

Yes, you’ll see a clear notification when approaching and reaching your included usage limits, with a confirmation that you’ll continue with usage credits.
---

SOURCE: https://support.claude.com/en/articles/12883420-view-usage-analytics-for-team-and-enterprise-plans

# View usage analytics for Team and Enterprise plans

This article explains how to view and export usage analytics for your organization.

Usage analytics are available to Team plan Owners and Primary Owners, and Enterprise plan Owners, Primary Owners, and Admins. Enterprise Admins can view all analytics except Spend.

Usage analytics help you track team activity, feature adoption, and spend directly from your admin dashboard. You can monitor how your organization uses Claude and export detailed reports for your own analysis.

Primary Owners and Owners can access analytics via dedicated Analytics settings by clicking your initials in the lower left corner and selecting **[Analytics](https://claude.ai/analytics/activity)** from the menu. Additionally, the Chat, Claude Code, Claude Design, and Cowork options offer product-specific analytics.

---

## Overview

This page includes the following analytics:

### Summary

- Weekly active members

- PRs created in Code

- Sessions in Cowork



### Who’s using Claude?

- Active members and assigned seats

- Groups

- Members

Use the dropdown on the **Active members and assigned seats** chart to filter by product, including Claude Design.



### How are they using Claude?

- Adoption level

- Product stickiness

- Skills

- Connectors

- How agentic is their work? (beta)





### What are the results?

- PRs created

- Designs created

- File operations

- Conversations

- MCP writes

- Estimated time saved



### How much is Claude costing?

**Note:** If you're on a **[seat-based Enterprise plan](https://support.claude.com/en/articles/13393991-purchase-and-manage-seats-on-enterprise-plans#h_6a78e30e26)**, spend reports only appear if your organization has **[enabled usage credits](https://support.claude.com/en/articles/12005970-)**. The spend data covers overage spend only—usage within seat-based allotments isn't included.

This section includes the following analytics:

- Usage limits

- Spend concentration

- Total spend (month-to-date, quarter-to-date, year-to-date, 1 year)—the graph shows your actual spend and list price

- Spend by model (month-to-date, quarter-to-date, year-to-date, 1 year)





## Export a spend report

You can export a detailed spend report as a CSV file. The report provides per-user, per-model visibility into token usage and estimated spend within a selected time period, updated daily.

To export spend data:

1. Navigate to **[Settings > Analytics](https://claude.ai/analytics/activity)**.

2. Scroll down to the **How much is Claude costing?** section.

3. Click the "Export spend report" button.

4. Select a time period: MTD, Last Month, Last 90 Days, or Custom.

5. If you select "Custom," choose your start and end dates. You can go back up to 90 days, and the most recent data available is from yesterday.

6. Click "Download."

### What's included in the report?

Each row in the CSV represents a specific person's usage of a specific model, with spend summed across the entire date range selected for the export. The report includes the following fields:

- User's email

- Account UUID

- Product (such as Chat, Claude Code, Cowork, or Office Agents)

  - Office Agents aggregates usage from the Claude add-ins for Excel, PowerPoint, and Word.

- Model and model family

- Request count (`total_requests`)

  - The count of individual API calls made to Claude. Each time an app or user sends a message and gets a response, that counts as a request.

- Prompt tokens (`total_prompt_tokens`)

  - The number of tokens consumed by the input side of each request. This includes system prompts, conversation history, user messages, tool definitions, etc.

- Completion tokens (`total_completion_tokens`)

  - The number of tokens generated by Claude when it responds*,* including extended thinking tokens.

- Net spend (`total_net_spend_usd`)

  - Your cost (in USD) after any discounts, credits, or negotiated rates are applied. This is what you actually spent.

- Gross spend (`total_gross_spend_usd`)

  - Your cost (in USD) before any discounts or credits.

Analytics chat, the Analytics API, and exported spend reports from the analytics dashboard should closely match your invoice. The cost and usage endpoints of the Analytics API export include both discounted price and list price.

**Note:** Some activity previously grouped under Claude Code, including Code Review and security features, now appears as separate line items.

**Important:** Spend data refreshes daily and has a one-day delay. For usage-based Enterprise plans, the export captures your organization's full usage. For seat-based Enterprise plans with usage credits enabled, **the export only reflects spend that exceeds your seat allotment.**

---

## Claude Chat

Navigate to **[Analytics > Claude Chat](https://claude.ai/analytics/usage)** to view usage and activity metrics for your organization. This page includes the following analytics:

### Chats

- Chats per day

- Percentage of users with 1 or more chat

- Total number of chats (1 week, 1 month, 3 months, 1 year)

- Top members by chats



### Projects

- Projects created per day

- Percentage of users with 1 or more project

- Projects listed with the number of users, conversations, and messages associated with each one.

- Top members by project usage



### Artifacts

- Artifacts created per day

- Percentage of users with 1 or more artifact

- Top 10 users by artifacts generated (month-to-date, quarter-to-date, year-to-date, 1 year)



---

## Claude Code

Navigate to **[Analytics > Claude Code](https://claude.ai/analytics/claude-code)** to view usage and value metrics for Claude Code across your organization. The page has three tabs.

### Productivity

- PRs with Claude Code

- LOC with Claude Code

- Adoption

- Total PRs per user

- Pull requests / lines of code

- Suggestion accept rate

- Lines of code accepted

- Leaderboard (Pull requests / lines of code) with an option to export users

### Usage

- Users with skills

- Known MCP servers

- Top skills

- Top MCP servers

- Tool usage

- Feature adoption

- Sessions by agent type

Usage data refreshes daily.

### Value

- Estimated productivity lift

- Time recovered (annual)

- Cost per commit

- Cost per PR

- Cost per session

- Top spenders

- Spend concentration

- Automation leverage

- Observed metrics

- Calibrations

Every formula on the Value tab is shown inline, and you can adjust the inputs to match your organization's assumptions.

For contribution metrics, GitHub setup, and per-developer detail, refer to[**Claude Code usage analytics**](https://support.claude.com/en/articles/12157520-claude-code-usage-analytics).

---

## Claude Design

Navigate to **[Analytics > Claude Design](https://claude.ai/analytics/claude-design)** to view usage and activity metrics for Claude Design across your organization. This page includes:

- Daily, weekly, and monthly active users

- An active users chart showing daily and weekly trends (1 week, 1 month, 3 months, 1 year)

Data is shown in UTC and refreshes daily.

**Note:** Claude Design must be enabled for your organization. On Enterprise plans with the Analytics API enabled, Claude Design analytics are also available in the **[Analytics API](https://platform.claude.com/docs/en/manage-claude/analytics-api#get-access-to-the-claude-enterprise-analytics-api)**.

---

## Cowork

Navigate to **[Analytics > Cowork](https://claude.ai/analytics/cowork)** to view usage and activity metrics for Claude Cowork across your organization. This page includes:

- Cowork sessions per day

- Percentage of users with one or more Cowork sessions

- Daily, weekly, and monthly active Cowork users



**Note:** Cowork analytics are available alongside Chat and Claude Code data in the **[Analytics API](https://platform.claude.com/docs/en/manage-claude/analytics-api)**.

---

## View your own usage as a member

When your admin turns on individual usage analytics, any member of the organization can see their own usage broken down by product, model, and skill, along with where they stand against any spend limits set for them. Individual usage analytics are available in **[Settings > Usage](https://claude.ai/settings/usage)**.



---

## Turn individual usage analytics on or off

**Note:** Individual usage analytics is off  by default, but will be on by default starting on July 11, 2026. If you want to keep member-level visibility off, change the setting on or after July 11.

Owners and Primary Owners control whether members can see this view. The setting applies to the whole organization.

1. Navigate to **[Organization settings > Usage](https://claude.ai/admin-settings/usage)**.

2. Find the **Member analytics** toggle.

3. Switch it on or off.

---

## Access your analytics data programmatically

If you’re on an Enterprise plan and want to pull analytics data into your own dashboards or reporting tools, the Analytics API gives you programmatic access to the same usage and engagement metrics available in the analytics dashboard. To get started, refer to our **[Analytics API docs](https://platform.claude.com/docs/en/manage-claude/analytics-api)**.
---

SOURCE: https://support.claude.com/en/articles/12938627-how-to-gift-a-claude-subscription

# How to gift a Claude subscription

Give the gift of Claude to friends, family, or colleagues.

## What's included?

Gift subscriptions include full access to all features of the selected plan. Refer to the below articles for full details for each plan:

- **[What is the Pro plan?](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan)**

- **[What is the Max plan?](https://support.claude.com/en/articles/11049741-what-is-the-max-plan)**

## Who can purchase gifts?

Gift subscriptions are available for most Pro and Max plan users to purchase. Free users and members of Team and Enterprise organizations can't purchase gift subscriptions at this time.

## How to purchase a gift

1. Log in to your Claude account and click your initials in the lower left corner.

2. Select “Gift Claude” from the menu, or visit claude.ai/gift.

3. Choose a plan (Pro, Max 5x, or Max 20x) and duration (1, 3, 6, or 12 months).

4. Personalize your gift:

  - Pick a card color

  - Add an optional message

  - Choose to send via email or generate a shareable link

5. If sending by email, enter the recipient's name and email address.

6. Complete checkout with your payment information.

After purchase, you'll receive a confirmation email with your order details.

**Important:** The gift will expire 365 days after the purchase date. Recipients cannot redeem multiple gifts at one time or stack redemptions.

## Delivery options

**Email delivery:** The recipient receives the gift directly in their inbox. The email includes your personalized message and a redemption button.

**Shareable link:** You receive a link that you can share however you'd like—in a card, text message, or in person.

## Good to know

- Gift subscriptions are available globally.

- Recipients redeem gifts on the web at **[claude.ai/gift/redeem](https://claude.ai/gift/redeem)**. For more information, see **[How to redeem a Claude gift subscription](https://support.claude.com/en/articles/12938695-how-to-redeem-a-claude-gift-subscription)**.

- Recipients with active mobile (iOS or Android) subscriptions will need to wait until their mobile subscription ends before redeeming.

- No credit card is required for the recipient to redeem.
---

SOURCE: https://support.claude.com/en/articles/12938695-how-to-redeem-a-claude-gift-subscription

# How to redeem a Claude gift subscription

Someone sent you a Claude gift subscription—here's how to redeem it and start using Claude.

## How to redeem your gift

1. Open the gift email or link you received.

2. Click “Redeem your gift.”

3. Sign in to your Claude account, or create a new account if you don't have one.

4. Confirm redemption.

5. You can also redeem directly at [claude.ai/gift/redeem](https://claude.ai/gift/redeem) and enter your gift code.

**Important:** Your gift will expire 365 days after the purchase date. It’s not possible to redeem multiple gifts at one time or stack redemptions.

## What happens when you redeem

Your experience depends on your current subscription status:

**If you're a new or free user:** Your account is upgraded to the gifted plan immediately. You'll have full access for the duration of the gift.

**If you're a Pro subscriber (web) and receive a Pro gift:** Your Pro subscription is extended by the gift duration.

**If you're a Pro subscriber (web) and receive a Max gift:** You're upgraded to the Max plan for the gift duration. When the gift ends, your Pro subscription resumes. Any unused time from your Pro billing cycle is added as account credit.

**If you're a Max subscriber (web) and receive a lower-tier gift:** The gift value is converted to account credit, which is automatically applied to your future invoices.

**If you're a Max subscriber (web) and receive the same or higher Max tier:** Your Max subscription is extended or upgraded accordingly.

## Mobile Subscribers

If you have an active subscription through the iOS App Store or Google Play Store, you'll need to wait until that subscription ends before you can redeem a gift subscription. Gift subscriptions can only be redeemed on the web.

Your gift won't expire while you wait—you can redeem it once your mobile subscription ends.

## Troubleshooting

### I don't see the redemption email

Check your spam or junk folder. If you still can't find it, ask the person who sent the gift to confirm your email address or resend the gift link.

### I'm getting an error when trying to redeem

Make sure you're signed in to Claude on the web (not the mobile app).

### Can I use the gift on a different email address?

The gift can be redeemed by any Claude account, regardless of which email received the gift.
---

SOURCE: https://support.claude.com/en/articles/12997130-understanding-your-billing-address-and-tax-calculation

# Understanding your billing address and tax calculation

Your billing address determines how taxes are calculated on your Claude purchases. This address should represent the primary place of business receiving the product.

## How billing addresses work by plan type

### Pro, Max, and self-serve Team plans

Your billing address is automatically set to match your payment method's billing address. To update it, navigate to [Settings > Billing](http://claude.ai/settings/billing) and click “Update” to the right of your current payment method.

### Sales-assisted Team plans and Enterprise plans

You can update your billing address directly in Settings → Billing → Billing Addresses. Changes take effect immediately for future invoices.

### API (usage tiers / self-serve)

Your billing address is tied to your payment method. Update your payment method by navigating to [Settings > Billing in the Claude Console](https://platform.claude.com/settings/billing) and clicking the pencil icon to the right of your current card number to change your billing address.

### Paid API contracts

You can update your billing address directly in the Claude Console under Settings → Billing → Billing Addresses.

## Requesting a different billing address

If you need a billing address that differs from your payment method address, contact our Support team with documentation verifying your primary business location:

- **Non-US customers:** VAT registration certificate matching your requested location

- **US customers:** State of incorporation, business license, or tax ID documentation

Once verified, your billing address won't automatically update when you change payment methods.
---

SOURCE: https://support.claude.com/en/articles/12997503-team-plan-billing-faqs

# Team plan billing FAQs

## What payment methods can I use to pay for the Team plan?

Accepted payment methods are credit, debit, or prepaid cards. Other forms of payment, including ACH bank transfers, are not accepted at this time.

## How do I update my billing information and payment method?

An organization Owner can update your Team plan’s payment method by navigating to **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**.

**Note:** Your billing address determines your tax jurisdiction. See **[Understanding your billing address and tax calculation](https://support.claude.com/en/articles/12997130-understanding-your-billing-address-and-tax-calculation)** for details on how to view or update your billing address.

## How can I change my billing email address?

Your organization's billing address determines where your invoices are sent. You can request to change this email address, or add additional billing email addresses, by **[contacting our Support team](https://support.claude.com/en/articles/9015913-how-to-get-support)**. Note that an organization Owner must authorize any changes to your billing address. For additional invoice recipients, the account Owner must be copied on the request. Once approved, all future invoices will be sent to the new email address(es).

## How can I use a different name on my invoices?

If you want to use a name other than the one tied to your payment method, an organization Owner should check the "Use a different name on invoices" box when adding or updating your payment method in **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**:



## When will I be billed?

Your payment method on file will be charged at the beginning of your billing cycle. The amount will be based on the number of members on your team at the beginning of the billing cycle. If you add or remove members from your team during the billing cycle, you will be credited or charged the prorated amount immediately. See **[How is my Team plan bill calculated?](https://support.claude.com/en/articles/9267289-how-is-my-team-plan-bill-calculated)** for more information about Team plan pricing.

## Where can I find the invoice or receipt for my Team plan payment?

An organization owner can follow these steps to access invoices:

1. Navigate to **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**.

2. Find the **Invoices** section.

3. Click the "View" button next to the invoice you want to open.

4. A new Stripe tab will open.

5. Click "Download invoice."

All invoices are automatically emailed to your organization's billing email address(es), so recipients can also search using the subject line "Your receipt from Anthropic" to find previous invoice emails.

## My organization is tax-exempt; how can I remove the tax from our monthly invoices for our Team plan account?

It's not currently possible to create a tax-exempt Team plan account while signing up. However, after subscribing to the Team plan, you can send your tax-free verification document to our Support team for review. After our Billing team reviews the document, we can manually mark your billing account as exempt and issue a credit note to refund any tax charges.

Please click on the message icon in the bottom right of our Help Center to contact our Support team and share the relevant documentation.

## My Team plan access is no longer active and I want to resubscribe.

An organization owner can resubscribe for Team plan access by navigating to **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**.
---

SOURCE: https://support.claude.com/en/articles/13133750-manage-members-on-team-and-enterprise-plans

# Manage members on Team and Enterprise plans

This guide covers how to add, remove, and manage the people on your Team or Enterprise plan.

**Permissions note:** Organization Admins can manage members in **[Organization settings > Members](http://claude.ai/admin-settings/members)**, but only Owners and Primary Owners can access **[Organization](https://claude.ai/admin-settings/organization)[settings > Billing](https://claude.ai/admin-settings/billing)**. For more information, see our article about **[roles and permissions](https://support.claude.com/en/articles/9267276-roles-and-permissions)**.

For information on purchasing seats or adjusting your plan's seat allocation, see our guides for **[Team plans](https://support.claude.com/en/articles/12004354-purchasing-and-managing-seats)** and **[Enterprise plans](https://support.claude.com/en/articles/13393991-purchasing-and-managing-seats-on-enterprise-plans)**.

---

## Add members

### Add members by invitation

**Note:** Pending invitations occupy your available seats immediately; a new member does not need to accept the invite to take up a seat.

Admins and above can add members by following these steps:

1. Navigate to **[Organization settings > Members](http://claude.ai/admin-settings/members)** and click “Add member.”

2. Enter the person's email address (it must use one of your organization's **[allowed email domains](https://support.claude.com/en/articles/13325567-account-management-faqs#h_b54c41c86c)**).

3. Select the appropriate seat type.

4. Set the role and permissions for the member.

  1. **Note:** On Enterprise plans, you can also select “Custom” as a member’s role. Members set to this role have their access controlled through group memberships and custom roles. To see exactly what a custom role member can access, open the “**⋮**” menu on the right side of their row and select "View effective role." For details, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

5. Click “Add members.”

This sends an email invitation to the person. The invitation expires after 21 days, so you'll need to re-invite them if they don't accept within that time period.

**Add multiple members at once:** You can invite multiple members by clicking "Bulk add" and typing or pasting email addresses separated by commas or new lines.

**Note:** The seat type selector only shows seat types your plan already owns. If all seats of the selected type are assigned, you'll be prompted to purchase one. See our guides for **[Team plans](https://support.claude.com/en/articles/12004354)** and **[Enterprise plans](https://support.claude.com/en/articles/13393991)** for more information.

### Add members via organization discovery

Members can also join your organization on their own through organization discovery. When you enable discoverability, colleagues with a matching email domain can find your organization during signup and request to join—no invitation needed. You can configure whether they're added automatically or require your approval. See **[Find and join a Team or Enterprise organization](https://support.claude.com/en/articles/13566435-organization-discovery)** for details.

### Share an invite link

Admins and above can generate a shareable invite link and distribute it to teammates—for example, by posting it in a Slack channel, email thread, or team wiki—without needing to enter individual email addresses.

**Availability:**

- **Team plans:** Invite links are enabled by default for new organizations.

- **Enterprise plans (non-SSO):** Invite links are disabled by default. Admins can enable them in **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

- **SSO organizations:** Invite links are not available. Member provisioning is managed through your Identity Provider.

To find and copy your invite link, navigate to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**. New members who join via link are assigned to the lowest available seat tier, defaulting to a standard seat if none are available.

Admins can disable the link at any time—this immediately invalidates all existing links. Regenerating the link also invalidates the previous one.

For more details on how the joining flow works, see **[Join an organization via invite link](https://support.claude.com/en/articles/13776697-join-an-organization-via-invite-link)**.

### Automated provisioning with SSO

Organizations with single sign-on (SSO) configured can automate member provisioning. Learn more about **[setting up SSO](https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso-for-claude-and-claude-console)**.

- **Just-in-time (JIT) provisioning:** Members assigned to the Anthropic app in your Identity Provider will have accounts created automatically the first time they log in. On plans with multiple seat types, users are assigned to the highest-available seat type upon first login. On single-seat Enterprise plans, users are automatically assigned the Enterprise seat. Admins and above can manually reassign seat types afterward in **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

- **SCIM provisioning (Enterprise plan only):** With SCIM directory sync enabled, members assigned to the Anthropic app in your Identity Provider are provisioned automatically, up to the number of total seats on your plan. On plans with multiple seat types, seat types are distributed from highest to lowest available. On single-seat Enterprise plans, all users are automatically assigned the Enterprise seat. Primary Owners and Owners can reassign seat types afterward in **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

**Important:** An Owner or Primary Owner must ensure seats are available before new users can be provisioned. We recommend monitoring your seat usage and adding seats proactively to ensure uninterrupted access for your team. You can **[enable group mappings with JIT or SCIM](https://support.claude.com/en/articles/13133195-setting-up-jit-or-scim-provisioning#h_adee31eeba) to provision users directly to a specific role and seat tier**.

---

## Member-to-member invites

Organization members can invite teammates by email, even if they aren't admins. This makes it easier for your team to grow organically without requiring admin involvement for every new member.

### How it works

Any member can access the invite flow from the account selector in Claude. They enter a teammate's email address and submit the invite. What happens next depends on your organization's new member approval setting:

- **Approve one-by-one (default):** The invite request goes to an admin for review. The invite is only sent to the teammate after an admin approves it.

- **Approve automatically:** The invite is sent right away and the invitee can join immediately.

Invites sent by members follow the same domain restrictions as other join methods — the invitee's email must match one of your organization's allowed domains.

### Availability

- **Team plans:** Member-to-member invites are enabled by default for new organizations.

- **Enterprise plans:** Member-to-member invites are disabled by default. Admins can enable them from Admin settings.

### Admin controls

Admins can enable or disable member-to-member invites from the admin settings. When disabled, only admins can send invitations. Invitees added through member invites are assigned the default member role and placed in the lowest available seat tier.

---

## Remove members

You can remove a member by navigating to **[Organization settings > Members](http://claude.ai/admin-settings/members)**, clicking the menu button to the right of the member, then selecting "Remove from team."

For Enterprise organizations using SCIM provisioning, members are automatically removed from Claude when they are removed from your Identity Provider.

When a member is removed:

- They lose access to the organization immediately.

- The seat they occupied becomes available to assign to another user.

- If you re-add the member later using the same email address, their account history will be maintained.

Removing a member frees up their seat for reassignment, but does not automatically reduce your plan's total seat count. See our guides for **[Team plans](https://support.claude.com/en/articles/12004354-purchasing-and-managing-seats)** and **[Enterprise plans](https://support.claude.com/en/articles/13393991-purchasing-and-managing-seats-on-enterprise-plans)** for information on reducing seats.

**Note:** You cannot remove yourself as a Primary Owner or Owner. Another Primary Owner or Owner must remove you from the team.

---

## Export member data

Admins and above can export a CSV of your organization's current member list from your organization settings.

The export includes member details such as name, email address, role, and seat type. This is useful for auditing membership, reconciling seat usage, or maintaining an external record of your team.

To export:

1. Navigate to **[Organization settings > Members](http://claude.ai/admin-settings/members)**.

2. Click the "Export CSV" button at the top of the **Members** section.

3. A CSV file will download to your device.

---

## Manage invitations

### Resend an expired invitation

You can resend an invite from **[Organization settings > Members](http://claude.ai/admin-settings/members)**. Click the “Pending” tab, find the member, and select to resend the invite.

### Revoke a pending invitation

You can revoke a pending invite from **[Organization settings > Members](http://claude.ai/admin-settings/members)**. Click the “Pending” tab, find the member, and select "Remove from team."

---

## Frequently asked questions

### Can I invite someone who already uses Claude personally with their work email?

Yes. Once they join your team, they'll have both a personal account and a Team or Enterprise plan account. They can toggle between accounts through the menu by clicking their initials or name in the lower left corner.

### How do I add a member that I previously removed?

To add a member that you previously removed, follow the same steps as adding a new member. Their account history will be maintained.

### How do I change the Primary Owner?

The current Primary Owner can transfer ownership by:

1. Navigate to **[Organization settings > Members](http://claude.ai/admin-settings/members)**.

2. Click the Role dropdown next to the new user and select "Primary Owner."

3. Type the new Primary Owner's email address in the modal to confirm and transfer ownership.

**Important:** There can only be one Primary Owner per organization. Following these steps transfers the role to a different user.

### What happens to the initial invitation for a new Enterprise organization?

When Anthropic provides a new Enterprise organization and invites the Primary Owner, the same 21-day expiration period applies to that initial invitation. If your invitation has expired, please reach out to your account manager.
---

SOURCE: https://support.claude.com/en/articles/13296973-hipaa-ready-enterprise-plans

# HIPAA-ready Enterprise plans

This feature is available for Enterprise plans only (both self-serve and sales-assisted).

We offer a HIPAA-ready version of Claude that is available for organizations on Enterprise plans that choose to process protected health information (PHI) through Claude. This article explains what the offering includes, which features are available, and how to get started.

## Overview

The HIPAA-ready Enterprise offering is designed for healthcare providers, health plans, healthcare data processors, and their business associates who are subject to HIPAA requirements. This offering includes a Business Associate Agreement (BAA), functionality, and safeguards designed to support an organization's HIPAA compliance requirements.

## Who is this for?

This offering is designed for HIPAA-covered entities and their business associates, including:

- Healthcare providers (e.g., hospitals, clinics, physicians)

- Health plans and insurers

- Healthcare data processors

- Business associates that handle PHI on behalf of covered entities

- Other HIPAA regulated entities

If you're unsure whether your organization benefits from a HIPAA-ready product, ask yourself: will you be processing protected health information through Claude? If yes, you need the HIPAA-ready offering with a BAA.

## Feature availability

The HIPAA-ready Enterprise offering includes many of the features available on **[standard Enterprise plans](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)**—but enabling HIPAA doesn't bring every feature under your BAA. Features fall into three categories: covered by your BAA, available but not covered, and disabled. PHI should only be processed through covered features, so it's important for administrators to know which features fall in which category and to configure their workspace accordingly. The **[Implementation Guide for HIPAA Entities](https://trust.anthropic.com/resources?s=rgirr4qe8u7ek8c2igx3&name=claude-for-enterprise-hipaa-ready-offering-implementation-guide)** on the Anthropic Trust Center lists every feature's status and is the authoritative source.

**Important:** Enabling HIPAA readiness alone doesn't bring Claude Code under your BAA. Claude Code is covered under your BAA only with zero data retention (ZDR) enabled, and only on qualified accounts. Without ZDR, Claude Code remains available to use but isn't covered—including when Claude Code access is bundled into your Enterprise seats. To explore Claude Code coverage, contact your Anthropic account team or our **[Sales team](https://www.anthropic.com/contact-sales)**.

Additionally, Cowork is not yet covered under Anthropic’s BAA.

## Additional resources

For detailed implementation requirements and technical specifications, review the **[Implementation Guide for HIPAA Entities](https://trust.anthropic.com/resources?s=rgirr4qe8u7ek8c2igx3&name=claude-for-enterprise-hipaa-ready-offering-implementation-guide)** on the Anthropic Trust Center. You can download the Implementation Guide directly during the setup flow.

**Note:** You'll need to request access to view the Implementation Guide. Requests from domains matching existing customer accounts are approved automatically.

---

## Get started

Eligible Enterprise organizations can enable HIPAA-ready configuration directly from organization settings—no sales or legal cycle required. The Business Associate Agreement (BAA) is included in the flow as click-to-accept, so there's no separate document to sign and return. Clicking “Accept and Enable HIPAA” constitutes acceptance of the BAA.

### Eligibility

You can enable the HIPAA configuration from organization settings if your organization is on an Enterprise plan. Team plans and individual plans (Free, Pro, and Max) can't enable HIPAA.

Only the **Primary Owner** of the organization can accept the BAA and enable HIPAA. Other Owners or Admins can't complete this flow on the org's behalf. If you're an admin but not the Primary Owner of the Enterprise organization, ask your Primary Owner to sign in and complete enablement.

### Before you begin

Two things to know up front:

- **Enabling HIPAA resets certain settings across your organization.** Some configurations return to defaults as part of the transition to a HIPAA-ready state. The onboarding modal and the Implementation Guide (downloadable during the flow) detail what changes.

- **This is a one-way decision.** Once HIPAA is enabled and the BAA is accepted, the change can't be reversed from organization settings.

You must review the BAA and the Implementation Guide before accepting, as this is an irreversible organization transition.

**Note:** The BAA offered through the self-serve flow is a standard agreement and can't be modified.

### Enable HIPAA

1. Sign in to Claude as the Primary Owner and go to **[Organization settings > Data and privacy](https://claude.ai/admin-settings/data-privacy-controls)**.

2. Go to **HIPAA Compliance.**

3. Click “Enable” to open the consent flow.

4. Download the Business Associate Agreement, review it, then click “Next.”

5. Download the Implementation Guide, review it, then click “Next.”

6. Click “Accept and enable HIPAA.”

### Confirmation

Once enabled, you'll see a checkmark in the **HIPAA Compliance** section of organization settings, confirming your organization has been configured to process PHI through Claude in accordance with HIPAA. If you don't see this checkmark, your organization isn't enabled.

The onboarding modal will guide you through next steps for your team.

For help with the BAA, the Implementation Guide, or post-enablement questions, reach out to your Anthropic account team or **[our support team](https://support.claude.com/en/articles/9015913-how-to-get-support)**.

---

## If you have an existing API BAA

If your organization signed a BAA for Claude API usage before December 2, 2025, that agreement only covers API usage—it does not extend to the HIPAA-ready Enterprise plan. To add this Enterprise plan access, you'll need to sign a new BAA with your account team.

BAAs signed after December 2, 2025 can cover both API usage and the Enterprise plan under a single agreement.

If you use the Claude API, learn more about **[HIPAA-ready Claude API access and how to set it up](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#hipaa-readiness)**.
---

SOURCE: https://support.claude.com/en/articles/13393991-purchase-and-manage-seats-on-enterprise-plans

# Purchase and manage seats on Enterprise plans

This article covers how to add seats, manage your seat allocation, and handle member access on Enterprise plans. For pricing and billing details, see **[How am I billed for my Enterprise plan?](https://support.claude.com/en/articles/11526368-usage-based-enterprise-plans)**

**Permissions note:** Only Owners and Primary Owners can purchase seats and access **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**. Admins and above can reassign seat types for members in **[Organization settings > Members](https://claude.ai/admin-settings/members)**. To check your role, click your name or initials in the lower left corner—your role is listed next to your organization's plan type.

For information on adding and removing members from your organization, see **[Manage members on Team and Enterprise plans](https://support.claude.com/en/articles/13133750-managing-members-on-team-and-enterprise-plans)**.

**Important:** The main sections of this article describe the current Enterprise seat model, which applies to all new Enterprise plans.

- If your organization was provisioned before the transition to the single Enterprise seat and you see **Chat** and **Chat + Claude Code** seat types in **[Organization settings > Members](https://claude.ai/admin-settings/members)**, refer to **[Information for Chat and Chat + Claude Code plans](#h_2673e097fb)**.

  - **[HIPAA-ready Enterprise organizations](https://support.claude.com/en/articles/13296973-hipaa-ready-enterprise-plans)** are an exception: they are provisioned with separate Chat and Chat + Claude Code seat types and are not eligible for the single Enterprise seat billing model.

- If you see **Standard** and **Premium** seat types, refer to **[Information for seat-based Enterprise plans](#h_6a78e30e26)**.

- Chat-only seats and Standard/Premium seats are no longer available for new contracts—both legacy plan types are transitioning to the single Enterprise seat at their next renewal.

---

## Your seat type

Usage-based Enterprise plans use a single seat type: the **Enterprise seat**, priced per user per month (billed annually). This seat includes access to Claude on web, desktop, and mobile, as well as Claude Code.

Enterprise plans require a minimum of 20 seats.

---

## Purchase new seats

You can add seats to your Enterprise plan at any time during your annual term. New seats are prorated for the remainder of your billing cycle and charged immediately.

1. Log in with your Owner or Primary Owner account.

2. Go to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

3. Click "Manage" under **Total seats**.

4. Click "Add or change seats."

5. Enter the number of seats you'd like to add.

6. Review your changes and the prorated charge before confirming.

7. Click "Confirm & purchase" to finalize.

**Note:** You can also purchase a seat while adding a new member. If you don't have an available seat when inviting someone, you'll be prompted to purchase one.

For details on how seat additions are billed, see **[How am I billed for my Enterprise plan?](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan)**

---

## Remove seats

**Self-serve Enterprise plans:** Seats cannot be removed during your annual term. You can add seats at any time, but reductions to your seat count only take effect at renewal. If you need to make an exception, contact **[our Sales team](https://claude.com/contact-sales)** to discuss converting to a sales-assisted plan.

**Sales-assisted Enterprise plans:** Contact your account manager to discuss changes to your seat allocation.

Removing a member from your organization is different from reducing your seat count. When you remove a member, their seat becomes available to assign to someone else, so your total seat allocation and bill don't change. To reduce your bill, you'll need to reduce your total seat allocation. See **[Manage members on Team and Enterprise plans](https://support.claude.com/en/articles/13133750-managing-members-on-team-and-enterprise-plans)** for instructions on removing members.

---

## Temporarily remove a member's access

The **No seat assigned** option lets you temporarily remove a member's access to Claude without removing them from your organization. This is useful for contractors or team members who need intermittent access.

To unassign a member:

1. Go to **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

2. Find the member you want to unassign.

3. Click the dropdown under **Tier**.

4. Select "No seat assigned."

To restore their access, repeat the process and select “Enterprise seat.”

**Note:** Members with no seat assigned remain part of your organization but can't use Claude until you reassign them a seat.

---

## Seat assignment with JIT or SCIM provisioning

**[Users provisioned via JIT or SCIM](https://support.claude.com/en/articles/13133195-setting-up-jit-or-scim-provisioning-to-manage-user-assignments-on-team-or-enterprise-plans)** are automatically assigned an Enterprise seat when they're added, provided one is available in your allocation. If no seat is available, provisioning will not complete until an owner purchases an additional seat.

Admins and above can manually adjust a member's status (e.g., remove their seat assignment) afterward in **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

---

## Cancel your Enterprise plan

**Self-serve Enterprise plans:** An Owner or Primary Owner can cancel your plan from **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**. Cancellation takes effect at the end of your current annual billing cycle—your organization will continue to have access until then.

**Sales-assisted Enterprise plans:** Reach out to your Anthropic Contact or **[our Sales team](https://claude.com/contact-sales)** to discuss cancellation.

---

## Information for Chat and Chat + Claude Code plans

**Important:** Chat and Chat + Claude Code are legacy seat types that are no longer available for new Enterprise contracts. This section only applies to organizations that were provisioned with these seat types before the transition to the single Enterprise seat. If you recently signed a new Enterprise contract, the main sections of this article apply to you—your plan uses the single Enterprise seat, which includes Claude Code access for all members.

Some existing usage-based Enterprise organizations currently have two seat types: **Chat** and **Chat + Claude Code**. If you see these seat types in **[Organization settings > Members](https://claude.ai/admin-settings/members)**, this section applies to you. Your plan will transition to the single Enterprise seat model at your next contract renewal—see below for more information.

### Seat types

| **Seat type**      | **What's included**                         |
| ------------------ | ------------------------------------------- |
| Chat               | Claude on web, desktop, and mobile apps     |
| Chat + Claude Code | Everything in Chat, plus Claude Code access |

You can mix and match seat types based on your team's needs. Assign Chat + Claude Code seats to team members who need coding workflows, while keeping others on Chat seats.

### Reassign users between seat types

You can move users between Chat and Chat + Claude Code seats within your existing allocation.

1. Go to **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

2. Find the member you want to reassign.

3. Click the dropdown under **Tier**.

4. Select "Chat" or "Chat + Claude Code."

Members moved from Chat + Claude Code to Chat will lose Claude Code access, and vice versa.

The **Tier** dropdown only shows seat types your plan already owns. If your plan includes Chat + Claude Code seats but they're all assigned, you'll be prompted to purchase one. If your plan has no seats of that type, see **[Purchase new seats](#h_91344d9191)** above to add one first.

### Swap users between seat types

If all your Chat + Claude Code seats are assigned and you need to move one user to that type while moving another off it, use **No seat assigned** to free up a seat first.

**Example:** You have ten Chat + Claude Code seats, all assigned. You want to move User A (currently on Chat + Claude Code) to Chat, and move User B (currently on Chat) to Chat + Claude Code — without purchasing an additional seat.

1. Go to **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

2. Find User A and change their seat type to "No seat assigned." This frees up one Chat + Claude Code seat.

3. Find User B and change their seat type to "Chat + Claude Code." They now occupy the freed seat.

4. Find User A and change their seat type to "Chat."

### Seat assignment with JIT or SCIM provisioning

Users provisioned via JIT or SCIM are automatically assigned to the highest-available seat type (Chat + Claude Code, if available) when they're added. Admins and above can manually reassign seat types afterward in **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

You can also use Advanced Group Mappings with JIT or SCIM to provision users directly to a specific seat type.

### Transition to the single Enterprise seat

**Note: [HIPAA-ready organizations](https://support.claude.com/en/articles/13296973-hipaa-ready-enterprise-plans)** are provisioned with separate Chat and Chat + Claude Code seat types and are not eligible for the unified seat type.

At your next renewal, you will switch to the single Enterprise seat model upon signing a new contract. This seat includes Claude Code, Cowork, Chat and more.

Reach out to your Anthropic Contact or **[our Sales team](https://claude.com/contact-sales)** with questions about your upcoming renewal.

---

## Information for seat-based Enterprise plans

**Important:** Standard and Premium are legacy seat types that are no longer available for new Enterprise contracts. This section only applies to organizations that were provisioned with these seat types before the transition to usage-based billing. If you recently signed a new Enterprise contract, the main sections of this article apply to you.

Some Enterprise organizations are on older seat-based plans with a different billing structure than the usage-based model described above. If you see **Standard** and **Premium** seats in **[Organization settings > Members](https://claude.ai/admin-settings/members)**, this section applies to you.

### Seat types

| **Seat type** | **What's included**                              |
| ------------- | ------------------------------------------------ |
| Standard      | Core Enterprise features and usage limits        |
| Premium       | Everything in Standard, plus higher usage limits |

### Reassign users between seat types

You can move users between Standard and Premium seats within your existing allocation.

1. Go to **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

2. Find the member you want to reassign.

3. Click the dropdown under **Tier**.

4. Select "Standard" or "Premium."

Members moved from Premium to Standard will have lower usage limits, and vice versa.

The **Tier** dropdown only shows seat types your plan already owns. If your plan includes Premium seats but they're all assigned, reassigning another user to Premium will prompt you to purchase an additional seat. If your plan has no seats of that type, see **[Purchase new seats](#h_91344d9191)** above to add one first.

### Swap users between seat types

If all your Premium seats are assigned and you need to move one user to Premium while moving another to Standard, use **No seat assigned** to free up a seat first.

**Example:** You have ten Premium seats, all assigned. You want to move User A (currently on Premium) to Standard, and move User B (currently on Standard) to Premium—without purchasing an additional seat.

1. Go to **[Organization settings > Members](https://claude.ai/admin-settings/members)**.

2. Find User A and change their seat type to "No seat assigned." This frees up one Premium seat.

3. Find User B and change their seat type to "Premium." They now occupy the freed seat.

4. Find User A and change their seat type to "Standard."

### Billing and usage credits

Seat-based Enterprise plans charge a flat monthly fee per seat that includes usage limits. Owners can enable usage credits to allow team members to continue working after reaching their seat's usage limits. For details, see **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-)**.

For specific information about seat-based Enterprise pricing, reach out to your Anthropic Contact or **[our Sales team](https://claude.com/contact-sales)**.

### Transition to the single Enterprise seat

At your next contract renewal, your plan will transition to the usage-based single Enterprise seat model described in the main sections of this article. If you'd like to migrate before your renewal, reach out to your Anthropic Contact or **[our Sales team](https://claude.com/contact-sales)**.
---

SOURCE: https://support.claude.com/en/articles/13663666-use-visual-and-interactive-content-on-team-and-enterprise-plans

# Use visual and interactive content on Team and Enterprise plans

Maps and image search results are enabled by default on Team plans. On Enterprise plans, these features are off by default — an Owner or Primary Owner can enable them in **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)**.

When these features are active, some data is shared with third-party services. For more information, see **[Visual and interactive content](https://support.claude.com/en/articles/13641943-visual-and-interactive-content)**.

## How is your information processed by Google?

Maps and weather content is powered by Google Maps. Users’ prompts aren't sent to Google — instead, Claude transforms queries into generic search requests. Google also receives users’ IP addresses and, if they’ve consented, their location data to return relevant results. Data sent to Google is subject to **[Google's privacy policy](https://policies.google.com/privacy)**.

## How is your information processed by Bing?

Image results are powered by Bing Image Search. Users’ prompts aren’t sent to Bing — instead, Claude transforms queries into generic search requests. If users click a URL associated with an image, anonymized click data is also sent to Bing. Data sent to Bing is subject to **[Microsoft's privacy policy](https://privacy.microsoft.com/en-us/privacystatement)**.

Interactive inputs don't involve third-party services.
---

SOURCE: https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans

# Manage groups and group spend limits on Enterprise plans

Groups and group spend limits are available for Enterprise plan organizations. Owners, Primary Owners, and custom roles with the **Identity & Access** permission set to "Can manage" can go to **[Organization settings > Groups](http://claude.ai/admin-settings/groups)** to manage groups. Owners, Primary Owners, and custom roles with the **Billing** permission set to "Can manage" can go to **[Organization settings > Usage](https://claude.ai/admin-settings/usage)** to manage group spend limits. Group visibility settings are currently in beta.

## What are groups?

Groups let you organize members into logical collections—by team, department, or any other grouping that fits your organization. Once groups are set up, you can:

- **Set spend limits for groups**, so all members of a group share a per-user spend limit.

- **Control member access through group memberships and custom roles**, so their capabilities and permissions are determined entirely by the groups they belong to. For additional details, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

- **Let members share projects with a group**, so a project shared with the group is available to everyone in it, and access follows membership as it changes. For details, see[**Manage project visibility and sharing**](https://support.claude.com/en/articles/9519189-manage-project-visibility-and-sharing).

Groups can be created manually or synced automatically from your identity provider via SCIM. Each organization can have up to 100 groups. There's no limit on how many groups a member can belong to, though belonging to more than 250 can slow performance.

In addition to spend limits, Enterprise admins can use groups to control plugin access in Cowork. Each plugin in your organization's marketplace can have group-level overrides that determine whether it's available, pre-installed, required, or hidden for members of a specific group. For details, see **[Manage Cowork plugins for your organization](https://support.claude.com/en/articles/13837433-manage-cowork-plugins-for-your-organization)**.

---

## Create a group

1. Navigate to **[Organization settings > Groups](http://claude.ai/admin-settings/groups)**.

2. Click "Add group."

3. Enter a **Group name**.

4. Optionally enter a **Display name**. The display name replaces the group name on in-product surfaces, like the project sharing picker. Leave it blank to use the group name.

5. Select which custom roles to assign to this group (optional).

6. Under **Visibility settings**, choose who can discover the group, share resources like projects with it, and see its members (optional).

7. Search for and add members, or click "Add all members" to add everyone in your organization.

8. Click "Add group."

**Note:** If SCIM directory sync is enabled, you’ll see a “SCIM Sync” button next to "Add group." Clicking this will manually refresh groups from your identity provider.

## Edit a group

Click any group in the list to open its edit form. You can change the group name and display name, update custom role assignments, change visibility settings, and add or remove members.

To change settings for several groups at once, select them with the checkboxes in the groups list, then click the "Edit settings" button that appears.

**Note:** Groups synced from your identity provider via SCIM can't be renamed or deleted in Claude, and their members are managed in your identity provider.

## Delete a group

Click the menu button to the right of any group and select "Delete." Deleting a group doesn't affect the custom roles that were assigned to it and doesn't remove any members from your organization. Deleting a group also removes its access to any projects shared with it. Members lose access to those projects unless they have access another way.

---

## SCIM group sync

If your organization uses SCIM directory sync, groups from your identity provider are automatically synced to Claude. SCIM groups appear with a sync indicator in the groups list.

SCIM groups support custom role assignments and spend limits the same way as manually created groups.

To manually trigger a sync, click “SCIM Sync."

**Note:** Claude supports direct group memberships only. If your identity provider nests groups inside other groups, those relationships are ignored when memberships are pushed via SCIM, and only direct members appear in Claude. Some providers flatten nested memberships before pushing them, which makes members of child groups appear as direct members. Check your provider's SCIM behavior to confirm.

---

## Group visibility

Group visibility settings are currently in beta.

By default, groups appear only on admin surfaces. Visibility settings let you make a group discoverable to members so they can share resources (like projects) with it. You set them in the **Visibility settings** section when creating or editing a group.

There are three settings:

- **Discover this group:** Members can find the group by name. This doesn't expose group members, spend limits, or role assignments.

- **Share projects with this group:** Members can share resources, such as projects, with the group.

- **See group members:** Members can see who belongs to the group, by name and email address.

For each setting, select **Group members** to grant it to members of that group, or **Everyone** to grant it to everyone in your organization. Leave both unchecked to keep the setting off.

Visibility settings don't affect admin access. Owners, Primary Owners, and custom roles with **Identity & Access** access always see every group.

The **Visibility** column in the groups list shows each group's current state. New visibility settings can take a few minutes to appear in-app.

**Important:** Visibility settings are configured per organization. Groups, group membership, and SCIM sync are managed at the parent organization level and shared across child organizations, but visibility settings aren't. An admin changing visibility settings in one organization doesn't affect any other organization.

### Remove a group's access to shared projects

Turning off **Share projects with this group** blocks new shares. It doesn't revoke projects already shared with the group. To revoke those:

1. Open the group's edit form.

2. Under **Visibility settings**, select "Remove this group's access to all [number] projects."

3. Save the group.

This revokes existing shares only. It doesn't block future sharing, so turn off **Share projects with this group** as well if you want both.

**Note:** Removing a group's access runs in the background. For groups with more than 1000 shared projects, it can take several minutes or longer.

---

## Control member access with custom roles

You can control individual members' feature access entirely through groups and custom roles. When a member's role is set to **Custom**, they have no default capabilities or permissions—their access is determined entirely by the custom roles assigned to their groups. This is different from the User, Admin, or Owner roles, which include built-in permissions.

### Set a member's role to Custom

1. Navigate to **[Organization settings > Members](http://claude.ai/admin-settings/members)**.

2. Find the member and click their role dropdown.

3. Select "Custom."

Owners, Primary Owners, and custom roles with the **User Management** permission set to "Can manage" can change member roles. You can also assign “Custom” at scale by mapping an IdP group using **[group mappings](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning)**.

### Recommended setup

1. Create custom roles with the desired permissions in **[Organization settings > Roles](http://claude.ai/admin-settings/roles)**. For details, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452)**.

2. Create groups in **[Organization settings > Groups](http://claude.ai/admin-settings/groups)** (or sync them from your identity provider).

3. Assign custom roles to groups.

4. Add members to the appropriate groups.

  1. **Note:** If a member set to a Custom role isn't in any groups, or their groups have no custom roles assigned, they have no permissions and can't access any products. They'll land on their settings page when they sign in.

5. Set each member's organization role to **Custom**.

6. Enable any features at the organization level that you want to control per-group.

The member's effective permissions are now determined by their group memberships and the custom roles assigned to those groups.

**Important:** Always complete steps 1–5 before enabling features at the organization level (step 6). If you enable a feature before changing members' roles to Custom and assigning appropriate custom roles, there's a brief window where some members could access the feature through their previous role. For a detailed walkthrough, see **[Set up role-based permissions on Enterprise plans](https://support.claude.com/en/articles/13930458-set-up-role-based-entitlements-on-enterprise-plans)**.

### Invite new members

When inviting a new member, Owners, Primary Owners, and custom roles with the **User Management** permission set to "Can manage" can select "Custom” as the role.The new member's access is determined by their group memberships after they join.

---

## Group spend limits

Group spend limits let you control spending across your organization by assigning per-user monthly spend limits to groups. Instead of setting spend limits for each member individually, you can set a limit on a group and have it apply to every member of that group.

Group spend limits work alongside individual spend limits. If a member has an individual spend limit set, their individual limit takes precedence over any group limit.

## Set a group spend limit

1. Navigate to **[Organization settings > Usage](https://claude.ai/admin-settings/usage)**.

2. Select the “By group” tab.

3. Find the group and click the menu button to the right, then “Edit limit”

4. Select “Unlimited,” or “Set dollar amount” and enter a dollar amount for the spend limit.

5. Click "Set limit."

The spend limit applies to all members of the group. Members who also have an individual spend limit set are governed by their individual limit instead.

## Choose how multi-group spend limits resolve

If a member belongs to more than one group with a spend limit, the **Multi-group spend limit** setting controls which limit applies.

1. Navigate to **[Organization settings > Usage](https://claude.ai/admin-settings/usage)**.

2. Find **Multi-group spend limit** in the **Spending defaults** section.

3. Select "Higher group limit" or "Lower group limit" from the dropdown.

Select "Lower group limit" to set a broad limit on a large group and create subgroups with tighter budgets. Select "Higher group limit" to set a conservative baseline on a large group and grant more headroom to specific teams.

## How spend limits are resolved

When determining a member's effective spend limit, the system evaluates in this order:

1. **Individual limit**—if the member has an individual spend limit set, that limit applies regardless of group membership.

2. **Group limit**—if the member has no individual limit, the system checks their group memberships. If the member belongs to multiple groups with spend limits, your **Multi-group spend limit** setting determines whether the higher or lower limit applies.

3. **No limit**—if the member has no individual limit and belongs to no groups with spend limits, no spend limit is applied.
---

SOURCE: https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans

# Manage custom roles on Enterprise plans

Custom roles are available for Enterprise plan organizations. Owners, Primary Owners, and custom roles with the **Identity & Access** permission set to "Can manage" can go to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)** to manage custom roles.

## What are custom roles?

Custom roles let you define which features your members can access. Each custom role contains a set of permissions that grant or restrict access to specific capabilities like chat, Claude Cowork, Claude Code, and web search, plus the connectors your organization has added, such as Slack or Google Drive. Custom roles can also grant admin permissions, which give members access to specific administrative areas like billing, identity, or privacy without making them Owners.

Custom roles work alongside groups. The typical workflow is: create custom roles, assign them to groups, and then set members' roles to “Custom” so their access is governed entirely by the custom roles assigned to their groups.

**Note:** Custom roles only affect members whose role is set to “Custom.” Members with the User, Admin, or Owner roles get their permissions from those roles directly, not from custom roles.

---

## How feature access works

Feature access is determined by a four-level precedence chain, where the most restrictive level wins:

1. **Platform-level overrides**: Some features may be force-enabled or force-disabled for your organization by Anthropic as part of your contract. These can't be changed in organization settings.

2. **Organization-level setting**: An Owner or Primary Owner can toggle a feature on or off for the entire organization. If a feature is disabled at the organization level, no custom role can grant access to it.

3. **Custom role permissions**: If the feature is enabled at the organization level, the member's custom roles determine whether they can access it. If any of the member's custom roles grant the feature, they have it.

4. **User-level setting**: If the feature is granted at the role level, it's available unless the member has disabled it in their own settings.

The key takeaway: the organization-level toggle is a main switch. Custom roles are the per-member switches underneath it. A feature must be enabled at the organization level before custom roles can control who gets access.

**Note:** This precedence chain applies to capabilities. Admin permissions aren't gated by an organization-level toggle or a member's own settings. If a member's custom role grants an admin permission, they have that access.

---

## Available capabilities

Each custom role can grant or restrict access to the following capabilities:

| **Capability**                          | **Description**                                                                                                                                                                                                                                          |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chat                                    | Access to chat on web, desktop, and mobile apps.                                                                                                                                                                                                         |
| Code execution and file creation        | Ability to run code and create files in conversations.                                                                                                                                                                                                   |
| Memory                                  | Ability to use memory across conversations.                                                                                                                                                                                                              |
| Web search                              | Ability to use web search in conversations.                                                                                                                                                                                                              |
| Public projects                         | Ability to share projects with everyone in your organization.                                                                                                                                                                                            |
| Create skills                           | Ability to create or upload custom skills.                                                                                                                                                                                                               |
| Share skills with org members           | Ability to share skills with specific people in your organization.                                                                                                                                                                                       |
| Share skills with the full organization | Ability to share skills with everyone in your organization at once.                                                                                                                                                                                      |
| Claude Code                             | Access to Claude Code.                                                                                                                                                                                                                                   |
| Fast mode                               | Access to faster model options for Claude Code.                                                                                                                                                                                                          |
| Claude Code dynamic workflows\*         | Access to dynamic workflows in Claude Code, which let Claude run large engineering tasks—migrations, audits, codebase-wide bug hunts—from start to finish in a single session. These runs can last for hours and use more tokens than a typical session. |
| Claude Security                         | Find and fix security vulnerabilities in your code with Claude.                                                                                                                                                                                          |
| Claude Code artifacts                   | Ability to create artifacts in Claude Code, which turn a session's work into a live, shareable page built from the session's context.                                                                                                                    |
| Claude Design                           | Access to Claude Design to generate design artifacts.                                                                                                                                                                                                    |
| Claude Cowork                           | Access to Claude Cowork.                                                                                                                                                                                                                                 |
| Claude for Chrome                       | Access to Claude for Chrome, the browser extension that lets Claude browse and act on web pages on the user's behalf.                                                                                                                                    |

*Claude Code dynamic workflows are on for your whole organization by default. Because a single run can last for hours and use more tokens than a typical session, decide which roles should have access. For members on custom roles, this capability follows the additive model like any other—a role must grant it for those members to use it. To restrict a specific group, leave this capability off in their role.

This can be disabled organization-wide via `managed-settings.json` by adding `"disableWorkflows": true` to your managed settings.

An owner can turn it off across your entire organization by going to **[Organization settings > Claude Code](https://claude.ai/admin-settings/claude-code)** and toggling **Workflows** off.

Custom roles also govern admin permissions, connectors, and model access, which are configured on separate **Permissions**, **Connectors**, and **Models** tabs in the role editor. See **[Admin permissions](#h_fde60b08bd)**, **[Connector permissions](#h_979e558d00)**, and **[Model access](#h_fca0f9a6b5)** below.

**Note:** Chat is enabled by default for all custom roles, including ones created before this capability was added. If you want to restrict chat for a specific role, toggle it off when editing the role.

### Grant all capabilities at once

Instead of toggling capabilities individually, you can grant a role every capability. When creating or editing a role, choose an option on the **Capabilities** tab for **Capability access**:

- **All capabilities:** Grants the role every capability, including capabilities in beta and research preview.

- **All generally available:** Grants the role every generally available capability.

Roles set to either option pick up new capabilities automatically as they launch. Roles set to “Only selected” only include the capabilities you select.

---

## Create a custom role

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click “Add role.”

3. Enter a name for the role (for example, “Developer,” “Standard Access,” or “Restricted”).

4. Select the groups you want to assign to the role.

5. Toggle each capability on or off to define what this role grants, or choose "All capabilities" or "All generally available" to grant every capability at once.

6. Configure permissions. You can choose No access, Can view, and Can manage for each admin setting.

7. Configure connectors. You can choose Always allow, Needs approval, or Blocked for all connectors, or customize per connector or connector tool.

8. Configure models. Select which models this role can use, optionally set a maximum effort level per model, and optionally choose a default model for the role.

9. Click “Save role.”

## Edit a custom role

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click the role you want to edit.

3. Update the name and groups, or toggle capabilities, permissions, connectors, and models as needed.

4. Click “Save role” to save your changes.

Role changes may take up to 15 minutes to take effect, and members may need to refresh their browser. All members in groups assigned to this role are affected.

## Delete a custom role

Click the menu button on any custom role and select “Delete role.” Deleting a role removes its permissions from all groups it was assigned to. Members in those groups lose the permissions the role granted, unless another role in their chain also grants them.

---

## Assign groups to custom roles

Custom roles are assigned to groups, not directly to individual members. To assign a group to a role:

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click the role you want to assign.

3. In the groups selector, select one or more groups.

4. Click "Save role."

You can also assign custom roles when creating or editing a group in **[Organization settings > Groups](http://claude.ai/admin-settings/groups)**. See **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**.

---

## How permissions combine across multiple roles

If a member belongs to multiple groups with different custom roles, their permissions are **additive**—they get the union of all permissions from all roles in their chain. If any role grants a feature, the member has access to it.

This means you can't use one role to remove a permission granted by another role. This is by design — it enables a layered approach where a base role covers common features and additional roles layer on specific capabilities and admin permissions.

**Example:** A member is in two groups. The "All Users" group is assigned a "Standard Access" role with web search and memory. The "Engineering" group is assigned a "Developer" role with Cowork and Claude Code. The member gets all four: web search, memory, Cowork, and Claude Code.

---

## See a member or group's effective role

When a member belongs to several groups whose roles grant different capabilities, it can be hard to tell what they can actually do. The "View effective role" option shows the combined result: every capability, admin permission, and connector the member has, with the role that grants each one.

1. Navigate to **[Organization settings > Members](https://claude.ai/admin-settings/members)** (or **[Organization settings > Groups](https://claude.ai/admin-settings/groups)**).

2. Find the member or group and open the "⋮" menu on the right side of their row.

3. Select "View effective role."

The modal lists the member's assigned roles and three tabs:

- **Capabilities:** each capability with a "Granted by *[role name]*" label showing which role turned it on.

- **Permissions:** each admin permission area with its effective level (No access, Can view, or Can manage) and which role grants it.

- **Connectors:** each connector's effective permission level and which role grants it.

This view is read-only. To change what a member can do, edit the roles assigned to their groups.

**Note:** "View effective role" appears only for members whose role is set to "Custom" and who have at least one custom role assigned through a group. Members with a built-in role (User, Admin, Owner, or Primary Owner) get their permissions from that role directly, so there's nothing to compute.

---

## Admin permissions

Custom roles can grant admin permissions in addition to capabilities and connector permissions. Admin permissions give members access to specific administrative areas, like billing or privacy, without making them Owners. You can configure admin permissions in the **Permissions** tab of the role editor.

**Note:** Admin permissions only apply to members whose role is set to "Custom." Members with the User, Admin, Owner, or Primary Owner roles keep the access those roles grant.

### Admin permission levels

On the **Permissions** tab, you set each permission area to one of three levels:

- **No access:** The member doesn't see this area in their organization settings.

- **Can view:** View grants read-only access. The member sees the same pages and settings as someone who can manage that area, but every control is disabled or shown as read-only. Use this permission level for compliance reviewers, finance auditors, security teams, or anyone who needs to see the configuration without changing it.

- **Can manage:** Manage grants full read and write access to the area and includes view access.

Within an area, you grant all of View or all of Manage. You can't grant or restrict individual pages or settings.

### Available admin permissions

There are seven admin permission areas:

| **Area**             | **View**                                                                                                                                                         | **Manage**                                                                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Identity & Access    | SSO and SAML configuration, verified domains, domain memberships, IP allowlist, session settings, group definitions, role definitions, and provisioning settings | Edit SSO, manage domains, edit the IP allowlist, edit session settings, create and edit groups and roles, and configure provisioning |
| Billing              | Plan details, seat counts, invoices, billing addresses, and usage spend                                                                                          | Change seats, update payment methods, edit billing addresses, and configure spend limits and extra usage                             |
| Analytics            | Usage analytics, Claude Code analytics, and feature adoption metrics                                                                                             | Not available                                                                                                                        |
| Privacy              | Data retention settings, export configuration, sharing settings, geolocation settings, US-only inference setting, and encryption-key status                      | Edit retention periods, run data exports, change sharing settings, and configure geolocation, US-only inference, and encryption      |
| User Management      | Not available                                                                                                                                                    | Invite members, change member roles, remove members, and manage pending invitations                                                  |
| Libraries            | Not available                                                                                                                                                    | Add, edit, and remove organization-shared skills, plugins, and connectors. Also includes directory management.                       |
| Directory management | Not available                                                                                                                                                    | Submit and manage directory listings, and view observability for listings your organization has published                            |

**Note:** A role with **Identity & Access** set to "Can manage" can create and edit groups and roles, including its own role definition. Members with this permission can expand their own access, so reserve it for trusted security and IT administrators.

### Available organization settings pages for each permission

| **Organization settings page**    | **Required permission**            | **Notes**                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Billing                           | Billing (View or Manage)           | Plan, seats, addresses, and invoices                                                                                                                                                                                                                                                                                                                                    |
| Usage                             | Billing (View or Manage)           | Spend limits, credits, and extra usage                                                                                                                                                                                                                                                                                                                                  |
| Members                           | User Management (Manage)           | No view-only mode                                                                                                                                                                                                                                                                                                                                                       |
| Groups                            | Identity & Access (View or Manage) |                                                                                                                                                                                                                                                                                                                                                                         |
| Roles                             | Identity & Access (View or Manage) |                                                                                                                                                                                                                                                                                                                                                                         |
| Models                            | Identity & Access (View or Manage) | Default model and model access                                                                                                                                                                                                                                                                                                                                          |
| Organization and access (partial) | Identity & Access (View or Manage) | Unlocks single sign-on (SSO/SAML, group mappings, provisioning), verified domains and domain memberships, IP allowlist, session settings, restrict organization creation, and organization merger requests. Other sections on this page, like the organization name, default capability settings, and the organization-wide system prompt, still require the Owner role |
| Data and privacy                  | Privacy (View or Manage)           |                                                                                                                                                                                                                                                                                                                                                                         |
| Analytics                         | Analytics (View)                   | Reached through Analytics in the user menu, not organization settings                                                                                                                                                                                                                                                                                                   |
| Skills                            | Libraries (Manage)                 |                                                                                                                                                                                                                                                                                                                                                                         |
| Plugins                           | Libraries (Manage)                 |                                                                                                                                                                                                                                                                                                                                                                         |
| Connectors                        | Libraries (Manage)                 |                                                                                                                                                                                                                                                                                                                                                                         |
| Directory                         | Directory management (Manage)      |                                                                                                                                                                                                                                                                                                                                                                         |

### What admin permissions don't cover

The following remain available only to Owners and Primary Owners, even for members with admin permissions:

- **Managing Owners and Admins.** Admin permissions can't grant or revoke the Owner, Admin, or Primary Owner built-in roles. Only Owners can manage other Owners.

- **API keys and workspaces.** API key management, workspace settings, and Claude Console administration aren't covered by admin permissions.

- **Compliance and security keys.** Compliance API settings and security-key administration remain Owner-only.

- **Organization-level capability settings.** Which capabilities are enabled at the organization level is governed separately and isn't part of admin permissions.

### What members see when admin permissions are restricted

If a member doesn’t have access to a specific admin permission, the section doesn't appear in their organization settings. Only sections their permissions cover are shown.

---

## Connector permissions

Custom roles also control which connectors, and which tools on those connectors, a role can use. Where capabilities cover Claude’s built-in features, connector permissions cover the apps and services you’ve connected to your organization, such as Slack, Google Drive, or Jira. You set them on the **Connectors** tab of the role editor, next to the **Capabilities** and **Permissions** tabs.

**Note:** Connector permissions apply only to members whose role is set to “Custom.” Members with the User, Admin, or Owner roles see every connector enabled for your organization, subject to your organization-wide tool policies per connector. Owners and Admins always see every connector so they can configure it, regardless of any role’s connector permissions.

### Permission levels

On the **Connectors** tab, you set all connectors, each connector, or each tool on a connector, to one of three levels:

- **Always allow:** Every tool on the connector is available, and members can set their own approval to “Always allow” to skip the per-call confirmation.

- **Needs approval:** Every tool is available, but members confirm each call. The “Always allow” option is removed from their personal approval menu for these tools.

- **Blocked:** The connector or tool is hidden. Claude can’t see it or call it.

A connector can also be set to **Custom**, which lets you set each of its tools individually. For the full setup, see **[Set up role-based permissions on Enterprise plans](https://support.claude.com/en/articles/13930458-)**.

### How connector access is determined

A connector or tool passes through several layers before a member can use it, evaluated in this order:

1. **Role grant.** Each connector or tool on a role is set to “Always allow,” “Needs approval,” or “Blocked.”

2. **Across the member’s roles.** If a member’s groups give them more than one role, the most permissive grant for each tool applies. Connector permissions are additive across roles, the same as capabilities.

3. **Organization-wide tool policy.** The per-tool policy you set under **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)** per connector is the ceiling. For each tool, Claude compares the member’s role grant to this policy and applies the stricter of the two. Role grants narrow access within the policy; they can’t widen past it. Learn more about setting tool access in **[Use connectors to extend Claude’s capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)**.

4. **The member’s own setting.** The result of the steps above is the member’s effective ceiling. It limits the options in their personal per-tool approval menu (“Always allow,” “Ask,” or “Never”). A ceiling of “Needs approval” removes “Always allow.” A ceiling of “Blocked” grays the tool out.

For members using Claude Code, one more layer applies: Managed Settings policies and connector permissions compose by most-restrictive. A tool is callable without a prompt only when both allow it. For more information, see **[Claude Code settings](https://code.claude.com/docs/en/settings#settings-files)**.

For members using Claude Cowork, write-capable connector tools pass through one more gate. See **[Cowork approval setting for write tools](#h_85bd7c30e9)** below.

This table shows how the organization-wide tool policy and a member’s role grant combine:

| **Organization-wide tool policy** | **Highest role grant across the member’s roles** | **Effective ceiling** | **Member’s personal options** |
| --------------------------------- | ------------------------------------------------ | --------------------- | ----------------------------- |
| Always allow                      | Always allow                                     | Always allow          | Always allow, Ask, Never      |
| Always allow                      | Needs approval                                   | Needs approval        | Ask, Never                    |
| Always allow                      | Blocked                                          | Blocked               | Tool grayed out               |
| Needs approval                    | Always allow                                     | Needs approval        | Ask, Never                    |
| Needs approval                    | Blocked                                          | Blocked               | Tool grayed out               |
| Blocked                           | Any                                              | Blocked               | Tool grayed out               |

### Cowork approval setting for write tools

Claude Cowork has a separate organization setting, **Allow "Always allow" for connector tools**, that gates write-capable connector tools. It's off by default, and custom role grants can't override it: even when the organization-wide tool policy and every role grant are set to "Always allow," members approve these tools per task in Cowork until the setting is turned on. Learn more about **[connector tool approvals in Cowork](https://support.claude.com/en/articles/13455879-use-claude-cowork-on-team-and-enterprise-plans#h_1bd1fa754d)**.

### Where connector permissions apply

Connector permissions are enforced on Anthropic’s servers, so they apply across every Claude surface that routes connector traffic through Anthropic:

| **Surface**                       | **Coverage**                                                                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude on web and desktop         | Full enforcement. Blocked connectors are hidden, blocked tools are grayed out, and the personal approval menu is limited to what the ceiling allows.                                                          |
| Claude Mobile (iOS and Android)   | Enforced. Blocked tools are stripped from Claude’s view and calls to them are rejected. A blocked tool may still look active in mobile connector settings until interface updates ship, but it can’t be used. |
| Claude Cowork (cloud and desktop) | Same as web.                                                                                                                                                                                                  |
| Claude Code                       | Enforced. Blocked tools are rejected and appear as disabled. See **[Claude Code settings](https://code.claude.com/docs/en/settings#settings-files)**.                                                         |

Connector permissions govern connectors your organization has added under **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**. They don’t govern connectors a member runs locally on their own machine, and they don’t govern Claude Cowork when it’s deployed on a third-party platform. For third-party Cowork deployments, use MDM instead. See **[Cowork on 3P: MCP, plugins, skills, and hooks](https://claude.com/docs/cowork/3p/extensions).**

### What members see when a connector is restricted

| **Restriction**                                                      | **What the member sees**                                                                                                                                              |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A connector is blocked for their role                                | The connector doesn’t appear in their connector menu.                                                                                                                 |
| A tool is blocked on a visible connector                             | The tool is grayed out in their connector settings, with the message “This tool is not enabled for your role. Contact your administrator.”                            |
| A tool is capped at “Needs approval”                                 | The tool works, but the personal approval menu offers only “Ask” and “Never,” and Claude asks before each call.                                                       |
| The Cowork “Allow “Always allow” for connector tools” setting is off | In Cowork, write-capable tools work, but "Allow for all tasks" is grayed out and members approve each task.                                                           |
| Connector permissions can’t load briefly                             | A banner reports that connectors couldn’t load, with a retry. No blocked tool ever reaches the connected service. Access fails toward denying, never toward granting. |

Members can’t tell which layer restricted a tool. The message is the same whether the limit comes from the organization-wide tool policy, a role grant, or both. To find the source, compare the organization-wide policy with the member’s role grants.

---

## Model access

Custom roles also control which Claude models a role can use and the maximum effort level members can select on each one. You set these on the **Models** tab of the role editor, alongside the role's default model.

The organization-level model setting is the ceiling. A role can't grant a model that's disabled at the organization level. Across a member's roles, model access is additive and effort limits take the highest cap any role allows. Haiku models are always available and can't be disabled.

For setup steps and what members see, see **[Manage model access for your organization](https://support.claude.com/en/articles/15694740)**. For default model behavior, see **[Set a default model for your organization](https://support.claude.com/en/articles/15330088)**.

---

## What members see when capability access is restricted

When a capability is restricted, here’s what members see. For connector and tool restrictions, see **[Connector permissions](#h_979e558d00)** above.

| **Reason**                                    | **What the member sees**                                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Feature is disabled at the organization level | The feature appears greyed out or hidden, with the message "This feature is disabled for your organization."       |
| Member's roles don't grant the feature        | The feature appears greyed out or hidden, with the message "Contact your admin to request access to this feature." |
| Member's roles don't grant any product access | The member lands on their settings page when they sign in, with no products available to use.                      |
---

SOURCE: https://support.claude.com/en/articles/13930458-set-up-role-based-permissions-on-enterprise-plans

# Set up role-based permissions on Enterprise plans

This guide walks you through setting up role-based permissions for your Enterprise organization. This lets you control which features and connectors specific teams or groups of members can access, and delegate specific admin access like billing or user management, rather than giving everyone the same permissions.

Before you start, make sure you're familiar with:

- **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)** — how to create and manage groups

- **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)** — how custom roles and capabilities work

---

## Before you begin

You'll need Owner or Primary Owner access to your Enterprise organization, or a custom role with Identity & Access set to Manage.

**Note:** Some of these steps require more than the Identity & Access custom role: enabling features at the organization level requires the Owner role, and changing member roles requires User Management set to Manage.

**Check which capabilities are enabled at the org level.** Go to **Organization settings** and ensure you know which capabilities members can access currently. For settings managed by RBAC, both the org setting and role setting are required to be on for users to get access.

**Back up your member list.** Export a CSV of your current members from **[Organization settings > Members](http://claude.ai/admin-settings/members)** before making any changes. If something goes wrong during migration, this gives you a reference to restore access. See **[Manage members on Team and Enterprise plans](https://support.claude.com/en/articles/13133750-manage-members-on-team-and-enterprise-plans)**.

**Determine which teams or functions need each capability.** For example, Engineering gets Claude Code + Fast Mode and Marketing gets Cowork + Web Search. From here, define your custom roles.

**Dual-seat plans.** If your organization is on a dual-seat Enterprise plan (with Chat and Chat + Claude Code seats), custom roles don't override seat-level restrictions. A member assigned to a Chat-only seat can't access Claude Code even if their custom role grants it. The same applies in reverse: if a member's custom role doesn't grant the chat capability, they won't have chat access regardless of their seat type. Plan your role structure with seat assignments in mind.

**Note:** "Chat + Claude Code" refers to a seat type on legacy dual-seat plans. The "chat" capability in custom roles is separate—it governs chat access for any member whose role is set to "Custom" on any plan.

**Decide how you'll create groups.** You can create groups manually in Claude, or sync them from your identity provider (IdP) via SCIM. You can also use both methods simultaneously. If you plan to use IdP groups from Okta, Entra ID, or another provider, make sure SCIM directory sync is configured. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning)**.

**Add the connectors you plan to govern.** Connector permissions only cover connectors that an Owner or Primary Owner has already added under **Organization settings > Connectors** and connected with admin credentials. Review your organization-wide tool policy there as well, since role grants narrow within it and can’t widen past it. See **[Use connectors to extend Claude’s capabilities](https://support.claude.com/en/articles/11176164-)**.

---

## Planning your role structure

Before creating anything, decide which features each team or group of members should have access to. Here are four common patterns:

### Base plus additive roles

This is the recommended approach for most organizations. Create a "Standard Access" role for everyone with common features like web search, memory, and projects. Then create additive roles that grant specific capabilities — for example, a "Cowork Enabled" role that only adds Cowork. Assign all members to the base role through an "All Users" group, and add specific members to additional groups that layer on extra features.

This pattern is flexible because permissions are additive — combining a base role with additive roles composes cleanly without conflicts.

### Tier-based roles

Create distinct tiers: "Full Access" with all features, "Standard Access" with most features, and "Restricted Access" with minimal features. Each member goes into exactly one group assigned to one tier.

### Department-based roles

Create roles that map to departments: "Engineering" with chat, Cowork, Claude Code, and code execution; "Research" with chat, web search, memory, and projects; "Business" with chat, web search and projects only. Assign each department group to its corresponding role.

### Admin delegation roles

Create roles that delegate parts of administration without granting the Owner role. A custom role with admin permissions does not need any user capabilities, and vice versa. You could create a "Finance" role that grants Billing access but no chat or Claude Code capability, or an "Engineering Lead" role that grants Claude Code plus Analytics view access. Learn more **[about admin permissions for custom roles](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans#h_536123d968)**.

---

## Step 1: Audit your current settings

1. Review which features are currently enabled or disabled at the organization level in **[Organization settings > Capabilities](http://claude.ai/admin-settings/capabilities)**.

2. Go to **[Organization settings > Members](http://claude.ai/admin-settings/members)** to export or review your member list.

3. Note each member's current built-in role (User, Admin, or Owner).

4. For each team or department, decide which features they need access to.



Remember: any feature you want to control per-group must be **enabled** at the organization level. If a feature is toggled off at the organization level, no custom role can grant access to it.

**Important:** Unlike members with the User role, members assigned to custom roles don't automatically inherit organization-enabled capabilities. Every capability a "Custom" role member needs must be explicitly granted by a custom role assigned to one of their groups.

---

## Step 2: Create custom roles

Create your custom roles before enabling any features or migrating members. This ensures your roles are ready to enforce access the moment features turn on.

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click "Add  role."

3. Name the role and toggle the appropriate capabilities on the **Capabilities** tab, or choose "All capabilities" or "All generally available" to grant everything at once:



4. On the **Permissions** tab, set admin permissions for the role. See **Step 3**.

5. On the **Connectors** tab, set connector permissions for the role. See **Step 4**.

6. On the **Models** tab, set model access and a default model for the role. See **Step 5**.

7. Click "Save role."

8. Repeat for each role in your plan.

Role changes may take up to 15 minutes to take effect. Members may need to refresh their browser to see updated access.

See **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)** for details on available capabilities, admin permissions, and connectors.

---

## Step 3: Configure admin permissions (optional)

Set admin permissions on each role to delegate access to admin settings, like billing, user management, or privacy, without granting the Owner role. This step is optional. If you don't configure it, roles grant no admin access and administration stays with Owners and Primary Owners. For what each permission area covers, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

### Locate the Permissions tab

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Open an existing role, or click “Add role” to create one.

3. Select the **Permissions** tab, between **Capabilities** and **Connectors**.



### **Set admin permissions**

The **Permissions** tab lists each admin area: Identity & Access, Billing, Analytics, Privacy, User Management, and Libraries. Set each admin area to one of the following options:

- **No access:** The member doesn't see this area in their organization settings.

- **Can view:** View grants read-only access. The member sees the same pages and settings as someone who can manage that area, but every control is disabled or shown as read-only. Use this permission level for compliance reviewers, finance auditors, security teams, or anyone who needs to see the configuration without changing it.

- **Can manage:** Manage grants full read and write access to the area and includes view access.

Within an area, you grant all of View or all of Manage. You can't grant or restrict individual pages or settings.

**Note:** A role with Identity & Access set to Manage can create and edit groups and roles, including its own role definition. Members with this permission can expand their own access, so reserve it for trusted security and IT administrators.

### **Verify enforcement**

Verify admin permissions after you’ve migrated members to "Custom" roles (Step 7). See **Step 11: Verify and monitor**.

---

## Step 4: Configure connector permissions (optional)

Set connector permissions on each role to control which connectors, and which tools on those connectors, the role can use. This step is optional. If you don’t configure it, your roles fall back to the default behavior described below. For how the permission model works end to end, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

**Important:** When Anthropic enables connector permissions for your organization, every existing custom role is seeded with the “All connectors” grant at “Always allow.” Because “Always allow” is the most permissive grant, your organization-wide tool policy alone determines each member’s effective ceiling at enablement. Members neither gain nor lose access at enablement. Your first configuration pass narrows from that baseline.

**Note:** A newly created role defaults to “Needs approval” on every connector. The create-role flow steps through the Connectors tab so you see this default before saving. Raise a connector to “Always allow” or lower it to “Blocked” as needed.

### Locate the Connectors tab

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Open an existing role, or click “Add role” to create one.

3. Select the **Connectors** tab, next to **Permissions**.

The default settings for new roles are permissive. When creating or modifying a role, confirm the settings on each tab to avoid granting unintended permissions.



### Set connector-level permissions

The **Connectors** tab lists an **All connectors** row at the top, followed by every connector your organization has added. Each row has a dropdown with four options:

- **Always allow:** Every tool on the connector is available, and members can set their own approval to “Always allow.”

- **Needs approval:** Every tool is available, but members confirm each call.

- **Blocked:** The connector is hidden from members with this role.

- **Custom:** Set each tool on the connector individually. See “Set per-tool permissions” below.

Choosing “Always allow,” “Needs approval,” or “Blocked” applies that level to every tool on the connector. The **All connectors** row works the same way one level up: it sets a baseline for every connector at once, including any connector you add later. Use it to set a role’s default, then override individual connectors.



### Set per-tool permissions

Set a connector to **Custom** to reveal its tools as individual rows. Each tool has its own dropdown: “Always allow,” “Needs approval,” or “Blocked.”

Per-tool permissions let a role reach part of a connector. For example, with Jira set to **Custom**, its `search_issues` tool set to “Needs approval,” and every other Jira tool set to “Blocked,” members with the role can search Jira but nothing else. Claude only sees the tools you’ve granted, so asking it to create a ticket returns “I don’t have a tool for that” rather than an error.



### Review cross-role conflicts

Because connector permissions are additive across roles, blocking a connector in one role has no effect on a member who also holds another role that grants it. Each connector row shows a warning when other roles grant the same connector at a different level. The warning names those roles and links to them, and the most permissive grant is the one that applies.

If you have unsaved edits when you open a linked role, you’re asked to discard them first.



### Verify enforcement

Verify connector permissions after you’ve migrated members to "Custom" roles (Step 7). See **Step 11: Verify and monitor**.

**Important:** If your organization uses Claude Code, enabling connector permissions also applies your organization-wide tool policy to Claude Code. This can only narrow tool access there, never widen it, and it affects all members. Review your organization-wide tool policy before enablement if Claude Code is widely deployed. Connector permissions and Claude Code Managed Settings compose by most-restrictive. See **[Claude Code settings](https://code.claude.com/docs/en/settings#settings-files)**.

**Note:** Whether members can set "Always allow" on write-capable connector tools in Cowork is additionally controlled by the organization setting **Allow "Always allow" for connector tools**, which is off by default. Role grants can't override it. Learn more about the **[Cowork approval setting for write tools](https://support.claude.com/en/articles/13455879-use-claude-cowork-on-team-and-enterprise-plans#h_1bd1fa754d)**.

---

## Step 5: Configure model access (optional)

Set model access on each role to control which Claude models the role can use, cap the maximum effort level per model, and choose the model new conversations start on. This step is optional; if you don't configure it, new roles can use every model that's enabled at the organization level, at any effort level, and start on the organization default model.

For how the model access and default model settings work end to end, see **[Manage model access for your organization](https://support.claude.com/en/articles/15694740)** and **[Set a default model for your organization](https://support.claude.com/en/articles/15330088)**.

### Locate the Models tab

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Open an existing role, or click "Add role" to create one.

3. Select the **Models** tab, next to **Connectors**.

### Set model access

Under **Model access**, switch each model on or off for this role. Models disabled at the organization level appear but can't be enabled here until you turn them on for the organization in **[Organization settings > Models](http://claude.ai/admin-settings/models)**. Haiku models are always on and can't be disabled.

To cap the effort level a role can select on a model, click the gear icon next to the model and choose a level.

Under **Default model**, optionally select the model new conversations start on for this role. Only models the role has access to can be selected.

### Verify enforcement

Verify model access after you've migrated members to "Custom" roles. See **Step 11: Verify and monitor**.

---

## Step 6: Create groups and assign roles

1. Navigate to **[Organization settings > Groups](http://claude.ai/admin-settings/groups)**.

2. Click “Add group” to create a group for each team or tier in your plan.

3. Add members to the appropriate groups.

4. Assign each group to the custom roles you created in step 2.





If you use SCIM directory sync, you can sync groups from your identity provider instead of creating them manually. For details on SCIM group sync, see **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**.



**Multiple organizations under the same parent organization:** Groups are managed at the parent organization level and propagate to all child organizations. You may see members from other organizations listed in a group—this doesn't mean they have access to your organization. Custom roles assigned to a group only grant capabilities to members who are part of your specific organization.

If you request to move an organization from one parent to another (this is rare in practice), groups and roles will become undefined and you will need to re-create them.

**Important:** If your organization uses Invite only or JIT provisioning, you can only use manually created groups for RBAC. SCIM-synced groups aren't supported in these modes.

---

## Step 7: Verify group and role assignments

Before migrating members to custom roles, confirm that every member you plan to migrate is in at least one group assigned to a custom role. Members who are migrated without group or role coverage will lose access to all governed features.

1. Navigate to **[Organization settings > Members](http://claude.ai/admin-settings/members)**.

2. Use the Role and Group filters to identify members who aren't assigned to any group.

3. Alternatively, click "Export CSV" to download the full member list with role and group columns for review.

4. Add any unassigned members to the appropriate groups before continuing.

---

## Step 8: Migrate members to custom roles

For custom role capabilities to take effect, members must have their role set to "Custom." Members with the User, Admin, or Owner roles get their permissions from those roles directly, not from custom roles.

**Important:** Complete this step only after you’ve created your custom roles, configured admin and connector permissions if you’re using them, created your groups, and verified all members are assigned to groups. Members moved to custom roles before setup is complete will immediately lose access to all governed features and their previous role. Switching an Owner or Admin to custom roles removes their Owner or Admin access, so don't migrate Owners or Admins unless you intend to replace that access with custom role permissions.

Choose the migration path based on whether your organization already enabled group mappings:

### Path A: Enable group mappings (only if already in use)

Use this path only if your organization already enabled group mappings for role assignment. If you aren't already using this setting, skip to Path B.

1. Navigate to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

2. In the role mappings section, assign the IdP groups you want governed by custom roles to the "Custom" role.

3. Save your changes. Members in those IdP groups are migrated to "Custom" roles on the next sync.



Members in IdP groups mapped to "Custom" roles follow the permissions of the custom roles assigned to their groups in Claude. Members in IdP groups mapped to User follow the organization-level capability settings. If a member is in groups across both mappings, "Custom" roles take precedence.

### Path B: Bulk assignment tool

Use this path if your organization hasn’t enabled group mappings.

**Warning:** If you didn’t already enable group mappings, do not enable it during RBAC setup. Enabling it without first assigning all members to mapped groups can result in members losing access to your organization.

1. Navigate to **[Organization settings > Members](http://claude.ai/admin-settings/members)**.

2. Use the Role and Group filters to select the members you want to migrate.

3. Use the bulk assignment tool in the Members table to change the selected members' role to "Custom."







We recommend migrating a pilot group first—one team or department—and verifying their access is correct before expanding to the rest of the organization.

### Gradual rollout

Whichever path you use, we recommend migrating in stages:

1. Start with a pilot group of one team or department.

2. After migration, verify the pilot group has the correct feature access based on their group and role assignments.

3. If something isn't right, switch the affected members back to their previous role while you adjust.

4. Expand to more members once you've confirmed the setup works.

---

## Step 9: Enable features at the organization level

Only enable organization-level features after roles, groups, and member migration are complete. This ensures custom role capabilities are already in place, with no window where unauthorized members could access a feature.

For any feature you want to control per-group:

1. Navigate to the feature's settings page in **Organization settings** (for example, **[Organization settings > Cowork](http://claude.ai/admin-settings/cowork)**).

2. Enable the feature at the organization level.

Enabling a feature at the organization level doesn't mean everyone gets it—custom role permissions are already in place to control who can use it. Think of the organization-level toggle as making the feature "available for role-based assignment" rather than "on for everyone."

---

## Step 10: Apply a group spend limit (usage-based orgs only)

Navigate to the “Usage” page to assign a per-user monthly spend limit to any group.





Note the following precedence rules:

- Individual limits always override group limits, regardless of which is higher.

- If a user belongs to multiple groups with different limits, the **Multi-group spend limit** setting under **Spending defaults** controls whether the higher or lower limit applies.

- Org-wide limits remain the hard ceiling.

Membership changes take effect automatically—users inherit or lose limits as soon as their group membership changes. Relevant only for usage-based billing orgs.

---

## Step 11: Verify and monitor

1. **Spot-check access**: Open the "⋮" menu on a the right side of a member's row in **[Organization settings > Members](https://claude.ai/admin-settings/members)** and select "View effective role." The modal shows every capability, admin permission, and connector the member has across all their roles, with a "Granted by" label naming which role provides each one. You can do the same for a group from **[Organization settings > Groups](https://claude.ai/admin-settings/groups)**. For details, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452)**.

2. **Test the restricted state**: Log in as (or ask) a member who should not have a feature like Cowork. They should see it greyed out with the message "Contact your admin to request access to this feature."

3. **Test the granted state**: Confirm a member who should have the feature sees it working normally.

4. **Check edge cases**: Test members in multiple groups, members with no group, and new members joining via SSO.

**If you configured admin permissions, also check:**

- **Group and role assignments:** Owners can verify a member's access by checking their group assignments on the Members page and the roles those groups are assigned to on the Roles page.

- **Organization settings:** In organization settings, the member only sees the sections their admin permissions cover. Everything else is hidden from their settings. Members with view access see pages as read-only, with controls disabled.

- **Analytics access:** Members with Analytics access will view analytics in **[Settings > Analytics](https://claude.ai/analytics/activity)**, not organization settings.

**If you configured connector permissions, also check:**

- **Connector menu:** blocked connectors don’t appear, and connectors with at least one granted tool do.

- **Connector settings:** blocked tools are grayed out with “This tool is not enabled for your role. Contact your administrator.” Tools capped at “Needs approval” show a personal approval menu limited to “Ask” and “Never.”

- **In a conversation:** ask Claude to use a blocked tool, and it reports it has no tool for the task. Ask it to use a “Needs approval” tool, and the approval prompt appears without an “Always allow” option.

**If you configured model access, also check:**

- **Model picker:** disabled models don't appear, and the effort menu stops at the role's cap.

- **In a conversation:** ask the member to switch to a disabled model. It shouldn't be listed, and in Claude Code CLI, /model <disabled-model> returns an error.

Role changes may take up to 15 minutes to take effect across the platform. Members may need to refresh their browser to see updated access.

---

## Using SCIM with role-based capabilities

SCIM connects to your role-based capabilities through two mechanisms that work together.

### IdP group-to-role mapping

This controls which built-in role a member gets when they're provisioned. Map your IdP groups to "Custom" roles so that new members' access is automatically governed by custom role capabilities.

1. Navigate to **[Organization settings > Organization and access](http://claude.ai/admin-settings/organization)**.

2. In the role mappings table, map your IdP groups to "Custom" roles.

### Group sync

This pulls your IdP groups into Claude so they can be assigned to custom roles.

1. Navigate to **[Organization settings > Groups](http://claude.ai/admin-settings/groups)**

2. Click “Check for updates” in the **SCIM sync** section.

3. When prompted to sync Groups, Members, or Both, select Groups only. Syncing Members can affect provisioning and member access.

4. Your IdP groups appear as SCIM-sourced groups in the list.

5. Assign SCIM groups to custom roles just like manually created groups.

6. In your IdP, only push the groups you actually intend to use for RBAC or spend limits. Syncing all IdP groups can slow page loads in the Groups section.

**Note:** Custom role permissions only apply to members with "Custom" roles selected in **[Organization settings > Members](https://claude.ai/admin-settings/members)**. If you map an IdP group to a different role (like User) through the group-to-role mapping but assign that same SCIM group to a custom role, the custom role's permissions have no effect—the member gets their permissions from their assigned role instead. To use custom roles, make sure the IdP group is mapped to "Custom."

### Ongoing management with SCIM

- To grant a member access to a feature, add them to the appropriate IdP group. On the next sync, they pick up the custom role assigned to that group.

- To revoke access, remove them from the IdP group. On the next sync, the permission is removed.

- Click “SCIM sync” in the Groups section to force an immediate sync rather than waiting for the next scheduled sync.

---

## Rollback plan

If you notice your role structure is misconfigured after migration:

1. Turn off any organization-level features that were enabled as part of the migration.

2. Change affected members back to their previous built-in role (for example, User).

3. They immediately regain the static permissions from that role, and custom role permissions stop applying.

4. Adjust roles and groups as needed, then re-migrate.

If you enabled group mappings during setup and lost admin access, follow the recovery steps in **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning#h_74979446b3)** under "I lost Admin/Owner access after enabling group mappings."

---

## Frequently asked questions

### Do I need to enable a feature at the organization level if I only want some members to have it?

Yes. The organization-level toggle must be on for custom roles to control per-member access. If a feature is off at the organization level, no one can access it regardless of their role. Think of it as a main switch—custom roles control who gets access underneath it.

### What happens if a member whose role is set to "Custom" isn't in any groups?

They have no custom role permissions, so all features that require permissions are greyed out or hidden. Make sure every member whose roles is set to "Custom" is in at least one group that's assigned to a custom role.

### A model is missing from a member's model picker.

Either the model is disabled at the organization level (**[Organization settings > Models](http://claude.ai/admin-settings/models)**) or none of the member's custom roles grant it. Org-level disables affect everyone, including Owners and Admins.

### What if a custom role doesn't grant chat access?

Members in that role won't see Claude's chat interface. They'll land on their settings page when they sign in. If their role grants other products like Cowork or Claude Code, those remain accessible from their settings page and from the relevant apps.

Chat is enabled by default in all custom roles, so you only need to worry about this if you intentionally toggled chat off for a role.

### Can I use both built-in and custom roles?

Yes. Members with the User, Admin, or Owner roles are unaffected by custom role permissions because they get their permissions from those roles directly. Only members with a role set to "Custom" are controlled by the group-and-role system. This allows gradual migration.

### What if a member is in two groups with different roles?

Permissions are additive. If any role in a member's chain grants a feature, they have it. You can't use a role to remove a permission granted by another role.

### Can I use SCIM groups and manual groups together?

Yes. Both types can be assigned to custom roles. The difference is that SCIM group membership is managed in your identity provider, while manual group membership is managed in Claude's organization settings.

### Are Owners and Primary Owners affected by custom role permissions?

No. Owners and Primary Owners always have full access to all features.

### How does this work across parent and child organizations?

Groups and SCIM sync are managed at the parent organization level and shared across all child organizations. Role and spend limit assignments are configured independently in each child organization—changes in one child organization don't affect others. Group membership changes and SCIM resyncs propagate across all child organizations under the same parent.

### What happens to my existing custom roles when connector permissions are enabled?

Each existing role is seeded with the “All connectors” grant at “Always allow,” so members’ access doesn’t change at enablement. You narrow access from there.

### What’s the default connector permission on a new role?

“Needs approval” on every connector. The create-role flow steps through the Connectors tab so you see this before saving.

### What happens when I add a new connector after my roles exist?

A role whose “All connectors” row is set to “Always allow,” “Needs approval,” or “Blocked” covers the new connector at that level automatically. A role whose “All connectors” row is set to “Custom” treats the new connector as “Blocked” until you set it.

### I blocked a connector in a role, but a member with that role can still use it. Why?

Check whether the member holds another role that grants it, since the most permissive grant wins across roles. The conflict warning on the connector row lists those roles. Also confirm the member’s role is set to "Custom."

### My organization-wide tool policy already blocks a tool. Do I need to block it in every role?

No. The organization-wide policy is the ceiling. A tool blocked there is blocked for everyone, regardless of role grants.

### A member's role and the organization-wide policy are both set to "Always allow," but "Allow for all tasks" is grayed out in Cowork. Why?

Cowork has a separate organization setting, **Allow "Always allow" for connector tools**, that gates write-capable connector tools. It's off by default. Until it's turned on, "Allow for all tasks" stays grayed out regardless of role grants and tool policies, and previously saved always-allow preferences aren't honored. Read-only tools are exempt only when the connector annotates them as read-only, which most custom connectors don't. For more information, see **[Connector tool approvals](https://support.claude.com/en/articles/13455879-use-claude-cowork-on-team-and-enterprise-plans#h_1bd1fa754d).**

### Can a role grant a tool that the organization-wide policy sets to “Needs approval”?

The role can grant it, but the stricter setting wins, so members see it capped at “Needs approval.” To let members set “Always allow,” raise the organization-wide policy to “Always allow” first.

### Can I grant one tool on a connector without granting the whole connector?

Yes. Set the connector to “Custom,” set the one tool to “Always allow” or “Needs approval,” and leave the rest “Blocked.”

### Do connector permissions apply to built-in tools like web search or code execution?

No. Built-in features are governed on the Capabilities tab. The Connectors tab governs connectors your organization has added.

### How quickly do connector permission changes take effect?

Role changes may take up to 15 minutes to take effect. Members may need to refresh their browser.

### Can someone in a custom role with permissions give themselves more access?

Only if their role includes Identity & Access set to Manage, which covers editing roles and groups. Reserve that permission for trusted security and IT administrators, since it can be used to change role definitions including their own.

### Can I give admin permissions to a member on the User, Admin, Owner, or Primary Owner role?

No. Admin permissions only apply to members in a custom role. Members on a built-in role keep the access that role grants. To give someone specific admin permissions, change the member to a custom role and add them to a group assigned to a role with the permissions they need. Keep in mind this removes their previous built-in role access.

### What does someone see when they don’t have permissions for a certain setting?

Organization settings only shows the sections their permissions cover. Sections they don’t have access to are hidden entirely from their organization settings.

### How do I audit who has admin access?

**[Organization settings > Roles](https://Organization%20settings%20>%20Roles)** shows the admin permissions each custom role grants, and **[Organization settings > Groups](http://claude.ai/admin-settings/groups)** shows which groups are assigned to each role and who belongs to them. To check a specific member, look up their groups on **[Organization settings > Members](http://claude.ai/admin-settings/members)**, then the roles those groups are assigned to.

### What if someone needs permissions across multiple areas?

Create one role that grants access to multiple areas, or add the member to multiple groups whose roles cover the areas they need. Permissions combine additively.
---

SOURCE: https://support.claude.com/en/articles/14604406-claude-design-admin-guide-for-team-and-enterprise-plans

# Claude Design admin guide for Team and Enterprise plans

Claude Design lets your team create on-brand designs, prototypes, presentations, and interactive microsites through conversation with Claude.

Claude Design is available in beta to Pro, Max, Team, and Enterprise plans. This capability is default off for Enterprise plans.

Claude Design works best when a **design system** is set up for your organization first. This ensures every project your team creates stays true to your brand, typography, color palette, and component patterns. This guide walks you through enabling Claude Design, setting up the right foundation, and rolling it out to your team.

## Enable Claude Design for your organization

Claude Design is available via a toggle in organization settings, and can be **[controlled using custom roles](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

Before you enable broad access, read through the rollout approach below. Turning on Claude Design without a design system in place means your team will get functional but generic output.

Team and Enterprise plan admins can enable this organization-wide by following these steps:

1. Go to **[Organization settings > Capabilities](https://claude.ai/admin-settings/capabilities)**.

2. Find the **Claude Design** toggle under **Anthropic Labs** and switch it on.



---

## The design system: why it comes first

The single most important thing you can do before rolling out Claude Design is have an experienced designer set up your organization’s design system. Once in place, every project your team creates automatically reflects your brand.

This means your rollout has a natural sequence: design system setup first, then broader access.

### Who should set up the design system

For best results, we recommend pulling in designers across both brand and product design. Together they can ensure the design system covers both brand identity and product UI patterns.

### What they’ll do

1. Create your organization in Claude Design (see **[Set up your design system in Claude Design](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design)**).

2. Complete the onboarding flow.

3. Upload brand assets (codebases, slide decks, or other design references).

4. Validate that Claude generates designs consistent with your brand.

Any member with Claude Design access can create and edit design systems. On the Enterprise plan, you can restrict who can publish design systems, set the organization default, and delete design systems.

---

## Restrict who can manage design systems

The **Claude Design Admin** permission is available on the Enterprise plan through custom roles.

By default, any member with access to Claude Design can publish a design system, set the organization default, and delete design systems. The **Claude Design Admin** permission lets you reserve these actions for specific members, giving your organization a single source of truth for its design systems.

### What the permission controls

Members with the permission set to "Can manage" can:

- **Publish a design system:** Make it available across your organization so anyone can attach it to a project.

- **Set the organization default:** Choose the design system new projects use automatically.

- **Delete a design system:** Permanently remove it from your organization.

Everyone else can still create, edit, and use any published design system. If a member without the permission tries to publish, set the default, or delete, they'll see a note directing them to contact their administrator.

**Note:** If you don't assign this permission to anyone, nothing changes. All members keep the same access to design systems as before.

### Grant the permission

You'll need Owner access to configure roles.

1. Go to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)** and create or edit a custom role.

2. In the **Permissions** tab, find **Claude Design Admin** under **In-app admin** and set it to **Can manage**.

3. Assign the role to a group. Members of that group inherit the permission.

4. Set each member's role to **Custom roles**.

Permissions are additive. A member in multiple groups gets the union of what those groups' roles grant. Learn more about **[managing custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

### Verify access

Permission changes can take up to 15 minutes to apply, and members may need to refresh their browser. There are two ways to confirm:

- **Ask the member to check.** In admin settings, they'll see only the sections their permissions cover.

- **Review as an Owner.** Check the member's groups on the **Members** page, then review those groups' roles on the **Roles** page.

---

## Recommended rollout phases

A phased rollout lets you validate your design system and build internal expertise before broad adoption. You can control access to Claude Design in accordance with each rollout phase using **[custom roles](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

### Phase 1: Design system setup

- **Who:** 2–4 trusted designers and design leads across brand and product design.

- **Goal:** Create and validate your organization’s design system, including product and slide deck templates everyone can use as a starting point.

- **Checkpoint:** Review generated output for brand consistency before proceeding.

### Phase 2: Design team onboarding

- **Who:** Full design team.

- **Goal:** Build familiarity with Claude Design; stress-test the design system across real projects.

- **Checkpoint:** Gather feedback on design quality and refine the design system if needed.

### Phase 3: Product and UX onboarding

- **Who:** Product managers, UX researchers, and adjacent functions.

- **Goal:** Enable faster prototyping and design collaboration beyond the design team.

- **Checkpoint:** Observe usage throughout the organization and gather feedback on usability.

### Phase 4: Broader organization

- **Who:** Entire organization or specific departments.

- **Goal:** Make design creation available widely while maintaining brand consistency.

- **Checkpoint:** Observe usage throughout the organization and gather feedback on usability.

### Rollout tips

- Announce each phase clearly so people know when their turn is coming.

- Consider running a short training session or office hours during early phases.

- Establish a feedback channel for design system improvements.

- Share examples of creative uses of Claude Design internally to help foster creativity.

---

## What your team can do with Claude Design

Once set up, your team can use Claude Design to:

- **Create prototypes and mockups:** Describe a UI and get a working interactive prototype.

- **Build presentations and slide decks:** Generate on-brand decks through conversation, presentable as HTML, PDF, and PPTX.

- **Design microsites and landing pages:** Create polished single-page sites.

- **Iterate with inline comments:** Annotate designs directly on the canvas and ask Claude to implement changes.

- **Hand off to engineering:** Export design intent for use with Claude Code or your existing development workflow.

We have more tutorials available here:

- **[Using Claude Design for prototypes and UX](http://claude.com/resources/tutorials/using-claude-design-for-prototypes-and-ux)**

- **[Using Claude Design for presentations and slide decks](http://claude.com/resources/tutorials/using-claude-design-for-presentations-and-slide-decks)**

---

## Monitor usage

Track Claude Design adoption from the analytics dashboard. Navigate to **[Analytics > Claude Design](https://claude.ai/analytics/claude-design)** to view daily, weekly, and monthly active users for your organization. Claude Design is also available as a product filter on the Overview tab. Learn more about **[viewing usage analytics for Team and Enterprise plans](https://support.claude.com/en/articles/12883420-view-usage-analytics-for-team-and-enterprise-plans)**.

Claude Design doesn't support audit logs yet.

We also recommend supplementing analytics with qualitative check-ins during your rollout: gather feedback from each group as they onboard, and sample a few projects periodically to assess design system compliance.

## Data handling and privacy

When your team uses Claude Design, they may upload design assets, brand guidelines, screenshots, and other materials. Understanding how these are handled is important for organizations with data governance requirements.

- Uploaded assets are stored persistently, and fall under the same **[data retention and deletion policies](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)** as other Anthropic enterprise products.

- Claude Design doesn’t currently support data residency requirements.

### Preview sandbox isolation

Claude Design project previews run inside a sandboxed iframe on a separate content domain that Anthropic operates. These sandboxed iframes help each project preview stay in its own space, separate from others. The code in a preview can't reach your Claude account, your login, or the editor.
​
Access to a preview is controlled by signed tokens—short-lived passes that prove someone's allowed in. Claude re-checks these tokens against your sharing permissions every time someone opens the preview, so when you remove someone's access, they're locked out right away.

---

## Third-party platform availability

Claude Design is currently available only through the web interface at claude.ai/design.

If your organization requires Claude Design through your existing cloud provider agreements, reach out to your Anthropic contact or our **[Sales team](https://claude.com/contact-sales)**.

---

## Usage and billing

Claude Design usage counts toward each member's existing usage limits, shared with chat, Claude Code, and Cowork. There's no separate Claude Design allowance to provision or manage.

- **Team and seat-based Enterprise plans:** Claude Design draws from each member's seat usage limits, including both session and weekly limits. Admins can purchase **[usage credits](https://support.claude.com/en/articles/12005970-manage-extra-usage-for-team-and-seat-based-enterprise-plans)** for members who need more capacity.

- **Usage-based Enterprise plans:** Claude Design usage bills from your organization's consumption at standard API rates, like every other surface. Organization, group, and per-user spend limits apply.

---

## Frequently asked questions

### Do all team members need to upload brand assets?

No. Once a designer sets up your organization’s design system, all projects created within that organization automatically use it. Team members just start creating.

### Can we have multiple design systems for different brands or sub-teams?

Yes. Organizations can have multiple design systems.

### What happens if someone starts using Claude Design before the design system is set up?

They’ll get functional designs, but the designs won’t reflect your brand. We strongly recommend completing design system setup first for the best team experience.

### Who can publish, set the default, or delete design systems?

If you haven't assigned the **Claude Design Admin** permission to anyone, any member with Claude Design access can take these actions. On the Enterprise plan, you can reserve these actions for specific members. See **[Restrict who can manage design systems](#h_e24c8ef395)** above.

### Can I restrict Claude Design to specific departments?

Yes. Enterprise plans can use custom roles to grant access to specific groups or departments rather than enabling it for the whole organization.

### How many users can we onboard at once?

There are no strict limits, but we recommend the phased approach outlined above to ensure quality and successful adoption across your organization.

### Can we export or archive generated designs?

Claude Design currently supports export to HTML bundles, PPTX, PDF, and hand-off to Claude Code or the following partners: Adobe, Base44, Canva, Gamma, Lovable, Miro, Replit, Vercel, or Wix. Reach out to your Anthropic Contact or our **[Sales team](https://claude.com/contact-sales)** if there’s a specific format or destination you need.
---

SOURCE: https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan

# Use the Claude Agent SDK with your Claude plan

**Update June 15:** We're pausing the changes to Claude Agent SDK usage described below. For now, nothing has changed: Claude Agent SDK, `claude -p`, and third-party app usage still draw from your subscription's usage limits. The previously announced monthly credit, which would have been available to eligible claimants in connection with these changes, isn't available. We’re working to update the plan to better support how users build with Claude subscriptions. When we have an update, we'll share it before anything takes effect.

---

**The content below reflects the page before June 15. It's preserved for reference but is no longer taking effect on June 15.**

Claude subscription plans are now eligible to receive a monthly Agent SDK credit. This credit covers Claude Agent SDK usage, the `claude -p` command, and third-party apps built on the Agent SDK. This article explains what the credit covers, how it works, and how to claim it.

Available on Pro, Max, Team, and Enterprise plans starting on June 15, 2026. Claude Platform accounts using an API key don’t receive a credit. Pay-as-you-go billing continues as before.

## What’s changing

Starting **June 15, 2026**, Claude Agent SDK and `claude -p` usage no longer counts toward your Claude plan’s usage limits. Your subscription usage limits stay the same and stay reserved for interactive use of Claude Code, Claude Cowork, and Claude.

To support Agent SDK use, eligible Pro, Max, Team, and Enterprise plan users can claim a separate monthly credit. The credit applies only to Agent SDK usage and refreshes with your billing cycle.

## Monthly credit by plan

| **Plan**                                | **Monthly credit** |
| --------------------------------------- | ------------------ |
| Pro                                     | $20                |
| Max 5x                                  | $100               |
| Max 20x                                 | $200               |
| Team (Standard seats)                   | $20                |
| Team (Premium seats)                    | $100               |
| Enterprise (usage-based)                | $20                |
| Enterprise (seat-based Premium seats\*) | $200               |

*Members of seat-based Enterprise plans on Standard seats aren’t eligible to claim the Agent SDK monthly credit.

---

## What the credit covers

The Agent SDK monthly credit applies to:

- Claude Agent SDK usage in your own projects (Python or TypeScript)

- The `claude -p` command in Claude Code (non-interactive mode)

- The Claude Code GitHub Actions integration

- Third-party apps that authenticate with your Claude subscription through the Agent SDK

The credit doesn’t apply to:

- Interactive Claude Code in the terminal or IDE

- Claude conversations on the web, desktop, or mobile apps

- Claude Cowork

- Other features that draw from usage credits

---

## How the credit works

**Per-user, not pooled.** Credits belong to individual accounts. They can’t be shared or pooled across teammates.

**Refreshes monthly.** Your credit resets at the start of each billing cycle. Unused credits don't roll over to the next billing cycle.

**One-time opt-in.** You claim your credit through your Claude account once. After that, it refreshes automatically each cycle.

**Drains first.** Agent SDK usage draws from your monthly credit before any other source.

**Past the credit, usage moves to usage credits.** When your monthly credit runs out, additional Agent SDK usage flows to usage credits at standard API rates—but only if you've enabled usage credits. If usage credits aren't enabled, Agent SDK requests stop until your credit refreshes.

---

## What stays the same

This change doesn’t affect:

- **Subscription usage limits.** Your plan usage limits haven’t changed as part of this update.

- **Interactive Claude Code.** Using Claude Code in the terminal or your IDE continues to use your subscription usage limits exactly as before.

- **Claude conversations.** Web, desktop, and mobile chat continue to use subscription usage limits.

- **API key users.** If you use the Agent SDK with an API key from the Claude Platform, nothing changes. Pay-as-you-go billing continues, and you don’t receive an Agent SDK monthly credit.

---

## For Team and Enterprise admins

If you administer a Team or Enterprise account, here’s what to know:

**Credits are per-user.** Each eligible user on your team claims their own credit. Credits can’t be pooled, transferred, or shared across the organization.

**Production automation at scale.** The Agent SDK monthly credit is sized for individual experimentation and automation. Teams running shared production automation should use Claude Platform with an API key for predictable pay-as-you-go billing.

**What you need to do.** Nothing right now. Eligible users on your team will receive an email with details and instructions to claim their credit before June 15, 2026.
---

SOURCE: https://support.claude.com/en/articles/15424964-claude-fable-5-on-your-plan

# Claude Fable 5 on your plan

We previously ran a promotion that allowed you to use up to 50% of your weekly subscription limit on Claude Fable 5 at no extra cost. After that promotion ends on July 19, 2026 at 11:59:59 PM PT, Fable 5 will still be available to you, and how you access it will depend on your plan.

On Max plans, premium seats on Team plans, and premium seats on legacy seat-based Enterprise plans, Fable 5 will be a standard part of your plan. On Pro plans, standard seats on Team plans, and standard seats on legacy seat-based Enterprise plans, Fable 5 will run on pay-as-you-go usage credits. This article explains how Fable 5 will work on each plan, how to access it, and what happens when you reach your usage limits.

Claude Fable 5 is available on all paid plans (Pro, Max, Team, and Enterprise).

## How Fable 5 works on each plan

Starting July 20, 2026:

- **Max plans, premium seats on Team plans, and premium seats on seat-based Enterprise plans:** Fable 5 is included as a standard part of your plan. You can use up to 50% of your weekly usage limits on Fable 5 at no extra cost. Fable 5 draws from your plan's regular weekly usage limits and uses them faster than other Claude models. When you reach your Fable 5 limit, you can keep using Fable 5 with usage credits, or switch to another model to stay within your plan's usage limits.

- **Pro plans and standard seats on Team plans:** Fable 5 isn't included in your plan's usage limits. You can use Fable 5 with usage credits, which let you pay for usage beyond what your plan includes. Eligible Pro and Team standard seats qualify for a one-time credit to help with the change. Learn more about the **[Claude Fable 5 one-time free credits promotion](https://support.claude.com/en/articles/15862783)**.

- **Standard seats on seat-based Enterprise plans:** Fable 5 isn't included in your plan's usage limits. You can use Fable 5 if your organization has enabled usage credits, which let you pay for usage beyond what your plan includes. Standard seats on seat-based Enterprise plans don't qualify for the one-time promotional credit.

- **Usage-based Enterprise plans:** Access to Fable 5 is billed at standard API rates. For current per-model pricing, see our **[API pricing page](https://www.anthropic.com/pricing#api).**

- **Claude API:** Access to Fable 5 is billed at standard API rates. For current per-model pricing, see our **[API pricing page](https://www.anthropic.com/pricing#api).**

## How to access Claude Fable 5

You can access Claude Fable 5 on:

- Claude on the web

- Claude Mobile

- Claude Desktop

- Claude Cowork

- Claude Code

- Claude Design

- Claude for Microsoft 365

- Claude Tag

In Claude on the web, Claude Desktop, and Claude Mobile, select "Fable 5" from the model picker. In Claude Code, Fable 5 requires version 2.1.170 or later. To use Fable 5 in Claude Cowork, you need to be on the latest version of Claude Desktop.

## When you reach your Fable 5 usage limit

On Max plans, premium seats on Team plans, and premium seats on seat-based Enterprise plans, once you use up to 50% of your weekly usage limits on Fable 5, you can continue in one of two ways: keep using Fable 5 with usage credits, or switch to another Claude model to keep working within your plan's usage limits.

On Pro plans, standard seats on Team plans, and standard seats on seat-based Enterprise plans, Fable 5 runs on pay-as-you-go usage credits from the start, since it isn't included in your plan's usage limits.

This works the same way across Claude on the web, Claude Mobile, Claude Desktop, Claude Cowork, and Claude Code. Learn more about **[usage credits](https://support.claude.com/en/articles/12429409)**.

## Frequently asked questions

### Why can’t I see Claude Fable 5?

Check the following:

- You’re on a paid Claude plan. Fable 5 isn’t available on the Free plan.

- If you’re using Claude Code, you’re on version 2.1.170 or later.

- If you’re using Cowork, you’re on the latest version of Claude Desktop.

- Your organization hasn't enabled Fable 5.

### Will this use my regular usage limits?

It depends on your plan. On the Max plan, premium seats on the Team plan, and premium seats on the seat-based Enterprise plan, Fable 5 counts toward your plan's usage limits, and you can use up to 50% of your weekly usage limits on Fable 5 at no extra cost. On the Pro plan, standard seats on the Team plan, and standard seats on the seat-based Enterprise plan, Fable 5 runs on usage credits rather than your plan's usage limits.

### Will I get 50% more for my weekly limit for Fable 5 if I’m on the Max plan, Team plan with premium seats, or a seat-based Enterprise plan with premium seats?

No. You can use up to 50% of your weekly limit on Fable 5, but your use of other models draws from the same usage limits and you can never use more than your weekly limit. You can track both in your usage settings.

### I'm on the Pro or Team plan. Why is Fable 5 no longer included?

The earlier promotion that included Fable 5 in your plan's weekly usage limits ended on July 19, 2026 at 11:59:59 PM PT. On the Pro plan and standard seats on the Team plan, you can keep using Fable 5 with usage credits or by upgrading to the Max plan. You may also be eligible for a one-time credit. Learn more about the **[Claude Fable 5 one-time free credits promotion](https://support.claude.com/en/articles/15862783)**.
---

SOURCE: https://support.claude.com/en/articles/8241216-i-m-planning-to-launch-a-product-using-the-claude-api-what-steps-should-i-take-to-ensure-i-m-not-violating-anthropic-s-usage-policy

# I’m planning to launch a product using the Claude API. What steps should I take to ensure I’m not violating Anthropic’s Usage Policy?

We founded Anthropic to put safety at the frontier of AI research and AI products. Our research informs our commercial products, and our models are some of the most reliably safe and resistant to abuse available today. We are working to improve our safety filters based on user feedback - and we expect our commercial customers will hold us accountable when our safety features are failing.

But we believe safety is a shared responsibility. Our features are not failsafe, and committed partners are a second line of defense. Depending on your use case, moderation steps will look different, but here are some additional safety recommendations:

- [Use Claude as a content moderation filter](https://docs.claude.com/en/docs/about-claude/use-case-guides/content-moderation) to identify and prevent violations.

- For external-facing products, disclose to your users that they are interacting with an AI system.

- For sensitive information and decision making, have a qualified professional review content prior to dissemination to consumers.

We encourage you to send us feedback or specific proposals to <usersafety@anthropic.com>. For existing commercial partners, we’d recommend [joining our Discord server](https://discord.com/invite/6PPFFzqPDZ) and exchanging ideas with fellow developers as well.
---

SOURCE: https://support.claude.com/en/articles/8325606-what-is-the-pro-plan

# What is the Pro plan?

This article is about paid Pro plans for individual consumers. If you're part of an organization looking to use Claude with your team, refer to **[Team and Enterprise Plans](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans)**.

The Pro plan is a paid plan for our Claude chat experience. It is currently available in certain **[supported locations](https://support.claude.com/en/articles/8461763-where-can-i-access-claude)**.

## Key benefits

The benefits of the Pro plan are:

- At least five times the usage per session compared to our free service.

- Priority access to Claude during high-traffic periods.

- Early access to new features that help you get the most out of Claude.

- **[Claude Code access](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)**

- **[Cowork access](https://support.claude.com/en/articles/13345190-getting-started-with-cowork)**

Learn how to **[sign up for the Pro plan](https://support.claude.com/en/articles/8325609-how-do-i-sign-up-for-the-pro-plan)**.

**Note:**  The Pro plan does not include API usage through the Claude Console. If you're interested in both enhanced Claude features and the Claude API, you'll need to **[set up Console access](https://support.claude.com/en/articles/8114521-how-can-i-access-the-claude-api)** to pay for API usage separately.

---

## How much does the Pro plan cost?

The Pro plan is available for $20 per month (US), with pricing in your local currency where supported. Monthly pricing varies by region, and some regions include applicable taxes in the displayed price while others add tax at checkout.

You can choose to save with an annual subscription plan. Annual subscriptions are billed once yearly at a discounted rate.

Visit **[claude.ai/upgrade](https://claude.ai/upgrade)** or check your mobile app store for current pricing in your region.

Price and plans are subject to change at Anthropic's discretion.

## How can I get a free or discounted Pro plan?

We do not offer standard discounted pricing any of our paid plans, including Pro plans. With that said, anyone in a supported location can access the free version of Claude by navigating to claude.ai and signing up using an email address.

We occasionally run limited-time promotions, but we don't have any standing discounts available upon request. These promotional offers are typically announced through our official channels when available. If you're interested in potential future promotions, we recommend following our official social media accounts or signing up for our newsletter to be notified of any special offers. Our Support team cannot issue one-off discounts or coupons.

---

## Does the Pro plan have any usage limits?

Yes. During peak hours, the Pro plan offers at least five times the usage per session compared to our free service. The number of messages you can send will vary based on message length, including the length of files you attach, the length of your current conversation, and the model or feature you use. Your session-based usage limit will reset every five hours.

Pro plans also have a weekly usage limit that applies across all models. Weekly limits reset at a fixed time each week that is assigned to your account. Your reset day and time stay the same regardless of when you start using Claude or when your subscription begins, and you receive your full weekly allowance each cycle. You can see your next reset time in **[Settings > Usage](https://claude.ai/new#settings/usage)**.

In addition, to manage capacity and ensure fair access to all users, we may limit your usage in other ways, such as weekly and monthly caps or model and feature usage, at our discretion.

For more information about usage and length limits, refer to **[Understanding usage and length limits](https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits)**. For guidance on using your Pro capacity efficiently, we also have **[Usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices)**.

### How do I increase my Pro plan usage limits?

Our Max plans offer more usage for individuals than Pro plans. For additional information, see **[What is the Max plan?](https://support.claude.com/en/articles/11049741-what-is-the-max-plan)**

Pro subscribers can also enable usage credits to continue working with Claude beyond the plan’s included usage limits. For more information and instructions for enabling this feature, see **[Manage usage credits for paid Claude plans](https://support.claude.com/en/articles/12429409-)**.
---

SOURCE: https://support.claude.com/en/articles/8325609-how-do-i-sign-up-for-the-pro-plan

# How do I sign up for the Pro plan?

This article applies to individual consumers signing up for paid Pro plans. If you're part of an organization looking to use Claude with your team, refer to [Team and Enterprise Plans](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans).

## Instructions for new users

1. Navigate to Claude ([claude.ai](http://claude.ai)) in a web browser.

2. Enter your email address and click “Continue with email” or click “Continue with Google” if applicable.

3. Follow the Google prompts, or use the emailed login link to access your new Claude account.

4. Click on your initials or name in the lower left corner and select “Settings” from the menu.

5. Navigate to [Settings > Billing](http://claude.ai/settings/billing) and click the “Upgrade plan” button.

6. After landing on [the upgrade page](https://claude.ai/upgrade), click “Get Pro plan.”

7. Choose between monthly and annual billing periods.

8. Enter your payment information and click “Subscribe.”

## Instructions for existing free users

1. Log in to your free Claude account.

2. Click on your initials or name in the lower left corner and select “Settings” from the menu.

3. Navigate to [Settings > Billing](http://claude.ai/settings/billing) and click the “Upgrade plan” button.

4. After landing on [the upgrade page](https://claude.ai/upgrade), click “Get Pro plan.”

5. Choose between monthly and annual billing periods.

6. Enter your payment information and click “Subscribe.”

## How does subscription renewal work for Pro plans?

After subscribing for a Pro plan, your subscription will be set to automatically renew at the end of each billing period (monthly or annual) by default. This ensures uninterrupted access to Pro features. However, you have the flexibility to [cancel your paid plan](https://support.claude.com/en/articles/8325617-how-do-i-cancel-my-paid-claude-subscription) at any time if you choose not to continue.

## I am outside of your supported locations; can I subscribe to the Pro plan?

No. Paid plans are only available for users physically located in one of our [supported locations](https://support.claude.com/en/articles/8461763-where-can-i-access-claude), and we require a phone number from a supported location to create an account.

## Is there still a free version of Claude?

Yes. You can still access the free version of Claude without subscribing for a paid plan. Note that like Pro, the free version of Claude is only available to customers physically located in one of our [supported regions](https://support.claude.com/en/articles/8461763-where-can-i-access-claude).
---

SOURCE: https://support.claude.com/en/articles/8325617-cancel-your-pro-or-max-subscription

# Cancel your Pro or Max subscription

You may cancel your Pro or Max plan subscription at any time by following the cancellation instructions for the platform you signed up on. Your cancellation will take effect at the end of your current billing period and you can continue using your paid plan until then.

**Note:** To avoid being charged for your next billing period, cancel your subscription at least 24 hours before your next billing date.

## Cancel your Pro or Max subscription on Claude and Claude Desktop

If you signed up for a paid plan on the web version of Claude (**[claude.ai](https://claude.ai)**) or Claude Desktop (Mac, Windows, or Linux), start by logging into your account on a web browser or opening the desktop app. Click on your initials or name in the lower left corner and select “Settings” from the menu. Navigate to **[Settings > Billing](https://claude.ai/settings/billing)** and click the “Cancel” button.

## Cancel your Pro or Max subscription on Claude for iOS

If you subscribed to a Pro or Max plan via Claude for iOS, your subscription and payment will be handled directly on your iOS device.

To cancel your subscription, click on your initials in the top right corner of Claude for iOS, and then click “Billing” from the menu options. Select “Manage subscription” and follow the prompts for cancellation. If you’ve already removed the app from your device, you can also follow the instructions located in this App Store resource to unsubscribe: **[If you want to cancel a subscription from Apple](https://support.apple.com/en-us/118428)**.

You may cancel your Pro or Max subscription at any time from the platform you signed up on. To avoid being charged for your next billing period, cancel your subscription at least 24 hours before your next billing date.

## Cancel your Pro or Max subscription on Claude for Android

If you subscribed to a Pro or Max plan via Claude for Android, your subscription and payment will be handled directly on your Android device.

To cancel your subscription, click on your initials in the top right corner of Claude for Android, and then click “Billing” from the menu options. Select “Manage subscription” and follow the prompts for cancellation. If you’ve already removed the app from your device, you can also follow the instructions located in this Play Store resource to unsubscribe: **[Cancel, pause, or change a subscription on Google Play](https://support.google.com/googleplay/answer/7018481?hl=en&co=GENIE.Platform%3DAndroid)**.

You may cancel your Pro or Max subscription at any time from the platform you signed up on. To avoid being charged for your next billing period, cancel your subscription at least 24 hours before your next billing date.
---

SOURCE: https://support.claude.com/en/articles/8325618-paid-plan-billing-faqs

# Paid plan billing FAQs

This article covers Pro and Max subscriptions purchased on the web. If you subscribed through Claude for iOS or Claude for Android, your payment is handled by the Apple App Store or Google Play, and you'll manage your payment method and receipts through your app store account. To cancel or manage an app store subscription, see **[Cancel your Pro or Max subscription](https://support.claude.com/en/articles/8325617)**.

## Where can I find the invoice or receipt for my Pro or Max plan payment?

If you are subscribed to a paid plan (Pro or Max), follow these steps to access your invoices:

1. Click on your initials or name in the lower left corner and select “Settings” from the menu.

2. Navigate to **[Settings > Billing](https://claude.ai/settings/billing)**.

3. Find the **Invoices** section.

4. Click the "View" button next to the invoice you want to open.

Additionally, all invoices are automatically emailed to your billing email address. To find previously emailed invoices in your inbox, search by the subject line "Your receipt from Anthropic."

## How can I edit the billing details for my existing paid Claude subscription?

1. Click on your initials or name in the lower left corner and select “Settings” from the menu.

2. Navigate to **[Settings > Billing](https://claude.ai/settings/billing)**.

3. Click the "Update" button next to your payment method.

4. Enter your new billing details in the payment update form.

5. Click "Update" to save your changes.

6. Your updated payment method will be charged the next time your subscription renews.

## How can I change or remove the card on my Pro or Max subscription?

To change the card on your Pro or Max subscription:

1. Navigate to **[Settings > Billing](https://claude.ai/settings/billing)**.

2. Click the “Update” button next to your payment method.

3. Enter your new card details.

4. Click “Update” to save your changes.

The new card becomes your default payment method, and all future subscription renewals are charged to it. Your previous card is no longer billed.

There's no separate option to remove a card, and updating to a new card replaces the old one for billing purposes. The billing page only shows your current default card. Previously used cards are no longer charged, but they may remain stored with our payment processor. If you need a previous card fully removed from your account, please contact **[our support team](https://support.claude.com/en/articles/9015913-how-to-get-support)**.

## How can I use a different name on my invoices?

If you want to use a name other than the one tied to your payment method, check the "Use a different name on invoices" box when adding or updating your payment method in **[Settings > Billing](https://claude.ai/settings/billing)**.



## How can I edit a paid invoice?

Once an invoice is paid, there isn't a way to edit the information on the finalized invoice. Additionally, our internal teams cannot reissue paid invoices or modify information on previous invoices.

## Can I change the date I'm charged for my Pro or Max subscription?

No, there isn't a direct way to change your subscription billing date. However, you can unsubscribe from your current plan, then resubscribe on your preferred billing date to establish your new monthly billing cycle on a different date.

## What alternate payment methods are available?

For subscriptions purchased on the web, we only accept credit or debit cards. If you subscribed through Claude for iOS or Claude for Android, available payment options are determined by the Apple App Store or Google Play.

## I have a paid plan, but my account is showing as free; how can I access my paid account?

If you've paid for a Pro or Max plan but are not seeing this reflected in your account, there are two things you should check:

1. You've logged in with a different email. We recommend trying to sign in with any alternative emails you may have used to create your paid account.

2. Your payment method failed and your account was downgraded. To check this, navigate to **[Settings > Billing](https://claude.ai/settings/billing)** to confirm your recent payment status and update your payment method or billing details if needed.
---

SOURCE: https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans

# How large is the context window on paid Claude plans?

Claude Opus 5 and Sonnet 5 support a 1M token context window on all paid plans when chatting with Claude. Claude Opus 4.8, Opus 4.7, Opus 4.6, and Sonnet 4.6 support a 500K token context window on all paid plans when chatting with Claude. Outside of these models, Claude’s context window size is 200K, meaning it can ingest 200K+ tokens (about 500 pages of text or more) when using a paid Claude plan.

When using Claude Code with a Pro, Max, Team, or Enterprise plan, Claude Sonnet 5, Fable 5, Opus 5, Opus 4.8, Opus 4.7, and Opus 4.6 support a 1M token context window. Pro users need to enable usage credits to access the 1M token context window for Opus models. Sonnet 4.6 also supports a 1M context window for all paid Claude plans on Claude Code, but usage credits must be enabled to access it (except for usage-based Enterprise plans).

## Automatic context management

For users on paid plans with code execution enabled, Claude automatically manages your conversation context. When your conversation approaches the context window limit, Claude summarizes earlier messages to make room for new content. This does not count towards your usage limit, and allows conversations to continue indefinitely in most cases.

Your full chat history is preserved so Claude can reference it, even after earlier portions have been summarized. You may occasionally notice Claude "organizing its thoughts" during long conversations—this is the automatic context management at work.

**Note:** Code execution must be enabled for automatic context management to work. In rare edge cases (such as very large first messages or system errors), you may still encounter context window limits.

## Maximizing your context window

While context is managed automatically for most conversations, you can still optimize how you use your available context space:

- **Utilize projects effectively:** Projects use retrieval-augmented generation (RAG), which allows Claude to work with larger amounts of information by only loading relevant content into the context window.

- **Keep project instructions concise:** Claude performs best when you use project instructions for general context around your project, key guidelines, and Claude's role.

- **Manage tools and connectors:** These features are token-intensive, so being mindful of how many you have active helps maximize your available context.
---

SOURCE: https://support.claude.com/en/articles/9266767-what-is-the-team-plan

# What is the Team plan?

The Team plan is a paid plan for our Claude chat experience built for ambitious teams. It is currently available in certain **[supported locations](https://support.claude.com/en/articles/8461763-where-can-i-access-claude)**.

## What’s included in the Team plan?

Users with Standard seats on the Team plan can access the following:

- **Increased usage:** More usage than the Pro plan per five-hour session, so every team member can get what they need from Claude.

- **Option to purchase usage credits:** Prepay for usage credits, allowing team members to continue working after reaching limits.

  - Read more here: **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-)**

- **Admin tools and billing management:** Manage access and billing in a centralized place.

- **Advanced identity and access management:**

  - **Single-Sign-On (SSO) and Domain Capture:** Enhance authentication security and user experience.

  - **Just-in-Time Provisioning (JIT):** Streamline user authentication and manage access across your organization.

  - **Role-based permissioning:** Customize access levels and control user privileges across your organization.

- **Spend controls:** Set spending caps at organization and individual user levels.

- **Enterprise search capabilities:** Dedicated search project for unified knowledge access.

  - Pre-configured with optimized search instructions

  - Automatic provisioning for all organization members

  - Search across Slack, Microsoft 365, and custom connectors

  - For more details, see **[Use enterprise search](https://support.claude.com/en/articles/12489464)**

- **Connectors for your workplace tools:** Connect Claude to Google Drive, Gmail, Google Calendar, GitHub, Microsoft 365, and Slack to search and retrieve context from your existing documents, emails, calendars, and team communications—without manual uploads.

- **Everything in Pro, including:**

  - Access to all available models.

  - Access to Claude Code to delegate coding tasks from concept to completion directly from your terminal.

  - Access to **[Cowork](https://support.claude.com/en/articles/13345190-get-started-with-cowork)**.

  - Access to projects, knowledge bases, and collaboration features.

  - 200k context window. Room to process long documents, discuss complex topics, and maintain multi-step conversations.

  - Priority access during high-traffic periods, early access to new features, more usage, and more.

---

## Premium seats for Team plans

In addition to all features of Standard seats listed above, Premium seats offer significantly more usage than Standard seats. This makes Premium seats ideal for power users who need extended capacity for demanding workloads.

Organizations can mix and match seat types, assigning Premium seats to power users who need more usage while keeping other team members on Standard seats.

Refer to this article for more information about Premium seats: **[Purchase and manage seats on Team plans](https://support.claude.com/en/articles/12004354)**.

---

## How much does the Team plan cost?

Team plans require a minimum of two members. Pricing varies by seat type and billing interval:

**Standard seats**

- $25 per member per month, billed monthly

- $20 per member per month, billed annually

**Premium seats**

- $125 per member per month, billed monthly

- $100 per member per month, billed annually

Prices shown are for US customers and exclude applicable taxes. Pricing, currency, and tax handling vary by region. Visit **[claude.ai/upgrade](https://claude.ai/upgrade)** to see current pricing for your location.

For more details on billing, see **[How is my Team plan bill calculated?](https://support.claude.com/en/articles/9267289-how-is-my-team-plan-bill-calculated)**

Team plans support up to 150 seats. If your organization is on the Team plan and needs more than 150 seats, you can upgrade to the **[Enterprise plan](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)**. For more information, see **[Migrate your organization from Team to Enterprise](https://support.claude.com/en/articles/13779868-migrate-your-organization-from-team-to-enterprise)**.

Price and plans are subject to change at Anthropic's discretion.

---

## Do Team plans have any usage limits?

Yes. For both Standard and Premium seats, weekly limits reset at a fixed time each week that is assigned to your account. Your reset day and time stay the same regardless of when you start using Claude or when your subscription begins, and you receive your full weekly allowance each cycle. You can see your next reset time in **[Settings > Usage](https://claude.ai/new#settings/usage)**.
​
Usage limits differ between Standard and Premium seats in the following ways:

**Standard seats:** Team plan Standard seats offer 1.25x more usage per session than the Pro plan and have a weekly usage limit that applies across all models.

**Premium seats:** Team plan Premium seats offer 6.25x more usage per session than the Pro plan. Users assigned to these seats ​​also have two weekly usage limits: one that applies across all models and another for Sonnet models only.

### Do usage limits apply across the team or to individual members?

Usage limits on Team plans are per-member, rather than applied to the team as a whole.

This means:

- Each team member has their own set of usage limits.

- If one team member reaches their seat's included usage limit, it does not affect the limits of other team members.

- Other team members can continue to use the service even if one member has reached their seat's included limit.

### How do I increase my Team plan usage limits?

Your Team plan organization can enable usage credits to allow team members on all seat types to continue working with Claude, Cowork, and Claude Code after reaching their included usage limits. For more information, see **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-)**.
---

SOURCE: https://support.claude.com/en/articles/9267247-get-started-with-the-team-plan

# Get started with the Team plan

## Requirements to sign up for a Team plan

- The account creator must use a business email address. Public domains like @gmail.com, @yahoo.com, and @hotmail.com aren't allowed—but you can **[add them as permitted domains](https://support.claude.com/en/articles/13325567-account-management-faqs#h_b54c41c86c)** for other members of your organization.

- All team members must have an email address with one of your organization's allowed email domains to be invited to the account.

- During sign-up, you can choose between monthly or annual billing options.

  - Refer to this article for more information: **[How is my Team plan bill calculated?](https://support.claude.com/en/articles/9267289-how-is-my-team-plan-bill-calculated)**

- Team plans require a minimum of two members and are not intended for individual use.

## Create a new Team organization

To get started with the Team plan, navigate to **[claude.ai/login](http://claude.ai/login)** and enter your work email address. Follow the onboarding prompts and select the Team plan.

## Upgrade from an individual plan to the Team plan

If you already have an individual Free, Pro, or Max account associated with your work email and wish to create a Team plan, sign into your individual account, then visit **[claude.ai/upgrade](http://claude.ai/upgrade)**. Follow the steps to create your Team.

Upgrading to the Team plan creates a new Claude organization. Your individual Free, Pro, or Max account remains separate, and you can toggle between the two by clicking your initials or name in the lower left and selecting the account you'd like to access.

If you'd rather use a single account, you can migrate your personal account into your Team organization. Migration moves your chats, projects, files, and memory into the organization's workspace, and your paid individual subscription is canceled automatically as part of the migration (subscriptions purchased through the Apple App Store must be canceled separately first). To get started, go to **[Settings > Account](https://claude.ai/settings/account)**, or see **[Move your personal Claude account to a Team or Enterprise organization](https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization)** for details.

**Note:** Once content has been moved into an organization, it can't be moved back to a personal account.
---

SOURCE: https://support.claude.com/en/articles/9267289-how-is-my-team-plan-bill-calculated

# How is my Team plan bill calculated?

Prices shown are for US customers and exclude applicable taxes. Pricing, currency, and tax handling vary by region. Visit **[claude.ai/upgrade](http://claude.ai/upgrade)** to see current pricing for your location.

For current pricing by seat type and billing interval, see **[What is the Team plan?](https://support.claude.com/en/articles/9266767-what-is-the-team-plan)**

For information on seat types and what's included, see **[Purchasing and managing seats on Team plans](https://support.claude.com/en/articles/12004354-purchasing-and-managing-seats)**.

---

## How does adding or removing members affect my bill?

**Adding members or upgrading seats:** You will be charged the prorated amount immediately.

**Removing members:** You will not receive an immediate credit or refund. The seat becomes available to assign to another member.

For instructions to add and remove members, see **[Managing members on Team and Enterprise plans](https://support.claude.com/en/articles/13133750-managing-members-on-team-and-enterprise-plans)**.

---

## Usage credits

If usage credits are enabled, your bill may include charges for usage beyond seat limits. For details on how usage credits work and how they're billed on your plan, see **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-)**.

---

## Billing examples

### Annual plan example

On January 1 (the start date of your annual subscription), your annual plan has 10 standard seats. The amount charged would be $2,400 ($20 × 10 seats × 12 months) due on January 1st.

On April 1st, you decide to upgrade five of the existing standard seats to premium seats. Since there are 275 days remaining in your subscription year, the prorated cost for the seat upgrades would be: ($80 × 5 seats × 12 months) × (275 days ÷ 365 days in the year) = $3,616.44. Your payment method will be charged $3,616.44 on April 1st for the seat upgrades for the remainder of the subscription year.

If you remove members during your subscription year, their seats will become available to assign to other team members.

Taxes are not included in this example.

### Monthly plan example

On January 1 (the first day of your billing cycle), your Team plan has 10 standard seats. The amount charged would be $250 ($25 × 10 seats) due on January 1st.

On January 15th, you decide to upgrade five standard seats to premium seats. Since there are 16 days remaining in January, the prorated cost for the seat upgrades would be: ($100 × 5 seats × 16 days) ÷ 31 days in January = $258.06. Your payment method will be charged $258.06 on January 15th for the seat upgrades in January.

You will be charged for the number of members on your team at the beginning of each billing cycle. If you remove members in the middle of a billing cycle, their seats will become available to assign to other team members.

Taxes are not included in this example.

**Note:** The "Projected total" displayed on **[your organization’s Billing page](https://claude.ai/admin-settings/billing)** is not inclusive of taxes.

Price and plans are subject to change at Anthropic's discretion.
---

SOURCE: https://support.claude.com/en/articles/9267323-cancel-your-organization-s-team-plan-subscription

# Cancel your organization's Team plan subscription

An Owner or Primary Owner can cancel Team plan access by navigating to **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**. Canceling your Team plan subscription means that your organization won't be charged for the next billing cycle. Your team will continue to have access to Claude until the end of the current billing cycle.

Removing a member from your Team plan ends their access immediately. If the removed member occupied an additional seat beyond the two members included by default, you will receive a prorated credit for the current billing cycle. If there are less than two current members, you can still add up to two members until the end of the billing cycle. For all other membership changes, you would need to resubscribe.
---

SOURCE: https://support.claude.com/en/articles/9796617-can-you-delete-data-that-i-sent-via-team-and-enterprise-plans

# Can you delete data that I sent via Team and Enterprise plans?

*This article is about our commercial products such as Claude for Work and the Anthropic API. For our consumer products such as Claude Free, Pro, Max and when accounts from those plans use Claude Code, see* *[here](https://privacy.claude.com/en/collections/10663362-consumers).*

While using Team and Enterprise plans, prompts and conversations in the product are maintained so you can see your conversation history in the product. You can [delete your chats](https://privacy.claude.com/en/articles/11117329-how-can-i-delete-or-rename-a-conversation) to remove them from your visible history.

We also retain data in our backend systems as described [here](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data).

Read more [here](https://privacy.claude.com/en/articles/7996875-can-you-delete-data-that-i-sent-via-api) about deleting data sent via API.

Enterprise plan customers can also set [custom retention timelines](https://support.claude.com/en/articles/10440198-custom-data-retention-controls-for-claude-enterprise) for their organization’s data.
---

SOURCE: https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan

# What is the Enterprise plan?

The **[Enterprise plan](https://claude.com/solutions/enterprise)** is designed for organizations that need advanced security, compliance controls, and scalable AI across their teams. It includes everything in the **[Team plan](https://support.claude.com/en/articles/9266767-what-is-the-team-plan)**, plus additional security and compliance features. Enterprise plan pricing works differently than Team plans: the seat fee covers access only, and all usage is billed separately at API rates.

For more information on Enterprise plan pricing, refer to **[our pricing page](https://claude.com/pricing/enterprise)**.

Enterprise plans are available two ways:

- **[Self-serve](https://claude.ai/create/enterprise?utm_source=support&utm_medium=article&utm_content=enterprise-plan_self-serve_intro)** — purchase directly online without sales involvement.

- **[Sales-assisted](https://claude.com/contact-sales?utm_source=support&utm_medium=article&utm_content=enterprise-plan_contact-sales_intro)** — work with our Sales team for advanced options and dedicated support.

**Important:** If your organization currently uses **Chat** and **Chat + Claude Code** seats, or **Standard** and **Premium** seats, refer to the sections at the end of this article for information specific to your plan.

---

## What's included in the Enterprise plan?

Enterprise includes everything in the Team plan, plus the following:

- **Security features** to ensure the safety and compliance of your organization's data including:

  - **Audit logs:** capture key information about user actions, system events, and data access.

  - **System for Cross-domain Identity Management (SCIM)**

  - **Custom data retention controls**

  - **Compliance API:** programmatically access Claude usage data including activity logs, chat histories, and file content, with filtering capabilities by user and time range.

  - **Analytics API:** Programmatically access aggregated engagement and adoption metrics for your organization.

  - **Customer-managed encryption keys:** Provision an encryption key in your own cloud provider that your organization controls, and have Anthropic use it to protect your team's chats, projects, and files in Claude.

  - **US-only inference:** Keep your organization's inference within the United States.

- **Usage-based pricing**

  - The seat fee only covers access to the platform and doesn't include any usage. All usage across Claude, Claude Code, and Cowork is billed separately at standard API rates, based on what your team actually consumes. There are no per-seat usage limits and no included token allowance.

  - Admins can set spend limits at the organization and individual user levels to manage costs.

- **Connectors for workplace tools**

  - Connect Claude to Google Drive, Gmail, Google Calendar, GitHub, Microsoft 365, and Slack to search and retrieve context from your existing documents, emails, calendars, and team communications without manual uploads.

- **HIPAA-readiness**

  - Eligible organizations can enable a HIPAA-ready configuration and accept a BAA from organization settings. Learn more about **[HIPAA-ready Enterprise plans](https://support.claude.com/en/articles/13296973-hipaa-ready-enterprise-plans).**

---

## Pricing

Enterprise uses a single seat type, priced per user per month and billed annually. The seat fee gives each user access to Claude on web, desktop, and mobile, plus Claude Code and Cowork.

**Usage isn't included in the seat fee.** Every token your team uses—in Chat, Claude Code, or Cowork—is billed at standard API rates on top of your seat cost. For full details on how usage billing works for your plan, see **[How am I billed for my Enterprise plan?](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan)**

Price and plans are subject to change at Anthropic's discretion.

---

## Do Enterprise plans have any usage limits?

Usage-based Enterprise plans—including the single Enterprise seat described above—have **no plan or seat-level usage limits**. Usage is billed based on actual consumption rather than capped at a fixed amount.

If your organization is on a seat-based plan with Standard and Premium seats, usage limits do apply. See the **[Standard and Premium seats section](#h_f8351870fb)** below for details, including how to enable usage credits on those plans.

### How does usage apply across the team?

On usage-based Enterprise plans, there's no token allowance to divide up. Instead, every team member's usage is metered and billed to the organization at API rates. One person's heavy usage doesn't reduce what's available to anyone else, because nothing is allocated in the first place. If you need cost predictability, admins can set spend limits at the organization or user level.

---

## Self-serve vs. sales-assisted Enterprise

Both self-serve and sales-assisted Enterprise plans include the same features and the same seat pricing. The differences are in how you purchase, pay, and manage your plan:

|                             | **Self-serve**                                                                                                                       | **Sales-assisted**                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **How to purchase**         | **[Online](https://claude.ai/create/enterprise?utm_source=support&utm_medium=article&utm_content=enterprise-plan_self-serve_intro)** | Through our **[Sales team](https://claude.com/contact-sales?utm_source=support&utm_medium=article&utm_content=enterprise-plan_contact-sales_intro)** |
| **Minimum number of seats** | 20                                                                                                                                   | 50                                                                                                                                                   |
| **Payment methods**         | Credit card, ACH\*                                                                                                                   | Credit card†, ACH, invoicing                                                                                                                         |
| **Accepted currency**       | USD only                                                                                                                             | Multi-currency supported                                                                                                                             |
| **Usage billing**           | Credits purchased upfront                                                                                                            | Billed monthly in arrears                                                                                                                            |
| **HIPAA-readiness / BAA**   | Available                                                                                                                            | Available                                                                                                                                            |

*New self-serve Enterprise organizations can choose ACH bank transfer, credit card, or debit card at signup. Organizations upgrading from a Team plan start on credit card and can switch to ACH bank transfer afterward in **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**.

†For sales-assisted invoices of $50,000 or more, only bank transfer (ACH or wire) is available. Reach out to your Anthropic Contact to request a card-payment exception.

**When to contact Sales:** If your organization needs invoicing, dedicated customer success management, or to pay with a currency other than USD, reach out to our **[Sales team](https://claude.com/contact-sales)** to set up a sales-assisted Enterprise plan.

---

## How to get the Enterprise plan

### Self-serve Enterprise plans

Visit **[claude.ai/create/enterprise](http://claude.ai/create/enterprise)** to purchase an Enterprise plan directly. You can pay with a credit card or ACH bank transfer (USD only).

**About ACH bank transfers**

New self-serve Enterprise organizations can choose to pay by ACH bank transfer instead of credit card. ACH is a push-based payment method, which means you initiate the transfer from your bank's interface to send funds to Anthropic's virtual bank account number (VBAN). You select your payment method when you create your organization, and you can switch between ACH bank transfer, credit card, or debit card at any time in **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**.

Here's what to know about ACH payments:

- **Activation timing:** If you choose ACH as your payment method, your plan won't be activated until we receive the payment, which can take up to five business days.

- **No auto-reload for credits:** Auto-reload isn't available with ACH payments. To set up auto-reload for credits, you can add a credit card to your account.

- **Subscription and credits:** ACH organizations can pay both their subscription invoices and credit purchases via ACH. If you purchase credits with ACH, the credits won't be added to your account until the payment settles.

- **Adding seats:** If you increase your seat count, we'll generate an invoice for the additional seats, but the new seats are available to use right away.

- **Upgrading from Team:** Organizations upgrading from a Team plan pay by credit card during the upgrade. Once the upgrade is complete, you can switch to ACH in **Organization settings > Billing**.

### Sales-assisted Enterprise plans

**[Contact our Sales team](https://claude.com/contact-sales)** to discuss your organization's needs.

### AWS Marketplace

Enterprise is also available through the **[AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-nnvi6wff6ef6m)**.

If your organization is currently on a Team plan and you're interested in upgrading to Enterprise, see this article for more information: **[Migrate your organization from Team to Enterprise](https://support.claude.com/en/articles/13779868-migrate-your-organization-from-team-to-enterprise)**.

---

## Information for organizations on Chat and Chat + Claude Code seats

**Note:** Organizations currently using usage-based Enterprise plans with Chat and Chat + Claude Code seats will not be able to continue with this billing model past your next contract renewal.

Some existing usage-based Enterprise organizations currently have two seat types: **Chat** and **Chat + Claude Code**. If you see these seat types in **[Organization settings > Members](https://claude.ai/admin-settings/members)**, this section applies to you.

Your current seat types and pricing will remain in place until your next contract renewal. At renewal, your plan will automatically transition to the single Enterprise seat model described above—all users will move to the all-inclusive **Enterprise seat** **priced** **per user per month**, which includes Claude Code access.

For details on how seat management works on your current plan, see **[Purchase and manage seats on Enterprise plans](https://support.claude.com/en/articles/13393991-purchasing-and-managing-seats-on-enterprise-plans#h_2673e097fb)**.

---

## Information for organizations on seat-based Enterprise plans

**Note:** Organizations currently using seat-based Enterprise plans with Standard and Premium seats will not be able to continue with this billing model past your next contract renewal.

Some Enterprise organizations are on older seat-based plans that use **Standard** and **Premium** seats with per-seat usage limits, rather than the usage-based model described above. If you see "Standard" and "Premium" seats when you navigate to **[Organization settings > Members](https://claude.ai/admin-settings/members)**, this section applies to you.

Seat-based Enterprise plans haven't changed; your seat types, usage limits, and usage credit options will remain as they are until you migrate to the current usage-based billing model. For details on how usage credits work on your plan, see **[Manage usage credits for Team and seat-based Enterprise plans](https://support.claude.com/en/articles/12005970-)**.

If you're interested in migrating to the current usage-based model, reach out to your Anthropic Contact or **[our Sales team](https://claude.com/contact-sales)**.
---

SOURCE: https://support.claude.com/en/articles/9876003-i-have-a-paid-claude-subscription-pro-max-team-or-enterprise-plans-why-do-i-have-to-pay-separately-to-use-the-claude-api-and-console

# I have a paid Claude subscription \(Pro, Max, Team, or Enterprise plans\). Why do I have to pay separately to use the Claude API and Console?

Claude paid plans and the Claude Console are separate products designed for different purposes:

- Claude paid plans give subscribers access to Claude on the web, desktop, and mobile, and offer enhanced features like more usage and priority access during high-traffic periods.

- The Claude Console is our developer platform providing API keys and access to Claude models for building applications and integrations.

A paid Claude subscription enhances your chat experience but doesn't include access to the Claude API or Console.

If you're interested in both enhanced chat features and API access, you'll need to sign up for a paid Claude plan and separately [set up Console access](https://support.claude.com/en/articles/8114521-how-can-i-access-the-anthropic-api) for API usage. This allows you to benefit from both offerings based on your specific needs.

Refer to this article to learn more about Claude Console billing: [How do I pay for my API usage?](https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-api-usage)
---

SOURCE: https://support.claude.com/en/articles/9927624-add-or-update-your-team-plan-s-tax-or-vat-id

# Add or update your Team plan's tax or VAT ID

## Add your tax or VAT ID during signup

When you sign up for a Team plan, you may have the option to enter your Tax or VAT ID depending on your location:

1. During the signup process, enter your address information.

2. If your address is eligible for tax purposes, an optional field for your Tax or VAT ID will appear.

3. Enter your Tax or VAT ID in the provided field.

4. If the ID is entered correctly, you'll be able to proceed with your signup.

**Important**: If you're signing up as a business and want to use a name other than the one tied to your payment method, an organization Owner should check the "Use a different name on invoices" box when adding or updating your payment method in **[Organization settings > Billing](https://claude.ai/admin-settings/billing)**. Then, enter your company name in the "Bill to" field to ensure it is reflected correctly on your invoice.

## Update your tax or VAT ID after signup

**Note**: Updates to your billing details will only apply to future billing cycles. Previously completed invoices cannot be updated retroactively.

If you need to add or update your Tax or VAT ID after you've already signed up, follow these steps:

1. Navigate to your **[Billing Settings](https://claude.ai/settings/billing)**.

2. Click on the "Update" button next to your payment method.

3. In the payment update form, you should see a field to enter or update your Tax or VAT ID.

4. Enter or modify your Tax or VAT ID as needed.

5. Save your changes.

**Note:** Your billing address determines your tax jurisdiction. See **[Understanding your billing address and tax calculation](https://support.claude.com/en/articles/12997130-understanding-your-billing-address-and-tax-calculation)** for details on how to view or update your billing address.