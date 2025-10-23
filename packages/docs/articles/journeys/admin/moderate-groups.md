# Admin: Moderate Groups

> **Note:** The UX for moderating emails, groups, and events should be as similar as possible. UI elements and code should be reused where possible to create a consistent user experience and reduce maintenance.

## Overview

An admin reviews and approves or rejects groups created by organizers to ensure quality and appropriateness.

## Prerequisites

- User is authenticated
- User has admin permissions
- Group exists with status "pending_approval" (if moderation required)

## User Story

```
As an admin
I want to moderate groups before they go live
So that I can ensure quality communities and prevent abuse
```

## Step-by-Step Flow

1. Admin receives notification:
   - Email or in-app notification: "New group pending approval"
   - Contains: Group name, organizer, member count
   - Link to: Moderation queue

2. Admin navigates to moderation queue:
   - Goes to `/admin/groups/pending`
   - Sees: List of pending groups
   - Columns: Name, organizer, type, submitted date
   - Can: Sort and filter pending groups
   - Click: Group to review details

3. Admin clicks on group to review:
   - System navigates to group edit page
   - Group edit view shown with moderation section
   - Sees: Full group information
   - Name, description, type, location
   - Group settings (public/private, join requirements)
   - Group image/banner
   - Sees: Link to organizer's profile
   - Can: View group as it will appear publicly

4. Admin reviews group:
   - Checks: Appropriate name and description
   - Checks: No duplicate groups
   - Checks: Valid purpose and guidelines
   - Checks: No hate speech or discriminatory content
   - Checks: Complies with community guidelines
   - Checks: Organizer credibility
   - Can: Click link to view organizer's profile (with group history)

5. Admin makes decision:
   - Option 1: Approve group
   - Option 2: Reject group with reason
   - Option 3: Request changes
   - Can: Add internal notes

6. If admin approves:
   - Clicks "Approve Group" button
   - Optional: Add approval note or category tag
   - Confirmation modal: "Approve this group?"
   - Clicks "Confirm Approval"
   - System updates group status to "published"
   - Group appears in public listings
   - Organizer notified: "Group approved"
   - Success: "Group approved and published"

7. If admin rejects:
   - Clicks "Reject Group" button
   - Modal: Enter rejection reason (required)
   - Note: Rejection categories to be determined based on actual usage
   - Detailed reason field (text area)
   - Clicks "Confirm Rejection"
   - System updates status to "rejected"
   - Organizer notified with reason
   - Group not published

8. If admin requests changes:
   - Clicks "Request Changes" button
   - Modal: Enter requested changes (required)
   - Specific feedback (text area)
   - Examples: Clarify purpose, update guidelines, change name
   - Clicks "Send Feedback"
   - System updates status to "changes_requested"
   - Organizer notified with feedback
   - Organizer can edit and resubmit

## Alternative Flows

### If group is duplicate:
- Admin identifies existing similar group
- Can: Link to original group
- Suggests: Organizer join existing group instead
- Rejection includes link to alternative

### If group name is inappropriate:
- Admin can: Suggest alternative name
- Requests: Name change
- Keeps other details approved
- Organizer updates and resubmits

### If group is duplicate:
- Admin identifies existing similar group
- Can: Link to original group
- Suggests: Organizer join existing group instead
- Rejection includes link to alternative

### If group name is inappropriate:
- Admin can: Suggest alternative name
- Requests: Name change
- Keeps other details approved
- Organizer updates and resubmits

### If auto-flagged by system:
- System flags suspicious groups
- Warning badge shown
- Admin reviews flag reason
- Can: Override if legitimate

### If setting category/tags:
- Admin can: Add category tags during approval
- Helps: Group discovery and organization
- Tags visible on group page
- Improves: Search and filtering

## Success Criteria

- Group reviewed and decision made
- Appropriate status set (published/rejected/changes_requested)
- Organizer notified of decision
- If approved, group visible in listings
- If rejected, reason clearly communicated
- All actions logged for audit
- PostHog events tracked: "group_moderated", "group_approved", "group_rejected"

## Related Journeys

- [Create Group](../groups/create.md) - Understanding group creation
- [Moderate Events](./moderate-events.md) - Similar moderation flow
- [Moderate Emails](./moderate-emails.md) - Email moderation
- [Manage Defaults](./manage-defaults.md) - Setting moderation policies

## Technical Notes

- API: `PATCH /api/admin/groups/[id]/moderate`
- Database: Updates `groups`, creates `moderation_logs`
- Auth: Requires admin permissions
- Notifications: Organizer notified via email and in-app
- Audit: All moderation actions logged with admin ID
- Flags: Automated flagging for suspicious content
- Duplicate detection: Algorithm suggests potential duplicates
- Analytics: PostHog tracks moderation metrics
