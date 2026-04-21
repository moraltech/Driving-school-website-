import { BookingForm } from "../../components/BookingForm";

export default function BookingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Online Booking & Scheduling</h1>
      <p className="mt-2 text-slate-600">
        Pick an instructor, select your lesson slot, and complete payment securely.
      </p>
      <div className="mt-6">
        <BookingForm />
      </div>
    </section>
  );
}
