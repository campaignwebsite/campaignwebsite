# Organizations Data Model

The `Organization` model represents the top-level entity that contains all campaigns, groups, and events. Each organization has its own set of default email templates that serve as the base templates for all entities within the organization.

## Default Organization

There is one default organization that is shown on the main directory paths:

- `/`
- `/events`
- `/groups`
- etc.

Other organizations are shown with their slug prefix:

- `/other-org/`
- `/other-org/events`
- `/other-org/groups`
- etc.

Only one organization can be set as the default organization.

## Fields

| Field                                  | Type       | Can be null | Key              | Description                                |
| -------------------------------------- | ---------- | ----------- | ---------------- | ------------------------------------------ |
| `id`                                   | `UUID`     | No          | Primary          | Unique identifier for the organization.    |
| `name`                                 | `String`   | No          |                  | The name of the organization.              |
| `slug`                                 | `String`   | No          | Unique           | Unique URL-friendly slug for organization. |
| `is_default`                           | `Boolean`  | No          |                  | Whether this is the default organization.  |
| `template_email_campaign_confirmation` | `UUID`     | Yes         | Foreign: `Email` | Email template for campaign confirmations. |
| `template_email_campaign_welcome`      | `UUID`     | Yes         | Foreign: `Email` | Email template for campaign welcomes.      |
| `template_email_group_confirmation`    | `UUID`     | Yes         | Foreign: `Email` | Email template for group confirmations.    |
| `template_email_group_welcome`         | `UUID`     | Yes         | Foreign: `Email` | Email template for group welcomes.         |
| `template_email_event_confirmation`    | `UUID`     | Yes         | Foreign: `Email` | Email template for event confirmations.    |
| `template_email_event_reminder`        | `UUID`     | Yes         | Foreign: `Email` | Email template for event reminders.        |
| `template_email_event_follow_up`       | `UUID`     | Yes         | Foreign: `Email` | Email template for event follow-ups.       |
| `created_at`                           | `DateTime` | No          |                  | Date and time created.                     |
| `updated_at`                           | `DateTime` | No          |                  | Date and time last updated.                |

## Relationships

### One-to-Many Relationships

- An **Organization** can have many **Campaigns** (via `organization_id` in Campaigns table).
- An **Organization** can have many **Groups** (via `organization_id` in Groups table).
- An **Organization** can have many **Events** (via `organization_id` in Events table).

### Template References (Foreign Keys)

- **Email Templates for Campaigns**:
  - `template_email_campaign_confirmation` references an **Email** that serves as the default template for campaign confirmation emails. These are sent immediately when someone joins a campaign.
  - `template_email_campaign_welcome` references an **Email** that serves as the default template for campaign welcome emails. These are sent to welcome new campaign members (one day after joining).
- **Email Templates for Groups**:
  - `template_email_group_confirmation` references an **Email** that serves as the default template for group confirmation emails. These are sent immediately when someone joins a group.
  - `template_email_group_welcome` references an **Email** that serves as the default template for group welcome emails. These are sent to welcome new group members (one day after joining).
- **Email Templates for Events**:
  - `template_email_event_confirmation` references an **Email** that serves as the default template for event confirmation emails. These are sent when someone signs up for an event.
  - `template_email_event_reminder` references an **Email** that serves as the default template for event reminder emails. These are sent to remind attendees about an upcoming event (one day before).
  - `template_email_event_follow_up` references an **Email** that serves as the default template for event follow-up emails. These are sent after an event concludes (one day after).

All email template fields can be null. If null, the system will fall back to hardcoded application defaults.

## Template Hierarchy

Organizations sit at the top of the email template hierarchy:

1. **Organization templates** (most general) - defined in this table
2. **Group default templates** - can override organization templates
3. **Campaign default templates** (most specific) - can override both organization and group templates

When an email needs to be sent, the system will use the most specific template available, falling back to less specific templates if needed.

## Constraints

- The `slug` field must be unique across all organizations.
- Only one organization can have `is_default` set to `true` at any given time. This should be enforced at the application level or via a unique partial index in the database.
