"use server";

import prisma from "@repo/db/clients";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const transferMoney = async (toUser: string, amount: number) => {
  const session = await getServerSession(authOptions);

  const fromUser = session?.user?.id;

  const toSendUser = await prisma.user.findFirst({
    where: {
      number: toUser,
    },
  });
  console.log(toSendUser);

  if (!toSendUser) {
    return { status: "error", msg: "User does not exist" };
  }

  await prisma.$transaction(async (tx) => {
    // this below query locks the balance until the whole txn is done for the user(the user who is logged in and sending money to other)
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUser)} FOR UPDATE`;

    const userBalance = await tx.balance.findUnique({
      where: {
        userId: fromUser,
      },
    });

    if (!userBalance?.amount || userBalance?.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: {
        userId: fromUser,
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });

    await tx.balance.update({
      where: {
        userId: toSendUser.id,
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });

    await tx.p2pTransfer.create({
      data: {
        amount,
        toUserId: toSendUser.id,
        fromUserId: fromUser,
      },
    });
  });

  console.log("Txn Done");
};
