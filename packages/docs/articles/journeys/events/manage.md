# Event Organizer: Manage Event

## Overview

An event organizer manages an existing event, including editing details, viewing signups, communicating with attendees, and handling event status.

## Prerequisites

- User is authenticated
- User is the event organizer or has management permissions
- Event exists

## User Story

```
As an event organizer
I want to manage my event and its attendees
So that I can ensure a successful event and communicate effectively
```

## Step-by-Step Flow

1. User navigates to `/events/[slug]/manage`
   - Sees: Event management dashboard
   - Tabs: Details, Attendees, Communications, Settings
   - Can: Edit event, view signups, send messages

2. User views event details tab:
   - Sees: Current event information
   - Can: Click "Edit Event" to modify details
   - Sees: Event status (published, draft, cancelled)
   - Can: Toggle event visibility

3. User edits event details (if needed):
   - Clicks "Edit" button
   - Form pre-filled with current values
   - Makes changes to any field
   - Clicks "Save Changes"
   - System validates and updates event
   - Success: "Event updated" notification appears

4. User views attendees tab:
   - Sees: List of all signups
   - Columns: Name, email, signup date, status
   - Can: Search/filter attendees
   - Can: Export attendee list (CSV)
   - Can: Manually add/remove attendees
   - Shows: Attendance statistics (confirmed, waitlist, cancelled)

5. User communicates with attendees:
   - Switches to Communications tab
   - Sees: Message history
   - Clicks "Send Message" button
   - Composes message with:
     - Subject line (required)
     - Message body (rich text)
     - Recipients (all attendees, confirmed only, waitlist)
   - Clicks "Send"
   - System sends email to selected attendees
   - Success: Message sent confirmation

6. User manages event settings:
   - Switches to Settings tab
   - Can: Change capacity limits
   - Can: Enable/disable new signups
   - Can: Toggle signup approval requirement
   - Can: Cancel event (with confirmation)
   - Changes auto-save or require confirmation

## Alternative Flows

### If user cancels event:
- Clicks "Cancel Event" in Settings
- Confirmation modal appears with warning
- User confirms: Event status changes to "cancelled"
- System sends cancellation email to all attendees
- Event page shows "This event has been cancelled"
- Signups closed automatically

### If event is full:
- Attendees tab shows "At capacity" badge
- New signups go to waitlist automatically
- Organizer can increase capacity
- System notifies waitlist when spots open

### If user lacks permissions:
- Shows error: "You don't have permission to manage this event"
- Redirects to event view page
- Contact event organizer button displayed

### If making conflicting changes:
- Another organizer editing simultaneously
- System detects conflict on save
- Shows: "Event was updated by another user"
- Offers: Reload to see current version

## Success Criteria

- Organizer can view all event information
- Attendee list is accurate and exportable
- Communications reach intended recipients
- Event updates reflect immediately on public page
- Status changes are properly handled
- PostHog events tracked: "event_edited", "attendees_viewed", "message_sent"

## Related Journeys

- [Create Event](./create.md) - Initial event creation
- [Send Email](../emails/send.md) - Detailed email sending flow
- [Sign Up for Event](./sign-up.md) - Understanding attendee perspective
- [Moderate Events](../admin/moderate-events.md) - Admin oversight

## Technical Notes

- API: `PATCH /api/events/[id]`, `GET /api/events/[id]/signups`
- Database: Updates `events`, queries `event_signups`
- Auth: Requires organizer role for event
- Email: Batch sending with rate limiting
- Real-time: WebSocket updates for concurrent editing
- Export: CSV generation server-side
- Analytics: PostHog tracks management actions
