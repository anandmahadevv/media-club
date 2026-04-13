import { useState } from 'react';
import { NavLink } from 'react-router';
import { Camera, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Showcase', path: '/showcase' },
    { name: 'Members', path: '/members' },
    { name: 'Ideas', path: '/ideas' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <NavLink to="/" className="flex items-center gap-2 font-outfit font-black text-2xl tracking-tighter text-gray-900">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Camera className="w-6 h-6 text-red-600" />
              </div>
              <span>Media<span className="text-red-600">Club</span></span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-semibold ${
                    isActive
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
