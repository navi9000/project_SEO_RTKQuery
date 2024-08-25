import { Inter } from "next/font/google";
import "./globals.css";
import LocaleSelector from "@/components/localeSelector/localeSelector";
import Logout from "@/components/logout/logout";
import Logo from "@/components/logo/logo";
import HeaderCart from "@/components/headerCart/headerCart";
import { CartContextProvider } from "@/helpers/useCartItemIds";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: {
    lang
  }
}: Readonly<{
  children: React.ReactNode,
  params: {
    lang: "en" | "ru"
  }
}>) {

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <CartContextProvider>
          <header style={{ display: "flex", gap: "5px", justifyContent: "flex-end", width: "100%" }}>
            <Logo lang={lang} />
            <HeaderCart lang={lang} />
            <Logout />
            <LocaleSelector />
          </header>
          {children}
        </CartContextProvider>
      </body>
    </html>
  )
}
