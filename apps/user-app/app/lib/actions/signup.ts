"use server";

import prisma from "@repo/db/clients";
import bcrypt from "bcrypt";
import z from "zod";

const validInps = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: "Invalid Email" }),
  phone: z.string().length(10, { message: "Invalid Phone no." }),
  password: z.string().min(6, { message: "Password must be 6 digits" }),
});

type SignUp = z.infer<typeof validInps>;

export async function signUp({ name, email, phone, password }: SignUp) {
  const inpsCheck = validInps.safeParse({ name, email, phone, password });

  if (!inpsCheck.success) {
    return {
      status: "Error",
      message: inpsCheck?.error?.errors[0]?.message || "Invalid Input ",
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { number: phone }],
    },
  });

  if (existingUser) {
    return { status: "Error", message: "User already signed up" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await prisma.$transaction(async (db: any) => {
      const user = await db.user.create({
        data: {
          name,
          email,
          number: phone,
          password: hashedPassword,
        },
        select: {
          id: true,
        },
      });

      await db.balance.create({
        data: {
          amount: 0,
          locked: 0,
          userId: user.id,
        },
      });

      return { status: "OK", message: "Signed up successfully" };
    });

    return response;
  } catch (error) {
    return { status: "Error", message: "Server error, try again" };
  }
}
