import { supabase } from '@/config/supabaseClient'

export type Product = {
  id: string
  title: string
  description: string | null
  price: number
  size: string
  brand: string
  category: string
  condition: string
  condition_notes: string | null
  images: string[]
  status: 'available' | 'reserved' | 'sold'
  created_at: string
}

export async function getAvailableProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error cargando productos:', error.message)
    return []
  }

  return (data as Product[]) || []
}

export async function getProductById(id: string): Promise<Product | null> {
  // Validación rápida de formato UUID antes de ir a Supabase
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  if (!uuidRegex.test(id)) {
    return null
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error cargando producto:', error.message)
    return null
  }

  return data as Product
}
export function getUniqueValues(products: Product[], key: keyof Product): string[] {
  const values = products
    .map((p) => p[key])
    .filter((v): v is string => typeof v === 'string' && v.length > 0)

  return Array.from(new Set(values)).sort()
}