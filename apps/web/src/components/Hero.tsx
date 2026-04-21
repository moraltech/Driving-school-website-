"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2">
      <div>
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-brand-slate md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Build safe habits. Pass your driving exam with confidence.
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-slate-600"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Mobile-first scheduling, certified instructors, progress tracking, and
          DMV-ready quizzes in one platform.
        </motion.p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/booking"
            className="rounded bg-brand-blue px-5 py-3 font-semibold text-white"
          >
            Book a Lesson
          </Link>
          <Link
            href="/courses"
            className="rounded border border-slate-300 px-5 py-3 font-semibold"
          >
            Explore Courses
          </Link>
        </div>
      </div>
      <motion.div
        className="rounded-xl bg-gradient-to-br from-brand-blue to-brand-teal p-8 text-white shadow-xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold">Why DriveSmart?</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm">
          <li>98% student pass support rate</li>
          <li>Real-time instructor availability</li>
          <li>Automated reminders by email/SMS</li>
          <li>Multilingual support: EN / ES / FR</li>
        </ul>
      </motion.div>
    </section>
  );
}
