import { Inter } from 'next/font/google'
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
      {/* Šeit tiek pievienotas pareizās fona un teksta krāsu klases */}
      <body className="font-sans bg-mauve text-russian-violet">{children}</body>
    </html>
  )
}
