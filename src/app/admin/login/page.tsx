'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/config/supabaseClient'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Si ya hay sesión activa, redirigir al dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.location.href = '/admin/dashboard'
      }
    })
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      window.location.href = '/admin/dashboard'
    } catch (err: any) {
      setError(err.message || 'Error inesperado')
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf7] p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="block text-center text-xl font-black tracking-tight mb-8"
        >
          VINTAGE<span className="text-orange-600">.</span>SHOWROOM
        </Link>

        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-black tracking-tight">Panel Admin</h1>
            <p className="text-sm text-neutral-500 mt-1">Acceso restringido</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="admin@tienda.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-medium py-3 rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}