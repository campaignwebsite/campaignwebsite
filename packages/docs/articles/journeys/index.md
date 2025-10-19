# User Journeys

This folder contains documentation for the different user journeys through the campaign website. Each journey describes a sequence of actions a user takes to accomplish a specific goal.

## How to Write User Journeys

User journeys should be written in a consistent, structured format that allows AI agents to understand and implement the flows. Follow this template:

### Journey Document Structure

Each journey file should contain:

#### 1. **Title and Overview**

- Start with a clear title using the format: `[User Role]: [Goal/Action]`
- Provide a 1-2 sentence overview of what the user wants to accomplish
- Specify the user's starting state (e.g., "anonymous visitor", "authenticated organizer")

#### 2. **Prerequisites**

List any conditions that must be true before this journey can begin:

- Authentication state (logged in/out)
- Required permissions or roles
- Existing data dependencies (e.g., "user must have created a group")

#### 3. **User Story**

Write a simple user story:

```
As a [user role]
I want to [goal]
So that [benefit/motivation]
```

#### 4. **Step-by-Step Flow**

Number each step sequentially. For each step, include:

- **Action**: What the user does (clicks, types, selects, etc.)
- **Page/Component**: Where this happens (page route or component name)
- **System Response**: What happens as a result
- **UI State Changes**: Any loading states, modals, notifications, redirects

**Format:**

```
1. User lands on `/page-url`
   - Sees: [description of what's visible]
   - Can: [available actions]

2. User clicks "Button Name" button
   - System: [validation/processing that occurs]
   - UI: [modal opens / page redirects / notification shows]

3. User fills out form with:
   - Field 1: [type of input, validation rules]
   - Field 2: [type of input, validation rules]
   - System validates: [validation logic]

4. User clicks "Submit"
   - System: [backend actions - data saved, emails sent, etc.]
   - Success: User redirected to `/success-page`
   - Sees: Success notification with [message]

5. [Email/async action if applicable]
   - System sends email to [recipient]
   - Contains: [email purpose and key content]
```

#### 5. **Alternative Flows**

Document edge cases and variations:

- **Error Scenarios**: What happens when validation fails, network errors occur, etc.
- **Alternative Paths**: Different choices users can make
- **Edge Cases**: Boundary conditions, permission issues, etc.

**Format:**

```
### If validation fails at step 3:
- System displays error message: "[specific message]"
- User can: [correct errors and retry]

### If user cancels at step 2:
- Modal closes
- No data saved
- User remains on [current page]
```

#### 6. **Success Criteria**

Define what "done" looks like:

- Data persisted to database
- User sees confirmation
- Emails sent (if applicable)
- User can access new features/content
- Analytics events tracked

#### 7. **Related Journeys**

Link to connected journeys:

- What might the user do next?
- What journeys lead into this one?
- What journeys might branch from this one?

#### 8. **Technical Notes**

Document technical considerations:

- API endpoints called
- Database tables affected
- Authentication/authorization checks
- Third-party integrations (PostHog, email service, etc.)
- Component dependencies

### Writing Style Guidelines

**Be Specific:**

- ✅ "User clicks the blue 'Create Event' button in the top right"
- ❌ "User creates event"

**Use Present Tense:**

- ✅ "User fills out the form"
- ❌ "User will fill out the form"

**Describe UI States:**

- ✅ "Submit button shows loading spinner and is disabled during save"
- ❌ "Form saves"

**Include Visual Context:**

- ✅ "Notification appears at top right with green checkmark icon"
- ❌ "User sees success message"

**Reference Actual Routes/Components:**

- ✅ "User navigates to `/events/[slug]/manage`"
- ❌ "User goes to management page"

**Document Error States:**

- ✅ "If email already exists, show inline error below email field: 'This email is already registered'"
- ❌ "Validate email"

### Example Journey Snippet

```markdown
# Anonymous Visitor: Sign Up for Event

## Overview

An anonymous visitor discovers an event they want to attend and completes the signup process, creating an account in the process.

## Prerequisites

- User is not authenticated
- Event exists and is published
- Event has available signup slots (if limited)

## User Story

As an anonymous visitor
I want to sign up for an event
So that I can attend and receive event updates

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

## Success Criteria

- EventSignup record created with status "confirmed"
- Person record exists with email
- Confirmation email delivered
- User sees success state on page
- PostHog event tracked: "event_signup_completed"

## Related Journeys

- [Sign In](../auth/signin.md) - If returning user wants to sign in
- [View Event](./discover.md) - How user found this event
- [Manage Profile](../auth/profile.md) - User might want to update details later

## Technical Notes

- API: `POST /api/events/[id]/signups`
- Database: Creates/updates `people`, creates `event_signups`
- Auth: Creates session token for future visits
- Email: Uses Resend API
- Analytics: PostHog tracks signup funnel steps
```

## Events Journeys

- [Sign Up](./events/sign-up.md) - Anonymous visitor signs up for an event
- [Create Event](./events/create.md) - Event organizer creates an event
- [Manage Event](./events/manage.md) - Event organizer manages existing event
- [Discover Events](./events/discover.md) - Anonymous visitor browses and discovers events

## Groups Journeys

- [Join Group](./groups/join.md) - User joins a group
- [Create Group](./groups/create.md) - Group organizer creates a group
- [Manage Group](./groups/manage.md) - Group organizer manages members and group details
- [Discover Groups](./groups/discover.md) - Anonymous visitor browses and discovers groups

## Campaigns Journeys

- [View Campaign](./campaigns/view.md) - Visitor views campaign page
- [Join Campaign](./campaigns/join.md) - User joins a campaign
- [Create Campaign](./campaigns/create.md) - Campaign organizer creates a campaign
- [Manage Campaign](./campaigns/manage.md) - Campaign organizer manages campaign

## Emails Journeys

- [Create Email](./emails/create.md) - Organizer creates an email
- [Send Email](./emails/send.md) - Organizer sends email to segment
- [Moderate Email](./emails/moderate.md) - Admin moderates email before sending
- [View Email](./emails/view.md) - Recipient views email

## People/Authentication Journeys

- [Register](./auth/register.md) - First-time signup via event or group
- [Sign In](./auth/signin.md) - Returning user signs in with passkey
- [Manage Profile](./auth/profile.md) - User manages their profile

## Admin Journeys

- [Moderate Events](./admin/moderate-events.md) - Admin moderates event submissions
- [Moderate Groups](./admin/moderate-groups.md) - Admin moderates group submissions
- [Moderate Emails](./admin/moderate-emails.md) - Admin moderates email sends
- [Manage Defaults](./admin/manage-defaults.md) - Admin sets organization defaults
