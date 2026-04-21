export async function syncCalendarEvent(payload: {
  bookingId: string;
  startAt: Date;
  endAt: Date;
  title: string;
  userEmail: string;
}) {
  return {
    externalEventId: `ical-${payload.bookingId}`,
    provider: "ical"
  };
}
