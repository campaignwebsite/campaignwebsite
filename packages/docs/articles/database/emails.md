# Emails Data Model

The `Email` model represents an email that can be sent to different groups of people. The `send_to` field determines who receives the email: members of a specific group, signups for a specific event, everyone in a campaign, or everyone in the system.

## Fields

| Field            | Type       | Can be null | Key                 | Description                                           |
| ---------------- | ---------- | ----------- | ------------------- | ----------------------------------------------------- |
| `id`             | `UUID`     | No          | Primary             | Unique identifier for the email.                      |
| `author_id`      | `UUID`     | No          | Foreign: `Person`   | Person who authored the email.                        |
| `campaign_id`    | `UUID`     | Yes         | Foreign: `Campaign` | Campaign this email is for.                           |
| `group_id`       | `UUID`     | Yes         | Foreign: `Group`    | Group this email is for.                              |
| `event_id`       | `UUID`     | Yes         | Foreign: `Event`    | Event this email is for.                              |
| `send_to`        | `String`   | No          |                     | Recipients: `group`, `event`, `campaign`, `everyone`  |
| `subject`        | `String`   | No          |                     | The subject line of the email.                        |
| `send_from_name` | `String`   | No          |                     | The name the email is sent from.                      |
| `reply_to`       | `String`   | No          |                     | The email address for replies.                        |
| `content`        | `JSON`     | No          |                     | The content of the email, TipTap JSON                 |
| `email_type`     | `String`   | Yes         |                     | See email types below                                 |
| `is_template`    | `Boolean`  | No          |                     | Whether this email is a template. Defaults to false.  |
| `status`         | `String`   | No          |                     | Status: `draft`, `scheduled`, `sent` or `acti`        |
| `scheduled_at`   | `DateTime` | Yes         |                     | Date and time when the email is scheduled to be sent. |
| `sent_at`        | `DateTime` | Yes         |                     | Date and time when the email was sent.                |
| `created_at`     | `DateTime` | No          |                     | Date and time when the record was created.            |
| `updated_at`     | `DateTime` | No          |                     | Date and time when the record was last updated.       |

Email types:

- `event_confirmation`: Sent when someone signs up for an event.
- `event_reminder`: Sent to remind attendees about an upcoming event.
- `event_follow_up`: Sent after an event concludes.
- `group_confirmation`: Sent when someone joins a group.
- `group_welcome`: Sent to welcome new group members.
- `campaign_confirmation`: Sent when someone joins a campaign.
- `campaign_welcome`: Sent to welcome new campaign members.
- `custom`: A custom email that doesn't fit the above categories.

## Relationships

### Belongs To

- An **Email** is authored by a **Person** via `author_id` (required).
- An **Email** can be associated with a **Campaign** via `campaign_id`. When `send_to` is 'campaign', this field specifies which campaign's members will receive the email.
- An **Email** can be associated with a **Group** via `group_id`. When `send_to` is 'group', this field specifies which groups's members will receive the email.
- An **Email** can be associated with an **Event** via `event_id`. When `send_to` is 'event', this field specifies which events's members will receive the email.

When this email is used as a template, the campaign_id, group_id, or event_id fields should not be set (as it's being used as template, not for one particular campaign/group/event).

### Send To Options

The `send_to` field determines the recipients:

- **`group`**: Email is sent to all members of the group specified in `group_id` (requires `group_id`).
- **`event`**: Email is sent to all people who signed up for the event specified in `event_id` (requires `event_id`).
- **`campaign`**: Email is sent to everyone associated with the campaign specified in `campaign_id` (requires `campaign_id`).
- **`everyone`**: Email is sent to everyone in the system (no foreign key required).

Depending on which option is chosen, different variables are available for use in the email content (e.g., group name, event details, campaign info).

Once an email is used as template for a campaign, group or event, the `send_to` field should not be changed.

### Email Type and Template Status

The `email_type` field categorizes the purpose of the email:

- **`confirmation`**: Sent immediately when someone joins or signs up (for campaigns, groups, or events).
- **`welcome`**: Sent to welcome new members (typically one day after joining, for campaigns or groups).
- **`reminder`**: Sent before an event to remind attendees (typically one day before the event).
- **`follow_up`**: Sent after an event concludes (typically one day after the event).
- **`custom`**: A custom email that doesn't fit the above categories (can be sent immediately or scheduled).

The `is_template` field distinguishes between:

- **Templates** (`is_template = true`): Default email templates that can be reused across multiple campaigns, groups, or events. When used as a template, the `campaign_id`, `group_id`, and `event_id` fields should be null. Templates are referenced via the `template_email_*` fields in Organizations, Campaigns, Groups, and Events tables.
- **Specific Emails** (`is_template = false`): Emails created for a specific campaign, group, or event. These override the templates for that particular entity. When used as a specific email, one of `campaign_id`, `group_id`, or `event_id` should be set to indicate which entity it belongs to.

### Usage as Templates

An **Email** (with `is_template = true`) can be referenced as a template by:

- **Organizations** for:

  - Campaign confirmation emails (`template_email_campaign_confirmation`)
  - Campaign welcome emails (`template_email_campaign_welcome`)
  - Group confirmation emails (`template_email_group_confirmation`)
  - Group welcome emails (`template_email_group_welcome`)
  - Event confirmation emails (`template_email_event_confirmation`)
  - Event reminder emails (`template_email_event_reminder`)
  - Event follow-up emails (`template_email_event_follow_up`)

- **Campaigns** for:

  - Group confirmation emails (`template_email_group_confirmation`)
  - Group welcome emails (`template_email_group_welcome`)
  - Event confirmation emails (`template_email_event_confirmation`)
  - Event reminder emails (`template_email_event_reminder`)
  - Event follow-up emails (`template_email_event_follow_up`)

- **Groups** for:
  - Event confirmation emails (`template_email_event_confirmation`)
  - Event reminder emails (`template_email_event_reminder`)
  - Event follow-up emails (`template_email_event_follow_up`)

### Usage as Specific Emails

An **Email** (with `is_template = false`) can be referenced as a specific email by:

- **Campaigns** via:

  - `email_confirmation` - sent when someone joins the campaign
  - `email_welcome` - sent to welcome new campaign members

- **Groups** via:

  - `email_confirmation` - sent when someone joins the group
  - `email_welcome` - sent to welcome new group members

- **Events** via:
  - `email_confirmation` - sent when someone signs up for the event
  - `email_reminder` - sent to remind attendees before the event
  - `email_follow_up` - sent after the event concludes
