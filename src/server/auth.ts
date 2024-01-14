import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  Awaitable,
  RequestInternal,
  User,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "John Smith" },
      },
      authorize: function (credentials: Record<"email", string> | undefined, req: Pick<RequestInternal, "query" | "body" | "headers" | "method">): Awaitable<User | null> {
        throw new Error("Function not implemented.");
      }
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        ...user,
      },
    }),
    async signIn({ user }) {
      if (!user.email) return false;
      const exists = await db.user.findUnique({
        where: {
          email: user.email.toLowerCase(),
        },
      });
      return !!exists;
    },    
    redirect() {
      return '/projects'
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)