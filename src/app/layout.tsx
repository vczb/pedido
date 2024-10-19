import GoogleTagManager from "@/components/GoogleTagManager";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gamou - Pedidos via WhatsApp em Segundos!",
  description:
    "Com Gamou, você oferece aos seus clientes uma maneira fácil e ágil de fazer pedidos via WhatsApp. Aumente suas vendas, simplifique o atendimento e otimize a experiência do seu negócio online.",
  keywords:
    "Gamou, pedidos via WhatsApp, comércio local, vendas online, atendimento rápido, loja digital",
  openGraph: {
    type: "website",
    url: "https://gamou.app",
    title:
      "Gamou - Facilite Seus Pedidos via WhatsApp de Forma Rápida e Segura!",
    description:
      "Ofereça uma maneira rápida e prática de seus clientes fazerem pedidos pelo WhatsApp e aumente suas vendas com Gamou.",
    images: [
      {
        url: "https://gamou.app/img/hero.png",
        alt: "Gamou - Faça seus pedidos via WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gamou - Facilite Seus Pedidos via WhatsApp",
    description:
      "Com Gamou, seus clientes fazem pedidos de forma rápida e prática pelo WhatsApp, ajudando seu negócio a crescer.",
    images: [
      {
        url: "https://gamou.app/img/hero.png",
        alt: "Gamou - Faça seus pedidos via WhatsApp",
      },
    ],
  },
  alternates: {
    canonical: "https://gamou.app",
  },
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
