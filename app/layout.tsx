import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import ConnectionTesterProvider from "@/components/providers/conn-tester-provider.";

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
      <body className={inter.className}>
        <ConnectionTesterProvider>{children}</ConnectionTesterProvider>
        <Toaster />
      </body>
    </html>
  );
}
