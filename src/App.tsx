import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Showcase from './pages/Showcase';
import Members from './pages/Members';
import Ideas from './pages/Ideas';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './pages/admin/AdminLayout';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {!location.pathname.startsWith('/admin') && <Navbar />}
      
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/members" element={<Members />} />
            <Route path="/ideas" element={<Ideas />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {!location.pathname.startsWith('/admin') && <Footer />}
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
