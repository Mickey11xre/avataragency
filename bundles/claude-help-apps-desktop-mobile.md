
---

SOURCE: https://support.claude.com/en/articles/10065433-install-claude-desktop

# Install Claude Desktop

The Claude desktop apps bring Claude's capabilities directly to your computer, allowing for seamless integration with your workflow.

## Availability

Claude Desktop is available on macOS, Windows, and Linux (beta). What you can do depends on your plan:

| **Feature**   | **Free** | **Pro** | **Max** | **Team** | **Enterprise** |
| ------------- | -------- | ------- | ------- | -------- | -------------- |
| Chat          | ✅        | ✅       | ✅       | ✅        | ✅              |
| Claude Code   |          | ✅       | ✅       | ✅        | ✅              |
| Claude Cowork |          | ✅       | ✅       | ✅        | ✅              |

## System Requirements

- macOS: macOS 11 (Big Sur) or higher

- Windows: Windows 10 or higher

- Linux: Ubuntu 22.04 LTS+ or Debian 12 (bookworm)+, on x64 or arm64

## Installation steps for mac OS and Windows

1. Visit the **[Claude downloads page](https://claude.ai/download)**.

2. Select the appropriate version for your operating system:

  - For Mac users, find **macOS** and click "Download."

  - For Windows users, find **Windows** and click "Download."

Once the download is completed:

1. Open the file to complete installation.

2. Launch Claude from your Applications folder (Mac) or Start menu (Windows).

3. Sign in with your account to get started.

## Installation steps for Linux

### Install using apt

On Linux, you can install Claude Desktop from Anthropic’s apt repository rather than as a downloaded .deb file so that updates arrive through your system's normal package updates rather than in-app.

1. On Ubuntu or Debian, open a terminal and run:
​

```
sudo curl -fsSLo /usr/share/keyrings/claude-desktop-archive-keyring.asc https://downloads.claude.ai/claude-desktop/key.asc
echo "deb [signed-by=/usr/share/keyrings/claude-desktop-archive-keyring.asc] https://downloads.claude.ai/claude-desktop/apt/stable stable main" | sudo tee /etc/apt/sources.list.d/claude-desktop.list
sudo apt update && sudo apt install claude-desktop
```

2. Launch Claude from your applications menu, or run `claude-desktop` from a terminal, and sign in.

**Keeping Claude Desktop up to date on Linux**

The app doesn't update itself. Updates arrive with your system's regular package updates (`sudo apt update && sudo apt upgrade`).

### Install using file download

**Note:** Downloading the .deb will not opt you into regular package updates. We highly recommend that you install using apt, or set up the apt repo using the steps above.

If you can’t install Claude Desktop using apt, you can install it by downloading a .deb file instead:

1. Visit the **[Claude downloads page](https://claude.ai/download)**.

2. Find the .deb for your architecture (x64 or arm64) and click "Download."

3. From the folder you downloaded the .deb file, run: `sudo apt install ~/Downloads/claude-desktop_amd64.deb`

4. Launch Claude from your applications menu (or run `claude-desktop`), then sign in.

### Verify the download on Linux (optional)

Verify the signing key fingerprint before trusting it:

1. Run: `gpg --show-keys /usr/share/keyrings/claude-desktop-archive-keyring.asc`

2. Confirm the output matches: `31DD DE24 DDFA B679 F42D 7BD2 BAA9 29FF 1A7E CACE`

### Current limitations when you use Claude Desktop on Linux

- Computer use isn't available.

- Dictation isn't available.

- Quick Entry, the global hotkey, works on X11. On native Wayland, it relies on your desktop's GlobalShortcuts portal.

---

## Desktop extensions

Desktop extensions transform how you connect Claude to your desktop applications and data. Similar to browser extensions, these secure, installable packages let you:

- **Connect Claude to your desktop apps with one click**: Install extensions that integrate with your local files, calendars, emails, and messaging apps.

- **Access a curated directory of extensions**: Browse verified extensions directly within Claude Desktop, including options like filesystem access and iMessage.

- **Enjoy enterprise-ready security**: Extensions use code signing, encrypted storage for sensitive data like API keys, and enterprise policy controls.

To explore desktop extensions, navigate to Settings > Extensions within the Claude Desktop app after installation.

**Note:** We’re building a directory of desktop extensions – if you’re a developer hoping to add an extension you built to the directory, complete our **[desktop extensions interest form](https://docs.google.com/forms/d/14_Dmcig4z8NeRMB_e7TOyrKzuZ88-BLYdLvS6LPhiZU/viewform?edit_requested=true)** to share more information with us.

Read more about desktop extensions in our **[Getting Started with Local MCP Servers on Claude Desktop](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)** article.

---

## Claude Cowork

Claude Cowork is available for all paid plans (Pro, Max, Team, Enterprise) using the Claude Desktop app on macOS, Windows, and Linux (beta).

Users on paid Claude plans can access Cowork in Claude Desktop. Cowork brings Claude Code's agentic capabilities to a visual interface, allowing you to hand off complex, multi-step tasks without using a terminal.

With Cowork, Claude can:

- Access your local files directly without manual uploads.

- Work on long-running tasks like research synthesis, file organization, and document generation.

- Coordinate parallel workstreams for complex projects.

- Deliver professional outputs like spreadsheets with working formulas and formatted presentations.

Cowork runs code in an isolated virtual machine on your computer. File reads and writes are limited to folders you connect, and network access follows your egress settings.

To learn more, see **[Get started with Cowork](https://support.claude.com/en/articles/13345190-get-started-with-cowork)**.

**Setup requirements for Claude Cowork on Linux**

Cowork on Linux has its own setup requirements. Cowork runs your tasks in a virtual machine on your computer. Before it can start, your machine needs:

- **Hardware virtualization (KVM).** Most computers support this, but it's sometimes turned off in firmware. If Cowork says virtualization isn't available, enable it in your BIOS or UEFI settings and restart.

- **Permission to use virtualization.** Add yourself to the KVM group, then log out and back in: `sudo usermod -aG kvm $USER`

- **QEMU and supporting packages.** Installing Claude with `apt install` pulls these in automatically.

  - If you installed the .deb file directly on x64, run `sudo apt install qemu-system-x86 ovmf virtiofsd`

  - On arm64, run `qemu-system-arm qemu-efi-aarch64 virtiofsd` instead.

- **About 25 GB of free disk space for the workspace image, and at least 8 GB of RAM.** The workspace uses 4 GB while it's running.
---

SOURCE: https://support.claude.com/en/articles/10065434-use-dictation-on-claude-mobile

# Use dictation on Claude Mobile

Dictation is available to all Claude users (Free, Pro, Max, Team, and Enterprise plans). Support for languages other than English is in beta.

Dictation allows you to speak your prompts instead of typing them when using Claude for iOS or Android.

**Note:** Dictation is different from voice mode. Dictation turns your speech into text so you can send a written prompt, and Claude replies in text. Voice mode is a full spoken conversation—you talk to Claude and Claude talks back, and it can use your connected tools. Learn more about **[voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)**.

## Get started with dictation

1. Open Claude for iOS or Android.

2. Start a new chat with Claude.

3. Tap the microphone icon on the right side of the chat input field.

  - If this is your first time using dictation, you'll need to select your preferred language. You can change this later in Settings.

4. Dictate your prompt.

5. Tap the arrow icon to send your prompt.

  - To cancel without sending, tap the "X" icon.

Your prompt will automatically appear as text in the chat window. Claude will respond to your prompt in text format.

## Supported languages

Dictation is currently available in these languages:

- English

- French

- German

- Hindi

- Italian

- Japanese

- Korean

- Portuguese

- Russian

- Spanish

- Turkish

- Ukrainian

## Change your language settings

To change your speech input language:

1. Tap your initials in the upper right corner.

2. Select “Speech Input Language.”

3. Choose your preferred language from the dropdown.

## Data privacy

After converting your speech input to text, we will delete your audio recording. We will not retain a copy of your speech input or use it for training our generative models.

Learn more about our privacy practices by visiting our **[Privacy Policy](https://www.anthropic.com/legal/privacy)** and **[Privacy Center](https://privacy.anthropic.com/en/)**.
---

SOURCE: https://support.claude.com/en/articles/10263469-use-claude-app-intents-shortcuts-and-widgets-on-ios

# Use Claude app intents, shortcuts, and widgets on iOS

The features described in this guide are available on iOS 18 and above.

Claude for iOS supports multiple powerful features: the Claude widget, the "Analyze Photo with Claude" control, the "Ask Claude" App Intent, and the ability to use this intent within iOS Shortcuts. This guide will explain these features and show you how to make the most of them.

## Ask Claude intent

The "Ask Claude" intent is a standalone feature that lets you interact with Claude directly from:

- Spotlight search

- Siri

- The Share menu

- Any app that supports iOS intents

You can use this intent on its own to quickly ask Claude questions or give it tasks without opening the Claude app. For example, you can:

- Select text and use the Share menu to send it directly to Claude

- Ask Siri to "Ask Claude” and it will prompt you for a message

- Type "Ask Claude" in Spotlight search to quickly send a query

## Use Ask Claude with shortcuts

While the "Ask Claude" intent is powerful on its own, you can also use it as a building block within the Shortcuts app to create more complex workflows. Shortcuts allow you to:

- Chain multiple "Ask Claude" actions together

- Combine Claude's capabilities with other apps and actions

- Create automated workflows

- Process Claude's responses in various ways

## Create your first Claude shortcut

There are many customizable workflows you can set up within the Shortcuts app. Let's look at an example of a brief but useful shortcut that helps you summarize text:

1. Open the Shortcuts app on your iOS device

2. Tap the "+" button to create a new shortcut

3. Add the "Share" action and select your preferred input type

4. Add the "Ask Claude" action

5. In the "Ask Claude" action, create a prompt like: "Please summarize the following text: [Shortcut Input]"

6. Name your shortcut (e.g., "Summarize with Claude")

7. Optional: Add the shortcut to your Share Sheet for easy access

Now you can select text anywhere in iOS, tap the Share button, and choose your "Summarize with Claude" shortcut to get an instant summary.

When using "Ask Claude" intent and in shortcuts, the default model you see when opening the Claude app will be used.

More information on setting up shortcuts on your iOS device can be found [here](https://support.apple.com/guide/shortcuts/welcome/ios).

**Note:** When using the "Ask Claude" intent, messages to Claude will count towards your overall usage limit.

## Add the Claude Widget

The Claude widget provides quick access to chat and voice features directly from your Home Screen or Today View. The widget includes buttons for:

- Starting a new chat

- Instantly opening the app in dictation mode

- Taking a photo to share with Claude

### Add the Claude widget to your Home Screen

1. From the Home Screen, touch and hold a widget or an empty area until the apps jiggle

2. Tap Edit in the upper-left corner

3. Tap Add Widget

4. Search for and select Claude

5. Tap Add Widget

6. Tap Done

### Add the Claude widget to your Today View

Swipe right from the Home Screen or Lock Screen, then follow the same steps as adding to the Home Screen.

### Use the widget

- Tap the chat button to start a new conversation with Claude.

- Tap the microphone button to instantly open the app in dictation mode, allowing you to start speaking to Claude right away.

- Tap the camera button to take a photo and share it with Claude for analysis.

**Note:** Like the "Ask Claude" intent, interactions started through the widget will count toward your usage limit.

## The Analyze Photo with Claude control

The "Analyze Photo with Claude" control lets you quickly send images to Claude for analysis directly from Control Center or your Lock Screen.

### Add to Control Center

1. Open Control Center (swipe down from the top-right corner on iPhones with Face ID, or swipe up from the bottom on iPhones with a Home button)

2. Tap the Add button (plus sign) at the top left of Control Center to begin editing

3. Tap "Add a Control" at the bottom of the screen to open the controls gallery

4. Find and tap "Analyze Photo with Claude" to add it to Control Center

5. You can rearrange its position by dragging it to your preferred location

6. When finished, close Control Center by swiping up from the bottom center of the screen

Once added, you can quickly access it from Control Center by swiping down from the top-right corner of the screen.

More information on using and setting up controls via Control Center can be found [here](https://support.apple.com/guide/iphone/use-and-customize-control-center-iph59095ec58/ios).

### Add to your lock screen

1. On your Lock Screen, touch and hold until the customization screen appears

2. Tap "Customize"

3. Select the lock screen you want to modify

4. Remove one of the controls at the bottom of the screen using the Remove button (minus sign), then tap the Add button (plus sign) to open the controls gallery

5. From the available controls menu, scroll or search for "Analyze Photo with Claude"

6. Tap to select it

7. Tap "Done" to save your changes

You can now quickly access the "Analyze Photo with Claude" control without needing to unlock your device or open the Claude app first.
---

SOURCE: https://support.claude.com/en/articles/10302511-access-claude-for-ios-on-your-lock-screen-control-center-and-action-button

# Access Claude for iOS on your Lock Screen, Control Center, and Action button

The features described in this guide are available on iOS 18 and above.

Quickly access Claude for iOS functionality from your Lock Screen, Control Center, or Action button on iOS. This article will explain how to add the Claude app into these areas.

## Add Claude for iOS to your Lock Screen

1. Tap and hold your Lock Screen to open Customize Wallpaper

2. Tap "Customize."

3. Choose "Lock Screen."

4. Click on an empty area on either of the two bottom circular slots.

5. Scroll to add “Open Claude..”

6. Click “Done” on the top right corner.

You’ll now be able to tap and hold to open Claude for iOS from your **[Lock Screen](https://support.apple.com/guide/iphone/create-a-custom-lock-screen-iph4d0e6c351/ios)**.

## Add Claude for iOS to the Control Center

1. Swipe down from the upper right side of your screen to open the Control Center.

2. Tap & Hold to add a control

3. Tap “Add a Control.”

4. Scroll to add “Open Claude.”

You’ll now be able to access Claude for iOS from your **[Control Center](https://support.apple.com/guide/iphone/use-and-customize-control-center-iph59095ec58/ios)**.

## Use the Action button to open Claude for iOS

1. Open the Settings app.

2. Go into the “Action Button” settings.

3. Swipe until you see "Controls."

4. Click "Choose a Control..."

5. Scroll to “Open Claude.”

6. Click back into Settings.

You’ll now be able to Hold to Open the **[Action button](https://support.apple.com/guide/iphone/use-and-customize-the-action-button-iphe89d61d66/18.0/ios/18.0)** to access Claude for iOS.
---

SOURCE: https://support.claude.com/en/articles/10534883-use-the-claude-widget-on-android

# Use the Claude widget on Android

The Claude Android widget is available on Android 8.0 Oreo and above.

The Claude Android widget provides quick and convenient access to core features directly from your home screen, allowing you to start new chats, capture images, and use voice dictation with a single tap.

## Add the Claude widget

The Claude widget puts Claude's key features right on your home screen. To add it:

1. Touch and hold an empty area on your home screen

2. Tap "Widgets"

3. Find and tap "Claude"

4. Drag the widget to your desired location

5. Release to place it

6. Optional: Drag the edges of the widget to resize it

## Widget features

The widget offers three quick-access buttons:

- A primary chat button (with Claude's spark icon) to start a new conversation

- A camera button for capturing and sharing images with Claude

- A microphone button for voice dictation

## Use the widget

### Start a chat

Tap the main chat button (with the spark icon) to instantly start a new conversation with Claude.

### Take photos

Tap the camera button to start a new chat and immediately open your camera. You can capture an image and share it with Claude for analysis.

### Voice dictation

Tap the microphone button to start a new chat and begin voice dictation. The first time you use this feature, you'll see a brief explanation about how automatic recording works. You may also need to grant voice permissions if you haven't already done so.

**Note:** All interactions started through the widget will count toward your usage limit.
---

SOURCE: https://support.claude.com/en/articles/11825384-how-to-update-claude-for-ios

# How to update Claude for iOS

If you aren’t seeing the latest features on Claude for iOS, you may need to [update your mobile app manually by following these instructions from Apple](https://support.apple.com/en-us/102629):

1. Open the App Store.

2. Tap the "My Account" button or your photo at the top of the screen.

3. Scroll down to see pending updates.

4. Tap "Update" next to Claude for iOS to update it to the newest version.
---

SOURCE: https://support.claude.com/en/articles/11825394-how-to-update-claude-for-android

# How to update Claude for Android

If you aren’t seeing the latest features on Claude for Android, you may need to [update your mobile app manually by following these instructions from Google](https://support.google.com/googleplay/answer/113412?hl=en):

1. Open the Google Play Store app .

2. At the top right, tap the profile icon.

3. Tap “Manage apps & device.”

4. Under **Updates available**, tap “See details.”

5. Tap “Update” next to Claude for Android.
---

SOURCE: https://support.claude.com/en/articles/11869619-use-claude-with-ios-apps

# Use Claude with iOS apps

Claude can now connect with your iOS device's system apps to help you take action directly from your conversations. When you chat with Claude, it can draft messages, emails, or calendar events, find locations, manage reminders, and analyze your health and fitness data — all seamlessly integrated with your mobile apps.

This feature is supported on all Claude plans and works with iOS system apps (Messages, Mail, Calendar, Maps, Reminders, and Location Services), as well as compatible third-party apps. Health features are currently in beta, require a Pro or Max plan, and are available in the US only.

## What can Claude do with iOS apps?

Claude can help you:

- **Draft and send messages** through the Messages app or any messaging platform like WhatsApp, Slack, or Messenger.

- **Compose emails** that open directly in the Mail app or any other email platform like Gmail or Outlook with the subject and content pre-filled.

- **Access your location** to provide contextual suggestions for nearby places and services.

- **Display locations on maps** and help you navigate to restaurants, stores, and other destinations.

- **Read and manage your calendar** to check availability, create events, and schedule meetings.

- **Create and manage reminders** to help you stay organized with tasks and lists.

- **Read and analyze your health data** to help you understand fitness patterns, track progress toward goals, and visualize trends with native charts (Pro and Max plans only).

### Limitations

- **Location:** Members of Team or Enterprise plans can’t access the location tool at this time.

- **Calendar:** Ability to edit events depends on your ownership of the event.

- **Reminders:** Claude cannot create or edit reminder lists themselves, only items within existing lists.

- **Contacts:** Claude does not have direct access to your contacts.

- **Health:** Available in beta on Pro and Max plans only. Currently limited to users in the US. Claude can read health data but cannot write or modify entries in Apple Health.

---

## How Claude helps you take action

When Claude determines that using one of these features would be helpful, it will automatically suggest it. You'll see a card or prompt within your conversation that lets you review and take action with Claude’s help.

### Send texts and emails with Messages and Mail

1. Ask Claude to help draft a message or email (for example: "Help me write a text to my team about tomorrow's meeting").

2. Claude will prepare the message and show you a preview.

3. Tap the message card to open your Messages app or Mail app.

  1. Third-party apps (WhatsApp, Messenger, Signal) are also supported.

4. Review the pre-filled content and make any changes if needed.

5. Send the message as you normally would.

**Example:** "Draft an email to my manager explaining that I'll be late to the morning meeting due to a doctor's appointment."

### Use location for contextual suggestions

1. Ask Claude for location-based recommendations (for example: "What's nearby for dinner?").

2. Claude will request access to your location if not already granted.

3. Based on your location, Claude provides relevant suggestions.

4. You can view locations on a map and get navigation directions.

**Example:** "Find good restaurants near me that are open now."

### Display locations with Maps

1. When Claude suggests locations, they can be displayed on an interactive map.

2. Tap on any location to see more details.

3. Select a location to open it in Apple Maps for navigation.

4. Get turn-by-turn directions directly from the map.

**Example:** "Show me coffee shops within walking distance on a map."

### Manage your calendar

1. Ask Claude to check your schedule or create events.

2. Claude will request calendar access if not already granted.

3. For checking availability: Claude reads your calendar and identifies free slots.

4. For creating events: Claude prepares event details and adds them to your calendar.

5. You can edit or delete events as needed.

**Examples:**

- "When am I free this week for a 30-minute meeting?"

- "Schedule a dentist appointment for next Friday at 10 AM."

- "Add a weekly team standup every Monday at 9 AM."

### Create and manage reminders

1. Ask Claude to create reminders or add items to lists.

2. Claude will request Reminders access if not already granted.

3. Claude can add items to existing lists or create new reminders.

4. Set due dates, priorities, and notes for reminders.

5. Manage recurring reminders for regular tasks.

**Examples:**

- "Add milk and eggs to my grocery list."

- "Remind me to call the dentist tomorrow at 2 PM."

- "Create a packing list for my trip next week."

Note that when Claude uses tools to take these actions, their use is preserved in the conversation history in the same way as any tool.

---

## Access and analyze your health data

**Note:** Health features are available in beta on Pro and Max plans only, and currently limited to users in the US.

Claude can read your health and fitness data from Apple Health to help you understand patterns, track progress, and make informed decisions about your wellbeing. When you ask Claude about your health data, it can display insights using native charts that feel integrated with iOS.

**Important:** We are not a medical device and cannot provide medical guidance. Always consult a licensed professional.

### What health data can Claude access?

With your permission, Claude can read the following types of data from Apple Health:

- **Activity metrics:** Steps, distance, flights climbed, active calories, exercise minutes, move and stand hours.

- **Workouts:** Type (running, cycling, strength, yoga, etc.), duration, distance, heart rate data, and calories burned.

- **Vitals:** Heart rate, resting heart rate, heart rate variability (HRV), blood pressure, respiratory rate, and blood oxygen.

- **Body measurements:** Weight, height, body mass index, and body fat percentage.

- **Sleep:** Total sleep time, sleep stages, time in bed, and sleep efficiency.

- **Nutrition:** Calories consumed, macronutrients, water intake, and micronutrients (if tracked).

**Note:** By default, Claude doesn't save health information to memory. If you turn on **Include sensitive topics in memory**, Claude may remember health-related context from your conversations. Learn more about **[sensitive topics in memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context#h_6fe1d0e66f)**.

### How to use health features

1. Ask Claude a question about your health or fitness data (for example: "How have my runs been trending this month?" or "Show me my sleep patterns over the past two weeks").

2. Claude will request access to your health data if not already granted.

3. Review the permission prompt and select your preferred option.

4. Claude analyzes your data and provides insights, often with visual charts to help you understand trends.

### Example prompts

- "Help me create a training plan for my upcoming half-marathon based on my recent running data."

- "Why have I been feeling tired lately? Can you look at my sleep and activity data?"

- "Show me how my resting heart rate has changed over the past three months."

- "Compare my workout consistency this month versus last month."

- "What patterns do you see in my step count throughout the week?"

### Understanding health visualizations

Claude displays health insights using native iOS charts that appear directly in your conversation. These charts can show:

- **Bar charts** for comparing activity across days or weeks.

- **Line charts** for tracking trends over time (pace, heart rate, weight)

- **Progress indicators** for goals and milestones

Tap on chart elements to see more details about specific data points.

## Usage guidelines for optimal results

To get the best results, be specific about what you want, include relevant details like dates, times, and locations in your requests, and review content before sending or saving. Claude understands natural language, so you can make requests conversationally.

---

## What data can Claude access?

Claude only accesses the data necessary for each specific request:

- **Location:** Current location only when relevant to your request.

- **Calendar:** Event details to check availability and create/modify events.

- **Messages/Email:** Claude does not read existing messages or emails, only creates new content.

- **Reminders:** Existing lists and items to add/manage tasks.

- **Health:** Activity, workout, vital signs, body measurements, sleep, and nutrition data — only when you ask a question that requires this information and have granted permission.

Claude's connection to your iOS apps works through your device's built-in sharing and permission systems—the same secure methods you use with any iPhone app.

## Do I need to grant permission to Claude for iOS?

Permission requirements vary by feature:

- **Messages and Email:** No permissions required (uses your device’s built-in sharing system).

- **Calendar Events:** Permission required for reading calendar; writing can use system UI without permission.

- **Location and Maps:** Permission required when Claude needs to access your location.

- **Reminders:** Prompted when Claude needs to access reminder lists.

- **Health:** Permission required. Claude will request access to specific health data categories when needed.

For features requiring permissions (like location or calendar access), Claude will request permission contextually with clear explanations of why the access is needed. You’ll be prompted to approve the action with three options: Allow once, Always allow, or Don't allow.

These permissions can be managed at any time in your device settings by going to Settings > Claude. You'll see all available permissions like Location, Calendar, and Reminders and can tap on each permission to adjust access levels. You can toggle between "While Using App” and “Ask next time” to change Claude’s access, or remove permissions by choosing “Never.”

Health permissions work differently from other app permissions. When Claude requests health access, you'll see the standard iOS Health permissions screen where you can choose exactly which data types to share. You can modify these permissions at any time by going to Settings > Health > Data Access & Devices > Claude.

Claude will only request permissions if needed for specific features, and you can always choose to decline while still using other capabilities.

---

## Troubleshooting

### Claude isn't offering to use my apps

- Make sure you're using the latest version of the Claude iOS app. For instructions, see **[How to update Claude for iOS](https://support.claude.com/en/articles/11825384-).**

- Try being more specific in your request (refer to the examples listed above).

- Restart Claude for iOS and try again.

### Permission prompts don't appear

- Check that the app for which Claude needs permissions is installed and set up on your phone.

- Verify iOS system permissions by navigating to Settings > Privacy & Security.

- Ensure Claude for iOS has the necessary permissions enabled.

### Features aren't working as expected

- Your iOS mobile apps may format content slightly differently than Claude.

- You can always edit the content in the destination app before sending or saving.

- Some features may vary based on your iOS version.

### Calendar events aren't opening correctly

- Verify you have a calendar app installed.

- Check that your preferred calendar app is set as the default for calendar events.

- Make sure the calendar app you’re trying to use is up to date.

### Health data isn't appearing or seems incomplete

- Verify that you have a Pro or Max plan and are located in the US.

- Check that you've granted Claude access to the relevant health data types in Settings > Health > Data Access & Devices > Claude.

- Ensure your health data is being recorded. Some data types require an Apple Watch or compatible device.

- If you recently started tracking a metric, there may not be enough historical data for trend analysis.

- Try asking about a specific data type to confirm which categories Claude can access.

**Need more help?** If you're experiencing issues with these features, try restarting Claude for iOS or **[updating to the latest version from the App Store](https://support.claude.com/en/articles/11825384-)**.
---

SOURCE: https://support.claude.com/en/articles/11869629-use-claude-with-android-apps

# Use Claude with Android apps

Claude can now connect with your Android device's system apps to help you take action directly from your conversations. When you chat with Claude, it can draft messages, emails, calendar events, set alarms and timers, find locations, and more—all through your everyday apps without copy-paste.

This feature is supported on all Claude plans and works with your device's native and third-party apps, including messaging, email, calendar, alarms, timers, location services, maps, and Health Connect (in beta on Pro and Max plans only).

## What can Claude do with Android apps?

Claude can help you:

- **Draft and send messages** through your default messaging app or third-party apps (e.g. WhatsApp, Slack, Messenger).

- **Compose emails** that open directly in your Android device's email app with content pre-filled.

- **Access your location** to provide contextual suggestions for nearby places and services.

- **Display locations on maps** and help you navigate to restaurants, stores, and other destinations.

- **Read and manage your calendar** to check availability, create events, and schedule meetings.

- **Set alarms** directly through your Clock app.

- **Set timers** directly for cooking, workouts, or any activity.

- **Read and analyze your health data** through Health Connect to help you understand fitness patterns, track progress toward goals, and visualize trends with native charts.

### Limitations

- **Location:** Members of Team or Enterprise plans can’t access the location tool at this time.

- **Calendar:** Ability to edit events depends on your ownership of the event.

- **Reminders:** These are exclusively available on Claude for iOS, so Claude can’t create and manage reminders on Android.

- **Contacts:** Claude does not have direct access to your contacts.

- **Health:** Available on Pro and Max plans only. Requires Android 14 or later and Health Connect. Currently limited to users in the US. Claude can read health data but cannot write or modify entries in Health Connect.

---

## How Claude helps you take action

When Claude determines that using one of these features would be helpful, it will automatically offer to help. You'll see a card or prompt within your conversation that lets you review and take action with Claude’s help.

### Send texts and emails with Messages and Mail

1. Ask Claude to help draft a message or email (for example: "Draft an email to my supervisor about the project update").

2. Claude will prepare the content and show you a preview.

3. Tap the message card to open your messaging or email app.

4. Review the pre-filled content and make any changes if needed.

5. Send the message as you normally would.

**Example:** "Draft a message to my study group about canceling tonight's session."

### Use location for contextual suggestions

1. Ask Claude for location-based recommendations (for example: "What restaurants are near me?").

2. Claude will request access to your location if not already granted.

3. Based on your location, Claude provides relevant suggestions.

4. You can view locations on a map and get navigation directions.

**Example:** "Find nearby parks for jogging."

### Display locations with Maps

1. When Claude suggests locations, they can be displayed on an interactive map.

2. Tap on any location to see more details.

3. Select a location to open it in Google Maps for navigation.

4. Get turn-by-turn directions directly from the map.

**Example:** "Show me hardware stores within five miles on a map."

### Manage your calendar

1. Ask Claude to check your schedule or create events.

2. Claude will request calendar access if not already granted.

3. For checking availability: Claude reads your calendar and identifies free slots.

4. For creating events: Claude prepares event details and adds them to your calendar.

5. You can edit or delete events as needed.

**Examples:**

- "What meetings do I have tomorrow?"

- "Schedule a team lunch for next Thursday at noon."

- "Create a recurring workout session every Tuesday and Thursday at 6 AM."

### Set alarms and timers using Clock apps

1. Ask Claude to set an alarm or timer.

2. Claude will automatically create the alarm or start the timer.

3. Your device's Clock app will handle the alarm or timer.

4. You'll receive notifications as normal when the alarm goes off or timer ends.

**Examples:**

- "Set an alarm for 7 AM tomorrow."

- "Start a 20-minute timer for my workout."

---

## Access and analyze your health data

**Note:** Health features are available in beta on Pro and Max plans only, require Android 14 or later, and are limited to users in the US.

Claude can read your health and fitness data from Health Connect to help you understand patterns, track progress, and make informed decisions about your wellbeing. When you ask Claude about your health data, it can display insights using native charts that feel integrated with Android.

**Important:** We are not a medical device and cannot provide medical guidance. Always consult a licensed professional.

### What is Health Connect?

Health Connect is Android's centralized platform for health and fitness data. It aggregates information from various fitness apps and wearables (like Fitbit, Samsung Health, and Google Fit) into a single, secure location. Claude accesses your health data through Health Connect, which means it can see data from any app you've connected to Health Connect.

If you haven't set up Health Connect yet, you can find it in your device settings or download it from the Google Play Store.

### What health data can Claude access?

With your permission, Claude can read the following types of data from Health Connect:

- **Activity metrics:** Steps, distance, floors climbed, active calories, and exercise duration

- **Workouts:** Type (running, cycling, strength training, etc.), duration, distance, heart rate data, and calories burned

- **Vitals:** Heart rate, resting heart rate, heart rate variability (HRV), blood pressure, respiratory rate, and blood oxygen

- **Body measurements:** Weight, height, body mass index, and body fat percentage

- **Sleep:** Total sleep time, sleep stages, and time in bed

- **Nutrition:** Calories consumed, macronutrients, hydration, and micronutrients (if tracked)

**Note:** By default, Claude doesn't save health information to memory. If you turn on **Include sensitive topics in memory**, Claude may remember health-related context from your conversations. Learn more about **[sensitive topics in memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context#h_6fe1d0e66f)**.

### How to use health features

1. Ask Claude a question about your health or fitness data (for example: "How active have I been this week?" or "Show me my sleep trends").

2. Claude will request access to your health data through Health Connect if not already granted.

3. Review the permission prompt and select the data types you want to share.

4. Claude analyzes your data and provides insights, often with visual charts to help you understand trends.

### Example prompts

- "Help me understand my workout patterns over the past month."

- "I've been sleeping poorly—can you analyze my sleep data and look for patterns?"

- "Show me how my daily step count compares week over week."

- "What's my average resting heart rate, and how has it changed recently?"

- "Create a summary of my fitness activity for the past 30 days."

### Understanding health visualizations

Claude displays health insights using native Android charts that appear directly in your conversation. These charts can show:

- **Bar charts** for comparing activity across days or weeks

- **Line charts** for tracking trends over time (pace, heart rate, weight)

- **Progress indicators** for goals and milestones

Tap on chart elements to see more details about specific data points.

## Usage guidelines for optimal results

Be specific about what type of action you want Claude to take and include all relevant details like recipients, dates, times, and durations in your request. For alarms, specify AM/PM and any recurring days you need. For timers, mention what the timer is for to help with labeling. Always review content in the destination app before sending or saving.

---

## What data can Claude access?

Claude only accesses the data necessary for each specific request:

- **Location:** Current location only when relevant to your request.

- **Calendar:** Event details to check availability and create/modify events.

- **Messages/Email:** Claude does not read existing messages or emails, only creates new content.

- **Alarms and timers:** Created directly without accessing personal data.

- **Health:** Activity, workout, vital signs, body measurements, sleep, and nutrition data from Health Connect — only when you ask a question that requires this information and have granted permission.

Claude's connection to your Android apps works through your device's standard sharing system and intent system—the same secure methods used by all Android apps.

## Do I need to grant permissions to Claude for Android?

Permission requirements vary by feature:

- **Messages and Email:** No permissions required (uses Android's sharing system).

- **Calendar Events:** Claude needs your permission to read your calendar and view events, but can write to your calendar or draft calendar events using just the system UI (no permissions required).

- **Location and Maps:** Permission required when Claude needs to access your location.

- **Alarms and Timers:** Uses your device's standard alarm and timer functions.

- **Health Connect:** Permission required. Claude will request access to specific health data categories when needed.

For features requiring permissions (like location or calendar access), Claude will request permission contextually with clear explanations of why the access is needed. You’ll be prompted to approve the action with three options: Allow once, Always allow, or Don't allow.



These permissions can be managed at any time in your device settings by going to Settings > Apps > Claude > Permissions. Click into each permission listed under **Allowed** and **Not allowed** to make changes. You can toggle between “Allow only while using the app” or “Ask every time” to change Claude’s access, or remove permissions by choosing “Don’t allow.” Claude will only request permissions if needed for specific features, and you can always choose to decline while still using other capabilities.

Health Connect permissions are managed separately from other app permissions. When Claude requests health access, you'll see the Health Connect permissions screen where you can choose exactly which data types to share. You can modify these permissions at any time by going to Settings > Apps > Health Connect > App permissions > Claude.

---

## Troubleshooting

### Claude isn't offering to use my apps

- Make sure you're using the latest version of Claude for Android. For instructions, see **[How to update Claude for Android](https://support.claude.com/en/articles/11825394-how-to-update-claude-for-android)**.

- Try being more specific about wanting to send a message, create an event, or set a timer (see examples above).

- Restart Claude for Android and try again.

### Permission prompts don't appear

- Check that the app for which Claude needs permissions is installed and set up on your phone.

- Navigate to Settings > Apps > Claude to verify that Claude for Android has the required permissions.

- Ensure your Android OS is up to date.

### Sharing options don't appear for messages or emails

- Check that you have messaging and email apps installed and set up.

- Try clearing the Claude for Android cache in your device settings:

  - Navigate to your app settings and select "Claude" from the list.

  - Select "Storage & cache."

  - Tap "Clear cache."

### Calendar events aren't opening correctly

- Verify you have a calendar app installed.

- Check that your preferred calendar app is set as the default for calendar events.

- Make sure the calendar app you’re trying to use is up to date.

### Alarms or timers aren't being created

- Ensure your device's Clock app is enabled and up to date.

- Check that "Do Not Disturb" settings aren't preventing alarms.

### Content appears different than expected

- Your Android mobile apps may format content slightly differently than Claude.

- You can always edit the content in the destination app before sending or saving.

- Some features may vary depending on your specific Android version and device manufacturer.

### Health data isn't appearing or seems incomplete

- Verify that you have a Pro or Max plan and are located in the US.

- Ensure you're running Android 14 or later.

- Check that Health Connect is installed and that your fitness apps are connected to it.

- Verify that you've granted Claude access to the relevant health data types in Settings > Apps > Health Connect > App permissions > Claude.

- If you recently started using Health Connect, there may not be enough historical data for trend analysis.

- Some data types require a compatible wearable device (like a Fitbit or Samsung Galaxy Watch).

- Health Connect isn’t supported when using work profiles on Android devices.

**Need more help?** If you're experiencing issues with these features, try restarting Claude for Android or **[updating the app to the latest version from the Google Play Store](https://support.claude.com/en/articles/11825394-how-to-update-claude-for-android)**.
---

SOURCE: https://support.claude.com/en/articles/12592343-enabling-and-using-the-desktop-extension-allowlist

# Enabling and using the desktop extension allowlist

The desktop extension allowlist is available for Owners and Primary Owners of Team and Enterprise plans.

This article introduces a desktop extension allowlist that Team and Enterprise plan Owners can use to manage their organization’s access to extensions.

## How to enable the allowlist

**Important:** If you’ve previously configured Enterprise policy controls at the user-machine level, these will override the in-app allowlist. Ensure both `isDesktopExtensionDirectoryEnabled` and `isDesktopExtensionEnabled` are not set to "false" so the allowlist can populate the available registry. Refer to our **[desktop enterprise configuration documentation](https://support.claude.com/en/articles/12622667-enterprise-configuration)** for more information.

The desktop extension allowlist is disabled by default, so an organization Owner will need to switch it on manually. Note that **users will be able to access all desktop extensions in the registry until you enable the allowlist.** To prevent this, ensure you activate the allowlist to block all desktop extensions by default, then add only the extensions your team needs access to.

**To turn on the allowlist:**

1. Open Claude Desktop

2. Click your initials or name in the lower left corner

3. Navigate to Organization settings > Connectors

4. Switch to the "Desktop" tab:



5. Toggle **Allowlist** on:



## What happens after enabling the allowlist?

Once the allowlist is enabled:

- Any existing desktop extension installations will be force-deleted from Claude Desktop clients.

- Users will no longer be able to install new desktop extensions that are not included within the allowlist.

- Users can only download extensions from the sanctioned in-app registry; they can no longer drag or click to install MCPBs.

Note that the allowlist does not guard against individuals tampering with local MCP file contents after installation.

Consider completing the allowlist setup during off-hours to minimize disruption to existing users. If a user's installed extension is deleted while the allowlist is being configured, they will need to manually re-install the extension.

**Important:** The allowlist requires Claude Desktop version 0.13.91 or higher, so users should update the desktop app by clicking “Claude”, then either “Check for updates” or “Restart to update to Claude 0.13.91”:



## Managing allowed extensions

After enabling the allowlist, you can choose which extensions to allow:

1. Navigate to Organization settings > Connectors and select the “Desktop” tab.

2. Click “Browse extensions” to view the list of available extensions.

3. Select the extension you want to add.

4. Click the “Add to your team” button.

5. The extension will appear in your allowlist.

If you want to remove an extension from the allowlist, click the “...” button and “Remove from allowlist.”



## Uploading custom extensions

You can also upload custom extensions to deploy across your organization via Organization settings > Connectors > Desktop.

**Note:** Ensure the name field in the manifest.json does not overlap with any existing MCPBs. All names for unique MCPBs / desktop extensions must be unique.

1. Click “Add custom extension”

2. This will open a filepicker; select the .mcpb file.

3. The extension will appear under **Custom team extensions**.

4. Click "...” then “Add to team” to add it to your allowlist and enable it for your team.

When you allowlist a custom extension, it's scoped to your specific organization and can't be used across other organizations. For more in-depth information about creating custom extensions with MCP Bundles (.mcpb), please refer to our **[desktop extension developer documentation](https://github.com/anthropics/mcpb)**.

## Updating custom extensions

We’ve also introduced the ability to update previously-installed custom extensions to new versions without having to remove and reinstall them.

You can update a new MCPB version by making changes to manifest.json, ensuring the version field for the update candidate is incremented from the current uploaded version, and that you leave the name value unchanged. Changing the name will create a new custom desktop extension rather than uploading a new version. Then navigate to the custom upload pane, select "Upload new version" via the kebab menu, and upload the new file.
---

SOURCE: https://support.claude.com/en/articles/12611117-deploy-claude-desktop-for-macos

# Deploy Claude Desktop for macOS

Administrators on Team or Enterprise plans can deploy Claude Desktop automatically to manage installations and updates centrally. Claude Desktop installs to `/Applications` and updates automatically when new versions are released, unless disabled via enterprise policies.

## Available installation formats

- **`.pkg`** - Standard macOS installer package (recommended for enterprise)

- **`.dmg`** - Drag-and-drop installation

## Cowork requirements

Cowork will be installed automatically when you download and install Claude Desktop for macOS.

## Download

**[Universal (x64 or arm64) Claude PKG](https://claude.ai/api/desktop/darwin/universal/pkg/latest/redirect)**

The Universal build is compatible with both Intel and Apple Silicon machines and supports all Mac hardware.

## Deploy via MDM

Upload the PKG to your MDM solution (Jamf, Kandji, Microsoft Intune) and deploy to target machines.

## Configuration

To configure Claude Desktop settings such as auto-updates, extensions, and MCP servers, see the **[Enterprise Configuration](https://support.claude.com/en/articles/12622667-enterprise-configuration)** article.

## Troubleshooting

### Users cannot update Claude Desktop

Claude Desktop can be installed to either the user's Applications folder or the system Applications folder, which affects update permissions.

- `~/Applications` (user folder): Users can update without administrator privileges

- `/Applications` (system folder): Users need administrator access and write permissions to `/Applications`, `Claude.app`, and all contained files

For shared machines, disable auto-updates via enterprise policies and manage updates centrally through your MDM solution.
---

SOURCE: https://support.claude.com/en/articles/12622667-enterprise-configuration-for-claude-desktop

# Enterprise configuration for Claude Desktop

Administrators on Team or Enterprise plans can control Claude Desktop through system policies.

**Note:** Enterprise policy controls at the user-machine level will override the in-app **[allowlist](https://support.claude.com/en/articles/12592343-enabling-and-using-the-desktop-extension-allowlist)**. If you want to use the allowlist, ensure `isDesktopExtensionEnabled` and `isDesktopExtensionDirectoryEnabled` are not set to "false" so the allowlist can populate the available registry.

---

## macOS enterprise configuration

Deploy configuration settings through your MDM solution using configuration profiles. Claude Desktop reads preferences from the domain `com.anthropic.claudefordesktop`. Use your MDM tool (Jamf Pro, Kandji, Microsoft Intune) to deploy configuration profiles to target machines or user groups. Configuration profiles allow you to manage Claude Desktop settings centrally without user intervention.

**Configuration profile tools:**

- Built-in MDM profile editors (Jamf Pro, Kandji, Intune)

- **[ProfileCreator](https://github.com/profileCreator/ProfileCreator/)** - Profile management

- **[iMazing Profile Editor](https://imazing.com/profile-editor)** - Configuration profiles

---

## Windows enterprise configuration

Deploy configuration settings through your enterprise management solution using **[Group Policy](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/policy/group-policy-objects)** or Intune policies. Settings can be configured at machine-wide (HKLM) or per-user (HKCU) level. Machine-level settings take priority over user-level settings when both are configured.

```
```powershell
# Set machine-wide settings (recommended)
New-Item -Path "HKLM:\SOFTWARE\Policies\Claude" -Force
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Claude" -Name "disableAutoUpdates" -Value 0 -Type DWord
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Claude" -Name "autoUpdaterEnforcementHours" -Value 72 -Type DWord
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Claude" -Name "isDesktopExtensionEnabled" -Value 1 -Type DWord
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Claude" -Name "isDesktopExtensionDirectoryEnabled" -Value 1 -Type DWord
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Claude" -Name "isLocalDevMcpEnabled" -Value 1 -Type DWord
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Claude" -Name "isClaudeCodeForDesktopEnabled" -Value 1 -Type DWord
```
```

---

## Enterprise policy options

| **Key**                              | **Type**        | **Default**  | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------ | --------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedWorkspaceFolders`            | string[] (JSON) | Unrestricted | Filepath or filepaths the user can mount to Cowork                                                                                                                                                                                                                                                                                                                                                                               |
| `autoUpdaterEnforcementHours`        | Integer (1-72)  | 72           | Hours before forcefully restarting Claude to apply a prepared update                                                                                                                                                                                                                                                                                                                                                             |
| `disableAutoUpdates`                 | Boolean         | false        | Disable automatic updates. Set this when your MDM manages Claude Desktop versions; leave unset to let the app self-update after a one-time provisioned install. See **[Deploy Claude Desktop for Windows](https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows)**.                                                                                                                                  |
| `effortLevel`                        | string          | null         | Sets the default effort level (`low`, `medium`, `high`, `xhigh`, or `max`) for Claude Code sessions in Claude Desktop. The managed value applies fresh at the start of every session, even if someone changed the effort level from the picker in an earlier session. Requires Claude Desktop version 1.25927.0 or later. Doesn't apply to Cowork sessions in Claude Desktop, which don't read Claude Code managed settings.<br> |
| `forceLoginOrgUUID`                  | string / array  | null         | Require login to belong to a specific organization. Accepts a single UUID string, which also pre-selects that organization during login, or an array of UUIDs where any listed organization is accepted without pre-selection. Login fails if the authenticated account does not belong to a listed organization.                                                                                                                |
| `isClaudeCodeForDesktopEnabled`      | Boolean         | true         | Enable Claude code access in desktop                                                                                                                                                                                                                                                                                                                                                                                             |
| `isDesktopExtensionEnabled`          | Boolean         | true         | Enable/disable extensions                                                                                                                                                                                                                                                                                                                                                                                                        |
| `isDesktopExtensionDirectoryEnabled` | Boolean         | true         | Enable extension directory access                                                                                                                                                                                                                                                                                                                                                                                                |
| `isLocalDevMcpEnabled`               | Boolean         | true         | Enable local MCP servers                                                                                                                                                                                                                                                                                                                                                                                                         |
| `secureVmFeaturesEnabled`            | Boolean         | true         | Enable **[Cowork](https://support.claude.com/en/articles/13345190-getting-started-with-cowork)** access in desktop                                                                                                                                                                                                                                                                                                               |
---

SOURCE: https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows

# Deploy Claude Desktop for Windows

Administrators on Team or Enterprise plans can deploy Claude Desktop automatically across their organization to manage installations and updates centrally. We offer MSIX packages for Windows deployments via Microsoft Intune, SCCM, Group Policy, or PowerShell.

## Installation requirements

- For individual installations with full feature support including Claude Cowork, administrator privileges are required. Users will see a Windows UAC prompt during installation. Users without admin access can still install Claude, but Cowork on desktop will not be available. Access the user-friendly installer from **[our download page](https://claude.com/download)**.

- For silent deployment without user interaction, use the MSIX package directly with your enterprise management tool.

## Cowork desktop requirements

Claude Desktop for Windows requires the **[Virtual Machine Platform](https://support.microsoft.com/en-us/windows/enable-virtualization-on-windows-c5578302-6e43-4b4b-a449-8ced115f58e1)** to use Cowork. You can automate installation of this feature via most endpoint management solutions, but you may also run the following command to install it manually:

```
powershell
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -All -NoRestart
```

The feature takes effect after the machine restarts. The `-NoRestart` flag suppresses the automatic restart for silent deployment, so schedule one through your management tool.

## Download

- **[Claude MSIX (x64)](https://claude.ai/api/desktop/win32/x64/msix/latest/redirect)**

- **[Claude MSIX (arm64)](https://claude.ai/api/desktop/win32/arm64/msix/latest/redirect)**

## Installation commands

The Claude MSIX is packaged as a per-user application. `Add-AppxPackage` registers it for the current user only, while `Add-AppxProvisionedPackage` stages it machine-wide so it's available to every user on the device, including standard users without admin rights.

### Install for single user

```
powershell
Add-AppxPackage -Path "Claude.msix"
```

For more details, see Microsoft's **[Add-AppxPackage](https://learn.microsoft.com/en-us/powershell/module/appx/add-appxpackage?view=windowsserver2022-ps)** documentation.

### Install for all users (provisions machine-wide)

```
powershell
Add-AppxProvisionedPackage -Online -PackagePath "Claude.msix" -SkipLicense -Regions "all"
```

For more details, see Microsoft's **[Add-AppxProvisionedPackage](https://learn.microsoft.com/en-us/powershell/module/dism/add-appxprovisionedpackage?view=windowsserver2022-ps)** documentation.

## Deploy via MDM

**Important:** Because the MSIX is packaged per-user, uploading it to Intune as a line-of-business (LOB) app installs it in user context rather than machine-wide. The install fails for standard users without admin rights. For machine-wide deployment, run `Add-AppxProvisionedPackage` against the package instead—either pre-stage it on target devices before users sign in, or deliver the command through a Win32 app or PowerShell script wrapper. Intune LOB can't run this command on your behalf.

Claude Desktop can be deployed through various enterprise software distribution services. Choose the method that aligns with your organization's existing infrastructure:

- **[Microsoft Intune](https://docs.microsoft.com/en-us/windows/msix/desktop/managing-your-msix-deployment-intune)**

- **[Microsoft Endpoint Configuration Manager (SCCM)](https://learn.microsoft.com/en-us/windows/msix/desktop/managing-your-msix-deployment-mem-adminconsole)**

- **[Group Policy Software Installation](https://learn.microsoft.com/en-us/troubleshoot/windows-server/group-policy/use-group-policy-to-install-software)**

- **[Deployment Image Servicing and Management (DISM.exe)](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/preinstall-apps-using-dism?view=windows-10)**

- **[PowerShell Scripts](https://learn.microsoft.com/en-us/windows/msix/desktop/powershell-msix-cmdlets)**

### Manage auto-updates alongside your MDM

By default, Claude Desktop checks for updates approximately every four hours and applies them automatically—independent of the version your MDM has assigned. To keep the in-app updater and your MDM from conflicting, choose one of these approaches before you deploy:

**Option 1: Your MDM manages versions.** Set the `disableAutoUpdates` policy to `1` and push new MSIX builds through your MDM on your own schedule. See **[Enterprise configuration for Claude Desktop](https://support.claude.com/en/articles/12622667-enterprise-configuration-for-claude-desktop)** for the policy location.

**Option 2: Claude Desktop manages versions.** Leave `disableAutoUpdates` unset. Deploy the MSIX once via a Win32-wrapped `Add-AppxProvisionedPackage` install, then use a custom detection script that checks `Get-AppxPackage -Name Claude` for a version greater than or equal to the one you provisioned. This keeps your MDM reporting **Installed** after the app self-updates.

## Configuration

To configure Claude Desktop settings such as auto-updates, extensions, and MCP servers, see **[Enterprise configuration](https://support.claude.com/en/articles/12622667-enterprise-configuration)**.

---

## Troubleshooting

### MSIX package not working with AppLocker?

By default, packaged apps may be restricted by AppLocker policies. Ensure your AppLocker rules allow MSIX packages, or add Claude Desktop to your allowed applications list. Consult your organization's security policies before making changes.

### "The parameter is incorrect" after MDM deployment

This usually means the in-app updater and your MDM have both registered the package, leaving duplicate entries under the `Claude` package family. Pick a single update owner using the guidance in **[Manage auto-updates alongside your MDM](#h_1297fb34f3)** above.

### Intune install fails for standard users, or Cowork won't start on Claude Desktop?

Both symptoms indicate the MSIX was installed in user context rather than provisioned machine-wide:

- **Install fails for standard users:** An Intune LOB deployment of the MSIX runs in user context, so standard users without admin rights can't complete it. Redeploy by running `Add-AppxProvisionedPackage` through a Win32 app, PowerShell script wrapper, or pre-staged package.

- **Cowork unavailable on desktop after install:** A per-user `Add-AppxPackage` install can complete without registering the Cowork virtualization service, the Windows service Cowork depends on. Claude appears installed but Cowork won't start. Redeploy using `Add-AppxProvisionedPackage` so the service registers machine-wide.

### Cowork reports missing HCS services or virtualization errors

If Cowork fails to start with an error like "Missing HCS services: HNS, vmcompute, vfpext," the Virtual Machine Platform service stack isn't registered on the machine, even if Claude installed successfully.

**To diagnose and fix:**

Check whether the feature is enabled and its services exist:

```
powershell
Get-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform Get-Service vmcompute, hns
```

If the feature shows as disabled or the services are missing, re-enable it:

```
powershell
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -All
```

Restart the machine using **Restart**, not shut down and power on. With Windows Fast Startup enabled, a shutdown cycle can leave the virtualization services uninitialized.

If VMware or VirtualBox is also installed on the machine, confirm the Windows hypervisor is set to launch at boot. Run `bcdedit` from an elevated prompt and check that `hypervisorlaunchtype` reads `Auto`. If it doesn't, run `bcdedit /set hypervisorlaunchtype auto` and restart.

**Note:** Virtual machines and VDI environments without nested virtualization aren't supported, so Cowork can't run on these hosts. To see exactly which check is failing, go to **Help > Troubleshooting > Show Logs** in Claude Desktop and review `supported-features-info.json`.
---

SOURCE: https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac

# Use quick entry with Claude Desktop on Mac

Quick entry is a redesigned experience for Claude Desktop on Mac that lets you access Claude instantly from anywhere on your computer. With quick entry, you can start chats, capture screenshots, share application windows, and use voice dictation to interact with Claude without navigating away from your current task.

Quick entry is available to all Claude users (free, Pro, Max, Team, and Enterprise plans) using Claude Desktop on macOS.

## Key features

Quick entry includes three main capabilities:

- **Instant access**: Double-tap the Option key to open Claude from any app.

- **Visual context**: Capture screenshots or click application windows to share what you're working on.

- **Voice input**: Press Caps Lock to dictate your message to Claude with real-time transcription.

## System requirements

To use quick entry, you need:

- macOS 12 or later for quick entry features

- macOS 14 or later for voice dictation

- Claude Desktop installed and running (can be in the background)

## Setting up quick entry

When you first open the updated version of Claude Desktop, you'll see a prompt to enable quick entry shortcuts.

### Enable the chat shortcut

1. Check the box for **Turn on shortcut** in the quick entry prompt.

2. Click "Continue."

3. Double-tap the Option key to test the shortcut.

4. Moving forward, manage this in Settings > General (under **Desktop app**).

Once enabled, double-tapping Option will open a text box where you can type your message and start a new chat. You can also click "New chat" to see your five most recent conversations.



### Enable the voice shortcut (optional)

The voice dictation shortcut is disabled by default because it takes over your Caps Lock key.

To enable voice dictation:

1. Check the box for **Turn on shortcut** in the voice dictation prompt.

2. Click "Continue."

3. Press Caps Lock once to start dictating.

4. Press Caps Lock again when you're finished speaking.

5. Click the arrow to send your transcribed message to Claude.

6. Moving forward, manage this in Settings > General (under **Desktop app**).

## Using quick entry

### Start a quick conversation

1. Double-tap the Option key from any application.

2. Type your message in the text box that appears.

3. Click the arrow icon or press Enter to send your message to Claude.

### Capture a screenshot

1. Open quick entry by double-tapping the Option key.

2. A "Drag to take a screenshot" prompt will appear by your cursor.

3. Click and drag to select the area of your screen you want to screenshot.

4. The screenshot will be attached to your message to Claude.

### Share an application window

1. Open quick entry by double-tapping the Option key.

2. Click an application window to attach its contents to your message.

3. Add any additional context or questions.

4. Send your message to Claude.

### Use voice dictation

1. Press Caps Lock to start dictating (if enabled).

2. Speak your message—you'll see your words transcribed in real-time.

3. Press Caps Lock again to stop dictating.

4. Review your transcribed message.

5. Click the arrow to send it to Claude.

## Customizing shortcuts

You can customize quick entry shortcuts in your Claude Desktop settings.

1. Open Claude Desktop.

2. Go to Settings > General (under **Desktop app**).

3. Choose from the following next to **Quick access shortcut**:

  - Double-tap Option (default)

  - Option + Space

  - Custom keyboard shortcut

4. Click the dropdown next to **Voice shortcut** to:

  - Enable Caps Lock for voice input

  - Set a custom keyboard shortcut

  - Disable the shortcut entirely

## Permissions

Quick entry requires certain macOS permissions to function:

- **Screen recording**: Required to capture screenshots and share application windows.

- **Accessibility**: Required for quick entry functionality.

- **Speech recognition**: Required for voice dictation (macOS 14+ only).

You can review or change these permissions in System Settings > Privacy & Security.

## Common use cases

Quick entry is designed for moments when you need Claude's help without breaking your flow:

- **Code review**: Share error messages or application windows directly with Claude for debugging assistance.

- **Quick answers**: Get instant assistance from Claude without switching away from your current task.

- **Research and writing**: Capture screenshots while browsing and ask contextual questions.

- **Brainstorming**: Use voice dictation for hands-free ideation while thinking or moving around.

## FAQ

### Do I need to keep Claude Desktop open to use quick entry?

Yes. Claude Desktop needs to be running on your Mac, but it can run in the background. You don't need to have the Claude window visible.

### Can I use quick entry on Windows?

No. Quick entry is currently only available for macOS users. Windows users can still access Claude Desktop, but without the quick entry features.

### Is my voice recorded when I use dictation?

Voice dictation transcribes your speech to text in real-time. The transcribed text is sent to Claude as part of your message, just like any other text input.

### Can I disable quick entry after enabling it?

Yes. You can disable quick entry shortcuts at any time in Settings > General > Desktop App. You can turn off the quick access shortcut, voice shortcut, or both.

### What if the shortcuts conflict with other apps?

You can customize the quick access shortcut to use Option + Space or create a custom keyboard shortcut that doesn't conflict with your other applications. The voice shortcut can only use Caps Lock or be disabled.
---

SOURCE: https://support.claude.com/en/articles/14479591-use-dictation-in-office-agents

# Use dictation in Office agents

Dictation lets you speak your prompts instead of typing them when using Office agents. Click the microphone icon in the chat input, speak, and your words appear in the composer as you talk.

Dictation is available for organizations that sign in with Claude directly. It isn't available when Office agents is configured with third-party authentication such as a gateway, Vertex AI, or Bedrock. See below for more information.

**Note:** Dictation is different from voice mode. Dictation turns your speech into text so you can send a written prompt, and Claude replies in text. Voice mode is a full spoken conversation—you talk to Claude and Claude talks back, and it can use your connected tools. Learn more about **[voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)**.

## How it works

When you click the microphone, Office agents streams your audio to Anthropic's transcription service, the same infrastructure that powers dictation in the Claude apps. The transcribed text appears in the composer in real time. Click the microphone again to stop, or press Enter to stop and send in one step.

Nothing is transcribed on your device, and your audio isn’t sent to any third-party service. Audio is processed entirely on Anthropic’s infrastructure and isn’t retained; only the resulting text remains in your composer.

## Use dictation

- Click the microphone icon on the right side of the chat input. The placeholder changes to *Listening...* and the button turns blue.

- Speak your prompt. Your words appear in the composer as you talk.

- Click the microphone again to stop, or press Enter to stop and send in one step.

- To choose a different microphone, hover over the microphone icon and click the arrow that appears.

## Why dictation isn't available with third-party authentication

In third-party environments, Office agents do not send prompts to Anthropic directly. Spoken audio is effectively a prompt, so dictation isn’t offered there. If you need voice input in a third-party environment, use the dictation feature built into your operating system or Office application instead.
---

SOURCE: https://support.claude.com/en/articles/14729294-open-claude-desktop-with-a-link

# Open Claude Desktop with a link

Claude for macOS, Windows, and Linux respond to the `claude://` URL scheme, much like a browser responds to the `https://` scheme. You can use these links from a website, a script, or another app to open Claude Desktop and jump straight to a chat, a Cowork session, or a Code session.

This article lists the link formats Claude Desktop supports and the parameters each one accepts.

## How deep links work

When your operating system opens a `claude://` URL, it hands the URL to Claude. If the app isn't running, macOS, Windows, and Linux will launch it first. Claude then reads the path and query parameters and navigates to the right place inside the app.

All parameter values must be URL-encoded. Prompt text passed in `q` is truncated to roughly 14,000 characters.

---

## Start a new chat

```
claude://claude.ai/new
claude://claude.ai/new?q=Summarize%20this%20week%27s%20release%20notes
```

Opens a new chat in Claude Desktop. If you include `q`, the prompt field is prefilled with that text so you can review and send it.

| **Parameter** | **Required** | **Description**                      |
| ------------- | ------------ | ------------------------------------ |
| `q`           | No           | Text to prefill in the prompt field. |

---

## Open an existing chat or project

```
claude://claude.ai/chat/{conversation-id}
claude://claude.ai/project/{project-id}
```

Opens a specific chat or project by its ID. The ID is the UUID you see at the end of the chat or project URL in Claude. If the ID is missing or invalid, Claude opens your recent chats or your projects list instead.

---

## Start a Claude Code session

```
claude://code/new
claude://code/new?q=Fix%20the%20failing%20test&folder=%2FUsers%2Fme%2Frepo
```

Opens Claude Code in Claude Desktop with the composer prefilled. Use this for "Open in Claude Code" buttons in your own tools.

| **Parameter** | **Required** | **Description**                                                                                                                                              |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `q`           | No           | Text to prefill in the composer. prompt is accepted as an alias.                                                                                             |
| `folder`      | No           | Absolute path to use as the working directory. Claude Desktop asks you to confirm the folder before it's used. Only the first folder value is applied today. |
| `file`        | No           | Absolute path to a file to attach. Accepted but not currently supported.                                                                                     |

**Note:** Any folder supplied through a link is treated as untrusted. Claude Desktop always shows a confirmation dialog before adopting it as the working directory, even if you've trusted that folder before.

---

## Start a Claude Cowork session

```
claude://cowork/new
claude://cowork/new?q=Draft%20the%20Q2%20update&folder=%2FUsers%2Fme%2Fdocs&file=%2FUsers%2Fme
%2Fdocs%2Fnotes.md
```

Opens a new Cowork session with the composer prefilled. Use this for "Open in Claude Cowork" buttons in your own tools.

| **Parameter** | **Required** | **Description**                                                                                                                                     |
| ------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `q`           | No           | Text to prefill in the composer.                                                                                                                    |
| `folder`      | No           | Absolute path to a folder to attach. Repeat the parameter to attach more than one. Claude Desktop asks you to confirm each folder before it's used. |
| `file`        | No           | Absolute path to a file to attach. Repeat the parameter to attach more than one.                                                                    |

**Note:** Any folder supplied through a link is treated as untrusted. Claude Desktop always shows a confirmation dialog before adopting it as the working directory, even if you've trusted that folder before.

---

## Test a deep link

### On macOS

Open Terminal and run:

```
open "claude://claude.ai/new?q=Hello"
```

### On Windows

Open Command Prompt and run:

```
start "" "claude://claude.ai/new?q=Hello"
```

### On Linux

Open a terminal and run:

```
xdg-open "claude://claude.ai/new?q=Hello"
```
---

SOURCE: https://support.claude.com/en/articles/14898120-open-the-claude-mobile-app-with-a-link

# Open the Claude mobile app with a link

The Claude mobile apps for iOS and Android respond to the `claude://` URL scheme. Third-party apps, shortcuts, and web pages can use these links to open the Code tab, jump to an existing session, or prefill the new-session composer. All parameter values must be URL-encoded.

These links require Claude Code access on your account. If you don't have access to Claude Code, the links won't work.

## Open the Code tab

`claude://code`

Opens the Code tab on the session list.

## Open an existing Code session

`claude://code/{session-id}`

Opens an existing Claude Code session by ID. If the ID is unknown, you'll land on the session list.

## Open a new Code session

`claude://code/new`

With optional parameters: `claude://code/new?q=Fix%20the%20failing%20test&repo=anthropics%2Fclaude-code&branch=main`

Opens the new-session composer, optionally prefilled. All parameters are optional.

| **Parameter** | **Required** | **Description**                                                                                                                        |
| ------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `q`           | No           | Text to prefill in the composer. `prompt` is accepted as an alias.                                                                     |
| `mode`        | No           | Pre-selects the session mode. Accepts `plan` or `code`. Ignored if the mode isn't available on your plan.                              |
| `repo`        | No           | Pre-selects a GitHub repository in `owner/name` format (case-insensitive). Ignored if the repo isn't in your connected GitHub account. |
| `branch`      | No           | Pre-selects a branch. Requires `repo`.                                                                                                 |

The **[desktop-only folder and file parameters](https://support.claude.com/en/articles/14729294-open-claude-desktop-with-a-link)** are ignored on mobile.

## Universal links

The same Code routes are also reachable via **<https://claude.ai/code/>...** universal links. If the app is installed, the operating system opens it; otherwise the link opens in the browser.

| **URL**                                                                                                 | **Opens**                                                                                       |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **<https://claude.ai/code>**                                                                            | New-session composer                                                                            |
| **[https://claude.ai/code/{session-id}](https://claude.ai/code/%7Bsession-id%7D)**                      | Existing session                                                                                |
| **<https://claude.ai/code/new?q=Fix%20the%20failing%20test&repo=anthropics%2Fclaude-code&branch=main>** | New-session composer, prefilled with the GitHub repository, branch, and "Fix the failing test." |
---

SOURCE: https://support.claude.com/en/articles/9266462-install-claude-for-ios

# Install Claude for iOS

## How do I install the Claude for iOS app?

You can install the Claude app onto your iOS device by navigating to the App Store and searching for “Claude by Anthropic”, or by navigating directly to our [App Store listing](https://apps.apple.com/us/app/claude/id6473753684). Click on “Get” from the app listing to prompt your download.

## Why can’t I find Claude for iOS in the App Store?

If you’re unable to locate Claude for iOS in your App Store, you may be located in an [unsupported region](https://support.claude.com/en/articles/8461763-where-can-i-access-claude), using an unsupported device, or using an unsupported version of iOS.

## What versions of iOS are supported?

We currently support iOS version 17.0 and above.

## How do I uninstall the Claude for iOS app?

To uninstall the Claude for iOS from your device, hold down on the app from your home screen until you see the menu options. Click on “Remove App.” From the next series of options, select “Delete App.”

Note that if you have an active paid Claude subscription and would like to uninstall the app, your subscription will not be automatically canceled. To cancel your subscription, follow the instructions here: [How do I cancel my paid Claude subscription?](https://support.claude.com/en/articles/8325617-how-do-i-cancel-my-paid-claude-subscription)
---

SOURCE: https://support.claude.com/en/articles/9266495-how-do-i-sign-up-for-claude-pro-on-the-claude-app-for-ios

# How do I sign up for Claude Pro on the Claude app for iOS?

To sign up for Claude Pro using the Claude app for iOS, open the app on your device and click on your initials in the upper right corner. From your settings page, click on “Upgrade to Pro” and follow the payment instructions to complete your in-app purchase.
---

SOURCE: https://support.claude.com/en/articles/9612887-install-claude-for-android

# Install Claude for Android

## Install the Claude for Android app

You can install the Claude app onto your device by navigating to the Play Store and searching for "Claude by Anthropic," or by navigating directly to our **[Play Store listing](https://play.google.com/store/apps/details?id=com.anthropic.claude)**. Click on “Install” from the app listing to prompt your download.

## Why can’t I find Claude for Android in the Play Store?

If you’re unable to locate Claude for Android in your Play Store, you may be located in an **[unsupported region](https://support.claude.com/en/articles/8461763)**, using an unsupported device, or using an unsupported version of Android.

## What versions of Android are supported?

We currently support Android 8.0 Oreo and above.

## Uninstall the Claude for Android app

To uninstall the Claude app from your Android device, hold down on the app from your screen until you see the menu options. Click on "App Info." From the next series of options, select "Uninstall."

Note that if you have an active paid subscription and would like to uninstall the app, your subscription will not be automatically canceled. To cancel your subscription, follow the instructions here: **[Cancel your Pro or Max subscription on Claude for Android](https://support.claude.com/en/articles/8325617-cancel-your-pro-or-max-subscription#h_916bc20742)**.
---

SOURCE: https://support.claude.com/en/articles/9612892-how-do-i-sign-up-for-claude-pro-on-claude-for-android

# How do I sign up for Claude Pro on Claude for Android?

To sign up for Claude Pro using the Claude app for Android, open the app on your device and click on your initials in the upper right corner. From your settings page, click on “Upgrade to Pro” and follow the payment instructions to complete your in-app purchase.