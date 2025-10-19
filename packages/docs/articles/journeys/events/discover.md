# Anonymous Visitor: Discover Events

## Overview

An anonymous visitor browses and discovers events through search, filtering, and exploration to find activities they're interested in attending.

## Prerequisites

- No authentication required
- Events exist in the system
- Events are published and public

## User Story

```
As an anonymous visitor
I want to discover events happening in my area
So that I can find activities to attend
```

## Step-by-Step Flow

1. User lands on `/events`
   - Sees: Grid/list of upcoming events
   - Sees: Search bar at top
   - Sees: Filter sidebar (date, location, type, category)
   - Can: Browse, search, filter events

2. User can search for events:
   - Types keywords in search bar
   - System searches: Event titles, descriptions, locations
   - UI: Results update in real-time (debounced)
   - Sees: Matching events highlighted

3. User can filter events:
   - Date range (upcoming, this week, this month, custom)
   - Location (city, radius from user location)
   - Event type (in-person, virtual, hybrid)
   - Category (if categorization exists)
   - System applies filters: Results update immediately
   - UI: Active filters shown as removable chips

4. User browses event cards:
   - Each card shows: Title, date/time, location, thumbnail image
   - Hover: Shows quick preview with more details
   - Can: Click to view full event details

5. User clicks on an event card:
   - System navigates to: `/events/[slug]`
   - Sees: Full event details page
   - Can: Sign up, share, or return to browse

## Alternative Flows

### If no events match filters:
- System displays: "No events found" message
- Shows: Suggestions to adjust filters
- Offers: Link to create an event

### If user shares their location:
- Browser prompts for location permission
- User grants: Events sorted by proximity
- Map view option becomes available
- Shows: Events on interactive map

### If user is on mobile:
- Layout adjusts to mobile-friendly cards
- Filters accessible via bottom sheet/modal
- Swipe gestures for navigation
- Share button prominent for social sharing

### If user wants to view past events:
- Toggle "Show past events" option
- System includes events with past dates
- Past events marked with "Completed" badge
- Can: View event details but cannot sign up

## Success Criteria

- User can find relevant events through search
- Filters work correctly and update results
- Event cards display key information clearly
- User can navigate to event details seamlessly
- PostHog event tracked: "events_browsed", "event_searched", "event_filtered"

## Related Journeys

- [Sign Up for Event](./sign-up.md) - Next step after finding an event
- [Create Event](./create.md) - User might want to create their own
- [View Campaign](../campaigns/view.md) - Events may be part of campaigns

## Technical Notes

- API: `GET /api/events` with query parameters
- Query params: `?search=keyword&date=range&location=city&type=virtual`
- Database: Queries `events` table with filters
- Search: Full-text search on title and description
- Location: Uses geocoding for proximity search
- Caching: Event listings cached for performance
- Analytics: PostHog tracks search queries, popular filters
