import Link from "next/link"
import Image from "next/image"
import { Home, Search, ShoppingBag, ArrowLeft } from "lucide-react"
import { Card } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import ProductSearch from "@/Components/ProductSearch"

export default function NotFound() {
  const popularCategories = [
    { name: "Smartphones", href: "/products?category=smartphones" },
    { name: "Laptops", href: "/products?category=laptops" },
    { name: "Fragrances", href: "/products?category=fragrances" },
    { name: "Skincare", href: "/products?category=skincare" },
  ]

  return (
    <div className=" h-[80vh] my-10 flex items-center justify-center px-4 py-12">
      <Card className="max-w-3xl w-full overflow-hidden">
        <div className="grid md:grid-cols-2 ">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 text-white flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-7xl font-bold">404</h1>
              <div className="h-1 w-20 bg-white/50 rounded-full"></div>
              <h2 className="text-2xl font-semibold">Page Not Found</h2>
              <p className="text-white/80">The page you&#39;re looking for doesn&#39;t exist or has been moved.</p>
            </div>

            <div className="mt-8 relative h-48">
              <div className="absolute bottom-0 left-0 right-0">
                <Image
                  src="/Retail markdown-amico.svg"
                  alt="Lost in shopping"
                  width={300}
                  height={200}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Let&#39;s get you back on track</h3>
              <p className="text-gray-600">
                Don&#39;t worry, even the best shoppers get lost sometimes. Here are some helpful links:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Home Page
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/product">
                  <ShoppingBag className="w-4 h-4" />
                  All Products
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/contact">
                  <ArrowLeft className="w-4 h-4" />
                  Contact Us
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/user">
                  <Search className="w-4 h-4" />
                  My Account
                </Link>
              </Button>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Popular Categories</h4>
              <div className="flex flex-wrap gap-2">
                {popularCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
                <ProductSearch />
            <div className="text-center pt-4">
              <Button asChild className="bg-pink-600 hover:bg-pink-700">
                <Link href="/">Back to Homepage</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
