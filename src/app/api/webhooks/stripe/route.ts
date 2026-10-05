import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/config/stripe'
import { supabase } from '@/config/supabaseClient'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const productId = session.metadata?.product_id

    try {
      const { error: updateError } = await supabase
        .from('products')
        .update({ status: 'sold', updated_at: new Date().toISOString() })
        .eq('id', productId)
        .eq('status', 'available')

      if (updateError) {
        console.error('Error marcando como vendido:', updateError.message)
      }

      const { error: orderError } = await supabase.from('orders').insert([
        {
          stripe_session_id: session.id,
          product_id: productId,
          customer_email: session.customer_details?.email || 'sin-email',
          customer_name: session.customer_details?.name || 'Sin nombre',
          shipping_address: session.shipping_details?.address || {},
          amount_total: (session.amount_total || 0) / 100,
          status: 'paid',
        },
      ])

      if (orderError) {
        console.error('Error insertando pedido:', orderError.message)
        return NextResponse.json({ error: 'DB error' }, { status: 500 })
      }
    } catch (err) {
      console.error('Error procesando webhook:', err)
      return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}