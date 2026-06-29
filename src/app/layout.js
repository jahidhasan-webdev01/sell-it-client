import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/shared/Header";

const jostFont = Jost({
  variable: "--font-jost-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sell It - Buy & Sell Used Items Online",
  description: "Sell It is a trusted marketplace to buy and sell used products. Resell your unused items, discover great deals, and connect with buyers and sellers easily.",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${jostFont.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="w-full max-w-7xl mx-auto px-2 xl:px-0 mt-0.5">
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </body>
    </html>
  );
}
