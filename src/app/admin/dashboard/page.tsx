'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/config/supabaseClient'
import AddProductForm from '@/modules/admin/AddProductForm'
import AdminNav from '@/modules/admin/AdminNav'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Protección: si no hay sesión, redirigir a login
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = '/admin/login'
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  if (!mounted) return null

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
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Alta rápida
          </h1>
          <p className="text-neutral-500 mt-2 text-sm">
            Sube una prenda nueva con foto directamente desde el móvil.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
          <AddProductForm />
        </div>
      </main>
    </div>
  )
}