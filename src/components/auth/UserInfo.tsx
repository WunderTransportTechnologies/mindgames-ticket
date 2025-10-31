"use client";

import { useSession } from "@/lib/auth-client";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

export function UserInfo() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="text-gray-600">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-gray-700">You are not signed in.</p>
        <SignInButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center gap-4">
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">{session.user.name}</p>
          <p className="text-sm text-gray-600">{session.user.email}</p>
        </div>
      </div>
      <SignOutButton />
    </div>
  );
}
