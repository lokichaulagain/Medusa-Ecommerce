"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalContextProvider } from "./context/GLobalContext";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Jacket House",
//   description: "Jacket House, Lalitpur, Nepal",
// };

import { MedusaProvider } from "medusa-react";
// import Storefront from "./Storefront"
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={inter.className}
      >
        <GlobalContextProvider>
          <MedusaProvider
            queryClientProviderProps={{ client: queryClient }}
            baseUrl="http://localhost:9000">
            {/* <Storefront /> */}
            {children}
          </MedusaProvider>
        </GlobalContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
