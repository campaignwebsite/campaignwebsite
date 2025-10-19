# Organizer: Create Email

## Overview

An organizer creates an email message to communicate with their community (event attendees, group members, or campaign supporters).

## Prerequisites

- User is authenticated
- User is organizer of an event, group, or campaign
- User has recipients to send to

## User Story

```
As an organizer
I want to create an email message
So that I can communicate important information to my community
```

## Step-by-Step Flow

1. User navigates to communications section:
   - From event/group/campaign management dashboard
   - Clicks "Send Email" or "Create Message" button
   - System navigates to `/[entity]/[slug]/emails/new`

2. User sees email composition interface:
   - Email editor (rich text)
   - Subject line input
   - Recipient selector
   - Preview pane
   - Send options

3. User enters email details:
   - Subject Line (text input, required, max 200 characters)
   - From Name (pre-filled with organizer name, editable)
   - Reply-To Email (pre-filled, editable)
   - System validates on blur

4. User composes email body:
   - Rich text editor with formatting options
   - Can: Add bold, italic, links, lists
   - Can: Insert images (upload or URL)
   - Can: Use merge tags (recipient name, event details, etc.)
   - Can: Add call-to-action buttons
   - Live preview shows formatted email

5. User selects recipients:
   - Dropdown/checkboxes to select segments:
     - All members/attendees/supporters
     - Confirmed only (for events)
     - Active members (for groups)
     - By location/tag/custom criteria
   - Shows: Recipient count for selection
   - Can: Preview recipient list

6. User sets sending options:
   - Send now (immediate)
   - Schedule for later (date/time picker)
   - Save as draft
   - Test email (sends to organizer's email)
   - Checkbox: Require admin approval (if applicable)

7. User clicks "Review Email":
   - Shows: Full preview of email
   - Shows: Recipient count and segments
   - Shows: Sending time
   - Can: Send test email to self
   - Can: Go back to edit
   - Button: "Send Email" or "Submit for Approval"

8. User clicks "Send Email" or "Submit for Approval":
   - If no approval required:
     - Email queued for sending
     - Success: "Email sent to [count] recipients"
     - Redirected to email history
   - If approval required:
     - Email saved with status "pending_approval"
     - Admin notified for review
     - Success: "Email submitted for approval"
     - Can: View pending status

## Alternative Flows

### If user saves as draft:
- Clicks "Save as Draft"
- Email saved with status "draft"
- Can: Access from drafts list later
- No recipients notified

### If user sends test email:
- Clicks "Send Test"
- Modal: Enter test email addresses
- User enters email(s)
- System sends preview email
- Success: "Test email sent"
- User can review and continue editing

### If validation fails:
- Missing required fields highlighted
- Inline error messages shown
- Cannot proceed until fixed
- Draft auto-saved

### If user schedules email:
- Selects date/time in future
- Email queued for scheduled time
- Can: Edit or cancel before send time
- Notification sent when email goes out

### If recipient count is zero:
- Warning: "No recipients selected"
- Cannot send email
- Suggests checking filters
- Can: Adjust recipient selection

## Success Criteria

- Email record created in database
- Email content properly formatted
- Recipients correctly identified
- Email queued for sending (or pending approval)
- Draft saved if not sent
- PostHog event tracked: "email_created", "email_sent"

## Related Journeys

- [Send Email](./send.md) - Detailed sending process
- [Moderate Email](./moderate.md) - Admin approval process
- [View Email](./view.md) - Recipient perspective
- [Manage Event](../events/manage.md) - Context from event management

## Technical Notes

- API: `POST /api/emails`
- Database: Creates `emails` record
- Auth: Requires organizer permissions
- Validation: Subject required, recipients required
- Rich text: Sanitized HTML storage
- Merge tags: Replaced at send time
- Queue: Background job for sending
- Analytics: PostHog tracks email creation funnel
