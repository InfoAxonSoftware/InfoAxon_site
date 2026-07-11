import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { HardwareCartProvider } from './context/HardwareCartContext'
import { CatalogProvider } from './context/CatalogContext'
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
import PosHardware from './pages/PosHardware'
import PosSetupBuilder from './pages/PosSetupBuilder'
import HardwareCheckout from './pages/HardwareCheckout'
import HardwareCart from './pages/HardwareCart'
import BuildYourPos from './pages/BuildYourPos'

// Admin pages
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import ManageSolutions from './admin/ManageSolutions'
import ManageProjects from './admin/ManageProjects'
import SolutionForm from './admin/SolutionForm'
import ProjectForm from './admin/ProjectForm'
import ManageCompany from './admin/ManageCompany'
import AdminResource from './admin/AdminResource'
import AdminSettings from './admin/AdminSettings'
import ManageHardwareProducts from './admin/ManageHardwareProducts'
import HardwareProductForm from './admin/HardwareProductForm'
import ManageInquiries from './admin/ManageInquiries'
import ManageQuotations from './admin/ManageQuotations'

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
          <CatalogProvider>
          <HardwareCartProvider>
          <ScrollToTop />
          <ThemedToaster />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:id" element={<SolutionDetail />} />
            <Route path="/erp-pos" element={<SolutionDetail solutionId="custom-erp-pos" />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/pricing/:id" element={<PricingDetail />} />
            <Route path="/build-your-pos" element={<BuildYourPos />} />
            <Route path="/pos-hardware" element={<PosHardware />} />
            <Route path="/pos-hardware/builder" element={<PosSetupBuilder />} />
            <Route path="/pos-setup-builder" element={<PosSetupBuilder />} />
            <Route path="/pos-hardware/cart" element={<HardwareCart />} />
            <Route path="/pos-hardware/checkout" element={<HardwareCheckout />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="solutions" element={<ManageSolutions />} />
            <Route path="solutions/new" element={<SolutionForm />} />
            <Route path="solutions/edit/:id" element={<SolutionForm />} />
            <Route path="hardware" element={<ManageHardwareProducts />} />
            <Route path="hardware/new" element={<HardwareProductForm />} />
            <Route path="hardware/edit/:id" element={<HardwareProductForm />} />
            <Route path="inquiries" element={<ManageInquiries />} />
            <Route path="quotations" element={<ManageQuotations />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />
            <Route path="company" element={<ManageCompany />} />
            <Route path="manage/:resource" element={<AdminResource />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
          </HardwareCartProvider>
          </CatalogProvider>
        </DataProvider>
    </AuthProvider>
  </ThemeProvider>
  )
}
