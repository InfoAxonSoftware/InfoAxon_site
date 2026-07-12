import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { HardwareCartProvider } from './context/HardwareCartContext'
import { CatalogProvider } from './context/CatalogContext'
import ScrollToTop from './components/ScrollToTop'

// Public pages
const Home=lazy(()=>import('./pages/Home')),About=lazy(()=>import('./pages/About')),Solutions=lazy(()=>import('./pages/Solutions')),SolutionDetail=lazy(()=>import('./pages/SolutionDetail')),Projects=lazy(()=>import('./pages/Projects')),ProjectDetail=lazy(()=>import('./pages/ProjectDetail')),Contact=lazy(()=>import('./pages/Contact')),Pricing=lazy(()=>import('./pages/Pricing')),PricingDetail=lazy(()=>import('./pages/PricingDetail')),HardwareCheckout=lazy(()=>import('./pages/HardwareCheckout')),HardwareCart=lazy(()=>import('./pages/HardwareCart')),BuildYourPos=lazy(()=>import('./pages/BuildYourPos')),SeoLandingPage=lazy(()=>import('./pages/SeoLandingPage')),ProductDetail=lazy(()=>import('./pages/ProductDetail')),NotFound=lazy(()=>import('./pages/NotFound'));

// Admin pages
const AdminLogin=lazy(()=>import('./admin/AdminLogin')),AdminLayout=lazy(()=>import('./admin/AdminLayout')),AdminDashboard=lazy(()=>import('./admin/AdminDashboard')),ManageSolutions=lazy(()=>import('./admin/ManageSolutions')),ManageProjects=lazy(()=>import('./admin/ManageProjects')),SolutionForm=lazy(()=>import('./admin/SolutionForm')),ProjectForm=lazy(()=>import('./admin/ProjectForm')),ManageCompany=lazy(()=>import('./admin/ManageCompany')),AdminResource=lazy(()=>import('./admin/AdminResource')),AdminSettings=lazy(()=>import('./admin/AdminSettings')),ManageHardwareProducts=lazy(()=>import('./admin/ManageHardwareProducts')),HardwareProductForm=lazy(()=>import('./admin/HardwareProductForm')),ManageInquiries=lazy(()=>import('./admin/ManageInquiries')),ManageQuotations=lazy(()=>import('./admin/ManageQuotations')),InquiryDetail=lazy(()=>import('./admin/InquiryDetail')),QuotationDetail=lazy(()=>import('./admin/QuotationDetail')),ManageAdvertisements=lazy(()=>import('./admin/ManageAdvertisements')),AdvertisementForm=lazy(()=>import('./admin/AdvertisementForm')),ManageSEO=lazy(()=>import('./admin/ManageSEO'));

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
        <Suspense fallback={<div className="grid min-h-screen place-items-center text-dark-500">Loading...</div>}><Routes>
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
            {['pos-system-sri-lanka','erp-software-sri-lanka','mobile-app-development-sri-lanka','software-development-company-sri-lanka','web-development-sri-lanka','custom-software-development-sri-lanka','pos-hardware-sri-lanka'].map(slug=><Route key={slug} path={'/'+slug} element={<SeoLandingPage slug={slug}/>} />)}
            <Route path="/pos-hardware/:slug" element={<ProductDetail />} />
            <Route path="/pos-hardware" element={<Navigate to="/build-your-pos?type=hardware" replace />} />
            <Route path="/pos-hardware/builder" element={<Navigate to="/build-your-pos?type=complete" replace />} />
            <Route path="/pos-setup-builder" element={<Navigate to="/build-your-pos?type=complete" replace />} />
            <Route path="/pos-hardware/cart" element={<HardwareCart />} />
            <Route path="/pos-hardware/checkout" element={<HardwareCheckout />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="solutions" element={<ManageSolutions />} />
            <Route path="solutions/new" element={<SolutionForm />} />
            <Route path="solutions/edit/:id" element={<SolutionForm />} />
            <Route path="advertisements" element={<ManageAdvertisements />} />
            <Route path="advertisements/new" element={<AdvertisementForm />} />
            <Route path="advertisements/edit/:id" element={<AdvertisementForm />} />
            <Route path="seo" element={<ManageSEO />} />
            <Route path="hardware" element={<ManageHardwareProducts />} />
            <Route path="hardware/new" element={<HardwareProductForm />} />
            <Route path="hardware/edit/:id" element={<HardwareProductForm />} />
            <Route path="inquiries" element={<ManageInquiries />} />
            <Route path="inquiries/:id" element={<InquiryDetail />} />
            <Route path="quotations" element={<ManageQuotations />} />
            <Route path="quotations/:id" element={<QuotationDetail />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />
            <Route path="company" element={<ManageCompany />} />
            <Route path="manage/:resource" element={<AdminResource />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes></Suspense>
          </HardwareCartProvider>
          </CatalogProvider>
        </DataProvider>
    </AuthProvider>
  </ThemeProvider>
  )
}
