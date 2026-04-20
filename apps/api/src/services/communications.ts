import sgMail from "@sendgrid/mail";
import twilio from "twilio";
import { env } from "../config/env";

if (env.SENDGRID_API_KEY) sgMail.setApiKey(env.SENDGRID_API_KEY);

const twilioClient =
  env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN
    ? twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)
    : null;

export async function sendLessonReminder(args: {
  toEmail: string;
  toPhone?: string | null;
  instructorName: string;
  courseName: string;
  startAt: Date;
  hoursAhead: number;
}) {
  const text = `Reminder: ${args.courseName} with ${args.instructorName} starts in ${args.hoursAhead} hour(s) at ${args.startAt.toLocaleString()}.`;

  if (env.SENDGRID_API_KEY) {
    await sgMail.send({
      to: args.toEmail,
      from: "noreply@drivesmart.example",
      subject: "Lesson reminder",
      text
    });
  }

  if (twilioClient && args.toPhone && env.TWILIO_PHONE_NUMBER) {
    await twilioClient.messages.create({
      body: text,
      to: args.toPhone,
      from: env.TWILIO_PHONE_NUMBER
    });
  }

  if (!env.SENDGRID_API_KEY && !twilioClient) {
    console.log("[Reminder fallback]", text);
  }
}
