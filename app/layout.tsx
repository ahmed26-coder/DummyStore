import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/CartContext";
import CartDrawer from "@/lib/CartDrawer";
import ClientToaster from "@/lib/client-toaster";
import { FavoriteProvider } from "@/components/layouts/favorites/favorites.client";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShraraStore - Your Ultimate Shopping Destination",
  description: "Discover amazing products powered by ShraraJSON API",
  icons: {
    icon:"/icon.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <CartProvider>
          <FavoriteProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <Footer />
            <ClientToaster />
          </FavoriteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
