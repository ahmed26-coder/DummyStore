import { ShoppingCart, Users, Award, Truck, Shield, Heart, Globe, Clock, MapPin, Phone, Mail, MessageCircle } from "lucide-react"

export const DataNav = [
    {
        link: "/",
        title: "Home",
    },
    {
        link: "/product",
        title: "Product",
    },
    {
        link: "/about",
        title: "About",
    },
    {
        link: "/contact",
        title: "Contact",
    },
];

export const stats = [
    { icon: ShoppingCart, label: "Products Sold", value: "1M+" },
    { icon: Users, label: "Happy Customers", value: "500K+" },
    { icon: Globe, label: "Countries Served", value: "50+" },
    { icon: Award, label: "Awards Won", value: "25+" },
]

export const features = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "Free shipping on orders over $50 worldwide",
    },
    {
        icon: Shield,
        title: "Secure Payment",
        description: "100% secure payment with SSL encryption",
    },
    {
        icon: Clock,
        title: "24/7 Support",
        description: "Round-the-clock customer support",
    },
    {
        icon: Heart,
        title: "Quality Guarantee",
        description: "30-day money-back guarantee",
    },
]

export const team = [
    {
        name: "Sarah Johnson",
        role: "CEO & Founder",
        image: "/teemwork1.avif",
        bio: "Visionary leader with 15+ years in e-commerce",
    },
    {
        name: "Michael Chen",
        role: "CTO",
        image: "/teemwork2.webp",
        bio: "Tech innovator passionate about user experience",
    },
    {
        name: "Emily Rodriguez",
        role: "Head of Marketing",
        image: "/teemwork3.avif",
        bio: "Creative strategist driving brand growth",
    },
    {
        name: "David Kim",
        role: "Head of Operations",
        image: "/teemwork4.avif",
        bio: "Operations expert ensuring smooth delivery",
    },
]

export const contactMethods = [
    {
        icon: Phone,
        title: "Phone Support",
        description: "Speak with our support team",
        contact: "+1 (555) 123-4567",
        availability: "24/7 Available",
    },
    {
        icon: Mail,
        title: "Email Support",
        description: "Send us your questions",
        contact: "support@dummystore.com",
        availability: "Response within 2 hours",
    },
    {
        icon: MessageCircle,
        title: "Live Chat",
        description: "Chat with us in real-time",
        contact: "Available on website",
        availability: "Mon-Fri 9AM-6PM EST",
    },
    {
        icon: MapPin,
        title: "Visit Our Office",
        description: "Come see us in person",
        contact: "123 Commerce St, NY 10001",
        availability: "Mon-Fri 9AM-5PM EST",
    },
]

export const departments = [
    { name: "General Support", email: "support@dummystore.com" },
    { name: "Sales Inquiries", email: "sales@dummystore.com" },
    { name: "Technical Support", email: "tech@dummystore.com" },
    { name: "Partnerships", email: "partners@dummystore.com" },
    { name: "Press & Media", email: "press@dummystore.com" },
]

export const orders = [
    {
        id: "DS-001",
        date: "2024-01-15",
        status: "Delivered",
        total: 129.99,
        items: 3,
        image: "/placeholder.svg?height=60&width=60",
    },
    {
        id: "DS-002",
        date: "2024-01-10",
        status: "Shipped",
        total: 89.5,
        items: 2,
        image: "/placeholder.svg?height=60&width=60",
    },
    {
        id: "DS-003",
        date: "2024-01-05",
        status: "Processing",
        total: 199.99,
        items: 1,
        image: "/placeholder.svg?height=60&width=60",
    },
]

export const wishlist = [
    {
        id: 1,
        title: "iPhone 15 Pro",
        price: 999,
        image: "/placeholder.svg?height=100&width=100",
        inStock: true,
    },
    {
        id: 2,
        title: "MacBook Air M2",
        price: 1199,
        image: "/placeholder.svg?height=100&width=100",
        inStock: false,
    },
    {
        id: 3,
        title: "AirPods Pro",
        price: 249,
        image: "/placeholder.svg?height=100&width=100",
        inStock: true,
    },
]

export const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/product" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];
export const categories = [
    "Smartphones",
    "Laptops",
    "Fragrances",
    "Skincare",
    "Groceries",
];