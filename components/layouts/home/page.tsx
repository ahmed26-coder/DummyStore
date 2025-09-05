import React from 'react'
import { Homebottom, Hometop } from './home.chunks'
import Homeproduct, { CategoriesSection } from './home.client'
import { CustomerReviewsMarquee } from '@/components/customer-reviews-marquee'


export default function Home() {
  return (
    <div className="">
      <Hometop />
      <Homeproduct />
      <CategoriesSection />
      <CustomerReviewsMarquee />
      <Homebottom />
    </div>
  )
}
