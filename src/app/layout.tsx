import type { Metadata } from "next";
import { Inter, Caveat, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse AI - Transform Your Slack Into Actionable Insights",
  description: "Connect Slack for free and unlock powerful sentiment analysis, team insights, and data-driven culture metrics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${inter.variable} ${caveat.variable} ${lora.variable} font-sans antialiased bg-white text-black`}
      >
        <ThemeProvider defaultTheme="light" storageKey="pulse-ai-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
