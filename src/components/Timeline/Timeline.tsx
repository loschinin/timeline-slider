import { useEvents } from '@/hooks/useEvents';
import { useState } from 'react';
import CirclePagination from './CirclePagination/CirclePagination';
import CustomSwiper from './CustomSwiper/CustomSwiper'; // Import the new CustomSwiper component
import styles from './Timeline.module.scss';
import PeriodNavigation from './PeriodNavigation/PeriodNavigation';
import BulletPagination from './BulletPagination/BulletPagination';
import YearsContainer from './YearsContainer/YearsContainer';

const limit = 6; // Number of years per period

const Timeline = () => {
  const [page, setPage] = useState(1);

  const { data: initialData } = useEvents(1, limit);
  const initialTotalPages = initialData?.totalPages || 0;

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineHeader}>
        <h1 className={styles.title}>Исторические даты</h1>

        <YearsContainer page={page} limit={limit} />
        <CirclePagination
          totalPages={initialTotalPages}
          currentPage={page}
          limit={limit}
          onPageChange={setPage}
        />

        <hr className={styles.divider} />
      </div>
      <div className={styles.timelineBody}>
        <PeriodNavigation
          page={page}
          totalPages={initialTotalPages}
          setPage={setPage}
        />
        <CustomSwiper page={page} limit={limit} />
        <BulletPagination
          totalPages={initialTotalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Timeline;
