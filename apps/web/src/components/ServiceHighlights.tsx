const services = [
  { title: "Beginner Lessons", detail: "Structured start-to-finish guidance for first-time drivers." },
  { title: "Defensive Driving", detail: "Hazard management and risk reduction techniques." },
  { title: "Commercial/CDL Prep", detail: "Route drills and inspection prep for professional licensing." },
  { title: "Refresher Courses", detail: "Rebuild confidence after long breaks from driving." }
];

export function ServiceHighlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8" aria-label="Service highlights">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <article key={service.title} className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-brand-blue">{service.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{service.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
