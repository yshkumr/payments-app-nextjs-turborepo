import { SendMoney } from "../../../components/SendMoney";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function () {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user?.id) {
    redirect("/signin");
  }
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h1 className="text-3xl text-[#413ce6] font-bold text-center">
        Transfer money to other users
      </h1>
      <div>
        <SendMoney />
      </div>
    </div>
  );
}
