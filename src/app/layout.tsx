import GoogleTagManager from "@/components/GoogleTagManager";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GAMOU - Faça Seus Pedidos via WhatsApp em Segundos!",
  description: "Faça seu negócio crescer com Gamou",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <GoogleTagManager />
      </head>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
