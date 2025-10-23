# Admin: Moderate Events

## Overview

An admin reviews and approves or rejects events submitted by organizers to ensure quality and appropriateness.

## Prerequisites

- User is authenticated
- User has admin permissions
- Event exists with status "pending_approval" (if moderation required)

## User Story

```
As an admin
I want to moderate events before they go live
So that I can ensure quality and prevent inappropriate content
```

## Step-by-Step Flow

1. Admin receives notification:
   - Email or in-app notification: "New event pending approval"
   - Contains: Event title, organizer, date
   - Link to: Moderation queue

2. Admin navigates to moderation queue:
   - Goes to `/admin/events/pending`
   - Sees: List of pending events
   - Columns: Title, organizer, date, location, submitted date
   - Can: Sort and filter pending events
   - Click: Event to review details

3. Admin clicks on event to review:
   - System navigates to event edit page
   - Event edit view shown with moderation section
   - Sees: Full event information
   - Title, description, date/time, location
   - Images and attachments
   - Sees: Link to organizer's profile
   - Sees: Link to associated group/campaign (if any)
   - Can: View event as it will appear publicly
   - Note: Post-approval editing may require versioning (future update)

4. Admin reviews event:
   - Checks: Appropriate content
   - Checks: Valid date/time and location
   - Checks: No spam or misleading information
   - Checks: Complies with community guidelines
   - Checks: Organizer credibility
   - Can: Click link to view organizer's profile (with event history)

5. Admin makes decision:
   - Option 1: Approve event
   - Option 2: Reject event with reason
   - Option 3: Request changes
   - Can: Add internal notes

6. If admin approves:
   - Clicks "Approve Event" button
   - Optional: Add approval note
   - Confirmation modal: "Approve this event?"
   - Clicks "Confirm Approval"
   - System updates event status to "published"
   - Event appears in public listings
   - Organizer notified: "Event approved"
   - Success: "Event approved and published"

7. If admin rejects:
   - Clicks "Reject Event" button
   - Modal: Enter rejection reason (required)
   - Note: Rejection categories to be determined based on actual usage
   - Detailed reason field (text area)
   - Clicks "Confirm Rejection"
   - System updates status to "rejected"
   - Organizer notified with reason
   - Event not published

8. If admin requests changes:
   - Clicks "Request Changes" button
   - Modal: Enter requested changes (required)
   - Specific feedback (text area)
   - Clicks "Send Feedback"
   - System updates status to "changes_requested"
   - Organizer notified with feedback
   - Organizer can edit and resubmit

## Alternative Flows

### If event needs urgent approval:
- Admin can flag as urgent
- Moves to top of queue
- Other admins notified
- Prioritized for review

### If event is spam:
- Admin marks as spam
- Organizer account flagged
- Admins can easily view flagged accounts and are notified about them
- Note: Account suspension is not automatic
- Logged for pattern analysis

### If event is duplicate:
- Admin can link to original event
- Suggests: Organizer join original
- Rejection reason includes link

### If event auto-flagged:
- System flags suspicious events
- Warning badge shown
- Admin can: Override if legitimate
- Note: Flagging criteria to be determined

## Success Criteria

- Event reviewed and decision made
- Appropriate status set (published/rejected/changes_requested)
- Organizer notified of decision
- If approved, event visible in listings
- If rejected, reason clearly communicated
- All actions logged for audit
- PostHog events tracked: "event_moderated", "event_approved", "event_rejected"

## Related Journeys

- [Create Event](../events/create.md) - Understanding event creation
- [Moderate Groups](./moderate-groups.md) - Similar moderation flow
- [Moderate Emails](./moderate-emails.md) - Email moderation
- [Manage Defaults](./manage-defaults.md) - Setting moderation policies

## Technical Notes

- API: `PATCH /api/admin/events/[id]/moderate`
- Database: Updates `events`, creates `moderation_logs`
- Auth: Requires admin permissions
- Notifications: Organizer notified via email and in-app
- Audit: All moderation actions logged with admin ID
- Queue: Real-time updates when events submitted
- Flags: Automated flagging for suspicious content
- Analytics: PostHog tracks moderation metrics
