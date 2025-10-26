import { useState, useEffect, useRef } from 'react';

export const useFlipbookAnimation = (endValue: number | undefined, duration = 50) => {
  const [currentValue, setCurrentValue] = useState(endValue || 0);
  const previousValueRef = useRef(endValue || 0);

  useEffect(() => {
    if (endValue === undefined) return;

    let startValue = previousValueRef.current;
    if (startValue === 0) {
      startValue = endValue;
    }

    if (startValue === endValue) {
      setCurrentValue(endValue);
      previousValueRef.current = endValue;
      return;
    }

    const values: number[] = [];
    if (startValue < endValue) {
      for (let i = startValue; i <= endValue; i++) {
        values.push(i);
      }
    } else {
      for (let i = startValue; i >= endValue; i--) {
        values.push(i);
      }
    }

    let index = 0;
    const interval = setInterval(() => {
      setCurrentValue(values[index]);
      index++;
      if (index >= values.length) {
        clearInterval(interval);
        previousValueRef.current = endValue;
      }
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [endValue, duration]);

  return currentValue;
};
