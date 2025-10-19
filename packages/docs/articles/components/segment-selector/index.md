# Segment Selector

The Segment Selector allows users to build lists of people for sending emails, exporting data, or organizing grassroots campaigns.

## Two Modes

### 1. Simple Mode (Built-in)

Select from predefined groups with **full attribute support** including event titles, group names, and campaign details:

- **Everyone** - All members in the system
- **Organization members** - All members of a specific organization
- **Campaign members** - All members associated with a campaign
- **Group members** - All members of a specific group
- **Event attendees** - All people signed up for an event

### 2. PostHog Cohorts (Advanced)

Use [PostHog's powerful cohort builder](https://posthog.com/docs/data/cohorts) for complex behavioral segmentation with **person attributes only**.

## Email Personalization

Available attributes depend on the segment type:

**Simple Mode:**

- ✅ Person attributes (name, email, location)
- ✅ Event context (event title, date, location)
- ✅ Group context (group name, member role)
- ✅ Campaign context (campaign title)

**PostHog Cohorts:**

- ✅ Person attributes only (name, email, location)
- ❌ No event/group/campaign context

> **Why the limitation?** PostHog cohorts return a list of users without maintaining the relationship context to specific events or groups.

## Key Differences

| Feature               | Simple Mode                    | PostHog Cohorts   |
| --------------------- | ------------------------------ | ----------------- |
| **Complexity**        | Predefined selections          | Complex queries   |
| **Person attributes** | ✅                             | ✅                |
| **Event context**     | ✅ Event title, date, location | ❌                |
| **Group context**     | ✅ Group name, role            | ❌                |
| **Campaign context**  | ✅ Campaign title              | ❌                |
| **Behavioral data**   | ❌ Limited                     | ✅ Full analytics |
| **Custom queries**    | ❌ Predefined only             | ✅ Unlimited      |

## When to Use Which Mode

**Use Simple Mode for:**

- Sending emails to simple segments, such as "all group members" or "event attendees"
- Dynamic event properties: "See you at {event.title} on {event.date}"
- Dynamic group properties: "Welcome to {group.name}"
- Dynamic campaign properties: "{campaign.title} is launching!"

**Use PostHog Cohorts for:**

- Behavioral segmentation (active vs. inactive users)
- Complex filtering (multiple conditions and criteria)
- Analytics-driven targeting
- Person-property-only emails: "Hi {person.first_name}, we miss you!"

## Related Documentation

- **[Database Schema](../../database/segments.md)** - Complete database structure
