import ProductCard from './ProductCard'
import type { Product } from './productService'

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>No hay prendas disponibles ahora mismo.</p>
        <p className="text-sm mt-2">Vuelve pronto 👕</p>
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