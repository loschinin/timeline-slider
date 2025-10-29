import React from 'react';
import styles from './PeriodNavButton.module.scss';
import cn from 'classnames';

interface IPeriodNavButtonProps {
  direction: 'left' | 'right';
  shadow?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const PeriodNavButton: React.FC<IPeriodNavButtonProps> = ({
  direction,
  disabled = false,
  onClick,
  className,
}) => {
  const buttonClasses = cn(
    styles.periodNavButton,
    styles[direction],
    {
      [styles.disabled]: disabled,
    },
    className,
  );

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      <span className={styles.chevron} />
    </button>
  );
};

export default PeriodNavButton;
