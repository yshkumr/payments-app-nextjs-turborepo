"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { signUp } from "../app/lib/actions/signup";
import { LabelledInput } from "./LabelledInput";

export default function SignUpComponent() {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const router = useRouter();

  async function handleBtn() {
    console.log(signUpData);
    const response = await signUp(signUpData);

    if (response.status === "Error") {
      return alert(response.message);
    }

    alert(response.message);
    router.push("/signin");
  }

  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-center text-4xl font-bold mb-2">
          Create an account
        </h1>
        <p className="text-center font-medium">
          Already have an account?
          <Link className=" text-blue-600 underline ml-1" href="/signin">
            Sign In
          </Link>
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <LabelledInput
          label="Name"
          placeholder="John Doe"
          onChange={(e) => {
            setSignUpData({
              ...signUpData,
              name: e.target.value,
            });
          }}
        />
        <LabelledInput
          label="Email"
          placeholder="johndoe@email.com"
          onChange={(e) => {
            setSignUpData({
              ...signUpData,
              email: e.target.value,
            });
          }}
        />
        <LabelledInput
          label="Phone"
          placeholder="9876543210"
          onChange={(e) => {
            setSignUpData({
              ...signUpData,
              phone: e.target.value,
            });
          }}
        />
        <LabelledInput
          label="Password"
          type="password"
          onChange={(e) => {
            setSignUpData({
              ...signUpData,
              password: e.target.value,
            });
          }}
        />
        <Button
          className="bg-black text-white py-3 rounded-md font-medium"
          onClick={handleBtn}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
