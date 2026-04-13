import { useEffect, type ReactNode } from 'react';
import { useNavigate, NavLink } from 'react-router';
import { LayoutDashboard, LogOut, Camera } from 'lucide-react';
import { toast } from 'sonner';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = window.localStorage.getItem('admin_auth');
    if (auth !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem('admin_auth');
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 md:min-h-screen p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <Camera className="w-6 h-6 text-red-600" />
          </div>
          <span className="font-outfit font-black text-2xl tracking-tighter text-gray-900">
            Admin<span className="text-red-600">Panel</span>
          </span>
        </div>
        
        <nav className="flex-grow space-y-2">
          <NavLink to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-bold transition-all">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-gray-100 space-y-2">
          <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Camera className="w-5 h-5" />
            View Public Site
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow p-6 md:p-12 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
