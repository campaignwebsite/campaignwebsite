# Admin: Manage Defaults

## Overview

An admin manages organization-wide default settings, policies, and configurations that affect the entire platform.

Note: Many platform behaviors use well-designed app defaults rather than configurable settings to reduce complexity. For example:
- Events and groups default to public visibility (but can be set to private/hidden individually)
- Event capacity is unlimited by default (but can be limited per event)
- Email tracking is always enabled
- Duplicate detection is always enabled
- Spam detection uses AI-powered defaults

Moderation and permission requirements are controlled through role-based access rather than toggleable settings. See role documentation for details on permissions for organization admins, super admins, event organizers, group organizers, and regular users.

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
   - Note: This journey describes organization admin permissions. Additional permissions and settings available for super admins (to be defined in separate role documentation)

2. Admin sees settings dashboard:
   - Sections: General, Email, Analytics
   - Overview of current settings
   - Can: Navigate between sections

3. Admin manages General Settings:
   - Platform name and branding
   - Contact information
   - Support email address
   - Terms of service URL
   - Privacy policy URL
   - Default timezone
   - Default language

4. Admin manages Email Settings:
   - Resend integration:
     - API key configuration
     - Sending email address setup
     - Domain verification
   - Default sender name
   - Default reply-to address
   - Email footer content
   - Unsubscribe link settings
   - Moderation settings:
     - Email notifications for new items requiring approval
     - Expected review time (displayed to users submitting content)

5. Admin manages Analytics Settings:
   - PostHog integration:
     - Project API key
     - Instance URL (if self-hosted)
     - Enable/disable tracking
     - Custom event configuration

6. Admin saves changes:
   - Clicks "Save Changes" button
   - Confirmation modal: "Update platform settings?"
   - Shows: Summary of changes
   - Clicks "Confirm"
   - System validates settings
   - Settings updated in database
   - Success: "Settings updated successfully"
   - All users affected by changes

7. Admin can review changes:
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

- [Moderate Events](./moderate-events.md) - Using moderation review process
- [Moderate Groups](./moderate-groups.md) - Using moderation review process
- [Moderate Emails](./moderate-emails.md) - Using email approval process
- [Create Event](../events/create.md) - How event creators interact with platform

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
