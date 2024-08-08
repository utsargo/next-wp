import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import QuickMenu from "@/components/quick-menu";
import Footer from "@/components/footer";
import Menu from "@/components/menu";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import GoogleAdsense from "@/components/GoogleAdsense";
import ScrollWidget from "@/components/scroll-widget";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });
export const revalidate = 300;
export const metadata: Metadata = {
  title: "ThoughtsMate",
  description: "Companion of your thoughts",
  openGraph: {
    images: [
      {
        url: "/images/og-logo.png",
        width: 400,
        height: 400,
        alt: "ThoughtsMate",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Menu />
        <div className="w-full flex flex-col min-h-screen pt-16">
        <main className="flex-grow">{children}</main>
        <Footer />
        </div>
        <QuickMenu />
        <ScrollWidget />
        <GoogleAdsense pId="ca-pub-7208187903817029" />
        <SpeedInsights/>
        <Analytics />
      </body>
    </html>
  );
}
