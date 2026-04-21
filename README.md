# Driving School Platform (Monorepo)

Production-oriented full-stack scaffold for a modern driving school platform.

## Technology Stack

- Frontend: Next.js + TypeScript + Tailwind + Framer Motion
- Backend: Node.js + Express + REST API + Socket.io
- Database: PostgreSQL + Prisma ORM
- Auth: NextAuth + credentials/Google/Apple provider support
- Payments: Stripe integration hooks and refund flow
- Messaging: SendGrid + Twilio reminder services
- Maps: Embedded Google Maps (Mapbox-ready)
- Testing: Jest + React Testing Library + Cypress
- Deployment: Docker Compose + GitHub Actions CI/CD

## Monorepo Layout

```text
apps/
  web/
  api/
packages/
  db/
  shared/
docs/
```

## Quick Start

1. `cp .env.example .env`
2. `npm install`
3. `docker compose up -d postgres redis`
4. `npm run prisma:generate`
5. `npm run prisma:migrate -- --name init`
6. `npm run prisma:seed`
7. `npm run dev:api` and `npm run dev`

## Key Product Modules

- Homepage, courses, booking, student portal, instructors, contact, admin dashboard
- Multi-role access control (admin/instructor/student)
- Calendar sync integration points (Google/iCal)
- 24h + 1h reminders via email/SMS service layer
- Instructor reviews and ratings
- DMV practice quiz module
- Document upload endpoints
- Fleet management panel and vehicle lifecycle tracking
- EN/ES/FR multilingual baseline
- Analytics dashboard endpoints
- PWA baseline for offline materials

## Security & Compliance Baseline

- Helmet, CORS, CSRF, input validation, rate limiting
- Cookie consent and privacy data controls
- Secure auth/session pattern via NextAuth + JWT claims
- Backup/disaster recovery plan documented in `docs/disaster-recovery.md`

## API Docs

- Swagger UI: `http://localhost:4000/api/docs`
- OpenAPI JSON: `http://localhost:4000/api/docs.json`

## Contribution Guidelines

1. Branch from `main`
2. Keep PRs scoped by subsystem
3. Add tests for changed behavior
4. Run `npm run lint`, `npm run test`, and `npm run build`
