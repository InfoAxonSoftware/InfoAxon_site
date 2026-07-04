import { NavLink, Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import {
  HiHome,
  HiLightningBolt,
  HiBriefcase,
  HiOfficeBuilding,
  HiLogout,
  HiMenuAlt2,
  HiX,
  HiExternalLink,
} from 'react-icons/hi';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const sidebarLinks = [
  { path: '/admin', label: 'Dashboard', icon: HiHome, end: true },
  { path: '/admin/solutions', label: 'Solutions', icon: HiLightningBolt },
  { path: '/admin/projects', label: 'Projects', icon: HiBriefcase },
  { path: '/admin/company', label: 'Company Info', icon: HiOfficeBuilding },
];

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-900 border-r border-dark-800 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-dark-800">
            <div className="flex items-center justify-between">
              <Link to="/admin" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center font-bold text-white">
                  IA
                </div>
                <div>
                  <div className="text-white font-bold">InfoAxon</div>
                  <div className="text-dark-500 text-xs">Admin Panel</div>
                </div>
              </Link>
              <button
                className="lg:hidden text-dark-400 hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <HiX size={24} />
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                      : 'text-dark-400 hover:bg-dark-800 hover:text-white'
                  }`
                }
              >
                <link.icon size={20} />
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-dark-800 space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-dark-400 hover:bg-dark-800 hover:text-white transition-colors"
            >
              <HiExternalLink size={20} />
              View Website
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full"
            >
              <HiLogout size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-dark-900/80 backdrop-blur-xl border-b border-dark-800 px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden text-dark-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenuAlt2 size={24} />
          </button>
          <h1 className="text-white font-semibold">Admin Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
