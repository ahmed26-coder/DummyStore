"use client";

import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CartDrawer = () => {
    const router = useRouter();
    const { cart, isCartOpen, toggleCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

        const handleCheckout = () => {
        toast("Redirecting to Checkout...");
        toggleCart();
        router.push("/checkout");
    };

    return (
        <>
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/70 z-40" onClick={toggleCart}></div>
            )}

            <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">Shopping Cart ({cart.length})</h2>
                    <button onClick={toggleCart}><X className="w-5 h-5" /></button>
                </div>

                <div className="p-4 space-y-4 overflow-y-auto max-h-[70vh]">
                    {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-4 border rounded p-3">
                            <Image priority src={item.thumbnail} alt={item.title} width={56} height={56} className="object-cover rounded" />

                            <div className="flex-1">
                                <h4 className="text-sm font-medium">{item.title}</h4>
                                <p className="text-sm text-gray-600">${item.price}</p>

                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => {
                                            decreaseQuantity(item.id);
                                            toast(`Decreased quantity for ${item.title}`);
                                        }}
                                        className="border rounded w-6 h-6 flex items-center justify-center text-sm"
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() => {
                                            increaseQuantity(item.id);
                                            toast(`Increased quantity for ${item.title}`);
                                        }}
                                        className="border rounded w-6 h-6 flex items-center justify-center text-sm"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    removeFromCart(item.id);
                                    toast(`${item.title} removed from cart`);
                                }}
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t">
                    <p className="text-right text-lg font-bold">
                        Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                    </p>

                    {cart.length > 0 && (
                        <button
                            onClick={handleCheckout}
                            className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-white hover:text-black hover:border-black border-2"
                        >
                            Proceed to Checkout
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
