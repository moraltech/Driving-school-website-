"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { dictionaries, type Locale } from "../lib/i18n";

export function Navbar() {
  const [locale, setLocale] = useState<Locale>("en");
  const copy = useMemo(() => dictionaries[locale], [locale]);

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4" aria-label="Main navigation">
        <Link className="font-bold text-brand-blue" href="/">
          DriveSmart Academy
        </Link>
        <ul className="flex items-center gap-4 text-sm font-medium">
          <li><Link href="/">{copy.navHome}</Link></li>
          <li><Link href="/courses">{copy.navCourses}</Link></li>
          <li><Link href="/booking">{copy.navBooking}</Link></li>
          <li><Link href="/portal">{copy.navPortal}</Link></li>
          <li><Link href="/instructors">Instructors</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li>
            <label htmlFor="locale" className="sr-only">Language</label>
            <select
              id="locale"
              className="rounded border px-2 py-1"
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
  );
}
