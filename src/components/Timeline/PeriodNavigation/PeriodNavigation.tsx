import React from 'react';
import styles from './PeriodNavigation.module.scss';

interface PeriodNavigationProps {
  page: number;
  totalPages?: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

const PeriodNavigation: React.FC<PeriodNavigationProps> = ({
  page,
  totalPages,
  onPrevPage,
  onNextPage,
  isPrevDisabled,
  isNextDisabled,
}) => {
  return (
    <div className={styles.periodNavContainer}>
      {page} / {totalPages}
      <div className={styles.periodNavButtons}>
        <button
          onClick={onPrevPage}
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
          onClick={onNextPage}
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
