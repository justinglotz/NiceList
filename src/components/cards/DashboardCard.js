'use client';

import PropTypes from 'prop-types';
import ProgressRing from '../ProgressRing';
import GiftMiniCard from '../GiftMiniCard';
import { useSearch } from '../../utils/context/searchContext';
import { useHideCompleted } from '../../utils/context/hideCompletedContext';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useDashboardCardState } from '../../hooks/useDashboardCardState';
import { useAuth } from '../../utils/context/authContext';
import SkeletonDashboardCard from './skeletons/SkeletonDashboardCard';

export default function DashboardCard({ personObj, onGiftUpdate, loading = false }) {
  const { searchQuery } = useSearch();
  const { hideCompleted } = useHideCompleted();
  const user = useAuth();

  const { gifts: allGifts, handleGiftUpdate: hookGiftUpdate } = useDashboardData(user.uid, personObj.personId);
  const { expandedView, setExpandedView, isVisible, progress, cardHeight, sortedGifts } = useDashboardCardState(allGifts, hideCompleted);

  const handleGiftUpdate = (updatedGift) => {
    hookGiftUpdate(updatedGift);
    if (onGiftUpdate) {
      onGiftUpdate(updatedGift);
    }
  };

  const cardBaseStyle = 'w-[300px] bg-[#1e1e1e] rounded-[12px] transition-all duration-300';

  if (loading) {
    return <SkeletonDashboardCard />;
  }

  return (
    <div>
      <div className={cardBaseStyle} style={{ height: `${cardHeight}px` }}>
        <div className="flex flex-row h-[136px] w-full">
          <div className="w-[175px] flex items-start">
            <p className={`text-[18px] pt-[22px] px-[22px] ${searchQuery.length > 0 && personObj.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 'text-red-400' : 'text-white'}`}>{personObj.name}</p>
          </div>
          <div className="w-[125px] flex items-center justify-center">
            <ProgressRing progress={progress} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {expandedView ? (
            <>
              {sortedGifts.slice(0, 2).map((gift) => (
                <div key={gift.giftId} className="transition-all duration-300 ease-in-out">
                  <GiftMiniCard giftObj={gift} onGiftUpdate={handleGiftUpdate} />
                </div>
              ))}

              {sortedGifts.slice(2).map((gift) => (
                <div key={gift.giftId} className={`transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <GiftMiniCard giftObj={gift} onGiftUpdate={handleGiftUpdate} />
                </div>
              ))}
            </>
          ) : (
            sortedGifts.slice(0, 2).map((gift) => (
              <div key={gift.giftId} className="transition-all duration-300 ease-in-out">
                <GiftMiniCard giftObj={gift} onGiftUpdate={handleGiftUpdate} />
              </div>
            ))
          )}
          {sortedGifts.length > 2 && (
            <div className="w-full flex flex-col">
              <button type="button" className="justify-end text-white text-sm" onClick={() => setExpandedView(!expandedView)}>
                {expandedView ? 'See Less' : 'See More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

DashboardCard.propTypes = {
  personObj: PropTypes.shape({
    personId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onGiftUpdate: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
