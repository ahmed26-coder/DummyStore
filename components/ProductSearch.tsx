'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { toast } from 'sonner'

type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
}
export default function ProductSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query) return

    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
    const data = await res.json()
    setResults(data.products)
        if (data.products.length === 0) {
      toast.error('The product is not available or unavailable now ❌')
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setResults([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-400 w-full"
          />
        </div>
      </form>

      {results.length > 0 && (
        <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((product: Product) => (
              <Link
                key={product.id}
                onClick={() => setResults([])}
                href={`/product/${product.id}`}
                className="border rounded-lg overflow-hidden hover:shadow-md transition duration-200 group"
              >
                <div className="relative w-full h-36">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="p-2">
                  <h2 className="text-sm font-semibold line-clamp-1 group-hover:text-purple-600 transition">
                    {product.title}
                  </h2>
                  <p className="text-xs text-gray-500">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
