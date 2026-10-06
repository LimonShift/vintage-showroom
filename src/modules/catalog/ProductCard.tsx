import Link from 'next/link'
import type { Product } from './productService'

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0] || '/placeholder.png'

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-surface border-2 border-cream/10 hover:border-gold-500 transition-colors"
    >
      <div className="aspect-square overflow-hidden bg-black">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 border-t-2 border-cream/10">
        <h3 className="font-bebas text-lg tracking-wide text-cream leading-tight line-clamp-1">
          {product.title.toUpperCase()}
        </h3>
        <p className="font-mono text-[10px] text-cream/40 mt-1">
          {product.brand.toUpperCase()} · TALLA {product.size}
        </p>
        <p className="font-anton text-2xl text-gold-500 mt-2">
          {product.price.toFixed(2)}€
        </p>
      </div>
    </Link>
  )
}