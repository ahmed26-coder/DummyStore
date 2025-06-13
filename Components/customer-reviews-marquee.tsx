import { cn } from "@/lib/utils"
import Image from "next/image"
import { Star } from "lucide-react"
import { Marquee } from "./magicui/marquee"

const reviews = [
    {
        name: "Sarah Johnson",
        username: "@sarahj_shop",
        body: "Amazing product quality and super fast shipping! My iPhone arrived in perfect condition. DummyStore is now my go-to for electronics.",
        img: "https://avatar.vercel.sh/sarah",
        rating: 5,
        product: "iPhone 15 Pro",
    },
    {
        name: "Mike Chen",
        username: "@miketech",
        body: "Best customer service ever! Had an issue with my laptop order and they resolved it within hours. Highly recommend!",
        img: "https://avatar.vercel.sh/mike",
        rating: 5,
        product: "MacBook Air",
    },
    {
        name: "Emily Rodriguez",
        username: "@emily_beauty",
        body: "The skincare products are authentic and arrived beautifully packaged. Love the variety of brands available!",
        img: "https://avatar.vercel.sh/emily",
        rating: 5,
        product: "Skincare Set",
    },
    {
        name: "David Kim",
        username: "@davidk_reviews",
        body: "Incredible deals and genuine products. Saved so much money compared to other stores. Will definitely shop again!",
        img: "https://avatar.vercel.sh/david",
        rating: 5,
        product: "Smart Watch",
    },
    {
        name: "Lisa Thompson",
        username: "@lisa_lifestyle",
        body: "The fragrance collection is amazing! Authentic perfumes at great prices. My order arrived faster than expected.",
        img: "https://avatar.vercel.sh/lisa",
        rating: 5,
        product: "Chanel Perfume",
    },
    {
        name: "Alex Martinez",
        username: "@alex_gadgets",
        body: "Top-notch electronics and accessories. The product descriptions are accurate and shipping is lightning fast!",
        img: "https://avatar.vercel.sh/alex",
        rating: 5,
        product: "Wireless Headphones",
    },
    {
        name: "Jessica Wong",
        username: "@jess_shopping",
        body: "Love the user-friendly website and secure checkout. My groceries arrived fresh and well-packaged. Excellent service!",
        img: "https://avatar.vercel.sh/jessica",
        rating: 5,
        product: "Grocery Bundle",
    },
    {
        name: "Ryan Taylor",
        username: "@ryan_tech_guy",
        body: "Outstanding product range and competitive prices. The laptop I bought works perfectly. Great shopping experience overall!",
        img: "https://avatar.vercel.sh/ryan",
        rating: 5,
        product: "Gaming Laptop",
    },
]

const firstRow = reviews.slice(0, reviews.length / 2)

const ReviewCard = ({
    img,
    name,
    username,
    body,
    rating,
    product,
}: {
    img: string
    name: string
    username: string
    body: string
    rating: number
    product: string
}) => {
    return (
        <figure
            className={cn(
                "relative flex flex-col justify-between h-45 w-100",
                "cursor-pointer overflow-hidden rounded-xl border p-4 transition-all hover:scale-105",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className=" flex justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                    <Image
                        className="rounded-full border-2 border-purple-100"
                        width="40"
                        height="40"
                        alt=""
                        src={img || "/placeholder.svg"}
                    />
                    <div className="flex flex-col">
                        <figcaption className="text-sm font-semibold dark:text-white">{name}</figcaption>
                        <p className="text-xs font-medium text-gray-500 dark:text-white/40">{username}</p>
                    </div>
                </div>

                <div className="flex items-center gap-1 mt-2 mb-2">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
            </div>

            <blockquote className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{body}</blockquote>

            <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs font-medium text-pink-600 dark:text-pink-400">Purchased: {product}</p>
            </div>
        </figure>
    )
}

export function CustomerReviewsMarquee() {
    return (
        <div className="relative max-w-7xl mx-auto flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-12 ">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Join thousands of satisfied customers who love shopping with DummyStore
                </p>
            </div>

            <Marquee pauseOnHover className="[--duration:25s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    )
}
