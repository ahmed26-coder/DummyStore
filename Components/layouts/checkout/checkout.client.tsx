"use client"

import type React from "react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { CreditCard, Truck, Shield, MapPin, User, Mail, Phone, Lock, CheckCircle } from "lucide-react"
import { useCart } from "@/lib/CartContext"
import { toast } from "sonner"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Badge } from "@/Components/ui/badge"
import { Separator } from "@/Components/ui/separator"
import { Checkbox } from "@/Components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"


export default function CheckoutPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cart: cartItems, isCartOpen } = useCart();
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
        phone: "",
        paymentMethod: "card",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        nameOnCard: "",
        saveInfo: false,
        newsletter: false,
    })

    const isFormValid = () => {
        return (
            formData.email.trim() !== "" &&
            formData.firstName.trim() !== "" &&
            formData.lastName.trim() !== "" &&
            formData.address.trim() !== "" &&
            formData.city.trim() !== "" &&
            formData.state.trim() !== "" &&
            formData.zipCode.trim() !== "" &&
            formData.paymentMethod === "card" &&
            formData.cardNumber.trim() !== "" &&
            formData.nameOnCard.trim() !== "" &&
            formData.expiryDate.trim() !== "" &&
            formData.cvv.trim() !== "" &&
            formData.saveInfo === true &&
            formData.newsletter === true 
        );
    };


    const shippingCost = 9.99
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.08
    const finalTotal = subtotal + shippingCost + tax





    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setTimeout(() => {
            setStep(4)
            toast.success("Order placed successfully!", {
                description: "You will receive a confirmation email shortly.",
            })
        }, 2000)

        setStep(3)
    }

    useEffect(() => {
        console.log('🛒 Cart Debug Info:');
        console.log('cartItems:', cartItems);
        console.log('cartItems type:', typeof cartItems);
        console.log('cartItems length:', cartItems?.length);
    }, [cartItems])
    if (cartItems.length === 0 && step < 4) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
                <Button asChild>
                    <a href="/products">Continue Shopping</a>
                </Button>
            </div>
        )
    }

    if (step === 3) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto text-center">
                    <div className="animate-spin w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-6"></div>
                    <h2 className="text-2xl font-bold mb-4">Processing Your Order</h2>
                    <p className="text-gray-600">Please wait while we process your payment...</p>
                </div>
            </div>
        )
    }

    if (step === 4) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
                    <p className="text-gray-600 mb-8">
                        Thank you for your purchase. Your order #DS-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                        has been confirmed and will be shipped soon.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h3 className="font-bold mb-4">What&#39;s Next?</h3>
                        <div className="space-y-3 text-left">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-600" />
                                <span>Confirmation email sent to {formData.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Truck className="w-5 h-5 text-blue-600" />
                                <span>Your order will be shipped within 1-2 business days</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-600" />
                                <span>Track your order using the link in your email</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Button asChild>
                            <Link href="/product">Continue Shopping</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/user">View Order History</Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 ${step >= 1 ? "text-purple-600" : "text-gray-400"}`}>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-purple-600 text-white" : "bg-gray-200"}`}
                        >
                            1
                        </div>
                        <span>Information</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <div className={`flex items-center gap-2 ${step >= 2 ? "text-purple-600" : "text-gray-400"}`}>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-purple-600 text-white" : "bg-gray-200"}`}
                        >
                            2
                        </div>
                        <span>Payment</span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                <div>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className=" space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="newsletter"
                                        checked={formData.newsletter}
                                        onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                                    />
                                    <Label htmlFor="newsletter" className="text-sm">
                                        Subscribe to our newsletter for updates and special offers
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Shipping Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className=" space-y-2">
                                        <Label htmlFor="firstName">First Name *</Label>
                                        <Input
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div className=" space-y-2">
                                        <Label htmlFor="lastName">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className=" space-y-2">
                                    <Label htmlFor="address">Address *</Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                        placeholder="123 Main Street"
                                        required
                                    />
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className=" space-y-2">
                                        <Label htmlFor="city">City *</Label>
                                        <Input
                                            id="city"
                                            value={formData.city}
                                            onChange={(e) => handleInputChange("city", e.target.value)}
                                            placeholder="New York"
                                            required
                                        />
                                    </div>
                                    <div className=" space-y-2">
                                        <Label htmlFor="state">State *</Label>
                                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="NY">New York</SelectItem>
                                                <SelectItem value="CA">California</SelectItem>
                                                <SelectItem value="TX">Texas</SelectItem>
                                                <SelectItem value="FL">Florida</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className=" space-y-2">
                                        <Label htmlFor="zipCode">ZIP Code *</Label>
                                        <Input
                                            id="zipCode"
                                            value={formData.zipCode}
                                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                            placeholder="10001"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className=" space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <RadioGroup
                                    value={formData.paymentMethod}
                                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                                >
                                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                                        <RadioGroupItem value="card" id="card" />
                                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-5 h-5" />
                                                Credit/Debit Card
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {formData.paymentMethod === "card" && (
                                    <div className="space-y-4 mt-4">
                                        <div className=" space-y-2">
                                            <Label htmlFor="cardNumber">Card Number *</Label>
                                            <Input
                                                id="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                                                placeholder="1234 5678 9012 3456"
                                                required
                                            />
                                        </div>
                                        <div className=" space-y-2">
                                            <Label htmlFor="nameOnCard">Name on Card *</Label>
                                            <Input
                                                id="nameOnCard"
                                                value={formData.nameOnCard}
                                                onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className=" space-y-2">
                                                <Label htmlFor="expiryDate">Expiry Date *</Label>
                                                <Input
                                                    id="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                                    placeholder="MM/YY"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="cvv">CVV *</Label>
                                                <Input
                                                    id="cvv"
                                                    value={formData.cvv}
                                                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                                                    placeholder="123"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="saveInfo"
                                        checked={formData.saveInfo}
                                        onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
                                    />
                                    <Label htmlFor="saveInfo" className="text-sm">
                                        Save payment information for future purchases
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Button disabled={!isFormValid()} type="submit" size="lg" className="w-full">
                            <Lock className="w-5 h-5 mr-2" />
                            Complete Order - ${finalTotal.toFixed(2)}
                        </Button>
                    </form>
                </div>

                <div>
                    <Card className="sticky top-8">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            <div className="space-y-3">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="relative">
                                            <Image
                                                src={item.thumbnail || "/placeholder.svg"}
                                                alt={item.title}
                                                width={60}
                                                height={60}
                                                className="rounded-md object-cover"
                                            />
                                            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                                {item.quantity}
                                            </Badge>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                                            <p className="text-sm text-gray-500">${item.price} each</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>${shippingCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                                <Shield className="w-5 h-5 text-green-600" />
                                <div>
                                    <p className="text-sm font-medium text-green-800">Secure Checkout</p>
                                    <p className="text-xs text-green-600">Your information is protected</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                                <Truck className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm font-medium text-blue-800">Free Shipping</p>
                                    <p className="text-xs text-blue-600">On orders over $50</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
