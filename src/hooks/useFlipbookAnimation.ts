import { useState, useEffect, useRef } from 'react';

/**
 * Генерирует массив промежуточных чисел между startValue и endValue включительно.
 * Если startValue < endValue — считает вверх, иначе — вниз.
 */
const generateRange = (startValue: number, endValue: number): number[] => {
  const values: number[] = [];

  if (startValue < endValue) {
    for (let i = startValue; i <= endValue; i++) values.push(i);
  } else {
    for (let i = startValue; i >= endValue; i--) values.push(i);
  }

  return values;
};

/**
 * Хук анимирует числовое значение от предыдущего к новому
 * с эффектом "перелистывания" цифр (flipbook-style).
 *
 * @param endValue — конечное значение (число, до которого нужно дойти)
 * @param duration — задержка между шагами анимации в миллисекундах (по умолчанию 50)
 *
 * @returns Текущее промежуточное значение (анимированное)
 */
export const useFlipbookAnimation = (
  endValue: number | undefined,
  duration = 50,
) => {
  // Храним текущее значение, которое изменяется с анимацией
  const [currentValue, setCurrentValue] = useState(endValue || 0);

  // Храним предыдущее конечное значение, чтобы знать, откуда начинать анимацию
  const previousValueRef = useRef(endValue || 0);

  useEffect(() => {
    if (endValue === undefined) return;

    // Начальное значение — то, что было в прошлый раз
    let startValue = previousValueRef.current;

    // Если это первая отрисовка, не анимируем
    if (startValue === 0) {
      startValue = endValue;
    }

    // Если значение не изменилось — просто обновляем состояние и выходим
    if (startValue === endValue) {
      setCurrentValue(endValue);
      previousValueRef.current = endValue;
      return;
    }

    // Вычисляем последовательность чисел для анимации
    const values = generateRange(startValue, endValue);

    // Индекс текущего шага анимации
    let index = 0;

    // Интервал плавного обновления
    const interval = setInterval(() => {
      setCurrentValue(values[index]);
      index++;

      // Когда дошли до конца — очищаем интервал и сохраняем новое значение
      if (index >= values.length) {
        clearInterval(interval);
        previousValueRef.current = endValue;
      }
    }, duration);

    // Очистка при размонтировании или изменении зависимостей
    return () => clearInterval(interval);
  }, [endValue, duration]);

  // Возвращаем текущее (анимированное) значение
  return currentValue;
};
