'use client';

import { useAuth } from '@/utils/context/authContext';
import DashboardCard from '@/components/cards/DashboardCard';
import { useEffect, useState } from 'react';
import { getPeople } from '../api/personData';
import { getGifts } from '../api/giftData';
import CustomProgressBar from '../components/CustomProgressBar';

function Home() {
  const { user } = useAuth();
  const [people, setPeople] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [completedGifts, setCompletedGifts] = useState(0);

  useEffect(() => {
    getPeople(user.uid).then(setPeople);
    getGifts(user.uid).then(setGifts);
  }, [user.uid]);

  useEffect(() => {
    if (gifts && gifts.length > 0) {
      let giftProgressSum = 0;
      let countCompletedGifts = 0; // Local variable inside useEffect

      gifts.forEach((gift) => {
        giftProgressSum += gift.status || 0;
        if (gift.status === 4) {
          countCompletedGifts += 1;
        }
      });

      const calculatedProgress = (giftProgressSum / (gifts.length * 4)) * 100;
      setProgress(Math.round(calculatedProgress));
      setCompletedGifts(countCompletedGifts); // Update the state!
    } else {
      setProgress(0);
      setCompletedGifts(0); // Reset completed gifts if gifts is empty
    }
  }, [gifts]);

  if (!gifts) {
    // Check if gifts data is not yet loaded
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <div className="mx-auto w-full">
      <div className="h-[30px] mt-[15px] mb-[5px]">
        <h3 className="text-center font-semibold">Overall Progress</h3>
      </div>
      <div className="h-[23px] w-4/5 mx-auto mb-0">
        <CustomProgressBar value={progress} />
      </div>
      <div className="flex flex-row w-4/5 mx-auto relative">
        <div className="h-[20px] mt-[10px] mb-[15px]" style={{ marginLeft: 'calc(50% - 75px)' }}>
          <h6 className="text-center font-semibold">
            {completedGifts}/{gifts.length} Gifts Completed
          </h6>
        </div>
        <div className="h-[20px] mt-[10px] mb-[15px] ml-auto">
          <h6 className="text-center font-semibold">
            <input type="checkbox" className="inline" /> Hide Completed
          </h6>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-start gap-4 px-8">
        {people.map((personObj) => (
          <DashboardCard key={personObj.personId} personObj={personObj} />
        ))}
      </div>
    </div>
  );
}

export default Home;
