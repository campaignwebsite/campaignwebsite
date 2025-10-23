# Admin: Moderate Emails

## Overview

An admin reviews and approves or rejects emails submitted by organizers before they are sent to recipients.

## Prerequisites

- User is authenticated
- User has admin permissions
- Email exists with status "pending_approval"

## User Story

```
As an admin
I want to review emails before they are sent
So that I can ensure quality and prevent abuse
```

## Step-by-Step Flow

1. Admin receives notification:
   - Email notification: "New email pending approval"
   - In-app notification badge
   - Contains: Organizer name, subject, recipient count
   - Link to: Moderation queue

2. Admin navigates to moderation queue:
   - Goes to `/admin/emails/pending`
   - Sees: List of pending emails
   - Columns: Subject, organizer, recipients, submitted date
   - Can: Sort and filter pending items
   - Click: Email to review details

3. Admin clicks on email to review:
   - System navigates to email edit page
   - Email edit view shown with moderation section
   - Sees: Full email preview (as recipients will see it)
   - Sees: Subject line and sender information
   - Sees: Recipient count and segments
   - Sees: Link to organizer's profile
   - Sees: Link to related event/group/campaign (if applicable)
   - Sees: Information about any previous rejections of this email
   - Note: Once approved for sending, editing is no longer possible

4. Admin reviews email content:
   - Checks: Content quality and appropriateness
   - Checks: No spam or misleading content
   - Checks: Complies with community guidelines
   - Checks: Proper formatting and links work
   - Can: Send test email to self
   - Can: Click link to view organizer's profile (with history)

5. Admin makes decision:
   - Option 1: Approve email
   - Option 2: Reject email with reason
   - Option 3: Request changes
   - Can: Add internal notes

6. If admin approves:
   - Clicks "Approve" button
   - Optional: Add approval note
   - Modal appears: "Send email now or later?"
   - Buttons: "Send Now", "Schedule for Later", "Cancel"
   - If "Send Now": Email queued immediately
   - If "Schedule for Later": Date/time picker shown
   - System updates status to "approved"
   - Organizer notified: "Email approved"
   - Success: "Email approved"

7. If admin rejects:
   - Clicks "Reject" button
   - Modal: Enter rejection reason (required)
   - Categories: Spam, inappropriate, guideline violation, other
   - Detailed reason field (text area)
   - Clicks "Confirm Rejection"
   - System updates status to "rejected"
   - Organizer notified with reason
   - Email not sent

8. If admin requests changes:
   - Clicks "Request Changes" button
   - Modal: Enter requested changes (required)
   - Specific feedback field (text area)
   - Clicks "Send Feedback"
   - System updates status to "changes_requested"
   - Organizer notified with feedback
   - Organizer can edit and resubmit

## Alternative Flows

### If email needs immediate attention:
- Admin can flag as urgent
- Moves to top of queue
- Other admins notified
- Higher priority for review

### If admin needs more context:
- Can: View related event/group/campaign via link
- Can: See organizer's previous emails on their profile
- Can: Check recipient complaints history on person's profile

### If email auto-flagged by system:
- Warning badge: "Flagged for review"
- Shows: Reason for flag (spam words, mass send)
- Admin can: Override flag if legitimate
- Logged for pattern analysis

## Success Criteria

- Email reviewed and decision made
- Appropriate status set (approved/rejected/changes_requested)
- Organizer notified of decision
- If approved, email queued for sending
- If rejected, reason clearly communicated
- All actions logged for audit
- PostHog events tracked: "email_moderated", "email_approved", "email_rejected"

## Related Journeys

- [Create Email](../emails/create.md) - Understanding email creation
- [Send Email](../emails/send.md) - What happens after approval
- [Manage Defaults](./manage-defaults.md) - Setting moderation policies
- [Moderate Events](./moderate-events.md) - Similar moderation flow

## Technical Notes

- API: `PATCH /api/admin/emails/[id]/moderate`
- Database: Updates `emails`, creates `moderation_logs`
- Auth: Requires admin permissions
- Notifications: Organizer notified via email and in-app
- Audit: All moderation actions logged
- Queue: Approved emails automatically queued
- Spam detection: Automated flags for admin review
- Analytics: PostHog tracks moderation metrics
