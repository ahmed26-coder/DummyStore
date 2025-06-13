import React from 'react'
import { Aboutusfeatures, Aboutusimg, Aboutusteam, Aboutustop, Aboutvalues } from './about-us.chunks'
import { CustomerReviewsMarquee } from '@/Components/customer-reviews-marquee'

export default function About() {
  return (
    <div>
      <Aboutustop />
      <Aboutusimg />
      <Aboutusfeatures />
      <CustomerReviewsMarquee />
      <Aboutusteam />
      <Aboutvalues />
    </div>
  )
}
