"use client"
import React from 'react'
import Link from "next/link"
import { Package, Facebook, Twitter, Instagram, Github } from "lucide-react"
import { useCart } from "@/lib/CartContext"

export function Footer() {
  const { toggleCart, cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white">
      <div className="container px-5 max-w-7xl xl:mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-pink-600 text-white p-2 rounded-lg">
                <Package className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">DummyStore</span>
            </Link>
            <p className="text-gray-400">
              Your ultimate shopping destination powered by DummyJSON API. Discover amazing products and connect with
              our community.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <button onClick={toggleCart} className=" relative text-gray-400 hover:text-white">
                  Cars
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-6 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/product" className="text-gray-400 hover:text-white">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-gray-400 hover:text-white">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-gray-400 hover:text-white">
                  Fragrances
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-gray-400 hover:text-white">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-gray-400 hover:text-white">
                  Groceries
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/user" className="text-gray-400 hover:text-white">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-400 hover:text-white">
                  Checkout
                </Link>
              </li>
              <li>
                <span className="text-gray-400">Help Center</span>
              </li>
              <li>
                <span className="text-gray-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-gray-400">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DummyStore. All rights reserved. Powered by DummyJSON API.</p>
        </div>
      </div>
    </footer>
  )
}
