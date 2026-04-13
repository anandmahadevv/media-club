import { useState } from 'react';
import { Lightbulb, Send } from 'lucide-react';
import { toast } from 'sonner';
import PageWrapper from '../components/layout/PageWrapper';
import { useAdminData } from '../hooks/useAdminData';

const Ideas = () => {
  const { addIdea, ideas } = useAdminData();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Video',
    description: '',
    equipment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addIdea(formData);
    toast.success('Idea submitted successfully!');
    setFormData({ name: '', category: 'Video', description: '', equipment: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const approvedIdeas = ideas.filter(idea => idea.status === 'approved');

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Form */}
        <div>
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-outfit font-black tracking-tighter text-gray-900 mb-6 inline-flex items-center gap-4">
              <Lightbulb className="w-12 h-12 text-red-600" />
              Idea Board
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Have a brilliant concept for a shoot, event, or campaign? Share it with the club!
            </p>
          </div>

          <div className="base-card p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Your Name</label>
                <input 
                  required 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all" 
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Category</label>
                <select 
                  required 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                >
                  <option value="Video">Video</option>
                  <option value="Photo">Photo</option>
                  <option value="Event">Event</option>
                  <option value="Social Media">Social Media</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Idea Description</label>
                <textarea 
                  required 
                  name="description" 
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-none" 
                  placeholder="Describe your creative vision..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Equipment Needed (Optional)</label>
                <input 
                  name="equipment" 
                  value={formData.equipment}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all" 
                  placeholder="E.g., Sony A7III, Gimbal"
                />
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all font-bold shadow-sm hover-float"
              >
                <Send className="w-5 h-5" />
                Submit Idea
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Approved Ideas */}
        <div>
          <h2 className="text-3xl font-outfit font-bold text-gray-900 mb-8 mt-4 lg:mt-0 tracking-tight">Community Ideas</h2>
          <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2">
            {approvedIdeas.length === 0 ? (
              <div className="base-card p-10 text-center text-gray-500 border-dashed border-2">
                No ideas approved yet. Be the first to submit!
              </div>
            ) : (
              approvedIdeas.map(idea => (
                <div key={idea.id} className="base-card p-8 border-l-4 border-l-red-600">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-outfit font-bold text-gray-900">{idea.name}'s Idea</h3>
                    <span className="text-xs font-bold px-3 py-1 bg-red-50 text-red-600 rounded-full tracking-wide">
                      {idea.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{idea.description}</p>
                  {idea.equipment && (
                    <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <span className="font-bold text-gray-900">Gear:</span> {idea.equipment}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </PageWrapper>
  );
};

export default Ideas;
