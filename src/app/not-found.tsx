import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-black">404</h1>
      <p className="text-gray-600 mt-4 text-center">
        La página que buscas no existe o la prenda ya no está disponible.
      </p>
      <Link
        href="/"
        className="mt-8 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
      >
        Volver al catálogo
      </Link>
    </main>
  )
}