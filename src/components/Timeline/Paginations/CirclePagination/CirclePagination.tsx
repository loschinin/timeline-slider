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

const DOT_SIZE = 56;
const START_ANGLE_OFFSET = -60;
const CONTAINER_SIZE = 530;
const RADIUS = CONTAINER_SIZE / 2;

/** Конвертирует градусы в радианы */
const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

/** Возвращает угол (в градусах) для точки по её индексу */
const getAngle = (index: number, total: number): number =>
  (index / total) * 360;

/** Возвращает координаты точки на круге */
const getDotPosition = (angle: number): { x: number; y: number } => {
  const radians = toRadians(angle + START_ANGLE_OFFSET);
  const x = RADIUS + RADIUS * Math.cos(radians) - DOT_SIZE / 2;
  const y = RADIUS + RADIUS * Math.sin(radians) - DOT_SIZE / 2;
  return { x, y };
};

/** Возвращает угол текущей страницы для поворота */
const getRotation = (currentPage: number, totalPages: number): number =>
  getAngle(currentPage - 1, totalPages);

const CirclePagination = ({
  totalPages,
  currentPage,
  limit,
  onPageChange,
}: CirclePaginationProps) => {
  const { data } = useEvents(currentPage, limit);

  const categoryIds = data?.events.map((e) => e.categoryId) ?? [];
  const currentCategoryId = findMostFrequentNumber(categoryIds) ?? 0;

  const rotation = getRotation(currentPage, totalPages);

  return (
    <div className={styles.circleContainer}>
      <div
        className={styles.circle}
        style={{ transform: `rotate(${-rotation}deg)` }}
      >
        {Array.from({ length: totalPages }, (_, index) => {
          const angle = getAngle(index, totalPages);
          const { x, y } = getDotPosition(angle);
          const isActive = currentPage === index + 1;

          return (
            <div
              key={index}
              className={`${styles.dot} ${isActive ? styles.activeDot : ''}`}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `rotate(${rotation}deg)`,
              }}
              onClick={() => onPageChange(index + 1)}
            >
              <span>
                {index + 1}
                <CategoryTooltip
                  categoryId={currentCategoryId}
                  isVisible={isActive}
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
