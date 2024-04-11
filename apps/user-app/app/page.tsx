import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/signin");
  }
}

// latest @3:33 pm change added
