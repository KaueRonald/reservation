import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Site de reservas de serviços de beleza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
