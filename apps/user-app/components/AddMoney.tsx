"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { LabelledInput } from "./LabelledInput";
import { createOnRampTxn } from "../app/lib/actions/createOnRampTxn";
import axios from "axios";
import { useSession } from "next-auth/react";
const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
  {
    name: "Icici Bank",
    redirectUrl: "https://www.icicibank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );

  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  const [amount, setAmount] = useState("");
  const session = useSession() as any;

  return (
    <Card
      title="Add Money"
      className={"text-black border border-black p-4 rounded-md"}
    >
      <div className="w-full">
        <LabelledInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
          width="full"
        />
        <div className="py-4 text-left font-bold">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            className="bg-black w-full rounded-md py-2 text-white"
            onClick={async () => {
              if (!Number(amount) || Number(amount) < 100) {
                return alert("Minimum amount to add is 100");
              }

              const newTxn = await createOnRampTxn(provider, amount);

              await axios.post(
                "http://localhost:3003/bankWebhook",
                {
                  userId: session.data?.user?.id,
                  token: newTxn.txn?.token,
                  amount: Number(amount) * 100,
                },
                {
                  headers: {
                    secret: process.env.BANK_SECRET || "secret123",
                  },
                }
              );

              setAmount("");

              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
