import { useFlipbookAnimation } from '@/hooks/useFlipbookAnimation';
import styles from './YearsContainer.module.scss';

interface YearsContainerProps {
  currentStartYear?: number;
  currentEndYear?: number;
}

const YearsContainer = ({
  currentStartYear,
  currentEndYear,
}: YearsContainerProps) => {
  const startYear = useFlipbookAnimation(currentStartYear);
  const endYear = useFlipbookAnimation(currentEndYear);

  return (
    <div className={styles.yearsContainer}>
      <h2 className={styles.startYear}>{startYear}</h2>
      <h2 className={styles.endYear}>{endYear}</h2>
    </div>
  );
};

export default YearsContainer;
