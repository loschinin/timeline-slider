import type { NextApiRequest, NextApiResponse } from 'next';
import { allEvents, IEvent } from '@/mocks/events';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        events: IEvent[];
        startYear: number;
        endYear: number;
        totalPages: number;
        categoryId?: number;
      }
    | { message: string }
  >,
) {
  const pageQuery = req.query.page;
  const limitQuery = req.query.limit;

  const pageNum = typeof pageQuery === 'string' ? parseInt(pageQuery, 10) : 1;
  const limitNum =
    typeof limitQuery === 'string' ? parseInt(limitQuery, 10) : 6;

  const years = allEvents.map((event) => new Date(event.date).getFullYear());
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const totalPages = Math.ceil((maxYear - minYear + 1) / limitNum);

  // Рассчитываем начальный год периода на основе номера страницы и количества лет в периоде.
  const startYear = minYear + (pageNum - 1) * limitNum;
  // Рассчитываем конечный год периода.
  const endYear = startYear + limitNum - 1;

  // Фильтруем события, чтобы получить только те, которые находятся в пределах рассчитанного периода.
  const periodEvents = allEvents.filter((event) => {
    const eventYear = new Date(event.date).getFullYear();
    return eventYear >= startYear && eventYear <= endYear;
  });

  const categoryId =
    periodEvents.length > 0 ? periodEvents[0].categoryId : undefined;

  res
    .status(200)
    .json({ events: periodEvents, startYear, endYear, totalPages, categoryId });
}
