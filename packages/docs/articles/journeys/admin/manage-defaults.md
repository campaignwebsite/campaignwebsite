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
   - Sections: General, Moderation, Email, Events, Groups, Campaigns
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
   - Tracking settings (open/click tracking)
   - Rate limits per organizer
   - Maximum recipients per send
   - Required approval threshold (e.g., >500 recipients)

6. Admin manages Event Defaults:
   - Default event visibility (public/private)
   - Default RSVP settings
   - Maximum capacity limit
   - Event image requirements
   - Required fields for event creation
   - Default reminder schedules

7. Admin manages Group Defaults:
   - Default group visibility
   - Default join settings (open/approval/invite)
   - Maximum group size
   - Group image requirements
   - Required fields for group creation
   - Default member permissions

8. Admin manages Campaign Defaults:
   - Default campaign visibility
   - Default supporter settings
   - Campaign duration limits
   - Required fields for campaign creation
   - Fundraising settings (if applicable)
   - Petition settings (if applicable)

9. Admin saves changes:
   - Clicks "Save Changes" button
   - Confirmation modal: "Update platform settings?"
   - Shows: Summary of changes
   - Clicks "Confirm"
   - System validates settings
   - Settings updated in database
   - Success: "Settings updated successfully"
   - All users affected by changes

10. Admin can review changes:
    - Audit log shows: All setting changes
    - Shows: Who changed what and when
    - Can: Revert to previous settings
    - Can: Export settings configuration

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

### If exporting configuration:
- Clicks "Export Settings"
- System generates JSON/YAML file
- File downloaded
- Can: Use for backup or migration

### If importing configuration:
- Clicks "Import Settings"
- File upload dialog
- Selects configuration file
- System validates format
- Preview changes shown
- Confirms import
- Settings updated

### If bulk updating:
- Can: Select multiple settings
- Apply common value
- Confirmation required
- Changes applied together

### If setting conflicts:
- System detects incompatible settings
- Warning shown
- Explains conflict
- Suggests resolution
- Admin must resolve before saving

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
- Validation: Server-side for all settings
- Audit: All changes logged with admin ID and timestamp
- Cache: Settings cached for performance
- Propagation: Changes take effect immediately
- Backup: Automatic backup before changes
- Analytics: PostHog tracks setting changes and usage
