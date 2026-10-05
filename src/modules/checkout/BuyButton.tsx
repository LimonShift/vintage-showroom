'use client'

import { useState } from 'react'

export default function BuyButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Error al procesar la compra')
        setLoading(false)
        return
      }
      window.location.href = data.url
    } catch (err) {
      alert('Error de conexión')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 text-sm tracking-wide"
    >
      {loading ? 'Redirigiendo a Stripe...' : 'Comprar ahora →'}
    </button>
  )
}