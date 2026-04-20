import { Router } from "express";

export const chatRouter = Router();

chatRouter.get("/chat/bootstrap", (_req, res) => {
  res.json({ welcome: "Welcome to DriveSmart live chat!", channels: ["support", "scheduling"] });
});
