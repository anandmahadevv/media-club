import { Calendar, MapPin, Clock } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import { useAdminData } from '../hooks/useAdminData';

const Events = () => {
  const { events } = useAdminData();

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-outfit font-black tracking-tighter text-gray-900 mb-6">Upcoming Events</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Join our workshops, photo walks, and film screenings to enhance your skills and network with fellow creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500 font-medium">
              No upcoming events at the moment.
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="base-card overflow-hidden hover-float flex flex-col h-full">
                <div className="h-48 bg-red-50 flex items-center justify-center border-b border-gray-100">
                  <Calendar className="w-16 h-16 text-red-200" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-outfit font-bold text-gray-900 mb-3 tracking-tight">{event.title}</h3>
                  <p className="text-gray-500 mb-8 flex-grow leading-relaxed">{event.description}</p>
                  
                  <div className="space-y-3 text-sm font-medium text-gray-600 border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Events;
