'use client';

import React, { useEffect, useState } from 'react';
import GiftIdeaForm from '../../components/forms/GiftIdeaForm';
import GiftIdeaCard from '../../components/cards/GiftIdeaCard';
import { useAuth } from '../../utils/context/authContext';
import { getGiftIdeas } from '../../api/giftIdeaData';

export default function GiftIdeasPage() {
  const [giftIdeas, setGiftIdeas] = useState([]);
  const { user } = useAuth();

  const fetchAndSortGiftIdeas = () => {
    getGiftIdeas(user.uid).then((ideas) => {
      // Sort ideas by timestamp in descending order (most recent first)
      const sortedIdeas = ideas.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setGiftIdeas(sortedIdeas);
    });
  };

  const addOptimisticGiftIdea = (newIdea) => {
    setGiftIdeas((prev) => [{ ...newIdea, firebaseKey: `optimistic-${Date.now()}` }, ...prev]);
  };

  const onGiftIdeaDelete = () => {
    // setGiftIdeas((prev) =>
    //   prev.filter(idea => idea.giftIdeaId !== deletedGiftIdeaId)
    // );
    fetchAndSortGiftIdeas();
  };

  useEffect(() => {
    // Only fetch if user exists
    if (user) {
      fetchAndSortGiftIdeas();
    }
  }, [user]);

  return (
    <>
      <GiftIdeaForm onOptimisticAdd={addOptimisticGiftIdea} onFinalRefresh={fetchAndSortGiftIdeas} />
      <div className="mt-4">
        {giftIdeas.map((giftIdea) => (
          <GiftIdeaCard key={giftIdea.giftIdeaId} giftIdea={giftIdea} onGiftIdeaDelete={() => onGiftIdeaDelete(giftIdea.giftIdeaId)} />
        ))}
      </div>
    </>
  );
}
