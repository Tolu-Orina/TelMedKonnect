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

export const metadata: Metadata = {
  title: "TelMedKonnect",
  description: "Your Truly Unified Medical Connect Experience",
  openGraph: {
    title: "TelMedKonnect",
    description: "Your Truly Unified Medical Connect Experience",
    images: [
      {
        url: '/images/telmedkonnect.png', // Replace with the actual path to your image
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
    images: ['/images/telmedkonnect.png'], // Replace with the actual path to your image
  },
  icons: {
    icon: '/images/favicon.ico', // Ensure this path is correct
    apple: '/images/apple-touch-icon.png', // Optional: for Apple devices
    // You can add more icon sizes and types as needed
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
