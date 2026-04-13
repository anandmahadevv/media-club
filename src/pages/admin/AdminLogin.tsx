import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera, Lock } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'media2026') {
      window.localStorage.setItem('admin_auth', 'true');
      toast.success('Logged in successfully');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-10 bg-white border border-gray-100 shadow-xl rounded-2xl">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
            <Camera className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <h2 className="text-3xl font-outfit font-black text-center text-gray-900 mb-2 tracking-tight">Admin Portal</h2>
        <p className="text-center text-gray-500 mb-8 font-medium">Enter the portal password to continue</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all font-medium text-gray-900"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-sm hover-float"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-sm font-bold text-red-600 hover:text-red-700">← Back to public site</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
