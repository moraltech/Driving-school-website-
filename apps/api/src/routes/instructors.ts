import { type Response, Router } from "express";
import { body } from "express-validator";
import { prisma } from "@drivingschool/db";
import { authenticate, authorize, ROLE, type AuthRequest } from "../middleware/auth";
import { validate } from "../middleware/validate";

export const instructorsRouter = Router();

instructorsRouter.get("/instructors", async (_req, res) => {
  const instructors = await prisma.user.findMany({
    where: { role: "INSTRUCTOR" },
    include: { instructorProfile: true, taughtBookings: true }
  });
  res.json(instructors);
});

instructorsRouter.post(
  "/instructors/:instructorId/reviews",
  authenticate,
  authorize([ROLE.STUDENT]),
  [body("bookingId").isString(), body("rating").isInt({ min: 1, max: 5 }), body("comment").optional().isString(), validate],
  async (req: AuthRequest, res: Response) => {
    const { instructorId } = req.params;
    const { bookingId, rating, comment } = req.body;

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking || booking.status !== "COMPLETED") {
      return res.status(400).json({ message: "Booking not eligible for review" });
    }

    if (booking.studentId !== req.user?.id || booking.instructorId !== instructorId) {
      return res.status(403).json({ message: "Review not allowed" });
    }

    const review = await prisma.instructorReview.create({
      data: { bookingId, studentId: req.user.id, instructorId, rating, comment }
    });

    const stats = await prisma.instructorReview.aggregate({
      where: { instructorId },
      _avg: { rating: true },
      _count: { id: true }
    });

    await prisma.instructorProfile.update({
      where: { userId: instructorId },
      data: { ratingAverage: stats._avg.rating ?? 5, ratingCount: stats._count.id }
    });

    res.status(201).json(review);
  }
);
