"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { CornerUpRight, HeartIcon, ShoppingCartIcon } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/CartContext"
import { toast } from "sonner"
import { useFavorites } from "../favorites/favorites.client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const categories = [
  "smartphones",
  "mobile-accessories",
  "Vehicle",
  "Tops",
  "sunglasses",
  "sports-accessories",
  "Groceries",
]

export default function Homeproduct() {
  const { addToCart } = useCart()
  const [, setLoading] = useState(true)
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [productsByCategory, setProductsByCategory] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any[]>
  >({})

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

  return (
    <section className="container max-w-[1350px] mx-auto px-6">
      {categories.map((category) => (
        <div key={category} className="my-12">
          <h2 className="text-3xl font-bold text-[#3B82F6] capitalize">
            {category.replace("-", " ")}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            The latest products in the {category.replace("-", " ")} field at
            special prices.
          </p>
          <div className="h-0.5 bg-gray-200 mb-10">
            <div className="h-0.5 lg:w-[15%] w-[35%] bg-[#3B82F6]"></div>
          </div>

          {/* ✅ الكاروسيل */}
          <Carousel className=" max-w-3xs md:max-w-2xl lg:max-w-[900px] xl:max-w-[1200px] mx-auto">
            <CarouselContent>
              {!productsByCategory[category] ||
              productsByCategory[category].length === 0
                ? Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="basis-full sm:basis-1/2 lg:basis-1/4 2xl:basis-1/5"
                    >
                      <div className="w-full sm:w-[235px] h-[320px] bg-white border border-gray-200 rounded-md p-4 animate-pulse flex flex-col gap-4">
                        <div className="h-[180px] w-full bg-gray-200 rounded-md" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-6 bg-gray-200 rounded w-1/4 mt-auto" />
                      </div>
                    </CarouselItem>
                  ))
                : productsByCategory[category].map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
                    >
                      <div
                        className="w-full xl:w-[235px] h-[350px] bg-white border border-gray-200 
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
                          {Array.from({
                            length: Math.round(item.rating || 0),
                          }).map((_, i) => (
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
                        <p className="font-bold text-lg text-gray-900">
                          ${item.price || "0.00"}
                        </p>

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
                                thumbnail:
                                  item.thumbnail || "/placeholder.svg",
                                quantity: 1,
                              })
                              toast.success(
                                `${item.title || "Product"} added to cart`
                              )
                            }}
                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
                            cursor-pointer hover:bg-gray-300 transition"
                          >
                            <ShoppingCartIcon className="w-5 h-5" />
                          </span>

                          {/* Favorite */}
                          <span
                            onClick={() => {
                              const productTitle = item.title || "Product"

                              if (isFavorite(item.id)) {
                                removeFromFavorites(item.id)
                                toast.error(
                                  `${productTitle} removed from favorites❤️`
                                )
                              } else {
                                addToFavorites({
                                  id: item.id,
                                  title: productTitle,
                                  price: item.price || 0,
                                  thumbnail:
                                    item.thumbnail || "/placeholder.svg",
                                })
                                toast.success(
                                  `${productTitle} added to favorites❤️`
                                )
                              }
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition
                            bg-gray-100 hover:bg-gray-300 hover:text-white`}
                          >
                            <HeartIcon
                              className={`w-5 h-5 transition ${
                                isFavorite(item.id)
                                  ? "text-red-500"
                                  : "text-black"
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
                    </CarouselItem>
                  ))}
            </CarouselContent>

            {/* أزرار التنقل */}
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
    </section>
  )
}


import { useRef } from "react"
import { Package, Users, TrendingUp } from "lucide-react"

const stats = [
  { icon: Package, label: "Products Available", value: 194, color: "blue" },
  { icon: Users, label: "Happy Customers", value: 208, color: "green" },
  { icon: TrendingUp, label: "Community Posts", value: 251, color: "purple" },
]

function useCountUp(end: number, duration = 2000, startCounting: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return

    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        start = end
        clearInterval(timer)
      }
      setCount(Math.floor(start))
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration, startCounting])

  return count
}

export  function Home() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <div className="p-16" ref={sectionRef}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 duration-300">
          {stats.map((stat, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const count = useCountUp(stat.value, 2000, inView)
            return (
              <div key={index} className="text-center">
                <div
                  className={`bg-${stat.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {count}+{/* دا يخلي العداد يوقف عند الرقم ويضيف + */}
                </h2>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
