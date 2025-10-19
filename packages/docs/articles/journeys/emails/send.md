# Organizer: Send Email

## Overview

An organizer sends a composed email to their community members through the platform's email system.

## Prerequisites

- User is authenticated
- User is organizer with send permissions
- Email has been created/composed
- Recipients have been selected

## User Story

```
As an organizer
I want to send an email to my community
So that I can communicate updates and important information
```

## Step-by-Step Flow

1. User is on email review page:
   - Sees: Full email preview
   - Sees: Recipient count and breakdown
   - Sees: Sending options (now, scheduled, draft)
   - Can: Edit email or proceed to send

2. User confirms email details:
   - Reviews subject line
   - Reviews email content in preview
   - Verifies recipient selection is correct
   - Checks sending time (immediate or scheduled)
   - Can: Send test email first

3. User clicks "Send Email" button:
   - Confirmation modal appears
   - Shows: "Send to [count] recipients?"
   - Shows: Warning if large recipient list
   - Buttons: "Cancel", "Send Email"

4. User confirms send:
   - Clicks "Send Email" in modal
   - System validates final checks:
     - User has send permissions
     - Recipients exist and valid
     - Email content meets requirements
     - No spam triggers detected

5. System processes email:
   - Creates email send job in queue
   - Generates individualized emails with merge tags
   - Batches emails for sending
   - Updates email status to "sending"
   - UI shows: Progress indicator

6. System sends emails:
   - Sends via Resend API in batches
   - Tracks: Sent, bounced, failed
   - Updates: Real-time sending progress
   - Handles: Rate limiting and retries

7. User sees confirmation:
   - Success notification: "Email sent to [count] recipients"
   - Redirected to: Email history/details page
   - Can: View sending status and stats
   - Can: See delivery metrics

8. Email details page shows:
   - Sent count and percentage
   - Delivery status (delivered, bounced, failed)
   - Open rate (if tracking enabled)
   - Click rate on links
   - Any errors or issues

## Alternative Flows

### If admin approval required:
- Instead of sending, email submitted for review
- Status: "pending_approval"
- Admin receives notification
- User sees: "Submitted for approval"
- User notified when approved/rejected

### If sending fails:
- Error notification with reason
- Email status: "failed"
- Can: Retry sending
- Can: Edit and resend
- Error logged for review

### If email scheduled for later:
- Email queued with scheduled time
- Status: "scheduled"
- User can: Edit or cancel before send time
- System sends at scheduled time
- User notified when sent

### If user cancels during send:
- If still in queue: Cancel succeeds
- If already sending: Cannot cancel
- Shows: How many sent before cancel
- Partial sends tracked

### If recipient list changes:
- Warning: Recipients changed since creation
- Shows: New count
- Asks: Proceed with new list?
- User can: Update or use original

### If spam detected:
- System flags potential spam content
- Warning: "Email may be flagged as spam"
- Suggests: Modifications
- User can: Edit or proceed anyway

## Success Criteria

- Email sent to all valid recipients
- Sending status tracked accurately
- Delivery metrics available
- Failed sends logged with reasons
- Email record updated with sent status
- PostHog events tracked: "email_sent", "email_delivered"

## Related Journeys

- [Create Email](./create.md) - Email composition
- [Moderate Email](./moderate.md) - Approval process
- [View Email](./view.md) - Recipient experience
- [Manage Campaign](../campaigns/manage.md) - Campaign communications

## Technical Notes

- API: `POST /api/emails/[id]/send`
- Database: Updates `emails`, creates `email_sends`
- Email Service: Resend API for delivery
- Queue: Background job processing
- Batching: Sends in batches of 100
- Rate limiting: Respects service provider limits
- Tracking: Opens and clicks tracked (if enabled)
- Retry logic: Failed sends retried up to 3 times
- Analytics: PostHog tracks send completion and errors
