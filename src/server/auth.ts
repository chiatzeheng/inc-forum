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
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "John Smith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async function (
        credentials: Record<"email" | "password", string> | undefined,
        req: Pick<RequestInternal, "query" | "body" | "headers" | "method">,
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, user, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...user,
          id: token.sub,
        },
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
