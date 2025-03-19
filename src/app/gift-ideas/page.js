'use client';

import React, { useEffect, useState, useMemo } from 'react';
import GiftIdeaForm from '../../components/forms/GiftIdeaForm';
import GiftIdeaCard from '../../components/cards/GiftIdeaCard';
import { useAuth } from '../../utils/context/authContext';
import { getGiftIdeas } from '../../api/giftIdeaData';
import { useSearch } from '../../utils/context/searchContext';

export default function GiftIdeasPage() {
  const [giftIdeas, setGiftIdeas] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
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
    // Add optimistic UI update with a temporary ID
    const tempId = `optimistic-${Date.now()}`;
    setGiftIdeas((prev) => [{ ...newIdea, giftIdeaId: tempId, isOptimistic: true }, ...prev]);
  };

  const onPersonSelect = () => {
    setConfirmation(true);
  };

  const onGiftIdeaDelete = (giftIdeaId) => {
    setTimeout(() => {
      setConfirmation(false);
    }, 500);

    // Remove from UI immediately before backend processes
    setGiftIdeas((prev) => prev.filter((idea) => idea.giftIdeaId !== giftIdeaId));

    // Then refresh from backend
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
    <div className="mt-[15px]">
      <GiftIdeaForm onOptimisticAdd={addOptimisticGiftIdea} onFinalRefresh={fetchAndSortGiftIdeas} />
      <div className="mt-4">
        {confirmation && (
          <div className="flex justify-center w-full mb-2">
            <div className="bg-green-100 text-green-700 text-sm p-2 rounded w-4/5">
              <p className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                Gift successfully assigned!
              </p>
            </div>
          </div>
        )}
        {filteredGiftIdeas.map((giftIdea) => (
          <GiftIdeaCard loading={giftIdea.isOptimistic || false} key={giftIdea.giftIdeaId} giftIdea={giftIdea} onGiftIdeaDelete={() => onGiftIdeaDelete(giftIdea.giftIdeaId)} onPersonSelect={onPersonSelect} />
        ))}
      </div>
    </div>
  );
}
