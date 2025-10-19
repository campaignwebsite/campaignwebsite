# Group Members Data Model

The `group_members` model is a join table that represents the many-to-many relationship between `People` and `Groups`. Each record in this table indicates that a person is a member of a group.

## Fields

| Field        | Type       | Can be null | Key               | Description                                              |
| ------------ | ---------- | ----------- | ----------------- | -------------------------------------------------------- |
| `id`         | `UUID`     | No          | Primary           | Unique identifier for the group membership.              |
| `person_id`  | `UUID`     | No          | Foreign: `Person` | Person who is a member.                                  |
| `group_id`   | `UUID`     | No          | Foreign: `Group`  | Group the person is a member of.                         |
| `role`       | `String`   | No          |                   | Role of person in group: `member` (default), `organizer` |
| `created_at` | `DateTime` | No          |                   | The date and time when the membership was created.       |
| `updated_at` | `DateTime` | No          |                   | The date and time when the record was last updated.      |

## Relationships

This is a join table that creates a many-to-many relationship between **People** and **Groups**.

### Belongs To

- Each **Group Membership** belongs to a **Person** via `person_id` (required) - the person who is a member.
- Each **Group Membership** belongs to a **Group** via `group_id` (required) - the group they are a member of.

### Purpose

This table allows tracking which people belong to which groups, along with their role within each group (e.g., 'member' or 'organizer').

## Constraints

- The combination of `person_id` and `group_id` must be unique to prevent a person from being in the same group multiple times.
