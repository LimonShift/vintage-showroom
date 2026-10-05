'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin/dashboard', label: 'Alta rápida' },
  { href: '/admin/products', label: 'Productos' },
  { href: '/admin/orders', label: 'Pedidos' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
      {links.map((link) => {
        const active = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              active
                ? 'bg-black text-white'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}