import { Router } from "express";
import { body } from "express-validator";
import { prisma } from "@drivingschool/db";
import { authenticate, authorize, ROLE, type AuthRequest } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { syncCalendarEvent } from "../services/calendar";

export const bookingsRouter = Router();

bookingsRouter.get("/bookings", authenticate, async (req: AuthRequest, res) => {
  const where =
    req.user?.role === ROLE.STUDENT
      ? { studentId: req.user.id }
      : req.user?.role === ROLE.INSTRUCTOR
        ? { instructorId: req.user.id }
        : {};

  const bookings = await prisma.booking.findMany({
    where,
    include: { student: true, instructor: true, course: true },
    orderBy: { startAt: "asc" }
  });

  res.json(bookings);
});

bookingsRouter.post(
  "/bookings",
  authenticate,
  authorize([ROLE.STUDENT, ROLE.ADMIN]),
  [
    body("studentId").isString(),
    body("instructorId").isString(),
    body("courseId").isString(),
    body("startAt").isISO8601(),
    body("endAt").isISO8601(),
    body("pickupLocation").isLength({ min: 3 }),
    validate
  ],
  async (req, res) => {
    const booking = await prisma.booking.create({ data: req.body });
    const student = await prisma.user.findUniqueOrThrow({ where: { id: booking.studentId } });

    const event = await syncCalendarEvent({
      bookingId: booking.id,
      startAt: booking.startAt,
      endAt: booking.endAt,
      title: "Driving lesson",
      userEmail: student.email
    });

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: { calendarEventRef: event.externalEventId }
    });

    res.status(201).json(updated);
  }
);

bookingsRouter.patch(
  "/bookings/:id/status",
  authenticate,
  authorize([ROLE.ADMIN, ROLE.INSTRUCTOR]),
  [body("status").isIn(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]), validate],
  async (req, res) => {
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });

    res.json(booking);
  }
);
