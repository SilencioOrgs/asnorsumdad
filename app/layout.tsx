import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asnorsumdad.vercel.app"),
  title: "Asnor Sumdad | Full-Stack & Mobile Developer",
  description:
    "Full-stack and mobile developer in Laguna, Philippines building clean web, mobile, AI, and IoT systems for real-world problems.",
  keywords: [
    "Full-Stack Developer",
    "Mobile Developer",
    "React",
    "Next.js",
    "Flutter",
    "TypeScript",
    "Python",
    "FastAPI",
    "Firebase",
    "IoT",
    "AI",
    "Philippines",
  ],
  icons: {
    icon: [
      { url: "/icon-as.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon-as.png",
    apple: "/icon-as.png",
  },
  authors: [{ name: "Asnor Sumdad" }],
  creator: "Asnor Sumdad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asnorsumdad.vercel.app",
    siteName: "Asnor Sumdad Portfolio",
    title: "Asnor Sumdad | Full-Stack & Mobile Developer",
    description:
      "A monochrome developer portfolio for selected web, mobile, AI, and IoT work.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asnor Sumdad Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asnor Sumdad | Full-Stack & Mobile Developer",
    description:
      "Selected web, mobile, AI, and IoT systems by Asnor Sumdad.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${spaceGrotesk.variable} ${geistMono.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
