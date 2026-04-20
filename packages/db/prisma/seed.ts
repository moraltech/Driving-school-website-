import bcrypt from "bcryptjs";
import { prisma } from "../src/client";

async function main() {
  const [adminPass, userPass] = await Promise.all([
    bcrypt.hash("Admin123!", 10),
    bcrypt.hash("Student123!", 10)
  ]);

  const admin = await prisma.user.upsert({
    where: { email: "admin@drivesmart.com" },
    update: {},
    create: {
      email: "admin@drivesmart.com",
      name: "Admin User",
      role: "ADMIN",
      passwordHash: adminPass
    }
  });

  const instructor = await prisma.user.upsert({
    where: { email: "instructor@drivesmart.com" },
    update: {},
    create: {
      email: "instructor@drivesmart.com",
      name: "Rosa Martinez",
      role: "INSTRUCTOR",
      passwordHash: userPass,
      instructorProfile: {
        create: {
          bio: "Certified defensive driving coach with 12 years of experience.",
          availabilityJson: { mon: ["09:00", "11:00"], tue: ["13:00"] }
        }
      }
    }
  });

  const student = await prisma.user.upsert({
    where: { email: "student@drivesmart.com" },
    update: {},
    create: {
      email: "student@drivesmart.com",
      name: "Jordan Lee",
      role: "STUDENT",
      passwordHash: userPass,
      studentProfile: { create: { progressPercent: 35, completedLessons: 4 } }
    }
  });

  for (const course of [
    { slug: "beginner", title: "Beginner Program", description: "Start-to-finish learner training", level: "Beginner", durationMinutes: 120, priceCents: 12900, tier: "Standard" },
    { slug: "refresher", title: "Refresher Lessons", description: "Confidence rebuilding sessions", level: "Intermediate", durationMinutes: 90, priceCents: 9900, tier: "Essentials" },
    { slug: "defensive", title: "Defensive Driving", description: "Risk awareness and prevention", level: "Advanced", durationMinutes: 120, priceCents: 14900, tier: "Premium" },
    { slug: "cdl-prep", title: "Commercial CDL Prep", description: "Professional license preparation", level: "Professional", durationMinutes: 180, priceCents: 24900, tier: "Professional" }
  ]) {
    await prisma.course.upsert({ where: { slug: course.slug }, update: course, create: course });
  }

  const beginner = await prisma.course.findUniqueOrThrow({ where: { slug: "beginner" } });

  await prisma.booking.create({
    data: {
      studentId: student.id,
      instructorId: instructor.id,
      courseId: beginner.id,
      startAt: new Date(Date.now() + 86400000),
      endAt: new Date(Date.now() + 86400000 + 7200000),
      pickupLocation: "Downtown Learning Hub",
      status: "CONFIRMED",
      paymentStatus: "PAID"
    }
  });

  await prisma.vehicle.createMany({
    data: [
      {
        vin: "1HGBH41JXMN109186",
        make: "Toyota",
        model: "Corolla",
        year: 2022,
        mileage: 18500,
        insuranceExpiryAt: new Date(Date.now() + 120 * 86400000)
      },
      {
        vin: "2FAGP9CW4KH205774",
        make: "Ford",
        model: "Transit",
        year: 2021,
        mileage: 35200,
        maintenanceDueAt: new Date(Date.now() + 14 * 86400000),
        insuranceExpiryAt: new Date(Date.now() + 90 * 86400000)
      }
    ],
    skipDuplicates: true
  });

  console.log({ admin: admin.email, instructor: instructor.email, student: student.email });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
