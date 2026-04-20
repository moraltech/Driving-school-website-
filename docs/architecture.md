# Architecture Decisions

## Monorepo and Boundaries

- `apps/web`: user-facing frontend for students, instructors, and admins
- `apps/api`: business logic, integrations, and real-time services
- `packages/db`: Prisma schema + migrations + seed + client
- `packages/shared`: role and domain constants shared by apps

## Data Domain

Core entities:
- Users and role-based permissions
- Instructor/Student profiles
- Courses and pricing tiers
- Bookings and payment lifecycle
- Reviews, quiz questions, study materials, documents
- Fleet and maintenance lifecycle

## Security

- HTTP hardening: helmet + hpp + cors
- Abuse prevention: API rate limiting
- Input controls: express-validator and schema validation
- Session/auth: NextAuth sessions and JWT role claims
- CSRF protection on state-changing endpoints

## Real-time and Notifications

- Socket.io for live chat and scheduling updates
- Reminder scheduler dispatches 24h and 1h notifications
- Twilio/SendGrid adapters with local fallback logging

## Non-Functional Targets

- Accessibility: semantic structure and focus styling
- SEO: metadata + LocalBusiness JSON-LD + sitemap/robots
- Performance: optimized app structure and PWA baseline
- Compliance: cookie consent + privacy request endpoints
