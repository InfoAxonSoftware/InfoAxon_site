import { Link } from 'react-router-dom';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

export default function ManageSolutions() {
  const { solutions, deleteSolution } = useData();

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteSolution(id);
      toast.success(`"${title}" deleted successfully`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Solutions</h1>
          <p className="text-dark-400 mt-1">Create, edit, and manage your service offerings.</p>
        </div>
        <Link to="/admin/solutions/new" className="admin-btn-primary flex items-center gap-2">
          <HiPlus size={18} />
          Add Solution
        </Link>
      </div>

      {/* Solutions List */}
      <div className="space-y-4">
        {solutions.map((solution) => (
          <div
            key={solution.id}
            className="admin-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solution.color || 'from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                {(solution.shortTitle || solution.title).charAt(0)}
              </div>
              <div>
                <h3 className="text-white font-medium">{solution.title}</h3>
                <p className="text-dark-500 text-sm mt-0.5">
                  {solution.features?.length || 0} features • ID: {solution.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:flex-shrink-0">
              <Link
                to={`/admin/solutions/edit/${solution.id}`}
                className="admin-btn-secondary flex items-center gap-2 text-sm px-4 py-2"
              >
                <HiPencil size={16} />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(solution.id, solution.title)}
                className="admin-btn-danger flex items-center gap-2 text-sm px-4 py-2"
              >
                <HiTrash size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}

        {solutions.length === 0 && (
          <div className="admin-card text-center py-12">
            <p className="text-dark-400 mb-4">No solutions found. Create your first one!</p>
            <Link to="/admin/solutions/new" className="admin-btn-primary inline-flex items-center gap-2">
              <HiPlus size={18} />
              Add Solution
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
