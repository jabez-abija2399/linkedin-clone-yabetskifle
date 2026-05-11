import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  title: "LinkedIn Clone",
  description: "A professional networking platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F3F2EF] text-black">
        <AuthProvider>
          <ToastProvider />
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
