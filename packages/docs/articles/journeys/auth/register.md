# User: Register

> **Note:** This user journey needs to be re-evaluated and redesigned. Key elements to include:
> - For groups and campaigns: Show email field with "Keep me updated" button for immediate subscription (without additional checkbox)
> - For events: "Sign up for event" button with additional checkbox for email opt-in
> - Ability to sign up for events and groups, and create events and groups, with an anonymous account
> - Converting anonymous account to verified account on email confirmation
> - Passkey requirement for submitting new event/group for review
> - When email address submitted doesn't exist: Show rest of form questions before email confirmation to reduce friction
> - Data linked to anonymous account until email confirmed

## Overview

A first-time visitor creates an account to participate in events, join groups, or support campaigns.

## Prerequisites

- User is not authenticated
- User has valid email address
- User is typically signing up for an event, group, or campaign

## User Story

```
As a first-time visitor
I want to create an account
So that I can participate in activities and save my information
```

## Step-by-Step Flow

1. User encounters registration trigger:
   - Trying to sign up for event
   - Trying to join group
   - Trying to support campaign
   - Or: Clicks "Sign Up" / "Register" in navigation
   - System detects: User not authenticated

2. User sees registration form/modal:
   - Full Name (text input, required, min 2 characters)
   - Email Address (email input, required, validated)
   - Phone Number (optional, phone format validation)
   - Context shown: What they're signing up for (if applicable)
   - Checkbox: Agree to terms of service
   - Checkbox: Opt-in to platform updates (optional)
   - System validates fields on blur

3. User fills out form and submits:
   - Enters required information
   - Checks terms of service agreement
   - Clicks "Create Account" or "Sign Up"
   - System validates all fields
   - System checks: Email not already registered

4. System creates account:
   - Creates Person record in database
   - Generates unique user ID
   - Creates session token
   - Sends verification email (optional)
   - Logs user in automatically

5. User sees success state:
   - Success notification: "Account created successfully"
   - If context exists: Completes original action (event signup, join group, etc.)
   - If no context: Redirected to dashboard or welcome page
   - Session established

6. User receives welcome email:
   - Contains: Welcome message, platform overview
   - Links to: Profile settings, help documentation
   - Contains: Email verification link (if not verified)
   - Suggests: Next actions to take

7. System completes registration:
   - User data stored
   - Session active
   - User can access platform features
   - If continuing previous action: That flow continues
   - PostHog tracks: "user_registered"

## Alternative Flows

### If email already exists:
- Error: "An account with this email already exists"
- Offers: "Sign in instead" link
- Can: Try different email
- Can: Reset password if forgotten

### If from event signup:
- After account creation
- System auto-completes event signup
- User sees: "You're signed up for [Event Name]"
- Email includes: Event details + account info

### If from group join:
- After account creation
- System auto-completes group join
- User added to group
- Sees: "You've joined [Group Name]"

### If from campaign support:
- After account creation
- System auto-adds as campaign supporter
- User sees: "You're supporting [Campaign Name]"
- Campaign updates subscribed

### If user cancels registration:
- Modal/form closes
- Original action canceled
- Returns to previous page
- Can: Try again later

### If validation fails:
- Inline error messages shown
- Specific field errors highlighted
- User can correct and retry
- Form data preserved

### If terms not accepted:
- Cannot submit form
- Error: "Please accept the terms of service"
- Link to view terms

### If using social signup (future):
- Option: Sign up with Google/Facebook
- OAuth flow initiated
- Account created with social data
- Same registration completion

## Success Criteria

- Person record created in database
- User authenticated with session
- Welcome email sent
- If applicable, original action completed
- User can access platform features
- PostHog event tracked: "user_registered"

## Related Journeys

- [Sign In](./signin.md) - For returning users
- [Manage Profile](./profile.md) - Updating account details
- [Sign Up for Event](../events/sign-up.md) - Common registration trigger
- [Join Group](../groups/join.md) - Another registration trigger

## Technical Notes

- API: `POST /api/auth/register`
- Database: Creates `people` record
- Auth: Session token generated and stored
- Validation: Email uniqueness checked
- Email: Welcome email via Resend
- Password: Not required (passkey-based auth planned)
- Session: HTTP-only cookie with token
- Analytics: PostHog tracks registration source, completion
