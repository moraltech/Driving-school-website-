import { Router } from "express";

export const privacyRouter = Router();

privacyRouter.post("/privacy/export", (_req, res) => {
  res.json({ status: "queued", message: "Data export request received." });
});

privacyRouter.post("/privacy/delete", (_req, res) => {
  res.json({ status: "queued", message: "Data deletion request received." });
});
