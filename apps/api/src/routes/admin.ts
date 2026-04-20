import { Router } from "express";
import { body } from "express-validator";
import { prisma } from "@drivingschool/db";
import { authenticate, authorize, ROLE } from "../middleware/auth";
import { validate } from "../middleware/validate";

export const adminRouter = Router();

adminRouter.use(authenticate, authorize([ROLE.ADMIN]));

adminRouter.get("/admin/overview", async (_req, res) => {
  const [students, instructors, upcomingLessons, paidCount] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "INSTRUCTOR" } }),
    prisma.booking.count({ where: { startAt: { gte: new Date() } } }),
    prisma.booking.count({ where: { paymentStatus: "PAID" } })
  ]);

  res.json({ students, instructors, upcomingLessons, paidBookings: paidCount });
});

adminRouter.get("/admin/analytics", async (_req, res) => {
  const [paidBookings, total, completed, studentProfiles, vehicles] = await Promise.all([
    prisma.booking.findMany({ where: { paymentStatus: "PAID" }, include: { course: true } }),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "COMPLETED" } }),
    prisma.studentProfile.findMany(),
    prisma.vehicle.findMany()
  ]);

  const revenue = paidBookings.reduce((sum, booking) => sum + booking.course.priceCents, 0) / 100;
  const studentPassRate = studentProfiles.length
    ? Math.round(studentProfiles.reduce((sum, s) => sum + s.examPassRate, 0) / studentProfiles.length)
    : 0;

  res.json({
    revenue,
    bookingTrends: { total, completed, completionRate: total ? Math.round((completed / total) * 100) : 0 },
    instructorUtilization: "Derived from booked-hours / available-hours",
    studentPassRate,
    fleetHealth: vehicles.map((vehicle) => ({
      vin: vehicle.vin,
      mileage: vehicle.mileage,
      maintenanceDueAt: vehicle.maintenanceDueAt,
      insuranceExpiryAt: vehicle.insuranceExpiryAt
    }))
  });
});

adminRouter.get("/admin/vehicles", async (_req, res) => {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  res.json(vehicles);
});

adminRouter.post(
  "/admin/vehicles",
  [
    body("vin").isLength({ min: 10 }),
    body("make").isString(),
    body("model").isString(),
    body("year").isInt(),
    body("insuranceExpiryAt").isISO8601(),
    validate
  ],
  async (req, res) => {
    const vehicle = await prisma.vehicle.create({
      data: {
        ...req.body,
        insuranceExpiryAt: new Date(req.body.insuranceExpiryAt),
        maintenanceDueAt: req.body.maintenanceDueAt ? new Date(req.body.maintenanceDueAt) : undefined
      }
    });

    res.status(201).json(vehicle);
  }
);
