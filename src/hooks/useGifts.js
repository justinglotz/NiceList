import { useQuery } from '@tanstack/react-query';
import { getGiftsByPersonId, getGifts } from '../api/giftData';

export const useGiftsByPersonId = (personId) =>
  useQuery({
    queryKey: ['gifts', personId],
    queryFn: () => getGiftsByPersonId(personId),
    enabled: !!personId,
  });

export const useAllGifts = (uid) =>
  useQuery({
    queryKey: ['gifts', 'all', uid],
    queryFn: () => getGifts(uid),
    enabled: !!uid,
  });
