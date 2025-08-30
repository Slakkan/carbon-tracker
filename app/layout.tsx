import type { Metadata } from 'next'

import '@/styles/globals.scss'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Carbon Tracker',
  description: 'A simple PoC for Opesus',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
