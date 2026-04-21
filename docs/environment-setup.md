# Environment Setup Guide

## Prerequisites

- Node.js 20+
- npm 10+
- Docker + Docker Compose

## Local Bootstrap

```bash
cp .env.example .env
npm install
docker compose up -d postgres redis
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

## Run Services

```bash
npm run dev:api
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:4000
- Swagger: http://localhost:4000/api/docs

## Important Environment Variables

- `DATABASE_URL`, `DIRECT_URL`
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- `STRIPE_SECRET_KEY`
- `SENDGRID_API_KEY`, `TWILIO_*`
- `GOOGLE_CLIENT_ID/SECRET`, `APPLE_CLIENT_ID/SECRET`
