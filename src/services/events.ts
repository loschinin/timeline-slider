import { Event } from '@/mocks/events';

export interface EventsResponse {
  events: Event[];
  startYear: number;
  endYear: number;
  totalPages: number;
  categoryId?: number;
}

export const fetchEvents = async (
  page: number,
  limit: number,
): Promise<EventsResponse> => {
  const res = await fetch(`/api/events?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
};
