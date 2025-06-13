
import Link from 'next/link'
import React from 'react'

export function Hometop() {
    return (
        <section className=" bonnerimg bg-gradient-to-r from-purple-600 to-blue-600 text-white py-30">
            <div className="container max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-6">Welcome to DummyStore</h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Discover amazing products, connect with users, and explore our comprehensive marketplace powered by
                    DummyJSON API
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/product">
                        <button className="bg-white border-2 hover:bg-transparent hover:text-white border-white py-2 px-5 rounded-md text-pink-600">
                            Shop Now
                        </button>
                    </Link>
                    <Link href="/about">
                        <button
                            className="border-white border-2 py-2 px-5 rounded-md text-white hover:bg-white hover:text-pink-600"
                        >
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}


export function Homebottom() {
    return (
        <section className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
                <p className="text-xl mb-8 text-gray-300">Join thousands of satisfied customers and discover amazing deals</p>
                <button  className="bg-pink-600 py-2 px-6 rounded-md hover:bg-gray-900 border-2 border-pink-600 ">
                    <Link href="/product">Start Shopping</Link>
                </button>
            </div>
        </section>
    )
}

