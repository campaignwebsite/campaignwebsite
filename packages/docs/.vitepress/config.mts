import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'articles',

  title: 'Campaign Website',
  description: 'Open source campaign website for grassroots movements',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/introduction' },
      { text: 'Project Plan', link: '/project-plan' },
      { text: 'Journeys', link: '/journeys/' },
      { text: 'Components', link: '/components/' },
      { text: 'Database', link: '/database/' },
      { text: 'Pages', link: '/pages/' },
      { text: 'Tech Stack', link: '/tech-stack/' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Project Plan', link: '/project-plan' },
        ],
      },
      {
        text: 'Journeys',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/journeys/' },
          {
            text: 'Events',
            collapsed: true,
            items: [
              { text: 'Discover Events', link: '/journeys/events/discover' },
              { text: 'Sign Up', link: '/journeys/events/sign-up' },
              { text: 'Create Event', link: '/journeys/events/create' },
              { text: 'Manage Event', link: '/journeys/events/manage' },
            ],
          },
          {
            text: 'Groups',
            collapsed: true,
            items: [
              { text: 'Discover Groups', link: '/journeys/groups/discover' },
              { text: 'Join Group', link: '/journeys/groups/join' },
              { text: 'Create Group', link: '/journeys/groups/create' },
              { text: 'Manage Group', link: '/journeys/groups/manage' },
            ],
          },
          {
            text: 'Campaigns',
            collapsed: true,
            items: [
              { text: 'View Campaign', link: '/journeys/campaigns/view' },
              { text: 'Join Campaign', link: '/journeys/campaigns/join' },
              { text: 'Create Campaign', link: '/journeys/campaigns/create' },
              { text: 'Manage Campaign', link: '/journeys/campaigns/manage' },
            ],
          },
          {
            text: 'Emails',
            collapsed: true,
            items: [
              { text: 'View Email', link: '/journeys/emails/view' },
              { text: 'Create Email', link: '/journeys/emails/create' },
              { text: 'Send Email', link: '/journeys/emails/send' },
              { text: 'Moderate Email', link: '/journeys/emails/moderate' },
            ],
          },
          {
            text: 'Authentication',
            collapsed: true,
            items: [
              { text: 'Register', link: '/journeys/auth/register' },
              { text: 'Sign In', link: '/journeys/auth/signin' },
              { text: 'Manage Profile', link: '/journeys/auth/profile' },
            ],
          },
          {
            text: 'Admin',
            collapsed: true,
            items: [
              {
                text: 'Moderate Events',
                link: '/journeys/admin/moderate-events',
              },
              {
                text: 'Moderate Groups',
                link: '/journeys/admin/moderate-groups',
              },
              {
                text: 'Moderate Emails',
                link: '/journeys/admin/moderate-emails',
              },
              {
                text: 'Manage Defaults',
                link: '/journeys/admin/manage-defaults',
              },
            ],
          },
        ],
      },
      {
        text: 'Components',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/components/' },
          { text: 'Event Signups', link: '/components/event-signups' },
          { text: 'Group Members', link: '/components/group-members' },
          {
            text: 'Auth',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/components/auth/' },
              { text: 'Confirm Email', link: '/components/auth/confirm-email' },
              {
                text: 'Passkey Create',
                link: '/components/auth/passkey-create',
              },
              {
                text: 'Passkey Sign In',
                link: '/components/auth/passkey-signin',
              },
            ],
          },
          {
            text: 'Email',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/components/email/' },
              { text: 'Email Picker', link: '/components/email/email-picker' },
              {
                text: 'Building Blocks',
                link: '/components/email/content/building-blocks',
              },
              {
                text: 'Email Content Display',
                link: '/components/email/content/email-content-display',
              },
              {
                text: 'Email Content Editor',
                link: '/components/email/content/email-content-editor',
              },
            ],
          },
          {
            text: 'Form',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/components/form/' },
              { text: 'Form Builder', link: '/components/form/form-builder' },
              { text: 'Signup Form', link: '/components/form/signup-form' },
            ],
          },
          {
            text: 'Foundation',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/components/foundation/' },
              { text: 'Card', link: '/components/foundation/cards/card' },
              {
                text: 'Card Container',
                link: '/components/foundation/cards/card-container',
              },
            ],
          },
          {
            text: 'Layout',
            collapsed: true,
            items: [
              { text: 'Footer', link: '/components/layout/footer' },
              { text: 'Navigation', link: '/components/layout/navigation' },
            ],
          },
          {
            text: 'Map',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/components/map/' },
              { text: 'Map', link: '/components/map/map' },
              { text: 'Map Maker', link: '/components/map/map-maker' },
            ],
          },
          {
            text: 'Segment Selector',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/components/segment-selector/' },
            ],
          },
          {
            text: 'Web Content',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/components/web-content/' },
              {
                text: 'Building Blocks',
                link: '/components/web-content/building-blocks',
              },
              {
                text: 'Web Content Display',
                link: '/components/web-content/web-content-display',
              },
              {
                text: 'Web Content Editor',
                link: '/components/web-content/web-content-editor',
              },
            ],
          },
        ],
      },
      {
        text: 'Database',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/database/' },
          { text: 'Campaigns', link: '/database/campaigns' },
          { text: 'Emails', link: '/database/emails' },
          { text: 'Events', link: '/database/events' },
          { text: 'Event Signups', link: '/database/event-signups' },
          { text: 'Groups', link: '/database/groups' },
          { text: 'Group Members', link: '/database/group-members' },
          { text: 'Organizations', link: '/database/organizations' },
          { text: 'People', link: '/database/people' },
          { text: 'Segments', link: '/database/segments' },
        ],
      },
      {
        text: 'Pages',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/pages/' },
          {
            text: 'Admin',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/pages/admin/' },
              { text: 'Manage Defaults', link: '/pages/admin/manage-defaults' },
              { text: 'Moderate Emails', link: '/pages/admin/moderate-emails' },
              { text: 'Moderate Event', link: '/pages/admin/moderate-event' },
              { text: 'Moderate Groups', link: '/pages/admin/moderate-groups' },
            ],
          },
          {
            text: 'Campaigns',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/pages/campaigns/' },
              { text: 'Campaign', link: '/pages/campaigns/campaign' },
              {
                text: 'Create/Edit Campaign',
                link: '/pages/campaigns/create-edit-campaign',
              },
              {
                text: 'Manage Campaign',
                link: '/pages/campaigns/manage-campaign',
              },
              {
                text: 'Manage Campaigns',
                link: '/pages/campaigns/manage-campaigns',
              },
            ],
          },
          {
            text: 'Emails',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/pages/emails/' },
              {
                text: 'Create/Edit Email',
                link: '/pages/emails/create-edit-email',
              },
              { text: 'Email Preview', link: '/pages/emails/email-preview' },
              { text: 'Manage Email', link: '/pages/emails/manage-email' },
              { text: 'Manage Emails', link: '/pages/emails/manage-emails' },
            ],
          },
          {
            text: 'Events',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/pages/events/' },
              { text: 'Event', link: '/pages/events/event' },
              { text: 'Events', link: '/pages/events/events' },
              {
                text: 'Create/Edit Event',
                link: '/pages/events/create-edit-event',
              },
              { text: 'Manage Event', link: '/pages/events/manage-event' },
              { text: 'Manage Events', link: '/pages/events/manage-events' },
            ],
          },
          {
            text: 'Groups',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/pages/groups/' },
              { text: 'Group', link: '/pages/groups/group' },
              { text: 'Groups', link: '/pages/groups/groups' },
              {
                text: 'Create/Edit Group',
                link: '/pages/groups/create-edit-group',
              },
              { text: 'Manage Group', link: '/pages/groups/manage-group' },
              { text: 'Manage Groups', link: '/pages/groups/manage-groups' },
            ],
          },
          {
            text: 'People',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/pages/people/' },
              { text: 'People', link: '/pages/people/people' },
              { text: 'Person', link: '/pages/people/person' },
            ],
          },
        ],
      },
      {
        text: 'Integrations',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/integrations/' },
          { text: 'PostHog', link: '/integrations/posthog' },
        ],
      },
      {
        text: 'Layouts',
        collapsed: true,
        items: [{ text: 'Default', link: '/layouts/default' }],
      },
      {
        text: 'API',
        collapsed: true,
        items: [{ text: 'Overview', link: '/api/' }],
      },
      {
        text: 'Tech Stack',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/tech-stack/' },
          { text: 'AI Instructions', link: '/tech-stack/ai-instructions' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
