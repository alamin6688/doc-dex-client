import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import { Suspense } from "react";
import ChatbotLoader from "@/components/shared/ChatbotLoader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doc Dex",
  description: "A healthcare Support System built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
        {children}
        <ChatbotLoader />
        <Toaster position="top-right" richColors />
        <Suspense fallback={null}>
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </Suspense>
      </body>
    </html>
  );
}
