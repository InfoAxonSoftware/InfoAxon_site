import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppWidget from './WhatsAppWidget';
import RouteSEO from './RouteSEO';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <RouteSEO />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
