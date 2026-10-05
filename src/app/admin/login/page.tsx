'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/config/supabaseClient'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Crear usuario en Supabase directamente desde la App
  const handleSignUp = async () => {
    setMsg(null)
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMsg(`Error registrando: ${error.message}`)
    } else if (data.user) {
      setMsg('Usuario registrado con éxito. Prueba ahora a iniciar sesión.')
    }
    setLoading(false)
  }

  // Iniciar sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMsg(`Error Login: ${error.message}`)
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Panel Admin</h1>

        {msg && (
          <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg border border-blue-200">
            {msg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Cargando...' : '1. Iniciar Sesión'}
          </button>
        </form>

        <hr className="my-4" />

        <button
          type="button"
          onClick={handleSignUp}
          disabled={loading || !email || !password}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 text-sm"
        >
          2. Registrar Usuario con estos datos
        </button>
      </div>
    </div>
  )
}