import { Response, Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import { prisma } from "@drivingschool/db";
import { authenticate, authorize, ROLE, type AuthRequest } from "../middleware/auth";
import { validate } from "../middleware/validate";

const upload = multer({ dest: "uploads" });

export const studentsRouter = Router();

studentsRouter.get("/portal/progress", authenticate, authorize([ROLE.STUDENT]), async (req: AuthRequest, res) => {
  const profile = await prisma.studentProfile.findUnique({
    where: { userId: req.user!.id },
    include: {
      user: {
        include: {
          studentBookings: {
            include: { course: true, instructor: true },
            orderBy: { startAt: "asc" }
          }
        }
      }
    }
  });

  const materials = await prisma.studyMaterial.findMany({ where: { locale: { in: ["en", "es", "fr"] } } });
  res.json({ profile, materials });
});

studentsRouter.post(
  "/portal/quiz/submit",
  authenticate,
  authorize([ROLE.STUDENT]),
  [body("answers").isArray({ min: 1 }), validate],
  async (req: AuthRequest, res: Response) => {
    const questions = await prisma.practiceQuestion.findMany({ take: req.body.answers.length });
    const score = questions.reduce((acc, q, i) => (req.body.answers[i] === q.correctAnswer ? acc + 1 : acc), 0);
    const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;

    await prisma.studentProfile.update({ where: { userId: req.user!.id }, data: { examPassRate: percent } });
    res.json({ score, total: questions.length, percent });
  }
);

studentsRouter.post(
  "/portal/documents/upload",
  authenticate,
  authorize([ROLE.STUDENT]),
  upload.single("document"),
  [body("type").isIn(["ID", "PERMIT", "CERTIFICATE"]), validate],
  async (req: AuthRequest, res: Response) => {
    if (!req.file) return res.status(400).json({ message: "File required" });

    const document = await prisma.document.create({
      data: { userId: req.user!.id, type: req.body.type, storagePath: req.file.path }
    });

    res.status(201).json(document);
  }
);
