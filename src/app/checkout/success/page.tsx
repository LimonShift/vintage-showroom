import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#fafaf7] px-4 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-black tracking-tight">¡Compra completada!</h1>
      <p className="text-neutral-600 mt-4 max-w-md">
        Gracias por tu compra. Recibirás un email con los detalles y el envío.
      </p>
      <Link
        href="/"
        className="mt-8 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-neutral-800 transition-colors"
      >
        Volver al catálogo
      </Link>
    </main>
  )
}