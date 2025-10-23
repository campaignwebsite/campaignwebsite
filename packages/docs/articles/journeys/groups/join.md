# User: Join Group

## Overview

A user discovers a group and joins it to connect with like-minded people and participate in group activities.

## Prerequisites

- User is authenticated (or will create account during join)
- Group exists and is discoverable
- Group is accepting new members (or join requests)

## User Story

```
As a user
I want to join a group
So that I can connect with others who share my interests
```

## Step-by-Step Flow

1. User lands on `/groups/[slug]`
   - Sees: Group name, description, member count, recent activity
   - Sees: "Join Group" button (prominent)
   - Can: View group events and posts (if public)

2. User clicks "Join Group" button
   - System checks: User authentication status
   - If not authenticated: Redirects to sign in/register flow
   - If authenticated: Proceeds to join

3. System processes join request:
   - If group is open: User joins immediately
   - If group requires approval: Join request created
   - System creates GroupMember record
   - System sends notification to group organizers (if approval required)

4. User sees confirmation:
   - If joined immediately:
     - Success notification: "You've joined [Group Name]"
     - "Join Group" button changes to "Member ✓"
     - User can now access member-only content
   - If approval required:
     - Info notification: "Join request sent to group organizers"
     - "Join Group" button shows "Request Pending"

5. User receives confirmation email:
   - Contains: Group details, recent activity
   - Links to: Group page, notification settings
   - Suggests: Next actions (upcoming events, introduce yourself)

## Alternative Flows

### If user is already a member:
- "Join Group" button shows "Already a member"
- Can: Access member-only features
- Can: Leave group via settings

### If group is private and user not invited:
- "Join Group" button shows "Request to Join"
- User can send join request with message
- Group organizers receive notification
- User waits for approval

### If group is at capacity:
- "Join Group" button disabled
- Shows: "This group is full"
- Offers: Join waitlist option
- User notified when space available

### If user is banned from group:
- Error message: "You cannot join this group"
- No join button displayed
- Contact organizer option available

## Success Criteria

- GroupMember record created with appropriate status
- User can access member features (if approved)
- Group organizers notified (if approval required)
- Confirmation email delivered
- PostHog event tracked: "group_joined" or "group_join_requested"

## Related Journeys

- [Discover Groups](./discover.md) - How user found the group
- [Register](../auth/register.md) - If user needs to create account
- [Manage Group](./manage.md) - Organizer perspective
- [View Campaign](../campaigns/view.md) - Groups may be part of campaigns

## Technical Notes

- API: `POST /api/groups/[id]/members`
- Database: Creates `group_members` record
- Auth: Requires authenticated user
- Permissions: Checks group join settings
- Email: Welcome email sent via Resend
- Notifications: In-app and email to organizers
- Analytics: PostHog tracks join funnel steps
