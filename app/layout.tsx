import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AmplifyProvider from './AmplifyProvider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "TelMedKonnect",
  description: "Your Truly Unified Medical Connect Experience",
  metadataBase: new URL('https://telmedkonnect.conquerorfoundation.com'), // At the top level
  openGraph: {
    title: "TelMedKonnect",
    description: "Your Truly Unified Medical Connect Experience",
    images: [
      {
        url: '/images/telmedkonnect.png',
        width: 1200,
        height: 630,
        alt: 'TelMedKonnect Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TelMedKonnect",
    description: "Your Truly Unified Medical Connect Experience",
    images: ['/images/telmedkonnect.png'],
  },
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AmplifyProvider>
          {children}
        </AmplifyProvider>
      </body>
    </html>
  );
}
