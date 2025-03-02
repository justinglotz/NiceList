'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ProgressRing from '../ProgressRing';
import GiftMiniCard from '../GiftMiniCard';
import { getGiftsByPersonId } from '../../api/giftData';
import { useSearch } from '../../utils/context/searchContext';

export default function DashboardCard({ personObj, onGiftUpdate, hideCompleted }) {
  const [gifts, setGifts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [expandedView, setExpandedView] = useState(false);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchGifts = async () => {
      const fetchedGifts = await getGiftsByPersonId(personObj.personId);

      // Only update state if data is different
      if (JSON.stringify(fetchedGifts) !== JSON.stringify(gifts)) {
        setGifts(fetchedGifts);
      }
    };

    fetchGifts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personObj.personId]);

  const calculateProgress = useCallback((giftItems) => {
    if (!giftItems || giftItems.length === 0) return 0;

    let statusSum = 0;
    giftItems.forEach((gift) => {
      statusSum += gift.status;
    });

    return ((statusSum / (giftItems.length * 4)) * 100).toFixed(0);
  }, []);

  useEffect(() => {
    const fetchGifts = async () => {
      const fetchedGifts = await getGiftsByPersonId(personObj.personId);
      setGifts(fetchedGifts);
      setProgress(calculateProgress(fetchedGifts));
    };

    fetchGifts();
  }, [personObj.personId, calculateProgress]);

  useEffect(() => {
    setProgress(calculateProgress(gifts));
  }, [gifts, calculateProgress]);

  const handleGiftUpdate = (updatedGift) => {
    setGifts((prevGifts) =>
      prevGifts.map((gift) => {
        if (gift.giftId === updatedGift.giftId) {
          onGiftUpdate(updatedGift);
          return updatedGift; // Update the matching gift
        }
        return gift; // Return other gifts unchanged
      }),
    );
  };

  let cardHeight = 300;
  if (gifts.length > 2 && expandedView) {
    cardHeight += (gifts.length - 2) * 55;
  }

  return (
    <div>
      <div className="w-[300px] bg-[#1e1e1e] rounded-[12px] border-red-500 transition-all transition-500" style={{ height: `${cardHeight}px` }}>
        <div className="flex flex-row h-[136px] w-full">
          <div className="w-[175px] flex items-start">
            <p className={` text-[18px] pt-[22px] px-[22px] ${searchQuery.length > 0 && personObj.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 'text-red-400' : 'text-white'}`}>{personObj.name}</p>
            {/* personObj.name.toLowerCase().includes(searchQuery.toLowerCase()) && personObj.name */}
          </div>
          <div className="w-[125px] flex items-center justify-center">
            <ProgressRing progress={progress} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {expandedView
            ? gifts.map((gift) => (
                <div key={gift.giftId} className={`transition-all duration-300 ease-in-out ${hideCompleted && gift.status === 4 ? 'opacity-0 scale-0 h-0 overflow-hidden' : 'opacity-100 scale-100 h-auto'}`}>
                  <GiftMiniCard giftObj={gift} onGiftUpdate={handleGiftUpdate} />
                </div>
              ))
            : /* Show only the first two gifts when expanded view is false */
              gifts.slice(0, 2).map((gift) => (
                <div key={gift.giftId} className={`transition-all duration-300 ease-in-out ${hideCompleted && gift.status === 4 ? 'opacity-0 scale-0 h-0 overflow-hidden' : 'opacity-100 scale-100 h-auto'}`}>
                  <GiftMiniCard giftObj={gift} onGiftUpdate={handleGiftUpdate} />
                </div>
              ))}
          {gifts.length > 2 && (
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

DashboardCard.propTypes = { personObj: PropTypes.shape({ name: PropTypes.string.isRequired, personId: PropTypes.string.isRequired, uid: PropTypes.string.isRequired, address: PropTypes.string.isRequired }), onGiftUpdate: PropTypes.func, hideCompleted: PropTypes.bool };
