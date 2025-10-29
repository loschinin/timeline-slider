'use client';

import { FC } from 'react';
import styles from './CategoryTooltip.module.scss';
import { useCategoryById } from '@/hooks/useCategoryById';

interface CategoryTooltipProps {
  categoryId: number;
  isVisible: boolean;
}

const CategoryTooltip: FC<CategoryTooltipProps> = ({ categoryId, isVisible }) => {
  const { data: category } = useCategoryById(categoryId);

  return (
    <div className={`${styles.tooltip} ${isVisible ? styles.visible : ''}`}>
      {category?.name}
    </div>
  );
};

export default CategoryTooltip;
