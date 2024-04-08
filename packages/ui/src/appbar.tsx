import { Button } from "./button";
import Link from "next/link";

type AppBarProps = {
  user?: {
    name?: string | null;
  };

  onSignIn: () => void;
  onSignOut: () => void;
};

export const Appbar = ({ user, onSignOut, onSignIn }: AppBarProps) => {
  return (
    <div className=" border-b-[1px]">
      <div className="flex justify-between items-center max-w-[90%] mx-auto py-5">
        <div>
          <Link href="/dashboard" className="font-semibold text-xl">
            Payments App
          </Link>
        </div>
        <div>
          <Button
            className="bg-black text-white p-4 py-2 rounded-md"
            onClick={user ? onSignOut : onSignIn}
          >
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
};
