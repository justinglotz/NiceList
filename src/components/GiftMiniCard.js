import PropTypes from 'prop-types';
import React from 'react';

export default function GiftMiniCard({ giftObj }) {
  return (
    <div className="h-[50px] w-[285px]">
      <div className="h-[25px] bg-[#E6DADA] rounded-t-[6px]">
        <p className="mx-1">{giftObj.name}</p>
      </div>
      <div className="h-[25px] bg-[#C25B5D] rounded-b-[6px] flex flex-row divide-x divide-solid divide-black">
        <div className="flex h-full w-1/4 justify-center">
          <p className="text-white text-[12px] my-1">Selected</p>
        </div>
        <div className="flex w-1/4 justify-center h-full">
          <p className="text-white text-[12px] my-1">Purchased</p>
        </div>
        <div className="flex w-1/4 justify-center h-full">
          <p className="text-white text-[12px] my-1">Arrived</p>
        </div>
        <div className="flex w-1/4 justify-center h-full">
          <p className="text-white text-[12px] my-1">Complete</p>
        </div>
      </div>
    </div>
  );
}

GiftMiniCard.propTypes = {
  giftObj: PropTypes.shape({
    name: PropTypes.string,
    giftId: PropTypes.string,
  }),
};
