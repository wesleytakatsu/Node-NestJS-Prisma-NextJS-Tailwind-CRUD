import "./globals.css";

import { Header } from '../components/header';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerenciador de Tarefas do Wesley Sieiro Takatsu de Araujo",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  description: "Demonstração de um gerenciador de tarefas utilizando Next.js do Wesley Sieiro Takatsu de Araujo",
  openGraph: {
    title: "Gerenciador de Tarefas do Wesley Sieiro Takatsu de Araujo",
    description: "Demonstração de um gerenciador de tarefas utilizando Next.js do Wesley Sieiro Takatsu de Araujo",
    images: ['/og-image.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased`}
      >
        <Header />

        {children}
      </body>
    </html>
  );
}
