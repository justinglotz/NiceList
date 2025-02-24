'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ProgressRing from '../ProgressRing';
import GiftMiniCard from '../GiftMiniCard';
import { getGiftsByPersonId } from '../../api/giftData';

export default function DashboardCard({ personObj }) {
  const [gifts, setGifts] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log(personObj.personId);
    getGiftsByPersonId(personObj.personId).then(setGifts);
  });

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

  return (
    <div>
      <div className="h-[300px] w-[300px] bg-[#1e1e1e] rounded-[12px] border-red-500">
        <div className="flex flex-row h-[136px] w-full">
          <div className="w-[175px] flex items-start">
            <p className="text-white text-[18px] pt-[22px] px-[22px]">{personObj.name}</p>
          </div>
          <div className="w-[125px] flex items-center justify-center">
            <ProgressRing progress={progress} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {gifts.length > 2 ? (
            <>
              <GiftMiniCard key={gifts[0].giftId} giftObj={gifts[0]} />
              <GiftMiniCard key={gifts[1].giftId} giftObj={gifts[1]} />
            </>
          ) : (
            gifts.map((gift) => <GiftMiniCard key={gift.giftId} giftObj={gift} />)
          )}
        </div>
      </div>
    </div>
  );
}

DashboardCard.propTypes = {
  personObj: PropTypes.shape({
    name: PropTypes.string.isRequired,
    personId: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }),
};
