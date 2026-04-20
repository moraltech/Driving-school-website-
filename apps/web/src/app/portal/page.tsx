import { ProgressTracker } from "../../components/ProgressTracker";
import { UpcomingLessons } from "../../components/UpcomingLessons";
import { StudyMaterials } from "../../components/StudyMaterials";
import { QuizCard } from "../../components/QuizCard";

export default function PortalPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Student Portal</h1>
      <p className="mt-2 text-slate-600">
        Login, track progress, review upcoming lessons, and access DMV prep materials.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ProgressTracker />
        <UpcomingLessons />
        <StudyMaterials />
        <QuizCard />
      </div>
    </section>
  );
}
