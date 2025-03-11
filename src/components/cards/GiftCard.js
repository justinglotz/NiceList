'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSinglePerson } from '../../api/personData';
// import { deleteGift } from '../../api/giftData';
import Skeleton from '../ui/skeleton';

// add onUpdate back into this function
export default function GiftCard({ giftObj, loading = false }) {
  const [person, setPerson] = useState('');

  // const deleteThisGift = () => {
  //   if (window.confirm(`Delete ${giftObj.name}?`)) {
  //     deleteGift(giftObj.giftId).then(() => onUpdate());
  //   }
  // };

  useEffect(() => {
    if (giftObj.personId) {
      getSinglePerson(giftObj.personId).then((data) => setPerson(data));
    }
  }, [giftObj.personId]);

  const displayStatus = () => {
    switch (giftObj.status) {
      case 4:
        return 'Completed';
      case 3:
        return 'Arrived';
      case 2:
        return 'Purchased';
      case 1:
        return 'Selected';
      default:
        return 'Error';
    }
  };

  // Common container style for both states
  const containerStyle = 'w-[300px] h-[300px] bg-[#1e1e1e] rounded-[12px] transition-all duration-300 flex flex-col';

  if (loading) {
    return (
      <div>
        <div className={containerStyle}>
          <div className="flex-grow">
            {/* Match exact spacing of real content */}
            <div className="pt-[22px] px-[22px]">
              <Skeleton className="h-[18px] w-3/4 bg-gray-700" />
            </div>
            <div className="px-[22px] mt-[18px]">
              <Skeleton className="h-[18px] w-1/3 bg-gray-700" />
            </div>
            <div className="px-[22px] mt-[18px]">
              <Skeleton className="h-[18px] w-2/3 bg-gray-700" />
            </div>
            <div className="px-[22px] mt-[18px]">
              <Skeleton className="h-[18px] w-1/2 bg-gray-700" />
            </div>
          </div>
          <div className="mt-auto mb-[16px]">
            <Skeleton className="h-[12px] w-1/2 mx-auto bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={containerStyle}>
        <div className="flex-grow">
          <p className="text-[18px] pt-[22px] px-[22px] text-white">{giftObj.name}</p>
          <p className="text-[18px] px-[22px] text-white">{displayStatus()}</p>
          <p className="text-[18px] px-[22px] text-white">Purchased for: {person.name}</p>
          <p className="text-[18px] px-[22px] text-white">URL: {giftObj.url}</p>
        </div>
        <div className="mt-auto mb-[16px]">
          <p className="text-[12px] text-center text-white">{giftObj.shipped ? `Shipping to ${person.name}` : 'Shipped to me'}</p>
        </div>
      </div>
    </div>
  );
}

GiftCard.propTypes = {
  giftObj: PropTypes.shape({
    name: PropTypes.string,
    personId: PropTypes.string,
    uid: PropTypes.string,
    url: PropTypes.string,
    giftId: PropTypes.string,
    status: PropTypes.number,
    shipped: PropTypes.bool,
  }).isRequired,
  loading: PropTypes.bool,
  // onUpdate: PropTypes.func.isRequired
};
