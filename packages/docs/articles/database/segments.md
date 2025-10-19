# Segments Data Model

The `Segment` model represents a saved query that defines a list of people. Segments can be used for sending emails, exporting data, or displaying specific lists of people for organizing purposes. The model supports both simple built-in segments and integration with PostHog Cohorts for advanced segmentation.

## Fields

| Field                 | Type       | Can be null | Key                     | Description                                                                      |
| --------------------- | ---------- | ----------- | ----------------------- | -------------------------------------------------------------------------------- |
| `id`                  | `UUID`     | No          | Primary                 | Unique identifier for the segment.                                               |
| `organization_id`     | `UUID`     | No          | Foreign: `Organization` | Organization this segment belongs to.                                            |
| `name`                | `String`   | No          |                         | Name of the segment (e.g., "June Event Attendees")                               |
| `description`         | `String`   | Yes         |                         | Optional description of the segment purpose.                                     |
| `segment_type`        | `String`   | No          |                         | Type of segment: `simple` or `posthog_cohort`                                    |
| `target_type`         | `String`   | Yes         |                         | For simple segments: `everyone`, `organization`, `campaign`, `group`, or `event` |
| `target_id`           | `UUID`     | Yes         |                         | For simple segments: ID of the target entity (null for "everyone")               |
| `filters`             | `JSON`     | Yes         |                         | Optional array of filter conditions for simple segments (see below)              |
| `posthog_cohort_id`   | `String`   | Yes         |                         | PostHog cohort ID for external cohorts.                                          |
| `posthog_cohort_name` | `String`   | Yes         |                         | PostHog cohort name for display.                                                 |
| `created_by`          | `UUID`     | No          | Foreign: `Person`       | Person who created the segment.                                                  |
| `created_at`          | `DateTime` | No          |                         | Date and time created.                                                           |
| `updated_at`          | `DateTime` | No          |                         | Date and time last updated.                                                      |

## Segment Types

### Simple Segments (`segment_type = 'simple'`)

For built-in segments, you specify:

- `target_type`: The type of entity to query (`everyone`, `organization`, `campaign`, `group`, `event`)
- `target_id`: The UUID of the target entity (null for `everyone`)
- `filters`: Optional array of filter conditions to refine the results

#### Basic Examples (No Filters)

- **Everyone**: `target_type = "everyone"`, `target_id = null`, `filters = null`
- **Organization**: `target_type = "organization"`, `target_id = "org-uuid"`, `filters = null`
- **Campaign**: `target_type = "campaign"`, `target_id = "campaign-uuid"`, `filters = null`
- **Group**: `target_type = "group"`, `target_id = "group-uuid"`, `filters = null`
- **Event**: `target_type = "event"`, `target_id = "event-uuid"`, `filters = null`

#### Filter Examples

The `filters` field is a JSON array of filter objects. Each filter has:

- `table`: The table to filter on (e.g., `people`, `event_signups`, `group_members`)
- `field`: The field to filter on (e.g., `attendance`, `role`, `city`)
- `operator`: The comparison operator (`eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `notIn`)
- `value`: The value(s) to compare against

**Event attendees who actually attended:**

```json
{
  "target_type": "event",
  "target_id": "event-uuid",
  "filters": [
    {
      "table": "event_signups",
      "field": "attendance",
      "operator": "eq",
      "value": "attended"
    }
  ]
}
```

**Group members with organizer role:**

```json
{
  "target_type": "group",
  "target_id": "group-uuid",
  "filters": [
    {
      "table": "group_members",
      "field": "role",
      "operator": "in",
      "value": ["organizer", "co-organizer"]
    }
  ]
}
```

**Event attendees from a specific city:**

```json
{
  "target_type": "event",
  "target_id": "event-uuid",
  "filters": [
    {
      "table": "event_signups",
      "field": "attendance",
      "operator": "eq",
      "value": "attended"
    },
    {
      "table": "people",
      "field": "city",
      "operator": "eq",
      "value": "Amsterdam"
    }
  ]
}
```

**Multiple filters on same table (implicit AND):**

```json
{
  "target_type": "group",
  "target_id": "group-uuid",
  "filters": [
    {
      "table": "group_members",
      "field": "role",
      "operator": "eq",
      "value": "organizer"
    },
    {
      "table": "group_members",
      "field": "joined_at",
      "operator": "gte",
      "value": "2025-01-01"
    }
  ]
}
```

### PostHog Cohort Segments (`segment_type = 'posthog_cohort'`)

For PostHog cohort integration, the fields are:

- `posthog_cohort_id`: The cohort ID from PostHog (e.g., "12345")
- `posthog_cohort_name`: The cohort name for display purposes

These segments query PostHog's API to get the list of people in the cohort, then match them with local people by email or user ID.

## Available Attributes by Segment Type

The segment type determines which attributes are available for personalization in emails:

### Everyone (`target_type = "everyone"`)

Available attributes:

- Person attributes: `first_name`, `last_name`, `email`, `city`, `province`, etc.

### Organization (`target_type = "organization"`)

Available attributes:

- Person attributes: `first_name`, `last_name`, `email`, `city`, `province`, etc.
- Organization attributes: `name`, `slug`, etc.

### Campaign (`target_type = "campaign"`)

Available attributes:

- Person attributes: `first_name`, `last_name`, `email`, `city`, `province`, etc.
- Campaign attributes: `title`, `slug`, etc.
- Organization attributes: `name`, `slug`, etc.

### Group (`target_type = "group"`)

Available attributes:

- Person attributes: `first_name`, `last_name`, `email`, `city`, `province`, etc.
- Group attributes: `title`, `slug`, `location_name`, `language`, etc.
- Group member attributes: `role`, etc.
- Campaign attributes (if group belongs to campaign): `title`, `slug`, etc.
- Organization attributes: `name`, `slug`, etc.

### Event (`target_type = "event"`)

Available attributes:

- Person attributes: `first_name`, `last_name`, `email`, `city`, `province`, etc.
- Event attributes: `title`, `slug`, `start_time`, `end_time`, `location_address_short`, `location_address_full`, etc.
- Event signup attributes: `attendance`, etc.
- Group attributes: `title`, `slug`, `location_name`, `language`, etc.
- Campaign attributes (if event belongs to campaign): `title`, `slug`, etc.
- Organization attributes: `name`, `slug`, etc.

### PostHog Cohort (`segment_type = "posthog_cohort"`)

Available attributes:

- Person attributes only: `first_name`, `last_name`, `email`, `city`, `province`, etc.

**Note:** PostHog cohorts do not maintain relationship context, so event, group, and campaign attributes are not available. This is because cohorts return a list of users without the specific context of which event they attended or which group they're in.

## Relationships

### Belongs To

- A **Segment** belongs to an **Organization** via `organization_id` (required).
- A **Segment** is created by a **Person** via `created_by` (required).

### Referenced Entities

Segments don't have direct foreign key relationships to the entities they query. Instead:

- Simple segments reference entities via the `simple_config` JSON (using `target_type` and `target_id`).
- Advanced segments reference entities via filters in the `advanced_config` JSON.

This flexible approach allows segments to:

- Query across multiple entity types
- Be independent of specific entity lifecycles (if a group is deleted, the segment remains but returns different results)
- Evolve without schema migrations when adding new filter capabilities

## Query Execution

When a segment needs to be evaluated (e.g., to send an email or export data), the system uses Drizzle's dynamic query building to construct the appropriate query.

### Simple Segments

The base query depends on the `target_type`:

- **`everyone`**: `SELECT * FROM people WHERE organization_id = ?`
- **`organization`**: `SELECT * FROM people WHERE organization_id = ?`
- **`campaign`**: `SELECT * FROM people` joined with campaign-related entities
- **`group`**: `SELECT * FROM people JOIN group_members ON ...`
- **`event`**: `SELECT * FROM people JOIN event_signups ON ...`

Then, if `filters` exist, they are applied dynamically:

```typescript
import {
  and,
  eq,
  ne,
  gt,
  gte,
  lt,
  lte,
  inArray,
  notInArray,
  SQL,
} from 'drizzle-orm'

// Example: Building a query with dynamic filters
function buildSegmentQuery(segment: Segment) {
  // Build array of all WHERE conditions
  // Note: Drizzle automatically filters out undefined values from and()
  const conditions: (SQL | undefined)[] = []

  // Always filter by organization
  conditions.push(eq(people.organizationId, segment.organizationId))

  // Determine base query with joins
  let query = db.select().from(people).$dynamic()

  if (segment.targetType === 'event') {
    query = query.innerJoin(eventSignups, eq(eventSignups.personId, people.id))
    conditions.push(eq(eventSignups.eventId, segment.targetId))
  } else if (segment.targetType === 'group') {
    query = query.innerJoin(groupMembers, eq(groupMembers.personId, people.id))
    conditions.push(eq(groupMembers.groupId, segment.targetId))
  } else if (segment.targetType === 'campaign') {
    // Campaign requires joining through groups/events
    // Implementation depends on your campaign structure
  } else if (
    segment.targetType === 'everyone' ||
    segment.targetType === 'organization'
  ) {
    // No additional joins or conditions needed
    // Already filtered by organization_id
  }
  // ... other target types

  // Add filter conditions
  // Drizzle will automatically ignore undefined values
  if (segment.filters) {
    for (const filter of segment.filters) {
      conditions.push(buildCondition(filter))
    }
  }

  // Apply all conditions with AND
  // Drizzle automatically filters out undefined values
  query = query.where(and(...conditions))

  return query
}

// Map of table names to Drizzle table objects
const tableMap = {
  people,
  event_signups: eventSignups,
  group_members: groupMembers,
  // ... other tables
} as const

function buildCondition(filter: Filter): SQL | undefined {
  const { table, field, operator, value } = filter

  // Get the Drizzle table object
  const drizzleTable = tableMap[table as keyof typeof tableMap]
  if (!drizzleTable) {
    throw new Error(`Unknown table: ${table}`)
  }

  // Map to appropriate Drizzle operators
  switch (operator) {
    case 'eq':
      return eq(drizzleTable[field], value)
    case 'ne':
      return ne(drizzleTable[field], value)
    case 'gt':
      return gt(drizzleTable[field], value)
    case 'gte':
      return gte(drizzleTable[field], value)
    case 'lt':
      return lt(drizzleTable[field], value)
    case 'lte':
      return lte(drizzleTable[field], value)
    case 'in':
      return inArray(drizzleTable[field], value)
    case 'notIn':
      return notInArray(drizzleTable[field], value)
    default:
      throw new Error(`Unknown operator: ${operator}`)
  }
}
```

### PostHog Cohort Segments

For PostHog cohorts:

- Query PostHog API to get list of distinct_ids in the cohort
- Match distinct_ids with local people (typically by email)
- Return matched person records

## Available Filter Fields by Target Type

Different `target_type` values expose different tables and fields for filtering:

### Event (`target_type = "event"`)

**Table: `event_signups`**

- `attendance`: `"registered"`, `"attended"`, `"no-show"`
- `signup_date`: Date when they signed up
- `updated_at`: Last update time

**Table: `people`**

- `first_name`, `last_name`, `email`
- `city`, `province`
- `created_at`: When person record was created

### Group (`target_type = "group"`)

**Table: `group_members`**

- `role`: `"member"`, `"organizer"`, `"co-organizer"`, etc.
- `joined_at`: Date when they joined the group
- `updated_at`: Last update time

**Table: `people`**

- `first_name`, `last_name`, `email`
- `city`, `province`
- `created_at`: When person record was created

### Campaign (`target_type = "campaign"`)

**Table: `people`**

- `first_name`, `last_name`, `email`
- `city`, `province`
- `created_at`: When person record was created

**Note:** Campaign segments may involve complex joins through groups and events, so additional tables may become available depending on implementation.

### Organization / Everyone (`target_type = "organization"` or `"everyone"`)

**Table: `people`**

- `first_name`, `last_name`, `email`
- `city`, `province`
- `created_at`: When person record was created

**Note:** Filters are optional. If no filters are specified, all people matching the `target_type` and `target_id` are included.

## Attribute Discovery for Email Personalization

To determine which attributes are available for email personalization, use the `target_type` (not the filters). Filters refine **which people** are included, but don't change **which attributes** are available.

1. **For Simple Segments**: Use a predefined mapping based on `target_type` (see "Available Attributes by Segment Type" above).

2. **For PostHog Cohort Segments**: Only person attributes are available, as cohorts don't maintain relationship context to events, groups, or campaigns.

## PostHog Integration

PostHog cohort segments integrate with the [PostHog API](https://posthog.com/docs/api/cohorts) to provide advanced segmentation capabilities without building a custom query interface.

### Benefits

- 🚀 Powerful segmentation using PostHog's query builder
- 📊 Integration with PostHog's analytics ecosystem
- 🎯 Dynamic cohorts that update automatically
- ⚡ No need to build complex query UI

### Limitations

- Only person attributes available for email personalization
- Requires PostHog API calls (use caching)
- Some cohort members may not exist in local database
