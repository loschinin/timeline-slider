import { useFlipbookAnimation } from '@/hooks/useFlipbookAnimation';
import styles from './YearsContainer.module.scss';
import { useEvents } from '@/hooks/useEvents';

interface YearsContainerProps {
  page: number;
  limit: number;
}

const YearsContainer = ({ page, limit }: YearsContainerProps) => {
  const { data: currentData } = useEvents(page, limit);
  const startYear = useFlipbookAnimation(currentData?.startYear);
  const endYear = useFlipbookAnimation(currentData?.endYear);

  return (
    <div className={styles.yearsContainer}>
      <h2 className={styles.startYear}>{startYear}</h2>
      <h2 className={styles.endYear}>{endYear}</h2>
    </div>
  );
};

export default YearsContainer;
