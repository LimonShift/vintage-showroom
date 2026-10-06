import Link from 'next/link'
import CatalogClient from '@/modules/catalog/CatalogClient'
import { getAvailableProducts } from '@/modules/catalog/productService'

export const revalidate = 0

export default async function HomePage() {
  const products = await getAvailableProducts()

  return (
    <main className="min-h-screen bg-ink text-cream">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur-sm border-b-2 border-gold-500">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="OG RETRO"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-bebas text-lg tracking-widest text-cream/70">
            <Link href="/" className="hover:text-gold-500 transition-colors">
              CATÁLOGO
            </Link>
            <a href="#como-funciona" className="hover:text-gold-500 transition-colors">
              CÓMO FUNCIONA
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline font-mono text-xs text-cream/40">
              {products.length} PRENDAS
            </span>
            <Link
              href="/admin/login"
              className="font-bebas text-sm tracking-wider text-cream/50 hover:text-gold-500 transition-colors"
            >
              ADMIN
            </Link>
          </div>
        </div>
      </header>

      {/* CINTA DIAGONAL */}
      <div className="overflow-hidden bg-gold-500 border-y-2 border-black">
        <div className="marquee py-2 font-anton text-lg tracking-wider text-black whitespace-nowrap">
          <span className="mx-8">★ OG RETRO ★ VINTAGE IS FOREVER ★ PIEZAS ÚNICAS ★ NO HABRÁ OTRA IGUAL ★</span>
          <span className="mx-8">★ OG RETRO ★ VINTAGE IS FOREVER ★ PIEZAS ÚNICAS ★ NO HABRÁ OTRA IGUAL ★</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative border-b-2 border-gold-500/20 overflow-hidden">
        {/* Imagen de fondo con overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/logo.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-ink/90 to-ink" />
        <div className="absolute inset-0 bg-stripes opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36">
          <p className="font-mono text-xs md:text-sm text-gold-500 tracking-[0.3em] uppercase mb-6">
            [ Piezas únicas · No habrá otra igual ]
          </p>

          <h1 className="font-anton text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-cream drop-shadow-[6px_6px_0_rgba(232,197,71,0.15)]">
            VINTAGE
            <br />
            <span className="text-gold-500 glitch">IS FOREVER</span>
          </h1>

          <p className="mt-8 max-w-xl font-sans text-cream/70 text-base md:text-lg">
            Ropa que ya no se fabrica. Cuando se vende, desaparece.
            Encuentra tu próxima joya antes que nadie.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#catalogo"
              className="inline-block bg-gold-500 text-black font-bebas text-xl tracking-widest px-8 py-4 brutal-shadow"
            >
              EXPLORAR CATÁLOGO
            </a>
            <a
              href="#como-funciona"
              className="inline-block border-2 border-cream/20 text-cream font-bebas text-xl tracking-widest px-8 py-4 hover:border-gold-500 transition-colors"
            >
              CÓMO FUNCIONA
            </a>
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8 border-b-2 border-cream/10 pb-4">
          <h2 className="font-anton text-4xl md:text-5xl text-cream tracking-tight">
            CATÁLOGO
          </h2>
          <p className="font-mono text-xs text-cream/40 hidden md:block">
            {products.length} PRENDAS DISPONIBLES
          </p>
        </div>

        <CatalogClient products={products} />
      </section>

      {/* CINTA DIAGONAL 2 */}
      <div className="overflow-hidden tape border-y-2 border-gold-500">
        <div className="marquee py-3 font-anton text-xl tracking-wider text-cream whitespace-nowrap">
          <span className="mx-8">/// VINTAGE IS FOREVER /// OG RETRO /// VINTAGE IS FOREVER /// OG RETRO ///</span>
          <span className="mx-8">/// VINTAGE IS FOREVER /// OG RETRO /// VINTAGE IS FOREVER /// OG RETRO ///</span>
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="bg-black">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="font-anton text-4xl md:text-5xl text-cream tracking-tight mb-16">
            CÓMO <span className="text-gold-500">FUNCIONA</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                n: '01',
                t: 'ELIGE TU PRENDA',
                d: 'Filtra por talla, marca o categoría. Cada pieza tiene su propia historia.',
              },
              {
                n: '02',
                t: 'PAGO SEGURO',
                d: 'Tarjeta, Apple Pay, Google Pay o Bizum. Todo gestionado por Stripe.',
              },
              {
                n: '03',
                t: 'RECÍBELA EN CASA',
                d: 'Enviamos en 24-48h con seguimiento. Preparada con mimo.',
              },
            ].map((step) => (
              <div key={step.n} className="border-l-4 border-gold-500 pl-6">
                <span className="font-mono text-sm text-gold-500">
                  {step.n}
                </span>
                <h3 className="mt-4 font-bebas text-2xl tracking-widest text-cream">
                  {step.t}
                </h3>
                <p className="mt-3 text-sm text-cream/50 leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-gold-500/20 bg-ink">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <img
              src="/logo.jpg"
              alt="OG RETRO"
              className="h-14 w-auto object-contain mb-3"
            />
            <p className="font-mono text-xs text-cream/40">
              © {new Date().getFullYear()} — VINTAGE IS FOREVER
            </p>
          </div>

          <div className="flex flex-wrap gap-6 font-bebas text-sm tracking-widest text-cream/50">
            <Link href="/legal/aviso" className="hover:text-gold-500 transition-colors">
              AVISO LEGAL
            </Link>
            <Link href="/legal/privacidad" className="hover:text-gold-500 transition-colors">
              PRIVACIDAD
            </Link>
            <Link href="/legal/cookies" className="hover:text-gold-500 transition-colors">
              COOKIES
            </Link>
            <Link href="/legal/envios" className="hover:text-gold-500 transition-colors">
              ENVÍOS
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
