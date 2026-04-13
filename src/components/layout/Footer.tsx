import { Camera, Globe, MessageCircle, Tv } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Camera className="w-6 h-6 text-red-600" />
              </div>
              <span className="font-outfit font-black text-2xl tracking-tighter text-gray-900">
                Media<span className="text-red-600">Club</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              Unleashing creativity and telling stories through digital media, photography, and film. Built for the creators of tomorrow.
            </p>
            <div className="flex space-x-5 mt-8">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"><Tv className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold font-outfit text-gray-900 tracking-widest uppercase mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="/events" className="text-gray-500 hover:text-red-600 font-medium transition-colors">Events</a></li>
              <li><a href="/showcase" className="text-gray-500 hover:text-red-600 font-medium transition-colors">Showcase</a></li>
              <li><a href="/members" className="text-gray-500 hover:text-red-600 font-medium transition-colors">Members</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold font-outfit text-gray-900 tracking-widest uppercase mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><a href="/ideas" className="text-gray-500 hover:text-red-600 font-medium transition-colors">Submit Idea</a></li>
              <li><a href="/admin" className="text-gray-500 hover:text-red-600 font-medium transition-colors">Admin Login</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} NIAT Media Club. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-4 md:mt-0 font-medium">
            Designed with <span className="text-red-600">♥</span> in Silicon Valley
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
