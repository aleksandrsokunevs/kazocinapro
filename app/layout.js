import { Inter } from 'next/font/google'
import Script from 'next/script' // Importējam Script komponenti
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Kazocina.pro Citāti',
  description: 'Viņas mīļākie citāti no grāmatām',
}

export default function RootLayout({ children }) {
  return (
    <html lang="lv" className={inter.variable}>
      <head>
        {/* Pievienojam Google AdSense skriptu */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0388155554297058" // JĀNOMAIŅA AR JŪSU PUBLICĒTĀJA ID
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans bg-mauve text-russian-violet">{children}</body>
    </html>
  )
}
