'use client'

import { useState } from 'react'
import { uploadProductImage } from './uploadService'
import { supabase } from '@/config/supabaseClient'

export default function AddProductForm() {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('M')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('Chaquetas')
  const [condition, setCondition] = useState('Bueno')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) {
      alert('Por favor, selecciona o toma una foto de la prenda.')
      return
    }

    setLoading(true)

    const imageUrl = await uploadProductImage(imageFile)

    if (!imageUrl) {
      alert('Fallo al subir la imagen.')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('products').insert([
      {
        title,
        price: parseFloat(price),
        size,
        brand,
        category,
        condition,
        images: [imageUrl],
        status: 'available',
      },
    ])

    setLoading(false)

    if (error) {
      alert('Error al guardar el producto: ' + error.message)
    } else {
      alert('¡Prenda subida con éxito!')
      setTitle('')
      setPrice('')
      setBrand('')
      setImageFile(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded-lg space-y-4 text-black">
      <h2 className="text-xl font-bold text-gray-800">Alta Rápida de Prenda</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Foto de la prenda</label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-black file:text-white hover:file:bg-gray-800"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Título / Nombre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej. Sudadera Nike Vintage 90s"
          className="mt-1 w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio (€)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25.00"
            className="mt-1 w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Talla</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Marca</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Ej. Carhartt, Nike, Sin marca..."
          className="mt-1 w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
          >
            <option value="Chaquetas">Chaquetas</option>
            <option value="Pantalones">Pantalones</option>
            <option value="Camisetas">Camisetas</option>
            <option value="Suds">Suds</option>
            <option value="Accesorios">Accesorios</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
          >
            <option value="Impecable">Impecable</option>
            <option value="Bueno">Bueno</option>
            <option value="Con desperfecto">Con desperfecto</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? 'Subiendo producto...' : 'Publicar Prenda'}
      </button>
    </form>
  )
}