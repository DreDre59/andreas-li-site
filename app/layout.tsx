import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Your Name — Mechatronics & Robotics Engineer",
    template: "%s | Your Name",
  },
  description:
    "Personal portfolio of a mechatronics and robotics engineering professional.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Your Name",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100`}
      >
        <Sidebar />
        <main className="lg:pl-56 pt-14 lg:pt-0 min-h-screen">
          <div className="max-w-3xl mx-auto px-6 py-12">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
