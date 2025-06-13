"use client"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { Menu, Package, ShoppingCart, User, X } from "lucide-react"
import { cn } from "../lib/utils"
import { DataNav } from "@/constents"
import ProductSearch from "./ProductSearch"
import { useCart } from "@/lib/CartContext"


export default function Nav() {
    const [isOpen, setIsOpen] = useState(false)
    const [showNav, setShowNav] = useState(true);
    const { toggleCart, cart } = useCart()
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const pathname = usePathname()
    const toggleMenu = () => setIsOpen(!isOpen)

    const closeMenu = () => setIsOpen(false)
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
            lastScrollY = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (<header
        className={cn(
            "sticky top-0 z-50 w-full border-b border-gray-300 backdrop-blur supports-[backdrop-filter]:bg-white/30 transition-transform duration-300",
            showNav ? "translate-y-0" : "-translate-y-full"
        )}
    >
        <div className="container px-5 max-w-7xl xl:mx-auto py-2">
            <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="bg-pink-600 text-white p-2 rounded-lg">
                        <Package className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold">DummyStore</span>
                </Link>
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="p-2">
                        <span className="sr-only">القائمة</span>
                        {isOpen ? (
                            <X className="h-10 w-10 border border-gray-200 hover:bg-gray-50/90 rounded-md p-1" />
                        ) : (
                            <Menu className="h-10 w-10 border border-gray-200 rounded-md p-1" />
                        )}
                    </button>
                </div>
                <div className="hidden lg:flex flex-1 items-center gap-8 justify-center">
                    <nav className="flex gap-5">
                        {DataNav.map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                className={cn(
                                    "px-3 py-2 text-lg hover:text-pink-600 font-medium transition-colors",
                                    pathname === item.link ? "underline text-pink-600" : ""
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                    <div className="w-full max-w-md">
                        <ProductSearch />
                    </div>
                </div>
                <div className="hidden lg:flex items-center gap-5 relative">
                    <Link href="/user">
                        <User className="h-7 w-7" />
                    </Link>
                    <div className="relative w-8 h-8">
                        <button onClick={toggleCart} className="w-full h-full">
                            <ShoppingCart className="h-7 w-7" />
                        </button>
                        {totalItems > 0 && (
                            <span className="absolute top-1 right-1 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center shadow">
                                {totalItems}
                            </span>
                        )}
                    </div>

                </div>
            </div>
            <div className="mt-2 w-full lg:hidden">
                <ProductSearch />
            </div>
        </div>
        {isOpen && (
            <div
                className=" overflow-y-auto fixed inset-0 z-40 min-h-screen bg-black/70 backdrop-blur-md transition-opacity duration-300"
                onClick={closeMenu}
            >
                <div
                    className="w-[320px] min-h-screen bg-white shadow-md animate-slide-in p-5 rounded-bl-md ml-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between mb-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-pink-600 text-white p-2 rounded-lg">
                                <Package className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold">DummyStore</span>
                        </Link>
                        <button onClick={closeMenu} className=" hover:text-red-500">
                            <X className="w-8 h-8" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        {DataNav.map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                className={cn(
                                    "block px-3 py-2 text-lg font-medium transition-colors",
                                    pathname === item.link ? " underline text-pink-600" : ""
                                )}
                                onClick={closeMenu}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    <div className="border border-navy/50 my-5"></div>

                    <div className=" mt-10 lg:hidden space-y-5 flex relative flex-col">
                        <Link href="/user">
                            <button className=" font-medium flex gap-2.5 items-center text-xl">
                                <User className=" h-7 w-7" /> Account

                            </button>
                        </Link>
                        <button onClick={toggleCart} className="relative items-center text-xl flex gap-2 font-medium">
                            <ShoppingCart className="h-7 w-7" /> Shopping Cart
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center shadow">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )}
    </header>
    )
}


