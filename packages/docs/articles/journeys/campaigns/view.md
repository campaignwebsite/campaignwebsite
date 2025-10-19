# Visitor: View Campaign

## Overview

A visitor discovers and views a campaign page to learn about the cause, goals, and how to get involved.

## Prerequisites

- No authentication required
- Campaign exists and is published
- Campaign is publicly accessible

## User Story

```
As a visitor
I want to view a campaign
So that I can learn about the cause and decide if I want to participate
```

## Step-by-Step Flow

1. User lands on `/campaigns/[slug]`
   - Sees: Campaign banner image or video
   - Sees: Campaign title and tagline
   - Sees: Campaign description and goals
   - Sees: Key metrics (supporters, events, impact)

2. User scrolls through campaign content:
   - Sees: About section with detailed information
   - Sees: Progress indicators (fundraising, petition signatures, etc.)
   - Sees: Timeline of campaign milestones
   - Sees: Featured stories or testimonials
   - Sees: Media gallery (images, videos)

3. User views ways to get involved:
   - Sees: Call-to-action buttons (Join, Donate, Sign Petition)
   - Sees: Upcoming events related to campaign
   - Sees: Active groups within campaign
   - Sees: Social sharing buttons
   - Can: Click any action to participate

4. User can explore related content:
   - Tabs/sections: About, Events, Groups, Updates
   - Events tab: List of campaign events
   - Groups tab: Groups participating in campaign
   - Updates tab: Recent news and announcements
   - Can: Navigate between sections

5. User can engage with campaign:
   - Click "Join Campaign" button
   - Click event to sign up
   - Click group to join
   - Share on social media
   - Sign up for email updates

## Alternative Flows

### If campaign is private:
- Shows: "This campaign is private"
- Requires: Access code or invitation
- Can: Request access from organizers

### If campaign has ended:
- Badge: "Campaign Ended"
- Shows: Final results and impact
- Cannot: Join or participate
- Can: View archive and history

### If user is already a supporter:
- Shows: "You're supporting this campaign" badge
- Displays: Personalized content
- Suggests: Next actions (invite friends, donate more)

### If campaign has fundraising goal:
- Shows: Progress bar with amount raised
- Displays: Recent donations (if public)
- Highlights: Top contributors
- Shows: Days remaining

### If visitor is on mobile:
- Optimized: Mobile-friendly layout
- Prominent: Share and join buttons
- Sticky: Call-to-action bar at bottom
- Easy: One-tap actions

## Success Criteria

- Campaign information displayed clearly
- All content sections accessible
- Call-to-action buttons prominent and functional
- Social sharing works correctly
- Metrics and progress displayed accurately
- PostHog events tracked: "campaign_viewed", "campaign_shared"

## Related Journeys

- [Join Campaign](./join.md) - Next step to participate
- [Discover Events](../events/discover.md) - Viewing campaign events
- [Discover Groups](../groups/discover.md) - Joining campaign groups
- [Register](../auth/register.md) - Creating account to join

## Technical Notes

- API: `GET /api/campaigns/[slug]`
- Database: Queries `campaigns` with related data
- Caching: Campaign pages cached for performance
- Analytics: PostHog tracks page views, time on page
- SEO: Open Graph tags for social sharing
- Media: Images lazy-loaded for performance
- Real-time: Live updates for metrics (if applicable)
