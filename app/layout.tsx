import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://campwork.vercel.app"),
  title: "Campwork | Coming Soon",
  description: "Something extraordinary is coming. Campwork — the ultimate marketplace for student talent. Get ready to earn, hire, and collaborate like never before.",
  keywords: ["freelance", "students", "university gigs", "campus jobs", "student work", "freelance marketplace", "campwork", "coming soon"],
  authors: [{ name: "Campwork Team" }],
  openGraph: {
    title: "Campwork | Coming Soon",
    description: "Something extraordinary is coming. The future of campus work arrives soon.",
    url: "https://campwork.vercel.app",
    siteName: "Campwork",
    images: [
      {
        url: "/assets/ogImg.png",
        width: 800,
        height: 600,
        alt: "Campwork Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campwork | Coming Soon",
    description: "Something extraordinary is coming. The future of campus work arrives soon.",
    images: ["/assets/ogImg.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
