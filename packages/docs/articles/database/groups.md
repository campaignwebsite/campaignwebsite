# Groups Data Model

The `Group` model represents a local group of people.

Users can easily create new events and groups based on predefined templates associated with the campaign. Additionally, email templates used for communication related to the campaign can be set up. Note: the event email templates for a group are overwritten by the campaign's email templates if the event is associated with a campaign.

## Fields

| Field                               | Type       | Can be null | Key                     | Description                                    |
| ----------------------------------- | ---------- | ----------- | ----------------------- | ---------------------------------------------- |
| `id`                                | `UUID`     | No          | Primary                 | Unique identifier for the group.               |
| `organization_id`                   | `UUID`     | No          | Foreign: `Organization` | Organization this group belongs to.            |
| `campaign_id`                       | `UUID`     | Yes         | Foreign: `Campaign`     | Campaign this group belongs to.                |
| `title`                             | `String`   | No          |                         | The title of the group.                        |
| `slug`                              | `String`   | No          |                         | Unique URL-friendly slug                       |
| `content`                           | `JSON`     | No          |                         | Page content containing TipTap JSON            |
| `language`                          | `String`   | No          |                         | The language of the group. Defaults to 'en'.   |
| `location_online`                   | `Boolean`  | No          |                         | Group is online-only. Defaults to false.       |
| `location_name`                     | `String`   | Yes         |                         | The name of the location (e.g. a city).        |
| `latitude`                          | `Float`    | Yes         |                         | The latitude of the group's primary location.  |
| `longitude`                         | `Float`    | Yes         |                         | The longitude of the group's primary location. |
| `primary_color`                     | `String`   | Yes         |                         | The primary color for the group's branding.    |
| `secondary_color`                   | `String`   | Yes         |                         | The secondary color for the group's branding.  |
| `logo`                              | `String`   | Yes         |                         | A URL to the group's logo.                     |
| `template_event`                    | `UUID`     | Yes         | Foreign: `Event`        | Template for events by this group.             |
| `template_email_event_confirmation` | `UUID`     | Yes         | Foreign: `Email`        | Email template for events by this group.       |
| `template_email_event_reminder`     | `UUID`     | Yes         | Foreign: `Email`        | Email template for events by this group.       |
| `template_email_event_follow_up`    | `UUID`     | Yes         | Foreign: `Email`        | Email template for events by this group.       |
| `email_confirmation`                | `UUID`     | Yes         | Foreign: `Email`        | Specific confirmation email.                   |
| `email_welcome`                     | `UUID`     | Yes         | Foreign: `Email`        | Specific welcome email.                        |
| `created_at`                        | `DateTime` | No          |                         | The date and time created.                     |
| `updated_at`                        | `DateTime` | No          |                         | The date and time last updated.                |

## Relationships

### Belongs To

- A **Group** belongs to an **Organization** via `organization_id` (required).
- A **Group** belongs to a **Campaign** via `campaign_id` (optional - can be null).

### One-to-Many Relationships

- A **Group** can host many **Events** (via `group_id` in Events table).

### Many-to-Many Relationships

- A **Group** has many **People** (members) through the `group_members` join table. Each membership has a `role` field (e.g., 'member', 'organizer'). People can be members of multiple groups.

### Template References (Foreign Keys)

- **Event Template**: The `template_event` field references an **Event** that serves as a template for creating new events for this group. Can be null.
- **Email Templates for Group**:
  - `template_email_group_confirmation` references an **Email** sent when someone joins this group.
  - `template_email_group_welcome` references an **Email** sent to welcome new group members.
- **Email Templates for Events**:
  - `template_email_event_confirmation` references an **Email** sent when someone signs up for an event hosted by this group.
  - `template_email_event_reminder` references an **Email** sent to remind attendees about an upcoming event.
  - `template_email_event_follow_up` references an **Email** sent after an event concludes.

All email template fields can be null. Note: If an event is associated with a campaign, the campaign's email templates will override the group's email templates.

### Specific Email References (Foreign Keys)

- **Specific Emails for Group**: You can only select/create emails that have `sent_to` set to 'group'.
  - `email_confirmation` references an **Email** sent immediately when someone joins this specific group.
  - `email_welcome` references an **Email** sent to welcome new members to this specific group (one day after joining).

These fields are used for group-specific emails (not templates). When set, they override the default templates for this particular group. Can be null, in which case the system falls back to using the appropriate template (organization default, campaign default if applicable, or custom group template).
