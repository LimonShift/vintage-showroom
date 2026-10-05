import { supabase } from '@/config/supabaseClient'

export async function uploadProductImage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('clothing-images')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Error al subir la imagen:', uploadError.message)
      return null
    }

    const { data } = supabase.storage
      .from('clothing-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  } catch (error) {
    console.error('Error inesperado en uploadService:', error)
    return null
  }
}