'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { toast } from 'sonner'
import { useCart } from '@/lib/CartContext'
import Link from 'next/link'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination'
import CardsSkeleton from './cardsskeleton'

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
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  const [totalProducts, setTotalProducts] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { addToCart } = useCart()

  const fetchProducts = useCallback(async (category = 'all', limit = 32, skip = 0) => {
    try {
      setLoading(true)
      const url =
        category === 'all'
          ? `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
          : `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`

      const res = await fetch(url)
      const data = await res.json()
      setProducts(data.products)
      setTotalProducts(data.total || data.products.length)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchSearchResults = useCallback(async () => {
    if (!searchTerm.trim()) return
    try {
      setLoading(true)
      const res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
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
      const res = await fetch('https://dummyjson.com/products/category-list')
      const data = await res.json()

      if (Array.isArray(data)) {
        setCategories(data)
      } else {
        setCategories([])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
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
  }, [currentPage, selectedCategory, searchTerm, fetchProducts, fetchSearchResults, productsPerPage])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedCategory(value)
    setCurrentPage(1)
  }

  const totalPages = productsPerPage > 0 ? Math.ceil(totalProducts / productsPerPage) : 1

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border px-4 py-2 rounded"
        >
          <option value="all">All Categories</option>
          {categories.map((cat, index) => {
            const isCategoryObject = typeof cat === 'object' && cat !== null && 'id' in cat && 'name' in cat;
            const name = isCategoryObject ? cat.name : cat;
            const value = isCategoryObject ? cat.id : cat;

            return (
              <option key={isCategoryObject ? cat.id : index} value={value}>
                {typeof name === 'string'
                  ? name.charAt(0).toUpperCase() + name.slice(1)
                  : 'Unknown'}
              </option>
            );
          })}

        </select>
      </div>
      {loading ? (
        <CardsSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="relative">
                    <Image
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={200}
                      priority
                      className="h-52 object-cover mx-auto w-auto rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
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
                    <div className="gap-3 mx-auto flex justify-between">
                      <button
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
              ))
            ) : searchTerm.trim() !== '' ? (
              <div className="w-full flex flex-col self-start col-span-full max-w-xs">
                <div className="bg-white rounded-2xl shadow-md animate-pulse flex flex-col w-full">
                  <div className="h-52 bg-gray-200 rounded-t-2xl" />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4" />
                      <div className="h-3 bg-gray-300 rounded mb-2 w-1/4" />
                      <div className="h-6 bg-gray-300 rounded mb-4 w-1/2" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-10 bg-gray-300 rounded-xl" />
                      <div className="h-10 bg-gray-300 rounded-xl" />
                    </div>
                  </div>
                </div>
                <p className="text-red-500 mt-4 text-lg font-medium">No products found matching your search.</p>
              </div>

            ) : (
              <p className="text-gray-500 col-span-full">No products available.</p>
            )}

          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    />
                  </PaginationItem>
                  {(() => {
                    const visiblePages = 4
                    const half = Math.floor(visiblePages / 2)
                    let startPage = Math.max(1, currentPage - half)
                    const endPage = Math.min(totalPages, startPage + visiblePages - 1)

                    if (endPage - startPage + 1 < visiblePages) {
                      startPage = Math.max(1, endPage - visiblePages + 1)
                    }
                    return Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
                      const page = startPage + i
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })
                  })()}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
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
