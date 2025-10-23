# User: Manage Profile

## Overview

An authenticated user manages their profile information, preferences, and account settings.

## Prerequisites

- User is authenticated
- User has an existing account

## User Story

```
As a user
I want to manage my profile and preferences
So that I can keep my information current and control my experience
```

## Step-by-Step Flow

1. User navigates to profile:
   - Clicks profile icon/name in navigation
   - Selects "Settings" from dropdown
   - System navigates to `/settings`
   - Note: For admins, settings shows both personal and organization settings

2. User sees profile dashboard:
   - Tabs/sections: Personal Info, Email Preferences, Security
   - Quick overview: Profile completeness, recent activity
   - Can: Navigate between sections

3. User views Personal Info section:
   - Current information displayed
   - Fields editable:
     - First Name (text input)
     - Email Address (text input, requires verification if changed, must not already be linked to another account)
     - Phone Number (text input, optional)
     - Profile Photo (image upload)
     - Bio (text area, optional)
     - Location fields:
       - Postal Code
       - House Number
       - Street
       - City
       - Province
       - Country (shown only if organization country setting is "worldwide", autofilled based on IP)
   - "Save Changes" button

4. User edits personal information:
   - Clicks field to edit
   - Makes changes
   - System validates on blur
   - Clicks "Save Changes"
   - System updates database
   - Success: "Profile updated successfully"

5. User manages Email Preferences:
   - Switches to Email Preferences tab
   - Sees: List of email types
   - Toggles for each type:
     - Event updates and reminders
     - Group notifications
     - Updates from [Organization Name]
   - Changes auto-save
   - Can: Global "Unsubscribe from all" option

6. User manages Security settings:
   - Switches to Security tab
   - Sees: Active sessions list
   - Can: Sign out other sessions
   - Can: Set up passkey authentication
   - Can: View login history
   - Can: Download account data
   - Can: Delete account (with confirmation, deletes personal data)

7. User can manage passkeys:
   - Clicks "Set up passkey"
   - Browser prompts: Register biometric/PIN
   - System stores: Public key
   - Success: "Passkey added"
   - Can: Add multiple passkeys
   - Can: Remove passkeys
   - Can: Name passkeys (e.g., "iPhone", "Laptop")

## Alternative Flows

### If changing email:
- Enters new email address
- Clicks "Save Changes"
- Verification email sent to new address
- Must: Verify new email before it takes effect
- Old email remains until verified
- Success: "Verification email sent"

### If uploading profile photo:
- Clicks "Upload Photo" or photo area
- File picker opens
- Selects image file
- System validates: Size (max 5MB), format (jpg, png)
- Image uploaded and cropped
- Preview shown
- Clicks "Save"
- Photo updated

### If validation fails:
- Inline error messages shown
- Cannot save until fixed
- Specific field errors highlighted
- User can correct and retry

### If downloading account data:
- Clicks "Download My Data" in Privacy
- Confirmation modal: "This may take a few minutes"
- System generates: JSON/CSV export
- Email sent: When ready to download
- Download link in email
- Complies: With data portability regulations

### If deleting account:
- Clicks "Delete Account" in Security
- Warning modal: Explains consequences
- Note: Consider implications for linked data (events created by organizers should not be deleted; other admins should be able to take over ownership)
- Requires: Typing email to confirm
- Optional: Reason for leaving (feedback)
- Clicks "Permanently Delete"
- Account and personal data marked for deletion
- Data removed after grace period
- Confirmation email sent

### If verifying email or passkey:
- Email verification flow triggered when email changed
- Passkey verification required for certain actions
- User completes verification process
- Account verified

### If session management:
- Views all active sessions
- Each shows: Device, location, last active
- Can: Sign out individual session
- Can: Sign out all other sessions
- Current session cannot be signed out this way

## Success Criteria

- Profile information updated successfully
- Changes persisted to database
- Email preferences honored
- Privacy settings enforced
- Security features accessible
- PostHog events tracked: "profile_updated", "preferences_changed"

## Related Journeys

- [Register](./register.md) - Initial account creation
- [Sign In](./signin.md) - Accessing account
- [Join Group](../groups/join.md) - Profile shown in groups
- [Sign Up for Event](../events/sign-up.md) - Profile used for signups

## Technical Notes

- API: `PATCH /api/users/me`
- Database: Updates `people` record
- Auth: Requires authenticated session
- Validation: Server-side for all fields
- Email: Verification email for email changes
- Image upload: Cloud storage for photos
- Passkeys: WebAuthn API for registration
- Data export: Background job generates archive
- Account deletion: Soft delete with grace period
- Analytics: PostHog tracks profile changes
