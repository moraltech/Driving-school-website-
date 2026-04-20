import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CookieConsentBanner } from "../components/CookieConsentBanner";

export const metadata: Metadata = {
  title: "DriveSmart Academy",
  description: "Modern driving school platform with booking, portal, and instructor management.",
  keywords: ["driving school", "lessons", "CDL prep", "defensive driving", "student portal"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
