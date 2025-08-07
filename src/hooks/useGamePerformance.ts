import { useCallback, useMemo } from 'react';
import { PredictionResult } from '@/lib/roulette/types';

interface UseGamePerformanceProps {
  history: number[];
  prediction: PredictionResult | null;
}

export const useGamePerformance = ({ history, prediction }: UseGamePerformanceProps) => {
  
  const gameStats = useMemo(() => {
    if (!history.length || !prediction) {
      return {
        totalSpins: 0,
        redCount: 0,
        blackCount: 0,
        greenCount: 0,
        evenCount: 0,
        oddCount: 0,
        redPercentage: 0,
        blackPercentage: 0,
        greenPercentage: 0,
        evenPercentage: 0,
        oddPercentage: 0
      };
    }

    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    
    const redCount = history.filter(num => redNumbers.includes(num)).length;
    const blackCount = history.filter(num => num !== 0 && !redNumbers.includes(num)).length;
    const greenCount = history.filter(num => num === 0).length;
    const evenCount = history.filter(num => num !== 0 && num % 2 === 0).length;
    const oddCount = history.filter(num => num !== 0 && num % 2 === 1).length;
    
    const totalSpins = history.length;

    return {
      totalSpins,
      redCount,
      blackCount,
      greenCount,
      evenCount,
      oddCount,
      redPercentage: totalSpins ? (redCount / totalSpins) * 100 : 0,
      blackPercentage: totalSpins ? (blackCount / totalSpins) * 100 : 0,
      greenPercentage: totalSpins ? (greenCount / totalSpins) * 100 : 0,
      evenPercentage: totalSpins ? (evenCount / totalSpins) * 100 : 0,
      oddPercentage: totalSpins ? (oddCount / totalSpins) * 100 : 0
    };
  }, [history]);

  const getHotNumbers = useCallback(() => {
    if (!prediction?.statistics.numberOccurrences) return [];
    
    return prediction.statistics.numberOccurrences
      .map((count, number) => ({ number, count }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [prediction?.statistics.numberOccurrences]);

  const getColdNumbers = useCallback(() => {
    if (!prediction?.statistics.numberOccurrences || !history.length) return [];
    
    return prediction.statistics.numberOccurrences
      .map((count, number) => ({ number, count }))
      .filter(item => item.count === 0)
      .slice(0, 5);
  }, [prediction?.statistics.numberOccurrences, history.length]);

  return {
    gameStats,
    hotNumbers: getHotNumbers(),
    coldNumbers: getColdNumbers()
  };
};