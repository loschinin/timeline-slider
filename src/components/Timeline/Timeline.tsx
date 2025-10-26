import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Timeline.module.scss';
import { useEventsContext } from '@/contexts/EventsContext';
import Circle from './Circle';
import PeriodSlide from './PeriodSlide';
import { useEvents } from '@/hooks/useEvents';
import { SliderButtons } from './SliderButtons';
import { useFlipbookAnimation } from '@/hooks/useFlipbookAnimation';
import { useState, useRef, useEffect } from 'react';

const limit = 6; // Number of years per period

const Timeline = () => {
  const [page, setPage] = useState(1);
  const { eventsData } = useEventsContext();
  const swiperRef = useRef<SwiperCore | null>(null);

  const { data: initialData } = useEvents(1, limit);
  const currentData = eventsData[page];

  const startYear = useFlipbookAnimation(currentData?.startYear);
  const endYear = useFlipbookAnimation(currentData?.endYear);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(page - 1);
    }
  }, [page]);

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
        <Circle
          totalPages={initialData.totalPages}
          currentPage={page}
          onPeriodSelect={handlePeriodSelect}
        />
      )}
      <div className={styles.periodNavContainer}>
        {page} / {initialData?.totalPages}
        <div className={styles.periodNavButtons}>
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={styles.navButton}
          >
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.5 15L1.5 8L8.5 1" stroke="#3877EE" strokeWidth="2" />
            </svg>
          </button>
          <button
            onClick={handleNextPage}
            disabled={!initialData || page === initialData.totalPages}
            className={styles.navButton}
          >
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.5 1L8.5 8L1.5 15" stroke="#3877EE" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className={styles.swiperContainer}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setPage(swiper.activeIndex + 1)}
        initialSlide={page - 1}
        breakpoints={{
          320: {
            pagination: {
              enabled: true,
            },
          },
          768: {
            pagination: {
              enabled: false,
            },
          },
        }}
      >
        <SliderButtons />
        {initialData &&
          Array.from({ length: initialData.totalPages }, (_, i) => (
            <SwiperSlide key={i}>
              <PeriodSlide
                page={i + 1}
                limit={limit}
                isActive={
                  i + 1 === page || i + 1 === page - 1 || i + 1 === page + 1
                }
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Timeline;
