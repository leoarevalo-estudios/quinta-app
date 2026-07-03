import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const passwordOk = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordOk) return null;

        return {
          id: String(user.id),
          name: user.nombre,
          email: user.email,
          telefono: user.telefono,
          role: user.rol,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.telefono = (user as any).telefono;
      }

      if (trigger === "update") {
        token.name = session.name;
        token.email = session.email;
        token.telefono = (session as any).telefono;
      }

      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).telefono = token.telefono;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});