# Signup Form

## Description

The form that users fill out to sign up for an event. This should be as simple as possible to encourage signups. If the user is signed in, the user can sign up with a single click (as long as no additional information is required). If the user is not signed in, the form will include 3 steps:

- Step 1: User is asked to fill out their email address.
- Step 2: Either confirm email address, or sign in with passkey (if a passkey is available for that email address)
- Step 3: The default fields (first name, phone number, zip code, house number) as well as any custom fields are shown. This step is only shown if additional information is required. Fields that are already known are prefilled, allowing the user to change anything if needed.

## Primary goals

- Make the event signup process as easy as possible.
- Collect necessary information from attendees.

## Functionality

- Implements the "single-click signup" feature where possible.
- For new users, it will ask for a name and email address.
- Can include custom fields defined by the event organizer using the `form-builder`.
- Validates the input data (e.g., required fields, email format).
- Submits the signup information to the backend and associates it with the event.
