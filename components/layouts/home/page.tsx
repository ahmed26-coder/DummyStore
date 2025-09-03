import React from 'react'
import {Homebottom, Hometop} from './home.chunks'
import Homeproduct from './home.client'
import { CustomerReviewsMarquee } from '@/components/customer-reviews-marquee'


export default function Home() {
  return (
    <div className="">
      <Hometop />
      <Homeproduct />
      <CustomerReviewsMarquee />
      <Homebottom />
    </div>
  )
}
