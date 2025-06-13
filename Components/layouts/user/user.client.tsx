"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { User, Package, Settings, Mail, Calendar, Truck, CreditCard, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Badge } from "@/Components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Label } from "@/Components/ui/label"
import { Separator } from "@/Components/ui/separator"
import { useCart } from "@/lib/CartContext"

interface UserProfile {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    image: string
    address: {
        address: string
        city: string
        state: string
        postalCode: string
        country: string
    }
    birthDate: string
    age: number
}

interface UserProfile {
    name: string;
    email: string;
}

export default function ProfilePage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cart: cartItems, isCartOpen } = useCart();
    const [activeTab, setActiveTab] = useState("profile");
    const [originalUser, setOriginalUser] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('🛒 Cart Debug Info:');
        console.log('cartItems:', cartItems);
        console.log('cartItems type:', typeof cartItems);
        console.log('cartItems length:', cartItems?.length);
    }, [cartItems]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("https://dummyjson.com/users/2")
                const data = await res.json()
                setUser(data)
                setOriginalUser(data)
            } catch (error) {
                console.error("Error fetching user:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.target;

  if (["address", "city", "state", "postalCode", "country"].includes(id)) {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        address: {
          ...(prev.address || {}),
          [id]: value,
        },
      };
    });
  } else {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [id]: value,
      };
    });
  }
};
    const handleSave = async () => {
        try {
            const res = await fetch("https://dummyjson.com/users/2", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })

            const updated = await res.json()
            setUser(updated)
            setOriginalUser(updated)
            setIsEditing(false)
            console.log("User updated:", updated)
        } catch (error) {
            console.error("Error updating user:", error)
        }
    }

    const handleCancel = () => {
        setUser(originalUser)
        setIsEditing(false)
    }

    if (loading || !user) return <div className="p-6 max-w-7xl mx-auto">Loading...</div>


    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="bg-gray-200 h-8 rounded w-1/4 mb-8"></div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-200 h-64 rounded-lg"></div>
                        <div className="md:col-span-2 space-y-4">
                            <div className="bg-gray-200 h-6 rounded"></div>
                            <div className="bg-gray-200 h-6 rounded w-3/4"></div>
                            <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
                <p className="text-gray-600 mb-8">Unable to load user profile.</p>
                <Button asChild>
                    <Link href="/">Go Home</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-[1300px] px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Account</h1>
                <p className="text-gray-600">Manage your profile and view your orders</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8 lg:gap-20">
                <div className="lg:col-span-1 min-w-[315px]">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center mb-6">
                                <Avatar className="w-24 h-24 mx-auto mb-4">
                                    <AvatarImage src={user.image || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                                    <AvatarFallback className="text-2xl">
                                        {user.firstName[0]}
                                        {user.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-bold">
                                    {user.firstName} {user.lastName}
                                </h3>
                                <p className="text-gray-600">{user.email}</p>
                                <Badge className="mt-2">Premium Member</Badge>
                            </div>

                            <nav className="space-y-5">
                                <Button
                                    variant={activeTab === "profile" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveTab("profile")}
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Profile
                                </Button>
                                <Button
                                    variant={activeTab === "orders" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveTab("orders")}
                                >
                                    <Package className="w-4 h-4 mr-2" />
                                    Orders
                                    {cartItems && cartItems.length > 0 && (
                                        <Badge variant="secondary" className="ml-auto">
                                            {cartItems.length}
                                        </Badge>
                                    )}
                                </Button>
                                <Button
                                    variant={activeTab === "settings" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveTab("settings")}
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Settings
                                </Button>
                            </nav>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-3">
                    {activeTab === "profile" && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Profile Information</CardTitle>
                                {!isEditing && (
                                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                                        Edit
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label>First Name</Label>
                                        <Input id="firstName" value={user.firstName} onChange={handleChange} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Last Name</Label>
                                        <Input id="lastName" value={user.lastName} onChange={handleChange} disabled={!isEditing} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label>Email Address</Label>
                                    <Input id="email" value={user.email} onChange={handleChange} disabled={!isEditing} />
                                </div>

                                <div className="space-y-3">
                                    <Label>Phone Number</Label>
                                    <Input id="phone" value={user.phone} onChange={handleChange} disabled={!isEditing} />
                                </div>

                                <div className="space-y-3">
                                    <Label>Birth Date</Label>
                                    <Input id="birthDate" type="date" value={user.birthDate} onChange={handleChange} disabled={!isEditing} />
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-3">
                                            <Label>Street Address</Label>
                                            <Input id="address" value={user.address?.address} onChange={handleChange} disabled={!isEditing} />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <Label>City</Label>
                                                <Input id="city" value={user.address?.city} onChange={handleChange} disabled={!isEditing} />
                                            </div>
                                            <div className="space-y-3">
                                                <Label>State</Label>
                                                <Input id="state" value={user.address?.state} onChange={handleChange} disabled={!isEditing} />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <Label>Postal Code</Label>
                                                <Input id="postalCode" value={user.address?.postalCode} onChange={handleChange} disabled={!isEditing} />
                                            </div>
                                            <div className="space-y-3">
                                                <Label>Country</Label>
                                                <Input id="country" value={user.address?.country} onChange={handleChange} disabled={!isEditing} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex gap-4 pt-4">
                                        <Button onClick={handleSave}>Save Changes</Button>
                                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "orders" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Order History</CardTitle>
                                <p className="text-sm text-gray-600">
                                    {cartItems ? `${cartItems.length} items in cart` : "No items found"}
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {cartItems && cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h4 className="font-semibold">{item.title}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        <Calendar className="w-4 h-4 inline mr-1" />
                                                        {new Date().toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Badge variant="secondary">In Cart</Badge>
                                            </div>

                                            <div className="flex-wrap space-y-3 items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <Image
                                                        src={item.thumbnail || "/placeholder.svg"}
                                                        alt={item.title}
                                                        width={60}
                                                        height={60}
                                                        className="rounded-md object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium">Quantity: {item.quantity}</p>
                                                        <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                                        <p className="text-sm font-semibold">
                                                            Total: ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mx-auto">
                                                    <Button variant="outline" size="sm">
                                                        <Truck className="w-4 h-4 mr-1" />
                                                        Track
                                                    </Button>
                                                    <Link
                                                        href={`/product/${item.id}`}
                                                    >
                                                        <Button variant="outline" size="sm">
                                                            View Details
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                            No Orders Yet
                                        </h3>
                                        <p className="text-gray-500 mb-6">
                                            Your cart is empty. Start shopping to see your orders here!
                                        </p>
                                        <Button asChild>
                                            <Link href="/product">Start Shopping</Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                            <div className="px-6 py-4 border-t flex items-center gap-2">
                                <h2 className="text-2xl font-semibold mb-2">Totals:</h2>
                                <p className="text-base text-gray-700">
                                    <span className="font-bold text-3xl">
                                        ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                    </span>
                                </p>
                            </div>

                        </Card>
                    )}
                    {activeTab === "settings" && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Shield className="w-5 h-5 text-green-600" />
                                            <div>
                                                <p className="font-medium">Two-Factor Authentication</p>
                                                <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                            </div>
                                        </div>
                                        <Button variant="outline">Enable</Button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="font-medium">Email Notifications</p>
                                                <p className="text-sm text-gray-600">Receive updates about your orders</p>
                                            </div>
                                        </div>
                                        <Button variant="outline">Manage</Button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="w-5 h-5 text-purple-600" />
                                            <div>
                                                <p className="font-medium">Payment Methods</p>
                                                <p className="text-sm text-gray-600">Manage your saved payment methods</p>
                                            </div>
                                        </div>
                                        <Button variant="outline">Manage</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                                        <h4 className="font-medium text-red-800 hover:text-red-600 mb-2">Delete Account</h4>
                                        <p className="text-sm text-red-600 mb-4">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                        <Button variant="destructive">Delete Account</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}