import cron from "node-cron";
import { prisma } from "@drivingschool/db";
import { sendLessonReminder } from "./communications";

async function reminderSweep(hoursAhead: number) {
  const now = new Date();
  const from = new Date(now.getTime() + (hoursAhead - 0.5) * 3600000);
  const to = new Date(now.getTime() + (hoursAhead + 0.5) * 3600000);

  const bookings = await prisma.booking.findMany({
    where: { startAt: { gte: from, lte: to }, status: "CONFIRMED" },
    include: { student: true, instructor: true, course: true }
  });

  await Promise.all(
    bookings.map((booking) =>
      sendLessonReminder({
        toEmail: booking.student.email,
        toPhone: booking.student.phone,
        instructorName: booking.instructor.name,
        courseName: booking.course.title,
        startAt: booking.startAt,
        hoursAhead
      })
    )
  );
}

export function scheduleReminders() {
  cron.schedule("0 * * * *", async () => {
    await reminderSweep(24);
    await reminderSweep(1);
  });
}
