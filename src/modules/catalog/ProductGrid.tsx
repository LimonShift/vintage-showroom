import ProductCard from './ProductCard'
import type { Product } from './productService'

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-cream/10">
        <p className="font-bebas text-2xl tracking-widest text-cream/40">
          NO HAY PRENDAS AHORA MISMO
        </p>
        <p className="font-mono text-xs text-cream/30 mt-3">
          VUELVE PRONTO 👕
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}