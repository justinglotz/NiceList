import { useQuery } from '@tanstack/react-query';
import { getPeople } from '../api/personData';

// eslint-disable-next-line import/prefer-default-export
export const useAllPeople = (uid) =>
  useQuery({
    queryKey: ['people', 'all', uid],
    queryFn: () => getPeople(uid),
    enabled: !!uid,
  });
