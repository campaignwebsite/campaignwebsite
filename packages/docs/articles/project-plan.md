# Project Plan: Campaign Website Builder

**Last Updated:** October 19, 2025

## Overview

This project plan outlines the development approach for the Campaign Website Builder, a platform for activists to organize grassroots movements. The strategy prioritizes UI/UX development using Nuxt UI components, followed by backend implementation.

## Development Philosophy

- **Code-first design**: Use Nuxt UI components directly rather than creating mockups
- **Iterate in browser**: Build and refine UI through actual implementation
- **Minimal custom components**: Only create custom components when Nuxt UI doesn't cover the need
- **AI-assisted development**: Documentation written to guide AI agents through implementation

## Project Phases

---

## Phase 1: Foundation & User Flow Mapping

**Goal:** Establish the groundwork and understand user journeys before diving into detailed implementation.

### 1.1 User Journey Documentation (Week 1)

Document the key user flows as simple written narratives in markdown. For each user role, describe their primary goals and the sequence of actions.

**Deliverables:**

- [ ] Create `articles/user-flows/` directory
- [ ] Document 5 core user journeys:
  - Anonymous visitor → Event signup
  - Anonymous visitor → Group joining
  - Event organizer → Create & manage event
  - Group organizer → Create & manage group
  - Super admin → Moderation workflow
- [ ] Identify cross-cutting journeys (e.g., email sending, content editing)

**Format:** Simple numbered steps with page transitions, e.g.:

```
1. User lands on /events
2. User clicks on event card
3. User views /events/[slug]
4. User clicks "Sign up" button
5. User fills signup form (modal/page)
6. User receives confirmation email
```

### 1.2 Nuxt UI Audit (Week 1)

Review Nuxt UI component library to understand what's available and identify gaps.

**Deliverables:**

- [ ] Create `articles/components/foundation/nuxt-ui-inventory.md`
- [ ] List all Nuxt UI components and their use cases
- [ ] Identify needed custom components (e.g., map integration, TipTap editor wrapper)
- [ ] Document component customization approach (Tailwind classes, slots, variants)

### 1.3 Layout & Navigation Structure (Week 1)

Define the overall layout system and navigation patterns.

**Deliverables:**

- [ ] Elaborate `articles/layouts/default.md` with:
  - Header/navigation requirements
  - Footer requirements
  - Responsive behavior
  - Role-based navigation variations
- [ ] Elaborate `articles/components/layout/navigation.md`
- [ ] Elaborate `articles/components/layout/footer.md`
- [ ] Define page layout patterns (full-width, contained, split-view, etc.)

---

## Phase 2: Page-by-Page UX Elaboration

**Goal:** Detailed specification of every page's structure, components, interactions, and content.

### 2.1 Public Pages (Week 2)

Pages accessible to anonymous visitors.

**Deliverables:**

- [ ] Elaborate `articles/pages/index.md` (homepage)
- [ ] Elaborate `articles/pages/events/events.md` (event listing)
- [ ] Elaborate `articles/pages/events/event.md` (event detail)
- [ ] Elaborate `articles/pages/groups/groups.md` (group listing)
- [ ] Elaborate `articles/pages/groups/group.md` (group detail)
- [ ] Elaborate `articles/pages/emails/email-preview.md` (public email view)

**For each page document:**

- Page purpose and user goals
- Layout structure (header, main content sections, sidebar, footer)
- List of components used (reference Nuxt UI or custom)
- Data requirements (what needs to be fetched)
- Interactive elements (buttons, forms, filters)
- Responsive behavior notes
- Empty states and error states
- Loading states
- SEO considerations (meta tags, structured data)

### 2.2 Campaign Pages (Week 2)

**Deliverables:**

- [ ] Elaborate `articles/pages/campaigns/manage-campaigns.md`
- [ ] Elaborate `articles/pages/campaigns/campaign.md`
- [ ] Elaborate `articles/pages/campaigns/manage-campaign.md`
- [ ] Elaborate `articles/pages/campaigns/create-edit-campaign.md`

### 2.3 Event Management Pages (Week 3)

**Deliverables:**

- [ ] Elaborate `articles/pages/events/manage-events.md`
- [ ] Elaborate `articles/pages/events/manage-event.md`
- [ ] Elaborate `articles/pages/events/create-edit-event.md`
- [ ] Detail event signup flow and confirmation

### 2.4 Group Management Pages (Week 3)

**Deliverables:**

- [ ] Elaborate `articles/pages/groups/manage-groups.md`
- [ ] Elaborate `articles/pages/groups/manage-group.md`
- [ ] Elaborate `articles/pages/groups/create-edit-group.md`
- [ ] Detail group joining flow

### 2.5 Email Management Pages (Week 3)

**Deliverables:**

- [ ] Elaborate `articles/pages/emails/manage-emails.md`
- [ ] Elaborate `articles/pages/emails/manage-email.md`
- [ ] Elaborate `articles/pages/emails/create-edit-email.md`

### 2.6 People Management Pages (Week 4)

**Deliverables:**

- [ ] Elaborate `articles/pages/people/people.md` (list view)
- [ ] Elaborate `articles/pages/people/person.md` (detail view)
- [ ] Define filtering, search, and segmentation UI

### 2.7 Admin Pages (Week 4)

**Deliverables:**

- [ ] Elaborate `articles/pages/admin/manage-defaults.md`
- [ ] Elaborate `articles/pages/admin/moderate-emails.md`
- [ ] Elaborate `articles/pages/admin/moderate-event.md`
- [ ] Elaborate `articles/pages/admin/moderate-groups.md`
- [ ] Define admin dashboard (if needed)

---

## Phase 3: Component Specification

**Goal:** Detail all components, both Nuxt UI-based and custom, with their props, states, and behaviors.

### 3.1 Authentication Components (Week 5)

**Deliverables:**

- [ ] Elaborate `articles/components/auth/passkey-signin.md`
- [ ] Elaborate `articles/components/auth/passkey-create.md`
- [ ] Elaborate `articles/components/auth/confirm-email.md`
- [ ] Define authentication state management
- [ ] Define protected route behavior

### 3.2 Form Components (Week 5)

**Deliverables:**

- [ ] Elaborate `articles/components/form/signup-form.md`
- [ ] Elaborate `articles/components/form/form-builder.md`
- [ ] Define form validation patterns (using valibot)
- [ ] Define form submission and error handling
- [ ] Document reusable form fields

### 3.3 Content Editor Components (Week 6)

These are critical complex components that need detailed specs.

**Deliverables:**

- [ ] Elaborate `articles/components/web-content/web-content-editor.md`
- [ ] Elaborate `articles/components/web-content/web-content-display.md`
- [ ] Elaborate `articles/components/web-content/building-blocks.md`
- [ ] Elaborate `articles/components/email/email-content-editor.md`
- [ ] Elaborate `articles/components/email/email-content-display.md`
- [ ] Elaborate `articles/components/email/content/building-blocks.md`
- [ ] Define TipTap integration approach
- [ ] Define content data structure (JSON format)
- [ ] Define available blocks/extensions for each editor type

### 3.4 Map Components (Week 6)

**Deliverables:**

- [ ] Elaborate `articles/components/map/map.md`
- [ ] Elaborate `articles/components/map/map-maker.md`
- [ ] Define MapLibre integration
- [ ] Define marker/location data structure
- [ ] Define geocoding approach

### 3.5 List & Display Components (Week 7)

**Deliverables:**

- [ ] Elaborate `articles/components/event-signups.md`
- [ ] Elaborate `articles/components/group-members.md`
- [ ] Elaborate `articles/components/email/email-picker.md`
- [ ] Elaborate `articles/components/segment-selector/index.md`
- [ ] Define table/list patterns using Nuxt UI
- [ ] Define filtering and sorting UI

### 3.6 Foundation Components (Week 7)

Only create custom components where Nuxt UI doesn't suffice.

**Deliverables:**

- [ ] Elaborate `articles/components/foundation/index.md`
- [ ] Review and complete card components documentation
- [ ] Identify any other missing foundation components
- [ ] Document component composition patterns

---

## Phase 4: Backend Validation & Refinement

**Goal:** Ensure the planned UX aligns with data structures, authentication, and API capabilities.

### 4.1 Database Schema Review (Week 8)

Cross-reference page/component requirements with database schemas.

**Deliverables:**

- [ ] Review all `articles/database/*.md` files
- [ ] Create `articles/database/schema-validation.md` document listing:
  - Missing fields needed for UX
  - Unnecessary fields that can be removed
  - Relationship adjustments needed
  - Index requirements for performance
- [ ] Update individual database docs with any changes
- [ ] Validate data types align with form inputs
- [ ] Confirm relationship cardinality matches UX assumptions

### 4.2 Authentication & Authorization Review (Week 8)

Ensure auth setup supports all user role requirements.

**Deliverables:**

- [ ] Create `articles/api/authentication.md` documenting:
  - BetterAuth configuration
  - Passkey implementation approach
  - Session management
  - Role-based access control (RBAC) strategy
- [ ] Create `articles/api/authorization.md` documenting:
  - Permission model for each user role
  - Protected route middleware
  - Component-level permission checks
  - API endpoint protection

### 4.3 API Endpoint Specification (Week 9)

Define all API endpoints needed to support the UX.

**Deliverables:**

- [ ] Elaborate `articles/api/index.md` with:
  - API design principles (REST, conventions)
  - Error handling approach
  - Response formats
  - Pagination strategy
- [ ] Create API endpoint specs for each resource:
  - [ ] `articles/api/campaigns-api.md`
  - [ ] `articles/api/events-api.md`
  - [ ] `articles/api/groups-api.md`
  - [ ] `articles/api/people-api.md`
  - [ ] `articles/api/emails-api.md`
  - [ ] `articles/api/segments-api.md`
  - [ ] `articles/api/signups-api.md`

**For each endpoint document:**

- HTTP method and path
- Request parameters/body
- Response format
- Authentication requirements
- Authorization rules
- Validation rules
- Error responses

### 4.4 Integration Planning (Week 9)

**Deliverables:**

- [ ] Review `articles/integrations/posthog.md`
- [ ] Document Resend email integration approach
- [ ] Document Cloudflare Workflows for email scheduling
- [ ] Document R2 storage for image uploads
- [ ] Document any other third-party integrations

### 4.5 State Management Architecture (Week 9)

**Deliverables:**

- [ ] Create `articles/tech-stack/state-management.md` documenting:
  - Pinia store structure
  - What data lives in stores vs. composables
  - Server state management approach
  - Optimistic updates strategy
  - Cache invalidation strategy

---

## Phase 5: Backend Implementation

**Goal:** Build the backend infrastructure, database, API, and authentication.

### 5.1 Project Setup & Infrastructure (Week 10)

**Deliverables:**

- [ ] Initialize Nuxt Hub project
- [ ] Configure Cloudflare Workers
- [ ] Set up Cloudflare D1 database
- [ ] Configure Cloudflare R2 for storage
- [ ] Configure Cloudflare KV for caching
- [ ] Set up development environment
- [ ] Configure environment variables
- [ ] Set up deployment pipeline

### 5.2 Database Implementation (Week 10-11)

**Deliverables:**

- [ ] Implement Drizzle ORM schemas based on database docs
- [ ] Create database migration scripts
- [ ] Set up seed data for development
- [ ] Implement database utilities and helpers
- [ ] Test database operations

### 5.3 Authentication Implementation (Week 11)

**Deliverables:**

- [ ] Configure BetterAuth
- [ ] Implement passkey authentication
- [ ] Implement email confirmation flow
- [ ] Create auth middleware
- [ ] Implement role-based access control
- [ ] Create auth composables for client-side
- [ ] Test authentication flows

### 5.4 Core API Implementation (Week 12-14)

Build APIs in order of dependency and priority.

**Phase 5.4.1: Organizations & Campaigns**

- [ ] Implement organizations API
- [ ] Implement campaigns API
- [ ] Implement basic CRUD operations
- [ ] Add validation
- [ ] Add authorization checks

**Phase 5.4.2: Events & Groups**

- [ ] Implement events API
- [ ] Implement event signups API
- [ ] Implement groups API
- [ ] Implement group members API
- [ ] Add invitation/joining logic

**Phase 5.4.3: People & Segments**

- [ ] Implement people API
- [ ] Implement segments API
- [ ] Add search and filtering
- [ ] Add segment calculation logic

**Phase 5.4.4: Emails**

- [ ] Implement emails API
- [ ] Integrate Vuemail for rendering
- [ ] Integrate Resend for sending
- [ ] Implement Cloudflare Workflows for scheduling
- [ ] Add email tracking

### 5.5 File Upload & Storage (Week 14)

**Deliverables:**

- [ ] Implement R2 upload endpoints
- [ ] Add image processing/optimization
- [ ] Implement secure file access
- [ ] Add file deletion cleanup

### 5.6 Integration Implementation (Week 15)

**Deliverables:**

- [ ] Implement PostHog integration
- [ ] Add analytics tracking events
- [ ] Configure data warehouse sync
- [ ] Test integrations

---

## Phase 6: Frontend Implementation

**Goal:** Build the user interface based on detailed specs.

### 6.1 Core Layout & Navigation (Week 16)

**Deliverables:**

- [ ] Implement default layout
- [ ] Implement navigation component
- [ ] Implement footer component
- [ ] Add responsive behavior
- [ ] Implement role-based navigation

### 6.2 Authentication UI (Week 16)

**Deliverables:**

- [ ] Implement passkey signin component
- [ ] Implement passkey creation component
- [ ] Implement email confirmation page
- [ ] Implement auth state management
- [ ] Add protected route middleware

### 6.3 Foundation Components (Week 17)

**Deliverables:**

- [ ] Implement custom card components
- [ ] Implement any other custom foundation components
- [ ] Create component showcase/documentation page
- [ ] Test component responsiveness

### 6.4 Public Pages (Week 17-18)

**Deliverables:**

- [ ] Implement homepage
- [ ] Implement events listing page
- [ ] Implement event detail page
- [ ] Implement groups listing page
- [ ] Implement group detail page
- [ ] Implement public email preview
- [ ] Add loading states
- [ ] Add error states
- [ ] Add empty states

### 6.5 Form Components (Week 18)

**Deliverables:**

- [ ] Implement signup form component
- [ ] Implement form builder component
- [ ] Add form validation
- [ ] Add error handling
- [ ] Test form submissions

### 6.6 Content Editor Components (Week 19-20)

**Deliverables:**

- [ ] Implement TipTap base integration
- [ ] Implement web content editor
- [ ] Implement web content display
- [ ] Implement web content building blocks
- [ ] Implement email content editor
- [ ] Implement email content display
- [ ] Implement email building blocks
- [ ] Add content saving/autosave
- [ ] Test editor interactions

### 6.7 Map Components (Week 20)

**Deliverables:**

- [ ] Implement MapLibre integration
- [ ] Implement map display component
- [ ] Implement map maker component
- [ ] Add location search/geocoding
- [ ] Test map interactions

### 6.8 Campaign Management UI (Week 21)

**Deliverables:**

- [ ] Implement campaign listing page
- [ ] Implement campaign detail page
- [ ] Implement campaign management page
- [ ] Implement create/edit campaign page
- [ ] Connect to API

### 6.9 Event Management UI (Week 21-22)

**Deliverables:**

- [ ] Implement event management listing
- [ ] Implement event management detail
- [ ] Implement create/edit event page
- [ ] Implement event signup components
- [ ] Connect to API
- [ ] Add real-time signup updates (if needed)

### 6.10 Group Management UI (Week 22-23)

**Deliverables:**

- [ ] Implement group management listing
- [ ] Implement group management detail
- [ ] Implement create/edit group page
- [ ] Implement group member components
- [ ] Connect to API

### 6.11 Email Management UI (Week 23-24)

**Deliverables:**

- [ ] Implement email management listing
- [ ] Implement email management detail
- [ ] Implement create/edit email page
- [ ] Implement email picker component
- [ ] Implement segment selector
- [ ] Add email preview
- [ ] Connect to API

### 6.12 People Management UI (Week 24)

**Deliverables:**

- [ ] Implement people listing page
- [ ] Implement person detail page
- [ ] Add search and filtering
- [ ] Add export functionality
- [ ] Connect to API

### 6.13 Admin UI (Week 25)

**Deliverables:**

- [ ] Implement moderation pages
- [ ] Implement manage defaults page
- [ ] Add admin-only components
- [ ] Connect to API
- [ ] Add admin navigation

---

## Phase 7: Testing & Refinement

**Goal:** Ensure quality, performance, and usability.

### 7.1 Functional Testing (Week 26)

**Deliverables:**

- [ ] Test all user flows end-to-end
- [ ] Test form validations
- [ ] Test authentication flows
- [ ] Test authorization (role access)
- [ ] Test API error handling
- [ ] Fix identified bugs

### 7.2 Responsive & Accessibility Testing (Week 26)

**Deliverables:**

- [ ] Test on mobile devices
- [ ] Test on tablets
- [ ] Test on different browsers
- [ ] Run accessibility audit
- [ ] Fix accessibility issues
- [ ] Ensure keyboard navigation works

### 7.3 Performance Optimization (Week 27)

**Deliverables:**

- [ ] Run Lighthouse audits
- [ ] Optimize images and assets
- [ ] Implement lazy loading
- [ ] Add caching strategies
- [ ] Optimize database queries
- [ ] Test with realistic data volumes

### 7.4 User Testing & Feedback (Week 27)

**Deliverables:**

- [ ] Conduct user testing sessions
- [ ] Gather feedback
- [ ] Prioritize improvements
- [ ] Implement critical fixes
- [ ] Document future enhancements

---

## Phase 8: Deployment & Launch

**Goal:** Deploy to production and monitor.

### 8.1 Pre-launch (Week 28)

**Deliverables:**

- [ ] Set up production environment
- [ ] Configure production database
- [ ] Set up monitoring and logging
- [ ] Configure error tracking
- [ ] Set up backup strategy
- [ ] Create deployment checklist
- [ ] Prepare rollback plan

### 8.2 Deployment (Week 28)

**Deliverables:**

- [ ] Deploy to production
- [ ] Run smoke tests
- [ ] Monitor for errors
- [ ] Verify integrations work
- [ ] Verify email sending works

### 8.3 Post-launch (Week 29+)

**Deliverables:**

- [ ] Monitor performance metrics
- [ ] Monitor error rates
- [ ] Gather user feedback
- [ ] Address critical issues
- [ ] Plan next iteration

---

## Key Milestones

| Milestone                   | Target Week | Deliverable                                         |
| --------------------------- | ----------- | --------------------------------------------------- |
| Foundation Complete         | Week 1      | User flows mapped, Nuxt UI audited, layouts defined |
| UX Documentation Complete   | Week 7      | All pages and components fully specified            |
| Backend Validation Complete | Week 9      | Database, auth, and API validated against UX        |
| Backend Complete            | Week 15     | All APIs functional and tested                      |
| Frontend Complete           | Week 25     | All UI implemented and connected                    |
| Testing Complete            | Week 27     | App tested and optimized                            |
| Launch                      | Week 28     | Production deployment                               |

---

## Working Guidelines

### Documentation Standards

Each page/component doc should include:

1. **Purpose**: What problem does this solve?
2. **User Stories**: Who uses this and why?
3. **Structure**: Layout and sections
4. **Components Used**: List of Nuxt UI and custom components
5. **Data Requirements**: What data is needed from API?
6. **Interactions**: Buttons, forms, links, modals
7. **States**: Loading, error, empty, success
8. **Responsive Notes**: Mobile/tablet considerations
9. **Permissions**: Who can access/see this?
10. **Open Questions**: Unresolved design decisions

### AI Agent Instructions

When writing docs for AI implementation:

- Be explicit about component hierarchy
- Specify exact Nuxt UI component names
- Include example code snippets where helpful
- Reference related components/pages
- Specify data structures (TypeScript interfaces)
- Include validation rules
- Note edge cases and error scenarios

### Version Control

- Create feature branches for each phase
- Commit documentation before implementation
- Use conventional commits
- Review docs before starting implementation

---

## Risk Management

| Risk                                | Impact | Mitigation                                                         |
| ----------------------------------- | ------ | ------------------------------------------------------------------ |
| Nuxt UI limitations                 | Medium | Identify early in Phase 1.2; create custom components as needed    |
| Complex editor integration (TipTap) | High   | Prototype early; allocate extra time in Phase 6.6                  |
| Map integration complexity          | Medium | Prototype in Phase 1.2; use existing MapLibre examples             |
| Authentication edge cases           | High   | Thorough testing in Phase 7.1; implement proper error handling     |
| Performance with large datasets     | Medium | Plan for pagination/virtualization; test early with realistic data |
| Scope creep                         | High   | Stick to documented features; maintain future features list        |

---

## Next Steps

**Immediate actions to begin Phase 1:**

1. Create `articles/user-flows/` directory
2. Start documenting the "Anonymous visitor → Event signup" user flow
3. Begin Nuxt UI component inventory
4. Set up a working session with AI agents to elaborate navigation component

**Weekly Review Process:**

- Review completed documentation
- Identify blockers or questions
- Adjust timeline if needed
- Update this project plan

---

## Notes

- Timeline assumes full-time work; adjust based on actual capacity
- Some phases can overlap (e.g., start frontend for completed backend sections)
- Prioritize MVP features first; defer "nice-to-haves" to post-launch
- Keep the future features list updated but out of immediate scope
- Document decisions and rationale for future reference
