import "@/styles/globals.css";
import '@mantine/core/styles.css';

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Navbar from "@/app/components/Navbar";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "react-hot-toast";

import {  MantineProvider } from '@mantine/core';

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
        <MantineProvider>
          <Navbar/>
          <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
          </div>
          <Toaster />
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
