export function ProgressTracker() {
  const progress = 35;
  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">Progress Tracking</h3>
      <p className="mt-2 text-sm text-slate-600">You have completed 4 of 12 required lessons.</p>
      <div className="mt-3 h-3 w-full overflow-hidden rounded bg-slate-200">
        <div className="h-full bg-brand-teal" style={{ width: `${progress}%` }} aria-label={`${progress}% complete`} />
      </div>
      <p className="mt-2 text-xs text-slate-500">Next milestone: Night driving certification.</p>
    </section>
  );
}
