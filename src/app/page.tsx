import CatalogClient from '@/modules/catalog/CatalogClient'
import { getAvailableProducts } from '@/modules/catalog/productService'

export const revalidate = 0

export default async function HomePage() {
  const products = await getAvailableProducts()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-black">
            Vintage Showroom
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            {products.length} prendas disponibles
          </p>
        </div>
      </header>

      {/* Catálogo */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <CatalogClient products={products} />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Vintage Showroom
        </div>
      </footer>
    </main>
  )
}