import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductById } from '@/modules/catalog/productService'
import BuyButton from '@/modules/checkout/BuyButton'

export const revalidate = 0

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProductById(params.id)

  if (!product) notFound()

  const image = product.images?.[0] || '/placeholder.png'

  return (
    <main className="min-h-screen bg-ink text-cream">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur-sm border-b-2 border-gold-500">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="font-bebas text-lg tracking-widest text-cream/70 hover:text-gold-500 transition-colors"
          >
            ← VOLVER
          </Link>
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="OG RETRO"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      {/* CINTA DIAGONAL */}
      <div className="overflow-hidden bg-gold-500 border-y-2 border-black">
        <div className="marquee py-1.5 font-anton text-sm tracking-wider text-black whitespace-nowrap">
          <span className="mx-8">★ PIEZA ÚNICA ★ NO HABRÁ OTRA IGUAL ★ VINTAGE IS FOREVER ★</span>
          <span className="mx-8">★ PIEZA ÚNICA ★ NO HABRÁ OTRA IGUAL ★ VINTAGE IS FOREVER ★</span>
        </div>
      </div>

      {/* FICHA */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Foto */}
          <div>
            <div className="aspect-square bg-black border-2 border-cream/10 overflow-hidden relative">
              <div className="absolute top-3 left-3 z-10 bg-gold-500 text-black font-bebas text-xs tracking-widest px-3 py-1">
                ÚNICA
              </div>
              <img
                src={image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-mono text-[10px] text-cream/30 mt-4 text-center tracking-widest">
              PIEZA ÚNICA · NO HABRÁ OTRA IGUAL
            </p>
          </div>

          {/* Info */}
          <div className="space-y-8 md:pt-4">
            <div>
              <p className="font-mono text-xs text-gold-500 tracking-[0.3em] uppercase mb-3">
                {product.category}
              </p>
              <h1 className="font-anton text-4xl md:text-5xl text-cream tracking-tight leading-tight">
                {product.title.toUpperCase()}
              </h1>
              <p className="font-bebas text-lg tracking-wider text-cream/50 mt-2">
                {product.brand.toUpperCase()} · TALLA {product.size}
              </p>
            </div>

            <p className="font-anton text-5xl text-gold-500">
              {product.price.toFixed(2)}€
            </p>

            <div className="border-y-2 border-cream/10 py-5 space-y-3">
              <Row label="MARCA" value={product.brand.toUpperCase()} />
              <Row label="TALLA" value={product.size.toUpperCase()} />
              <Row label="CATEGORÍA" value={product.category.toUpperCase()} />
              <Row label="ESTADO" value={product.condition.toUpperCase()} />
              {product.condition_notes && (
                <Row label="NOTAS" value={product.condition_notes} />
              )}
            </div>

            {product.description && (
              <div>
                <h2 className="font-bebas text-xl tracking-widest text-cream mb-3">
                  DESCRIPCIÓN
                </h2>
                <p className="text-sm text-cream/60 whitespace-pre-line leading-relaxed font-sans">
                  {product.description}
                </p>
              </div>
            )}

            <BuyButton productId={product.id} />

            <div className="font-mono text-[10px] text-cream/30 text-center space-y-1 tracking-widest">
              <p>PAGO SEGURO CON STRIPE · APPLE PAY · GOOGLE PAY · BIZUM</p>
              <p>ENVÍO EN 24-48H</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="font-mono text-[10px] text-cream/40 tracking-widest">
        {label}
      </span>
      <span className="font-bebas text-base tracking-wider text-cream text-right">
        {value}
      </span>
    </div>
  )
}