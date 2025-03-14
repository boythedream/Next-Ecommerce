import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CartProvider from "./components/Provider";
import ShoppingCartModel from "./components/ShoppingCartModel";

// Import Poppins with improved styling
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

// Updated Metadata
export const metadata: Metadata = {
  title: "ShopSphere - Elevate Your Shopping Experience",
  description: "Discover top-quality products, seamless shopping, and secure payments. Shop with confidence at ShopSphere!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        <CartProvider>
          <Navbar />
          <ShoppingCartModel />
          <main className="container mx-auto px-4 md:px-8 lg:px-16">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
