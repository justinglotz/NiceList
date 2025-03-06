'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import GiftCard from '../../components/cards/GiftCard';
import { useAuth } from '../../utils/context/authContext';
import { getGifts } from '../../api/giftData';
import { useSearch } from '../../utils/context/searchContext';

export default function GiftsPage() {
  const [gifts, setGifts] = useState([]);
  const { user } = useAuth();
  const { searchQuery } = useSearch();

  const getAllTheGifts = () => {
    getGifts(user.uid).then(setGifts);
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

    // Filter ideas that match the search query
    return gifts.filter((gift) => {
      const searchLower = searchQuery.toLowerCase();
      // Adjust these fields based on your gift idea structure
      return gift.name?.toLowerCase().includes(searchLower);
    });
  }, [gifts, searchQuery]);

  return (
    <>
      <div className="flex justify-center items-center">
        <Link href="/gift/new" passHref>
          <Button>New Gift</Button>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 px-8 mb-4">
        {filteredGifts.map((gift) => (
          <GiftCard key={gift.giftId} giftObj={gift} onUpdate={getAllTheGifts} />
        ))}
      </div>
    </>
  );
}
