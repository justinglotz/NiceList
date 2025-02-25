import PropTypes from 'prop-types';
import React from 'react';

export default function GiftMiniCard({ giftObj }) {
  // Adjusts style for each div based on status of the gift
  const status1Style = [1, 2, 3, 4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';
  const status2Style = [2, 3, 4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';
  const status3Style = [3, 4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';
  const status4Style = [4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';

  return (
    <div className="h-[50px] w-[285px]">
      <div className="h-[25px] bg-[#E6DADA] rounded-t-[6px]">
        <p className="mx-1">{giftObj.name}</p>
      </div>
      <div className="h-[25px] bg-[#C25B5D] rounded-b-[6px] flex flex-row divide-x divide-solid divide-black">
        <div className={status1Style}>
          <p className="text-white text-[12px] my-1">Selected</p>
        </div>
        <div className={status2Style}>
          <p className="text-white text-[12px] my-1">Purchased</p>
        </div>
        <div className={status3Style}>
          <p className="text-white text-[12px] my-1">Arrived</p>
        </div>
        <div className={status4Style}>
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
    status: PropTypes.number,
  }),
};
