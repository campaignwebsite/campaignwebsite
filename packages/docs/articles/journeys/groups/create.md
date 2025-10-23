# Group Organizer: Create Group

## Overview

A user creates a new group to organize people around a shared interest, cause, or community.

## Prerequisites

- User is authenticated
- User has permission to create groups (organizer role)
- User may be part of a campaign

## User Story

```
As a group organizer
I want to create a group
So that I can build a community around shared interests
```

## Step-by-Step Flow

1. User navigates to `/groups/new` or clicks "Create Group" button
   - Sees: Group creation form
   - Can: Fill in group details

2. User fills out group details:
   - Group Name (text input, required, min 3 characters)
   - Description (rich text editor, required, min 20 characters)
   - Group Type (dropdown: interest, activism, social, professional)
   - Location (text input with autocomplete, optional)
   - Group Image (file upload, optional, max 5MB)
   - Tags (multi-select, optional)
   - System validates each field on blur

3. User sets group visibility and permissions:
   - Public/Private toggle
   - Member join settings (open, approval required, invite-only)
   - Member capacity limit (number input, optional)
   - Allow members to create events (checkbox)
   - System shows preview of how group will appear

4. User sets up initial group features:
   - Welcome message for new members (text area, optional)
   - Membership questions (optional, can add multiple)
   - Custom rules or guidelines (text area, optional)

5. User clicks "Create Group"
   - System validates all required fields
   - System creates Group record in database
   - System assigns user as group organizer
   - System generates unique group slug
   - Success: User redirected to `/groups/[slug]`
   - Sees: Success notification "Group created successfully"

6. System prompts next steps:
   - Invite initial members
   - Create first event
   - Customize group settings
   - User can skip or complete these steps

## Alternative Flows

### If validation fails:
- System displays inline error messages
- User can correct errors and retry
- Form data is preserved

### If user saves as draft:
- User clicks "Save as Draft" button
- Group created with status "draft"
- User redirected to `/groups/[slug]/manage`
- Group not visible until published

### If user cancels creation:
- Confirmation dialog: "Discard changes?"
- User confirms: Redirected to previous page
- User cancels: Remains on creation form

### If user lacks permissions:
- Error: "You need organizer permissions to create groups"
- Shows link to request organizer access

### If group name already exists:
- Error: "A group with this name already exists"
- Suggests alternative names
- User can modify name and retry

## Success Criteria

- Group record created with status "published"
- User assigned as group organizer
- Unique slug generated and accessible
- Group appears in listings (if public)
- User can invite members
- PostHog event tracked: "group_created"

## Related Journeys

- [Manage Group](./manage.md) - Managing the created group
- [Join Group](./join.md) - How users will join
- [Discover Groups](./discover.md) - How group appears
- [Create Event](../events/create.md) - Creating group events

## Technical Notes

- API: `POST /api/groups`
- Database: Creates `groups`, `group_members` (organizer)
- Auth: Requires authenticated user with organizer permissions
- Validation: Server-side validation for all fields
- Storage: Group images uploaded to cloud storage
- Slug: Generated from group name with uniqueness check
- Analytics: PostHog tracks creation funnel
