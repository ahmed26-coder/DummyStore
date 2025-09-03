"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, Users, Globe, Award } from "lucide-react"

export const stats = [
  { icon: ShoppingCart, label: "Products Sold", value: 1000000, suffix: "+" },
  { icon: Users, label: "Happy Customers", value: 500000, suffix: "+" },
  { icon: Globe, label: "Countries Served", value: 50, suffix: "+" },
  { icon: Award, label: "Awards Won", value: 25, suffix: "+" },
]

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16) // تحديث كل 16ms ~ 60fps
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        start = end
        clearInterval(timer)
      }
      setCount(Math.floor(start))
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration])

  return count
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const count = useCountUp(stat.value, 2000)
            return (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {count.toLocaleString()}{stat.suffix}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
