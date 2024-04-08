import { getServerSession } from "next-auth";
import SignInComponent from "../../../components/SignInComponent";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function () {
  const session = await getServerSession(authOptions);

  if (session?.user || session?.user?.id) {
    redirect("/dashboard");
  }
  return <SignInComponent />;
}
