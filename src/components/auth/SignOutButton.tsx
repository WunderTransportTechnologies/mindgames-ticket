"use client";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 transition-colors"
    >
      Sign Out
    </button>
  );
}
