import { Router } from "express";
import { body } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@drivingschool/db";
import { env } from "../config/env";
import { validate } from "../middleware/validate";

export const authRouter = Router();

authRouter.post(
  "/auth/register",
  [
    body("name").isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    body("role").isIn(["STUDENT", "INSTRUCTOR", "ADMIN"]),
    validate
  ],
  async (req, res) => {
    const { name, email, password, role } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        passwordHash,
        ...(role === "STUDENT" ? { studentProfile: { create: {} } } : {}),
        ...(role === "INSTRUCTOR"
          ? { instructorProfile: { create: { bio: "", availabilityJson: {} } } }
          : {})
      }
    });

    return res.status(201).json({ id: user.id, email: user.email, role: user.role });
  }
);

authRouter.post(
  "/auth/login",
  [body("email").isEmail(), body("password").isLength({ min: 8 }), validate],
  async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user?.passwordHash) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, env.JWT_SECRET, {
      expiresIn: "8h"
    });

    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  }
);
