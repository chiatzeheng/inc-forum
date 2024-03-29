import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";
import { getAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import NextAuthProvider from "../_components/NextAuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  preload: true,
});

export const metadata = {
  title: "Discussion Forum",
  description: "A discussion forum built with Next.js and TRPC",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session?.user) redirect("/sign-in");
  else
    return (
      <html lang="en">
        <body
          className={`font-sans ${inter.variable} mx-10 bg-slate-50 pt-12 text-slate-900`}
        >

          <TRPCReactProvider cookies={cookies().toString()}>
            <MantineProvider>
              <NextAuthProvider>
                <Navbar />
                <div className="mt-16 md:container">{children}</div>
                <Toaster />
              </NextAuthProvider>
            </MantineProvider>
          </TRPCReactProvider>
        </body>
      </html>
    );
}
export const dynamic = "force-dynamic";
