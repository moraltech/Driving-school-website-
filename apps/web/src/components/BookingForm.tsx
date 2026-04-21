"use client";

import { FormEvent, useState } from "react";
import { bookingSchema } from "../lib/schema";

export function BookingForm() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    studentId: "",
    instructorId: "",
    courseId: "",
    startAt: "",
    endAt: "",
    pickupLocation: ""
  });

  async function submit(event: FormEvent) {
    event.preventDefault();
    const parsed = bookingSchema.safeParse({
      ...form,
      startAt: new Date(form.startAt).toISOString(),
      endAt: new Date(form.endAt).toISOString()
    });

    if (!parsed.success) {
      setStatus("Please complete all booking fields correctly.");
      return;
    }

    try {
      const token = localStorage.getItem("demo_token") || "";
      const bookingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(parsed.data)
      });
      if (!bookingResponse.ok) throw new Error("Booking failed");

      const booking = await bookingResponse.json();
      const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ bookingId: booking.id })
      });
      const payment = await paymentResponse.json();
      setStatus(payment.checkoutUrl ? `Booking created. Continue payment: ${payment.checkoutUrl}` : payment.message ?? "Booking created.");
    } catch {
      setStatus("Unable to book lesson at this time.");
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-lg border bg-white p-4 shadow-sm md:grid-cols-2">
      <input className="rounded border px-3 py-2" placeholder="Student ID" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} required />
      <input className="rounded border px-3 py-2" placeholder="Instructor ID" value={form.instructorId} onChange={(e) => setForm({ ...form, instructorId: e.target.value })} required />
      <input className="rounded border px-3 py-2" placeholder="Course ID" value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })} required />
      <input className="rounded border px-3 py-2" type="datetime-local" value={form.startAt} onChange={(e) => setForm({ ...form, startAt: e.target.value })} required />
      <input className="rounded border px-3 py-2" type="datetime-local" value={form.endAt} onChange={(e) => setForm({ ...form, endAt: e.target.value })} required />
      <input className="rounded border px-3 py-2 md:col-span-2" placeholder="Pickup location" value={form.pickupLocation} onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })} required />
      <button className="rounded bg-brand-blue px-4 py-2 font-semibold text-white md:col-span-2" type="submit">Book & Pay</button>
      {status ? <p className="md:col-span-2 text-sm text-slate-600">{status}</p> : null}
    </form>
  );
}
