export default function OfflinePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Offline Study Mode</h1>
      <p className="mt-3 text-slate-600">
        You are currently offline. Downloaded materials remain available for review.
      </p>
      <ul className="mt-4 list-disc pl-5 text-sm text-slate-700">
        <li>Road signs handbook</li>
        <li>Defensive driving checklist</li>
        <li>Practice exam quick tips</li>
      </ul>
    </section>
  );
}
