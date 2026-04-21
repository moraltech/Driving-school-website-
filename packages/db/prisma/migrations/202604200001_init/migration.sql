CREATE TYPE "Role" AS ENUM ('ADMIN', 'INSTRUCTOR', 'STUDENT');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PAID', 'REFUNDED', 'FAILED');

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT,
  "name" TEXT NOT NULL,
  "role" "Role" NOT NULL,
  "phone" TEXT,
  "preferredLocale" TEXT NOT NULL DEFAULT 'en',
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE "InstructorProfile" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "bio" TEXT NOT NULL,
  "ratingAverage" DOUBLE PRECISION NOT NULL DEFAULT 5,
  "ratingCount" INTEGER NOT NULL DEFAULT 0,
  "availabilityJson" JSONB NOT NULL,
  "calendarIcalUrl" TEXT,
  CONSTRAINT "InstructorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "StudentProfile" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "permitNumber" TEXT,
  "completedLessons" INTEGER NOT NULL DEFAULT 0,
  "examPassRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "progressPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "notes" TEXT,
  CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Course" (
  "id" TEXT PRIMARY KEY,
  "slug" TEXT NOT NULL UNIQUE,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "level" TEXT NOT NULL,
  "durationMinutes" INTEGER NOT NULL,
  "priceCents" INTEGER NOT NULL,
  "tier" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Booking" (
  "id" TEXT PRIMARY KEY,
  "studentId" TEXT NOT NULL,
  "instructorId" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "startAt" TIMESTAMP NOT NULL,
  "endAt" TIMESTAMP NOT NULL,
  "pickupLocation" TEXT NOT NULL,
  "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
  "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
  "stripeSessionId" TEXT,
  "calendarEventRef" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Booking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Booking_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Booking_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "InstructorReview" (
  "id" TEXT PRIMARY KEY,
  "bookingId" TEXT NOT NULL UNIQUE,
  "studentId" TEXT NOT NULL,
  "instructorId" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "comment" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "InstructorReview_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "InstructorReview_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "InstructorReview_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "StudyMaterial" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'en',
  "category" TEXT NOT NULL,
  "contentUrl" TEXT NOT NULL,
  "offlinePack" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "PracticeQuestion" (
  "id" TEXT PRIMARY KEY,
  "locale" TEXT NOT NULL DEFAULT 'en',
  "category" TEXT NOT NULL,
  "prompt" TEXT NOT NULL,
  "options" JSONB NOT NULL,
  "correctAnswer" INTEGER NOT NULL,
  "explanation" TEXT NOT NULL
);

CREATE TABLE "Document" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "storagePath" TEXT NOT NULL,
  "verified" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Vehicle" (
  "id" TEXT PRIMARY KEY,
  "vin" TEXT NOT NULL UNIQUE,
  "make" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "mileage" INTEGER NOT NULL DEFAULT 0,
  "maintenanceDueAt" TIMESTAMP,
  "insuranceExpiryAt" TIMESTAMP NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
