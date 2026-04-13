import { useState, useEffect, useCallback } from 'react';

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
};

export type IdeaItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  equipment: string;
  status: 'pending' | 'approved';
};

export type MemberItem = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
};

// Initial dummy data
const initialEvents: EventItem[] = [
  { id: '1', title: 'Intro to Premiere Pro', date: '2025-08-15', time: '16:00', location: 'Lab 3', description: 'Learn the basics of video editing.' },
  { id: '2', title: 'Campus Photography Walk', date: '2025-08-20', time: '17:00', location: 'Main Gate', description: 'A guided photowalk around the campus.' }
];

const initialProjects: ProjectItem[] = [
  { id: '1', title: 'Cinematic Campus', author: 'Alex Reed', category: 'Short Film', imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800' },
  { id: '2', title: 'Neon Nights UI', author: 'Sarah Jenkins', category: 'UI/UX', imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' }
];

const initialMembers: MemberItem[] = [
  { id: '1', name: 'John Doe', role: 'President & Lead Video Editor', imageUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Jane Smith', role: 'Lead Photographer', imageUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Emily Chen', role: 'UI/UX Designer', imageUrl: 'https://i.pravatar.cc/150?u=3' },
];

const getStoredData = <T>(key: string, initialData: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialData;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return initialData;
  }
};

export function useAdminData() {
  const [events, setEvents] = useState<EventItem[]>(() => getStoredData('media_events', initialEvents));
  const [projects, setProjects] = useState<ProjectItem[]>(() => getStoredData('media_projects', initialProjects));
  const [ideas, setIdeas] = useState<IdeaItem[]>(() => getStoredData('media_ideas', []));
  const [members] = useState<MemberItem[]>(() => getStoredData('media_members', initialMembers));

  // Sync to local storage
  useEffect(() => { window.localStorage.setItem('media_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { window.localStorage.setItem('media_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { window.localStorage.setItem('media_ideas', JSON.stringify(ideas)); }, [ideas]);
  useEffect(() => { window.localStorage.setItem('media_members', JSON.stringify(members)); }, [members]);

  // Operations
  const addIdea = useCallback((idea: Omit<IdeaItem, 'id' | 'status'>) => {
    const newIdea: IdeaItem = { ...idea, id: Date.now().toString(), status: 'pending' };
    setIdeas(prev => [...prev, newIdea]);
  }, []);

  const approveIdea = useCallback((id: string) => {
    setIdeas(prev => prev.map(idea => idea.id === id ? { ...idea, status: 'approved' } : idea));
  }, []);

  const deleteIdea = useCallback((id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  }, []);

  const addProject = useCallback((project: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = { ...project, id: Date.now().toString() };
    setProjects(prev => [...prev, newProject]);
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);

  const addEvent = useCallback((event: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = { ...event, id: Date.now().toString() };
    setEvents(prev => [...prev, newEvent]);
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  return {
    events, projects, ideas, members,
    addIdea, approveIdea, deleteIdea,
    addProject, deleteProject,
    addEvent, deleteEvent
  };
}
