const testimonials = [
  { quote: "The portal and quiz practice helped me pass on my first attempt.", name: "Camila R.", role: "Student" },
  { quote: "Scheduling is effortless and my students always show up prepared.", name: "Mark T.", role: "Instructor" },
  { quote: "Fleet and payment reporting gives us real operational control.", name: "Priya N.", role: "Operations Manager" }
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12" aria-label="Testimonials">
      <h2 className="text-2xl font-bold text-brand-slate">Student & Team Testimonials</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-slate-700">“{item.quote}”</p>
            <p className="mt-4 text-sm font-semibold">{item.name}</p>
            <p className="text-xs text-slate-500">{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
