import { useState, useEffect } from 'react';

export function useCalculateScore(num: number) {
  const [changedCount, setChangedCount] = useState<number>(0);
  const [evenNumber, setEvenNumber] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  useEffect(() => {
    setChangedCount(prev => prev + 1);
    setEvenNumber(num % 2 === 0);
  }, [num]);
  useEffect(() => {
    setScore(Math.pow(10, changedCount));
  }, [changedCount]);
  return {
    score: score,
    evenNumber
  };
}
