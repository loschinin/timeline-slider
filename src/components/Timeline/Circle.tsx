import styles from './Timeline.module.scss';

interface CircleProps {
  totalPages: number;
  currentPage: number;
  onPeriodSelect: (page: number) => void;
}

const Circle = ({ totalPages, currentPage, onPeriodSelect }: CircleProps) => {
  const radius = 220;
  const center = 240;

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
          const dotSize = 40; // As defined in the CSS
          const x =
            center +
            radius * Math.cos((angle - 90) * (Math.PI / 180)) -
            dotSize / 2;
          const y =
            center +
            radius * Math.sin((angle - 90) * (Math.PI / 180)) -
            dotSize / 2;

          return (
            <div
              key={i}
              className={`${styles.dot} ${currentPage === i + 1 ? styles.activeDot : ''}`}
              style={{ left: `${x}px`, top: `${y}px` }}
              onClick={() => onPeriodSelect(i + 1)}
            >
              <span>{i + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Circle;
