// hooks/useGiftCardState.js or .ts
import { useEffect, useState } from 'react';
import calculateOverallProgress from '@/utils/calculateOverallProgress';

// eslint-disable-next-line import/prefer-default-export, default-param-last
export function useDashboardCardState(allGifts = [], hideCompleted) {
  const [expandedView, setExpandedView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayGifts, setDisplayGifts] = useState([]);
  const cardBaseStyle = 'w-[300px] bg-[#1e1e1e] rounded-[12px] transition-all duration-300';

  useEffect(() => {
    const filtered = hideCompleted ? allGifts.filter((gift) => gift.status !== 4) : allGifts;
    setDisplayGifts(filtered);
    setProgress(calculateOverallProgress(allGifts));
  }, [allGifts, hideCompleted]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (expandedView) {
      setIsVisible(false);
      const timer = setTimeout(() => setIsVisible(true), 150);
      return () => clearTimeout(timer);
    }
    setIsVisible(false);
  }, [expandedView]);

  const cardHeight = 300 + (expandedView && displayGifts.length > 2 ? (displayGifts.length - 2) * 58 : 0);
  const sortedGifts = [...displayGifts].sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    expandedView,
    setExpandedView,
    isVisible,
    progress,
    cardHeight,
    sortedGifts,
    cardBaseStyle,
  };
}
