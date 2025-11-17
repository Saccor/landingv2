import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/ui/GoogleTagManager";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from '@vercel/analytics/react';
import GSAPInitializer from "@/components/GSAPInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Arfve - Shape the future of sustainable sound",
  description: "Join Arfve in revolutionizing audio technology with our modular earbud system. Subscribe now to be part of the future of sustainable sound.",
  icons: {
    icon: "/images/arfve_logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${poppins.variable} antialiased bg-black text-white`}
      >
        <GoogleTagManagerNoScript />

        {/* Page wrapper */}
        <div className="min-h-screen">
          {/* Main content */}
          <main>{children}</main>
        </div>

        <GSAPInitializer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}