const materials = [
  { name: "Road Signs Handbook", locale: "EN", offline: true },
  { name: "Manual de Senales", locale: "ES", offline: true },
  { name: "Guide Priorites et Vitesse", locale: "FR", offline: false }
];

export function StudyMaterials() {
  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-brand-slate">Study Materials</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {materials.map((item) => (
          <li key={item.name} className="flex items-center justify-between rounded border p-2">
            <span>{item.name}</span>
            <span className="text-slate-500">
              {item.locale} {item.offline ? "• Offline" : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
