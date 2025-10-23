# Recipient: View Email

## Overview

A recipient receives and views an email sent by an organizer through the platform.

## Prerequisites

- User is a recipient (event attendee, group member, or campaign supporter)
- Email has been sent by organizer
- User's email address is valid

## User Story

```
As an email recipient
I want to view the email sent to me
So that I can read the information and take action if needed
```

## Step-by-Step Flow

1. User receives email in inbox:
   - Sees: Email in inbox from platform
   - Subject line visible
   - From: "[Organizer Name] via [Platform Name]"
   - Preview text visible in inbox

2. User opens email:
   - Email displays in email client
   - Sees: Header with organizer info
   - Sees: Email content (formatted)
   - Sees: Any images, links, or buttons
   - Sees: Footer with unsubscribe link

3. User reads email content:
   - Content displays with proper formatting
   - Images load (or show alt text)
   - Links are clickable
   - Call-to-action buttons prominent
   - Can: Click links to take action

4. User can interact with email:
   - Click links: Opens in browser
   - Click CTA buttons: Takes to relevant page
   - Click "View Online": Opens web version in browser
   - Reply to email: Goes to organizer (if reply-to set)

5. User can manage preferences:
   - Click "Unsubscribe" link at bottom
   - Taken to: Unsubscribe preferences page
   - Can: Unsubscribe from this sender or all
   - Can: Update email preferences

6. If user clicks "View Online":
   - Opens: `/emails/[id]/view` in browser
   - Sees: Email content in clean web format
   - Same content as email
   - Can: Share link with others
   - Can: Print or save

## Alternative Flows

### If user unsubscribes:
- Clicks "Unsubscribe" link
- Taken to unsubscribe page
- Options shown:
  - Unsubscribe from this group/event/campaign
  - Unsubscribe from all emails
  - Manage email preferences
- User selects option
- Confirmation: "You've been unsubscribed"
- Future emails not sent to user

### If user reports spam:
- User marks email as spam in email client
- Platform receives spam report
- Admin notified of spam report
- Organizer flagged if multiple reports
- User automatically unsubscribed

### If email contains broken links:
- User clicks link, gets 404 error
- Can: Report broken link
- Platform logs issue
- Organizer notified

### If images don't load:
- Email client blocks images by default
- User sees: "Display images" prompt
- User clicks to display
- Images load
- Alt text shown if blocked

### If user replies to email:
- If reply-to set: Goes to organizer's email
- If no reply-to: Goes to no-reply address
- Auto-response sent explaining contact method
- User directed to platform for communication

### If tracking enabled:
- Email open tracked when images load
- Link clicks tracked
- Data used for organizer analytics
- User can opt-out in preferences

## Success Criteria

- Email delivered to inbox (not spam)
- Content displays correctly
- Links and buttons work
- User can take intended actions
- Unsubscribe option available and functional
- Email tracked (if enabled and consented)

## Related Journeys

- [Create Email](./create.md) - How email was created
- [Send Email](./send.md) - How email was sent
- [Manage Profile](../auth/profile.md) - Updating email preferences
- [Join Campaign](../campaigns/join.md) - Context for campaign emails

## Technical Notes

- Email delivery: Via Resend API
- Tracking: Open and click tracking (if enabled)
- Unsubscribe: One-click unsubscribe compliant
- Links: UTM parameters for analytics
- Reply-to: Configurable per email
- Web view: Hosted email version available
- Preferences: Per-user email settings stored in DB
- Analytics: Engagement metrics tracked
