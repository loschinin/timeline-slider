import { createContext, useContext, useState } from 'react';
import { EventsResponse } from '@/services/events';

interface EventsContextType {
  eventsData: Record<number, EventsResponse>;
  setEventsData: (page: number, data: EventsResponse) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [eventsData, setEventsDataState] = useState<Record<number, EventsResponse>>({});

  const setEventsData = (page: number, data: EventsResponse) => {
    setEventsDataState(prevData => ({ ...prevData, [page]: data }));
  };

  return (
    <EventsContext.Provider value={{ eventsData, setEventsData }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEventsContext must be used within an EventsProvider');
  }
  return context;
};
