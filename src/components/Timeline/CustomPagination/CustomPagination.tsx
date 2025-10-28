import React from 'react';
import styles from './CustomPagination.module.scss';

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className={styles.paginationContainer}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`${styles.bullet} ${currentPage === i + 1 ? styles.active : ''}`}
          onClick={() => onPageChange(i + 1)}
        />
      ))}
    </div>
  );
};

export default CustomPagination;
