import localFont from "next/font/local"
import { Toaster } from "react-hot-toast";
import "./globals.css";
import CartProviders from "@/prodviders/client/CartProvider";
// import "@/helpers/lowestBid"

const danaFont = localFont({
  src: [
    {
      path: "../../public/fonts/dana-regular.woff2",
      weight: "400",
      style: "normal"
    },
  ],
  display: "swap"
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl" className={`${danaFont.className} scroll-smooth`}>
      <body className={danaFont.className}>
        <CartProviders>
          <Toaster position="bottom-center"/>
          {children}
        </CartProviders>
      </body>
    </html>
  );
}
