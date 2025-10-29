import { useEvents } from '@/hooks/useEvents';
import CategoryTooltip from './CategoryTooltip/CategoryTooltip';
import styles from './CirclePagination.module.scss';
import { findMostFrequentNumber } from '@/utils/arrayUtils';

interface CirclePaginationProps {
  totalPages: number;
  currentPage: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const CirclePagination = ({
  totalPages,
  currentPage,
  limit,
  onPageChange,
}: CirclePaginationProps) => {
  const { data: currentData } = useEvents(currentPage, limit);

  const categoryIds =
    currentData?.events.map((event) => event.categoryId) || [];
  const currentCategoryId = findMostFrequentNumber(categoryIds) || 0;

  const radius = 530 / 2; // The center is half the container's width

  const getAngle = (index: number) => {
    return (index / totalPages) * 360;
  };

  return (
    <div className={styles.circleContainer}>
      <div
        className={styles.circle}
        style={{ transform: `rotate(${-getAngle(currentPage - 1)}deg)` }}
      >
        {Array.from({ length: totalPages }, (_, i) => {
          const angle = getAngle(i);
          const dotSize = 56; // As defined in the CSS
          const x =
            radius +
            radius * Math.cos((angle - 60) * (Math.PI / 180)) -
            dotSize / 2;
          const y =
            radius +
            radius * Math.sin((angle - 60) * (Math.PI / 180)) -
            dotSize / 2;

          const isDotActive = currentPage === i + 1;

          return (
            <div
              key={i}
              className={`${styles.dot} ${isDotActive ? styles.activeDot : ''}`}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `rotate(${getAngle(currentPage - 1)}deg)`,
              }}
              onClick={() => onPageChange(i + 1)}
            >
              <span>
                {i + 1}

                <CategoryTooltip
                  categoryId={currentCategoryId}
                  isVisible={isDotActive}
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CirclePagination;
