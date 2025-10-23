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
   - UI: Signup form modal opens (or navigates to `/events/[slug]/signup`)

3. User fills out signup form:
   - Full Name (text input, required, min 2 characters)
   - Email (email input, required, validated)
   - Phone (optional, phone format validation)
   - Custom questions (if event organizer added any)
   - System validates each field on blur

4. User clicks "Complete Signup"
   - System validates all fields
   - System creates Person record in database
   - System creates EventSignup record
   - System sends confirmation email
   - Success: Modal closes, user sees success notification
   - UI: "Sign Up" button changes to "You're signed up ✓"

5. User receives confirmation email
   - Contains: Event details, calendar link, cancellation link
   - Links to: Event page for updates

## Alternative Flows

### If email already exists:
- System creates EventSignup but links to existing Person
- System sends "You've signed up for another event" email
- User can sign in with passkey on next visit

### If event is full:
- "Sign Up" button shows "Join Waitlist"
- Creates EventSignup with waitlist status
- Different confirmation email sent

### If user cancels signup:
- Modal closes
- No data saved
- User remains on event page

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
- Auth: Creates session token for future visits
- Email: Uses Resend API
- Analytics: PostHog tracks signup funnel steps
