import { EventsResponse } from '@/services/events';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './CustomSwiper.module.scss';
import { EffectFade } from 'swiper/modules';
import { gsap } from 'gsap';

import 'swiper/css/effect-fade';
import { useEventsContext } from '@/contexts/EventsContext';
import { useEvents } from '@/hooks/useEvents';
import BulletPagination from '../BulletPagination/BulletPagination';

interface CustomSwiperProps {
  page: number;
  setPage: (page: number) => void;
  limit: number; // limit is used by PeriodSlide
  initialData?: EventsResponse;
}

const CustomSwiper = ({
  initialData,
  page,
  setPage,
  limit,
}: CustomSwiperProps) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const { data } = useEvents(page, limit, true);
  const { setEventsData } = useEventsContext();

  useEffect(() => {
    if (data) {
      setEventsData(page, data);
      gsap.fromTo(
        `.${styles.eventItem}`,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'elastic.inOut' },
      );
    }
  }, [data, page]);

  const handlePageChange = (periodNum: number) => {
    setPage(periodNum);
  };

  return (
    <Swiper
      className={styles.swiperContainer}
      modules={[Pagination, Navigation, EffectFade]}
      navigation={{
        enabled: true,
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      breakpoints={{
        320: {
          slidesPerView: 2,
          navigation: {
            enabled: false,
          },
        },
        1024: {
          slidesPerView: 3,
          navigation: {
            enabled: true,
          },
        },
      }}
    >
      <div ref={prevRef} className={styles.customSwiperButtonPrev} />
      <div ref={nextRef} className={styles.customSwiperButtonNext} />

      {data?.events.map((event, i) => (
        <SwiperSlide key={i}>
          <div key={event.id} className={styles.eventItem}>
            <span>{new Date(event.date).getFullYear()}</span>
            <p>{event.description}</p>
          </div>
        </SwiperSlide>
      ))}

      <BulletPagination
        totalPages={initialData?.totalPages || 0}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </Swiper>
  );
};

export default CustomSwiper;
