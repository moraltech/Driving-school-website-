import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ROLES, type UserRole } from "@drivingschool/shared";

export interface AuthRequest extends Request {
  user?: { id: string; role: UserRole; email: string };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const bearer = req.headers.authorization;
  const token = bearer?.startsWith("Bearer ") ? bearer.slice(7) : undefined;

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as AuthRequest["user"];
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function authorize(allowed: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return next();
  };
}

export const ROLE = ROLES;
