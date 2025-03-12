'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';
import Skeleton from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { deletePerson } from '../../api/personData';

export default function PersonCard({ personObj, loading = false, onUpdate }) {
  const deleteThisPerson = () => {
    if (window.confirm(`Delete ${personObj.name}?`)) {
      deletePerson(personObj.personId).then(() => onUpdate(personObj.personId));
    }
  };

  const containerStyle = 'w-[300px] h-[150px] bg-[#1e1e1e] rounded-[12px] transition-all duration-300 flex flex-col relative';

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
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      <div className="h-[80%]">
        <div className="flex flex-row justify-between">
          <p className="text-[18px] pt-[22px] px-[22px] text-white">{personObj.name}</p>
          {personObj.shipped && <Badge className="bg-[#4CAF50] h-[30px] m-3 border-none text-black">Shipping Directly</Badge>}
        </div>
        <p className="text-[14px] px-[22px] text-gray-400">{personObj.address}</p>
        <div className="flex flex-row justify-end m-2">
          <div className="h-[40px] w-[40px] text-center flex flex-row justify-center items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={`/person/edit/${personObj.personId}`} passHref>
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
          <div className="h-[40px] w-[40px] text-center flex flex-row justify-center items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button className="p-0 bg-[#1e1e1e] h-full w-full rounded-lg" onClick={deleteThisPerson}>
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
      </div>
    </div>
  );
}

PersonCard.propTypes = {
  personObj: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    uid: PropTypes.string,
    personId: PropTypes.string,
    shipped: PropTypes.bool,
  }).isRequired,
  loading: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
};
