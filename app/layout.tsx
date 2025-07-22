import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/templates/ui/sonner";
import { RedirectErrorHandler } from "@/components/redirect-error-handler";
import { Suspense } from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Better Auth Starter",
  description:
    "Simple starter pack for Better Auth, with Shadcn, Drizzle, and Neon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
         className={`${dmSans.className} antialiased`}
      >
        <Suspense fallback={null}>
          <RedirectErrorHandler />
        </Suspense>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
