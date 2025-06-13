
import { Badge } from "@/Components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { MapPin, Phone, Mail, Clock, Headphones, Shield, Globe } from "lucide-react"
import { Contactform } from "./contact.client"
import { contactMethods, departments } from "@/constents"


export function Contacttop() {
    return (
        <section className="bonnerimgcontact bg-gradient-to-r from-green-600 to-blue-600 text-white py-30">
            <div className="container max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                    We&#39;re here to help! Get in touch with our friendly support team for any questions, concerns, or feedback you
                    may have.
                </p>
                <div className="flex justify-center gap-4">
                    <Badge className="bg-white text-green-600 text-lg px-6 py-2">
                        <Headphones className="w-8 h-8 mr-2" />
                        24/7 Support
                    </Badge>
                    <Badge className="bg-white text-green-600 text-lg px-6 py-2">
                        <Shield className="w-8 h-8 mr-2" />
                        Secure & Private
                    </Badge>
                </div>
            </div>
        </section>
    )
}



export function ContactcontactMethods() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Choose the method that works best for you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactMethods.map((method, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <method.icon className="w-8 h-8 text-green-600" />
                                </div>
                                <CardTitle className="text-xl">{method.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-gray-600 text-sm">{method.description}</p>
                                <p className="font-medium">{method.contact}</p>
                                <Badge variant="secondary" className="text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {method.availability}
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


export function Contactformpage() {

    return (
        <div className="min-h-screen max-w-7xl mx-auto">
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <Contactform />
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                                <div className="space-y-4 grid grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-green-600 mt-1" />
                                        <div>
                                            <p className="font-medium">Headquarters</p>
                                            <p className="text-gray-600">
                                                123 Commerce Street
                                                <br />
                                                New York, NY 10001
                                                <br />
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-green-600 mt-1" />
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <p className="text-gray-600">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-green-600 mt-1" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-gray-600">support@dummystore.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className="w-5 h-5 text-green-600 mt-1" />
                                        <div>
                                            <p className="font-medium">Website</p>
                                            <p className="text-gray-600">www.dummystore.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-4">Department Contacts</h3>
                                <div className="space-y-3">
                                    {departments.map((dept, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="font-medium">{dept.name}</span>
                                            <span className="text-sm text-gray-600">{dept.email}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                                <div className="space-y-2 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday:</span>
                                        <span>9:00 AM - 6:00 PM EST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday:</span>
                                        <span>10:00 AM - 4:00 PM EST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday:</span>
                                        <span>Closed</span>
                                    </div>
                                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                        <p className="text-sm text-green-700 font-medium">
                                            <Headphones className="w-4 h-4 inline mr-1" />
                                            Emergency support available 24/7
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}



export function Contactfaq() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Quick answers to common questions</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div>
                        <h4 className="font-bold mb-2">How long does shipping take?</h4>
                        <p className="text-gray-600 text-sm mb-4">
                            Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">What is your return policy?</h4>
                        <p className="text-gray-600 text-sm mb-4">
                            We offer a 30-day return policy for all items in original condition with receipt.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Do you ship internationally?</h4>
                        <p className="text-gray-600 text-sm mb-4">
                            Yes, we ship to over 50 countries worldwide. Shipping costs vary by location.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">How can I track my order?</h4>
                        <p className="text-gray-600 text-sm mb-4">
                            You&#39;ll receive a tracking number via email once your order ships. Use it on our tracking page.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
