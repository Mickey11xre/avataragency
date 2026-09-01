
---

SOURCE: https://support.claude.com/en/articles/10166901-use-google-workspace-connectors

# Use Google Workspace connectors

Connect your Gmail, Google Calendar, and Google Drive to Claude so you can search and send emails, manage your calendar, work with documents, and save files—all without leaving the conversation.

Google Workspace connectors (Gmail, Google Calendar, and Google Drive) are available for all users on Claude and Claude Desktop.

For Team and Enterprise plans, an Owner or Primary Owner must enable these connectors at the organization level before individual users can authenticate. For setup instructions, read **[Use connectors to extend Claude's capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities#h_17dd443beb)**.

## What you can do

### Gmail

- **Search and read emails** using natural language queries

- **Draft emails** with proper formatting and context

- **Send, reply to, and forward emails** from Gmail. By default, Claude asks for your approval before each of these actions. On Team and Enterprise plans, owners decide whether members can allow these actions to run without asking each time.

- **Access email metadata**, including attachment metadata (not attachment content)

- **Manage email organization** with labels and threads

- **List saved drafts** in your Gmail account

### Google Calendar

- **View events and calendars**, including shared calendars you have access to

- **Create, update, and delete events** with full customization

- **Find mutual availability** across attendees

- **Manage attendee lists** and respond to invitations (accept, decline, or tentative)

- **Set up recurring meetings**

### Google Drive

- **Search and retrieve Google Docs** from your Drive.

- **Share, move, and trash files** in Google Drive. By default, Claude asks for your approval before each of these actions. On Team and Enterprise plans, owners decide whether members can allow these actions to run without asking each time.

- **Look up file metadata** and preview directly without searching first.

- **Read** Sheets, Slides, PDFs, images, and MS Office files.

- **Upload any file type**, with optional auto-convert to Google formats.

- **Create folders**.

- **Add Google Docs directly to chats and projects** by pasting URLs or selecting from recent documents.

- **View file permissions** and **list recent changes** to your Drive.

- **Save Claude-generated files** directly to your Drive (requires **[code execution and file creation](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude#h_1c99382190)** to be enabled).

**Note:** Claude extracts text content only from Google Drive files. Images embedded in documents are not processed.

---

## How to use the connectors

Ask Claude a question that requires access to your Gmail, Calendar, or Drive. Claude automatically detects which tools it needs and uses them to respond. By default, each action Claude takes on your behalf requires your explicit approval. On Team and Enterprise plans, owners decide whether members can allow certain actions to run without asking each time.

Claude's response includes citations indicating which emails, calendar events, or documents were used as sources, with links to the originals when available. You can ask follow-up questions to dig deeper into any source.

### Add Google Drive files to chats

1. Click the plus sign in the chat interface.

2. Select "Add from Google Drive."

3. Search through your recently accessed documents or paste the document's URL.

4. When you send your message, Claude accesses and processes the document to inform its response.

You can add multiple files to a single chat to give Claude comprehensive context. The files must fit within the conversation's context window.

### Add Google Drive files to projects

The Google Drive connector is only available when adding to **Files** in private projects. This option will be disabled for shared projects.

1. Open your project and find the **Files** section.

2. Click the "+" button to add files.

3. Select "Drive."

4. Search through your recently accessed documents or paste the document's URL.

5. Your document is added to your project knowledge for Claude to access when chatting in that project.

Google Docs added to chats and projects sync directly from Google Drive, so you're always working with the latest version.

### Manage individual connectors

You can enable or disable specific connectors from below the chat interface:

1. Click the plus sign in the chat interface.

2. Hover over "Connectors."

3. Toggle individual connectors on or off.

---

## Privacy and data handling

- You must authenticate directly with your Google account before using these connectors.

- On Team and Enterprise plans, an Owner or Primary Owner must enable connectors at the account level before individual users can authenticate.

- Claude can only access the Gmail, Calendar, and Drive data for the Google account you've connected.

- Claude only accesses your data when you explicitly ask a question or request an action requiring this information, and retrieves the minimum information needed.

- Claude mirrors your existing permissions—you cannot access information you don't already have access to in Google Workspace.

- Data retrieved while using connectors is stored on Anthropic servers, protected by Anthropic's security infrastructure (see our **[Trust Center](https://trust.anthropic.com/controls#organizational-security)** for details). This data is retained with its associated chat, so you can delete any retrieved data by deleting the chat.

- We do not train our models on your Gmail, Drive, or Calendar connector data, ensuring your private information remains private.

  - **Note**: If you are using our consumer products (e.g. Claude Free, Pro, and Max (when using Claude Code with those accounts) and you have chosen to allow us to use your chats and coding sessions for model training, then any content you copy/paste from your Gmail, Drive, Calendar, or Claude's responses which include specific information from these connectors may be used to improve our models. For more information, refer to **[Is my data used for model training?](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training)**

- Data is encrypted at rest and in transit.

### A note on Gmail permissions

During authentication, Google's OAuth screen mentions email sending permissions. Claude can send, reply to, and forward emails, but only does so with your explicit approval by default. On Team and Enterprise plans, owners decide whether members can allow these actions to run without asking each time.

---

## Current limitations

- Attachment content is not directly accessible through Gmail (metadata only).

- Some advanced Gmail filters may not be supported.

- Complex queries may require multiple API calls.

- Rate limits apply per Google's API quotas.

- Performance may vary for large mailboxes.

---

## Troubleshooting

### Reconnecting your Google account

If you see the error "*Please try again. You may need to reconnect with your Google Drive account,"* follow these steps:

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

2. Find your Google connector and click on it to view the details.

3. Click the "Disconnect" button.

4. Click "Disconnect" in the confirmation message.

5. The next time you use a Google Workspace feature in your chat, you'll be redirected to Google to re-authenticate.

If you're still having trouble, disconnect from your Google account settings at[**myaccount.google.com/connections**](https://myaccount.google.com/connections). Search for the Claude connection, click into the settings, and choose "Delete all connections."

### Google Workspace admin configuration

If your organization uses Google Workspace and the connectors aren't working (you may see the message *"Access blocked: your institution's admin needs to review Claude for Google Drive"*), your Google Workspace admin may need to allow Claude as a trusted application:

1. Go to **[admin.google.com](https://admin.google.com)**

2. Navigate to **Security > Access and data control > API controls > Manage third-party app access**.

3. Click "Add app," then select "OAuth App Name."

4. Search for "Claude" and set it as "Trusted."

5. Wait approximately 15 minutes for Google's policy to propagate, then try connecting again.

---

## Frequently asked questions

### What happens if I update a Google Doc after adding it to a chat?

The document continues to sync with the most up-to-date version in Google Drive.

### Can I add multiple files to a single chat?

Yes. You can add multiple Google Drive files to provide Claude with comprehensive context. The documents must fit within the conversation's context window.

### What happens if I lose access to a document?

You won't be able to view its contents in conversations where it was previously added. The document preview is removed, but the conversation history is maintained.

### Does Claude have access to images, comments, or suggestions in Google Docs?

No. Claude extracts the main text content only and cannot see images, comments, or suggestions.

### Can Claude send emails on my behalf?

Yes. Claude can send, reply to, and forward emails from Gmail, and asks for your approval by default before each of these actions. On Team and Enterprise plans, owners decide whether members can allow these actions to run without asking each time.

### Can I opt out of using these connectors?

On Team and Enterprise plans, Owners and Primary Owners can disable Google Workspace connectors for their organization in **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**. Individual users can also disable specific tools from the chat interface.

Browse all available connectors in the **[Connectors Directory](https://claude.ai/directory)**.
---

SOURCE: https://support.claude.com/en/articles/10167454-use-the-github-integration

# Use the GitHub integration

For more information on enabling GitHub within your account, see **[Use connectors to extend Claude's capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)**.

Connect your GitHub repositories directly to Claude to provide comprehensive context for your software development tasks. You can easily add repositories by selecting them from a list, helping Claude better understand and assist with your codebase.

## How to add GitHub repositories

**Note:**  If you're currently unauthenticated with GitHub, you'll be redirected to GitHub to authenticate before you can use this integration.

### Chats

1. Click the "+" button on the lower left corner of the chat interface.

2. Select "Add from GitHub" from the drop-down.

3. Use the file browser to select specific files and folders.

4. When you send your message, Claude will access and process the content to inform its response.

### Projects

1. Click the "+" button in the upper right corner of your project knowledge section.

2. Select "GitHub" from the drop-down.

3. Search through your accessible repositories, or paste a repository URL.

4. Use the file browser to select specific files and folders.

5. Your selected content will be added to the project knowledge for Claude to access and process.

6. You can use the "Sync" icon to ensure you're working with the most up-to-date version of your codebase.

7. You can use the "Configure files" icon to modify which files and folders Claude analyzes.

## Connect to private repositories

- **If Claude cannot access a repository after you enter a valid URL, it most likely means you're attempting to connect Claude to a private repository**: Follow the link to our GitHub App, where you can grant access to repos if you're a GitHub administrator, or send a request to your GitHub organization's administrators.

- **Grant access yourself if you can**: You can choose between letting Claude access all repos or specific ones.

- **Request access if you don't have the necessary permissions**: The administrators of your GitHub organization will receive an email notification about your request. Once they approve the request, you'll be able to sync and access the repository in Claude.

---

## Best practices

1. **Start small**: Begin by selecting a small subset of your codebase to analyze. This will help you get familiar with how Claude interprets and discusses your code.

2. **Iterate and refine**: If Claude's initial response doesn't fully address your question, don't hesitate to ask follow-up questions or request clarification.

3. **Combine with human expertise**: Use Claude's insights as a starting point for further investigation and discussion with your team. Please review Claude's work.

4. **Thoughtful file selection**: When using "Configure files," be strategic about your selections. Include key files and directories that are central to your current task or project, but avoid selecting unnecessary files to keep within token limits and maintain focus.

5. **Regular updates**: Remember to refresh your project's GitHub sync periodically to ensure Claude is working with the most up-to-date version of your codebase and especially before starting a new analysis or when you know there have been significant changes to your repo.

---

## Troubleshooting

### Repositories from an organization don't appear after connecting

If your GitHub connection shows as connected but private repositories from a specific organization don't appear, that organization may require single sign-on (SSO). When SSO is required, each user must separately authorize the Claude app for that organization. Until you do, GitHub filters that organization's private repositories from your view, even though your connection is otherwise working.

When Claude detects this state, the repository picker shows a banner prompting you to authorize SSO. To authorize the Claude app for your organization:

1. Go to **[github.com/settings/applications](https://github.com/settings/applications)** and open the **Claude** entry.

2. Under **Organization access**, click "Grant" next to the relevant GitHub organization.

3. If the button reads "Request" instead of "Grant," you don't have permission to authorize the app yourself. A GitHub organization admin must approve your request from the organization's OAuth application policy settings.

**Important:** Disconnecting and reconnecting GitHub in your Claude settings won't fix this. A fresh connection doesn't automatically authorize organizations that require SSO, so you'll need to complete the authorization steps above.

If your organization uses GitHub Enterprise Cloud with Enterprise Managed Users (EMU), the Claude app must also be approved at the enterprise level. Learn more in **[Set up Code Review for Claude Code](https://support.claude.com/en/articles/14233555-set-up-code-review-for-claude-code#h_49cea7a027)**.

---

## Frequently asked questions

### What information is retrieved from GitHub?

Only files (names and contents) in a repo on a specific branch are synced. We do not retrieve commit history, PRs, or other metadata.

### What happens if my repository is updated after adding it to a project?

You can click "Sync now" to fetch the latest changes from your repository. This will update all previously selected files and folders.

### Can I add multiple repositories to a single project or chat?

Yes, you can add multiple repositories to provide Claude with comprehensive context for your development tasks. The repositories must fit within Claude's context window.

### What happens if I lose access to a repository?

If you lose access to a repository, you won't be able to view its contents in projects where it was previously added. The repository preview will be removed, though the conversation history will be maintained.

Browse all available connectors in the **[Connectors Directory](https://claude.ai/directory)**.
---

SOURCE: https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop

# Getting Started with Local MCP Servers on Claude Desktop

The Model Context Protocol (MCP) is an open protocol that enables seamless integration between LLM applications and external data sources and tools. With the introduction of desktop extensions, installing and managing local MCP servers has become significantly easier.

## Desktop Extensions

Desktop extensions provide a streamlined way to install and manage local MCP servers through single-click installable packages. Instead of manually configuring JSON files and managing dependencies, you can now install local MCP servers on your computer as easily as browser extensions.

**Note:** We’re building a directory of desktop extensions – if you’re a developer hoping to add an extension you built to the directory, complete our [desktop extensions interest form](https://docs.google.com/forms/d/14_Dmcig4z8NeRMB_e7TOyrKzuZ88-BLYdLvS6LPhiZU/viewform?edit_requested=true) to share more information with us.

## Installing desktop extensions from the directory

1. Navigate to Settings > Extensions on Claude Desktop.

2. Click “Browse extensions” to view our directory and click on any Anthropic-reviewed tools you want to use. Click "Install" on your desired extension.

3. Configure any required settings (like API keys) through the user-friendly interface.

4. The extension will automatically be available in your conversations.

## Installing custom desktop extensions

1. Navigate to Settings > Extensions on Claude Desktop.

2. Click “Advanced settings” and find the **Extension Developer** section.

3. Click “Install Extension…”

4. Select the .mcpb file and follow the prompts to install.

## Admin Controls for Desktop Extensions

Owners and Primary Owners of Team and Enterprise plans can manage team access to desktop extensions using two controls:

1. Enable or disable public desktop extensions depending on your organization’s security standards.

2. Upload custom desktop extensions and make them available to your team for one-click install.

These controls allow organizations to fully customize their registries by adding only the extensions the team needs to access, and removing any others.

### Enabling/disabling specific extensions on Team and Enterprise plans

Owners and Primary Owners of Team and Enterprise organizations can manage which desktop extensions are enabled for your organization and accessible to other members via Claude Desktop. See [Enabling and using the desktop extension allowlist](https://support.claude.com/en/articles/12592343-enabling-and-using-the-desktop-extension-allowlist)

for specific instructions.

### Create and upload custom extensions for your organization

Custom desktop extensions uploads allow Team and Enterprise plans to leverage organization-specific workflows that aren’t available in the public directory. After creating a custom desktop extension, Owners and Primary Owners can navigate to Settings > Extensions within Claude Desktop and click “Advanced settings” to access the **Extension Developer** section:



Click “Install Extension…” and select the .mcpb file. Follow the prompts to install and configure your custom desktop extension. For more in-depth information, please refer to our [desktop extension developer documentation](https://github.com/anthropics/mcpb).

## Enterprise Policy Controls

**Note:** Enterprise policy controls at the user-machine level will override any in-app controls (blocklist and allowlist). If you want to use an in-app control, ensure `isDesktopExtensionEnabled` and `isDesktopExtensionDirectoryEnabled` are not set to "false" so the allowlist can populate the available registry.

For controlling desktop extensions through system policies, please refer to our [desktop enterprise configuration documentation](https://support.claude.com/en/articles/12622667-enterprise-configuration).

## Troubleshooting desktop extension installation issues

### Extension won't install

- Ensure you're running the latest version of Claude Desktop.

- Check that the extension file isn't corrupted by re-downloading it.

- Verify you have sufficient disk space for the installation.

### Extension appears installed but tools aren't available

- Restart Claude Desktop to refresh the extension registry.

- Check the extension's configuration settings for missing required fields.

- Verify any API keys or authentication credentials are entered correctly.

### Extension configuration issues

- Navigate to Settings > Extensions and click on the extension to review its settings.

- Ensure all required configuration fields are completed.

- Check that file paths (if applicable) point to existing directories you have access to.

### Permission or security errors

- On macOS, check System Preferences > Security & Privacy if you receive security warnings.

- On Windows and Linux, ensure Claude Desktop has necessary permissions to access required directories.

- For enterprise environments, verify that desktop extensions are enabled through your organization's policies.

## Developer FAQ

### How do I check if my MCP servers are properly connected in Claude Desktop?

Click the "+" button on bottom the chat box within Claude Desktop, then select "Connectors." This will show you connected MCP servers and their tools. Alternatively, you can visit Developer settings (under **Desktop app**) to see connection status and look at the logs for any MCP servers.

### How do I convert my existing MCP server to a desktop extension?

1. Add a manifest.json file to your MCP server directory with the required metadata.

2. Package it using the `mcpb pack` command.

3. See the [MCPB documentation](https://github.com/anthropics/mcpb) for detailed instructions.

### What programming languages are supported for desktop extensions?

Desktop extensions support Node.js, Python, and binary MCP servers. Claude Desktop includes a built-in Node.js environment, so Node.js installation isn't required.

### How do I handle sensitive configuration like API keys?

Mark configuration fields as "sensitive": true in your manifest.json. Claude Desktop will automatically encrypt these values using the operating system's secure storage (Keychain on macOS, Credential Manager on Windows, and your distro’s keychain manager on Linux).

### Can I distribute my custom desktop extension privately?

Yes, you can share .mcpb files directly with specific users or teams. For broader distribution, you can submit extensions to the official directory.

### How do I debug issues with my desktop extension?

Enable debug logging in Claude Desktop settings, check the extension logs in the Extensions settings panel, and refer to the MCP debugging guide for protocol-specific troubleshooting.

### What happens when my extension needs updates?

Extensions from the official directory update automatically by default. For privately distributed extensions, users will need to install updated .mcpb files manually.

## Interested in learning more about MCP?

For more in-depth information on building your own MCP clients and servers, we recommend reviewing the following resources:

- [MCP Quickstart Guide](https://modelcontextprotocol.io/docs/getting-started/intro) - A step-by-step tutorial perfect for getting started with basic MCP integration.

- [Model Context Protocol Github](https://github.com/modelcontextprotocol) - Contains the complete technical documentation, code examples, and implementation guides.

- [Guide to debugging MCP integrations](https://modelcontextprotocol.io/docs/tools/debugging) - Troubleshooting tips and solutions for common implementation challenges.

If you need further guidance, visit our guide on [How to Get Support](https://support.claude.com/en/articles/9015913-how-to-get-support) for additional support options.
---

SOURCE: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp

# Get started with custom connectors using remote MCP

Custom connectors using remote MCP are available on Claude, Cowork, and Claude Desktop for users on Free, Pro, Max, Team, and Enterprise plans. Free users are limited to one custom connector.

## What are custom connectors?

Custom connectors let you connect Claude directly to the tools and data sources that matter most to your workflows. This enables Claude to operate within your favorite software and draw insights from the complete context of your external tools.

You can:

- Connect Claude to existing remote MCP servers.

- Build your own remote MCP servers to connect with any tool.

**Security and privacy with custom connectors**

Custom connectors allow you to connect Claude to services that haven't been verified by Anthropic. Once connected, Claude can access those services and take action in them. For more guidance, review the **[Security and privacy considerations](#h_b79c05dfcd)** section below.

## What are remote MCP servers?

The Model Context Protocol (MCP) is an open standard, created by Anthropic, for AI applications to connect to tools and data.

Previously, **[MCP servers only ran locally](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)** (i.e. on a user's laptop). Now, developers can build and host remote MCP servers that communicate with AI apps over the internet.

Remote MCP servers give models access to internet-hosted tools and data, transforming Claude into an informed teammate that can independently handle complex, multi-step projects tailored to your needs.

---

## Network requirements

When you add a custom connector, Claude connects to your remote MCP server from Anthropic's cloud infrastructure, rather than from your local device. This is true across every Claude client, including claude.ai, Claude Desktop, Cowork, and the mobile apps.

This means your MCP server must be reachable over the public internet from Anthropic's IP ranges. Servers hosted on a private corporate network, behind a VPN, or blocked by a firewall won't connect, even if you can reach them from your own machine.

### If your server is on a private network

You’ll need to allowlist Anthropic's IP addresses in your firewall so inbound connections from Claude can reach your server. See **[Anthropic IP addresses](https://platform.claude.com/docs/en/api/ip-addresses)** for the current ranges.

### Why this applies to Cowork and Claude Desktop

Even though Cowork and Claude Desktop run on your computer, remote connectors are configured and brokered through your Claude account. The connection to your MCP server originates from Anthropic's servers, not from your machine's network interface. Local MCP servers configured in Claude Desktop via `claude_desktop_config.json` are a separate mechanism and do use your local network, but those aren't available in Cowork or claude.ai.

---

## Add a custom connector

**Note:**  While anyone can build and host connectors using remote MCP, only Owners can add them to Team and Enterprise plans. Once a connector has been added to a Team or Enterprise organization, users individually connect to and enable that connector. This ensures that Claude can only access tools and data that the individual user has access to.

### For Team and Enterprise plans

**Preliminary steps for owners:**

Before members of Team and Enterprise plans can configure custom connectors, an Owner or Primary Owner needs to follow these initial steps to add a custom connector to your organization:

1. Navigate to **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**.

2. Click the "Add" button.

3. Hover over “Custom,” then select “Web.”

4. Add your connector's remote MCP server URL.

5. Optionally, click “Advanced settings” to specify an OAuth Client ID and OAuth Client Secret for your server.

6. Finish configuring your connector by clicking "Add."

**Steps for members after connector is configured:**

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

2. Find the custom connector your Owner added in the list. It usually has a "Custom" label.

3. Click "Connect" to authenticate and start using the connector with Claude.

**Note:** If your custom connector's URL is on a domain that matches a listing in the Connectors Directory (for example, a Workato workspace URL), it appears with that service's name and branding instead of a "Custom" label. It's still your own connector. It connects to the exact URL your owner entered and uses your server's tools, so you don't need to remove it or add it again.

### For Pro and Max plans

If you are using an individual Pro or Max plan, follow these steps to add a custom connector:

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

2. Click "+" then “Add custom connector.”

3. Add your connector's remote MCP server URL.

4. Optionally, click “Advanced settings” to specify an OAuth Client ID and OAuth Client Secret for your server.

5. Finish configuring your connector by clicking "Add."

### Enabling connectors after configuration

You can enable connectors for individual conversations via the “+” button on the lower left of your chat interface, then "Connectors." You'll see your configured connectors with toggles allowing you to enable/disable them per conversation.

---

## Remove custom connectors

You can remove a custom connector by following these steps:

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

  1. Team and Enterprise Owners can do this on their organization's behalf in **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**.

2. Locate the "Connectors" section.

3. Click "Remove" or select the three dots next to the connector you'd like to remove.

4. Follow the prompts to remove.

If you're hoping to edit a custom connector, you'll need to remove it first, then re-add it using the updated details.

---

## Build custom connectors

To learn about building connectors to use with Claude, see **[Building custom connectors](https://claude.com/docs/connectors/building)** in Claude Docs.

---

## Security and privacy considerations

Custom connectors allow you to connect Claude to arbitrary services that have not been verified by Anthropic. When you connect Claude to external services, you're granting it the ability to access and potentially modify data within those services based on your permissions. It’s important to make sure you’re only connecting to remote MCP servers that you trust and that you’re aware of Claude’s interactions with web connectors.

### Security and permissions

When you add a custom connector to Claude, you'll typically go through an OAuth authentication process to securely sign in to the application and grant specific permissions. This allows Claude to interact with the application on your behalf, without Claude ever seeing your actual password. You can revoke these permissions at any time by disconnecting the connector in Claude's settings or the third-party service's security settings.

Remote MCP servers act as intermediaries between Claude and external applications. You should:

- **Only connect to trusted servers:** Only connect Claude to servers built and hosted by organizations and applications you trust.

- **Review requested permissions carefully:** During auth, review what permissions the MCP server is requesting to the application. Limit these scopes when possible and deny access if requested permissions seem unnecessary.

- **Be aware of prompt injections:** Malicious MCP servers may include hidden instructions that try to make Claude perform unintended actions. Claude has built-in protections that attempt to block these attacks, but it's important to pay attention to tool inputs & outputs and connect only to trusted servers.

- **Monitor changes in tool behavior:** Server developers may update tool behavior unexpectedly, leading to unintended or malicious behavior.

### Reporting malicious MCP servers

If you become aware of a malicious MCP server, please report it to our **[vulnerability disclosure program](https://hackerone.com/anthropic-vdp/)**, and choose `https://github.com/modelcontextprotocol` as the Asset.

### Taking actions with tools

Remote MCP servers give Claude tools it can invoke during your conversation. The developer of an MCP server can define what these tools do, including:

- Reading data from connected applications.

- Creating, modifying, or deleting data in connected applications.

- Taking actions on behalf of the user.

Claude can only access resources that you've given the server permission to access, but you should:

- Be aware of any actions Claude is taking and that they have no destructive or unintended effects.

- Review Claude's tool approval requests carefully and only click "Allow always" when using a server and tool that you trust to run unsupervised.

- Using the "Search and tools" menu, disable any tools that aren't relevant to the current conversation or that you don't want Claude to be able to invoke.

### Interactive connectors

Some connectors can display interactive interfaces directly within your Claude conversations. Instead of only returning text-based responses, these connectors can open live, interactive apps—like dashboards, task boards, or design tools—right in the chat.

Interactive connectors appear in two ways:

- **Inline cards:** Compact components embedded in the conversation, showing summaries, confirmations, or quick actions.

- **Fullscreen view:** Immersive interfaces for complex interactions like data visualizations or document editing. The conversation composer remains available so you can continue chatting with Claude.

You can interact with these connectors directly—filtering data, checking off tasks, adjusting settings—without leaving the conversation. Any actions you take within the interface use the same permissions you granted when connecting the tool.

**Admin controls:** Team and Enterprise plan owners can disable specific tool calls that render interactive connectors within **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**.

### Using Claude with Research

**Note: [Advanced research](https://claude.com/blog/integrations)** is not currently able to invoke tools from local MCP servers.

Research allows Claude to deeply investigate queries by searching through hundreds of internal and external sources. During the research process, Claude can invoke tools from your connectors automatically without further approval.

When using research with custom connectors:

- Disable any tools that can take write actions in external applications.

- Review Claude’s approval request carefully and be aware of which tools you’re granting Claude permission to invoke.

- Be mindful of the impact of Claude sending a large number of requests to your connectors.

See **[Use research on Claude](https://support.claude.com/en/articles/11088861-using-research-on-claude)** for more information about this feature.
---

SOURCE: https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities

# Use connectors to extend Claude's capabilities

This guide explains how to enable and use connectors with Claude to enhance its capabilities.

Web connectors are available for all users on Claude, Cowork, Claude Desktop, and Claude Mobile (iOS and Android). Desktop extensions are available to all users on Claude Desktop.

## What are connectors?

Connectors let Claude access your apps and services, retrieve your data, and take actions within connected services. Claude inherits each person's permissions from the connected service. If someone can't access a specific file, channel, or record in the source system, the connector can't reach it from Claude either.

For example, you can connect Claude to Linear to create issues, to Slack to send messages, or to Google Drive to search your files. Connectors work across Claude, Claude Desktop, Claude Code, and the API (via the **[MCP Connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector)**). Setup details for individual pre-built connectors are in **[Claude Docs: Connectors](https://claude.com/docs/connectors/overview)**.

You can find available connectors in the **[Connectors Directory](https://claude.ai/connectors)**, where each connector has a page detailing its use cases, read/write capabilities, and availability. You can also add custom connectors or connect to any service that supports MCP.

## How Claude suggests connected apps

Once you've connected an app, Claude can bring it into a conversation on its own when it fits what you're asking for—you don't have to name it every time. For details on how that works, including what happens when more than one app could help, see **[How Claude suggests connected apps](https://support.claude.com/en/articles/14730684-how-claude-suggests-connected-apps)**.

## Browse available connectors

You can browse the Connectors Directory on Claude, Claude Desktop, and Claude for iOS/Android.

You can browse the directory from two areas:

**From a chat**

1. Click the "+" button in the lower left corner of your chat, or type "/" to open the menu.

2. Hover over “Connectors.”

3. Select “Manage connectors.”

4. Click the “+” button next to **Connectors**.

5. This opens a **Connectors** modal where you can see available connectors by category or scroll through the complete list.

**From settings**

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

2. Click the “+” button next to **Connectors**.

3. Browse available connectors by category or scroll through the complete list.

---

## Connect a service to Claude

You can connect Claude to a new service on Claude, Claude Desktop, and Claude for iOS and Android. Installing connectors on mobile is currently in beta—Claude Desktop and web remain the primary path for custom connectors.

To connect a service from the directory:

1. Click on the connector you want to add.

2. Review the connector's description and capabilities.

3. Click “Connect” or “Install” to begin the setup process.

4. Follow the authentication prompts to grant Claude access to your account.

5. Configure any specific settings or permissions as needed.

**Important:** When connecting to a service, you're granting Claude permission to access and potentially modify data within that service based on your account permissions. Only connect services you trust and need for your workflows.

## Connect a service on Team and Enterprise plans

Before members of Team and Enterprise plans can use connectors, an Owner or Primary Owner needs to enable them for the organization. Enabling a connector makes it available to your team, but it doesn't automatically grant anyone access. Each person still needs to authenticate individually before they can use it.

**Note:** With Enterprise-managed auth, you authorize a connector once for your entire organization, and your team inherits access automatically on first login. Enterprise-managed auth is available in beta for Team and Enterprise plans on Claude. Learn about **[authorizing MCP connectors for your entire organization](https://support.claude.com/en/articles/15537633)**.

1. Navigate to **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**.

2. Click “Browse connectors” at the bottom of the page.

3. Select the connector from the list and click “Add to your team.”

4. Individual users can then authenticate with the connector to start using it with Claude.

Once enabled at the org level, individual users follow the same steps described above to connect and authenticate.

**Note:** On Enterprise plans, Owners and Primary Owners can prevent services on their verified domains from being connected to Claude accounts outside the organization. Learn more about **[restricting verified-domain connectors to your enterprise](https://support.claude.com/en/articles/15402193-restrict-verified-domain-connectors-to-your-enterprise)**.

### Restrict actions within connected services

Owners on Team and Enterprise plans can limit which actions a connected service can take across your organization. For example, you can allow a connector to read data from a service while preventing it from writing any changes back. This applies org-wide to everyone using the connector—individual users can't override it.

Common use cases:

- Allow Claude to search and summarize email, but prevent it from sending messages.

- Allow Claude to read files in Google Drive, but prevent it from creating or editing documents.

- Allow Claude to view Linear issues, but prevent it from creating new ones or changing status.

To configure action restrictions:

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors).**

2. Select the connector to see **Tool permissions**.

3. The permissions will be categorized by type (for example, read-only tools, write/delete tools).

4. For each permission category or individual permission, select Always allow, Needs approval, or Blocked.

**Note:** Action restrictions work alongside source-system permissions. Even when you allow a write action in Claude, a person still needs the underlying permission in the source system to make that change. Restricting actions in Claude never grants more access than the source system permits—it only narrows it.

---

## Use connected services

Once you connect to a service on Claude or Claude Desktop, it will be available to use the next time you log in to your account on Claude for iOS or Android.

Once connected, services become available in your conversations:

1. Click the “+”  button in the lower left of the chat interface (you can also type “/” to open this menu).

2. Hover over “Connectors” to open the menu.

3. Enable the specific services you want Claude to use for that conversation by toggling them on.

4. Claude will now be able to use these services when relevant to your requests.

For example, after connecting Linear, you can ask Claude to "Create a new issue for the login bug" and Claude will use Linear to create the issue in your workspace.

Some connectors are interactive and can render live interfaces—like dashboards, task boards, and design tools—directly within your conversation. Look for the **Interactive** badge in the Connectors Directory to find connectors with this capability.

---

## Choose how connectors load in your conversation

When you add many connectors, Claude gives you control over how they load. You can find the **Tool access** setting by clicking the “+” button in the lower left corner of your chat, or typing “/” to open the menu. Hover over “Connectors,” then “Tool access” to choose your preferred mode. For most users, **Auto** (the default) works well. If you have 10 or more connectors active, consider switching to **On demand** to give your conversations more room.

Learn more about tool access modes: **[Manage Claude's tool access](https://support.claude.com/en/articles/13730515-manage-claude-s-tool-access)**.

---

## Manage your connectors

To manage your connected services:

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

2. View all your connected services in the **Connectors** section.

3. For each service, you can disconnect it, modify connection settings, or review permissions and access levels.

---

## Custom connectors

Custom connectors using remote MCP are available on Claude, Cowork, and Claude Desktop for users on free, Pro, Max, Team, and Enterprise plans. Free users are limited to one custom connector.

In addition to directory connectors, you can add custom connectors:

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

2. Click the “+” button next to **Connectors**.

3. Select “Add custom connector.”

4. Enter the connector's name and URL.

5. Enter advanced settings (OAuth Client ID and secret) if desired.

6. Click “Add,” then follow the same connection process as directory connectors.

Custom connectors connect to your MCP server from Anthropic's cloud, not from your local device. Your server must be reachable over the public internet. If it's behind a firewall or on a private network, see **[Get started with custom connectors using remote MCP](https://support.claude.com/en/articles/11175166)** for network requirements and private network options.

**Important:** Custom connectors allow you to connect Claude to services that haven't been verified by Anthropic. Only connect to servers from trusted organizations and review authentication permissions carefully.

---

## Security and privacy

All data transfers are encrypted. When using connectors, you can only sync content to Claude that you have permission to view in the original source.

Connected services process data on their own infrastructure, under their own terms, which may be located outside the United States. Settings that control where Claude's inference runs, like the US-only inference setting on Enterprise plans, don't change where third-party services operate.

When connecting to services from the directory, review what access the service is requesting during the connection process. Disconnect services you no longer need or use.

**For Team and Enterprise plans:**

- Access permissions are enforced at the user level. Users need to authenticate with the third-party service when first using the connector, even after an Owner or Primary Owner enables it.

- Connectors are only available in private projects.

- Chats with synced content can't be shared.

---

## Troubleshoot connection issues

If you're having trouble connecting to a service, try these steps:

1. Check that you have a stable internet connection.

2. Verify you have an active account with the service.

3. Review any permissions or account type requirements for the service.

4. If authentication fails, try disconnecting and reconnecting from **[Customize > Connectors](https://claude.ai/customize/connectors)**.

5. For connector-specific requirements and known issues (Slack, GitHub, Google Drive, Gmail, Google Calendar, Microsoft 365), see the connector's page in **[Claude Docs: Connectors](https://claude.com/docs/connectors/overview)**.

### See a message that says, "This corporate identity belongs to an Enterprise that manages access through their own Claude account"?

The service you're trying to connect uses an email address on a domain that an Enterprise organization has verified, and that organization restricts connections to its own Claude accounts only. To use this connection, sign in to your organization's Claude account and connect the service there. If you don't have a Claude account in that organization, contact your admin for access.

Admins can learn more about **[restricting verified-domain connectors to your Enterprise](https://support.claude.com/en/articles/15402193-restrict-verified-domain-connectors-to-your-enterprise)**.

### Custom connector not connecting or timing out?

Custom connectors (remote MCP servers) are reached from Anthropic's cloud infrastructure, not from your local machine. This is true even if you're using Cowork or Claude Desktop, which run locally on your computer. If your MCP server is behind a corporate firewall, on a private network, or not reachable over the public internet, the connection will fail.

To resolve this, you can either allowlist Anthropic's IP ranges in your firewall to create a secure outbound-only connection from your network. For detailed guidance, see the network requirements section in **[Get started with custom connectors using remote MCP](https://support.claude.com/en/articles/11175166)**.
---

SOURCE: https://support.claude.com/en/articles/11596036-anthropic-connectors-directory-faq

# Anthropic Connectors Directory FAQ

The Connectors Directory FAQ has moved to the Claude developer docs.

[Connectors overview →](https://claude.com/docs/connectors/overview)

[Building custom connectors →](https://claude.com/docs/connectors/building)

[Submitting to the Connectors Directory →](https://claude.com/docs/connectors/building/submission)
---

SOURCE: https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors

# When to use desktop and web connectors

Claude can connect to your tools in two ways: through the web (remote connectors) or through the Claude Desktop app (desktop extensions). Most connectors are remote—they're the default choice and work everywhere you use Claude.

## Use a remote connector when

- The tool is a cloud service you sign into (Slack, Notion, Linear, GitHub, your company's SaaS)

- You want the connector available everywhere—web, mobile, Cowork, Desktop, and Claude Code

- You're connecting something from the **[Connectors Directory](https://claude.ai/directory)**

Remote connectors work across all Claude surfaces. Once connected, they're available everywhere without extra setup.

## Use a desktop extension when

- The tool runs on your computer—local files, a database on localhost, a desktop application

- The tool needs OS-level access (filesystem, clipboard, local processes)

- There's no cloud version to connect to

Desktop extensions run locally and are only available in Claude Desktop and Claude Code—not on web or mobile.

## Plugins work with both

A plugin can bundle either remote or local MCP servers (or both). Installing a plugin that references a remote MCP makes it available everywhere; one that references a local MCP works in Desktop and Claude Code.

## Quick guide

| **Your tool is…**                     | **Use**                          | **Available on**     |
| ------------------------------------- | -------------------------------- | -------------------- |
| A cloud/SaaS product                  | Remote connector                 | All surfaces         |
| In the Connectors Directory           | Remote connector                 | All surfaces         |
| Running on your machine               | Desktop extension                | Desktop, Claude Code |
| A local file or folder                | Desktop extension                | Desktop, Claude Code |
| Something you built with a public URL | Remote connector (add as custom) | All surfaces         |
| Something you built that runs locally | Desktop extension                | Desktop, Claude Code |

## Get started

- Browse and add remote connectors: **[Settings → Connectors](https://claude.ai/settings/connectors)** or the **[Connectors Directory](https://claude.ai/directory)**

- Install a desktop extension: Open Claude Desktop → Settings → Extensions

- Building your own? See the **[connector building docs](https://claude.com/docs/connectors/building)** for remote connectors or the **[MCPB guide](https://claude.com/docs/connectors/building/mcpb)** for local ones.
---

SOURCE: https://support.claude.com/en/articles/12542951-set-up-the-microsoft-365-connector

# Set up the Microsoft 365 connector

This article walks admins through enabling the Microsoft 365 connector for their organization in Claude—including granting Microsoft Entra consent, restricting access, and managing permissions. Once setup is complete, people in your tenant can connect Microsoft 365 to their own Claude accounts to search across SharePoint, OneDrive, Outlook, and Teams from Claude. You can also enable write tools, which let Claude send email, manage calendar events, and create and update files on a member's behalf.

The Microsoft 365 connector is available on all Claude plans: Free, Pro, Max, Team, and Enterprise.

For end-user instructions on connecting and using Microsoft 365 once setup is complete, see **[Connect Claude to Microsoft 365](https://support.claude.com/en/articles/15183774)**.

**Important:** The Microsoft 365 connector requires a Microsoft Entra tenant tied to a Microsoft Business plan. Personal Microsoft accounts (such as @outlook.com or @hotmail.com addresses) can't be used to connect.

---

## Setup overview

Two things need to happen before anyone in your organization can connect Microsoft 365, plus an optional third step if you want to enable write tools:

1. **On Team and Enterprise plans:** A Claude organization owner enables the Microsoft 365 connector for the organization.

2. **In every tenant:** A Microsoft Entra Global Administrator grants a one-time consent that authorizes the integration for your tenant.

3. **To enable write tools:** A Microsoft Entra administrator consents to the updated permission set, and you enable write tools for your organization. See **[Enable write tools](#h_a51d877afd)** below.

After completing these steps, members can connect Microsoft 365 to their own Claude accounts following the steps in **[Connect Claude to Microsoft 365](https://support.claude.com/en/articles/15183774)**.

## Enable the connector for your organization

This step applies to Team and Enterprise plans only. On Free, Pro, and Max plans, skip to the next section.

1. Sign in to Claude.

2. Navigate to **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**.

3. Click “+ Add” at the top of the page, then “All available.”

4. Find **Microsoft 365** and click “Add to your team.”

## Grant Microsoft Entra admin consent

A Microsoft Entra Global Administrator in your tenant needs to authorize the integration before anyone can connect. There are two ways to do this.

### Option 1: Consent through Claude

If your Microsoft Entra Global Administrator has a Claude account, they can grant consent during the standard connection flow:

1. Navigate to **[Customize > Connectors](https://claude.ai/customize/connectors)**.

2. Find **Microsoft 365** and click “Connect.”

3. Authenticate with Microsoft 365 credentials.

4. Review and accept the requested permissions, checking the box to grant access on behalf of the whole organization.

After this, other people in the same Entra tenant can connect by following the standard end-user steps. They won't see the consent prompt—they'll just authenticate and start using the integration.

### Option 2: Manual setup in Microsoft Entra ID

Use this path if your Microsoft Entra Global Administrator doesn't have a Claude account, or if you need to troubleshoot the app install and permissions setup. You can add the connector apps and grant admin consent directly in Microsoft Entra ID.

This process adds two service principals to your tenant. Each principal establishes a service-level identity for one of the two M365 MCP for Claude app registrations, allowing them to access and interact with your organization's data and resources via the Microsoft Graph API.

**1. Add the service principals**

Using Microsoft Graph Explorer, add both required service principals:

M365 MCP Client for Claude:

```
POST https://graph.microsoft.com/v1.0/servicePrincipals
{"appId":"08ad6f98-a4f8-4635-bb8d-f1a3044760f0"}
```

M365 MCP Server for Claude:

```
POST https://graph.microsoft.com/v1.0/servicePrincipals
{"appId":"07c030f6-5743-41b7-ba00-0a6e85f37c17"}
```

**2. Grant admin consent**

Construct and visit the following URLs in your browser, replacing {your-tenant-id} with your organization's tenant ID.

M365 MCP Client for Claude:

```
https://login.microsoftonline.com/{your-tenant-id}/adminconsent?client_id=08ad6f98-a4f8-4635-bb8d-f1a3044760f0
```

M365 MCP Server for Claude:

```
https://login.microsoftonline.com/{your-tenant-id}/adminconsent?client_id=07c030f6-5743-41b7-ba00-0a6e85f37c17
```

When you visit each URL, you'll be prompted to consent to the delegated permissions required by the integration on behalf of your organization.

**3. Finish setup**

- **Team and Enterprise plans:** A Claude organization Owner needs to enable the connector in **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**. Then members can connect individually.

- **Free, Pro, and Max plans:** Members can connect by navigating to **[Customize > Connectors](https://claude.ai/customize/connectors)**, finding **Microsoft 365**, and clicking “Connect.”

### Restrict who can use the connector

To limit which people in your tenant can authenticate to Microsoft 365 through Claude:

1. Go to the Microsoft Entra admin center at entra.microsoft.com.

2. Navigate to the **M365 MCP Server for Claude** enterprise application.

3. Go to **Properties** and set **Assignment required?** to “Yes.”

4. Under **Users and groups**, add the specific users or groups who should have access.

5. Repeat the same steps for the **M365 MCP Client for Claude** enterprise application.

Both components need to be restricted to the same set of authorized people.

### Restrict which permissions the connector can use

To limit which types of resources the integration can access, selectively revoke permissions from the default set of authorized scopes. This requires Microsoft Entra admin access.

1. As a Microsoft Entra admin, go to entra.admin.com.

2. Select “Enterprise Applications.”

3. Next to the search box, remove the application type filter.

4. Search for and click “M365 MCP Server for Claude.”

5. Go to **Permissions**.

6. Under the **Admin consent** tab and in the Microsoft Graph list of permissions, select the permission you would like to revoke and click the “**…**” button.

7. Select “Revoke permission” and confirm with “Yes, revoke.”

Once revoked, attempts to access a resource with that permission will return a "Failed to call tool" error.

Members can also individually turn off specific tools in their own Microsoft 365 settings to prevent Claude from trying to access a tool for which the permission has been revoked.

To restore a revoked permission, follow the steps to grant admin consent described in **Option 2: Manual setup in Microsoft Entra ID**. This will revert the permissions to the default state.

---

## Enable write tools

Write tools let Claude send email, manage drafts and calendar events, update mailbox settings, and create and update files in OneDrive and SharePoint. Read and search tools work the same whether or not write tools are enabled.

**1. Re-consent to the updated permissions**

The connector's permission set now includes additional Microsoft Graph scopes to support write tools. If your tenant consented before write tools launched, a Microsoft Entra Global Administrator needs to review and approve the updated permission set before write tools activate. Review and approve the updated permissions for the connector in your tenant's **Enterprise Applications** consent flow. This is a one-time action per tenant.

**2. Enable write tools for your organization**

If your organization was using the connector before write tools launched, they will be blocked by default. Enable them for everyone by going to **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**, finding “Microsoft 365,” and setting the appropriate permissions. Enterprise plans can enable them for a subset of users through **[custom roles](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans#h_979e558d00)**.

**3. Verify**

Once enabled, ask Claude to perform a low-risk write action, such as "Draft an email to myself, but don't send it," to confirm write tools are active.

**Note:** Emails Claude sends include an attribution header identifying them as agent-initiated. File and calendar writes aren't currently tagged. Attachments aren’t supported in write tools, so sending, forwarding, and drafting all reject messages with attachments. Write tools are also subject to per-user limits on writes, sends, and recipients.

---

## Permissions reference

The Microsoft 365 connector uses **delegated permissions**, meaning Claude acts on behalf of each individual user and can only access data that user already has permission to view in Microsoft 365. Permissions are read-only—Claude can't modify, delete, or create content in your tenant.

During authentication, the integration requests the following permissions:

**Basic access**

- `User.Read`: Sign in and read user profile

- `openid`: Sign in with organizational account

- `offline_access`: Maintain access to data

- `email`: View email address

- `profile`: View basic profile information

**Email (Outlook)**

- `Mail.Read`: Read email messages

- `Mail.ReadBasic`: Read email metadata (sender, subject, date)

- `Mail.Read.Shared`: Read emails in mailboxes the user has access to

  - **Note:** Shared mailbox access is included through the `Mail.Read.Shared` permission. Users can search shared mailboxes they have delegate access to in Microsoft 365, including full access and folder-level delegation. No setup is needed beyond standard admin consent and the delegate permissions already configured in Microsoft 365.

- `MailboxFolder.Read`: Read mailbox folder structure

- `MailboxItem.Read`: Read items in mailbox

- `MailboxSettings.Read`: Read mailbox settings, like the user's timezone

**Note:** Email search covers each user's primary mailbox, including its Archive folder, and any shared mailboxes they can access. It doesn't cover the separate Online Archive mailbox (also called the In-Place Archive), so messages that a retention policy has moved there won't appear in results.

**Calendar**

- `Calendars.Read`: Read calendar events

- `Calendars.Read.Shared`: Read calendars shared with the user

**Teams chat**

- `Chat.Read`: Read Teams chat messages

- `Chat.ReadBasic`: Read Teams chat metadata

- `ChatMember.Read`: Read information about chat participants

- `ChatMessage.Read`: Read Teams chat messages

**Teams channels**

- `Channel.ReadBasic.All`: Read channel names and descriptions

- `ChannelMessage.Read.All`: Read channel messages

**Meetings**

- `OnlineMeetings.Read`: Read online meetings

- `OnlineMeetingTranscript.Read.All`: Read meeting transcripts

- `OnlineMeetingAiInsight.Read`: Read AI-generated meeting insights

- `OnlineMeetingArtifact.Read.All`: Read meeting recordings and artifacts

- `OnlineMeetingRecording.Read.All`: Read meeting recordings

**Files (OneDrive and SharePoint)**

- `Files.Read`: Read user files

- `Files.Read.All`: Read all files the user can access

- `Sites.Read.All`: Read items in SharePoint sites

**Write permissions**

The following permissions support write tools and are included in the updated consent set:

- `Mail.Send`: Send and forward email

- `Mail.ReadWrite`: Create, update, and delete drafts; move and label messages

- `Calendars.ReadWrite`: Create, update, delete, and respond to calendar events

- `Files.ReadWrite.All`: Create and update files in OneDrive and SharePoint

- `MailboxSettings.ReadWrite`: Manage categories, inbox rules, and automatic replies

**User directory**

- `User.ReadBasic.All`: Read basic profile information for all users in the organization (used for finding meeting availability)

The Microsoft 365 connector searches SharePoint across the entire tenant using the permissions of the user. Site-specific search restriction isn't supported.

## Privacy and security

- **Permission inheritance:** Claude mirrors each user's existing Microsoft 365 permissions. Members can't access anything through Claude that they couldn't already see directly in Microsoft 365.

- **On-demand access:** Claude only accesses data when a user explicitly asks a question that requires it.

- **Revocable access:** Members can disconnect their own integration through **[Customize > Connectors](https://claude.ai/customize/connectors)**. Team and Enterprise plan Owners can also remove the connector for the entire organization in **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**.

For more detail, see the **[Microsoft 365 connector security guide](https://support.claude.com/en/articles/12684923-)**.

---

## Troubleshooting

### A member can't authenticate

1. Confirm their account is tied to a Microsoft Entra tenant, not a personal Microsoft account.

2. Confirm their Microsoft 365 license is active.

3. Confirm admin consent has been granted using Option 1 or Option 2 above.

4. Check whether a Conditional Access policy in your tenant is blocking the connection. See below: **[Conditional Access is blocking the connection](#h_c7635fb6e2)**.

### Members are seeing "Failed to call tool" errors

A permission may have been selectively revoked in Microsoft Entra. Members can turn off the corresponding tool in their Microsoft 365 settings to suppress the error, or you can restore the permission by repeating the admin consent steps in **[Option 2: Manual setup in Microsoft Entra ID](#h_c5f095c9cf)**.

### Write tools aren't appearing for members

1. Confirm a Microsoft Entra administrator has consented to the updated permission set that includes write scopes.

2. Confirm write tools are enabled in the Microsoft 365 connector configuration, or that the member is covered by a role-based access policy that grants them.

3. Have the member disconnect and reconnect Microsoft 365 in **[Customize > Connectors](https://claude.ai/customize/connectors)**.

### Conditional Access is blocking the connection

A Conditional Access block shows up in one of three ways:

- A user sees "Authorization with the MCP server failed" and a reference code starting with `ofid_` when they try to connect. Our Support team can look up that code.

- A member who is already connected gets an error when Claude uses a Microsoft 365 tool. The error includes an `AADSTS` code, a note that the request was blocked by a Conditional Access policy, and the Trace ID and Correlation ID you can search for in Entra.

- Members are asked to reconnect Microsoft 365 on a regular cycle, much more often than the normal 90-day expiry. This usually means a sign-in frequency policy.

Connecting Microsoft 365 involves more than the sign-in the member sees. After the member signs in to Microsoft in their browser, Claude's servers exchange that sign-in for access tokens, and later exchange those tokens for Microsoft 365 access on the member's behalf. In our testing, Entra evaluates your Conditional Access policies against these server-side requests as coming from Anthropic's IP range, `160.79.104.0/21`. They identify the member and carry the device recorded when the member connected, not the member's current device or network. So a policy can pass the member's own sign-in and still block the connection a moment later, or block it days later. Learn more about **[Anthropic's IP addresses](https://platform.claude.com/docs/en/api/ip-addresses)**.

**Find the policy that's blocking the connection**

1. In the Microsoft Entra admin center, go to **Sign-in logs** and open the **User sign-ins (non-interactive)** tab. The member's own sign-in appears on the interactive tab and usually shows as successful, so the block is rarely there.

2. Filter by the affected member. The blocked requests can appear under either **M365 MCP Server for Claude** or **M365 MCP Client for Claude**, so filtering by member is more reliable than filtering by application. Don't filter by resource, which hides some of the rows.

3. Open the failed entry and select the **Conditional Access** tab. It names the policy that blocked the request.

The error code tells you what kind of policy it is:

- `AADSTS70043`: a sign-in frequency policy. See the next section.

- `AADSTS53003`: a policy set to block access. The Conditional Access tab tells you which one. If it's based on location, see the next section.

- `AADSTS50076`: a policy required multi-factor authentication on a server-side request. Disconnecting and reconnecting Microsoft 365 clears it. If it keeps happening, see the **[Microsoft 365 connector security guide](https://support.claude.com/en/articles/12684923-microsoft-365-connector-security-guide)**.

- `AADSTS53000`: a policy requires a compliant device. The similar code `AADSTS530003` means a policy requires a managed device. In both cases the member needs to reconnect from a device that meets the policy. Learn more in the **[Microsoft 365 connector security guide](https://support.claude.com/en/articles/12684923-microsoft-365-connector-security-guide)**.

**Exclude Anthropic's IP range from sign-in frequency and location policies**

Because the server-side requests come from Anthropic's IP range, a policy that limits sign-ins to your own network, or that enforces a sign-in frequency, blocks them for every member. Excluding the two Claude applications from the policy isn't enough on its own. We recommend excluding Anthropic's IP range from the policy as well.

**Note:** Don't use this exclusion for a device compliance policy. The server-side requests carry the device recorded when the member connected, so a device policy still applies to them, and excluding Anthropic's IP range would turn the device check off for the connector. Members blocked by a device policy need to reconnect from a device that meets it. Learn more in the **[Microsoft 365 connector security guide](https://support.claude.com/en/articles/12684923-microsoft-365-connector-security-guide)**.

If the policy that blocked the request is a sign-in frequency or location policy:

1. In the Microsoft Entra admin center, go to **Conditional Access > Named locations** and create an IP range location containing `160.79.104.0/21`. Leave **Mark as trusted location** unchecked so the exclusion doesn't affect other policies that use trusted locations.

2. Open the policy that blocked the request and go to **Conditions > Locations > Exclude**.

3. Add the named location you created. Keep any existing exclusions for the Claude applications in place.

4. Save the policy and wait a few minutes for the change to apply.

5. Have an affected member disconnect and reconnect Microsoft 365 in **Customize > Connectors**.

**Note:** Excluding the range lifts the policy for every request that comes from Anthropic's addresses, which means all Microsoft 365 connector activity for all of your members. For a sign-in frequency policy, this also means the connector's background requests are no longer subject to it, so a connection stays signed in until it expires after 90 days of inactivity. If you'd rather keep the periodic reconnects, leave the policy as it is. Members who are asked to reconnect can sign out of Microsoft in their browser, or use a private browsing window, before reconnecting. If you want to check the effect of a change before making it, clone the policy in report-only mode first.

---

## Frequently asked questions

### What happens if a member tries to connect before consent is granted?

They'll see an error message indicating that an administrator must grant app permissions before they can use the integration. The connection will fail until a Microsoft Entra Global Administrator approves the necessary permissions.

### Can the Microsoft 365 connector be used with enterprise search?

Yes. When enterprise search is enabled, it can query Microsoft 365 alongside other connected services for unified search across Slack, Google Workspace, Microsoft 365, and more.

### What file types can the connector read?

Claude reads Word, Excel, PowerPoint (including older .doc, .xls, and .ppt files), PDF, and plain-text formats such as .txt, .md, and .csv from SharePoint and OneDrive. Other formats, including OneNote, can't be read. For the full list, see **[Connect to Microsoft 365](https://support.claude.com/en/articles/15183774-connect-to-microsoft-365#h_ddeb82923f)**.

### Can the integration modify Microsoft 365 data?

Only after an Entra admin grants write scopes. With write tools on, Claude can send email, manage drafts and calendar events, update mailbox settings, and create and update files in OneDrive and SharePoint, always within each member's existing Microsoft 365 permissions. Without them, the integration is read-only. Claude can't post Teams messages or change Teams settings or permissions in either case, since there are no tools allowing this.
---

SOURCE: https://support.claude.com/en/articles/12684923-microsoft-365-connector-security-guide

# Microsoft 365 connector security guide

The Microsoft 365 connector is an **Anthropic-hosted integration** that enables Claude to securely access Microsoft 365 services (Outlook, SharePoint, OneDrive, Teams) through user-delegated permissions. Anthropic has completed Microsoft's publisher verification process, associating our verified Microsoft Partner Network account with this application to confirm our organizational identity.

The Microsoft 365 connector is available on all Claude plans: Free, Pro, Max, Team, and Enterprise.

The connector operates as a **secure proxy**, and your Microsoft 365 documents, emails, and files remain in your tenant. The connector only retrieves data on-demand during active queries and doesn’t cache file content. Credentials are encrypted and managed by Anthropic's backend infrastructure. The MCP server itself doesn’t store or manage these credentials. Microsoft's Azure SDK handles the On-Behalf-Of token exchange and caching on a per-user basis for accessing the Graph API.

## Access restriction

### Access can be fully restricted

The connector provides **multiple layers of access control** to address your security requirements. For detailed information on administration of the Microsoft 365 connector, see **[Set up the Microsoft 365 connector](https://support.claude.com/en/articles/12542951-)**.

**1. Microsoft Entra tenant requirement**

All people using the connector—regardless of Claude plan—must authenticate with a Microsoft 365 account tied to a Microsoft Entra tenant. Personal Microsoft accounts (@outlook.com, @hotmail.com) can't be used. A Microsoft Entra Global Administrator must complete a one-time consent process before anyone in the tenant can connect.

**2. Organization-level gating (Team and Enterprise plans)**

On Team and Enterprise plans, access to the connector requires a two-step approval process. First, Owners must explicitly enable the Microsoft 365 connector in Claude organization settings by navigating to Organization settings > Connectors > Browse connectors > Add "Microsoft 365." Until this approval is granted, team members have no access.

Second, after the Owner enables the connector, a Microsoft Entra Global Administrator must complete individual authentication and grant consent on behalf of the whole organization before any team members can connect.

**3. Granular permission revocation**

You can selectively disable specific capabilities via Microsoft Entra Admin Center. For example:

| **To restrict** | **Action**                                        | **Effect**                         |
| --------------- | ------------------------------------------------- | ---------------------------------- |
| All access      | Disable connector in Claude organization settings | Complete shutdown                  |
| SharePoint only | Revoke Sites.Read.All permission in Entra         | Blocks SharePoint                  |
| Email access    | Revoke Mail.Read permission in Entra              | Blocks Outlook                     |
| Teams chat      | Revoke Chat.Read permission in Entra              | Blocks Teams                       |
| OneDrive files  | Revoke Files.Read and/or Files.Read.All           | Blocks reading files from OneDrive |

Changes take effect immediately for all people in your organization. People can also choose to disable capabilities during a chat by selectively toggling off the connector's tools.

**4. Microsoft Conditional Access**

Your Conditional Access policies apply to the connector, but not always in the way they apply to a user working directly in Microsoft 365. When a user connects, Entra evaluates your policies against their sign-in. Every later request is made by Claude's servers. In our testing, Entra evaluates those requests as coming from Anthropic's IP range (`160.79.104.0/21`), identifying the member and carrying the device recorded when they connected, rather than the member's current device or network. What that means for each kind of policy:

- **Group-based access**: Supported. Scope your policy to specific security groups, or set **Assignment required** on both Claude applications as described in **[Set up the Microsoft 365 connector](https://support.claude.com/en/articles/12542951-set-up-the-microsoft-365-connector)**.

- **Multi-factor authentication (MFA)**: Supported. MFA is enforced when the member signs in to connect. If your MFA policy doesn't apply to the connector sign-in, for example because it targets specific applications, or has conditions that can skip MFA there, create a separate policy with no conditions that requires MFA for the two Claude applications.

- **Device compliance**: Supported, with a difference in when it's checked. In our testing, the policy is evaluated against the device the member connects from. A device that doesn't meet the policy isn't stopped at the connect screen; its requests fail from the first tool call afterwards. The connection then carries that device record, and ongoing access is checked against the record rather than the device currently in use, until the member next reconnects. Each member's most recent connection is the one that counts. The record is only created if the member's browser can prove the device to Entra, so a compliant device used with a browser profile that isn't signed in to your organization is treated as not compliant. Members who are blocked (`AADSTS53000`) fix it by reconnecting from a device that meets the policy, in a browser signed in to your organization. Keep the policy assigned to the Claude applications; excluding them removes the check.

- **Location and network restrictions**: Not supported. In our testing, the server-side requests always appear to come from Anthropic's IP range, wherever the member is, so a policy that limits sign-ins to your network or VPN blocks the connector for every member. The same applies to sign-in frequency policies. Learn how to exclude Anthropic's IP range in **[Set up the Microsoft 365 connector](https://support.claude.com/en/articles/12542951-set-up-the-microsoft-365-connector)**.

**Warning:** Don't change a device policy to require a compliant device *or* multi-factor authentication as a workaround. In our testing the MFA proof carries through the stored connection in the same way, so the policy can end up satisfied for every member and the device requirement stops doing anything reliable.

To stop members from connecting a work Microsoft 365 account to a Claude account outside your organization, turn on **[Restrict verified-domain connectors to your enterprise](https://support.claude.com/en/articles/15402193-restrict-verified-domain-connectors-to-your-enterprise)**.

**5. User-level permissions**

- The Microsoft 365 Connector uses **[delegated permissions](https://learn.microsoft.com/en-us/graph/permissions-overview?tabs=http#delegated-permissions)**.

- Users can only access Microsoft 365 data **they already have permission** for

- SharePoint search requires Sites.Read.All permission. Site-specific permissioning (using *.Selected permissions) is not supported because the underlying search is tenant-wide.

- Users cannot bypass SharePoint sharing settings or folder permissions.

- Users can't access other users' private files or emails. Users can search shared mailboxes they've been granted delegate access to in Microsoft 365, including full access and folder-level delegation. Shared mailbox access remains read-only, via the `Mail.Read.Shared` permission. Email search doesn't reach a user's separate Online Archive (In-Place Archive) mailbox.

- Delegated permissions inherently respect Microsoft 365 data loss prevention (DLP) policies.

**6. Token management**

- Refresh tokens expire after 90 days of inactivity by default, requiring re-authentication. This can be customized in Microsoft Entra ID using a token lifetime policy.

- Access tokens typically expire within 60-90 minutes per Microsoft Entra ID defaults and are automatically refreshed.

- Admins or users can revoke access anytime via Microsoft Entra ID.

- The Microsoft 365 Connector never sees or stores passwords.

## Security architecture summary

### Authentication flow

- **OAuth 2.0 On-Behalf-Of (OBO):** Industry-standard delegated authentication

- **PKCE protection**: Public client uses Proof Key for Code Exchange to prevent authorization code interception

- **Two-stage token exchange**: User authenticates to obtain access token for MCP server, then MCP server exchanges it for Graph API access using OBO flow with confidential client credentials. In this flow, not even the user or their Claude client has access to the OBO tokens. Only the MCP server can access and use tokens with access to the user’s data via the Microsoft Graph API.

- **No credential storage**: Users never share Microsoft passwords with Anthropic

- **Encrypted token storage**: Access and refresh tokens are encrypted while cached by the Claude backend

### Data flow

- Documents and other content are retrieved **only during active queries**

- **Tool call results** from the connector that are **part of stored chats are retained**

- **The user who requested the Claude chat** can see the tool call results and Claude’s response incorporating the data

- **Other users shared on the chat** can only see Claude’s response incorporating the result of the tool call

- Each request creates a fresh data flow which is cleaned up after the response is returned

### Multi-tenant isolation

- Microsoft Entra tenants are **cryptographically separated** from each other using a common-scoped multi-tenant configuration

- Multi-tenant isolation is cryptographically enforced through digitally signed access tokens that bind each user to their organization’s tenant

## Available capabilities

### Read and search tools

The connector provides **read-only** access to:

| **Tool**                    | **Description**                       | **Required permission** |
| --------------------------- | ------------------------------------- | ----------------------- |
| `sharepoint_search`         | Search SharePoint documents and pages | Sites.Read.All          |
| `sharepoint_folder_search`  | Find SharePoint folders by name       | Sites.Read.All          |
| `outlook_email_search`      | Search email with sender/date filters | Mail.Read               |
| `outlook_calendar_search`   | Search calendar events                | Calendars.Read          |
| `find_meeting_availability` | Find available meeting times          | Calendars.Read          |
| `chat_message_search`       | Search Teams chat messages            | Chat.Read               |
| `read_resource`             | Read files, emails, or chat by URI    | Varies by resource type |

### Write tools

| **Tool**                         | **Description**                                      | **Required permission**   |
| -------------------------------- | ---------------------------------------------------- | ------------------------- |
| `outlook_send_mail`              | Send an email as the user                            | Mail.Send                 |
| `outlook_forward_mail`           | Forward an existing message                          | Mail.Send                 |
| `outlook_send_draft`             | Send an existing draft                               | Mail.Send                 |
| `outlook_trash_thread`           | Move a conversation to Deleted Items                 | Mail.ReadWrite            |
| `outlook_untrash_thread`         | Restore a conversation from Deleted Items            | Mail.ReadWrite            |
| `outlook_batch_delete_messages`  | Move multiple messages to Deleted Items              | Mail.ReadWrite            |
| `outlook_create_draft`           | Create a draft email                                 | Mail.ReadWrite            |
| `outlook_create_reply_draft`     | Create a reply draft on a message                    | Mail.ReadWrite            |
| `outlook_create_reply_all_draft` | Create a reply-all draft on a message                | Mail.ReadWrite            |
| `outlook_update_draft`           | Update an existing draft                             | Mail.ReadWrite            |
| `outlook_delete_draft`           | Move a draft to Deleted Items                        | Mail.ReadWrite            |
| `outlook_create_label`           | Create a category in the master list                 | MailboxSettings.ReadWrite |
| `outlook_update_label`           | Rename or recolor a category                         | MailboxSettings.ReadWrite |
| `outlook_delete_label`           | Remove a category from the master list               | MailboxSettings.ReadWrite |
| `outlook_modify_labels`          | Add/remove categories on one message                 | Mail.ReadWrite            |
| `outlook_modify_thread_labels`   | Add/remove categories across a thread                | Mail.ReadWrite            |
| `outlook_batch_modify_labels`    | Add/remove categories on multiple messages           | Mail.ReadWrite            |
| `outlook_create_event`           | Create a calendar event                              | Calendars.ReadWrite       |
| `outlook_update_event`           | Update an existing event                             | Calendars.ReadWrite       |
| `outlook_delete_event`           | Delete a calendar event                              | Calendars.ReadWrite       |
| `outlook_respond_to_event`       | Accept, decline, or tentatively accept an invitation | Calendars.ReadWrite       |
| `outlook_set_vacation`           | Set the automatic-reply (out-of-office) message      | MailboxSettings.ReadWrite |
| `outlook_create_filter`          | Create an inbox rule                                 | MailboxSettings.ReadWrite |
| `outlook_delete_filter`          | Delete an inbox rule                                 | MailboxSettings.ReadWrite |
| `sharepoint_upload_file`         | Create a new file in a library or folder             | Files.ReadWrite.All       |
| `sharepoint_update_file`         | Replace an existing file's content                   | Files.ReadWrite.All       |
| `sharepoint_create_folder`       | Create a new folder                                  | Files.ReadWrite.All       |
| `sharepoint_rename_item`         | Rename a file or folder                              | Files.ReadWrite.All       |
| `sharepoint_move_item`           | Move a file or folder                                | Files.ReadWrite.All       |
| `sharepoint_copy_item`           | Copy a file or folder                                | Files.ReadWrite.All       |
| `sharepoint_delete_item`         | Delete a file or folder (to recycle bin)             | Files.ReadWrite.All       |

**Note:** “Always allow” is not supported for `outlook_send_email`, `outlook_forward_mail`, `outlook_send_draft`, `outlook_create_event`, or `outlook_update_event`.

When an organization enables write tools, the connector also exposes write tools for sending and organizing email, managing drafts and calendar events, updating mailbox settings, and creating and updating files in OneDrive and SharePoint. Teams remains read-only.

Write tools include the following built-in safeguards:

- **Attribution:** Emails Claude sends include an attribution header identifying them as agent-initiated. File and calendar writes aren't currently tagged.

- **Rate limits:** Per-user limits apply to writes, sends, and recipients.

- **Attachment restriction:** Attachments aren't supported in any write tool—sending, forwarding, and drafting all reject messages with attachments.

- **Blocked by default:** Organizations that used the connector before write tools launched have write tools blocked by default until an admin enables them.

## Permissions list

**Basic permissions**

- **[User.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#userread)** - Sign in and read user profile (basic requirement)

**Mail permissions**

- **[Mail.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#mailread)** - Read user mail (required for email tools/resources)

- **[Mail.ReadBasic](https://learn.microsoft.com/en-us/graph/permissions-reference#mailreadbasic)** - Read user mail metadata (alternative for limited functionality)

- **[Mail.Read.Shared](https://learn.microsoft.com/en-us/graph/permissions-reference#mailreadshared)** - Read user and shared mail

- **[MailboxFolder.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#mail-permissions)** - Read a user's mailbox folders

- **[MailboxItem.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#mail-permissions)** - Read a user's mailbox items

**Calendar permissions**

- **[Calendars.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#calendarsread)** - Read user calendars and events

- **[Calendars.Read.Shared](https://learn.microsoft.com/en-us/graph/permissions-reference#calendarsreadshared)** - Read calendars user can access, including shared

**User directory**

- **[User.ReadBasic.All](https://learn.microsoft.com/en-us/graph/permissions-reference#userreadbasicall)** - Read basic profiles of all users (for meeting availability)

**Chat permissions**

- **[Chat.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#chatread)** - Read user chat messages

- **[Chat.ReadBasic](https://learn.microsoft.com/en-us/graph/permissions-reference#chatreadbasic)** - Read user chat metadata (alternative for limited functionality)

- **[ChatMember.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#chatmemberread)** - Read the members of chats

- **[ChatMessage.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#chatmessageread)** - Read user chat messages (more specific than Chat.Read)

**Channel permissions**

- **[Channel.ReadBasic.All](https://learn.microsoft.com/en-us/graph/permissions-reference#channelreadbasicall)** - Read the names and descriptions of channels

- **[ChannelMessage.Read.All](https://learn.microsoft.com/en-us/graph/permissions-reference#channelmessagereadall)** - Read channel messages

**Meeting permissions**

- **[OnlineMeetings.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#onlinemeetingsread)** - Read online meetings

- **[OnlineMeetingTranscript.Read.All](https://learn.microsoft.com/en-us/graph/permissions-reference#onlinemeetingtranscriptreadall)** - Read meeting transcripts

- **[OnlineMeetingAiInsight.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#onlinemeetingaiinsightread)** - Read all AI Insights for online meetings

- **[OnlineMeetingArtifact.Read.All](https://learn.microsoft.com/en-us/graph/permissions-reference#onlinemeetingartifactreadall)** - Read user's online meeting artifacts

- **[OnlineMeetingRecording.Read.All](https://learn.microsoft.com/en-us/graph/permissions-reference#onlinemeetingrecordingreadall)** - Read all recordings of online meetings

**Files permissions**

- **[Files.Read](https://learn.microsoft.com/en-us/graph/permissions-reference#filesread)** - Read user files

- **[Files.Read.All](https://learn.microsoft.com/en-us/graph/permissions-reference#filesreadall)** - Read all files user can access

**Sites permissions**

- **[Sites.Read.All](https://learn.microsoft.com/en-us/graph/permissions-reference#sitesreadall)** - Read items in all site collections

**Write permissions**

Requested as part of the updated consent set; used only when write tools are enabled:

- **[Mail.Send](https://learn.microsoft.com/en-us/graph/permissions-reference#mailsend)** - Send and forward email

- **[Mail.ReadWrite](https://learn.microsoft.com/en-us/graph/permissions-reference#mailreadwrite)** - Create, update, and delete drafts; move and label messages

- **[Calendars.ReadWrite](https://learn.microsoft.com/en-us/graph/permissions-reference#calendarsreadwrite)** - Create, update, delete, and respond to calendar events

- **[Files.ReadWrite.All](https://learn.microsoft.com/en-us/graph/permissions-reference#filesreadwriteall)** - Create and update files in OneDrive and SharePoint

- **[MailboxSettings.ReadWrite](https://learn.microsoft.com/en-us/graph/permissions-reference#mailboxsettingsreadwrite)** - Manage categories, inbox rules, and automatic replies

## Current limitations

- **Teams is read-only**: Claude can't post Teams messages or modify Teams settings. Other write tools require an admin to enable them.

- **User-level access only**: Access with service principal authentication is not supported.

- **Online Archive mailboxes aren't searched**: email search covers each user's primary mailbox, including its Archive folder, and any shared mailboxes they can access. It doesn't cover the separate Online Archive mailbox (also called the In-Place Archive), so messages that a retention policy has moved there won't appear in results.

## Frequently asked questions

### Can we test with a small pilot group before enterprise-wide rollout?

Yes. The recommended approach is to use app assignment to restrict who can use the connector:

- Enable the connector (Team and Enterprise Owners enable it in organization settings; individual plan users can connect directly).

- Microsoft Entra Admin completes pre-consent setup

- Use Microsoft Entra Enterprise App assignment to restrict access to specific users or groups (e.g., assign only "IT Security Test Group" to the app).

- Expand groups progressively for gradual deployment

### How do we ensure no data leakage occurs between our organization and others in the multi-tenant environment?

Multi-tenant isolation ensures complete separation:

- Server uses the common tenant configuration to accept tokens from any Microsoft Entra ID tenant

- Each user's token contains their organization's tenant ID (tid claim) which is validated

- Graph API tokens obtained through OBO are automatically scoped to the user and their tenant

- Cross-tenant token access is prevented cryptographically by the design of Microsoft Graph’s OAuth 2.0 implementation.

### What happens if someone tries to connect with a personal Microsoft account?

The connector requires a Microsoft Entra tenant tied to a Microsoft Business plan. Personal Microsoft accounts (@outlook.com, @hotmail.com) can't be used to authenticate. People attempting to connect with a personal account will receive an authentication error.

### Do you have audit logging for compliance?

Yes. All Graph API calls made by the connector are logged in your organization's Microsoft 365 audit log, which you can access through the M365 Compliance Center. These logs show the timestamp, user, operation performed, and resource accessed, with retention periods matching your Microsoft 365 audit policy. Additionally, Anthropic logs authentication and tool execution events.

### Can we revoke access if we discover unauthorized usage?

There are multiple revocation methods:

- **Individual:** Users disconnect via **Customize > Connectors**

- **Admin-level**: On Team and Enterprise plans, Owners disable the connector in Claude organization settings (all team members affected).

- **Permission-level**: Revoke specific permissions in Microsoft Entra Admin Center

- **Tenant-level**: Revoke all permissions in Microsoft Entra Admin Center

### What certifications does Anthropic have?

Anthropic has the following certifications:

- **SOC 2 Type II** (annual audit)

- **ISO 27001** certified

- **GDPR compliant** (DPA available)

- **Microsoft publisher-verified** application

## Additional resources

- **[Set up the Microsoft 365 connector](https://support.claude.com/en/articles/12542951-)**

- **[Connect Claude to Microsoft 365](https://support.claude.com/en/articles/15183774)**

- **[Overview of Microsoft Graph permissions: Delegated permissions](https://learn.microsoft.com/en-us/graph/permissions-overview?tabs=http#delegated-permissions)**
---

SOURCE: https://support.claude.com/en/articles/12702546-deploying-enterprise-grade-mcp-servers-with-desktop-extensions

# Deploying enterprise-grade MCP servers with desktop extensions

Desktop extensions are installable packages that run Model Context Protocol (MCP) servers locally on your machine. They provide Claude Desktop with secure access to your local resources, internal systems, and personal tools without the complexity of remote infrastructure.

With desktop extensions, you can deploy enterprise-grade MCP implementations with fine-grained admin controls. This article explains why desktop extensions are valuable for organizations and how to use them effectively.

## Why use desktop extensions?

### Seamless authentication

Desktop extensions operate within your corporate network boundaries, using the user’s existing authenticated context without requiring additional firewall rules or VPN configurations. They leverage existing SSO and browser sessions automatically with no token management required – credentials stay securely on user devices.

### Access internal resources

Desktop extensions connect to internal wikis, JIRA, Confluence, and other systems behind your firewall. They can query private databases and APIs without VPN configuration, connect to on-premises systems like SAP, Oracle, and custom applications, and access internal resources without exposing them on public infrastructure.

### Read and manipulate local resources

Desktop extensions provide access to local resources that remote connectors cannot reach. This includes direct filesystem access for code editing and Git operations, integration with locally installed tools like Docker, IDEs, and databases, control over desktop applications via local APIs, and hardware integration for specialized workflows.

### Instant deployment with minimal infrastructure overhead

One-click installation through Claude Desktop comes with no dependencies to manage. The built-in Node.js runtime is included, there’s no cloud infrastructure to provision, and updates are distributed directly through the extension marketplace.

### Enterprise-grade controls

Organization owners can upload custom extensions to their organization and control which desktop extensions their users have access to through the desktop extension allowlist. To learn more about managing desktop extensions in your organization, see Enabling and using the desktop extension allowlist.

## Enterprise use cases

**Multiple enterprises are building desktop extensions to serve a variety of use cases:**

- As secure proxies to internal MCP servers, giving them complete control over access, authentication, and audit logs while maintaining their zero-trust architecture.

- To give Claude access to internal documentation and knowledge bases.

- To connect to development tools and databases securely, and maintain complete control over authentication, authorization, and audit logging.

Desktop extensions eliminate the traditional tradeoff between security and usability—providing Claude with powerful capabilities while maintaining your enterprise security posture.
---

SOURCE: https://support.claude.com/en/articles/13454812-use-interactive-connectors-in-claude

# Use interactive connectors in Claude

Interactive connectors are available for all users on Claude, Cowork, Claude Desktop, and Claude for iOS/Android.

## What are interactive connectors?

Some connectors can now display live, interactive apps directly within your Claude conversations. Instead of returning text-only responses, these connectors render interfaces—like analytics dashboards, task boards, or design tools—that you can interact with without leaving the chat.

For example, you might ask Claude about your project status, and instead of just describing it, Claude opens your Asana board right in the conversation. You can check off tasks, update statuses, and keep chatting with Claude—all in one place.

Claude can also generate its own custom visuals—diagrams, charts, and simple interactive elements built from scratch for your question. When a connected service offers an interactive interface that handles your request, like an MCP app, Claude will use it. Custom visuals fill the gaps when no connector interface fits what you’re asking for.

For more on Claude-generated visuals, see **[Custom visuals in chat](https://support.claude.com/en/articles/13979539-custom-visuals-in-chat)**.

---

## How interactive connectors appear

Interactive connectors display in two ways:

**Inline cards** are compact components embedded directly in the conversation. They're ideal for quick summaries, confirmations, and single actions—like a status update or a message draft ready to send.

**Fullscreen view** provides an immersive interface for complex interactions like data visualizations, document editing, or detailed project views. The conversation input remains available so you can continue talking to Claude while interacting with the connector.

## Interact with connectors

You can interact directly with elements inside the connector:

- Filter, sort, or drill into data

- Toggle settings, check boxes, or make selections

- Confirm and execute actions (mark complete, send, save)

- Expand and collapse content sections

If you need to ask Claude to modify something, refine a result, or navigate to a different context, type in the conversation input—Claude can interpret your request and update the interface accordingly.

## Which connectors are interactive?

In the **[Connectors Directory](https://claude.ai/directory)**, connectors with this capability are marked with an "Interactive” badge. Current interactive connectors include:

- **Amplitude** — View and interact with analytics dashboards

- **Asana** — Manage tasks and project boards

- **Box** — Work with documents and files

- **Canva** — Create and edit designs

- **Clay** — Manage contacts and outreach

- **Figma** — Review and annotate designs

- **Hex** — Explore data and notebooks

- **Slack** — Draft and send messages

We’re adding support for more interactive connectors over time.

## Get started with interactive connectors

1. Navigate to the **[Connectors Directory](https://claude.ai/directory)**.

2. Look for connectors marked with the "Interactive" badge.

3. Connect and authenticate with the connector.

4. Start a conversation with Claude and ask about something the connector handles—the interactive elements will appear automatically when relevant.

**Note:** Interactive connectors are default on when you have the relevant connector enabled. No additional setup is needed.

## Considerations for Team and Enterprise plans

### Can Team and Enterprise owners control interactive connectors separately from standard connectors?

Yes. Team and Enterprise owners can disable the specific tool calls that render interactive connectors within **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**. This does not disable the connector itself — text-based tool functionality continues to work normally.

---

## Permissions and security

### How are interactive connectors secured?

Interactive connectors run in sandboxed iframes with strict Content Security Policies. All communication between the interface and Claude uses auditable JSON-RPC messaging. Servers must predeclare which external domains they need, and the host can review HTML content before rendering.

### Do interactive connectors require additional permissions beyond the connector itself?

No. Interactive connectors use the same permissions you granted when connecting the tool. They don't request additional access to your data.

### Can interactive connectors make purchases or financial transactions?

No. Purchases through third-party interactive connectors are not supported.

---

## Troubleshooting

### The interface isn't appearing

- Check that the connector is connected and enabled for your current conversation.

- Try starting a new conversation and asking Claude a question that the connector handles.

### The connector isn't responding to interactions

- Check your internet connection.

- Try refreshing the page or restarting Claude Desktop.

- If the issue persists, disconnect and reconnect the connector in **[Settings > Connectors](https://claude.ai/settings/connectors)**.

### I want to disable interactive connectors

- **Team and Enterprise users:** Ask your organization owner to disable the relevant tool calls in **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**.

- **Individual users:** You can disable specific connector tools via the "Search and tools" menu in your conversation.

---

## I'm a developer. Where can I learn about building MCP Apps?

MCP Apps is the open-source extension to the Model Context Protocol that powers interactive apps. If you are building your own interactive connector, note that it must meet additional design, security, and testing requirements. For details, see **[Submitting to the Connectors Directory](https://claude.com/docs/connectors/building/submission)** on Claude Docs.
---

SOURCE: https://support.claude.com/en/articles/13917817-google-workspace-sso-scim-email-mismatch

# Google Workspace SSO/SCIM email mismatch

Claude uses email as the primary identifier to match SSO logins to provisioned seats. In Google Workspace, SCIM auto-provisioning and SAML SSO can send different email values—especially when people have email aliases—causing a mismatch that blocks access.

**Applies to:** Enterprise plans and Console organizations using SCIM provisioning. Team plans don't have SCIM provisioning, so this mismatch scenario doesn't apply — see **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)** for what's available on each plan.

---

## Symptoms

People may experience one or more of the following when attempting to access your organization via SSO:

- **"Account creation is blocked"** — The person authenticates via SSO but Claude cannot find a matching provisioned account. If your organization has organization creation restricted (recommended), the person is blocked entirely.

- **Landing on a free personal account** — If organization creation is not restricted, the person bypasses your organization entirely and creates or lands on a free personal account instead of their provisioned seat.

- **"Please confirm your email" mismatch** — The SSO callback shows a different email than the one the person entered at login.

- **Claude Code authentication failure** — The Claude Code CLI shows an email mismatch error during the authentication flow, preventing the person from connecting to your organization.

---

## How this happens

Google Workspace accounts have a primary email and may have multiple aliases. SCIM provisioning and SAML SSO are configured separately in the Google Admin console and can pull from different address fields:

| **Google attribute**    | **Typical value**                                | **Commonly used by**                |
| ----------------------- | ------------------------------------------------ | ----------------------------------- |
| `primaryEmail`          | `test.user.one@example.com`                      | Recommended for both SCIM and SAML  |
| Email aliases           | `testuser1@example.com`, `t.userone@example.com` | Sometimes mapped by mistake in SCIM |
| Custom schema fields    | Custom attributes defined per org                | Advanced attribute mappings         |
| Organization unit email | OU-derived address variants                      | Rarely, in complex org structures   |

The most common mismatch: SCIM is configured to send an alias address while SAML sends the primary email (or vice versa). Since aliases and primary emails are different strings, Claude cannot match them. Claude requires an **exact string match**.

**Common confusion:** In Google Admin, SCIM auto-provisioning settings and SAML attribute mapping are on separate tabs within the same app. Admins sometimes update one and miss the other. Verify both locations.

---

## Diagnostic steps

### Step 1 — Confirm the mismatch

1. **Check the SCIM email:** In the **Google Admin console**, go to **Apps → Web and mobile apps → [Claude app] → Auto-provisioning**. Check which attribute is mapped to the email field being sent to Claude.

2. **Check the SAML email:** In the same app, go to the **SAML attribute mapping** section. Find the attribute mapped to email and note its source.

3. **Check a specific person:** In **Directory → Users → [User]**, compare the **Primary email** with any listed **Alias emails**.

### Step 2 — Identify the scope of the problem

- If **most or all** provisioned people share the same email format mismatch, this is a **systemic attribute mapping problem**. The fix is in your IdP's SCIM attribute mapping.

- If only **one or two people** are affected, the issue is likely specific to those accounts. Check their profile directly.

### Step 3 — Check Name ID in SAML configuration

1. In the app settings, go to **SAML → Service provider details**.

2. Confirm that the **Name ID** is set to **Basic Information → Primary email**.

3. If Name ID is set to a custom schema field or alias, it may send a different value than SCIM.

---

## Resolution

### Align both mappings to primaryEmail

Google Workspace's primaryEmail is the most reliable source for both SCIM and SAML.

1. **Update SCIM provisioning:** In **Apps → Web and mobile apps → [Claude app] → Auto-provisioning → Attribute mapping**, ensure the email attribute maps to primaryEmail.

2. **Update SAML Name ID:** In **SAML → Service provider details**, set **Name ID** to **Basic Information → Primary email**.

3. **Update SAML attribute mapping:** In the **Attribute mapping** step, ensure the email attribute is mapped to **Basic Information → Primary email**.

4. Save all changes.

### Trigger a full re-sync

**Critical — Full sync required:** An incremental sync will *not* update existing records after you change an attribute mapping. You must trigger a **full restart** of the provisioning cycle.

1. In the Google Admin console, go to the app's **Auto-provisioning** settings.

2. Temporarily suspend provisioning, then re-enable it. This triggers a full sync of everyone assigned.

3. Alternatively, remove and re-add affected people from the app assignment to force their individual records to re-provision.

4. Monitor the provisioning logs for errors and confirm emails updated to match the SAML format before asking people to retry.

---

## Post-fix cleanup

After correcting the attribute mapping and completing the full sync:

- **Rogue free accounts:** If organization creation was not restricted before the fix, some people may have inadvertently created free personal Claude accounts. Contact **[our Support team](https://support.claude.com/en/articles/9015913)** to have these removed.

- **Ghost accounts (wrong-email seats):** The originally provisioned accounts with the incorrect email may still exist in your organization, occupying seats. Contact our Support team to deprovision these.

- **Seat availability:** If ghost accounts are occupying all contracted seats, new logins will fail with an out-of-seats error. Deprovisioning the ghost accounts frees those seats.

- **Re-adding affected people:** After ghost accounts are removed, people with the corrected email may need to be re-invited or re-provisioned.

- **Prevent future occurrences:** Enable "Restrict organization creation" in your organization's Identity and access settings. This prevents people who aren't yet provisioned from accidentally creating free personal accounts.

---

## Verification

1. Check a sample of provisioned people—confirm their email in the provisioning log matches the email format that SSO sends.

2. Ask an affected person to clear browser cookies for claude.ai, then log in via SSO. They should land directly in your organization's workspace without any error.

3. Confirm people aren't creating free accounts—with organization creation restricted, blocked people see a clear error rather than landing on a personal account.

4. If Claude Code was affected, have the person re-run `claude auth login --enterprise` and confirm the email matches their provisioned seat.

---

## Common issues

| **Issue**                                                                 | **Solution**                                                                                                           |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| SCIM sends an alias while SAML sends the primary email                    | Always use `primaryEmail` for both.                                                                                    |
| Name ID in SAML settings was not checked                                  | The Name ID field determines the email sent at login. This is separate from the attribute mapping section. Check both. |
| Custom schema field is blank for some people                              | Stick to standard Google attributes like `primaryEmail`.                                                               |
| Reprovisioning doesn't trigger automatically after mapping change         | You may need to manually suspend and re-enable provisioning to force a full sync.                                      |
| Someone's primary email changed but the old email still appears in Claude | A full re-sync is needed after primary email changes.                                                                  |
| Emails updated in SCIM but person still can't log in                      | Check for rogue free orgs or ghost accounts. Clear browser cookies and retry.                                          |

---

## When to contact Support

Contact **[our Support team](https://support.claude.com/en/articles/9015913)** with your organization's domain, the affected person's email, and screenshots of your attribute mappings when:

- SCIM and SSO attributes appear identical but people still cannot access their seats.

- You need confirmation of the email Claude recorded during SCIM provisioning for specific people.

- You need help cleaning up ghost accounts or rogue free orgs.

- People are hitting an out-of-seats error despite available contracted seats.
---

SOURCE: https://support.claude.com/en/articles/13917884-google-workspace-sso-setup

# Google Workspace SSO setup

This guide helps you configure Claude to use Google Workspace as your identity provider for SSO and automated user provisioning. It applies to Team plans, Enterprise plans, and Console organizations.

## Prerequisites

- A Claude Team plan, Enterprise plan, or Console organization with a parent organization (see **[Important considerations before enabling SSO](https://support.claude.com/en/articles/10276682)** for Console parent org requirements)

- Owner or Primary Owner role (Team and Enterprise) or Admin role (Console)

- Google Workspace Super Admin access

- Your domain verified in Claude's Identity and access settings—see **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full setup path including domain verification

## Where to find your configuration values

The ACS URL, Entity ID, and SCIM credentials referenced below are provided in the WorkOS setup flow within your Identity and access settings—not by contacting Support.

- **Team and Enterprise plans:** go to **[claude.ai/admin-settings/identity](https://claude.ai/admin-settings/identity)**

- **Console organizations:** go to **[platform.claude.com/settings/identity](https://platform.claude.com/settings/identity)**

Start the SSO setup flow there and keep it open alongside the Google Admin console as you work through the steps below.

---

## Step 1 — Add a custom SAML app in Google Admin

1. In the **Google Admin console**, go to **Apps → Web and mobile apps → Add app → Add custom SAML app**.

2. Name it "Claude" and click "Next."

3. Download the **IdP metadata** XML. You'll upload this in the WorkOS setup flow when prompted.

4. Click "Next."

## Step 2 — Enter service provider details

1. Enter the values from the WorkOS setup flow: **ACS URL** and **Entity ID**.

2. Set **Name ID format** to **EMAIL** and **Name ID** to **Basic Information > Primary email**.

3. Click "Next."

## Step 3 — Configure attribute mapping

1. In the **Attribute mapping** step, add: Google Directory attribute: **Primary email** → App attribute: email.

2. Click "Finish."

## Step 4 — Enable auto-provisioning (SCIM)

**Note:** SCIM provisioning is available on Enterprise plans and eligible Console organizations only. If you're on a Team plan, skip this step—you can use JIT provisioning instead. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195)**.

1. In the app's settings, go to the **Autoprovisioning** section and click "Configure autoprovisioning" (may require enabling in Google Workspace admin settings).

2. Enter the **Endpoint URL** and **Access token** from the WorkOS setup flow.

3. Map the primaryEmail attribute to the Claude email field.

4. Enable provisioning and save.

**Critical:** Both SAML and SCIM must use primaryEmail. If someone has aliases, ensure their primary Google email matches what SCIM sends. For troubleshooting, see **[Google Workspace SSO/SCIM email mismatch](https://support.claude.com/en/articles/13917817)**.

## Step 5 — Assign the app to people or OUs

1. In the app settings, click "User access."

2. Enable the app for the relevant Organizational Units or groups.

3. Click "Save."

## Step 6 — Verify

1. If you enabled SCIM, check that provisioned people appear in your organization's member list.

2. Have a test user log in via SSO and confirm they land in your organization's workspace.

---

## Need help?

See **[Set up single sign-on](https://support.claude.com/en/articles/13132885)** for the full end-to-end flow including domain verification and choosing a provisioning approach. If you run into issues, contact **[our Support team](https://support.claude.com/en/articles/9015913)** with your organization's domain and a screenshot of your SAML configuration.
---

SOURCE: https://support.claude.com/en/articles/14328846-browse-skills-connectors-and-plugins-in-one-directory

# Browse skills, connectors, and plugins in one directory

Our unified directory brings skills, connectors, and plugins together in one place so you can find and install everything that customizes Claude without switching between separate menus. On Team and Enterprise plans, the directory is also where skills shared across your organization appear.

---

## Access the directory

1. Open Claude or Claude Desktop

2. Click “Customize” in the left sidebar.

3. Click on the tab you want to view (Skills, Connectors, or Plugins), then the “+” button.

4. Select “Browse [skills / connectors / plugins]” to open the unified directory.

### Skills

To open the Skills directory, go to **[Customize > Skills](https://claude.ai/customize/skills)**, click the “+” button, then “Browse skills.” Click the “Install” button on any skill to add it to your skills list. Once installed, the skill appears in **[Customize > Skills](https://claude.ai/customize/skills)** and is enabled by default, so Claude can use it automatically when relevant. You can toggle it off at any time, but the skill stays in the directory so you can re-enable it later.

Skills you install from the directory are view-only. You can use them, but you can't edit their contents. If you want to change how a skill works, download a copy, modify it, and upload it as your own.

For members of Team and Enterprise plans, the “Your organization” tab surfaces skills that have been shared with your entire organization. This includes skills that owners have provisioned centrally and skills that colleagues have shared organization-wide. You can’t fully delete organization-shared skills from your list. Only the person who shared the skill or an organization owner can remove it from the directory.

**Note:** Skills shared with you directly by a colleague don’t appear in the directory. They go straight to your skills list. See **[Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude)** for details on how shared skills work.

### Connectors

The connectors tab shows the same catalog of services you can connect Claude to, now in the unified view. Click "Connect" on any service to start the authentication flow. For more on connecting and managing services, see **[Use connectors to extend Claude’s capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)**.

### Plugins

The plugins tab shows available plugins, including any your organization has distributed through a marketplace. Click "Install" to add a plugin. Once installed, the skills from that plugin are available in chat (on the web and the Chat tab in Claude Desktop) and in Cowork. For more on installing and customizing plugins, see **[Use plugins in Claude](https://support.claude.com/en/articles/13837440-)**.

## For organization owners

Skill sharing to the directory is off by default. To let people in your organization share skills org-wide, enable the **Share with organization** toggle in **[Organization settings > Skills](https://claude.ai/admin-settings/skills)**. You can also enable the **Skill sharing** toggle separately, which lets people share skills with specific colleagues without publishing to the directory.

For full details on configuring sharing and provisioning skills centrally, see **[Provision and manage skills for your organization](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization)**.
---

SOURCE: https://support.claude.com/en/articles/14503689-mcp-connectors

# MCP connectors

MCP connectors let Claude connect to your organization’s tools, data sources, and services. Claude can search your documents, read your email, or call external APIs on your behalf, all without leaving the chat.

For general questions about connectors in Claude, see **[Use connectors to extend Claude's capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)**.

## How MCP connectors differ in Claude for Government

**Claude for Government runs the first FedRAMP High authorized MCP implementation.** The MCP framework, the infrastructure that registers, authenticates, and executes Anthropic-provided connectors, operates entirely within the Claude for Government authorized boundary. Because the authorization covers MCP as a feature, new Anthropic-provided and customer-provided connectors can be added without additional FedRAMP audits of Claude for Government itself, as long as the connectors meet your agency's data-handling requirements.

**The connector catalog is curated.** Only connectors approved for the government environment appear in the Admin Settings directory, so some commercial Claude connectors are not available.

**Important:** Some connectors call external APIs that transmit data outside the FedRAMP boundary. Each connector's catalog description states what data flows where. Your organization is responsible for evaluating whether that data flow is appropriate for your workloads, data classification levels, and applicable regulatory requirements.

## Browse available connectors

| **Connector**                                                                    | **What it does**                                                        | **Data boundary notes**                                                                                                                                                     |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Microsoft 365                                                                    | Search SharePoint, OneDrive, Outlook email and calendar, and Teams chat | All data stays in your M365 tenant; read-only                                                                                                                               |
| **[Web Search](https://support.claude.com/en/articles/14503775-mcp-web-search)** | Real-time search of the public internet                                 | Search queries are transmitted to a third-party search provider outside the boundary (user-approved, ZDR).<br>Every Web Search query must be manually approved by the user. |

Organizations can also register their own MCP servers for internal systems, custom tools, or approved third-party services. See **[Custom Connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)**.

## Enable a connector for your organization

Connectors are enabled org-wide from Admin Settings. Once enabled, individual users in your organization can connect their own accounts.

**Note**: You must be an Owner or Primary Owner to enable connectors. Members can connect their accounts to connectors that are already enabled but cannot add new ones to the catalog.

1. Navigate to **claude.fedstart.com/admin-settings/connectors** (or use your organization’s custom Claude for Government domain).

2. Click "Browse connectors" to view the catalog.

3. Select a connector and review its description, paying particular attention to what data leaves the boundary, if any.

4. Click "Add to your organization."

5. Some connectors require an organization-level authentication step (for example, the Microsoft 365 connector requires tenant-admin consent in Microsoft Entra). Follow the on-screen instructions.

## Connect your account to a connector

After your org admin enables a connector, it appears in your personal settings.

1. Navigate to **claude.fedstart.com/settings/connectors**

2. Click "Connect" next to the connector.

3. Complete the authentication flow—typically a one-time OAuth consent screen.

4. The connector is now active in your chats. Claude will use it automatically when relevant, or you can reference it directly ("search my SharePoint for…").

---

## Security and privacy

### How authentication works

Connectors use delegated, per-user OAuth wherever possible. When you connect a tool, Claude inherits your permissions in that tool and can only see and do what you can already see and do. There are no service accounts with elevated access.

### Where your credentials are stored

OAuth tokens are encrypted at rest and stored entirely within the Claude for Government FedRAMP High boundary. Tokens are scoped to the individual user who authenticated and are never shared between users. Anthropic does not receive standing access to your connected tenants.

### What stays inside the boundary

The MCPservice, token storage, and all connector-execution audit logging stay inside the FedRAMP High authorized environment. Each tool invocation follows the path:

User → Claude (in boundary) → MCP service(in boundary) → connected service

Whether the **connected service** sits inside or outside the boundary depends on the connector. The catalog description for each connector states this explicitly. For example, the Microsoft 365 connector calls Microsoft Graph within your tenant; the Web Search connector calls a third-party search API outside the boundary under a zero-data-retention agreement.

**Important:** Adding a connector does not change Claude for Government's FedRAMP authorization, but your agency's own ATO process may require you to evaluate the specific data-handling characteristics of each connector before enabling it.

---

## Frequently asked questions

### Does enabling a connector give Anthropic access to our data?

No. Connectors use per-user delegated OAuth. Data flows between the in-boundary MCP proxy and the connected service using the individual user's credentials. Anthropic does not receive standing access to your tenant.

### If we add a new connector, do we need to update our ATO?

Adding a connector does not change Claude for Government's FedRAMP authorization—MCP was authorized as a feature. Whether your agency's own ATO requires an update depends on the data the connector handles and your internal authorization process.

### Can we restrict which users in our org can use a connector?

Connectors are enabled at the organization level. Once enabled, any user in the org can connect their individual account. Per-user or per-group connector gating is not currently available.

### Can Claude take write actions—send emails, create files—through connectors?

It depends on the connector: admins should review all connector permissions before adding them. Custom connectors can expose write tools if your MCP server implements them; see the security guidance in Custom Connectors before enabling write scopes.
---

SOURCE: https://support.claude.com/en/articles/14503703-mcp-individual-connectors

# MCP: Individual connectors

Your organization can register its own MCP servers in Claude for Government, letting Claude connect to internal systems, custom tools, or third-party services you've approved for your environment.

**Custom connectors work the same way in Claude for Government as in Claude Enterprise.** The prerequisites, the registration flow, and the behavior once enabled are identical. For full setup instructions, see **[Use connectors to extend Claude's capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)**. This page covers only what's different.

For general guidance on building and deploying MCP servers, see **[modelcontextprotocol.io](https://modelcontextprotocol.io/)** and the **[commercial connector guide](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)**.

## How custom connectors differ for Claude for Government

**Adding a connector does not trigger a new FedRAMP review**

MCP was authorized as a **feature** in Claude for Government's FedRAMP High package. The infrastructure that registers, authenticates, and executes your connector—including encrypted token storage, per-user OAuth, and audit logging—is already covered. You can add new custom connectors without re-engaging Anthropic's FedRAMP audit process.

**Important:** This applies to Claude for Government's authorization only. Your agency's own ATO process may still require you to evaluate the MCP server and any backing services it reaches before enabling them. Anthropic does not review, authorize, or assume responsibility for customer-registered MCP servers or the external systems they call.

## Register custom connectors

Navigate to **claude.fedstart.com/admin-settings/connectors** as an **Owner** or **Primary Owner**. The rest of the flow matches the **[commercial guide](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)**.

Once added, the connector appears in your users' settings exactly as Anthropic-provided connectors do.

## Know where the FedRAMP boundary sits

When a user invokes a tool from your custom connector:

User → Claude → MCP proxy → Your MCP server → Your backing service

└──── inside FedRAMP High ────┘ └─your responsibility─┘

Claude, the MCP proxy, and all OAuth token storage stay inside the FedRAMP High authorized environment. Whether your MCP server and its backing service sit inside or outside that boundary is under your control and yours to evaluate against the data classifications your users will handle.

**Prefer FedRAMP-authorized backing services.** If your connector talks to a SaaS product, check whether that product has a government-cloud offering—Atlassian Government Cloud, Salesforce Government Cloud, ServiceNow GCC—and point the connector there rather than at the commercial endpoint.
---

SOURCE: https://support.claude.com/en/articles/14503775-mcp-web-search

# MCP: Web Search

The Web Search connector gives Claude the ability to search the public internet for real-time information, including verifying facts, pulling recent news, and researching topics outside its training data.

For questions about web search in commercial Claude, see **[Enabling and using web search](https://support.claude.com/en/articles/10684626-enabling-and-using-web-search)**.



## How Web Search differs for Claude for Government

In commercial Claude, web search is a built-in capability. In Claude for Government, native web search is disabled. The Web Search MCP connector replaces it, providing the same capability with additional transparency and control appropriate for a FedRAMP environment.

**Important:** The Web Search connector runs inside Claude for Government's FedRAMP High boundary, but it calls the **Brave Search API**, which is outside that boundary. When you approve a search, the query string — and only the query string — is transmitted to Brave. No conversation history, user identity, organization identity, or attached files are sent.

Brave does not persistently store search queries, responses, or other user data. Before transmission, Claude reformulates your request into a generic, de-identified search query with no user or org metadata attached.

Your agency is solely responsible for evaluating whether sending search queries to a non-FedRAMP third party is appropriate for your workloads, data classification levels, and regulatory requirements.

**Tip:** Use Organization Preferences to tell Claude about your agency's specific sensitive-data rules. Claude already avoids obviously sensitive terms in search queries, but org-specific guidance sharpens that.

## Approve each search before it runs

Every search requires fresh approval. There is no blanket consent and the approval requirement cannot be disabled.

1. Claude decides a web search would help answer your question.

2. Claude formulates a de-identified search query and **displays the exact query text to you.**

3. Claude pauses—nothing has been sent yet.

4. Review the query. If it contains anything you don't want transmitted outside the boundary, decline and rephrase your request.

5. If you approve, the query goes to Brave, results come back, and Claude continues.

## Set up the Web Search connector

Claude for Government uses the connector flow to enable web search.

### Owners and Primary Owners

1. Navigate to **[claude.fedstart.com/admin-settings/connectors](https://claude.fedstart.com/admin-settings/connectors)**

2. Click Browse connectors → Web Search.

3. Review the advisory text.

4. Click "Add to your team."

No authentication step is required. Once added, Web Search is available in every user's chats immediately—there's no per-user connection, because the per-query approval serves as the consent gate instead.

### For individual users

Once your org admin enables it, Web Search is available in your chats immediately. There's no per-user connection step. You'll be asked to approve individual queries as they come up.

---

## Example use cases

*"What were the key provisions in the infrastructure bill passed last month?"*

Claude proposes a search query like infrastructure bill key provisions [month year], you approve it, and Claude summarizes results from recent news.

*"Is there a published CVE for [software] version [X]? When was it disclosed?"*

Claude proposes a search targeting CVE databases and vendor advisories, you approve, and Claude returns the CVE details with source links.

---

## Frequently asked questions

### Does any of my conversation data get sent to Brave?

No. Only the search query string (which Claude shows you for approval) is transmitted. No conversation history, no user identity, no organization identity, no attached files.

### Can I use web search without approving every query?

No. Per-query approval is a required control in Claude for Government and cannot be disabled.

### Did Anthropic need a separate FedRAMP approval for web search?

No. The Remote MCP framework was authorized as a feature, which covers individual connectors including Web Search. Your agency's responsibility is to evaluate whether the specific data-handling characteristics of this connector (queries to a non-FedRAMP third party) are appropriate for your use case.
---

SOURCE: https://support.claude.com/en/articles/15167101-get-started-with-claude-compliance-api-integrations

# Get started with Claude Compliance API integrations

Security and compliance platforms have built integrations on top of the Claude Compliance API, so your team can monitor Claude activity within the tools you already use. Integrations are available from security and compliance providers across the categories enterprises rely on, spanning DLP, SASE, data security, SIEM and security operations, identity, eDiscovery, AI security posture management, and AI observability and telemetry infrastructure.

This article lists available Compliance API integrations with a link to their setup documentation. If you're a security, compliance, or IT platform that has built a Compliance API integration, **[apply here to join the program](https://forms.gle/1rkBcdwwR5bLLD82A)**.

The Claude Compliance API is available to Claude Enterprise plans and Claude Platform customers.

## What data you can access

The Compliance API provides access to different data depending on the product:

- **Claude Enterprise:**

  - **Conversation content** including chats, uploaded files, and projects

  - **Session content from Cowork (via Claude, Claude Desktop, and Claude Mobile) and Claude Code (via CLI and Claude Desktop).** Includes prompts and responses, tool calls content, and skills and artifacts content captured as transcript text.

  - **Session content from the Claude for Microsoft 365 add-ins (Excel, Word, PowerPoint, and Outlook) and Claude Science**, in beta. Includes prompts and responses, plus drafted emails, formulas, and document text from the Microsoft 365 add-ins.

  - **Activity feed events** covering user logins, admin actions, and configuration changes

- **Claude Platform:**

  - **Activity feed events**, including admin and system events (such as member and workspace changes, API key creation, and account settings) and resource events (such as file creation, downloads, and skill changes)

  - **Note:** Conversation content (prompts and model responses) is not available through the Compliance API for the Claude Platform.

## How to set up an integration

For Claude Enterprise customers, using an integration is straightforward:

1. Enable the Compliance API in your organization settings. Learn how to **[access the Compliance API](https://support.claude.com/en/articles/13015708-access-the-compliance-api)**.

2. Connect your instance to a supported security platform. Setup guides are available in the **[Available integrations section](https://support.claude.com/en/articles/15167101-get-started-with-claude-compliance-api-integrations#h_7ff9e34f8e)**.

Claude activity will flow into the same dashboards and workflows your team uses for every other application.

For Claude Platform, contact your Anthropic sales team. Review **[Compliance API documentation](https://platform.claude.com/docs/en/manage-claude/compliance-api)** on Claude API Docs.

## Available integrations

- **Air:** Air utilizes the Claude Compliance API as a core part of its agentic security platform, giving security teams unified posture management, real-time runtime protection, and supply-chain governance across all of their endpoint, cloud, and SaaS agents from a single control plane. To set up this integration, see the **[Air setup guide](https://www.air.security/claude-air-integration)**.

- **Airia:** Airia's integration with the Compliance API gives security and risk teams policy enforcement, automated compliance reporting, and continuous audit trails across Claude usage, so enterprises can detect risky behavior, enforce governance policies, and demonstrate regulatory compliance with confidence. To set up this integration, see the **[Airia setup guide](https://explore.airia.com/integrations/Tools/anthropic-compliance-api)**.

- **aizome:** aizome discovers and inventories how Claude is used across your organization—users, agents, projects, skills, MCP servers, and connectors—surfacing governance risks, producing audit reports, and deciding which agents to onboard into an identity-aware control plane with scoped permissions, just-in-time access, and full auditability. Learn more about **[aizome's integration with the Claude Compliance API](https://www.aizome.ai/integrations).**

- **Akeyless Security:** Akeyless gives Claude agents secretless, just-in-time access to the systems they act on—databases, cloud services, and SaaS APIs—removing standing credentials and ensuring each agent performs only its permitted task, with a full audit trail of every action. To set up this integration, see the **[Akeyless Security setup guide](https://www.akeyless.io/blog/securing-ai-agents-in-claude-demo-and-setup-guide/)**.

- **Akto:** Akto's Claude Compliance API integration gives security teams visibility into Claude Enterprise chats, files, connectors, and projects across AI agents, MCP servers, and human users—detecting prompt injection, sensitive-data exposure, and policy violations. To set up this integration, see the **[Akto setup guide](https://ai-security-docs.akto.io/akto-atlas-agentic-ai-security-for-employee-endpoints/endpoints-discovery-agents/anthropic-connector)**.

- **Alignmt AI:** Alignmt AI transforms Compliance API activity into a risk-scored inventory of every AI resource, surfacing autonomous automations, write-capable connectors, and sensitive-data exposure, with provenance on every fact and human attestation for what evidence can't resolve. Learn more about **[Alignmt AI's integration with the Claude Compliance API](https://www.alignmt.ai/post/alignmt-ai-integrates-with-anthropic-s-compliance-api)**.

- **Artemis Security:** Artemis ingests Claude Compliance API data to detect and investigate malicious behavior, correlating Claude activity with the rest of the environment for machine-speed detection and response. To set up this integration, see the **[Artemis setup guide](https://artemissecurity.com/company-news/secure-your-enterprise-ai-artemis-now-integrates-with-anthropic-compliance-api-and-telemetry/)**.

- **Axonius:** Axonius brings Claude Enterprise into the Axonius Asset Cloud, reconciling directory and access artifacts against every other asset and exposure in your stack. Decision-grade asset intelligence surfaces coverage gaps, drift, and identity risk across the environment, mapped to the assets and owners behind them. To set up this integration, see the **[Axonius setup guide](https://docs.axonius.com/docs/anthropic)**.

- **Bay:** Bay secures AI agents in the enterprise—providing real-time visibility and enforcement for Claude across all endpoints, containers, and browsers. To set up this integration, see the **[Bay setup guide](https://bay.security/use-cases/platform/claude).**

- **Beacon Security:** Beacon is the platform for AI-native SecOps, serving as the data and context layer for security teams. Its Claude connector ingests Claude Enterprise activity and compliance data, normalizes and enriches it, and makes it available to security agents, SIEMs, data lakes, and compliance archives. Learn more about **[Beacon's integration with the Claude Compliance API](https://beacon.security/beacon-for-anthropic-compliance-api)**.

- **BigID:** BigID secures Claude usage by giving security teams visibility into every file shared with Claude, pinpointing exactly which sensitive attributes are present the moment a risky file is uploaded. Learn more about **[BigID's integration with the Claude Compliance API](https://bigid.com/blog/securing-claude/)**.

- **Bloom Security:** Bloom is the endpoint security platform for the AI-native era, giving security teams visibility and governance over every AI tool, plugin, and MCP server across their organization. The Claude Compliance API integration deepens that coverage—into every session, file, and configuration change across every user—so security teams can enable Claude at scale without losing control. To set up this integration, see the **[Bloom Security setup guide](https://bloom.security/anthropic-compliance-api-integration)**.

- **Bold Security:** Prevent sensitive data from being misused by users or AI agents with real-time protection directly on the endpoint. To set up this integration, see the **[Bold Security setup guide](https://www.bold.security/blog/bold-security-extends-ai-data-protection-through-claudes-compliance-api)**.

- **Brava Security:** Brava ingests the Claude activity feed via the Compliance API and turns it into fully-leveraged security telemetry—routed into your existing SIEM, data lake, and archive, and searchable for investigation—so one feed powers monitoring, insider risk, retention, and governance with no custom collectors. To set up this integration, see the **[Brava Security setup guide](https://brava.security/integrations/anthropic-claude)**.

- **C1.ai:** C1.ai integrates with the Claude Compliance API to bring usage-informed access reviews, dormant-account detection, and automated lifecycle workflows to Claude Enterprise and Claude Platform—extending the same identity governance customers already run across the rest of their stack. To set up this integration, see the **[C1.ai setup guide](https://www.c1.ai/docs/baton/claude-enterprise)**.

- **Capsule Security:** Capsule connects to the Claude Compliance API to turn your organization's members, conversations, and activity into an auditable AI inventory, giving security and compliance teams continuous visibility, data-leakage detection, rogue-agent detection, and audit-ready governance over Claude usage. To set up this integration, see the **[Capsule Security setup guide](https://docs.capsulesecurity.io/guides/claude-enterprise)**.

- **Cato Networks:** Cato AI Security integrates with the Compliance API to secure, govern, and audit all Claude interactions, enforcing real-time policies, preventing data leakage, and maintaining comprehensive compliance visibility. To set up this integration, see the **[Cato Networks setup guide](https://www.catonetworks.com/integrations/ai-activity-monitoring/anthropic-compliance-api/)**.

- **Check Point:** Check Point's Workforce AI Security integration with the Claude Compliance API gives enterprises audit-grade visibility into Claude usage across surfaces and organization-level MCP servers—per-user and per-surface usage analytics plus content-level exposure analysis across chats and uploaded files, flagging PII, credentials, and regulated data for existing security workflows. To set up this integration, see the **[Check Point setup guide](https://sc1.checkpoint.com/documents/Infinity_Portal/WebAdminGuides/EN/Workforce-AI-Security-Admin-Guide/Topics-Workforce-AI-Security-AG/Integrations.htm?tocpath=Integrations%7C_____0)**.

- **Cloudflare:** Cloudflare’s CASB integration provides security teams agentless visibility into posture, data, and compliance risks across their organization’s use of Claude. To set up this integration, see the **[Cloudflare setup guide](https://developers.cloudflare.com/changelog/post/2026-05-19-casb-claude-compliance-api/)**.

- **Clover Security:** Clover uses the Compliance API to give security teams organization-wide visibility into Claude Code usage—who's building with Claude Code, how much is already protected by Clover, and where the gaps are—then extends Clover's security controls to every developer. Learn more about **[Clover Security's integration with the Claude Compliance API](https://clover.security/blog/see-what-your-coding-agents-build-clover-integrates-with-anthropics-claude-compliance-api-to-give-security-real-time-visibility/)**.

- **Concentric AI:** Concentric AI Semantic DLP gives organizations visibility into the AI tools employees use, including shadow AI. Through its integration with the Compliance API, it captures every prompt, response, and attachment—including historical activity across Claude's browser and desktop apps—to strengthen governance, accelerate investigations, and demonstrate compliance. Learn more about **[Concentric AI's integration with the Claude Compliance API](https://concentric.ai/integrations/anthropic-compliance/)**.

- **Cribl:** The Claude Compliance API lets you ingest audit activity from Claude Enterprise and Claude Platform into Cribl Stream over HTTPS as a first‑class telemetry stream. It pulls user activities including authentication, chat interactions, file uploads, and administrative actions so you can normalize, enrich, mask, and route that data alongside the rest of your observability and security pipelines. To set up this integration, see the **[Cribl setup guide](https://docs.cribl.io/stream/sources-anthropic-compliance/)**.

- **CrowdStrike:** CrowdStrike built an integration with the Claude Compliance API that brings Claude activity into the Falcon platform, delivering real-time visibility, detection, and automated response through Falcon Next-Gen SIEM and CrowdStrike’s Agentic SOAR. It will further extend protection with Falcon AIDR and Falcon Shield to continuously detect, govern, and secure AI usage at scale. To set up this integration, see the **[CrowdStrike setup guide](https://marketplace.crowdstrike.com/listings/anthropic-data-connector/)**.

- **Cyberhaven:** Cyberhaven integrates with the Compliance API to give enterprise security teams visibility into the data their employees share with Claude, applying Cyberhaven's data classification engine to chats, files, and projects so customers can adopt Claude confidently while meeting their security and compliance requirements. To set up this integration, see the **[Cyberhaven setup guide](https://www.cyberhaven.com/support/anthropic-claude-enterprise-connector)**.

- **Cyera:** Cyera integrates with Claude Enterprise through the Claude Compliance API, giving security teams comprehensive visibility into conversations, files, and user activity across the platform. Every interaction is analyzed through OmniDLP and enriched with Cyera’s 95%-precision data classification and risk scoring, helping teams identify sensitive data exposure, detect risky or unsanctioned behavior, and maintain audit-ready oversight from day one. Deployment takes just minutes. **[Learn more about the integration](https://www.cyera.com/blog/cyera-and-anthropic-integrate-to-bring-real-time-ai-security-to-claude-enterprise)** and contact your Cyera Sales Rep to get started.

- **Dash Security:** Dash Security provides real-time, intent-aware monitoring and policy enforcement over Claude Enterprise conversations, detecting sensitive-data exposure, prompt injection, and risky behavior. By extracting conversational intent, Dash understands what users are actually doing with AI and distinguishes real threats from false positives and benign activity. To set up this integration, see the **[Dash Security setup guide](https://dash.security/integrations/claude-enterprise)**.

- **Datadog:** Datadog’s Claude Compliance ingests audit logs from the Claude Platform into Datadog, giving security teams visibility into admin activity, API key lifecycle events, and authentication events across their Claude organization for SIEM and compliance use cases. To set up this integration, see the **[Datadog setup guide](https://docs.datadoghq.com/integrations/anthropic-compliance-logs/).**

- **Daylight:** Monitor Claude usage in an organization for security investigations and compliance purposes. To set up this integration, see the **[Daylight setup guide](https://daylight.ai/claude-enterprise-detection)**.

- **Elastic:** Collect Claude audit and usage activity to detect security risks, support compliance requirements, and investigate AI-related incidents. To set up this integration, see the **[Elastic setup guide](https://www.elastic.co/docs/reference/integrations/anthropic)**.

- **Eon:** Eon provides AI governance for Claude through automated data classification and natural-language security queries, helping enterprises maintain visibility and control over sensitive data shared with AI tools. Learn more about **[Eon's integration with the Claude Compliance API](https://www.eon.io/blog/may-2026-eon-product-update)**.

- **eSentire:** eSentire Atlas integrates with the Compliance API to deliver 24/7 managed detection and response for Claude usage. eSentire ingests activity events and conversation content, correlates them with endpoint, identity, and cloud telemetry, and investigates and responds to threats and policy violations on customers' behalf. Learn more about **[eSentire's integration with the Claude Compliance API](https://www.esentire.com/what-we-do/mdr-and-platform-integrations)**.

- **Exaforce:** Exaforce ingests Claude Compliance API activity, chat, and file data into the Exaforce Agentic SOC Platform, giving security teams a governed, SOC-ready view of Claude usage to monitor, detect, and investigate risky activity alongside their broader security signals. To set up this integration, see the **[Exaforce setup guide](https://www.exaforce.com/blogs/anthropic-integration)**.

- **ForceAI Security:** ForceAI PineSMITH integrates with the Anthropic Claude Compliance API to provide enterprise visibility into Claude activity, users, chats, files, projects, governance events, and audit-ready compliance data. To set up this integration, see the **[ForceAI Security setup guide](https://forceaisecurity.com/documents/claude-compliance-integration)**.

- **Forcepoint:** Forcepoint's solution to securely enable AI now extends to Claude Enterprise via the Claude Compliance API, ingesting every conversation, file upload, generated content and user activity into a unified AI governance dashboard. Security teams can apply existing DLP and DSPM policies across all Claude interactions, detecting sensitive data exposures, enforcing compliance, and maintaining a complete audit trail, with historical activity backfilled the moment the connector is deployed. To set up this integration, see the **[Forcepoint setup guide](https://www.forcepoint.com/use-case/securely-enable-ai)**.

- **Fortinet:** The Fortinet data security posture management integration with the Claude Compliance API enables organizations to monitor and analyze user interactions within Claude Enterprise, including prompts and uploaded files, to detect potential exposure of sensitive data such as PII, PHI, CHD, and authentication data. The integration provides visibility, alerting, and auditability for AI usage, helping security teams strengthen governance, compliance, and data protection across enterprise AI workflows. To set up this integration, see the **[Fortinet setup guide](https://www.fortinet.com/content/dam/fortinet/assets/alliances/fortidata-claude-setup-guide.pdf)**.

- **Geordie AI:** Geordie, the agentic security and governance platform, extends its existing coverage of the Claude suite, including Claude Code and Claude Cowork, across the full Claude Enterprise deployment surface through the Claude Compliance API. Together, this gives security and compliance teams a single, coherent view of every Claude use case and activity across the enterprise, with the visibility and controls to govern it. To set up this integration, see the **[Geordie AI setup guide](https://www.geordie.ai/resources/geordie-extends-agentic-ai-security-and-governance-coverage-through-claude-compliance-api/)**.

- **Glow:** Glow ingests the Compliance API activity feed to complete its picture of AI adoption and security posture across an organization's Claude workspace, enabling consistent governance and security controls across every form of Claude adoption, from individual users to managed deployments and agentic integrations. To set up this integration, see the **[Glow setup guide](https://docs.glow.io/integrations/anthropic)**.

- **Grip Security:** Grip integrates with the Anthropic Compliance API to deliver SSPM checks, remediation, and AI agent visibility for Claude. To set up this integration, see the **[Grip Security setup guide](https://help.grip.security/docs/anthropic-claude-compliance-api-integration-with-grip-security-1)**.

- **Hadrius:** Hadrius is the agentic compliance infrastructure for SEC- and FINRA-regulated firms. Its Claude integration captures conversations and activity into a compliant books-and-records archive with automated surveillance, so advisers and broker-dealers can adopt Claude while meeting their recordkeeping and supervision obligations. To set up this integration, see the **[Hadrius setup guide](https://support.hadrius.com/articles/8197408781-claude-integration?lang=en)**.

- **Harmonic Security:** Harmonic Security uses the Anthropic Compliance API to govern Claude use across every surface (Desktop, Web, Mobile, Claude Code, Cowork), classifying every interaction with proprietary detection models to surface sensitive-data exposure, prompt injection, and AI usage and adoption insights broken down by team, department, and location. To set up this integration, see the **[Harmonic Security setup guide](https://docs.harmonicsecurity.app/integration-guides/configure-anthropic-compliance-api-connector)**.

- **IBM Guardium (coming soon):** IBM Guardium helps organizations monitor data access and usage by agentic AI systems and help ensure autonomous activities remain within approved security boundaries. With ready-to-use templates, customizable policies, continuous audit workflows, and compliance reporting aligned to frameworks such as EU AI Act, AIDA, PCI, SOX, HIPAA, GDPR, and CPRA, Guardium helps security and compliance teams confidently demonstrate oversight of AI-driven activity. Learn more about **[IBM Guardium](https://www.ibm.com/products/guardium)**.

- **Island:** Island's Claude Compliance API integration gives security and compliance teams visibility into every Claude session—user-driven or autonomous—covering conversation topics, tool/model/skill usage, and continuously enriched detection of sensitive-data exposure and policy violations for posture assessment and anomaly detection. Learn more about **[Island's integration with the Claude Compliance API](https://www.island.io/blog/island-integrates-with-the-claude-compliance-api)**.

- **Linx Security:** Linx integrates with the Claude Compliance API to govern access across human, non-human, and agent identities in Claude—delivering visibility, risk detection, access reviews, and least-privilege enforcement. To set up this integration, see the **[Linx Security setup guide](https://docs.linxsecurity.io/connectors/connectors-library/anthropic/claude.ai)**.

- **Microsoft Purview:** Purview's integration with the Claude Compliance API extends Purview's enterprise security and compliance coverage by surfacing insights from Claude activity feed and chat conversations, enabling scenarios within Purview Data Security Posture Management and Audit. It provides centralized visibility of activities across Claude Enterprise and Claude Platform, allowing organizations to understand how data is accessed and used across their Claude systems. Surfacing this signal within Purview helps close a critical governance gap as enterprises rapidly adopt AI across multiple platforms. The same comprehensive visibility Purview provides for Copilot and the broader Microsoft AI ecosystem, is now available for Claude Enterprise users. To set up this integration, see the **[Microsoft Purview setup guide](https://learn.microsoft.com/en-us/purview/ai-microsoft-purview)**.

- **Mimecast:** Mimecast's Governance, Compliance & Insights (GCI) platform now integrates with the Claude Compliance API to bring Claude Enterprise conversations into the same unified governance and compliance experience organizations already use for email and collaboration data, with no new interfaces or workflows required. To set up this integration, see the **[Mimecast setup guide](https://www.mimecast.com/use-cases/ai-governance/)**.

- **Mint Security:** Mint provides contextual runtime security for AI agents, using the Claude Compliance API to apply organization-specific visibility, context, and policy controls to how teams use Claude. To set up this integration, see the **[Mint Security setup guide](https://docs.mint.security/integrations/claude/claude)**.

- **Netskope:** Netskope's integration with the Claude Compliance API lets organizations connect Claude Enterprise directly into the enhanced AI security features of the Netskope One platform, delivering full asset, identity, and activity visibility, robust policy enforcement, advanced data security, and comprehensive security posture management, all within the workflows security and compliance teams already rely on. **Note:** Available in private preview. To set up this integration, see the **[Netskope setup guide](https://docs.netskope.com/en/onboard-claude-for-ai-discovery/)**.

- **Nightfall AI:** Nightfall integrates with the Claude Compliance API to detect sensitive data (PII, PHI, PCI, secrets, source code) in Claude Enterprise chats and file uploads. Monitor-only, with admin alerts, end-user notifications, and an audit trail in the same workflow as other SaaS connectors. To set up this integration, see the **[Nightfall AI setup guide](https://help.nightfall.ai/nightfall-for-anthropic-claude/nightfall-for-claude-enterprise-compliance-api)**.

- **Noma Security:** Noma's AI Detection and Response (AI-DR) integration with the Compliance API gives security teams continuous visibility into Claude Enterprise usage, detecting sensitive-data exposure, risky prompts, and policy violations with full behavioral context—so teams can say yes to Claude with governance in place. Learn more about **[Noma Security's integration with the Claude Compliance API](https://noma.security/integrations/claude-enterprise/)**.

- **Obsidian Security:** Obsidian extracts posture and activity from the Compliance API and 200+ other applications. That data is normalized and used by enterprise customers for continuous governance, drift detection, and identifying and investigating potential threats. Learn more about **[Obsidian Security's integration with the Claude Compliance API](https://www.obsidiansecurity.com/integrations/claude)**.

- **Okta:** Okta's integration with the Claude Compliance API brings Claude usage within Okta Identity Security Posture Management, allowing security and compliance teams to contextualize Claude user activity with signals from other identity platforms, SaaS tools, and cloud providers and surface identity blind spots from one unified view. This enables organizations to continuously assess identity risk posture, detect misconfigurations and risks—such as overprivileged users, dormant accounts, and unused admin keys—remediate issues by severity, and securely deploy AI at scale. Learn more about **[Okta's integration with the Claude Compliance API](https://www.okta.com/newsroom/articles/okta-identity-security-posture-management-integrates-with-anthropics-new-compliance-api/)**.

  - **Note on availability:** This offering will soon be available in beta to select customers using Okta Identity Security Posture Management alongside either Anthropic’s Claude Enterprise or Claude Platform.

- **Onyx Security:** Onyx is the secure AI control plane that gives enterprises observability, security, and governance over AI agents across SaaS, cloud, endpoint, and code. This integration extends Onyx's guardrails and audit trail to Claude deployments—letting security teams monitor usage, enforce policies, prevent data exfiltration, and meet compliance requirements without slowing Claude adoption. To set up this integration, see the **[Onyx Security setup guide](https://onyx.security/integrations/anthropic)**.

- **Opsin:** AI risk and agent governance for Claude Enterprise: Opsin's Compliance API integration surfaces data oversharing, risky user behavior, and agent sprawl within 24 hours, using a context graph that connects identity, data, and model for root-cause remediation. To set up this integration, see the **[Opsin setup guide](https://www.opsinsecurity.com/claude-integration)**.

- **Orca Security:** Orca Security extends its unified platform to Claude Enterprise, giving security teams complete visibility into Claude identities, access, AI workspaces, and the sensitive data within them—to surface risk, enforce least privilege, and track compliance. To set up this integration, see the **[Orca Security setup guide](https://claude-doc.orca.security/)**.

- **Origin:** Origin is endpoint observability for agentic AI: every AI agent on your fleet, what it did, and where your AI spend goes. The Compliance API adds Claude Enterprise usage from claude.ai and Claude Desktop, attributed to each user and folded into the same record as the agents Origin observes. To set up this integration, see the **[Origin setup guide](https://support.originhq.com/docs/claude-enterprise)**.

- **Palo Alto Networks:** The Claude Compliance API integration enables organizations to understand what data is being shared with Claude, detect sensitive content and policy violations, identify threats and anomalous behavior, and guide users toward safer AI usage. To set up this integration, see the **[Palo Alto Networks setup guide](https://www.paloaltonetworks.com/blog/cloud-security/claude-security-integration-ai-governance)**.

- **Pluto Security:** Pluto provides real-time visibility and enforcement across the Anthropic ecosystem—Claude Code, Cowork, and Office Agents. It monitors agent activity, detects risks like prompt injection and sensitive-data exposure, identifies malicious ecosystem components, and enforces policies on agent actions, MCPs, connectors, and tool usage. Learn more about **[Pluto Security's integration with the Claude Compliance API](https://pluto.security/blog/claude-enterprise-meets-ai-security-platform/)**.

- **Proofpoint:** Proofpoint’s integration with the Claude Compliance API brings security and governance together across AI interactions. Sensitive data in prompts, responses, and files is protected with DLP, AI-aware classifiers, and Insider Threat signals, while activity is captured and retained for eDiscovery, supervision, and compliance purposes. The result is comprehensive visibility, control, and retention for organizations leveraging Claude, consistent with the controls protecting the rest of their tech stack. To set up this integration, see the **[Proofpoint setup guide](https://support.nuclei.ai/hc/en-us/articles/39717913412759-Compliance-Archiving-for-Anthropic-Claude-Enterprise)**.

- **Reco:** Reco monitors Claude Enterprise for AI security threats, posture risks, and identity anomalies. Using the Compliance API, it ingests activity logs and conversation data to detect MCP server abuse, permission escalations, and unauthorized access, surfacing violations mapped to MITRE ATT&CK, OWASP LLM Top 10, and more. Learn more about **[Reco's integration with the Claude Compliance API](https://www.reco.ai/blog/claude-security-governance)**.

- **RelativityOne:** RelativityOne enables legal, compliance, and security teams to collect Claude Enterprise data directly from the source via the Claude Compliance API. This includes conversation prompt and response data—such as chats, uploaded files, and projects. Collected data is automatically mapped, preserved, and processed into a reviewable format, including normalization into Relativity Short Message Format (RSMF). This ensures teams can quickly analyze conversational evidence with full context while maintaining the metadata and transparency required for defensibility. To set up this integration, see the **[RelativityOne setup guide](https://help.relativity.com/RelativityOne/Content/Collect/Data_sources/Claude.htm)**.

- **ReliaQuest:** The ReliaQuest GreyMatter platform now integrates with the Claude Compliance API, bringing Anthropic’s Claude Enterprise activity data into GreyMatter, giving security and IT teams visibility into activity logs to detect threats or unwanted behavior. To set up this integration, see the **[ReliaQuest setup guide](https://greymatter.myreliaquest.com/resources/articles/anthropic-claude-compliance)**.

- **Rubrik:** Rubrik Agent Cloud integrates with the Claude Compliance API to help organizations control how Claude is used at work. Teams can see who is using Claude, review activity when needed, flag risky behavior, and use Rubrik SAGE to create natural-language policies that route alerts to their security tools. To set up this integration, see the **[Rubrik setup guide](https://www.rubrik.com/products/rubrik-agent-cloud)**.

- **Safeguard:** Safeguard integrates with the Claude Compliance API to monitor Claude usage as part of AI-native software supply chain security—surfacing vulnerabilities and risks with AI-driven remediation across the lifecycle. To set up this integration, see the **[Safeguard setup guide](https://safeguard.sh/mcp/claude)**.

- **SailPoint:** The SailPoint Claude Compliance API integration streamlines identity and access management by aggregating Organizational users, groups, and roles. To set up this integration, see the **[SailPoint setup guide](https://documentation.sailpoint.com/connectors/saas/claude_enterprise/help/)**.

- **Saviynt:** The Saviynt Claude Compliance API integration streamlines identity governance for Claude Enterprise by aggregating users, groups, and roles to enable centralized visibility, automated access certifications, and seamless lifecycle management. To set up this integration, see the **[Saviynt setup guide](https://exchange.saviynt.com/products/claude-enterprise)**.

- **SentinelOne:** Give security teams visibility and control to adopt Claude across the enterprise with SentinelOne's Anthropic Compliance API integration. Prompt Security scans every prompt and response against your policies, flagging violations in real time. Singularity AI SIEM correlates Claude activity across your security telemetry to accelerate investigation, detection, and response. Learn more about **[SentinelOne's integration with the Claude Compliance API](https://sentinelone.com/blog/sentinelone-and-claude-integrations-for-ai-visibility-governance-and-defense)**.

- **Sentra:** Discover sensitive data across projects, chats, prompts, and files, identify data exposure risks, and extend data security and compliance controls to your AI environments. To set up this integration, see the **[Sentra setup guide](https://sentra.io/guides/sentra-claude-enterprise-integration-guide)**.

- **Smarsh:** Smarsh Capture helps organizations monitor and retain Claude Enterprise interactions, so you can adopt and govern AI with confidence and support compliance workflows. By connecting directly to the Claude Compliance API, you gain structured access to Claude conversations, consistent complete records, and support for audit and regulatory response. This enables company-wide Claude Enterprise adoption and governance while staying ahead of evolving regulations. To set up this integration, see the **[Smarsh setup guide](https://central.smarsh.com/s/article/From-which-networks-does-cloudcapture-gather-data-from)**.

- **Snyk:** This new integration gives security and compliance teams a complete inventory of their Claude Enterprise environment including models, approved MCP servers, and tool-level permissions, in the platform they already use to govern the rest of the stack. To set up this integration, see the **[Snyk setup guide](https://docs.snyk.io/integrations/cloud-ai-platforms/anthropic-claude-enterprise)**.

- **Sola Security:** Sola connects to the Compliance API to bring Claude Enterprise activity, user access, and conversation data into Sola's AI-powered security platform, where security teams can query their Claude environment in plain language, correlate it with identity tools, and surface governance risks like overprivileged users and orphaned accounts. To set up this integration, see the **[Sola Security setup guide](https://docs.sola.security/integrations/data-sources/claude-enterprise)**.

- **Strac:** Strac helps enterprises safely adopt Claude by using the Compliance API to detect sensitive-data exposure, monitor usage, and generate audit-ready security insights. To set up this integration, see the **[Strac setup guide](https://www.strac.io/integrations/claude-compliance-api)**.

- **Straiker:** Straiker provides real-time security for Claude Enterprise—detecting prompt injection, data exfiltration, and agentic misuse across Claude chat and Claude Code. Security teams get unified visibility, enforcement, and forensic investigation across all Claude surfaces in a single platform. Learn more about **[Straiker's integration with the Claude Compliance API](https://www.straiker.ai/claude-code)**.

- **Sumo Logic:** Sumo Logic’s integration with the Claude Compliance API brings Claude Enterprise activity logs and Claude platform activity logs into the Sumo Logic Intelligence Operations Platform, so teams can transform AI governance into a transparent, enterprise-ready operation that reduces risk through real-time monitoring and automated detection, investigation, and response capabilities within Sumo Logic. To set up this integration, see the **[Sumo Logic setup guide](https://www.sumologic.com/help/docs/integrations/saas-cloud/claude-compliance)**.

- **Surf AI:** Surf reads Claude usage from the Compliance API to detect unsanctioned MCP connections, tie each to an accountable owner, and drive remediation. Learn more about **[Surf AI's integration with the Claude Compliance API](https://www.surf.ai/technology-partners/anthropic)**.

- **Sysdig:** Sysdig detects suspicious Claude credential activity and correlates it with runtime and security events on the same machine, turning isolated API alerts into clear evidence of misuse and allowing security teams to respond to real threats with full context. To set up this integration, see the **[Sysdig setup guide](https://www.sysdig.com/integrations/anthropic)**.

- **Tenable:** The integration with the Claude Compliance API will leverage visibility into user interactions to detect malicious and suspicious activity. This capability allows organizations to safely adopt Claude Enterprise across the organization without losing visibility into how users engage with it. To set up this integration, see the **[Tenable setup guide](https://docs.tenable.com/early-access/ai-exposure/Content/settings/integrations/claude.htm)**.

- **Theta Lake:** As enterprises deploy Claude across their workforce to unlock productivity and ROI at scale, AI interactions between AI and humans and AI agents are causing entirely new user behaviors and generating a new class of communications. Security, compliance, and legal teams need complete visibility into how Claude is being used. This integration empowers organizations to use Theta Lake’s Investigation, Analytics, and Regulatory Compliance capabilities, each of which received the tops scores in the Gartner® Critical Capabilities. To set up this integration, see the **[Theta Lake setup guide](https://docs.thetalake.com/docs/en-US/integrations/anthropic.html?Highlight=anthropic%20)**.

- **Token Security:** Token Security integrates with Anthropic's Compliance API to discover, govern, and secure the non-human identities powering Claude usage, surfacing stale keys, ownership gaps, and agent activity within a unified NHI security platform. Learn more about **[Token Security's integration with the Claude Compliance API](https://www.token.security/blog/token-security-brings-anthropic-claude-compliance-api-into-its-identity-control-plane)**.

- **Torch Security:** Torch brings Claude Enterprise under identity governance: it reads the Claude org directory and activity feed via the Compliance API, correlates every account to a real identity, and runs access reviews that flag out-of-band (non-SCIM) group grants, orphaned accounts, and dormant access—read-only, never touching conversation content. To set up this integration, see the **[Torch Security setup guide](https://www.torch.security/integrations/claude/)**.

- **Trellix:** The Trellix Claude Compliance API integration checks all chat content, artifacts, and responses against customer-defined privacy policies using their Data Security Engine and creates detection and audit events in Trellix Helix. This includes customer-specific patterns and policies that are defined for their endpoint, server, and collaboration software and applies it to Claude as well. To set up this integration, see the **[Trellix setup guide](https://www.trellix.com/platform/data-security/)**.

- **TrendAI:** Trend Micro's integration with the Claude Compliance API automatically collects and monitors Claude chat activity across your organization, scans for prompt injection, harmful content, and sensitive-data leakage, and correlates findings with your broader security signals through SIEM and XDR for investigation and audit-ready compliance and governance. To set up this integration, see the **[TrendAI setup guide](https://www.trendmicro.com/en_us/research/26/f/governing-claude-enterprise.html)**.

- **Valence Security:** Valence integrates with the Compliance API to give security teams visibility into how Claude Enterprise and Claude Platform are used, including users, agents, MCP servers, connectors, and tools. Valence correlates this activity with identities and configurations across the rest of the environment, helping teams detect risky behavior and remediate exposure. To set up this integration, see the **[Valence Security setup guide](https://www.valencesecurity.com/resources/blogs/securing-agentic-identities-in-claude-the-valence-integration-with-the-compliance-api)**.

- **Varonis:** The Compliance API integration deepens Varonis' support for Claude, enabling security and governance teams to monitor usage, investigate misuse across full sessions, and assess AI-related risk with data context. To set up this integration, see the **[Varonis setup guide](https://info.varonis.com/hubfs/documentation/varonis-atlas-anthropic-compliance-api-documentation.pdf)**.

- **Vega:** Vega ingests your organization's Compliance API activity feed, normalizes it to a common security schema, and lets your team search, detect, alert, and investigate Claude audit events alongside the rest of their security telemetry. Learn more about **[Vega's integration with the Claude Compliance API](https://vega.io/blog/vega-anthropic-claude-compliance-api)**.

- **Vero Security:** Vero Security integrates with the Compliance API to provide security insights for enterprises, enabling full context for governance and policy enforcement so teams can monitor, manage, and safely scale Claude adoption across the organization. Learn more about **[Vero Security's integration with the Claude Compliance API](https://www.vero.security/blog/vero-antrpc-integration)**.

- **Willow:** Willow gives every AI agent an identity and permissioned access to the right tools and skills, with a full audit trail. Through its integration with the Compliance API, Willow extends that governance to Claude usage so security teams can see and control agent activity across the organization. To set up this integration, see the **[Willow setup guide](https://docs.withwillow.ai/docs/admin/settings/claude-compliance-sync)**.

- **Wiz:** The Wiz connector for the Claude Compliance API allows organizations to discover AI projects, models, and users while identifying security risks like elevated roles or sensitive data within knowledge bases. It maps identity relationships and tracks model usage across the enterprise by integrating via the Claude Compliance API. Learn more about **[Wiz's integration with the Claude Compliance API](https://www.wiz.io/blog/claude-wiz-integration)**.

- **Zenity:** Zenity automatically discovers and inventories all Claude agents, MCP servers, connected resources, and non-human identities—mapping their relationships and security posture from the moment a session starts. To set up this integration, see the **[Zenity setup guide](https://zenity.io/use-cases/platform/claude-enterprise)**.

- **Zscaler:** By integrating with the Claude Compliance API, Zscaler is now able to provide deep visibility and granular control over every Claude prompt created by an enterprise user. Zscaler Data Security and DLP workflows help administrators strengthen their data protection programs through detailed analysis of organizational data and activity logs extracted from Claude. This solution enables faster enforcement actions to prevent data loss across multiple exfiltration channels. To set up this integration, see the **[Zscaler setup guide](https://www.zscaler.com/products-and-solutions/data-security)**.
---

SOURCE: https://support.claude.com/en/articles/15402193-restrict-verified-domain-connectors-to-your-enterprise

# Restrict verified-domain connectors to your Enterprise

This article explains how to prevent Claude accounts outside your Enterprise organization from connecting certain services, like Gmail and Slack, using an email address on your verified domains. Use the **Restrict verified-domain connectors to your enterprise** setting to keep company data from reaching personal Claude accounts through connectors.

This setting is available to Owners, Primary Owners, and custom roles with the Identity & Access permission set to Manage on the Enterprise plan. Your Enterprise organization needs at least one verified domain.

## How it works

When you turn on **Restrict verified-domain connectors to your enterprise**, only Claude accounts in your Enterprise organization can connect the supported connectors using an email address on your verified domains. Anyone who tries to make one of these connections from a Claude account outside your Enterprise is blocked. This setting applies to your entire Enterprise. You manage it at the parent organization level, and it applies to all child organizations.

This check relies on the connected service sharing the account's identity during the connection process. For supported connectors, Claude can confirm the email domain of the account being connected and enforce the restriction. When a service doesn't share account identity, Claude can't perform the check and the connection proceeds normally.

This setting applies to the following connectors:

- Airtable

- Asana

- Atlassian

- Canva

- Figma

- Gmail

- Google Calendar

- Google Drive

- HubSpot

- Linear

- Microsoft 365

- Miro

- Notion

- Slack

- Smartsheet

You can also view the current list in **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**. Contact **[our support team](https://support.claude.com/en/articles/9015913-how-to-get-support)** to request additional connectors.

For example, someone has two Claude accounts: a personal account using their personal email, and a work account using their work email. The work email is on a domain your Enterprise organization has verified.

When the setting is off, they can sign in to Claude with their personal account and connect the Gmail account they use for work. That moves company information outside your organization's controls.

When the setting is on, they can't connect their work Gmail from their personal account. They can still connect it from their work account. That keeps company information inside your organization's controls.

---

## Prerequisites

Before you can turn on this setting, your Enterprise organization must verify your domain.

## Turn on the restriction

1. Navigate to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

2. Scroll to **Connector domain restriction**.

3. Toggle on "Restrict verified-domain connectors to your enterprise."

You can turn off this setting at any time. It's separate from domain capture, which can't be reversed once enabled.

---

## What people see when a connection is restricted

If someone tries to make a connection that’s restricted, the connection fails at sign-in with this message:

“This corporate identity belongs to an Enterprise that manages access through their own Claude account. Sign in to your organization's Claude account to use this connection.”

## What the setting doesn't do

- **It doesn't restrict connections in the other direction.** When the setting is on, people in your Enterprise can still connect services for personal use to their Enterprise Claude account. For example, they can connect their personal Gmail account.

- **It doesn't replace data loss prevention.** It's a safeguard against accidentally connecting a work account to the wrong Claude account, not a control against deliberate data movement.

- **It doesn't disconnect existing connections.** The restriction applies only to new connection attempts. Connections made before you turned on the setting stay connected.

- **It doesn't notify admins.** Only the person attempting the connection sees the message if it fails.

---

## Frequently asked questions

### How is this different from domain claiming?

Domain claiming moves existing personal Claude accounts on your domain into your Enterprise workspace. This setting leaves Claude accounts where they are, and makes it so that only Claude accounts in your Enterprise organization can connect supported connectors using an email address on your verified domains. Learn more about **[claiming and migrating accounts on your domain](https://support.claude.com/en/articles/14625619-claim-and-migrate-accounts-on-your-domain)**.

### What should someone do if their connection is blocked?

Sign in to your organization's Claude account and make the connection there. Anyone who doesn't have a Claude account in your organization should contact their admin for access.

### Are all connections on a supported connector covered?

Coverage depends on the identity information each service provides. In a small number of cases (for example, some Canva Education (.edu) accounts) the service does not share the identity details needed to apply the restriction, and those connections are allowed as normal. Where the restriction can't be evaluated, the connection is allowed rather than blocked.
---

SOURCE: https://support.claude.com/en/articles/15537633-authorize-mcp-connectors-for-your-entire-organization

# Authorize MCP connectors for your entire organization

This article explains how Enterprise-managed auth works and how admins can authorize connectors for their organization through their identity provider. With Enterprise-managed auth, you authorize a connector once for your entire organization, and your team inherits access automatically on first login.

This feature is generally available for Team and Enterprise plans on Claude.

## What is Enterprise-managed auth?

Enterprise-managed auth is an authorization and authentication model for connectors in Claude. Instead of having every person authenticate each connector individually, admins provision connector access centrally through the organization's identity provider.

Once you enable a connector for your organization, your team gets it automatically the first time they log in, with identity inherited from their existing identity provider groups and roles.

## What you control

You decide which connectors are enabled, which groups or roles get them, and at what access level:

- Auth connectors once for your organization, and access is given to your team automatically.

- Use **[role-based permissions](https://support.claude.com/en/articles/13930458-set-up-role-based-permissions-on-enterprise-plans)** to choose exactly which roles get each connector, so different teams get the access that fits their work. See **Choose which roles get managed auth** below.

- Choose which permissions Claude can request when members connect through your identity provider, and narrow that further for individual roles.

- Revoke access by deprovisioning someone in your identity provider, which removes their connector access at the same time.

- Require that a connector only ever connects through your identity provider so personal accounts stay out of work tools.

**Note:** Your identity provider and each connector are operated by third parties under their own terms. Claude relays the authorization your identity provider issues; access decisions, scoping, and the data each connector can reach are governed by your identity provider’s policies and the connected service’s permissions, not by Anthropic.

Token lifetimes and lifecycle are managed by the connected authorization server and identity provider. Existing sessions end when the connector’s access token expires or is revoked.

## Choose which roles get managed auth

When you set up Enterprise-managed auth for a connector, you choose which roles inherit the connector when you set up role-based permissions. You can use role-based permissions to pilot a connector with a specific team before turning it on for your whole organization.

1. Go to **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)** and select a connector.

2. On the **Configuration** tab, click "Set up" next to **Managed authorization**.

3. On the **Connect** step, confirm your identity provider connection. Follow the setup guide to configure Enterprise-managed auth for this connector in your identity provider, and to enable managed auth in the connector's own admin settings. Click "Run test" to confirm the connection works.

4. On the **Roles** step, select who should get this connector automatically.

  1. **User, Admin, Owner, Primary owner**: your organization's built-in roles, as a group.

  2. Any custom role, selected individually.

To pilot a connector with one team, select only that team's custom role and leave the built-in roles unchecked. Members on the User, Admin, Owner, or Primary Owner role won't get the connector until you come back and add that option.

5. On the **Scopes** step, choose which permissions Claude can request when members connect through your identity provider. These apply to every role you selected. To narrow permissions for a specific role, use that role's **Connectors** tab instead (see below).

6. Click "Save & turn on."

Once set up, the connector's Configuration tab shows its current state: **Applied roles** lists which roles connect through managed authorization, and **Scopes** shows what's granted. To expand a pilot, click "Edit" next to **Applied roles** and add "User, Admin, Owner, Primary owner" or more custom roles.

**Note:** **Browser sign-in** and **Managed authorization** can be on for a connector at the same time. When they are, Claude tries **Managed authorization** first and prompts the user to sign in individually if that fails, so members aren't locked out while an identity provider issue gets resolved.

### Connector settings inside a custom role

You can also start from a role in **Organization settings** > **Roles** instead of a connector. On a custom role's **Connectors** tab, **How members connect** controls how that role's members authenticate, across every connector at once, or per connector:

- **Individually**: members sign in with their own accounts.

- **Managed authorization**: members connect through your identity provider.

- **Set per connector**: choose individually for each connector.

## What works with Enterprise-managed auth

Enterprise-managed auth brings together two things your organization already uses: your identity provider, which controls who gets access, and the connectors your teams work with day to day.

### Identity providers

Okta is supported at launch, with more identity providers coming soon. See **[Okta’s documentation](https://developer.okta.com/docs/guides/xaa-agent-to-app/main/)** for more details.

### Connectors

Currently, you can provision these connectors through Enterprise-managed auth:

- Asana (see **[Asana’s documentation](https://help.asana.com/s/article/cross-app-access)**)

- Atlassian (see **[Atlassian’s documentation](https://support.atlassian.com/security-and-access-policies/docs/configuring-enterprise-managed-authentication/)**)

- Canva (see **[Canva’s documentation](https://www.canva.com/help/manage-cross-app-access/)**)

- Datadog (see **[Datadog’s documentation](https://docs.datadoghq.com/account_management/org_settings/cross_app_access/)**)

- Figma (see **[Figma’s documentation](https://help.figma.com/hc/articles/41992841175959)**)

- Granola (see **[Granola’s documentation](https://docs.granola.ai/help-center/sharing/integrations/mcp#enterprise-managed-authorization)**)

- Linear (see **[Linear’s documentation](https://linear.app/docs/mcp#enterprise-managed-authorization)**)

- Notion (see **[Notion’s documentation](https://www.notion.com/help/set-up-enterprise-managed-connections-for-notion-mcp)**)

- Slack (see **[Slack’s documentation](https://slack.com/help/articles/54548358406419)**)

- Supabase (see **[Supabase’s documentation](https://supabase.com/docs/guides/platform/sso/enterprise-mcp-authentication)**)

Any MCP provider can add support for Enterprise-managed auth. See **[Enterprise-Managed Authorization](https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization)** for more details.

### Personal connectors

Your team can still add personal connectors on top of what you provision. Enterprise-managed auth handles the connectors you enable for your organization, while individuals can connect additional services for their own use.