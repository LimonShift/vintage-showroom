import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductById } from '@/modules/catalog/productService'

export const revalidate = 0

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const image = product.images?.[0] || '/placeholder.png'

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            ← Volver al catálogo
          </Link>
        </div>
      </header>

      {/* Ficha */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Foto */}
          <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
            <img
              src={image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-6 text-black">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {product.brand} · Talla {product.size}
              </p>
            </div>

            <p className="text-3xl font-bold">{product.price.toFixed(2)} €</p>

            {/* Atributos */}
            <div className="border-t border-b border-gray-200 py-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Categoría</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estado</span>
                <span>{product.condition}</span>
              </div>
              {product.condition_notes && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Notas</span>
                  <span className="text-right">{product.condition_notes}</span>
                </div>
              )}
            </div>

            {product.description && (
              <div>
                <h2 className="font-semibold mb-2">Descripción</h2>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* CTA */}
            <button
              disabled
              className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              title="Próximamente: pago con Stripe"
            >
              Comprar ahora (próximamente)
            </button>

            <p className="text-xs text-gray-400 text-center">
              Pago seguro · Envío en 24-48h
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}