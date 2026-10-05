import Link from 'next/link'
import type { Product } from './productService'

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0] || '/placeholder.png'

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 space-y-1 text-black">
        <h3 className="font-semibold text-sm truncate">{product.title}</h3>
        <p className="text-xs text-gray-500">
          {product.brand} · Talla {product.size}
        </p>
        <p className="text-base font-bold">{product.price.toFixed(2)} €</p>
      </div>
    </Link>
  )
}