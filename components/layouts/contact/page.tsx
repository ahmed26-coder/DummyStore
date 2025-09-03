import React from 'react'
import { ContactcontactMethods, Contactfaq, Contactformpage, Contacttop } from './contact.chunks'

export default function Contact() {
  return (
    <div>
      <Contacttop />
      <ContactcontactMethods />
      <Contactformpage />
      <Contactfaq />
    </div>
  )
}
