import { NextResponse } from 'next/server'
import { stripe } from '@/config/stripe'
import { supabase } from '@/config/supabaseClient'

export async function POST(request: Request) {
  try {
    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json({ error: 'Falta productId' }, { status: 400 })
    }

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (error || !product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    if (product.status !== 'available') {
      return NextResponse.json({ error: 'Producto no disponible' }, { status: 409 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
         mode: 'payment',
        line_items: [
    {
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.title,
          description: `${product.brand} · Talla ${product.size} · ${product.condition}`,
          images: product.images?.length ? [product.images[0]] : undefined,
        },
      },
      quantity: 1,
    },
  ],
  shipping_address_collection: {
    allowed_countries: ['ES', 'PT', 'FR', 'IT', 'DE', 'NL', 'BE'],
  },
  success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${siteUrl}/product/${product.id}`,
  metadata: {
    product_id: product.id,
  },
})

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Error en /api/checkout:', err)
    return NextResponse.json(
      { error: err.message || 'Error interno' },
      { status: 500 }
    )
  }
}