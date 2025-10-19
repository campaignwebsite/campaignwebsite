# API

This folder contains documentation for the API of the campaign website.

## Public API endpoints

### Events

- GET /events - Retrieve a list of all events.
  - Optional filters based on any of the fields in the `Event` model.
- GET /events/{id} - Retrieve details of a specific event by ID.

### Groups

- GET /groups - Retrieve a list of all groups.
  - Optional filters based on any of the fields in the `Group` model.
- GET /groups/{id} - Retrieve details of a specific group by ID.
- GET /groups/{id}/events - Retrieve a list of events for a specific group.

### Campaigns

- GET /campaigns - Retrieve a list of all campaigns.
  - Optional filters based on any of the fields in the `Campaign` model.
- GET /campaigns/{id} - Retrieve details of a specific campaign by ID.
- GET /campaigns/{id}/events - Retrieve a list of events for a specific campaign.
- GET /campaigns/{id}/groups - Retrieve a list of groups for a specific campaign.

## Private API endpoints (require authentication)

Authenticated access is managed via Better Auth. See: https://www.better-auth.com/docs/integrations/nuxt#server-usage

### Events

- POST /events - Create a new event.
- PATCH /events/{id} - Update an existing event.
- DELETE /events/{id} - Delete an existing event.
- GET /events/{id}/signups - Retrieve a list of signups for a specific event.
  - Optional filters based on any of the fields in the `Person` model.
  - Optional filters based on the `Event Signup` model (e.g. signup date).
- POST /events/{id}/signups - Sign up a user for an event.

### Groups

- POST /groups - Create a new group.
- PATCH /groups/{id} - Update an existing group.
- DELETE /groups/{id} - Delete an existing group.
- GET /groups/{id}/members - Retrieve a list of members for a specific group.
  - Optional filters based on any of the fields in the `Person` model.
  - Optional filters based on the `Group Member` model (e.g. role).
- POST /groups/{id}/members - Add a member to a specific group.

### Campaigns

- POST /campaigns - Create a new campaign.
- PATCH /campaigns/{id} - Update an existing campaign.
- DELETE /campaigns/{id} - Delete an existing campaign.
