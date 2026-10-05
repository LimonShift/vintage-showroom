'use client'

type Filters = {
  category: string
  size: string
  brand: string
  search: string
}

type Props = {
  filters: Filters
  setFilters: (f: Filters) => void
  categories: string[]
  sizes: string[]
  brands: string[]
  onClear: () => void
}

export default function ProductFilters({
  filters,
  setFilters,
  categories,
  sizes,
  brands,
  onClear,
}: Props) {
  const update = (key: keyof Filters, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  const hasFilters =
    filters.category || filters.size || filters.brand || filters.search

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-3 mb-6">
      {/* Buscador */}
      <input
        type="text"
        value={filters.search}
        onChange={(e) => update('search', e.target.value)}
        placeholder="Buscar por título o marca..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* Filtros */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <select
          value={filters.category}
          onChange={(e) => update('category', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={filters.size}
          onChange={(e) => update('size', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white"
        >
          <option value="">Todas las tallas</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={filters.brand}
          onChange={(e) => update('brand', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white"
        >
          <option value="">Todas las marcas</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Limpiar */}
      {hasFilters && (
        <button
          onClick={onClear}
          className="text-xs text-gray-500 hover:text-black underline"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}