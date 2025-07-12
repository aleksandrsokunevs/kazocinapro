import { Inter } from 'next/font/google'
import './globals.css'

// Fontu konfigurācija
// Piezīme: 'Menbere' nav standarta Google fonts, tāpēc šī ir hipotētiska ielāde.
// Ja tas nav pieejams caur `next/font`, būs jāizmanto <link> tags, kā HTML versijā.
// Pagaidām atstājam kā ir, bet Next.js varētu mest kļūdu.

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
    <html lang="lv" className={`${menbere.variable} ${inter.variable}`}>
      <head>
        {/* Alternatīva metode, ja 'next/font' nestrādā priekš Menbere */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Menbere:wght@100..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-serif">{children}</body>
    </html>
  )
}
