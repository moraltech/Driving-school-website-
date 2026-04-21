import { AdminPanels } from "../../components/AdminPanels";

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-slate-600">
        Manage instructors, students, schedules, payments, fleet vehicles, and key analytics.
      </p>
      <div className="mt-6">
        <AdminPanels />
      </div>
    </section>
  );
}
