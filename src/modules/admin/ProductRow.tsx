'use client'

import { useState } from 'react'
import type { Product } from '@/modules/catalog/productService'
import { updateProduct, deleteProduct } from './productAdminService'

export default function ProductRow({ product }: { product: Product }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(product.title)
  const [price, setPrice] = useState(product.price)
  const [status, setStatus] = useState(product.status)
  const [saving, setSaving] = useState(false)

  const image = product.images?.[0] || '/placeholder.png'

  const statusColor =
    product.status === 'available'
      ? 'bg-green-100 text-green-800'
      : product.status === 'reserved'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800'

  const handleSave = async () => {
    setSaving(true)
    const res = await updateProduct(product.id, {
      title,
      price: Number(price),
      status: status as Product['status'],
    })
    setSaving(false)

    if (!res.success) {
      alert('Error: ' + res.error)
    } else {
      setEditing(false)
      window.location.reload()
    }
  }

  const handleDelete = async () => {
    if (!confirm(`¿Seguro que quieres borrar "${product.title}"?`)) return

    const res = await deleteProduct(product.id)
    if (!res.success) {
      alert('Error: ' + res.error)
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
      <img
        src={image}
        alt={product.title}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1 w-full">
        {editing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-24 px-3 py-2 border rounded-lg text-sm"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Product['status'])}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="available">Disponible</option>
                <option value="reserved">Reservado</option>
                <option value="sold">Vendido</option>
              </select>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-sm">{product.title}</h3>
            <p className="text-xs text-neutral-500">
              {product.brand} · Talla {product.size} · {product.category}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm font-bold">{product.price.toFixed(2)} €</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
                {product.status}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 md:flex-none bg-black text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-neutral-800"
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex-1 md:flex-none bg-neutral-200 text-black px-4 py-2 rounded-lg text-xs font-medium hover:bg-neutral-300"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="flex-1 md:flex-none bg-neutral-100 text-black px-4 py-2 rounded-lg text-xs font-medium hover:bg-neutral-200"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 md:flex-none bg-red-100 text-red-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-200"
            >
              Borrar
            </button>
          </>
        )}
      </div>
    </div>
  )
}