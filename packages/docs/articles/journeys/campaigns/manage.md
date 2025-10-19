# Campaign Organizer: Manage Campaign

## Overview

A campaign organizer manages an existing campaign, including editing details, viewing supporters, coordinating activities, and tracking progress toward goals.

## Prerequisites

- User is authenticated
- User is campaign organizer or has management permissions
- Campaign exists

## User Story

```
As a campaign organizer
I want to manage my campaign and track its progress
So that I can achieve our goals and engage supporters effectively
```

## Step-by-Step Flow

1. User navigates to `/campaigns/[slug]/manage`
   - Sees: Campaign management dashboard
   - Tabs: Overview, Supporters, Events, Groups, Communications, Analytics, Settings
   - Can: View stats, manage content, communicate

2. User views Overview tab:
   - Sees: Key metrics (supporters, events, groups, engagement)
   - Sees: Progress toward goals (fundraising, petition signatures)
   - Sees: Recent activity feed
   - Sees: Quick actions (create event, send update, invite supporters)
   - Charts: Growth over time, engagement trends

3. User views Supporters tab:
   - Sees: List of all campaign supporters
   - Columns: Name, join date, activity level, public/private
   - Can: Search and filter supporters
   - Can: Export supporter list (CSV)
   - Can: View pending support requests (if approval required)
   - Shows: Total supporter count and growth

4. User manages support requests (if applicable):
   - Sees: Pending requests with supporter info
   - Can: Approve or deny requests
   - Clicks approve: Supporter added, notification sent
   - Clicks deny: Request rejected

5. User views Events tab:
   - Sees: All campaign-related events
   - Filters: Upcoming, past, by organizer
   - Can: Create new campaign event
   - Can: Approve/reject event proposals
   - Shows: Total events and attendance stats

6. User views Groups tab:
   - Sees: Groups participating in campaign
   - Can: Invite existing groups
   - Can: Create new campaign group
   - Shows: Total groups and member reach

7. User sends communications:
   - Switches to Communications tab
   - Sees: Message history
   - Clicks "Send Update" button
   - Composes update with:
     - Subject line (required)
     - Message body (rich text)
     - Recipients (all supporters, specific segments)
     - Attachments (optional)
   - Clicks "Send"
   - System sends to selected recipients
   - Success: Update posted and emailed

8. User views Analytics tab:
   - Sees: Detailed metrics and charts
   - Engagement: Page views, shares, conversions
   - Demographics: Supporter locations, age groups
   - Trends: Growth rate, peak activity times
   - Can: Export analytics data

9. User manages campaign settings:
   - Switches to Settings tab
   - Can: Edit campaign details
   - Can: Update goals and metrics
   - Can: Change visibility settings
   - Can: Add/remove co-organizers
   - Can: Close or archive campaign

## Alternative Flows

### If editing campaign details:
- Clicks "Edit Campaign" button
- Form pre-filled with current values
- Makes changes
- Clicks "Save Changes"
- System validates and updates
- Success: "Campaign updated" notification

### If closing campaign:
- Clicks "Close Campaign" in Settings
- Confirmation modal with final report option
- User confirms: Campaign status changes to "closed"
- System generates final impact report
- Supporters notified via email
- Campaign page shows "Campaign Ended"

### If user lacks permissions:
- Error: "You don't have permission to manage this campaign"
- Redirects to campaign view page
- Contact organizer option available

### If creating campaign event:
- Clicks "Create Event" from dashboard
- Event creation form opens
- Campaign auto-associated
- Event appears in campaign events list

### If sending targeted update:
- Selects supporter segments
- Previews recipient count
- Can: Schedule for later
- System queues for sending

## Success Criteria

- Organizer can view all campaign metrics
- Supporter list is accurate and manageable
- Communications reach intended recipients
- Analytics provide actionable insights
- Campaign updates reflect on public page
- PostHog events tracked: "campaign_edited", "update_sent", "analytics_viewed"

## Related Journeys

- [Create Campaign](./create.md) - Initial campaign creation
- [View Campaign](./view.md) - Public campaign view
- [Send Email](../emails/send.md) - Detailed email flow
- [Manage Event](../events/manage.md) - Managing campaign events

## Technical Notes

- API: `PATCH /api/campaigns/[id]`, `GET /api/campaigns/[id]/supporters`
- Database: Updates `campaigns`, queries related tables
- Auth: Requires organizer role for campaign
- Email: Batch sending with rate limiting
- Analytics: Real-time data aggregation
- Export: CSV/PDF generation server-side
- Charts: Using charting library for visualizations
- Analytics: PostHog tracks all management actions
