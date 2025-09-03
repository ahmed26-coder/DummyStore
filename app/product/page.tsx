"use client"

import Product from '@/components/layouts/product/page'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex gap-4 overflow-x-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[230px] h-[320px] bg-white border border-gray-200 rounded-md p-4 animate-pulse flex flex-col gap-4"
              >
                <div className="h-[180px] w-full bg-gray-200 rounded-md" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-6 bg-gray-200 rounded w-1/4 mt-auto" />
              </div>
            ))}
          </div>
        }
      >
        <Product />
      </Suspense>
    </div>
  )
}
