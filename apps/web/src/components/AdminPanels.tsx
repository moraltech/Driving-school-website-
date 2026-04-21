export function AdminPanels() {
  const cards = [
    { title: "Instructors", detail: "Manage bios, ratings, and availability calendars." },
    { title: "Students", detail: "Track enrollment, progress, and documentation status." },
    { title: "Schedules", detail: "Oversee bookings, conflicts, and calendar sync status." },
    { title: "Payments", detail: "View completed payments, subscriptions, and refunds." },
    { title: "Fleet", detail: "Track mileage, maintenance due dates, and insurance expiry." },
    { title: "Analytics", detail: "Revenue, utilization, trends, and pass-rate reporting." }
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title} className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-brand-blue">{card.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{card.detail}</p>
        </article>
      ))}
    </section>
  );
}
