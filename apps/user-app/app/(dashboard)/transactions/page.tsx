import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/clients";
import { OnRampTxns } from "../../../components/OnRampTxns";
import { redirect } from "next/navigation";
import { RcdTxn } from "../../../components/RcdTxn";
import { SentTxnComp } from "../../../components/SentTxn";

export default async function () {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user?.id) {
    redirect("/signin");
  }

  const transactions = await prisma.onRampTxn.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const successfullTxns = transactions.filter(
    (t: {
      id: string;
      status: string;
      amount: number;
      provider: string;
      token: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
    }) => t.status === "Success"
  );

  const txns = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        {
          fromUserId: session?.user?.id,
        },
        {
          toUserId: session?.user?.id,
        },
      ],
    },
  });

  const sentTxns = txns.filter(
    (t: {
      id: string;
      amount: number;
      toUserId: string;
      fromUserId: string;
      createdAt: Date;
    }) => t.fromUserId === session.user?.id
  );
  const receivedTxns = txns.filter(
    (t: {
      id: string;
      amount: number;
      toUserId: string;
      fromUserId: string;
      createdAt: Date;
    }) => t.toUserId === session.user?.id
  );

  return (
    <div className="border border-black flex mx-auto max-w-[85%] mt-5 rounded-md flex-col">
      <h1 className="text-2xl mx-auto py-4 text-[#413ce6] font-bold">
        Recent Transactions
      </h1>
      <div className="main-card flex p-5 gap-5">
        <RcdTxn rcdTxns={receivedTxns} />
        <SentTxnComp sentTxns={sentTxns} />

        <div className="w-1/3">
          <OnRampTxns transactions={successfullTxns.reverse().slice(0, 7)} />
        </div>
      </div>
    </div>
  );
}
