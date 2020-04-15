import { useState, useCallback } from 'react';
import { divideFive } from 'helper/divideFive';

export function useDivideByFive() {
  const [divider, setDivider] = useState<number>(0);
  const [divided, setDivided] = useState<number>(0);
  const divideNow = useCallback(() => {
    setDivided(divideFive(divider));
  }, [divider]);
  return {
    divideNow:divideNow,
    setDivider:setDivider,
    divided:divided
  };
}
