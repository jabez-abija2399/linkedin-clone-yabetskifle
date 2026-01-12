import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Github from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Github],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // 👈 This makes the ID available everywhere!
      }
      return session;
    },
  },
});