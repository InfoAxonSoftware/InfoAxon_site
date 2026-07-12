import { useCallback, useEffect, useState } from 'react';
import { HiFilter } from 'react-icons/hi';
import { api, messageOf } from '../../lib/api';
import ProductCard from './ProductCard';

const initial = { search: '', category: '', minPrice: '', maxPrice: '', stock: '', featured: '', sort: 'newest', page: 1, limit: 12 };

export default function HardwareCatalogue() {
  const [filters, setFilters] = useState(initial), [open, setOpen] = useState(false), [products, setProducts] = useState([]), [categories, setCategories] = useState([]), [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 }), [loading, setLoading] = useState(true), [error, setError] = useState('');
  const load = useCallback(() => { setLoading(true); setError(''); api.get('/products', { params: filters }).then(({ data }) => { setProducts(data.items.map(p => ({ ...p, category: p.category.name, spec: p.shortDescription, imageUrl: p.imageUrl || '/favicon.svg', price: Number(p.price), inStock: p.stockStatus !== 'OUT_OF_STOCK' && (p.stockQuantity > 0 || p.stockStatus === 'TO_ORDER'), stockStatus: p.stockStatus.replaceAll('_', ' ').toLowerCase(), compatibilityType: p.compatibilityType || p.category.slug }))); setPagination(data.pagination); }).catch(e => setError(messageOf(e))).finally(() => setLoading(false)); }, [filters]);
  useEffect(load, [load]);
  useEffect(() => { api.get('/categories').then(({ data }) => setCategories(data)).catch(() => setCategories([])); }, []);
  const update = (key, value) => setFilters(f => ({ ...f, [key]: value, page: 1 }));
  const input = 'rounded-lg border border-dark-200 bg-transparent px-3 py-2.5 dark:border-dark-700';
  return <div>
    <button type="button" onClick={() => setOpen(v => !v)} className="mb-4 flex w-full items-center justify-between rounded-xl border border-dark-200 bg-white p-4 font-semibold dark:border-dark-700 dark:bg-dark-900 md:hidden"><span className="flex items-center gap-2"><HiFilter /> Filters</span><span>{open ? '−' : '+'}</span></button>
    <div className={`${open ? 'grid' : 'hidden'} mb-6 gap-3 rounded-2xl border border-dark-200 bg-white p-4 dark:border-dark-700 dark:bg-dark-900 md:grid md:grid-cols-4 lg:grid-cols-5`}>
      <input aria-label="Search products" placeholder="Search products" value={filters.search} onChange={e => update('search', e.target.value)} className={input} />
      <select aria-label="Category" value={filters.category} onChange={e => update('category', e.target.value)} className={input}><option value="">All categories</option>{categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}</select>
      <input type="number" min="0" placeholder="Minimum price" value={filters.minPrice} onChange={e => update('minPrice', e.target.value)} className={input} />
      <input type="number" min="0" placeholder="Maximum price" value={filters.maxPrice} onChange={e => update('maxPrice', e.target.value)} className={input} />
      <select value={filters.stock} onChange={e => update('stock', e.target.value)} className={input}><option value="">Any stock</option><option value="in">In stock</option><option value="out">Out of stock</option></select>
      <select value={filters.featured} onChange={e => update('featured', e.target.value)} className={input}><option value="">All products</option><option value="true">Featured</option></select>
      <select value={filters.sort} onChange={e => update('sort', e.target.value)} className={input}><option value="newest">Newest</option><option value="price-asc">Price low to high</option><option value="price-desc">Price high to low</option></select>
      <button type="button" onClick={() => setFilters(initial)} className="rounded-lg border border-primary-500 px-4 py-2.5 font-semibold text-primary-600 dark:text-primary-400">Clear Filters</button>
    </div>
    <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-bold dark:text-white">Hardware catalogue</h3><span className="text-sm text-dark-500">{pagination.total} results</span></div>
    {error ? <div className="rounded-xl border border-red-300 p-6 text-center text-red-600">{error}<button type="button" onClick={load} className="ml-3 underline">Retry</button></div> : loading ? <div className="py-16 text-center text-dark-500">Loading hardware…</div> : products.length ? <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map(p => <ProductCard key={p.id} product={p} />)}</div> : <div className="py-16 text-center text-dark-500">No products match these filters.</div>}
    {pagination.pages > 1 && <div className="mt-8 flex justify-center gap-3"><button disabled={pagination.page <= 1} onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))} className="btn-secondary disabled:opacity-40">Previous</button><span className="px-3 py-2">Page {pagination.page} of {pagination.pages}</span><button disabled={pagination.page >= pagination.pages} onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))} className="btn-secondary disabled:opacity-40">Next</button></div>}
  </div>;
}
