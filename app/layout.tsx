import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Andreas Li — Mechatronics & Robotics Engineer",
    template: "%s | Andreas Li",
  },
  description:
    "Portfolio of Andreas Li — mechatronics engineering student at the University of Waterloo. Experience at Tesla, SIRRL, and Martinrea. Building robots, mechanical systems, and electronics.",
  keywords: [
    "Andreas Li",
    "University of Waterloo",
    "Waterloo Engineering",
    "mechatronics engineering",
    "mechatronics engineer",
    "robotics engineering",
    "robotics engineer",
    "robotics",
    "UWaterloo mechatronics",
    "Waterloo mechatronics",
    "Waterloo robotics",
    "Tesla",
    "mechanical design",
    "portfolio",
    "VEX Robotics",
    "solar car",
  ],
  authors: [{ name: "Andreas Li" }],
  creator: "Andreas Li",
  icons: { icon: "/favicon.svg" },
  metadataBase: new URL("https://andreasli.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Andreas Li",
    title: "Andreas Li — Mechatronics & Robotics Engineer",
    description:
      "Portfolio of Andreas Li — mechatronics engineering student at the University of Waterloo. Building robots, mechanical systems, and electronics.",
    images: [{ url: "/photos/profile.jpg", width: 1200, height: 630, alt: "Andreas Li" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andreas Li — Mechatronics & Robotics Engineer",
    description:
      "Portfolio of Andreas Li — mechatronics engineering student at the University of Waterloo.",
    images: ["/photos/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${bricolage.variable} ${dmMono.variable} antialiased bg-white text-neutral-900`}
      >
        <TopNav />
        <main className="pt-14 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
