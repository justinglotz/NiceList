'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ProgressRing from '../ProgressRing';
import GiftMiniCard from '../GiftMiniCard';
import { getGiftsByPersonId } from '../../api/giftData';
import { useSearch } from '../../utils/context/searchContext';
import { useHideCompleted } from '../../utils/context/hideCompletedContext';
import Skeleton from '../ui/skeleton';

export default function DashboardCard({ personObj, onGiftUpdate, loading = false }) {
  const [allGifts, setAllGifts] = useState([]);
  const [displayGifts, setDisplayGifts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [expandedView, setExpandedView] = useState(false);
  const { searchQuery } = useSearch();
  const { hideCompleted } = useHideCompleted();

  // Fetch all gifts once when personId changes
  useEffect(() => {
    const fetchGifts = async () => {
      const fetchedGifts = await getGiftsByPersonId(personObj.personId);
      setAllGifts(fetchedGifts);
    };

    fetchGifts();
  }, [personObj.personId]);

  // Calculate progress based on all gifts, not just displayed ones
  const calculateProgress = useCallback((giftItems) => {
    if (!giftItems || giftItems.length === 0) return 0;

    let statusSum = 0;
    giftItems.forEach((gift) => {
      statusSum += gift.status;
    });

    return ((statusSum / (giftItems.length * 4)) * 100).toFixed(0);
  }, []);

  // Update progress and filtered display whenever allGifts or hideCompleted changes
  useEffect(() => {
    // Calculate progress based on ALL gifts
    setProgress(calculateProgress(allGifts));

    // Filter for display only
    if (hideCompleted) {
      setDisplayGifts(allGifts.filter((gift) => gift.status !== 4));
    } else {
      setDisplayGifts(allGifts);
    }
  }, [allGifts, hideCompleted, calculateProgress]);

  // Handle gift updates by updating the allGifts array
  const handleGiftUpdate = (updatedGift) => {
    setAllGifts((prevGifts) =>
      prevGifts.map((gift) => {
        if (gift.giftId === updatedGift.giftId) {
          onGiftUpdate(updatedGift);
          return updatedGift;
        }
        return gift;
      }),
    );
  };

  let cardHeight = 300;
  if (displayGifts.length > 2 && expandedView) {
    cardHeight += (displayGifts.length - 2) * 55;
  }

  // Sort gifts by date
  const sortedGifts = [...displayGifts].sort((a, b) => new Date(a.date) - new Date(b.date));

  const cardBaseStyle = 'w-[300px] bg-[#1e1e1e] rounded-[12px] transition-all duration-300';

  if (loading) {
    return (
      <div>
        <div className={cardBaseStyle} style={{ height: '300px' }}>
          <div className="flex flex-row h-[136px] w-full">
            <div className="w-[175px] flex items-start">
              <Skeleton className="h-[18px] w-2/3 mx-[22px] mt-[22px] bg-gray-700" />
            </div>
            <div className="w-[125px] flex items-center justify-center">
              <Skeleton className="h-[60px] w-[60px] rounded-full bg-gray-700" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 px-4">
            <Skeleton className="h-[50px] w-full bg-gray-700 rounded-md" />
            <Skeleton className="h-[50px] w-full bg-gray-700 rounded-md" />
          </div>
        </div>
      </div>
    );
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
          {expandedView
            ? sortedGifts.map((gift) => (
                <div key={gift.giftId} className="transition-all duration-300 ease-in-out">
                  <GiftMiniCard giftObj={gift} onGiftUpdate={handleGiftUpdate} />
                </div>
              ))
            : sortedGifts.slice(0, 2).map((gift) => (
                <div key={gift.giftId} className="transition-all duration-300 ease-in-out">
                  <GiftMiniCard giftObj={gift} onGiftUpdate={handleGiftUpdate} />
                </div>
              ))}
          {displayGifts.length > 2 && (
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
