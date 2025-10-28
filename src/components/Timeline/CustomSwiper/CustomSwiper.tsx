import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './CustomSwiper.module.scss';

import { useEvents } from '@/hooks/useEvents';
import { EventsResponse } from '@/services/events';
import 'swiper/css/effect-fade';

interface CustomSwiperProps {
  page: number;
  limit: number;
  setEventsData(page: number, eventsResponse: EventsResponse): void;
}

const CustomSwiper = ({ page, limit, setEventsData }: CustomSwiperProps) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const { data } = useEvents(page, limit);

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
          slidesPerView: 1,
          navigation: {
            enabled: false,
          },
        },
        430: {
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
    </Swiper>
  );
};

export default CustomSwiper;
