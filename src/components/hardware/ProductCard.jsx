import { useState } from 'react';
import { HiMinus, HiPlus, HiShoppingCart } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { formatLkr } from '../../data/hardwareData';
import { useHardwareCart } from '../../context/HardwareCartContext';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useHardwareCart();

  const handleAdd = () => {
    addItem(product.id, quantity);
    toast.success(`${product.name} added to your hardware cart.`);
  };

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-dark-200/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-300/70 hover:shadow-xl hover:shadow-primary-500/10 dark:border-dark-700/50 dark:bg-dark-900 dark:hover:border-primary-500/40">
      <div className="aspect-[4/3] overflow-hidden bg-dark-100 dark:bg-dark-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            {product.category}
          </span>
          <span
            className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              product.inStock
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
            }`}
          >
            {product.stockStatus}
          </span>
        </div>

        <h2 className="text-lg font-bold leading-snug text-dark-900 dark:text-white">
          {product.name}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-dark-500 dark:text-dark-400">
          {product.spec}
        </p>

        <div className="mt-5 border-t border-dark-100 pt-4 dark:border-dark-800">
          <div className="text-xl font-extrabold gradient-text">
            {formatLkr(product.price)}
          </div>
          <div className="mt-1 text-xs text-dark-400 dark:text-dark-500">
            {product.warranty}
          </div>
        </div>

        <div className="mt-auto flex items-center gap-3 pt-5">
          <div className="flex h-11 items-center rounded-full border border-dark-200 bg-dark-50 dark:border-dark-700 dark:bg-dark-800">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="flex h-11 w-9 items-center justify-center text-dark-500 hover:text-primary-600 dark:text-dark-300"
              aria-label={`Decrease ${product.name} quantity`}
            >
              <HiMinus size={14} />
            </button>
            <span className="w-7 text-center text-sm font-semibold text-dark-900 dark:text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((value) => value + 1)}
              className="flex h-11 w-9 items-center justify-center text-dark-500 hover:text-primary-600 dark:text-dark-300"
              aria-label={`Increase ${product.name} quantity`}
            >
              <HiPlus size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className="btn-primary min-w-0 flex-1 justify-center px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            <HiShoppingCart className="flex-shrink-0" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
}
