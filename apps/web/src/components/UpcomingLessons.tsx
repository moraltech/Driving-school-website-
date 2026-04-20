const lessons = [
  { date: "2026-04-22 10:00", instructor: "Rosa Martinez", course: "Beginner Program" },
  { date: "2026-04-24 14:00", instructor: "Aiden Cole", course: "Defensive Driving" }
];

export function UpcomingLessons() {
  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">Upcoming Lessons</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {lessons.map((lesson) => (
          <li key={lesson.date} className="rounded border p-2">
            <p className="font-medium">{lesson.course}</p>
            <p className="text-slate-600">
              {lesson.date} with {lesson.instructor}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
