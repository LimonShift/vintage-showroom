import './globals.css'
import { Inter, Bebas_Neue, Anton, Space_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
})
const mono = Space_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata = {
  title: 'OG RETRO — Vintage is Forever',
  description: 'Ropa vintage única. Cuando se vende, desaparece.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${bebas.variable} ${anton.variable} ${mono.variable} font-sans bg-ink text-cream antialiased`}
      >
        {children}
      </body>
    </html>
  )
}