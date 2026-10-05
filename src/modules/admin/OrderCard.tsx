'use client'

import { useState } from 'react'
import type { Order } from './ordersAdminService'
import { markAsShipped } from './ordersAdminService'

const carriers = ['Correos', 'SEUR', 'MRW', 'GLS', 'Otro']

export default function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [carrier, setCarrier] = useState(order.carrier || 'Correos')
  const [tracking, setTracking] = useState(order.tracking_number || '')
  const [saving, setSaving] = useState(false)

  const isShipped = order.status === 'shipped'

  const handleShip = async () => {
    if (!tracking.trim()) {
      alert('Introduce un número de seguimiento')
      return
    }

    setSaving(true)
    const res = await markAsShipped(order.id, carrier, tracking.trim())
    setSaving(false)

    if (!res.success) {
      alert('Error: ' + res.error)
    } else {
      setEditing(false)
      window.location.reload()
    }
  }

  const image = order.products?.images?.[0] || '/placeholder.png'

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
      {/* Cabecera — siempre visible */}
      <div
        className="p-4 flex items-center gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <img
          src={image}
          alt="Producto"
          className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">
            {order.customer_name}
          </p>
          <p className="text-xs text-neutral-500 truncate">
            {order.customer_email}
          </p>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-sm font-bold">
            {order.amount_total.toFixed(2)} €
          </p>
          <p className="text-xs text-neutral-500">
            {new Date(order.created_at).toLocaleDateString('es-ES')}
          </p>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
            isShipped
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {isShipped ? 'Enviado' : 'Pendiente'}
        </span>
      </div>

      {/* Detalle expandido */}
      {expanded && (
        <div className="border-t border-neutral-200 p-4 bg-neutral-50 space-y-4">
          {/* Dirección de envío */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2">
              Dirección de envío
            </h4>
            <p className="text-sm">
              {order.shipping_address?.line1 || '—'}
              {order.shipping_address?.line2 &&
                `, ${order.shipping_address.line2}`}
            </p>
            <p className="text-sm text-neutral-600">
              {order.shipping_address?.postal_code}{' '}
              {order.shipping_address?.city}
            </p>
            <p className="text-sm text-neutral-600">
              {order.shipping_address?.country}
            </p>
          </div>

          {/* Producto comprado */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2">
              Producto
            </h4>
            <p className="text-sm">
              {order.products?.title || 'Producto no encontrado'}
            </p>
          </div>

          {/* Info Stripe */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2">
              Pago
            </h4>
            <p className="text-xs font-mono text-neutral-600 break-all">
              {order.stripe_session_id}
            </p>
            <a
              href={`https://dashboard.stripe.com/test/payments?query=${order.stripe_session_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline mt-1 inline-block"
            >
              Ver en Stripe Dashboard →
            </a>
          </div>

          {/* Tracking / marcar enviado */}
          <div className="pt-3 border-t border-neutral-200">
            {isShipped ? (
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2">
                  Envío
                </h4>
                <p className="text-sm">
                  <span className="font-semibold">{order.carrier}:</span>{' '}
                  <span className="font-mono">{order.tracking_number}</span>
                </p>
                {order.shipped_at && (
                  <p className="text-xs text-neutral-500 mt-1">
                    Enviado el{' '}
                    {new Date(order.shipped_at).toLocaleDateString('es-ES')}
                  </p>
                )}
              </div>
            ) : editing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 mb-1">
                    Paquetería
                  </label>
                  <select
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white"
                  >
                    {carriers.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-500 mb-1">
                    Nº de seguimiento
                  </label>
                  <input
                    type="text"
                    value={tracking}
                    onChange={(e) => setTracking(e.target.value)}
                    placeholder="Ej. PQ123456789ES"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleShip}
                    disabled={saving}
                    className="flex-1 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 disabled:opacity-50"
                  >
                    {saving ? 'Guardando...' : 'Marcar como enviado'}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-neutral-200 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="w-full bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800"
              >
                Marcar como enviado
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}