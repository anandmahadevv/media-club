import { useState } from 'react';
import { useAdminData } from '../../hooks/useAdminData';
import { Calendar, Lightbulb, Image as ImageIcon, Trash2, CheckCircle, Users } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { events, projects, ideas, members, approveIdea, deleteIdea, deleteProject, deleteEvent } = useAdminData();
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'ideas' | 'projects'>('overview');

  const pendingIdeasCount = ideas.filter(i => i.status === 'pending').length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-outfit font-black tracking-tighter text-gray-900 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-500 font-medium">Manage your media club content and members.</p>
      </div>

      <div className="flex space-x-2 p-1.5 bg-gray-200/50 rounded-xl mb-10 overflow-x-auto">
        {['overview', 'events', 'ideas', 'projects'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
            {tab === 'ideas' && pendingIdeasCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-xs">
                {pendingIdeasCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="base-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-outfit font-black text-gray-900 mb-1">{events.length}</h3>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Events</p>
            </div>
          </div>
          <div className="base-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                <Lightbulb className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-outfit font-black text-gray-900 mb-1">{ideas.length}</h3>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Submitted Ideas</p>
            </div>
          </div>
          <div className="base-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                <ImageIcon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-outfit font-black text-gray-900 mb-1">{projects.length}</h3>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Showcase Projects</p>
            </div>
          </div>
          <div className="base-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-outfit font-black text-gray-900 mb-1">{members.length}</h3>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Club Members</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="base-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-5">Event Title</th>
                <th className="p-5">Date & Time</th>
                <th className="p-5">Location</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 font-bold text-gray-900">{event.title}</td>
                  <td className="p-5 text-gray-600 font-medium">{event.date} at {event.time}</td>
                  <td className="p-5 text-gray-600 font-medium">{event.location}</td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => { deleteEvent(event.id); toast.success('Event deleted'); }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-500 font-medium">No events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'ideas' && (
        <div className="base-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-5">Submitted By</th>
                <th className="p-5">Idea / Category</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => (
                <tr key={idea.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 font-bold text-gray-900">{idea.name}</td>
                  <td className="p-5">
                    <div className="text-sm font-bold text-gray-900 mb-1">{idea.category}</div>
                    <div className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{idea.description}</div>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                      idea.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {idea.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {idea.status === 'pending' && (
                        <button 
                          onClick={() => { approveIdea(idea.id); toast.success('Idea approved'); }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve Idea"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      <button 
                        onClick={() => { deleteIdea(idea.id); toast.success('Idea deleted'); }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Idea"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {ideas.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-500 font-medium">No ideas submitted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="base-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-5">Project Title</th>
                <th className="p-5">Author</th>
                <th className="p-5">Category</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 font-bold text-gray-900 flex items-center gap-4">
                    <img src={project.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    {project.title}
                  </td>
                  <td className="p-5 text-gray-600 font-medium">{project.author}</td>
                  <td className="p-5">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 font-bold text-xs rounded-full">
                      {project.category}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => { deleteProject(project.id); toast.success('Project deleted'); }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-500 font-medium">No projects in showcase.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
