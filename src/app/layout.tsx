import type { Metadata, Viewport } from "next";
import { Fraunces, Kalam, Nunito_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE } from "@/lib/constants";
import { businessJsonLd } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Kahani Child Development Centre | Speech Therapy in BTM, Bangalore",
    template: "%s | Kahani Child Development Centre",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Child Development Centre in Bangalore",
    "Speech Therapy in Bangalore",
    "Child Speech Therapist in BTM",
    "Speech Therapy for Children in Bangalore",
    "Child Development Centre in BTM 2nd Stage",
    "Pediatric Speech Therapy Bangalore",
  ],
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#FBF6EA",
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: animated hero elements start hidden only when motion is allowed.
const motionScript = `try{document.documentElement.dataset.motion=matchMedia('(prefers-reduced-motion: reduce)').matches?'reduce':'full'}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${nunito.variable} ${kalam.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={businessJsonLd()} />
      </body>
    </html>
  );
}
