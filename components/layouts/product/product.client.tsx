"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { CornerUpRight, HeartIcon, ShoppingCart, Star } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/lib/CartContext"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useFavorites } from "../favorites/favorites.client"

// ✅ استيراد مكون Select من shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Product = {
  id: number
  title: string
  price: number
  discountPercentage: number
  rating: number
  thumbnail: string
  category: string
}

type Category = { id: number; name: string }

export default function ProductGrid() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const pageParam = Number(searchParams.get("page")) || 1
  const categoryParam = searchParams.get("category") || "all"

  const [currentPage, setCurrentPage] = useState(pageParam)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page")) || 1
    const categoryFromUrl = searchParams.get("category") || "all"
    setCurrentPage(pageFromUrl)
    setSelectedCategory(categoryFromUrl)
  }, [searchParams])

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [loading, setLoading] = useState(true)
  const [productsPerPage] = useState(20)
  const [totalProducts, setTotalProducts] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { addToCart } = useCart()

  const fetchProducts = useCallback(
    async (category = "all", limit = 20, skip = 0) => {
      try {
        setLoading(true)
        const url =
          category === "all"
            ? `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
            : `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`

        const res = await fetch(url)
        const data = await res.json()
        setProducts(data.products)
        setTotalProducts(data.total || data.products.length)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const fetchSearchResults = useCallback(async () => {
    if (!searchTerm.trim()) return
    try {
      setLoading(true)
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchTerm}`
      )
      const data = await res.json()
      setProducts(data.products)
      setTotalProducts(data.total || data.products.length)
    } catch (error) {
      console.error("Error searching products:", error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm])

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/category-list")
      const data = await res.json()

      if (Array.isArray(data)) {
        setCategories(data)
      } else {
        setCategories([])
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      setCategories([])
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchSearchResults()
    } else {
      const skip = (currentPage - 1) * productsPerPage
      fetchProducts(selectedCategory, productsPerPage, skip)
    }
  }, [
    currentPage,
    selectedCategory,
    searchTerm,
    fetchProducts,
    fetchSearchResults,
    productsPerPage,
  ])

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1)
    router.push(`?category=${value}&page=1`)
  }

  const totalPages =
    productsPerPage > 0 ? Math.ceil(totalProducts / productsPerPage) : 1

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    router.push(`?category=${selectedCategory}&page=${page}`)
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-8 max-w-7xl mt-10 xl:mx-auto mx-5">
        <h1 className="text-3xl font-bold mb-4">
          <span>
            {selectedCategory === "all"
              ? "All"
              : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </span>
          {" "}
          Products
        </h1>
        <p className="text-gray-600">
          Discover our amazing collection of{" "}
          {selectedCategory === "all"
            ? "all products"
            : `${selectedCategory} products`}
        </p>
      </div>
      <div className="flex flex-wrap justify-between gap-4 items-center mb-6">
        {/* البحث */}
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
            router.push(`?category=${selectedCategory}&page=1`)
          }}
        />

        {/* ✅ الـ Select الخاص بـ shadcn */}
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat, index) => {
              const isCategoryObject =
                typeof cat === "object" &&
                cat !== null &&
                "id" in cat &&
                "name" in cat
              const name = isCategoryObject ? cat.name : cat
              const value = isCategoryObject ? String(cat.id) : String(cat)

              return (
                <SelectItem
                  key={isCategoryObject ? cat.id : index}
                  value={value}
                >
                  {typeof name === "string"
                    ? name.charAt(0).toUpperCase() + name.slice(1)
                    : "Unknown"}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className=" w-full lg:w-[235px] h-[300px] bg-white border border-gray-200 rounded-md p-4
          animate-pulse flex flex-col gap-4"
            >
              <div className="h-[180px] w-full bg-gray-200 rounded-md" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-6 bg-gray-200 rounded w-1/4 mt-auto" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* GRID PRODUCTS */}
          <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-md border border-gray-200 
                  shadow-md p-4 px-2 overflow-hidden h-fit transition duration-300
                  hover:-translate-y-2 hover:shadow-lg hover:border-[#3B82F6]
                  flex flex-col"
                >
                  {/* صورة المنتج */}
                  <div className="relative h-52 flex items-center justify-center mb-6">
                    <Image
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={200}
                      priority
                      className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* الخصم */}
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      -{product.discountPercentage.toFixed(0)}%
                    </span>
                  </div>

                  {/* اسم المنتج */}
                  <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-1">
                    {product.title}
                  </h3>

                  {/* التقييم */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>

                  {/* السعر */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      $
                      {(
                        product.price /
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>
                  </div>

                  {/* أيقونات */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-3 
  right-4 lg:right-[-60px] lg:group-hover:right-4 
  transition-all duration-300"
                  >
                    {/* Add to Cart */}
                    <span
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          thumbnail: product.thumbnail || "/placeholder.svg",
                          quantity: 1,
                        })
                        toast.success(`${product.title} added to cart`)
                      }}
                      className="w-10 h-10 rounded-full bg-gray-100 
                      flex items-center justify-center cursor-pointer
                      hover:bg-gray-300 transition"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </span>

                    {/* Favorite */}
                    <span
                      onClick={() => {
                        const productTitle = product.title || "Product"

                        if (isFavorite(String(product.id))) {
                          removeFromFavorites(String(product.id))
                          toast.error(
                            `${productTitle} removed from favorites❤️`
                          )
                        } else {
                          addToFavorites({
                            id: String(product.id),
                            title: productTitle,
                            price: product.price || 0,
                            thumbnail: product.thumbnail || "/placeholder.svg",
                          })
                          toast.success(
                            `${productTitle} added to favorites❤️`
                          )
                        }
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition
    bg-gray-100 hover:bg-gray-300`}
                    >
                      <HeartIcon
                        className={`w-5 h-5 transition ${isFavorite(String(product.id))
                          ? "text-red-500"
                          : "text-black"
                          }`}
                      />
                    </span>

                    {/* Details */}
                    <Link
                      href={`/product/${product.id}`}
                      className="w-10 h-10 rounded-full bg-gray-100 
                      flex items-center justify-center cursor-pointer
                      hover:bg-gray-300 transition"
                    >
                      <CornerUpRight className=" w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : searchTerm.trim() !== "" ? (
              <div className="w-full flex flex-col self-start col-span-full max-w-xs">
                <p className="text-red-500 mt-4 text-lg font-medium">
                  No products found matching your search.
                </p>
              </div>
            ) : (
              <p className="text-gray-500 col-span-full">
                No products available.
              </p>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={`?category=${selectedCategory}&page=${Math.max(
                        currentPage - 1,
                        1
                      )}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(Math.max(currentPage - 1, 1))
                      }}
                    />
                  </PaginationItem>
                  {(() => {
                    const visiblePages = 4
                    const half = Math.floor(visiblePages / 2)
                    let startPage = Math.max(1, currentPage - half)
                    const endPage = Math.min(
                      totalPages,
                      startPage + visiblePages - 1
                    )

                    if (endPage - startPage + 1 < visiblePages) {
                      startPage = Math.max(1, endPage - visiblePages + 1)
                    }
                    return Array.from({ length: endPage - startPage + 1 }).map(
                      (_, i) => {
                        const page = startPage + i
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href={`?category=${selectedCategory}&page=${page}`}
                              isActive={page === currentPage}
                              onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(page)
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      }
                    )
                  })()}
                  <PaginationItem>
                    <PaginationNext
                      href={`?category=${selectedCategory}&page=${Math.min(
                        currentPage + 1,
                        totalPages
                      )}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(
                          Math.min(currentPage + 1, totalPages)
                        )
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  )
}
