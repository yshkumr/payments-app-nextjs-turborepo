"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/clients";

type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
} | null;

export async function user() {
  const session: Session = await getServerSession(authOptions);

  if (!session?.user) {
    return "Unauthorized";
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      number: true,
    },
  });

  return user;
}
