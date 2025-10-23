# Event Organizer: Create Event

## Overview

An authenticated user creates a new event to gather attendees for a specific activity, meeting, or gathering.

## Prerequisites

- User is authenticated
- User has permission to create events (organizer role)
- User may be part of a group or campaign

## User Story

```
As an event organizer
I want to create an event
So that I can gather attendees and organize activities
```

## Step-by-Step Flow

1. User navigates to `/events/new` or clicks "Create Event" button
   - Sees: Event creation form
   - Can: Fill in event details

2. User fills out event details:
   - Event Title (text input, required, min 5 characters)
   - Description (rich text editor, required, min 20 characters)
   - Date & Time (date/time picker, required)
   - Location (text input with autocomplete, required)
   - Event Type (dropdown: in-person, virtual, hybrid)
   - Capacity Limit (number input, optional)
   - Custom signup questions (optional, can add multiple)
   - System validates each field on blur

3. User sets event visibility and permissions:
   - Public/Private toggle
   - Require approval for signups (checkbox)
   - Associated group/campaign (dropdown, optional)
   - System shows preview of how event will appear

4. User clicks "Create Event"
   - System validates all required fields
   - System creates Event record in database
   - System assigns user as event organizer
   - System generates unique event slug
   - Success: User redirected to `/events/[slug]`
   - Sees: Success notification with "Event created successfully"

5. System sends notification (if applicable):
   - If event is associated with a group, group members receive notification
   - Email contains: Event details and signup link
   - PostHog tracks: "event_created"

## Alternative Flows

### If validation fails:
- System displays inline error messages below invalid fields
- User can correct errors and retry
- Form data is preserved

### If user saves as draft:
- User clicks "Save as Draft" button
- Event created with status "draft"
- User redirected to `/events/[slug]/manage`
- Event not visible to public until published

### If user cancels creation:
- Modal/confirmation dialog appears: "Discard changes?"
- User confirms: Redirected to previous page
- User cancels: Remains on creation form

### If user lacks permissions:
- System displays error: "You need organizer permissions to create events"
- Shows link to request organizer access
- User remains on current page

## Success Criteria

- Event record created in database with status "published"
- User assigned as event organizer
- Unique slug generated and accessible
- Event appears in event listings (if public)
- Associated group members notified (if applicable)
- PostHog event tracked: "event_created"

## Related Journeys

- [Manage Event](./manage.md) - Organizer manages created event
- [Sign Up for Event](./sign-up.md) - How users will sign up
- [Discover Events](./discover.md) - How event appears in listings
- [Create Group](../groups/create.md) - Creating a group first

## Technical Notes

- API: `POST /api/events`
- Database: Creates `events`, updates `event_organizers`
- Auth: Requires authenticated user with organizer permissions
- Validation: Server-side validation for all fields
- Storage: Event images uploaded to cloud storage
- Analytics: PostHog tracks event creation funnel
