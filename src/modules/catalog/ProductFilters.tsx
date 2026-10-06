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
    <div className="bg-surface border-2 border-cream/10 p-4 md:p-5 mb-8 space-y-4">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => update('search', e.target.value)}
        placeholder="BUSCAR POR TÍTULO O MARCA..."
        className="w-full px-4 py-3 bg-black border-2 border-cream/10 rounded-none text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold-500 transition-colors font-mono"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <select
          value={filters.category}
          onChange={(e) => update('category', e.target.value)}
          className="px-4 py-2.5 bg-black border-2 border-cream/10 text-sm text-cream focus:outline-none focus:border-gold-500 font-bebas tracking-wider"
        >
          <option value="">TODAS LAS CATEGORÍAS</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={filters.size}
          onChange={(e) => update('size', e.target.value)}
          className="px-4 py-2.5 bg-black border-2 border-cream/10 text-sm text-cream focus:outline-none focus:border-gold-500 font-bebas tracking-wider"
        >
          <option value="">TODAS LAS TALLAS</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={filters.brand}
          onChange={(e) => update('brand', e.target.value)}
          className="px-4 py-2.5 bg-black border-2 border-cream/10 text-sm text-cream focus:outline-none focus:border-gold-500 font-bebas tracking-wider col-span-2 md:col-span-1"
        >
          <option value="">TODAS LAS MARCAS</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <button
          onClick={onClear}
          className="font-mono text-xs text-gold-500 hover:text-gold-400 underline"
        >
          LIMPIAR FILTROS
        </button>
      )}
    </div>
  )
}