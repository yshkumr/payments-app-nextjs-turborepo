"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

export default function AppBarComponent() {
  const session = useSession();

  return (
    <Appbar
      onSignIn={signIn}
      onSignOut={() => {
        signOut({
          redirect: true,
          callbackUrl: "/signin",
        });
      }}
      user={session.data?.user}
    />
  );
}
