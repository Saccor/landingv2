import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/common/GoogleTagManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

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
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arfve - Shape the future of sustainable sound",
  description: "Join Arfve in revolutionizing audio technology with our modular earbud system. Subscribe now to be part of the future of sustainable sound.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${poppins.variable} antialiased bg-black text-white`}
      >
        <GoogleTagManagerNoScript />

        {/* Page wrapper */}
        <div className="flex flex-col min-h-screen">
          <Header />
          
          {/* Main content grows to fill space */}
          <main className="flex-grow">{children}</main>

          <Footer />
        </div>

        <CookieConsent />
      </body>
    </html>
  );
}