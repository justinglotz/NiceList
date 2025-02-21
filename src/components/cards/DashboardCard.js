'use client';

import React from 'react';
import ProgressRing from '../ProgressRing';
import GiftMiniCard from '../GiftMiniCard';

export default function DashboardCard() {
  return (
    <div>
      <div className="h-[300px] w-[300px] bg-[#1e1e1e] rounded-[12px] border-red-500">
        <div className="flex flex-row h-[136px] w-full">
          <div className="w-[175px] flex items-start">
            <p className="text-white text-[18px] pt-[22px] px-[22px]">Mom</p>
          </div>
          <div className="w-[125px] flex items-center justify-center">
            <ProgressRing progress={95} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <GiftMiniCard />
          <GiftMiniCard />
        </div>
      </div>
    </div>
  );
}
