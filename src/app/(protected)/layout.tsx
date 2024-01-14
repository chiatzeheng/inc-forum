import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Navbar from "@/app/components/Navbar";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";
import { getAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

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
  if (session?.user) return redirect("/sign-in");

  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} mx-10 min-h-screen bg-white pt-12 text-slate-900`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <MantineProvider>
            <Navbar />
            <div className="container mx-auto h-full max-w-7xl pt-12">
              {children}
            </div>
            <Toaster />
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
