import type { Metadata } from "next";
import { Anton, Teko, VT323, Press_Start_2P, IBM_Plex_Mono, IBM_Plex_Sans, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const teko = Teko({ weight: "700", subsets: ["latin"], variable: "--font-teko" });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" });
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start" });
const pixelifySans = Pixelify_Sans({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-pixelify" });
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-mono"
});
const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-sans"
});

export const metadata: Metadata = {
  title: "Génie Informatique 2025 - Wrapped",
  description: "Le récapitulatif officiel des soutenances de la Promo GI 2025 de l'ENSPY.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={clsx(
          anton.variable,
          teko.variable,
          ibmPlexMono.variable,
          ibmPlexSans.variable,
          pixelifySans.variable,
          "h-full bg-[#1E1E1E] text-[#CCCCCC] antialiased font-mono m-0 p-0"
        )}
      >
        {children}
      </body>
    </html>
  );
}
