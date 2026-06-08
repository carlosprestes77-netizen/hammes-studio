import type { Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/ui/Analytics";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

const SITE_URL = "https://carlosprestes77-netizen.github.io/hammes-studio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hammes — Tatuagens Autorais | Foz do Iguaçu",
    template: "%s · Hammes Tattoo",
  },
  description:
    "Tatuagens autorais de alto padrão. Hammes — projetos exclusivos, simulador virtual, flashes e orçamento pelo WhatsApp.",
  keywords: [
    "tatuagem", "tatuador", "blackwork", "tatuagem autoral",
    "flash tattoo", "Hammes", "hmms.tat",
  ],
  authors: [{ name: "Hammes" }],
  creator: "Hammes",
  openGraph: {
    title: "Hammes — Tatuagens Autorais",
    description:
      "Tatuagens autorais de alto padrão. Projetos exclusivos e simulador virtual.",
    url: SITE_URL,
    siteName: "Hammes Tattoo",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hammes — Tatuagens Autorais",
    description: "Tatuagens autorais de alto padrão.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "Hammes Tattoo",
  description:
    "Estúdio de tatuagem com projetos autorais de alto padrão.",
  url: SITE_URL,
  founder: { "@type": "Person", name: "Hammes" },
  sameAs: ["https://www.instagram.com/hmms.tat"],
  telephone: "+5545998003775",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Foz do Iguaçu",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  areaServed: "Foz do Iguaçu e região",
  priceRange: "$$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${raleway.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </head>
      <body className="bg-paper-200 text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
