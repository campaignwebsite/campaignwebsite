# Anonymous Visitor: Sign Up for Event

## Overview

An anonymous visitor discovers an event they want to attend and completes the signup process, creating an account in the process.

## Prerequisites

- User is not authenticated
- Event exists and is published
- Event has available signup slots (if limited)

## User Story

```
As an anonymous visitor
I want to sign up for an event
So that I can attend and receive event updates
```

## Step-by-Step Flow

1. User lands on `/events/[slug]`
   - Sees: Event title, description, date/time, location, organizer info
   - Sees: "Sign Up" button (prominent, above the fold)

2. User clicks "Sign Up" button
   - System checks: User authentication status
   - System navigates to `/events/[slug]/signup`

3. User fills out email (Step 1 of signup form):
   - Email (email input, required, validated)
   - System validates email format
   - User clicks "Continue"

4. User verifies email or signs in with passkey (Step 2):
   - If passkey exists for email:
     - User is prompted to sign in with passkey
     - User authenticates using passkey
   - If no passkey exists:
     - System creates temporary anonymous BetterAuth account
     - System sends magic link to email
     - User clicks magic link in email to verify
   - System checks if person with this email exists:
     - If exists: Links anonymous account to existing person record
     - If new: Creates new person record with email_verified = false

5. User fills out additional information (Step 3):
   - This step only shown if additional information required
   - Fields shown: First name, phone number, zip code, house number
   - Custom questions (if event organizer added any)
   - Known fields are prefilled, allowing changes
   - System validates each field on blur
   - User clicks "Complete Signup"

6. System processes signup:
   - System validates all fields
   - If person was new: Sets email_verified = true on person record
   - System creates EventSignup record linked to person
   - BetterAuth deletes anonymous account and creates permanent account
   - System updates person record to link to new account using onLinkAccount
   - System sends confirmation email
   - Success: User sees success notification on event page
   - UI: "Sign Up" button changes to "You're signed up ✓"

7. User receives confirmation email
   - Contains: Event details, calendar link, cancellation link
   - Links to: Event page for updates

## Alternative Flows

### If email already exists and person record exists:
- System creates EventSignup but links to existing Person
- Uses existing authentication (passkey if available)
- Note: For more details on passkey authentication, see the [Authentication documentation](../../components/auth/index.md)

### If event is full:
- "Sign Up" button shows "Join Waitlist"
- Creates EventSignup with waitlist status
- Confirmation email template differs for waitlist (see [Email Picker documentation](../../components/email/email-picker.md))
- No reminder emails sent while on waitlist
- If spot opens, separate notification email sent

### If user cancels signup:
- Page navigation allows using browser back button
- No data saved if form incomplete
- User returns to event page

### If validation fails:
- System displays inline error messages below invalid fields
- User can correct errors and retry
- Form data is preserved

## Success Criteria

- EventSignup record created with status "confirmed"
- Person record exists with email
- Confirmation email delivered
- User sees success state on page
- PostHog event tracked: "event_signup_completed"

## Related Journeys

- [Sign In](../auth/signin.md) - If returning user wants to sign in
- [Discover Events](./discover.md) - How user found this event
- [Manage Profile](../auth/profile.md) - User might want to update details later

## Technical Notes

- API: `POST /api/events/[id]/signups`
- Database: Creates/updates `people`, creates `event_signups`
- Auth: Uses BetterAuth anonymous plugin with magic link for email verification
- Auth: Links anonymous account to permanent account using onLinkAccount hook
- Email: Confirmation emails sent via Resend API (see [Email Picker](../../components/email/email-picker.md) for template hierarchy)
- Email: Timing - confirmation sent AFTER user completes Step 3 (additional information)
- Analytics: PostHog tracks signup funnel steps
- Form: Implements 3-step process as described in [Signup Form component](../../components/form/signup-form.md)
