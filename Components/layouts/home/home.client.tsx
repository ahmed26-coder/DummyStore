// app/components/Homeproduct.tsx

import ClientProductList from "@/lib/ClientProductList"


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

interface FeaturedProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

interface Stats {
  products: number
  users: number
  posts: number
}

async function getFeaturedProducts(): Promise<FeaturedProductsResponse> {
  const res = await fetch("https://dummyjson.com/products?limit=8")
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

async function getStats(): Promise<Stats> {
  const [products, users, posts] = await Promise.all([
    fetch("https://dummyjson.com/products?limit=0").then((r) => r.json()),
    fetch("https://dummyjson.com/users?limit=0").then((r) => r.json()),
    fetch("https://dummyjson.com/posts?limit=0").then((r) => r.json()),
  ])
  return {
    products: products.total,
    users: users.total,
    posts: posts.total,
  }
}

export default async function Homeproduct() {
  const [featuredProducts, stats] = await Promise.all([
    getFeaturedProducts(),
    getStats()
  ])

  return (
    <ClientProductList featuredProducts={featuredProducts.products} stats={stats} />
  )
}
