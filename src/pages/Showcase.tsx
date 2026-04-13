import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import PageWrapper from '../components/layout/PageWrapper';
import { useAdminData } from '../hooks/useAdminData';

const Showcase = () => {
  const { projects, addProject } = useAdminData();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addProject({
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      category: formData.get('category') as string,
      imageUrl: formData.get('imageUrl') as string || 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    });
    toast.success('Project submitted successfully!');
    setShowForm(false);
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <h1 className="text-5xl md:text-6xl font-outfit font-black tracking-tighter text-gray-900 mb-6">Showcase</h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
              Explore the amazing creative work done by our club members.
            </p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all font-bold hover-float shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Submit Project
          </button>
        </div>

        {showForm && (
          <div className="base-card p-8 mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-outfit font-bold mb-8 tracking-tight text-gray-900">Submit Your Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Project Title</label>
                <input required name="title" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Author Name</label>
                <input required name="author" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Category</label>
                <select required name="category" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all">
                  <option>Short Film</option>
                  <option>Photography</option>
                  <option>UI/UX</option>
                  <option>Podcast</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Image URL (optional)</label>
                <input name="imageUrl" type="url" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all" placeholder="https://..." />
              </div>
              <div className="pt-6 flex gap-3">
                <button type="submit" className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 font-bold shadow-sm transition-all">Submit</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 font-bold shadow-sm transition-all">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group base-card overflow-hidden hover-float">
              <div className="relative h-72 overflow-hidden border-b border-gray-100">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3 w-fit tracking-wide">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-outfit font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-gray-300 font-medium text-sm">by {project.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Showcase;
