# People Data Model

The `Person` model represents an individual user of the application.

## Fields

| Field                   | Type       | Can be null | Key     | Description                              |
| ----------------------- | ---------- | ----------- | ------- | ---------------------------------------- |
| `id`                    | `UUID`     | No          | Primary | Unique identifier for the person.        |
| `first_name`            | `String`   | No          |         | The person's first name.                 |
| `last_name`             | `String`   | No          |         | The person's last name.                  |
| `email`                 | `String`   | No          |         | The person's email address. **Unique.**  |
| `phone_number`          | `String`   | No          |         | The person's phone number.               |
| `content`               | `JSON`     | No          |         | Notes content containing TipTap JSON     |
| `zip_code`              | `Text`     | Yes         |         | The person's zip code.                   |
| `street`                | `Text`     | Yes         |         | The person's street.                     |
| `house_number`          | `Text`     | Yes         |         | The person's house number.               |
| `house_number_addition` | `Text`     | Yes         |         | The person's house number addition.      |
| `city`                  | `Text`     | Yes         |         | The person's city.                       |
| `province`              | `Text`     | Yes         |         | The person's province.                   |
| `country`               | `Text`     | Yes         |         | The person's country.                    |
| `latitude`              | `Float`    | Yes         |         | The latitude of this person's location.  |
| `longitude`             | `Float`    | Yes         |         | The longitude of this person's location. |
| `created_at`            | `DateTime` | No          |         | Date and time created.                   |
| `updated_at`            | `DateTime` | No          |         | Date and time updated.                   |

## Relationships

### Many-to-Many Relationships

- A **Person** can be a member of many **Groups** through the `group_members` join table. Each membership has a `role` field indicating their role within the group (e.g., 'member', 'organizer').
- A **Person** can sign up for many **Events** through the `event_signups` join table. Each signup can track attendance status (e.g., 'attended', 'not_attending', 'no_show', 'waitlist').

### Authored Content

- A **Person** can author many **Emails** (via `author_id` in Emails table).
