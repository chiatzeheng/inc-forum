import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";


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
      <body
        className={`font-sans ${inter.variable} mx-10 min-h-screen bg-slate-50 pt-12 text-slate-900`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <MantineProvider>
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
