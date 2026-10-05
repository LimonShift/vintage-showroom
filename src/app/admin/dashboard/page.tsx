'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/config/supabaseClient'
import AddProductForm from '@/modules/admin/AddProductForm'

export default function AdminDashboardPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
      <p className="text-gray-600">Sesión iniciada correctamente. Próximo paso: Formulario de ropa.</p>
    <AddProductForm />    
    </div>
    
  )
}