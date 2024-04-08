"use server";

import prisma from "@repo/db/clients";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTxn(provider: string, amount: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  console.log("Amount" + Number(amount));

  const token = "eqwei20eiwqoewqe" + Math.round(Math.random() * 254600);

  const txn = await prisma.onRampTxn.create({
    data: {
      status: "Processing",
      amount: Number(amount) * 100,
      provider,
      token,
      userId: session?.user?.id,
    },
    select: {
      id: true,
      token: true,
    },
  });

  return {
    msg: "Done",
    txn,
  };
}
