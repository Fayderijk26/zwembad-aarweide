import type { Metadata, Viewport } from "next";
import { Figtree, Unbounded } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Zwembad Aarweide · Openluchtzwembad in Nieuwveen", template: "%s · Zwembad Aarweide" },
  description:
    "Openluchtzwembad Aarweide in Nieuwveen: drie buitenbaden, een grote glijbaan en een zonneweide. Openingstijden, tarieven en activiteiten.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3fafd" },
    { media: "(prefers-color-scheme: dark)", color: "#071a2a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${unbounded.variable} ${figtree.variable}`}>
      <body>
        <MotionProvider>
          <a href="#inhoud" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:text-ink">
            Naar de inhoud
          </a>
          <Nav />
          <main id="inhoud">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
