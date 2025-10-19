# Campaigns Data Model

The `Campaign` model represents a specific campaign. A campaign functions as a 'folder' for organizing related events and groups.

Users can easily create new events and groups based on predefined templates associated with the campaign. These events and groups automatically use the campaign's email templates. Any of these templates can be customized for specific groups or events as needed (by creating a copy of the template and modifying it).

> Note: Email templates can also be set up for individual groups. However, if an event is associated with a campaign, the campaign's email templates will override those set at the group level.

## Fields

| Field                               | Type       | Can be null | Key                     | Description                            |
| ----------------------------------- | ---------- | ----------- | ----------------------- | -------------------------------------- |
| `id`                                | `UUID`     | No          | Primary                 | Unique identifier for the campaign.    |
| `organization_id`                   | `UUID`     | No          | Foreign: `Organization` | Organization this campaign belongs to. |
| `title`                             | `String`   | No          |                         | The title of the campaign.             |
| `slug`                              | `String`   | No          |                         | Unique URL-friendly slug               |
| `content`                           | `JSON`     | No          |                         | Page content containing TipTap JSON    |
| `template_group`                    | `UUID`     | Yes         | Foreign: `Group`        | Template for groups in this campaign.  |
| `template_event`                    | `UUID`     | Yes         | Foreign: `Event`        | Template for events in this campaign.  |
| `template_email_group_confirmation` | `UUID`     | Yes         | Foreign: `Email`        | Email template for linked groups.      |
| `template_email_group_welcome`      | `UUID`     | Yes         | Foreign: `Email`        | Email template for linked groups.      |
| `template_email_event_confirmation` | `UUID`     | Yes         | Foreign: `Email`        | Email template for linked events.      |
| `template_email_event_reminder`     | `UUID`     | Yes         | Foreign: `Email`        | Email template for linked events.      |
| `template_email_event_follow_up`    | `UUID`     | Yes         | Foreign: `Email`        | Email template for linked events.      |
| `email_confirmation`                | `UUID`     | Yes         | Foreign: `Email`        | Specific confirmation email.           |
| `email_welcome`                     | `UUID`     | Yes         | Foreign: `Email`        | Specific welcome email.                |
| `created_at`                        | `DateTime` | No          |                         | Date and time created.                 |
| `updated_at`                        | `DateTime` | No          |                         | Date and time last updated.            |

## Relationships

### Belongs To

- A **Campaign** belongs to an **Organization** via `organization_id` (required).

### One-to-Many Relationships

- A **Campaign** can have many **Events** (via `campaign_id` in Events table).
- A **Campaign** can have many **Groups** (via `campaign_id` in Groups table).

### Template References (Foreign Keys)

- **Group Template**: The `template_group` field references a **Group** that serves as a template for creating new groups in this campaign. Can be null.
- **Event Template**: The `template_event` field references an **Event** that serves as a template for creating new events in this campaign. Can be null.
- **Email Templates for Groups**: You can only select/create email templates that have `sent_to` set to 'group'.
  - `template_email_group_confirmation` references an **Email** sent immediately when someone joins a group in this campaign.
  - `template_email_group_welcome` references an **Email** sent to welcome new group members (one day after joining).
- **Email Templates for Events**: You can only select/create email templates that have `sent_to` set to 'event'.
  - `template_email_event_confirmation` references an **Email** sent when someone signs up for an event.
  - `template_email_event_reminder` references an **Email** sent to remind attendees about an upcoming event.
  - `template_email_event_follow_up` references an **Email** sent after an event concludes.

All email template fields can be null.

### Specific Email References (Foreign Keys)

- **Specific Emails for Campaign**: You can only select/create emails that have `sent_to` set to 'campaign'.
  - `email_confirmation` references an **Email** sent immediately when someone joins this specific campaign.
  - `email_welcome` references an **Email** sent to welcome new members to this specific campaign (one day after joining).

These fields are used for campaign-specific emails (not templates). When set, they override the default templates for this particular campaign. Can be null, in which case the system falls back to using the appropriate template (organization default or custom campaign template).
