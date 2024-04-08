"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { LabelledInput } from "./LabelledInput";
import { transferMoney } from "../app/lib/actions/transferMoney";

export const SendMoney = () => {
  const [details, setDetails] = useState({
    number: "",
    amount: "",
  });

  return (
    <div className="border border-gray rounded-md py-5 w-[450px] px-10">
      <LabelledInput
        label="Number"
        onChange={(e) => {
          setDetails({
            ...details,
            number: e.target.value,
          });
        }}
        value={details.number}
      />
      <LabelledInput
        label="Amount"
        onChange={(e) => {
          setDetails({
            ...details,
            amount: e.target.value,
          });
        }}
        value={details.amount}
      />
      <Button
        className="bg-black mt-5 text-white text-xl w-[98%] py-2 rounded-md"
        onClick={async () => {
          if (!details.amount || Number(details.amount) < 10) {
            return alert("Minimum amount to send is 10");
          }

          const response = await transferMoney(
            details.number,
            Number(details.amount) * 100
          );

          if (response?.status === "error") {
            return alert(response?.msg);
          }

          setDetails({
            number: "",
            amount: "",
          });

          alert("Transfer successful");
        }}
      >
        Send
      </Button>
    </div>
  );
};
