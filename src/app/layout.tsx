import type { Metadata } from "next";
import { DM_Sans, Roboto_Slab } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  title: "Daily Admin — Impact Products",
  description: "Products that make a difference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${robotoSlab.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
