import { EventsResponse } from '@/services/events';
import { useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import navStyles from './CustomSwiperNavigation.module.scss';
import PeriodSlide from './PeriodSlide';

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
  const swiperRef = useRef<SwiperCore | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(page - 1);
    }
  }, [page]);

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      navigation={{
        enabled: true,
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      className={navStyles.swiperContainer}
      onSlideChange={(swiper) => setPage(swiper.activeIndex + 1)}
      initialSlide={page - 1}
      breakpoints={{
        320: {
          pagination: {
            enabled: true,
          },
        },
        1024: {
          pagination: {
            enabled: false,
          },
        },
      }}
    >
      <div ref={prevRef} className={navStyles.customSwiperButtonPrev} />
      <div ref={nextRef} className={navStyles.customSwiperButtonNext} />
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
  );
};

export default CustomSwiper;
