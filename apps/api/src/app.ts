import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import csurf from "csurf";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { loadOpenApiSpec } from "./utils/openapi";
import { errorHandler } from "./middleware/error-handler";
import { healthRouter } from "./routes/health";
import { authRouter } from "./routes/auth";
import { coursesRouter } from "./routes/courses";
import { instructorsRouter } from "./routes/instructors";
import { bookingsRouter } from "./routes/bookings";
import { studentsRouter } from "./routes/students";
import { paymentsRouter } from "./routes/payments";
import { adminRouter } from "./routes/admin";
import { chatRouter } from "./routes/chat";
import { privacyRouter } from "./routes/privacy";

const app = express();
const openapi = loadOpenApiSpec();

app.use(pinoHttp());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(helmet());
app.use(hpp());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false
  })
);

if (env.NODE_ENV !== "test") {
  app.use(csurf({ cookie: { httpOnly: true, sameSite: "lax", secure: env.NODE_ENV === "production" } }));
}

app.get("/api/csrf-token", (req, res) => {
  const token = typeof (req as { csrfToken?: () => string }).csrfToken === "function"
    ? (req as { csrfToken: () => string }).csrfToken()
    : null;
  res.json({ csrfToken: token });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.get("/api/docs.json", (_req, res) => res.json(openapi));

app.use("/api", healthRouter);
app.use("/api", authRouter);
app.use("/api", coursesRouter);
app.use("/api", instructorsRouter);
app.use("/api", bookingsRouter);
app.use("/api", studentsRouter);
app.use("/api", paymentsRouter);
app.use("/api", adminRouter);
app.use("/api", chatRouter);
app.use("/api", privacyRouter);

app.use(errorHandler);

export { app };
