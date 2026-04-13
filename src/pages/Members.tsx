import { Mail, Globe } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import { useAdminData } from '../hooks/useAdminData';

const Members = () => {
  const { members } = useAdminData();

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-outfit font-black tracking-tighter text-gray-900 mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            The creative minds driving the NIAT Media Club forward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div key={member.id} className="base-card overflow-hidden hover-float group">
              <div className="h-72 overflow-hidden border-b border-gray-100">
                <img 
                  src={member.imageUrl} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-outfit font-bold text-gray-900 mb-2 tracking-tight">{member.name}</h3>
                <p className="text-red-600 font-semibold mb-6">{member.role}</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Members;
