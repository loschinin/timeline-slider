import React, { Dispatch, SetStateAction } from 'react';
import styles from './PeriodNavigation.module.scss';

interface PeriodNavigationProps {
  page: number;
  totalPages?: number;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  setPage: Dispatch<SetStateAction<number>>;
}

const PeriodNavigation: React.FC<PeriodNavigationProps> = ({
  page,
  totalPages,
  isPrevDisabled,
  isNextDisabled,
  setPage,
}) => {
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
        {page} / {totalPages}
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
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.5 15L1.5 8L8.5 1" stroke="#3877EE" strokeWidth="2" />
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
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.5 1L8.5 8L1.5 15" stroke="#3877EE" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PeriodNavigation;
