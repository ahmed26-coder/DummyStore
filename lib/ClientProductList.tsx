// app/components/ClientProductList.tsx
"use client"
import Image from 'next/image'
import { useCart } from '@/lib/CartContext'
import { Package, ShoppingCart, Star, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface Stats {
  products: number
  users: number
  posts: number
}

export default function ClientProductList({
  featuredProducts,
  stats
}: {
  featuredProducts: Product[]
  stats: Stats
}) {
  const { addToCart } = useCart()

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.products}+</h3>
              <p className="text-gray-600">Products Available</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.users}+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.posts}+</h3>
              <p className="text-gray-600">Community Posts</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-7xl  mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of premium products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="relative">
                  <Image
                    src={product.thumbnail || "/placeholder.svg"}
                    alt={product.title}
                    width={300}
                    height={200}
                    priority
                    className=" h-52 object-cover mx-auto w-auto rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    -{product.discountPercentage.toFixed(0)}%
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-2">{product.title}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      <span className="text-sm text-gray-400 line-through">
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className=" gap-3 mx-auto flex justify-between">
                    <button
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          thumbnail: product.thumbnail || "/placeholder.svg",
                          quantity: 1
                        });
                        toast.success(`${product.title} added to cart`);
                      }}
                      className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:bg-white hover:text-black hover:border-black border-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <Link
                      href={`/product/${product.id}`}
                      className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:text-white hover:bg-black   hover:border-black border-2"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 bg-black text-white py-2 px-6 rounded-md mx-auto w-fit hover:bg-white hover:text-black hover:border-black border-2">
            <Link href="/product">
              <button>View All Products</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
