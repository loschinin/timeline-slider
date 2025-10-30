import React from 'react';
import styles from './BulletPagination.module.scss';

interface BulletPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const BulletPagination: React.FC<BulletPaginationProps> = ({
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

export default BulletPagination;
