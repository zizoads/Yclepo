import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ 
  subsets: ['latin', 'arabic'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Yclep - منصة صفحات الهبوط',
  description: 'منصة متكاملة لإدارة صفحات الهبوط للمنتجات مع نظام الوكلاء',
  keywords: 'صفحات هبوط, منتجات, أفليت, تسويق',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={inter.variable}>
      <body className="font-sans antialiased bg-gray-50">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
