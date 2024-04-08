import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/clients";
import { AddMoney } from "../../../components/AddMoney";
import { OnRampTxns } from "../../../components/OnRampTxns";
import { TransferBtn } from "../../../components/TransferBtn";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getDetails() {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user?.id) {
    redirect("/signin");
  }

  const balance = await prisma.balance.findUnique({
    where: {
      userId: session?.user?.id,
    },
  });

  return { session: session, amount: balance?.amount, id: balance?.id };
}

export default async function Dashboard() {
  const userDetails = await getDetails();

  if (!userDetails?.session?.user?.name) {
    return <div>Kindly sign in to access dashboard</div>;
  }

  const transactions = await prisma.onRampTxn.findMany({
    where: {
      userId: userDetails.session.user.id,
    },
  });

  const successfullTxns = transactions.filter((t) => t.status === "Success");

  return (
    <div className="mt-5 ml-10 flex justify-between  gap-5">
      <div className="card border border-black rounded-md w-[35%] p-4 h-max">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold">
                {"Hi, " + userDetails.session.user.name}
              </h1>
            </div>
            <div>
              <Link
                href="/transactions"
                className="bg-black text-white p-2 rounded-full text-sm"
              >
                All Transactions
              </Link>
            </div>
          </div>

          <p className="text-2xl mt-5 text-[#413ce6] font-bold">
            Balance : {userDetails.amount / 100}
          </p>
        </div>

        <div className="mt-3">{"Wallet Id: " + userDetails.id}</div>
        <div className="mt-3">
          <OnRampTxns transactions={successfullTxns.reverse().slice(0, 7)} />
        </div>
      </div>
      <div className="addmoney w-[65%]">
        <AddMoney />
        <TransferBtn />
      </div>
    </div>
  );
}
