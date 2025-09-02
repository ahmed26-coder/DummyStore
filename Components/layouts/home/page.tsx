import React from 'react'
import {Homebottom, Hometop} from './home.chunks'
import Homeproduct from './home.client'
import { CustomerReviewsMarquee } from '@/Components/customer-reviews-marquee'


export default function Home() {
  return (
    <div className=" max-w-7xl">
      <Hometop />
      <Homeproduct />
      <CustomerReviewsMarquee />
      <Homebottom />
    </div>
  )
}
