import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './CustomSwiper.module.scss';

import { useEvents } from '@/hooks/useEvents';
import 'swiper/css/effect-fade';

interface CustomSwiperProps {
  page: number;
  limit: number;
}

const CustomSwiper = ({ page, limit }: CustomSwiperProps) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const { data } = useEvents(page, limit);

  useEffect(() => {
    if (data) {
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
      modules={[Navigation, EffectFade]}
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

      {data?.events.map((event, i) => (
        <SwiperSlide key={i}>
          <div key={event.id} className={styles.eventItem}>
            <span>{new Date(event.date).getFullYear()}</span>
            <p>{event.description}</p>
          </div>
        </SwiperSlide>
      ))}

      <div ref={nextRef} className={styles.customSwiperButtonNext} />
    </Swiper>
  );
};

export default CustomSwiper;
