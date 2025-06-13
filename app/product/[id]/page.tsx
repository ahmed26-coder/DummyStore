import ProductClient from "@/Components/layouts/product/productid.client";
import { CartProvider } from "@/lib/cart-provider";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) { 
  const { id } = await params;
  
  return (
    <CartProvider>
      <ProductClient id={id} />
    </CartProvider>
  );
}