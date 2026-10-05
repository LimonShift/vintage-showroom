import { supabase } from '@/config/supabaseClient'

export type Order = {
  id: string
  stripe_session_id: string
  product_id: string
  customer_email: string
  customer_name: string
  shipping_address: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  }
  amount_total: number
  status: string
  tracking_number: string | null
  carrier: string | null
  shipped_at: string | null
  created_at: string
  products?: {
    title: string
    images: string[]
  }
}

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      products (
        title,
        images
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error cargando pedidos:', error.message)
    return []
  }

  return (data as unknown as Order[]) || []
}

export async function updateOrder(
  id: string,
  updates: Partial<Order>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('orders').update(updates).eq('id', id)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function markAsShipped(
  id: string,
  carrier: string,
  trackingNumber: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('orders')
    .update({
      status: 'shipped',
      carrier,
      tracking_number: trackingNumber,
      shipped_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) return { success: false, error: error.message }
  return { success: true }
}