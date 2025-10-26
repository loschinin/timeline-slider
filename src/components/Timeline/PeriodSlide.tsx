import { useEffect } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useEventsContext } from '@/contexts/EventsContext';
import EventList from './EventList';

interface PeriodSlideProps {
  page: number;
  limit: number;
  isActive: boolean;
}

const PeriodSlide = ({ page, limit, isActive }: PeriodSlideProps) => {
  const { data, isLoading, error } = useEvents(page, limit, isActive);
  const { setEventsData } = useEventsContext();

  useEffect(() => {
    if (data) {
      setEventsData(page, data);
    }
  }, [data, page, setEventsData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <EventList events={data?.events || []} />;
};

export default PeriodSlide;
