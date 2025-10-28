import styles from './CirclePagination.module.scss';

interface CirclePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CirclePagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: CirclePaginationProps) => {
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

          return (
            <div
              key={i}
              className={`${styles.dot} ${currentPage === i + 1 ? styles.activeDot : ''}`}
              style={{ left: `${x}px`, top: `${y}px` }}
              onClick={() => onPageChange(i + 1)}
            >
              <span
                style={{
                  transform: `rotate(${getAngle(currentPage - 1)}deg)`,
                }}
              >
                {i + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CirclePagination;
