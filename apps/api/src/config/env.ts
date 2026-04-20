import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: "../../.env" });

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1).default("postgresql://postgres:postgres@localhost:5432/driving_school?schema=public"),
  JWT_SECRET: z.string().default("dev_jwt_secret"),
  COOKIE_SECRET: z.string().default("dev_cookie_secret"),
  SOCKET_ORIGIN: z.string().default("http://localhost:3000"),
  STRIPE_SECRET_KEY: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional()
});

export const env = schema.parse(process.env);
