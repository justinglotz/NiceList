'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import GiftCard from '../../components/cards/GiftCard';
import { useAuth } from '../../utils/context/authContext';
import { getGifts } from '../../api/giftData';
import { useSearch } from '../../utils/context/searchContext';

export default function GiftsPage() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { searchQuery } = useSearch();

  const getAllTheGifts = () => {
    setLoading(true);
    getGifts(user.uid).then((data) => {
      setGifts(data);
      // Delay to allow all person data to load
      setTimeout(() => setLoading(false), 900);
    });
  };

  const handleDeleteGift = (deletedGiftId) => {
    setGifts((prevGifts) => prevGifts.filter((gift) => gift.giftId !== deletedGiftId));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getAllTheGifts();
  }, []);

  const filteredGifts = useMemo(() => {
    // Show all ideas if search query is empty or just 1 character
    if (!searchQuery || searchQuery.length <= 1) {
      return gifts;
    }

    // Filter gifts that match the search query
    return gifts.filter((gift) => {
      const searchLower = searchQuery.toLowerCase();
      // Adjust these fields based on your gift idea structure
      return gift.name?.toLowerCase().includes(searchLower);
    });
  }, [gifts, searchQuery]);

  return (
    <>
      <div className="flex justify-center items-center flex-col mt-[15px]">
        <h3 className="font-quicksand">Gifts</h3>
        <Link href="/gift/new" passHref>
          <button type="button" className="px-4 py-2 text-lg bg-[#7fa087] hover:bg-[#6b8872] text-black rounded">
            New Gift
          </button>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 px-8 mb-4 mt-2">
        {filteredGifts.map((gift) => (
          <GiftCard key={gift.giftId} giftObj={gift} onUpdate={handleDeleteGift} loading={loading} />
        ))}
      </div>
    </>
  );
}
