// /components/product-page.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Share2, ArrowLeft, Minus, Plus, HeartIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { useCart } from "@/lib/CartContext"
import { useFavorites } from "../favorites/favorites.client"


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
    tags: string[]
    reviews: Array<{
        rating: number
        comment: string
        date: string
        reviewerName: string
        reviewerEmail: string
    }>
}

export default function ProductClient({ id }: { id: string }) {
    const { addToCart } = useCart()
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)


    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`)
                if (!res.ok) throw new Error("Product not found")
                const data = await res.json()
                setProduct(data)
            } catch (error) {
                console.error("Error fetching product:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])


    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="bg-gray-200 h-96 rounded-lg"></div>
                            <div className="flex gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-gray-200 h-20 w-20 rounded-lg"></div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gray-200 h-8 rounded"></div>
                            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                            <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container items-center mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Button asChild>
                    <Link href="/product">Back to Products</Link>
                </Button>
            </div>
        )
    }

    const discountedPrice = product.price * (1 - product.discountPercentage / 100)

    return (
        <div className="container max-w-7xl mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-6">
                <Link href="/product">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Products
                </Link>
            </Button>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-lg border">
                        <Image
                            src={product.images[selectedImage] || product.thumbnail}
                            alt={product.title}
                            width={200}
                            height={300}
                            priority
                            className="w-fit mx-auto object-cover h-96"
                        />
                        {product.discountPercentage > 0 && (
                            <Badge className="absolute top-4 right-4 bg-red-500">-{product.discountPercentage.toFixed(0)}% OFF</Badge>
                        )}
                    </div>

                    <div className="flex gap-2 overflow-x-auto">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-purple-600" : "border-gray-200"
                                    }`}
                            >
                                <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`${product.title} ${index + 1}`}
                                    width={80}
                                    height={80}
                                    priority
                                    className="h-20 w-auto object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <Badge className="mb-2">{product.category}</Badge>
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.rating} ({product.reviews?.length || 0} reviews)
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-purple-600">${discountedPrice.toFixed(2)}</span>
                            {product.discountPercentage > 0 && (
                                <span className="text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600">
                            Brand: <span className="font-medium">{product.brand}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                            Stock: <span className="font-medium">{product.stock} available</span>
                        </p>
                    </div>

                    <p className="text-gray-700">{product.description}</p>

                    {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="font-medium">Quantity:</span>
                            <div className="flex items-center border rounded-lg">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button size="lg" className="flex-1" onClick={() => {
                                addToCart({
                                    id: product.id,
                                    title: product.title,
                                    price: product.price,
                                    thumbnail: product.thumbnail || "/placeholder.svg",
                                    quantity,
                                })
                                toast.success(`${product.title} added to cart`)
                            }} disabled={product.stock === 0}>
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Add to Cart
                            </Button>
                      <span
                        onClick={() => {
                          const productTitle = product.title || "Product";

                          if (isFavorite(String(product.id))) {
                            removeFromFavorites(String(product.id));
                            toast.error(`${productTitle} removed from favorites❤️`);
                          } else {
                            addToFavorites({
                              id: String(product.id),
                              title: productTitle,
                              price: product.price || 0,
                              thumbnail: product.thumbnail || "/placeholder.svg",
                            });
                            toast.success(`${productTitle} added to favorites❤️`);
                          }
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition
    bg-gray-100 hover:bg-gray-300 hover:text-white`}
                      >
                        <HeartIcon
                          className={`w-5 h-5 transition ${isFavorite(String(product.id)) ? "text-red-500" : "text-black"
                            }`}
                        />
                      </span>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator
                                            .share({
                                                title: product.title,
                                                text: `Check out this product: ${product.title}`,
                                                url: `${window.location.href}`,
                                            })
                                            .then(() => console.log("Shared successfully"))
                                            .catch((error) => console.error("Error sharing:", error));
                                    } else {
                                        alert("Sharing not supported on this browser.");
                                    }
                                }}
                            >
                                <Share2 className="w-5 h-5" />
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
            <Tabs defaultValue="reviews" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="reviews">Reviews ({product.reviews?.length || 0})</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                </TabsList>

                <TabsContent value="reviews" className="space-y-4">
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">{review.reviewerName}</CardTitle>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
                                </CardHeader>
                                <CardContent>
                                    <p>{review.comment}</p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-8">No reviews yet</p>
                    )}
                </TabsContent>

                <TabsContent value="specifications">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">Product Details</h4>
                                    <dl className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Brand:</dt>
                                            <dd className="font-medium">{product.brand}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Category:</dt>
                                            <dd className="font-medium">{product.category}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Stock:</dt>
                                            <dd className="font-medium">{product.stock}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Rating:</dt>
                                            <dd className="font-medium">{product.rating}/5</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
