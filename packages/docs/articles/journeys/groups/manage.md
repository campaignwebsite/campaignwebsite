# Group Organizer: Manage Group

## Overview

A group organizer manages an existing group, including editing details, managing members, moderating content, and organizing group activities.

## Prerequisites

- User is authenticated
- User is the group organizer or has management permissions
- Group exists

## User Story

```
As a group organizer
I want to manage my group and its members
So that I can foster a healthy and engaged community
```

## Step-by-Step Flow

1. User navigates to `/groups/[slug]/manage`
   - Sees: Group management dashboard
   - Tabs: Details, Members, Events, Posts, Settings
   - Can: Edit group, manage members, moderate content

2. User views group details tab:
   - Sees: Current group information
   - Can: Click "Edit Group" to modify details
   - Sees: Group statistics (members, activity, growth)
   - Can: Update group image or banner

3. User edits group details (if needed):
   - Clicks "Edit" button
   - Form pre-filled with current values
   - Makes changes to fields
   - Clicks "Save Changes"
   - System validates and updates group
   - Success: "Group updated" notification

4. User manages members tab:
   - Sees: List of all members
   - Columns: Name, join date, role, activity
   - Can: Search/filter members
   - Can: View pending join requests (if approval required)
   - Can: Promote to moderator/organizer
   - Can: Remove members
   - Can: Export member list (CSV)

5. User handles join requests (if applicable):
   - Sees: Pending requests with member info
   - Views: Request message (if provided)
   - Can: Approve or deny request
   - Clicks approve: Member added, notification sent
   - Clicks deny: Request rejected, optional message

6. User manages group events:
   - Switches to Events tab
   - Sees: Upcoming and past group events
   - Can: Create new event for group
   - Can: Edit or cancel events
   - Shows: RSVP statistics

7. User moderates group posts:
   - Switches to Posts tab
   - Sees: All group posts and comments
   - Can: Pin important posts
   - Can: Delete inappropriate content
   - Can: Ban users from posting

8. User manages group settings:
   - Switches to Settings tab
   - Can: Change privacy settings
   - Can: Update join requirements
   - Can: Set member posting permissions
   - Can: Configure notifications
   - Can: Delete group (with confirmation)

## Alternative Flows

### If approving member request:
- Clicks "Approve" on pending request
- Member status changes to "active"
- Welcome email sent to new member
- Member can access group features

### If removing a member:
- Clicks "Remove" next to member
- Confirmation modal: "Remove [Name] from group?"
- User confirms: Member removed
- System sends notification (optional)
- Member loses access to private content

### If promoting to moderator:
- Selects member, clicks "Promote to Moderator"
- Confirmation dialog appears
- User confirms: Role updated
- Member gains moderation permissions
- Notification sent to promoted member

### If user lacks permissions:
- Shows error: "You don't have permission to manage this group"
- Redirects to group view page
- Contact group organizer option

### If deleting group:
- Clicks "Delete Group" in Settings
- Warning modal with consequences listed
- Requires typing group name to confirm
- User confirms: Group archived/deleted
- Members notified via email

## Success Criteria

- Organizer can view all group information
- Member list is accurate and manageable
- Join requests processed properly
- Group updates reflect on public page
- Members can be managed effectively
- PostHog events tracked: "group_edited", "member_added", "member_removed"

## Related Journeys

- [Create Group](./create.md) - Initial group creation
- [Join Group](./join.md) - Understanding member perspective
- [Create Event](../events/create.md) - Creating group events
- [Moderate Groups](../admin/moderate-groups.md) - Admin oversight

## Technical Notes

- API: `PATCH /api/groups/[id]`, `GET/POST/DELETE /api/groups/[id]/members`
- Database: Updates `groups`, manages `group_members`
- Auth: Requires organizer/moderator role
- Permissions: Hierarchical (organizer > moderator > member)
- Real-time: WebSocket for live member updates
- Export: CSV generation server-side
- Analytics: PostHog tracks management actions
