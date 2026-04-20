import { Router } from "express";
import { prisma } from "@drivingschool/db";

export const coursesRouter = Router();

coursesRouter.get("/courses", async (_req, res) => {
  const courses = await prisma.course.findMany({ where: { isActive: true }, orderBy: { priceCents: "asc" } });
  res.json(courses);
});
