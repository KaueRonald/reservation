import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "SJP Serviços",
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
