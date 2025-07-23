import { Inter } from 'next/font/google'
import CookieBanner from './CookieBanner' // Importējam jauno komponenti
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Sintijas Citāti',
  description: 'Viņas mīļākie citāti no grāmatām',
}

export default function RootLayout({ children }) {
  return (
    <html lang="lv" className={inter.variable}>
      <head>
        {/* AdSense un Analytics skripti ir izņemti no šejienes! */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" 
          xintegrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className="font-sans bg-mauve text-russian-violet">
        {children}
        <CookieBanner /> {/* Pievienojam baneri šeit */}
      </body>
    </html>
  )
}
