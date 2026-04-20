import { createServer } from "http";
import { app } from "./app";
import { env } from "./config/env";
import { createSocketServer } from "./socket";
import { scheduleReminders } from "./services/reminders";

const httpServer = createServer(app);
createSocketServer(httpServer);
scheduleReminders();

httpServer.listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}`);
});
