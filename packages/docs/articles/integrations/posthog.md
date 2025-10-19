# PostHog

Tracked events:

- Autocapture user interactions on the website
- Custom events, registered in the backend (e.g. group signup, event signup, etc)
- Track email events from Resend

Once website visitors sign up, we identify them in PostHog using their email address.

Track events in Nuxt: https://posthog.com/docs/libraries/nuxt-js

Reverse proxy setup for PostHog: https://posthog.com/docs/advanced/proxy/nuxt

We're using the eu-based PostHog instance.

We use PostHog cohorts to analyse behavior of specific user groups, e.g., users who signed up for a specific group, or users who signed up for a specific event. Cohorts are automatically created and updated using the PostHog API:

- https://posthog.com/docs/data/cohorts
- https://posthog.com/docs/api/cohorts
