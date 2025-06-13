"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/Components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { useCart } from "./cart-provider"



interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  rating: number
  discountPercentage: number
  category: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart()

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    })

toast.success("Item added to cart!");

  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow">
          <CardHeader className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.title}
                width={300}
                height={200}
                priority
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              {product.discountPercentage > 0 && (
                <Badge className="absolute top-2 right-2 bg-red-500">-{product.discountPercentage.toFixed(0)}%</Badge>
              )}
              <Badge className="absolute top-2 left-2 bg-blue-500">{product.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg mb-2 line-clamp-2">{product.title}</CardTitle>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 space-y-2">
            <button  className="w-full">
              <Link href={`/products/${product.id}`}>View Details</Link>
            </button>
            <button className="w-full" onClick={() => handleAddToCart(product)}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
