# Events Data Model

The `Event` model represents a single event that people can attend.

## Fields

| Field                    | Type       | Can be null | Key                     | Description                                      |
| ------------------------ | ---------- | ----------- | ----------------------- | ------------------------------------------------ |
| `id`                     | `UUID`     | No          | Primary                 | Unique identifier for the event.                 |
| `organization_id`        | `UUID`     | No          | Foreign: `Organization` | Organization this event belongs to.              |
| `campaign_id`            | `UUID`     | Yes         | Foreign: `Campaign`     | Campaign this event belongs to.                  |
| `group_id`               | `UUID`     | No          | Foreign: `Group`        | Group hosting this event.                        |
| `title`                  | `String`   | No          |                         | The title of the event.                          |
| `slug`                   | `String`   | No          |                         | The URL-friendly slug for the event. **Unique.** |
| `content`                | `JSON`     | No          |                         | Page content containing TipTap JSON              |
| `start_time`             | `DateTime` | No          |                         | The date and time when the event starts.         |
| `end_time`               | `DateTime` | No          |                         | The date and time when the event ends.           |
| `location_address_short` | `String`   | No          |                         | The short name of the venue or location.         |
| `location_address_full`  | `String`   | No          |                         | The full address of the venue or location.       |
| `location_online_link`   | `String`   | Yes         |                         | The link for the online location.                |
| `latitude`               | `Float`    | Yes         |                         | The latitude of the event location.              |
| `longitude`              | `Float`    | Yes         |                         | The longitude of the event location.             |
| `status`                 | `String`   | No          |                         | `draft` (default), `published` or `archived`     |
| `published_at`           | `DateTime` | Yes         |                         | Publishing time (set in future to schedule)      |
| `email_confirmation`     | `UUID`     | Yes         | Foreign: `Email`        | Specific confirmation email.                     |
| `email_reminder`         | `UUID`     | Yes         | Foreign: `Email`        | Specific reminder email.                         |
| `email_follow_up`        | `UUID`     | Yes         | Foreign: `Email`        | Specific follow-up email.                        |
| `created_at`             | `DateTime` | No          |                         | The date and time created.                       |
| `updated_at`             | `DateTime` | No          |                         | The date and time last updated.                  |

## Publishing Workflow

The `status` and `published_at` fields can be used to manage a publishing workflow:

1.  **Drafts:** When an event is created, it starts with a `status` of `draft`. It is not visible on the public website.
2.  **Publishing:** To publish an event immediately, the `status` is set to `published` and `published_at` is set to the current time.
3.  **Scheduled Publishing:** To schedule an event for future publication, set the `status` to `published` and `published_at` to a future date and time.
4.  **Archiving:** After an event has passed, you might set its `status` to `archived` to remove it from the website while keeping it in the database for record-keeping.

## Relationships

### Belongs To

- An **Event** belongs to an **Organization** via `organization_id` (required).
- An **Event** belongs to a **Campaign** via `campaign_id` (optional - can be null).
- An **Event** is hosted by a **Group** via `group_id` (required).

### Many-to-Many Relationships

- An **Event** has many **People** (attendees) through the `event_signups` join table. Each signup can track attendance status. People can sign up for multiple events.

### Specific Email References (Foreign Keys)

- **Specific Emails for Event**: You can only select/create emails that have `sent_to` set to 'event'.
  - `email_confirmation` references an **Email** sent immediately when someone signs up for this specific event.
  - `email_reminder` references an **Email** sent to remind attendees about this specific event (one day before).
  - `email_follow_up` references an **Email** sent after this specific event concludes (one day after).

These fields are used for event-specific emails (not templates). When set, they override the default templates for this particular event. Can be null, in which case the system falls back to using the appropriate template (organization default, group default if applicable, campaign default if applicable, or custom event template).

### Related Emails

- **Emails** can be associated with an **Event** via the `event_id` field in the Emails table, allowing event-specific communications to be sent to all event signups.
