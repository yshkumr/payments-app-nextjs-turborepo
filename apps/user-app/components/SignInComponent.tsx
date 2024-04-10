"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LabelledInput } from "./LabelledInput";

export default function SignInComponent() {
  const [signInData, setSignInData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const router = useRouter();

  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-center text-4xl font-bold mb-2">
          Sign into your account
        </h1>
        <p className="text-center font-medium">
          Don't have an account?
          <Link className=" text-blue-600 underline ml-1" href="/signup">
            Sign Up
          </Link>
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <LabelledInput
          onChange={(e) => {
            setSignInData({
              ...signInData,
              emailOrPhone: e.target.value,
            });
          }}
          width="[450px]"
          label="Email or Phone"
        />
        <LabelledInput
          onChange={(e) => {
            setSignInData({
              ...signInData,
              password: e.target.value,
            });
          }}
          label="Password"
          type="password"
        />
        <Button
          className="bg-black text-white py-3 rounded-md font-medium"
          onClick={async () => {
            const res = await signIn("credentials", {
              emailorphone: signInData.emailOrPhone,
              password: signInData.password,
              redirect: false,
            });

            if (res?.error) {
              alert("Incorrect details " + res.error);
            } else {
              router.push("/dashboard");
            }
          }}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
