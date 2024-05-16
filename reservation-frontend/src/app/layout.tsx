import type { Metadata } from "next";
import "./globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

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
      <body>
        {children}
        <ToastContainer limit={3}/>
      </body>
    </html>
  );
}
