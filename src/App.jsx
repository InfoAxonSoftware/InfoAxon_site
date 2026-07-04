import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import ScrollToTop from './components/ScrollToTop'

// Public pages
import Home from './pages/Home'
import About from './pages/About'
import Solutions from './pages/Solutions'
import SolutionDetail from './pages/SolutionDetail'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import PricingDetail from './pages/PricingDetail'

// Admin pages
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import ManageSolutions from './admin/ManageSolutions'
import ManageProjects from './admin/ManageProjects'
import SolutionForm from './admin/SolutionForm'
import ProjectForm from './admin/ProjectForm'
import ManageCompany from './admin/ManageCompany'

// Layouts
import PublicLayout from './components/PublicLayout'

function ThemedToaster() {
  const { isDark } = useTheme();
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: isDark
          ? { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
          : { background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
      }}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <ScrollToTop />
          <ThemedToaster />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:id" element={<SolutionDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/pricing/:id" element={<PricingDetail />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="solutions" element={<ManageSolutions />} />
            <Route path="solutions/new" element={<SolutionForm />} />
            <Route path="solutions/edit/:id" element={<SolutionForm />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />
            <Route path="company" element={<ManageCompany />} />
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  </ThemeProvider>
  )
}
