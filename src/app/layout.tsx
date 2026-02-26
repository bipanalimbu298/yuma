import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import WhatsAppFloatingButton from "@/components/common/WhatsAppFloatingButton";

export const metadata: Metadata = {
  title: {
    default: "Yuma Clothing | Ladies & Kids Clothing",
    template: "%s | Yuma Clothing",
  },
  description:
    "Yuma Clothing — Ladies clothing and kids clothing in Nepal. Dresses, tops, ethnic wear, casual, winter wear, accessories. Girls, boys, baby & seasonal collections.",
  keywords: ["ladies clothing", "kids clothing", "women fashion", "ethnic wear", "Yuma Clothing", "Yuma"],
  openGraph: {
    title: "Yuma Clothing | Ladies & Kids Clothing",
    description:
      "Yuma Clothing — ladies and kids clothing brand from Nepal. Dresses, tops, ethnic, casual, winter wear, and accessories.",
    type: "website",
    url: "https://yuma.com.np",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <TopBanner />
        <Providers>
          <TopNavbar />
          {children}
        </Providers>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
