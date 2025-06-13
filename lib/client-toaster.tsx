'use client'

import { usePathname } from 'next/navigation'
import { Toaster } from 'sonner'

export default function ClientToaster() {
  const pathname = usePathname()

  if (pathname === '/contact') {
    return <Toaster position="top-center" />
  }

  return <Toaster />
}
