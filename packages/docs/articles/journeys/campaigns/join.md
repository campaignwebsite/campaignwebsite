# User: Join Campaign

## Overview

A user joins a campaign to show support and participate in campaign activities.

## Prerequisites

- User is authenticated (or will create account during join)
- Campaign exists and is accepting supporters
- Campaign is published

## User Story

```
As a user
I want to join a campaign
So that I can support the cause and participate in activities
```

## Step-by-Step Flow

1. User lands on `/campaigns/[slug]`
   - Sees: Campaign information and goals
   - Sees: "Join Campaign" button (prominent)
   - Can: View campaign details before joining

2. User clicks "Join Campaign" button
   - System checks: User authentication status
   - If not authenticated: Redirects to sign in/register flow
   - If authenticated: Opens join confirmation modal

3. User sees join modal/form:
   - Shows: Campaign summary
   - Shows: What joining means (receive updates, access to events)
   - Optional: Reason for joining (text area)
   - Optional: Visibility setting (public support vs private)
   - Checkbox: Agree to receive campaign updates
   - Button: "Join Campaign"

4. User clicks "Join Campaign" in modal:
   - System validates inputs
   - System creates CampaignSupporter record
   - System subscribes user to campaign updates
   - Success: Modal closes with success animation
   - UI: "Join Campaign" button changes to "Supporting ✓"

5. User sees confirmation:
   - Success notification: "You're now supporting [Campaign Name]"
   - Shows: Suggested next actions (upcoming events, share campaign)
   - Can: Access supporter-only content
   - Profile shows campaign in "Campaigns" section

6. User receives confirmation email:
   - Contains: Welcome message, campaign overview
   - Links to: Campaign page, upcoming events
   - Suggests: Ways to get more involved
   - Includes: Unsubscribe option

## Alternative Flows

### If user is already supporting:
- "Join Campaign" button shows "Supporting"
- Can: View supporter dashboard
- Can: Leave campaign via settings

### If campaign requires approval:
- Join creates pending support request
- Campaign organizers receive notification
- User sees: "Request sent" message
- User notified when approved/denied

### If campaign is at supporter limit:
- Error: "This campaign has reached capacity"
- Option: Join waitlist
- User notified when space available

### If user wants public support:
- Toggle: "Show my support publicly"
- Name appears in supporters list
- Can: Add testimonial or message
- Shows on campaign page

### If user opts out of updates:
- Unchecks: "Receive campaign updates"
- Still joins campaign
- Won't receive emails
- Can change in profile settings

## Success Criteria

- CampaignSupporter record created
- User subscribed to updates (if opted in)
- Supporter count increments on campaign page
- Confirmation email delivered
- User can access supporter features
- PostHog event tracked: "campaign_joined"

## Related Journeys

- [View Campaign](./view.md) - How user discovered campaign
- [Register](../auth/register.md) - Creating account to join
- [Join Group](../groups/join.md) - Joining campaign groups
- [Sign Up for Event](../events/sign-up.md) - Attending campaign events

## Technical Notes

- API: `POST /api/campaigns/[id]/supporters`
- Database: Creates `campaign_supporters` record
- Auth: Requires authenticated user
- Email: Welcome email via Resend
- Notifications: In-app notification to organizers
- Privacy: Respects user visibility preferences
- Analytics: PostHog tracks join funnel steps
