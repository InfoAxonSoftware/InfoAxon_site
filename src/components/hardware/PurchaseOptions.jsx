import { Link } from 'react-router-dom';
import { purchaseOptions } from '../../data/hardwareData';

export default function PurchaseOptions({ active }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {purchaseOptions.map((option) => (
        <Link
          key={option.id}
          to={option.path}
          className={`rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
            active === option.id
              ? 'border-primary-400 bg-primary-50 ring-2 ring-primary-500/10 dark:border-primary-500/50 dark:bg-primary-500/10'
              : 'border-dark-200/70 bg-white dark:border-dark-700/50 dark:bg-dark-900'
          }`}
        >
          <div className="font-bold text-dark-900 dark:text-white">{option.title}</div>
          <p className="mt-2 text-sm leading-relaxed text-dark-500 dark:text-dark-400">
            {option.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
