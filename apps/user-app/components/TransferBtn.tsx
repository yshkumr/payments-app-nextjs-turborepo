"use client";

import { useRouter } from "next/navigation";

export const TransferBtn = () => {
  const router = useRouter();
  return (
    <div
      className="rounded-md mt-5 cursor-pointer bg-[#D8F366]"
      onClick={() => {
        router.push("/transfer");
      }}
    >
      <h1 className="text-center text-lg font-bold p-4">
        Transfer money to other users
      </h1>
    </div>
  );
};
