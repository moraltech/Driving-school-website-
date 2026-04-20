import { type Request, type Response, Router } from "express";
import { body } from "express-validator";
import { prisma } from "@drivingschool/db";
import { authenticate, authorize, ROLE } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { stripe } from "../services/stripe";

export const paymentsRouter = Router();

paymentsRouter.post(
  "/payments/create-checkout",
  authenticate,
  authorize([ROLE.STUDENT, ROLE.ADMIN]),
  [body("bookingId").isString(), validate],
  async (req: Request, res: Response) => {
    const booking = await prisma.booking.findUnique({ where: { id: req.body.bookingId }, include: { course: true } });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (!stripe) {
      return res.json({
        mode: "mock",
        checkoutUrl: `/checkout/mock/${booking.id}`,
        message: "Stripe key missing. Using local mock flow."
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: booking.course.priceCents,
            product_data: { name: booking.course.title }
          }
        }
      ],
      success_url: "http://localhost:3000/portal?payment=success",
      cancel_url: "http://localhost:3000/booking?payment=cancelled"
    });

    await prisma.booking.update({ where: { id: booking.id }, data: { stripeSessionId: session.id } });
    res.json({ checkoutUrl: session.url });
  }
);

paymentsRouter.post("/payments/:bookingId/refund", authenticate, authorize([ROLE.ADMIN]), async (req: Request, res: Response) => {
  const bookingId = Array.isArray(req.params.bookingId) ? req.params.bookingId[0] : req.params.bookingId;
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  await prisma.booking.update({ where: { id: booking.id }, data: { paymentStatus: "REFUNDED" } });
  res.json({ refunded: true, bookingId: booking.id });
});
