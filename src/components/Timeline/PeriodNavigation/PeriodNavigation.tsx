import React, { Dispatch, SetStateAction } from 'react';
import styles from './PeriodNavigation.module.scss';

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
        <button
          onClick={handlePrevPage}
          disabled={isPrevDisabled}
          className={styles.navButton}
        >
          <svg
            width="10"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              points="15 18 9 12 15 6"
              stroke="#42567A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={handleNextPage}
          disabled={isNextDisabled}
          className={styles.navButton}
        >
          <svg
            width="10"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              points="9 18 15 12 9 6"
              stroke="#42567A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PeriodNavigation;
