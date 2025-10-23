# User: Sign In

> **Note:** See notes in the register.md file regarding anonymous accounts and authentication flow redesign.

## Overview

A returning user signs in to access their account and platform features using passkey authentication.

## Prerequisites

- User has an existing account
- User has previously registered
- User is not currently authenticated

## User Story

```
As a returning user
I want to sign in to my account
So that I can access my events, groups, and preferences
```

## Step-by-Step Flow

1. User navigates to sign in:
   - Clicks "Sign In" in navigation
   - Or: Redirected when accessing protected resource
   - System shows: Sign in page/modal at `/auth/signin`

2. User sees sign in interface:
   - Email input field (primary)
   - "Continue" or "Sign In" button
   - Links: "Need an account? Sign up"
   - Clean, simple interface

3. User enters email:
   - Types email address
   - System validates: Email format
   - Clicks "Continue"
   - System checks: Email exists in database

4. System initiates authentication:
   - If passkey available: Triggers passkey authentication
   - If no passkey: Sends magic link to email
   - Shows: Authentication method used

5. User completes authentication:
   
   **Option A: Passkey (WebAuthn)**
   - Browser/device prompts: Biometric or PIN
   - User authenticates with fingerprint/face/PIN
   - System validates: Passkey signature
   - Authentication complete
   
   **Option B: Magic Link (Email)**
   - User receives email
   - Clicks link in email
   - Opens: Authentication confirmation page
   - Session established

6. User authenticated successfully:
   - Success notification: "Signed in successfully"
   - Session token created
   - If redirected from protected page: Returns to that page
   - If direct sign in: Goes to dashboard/home
   - Can: Access all account features

7. User can manage session:
   - "Remember me" option (extends session)
   - Session persists across browser sessions
   - Can: Sign out anytime
   - Can: View active sessions in settings

## Alternative Flows

### If email not found:
- Error: "No account found with this email"
- Offers: "Create an account" button
- Can: Try different email
- Prevents: Account enumeration (generic message)

### If passkey authentication fails:
- Error: "Authentication failed"
- Offers: "Try again" or "Send magic link instead"
- User can: Retry passkey
- User can: Use email fallback

### If magic link expires:
- Link valid for 15 minutes
- After expiry: "This link has expired"
- Offers: "Request new sign in link"
- User can: Start process again

### If user already signed in:
- Redirects to: Dashboard
- Message: "You're already signed in"
- Can: Continue using platform
- Can: Sign out and sign in as different user

### If multiple devices/sessions:
- User can sign in on multiple devices
- Each device gets own session
- Can: View all active sessions in settings
- Can: Sign out specific sessions

### If account is suspended:
- Error: "Account suspended"
- Explains: Reason and contact info
- Cannot: Complete sign in
- Link: Contact support

### If from protected page:
- After sign in
- Automatically returns to: Original page
- Can: Complete intended action
- Seamless continuation

## Success Criteria

- User authenticated successfully
- Session established and persisted
- User can access protected features
- Redirected to appropriate page
- PostHog event tracked: "user_signin"

## Related Journeys

- [Register](./register.md) - For first-time users
- [Manage Profile](./profile.md) - After signing in
- [Sign Up for Event](../events/sign-up.md) - Common reason to sign in
- [Join Group](../groups/join.md) - Another protected action

## Technical Notes

- API: `POST /api/auth/signin`
- Auth methods: Passkey (WebAuthn), Magic link (email)
- Database: Queries `people`, updates last_signin
- Passkey: WebAuthn API for biometric auth
- Magic link: Signed token valid 15 minutes
- Session: HTTP-only cookie, secure
- Token: JWT with user ID and permissions
- Refresh: Session refreshed on activity
- Analytics: PostHog tracks sign in method, success/failure
