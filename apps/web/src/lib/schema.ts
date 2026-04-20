import { z } from "zod";

export const bookingSchema = z.object({
  studentId: z.string().min(1),
  instructorId: z.string().min(1),
  courseId: z.string().min(1),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  pickupLocation: z.string().min(3)
});
