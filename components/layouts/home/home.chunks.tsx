
import HeroSlider from '@/lib/heroslider'
import Link from 'next/link'
import React from 'react'
import { Home } from './home.client'

export function Hometop() {
    return (
        <div className=" max-w-7xl mx-auto">
            <HeroSlider />
            <Home />
        </div>
    )
}



export function Homebottom() {
    return (
        <section className="text-gray-900 py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
                <p className="text-xl mb-8 text-gray-700">Join thousands of satisfied customers and discover amazing deals</p>
                <button className="bg-pink-600 py-2 px-6 text-white rounded-md hover:bg-pink-500 hover:border-pink-500 border-2 border-pink-600 ">
                    <Link href="/product">Start Shopping</Link>
                </button>
            </div>
        </section>
    )
}

