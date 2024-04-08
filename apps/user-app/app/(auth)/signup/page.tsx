import SignUpComponent from "../../../components/SignUpComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function () {
  const session = await getServerSession(authOptions);

  if (session?.user || session?.user?.id) {
    redirect("/dashboard");
  }
  return <SignUpComponent />;
}
