# Anonymous Visitor: Discover Groups

## Overview

An anonymous visitor browses and discovers groups through search, filtering, and exploration to find communities they want to join.

## Prerequisites

- No authentication required
- Groups exist in the system
- Groups are published and public

## User Story

```
As an anonymous visitor
I want to discover groups in my area
So that I can find communities to join
```

## Step-by-Step Flow

1. User lands on `/groups`
   - Sees: Grid/list of groups
   - Sees: Search bar at top
   - Sees: Filter sidebar (location, type, size, tags)
   - Can: Browse, search, filter groups

2. User can search for groups:
   - Types keywords in search bar
   - System searches: Group names, descriptions, tags
   - UI: Results update in real-time (debounced)
   - Sees: Matching groups highlighted

3. User can filter groups:
   - Location (city, radius from user location)
   - Group type (interest, activism, social, professional)
   - Group size (small <50, medium 50-200, large 200+)
   - Activity level (active, new, growing)
   - Tags/categories (technology, environment, arts, etc.)
   - System applies filters: Results update immediately
   - UI: Active filters shown as removable chips

4. User browses group cards:
   - Each card shows: Name, member count, description snippet, image
   - Hover: Shows quick preview with recent activity
   - Badges: New, popular, verified indicators
   - Can: Click to view full group details

5. User clicks on a group card:
   - System navigates to: `/groups/[slug]`
   - Sees: Full group details page
   - Can: Join group, view members, see events

## Alternative Flows

### If no groups match filters:
- System displays: "No groups found" message
- Shows: Suggestions to adjust filters
- Offers: Link to create a group

### If user shares their location:
- Browser prompts for location permission
- User grants: Groups sorted by proximity
- Map view option becomes available
- Shows: Groups on interactive map

### If user is authenticated:
- Shows: Recommended groups based on interests
- Highlights: Groups friends have joined
- Displays: "Join" button instead of "Learn More"
- One-click join for open groups

### If user wants to browse by category:
- Category navigation displayed
- Click category: Filters applied automatically
- Shows: Popular groups in that category
- Can: Combine with other filters

## Success Criteria

- User can find relevant groups through search
- Filters work correctly and update results
- Group cards display key information clearly
- User can navigate to group details seamlessly
- PostHog events tracked: "groups_browsed", "group_searched", "group_filtered"

## Related Journeys

- [Join Group](./join.md) - Next step after finding a group
- [Create Group](./create.md) - User might want to create their own
- [Register](../auth/register.md) - Creating account to join

## Technical Notes

- API: `GET /api/groups` with query parameters
- Query params: `?search=keyword&location=city&type=activism&size=medium`
- Database: Queries `groups` table with filters
- Search: Full-text search on name, description, tags
- Location: Geocoding for proximity search
- Caching: Group listings cached for performance
- Sorting: By relevance, member count, activity, distance
- Analytics: PostHog tracks search queries, popular filters
