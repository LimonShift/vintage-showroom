import { supabase } from '@/config/supabaseClient'
import type { Product } from '@/modules/catalog/productService'

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error cargando productos:', error.message)
    return []
  }

  return (data as Product[]) || []
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteProduct(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) return { success: false, error: error.message }
  return { success: true }
}