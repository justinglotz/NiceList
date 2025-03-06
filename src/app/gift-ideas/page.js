'use client';

import React, { useEffect, useState, useMemo } from 'react';
import GiftIdeaForm from '../../components/forms/GiftIdeaForm';
import GiftIdeaCard from '../../components/cards/GiftIdeaCard';
import { useAuth } from '../../utils/context/authContext';
import { getGiftIdeas } from '../../api/giftIdeaData';
import { useSearch } from '../../utils/context/searchContext';

export default function GiftIdeasPage() {
  const [giftIdeas, setGiftIdeas] = useState([]);
  const { user } = useAuth();
  const { searchQuery } = useSearch();

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
    fetchAndSortGiftIdeas();
  };

  useEffect(() => {
    // Only fetch if user exists
    if (user) {
      fetchAndSortGiftIdeas();
    }
  }, [user]);

  // Filter gift ideas based on search query
  const filteredGiftIdeas = useMemo(() => {
    // Show all ideas if search query is empty or just 1 character
    if (!searchQuery || searchQuery.length <= 1) {
      return giftIdeas;
    }

    // Filter ideas that match the search query
    return giftIdeas.filter((idea) => {
      const searchLower = searchQuery.toLowerCase();
      // Adjust these fields based on your gift idea structure
      return idea.giftIdeaName?.toLowerCase().includes(searchLower) || idea.giftIdeaUrl?.toLowerCase().includes(searchLower);
    });
  }, [giftIdeas, searchQuery]);

  return (
    <>
      <GiftIdeaForm onOptimisticAdd={addOptimisticGiftIdea} onFinalRefresh={fetchAndSortGiftIdeas} />
      <div className="mt-4">
        {filteredGiftIdeas.map((giftIdea) => (
          <GiftIdeaCard key={giftIdea.giftIdeaId} giftIdea={giftIdea} onGiftIdeaDelete={() => onGiftIdeaDelete(giftIdea.giftIdeaId)} />
        ))}
      </div>
    </>
  );
}
