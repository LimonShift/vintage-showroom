'use client'

import { useState, useMemo } from 'react'
import ProductGrid from './ProductGrid'
import ProductFilters from './ProductFilters'
import type { Product } from './productService'
import { getUniqueValues } from './productService'

export default function CatalogClient({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    brand: '',
    search: '',
  })

  const categories = useMemo(() => getUniqueValues(products, 'category'), [products])
  const sizes = useMemo(() => getUniqueValues(products, 'size'), [products])
  const brands = useMemo(() => getUniqueValues(products, 'brand'), [products])

  const filtered = useMemo(() => {
    const search = filters.search.toLowerCase().trim()

    return products.filter((p) => {
      if (filters.category && p.category !== filters.category) return false
      if (filters.size && p.size !== filters.size) return false
      if (filters.brand && p.brand !== filters.brand) return false

      if (search) {
        const haystack = `${p.title} ${p.brand}`.toLowerCase()
        if (!haystack.includes(search)) return false
      }

      return true
    })
  }, [products, filters])

  const clearFilters = () =>
    setFilters({ category: '', size: '', brand: '', search: '' })

  return (
    <>
      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        sizes={sizes}
        brands={brands}
        onClear={clearFilters}
      />

      <p className="text-sm text-gray-500 mb-4">
        {filtered.length} {filtered.length === 1 ? 'prenda' : 'prendas'}
      </p>

      <ProductGrid products={filtered} />
    </>
  )
}