mport { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Kazocina.pro Citāti',
  description: 'Mīļākie citāti no grāmatām',
}

export default function RootLayout({ children }) {
  return (
    <html lang="lv" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}