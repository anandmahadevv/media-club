import { Link } from 'react-router';
import { Camera, Video, Image as ImageIcon, ArrowRight, Play } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';

const Home = () => {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative overflow-hidden flex-grow flex flex-col justify-center py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-bold tracking-wide mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              2025-26 Session Active
            </div>
            
            <h1 className="text-6xl md:text-8xl font-outfit font-black tracking-tighter text-gray-900 mb-8 leading-tight">
              Unleash your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-red-800 to-red-600 relative inline-block">
                creativity.
              </span>
            </h1>
            
            <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the ultimate community of visual storytellers, filmmakers, designers, and creators at NIAT. Turn your imagination into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/events" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all font-bold hover-float shadow-sm"
              >
                View Events
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/showcase" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all font-bold hover-float shadow-sm"
              >
                Our Portfolio
                <Play className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Camera, title: 'Photography', desc: 'Master the art of capturing the perfect moment.' },
              { icon: Video, title: 'Filmmaking', desc: 'Tell compelling stories through motion pictures.' },
              { icon: ImageIcon, title: 'Design', desc: 'Create stunning visual graphics and UI/UX.' },
            ].map((feature, idx) => (
              <div key={idx} className="base-card p-10 hover-float">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 mb-8">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-gray-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
