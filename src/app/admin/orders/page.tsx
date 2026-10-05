'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/config/supabaseClient'
import { getAllOrders } from '@/modules/admin/ordersAdminService'
import OrderCard from '@/modules/admin/OrderCard'
import AdminNav from '@/modules/admin/AdminNav'
import Link from 'next/link'
import type { Order } from '@/modules/admin/ordersAdminService'

export default function AdminOrdersPage() {
  const [mounted, setMounted] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'paid' | 'shipped'>('all')

  useEffect(() => {
    setMounted(true)

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = '/admin/login'
        return
      }
      loadOrders()
    })
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    const data = await getAllOrders()
    setOrders(data)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  if (!mounted) return null

  const filtered =
    filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  const paidCount = orders.filter((o) => o.status === 'paid').length
  const shippedCount = orders.filter((o) => o.status === 'shipped').length

  return (
    <div className="min-h-screen bg-[#fafaf7]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fafaf7]/80 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-black tracking-tight">
              VINTAGE<span className="text-orange-600">.</span>SHOWROOM
            </Link>
            <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
              Admin
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs text-neutral-500 hover:text-black transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-4">
          <AdminNav />
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Pedidos
          </h1>
          <p className="text-neutral-500 mt-2 text-sm">
            {orders.length} pedidos en total
          </p>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(
            [
              { key: 'all', label: 'Todos' },
              { key: 'paid', label: `Pendientes (${paidCount})` },
              { key: 'shipped', label: `Enviados (${shippedCount})` },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === key
                  ? 'bg-black text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-black'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Listado */}
        {loading ? (
          <p className="text-center text-neutral-500 py-12">Cargando...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-neutral-500 py-12">
            No hay pedidos en esta categoría.
          </p>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}