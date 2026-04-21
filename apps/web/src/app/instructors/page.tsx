const instructors = [
  { name: "Rosa Martinez", bio: "Defensive driving specialist and bilingual coach.", rating: "4.9 (126 reviews)", availability: "Mon, Tue, Thu" },
  { name: "Aiden Cole", bio: "CDL preparation expert focused on practical road tests.", rating: "4.8 (89 reviews)", availability: "Wed, Fri, Sat" },
  { name: "Sophie Nguyen", bio: "Beginner-focused instructor with calm, confidence-first approach.", rating: "5.0 (77 reviews)", availability: "Mon, Wed, Sun" }
];

export default function InstructorsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Instructor Directory</h1>
      <p className="mt-2 text-slate-600">Browse bios, availability calendars, and ratings before booking.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {instructors.map((instructor) => (
          <article key={instructor.name} className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-brand-blue">{instructor.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{instructor.bio}</p>
            <p className="mt-3 text-sm">⭐ {instructor.rating}</p>
            <p className="text-sm text-slate-500">Availability: {instructor.availability}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
