import { Inter } from "next/font/google";
import "./globals.css";
import LocaleSelector from "@/components/localeSelector/localeSelector";
import Logout from "@/components/logout/logout";
import Logo from "@/components/logo/logo";
import HeaderCart from "@/components/headerCart/headerCart";
import { CartContextProvider } from "@/helpers/useCartItemIds";
import { GlobalProvider } from "@/components/globalProvider/mainPageProvider";

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
    <GlobalProvider>
      <html lang={lang}>
        <body className={inter.className}>
          <CartContextProvider>
            <header>
              <Logo lang={lang} />
              <HeaderCart lang={lang} />
              <Logout lang={lang} />
              <LocaleSelector />
            </header>
            {children}
          </CartContextProvider>
        </body>
      </html>
    </GlobalProvider>
  )
}
