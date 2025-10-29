import React from 'react';
import styles from './ChevronButton.module.scss';
import cn from 'classnames';

interface IChevronButtonProps {
  direction: 'left' | 'right';
  shadow?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const ChevronButton: React.FC<IChevronButtonProps> = ({
  direction,
  disabled = false,
  onClick,
  className,
}) => {
  const buttonClasses = cn(
    styles.chevronButton,
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

export default ChevronButton;
