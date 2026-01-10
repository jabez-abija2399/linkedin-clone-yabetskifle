import type { Metadata } from "next";
import "./globals.css"; // We will create this next

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
        {children}
      </body>
    </html>
  );
}