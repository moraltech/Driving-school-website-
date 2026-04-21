import { LiveChatWidget } from "../../components/LiveChatWidget";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-2 text-slate-600">Send inquiries, check our location, or chat with support instantly.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-xl font-semibold">Inquiry Form</h2>
          <form className="mt-3 grid gap-3">
            <input className="rounded border px-3 py-2" placeholder="Full name" aria-label="Full name" />
            <input className="rounded border px-3 py-2" placeholder="Email" aria-label="Email" type="email" />
            <textarea className="rounded border px-3 py-2" placeholder="How can we help?" aria-label="Message" rows={4} />
            <button type="button" className="rounded bg-brand-blue px-4 py-2 font-semibold text-white">Submit</button>
          </form>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold">Our Location</h2>
            <iframe
              title="Driving School Location"
              className="mt-3 h-64 w-full rounded"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.469088879017!2d-122.337!3d47.608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906ab2f89f1a23%3A0x43d8bbd5ca0f37d1!2sSeattle!5e0!3m2!1sen!2sus!4v1710000000000"
            />
          </div>
          <LiveChatWidget />
        </div>
      </div>
    </section>
  );
}
