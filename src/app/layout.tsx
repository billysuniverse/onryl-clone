import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "Onryl | SMS Marketing Platform",
  description: "Onryl messaging platform for SMS marketing and customer engagement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased font-sans">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
