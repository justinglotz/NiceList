'use client';

import { useAuth } from '@/utils/context/authContext';
import DashboardCard from '@/components/cards/DashboardCard';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { getPeople } from '../api/personData';
import { getGifts } from '../api/giftData';
import CustomProgressBar from '../components/CustomProgressBar';
import { useHideCompleted } from '../utils/context/hideCompletedContext';

function Home() {
  const { user } = useAuth();
  const [people, setPeople] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [completedGifts, setCompletedGifts] = useState(0);
  const [loading, setLoading] = useState(true);
  const { hideCompleted, setHideCompleted } = useHideCompleted();
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOutConfetti, setFadeOutConfetti] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople(user.uid).then(setPeople);
    getGifts(user.uid).then((data) => {
      setGifts(data);
      setTimeout(() => setLoading(false), 800);
    });
  }, [user.uid]);

  useEffect(() => {
    if (gifts && gifts.length > 0) {
      let giftProgressSum = 0;
      let countCompletedGifts = 0;

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

  useEffect(() => {
    if (progress === 100) {
      setShowConfetti(true); // Show confetti when progress hits 100
      setTimeout(() => {
        setFadeOutConfetti(true); // Start fade-out effect after 10 seconds
        setTimeout(() => {
          setShowConfetti(false); // Hide confetti after fade-out completes
        }, 2000); // Fade-out duration
      }, 10000); // 10000 milliseconds = 10 seconds
    }
  }, [progress]);

  const handleGiftUpdateInParent = (updatedGift) => {
    setGifts((prevGifts) => prevGifts.map((gift) => (gift.giftId === updatedGift.giftId ? updatedGift : gift)));
  };

  const handleCheckboxChange = (e) => {
    setHideCompleted(e.target.checked);
  };

  // if (!loading && gifts.length === 0 && people.length === 0) {
  //   return <div className='text-black text-center mt-[15px]'>Your dashboard is empty. <Link href={`/person/new`} passHref>Add some people</Link> and <Link href={`/gift-ideas`} passHref>gift ideas</Link> to get started.</div>;
  // }

  return (
    <div className="mx-auto w-full">
      {showConfetti && <Confetti colors={['#f44336', '#4CAF50']} className={`transition-opacity duration-2000 ${fadeOutConfetti ? 'opacity-0' : 'opacity-100'}`} />}
      <div className="h-[30px] mt-[25px] mb-[5px] sm:mt-[15px]">
        <h3 className="text-center font-quicksand">Overall Progress</h3>
      </div>
      <div className="h-[23px] w-4/5 mx-auto mb-0">
        <CustomProgressBar value={progress} />
      </div>
      <div className="flex flex-row w-4/5 mx-auto relative justify-between">
        <div className="h-[20px] mt-[10px] mb-[30px] sm:mb-[15px]">
          <h6 className="text-center font-semibold font-quicksand">
            {completedGifts}/{gifts.length} Gifts Completed
          </h6>
        </div>
        <div className="h-[20px] mt-[10px] mb-[15px]">
          <h6 className="text-center font-semibold font-quicksand">
            <input type="checkbox" className="inline" onChange={handleCheckboxChange} checked={hideCompleted} /> Hide Completed
          </h6>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 px-8 mb-4">
        {people.map((personObj) => (
          <DashboardCard key={personObj.personId} personObj={personObj} onGiftUpdate={handleGiftUpdateInParent} hideCompleted={hideCompleted} loading={loading} />
        ))}
      </div>
    </div>
  );
}

export default Home;
