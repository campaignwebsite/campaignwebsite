# Email Picker

The Email Picker component allows users to select an email:

- **Selecting a Template for related entities**: An email used as default within a campaign or group is called a template. For example, when creating a campaign, you can use the Email Picker to choose email templates for that campaign's groups and events. Or when creating a group, you can use the Email Picker to choose email templates for that groups's events.
- **Selecting an email for a specific purpose**: For example, setting a confirmation, reminder and follow-up email for events. Or for groups and campaigns, setting a confirmation and welcome email.

## Template hierarchy

The most specific template takes precedence over more general templates. The hierarchy is as follows (from most specific to most general):

1. Campaign default templates
2. Group default templates
3. Organization templates

In the Email Picker, users can choose one of these templates, or create a custom email (by copying one of the templates, or creating a new email from scratch). Only applicable templates are shown in the picker (so if an event is not linked to a campaign, no campaign template is shown). By default, the most specific template is selected.

## Places used

### Organization

#### Templates

Used as Template picker:

- Campaigns
  - Confirmation email (sent immediately upon joining)
  - Welcome email (sent one day after joining)
- Groups
  - Confirmation email (sent immediately upon joining)
  - Welcome email (sent one day after joining)
- Events
  - Confirmation email (sent immediately upon signing up)
  - Reminder email (sent one day before the event)
  - Follow-up email (sent one day after the event)

For each of these specific emails, the user can choose from:

- App default (these are the hardcoded defaults)
- Custom email (copy the templates above, or create a new one from scratch)

#### Specific emails

Used as specific email picker:

- Confirmation email
- Welcome email
- Custom email (sent immediately or scheduled)

For each of these specific emails, the user can choose from:

- Organization default
- Custom email (copy the templates above, or create a new one from scratch)

### Group

#### Templates

Used as Template picker:

- Events
  - Confirmation email
  - Reminder email
  - Follow-up email

For each of these template emails, the user can choose from:

- Organization default
- Campaign default (if applicable)
- Custom email (copy one of the templates above, or create a new one from scratch)

#### Specific emails

Used as specific email picker:

- Confirmation email
- Welcome email
- Custom email (sent immediately or scheduled)

For each of these specific emails, the user can choose from:

- Organization default
- Campaign default (if applicable)
- Custom email (copy one of the templates above, or create a new one from scratch)

### Campaign

#### Templates

Used as Template picker:

- Groups
  - Confirmation email
  - Welcome email
- Events
  - Confirmation email
  - Reminder email
  - Follow-up email

For each of these template emails, the user can choose from:

- Organization default
- Custom email (copy one of the templates above, or create a new one from scratch)

#### Specific emails

Used as specific email picker:

- Confirmation email
- Welcome email
- Custom email (sent immediately or scheduled)

For each of these specific emails, the user can choose from:

- Organization default
- Custom email (copy one of the templates above, or create a new one from scratch)

### Event

#### Specific emails

Used as specific email picker:

- Confirmation email
- Reminder email
- Follow-up email
- Custom email (sent immediately or scheduled)

For each of these specific emails, the user can choose from:

- Organization default
- Group default (if applicable)
- Campaign default (if applicable)
- Custom email (copy one of the templates above, or create a new one from scratch)
