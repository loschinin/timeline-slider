import { useState } from 'react';
import EventList from './EventList';
import styles from './Timeline.module.scss';
import { useEvents } from '@/hooks/useEvents';
import { useCategories } from '@/hooks/useCategories';

const limit = 6; // Number of years per period

const Timeline = () => {
  const [page, setPage] = useState(1);

  const {
    data: eventsData,
    isLoading: isLoadingEvents,
    error: eventsError,
  } = useEvents(page, limit);
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useCategories();

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePeriodSelect = (periodNum: number) => {
    setPage(periodNum);
  };

  if (isLoadingEvents || isLoadingCategories) return <div>Loading...</div>;
  if (eventsError)
    return <div>Error loading events: {eventsError.message}</div>;
  if (categoriesError)
    return <div>Error loading categories: {categoriesError.message}</div>;

  const categoryName = categories?.find(
    (cat) => cat.id === eventsData?.categoryId,
  )?.name;

  return (
    <div className={styles.timelineContainer}>
      <h1>Исторические даты</h1>
      {eventsData && (
        <div>
          <h2>
            {eventsData.startYear} - {eventsData.endYear}
          </h2>
          {categoryName && <p>{categoryName}</p>}
          <p>
            {' '}
            {page} / {eventsData.totalPages}
          </p>
        </div>
      )}
      <div className={styles.periodButtons}>
        {eventsData &&
          Array.from({ length: eventsData.totalPages }, (_, i) => i + 1).map(
            (periodNum) => (
              <button
                key={periodNum}
                onClick={() => handlePeriodSelect(periodNum)}
                disabled={page === periodNum}
              >
                {periodNum}
              </button>
            ),
          )}
      </div>
      <div className={styles.paginationButtons}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          ←
        </button>
        <button
          onClick={handleNextPage}
          disabled={!eventsData || page === eventsData.totalPages}
        >
          →
        </button>
      </div>
      <EventList events={eventsData?.events || []} />
    </div>
  );
};

export default Timeline;
