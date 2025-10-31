"use client";

import { authClient } from "@/lib/auth-client";

export function SignInButton() {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
    >
      Sign in with Google
    </button>
  );
}
