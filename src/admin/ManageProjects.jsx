import { Link } from 'react-router-dom';
import { HiPlus, HiPencil, HiTrash, HiStar } from 'react-icons/hi';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

export default function ManageProjects() {
  const { projects, deleteProject } = useData();

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
      toast.success(`"${title}" deleted successfully`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
          <p className="text-dark-400 mt-1">Create, edit, and manage case studies and portfolio items.</p>
        </div>
        <Link to="/admin/projects/new" className="admin-btn-primary flex items-center gap-2">
          <HiPlus size={18} />
          Add Project
        </Link>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="admin-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white font-bold flex-shrink-0">
                {project.title.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium flex items-center gap-1">
                      <HiStar size={12} />
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-dark-500 text-sm mt-0.5">
                  {project.category} • {project.client}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:flex-shrink-0">
              <Link
                to={`/admin/projects/edit/${project.id}`}
                className="admin-btn-secondary flex items-center gap-2 text-sm px-4 py-2"
              >
                <HiPencil size={16} />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(project.id, project.title)}
                className="admin-btn-danger flex items-center gap-2 text-sm px-4 py-2"
              >
                <HiTrash size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="admin-card text-center py-12">
            <p className="text-dark-400 mb-4">No projects found. Create your first one!</p>
            <Link to="/admin/projects/new" className="admin-btn-primary inline-flex items-center gap-2">
              <HiPlus size={18} />
              Add Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
