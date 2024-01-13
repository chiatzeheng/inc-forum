import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Navbar from "@/app/components/Navbar";
import { TRPCReactProvider } from "@/trpc/react";
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

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-white text-slate-900 min-h-screen pt-12 mx-10`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Navbar/>
          <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
