import { useEvents } from '@/hooks/useEvents';
import { useFlipbookAnimation } from '@/hooks/useFlipbookAnimation';
import { useState } from 'react';
import CirclePagination from './CirclePagination/CirclePagination';
import CustomSwiper from './CustomSwiper/CustomSwiper'; // Import the new CustomSwiper component
import styles from './Timeline.module.scss';
import PeriodNavigation from './PeriodNavigation/PeriodNavigation';
import BulletPagination from './BulletPagination/BulletPagination';
import { EventsResponse } from '@/services/events';
import YearsContainer from './YearsContainer/YearsContainer';

const limit = 6; // Number of years per period

const Timeline = () => {
  const [page, setPage] = useState(1);
  const [eventsData, setEventsData] = useState<Record<number, EventsResponse>>(
    {},
  );
  const handleSetEventsData = (page: number, data: EventsResponse) => {
    setEventsData((prevData) => ({ ...prevData, [page]: data }));
  };

  const { data: initialData } = useEvents(1, limit);
  const currentData = eventsData[page];

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    if (initialData) {
      setPage((prevPage) => Math.min(prevPage + 1, initialData.totalPages));
    }
  };

  return (
    <div className={styles.timelineContainer}>
      <h1 className={styles.title}>Исторические даты</h1>
      <YearsContainer
        currentStartYear={currentData?.startYear}
        currentEndYear={currentData?.endYear}
      />
      {initialData && (
        <CirclePagination
          totalPages={initialData.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
      <hr className={styles.divider} />
      <PeriodNavigation
        page={page}
        totalPages={initialData?.totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        isPrevDisabled={page === 1}
        isNextDisabled={!initialData || page === initialData.totalPages}
      />
      <CustomSwiper
        page={page}
        limit={limit}
        setEventsData={handleSetEventsData}
      />
      <BulletPagination
        totalPages={initialData?.totalPages || 0}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Timeline;
