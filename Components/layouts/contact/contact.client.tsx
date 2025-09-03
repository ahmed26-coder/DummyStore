'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import React, { useState } from 'react'

export function Contactform() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    subscribed: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.subject &&
    formData.message &&
    formData.subscribed

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { id, value, type } = e.target

  const updatedValue = type === 'checkbox'
    ? (e.target as HTMLInputElement).checked
    : value

  setFormData((prev) => ({
    ...prev,
    [id]: updatedValue,
  }))
}


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success('Message sent successfully!')

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      subscribed: false,
    })

    setIsSubmitting(false)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
      <p className="text-gray-600 mb-8">
        Fill out the form below and we&#39;ll get back to you as soon as possible.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
              First Name *
            </label>
            <Input id="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
              Last Name *
            </label>
            <Input id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject *
          </label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help you?"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe your inquiry in detail..."
            rows={6}
            required
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="subscribed"
            checked={formData.subscribed}
            onChange={handleChange}
            className="rounded"
            disabled={isSubmitting}
          />
          <label htmlFor="subscribed" className="text-sm text-gray-600">
            Subscribe to our newsletter for updates and special offers
          </label>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
