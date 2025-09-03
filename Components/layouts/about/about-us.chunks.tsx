import Image from "next/image"

import { Award, Heart, Star, Globe, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


import React from 'react'
import Link from "next/link"
import { features, team } from "@/constents"
import StatsSection from "./about-us.client"

export function Aboutustop() {

    return (
        <>
            <section className=" bonnerimgabout text-black bg-gradient-to-r from-blue-600 to-purple-600 py-30">
                <div className="container max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">About ShraraStore</h1>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        We&#39;re on a mission to revolutionize online shopping by providing the best products, exceptional service, and
                        an unmatched customer experience powered by cutting-edge technology.
                    </p>
                    <Badge className="bg-white text-pink-600 text-lg px-6 py-2">Powered by ShraraJSON API</Badge>
                </div>
            </section>
            <StatsSection />
        </>
    )
}


export function Aboutusimg() {
    return (
        <section className="py-16">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                Founded in 2020, ShraraStore began as a simple idea: to create an online marketplace that puts
                                customers first. What started as a small team of passionate entrepreneurs has grown into a global
                                platform serving millions of customers worldwide.
                            </p>
                            <p>
                                We believe that shopping should be easy, enjoyable, and accessible to everyone. That&#39;s why we&#39;ve built
                                our platform using the latest technologies, including the powerful DummyJSON API, to provide you with
                                real-time product information, seamless transactions, and personalized experiences.
                            </p>
                            <p>
                                Today, we&#39;re proud to offer thousands of products across multiple categories, from the latest
                                smartphones and laptops to beauty products and home essentials. Our commitment to quality, innovation,
                                and customer satisfaction drives everything we do.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <span className="text-lg font-medium">Trusted by 500K+ customers</span>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            src="/aboutteemwork (2).webp"
                            alt="Our team working"
                            width={600}
                            height={400}
                            className="rounded-lg h-fit shadow-lg"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            </div>
                            <p className="font-bold text-lg">4.9/5 Rating</p>
                            <p className="text-sm text-gray-600">From 50K+ reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export function Aboutusfeatures() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose ShraraStore?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We&#39;re committed to providing you with the best shopping experience possible
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


export function Aboutusteam() {
    return (
        <section className="pb-16">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">The passionate people behind ShraraStore&#39;s success</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Image
                                    src={member.image || "/placeholder.svg"}
                                    alt={member.name}
                                    width={200}
                                    height={200}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                                <CardTitle className="text-xl">{member.name}</CardTitle>
                                <Badge variant="secondary" className=" w-full">{member.role}</Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600  text-sm">{member.bio}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


export function Aboutvalues() {
    return (
        <>
            <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
                        <p className="text-xl max-w-3xl mx-auto">
                            We&#39;re driven by a simple mission: to make online shopping better for everyone
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Customer First</h3>
                            <p className="text-white/90">Every decision we make is guided by what&#39;s best for our customers</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Quality Excellence</h3>
                            <p className="text-white/90">We never compromise on quality, from products to service</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Global Impact</h3>
                            <p className="text-white/90">Building a platform that connects people and products worldwide</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
                    <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
                        Experience the difference of shopping with ShraraStore. Join millions of satisfied customers today.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/product">
                            <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                                Start Shopping
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
