import React from 'react';
import styles from './SwiperNavButton.module.scss';
import cn from 'classnames';

interface ISwiperNavButtonProps {
  direction: 'left' | 'right';
  className?: string;
}

const SwiperNavButton: React.FC<ISwiperNavButtonProps> = ({ direction, className }) => {
  const buttonClasses = cn(styles.navButton, styles[direction], className);

  return <button className={buttonClasses} />;
};

export default SwiperNavButton;
