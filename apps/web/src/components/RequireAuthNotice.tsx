"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function RequireAuthNotice() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="mb-4 rounded border border-emerald-300 bg-emerald-50 p-3 text-sm">
        Signed in as {session.user.email} ({session.user.role ?? "student"}).{" "}
        <button className="underline" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4 rounded border border-amber-300 bg-amber-50 p-3 text-sm">
      Sign in to enable protected booking and portal actions.{" "}
      <button className="font-semibold underline" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}
