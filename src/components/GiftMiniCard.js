import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { updateGift } from '../api/giftData';
import { useSearch } from '../utils/context/searchContext';

export default function GiftMiniCard({ giftObj, onGiftUpdate }) {
  const [currentGiftObj, setCurrentGiftObj] = useState(giftObj);
  const { searchQuery } = useSearch();

  useEffect(() => {
    setCurrentGiftObj(giftObj); // Update local state when giftObj prop changes
  }, [giftObj]);

  // Adjusts style for each div based on status of the gift
  const status1Style = [1, 2, 3, 4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';
  const status2Style = [2, 3, 4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';
  const status3Style = [3, 4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';
  const status4Style = [4].includes(giftObj.status) ? 'bg-[#4CAF50] flex h-full w-1/4 justify-center' : 'flex h-full w-1/4 justify-center';

  const handleClick1 = async () => {
    if (window.confirm(`Set status of ${currentGiftObj.name} to Selected?`)) {
      try {
        const updatedGift = await updateGift({
          ...currentGiftObj,
          status: 1,
        });
        setCurrentGiftObj(updatedGift); // Update local state immediately
        if (onGiftUpdate) {
          onGiftUpdate(updatedGift); // Notify the parent component
        }
      } catch (error) {
        console.error('Error updating gift:', error);
        // Handle error, e.g., display an error message
      }
    }
  };
  const handleClick2 = async () => {
    if (window.confirm(`Set status of ${currentGiftObj.name} to Purchased?`)) {
      try {
        const updatedGift = await updateGift({
          ...currentGiftObj,
          status: 2,
        });
        setCurrentGiftObj(updatedGift); // Update local state immediately
        if (onGiftUpdate) {
          onGiftUpdate(updatedGift); // Notify the parent component
        }
      } catch (error) {
        console.error('Error updating gift:', error);
        // Handle error, e.g., display an error message
      }
    }
  };
  const handleClick3 = async () => {
    if (window.confirm(`Set status of ${currentGiftObj.name} to Arrived?`)) {
      try {
        const updatedGift = await updateGift({
          ...currentGiftObj,
          status: currentGiftObj.shipped === true ? 4 : 3,
        });
        setCurrentGiftObj(updatedGift); // Update local state immediately
        if (onGiftUpdate) {
          onGiftUpdate(updatedGift); // Notify the parent component
        }
      } catch (error) {
        console.error('Error updating gift:', error);
        // Handle error, e.g., display an error message
      }
    }
  };
  const handleClick4 = async () => {
    if (window.confirm(`Set status of ${currentGiftObj.name} to Complete?`)) {
      try {
        const updatedGift = await updateGift({
          ...currentGiftObj,
          status: 4,
          completed: true,
        });
        setCurrentGiftObj(updatedGift); // Update local state immediately
        if (onGiftUpdate) {
          onGiftUpdate(updatedGift); // Notify the parent component
        }
      } catch (error) {
        console.error('Error updating gift:', error);
        // Handle error, e.g., display an error message
      }
    }
  };

  return (
    <div className="h-[50px] w-[285px] overflow-hidden rounded-[6px]">
      <div className="h-[25px] bg-[#E6DADA]">
        <p className={`mx-1 ${searchQuery.length > 0 && giftObj.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 'text-red-700' : 'text-black'}`}>{giftObj.name}</p>
      </div>
      <div className="h-[25px] bg-[#C25B5D] flex flex-row divide-x divide-solid divide-black">
        <div className={status1Style}>
          <button type="button" onClick={handleClick1}>
            <p className="text-white text-[12px] my-1">Selected</p>
          </button>
        </div>
        <div className={status2Style}>
          <button type="button" onClick={handleClick2}>
            <p className="text-white text-[12px] my-1">Purchased</p>
          </button>
        </div>
        <div className={status3Style}>
          <button type="button" onClick={handleClick3}>
            <p className="text-white text-[12px] my-1">Arrived</p>
          </button>
        </div>
        <div className={status4Style}>
          <button type="button" onClick={handleClick4}>
            <p className="text-white text-[12px] my-1">Complete</p>
          </button>
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
  onGiftUpdate: PropTypes.func,
};
