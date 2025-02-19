'use client';

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import GiftCard from '../../components/cards/GiftCard';
import { useAuth } from '../../utils/context/authContext';
import { getGifts } from '../../api/giftData';

export default function GiftsPage() {
  const [gifts, setGifts] = useState([]);
  const { user } = useAuth();

  const getAllTheGifts = () => {
    getGifts(user.uid).then(setGifts);
  };

  useEffect(() => {
    getAllTheGifts();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center">
        <Link href="/gift/new" passHref>
          <Button>New Gift</Button>
        </Link>
      </div>
      <div className="flex flex-row gap-3 m-2">
        {gifts.map((gift) => (
          <GiftCard key={gift.giftId} giftObj={gift} onUpdate={getAllTheGifts} />
        ))}
      </div>
    </>
  );
}
