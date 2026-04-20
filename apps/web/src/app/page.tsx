import Link from "next/link";
import { Hero } from "../components/Hero";
import { ServiceHighlights } from "../components/ServiceHighlights";
import { Testimonials } from "../components/Testimonials";
import { StructuredData } from "../components/StructuredData";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <ServiceHighlights />
      <Testimonials />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl bg-brand-slate p-8 text-white">
          <h2 className="text-2xl font-bold">Ready to start your lessons?</h2>
          <p className="mt-2 text-slate-200">Book a slot with your preferred instructor and secure your package online.</p>
          <Link href="/booking" className="mt-4 inline-block rounded bg-white px-4 py-2 font-semibold text-brand-slate">Book now</Link>
        </div>
      </section>
    </>
  );
}
