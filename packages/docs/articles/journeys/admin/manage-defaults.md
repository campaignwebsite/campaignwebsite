# Admin: Manage Defaults

## Overview

An admin manages organization-wide default settings, policies, and configurations that affect the entire platform.

## Prerequisites

- User is authenticated
- User has admin permissions
- User has access to admin settings panel

## User Story

```
As an admin
I want to manage platform-wide default settings
So that I can maintain consistent policies and user experience
```

## Step-by-Step Flow

1. Admin navigates to admin panel:
   - Clicks admin icon/menu in navigation
   - Selects "Settings" or "Defaults"
   - System navigates to `/admin/settings`

2. Admin sees settings dashboard:
   - Sections: General, Moderation, Email, Events, Groups, Campaigns, Analytics
   - Overview of current settings
   - Can: Navigate between sections
   - Recent changes log visible

3. Admin manages General Settings:
   - Platform name and branding
   - Contact information
   - Support email address
   - Terms of service URL
   - Privacy policy URL
   - Default timezone
   - Default language
   - Changes auto-save or require confirmation

4. Admin manages Moderation Settings:
   - Moderation policies:
     - Require approval for events (toggle)
     - Require approval for groups (toggle)
     - Require approval for emails (toggle)
     - Require approval for campaigns (toggle)
   - Auto-moderation rules:
     - Spam detection sensitivity (slider)
     - Profanity filter (toggle and word list)
     - Duplicate detection (toggle)
   - Moderation queue settings:
     - Email notifications for new items
     - SLA targets for review time

5. Admin manages Email Settings:
   - Default sender name
   - Default reply-to address
   - Email footer content
   - Unsubscribe settings

6. Admin manages Event Defaults:
   - Default event visibility (public/private)
   - Default RSVP settings
   - Maximum capacity limit
   - Event image requirements
   - Required fields for event creation
   - Default reminder schedules

7. Admin manages Group Defaults:
   - Group image requirements
   - Required fields for group creation
   - Default member permissions
   - Note: Individual groups can be set as hidden, and can have approval or invite-only join settings
   - Note: Individual groups can have size limits; campaigns can set default group size limits

8. Admin manages Campaign Defaults:
   - Required fields for campaign creation

9. Admin manages Analytics Settings:
   - PostHog integration configuration
   - PostHog project API key
   - PostHog host URL
   - Event tracking settings
   - User identification settings

10. Admin saves changes:
   - Clicks "Save Changes" button
   - System validates settings
   - Settings updated in database
   - Success: "Settings updated successfully"
   - All users affected by changes

11. Admin can review changes:
    - Audit log shows: All setting changes
    - Shows: Who changed what and when

## Alternative Flows

### If validation fails:
- Error messages shown for invalid settings
- Cannot save until corrected
- Specific field errors highlighted
- User can fix and retry

### If reverting settings:
- Clicks "Revert to Default" for a section
- Confirmation: "Restore default settings?"
- Settings reset to platform defaults
- Success: "Settings reverted"

## Success Criteria

- Settings updated successfully
- Changes applied platform-wide
- Existing content respects new defaults
- New content uses updated defaults
- Changes logged in audit trail
- PostHog events tracked: "admin_settings_updated"

## Related Journeys

- [Moderate Events](./moderate-events.md) - Using moderation settings
- [Moderate Groups](./moderate-groups.md) - Using moderation settings
- [Moderate Emails](./moderate-emails.md) - Using email settings
- [Create Event](../events/create.md) - Affected by default settings

## Technical Notes

- API: `PATCH /api/admin/settings`
- Database: Updates `platform_settings` table
- Auth: Requires admin permissions
- Validation: Client and server-side validation for all settings
- Audit: All changes logged with admin ID and timestamp
- Propagation: Changes take effect immediately
- Analytics: PostHog tracks setting changes and usage
