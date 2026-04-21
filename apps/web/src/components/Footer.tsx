export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} DriveSmart Academy. All rights reserved.</p>
        <p className="mt-2">WCAG 2.1 AA aware • GDPR/CCPA privacy controls • Secure payments via Stripe</p>
      </div>
    </footer>
  );
}
