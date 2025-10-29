import React, { Dispatch, SetStateAction } from 'react';
import styles from './PeriodNavigation.module.scss';
import ChevronButton from './ChevronButton/ChevronButton';

interface PeriodNavigationProps {
  page: number;
  totalPages?: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PeriodNavigation: React.FC<PeriodNavigationProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  const isPrevDisabled = page === 1;
  const isNextDisabled = !totalPages || page === totalPages;
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    if (totalPages) {
      setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }
  };
  return (
    <div className={styles.periodNavContainer}>
      <div className={styles.periodFraction}>
        {String(page).padStart(2, '0')}/{String(totalPages).padStart(2, '0')}
      </div>
      <div className={styles.periodNavButtons}>
        <ChevronButton
          direction={'left'}
          onClick={handlePrevPage}
          disabled={isPrevDisabled}
        />
        <ChevronButton
          direction={'right'}
          onClick={handleNextPage}
          disabled={isNextDisabled}
        />
      </div>
    </div>
  );
};

export default PeriodNavigation;
