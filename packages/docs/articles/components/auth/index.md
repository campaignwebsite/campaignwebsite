# Autentication

https://www.better-auth.com/docs/integrations/nuxt

https://www.better-auth.com/docs/adapters/drizzle

Anyone who signs up for an event or group will be asked to verify their email address. Using BetterAuth, we'll send a magic link to the provided email address. Once they click this link, they will be logged in and their email address will be verified: https://www.better-auth.com/docs/plugins/magic-link

For Event Organizers, Group Organizers and Super Admins, signing in using a passkey is mandatory: https://www.better-auth.com/docs/plugins/passkey

When someone wants to create a new group or event, the following takes place:

1. If they are not logged in, they will be prompted to first sign in. They enter their e-mail address. If a passkey exists for this email, they will immediately be asked to sign in using that passkey. If no passkey exists, first they are asked to verify their email address using a magic link.
2. If the user did not have a passkey yet, they will be prompted to set up a passkey after verifying their email address.
3. After setting up the passkey, they can proceed to create the group or event.
