import { Link } from 'react-router-dom';
import { HiLightningBolt, HiBriefcase, HiOfficeBuilding, HiPlus, HiRefresh } from 'react-icons/hi';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { solutions, projects, companyInfo, resetToDefaults } = useData();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      resetToDefaults();
      toast.success('Data reset to defaults');
    }
  };

  const cards = [
    {
      title: 'Solutions',
      count: solutions.length,
      icon: HiLightningBolt,
      path: '/admin/solutions',
      color: 'from-blue-500 to-cyan-500',
      description: 'Manage your service offerings',
    },
    {
      title: 'Projects',
      count: projects.length,
      icon: HiBriefcase,
      path: '/admin/projects',
      color: 'from-purple-500 to-pink-500',
      description: 'Manage case studies & portfolio',
    },
    {
      title: 'Company Info',
      count: null,
      icon: HiOfficeBuilding,
      path: '/admin/company',
      color: 'from-green-500 to-emerald-500',
      description: 'Update company details & stats',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, Admin</h1>
          <p className="text-dark-400 mt-1">Manage your InfoAxon website content from here.</p>
        </div>
        <button onClick={handleReset} className="admin-btn-secondary flex items-center gap-2">
          <HiRefresh size={18} />
          Reset to Defaults
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.path}
            className="admin-card hover:border-dark-600 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <card.icon className="text-white" size={24} />
              </div>
              {card.count !== null && (
                <span className="text-3xl font-bold text-white">{card.count}</span>
              )}
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">{card.title}</h3>
            <p className="text-dark-400 text-sm">{card.description}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/solutions/new"
            className="admin-card flex items-center gap-4 hover:border-primary-500/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <HiPlus className="text-primary-400" size={20} />
            </div>
            <div>
              <div className="text-white font-medium">Add Solution</div>
              <div className="text-dark-500 text-sm">Create a new service</div>
            </div>
          </Link>

          <Link
            to="/admin/projects/new"
            className="admin-card flex items-center gap-4 hover:border-primary-500/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <HiPlus className="text-primary-400" size={20} />
            </div>
            <div>
              <div className="text-white font-medium">Add Project</div>
              <div className="text-dark-500 text-sm">Create a new case study</div>
            </div>
          </Link>

          <Link
            to="/admin/company"
            className="admin-card flex items-center gap-4 hover:border-primary-500/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <HiOfficeBuilding className="text-primary-400" size={20} />
            </div>
            <div>
              <div className="text-white font-medium">Edit Company</div>
              <div className="text-dark-500 text-sm">Update company details</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Items */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Solutions */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Solutions</h2>
            <Link to="/admin/solutions" className="text-primary-400 text-sm hover:text-primary-300">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {solutions.slice(0, 4).map((s) => (
              <div key={s.id} className="admin-card py-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium text-sm">{s.title}</div>
                  <div className="text-dark-500 text-xs mt-1">{s.features?.length || 0} features</div>
                </div>
                <Link
                  to={`/admin/solutions/edit/${s.id}`}
                  className="text-primary-400 text-sm hover:text-primary-300"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Projects</h2>
            <Link to="/admin/projects" className="text-primary-400 text-sm hover:text-primary-300">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="admin-card py-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium text-sm">{p.title}</div>
                  <div className="text-dark-500 text-xs mt-1">{p.category} • {p.client}</div>
                </div>
                <Link
                  to={`/admin/projects/edit/${p.id}`}
                  className="text-primary-400 text-sm hover:text-primary-300"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
