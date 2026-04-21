const courses = [
  { title: "Beginner", description: "Foundational skills for first-time drivers.", tiers: ["Starter: $129", "Plus: $349", "Pro: $599"] },
  { title: "Refresher", description: "Confidence and skill refresh for returning drivers.", tiers: ["Single: $99", "3-Pack: $279", "6-Pack: $499"] },
  { title: "Defensive Driving", description: "Risk management and advanced hazard handling.", tiers: ["Workshop: $149", "Intensive: $389", "Advanced: $699"] },
  { title: "Commercial / CDL Prep", description: "Professional licensing and test preparation.", tiers: ["Core: $249", "Road-Test: $699", "Full Prep: $1199"] }
];

export default function CoursesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-brand-slate">Courses & Pricing</h1>
      <p className="mt-2 text-slate-600">Transparent pricing tiers designed for new learners and experienced drivers.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <article key={course.title} className="rounded-lg border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-brand-blue">{course.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{course.description}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {course.tiers.map((tier) => (<li key={tier} className="rounded border p-2">{tier}</li>))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
