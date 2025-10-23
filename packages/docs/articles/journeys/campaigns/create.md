# Campaign Organizer: Create Campaign

## Overview

A campaign organizer creates a new campaign to mobilize people around a cause, issue, or goal.

## Prerequisites

- User is authenticated
- User has admin permissions
- User may have existing groups or events

## User Story

```
As a campaign organizer
I want to create a campaign
So that I can mobilize people around a cause
```

## Step-by-Step Flow

1. User navigates to `/campaigns/new` or clicks "Create Campaign" button
   - Sees: Campaign creation wizard/form
   - Can: Fill in campaign details step by step

2. User completes Step 1 - Basic Information:
   - Campaign Name (text input, required, min 5 characters)
   - Tagline (text input, required, max 100 characters)
   - System validates fields on blur
   - Button: "Next" to continue

3. User completes Step 2 - Detailed Description:
   - Short Description (textarea)
   - Page Content (rich text editor, not required, no min characters)
   - Button: "Next" to continue

4. User completes Step 3 - Campaign Settings:
   - Visibility (public/private)
   - Geographic focus (location picker, optional)

5. User completes Step 4 - Initial Setup (optional):
   - Associate existing groups (multi-select)
   - Link existing events (multi-select)
   - Add co-organizers (search users, multi-select)
   - Set up social media links
   - Can skip this step

6. User reviews and creates:
   - Sees: Preview of campaign page
   - Can: Go back to edit any section
   - User enters custom slug for campaign
   - Clicks "Create Campaign"
   - System validates all required fields
   - System creates Campaign record
   - Success: Redirected to `/campaigns/[slug]`
   - Sees: Success notification with next steps

7. System prompts next actions:
   - Invite initial supporters
   - Create first campaign event
   - Share on social media
   - User can complete or skip

## Alternative Flows

### If validation fails:
- System displays inline error messages
- User returned to relevant step
- Can correct errors and continue
- Progress saved between steps

### If user saves as draft:
- "Save Draft" button available on each step
- Campaign created with status "draft"
- User can return later to complete
- Draft accessible from dashboard

### If user cancels creation:
- Confirmation dialog: "Save as draft or discard?"
- Save as draft: Campaign saved
- Discard: All data lost
- Cancel: Returns to form

### If user lacks permissions:
- Error: "You need admin permissions to create campaigns"
- Link to request permissions
- Cannot proceed with creation

### If campaign name already exists:
- Error: "A campaign with this name exists"
- Suggests alternative names
- User can modify and retry

## Success Criteria

- Campaign record created with status "published"
- User assigned as campaign organizer
- Custom slug set and accessible
- Campaign appears in listings (if public)
- Associated groups/events linked
- PostHog event tracked: "campaign_created"

## Related Journeys

- [Manage Campaign](./manage.md) - Managing created campaign
- [View Campaign](./view.md) - How campaign appears
- [Create Event](../events/create.md) - Creating campaign events
- [Create Group](../groups/create.md) - Creating campaign groups

## Technical Notes

- API: `POST /api/campaigns`
- Database: Creates `campaigns`, `campaign_organizers`
- Auth: Requires organizer permissions
- Validation: Multi-step validation
- Storage: Images/videos uploaded to cloud storage
- Slug: Generated from name with uniqueness check
- Analytics: PostHog tracks creation funnel steps
