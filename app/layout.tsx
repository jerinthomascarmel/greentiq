import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../packages/components/Sidebar";
import { ToastContainer } from 'react-toastify';

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SuperCompany Dashboard",
  description: "Replicated Dashboard UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ToastContainer position="top-right" autoClose={3000} />
        <BaseLayout>
          {children}
        </BaseLayout>
      </body>
    </html>
  );
}


const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100 font-sans text-sm text-gray-700 h-screen flex overflow-hidden">
      <Sidebar />
      {children}
    </div>
  )
}