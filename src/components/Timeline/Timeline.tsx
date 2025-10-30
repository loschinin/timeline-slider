import { useEvents } from '@/hooks/useEvents';
import { useState } from 'react';
import CirclePagination from './Paginations/CirclePagination/CirclePagination';
import CustomSwiper from './CustomSwiper/CustomSwiper';
import styles from './Timeline.module.scss';
import PeriodNavigation from './PeriodNavigation/PeriodNavigation';
import BulletPagination from './Paginations/BulletPagination/BulletPagination';
import YearsContainer from './YearsContainer/YearsContainer';

const LIMIT = 6; // Количество лет в одном периоде

const Timeline = () => {
  const [page, setPage] = useState(1);
  const { data: initialData } = useEvents(1, LIMIT);
  const initialTotalPages = initialData?.totalPages || 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Исторические даты</h1>

        <YearsContainer page={page} limit={LIMIT} />

        <CirclePagination
          totalPages={initialTotalPages}
          currentPage={page}
          limit={LIMIT}
          onPageChange={setPage}
        />

        <hr className={styles.divider} />
      </header>

      <main className={styles.main}>
        <PeriodNavigation
          page={page}
          totalPages={initialTotalPages}
          setPage={setPage}
        />

        <CustomSwiper page={page} limit={LIMIT} />

        <BulletPagination
          totalPages={initialTotalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
};

export default Timeline;
