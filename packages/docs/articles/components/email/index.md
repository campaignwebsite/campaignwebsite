# Email System

This folder contains documentation for components related to displaying, editing, and selecting email content.

## Overview

The email system supports both **templates** and **specific emails**:

- **Templates** (`is_template = true`) are reusable email defaults that can be set at the organization, campaign, or group level. They define the default content for different types of automated emails (confirmation, welcome, reminder, follow-up).

- **Specific Emails** (`is_template = false`) are created for individual campaigns, groups, or events. They override the templates for that particular entity.

## Template Hierarchy

When an email needs to be sent, the system uses the most specific template available:

1. **Campaign default templates** (most specific) - override both organization and group templates
2. **Group default templates** - override organization templates
3. **Organization templates** (most general) - the base defaults for the entire system

If a specific email is set for a campaign/group/event, it takes precedence over all templates.

## Email Types

The system supports the following email types:

- **Confirmation**: Sent immediately when someone joins or signs up
- **Welcome**: Sent to welcome new members (typically one day after joining)
- **Reminder**: Sent before an event to remind attendees
- **Follow-up**: Sent after an event concludes
- **Custom**: Custom emails that can be sent immediately or scheduled

## Components

- [Email Picker](./email-picker.md) - Component for selecting email templates or creating custom emails
- [Email Content Display](./content/email-content-display.md) - Display email content
- [Email Content Editor](./content/email-content-editor.md) - Edit email content
