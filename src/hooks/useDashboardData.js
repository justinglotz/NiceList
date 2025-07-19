/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGiftsByPersonId } from './useGifts';
import { useAllPeople } from './usePeople';
import { updateGift } from '../api/giftData';

export const useDashboardData = (uid, personId) => {
  const giftsQuery = useGiftsByPersonId(personId);
  const peopleQuery = useAllPeople(uid);
  const queryClient = useQueryClient();

  const isLoading = giftsQuery.isLoading || peopleQuery.isLoading;
  const isError = giftsQuery.isError || peopleQuery.isError;
  const [delayedLoading, setDelayedLoading] = useState(true);
  const [allGifts, setAllGifts] = useState([]);

  useEffect(() => {
    if (giftsQuery.data) {
      setAllGifts(giftsQuery.data);
    }
  }, [giftsQuery.data]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setDelayedLoading(false), 800);
      return () => clearTimeout(timer);
    }
    setDelayedLoading(true);
  }, [isLoading]);

  const mutation = useMutation({
    mutationFn: updateGift,
    onMutate: async (updatedGift) => {
      await queryClient.cancelQueries(['gifts', personId]);

      const previousGifts = queryClient.getQueryData(['gifts', personId]);

      setAllGifts((prev) => prev.map((gift) => (gift.giftId === updatedGift.giftId ? updatedGift : gift)));
      queryClient.setQueryData(['gifts', personId], (old = []) => old.map((gift) => (gift.giftId === updatedGift.giftId ? updatedGift : gift)));

      return { previousGifts };
    },
    onError: (err, _gift, context) => {
      if (context?.previousGifts) {
        queryClient.setQueryData(['gifts', personId], context.previousGifts);
        setAllGifts(context.previousGifts);
      }
      console.error('❌ Gift update failed', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['gifts', personId]);
    },
  });

  const handleGiftUpdate = (updatedGift) => {
    mutation.mutate(updatedGift);
  };

  return {
    gifts: allGifts,
    people: peopleQuery.data ?? [],
    loading: delayedLoading,
    error: isError,
    handleGiftUpdate,
  };
};
