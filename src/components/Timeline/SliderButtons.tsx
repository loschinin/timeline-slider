import { useSwiper } from 'swiper/react';
import styles from './Timeline.module.scss';

export const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className={styles.sliderButtons}>
      <button onClick={() => swiper.slidePrev()} className={styles.sliderButton}>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 15L1.5 8L8.5 1" stroke="#3877EE" strokeWidth="2"/>
        </svg>
      </button>
      <button onClick={() => swiper.slideNext()} className={styles.sliderButton}>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 1L8.5 8L1.5 15" stroke="#3877EE" strokeWidth="2"/>
        </svg>
      </button>
    </div>
  );
};
