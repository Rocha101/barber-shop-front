"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { LoadingProvider } from "@/hooks/useLoading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barber Shop Manager",
  description: "Sistema para gestão de agendamentos de barbearias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} relative`}>
        <LoadingProvider>{children}</LoadingProvider>
        <Toaster />
        {/*   <ConnectionTester /> */}
      </body>
    </html>
  );
}
