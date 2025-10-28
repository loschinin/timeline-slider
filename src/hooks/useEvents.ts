import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/services/events';

export const useEvents = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['events', page, limit],
    queryFn: () => fetchEvents(page, limit),
    staleTime: Infinity,
  });
};
