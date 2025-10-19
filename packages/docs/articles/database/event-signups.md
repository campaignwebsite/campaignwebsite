# Events Signups Data Model

The `events_signups` model is a join table that represents the many-to-many relationship between `People` and `Events`. Each record in this table indicates that a person has signed up for an event.

## Fields

| Field        | Type       | Can be null | Key               | Description                                         |
| ------------ | ---------- | ----------- | ----------------- | --------------------------------------------------- |
| `id`         | `UUID`     | No          | Primary           | Unique identifier for the signup.                   |
| `person_id`  | `UUID`     | No          | Foreign: `Person` | Person who signed up.                               |
| `event_id`   | `UUID`     | No          | Foreign: `Event`  | Event that was signed up for.                       |
| `attendance` | `String`   | Yes         |                   | `attended`, `not_attending`, `no_show`, `waitlist`  |
| `created_at` | `DateTime` | No          |                   | The date and time when the signup was created.      |
| `updated_at` | `DateTime` | No          |                   | The date and time when the record was last updated. |

## Relationships

This is a join table that creates a many-to-many relationship between **People** and **Events**.

### Belongs To

- Each **Event Signup** belongs to a **Person** via `person_id` (required) - the person who signed up.
- Each **Event Signup** belongs to an **Event** via `event_id` (required) - the event they signed up for.

### Purpose

This table allows tracking which people have signed up for which events, along with their attendance status.

## Constraints

- The combination of `person_id` and `event_id` must be unique to prevent a person from signing up for the same event multiple times.
