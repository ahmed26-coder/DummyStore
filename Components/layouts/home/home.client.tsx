"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { CornerUpRight, HeartIcon, ShoppingCartIcon } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/CartContext"
import { toast } from "sonner"
import { useFavorites } from "../favorites/favorites.client"

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "Tops",
  "sunglasses",
  "sports-accessories",
]

export default function Homeproduct() {
  const { addToCart } = useCart()
  const [, setLoading] = useState(true)
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [productsByCategory, setProductsByCategory] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any[]>
  >({})
  const scrollContainerRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    async function fetchData() {
      try {
        const results = await Promise.all(
          categories.map((c) =>
            fetch(`https://dummyjson.com/products/category/${c}`).then((res) =>
              res.json()
            )
          )
        )
        const data = categories.reduce((acc, cat, idx) => {
          acc[cat] = results[idx].products || []
          return acc
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as Record<string, any[]>)

        setProductsByCategory(data)
      } catch (err) {
        console.error("Error fetching products", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const scrollLeft = (category: string) => {
    const container = scrollContainerRefs.current[category]
    if (container) {
      container.scrollBy({ left: -250, behavior: "smooth" })
    }
  }

  const scrollRight = (category: string) => {
    const container = scrollContainerRefs.current[category]
    if (container) {
      container.scrollBy({ left: 250, behavior: "smooth" })
    }
  }

  return (
    <section className="container mx-auto px-6">
      {categories.map((category) => (
        <div key={category} className="my-12">
          <h2 className="text-3xl font-bold text-[#3B82F6] capitalize">
            {category.replace("-", " ")}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            The latest products in the {category.replace("-", " ")} field at special prices.
          </p>
          <div className="h-0.5 bg-gray-200 mb-10">
            <div className="h-0.5 lg:w-[15%] w-[35%] bg-[#3B82F6]"></div>
          </div>

          <div className="relative">
            <div
              ref={(el) => {
                scrollContainerRefs.current[category] = el
              }}
              className="flex overflow-x-auto space-x-2.5 hide-scrollbar"
            >
              {!productsByCategory[category] || productsByCategory[category].length === 0
                ? Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[230px] h-[320px] bg-white border border-gray-200 rounded-md p-4 animate-pulse flex flex-col gap-4"
                  >
                    <div className="h-[180px] w-full bg-gray-200 rounded-md" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-200 rounded w-1/4 mt-auto" />
                  </div>
                ))
                : productsByCategory[category].map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-[250px] h-[350px] bg-white border border-gray-200 
    rounded-lg p-4 relative overflow-hidden transition duration-300 group 
    hover:-translate-y-2 hover:shadow-lg hover:border-[#3B82F6]"
                  >
                    {/* صورة المنتج */}
                    <div className="relative h-[200px] flex items-center justify-center mb-4">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title || "Product"}
                        width={200}
                        height={200}
                        className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* اسم المنتج */}
                    <h3 className="text-gray-800 font-medium mb-2 line-clamp-1">
                      {item.title || "Unnamed Product"}
                    </h3>

                    {/* التقييم */}
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: Math.round(item.rating || 0) }).map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-[#f8d941]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.851L19.335 24 12 19.771 4.665 24 6 15.601 0 9.75l8.332-1.595z" />
                        </svg>
                      ))}
                    </div>

                    {/* السعر */}
                    <p className="font-bold text-lg text-gray-900">${item.price || "0.00"}</p>

                    {/* أكشن أيقونات */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 right-2 flex flex-col gap-3 
    opacity-100 translate-x-0
    lg:opacity-0 lg:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 
    transition-all duration-300"
                    >
                      {/* Cart */}
                      <span
                        onClick={() => {
                          addToCart({
                            id: item.id,
                            title: item.title || "Unnamed Product",
                            price: item.price || 0,
                            thumbnail: item.thumbnail || "/placeholder.svg",
                            quantity: 1,
                          })
                          toast.success(`${item.title || "Product"} added to cart`)
                        }}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
        cursor-pointer hover:bg-gray-300 transition"
                      >
                        <ShoppingCartIcon className="w-5 h-5" />
                      </span>

                      {/* Favorite */}
                      <span
                        onClick={() => {
                          const productTitle = item.title || "Product";

                          if (isFavorite(item.id)) {
                            removeFromFavorites(item.id);
                            toast.error(`${productTitle} removed from favorites❤️`);
                          } else {
                            addToFavorites({
                              id: item.id,
                              title: productTitle,
                              price: item.price || 0,
                              thumbnail: item.thumbnail || "/placeholder.svg",
                            });
                            toast.success(`${productTitle} added to favorites❤️`);
                          }
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition
    bg-gray-100 hover:bg-gray-300 hover:text-white`}
                      >
                        <HeartIcon
                          className={`w-5 h-5 transition ${isFavorite(item.id) ? "text-red-500" : "text-black"
                            }`}
                        />
                      </span>


                      {/* Details */}
                      <Link
                        href={`/product/${item.id}`}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
        cursor-pointer hover:bg-gray-300 transition"
                      >
                        <CornerUpRight className=" w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => scrollLeft(category)}
              className="absolute left-[-16px] top-1/2 -translate-y-1/2 bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#3B82F6] hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollRight(category)}
              className="absolute right-[-25px] top-1/2 -translate-y-1/2 bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#3B82F6] hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}