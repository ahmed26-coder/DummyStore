"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCartIcon, HeartIcon, CornerUpRight } from "lucide-react"
import { useCart } from "@/lib/CartContext"
import { toast } from "sonner"
import { useFavorites } from "./favorites.client"

export default function FavoritesPage() {
  const { addToCart } = useCart()
  const { favorites, removeFromFavorites, isFavorite, addToFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-700">No favorites yet </h2>
        <p className="text-gray-500 mt-2">Browse products and add them to your favorites.</p>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[#3B82F6] mb-8">My Favorites </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="group relative w-[235px] bg-white border border-gray-200 
              rounded-md p-4 overflow-hidden transition duration-300
              hover:-translate-y-2 hover:shadow-lg hover:border-[#3B82F6]"
          >
            {/* صورة المنتج */}
            <div className="relative h-[180px] px-5 flex items-center justify-center mb-6">
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={160}
                height={160}
                className="h-[160px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* اسم المنتج */}
            <h3 className="text-gray-800 font-medium mb-2 truncate">
              {item.title}
            </h3>

            {/* (ممكن تخليها ثابتة أو تحذفها) النجوم */}
            <div className="flex gap-1 my-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-[#f8d941]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568L24 9.75l-6 5.851L19.335 24 12 19.771 4.665 24 6 15.601 0 9.75l8.332-1.595z" />
                </svg>
              ))}
            </div>

            {/* السعر */}
            <p className="font-bold text-xl">${item.price}</p>

            {/* الأيقونات (تظهر عند hover) */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 right-2 flex flex-col gap-3 
    opacity-100 translate-x-0
    lg:opacity-0 lg:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 
    transition-all duration-300"
                    >
              {/* Add to Cart */}
              <span
                onClick={() => {
                  addToCart({
                    id: Number(item.id),
                    title: item.title,
                    price: item.price,
                    thumbnail: item.thumbnail || "/placeholder.svg",
                    quantity: 1,
                  })
                  toast.success(`${item.title} added to cart`)
                }}
                className="w-10 h-10 rounded-full bg-gray-100 
                  flex items-center justify-center cursor-pointer
                  hover:bg-gray-300  transition"
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
    bg-gray-100 hover:bg-gray-300`}
              >
                <HeartIcon
                  className={`w-5 h-5 transition ${isFavorite(item.id) ? "text-red-500" : "text-black"
                    }`}
                />
              </span>

              {/* Details */}
              <Link
                href={`/product/${item.id}`}
                className="w-10 h-10 rounded-full bg-gray-100 
                  flex items-center justify-center cursor-pointer
                  hover:bg-gray-300 transition"
              >
                <CornerUpRight className=" w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
