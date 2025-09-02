"use client"
import Image from 'next/image'
import React from 'react'
import Link from "next/link"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"
import { useCart } from "@/lib/CartContext"
import { categories, links } from '@/constents'

export function Footer() {

  const { toggleCart, cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white">
      <div className="container px-5 max-w-7xl xl:mx-auto py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/icon.png" alt="Logo" width={40} height={10} />
              <span className="text-xl font-bold">ShraraStore</span>
            </Link>
            <p className="text-gray-400 sm:text-base text-sm">
              Your ultimate shopping destination powered by ShraraJSON API. Discover amazing products and connect with
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
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleCart}
                  className="relative text-gray-400 hover:text-white"
                >
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-6 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link href="/product" className="text-gray-400 hover:text-white">
                    {category}
                  </Link>
                </li>
              ))}
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
                <span className="text-gray-400 hover:text-white">Help Center</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white">Privacy Policy</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2024 ShraraStore. All rights reserved. Powered by ShraraJSON API.</p>
        </div>
      </div>
    </footer>
  )
}
