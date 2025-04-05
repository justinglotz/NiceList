'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faWindowRestore, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getSinglePerson } from '../../api/personData';
import Skeleton from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { deleteGift } from '../../api/giftData';

export default function GiftCard({ giftObj, loading = false, onUpdate }) {
  const [person, setPerson] = useState('');

  const deleteThisGift = () => {
    if (window.confirm(`Delete ${giftObj.name}?`)) {
      deleteGift(giftObj.giftId).then(() => onUpdate(giftObj.giftId));
    }
  };

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

  const displayStatusColor = () => {
    switch (giftObj.status) {
      case 4:
        return 'bg-[#4CAF50]';
      case 3:
        return 'bg-[#9AC99D]';
      case 2:
        return 'bg-[#FFB74D]';
      case 1:
        return 'bg-[#E6DADA]';
      default:
        return 'Error';
    }
  };

  // Common container style for both states
  const containerStyle = 'w-[300px] h-[190px] bg-[#1e1e1e] rounded-[12px] transition-all duration-300 flex flex-col relative';

  if (loading) {
    return (
      <div>
        <div className={containerStyle}>
          <div className="h-[80%]">
            <div className="flex flex-row justify-between">
              <div className="pt-[22px] px-[22px] w-3/4">
                <Skeleton className="h-[18px] w-full bg-gray-700" />
              </div>
              <div className="h-[30px] m-3">
                <Skeleton className="h-full w-[80px] bg-gray-700 rounded-md" />
              </div>
            </div>
            <div className="px-[22px] mt-[4px]">
              <Skeleton className="h-[14px] w-1/3 bg-gray-700" />
            </div>
          </div>
          <div className="flex flex-row justify-end m-2 gap-2">
            <Skeleton className="h-[40px] w-[40px] bg-gray-700 rounded-lg" />
            <Skeleton className="h-[40px] w-[40px] bg-gray-700 rounded-lg" />
          </div>
          <div className="absolute bottom-2 left-2">
            <Skeleton className="h-[40px] w-[40px] bg-gray-700 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={containerStyle}>
        <div className="flex flex-col h-full">
          {/* Top content */}
          <div className="flex-grow overflow-hidden">
            <div className="flex flex-row justify-between">
              <p className="text-[18px] pt-[22px] px-[22px] text-white break-words">{giftObj.name}</p>
              <Badge className={`${displayStatusColor()} h-[30px] m-3 border-none text-black`}>{displayStatus()}</Badge>
            </div>
            <p className="text-[14px] px-[22px] text-gray-400 break-words">{person.name}</p>
          </div>

          {/* Bottom-right buttons */}
          <div className="flex flex-row justify-end m-2 gap-2 mt-auto">
            <div className="h-[40px] w-[40px] flex justify-center items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={`/gift/edit/${giftObj.giftId}`} passHref>
                      <Button className="p-0 bg-[#1e1e1e] h-full w-full rounded-lg">
                        <FontAwesomeIcon icon={faEllipsis} className="text-[#E6DADA]" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#474747] text-white border-none rounded-md text-sm shadow-md m-2">
                    <p className="m-0">Edit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="h-[40px] w-[40px] flex justify-center items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button className="p-0 bg-[#1e1e1e] h-full w-full rounded-lg" onClick={deleteThisGift}>
                      <FontAwesomeIcon icon={faXmark} className="text-[#E6DADA]" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#474747] text-white border-none rounded-md text-sm shadow-md m-2">
                    <p className="m-0">Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Bottom-left link button */}
          {giftObj.url && (
            <div className="absolute bottom-2 left-2">
              <div className="h-[40px] w-[40px] flex justify-center items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button className="p-0 bg-[#1e1e1e] h-full w-full rounded-lg" onClick={() => window.open(giftObj.url, '_blank')}>
                        <FontAwesomeIcon icon={faWindowRestore} className="text-[#E6DADA]" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#474747] text-white border-none rounded-md text-sm shadow-md m-2">
                      <p className="m-0">View Gift Link</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
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
  onUpdate: PropTypes.func.isRequired,
};
