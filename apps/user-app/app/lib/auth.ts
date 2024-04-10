import prisma from "@repo/db/clients";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailorphone: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.emailorphone },
              { number: credentials.emailorphone },
            ],
          },
        });

        if (!existingUser) {
          return null;
        }

        const passwordValidation = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordValidation) {
          return null;
        }

        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          phone: existingUser.number,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
