import { useEvents } from '@/hooks/useEvents';
import { useFlipbookAnimation } from '@/hooks/useFlipbookAnimation';
import { useState } from 'react';
import CirclePagination from './CirclePagination/CirclePagination';
import CustomSwiper from './CustomSwiper/CustomSwiper'; // Import the new CustomSwiper component
import styles from './Timeline.module.scss';
import PeriodNavigation from './PeriodNavigation/PeriodNavigation';
import BulletPagination from './BulletPagination/BulletPagination';
import { EventsResponse } from '@/services/events';

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

  const startYear = useFlipbookAnimation(currentData?.startYear);
  const endYear = useFlipbookAnimation(currentData?.endYear);

  const handlePeriodSelect = (periodNum: number) => {
    setPage(periodNum);
  };

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
      <div className={styles.yearsContainer}>
        <h2 className={styles.startYear}>{startYear}</h2>
        <h2 className={styles.endYear}>{endYear}</h2>
      </div>
      {initialData && (
        <CirclePagination
          totalPages={initialData.totalPages}
          currentPage={page}
          onPeriodSelect={handlePeriodSelect}
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
