import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Major_Mono_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const majorMono = Major_Mono_Display({ subsets: ["latin"], weight: "400", variable: "--font-major-mono" });

export const metadata: Metadata = {
  title: "Visakh P S | Graphic Designer & VFX Artist",
  description: "Creative Graphic Designer specializing in branding, promotional campaigns, and cinematic visual design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${spaceGrotesk.variable} ${majorMono.variable} font-sci-fi antialiased bg-space-void text-foreground selection:bg-interstellar-blue/30`}>
        {children}
      </body>
    </html>
  );
}
