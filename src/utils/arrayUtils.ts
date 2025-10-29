export const findMostFrequentNumber = (arr: number[]): number | null => {
  if (!arr || arr.length === 0) {
    return null;
  }

  const counts = arr.reduce((acc: Record<string, number>, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  const mostFrequent = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  return parseInt(mostFrequent);
};
