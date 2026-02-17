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

export const metadata = {
  metadataBase: new URL('https://my-portfolio-delta-ruby-18.vercel.app'),
  title: {
    default: "Dasun Ravihansa | Full-Stack Developer",
    template: "%s | Dasun Ravihansa"
  },
  description: "Dasun Ravihansa is a self-taught Full-Stack Developer and UI/UX Designer from Sri Lanka, specializing in Next.js, React, and modern web technologies.",
  keywords: [
    "Dasun Ravihansa",
    "Dasun",
    "Full-Stack Developer Sri Lanka",
    "Next.js Developer",
    "React Developer",
    "Portfolio website",
    "Web Designer Sri Lanka",
    "Software Engineer Portfolio"
  ],
  authors: [{ name: "Dasun Ravihansa" }],
  creator: "Dasun Ravihansa",
  publisher: "Dasun Ravihansa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "1OhAA1gIq92zlikZD2EqEHy5KU0g14z1l5szx3j5Rj4",
  },
  openGraph: {
    title: "Dasun Ravihansa | Full-Stack Developer",
    description: "Self-taught Full-stack developer portfolio. Specializing in building modern web applications.",
    url: "https://my-portfolio-delta-ruby-18.vercel.app/",
    siteName: "Dasun Ravihansa Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Dasun Ravihansa Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dasun Ravihansa | Full-Stack Developer",
    description: "Building the future of the web with Next.js and React.",
    images: ["/opengraph-image.png"],
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
        {children}
      </body>
    </html>
  );
}



